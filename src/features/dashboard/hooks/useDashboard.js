import { useMemo } from "react";
import { useList } from "../../../hooks/common/useList.js";
import { usePermission } from "../../../hooks/common/usePermission.js";
import { orderService, productService, sellService } from "../../../services/index.js";
import { useStatCounts } from "./useStatCounts.js";
import { STAT_CARDS } from "../lib/stats.js";
import { countByStatus, findLowStock, latestMonthRevenue, sumByMonth } from "../lib/metrics.js";
import { LOOKUP_LIMIT } from "../../../constants/options.js";
import { lastMonths } from "../../../utils/date.js";

const ALL = { limit: LOOKUP_LIMIT };
const RECENT_SELLS = 6;

/**
 * ຂໍ້ມູນທັງໝົດຂອງ Dashboard — ດຶງສະເພາະສ່ວນທີ່ຜູ້ໃຊ້ມີສິດ
 * (useList ກັບ fetcher = null ຈະບໍ່ເອີ້ນ API)
 */
export const useDashboard = () => {
  const { can, hasAnyAccess } = usePermission();
  const access = { order: can("order"), sell: can("sell"), product: can("product") };

  const cards = useMemo(() => STAT_CARDS.filter((card) => can(card.permission)), [can]);
  const counts = useStatCounts(cards);

  const { rows: orders, error } = useList(access.order ? orderService.getAll : null, ALL);
  const { rows: sells } = useList(access.sell ? sellService.getAll : null, ALL);
  const { rows: products } = useList(access.product ? productService.getAll : null, ALL);

  const months = useMemo(() => lastMonths(12), []);

  const salesSeries = useMemo(
    () => [
      { name: "ອໍເດີ", data: sumByMonth(orders, months) },
      { name: "ຂາຍແພັກເກັດ", data: sumByMonth(sells, months) },
    ],
    [orders, sells, months]
  );

  return {
    access,
    hasAnyAccess,
    error,
    cards,
    counts,
    months,
    salesSeries,
    revenue: latestMonthRevenue(salesSeries),
    statusCounts: countByStatus(orders),
    lowStock: findLowStock(products),
    recentSells: sells.slice(0, RECENT_SELLS),
  };
};
