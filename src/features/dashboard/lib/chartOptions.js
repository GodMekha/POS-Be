/**
 * ຕັ້ງຄ່າ ApexCharts ຕາມ theme
 */
import { ORDER_STATUS } from "../../../constants/options.js";
import { formatNumber } from "../../../utils/format.js";
import { monthLabel } from "../../../utils/date.js";

const STATUS_COLORS = { amber: "#f59e0b", blue: "#3b82f6", green: "#10b981", red: "#ef4444" };

const palette = (isDark) => ({
  mode: isDark ? "dark" : "light",
  axis: isDark ? "#94a3b8" : "#64748b",
  legend: isDark ? "#cbd5e1" : "#334155",
  grid: isDark ? "#1e293b" : "#f1f5f9",
  surface: isDark ? "#0f172a" : "#fff",
});

const baseChart = { fontFamily: "inherit", background: "transparent" };

export const buildSalesChartOptions = (months, isDark) => {
  const c = palette(isDark);
  const axisLabels = { style: { colors: c.axis } };
  return {
    chart: { ...baseChart, type: "area", toolbar: { show: false } },
    theme: { mode: c.mode },
    colors: ["#2563eb", "#a855f7"],
    stroke: { curve: "smooth", width: 3 },
    fill: { type: "gradient", gradient: { opacityFrom: 0.35, opacityTo: 0.02 } },
    dataLabels: { enabled: false },
    grid: { borderColor: c.grid, strokeDashArray: 4 },
    xaxis: { categories: months.map(monthLabel), labels: axisLabels },
    yaxis: { labels: { ...axisLabels, formatter: (v) => formatNumber(Math.round(v)) } },
    legend: { position: "top", horizontalAlign: "right", labels: { colors: c.legend } },
    tooltip: { y: { formatter: (v) => formatNumber(v) } },
  };
};

export const buildStatusChartOptions = (isDark) => {
  const c = palette(isDark);
  return {
    chart: baseChart,
    labels: ORDER_STATUS.map((s) => s.label),
    colors: ORDER_STATUS.map((s) => STATUS_COLORS[s.color]),
    theme: { mode: c.mode },
    legend: { position: "bottom", labels: { colors: c.legend } },
    dataLabels: { enabled: false },
    stroke: { colors: [c.surface] },
    plotOptions: {
      pie: { donut: { size: "70%", labels: { show: true, total: { show: true, label: "ທັງໝົດ", color: c.axis } } } },
    },
  };
};
