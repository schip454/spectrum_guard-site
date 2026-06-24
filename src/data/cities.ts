import type { City } from './types';

/**
 * 8 городов гео-сетки. Склонения заполнены ровно по docs/architecture.md.
 * Порядок: города с локальной фактурой первыми (Москва, СПб, Екб — приоритет),
 * остальные следом.
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
      'moskva/msk-mgu-suv-01.webp',
      'moskva/msk-restoran-moskva-redcarpet-01.webp',
    ],
    localContext:
      'Работаем по всей Москве и ближнему Подмосковью: центр, деловые кластеры (Москва-Сити), ' +
      'жилые районы, выезды по трассам в область. Маршруты и точки встречи согласуем заранее.',
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
      'Покрываем Санкт-Петербург и пригороды: исторический центр, спальные районы, площадки ' +
      'для мероприятий, выезды в Ленинградскую область. Логистику и парковку продумываем заранее.',
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
      'ekaterinburg/ekb-tower-vysotsky-02.webp',
      'ekaterinburg/ekb-elcin-centr-exterior-01.webp',
      'ekaterinburg/ekb-elcin-centr-gwagon-01.webp',
      'ekaterinburg/ekb-ploshad-1905-dusk-01.webp',
      'ekaterinburg/ekb-ploshad-1905-vclass-01.webp',
    ],
    localContext:
      'Екатеринбург — опорный город: знаем районы, основные деловые точки и площадки. ' +
      'Выезжаем по городу и Свердловской области, точки встречи и маршруты согласуем заранее.',
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
      'Работаем в Уфе выездным форматом: сопровождение, личная охрана и охрана мероприятий ' +
      'по согласованному маршруту. Детали и точки встречи обсуждаем при заявке.',
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
      'В Челябинске оказываем услуги выездным форматом: личная охрана, сопровождение при ' +
      'переезде, защита при угрозах, охрана мероприятий. Маршрут согласуем заранее.',
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
      'В Перми работаем по согласованному маршруту: сопровождение, личная охрана, охрана ' +
      'мероприятий. Точки встречи и порядок работы обсуждаем при заявке.',
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
      'В Тюмени оказываем услуги выездным форматом: личная охрана, сопровождение, защита при ' +
      'угрозах, охрана мероприятий. Детали согласуем заранее.',
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
      'В Новосибирске встречаем и сопровождаем в аэропорту Толмачёво и по городу: личная ' +
      'охрана, сопровождение при переезде, охрана мероприятий. Маршрут и точки встречи ' +
      'согласуем заранее.',
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
