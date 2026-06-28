/**
 * Билдеры JSON-LD (Schema.org). Размечаем только ВИДИМЫЙ контент.
 * Сущности не дублируем: Organization задаётся один раз через @id и переиспользуется
 * как provider в Service.
 */
import { SITE_URL, SITE_NAME, SHOW_PHONE } from '../config';
import { contacts } from '../data/contacts';
import { cities } from '../data/cities';
import type { City, Service, Faq } from '../data/types';

export const ORG_ID = `${SITE_URL}/#organization`;

/** Абсолютный URL из пути. */
export function abs(path: string): string {
  return new URL(path, SITE_URL).href;
}

/** Organization — сайтово (в Base через @id), areaServed = все 9 городов.
 *  Телефон в разметку кладём только если он реально показан на сайте (SHOW_PHONE). */
export function organizationSchema() {
  // ContactPoint без телефона: контакт через e-mail и Telegram (sameAs).
  const contactPoint = SHOW_PHONE
    ? {
        '@type': 'ContactPoint',
        telephone: contacts.phone.tel,
        contactType: 'customer service',
        availableLanguage: ['Russian'],
      }
    : {
        '@type': 'ContactPoint',
        email: contacts.email,
        contactType: 'customer service',
        availableLanguage: ['Russian'],
      };
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: SITE_URL + '/',
    description:
      'Охранное агентство Spectrum Guard: личная охрана, защита при угрозах, охрана при ' +
      'переезде, помощь при конфликте с соседями и охрана мероприятий в 9 городах России.',
    ...(SHOW_PHONE ? { telephone: contacts.phone.tel } : {}),
    email: contacts.email,
    sameAs: [contacts.telegram.url],
    contactPoint,
    areaServed: cities.map((c) => ({ '@type': 'City', name: c.nom })),
  };
}

/** Service для гео-страницы или хаба услуги. */
export function serviceSchema(opts: {
  service: Service;
  city?: City; // если есть — areaServed = город; иначе все города
  url: string;
  name: string;
  description: string;
}) {
  const { service, city, url, name, description } = opts;
  return {
    '@type': 'Service',
    name,
    serviceType: service.schemaType,
    description,
    url: abs(url),
    provider: { '@id': ORG_ID },
    areaServed: city
      ? { '@type': 'City', name: city.nom }
      : cities.map((c) => ({ '@type': 'City', name: c.nom })),
  };
}

/**
 * Хаб города: Service с areaServed = город, БЕЗ адреса (его нет — решение заказчика).
 * Не используем LocalBusiness с address, чтобы не давать ложных сигналов локалке.
 */
export function cityHubSchema(opts: { city: City; url: string; description: string }) {
  return {
    '@type': 'Service',
    name: `Охрана и безопасность — ${opts.city.nom}`,
    serviceType: 'ProtectiveService',
    description: opts.description,
    url: abs(opts.url),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'City', name: opts.city.nom },
  };
}

/** FAQPage — текст совпадает с видимым на странице. */
export function faqSchema(faq: Faq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** BreadcrumbList — путь навигации (везде, кроме главной). */
export function breadcrumbSchema(crumbs: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.href),
    })),
  };
}

/** Article/BlogPosting для статьи блога. */
export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  author: string;
  datePublished: string | Date;
  dateModified?: string | Date;
  image?: string;
}) {
  const toISO = (d: string | Date) => (d instanceof Date ? d.toISOString() : d);
  return {
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    url: abs(opts.url),
    mainEntityOfPage: abs(opts.url),
    author: { '@type': 'Person', name: opts.author },
    publisher: { '@id': ORG_ID },
    datePublished: toISO(opts.datePublished),
    dateModified: toISO(opts.dateModified ?? opts.datePublished),
    ...(opts.image ? { image: abs(opts.image) } : {}),
  };
}

/** Обернуть набор сущностей в @graph единого документа. */
export function graph(...nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
