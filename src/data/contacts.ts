/**
 * Контакты централизованы здесь. Меняется в одном месте — отражается на всём сайте.
 * Телефоны для консультаций, e-mail, Telegram, профили на Авито.
 */

export interface Phone {
  display: string;
  tel: string;
}

export const contacts = {
  /** Телефоны для звонка за консультацией. Показываются в шапке/футере/контактах. */
  phones: [
    { display: '+7 (996) 172-13-47', tel: '+79961721347' },
    { display: '+7 (902) 271-53-61', tel: '+79022715361' },
  ] as Phone[],
  email: 'info@spectrumguard.ru', // TODO:CONTENT — финальный e-mail
  telegram: {
    /** Прямая ссылка для TelegramCTA. */
    handle: 'spectrumguard',
    url: 'https://t.me/spectrumguard',
    label: '@spectrumguard',
  },
  /** Профили на Авито (две витрины). */
  avito: [
    {
      label: 'Spectrum Guard на Авито',
      url: 'https://www.avito.ru/brands/54fdddec4be05ec22d133c57d281ebdd?src=sharing',
    },
    {
      label: 'Spectrum Guard на Авито (2)',
      url: 'https://www.avito.ru/brands/6a47302350ee350e627f6e593dab26af?src=sharing',
    },
  ],
  /** Реквизиты — за флагом TRUST_BLOCK_ENABLED. Заполнить, когда появятся. */
  legal: {
    name: null as string | null,
    inn: null as string | null,
    ogrn: null as string | null,
    license: null as string | null,
  },
  /** Часы приёма заявок (для ContactPoint). */
  hours: 'Круглосуточно, ежедневно',
} as const;

/** Основной телефон (первый в списке). */
export const primaryPhone = contacts.phones[0];

/** Готовая ссылка tel: на основной номер. */
export const telHref = `tel:${primaryPhone.tel}`;
