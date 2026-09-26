// Controller 8: OrderDetail  (api-pos/src/controller/user/OrderDetail.js)
import { orderDetailService } from "../../service/orderDetailService.js";
import { ListOrdered } from "lucide-react";
import { ORDER_STATUS, short, createdAt } from "../../config/constants.js";

const orderDetailsConfig = {
  key: "orderDetails",
  group: "ຂາຍໜ້າຮ້ານ",
  path: "/order-details",
  title: "ລາຍລະອຽດອໍເດີ",
  icon: ListOrdered,
  idKey: "ordrd_id",
  api: "/order/detail/getall",
  // ຟັງຊັນ CRUD ມາຈາກ src/service/orderDetailService.js
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
    { key: "order", label: "ອໍເດີ", render: (r) => `#${short(r.orderId)}`, strong: true },
    { key: "productId", label: "ສິນຄ້າ", lookup: "products" },
    { key: "amount", label: "ຈຳນວນ", type: "number" },
    { key: "total", label: "ລວມ", type: "money" },
    { key: "status", label: "ສະຖານະ", type: "badge", options: ORDER_STATUS },
    createdAt,
  ],
  fields: [
    { name: "orderId", label: "ອໍເດີ", type: "select", source: "orders", required: true },
    { name: "productId", label: "ສິນຄ້າ", type: "select", source: "products", required: true },
    { name: "amount", label: "ຈຳນວນ", type: "number", required: true },
    { name: "total", label: "ລວມ", type: "number", required: true, hint: "ຄິດໄລ່ອັດຕະໂນມັດ = ຈຳນວນ × ລາຄາສິນຄ້າ" },
    { name: "status", label: "ສະຖານະ", type: "select", options: ORDER_STATUS, required: true, default: "await" },
  ],
  onFieldChange: (name, form, lookups) => {
    if (!["productId", "amount"].includes(name)) return null;
    const p = lookups.products?.find((x) => x.product_id === form.productId);
    if (!p || !form.amount) return null;
    return { total: Number(form.amount) * p.productPrice };
  },
};

export default orderDetailsConfig;
