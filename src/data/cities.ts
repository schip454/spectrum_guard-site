import type { City } from './types';

/**
 * Города гео-сетки (9). Склонения обязательны для естественных title/H1.
 * Тон локального контекста — единый и уверенный: у нас есть люди в каждом городе.
 * hasLocalProof управляет только наличием РЕАЛЬНЫХ местных фото (узнаваемые ориентиры),
 * но публично города не делятся на «опорные/выездные» — это внутренний признак.
 */
export const cities: City[] = [
  {
    slug: 'moskva',
    nom: 'Москва',
    prep: 'в Москве',
    gen: 'Москвы',
    region: 'Москва',
    hasLocalProof: true,
    heroImage: 'moskva/msk-mgu-night-01.webp',
    media: [
      'moskva/msk-city-gwagon-01.webp',
      'moskva/msk-city-rangerover-01.webp',
      'moskva/msk-mgu-bentayga-01.webp',
    ],
    localContext:
      'В Москве и Подмосковье решаем задачи личной безопасности: личная охрана и сопровождение, ' +
      'защита при угрозах, помощь при переезде и охрана мероприятий — от деловых встреч в центре ' +
      'до частных событий за городом.',
  },
  {
    slug: 'sankt-peterburg',
    nom: 'Санкт-Петербург',
    prep: 'в Санкт-Петербурге',
    gen: 'Санкт-Петербурга',
    region: 'Санкт-Петербург',
    hasLocalProof: true,
    heroImage: 'spb/spb-gazprom-arena-night-01.webp',
    media: ['spb/spb-gazprom-arena-bluelight-01.webp', 'neutral/neutral-embankment-autumn-02.webp'],
    localContext:
      'В Санкт-Петербурге и Ленинградской области берём личную охрану и сопровождение, защиту при ' +
      'угрозах, помощь при переезде и охрану мероприятий — в центре, спальных районах и на площадках.',
  },
  {
    slug: 'ekaterinburg',
    nom: 'Екатеринбург',
    prep: 'в Екатеринбурге',
    gen: 'Екатеринбурга',
    region: 'Свердловская область',
    hasLocalProof: true,
    heroImage: 'ekaterinburg/ekb-ploshad-1905-night-01.webp',
    media: [
      'ekaterinburg/ekb-tower-vysotsky-01.webp',
      'ekaterinburg/ekb-elcin-centr-exterior-01.webp',
      'ekaterinburg/ekb-ploshad-1905-dusk-01.webp',
    ],
    localContext:
      'В Екатеринбурге и Свердловской области работаем по всем направлениям: личная охрана и ' +
      'сопровождение, защита при угрозах, помощь при переезде, охрана мероприятий. Знаем город и ' +
      'основные площадки.',
  },
  {
    slug: 'novosibirsk',
    nom: 'Новосибирск',
    prep: 'в Новосибирске',
    gen: 'Новосибирска',
    region: 'Новосибирская область',
    hasLocalProof: true,
    heroImage: 'novosibirsk/nsk-tolmachevo-airport-sunset-01.webp',
    media: [
      'novosibirsk/nsk-tolmachevo-airport-sunset-02.webp',
      'novosibirsk/nsk-tolmachevo-airport-01.webp',
      'novosibirsk/nsk-tolmachevo-airport-luggage-01.webp',
    ],
    localContext:
      'В Новосибирске встречаем и сопровождаем в аэропорту Толмачёво и по городу: личная охрана, ' +
      'сопровождение, защита при угрозах, помощь при переезде и охрана мероприятий.',
  },
  {
    slug: 'sochi',
    nom: 'Сочи',
    prep: 'в Сочи',
    gen: 'Сочи',
    region: 'Краснодарский край',
    hasLocalProof: false,
    heroImage: 'neutral/neutral-waterfront-01.webp',
    media: ['neutral/neutral-underpass-01.webp'],
    localContext:
      'В Сочи помогаем с личной охраной и сопровождением, защитой при угрозах, переездом и охраной ' +
      'мероприятий — на побережье, в городе и на выездных событиях.',
  },
  {
    slug: 'ufa',
    nom: 'Уфа',
    prep: 'в Уфе',
    gen: 'Уфы',
    region: 'Республика Башкортостан',
    hasLocalProof: false,
    heroImage: 'neutral/neutral-embankment-autumn-01.webp',
    media: ['neutral/neutral-convoy-highway-02.webp'],
    localContext:
      'В Уфе берём личную охрану и сопровождение, защиту при угрозах, помощь при переезде и охрану ' +
      'мероприятий. Подбираем формат под задачу.',
  },
  {
    slug: 'chelyabinsk',
    nom: 'Челябинск',
    prep: 'в Челябинске',
    gen: 'Челябинска',
    region: 'Челябинская область',
    hasLocalProof: false,
    heroImage: 'neutral/neutral-winter-suvs-01.webp',
    media: ['neutral/neutral-cottage-suvs-01.webp'],
    localContext:
      'В Челябинске работаем по всем направлениям: личная охрана и сопровождение, защита при угрозах, ' +
      'помощь при переезде, охрана мероприятий.',
  },
  {
    slug: 'perm',
    nom: 'Пермь',
    prep: 'в Перми',
    gen: 'Перми',
    region: 'Пермский край',
    hasLocalProof: false,
    heroImage: 'neutral/neutral-embankment-autumn-03.webp',
    media: ['neutral/neutral-forest-road-gwagon-01.webp'],
    localContext:
      'В Перми решаем задачи личной безопасности: личная охрана и сопровождение, защита при угрозах, ' +
      'помощь при переезде, охрана мероприятий.',
  },
  {
    slug: 'tyumen',
    nom: 'Тюмень',
    prep: 'в Тюмени',
    gen: 'Тюмени',
    region: 'Тюменская область',
    hasLocalProof: false,
    heroImage: 'neutral/neutral-cottage-suvs-02.webp',
    media: ['neutral/neutral-embankment-autumn-04.webp'],
    localContext:
      'В Тюмени берём личную охрану и сопровождение, защиту при угрозах, помощь при переезде и охрану ' +
      'мероприятий. Подбираем формат под задачу.',
  },
];

/** Быстрый доступ по slug. */
export const cityBySlug = new Map(cities.map((c) => [c.slug, c]));

export function getCity(slug: string): City | undefined {
  return cityBySlug.get(slug);
}

/** Соседние города (для переключателя на гео-странице) — все, кроме текущего. */
export function otherCities(slug: string): City[] {
  return cities.filter((c) => c.slug !== slug);
}
