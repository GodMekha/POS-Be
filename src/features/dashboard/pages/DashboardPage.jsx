import { Clock } from "lucide-react";
import LowStockList from "../components/LowStockList.jsx";
import RecentSells from "../components/RecentSells.jsx";
import SalesCharts from "../components/SalesCharts.jsx";
import StatCards from "../components/StatCards.jsx";
import { useDashboard } from "../hooks/useDashboard.js";
import { Card, ErrorBox } from "../../../components/ui/index.js";
import { formatNumber } from "../../../utils/format.js";

/** ຜູ້ໃຊ້ທີ່ລົງທະບຽນໃໝ່ (role general) ຍັງບໍ່ມີສິດ */
const PendingAccess = () => (
  <Card className="p-10 flex flex-col items-center text-center">
    <Clock size={40} className="text-amber-500" />
    <h2 className="mt-3 text-lg font-bold text-slate-800 dark:text-white">ບັນຊີຂອງທ່ານຍັງບໍ່ມີສິດເຂົ້າໃຊ້</h2>
    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">ກະລຸນາຕິດຕໍ່ Super Admin ເພື່ອກຳນົດສິດໃຫ້</p>
  </Card>
);

const DashboardPage = () => {
  const dashboard = useDashboard();
  const { access } = dashboard;
  const showSales = access.order || access.sell;

  if (!dashboard.hasAnyAccess) return <PendingAccess />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">ພາບລວມ</h1>
          <p className="text-sm text-slate-400">ຂໍ້ມູນສົດຈາກ api-pos</p>
        </div>
        {showSales && (
          <div className="text-right">
            <p className="text-xs text-slate-400">ລາຍຮັບເດືອນນີ້ (ອໍເດີ + ແພັກເກັດ)</p>
            <p className="text-2xl font-bold text-blue-600 tabular-nums">{formatNumber(dashboard.revenue)}</p>
          </div>
        )}
      </div>

      <ErrorBox>{dashboard.error}</ErrorBox>

      <StatCards cards={dashboard.cards} counts={dashboard.counts} />

      {showSales && (
        <SalesCharts
          months={dashboard.months}
          salesSeries={dashboard.salesSeries}
          statusCounts={dashboard.statusCounts}
        />
      )}

      <div className="grid xl:grid-cols-3 gap-6">
        {access.sell && <RecentSells sells={dashboard.recentSells} />}
        {access.product && <LowStockList products={dashboard.lowStock} />}
      </div>
    </div>
  );
};

export default DashboardPage;
