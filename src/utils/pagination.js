export const ELLIPSIS = "…";

/**
 * ສ້າງເລກໜ້າ: buildPageNumbers(5, 20) → [1, "…", 4, 5, 6, "…", 20]
 */
export const buildPageNumbers = (page, totalPage) => {
  if (totalPage <= 7) return Array.from({ length: totalPage }, (_, i) => i + 1);

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPage - 1, page + 1);
  const pages = [1];
  if (start > 2) pages.push(ELLIPSIS);
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < totalPage - 1) pages.push(ELLIPSIS);
  pages.push(totalPage);
  return pages;
};
