import { test, expect, type Page } from '@playwright/test';

const isDesktop = (page: Page) => page.viewportSize()!.width >= 1024;

/** Собрать критичные ошибки консоли и page errors. */
function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(String(e)));
  return errors;
}

const KEY_PAGES = ['/', '/uslugi/', '/uslugi/lichnaya-ohrana/', '/uslugi/perevozka-cennyh-gruzov/', '/moskva/', '/goroda/', '/voprosy/', '/otzyvy/', '/kontakty/'];

// Гео-подсказка — модалка при первом визите; в тестах её отключаем (выбор города уже сделан),
// чтобы оверлей не мешал кликам. Cookie-баннер не трогаем (его проверяет отдельный тест).
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    try {
      localStorage.setItem('sg-city', 'skip');
    } catch {}
  });
});

test.describe('Дымовые проверки + консоль', () => {
  for (const path of KEY_PAGES) {
    test(`страница ${path} грузится без ошибок консоли`, async ({ page }) => {
      const errors = trackErrors(page);
      const resp = await page.goto(path, { waitUntil: 'networkidle' });
      expect(resp?.status(), `HTTP статус ${path}`).toBeLessThan(400);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page).toHaveTitle(/Spectrum Guard/i);
      expect(errors, `ошибки консоли на ${path}: ${errors.join(' | ')}`).toHaveLength(0);
    });
  }
});

test('главная: скриншот первого экрана', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await testInfo.attach(`home-${testInfo.project.name}`, {
    body: await page.screenshot({ fullPage: false }),
    contentType: 'image/png',
  });
});

test('кликабельность сайта не заблокирована (регресс лайтбокса)', async ({ page }) => {
  await page.goto('/uslugi/lichnaya-ohrana/');
  // Если бы оверлей лайтбокса перехватывал клики, переход бы не сработал.
  const crumb = page.getByRole('link', { name: 'Услуги', exact: true }).first();
  await crumb.click();
  await expect(page).toHaveURL(/\/uslugi\/$/);
});

test('лайтбокс открывается и закрывается', async ({ page }) => {
  await page.goto('/moskva/');
  const lightbox = page.locator('[data-lightbox]');
  await expect(lightbox).toBeHidden();
  // Кликаем первую картинку галереи (внутри [data-zoom]).
  const firstImg = page.locator('[data-zoom] img').first();
  await firstImg.scrollIntoViewIfNeeded();
  await firstImg.click();
  await expect(lightbox).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(lightbox).toBeHidden();
});

test('баннер cookie: принять — скрывается и пишет согласие', async ({ page }) => {
  await page.goto('/');
  const cookie = page.locator('[data-cookie]');
  await expect(cookie).toBeVisible();
  await page.getByRole('button', { name: 'Принять' }).click();
  await expect(cookie).toBeHidden();
  const consent = await page.evaluate(() => localStorage.getItem('sg-cookie-consent'));
  expect(consent).toBe('granted');
});

test.describe('Навигация (десктоп)', () => {
  test.skip(({ page }) => !isDesktop(page), 'десктопное меню');
  test('Услуги → /uslugi/', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Основная навигация' }).getByRole('link', { name: 'Услуги' }).click();
    await expect(page).toHaveURL(/\/uslugi\/$/);
    await expect(page.locator('h1')).toContainText('Что мы делаем');
  });
});

test.describe('Форма заявки', () => {
  test('маска телефона форматирует ввод', async ({ page }) => {
    await page.goto('/kontakty/');
    const form = page.locator('form[data-lead-form]:has([data-method-phone])').first();
    await form.locator('input[name="name"]').fill('Тест');
    const contact = form.locator('[data-contact]');
    await contact.click();
    await contact.pressSequentially('9001234567');
    await expect(contact).toHaveValue('+7 (900) 123-45-67');
  });

  test('переключение на Telegram очищает и меняет поле', async ({ page }) => {
    await page.goto('/kontakty/');
    const form = page.locator('form[data-lead-form]:has([data-method-phone])').first();
    const contact = form.locator('[data-contact]');
    await contact.pressSequentially('9001234567');
    await form.locator('[data-method-tg]').check();
    await expect(contact).toHaveValue('');
    await expect(contact).toHaveAttribute('placeholder', /@username/);
  });

  test('без согласия форма не отправляется (нативная валидация)', async ({ page }) => {
    await page.goto('/kontakty/');
    const form = page.locator('form[data-lead-form]:has([data-method-phone])').first();
    await form.locator('input[name="name"]').fill('Тест');
    await form.locator('[data-contact]').pressSequentially('9001234567');
    // НЕ ставим галочку согласия
    await form.locator('button[type="submit"]').click();
    const consent = form.locator('input[name="consent"]');
    const valid = await consent.evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(valid).toBe(false);
  });

  test('валидная отправка проходит JS-путь (тост)', async ({ page }) => {
    await page.goto('/kontakty/');
    const form = page.locator('form[data-lead-form]:has([data-method-phone])').first();
    await form.locator('input[name="name"]').fill('Тест');
    await form.locator('[data-contact]').pressSequentially('9001234567');
    await form.locator('input[name="consent"]').check();
    await form.locator('button[type="submit"]').click();
    // Бэкенда на preview нет → ожидаем тост (успех или ошибка доставки), но не зависание.
    await expect(page.locator('[data-toast]')).toBeVisible({ timeout: 10_000 });
  });
});
