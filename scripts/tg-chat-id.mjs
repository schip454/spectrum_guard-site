/**
 * Помощник: определяет chat_id для бота из getUpdates.
 * Запуск: TG_TOKEN=<token> node scripts/tg-chat-id.mjs
 * Перед запуском: добавьте @SpectrumGuardBot в нужный чат/группу и отправьте туда любое
 * сообщение (или нажмите Start в личке) — тогда чат появится в getUpdates.
 */
const token = process.env.TG_TOKEN;
if (!token) {
  console.error('Укажите TG_TOKEN=<token>');
  process.exit(1);
}
const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
const data = await res.json();
if (!data.ok) {
  console.error('Ошибка API:', data);
  process.exit(1);
}
const chats = new Map();
for (const u of data.result) {
  const msg = u.message || u.channel_post || u.my_chat_member;
  const chat = msg?.chat;
  if (chat) chats.set(chat.id, `${chat.type} · ${chat.title || chat.username || chat.first_name || ''}`);
}
if (chats.size === 0) {
  console.log('Чатов пока нет. Добавьте бота в группу и отправьте сообщение, затем повторите.');
} else {
  console.log('Найденные чаты (используйте id в lead.config.php → telegram_chat_id):');
  for (const [id, label] of chats) console.log(`  ${id}  — ${label}`);
}
