// Controller 16: Supply (api-pos/src/controller/user/Supply.js)
import { Truck } from "lucide-react";
import { supplyService } from "../../../services/supplyService.js";
import { BOOL_ACTIVE } from "../../../constants/options.js";
import { activeColumn, createdAtColumn } from "../../../constants/columns.js";

export default {
  key: "supplies",
  permission: "supply", // ສິດໃນ api-pos (config/permissions.js)
  group: "ຈັດຊື້",
  path: "/supplies",
  title: "ຜູ້ສະໜອງ",
  icon: Truck,
  idKey: "supply_id",
  api: "/supply/getAll",
  crud: {
    list: supplyService.getAll,
    getOne: supplyService.getOne,
    create: supplyService.insert,
    update: supplyService.update,
    toggleActive: supplyService.toggleActive,
    remove: supplyService.remove,
  },
  searchPlaceholder: "ຄົ້ນຫາ ບໍລິສັດ / ຜູ້ຂາຍ",
  filters: [{ name: "active", label: "ສະຖານະ", options: BOOL_ACTIVE }],
  columns: [
    { key: "company", label: "ບໍລິສັດ", strong: true },
    { key: "sellName", label: "ຊື່ຜູ້ຂາຍ" },
    { key: "phone", label: "ເບີໂທ" },
    { key: "position", label: "ຕຳແໜ່ງ" },
    activeColumn(),
    createdAtColumn,
  ],
  fields: [
    { name: "company", label: "ບໍລິສັດ", required: true },
    { name: "sellName", label: "ຊື່ຜູ້ຂາຍ", required: true },
    { name: "phone", label: "ເບີໂທ", type: "number", required: true },
    { name: "position", label: "ຕຳແໜ່ງ" },
  ],
  links: [{ label: "ການສັ່ງຊື້", to: (r) => `/purchases?supplyId=${r.supply_id}` }],
};
