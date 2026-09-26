// Controller 10: Part  (api-pos/src/controller/user/Part.js)
import { partService } from "../../service/partService.js";
import { Puzzle } from "lucide-react";
import { createdAt } from "../../config/constants.js";

const partsConfig = {
  key: "parts",
  group: "ຂາຍແພັກເກັດ",
  path: "/parts",
  title: "ອຸປະກອນ / ພາດ",
  icon: Puzzle,
  idKey: "id",
  api: "/part/getAll",
  // ຟັງຊັນ CRUD ມາຈາກ src/service/partService.js
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
    createdAt,
  ],
  fields: [
    { name: "list", label: "ລາຍການ", required: true },
    { name: "amount", label: "ຈຳນວນ", type: "number", required: true },
    { name: "price", label: "ລາຄາ", type: "number", required: true },
  ],
  links: [{ label: "ການຂາຍ", to: (r) => `/sell-details?partId=${r.id}` }],
};

export default partsConfig;
