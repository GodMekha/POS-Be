// Controller 9: Package (api-pos/src/controller/user/Package.js)
import { Boxes } from "lucide-react";
import { packageService } from "../../../services/packageService.js";
import { BOOL_ACTIVE } from "../../../constants/options.js";
import { activeColumn, createdAtColumn } from "../../../constants/columns.js";

export default {
  key: "packages",
  permission: "package", // ສິດໃນ api-pos (config/permissions.js)
  group: "ຂາຍແພັກເກັດ",
  path: "/packages",
  title: "ແພັກເກັດ",
  icon: Boxes,
  idKey: "id",
  api: "/package/getAll",
  crud: {
    list: packageService.getAll,
    getOne: packageService.getOne,
    create: packageService.insert,
    update: packageService.update,
    toggleActive: packageService.toggleActive,
    remove: packageService.remove,
  },
  searchPlaceholder: "ຄົ້ນຫາຊື່ / ໄລຍະເວລາ",
  filters: [{ name: "active", label: "ສະຖານະ", options: BOOL_ACTIVE }],
  columns: [
    { key: "name", label: "ຊື່ແພັກເກັດ", strong: true },
    { key: "timeline", label: "ໄລຍະເວລາ" },
    { key: "price", label: "ລາຄາ", type: "money" },
    { key: "sells", label: "ຂາຍໄດ້", render: (r) => (r.sells ? `${r.sells.length} ຄັ້ງ` : "-") },
    activeColumn(),
    createdAtColumn,
  ],
  fields: [
    { name: "name", label: "ຊື່ແພັກເກັດ", required: true },
    { name: "timeline", label: "ໄລຍະເວລາ", required: true, placeholder: "ລາຍເດືອນ, ລາຍປີ, ຊື້ຂາດ..." },
    { name: "price", label: "ລາຄາ", type: "number", required: true },
  ],
  links: [{ label: "ການຂາຍ", to: (r) => `/sells?packageId=${r.id}` }],
};
