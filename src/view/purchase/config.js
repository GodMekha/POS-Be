// Controller 12: Purchase  (api-pos/src/controller/user/Purchase.js)
import { purchaseService } from "../../service/purchaseService.js";
import { Receipt } from "lucide-react";
import { CURRENCIES, BOOL_ACTIVE, short, createdAt, activeCol } from "../../config/constants.js";

const purchasesConfig = {
  key: "purchases",
  group: "ຈັດຊື້",
  path: "/purchases",
  title: "ການສັ່ງຊື້",
  icon: Receipt,
  idKey: "purchase_id",
  api: "/purchase/getAll",
  // ຟັງຊັນ CRUD ມາຈາກ src/service/purchaseService.js
  crud: {
    list: purchaseService.getAll,
    getOne: purchaseService.getOne,
    create: purchaseService.insert,
    update: purchaseService.update,
    toggle: purchaseService.toggleStatus,
    remove: purchaseService.remove,
  },
  toggleField: "status",
  searchPlaceholder: "ຄົ້ນຫາ",
  filters: [
    { name: "supplyId", label: "ຜູ້ສະໜອງ", source: "supplies" },
    { name: "status", label: "ສະຖານະ", options: BOOL_ACTIVE },
  ],
  columns: [
    { key: "purchase_id", label: "ລະຫັດ", render: (r) => `#${short(r.purchase_id)}`, strong: true },
    { key: "supply", label: "ຜູ້ສະໜອງ", render: (r) => r.supply?.company ?? "-" },
    { key: "expressName", label: "ຂົນສົ່ງ" },
    { key: "expressPrice", label: "ຄ່າຂົນສົ່ງ", type: "money" },
    { key: "totalPrice", label: "ລາຄາລວມ", type: "money" },
    { key: "currency", label: "ສະກຸນເງິນ" },
    activeCol("status"),
    createdAt,
  ],
  fields: [
    { name: "supplyId", label: "ຜູ້ສະໜອງ", type: "select", source: "supplies", required: true },
    { name: "currency", label: "ສະກຸນເງິນ", type: "select", options: CURRENCIES, required: true, default: "LAK" },
    { name: "expressName", label: "ຊື່ຂົນສົ່ງ" },
    { name: "expressPrice", label: "ຄ່າຂົນສົ່ງ", type: "number", required: true },
    { name: "totalPrice", label: "ລາຄາລວມ", type: "number", required: true },
  ],
  links: [{ label: "ລາຍການຊື້", to: (r) => `/purchase-details?purchaseId=${r.purchase_id}` }],
};

export default purchasesConfig;
