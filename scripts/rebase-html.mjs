/**
 * Превью на GitHub Pages: сайт отдаётся из подпапки (/spectrum_guard-site/), а внутренние
 * ссылки в коде — корневые абсолютные (/moskva/...). Astro префиксует СВОИ ассеты базой
 * сам, но строковые href/src/action в разметке не трогает. Этот скрипт после сборки
 * добавляет базу к таким ссылкам.
 *
 * Использование: SITE_BASE=/spectrum_guard-site node scripts/rebase-html.mjs
 * Идемпотентно: ссылки, уже начинающиеся с базы, не трогаются. На проде (base=/) — no-op.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = (process.env.SITE_BASE || '/').replace(/\/+$/, ''); // '' или '/spectrum_guard-site'
const distDir = resolve(fileURLToPath(new URL('../dist', import.meta.url)));

if (!base) {
  console.log('rebase-html: SITE_BASE пуст — пропуск (корневой деплой).');
  process.exit(0);
}

/** Рекурсивный обход .html. */
async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (entry.name.endsWith('.html')) yield p;
  }
}

// Префиксуем только href/src/action, начинающиеся с одиночного «/».
// Пропускаем: //host (протокол-относительные), уже базированные, чистые якоря.
const attrRe = /\b(href|src|action)="(\/[^"]*)"/g;

function rebaseValue(val) {
  if (val.startsWith('//')) return val; // протокол-относительная — внешняя
  if (val === base || val.startsWith(base + '/')) return val; // уже с базой (ассеты Astro)
  return base + val;
}

let files = 0;
let edits = 0;
for await (const file of walk(distDir)) {
  const html = await readFile(file, 'utf-8');
  let n = 0;
  const out = html.replace(attrRe, (_m, attr, val) => {
    const rebased = rebaseValue(val);
    if (rebased !== val) n++;
    return `${attr}="${rebased}"`;
  });
  if (n > 0) {
    await writeFile(file, out);
    edits += n;
    files++;
  }
}
console.log(`rebase-html: база «${base}» применена — ${edits} ссылок в ${files} файлах.`);
