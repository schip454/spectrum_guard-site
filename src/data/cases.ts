/**
 * Кейсы — ТОЛЬКО обезличенные реальные. Пока контента нет (TODO:CONTENT).
 * Не выдумывать ситуации, города и цифры (CASES_ENABLED управляет показом).
 */
export interface CaseItem {
  title: string;
  service?: string;
  city?: string;
  summary: string; // что было, что сделали, результат — без раскрытия личных данных
  date?: string;
}

export const cases: CaseItem[] = [
  // TODO:CONTENT — добавить обезличенные кейсы, когда будут согласованы.
];
