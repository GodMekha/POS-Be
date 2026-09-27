const isEmpty = (value) => value === null || value === undefined || value === "";

/** 1234567 → "1,234,567" */
export const formatNumber = (value) => (isEmpty(value) ? "-" : Number(value).toLocaleString("en-US"));

/** ISO date → "27/09/2026, 14:58" */
export const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/** uuid → 8 ຕົວອັກສອນທຳອິດ */
export const shortId = (id) => (id ? String(id).slice(0, 8) : "-");

/** ສະແດງຄ່າທົ່ວໄປ: ຄ່າວ່າງ → "-" */
export const displayValue = (value) => (isEmpty(value) ? "-" : String(value));

export { isEmpty };

/** ຄືກັບ formatNumber ແຕ່ຄ່າວ່າງ → "0" (ໃຊ້ໃນ label ຂອງ dropdown) */
export const formatAmount = (value) => Number(value || 0).toLocaleString("en-US");
