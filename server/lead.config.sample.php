<?php
/**
 * Шаблон серверного конфига обработчика заявок.
 *
 * РАЗВЁРТЫВАНИЕ:
 *  1. Скопируйте этот файл в `lead.config.php` РЯДОМ с api/lead.php на хостинге
 *     (или на уровень выше web-root — путь настраивается в lead.php).
 *  2. Заполните реальными значениями.
 *  3. НИКОГДА не коммитьте `lead.config.php` — токен бота секретный (он в .gitignore).
 *     Этот файл загружается на хостинг один раз и не перезаписывается при деплое dist/.
 */

return [
  // Telegram Bot API. Токен от @BotFather; chat_id диспетчера (или группы, с минусом).
  'telegram_bot_token' => 'PASTE_BOT_TOKEN_HERE',
  'telegram_chat_id'   => 'PASTE_CHAT_ID_HERE',

  // E-mail для дублирования заявок.
  'mail_to'   => 'info@spectrumguard.ru',
  'mail_from' => 'site@spectrumguard.ru', // адрес на домене — иначе письма уходят в спам

  // Анти-спам.
  'min_seconds'      => 3,   // быстрее этого после загрузки формы — бот
  'rate_limit_max'   => 6,   // макс. заявок с одного IP
  'rate_limit_window'=> 600, // за это окно (сек)
];
