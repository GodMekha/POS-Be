// Controller 16: Supply  (api-pos/src/controller/user/Supply.js)
import { supplyService } from "../../service/supplyService.js";
import { Truck } from "lucide-react";
import { BOOL_ACTIVE, createdAt, activeCol } from "../../config/constants.js";

const suppliesConfig = {
  key: "supplies",
  group: "ຈັດຊື້",
  path: "/supplies",
  title: "ຜູ້ສະໜອງ",
  icon: Truck,
  idKey: "supply_id",
  api: "/supply/getAll",
  // ຟັງຊັນ CRUD ມາຈາກ src/service/supplyService.js
  crud: {
    list: supplyService.getAll,
    getOne: supplyService.getOne,
    create: supplyService.insert,
    update: supplyService.update,
    toggle: supplyService.toggleActive,
    remove: supplyService.remove,
  },
  searchPlaceholder: "ຄົ້ນຫາ ບໍລິສັດ / ຜູ້ຂາຍ",
  filters: [{ name: "active", label: "ສະຖານະ", options: BOOL_ACTIVE }],
  columns: [
    { key: "company", label: "ບໍລິສັດ", strong: true },
    { key: "sellName", label: "ຊື່ຜູ້ຂາຍ" },
    { key: "phone", label: "ເບີໂທ" },
    { key: "position", label: "ຕຳແໜ່ງ" },
    activeCol(),
    createdAt,
  ],
  fields: [
    { name: "company", label: "ບໍລິສັດ", required: true },
    { name: "sellName", label: "ຊື່ຜູ້ຂາຍ", required: true },
    { name: "phone", label: "ເບີໂທ", type: "number", required: true },
    { name: "position", label: "ຕຳແໜ່ງ" },
  ],
  links: [{ label: "ການສັ່ງຊື້", to: (r) => `/purchases?supplyId=${r.supply_id}` }],
};

export default suppliesConfig;
