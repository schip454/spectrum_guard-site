import { services } from './services';
import { cities } from './cities';

/** Пункт навигации. */
export interface NavItem {
  label: string;
  href: string;
}

/** Главное меню шапки. */
export const mainNav: NavItem[] = [
  { label: 'Услуги', href: '/uslugi/' },
  { label: 'География', href: '/goroda/' },
  { label: 'Цены', href: '/ceny/' },
  { label: 'Блог', href: '/blog/' },
  { label: 'О компании', href: '/o-kompanii/' },
  { label: 'Контакты', href: '/kontakty/' },
];

/** Услуги для футера/меню — из единого источника. */
export const servicesNav: NavItem[] = services.map((s) => ({
  label: s.nameNom,
  href: `/uslugi/${s.slug}/`,
}));

/** Города для футера (перелинковка/мини-карта географии). */
export const citiesNav: NavItem[] = cities.map((c) => ({
  label: c.nom,
  href: `/${c.slug}/`,
}));

/** Служебные ссылки футера. */
export const footerLinks: NavItem[] = [
  { label: 'О компании', href: '/o-kompanii/' },
  { label: 'Контакты', href: '/kontakty/' },
  { label: 'Отзывы', href: '/otzyvy/' },
  { label: 'Цены', href: '/ceny/' },
  { label: 'Блог', href: '/blog/' },
  { label: 'Политика конфиденциальности', href: '/politika-konfidencialnosti/' },
];
