/**
 * Отзывы — ТОЛЬКО реальные. Пока контента нет (TODO:CONTENT).
 * AggregateRating/Review-схему отдаём строго по факту, без накруток (REVIEWS_ENABLED).
 */
export interface Review {
  author: string; // обезличенно: «Клиент», имя по согласию
  city?: string;
  service?: string;
  text: string;
  date: string; // ISO
  rating?: number; // 1–5, только если есть реальная оценка
}

export const reviews: Review[] = [
  // TODO:CONTENT — добавить реальные отзывы, когда поступят.
];
