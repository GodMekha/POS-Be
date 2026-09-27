/** Date → "YYYY-MM" */
export const toMonthKey = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

/** 12 ເດືອນລ່າສຸດ (ເກົ່າ → ໃໝ່) ເປັນ "YYYY-MM" */
export const lastMonths = (count = 12, now = new Date()) => {
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(start);
    date.setMonth(start.getMonth() - (count - 1 - i));
    return toMonthKey(date);
  });
};

/** "2026-09" → "09/26" */
export const monthLabel = (monthKey) => `${monthKey.slice(5)}/${monthKey.slice(2, 4)}`;
