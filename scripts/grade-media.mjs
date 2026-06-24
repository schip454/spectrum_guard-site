/**
 * Грейдинг медиа: приводит присланные кадры к единому тёмному холодному «фирменному»
 * тону и кладёт мастера в src/assets/media (дальше их оптимизирует astro:assets → webp/avif).
 *
 * Источник — staging-папка (по умолчанию ./photo_out), та же структура папок.
 * Исключаем _excluded (оружие/дубли). VERIFY-кадр уводим в neutral (без ложного гео-сигнала).
 * _blur-required — это ИИ-кадры без реального человека (см. docs/placement-manifest.md),
 *   блюр не нужен; кладём в media/escort.
 *
 * Запуск: node scripts/grade-media.mjs [srcDir]
 */
import sharp from 'sharp';
import { readdir, mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const srcDir = resolve(process.argv[2] || join(root, 'photo_out'));
const outDir = join(root, 'src/assets/media');

// staging-папка → целевая папка в media. Пропущенные папки не обрабатываем.
const FOLDER_MAP = {
  hero: 'hero',
  ekaterinburg: 'ekaterinburg',
  moskva: 'moskva',
  spb: 'spb',
  novosibirsk: 'novosibirsk',
  neutral: 'neutral',
  '_blur-required': 'escort',
};

const MAX_W = 1280; // исходники не больше — не апскейлим

/** Единый грейд: десатурация, лёгкое затемнение, холодный сдвиг, мягкий контраст. */
function grade(img) {
  return img
    .modulate({ saturation: 0.7, brightness: 0.92 })
    .linear(1.06, -6) // контраст
    // холодный сдвиг: чуть глушим красный, поднимаем синий (сохраняя фото, не дуотон)
    .recomb([
      [0.94, 0.02, 0.0],
      [0.0, 0.97, 0.03],
      [0.02, 0.0, 1.05],
    ]);
}

async function processFile(srcFolder, dstFolder, file) {
  const { name } = parse(file);
  // VERIFY → neutral, без гео-привязки
  let targetFolder = dstFolder;
  let outName = name;
  if (name.includes('VERIFY')) {
    targetFolder = 'neutral';
    outName = 'neutral-waterfront-01';
  }
  const dstFolderAbs = join(outDir, targetFolder);
  if (!existsSync(dstFolderAbs)) await mkdir(dstFolderAbs, { recursive: true });

  const input = await readFile(join(srcDir, srcFolder, file));
  const pipeline = grade(
    sharp(input).rotate().resize({ width: MAX_W, withoutEnlargement: true })
  ).webp({ quality: 82 });
  const buf = await pipeline.toBuffer();
  await writeFile(join(dstFolderAbs, `${outName}.webp`), buf);
  return `${targetFolder}/${outName}.webp`;
}

async function run() {
  if (!existsSync(srcDir)) {
    console.error(`Источник не найден: ${srcDir}`);
    process.exit(1);
  }
  await mkdir(outDir, { recursive: true });
  let count = 0;
  for (const [srcFolder, dstFolder] of Object.entries(FOLDER_MAP)) {
    const abs = join(srcDir, srcFolder);
    if (!existsSync(abs)) continue;
    const files = (await readdir(abs)).filter((f) => /\.(jpe?g|png)$/i.test(f));
    for (const f of files) {
      const out = await processFile(srcFolder, dstFolder, f);
      count++;
      console.log(`  ${srcFolder}/${f} → media/${out}`);
    }
  }
  console.log(`\nГрейд применён к ${count} файлам → ${outDir}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
