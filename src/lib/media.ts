/**
 * Реестр медиа. Грейженые мастера лежат в src/assets/media/**.webp и оптимизируются
 * astro:assets при сборке (avif/webp, ресайз, нулевой CLS). Ключ — путь от media/,
 * напр. 'hero/msk-kotelnicheskaya-sunset-hero.webp'.
 */
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/media/**/*.{webp,jpg,jpeg,png}', {
  eager: true,
});

const map = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(files)) {
  const key = path.replace(/^.*\/assets\/media\//, '');
  map.set(key, mod.default);
}

/** Вернуть метаданные изображения по ключу (или undefined). */
export function getMedia(key?: string | null): ImageMetadata | undefined {
  if (!key) return undefined;
  return map.get(key);
}

/** Список ключей в папке (напр. 'ekaterinburg') — для галерей/ротации. */
export function mediaInFolder(folder: string): string[] {
  const prefix = folder.replace(/\/$/, '') + '/';
  return [...map.keys()].filter((k) => k.startsWith(prefix)).sort();
}
