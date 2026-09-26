// Controller 7: Order  (api-pos/src/controller/user/Order.js)
import { orderService } from "../../service/orderService.js";
import { ShoppingCart } from "lucide-react";
import { ORDER_STATUS, CURRENCIES, short, createdAt } from "../../config/constants.js";

const ordersConfig = {
  key: "orders",
  group: "ຂາຍໜ້າຮ້ານ",
  path: "/orders",
  title: "ອໍເດີ",
  icon: ShoppingCart,
  idKey: "order_id",
  api: "/order/getall",
  // ຟັງຊັນ CRUD ມາຈາກ src/service/orderService.js
  crud: {
    list: orderService.getAll,
    getOne: orderService.getOne,
    create: orderService.insert,
    update: orderService.update,
    status: orderService.updateStatus,
    remove: orderService.remove,
  },
  statusOptions: ORDER_STATUS,
  searchPlaceholder: "ຄົ້ນຫາສະຖານະ",
  filters: [
    { name: "status", label: "ສະຖານະ", options: ORDER_STATUS },
    { name: "userId", label: "ພະນັກງານ", source: "users" },
  ],
  columns: [
    { key: "order_id", label: "ລະຫັດ", render: (r) => `#${short(r.order_id)}`, strong: true },
    { key: "users", label: "ຜູ້ສ້າງ", render: (r) => r.users?.username ?? "-" },
    { key: "details", label: "ລາຍການ", render: (r) => `${r.details?.length ?? 0} ລາຍການ` },
    { key: "totalPrice", label: "ລາຄາລວມ", type: "money" },
    { key: "currency", label: "ສະກຸນເງິນ" },
    { key: "status", label: "ສະຖານະ", type: "badge", options: ORDER_STATUS },
    createdAt,
  ],
  fields: [
    { name: "userId", label: "ພະນັກງານ", type: "select", source: "users", required: true, defaultFromUser: true },
    { name: "totalPrice", label: "ລາຄາລວມ", type: "number", required: true },
    { name: "currency", label: "ສະກຸນເງິນ", type: "select", options: CURRENCIES, required: true, default: "LAK" },
    { name: "status", label: "ສະຖານະ", type: "select", options: ORDER_STATUS, required: true, default: "await" },
  ],
  links: [{ label: "ລາຍລະອຽດ", to: (r) => `/order-details?orderId=${r.order_id}` }],
};

export default ordersConfig;
