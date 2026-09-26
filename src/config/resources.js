// =====================================================================
//  ລວມການຕັ້ງຄ່າ 16 controller ຂອງ api-pos
//  ແຕ່ລະ controller ມີໂຟນເດີຂອງຕົວເອງ: src/view/<controller>/
//     ├─ config.js        (endpoint, ຄໍລຳ, ຟອມ, ຕົວກອງ)
//     └─ page/<Name>.jsx  (ໜ້າ)
// =====================================================================
import usersConfig from "../view/auth/config.js";
import categoriesConfig from "../view/category/config.js";
import customersConfig from "../view/customer/config.js";
import historyInventoriesConfig from "../view/historyInInventory/config.js";
import historyProductsConfig from "../view/historyInProduct/config.js";
import inventoriesConfig from "../view/inventory/config.js";
import ordersConfig from "../view/order/config.js";
import orderDetailsConfig from "../view/orderDetail/config.js";
import packagesConfig from "../view/package/config.js";
import partsConfig from "../view/part/config.js";
import productsConfig from "../view/product/config.js";
import purchasesConfig from "../view/purchase/config.js";
import purchaseDetailsConfig from "../view/purchaseDetail/config.js";
import sellsConfig from "../view/sell/config.js";
import sellDetailsConfig from "../view/sellDetail/config.js";
import suppliesConfig from "../view/supply/config.js";

export * from "./constants.js";
import {
  authService,
  categoryService,
  customerService,
  inventoryService,
  orderService,
  packageService,
  partService,
  productService,
  purchaseService,
  sellService,
  supplyService,
} from "../service/index.js";
import { short, num } from "./constants.js";

// ລຽງຕາມລຳດັບ controller 1–16
export const RESOURCES = [
  usersConfig, //  1 Auth
  categoriesConfig, //  2 Category
  customersConfig, //  3 Customer
  historyInventoriesConfig, //  4 HistoryInInventory
  historyProductsConfig, //  5 HistoryInProduct
  inventoriesConfig, //  6 Inventory
  ordersConfig, //  7 Order
  orderDetailsConfig, //  8 OrderDetail
  packagesConfig, //  9 Package
  partsConfig, // 10 Part
  productsConfig, // 11 Product
  purchasesConfig, // 12 Purchase
  purchaseDetailsConfig, // 13 PurchaseDetail
  sellsConfig, // 14 Sell
  sellDetailsConfig, // 15 SellDetail
  suppliesConfig, // 16 Supply
];

// ---------- ຂໍ້ມູນອ້າງອີງ (dropdown) ----------
export const LOOKUPS = {
  users: { fetch: authService.getAll, value: "user_id", label: (r) => `${r.username} (${r.phoneNumber})` },
  categories: { fetch: categoryService.getAll, value: "category_id", label: (r) => r.name },
  products: { fetch: productService.getAll, value: "product_id", label: (r) => `${r.productName} — ${num(r.productPrice)}` },
  inventories: { fetch: inventoryService.getAll, value: "inventory_id", label: (r) => `${r.list} (${r.unit})` },
  orders: { fetch: orderService.getAll, value: "order_id", label: (r) => `#${short(r.order_id)} — ${num(r.totalPrice)} ${r.currency}` },
  packages: { fetch: packageService.getAll, value: "id", label: (r) => `${r.name} — ${num(r.price)}` },
  parts: { fetch: partService.getAll, value: "id", label: (r) => `${r.list} — ${num(r.price)}` },
  customers: { fetch: customerService.getAll, value: "id", label: (r) => `${r.fullname} (${r.phone})` },
  supplies: { fetch: supplyService.getAll, value: "supply_id", label: (r) => `${r.company} — ${r.sellName}` },
  purchases: { fetch: purchaseService.getAll, value: "purchase_id", label: (r) => `#${short(r.purchase_id)} — ${r.supply?.company ?? ""} ${num(r.totalPrice)} ${r.currency}` },
  sells: { fetch: sellService.getAll, value: "id", label: (r) => `#${short(r.id)} — ${r.customer?.fullname ?? ""} ${num(r.totalPrice)}` },
};

