/**
 * Композиция текстов гео-страниц и хабов из данных (DRY). Топоним — в естественном
 * падеже из cities.ts. Контент уникализируется по городам (не клон): для городов с
 * фактурой добавляем локальный контекст, формулировки варьируются.
 */
import type { City, Service, Faq } from '../data/types';

/** Заглавная первая буква (для начала предложения с названия услуги). */
function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ---------- Гео-страница: услуга × город ---------- */

export function geoH1(service: Service, city: City): string {
  return `${service.nameNom} ${city.prep}`;
}

export function geoTitle(service: Service, city: City): string {
  return `${service.nameNom} ${city.prep} — заказать | Spectrum Guard`;
}

export function geoDescription(service: Service, city: City): string {
  // Краткий, с топонимом в естественном падеже, без переспама.
  return (
    `${cap(service.nameForUrlTitle)} ${city.prep}: ${service.tagline.toLowerCase()}. ` +
    `Кому подходит и как заказать у Spectrum Guard. Работаем в правовом поле, конфиденциально. ` +
    `Оставьте заявку — перезвоним или ответим в Telegram.`
  );
}

/**
 * Answer-First для гео-страницы (40–60 слов). Прямой ответ с топонимом, собран из
 * чистых полей данных. Для городов с фактурой — локальная ремарка, чтобы тексты не
 * были клонами.
 */
export function geoAnswerFirst(service: Service, city: City): string {
  const tail = city.hasLocalProof
    ? `Работаем ${city.prep} и в регионе. Оставьте заявку — обсудим формат и стоимость.`
    : `Работаем ${city.prep} выездным форматом. Оставьте заявку — обсудим формат и стоимость.`;
  return `${service.nameNom} ${city.prep}: ${service.tagline.toLowerCase()}. ${service.legalFrame} ${tail}`;
}

/* ---------- Хаб услуги ---------- */

export function serviceHubTitle(service: Service): string {
  return `${service.nameNom} — Spectrum Guard | 8 городов России`;
}

export function serviceHubDescription(service: Service): string {
  return (
    `${service.nameNom}: ${service.tagline.toLowerCase()}. ` +
    `Как заказать, что входит, сколько стоит. Spectrum Guard работает в 8 городах России. ` +
    `Оставьте заявку или напишите в Telegram.`
  );
}

/* ---------- Хаб города ---------- */

export function cityHubH1(city: City): string {
  return `Охрана и безопасность ${city.prep}`;
}

export function cityHubTitle(city: City): string {
  return `Охрана ${city.prep} — Spectrum Guard`;
}

export function cityHubDescription(city: City): string {
  return (
    `Охрана и личная безопасность ${city.prep}: личная охрана, защита при угрозах, охрана при ` +
    `переезде, помощь с соседями и охрана мероприятий. Spectrum Guard — выезд, конфиденциально. ` +
    `Оставьте заявку.`
  );
}

/** Городской FAQ — собирается из честных фактов о работе в городе (без выдумок). */
export function cityFaq(city: City): Faq[] {
  return [
    {
      q: `Вы работаете ${city.prep}?`,
      a:
        `Да. Spectrum Guard оказывает услуги ${city.prep} выездным форматом: личная охрана, ` +
        `охрана при переезде, защита при угрозах, помощь при конфликте с соседями и охрана ` +
        `мероприятий. Маршрут и точки встречи согласуем заранее.`,
    },
    {
      q: `Как заказать охрану ${city.prep}?`,
      a:
        `Оставьте заявку на сайте или напишите в Telegram — коротко опишите ситуацию и город. ` +
        `Мы перезвоним или ответим в мессенджере, обсудим формат и стоимость.`,
    },
    {
      q: 'Это законно и конфиденциально?',
      a:
        'Да. Работаем строго в правовом поле: обеспечиваем безопасность и при необходимости ' +
        'фиксируем происходящее, но не давим на третьих лиц. Данные клиента не разглашаем.',
    },
  ];
}

export function cityHubAnswerFirst(city: City): string {
  return (
    `Охрана ${city.prep} от Spectrum Guard — это пять направлений: личная охрана, охрана при ` +
    `переезде, защита при угрозах, помощь при конфликте с соседями и охрана мероприятий. ` +
    `Работаем выездным форматом, в правовом поле и конфиденциально. Чтобы заказать, оставьте ` +
    `заявку или напишите в Telegram — обсудим задачу и стоимость.`
  );
}
