// Controller 3: Customer (api-pos/src/controller/user/Customer.js)
import { UserRound } from "lucide-react";
import { customerService } from "../../../services/customerService.js";
import { BOOL_ACTIVE } from "../../../constants/options.js";
import { activeColumn, createdAtColumn } from "../../../constants/columns.js";

export default {
  key: "customers",
  permission: "customer", // ສິດໃນ api-pos (config/permissions.js)
  group: "ຂາຍແພັກເກັດ",
  path: "/customers",
  title: "ລູກຄ້າ",
  icon: UserRound,
  idKey: "id",
  api: "/customer/getall",
  crud: {
    list: customerService.getAll,
    getOne: customerService.getOne,
    create: customerService.insert,
    update: customerService.update,
    toggleActive: customerService.toggleActive,
    remove: customerService.remove,
  },
  searchPlaceholder: "ຄົ້ນຫາ ຊື່ / ທີ່ຢູ່",
  filters: [{ name: "active", label: "ສະຖານະ", options: BOOL_ACTIVE }],
  columns: [
    { key: "fullname", label: "ຊື່ ແລະ ນາມສະກຸນ", strong: true },
    { key: "phone", label: "ເບີໂທ" },
    { key: "address", label: "ທີ່ຢູ່" },
    { key: "sells", label: "ການຊື້", render: (r) => `${r.sells?.length ?? 0} ຄັ້ງ` },
    activeColumn(),
    createdAtColumn,
  ],
  fields: [
    { name: "fullname", label: "ຊື່ ແລະ ນາມສະກຸນ", required: true },
    { name: "phone", label: "ເບີໂທ", type: "number", required: true },
    { name: "address", label: "ທີ່ຢູ່", type: "textarea", required: true },
  ],
  links: [{ label: "ການຂາຍ", to: (r) => `/sells?customerId=${r.id}` }],
};
