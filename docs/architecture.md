# Архитектура

## Структура проекта

```
src/
  data/
    cities.ts        # 8 городов: slug, склонения, регион, флаг локальной фактуры, медиа
    services.ts      # 5 услуг: slug, названия, интент-кластеры, тип Schema, описание
    contacts.ts      # телефон, e-mail, telegram, реквизиты (за флагом)
    cases.ts         # обезличенные кейсы (TODO: контент)
    reviews.ts       # отзывы (TODO: контент)
    nav.ts           # меню, футер
  layouts/
    Base.astro       # <head>, мета, Schema Organization, шапка/подвал, скип-линк
    PageWide.astro   # стандартная контентная обёртка
  components/
    Hero.astro             # первый экран главной (видео-фон + 5 интент-карточек)
    IntentCard.astro       # карточка направления
    ServiceBlock.astro     # переиспользуемый блок услуги (Answer-First + детали)
    CityServiceTemplate.astro  # тело страницы «услуга × город»
    LeadForm.astro         # форма заявки (остров)
    TelegramCTA.astro      # кнопка в Telegram
    CallbackCTA.astro      # обратный звонок
    FaqList.astro          # FAQ + FAQPage schema
    Breadcrumbs.astro      # хлебные крошки + BreadcrumbList schema
    Reviews.astro / CaseList.astro / TrustBlock.astro
    icons/                 # КАСТОМНЫЕ SVG-иконки проекта (не icon-пак)
  pages/
    index.astro                      # /
    uslugi/[service].astro           # /uslugi/{service}/  — хаб услуги (все города)
    [city]/index.astro               # /{city}/            — хаб города (все услуги)
    [city]/[service].astro           # /{city}/{service}/  — гео-страница (40 шт)
    blog/index.astro                 # /blog/
    blog/[slug].astro                # /blog/{slug}/
    o-kompanii.astro  kontakty.astro  otzyvy.astro  ceny.astro
    404.astro
  styles/
    tokens.css       # CSS-переменные из design-spec
    base.css
public/
  robots.txt  sitemap (генерируется)  llms.txt  favicon  /media/...
```

## Модель данных (DRY-ядро)

`src/data/services.ts` — каждая услуга:
```ts
{
  slug: 'lichnaya-ohrana',
  nameNom: 'Личная охрана',
  nameForUrlTitle: 'личная охрана',     // строчными для подстановки в title
  schemaType: 'ProtectiveService',       // serviceType для Schema.org Service
  answerFirst: '...',                    // 40–60 слов: прямой ответ на главный интент
  commercialQueries: [...],              // «личная охрана {город}», «телохранитель {город}»
  problemQueries: [...],                 // информационные/проблемные — для блога и AEO
  sections: [...],                       // что входит, как работаем, кому подходит
}
```

`src/data/cities.ts` — каждый город (склонения обязательны для естественных title/H1):
```ts
{
  slug: 'ekaterinburg',
  nom: 'Екатеринбург',
  prep: 'в Екатеринбурге',   // «личная охрана в Екатеринбурге»
  gen: 'Екатеринбурга',
  region: 'Свердловская область',
  hasLocalProof: true,        // есть локальные фото/кейсы → насыщаем страницу
  media: ['/media/ekb-01.webp', ...],
}
```

Города и склонения (заполнить ровно так):

| slug | nom | prep | gen | hasLocalProof |
|------|-----|------|-----|---------------|
| ekaterinburg | Екатеринбург | в Екатеринбурге | Екатеринбурга | true |
| moskva | Москва | в Москве | Москвы | true |
| sankt-peterburg | Санкт-Петербург | в Санкт-Петербурге | Санкт-Петербурга | true |
| ufa | Уфа | в Уфе | Уфы | false |
| chelyabinsk | Челябинск | в Челябинске | Челябинска | false |
| perm | Пермь | в Перми | Перми | false |
| tyumen | Тюмень | в Тюмени | Тюмени | false |
| novosibirsk | Новосибирск | в Новосибирске | Новосибирска | false |

Услуги (slug → название):

| slug | Название | Бытовая формулировка-вход |
|------|----------|----------------------------|
| lichnaya-ohrana | Личная охрана | личная охрана / телохранитель |
| ohrana-pri-pereezde | Охрана при переезде | переезд от сожителя |
| zashchita-pri-ugrozah | Защита при угрозах | вам угрожают? |
| konflikt-s-sosedyami | Помощь при конфликте с соседями | шумные соседи |
| ohrana-meropriyatiy | Охрана мероприятий | проведение мероприятий |

Геосетка `[city]/[service].astro` генерирует **40 страниц** через `getStaticPaths()` —
декартово произведение `cities × services`. Никакого копипаста.

## Формы и заявки

`LeadForm` отправляет на бессерверный обработчик (шаред-хостинг без Node):
- Вариант A (рекоменд.): отправка через сторонний форм-эндпоинт/почтовый relay по HTTPS,
  который дублирует в e-mail и дёргает Telegram Bot API (`sendMessage` в чат диспетчера).
- Вариант B: лёгкий PHP-скрипт `public/api/lead.php` (шаред поддерживает PHP) → mail() +
  запрос к Telegram Bot API. Токен бота — в серверном конфиге, НЕ в клиентском JS.
- Анти-спам: honeypot-поле + временная метка + rate-limit на стороне обработчика.
  Без видимой капчи на первом шаге (не убивать конверсию).

Три CTA-механики, единый бэкенд приёма:
1. `LeadForm` — имя + способ связи (телефон/telegram) + суть. → e-mail + Telegram-бот.
2. `TelegramCTA` — прямая ссылка `https://t.me/<bot|manager>`.
3. `CallbackCTA` — телефон → «перезвоним». → e-mail + Telegram-бот.

Контакты централизованы в `src/data/contacts.ts` (один корпоративный мобильный, e-mail,
telegram). Меняется в одном месте.

## SEO-инфраструктура (детали — в seo-aeo-spec.md)

- `@astrojs/sitemap` → `sitemap-index.xml`, все 40 гео + хабы + блог.
- `robots.txt`: allow всё, ссылка на sitemap. Закрыть служебное.
- `public/llms.txt` — карта сайта для ИИ-краулеров.
- Каноникал на каждой странице. Хлебные крошки с разметкой везде, кроме главной.
- Единый компонент `<Seo>` в `Base.astro`: title, description, og, twitter, canonical,
  JSON-LD (Organization сайтово; Service/FAQPage/Article/Breadcrumb — на нужных страницах).

## Деплой (reg.ru shared)

- `astro build` локально или в GitHub Actions → артефакт `dist/`.
- Заливка `dist/` на шаред по FTP/SFTP (Actions: `SamKirkland/FTP-Deploy-Action` или аналог).
- `.htaccess`: trailing-slash нормализация, 301 на канонический вид URL, gzip/brotli,
  кэш-заголовки на статику, 404 → `/404.html`.
- PHP-обработчик формы (если вариант B) кладётся рядом, вне `dist`-перезаписи.

## Порядок сборки (поблочно, не нарушать)

1. Токены + `Base.astro` + типографика + сетка (пустой каркас, проверка CWV).
2. `cities.ts` / `services.ts` / `contacts.ts` (данные раньше шаблонов).
3. `CityServiceTemplate` + роут `[city]/[service]` (главный объём — 40 страниц).
4. Хабы: `[city]/index`, `uslugi/[service]`.
5. Главная: `Hero` + `IntentCard` + блоки.
6. Формы и три CTA + бэкенд приёма.
7. Schema.org на всех типах + `<Seo>` + sitemap + robots + llms.txt.
8. Блог (`blog/index`, `blog/[slug]`, контент-коллекция).
9. Служебные: `o-kompanii`, `kontakty`, `otzyvy`, `ceny`, `404`.
10. Трастовый блок (за флагом), кейсы, отзывы — когда придёт контент.
11. Финальный аудит по Definition of Done.
