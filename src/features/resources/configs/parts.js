// Controller 10: Part (api-pos/src/controller/user/Part.js)
import { Puzzle } from "lucide-react";
import { partService } from "../../../services/partService.js";
import { createdAtColumn } from "../../../constants/columns.js";

export default {
  key: "parts",
  permission: "part", // ສິດໃນ api-pos (config/permissions.js)
  group: "ຂາຍແພັກເກັດ",
  path: "/parts",
  title: "ອຸປະກອນ / ພາດ",
  icon: Puzzle,
  idKey: "id",
  api: "/part/getAll",
  crud: {
    list: partService.getAll,
    getOne: partService.getOne,
    create: partService.insert,
    update: partService.update,
    remove: partService.remove,
  },
  searchPlaceholder: "ຄົ້ນຫາລາຍການ",
  columns: [
    { key: "list", label: "ລາຍການ", strong: true },
    { key: "amount", label: "ຈຳນວນ", type: "number" },
    { key: "price", label: "ລາຄາ", type: "money" },
    createdAtColumn,
  ],
  fields: [
    { name: "list", label: "ລາຍການ", required: true },
    { name: "amount", label: "ຈຳນວນ", type: "number", required: true },
    { name: "price", label: "ລາຄາ", type: "number", required: true },
  ],
  links: [{ label: "ການຂາຍ", to: (r) => `/sell-details?partId=${r.id}` }],
};
