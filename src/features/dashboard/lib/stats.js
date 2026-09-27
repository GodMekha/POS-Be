import { BadgeDollarSign, Package, ShoppingCart, Truck, UserRound, Warehouse } from "lucide-react";
import * as services from "../../../services/index.js";

/** ບັດສະຖິຕິດ້ານເທິງຂອງ Dashboard */
export const STAT_CARDS = [
  { key: "products", permission: "product", label: "ສິນຄ້າ", service: services.productService, icon: Package, to: "/products", color: "from-blue-500 to-blue-600" },
  { key: "customers", permission: "customer", label: "ລູກຄ້າ", service: services.customerService, icon: UserRound, to: "/customers", color: "from-emerald-500 to-emerald-600" },
  { key: "orders", permission: "order", label: "ອໍເດີ", service: services.orderService, icon: ShoppingCart, to: "/orders", color: "from-amber-500 to-orange-500" },
  { key: "sells", permission: "sell", label: "ການຂາຍແພັກເກັດ", service: services.sellService, icon: BadgeDollarSign, to: "/sells", color: "from-purple-500 to-fuchsia-500" },
  { key: "supplies", permission: "supply", label: "ຜູ້ສະໜອງ", service: services.supplyService, icon: Truck, to: "/supplies", color: "from-cyan-500 to-sky-500" },
  { key: "inventories", permission: "inventory", label: "ວັດຖຸດິບ", service: services.inventoryService, icon: Warehouse, to: "/inventories", color: "from-rose-500 to-pink-500" },
];
