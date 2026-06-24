/**
 * Контакты централизованы здесь. Меняется в одном месте — отражается на всём сайте.
 * Один корпоративный мобильный, e-mail, Telegram. Городских номеров нет (решение заказчика).
 *
 * TODO:CONTENT — финальные значения от заказчика (номер, e-mail, адрес Telegram-бота/канала).
 */

export const contacts = {
  /** Корпоративный мобильный — единый, показываем везде. Формат для tel: без пробелов. */
  phone: {
    display: '+7 (900) 000-00-00', // TODO:CONTENT — финальный номер
    tel: '+79000000000',
  },
  email: 'info@spectrumguard.ru', // TODO:CONTENT — финальный e-mail
  telegram: {
    /** Прямая ссылка для TelegramCTA. */
    handle: 'spectrumguard', // TODO:CONTENT — бот или менеджер
    url: 'https://t.me/spectrumguard',
    label: '@spectrumguard',
  },
  /** Реквизиты — за флагом TRUST_BLOCK_ENABLED. Заполнить, когда появятся. */
  legal: {
    // TODO:CONTENT — наименование, ИНН/ОГРН, лицензия. Пока скрыто флагом.
    name: null as string | null,
    inn: null as string | null,
    ogrn: null as string | null,
    license: null as string | null,
  },
  /** Часы приёма заявок (для ContactPoint). */
  hours: 'Круглосуточно, ежедневно',
} as const;

/** Готовая ссылка tel: */
export const telHref = `tel:${contacts.phone.tel}`;
