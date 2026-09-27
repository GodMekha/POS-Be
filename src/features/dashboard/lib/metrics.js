/**
 * ການຄິດໄລ່ຂອງ Dashboard (pure function)
 */
import { ORDER_STATUS, LOW_STOCK_THRESHOLD } from "../../../constants/options.js";
import { toMonthKey } from "../../../utils/date.js";

const CANCELLED = "cancel";

/** ລວມຍອດ totalPrice ຕໍ່ເດືອນ (ບໍ່ນັບລາຍການທີ່ຍົກເລີກ) */
export const sumByMonth = (rows, months) => {
  const totals = Object.fromEntries(months.map((m) => [m, 0]));
  rows
    .filter((row) => row.status !== CANCELLED)
    .forEach((row) => {
      const month = toMonthKey(row.createdAt);
      if (month in totals) totals[month] += Number(row.totalPrice || 0);
    });
  return months.map((m) => totals[m]);
};

/** ຈຳນວນອໍເດີແຍກຕາມສະຖານະ (ລຳດັບຕາມ ORDER_STATUS) */
export const countByStatus = (orders) =>
  ORDER_STATUS.map((status) => orders.filter((order) => order.status === status.value).length);

/** ສິນຄ້າໃກ້ໝົດ ລຽງຈາກນ້ອຍຫາໃຫຍ່ */
export const findLowStock = (products, limit = 6) =>
  products
    .filter((product) => product.productQty <= LOW_STOCK_THRESHOLD)
    .sort((a, b) => a.productQty - b.productQty)
    .slice(0, limit);

/** ລາຍຮັບເດືອນລ່າສຸດຂອງທຸກ series */
export const latestMonthRevenue = (series) => series.reduce((sum, s) => sum + (s.data.at(-1) ?? 0), 0);
