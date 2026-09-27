/**
 * ຂໍ້ມູນອ້າງອີງສຳລັບ dropdown (source / lookup ໃນ config)
 *   permission: ສິດ read ທີ່ຕ້ອງມີ, fetch: ຟັງຊັນດຶງຂໍ້ມູນ, value: field ທີ່ເປັນ id, label: ຂໍ້ຄວາມທີ່ສະແດງ
 */
import * as services from "../../services/index.js";
import { formatAmount as amount, shortId } from "../../utils/format.js";

export const LOOKUPS = {
  users: {
    permission: "user",
    fetch: services.authService.getAll,
    value: "user_id",
    label: (r) => `${r.username} (${r.phoneNumber})`,
  },
  categories: {
    permission: "category",
    fetch: services.categoryService.getAll,
    value: "category_id",
    label: (r) => r.name,
  },
  products: {
    permission: "product",
    fetch: services.productService.getAll,
    value: "product_id",
    label: (r) => `${r.productName} — ${amount(r.productPrice)}`,
  },
  inventories: {
    permission: "inventory",
    fetch: services.inventoryService.getAll,
    value: "inventory_id",
    label: (r) => `${r.list} (${r.unit})`,
  },
  orders: {
    permission: "order",
    fetch: services.orderService.getAll,
    value: "order_id",
    label: (r) => `#${shortId(r.order_id)} — ${amount(r.totalPrice)} ${r.currency}`,
  },
  packages: {
    permission: "package",
    fetch: services.packageService.getAll,
    value: "id",
    label: (r) => `${r.name} — ${amount(r.price)}`,
  },
  parts: {
    permission: "part",
    fetch: services.partService.getAll,
    value: "id",
    label: (r) => `${r.list} — ${amount(r.price)}`,
  },
  customers: {
    permission: "customer",
    fetch: services.customerService.getAll,
    value: "id",
    label: (r) => `${r.fullname} (${r.phone})`,
  },
  supplies: {
    permission: "supply",
    fetch: services.supplyService.getAll,
    value: "supply_id",
    label: (r) => `${r.company} — ${r.sellName}`,
  },
  purchases: {
    permission: "purchase",
    fetch: services.purchaseService.getAll,
    value: "purchase_id",
    label: (r) => `#${shortId(r.purchase_id)} — ${r.supply?.company ?? ""} ${amount(r.totalPrice)} ${r.currency}`,
  },
  sells: {
    permission: "sell",
    fetch: services.sellService.getAll,
    value: "id",
    label: (r) => `#${shortId(r.id)} — ${r.customer?.fullname ?? ""} ${amount(r.totalPrice)}`,
  },
};
