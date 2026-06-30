import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { services } from './data/services';
import { cities } from './data/cities';

const serviceSlugs = services.map((s) => s.slug) as [string, ...string[]];
const citySlugs = cities.map((c) => c.slug) as [string, ...string[]];

/**
 * Блог. Контент в src/content/blog/*.md. Каждая статья ведёт на профильную услугу
 * (relatedService) и при уместности — на гео-страницу (relatedCity).
 * Автор обязателен для E-E-A-T (Schema Article).
 */
const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Прямой ответ на главный вопрос статьи (40–60 слов) — для AEO. */
    answerFirst: z.string(),
    author: z.string().default('Редакция Spectrum Guard'),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** Профильная услуга для внутренней ссылки. */
    relatedService: z.enum(serviceSlugs),
    relatedCity: z.enum(citySlugs).optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
