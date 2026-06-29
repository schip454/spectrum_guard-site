/**
 * Композиция текстов гео-страниц и хабов из данных (DRY). Топоним — в естественном
 * падеже из cities.ts. Контент уникализируется по городам (не клон).
 * Тон — уверенный и конкретный, без штампов «выездной формат / по маршруту».
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
    `Кому подходит и как заказать у Spectrum Guard. ` +
    `Оставьте заявку — свяжемся, обсудим задачу и стоимость.`
  );
}

/**
 * Answer-First для гео-страницы (40–60 слов). Прямой ответ с топонимом, собран из
 * чистых полей данных.
 */
export function geoAnswerFirst(service: Service, city: City): string {
  return (
    `${service.nameNom} ${city.prep}: ${service.tagline.toLowerCase()}. ${service.legalFrame} ` +
    `Работаем ${city.prep}. Оставьте заявку — свяжемся, обсудим формат и стоимость.`
  );
}

/* ---------- Хаб услуги ---------- */

export function serviceHubTitle(service: Service): string {
  return `${service.nameNom} — Spectrum Guard | 9 городов России`;
}

export function serviceHubDescription(service: Service): string {
  return (
    `${service.nameNom}: ${service.tagline.toLowerCase()}. ` +
    `Как заказать, что входит, сколько стоит. Spectrum Guard работает в 9 городах России. ` +
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
    `переезде, помощь с соседями, охрана мероприятий и сопровождение сделок от Spectrum Guard. ` +
    `Оставьте заявку.`
  );
}

/** Городской FAQ — честные факты о работе в городе. */
export function cityFaq(city: City): Faq[] {
  return [
    {
      q: `Вы работаете ${city.prep}?`,
      a:
        `Да. ${city.nom} — один из городов, где Spectrum Guard оказывает услуги: личная охрана и ` +
        `сопровождение, охрана при переезде, защита при угрозах, помощь при конфликте с соседями и ` +
        `охрана мероприятий.`,
    },
    {
      q: `Как заказать охрану ${city.prep}?`,
      a:
        `Оставьте заявку на сайте или напишите в Telegram — коротко опишите ситуацию и город. ` +
        `Мы свяжемся, обсудим задачу, и заявку возьмёт в работу команда ${city.prep}: согласуем ` +
        `формат, время и стоимость.`,
    },
    {
      q: `Сколько стоит охрана ${city.prep}?`,
      a:
        `Стоимость зависит от задачи: формата (разовая смена или постоянный режим), числа ` +
        `сотрудников и длительности. Точную цену называем после короткого разговора, без скрытых доплат.`,
    },
  ];
}

export function cityHubAnswerFirst(city: City): string {
  return (
    `Охрана ${city.prep} от Spectrum Guard — это шесть направлений: личная охрана, охрана при ` +
    `переезде, защита при угрозах, помощь при конфликте с соседями, охрана мероприятий и ` +
    `сопровождение сделок с перевозкой денег. Оставьте заявку или напишите в Telegram — ` +
    `свяжемся, обсудим задачу, и её возьмёт в работу команда ${city.prep}.`
  );
}
