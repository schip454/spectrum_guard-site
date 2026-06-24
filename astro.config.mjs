// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Канонический домен — источник правды для абсолютных URL, og, sitemap, Schema.org.
export const SITE = 'https://spectrumguard.ru';

// База пути. На проде (reg.ru, корень домена) — '/'. Для превью на GitHub Pages
// (подпапка /spectrum_guard-site/) задаётся через env SITE_BASE при сборке.
const BASE = process.env.SITE_BASE || '/';

export default defineConfig({
  site: SITE,
  base: BASE,
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
