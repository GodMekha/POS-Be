// Controller 9: Package  (api-pos/src/controller/user/Package.js)
import { packageService } from "../../service/packageService.js";
import { Boxes } from "lucide-react";
import { BOOL_ACTIVE, createdAt, activeCol } from "../../config/constants.js";

const packagesConfig = {
  key: "packages",
  group: "ຂາຍແພັກເກັດ",
  path: "/packages",
  title: "ແພັກເກັດ",
  icon: Boxes,
  idKey: "id",
  api: "/package/getAll",
  // ຟັງຊັນ CRUD ມາຈາກ src/service/packageService.js
  crud: {
    list: packageService.getAll,
    getOne: packageService.getOne,
    create: packageService.insert,
    update: packageService.update,
    toggle: packageService.toggleActive,
    remove: packageService.remove,
  },
  searchPlaceholder: "ຄົ້ນຫາຊື່ / ໄລຍະເວລາ",
  filters: [{ name: "active", label: "ສະຖານະ", options: BOOL_ACTIVE }],
  columns: [
    { key: "name", label: "ຊື່ແພັກເກັດ", strong: true },
    { key: "timeline", label: "ໄລຍະເວລາ" },
    { key: "price", label: "ລາຄາ", type: "money" },
    { key: "sells", label: "ຂາຍໄດ້", render: (r) => (r.sells ? `${r.sells.length} ຄັ້ງ` : "-") },
    activeCol(),
    createdAt,
  ],
  fields: [
    { name: "name", label: "ຊື່ແພັກເກັດ", required: true },
    { name: "timeline", label: "ໄລຍະເວລາ", required: true, placeholder: "ລາຍເດືອນ, ລາຍປີ, ຊື້ຂາດ..." },
    { name: "price", label: "ລາຄາ", type: "number", required: true },
  ],
  links: [{ label: "ການຂາຍ", to: (r) => `/sells?packageId=${r.id}` }],
};

export default packagesConfig;
