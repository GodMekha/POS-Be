import { AlertTriangle } from "lucide-react";
import { Badge, Card } from "../../../components/ui/index.js";
import { LOW_STOCK_THRESHOLD } from "../../../constants/options.js";

const LowStockList = ({ products }) => (
  <Card className="p-6">
    <h2 className="flex items-center gap-2 font-bold text-slate-800 dark:text-white mb-4">
      <AlertTriangle size={18} className="text-amber-500" /> ສິນຄ້າໃກ້ໝົດ (≤ {LOW_STOCK_THRESHOLD})
    </h2>
    <ul className="space-y-3">
      {products.length === 0 && <li className="text-sm text-slate-400">ບໍ່ມີ</li>}
      {products.map((product) => (
        <li key={product.product_id} className="flex items-center gap-3">
          {product.image ? (
            <img src={product.image} alt="" className="w-9 h-9 rounded-lg object-cover" />
          ) : (
            <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800" />
          )}
          <span className="flex-1 text-sm text-slate-700 dark:text-slate-200 truncate">{product.productName}</span>
          <Badge color={product.productQty <= 0 ? "red" : "amber"}>{product.productQty}</Badge>
        </li>
      ))}
    </ul>
  </Card>
);

export default LowStockList;
