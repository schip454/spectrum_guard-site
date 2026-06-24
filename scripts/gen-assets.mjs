/**
 * Генерация растровых ассетов из SVG через sharp: og-image, apple-touch-icon,
 * png-фавикон. Запуск: `node scripts/gen-assets.mjs`. Это плейсхолдеры в фирменном
 * стиле (тёмная база + латунная сигнатура); финальный OG с реальным кадром — TODO:CONTENT.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = resolve(__dirname, '../public');

const BG = '#0B0D10';
const SURFACE = '#12151A';
const ACCENT = '#C39A55';
const TEXT = '#ECEEF1';
const MUTED = '#5C626B';

/** Сигнатурный знак-визир (угловые засечки + точка). */
function mark(x, y, s, stroke = 1.5) {
  const u = s / 28;
  const c = 6 * u; // длина засечки
  return `
    <g transform="translate(${x},${y})" fill="none" stroke="${ACCENT}" stroke-width="${stroke}">
      <path d="M0 ${c} V0 H${c}"/>
      <path d="M${s - c} 0 H${s} V${c}"/>
      <path d="M${s} ${s - c} V${s} H${s - c}"/>
      <path d="M${c} ${s} H0 V${s - c}"/>
    </g>
    <circle cx="${x + s / 2}" cy="${y + s / 2}" r="${s * 0.09}" fill="${ACCENT}"/>`;
}

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="rgba(255,255,255,0.1)"/>
  ${mark(40, 40, 40, 2)}
  ${mark(1120, 40, 40, 2)}
  ${mark(40, 550, 40, 2)}
  ${mark(1120, 550, 40, 2)}
  <text x="96" y="150" fill="${ACCENT}" font-family="monospace" font-size="22" letter-spacing="6">SPECTRUM GUARD · RU · 8 ГОРОДОВ</text>
  <text x="92" y="320" fill="${TEXT}" font-family="Arial, sans-serif" font-weight="700" font-size="96" letter-spacing="1">Мы заботимся</text>
  <text x="92" y="420" fill="${TEXT}" font-family="Arial, sans-serif" font-weight="700" font-size="96" letter-spacing="1">о вашей безопасности</text>
  <text x="96" y="520" fill="${MUTED}" font-family="Arial, sans-serif" font-size="30">Личная охрана · защита при угрозах · переезд · соседи · мероприятия</text>
</svg>`;

const iconSvg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${SURFACE}"/>
  ${mark(size * 0.18, size * 0.18, size * 0.64, Math.max(2, size / 40))}
</svg>`;

async function run() {
  await sharp(Buffer.from(ogSvg)).png().toFile(resolve(pub, 'og-default.png'));
  await sharp(Buffer.from(iconSvg(180))).png().toFile(resolve(pub, 'apple-touch-icon.png'));
  await sharp(Buffer.from(iconSvg(512))).png().toFile(resolve(pub, 'icon-512.png'));
  await sharp(Buffer.from(iconSvg(32))).png().toFile(resolve(pub, 'favicon-32.png'));
  console.log('Assets generated: og-default.png, apple-touch-icon.png, icon-512.png, favicon-32.png');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
