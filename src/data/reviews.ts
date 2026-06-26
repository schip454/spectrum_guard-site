/**
 * Отзывы — реальные обезличенные скриншоты (имена/аватары/лица заблюрены).
 * Это UI-скриншоты, НЕ фотобанк: грейд не применяем, отдаём в высоком качестве.
 * AggregateRating НЕ выдумываем (нет подтверждённой суммы) — только сами отзывы.
 * См. docs/reviews-spec.md.
 */
export interface ReviewShot {
  /** Ключ изображения в реестре lib/media. */
  image: string;
  /** Нейтральный alt без имён. */
  alt: string;
  /** Тип источника — влияет на пропорции карточки. */
  kind: 'marketplace' | 'chat';
  /** Профильные услуги (для показа на страницах услуг). */
  services?: string[];
}

export const reviewShots: ReviewShot[] = [
  {
    image: 'reviews/review-anon-01.jpg',
    alt: 'Отзыв клиента, 5 звёзд: ответственно, оперативно, на связи',
    kind: 'marketplace',
    services: ['lichnaya-ohrana', 'ohrana-pri-pereezde'],
  },
  {
    image: 'reviews/review-anon-02.jpg',
    alt: 'Отзыв клиента, 5 звёзд: сработали грамотно и оперативно',
    kind: 'marketplace',
    services: ['lichnaya-ohrana'],
  },
  {
    image: 'reviews/review-chat-anon-01.jpg',
    alt: 'Отзыв клиента: сопровождение прошло хорошо, помогли',
    kind: 'chat',
    services: ['ohrana-pri-pereezde'],
  },
  {
    image: 'reviews/review-chat-anon-02.jpg',
    alt: 'Отзыв клиента: сработали оперативно и по делу',
    kind: 'chat',
  },
];
