import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import { Package, UserRound, ShoppingCart, BadgeDollarSign, Truck, Warehouse, AlertTriangle } from "lucide-react";
import {
  normalizeList, productService, customerService, orderService, sellService, supplyService, inventoryService,
} from "../../../service";
import { useOrderList, useSellList, useProductList } from "../../../hooks";
import { ORDER_STATUS } from "../../../config/resources";
import { useTheme } from "../../../config/theme/ThemeContext";
import { Badge, Card, ErrorBox, fmtDate, fmtNumber } from "../../../components/ui";

// getAll?limit=1 → totalPage == ຈຳນວນທັງໝົດ
const count = (service) => service.getAll({ limit: 1 }).then((d) => normalizeList(d).totalPage || 0).catch(() => null);
const ALL = { limit: 1000 };

const STATS = [
  { key: "products", label: "ສິນຄ້າ", service: productService, icon: Package, to: "/products", color: "from-blue-500 to-blue-600" },
  { key: "customers", label: "ລູກຄ້າ", service: customerService, icon: UserRound, to: "/customers", color: "from-emerald-500 to-emerald-600" },
  { key: "orders", label: "ອໍເດີ", service: orderService, icon: ShoppingCart, to: "/orders", color: "from-amber-500 to-orange-500" },
  { key: "sells", label: "ການຂາຍແພັກເກັດ", service: sellService, icon: BadgeDollarSign, to: "/sells", color: "from-purple-500 to-fuchsia-500" },
  { key: "supplies", label: "ຜູ້ສະໜອງ", service: supplyService, icon: Truck, to: "/supplies", color: "from-cyan-500 to-sky-500" },
  { key: "inventories", label: "ວັດຖຸດິບ", service: inventoryService, icon: Warehouse, to: "/inventories", color: "from-rose-500 to-pink-500" },
];

const monthKey = (d) => { const x = new Date(d); return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}`; };
const last12 = () => {
  const out = []; const d = new Date(); d.setDate(1);
  for (let i = 11; i >= 0; i--) { const x = new Date(d); x.setMonth(d.getMonth() - i); out.push(monthKey(x)); }
  return out;
};

const Dashboard = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [counts, setCounts] = useState({});
  // ດຶງຂໍ້ມູນຜ່ານ hook ຂອງແຕ່ລະ controller
  const { rows: orders, error } = useOrderList(ALL);
  const { rows: sells } = useSellList(ALL);
  const { rows: products } = useProductList(ALL);

  useEffect(() => {
    STATS.forEach((s) => count(s.service).then((n) => setCounts((c) => ({ ...c, [s.key]: n }))));
  }, []);

  const months = useMemo(() => last12(), []);
  const series = useMemo(() => {
    const sum = (rows) => {
      const m = Object.fromEntries(months.map((k) => [k, 0]));
      rows.filter((r) => r.status !== "cancel").forEach((r) => { const k = monthKey(r.createdAt); if (k in m) m[k] += Number(r.totalPrice || 0); });
      return months.map((k) => m[k]);
    };
    return [
      { name: "ອໍເດີ", data: sum(orders) },
      { name: "ຂາຍແພັກເກັດ", data: sum(sells) },
    ];
  }, [orders, sells, months]);

  const statusCounts = ORDER_STATUS.map((s) => orders.filter((o) => o.status === s.value).length);
  const lowStock = products.filter((p) => p.productQty <= 10).sort((a, b) => a.productQty - b.productQty).slice(0, 6);
  const recent = sells.slice(0, 6);
  const revenue = series[0].data.at(-1) + series[1].data.at(-1);

  const axis = { labels: { style: { colors: dark ? "#94a3b8" : "#64748b" } } };
  const lineOpts = {
    chart: { type: "area", toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
    theme: { mode: dark ? "dark" : "light" },
    colors: ["#2563eb", "#a855f7"],
    stroke: { curve: "smooth", width: 3 },
    fill: { type: "gradient", gradient: { opacityFrom: 0.35, opacityTo: 0.02 } },
    dataLabels: { enabled: false },
    grid: { borderColor: dark ? "#1e293b" : "#f1f5f9", strokeDashArray: 4 },
    xaxis: { categories: months.map((m) => m.slice(5) + "/" + m.slice(2, 4)), ...axis },
    yaxis: { labels: { ...axis.labels, formatter: (v) => fmtNumber(Math.round(v)) } },
    legend: { position: "top", horizontalAlign: "right", labels: { colors: dark ? "#cbd5e1" : "#334155" } },
    tooltip: { y: { formatter: (v) => fmtNumber(v) } },
  };
  const donutOpts = {
    labels: ORDER_STATUS.map((s) => s.label),
    colors: ["#f59e0b", "#3b82f6", "#10b981", "#ef4444"],
    chart: { fontFamily: "inherit", background: "transparent" },
    theme: { mode: dark ? "dark" : "light" },
    legend: { position: "bottom", labels: { colors: dark ? "#cbd5e1" : "#334155" } },
    dataLabels: { enabled: false },
    stroke: { colors: [dark ? "#0f172a" : "#fff"] },
    plotOptions: { pie: { donut: { size: "70%", labels: { show: true, total: { show: true, label: "ທັງໝົດ", color: dark ? "#94a3b8" : "#64748b" } } } } },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">ພາບລວມ</h1>
          <p className="text-sm text-slate-400">ຂໍ້ມູນສົດຈາກ api-pos</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">ລາຍຮັບເດືອນນີ້ (ອໍເດີ + ແພັກເກັດ)</p>
          <p className="text-2xl font-bold text-blue-600 tabular-nums">{fmtNumber(revenue)}</p>
        </div>
      </div>

      <ErrorBox>{error}</ErrorBox>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {STATS.map((s) => (
          <Link key={s.key} to={s.to} className="group">
            <Card className="p-5 h-full transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center shadow-sm`}>
                <s.icon size={20} />
              </div>
              <p className="mt-4 text-2xl font-bold text-slate-800 dark:text-white tabular-nums">
                {counts[s.key] === undefined ? "…" : counts[s.key] === null ? "–" : fmtNumber(counts[s.key])}
              </p>
              <p className="text-sm text-slate-400">{s.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <Card className="p-6 xl:col-span-2">
          <h2 className="font-bold text-slate-800 dark:text-white">ຍອດຂາຍ 12 ເດືອນ</h2>
          <Chart type="area" height={300} options={lineOpts} series={series} />
        </Card>
        <Card className="p-6">
          <h2 className="font-bold text-slate-800 dark:text-white mb-2">ສະຖານະອໍເດີ</h2>
          <Chart type="donut" height={300} options={donutOpts} series={statusCounts} />
        </Card>
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <Card className="p-6 xl:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-slate-800 dark:text-white">ການຂາຍລ່າສຸດ</h2>
            <Link to="/sells" className="text-sm text-blue-600">ເບິ່ງທັງໝົດ</Link>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {recent.length === 0 && <tr><td className="py-8 text-center text-slate-400">ບໍ່ມີຂໍ້ມູນ</td></tr>}
              {recent.map((s) => {
                const st = ORDER_STATUS.find((x) => x.value === s.status);
                return (
                  <tr key={s.id} className="border-t border-slate-50 dark:border-slate-800">
                    <td className="py-3 font-semibold text-slate-700 dark:text-slate-200">{s.customer?.fullname ?? "-"}</td>
                    <td className="py-3 text-slate-500">{s.package?.name ?? "-"}</td>
                    <td className="py-3 text-right tabular-nums text-slate-700 dark:text-slate-200">{fmtNumber(s.totalPrice)}</td>
                    <td className="py-3 text-right"><Badge color={st?.color}>{st?.label ?? s.status}</Badge></td>
                    <td className="py-3 text-right text-xs text-slate-400 hidden md:table-cell">{fmtDate(s.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
        <Card className="p-6">
          <h2 className="flex items-center gap-2 font-bold text-slate-800 dark:text-white mb-4">
            <AlertTriangle size={18} className="text-amber-500" /> ສິນຄ້າໃກ້ໝົດ (≤ 10)
          </h2>
          <ul className="space-y-3">
            {lowStock.length === 0 && <li className="text-sm text-slate-400">ບໍ່ມີ</li>}
            {lowStock.map((p) => (
              <li key={p.product_id} className="flex items-center gap-3">
                {p.image ? <img src={p.image} alt="" className="w-9 h-9 rounded-lg object-cover" /> : <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800" />}
                <span className="flex-1 text-sm text-slate-700 dark:text-slate-200 truncate">{p.productName}</span>
                <Badge color={p.productQty <= 0 ? "red" : "amber"}>{p.productQty}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
