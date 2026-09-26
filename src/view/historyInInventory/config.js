// Controller 4: HistoryInInventory  (api-pos/src/controller/user/HistoryInInventory.js)
import { historyInInventoryService } from "../../service/historyInInventoryService.js";
import { ClipboardList } from "lucide-react";
import { BOOL_ACTIVE, createdAt, activeCol } from "../../config/constants.js";

const historyInventoriesConfig = {
  key: "historyInventories",
  group: "ສາງ",
  path: "/history-inventories",
  title: "ປະຫວັດເຂົ້າສາງ",
  icon: ClipboardList,
  idKey: "id",
  api: "/history/inventory/getall",
  // ຟັງຊັນ CRUD ມາຈາກ src/service/historyInInventoryService.js
  crud: {
    list: historyInInventoryService.getAll,
    getOne: historyInInventoryService.getOne,
    create: historyInInventoryService.insert,
    update: historyInInventoryService.update,
    toggle: historyInInventoryService.toggleActive,
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
    activeCol(),
    createdAt,
  ],
  fields: [
    { name: "inventoryId", label: "ວັດຖຸດິບ", type: "select", source: "inventories", required: true },
    { name: "list", label: "ລາຍການ", required: true },
    { name: "unit", label: "ຫົວໜ່ວຍ", required: true },
    { name: "amount", label: "ຈຳນວນ", type: "number", required: true },
    { name: "price", label: "ລາຄາ", type: "number", required: true },
  ],
  onFieldChange: (name, form, lookups) => {
    if (name !== "inventoryId") return null;
    const i = lookups.inventories?.find((x) => x.inventory_id === form.inventoryId);
    return i ? { list: i.list, unit: i.unit, price: i.price } : null;
  },
};

export default historyInventoriesConfig;
