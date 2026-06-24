// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Канонический домен — источник правды для абсолютных URL, og, sitemap, Schema.org.
export const SITE = 'https://spectrumguard.ru';

export default defineConfig({
  site: SITE,
  // Единый trailing slash на канонический вид URL (см. seo-aeo-spec → «Технические факторы»).
  trailingSlash: 'always',
  build: {
    // Чистые ЧПУ: /{city}/{service}/ → .../index.html
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      // Служебное и 404 в карту не кладём.
      filter: (page) => !page.includes('/404'),
    }),
  ],
  // Ноль тяжёлого JS — острова подключаются точечно в компонентах.
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
