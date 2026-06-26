/// <reference path="../.astro/types.d.ts" />

interface Window {
  /** Загрузчик аналитики, вызывается после согласия в баннере cookie. */
  sgLoadAnalytics?: () => void;
  __sgAnalyticsLoaded?: boolean;
}
