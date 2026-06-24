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
const ACCENT = '#C39A55';
const TEXT = '#ECEEF1';
const MUTED = '#5C626B';

/** Угловая засечка-визир (L-bracket). corner: 1=tl 2=tr 3=bl 4=br. */
function corner(x, y, pos) {
  const c = 26;
  const paths = {
    1: `M0 ${c} V0 H${c}`,
    2: `M${-c} 0 H0 V${c}`,
    3: `M0 ${-c} V0 H${c}`,
    4: `M${-c} 0 H0 V${-c}`,
  };
  return `<path transform="translate(${x},${y})" d="${paths[pos]}" fill="none" stroke="${ACCENT}" stroke-width="2"/>`;
}

/** Знак-«глаз» Spectrum в латунном исполнении. */
function mark(x, y, s, stroke = 1.5) {
  const cx = x + s / 2;
  const cy = y + s / 2;
  const w = s * 0.34; // полуширина глаза
  const h = s * 0.26; // высота века
  return `
    <g transform="translate(${x},${y})">
      <path d="M${s / 2 - w} ${s / 2} Q${s / 2} ${s / 2 - h} ${s / 2 + w} ${s / 2} Q${s / 2} ${s / 2 + h} ${s / 2 - w} ${s / 2} Z"
        fill="none" stroke="${ACCENT}" stroke-width="${stroke}"/>
    </g>
    <circle cx="${cx}" cy="${cy}" r="${s * 0.11}" fill="${ACCENT}"/>
    <circle cx="${cx}" cy="${cy}" r="${s * 0.04}" fill="${BG}"/>`;
}

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="rgba(255,255,255,0.1)"/>
  ${corner(40, 40, 1)}${corner(1160, 40, 2)}${corner(40, 590, 3)}${corner(1160, 590, 4)}
  ${mark(40, 96, 60, 3)}
  <text x="120" y="138" fill="${ACCENT}" font-family="monospace" font-size="22" letter-spacing="6">SPECTRUM GUARD · RU · 8 ГОРОДОВ</text>
  <text x="92" y="320" fill="${TEXT}" font-family="Arial, sans-serif" font-weight="700" font-size="96" letter-spacing="1">Мы заботимся</text>
  <text x="92" y="420" fill="${TEXT}" font-family="Arial, sans-serif" font-weight="700" font-size="96" letter-spacing="1">о вашей безопасности</text>
  <text x="96" y="520" fill="${MUTED}" font-family="Arial, sans-serif" font-size="30">Личная охрана · защита при угрозах · переезд · соседи · мероприятия</text>
</svg>`;

const iconSvg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${BG}"/>
  ${mark(size * 0.16, size * 0.16, size * 0.68, Math.max(2, size / 26))}
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
