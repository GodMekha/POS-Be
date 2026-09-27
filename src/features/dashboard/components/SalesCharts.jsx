import Chart from "react-apexcharts";
import { Card } from "../../../components/ui/index.js";
import { useTheme } from "../../../hooks/common/useTheme.js";
import { buildSalesChartOptions, buildStatusChartOptions } from "../lib/chartOptions.js";

const CHART_HEIGHT = 300;

const SalesCharts = ({ months, salesSeries, statusCounts }) => {
  const { isDark } = useTheme();
  return (
    <div className="grid xl:grid-cols-3 gap-6">
      <Card className="p-6 xl:col-span-2">
        <h2 className="font-bold text-slate-800 dark:text-white">ຍອດຂາຍ 12 ເດືອນ</h2>
        <Chart type="area" height={CHART_HEIGHT} options={buildSalesChartOptions(months, isDark)} series={salesSeries} />
      </Card>
      <Card className="p-6">
        <h2 className="font-bold text-slate-800 dark:text-white mb-2">ສະຖານະອໍເດີ</h2>
        <Chart type="donut" height={CHART_HEIGHT} options={buildStatusChartOptions(isDark)} series={statusCounts} />
      </Card>
    </div>
  );
};

export default SalesCharts;
