# Манифест размещения (media → страницы → слоты)

Точная раскладка: какой файл в какой слот. Пути — от корня архива `spectrum-guard-photos.zip`.
Глобальная обработка (единый тёмный грейд, оружие не использовать) — см. `media-manifest.md`.

Примечание: папка `_blur-required/` — это ИИ-кадры без реального человека, к публикации
допущены. Используются как изображения личной охраны/сопровождения наравне с остальными.

---

## Главная `/`

- **Hero (фон первого экрана):** `hero/msk-kotelnicheskaya-sunset-hero.jpg`
  запасной — `hero/msk-city-rain-hero-alt.jpg`. Затемнение слоем под слоган.
- **5 интент-карточек** (изображение в каждой):
  1. Личная охрана → `_blur-required/escort-walk-client-blur-01.jpg`
  2. Переезд → `_blur-required/escort-indoor-blur-01.jpg`
  3. Вам угрожают → `neutral/neutral-convoy-highway-01.jpg`
  4. Шумные соседи → `neutral/neutral-winter-suvs-01.jpg`  ⚠ копия страницы — только
     законная (фиксация/эскалация/защита клиента); изображение нейтральное.
  5. Проведение мероприятий → `moskva/msk-restoran-moskva-redcarpet-01.jpg`
- **Блок «География» (8 городов):** по одному «фирменному» кадру:
  Екб `ekaterinburg/ekb-tower-vysotsky-01.jpg` · Москва `moskva/msk-mgu-night-01.jpg` ·
  СПб `spb/spb-gazprom-arena-night-01.jpg` · Новосиб `novosibirsk/nsk-tolmachevo-airport-sunset-01.jpg` ·
  Уфа/Челябинск/Пермь/Тюмень — `neutral/` (без узнаваемых ориентиров).
- **«Почему мы»:** `neutral/neutral-penthouse-interior-01.jpg` или `neutral/neutral-convoy-highway-02.jpg`.
- **Кейсы (стрип):** см. раздел «Кейсы» ниже (слот + шаблон, TODO:CONTENT).
- **Отзывы (стрип):** см. раздел «Отзывы» ниже (слот + шаблон, TODO:CONTENT).

## Хабы услуг `/uslugi/{service}/`

- `lichnaya-ohrana` → hero `moskva/msk-city-gwagon-01.jpg`; галерея:
  `_blur-required/escort-walk-client-blur-01.jpg`, `moskva/msk-city-rangerover-01.jpg`,
  `ekaterinburg/ekb-tower-vysotsky-02.jpg`.
- `ohrana-pri-pereezde` → hero `_blur-required/escort-indoor-blur-01.jpg`; доп.
  `_blur-required/escort-indoor-blur-02.jpg`. Копия — защита клиента при переезде.
- `zashchita-pri-ugrozah` → hero `neutral/neutral-convoy-highway-01.jpg`; доп.
  `neutral/neutral-forest-road-gwagon-01.jpg`. Копия — охрана того, кому угрожают.
- `konflikt-s-sosedyami` → hero `neutral/neutral-winter-suvs-02.jpg`. ⚠ Только законная
  копия (фиксация нарушений, законная эскалация, охрана присутствия клиента).
- `ohrana-meropriyatiy` → hero `moskva/msk-restoran-moskva-redcarpet-01.jpg`; доп.
  `moskva/msk-city-gwagon-01.jpg`, `neutral/neutral-cottage-suvs-01.jpg`.

## Хабы городов `/{city}/` и страницы `/{city}/{service}/`

Города с фактурой — крутить кадры из своей папки; без фактуры — из `neutral/`.

- **Екатеринбург** (`ekaterinburg/`, 12 кадров): хаб — `ekb-ploshad-1905-night-01.jpg`;
  услуги — Ельцин-Центр (×3), «Высоцкий» (×3), площадь 1905 (×5), `...-VERIFY.jpg` (проверить).
- **Москва** (`moskva/`, 7): хаб — `msk-mgu-night-01.jpg`; услуги — Москва-Сити (×2),
  МГУ (×4), ресторан «Москва».
- **СПб** (`spb/`, 2 + `neutral/`): хаб — `spb-gazprom-arena-night-01.jpg`; услуги —
  `spb-gazprom-arena-bluelight-01.jpg` + добор из `neutral/`.
- **Новосибирск** (`novosibirsk/`, 4): хаб — `nsk-tolmachevo-airport-sunset-01.jpg`;
  услуги — остальные 3 кадра Толмачёво.
- **Уфа / Челябинск / Пермь / Тюмень** → только `neutral/` (по 2–3 кадра на город,
  не повторять одинаковые на соседних). Без фейковых «местных» подписей.

Распределение `neutral/` (14 кадров), чтобы не было дублей между городами:
набережная-осень (×4), кортеж-трасса (×3), коттедж+авто (×2), зимние с авто (×2),
лесная трасса G-class, пентхаус, подземный переход.

## Служебные

- `/o-kompanii/` → широкий кадр `hero/msk-kotelnicheskaya-sunset-hero.jpg` (верх) +
  `neutral/neutral-convoy-highway-03.jpg`.
- `/kontakty/` → карта (география работы), фото не обязательно; при желании `neutral/`.
- `/otzyvy/`, `/ceny/` → без обязательных фото.

---

## Кейсы — слот и шаблон (НЕ из присланного архива)

Размещение: стрип на главной + блок на страницах услуг/городов + (опц.) `/kejsy/`.
Присланные логи-переписки в кейсы НЕ выносятся. Слот наполняется реальными законными
кейсами — про защиту клиента, обезличенно, без имён/адресов/цен/телефонов.

Шаблон карточки кейса (заполнять реальными данными → `src/data/cases.ts`):
```
{
  service: '<slug услуги>',
  city?: '<город, если не идентифицирует клиента>',
  situation: '<задача по защите клиента — общими словами>',
  action:    '<законная услуга: сопровождение, дежурство, охрана присутствия>',
  result:    '<как обеспечили безопасность клиента>',
}
```
До появления таких кейсов — `<!-- TODO:CONTENT: законные кейсы о защите клиента -->`.

## Отзывы — слот и шаблон

Размещение: стрип на главной + `/otzyvy/`. Schema `Review`/`AggregateRating` — только по
реальным отзывам, без накруток. Отзывы, завязанные на «решили проблему» (визиты к третьим
лицам), не размещаются; собираем и используем отзывы о профессионализме/оперативности по
законным услугам.

Шаблон карточки отзыва (`src/data/reviews.ts`):
```
{
  service: '<slug услуги>',
  rating: 5,
  text: '<текст отзыва о работе по защите клиента>',
  author: 'аноним',   // без реальных имён/аватаров
}
```
До сбора — `<!-- TODO:CONTENT: отзывы по законным услугам -->`.
