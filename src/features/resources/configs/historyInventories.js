// Controller 4: HistoryInInventory (api-pos/src/controller/user/HistoryInInventory.js)
import { ClipboardList } from "lucide-react";
import { historyInInventoryService } from "../../../services/historyInInventoryService.js";
import { BOOL_ACTIVE } from "../../../constants/options.js";
import { activeColumn, createdAtColumn } from "../../../constants/columns.js";

/** ເລືອກວັດຖຸດິບແລ້ວ ເຕີມ ລາຍການ/ຫົວໜ່ວຍ/ລາຄາ ໃຫ້ອັດຕະໂນມັດ */
const fillFromInventory = (name, form, lookups) => {
  if (name !== "inventoryId") return null;
  const inventory = lookups.inventories?.find((x) => x.inventory_id === form.inventoryId);
  return inventory ? { list: inventory.list, unit: inventory.unit, price: inventory.price } : null;
};

export default {
  key: "historyInventories",
  permission: "historyInventory", // ສິດໃນ api-pos (config/permissions.js)
  group: "ສາງ",
  path: "/history-inventories",
  title: "ປະຫວັດເຂົ້າສາງ",
  icon: ClipboardList,
  idKey: "id",
  api: "/history/inventory/getall",
  crud: {
    list: historyInInventoryService.getAll,
    getOne: historyInInventoryService.getOne,
    create: historyInInventoryService.insert,
    update: historyInInventoryService.update,
    toggleActive: historyInInventoryService.toggleActive,
    remove: historyInInventoryService.remove,
  },
  searchPlaceholder: "ຄົ້ນຫາລາຍການ",
  filters: [
    { name: "inventoryId", label: "ວັດຖຸດິບ", source: "inventories" },
    { name: "active", label: "ສະຖານະ", options: BOOL_ACTIVE },
  ],
  columns: [
    { key: "list", label: "ລາຍການ", strong: true },
    { key: "unit", label: "ຫົວໜ່ວຍ" },
    { key: "amount", label: "ຈຳນວນ", type: "number" },
    { key: "price", label: "ລາຄາ", type: "money" },
    { key: "totalPrice", label: "ລວມ", type: "money" },
    activeColumn(),
    createdAtColumn,
  ],
  fields: [
    { name: "inventoryId", label: "ວັດຖຸດິບ", type: "select", source: "inventories", required: true },
    { name: "list", label: "ລາຍການ", required: true },
    { name: "unit", label: "ຫົວໜ່ວຍ", required: true },
    { name: "amount", label: "ຈຳນວນ", type: "number", required: true },
    { name: "price", label: "ລາຄາ", type: "number", required: true },
  ],
  onFieldChange: fillFromInventory,
};
