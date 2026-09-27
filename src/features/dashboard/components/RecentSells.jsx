import { Link } from "react-router-dom";
import { Badge, Card } from "../../../components/ui/index.js";
import { ORDER_STATUS, findOption } from "../../../constants/options.js";
import { formatDate, formatNumber } from "../../../utils/format.js";

const SellRow = ({ sell }) => {
  const status = findOption(ORDER_STATUS, sell.status);
  return (
    <tr className="border-t border-slate-50 dark:border-slate-800">
      <td className="py-3 font-semibold text-slate-700 dark:text-slate-200">{sell.customer?.fullname ?? "-"}</td>
      <td className="py-3 text-slate-500 dark:text-slate-400">{sell.package?.name ?? "-"}</td>
      <td className="py-3 text-right tabular-nums text-slate-700 dark:text-slate-200">{formatNumber(sell.totalPrice)}</td>
      <td className="py-3 text-right">
        <Badge color={status?.color}>{status?.label ?? sell.status}</Badge>
      </td>
      <td className="py-3 text-right text-xs text-slate-400 hidden md:table-cell">{formatDate(sell.createdAt)}</td>
    </tr>
  );
};

const RecentSells = ({ sells }) => (
  <Card className="p-6 xl:col-span-2">
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-bold text-slate-800 dark:text-white">ການຂາຍລ່າສຸດ</h2>
      <Link to="/sells" className="text-sm text-blue-600">
        ເບິ່ງທັງໝົດ
      </Link>
    </div>
    <table className="w-full text-sm">
      <tbody>
        {sells.length === 0 && (
          <tr>
            <td className="py-8 text-center text-slate-400">ບໍ່ມີຂໍ້ມູນ</td>
          </tr>
        )}
        {sells.map((sell) => (
          <SellRow key={sell.id} sell={sell} />
        ))}
      </tbody>
    </table>
  </Card>
);

export default RecentSells;
