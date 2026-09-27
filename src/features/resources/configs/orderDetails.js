// Controller 8: OrderDetail (api-pos/src/controller/user/OrderDetail.js)
import { ListOrdered } from "lucide-react";
import { orderDetailService } from "../../../services/orderDetailService.js";
import { ORDER_STATUS } from "../../../constants/options.js";
import { createdAtColumn } from "../../../constants/columns.js";
import { shortId } from "../../../utils/format.js";

/** ລວມ = ຈຳນວນ × ລາຄາສິນຄ້າ */
const calculateTotal = (name, form, lookups) => {
  if (!["productId", "amount"].includes(name)) return null;
  const product = lookups.products?.find((x) => x.product_id === form.productId);
  if (!product || !form.amount) return null;
  return { total: Number(form.amount) * product.productPrice };
};

export default {
  key: "orderDetails",
  permission: "orderDetail", // ສິດໃນ api-pos (config/permissions.js)
  group: "ຂາຍໜ້າຮ້ານ",
  path: "/order-details",
  title: "ລາຍລະອຽດອໍເດີ",
  icon: ListOrdered,
  idKey: "ordrd_id",
  api: "/order/detail/getall",
  crud: {
    list: orderDetailService.getAll,
    getOne: orderDetailService.getOne,
    create: orderDetailService.insert,
    update: orderDetailService.update,
    remove: orderDetailService.remove,
  },
  searchPlaceholder: "ຄົ້ນຫາສະຖານະ",
  filters: [
    { name: "orderId", label: "ອໍເດີ", source: "orders" },
    { name: "status", label: "ສະຖານະ", options: ORDER_STATUS },
  ],
  columns: [
    { key: "order", label: "ອໍເດີ", render: (r) => `#${shortId(r.orderId)}`, strong: true },
    { key: "productId", label: "ສິນຄ້າ", lookup: "products" },
    { key: "amount", label: "ຈຳນວນ", type: "number" },
    { key: "total", label: "ລວມ", type: "money" },
    { key: "status", label: "ສະຖານະ", type: "badge", options: ORDER_STATUS },
    createdAtColumn,
  ],
  fields: [
    { name: "orderId", label: "ອໍເດີ", type: "select", source: "orders", required: true },
    { name: "productId", label: "ສິນຄ້າ", type: "select", source: "products", required: true },
    { name: "amount", label: "ຈຳນວນ", type: "number", required: true },
    { name: "total", label: "ລວມ", type: "number", required: true, hint: "ຄິດໄລ່ອັດຕະໂນມັດ = ຈຳນວນ × ລາຄາສິນຄ້າ" },
    { name: "status", label: "ສະຖານະ", type: "select", options: ORDER_STATUS, required: true, default: "await" },
  ],
  onFieldChange: calculateTotal,
};
