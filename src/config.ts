/**
 * Глобальные флаги и константы сайта.
 * Источник правды для include/exclude блоков, которые включаются «одним движением».
 */

export const SITE_URL = 'https://spectrumguard.ru';
export const SITE_NAME = 'Spectrum Guard';
export const SITE_TAGLINE = 'Охрана и личная безопасность';

/**
 * Трастовый блок (лицензия, реквизиты) — скрыт, пока нет данных от заказчика.
 * Включается переводом в `true`, когда реквизиты появятся. Нигде на сайте не
 * упоминаем, что их «пока нет» (см. README → Открытые TODO).
 */
export const TRUST_BLOCK_ENABLED = false;

/** Отзывы/AggregateRating — только по факту реальных данных. */
export const REVIEWS_ENABLED = false;

/** Кейсы — только обезличенные реальные. Пока контента нет. */
export const CASES_ENABLED = false;

/**
 * Аналитика. Подключается единым компонентом, легко включить/выключить.
 * До запуска — выключено. Никаких сторонних аналитик, кроме Метрики и GA.
 */
export const ANALYTICS = {
  yandexMetrikaId: null as number | null, // напр. 99999999
  googleAnalyticsId: null as string | null, // напр. 'G-XXXXXXXXXX'
} as const;
