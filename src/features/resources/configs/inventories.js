// Controller 6: Inventory (api-pos/src/controller/user/Inventory.js)
import { Warehouse } from "lucide-react";
import { inventoryService } from "../../../services/inventoryService.js";
import { BOOL_ACTIVE } from "../../../constants/options.js";
import { activeColumn } from "../../../constants/columns.js";

export default {
  key: "inventories",
  permission: "inventory", // ສິດໃນ api-pos (config/permissions.js)
  group: "ສາງ",
  path: "/inventories",
  title: "ສາງ / ວັດຖຸດິບ",
  icon: Warehouse,
  idKey: "inventory_id",
  api: "/inventory/getall",
  crud: {
    list: inventoryService.getAll,
    getOne: inventoryService.getOne,
    create: inventoryService.insert,
    update: inventoryService.update,
    remove: inventoryService.remove,
  },
  searchPlaceholder: "ຄົ້ນຫາລາຍການ",
  filters: [{ name: "status", label: "ສະຖານະ", options: BOOL_ACTIVE }],
  columns: [
    { key: "list", label: "ລາຍການ", strong: true },
    { key: "unit", label: "ຫົວໜ່ວຍ" },
    { key: "amount", label: "ຈຳນວນ", type: "number" },
    { key: "price", label: "ລາຄາ/ໜ່ວຍ", type: "money" },
    { key: "totalPrice", label: "ລວມ", type: "money" },
    activeColumn("status"),
  ],
  fields: [
    { name: "list", label: "ລາຍການ", required: true },
    { name: "unit", label: "ຫົວໜ່ວຍ", required: true, placeholder: "ກິໂລ, ແກັດ, ຖົງ..." },
    { name: "amount", label: "ຈຳນວນ", type: "number", required: true },
    { name: "price", label: "ລາຄາ/ໜ່ວຍ", type: "number", required: true },
  ],
  links: [{ label: "ປະຫວັດ", to: (r) => `/history-inventories?inventoryId=${r.inventory_id}` }],
};
