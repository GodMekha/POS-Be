// Controller 7: Order (api-pos/src/controller/user/Order.js)
import { ShoppingCart } from "lucide-react";
import { orderService } from "../../../services/orderService.js";
import { CURRENCIES, ORDER_STATUS } from "../../../constants/options.js";
import { createdAtColumn } from "../../../constants/columns.js";
import { shortId } from "../../../utils/format.js";

export default {
  key: "orders",
  permission: "order", // ສິດໃນ api-pos (config/permissions.js)
  group: "ຂາຍໜ້າຮ້ານ",
  path: "/orders",
  title: "ອໍເດີ",
  icon: ShoppingCart,
  idKey: "order_id",
  api: "/order/getall",
  crud: {
    list: orderService.getAll,
    getOne: orderService.getOne,
    create: orderService.insert,
    update: orderService.update,
    changeStatus: orderService.updateStatus,
    remove: orderService.remove,
  },
  statusOptions: ORDER_STATUS,
  searchPlaceholder: "ຄົ້ນຫາສະຖານະ",
  filters: [
    { name: "status", label: "ສະຖານະ", options: ORDER_STATUS },
    { name: "userId", label: "ພະນັກງານ", source: "users" },
  ],
  columns: [
    { key: "order_id", label: "ລະຫັດ", render: (r) => `#${shortId(r.order_id)}`, strong: true },
    { key: "users", label: "ຜູ້ສ້າງ", render: (r) => r.users?.username ?? "-" },
    { key: "details", label: "ລາຍການ", render: (r) => `${r.details?.length ?? 0} ລາຍການ` },
    { key: "totalPrice", label: "ລາຄາລວມ", type: "money" },
    { key: "currency", label: "ສະກຸນເງິນ" },
    { key: "status", label: "ສະຖານະ", type: "badge", options: ORDER_STATUS },
    createdAtColumn,
  ],
  fields: [
    { name: "userId", label: "ພະນັກງານ", type: "select", source: "users", required: true, defaultFromUser: true },
    { name: "totalPrice", label: "ລາຄາລວມ", type: "number", required: true },
    { name: "currency", label: "ສະກຸນເງິນ", type: "select", options: CURRENCIES, required: true, default: "LAK" },
    { name: "status", label: "ສະຖານະ", type: "select", options: ORDER_STATUS, required: true, default: "await" },
  ],
  links: [{ label: "ລາຍລະອຽດ", to: (r) => `/order-details?orderId=${r.order_id}` }],
};
