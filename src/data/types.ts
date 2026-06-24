/** Общие типы модели данных (DRY-ядро). */

/** Падежи города — обязательны для естественных title/H1/description. */
export interface City {
  slug: string;
  nom: string; // Екатеринбург
  prep: string; // в Екатеринбурге
  gen: string; // Екатеринбурга
  region: string; // Свердловская область
  /** Есть локальные фото/кейсы → насыщаем страницу реальной фактурой. */
  hasLocalProof: boolean;
  /** Пути к локальным медиа (астро-ассеты раскладываются по городам). */
  media: string[];
  /** Естественный локальный контекст (ориентиры/районы) — НЕ фейк, для уникализации. */
  localContext?: string;
}

/** Секция тела услуги — переиспользуется в шаблоне. */
export interface ServiceSection {
  heading: string;
  /** Абзацы — каждый самодостаточный извлекаемый фрагмент (AEO). */
  body?: string[];
  /** Маркированный список (что входит / этапы / кому подходит). */
  items?: string[];
}

export interface Faq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  nameNom: string; // Личная охрана
  /** Строчными для подстановки в title: «личная охрана в Екатеринбурге». */
  nameForUrlTitle: string;
  /** Бытовая формулировка-вход (интент-карточка на главной). */
  intentLabel: string;
  /** serviceType для Schema.org Service. */
  schemaType: string;
  /** Ключ кастомной иконки в src/components/icons. */
  icon: string;
  /** 40–60 слов: прямой ответ на главный интент (Answer-First). */
  answerFirst: string;
  /** Короткий подзаголовок направления (для карточек/хабов). */
  tagline: string;
  /** Коммерческие гео-запросы (шаблон с {город}). */
  commercialQueries: string[];
  /** Информационные/проблемные — для блога и AEO. */
  problemQueries: string[];
  /** Правовая/смысловая рамка услуги — единым предложением. */
  legalFrame: string;
  sections: ServiceSection[];
  faq: Faq[];
}
