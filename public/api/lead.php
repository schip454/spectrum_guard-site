<?php
/**
 * Обработчик заявок Spectrum Guard (шаред-хостинг, PHP, без Node).
 * Принимает POST с формы LeadForm / CallbackCTA → дублирует в e-mail и шлёт в Telegram.
 *
 * Секреты (токен бота) — в lead.config.php, НЕ в этом файле и НЕ в клиентском JS.
 * Анти-спам: honeypot + временная метка + файловый rate-limit по IP.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

/* ---------- Только POST ---------- */
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'method']);
  exit;
}

/* ---------- Конфиг: ищем lead.config.php в нескольких местах ---------- */
$config = null;
$candidates = [
  __DIR__ . '/lead.config.php',                 // рядом с обработчиком
  dirname(__DIR__) . '/lead.config.php',         // на уровень выше (web-root)
  dirname(__DIR__, 2) . '/lead.config.php',      // выше web-root (предпочтительно)
];
foreach ($candidates as $path) {
  if (is_file($path)) {
    $config = require $path;
    break;
  }
}
// Фолбэк на переменные окружения, если конфиг-файла нет.
if (!is_array($config)) {
  $config = [
    'telegram_bot_token' => getenv('TG_BOT_TOKEN') ?: '',
    'telegram_chat_id'   => getenv('TG_CHAT_ID') ?: '',
    'mail_to'            => getenv('LEAD_MAIL_TO') ?: '',
    'mail_from'          => getenv('LEAD_MAIL_FROM') ?: '',
    'min_seconds'        => 3,
    'rate_limit_max'     => 6,
    'rate_limit_window'  => 600,
  ];
}

/* ---------- Хелперы ---------- */
function field(string $key, int $maxLen = 2000): string {
  $v = $_POST[$key] ?? '';
  if (!is_string($v)) return '';
  $v = trim($v);
  $v = str_replace(["\0"], '', $v);
  if (mb_strlen($v) > $maxLen) $v = mb_substr($v, 0, $maxLen);
  return $v;
}
function fail(int $code, string $msg): void {
  http_response_code($code);
  echo json_encode(['ok' => false, 'error' => $msg]);
  exit;
}

/* ---------- Honeypot: поле "company" должно быть пустым ---------- */
if (field('company') !== '') {
  // Тихо «успех», чтобы бот не понял, что отсеян.
  echo json_encode(['ok' => true]);
  exit;
}

/* ---------- Временная метка ---------- */
$ts = (int) (field('_ts') ?: '0');
$nowMs = (int) round(microtime(true) * 1000);
$minSeconds = (int) ($config['min_seconds'] ?? 3);
if ($ts > 0) {
  $elapsed = ($nowMs - $ts) / 1000;
  if ($elapsed < $minSeconds || $elapsed > 86400) {
    fail(422, 'timing');
  }
}

/* ---------- Rate-limit по IP (файловый) ---------- */
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ip = explode(',', $ip)[0];
$max = (int) ($config['rate_limit_max'] ?? 6);
$window = (int) ($config['rate_limit_window'] ?? 600);
$rlFile = sys_get_temp_dir() . '/sg_lead_' . md5($ip) . '.json';
$hits = [];
if (is_file($rlFile)) {
  $decoded = json_decode((string) file_get_contents($rlFile), true);
  if (is_array($decoded)) $hits = $decoded;
}
$nowSec = time();
$hits = array_values(array_filter($hits, fn($t) => ($nowSec - (int) $t) < $window));
if (count($hits) >= $max) {
  fail(429, 'rate');
}
$hits[] = $nowSec;
@file_put_contents($rlFile, json_encode($hits), LOCK_EX);

/* ---------- Данные заявки ---------- */
$name    = field('name', 120) ?: '—';
$method  = field('method', 20);
$contact = field('contact', 200);
$message = field('message', 2000);
$source  = field('source', 200) ?: 'Сайт';

if ($contact === '') {
  fail(422, 'contact');
}
// Метка способа связи: явная (callback шлёт phone) или обобщённая для единого поля формы.
$methodLabel = $method === 'telegram' ? 'Telegram' : ($method === 'phone' ? 'Телефон' : 'Контакт');

/* ---------- Сборка текста ---------- */
$lines = [
  '🛡 Новая заявка — Spectrum Guard',
  '',
  'Имя: ' . $name,
  'Связь: ' . $methodLabel . ' — ' . $contact,
];
if ($message !== '') $lines[] = 'Сообщение: ' . $message;
$lines[] = 'Источник: ' . $source;
$lines[] = 'Время: ' . date('Y-m-d H:i:s');
$text = implode("\n", $lines);

/* ---------- Telegram ---------- */
$tgOk = false;
$token = (string) ($config['telegram_bot_token'] ?? '');
$chatId = (string) ($config['telegram_chat_id'] ?? '');
if ($token !== '' && $chatId !== '' && function_exists('curl_init')) {
  $ch = curl_init("https://api.telegram.org/bot{$token}/sendMessage");
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_TIMEOUT => 8,
    CURLOPT_POSTFIELDS => http_build_query([
      'chat_id' => $chatId,
      'text' => $text,
      'disable_web_page_preview' => true,
    ]),
  ]);
  $resp = curl_exec($ch);
  $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  $tgOk = $resp !== false && $httpCode >= 200 && $httpCode < 300;
}

/* ---------- E-mail ---------- */
$mailOk = false;
$mailTo = (string) ($config['mail_to'] ?? '');
$mailFrom = (string) ($config['mail_from'] ?? '');
if ($mailTo !== '') {
  $headers = 'MIME-Version: 1.0' . "\r\n"
    . 'Content-Type: text/plain; charset=utf-8' . "\r\n";
  if ($mailFrom !== '') {
    $headers .= 'From: Spectrum Guard <' . $mailFrom . '>' . "\r\n";
    $headers .= 'Reply-To: ' . $mailFrom . "\r\n";
  }
  $subject = '=?UTF-8?B?' . base64_encode('Заявка с сайта — ' . $source) . '?=';
  $mailOk = @mail($mailTo, $subject, $text, $headers);
}

/* ---------- Ответ ---------- */
// Успех, если доставлено хотя бы одним каналом.
if ($tgOk || $mailOk) {
  echo json_encode(['ok' => true]);
} else {
  fail(502, 'delivery');
}
