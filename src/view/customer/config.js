// Controller 3: Customer  (api-pos/src/controller/user/Customer.js)
import { customerService } from "../../service/customerService.js";
import { UserRound } from "lucide-react";
import { BOOL_ACTIVE, createdAt, activeCol } from "../../config/constants.js";

const customersConfig = {
  key: "customers",
  group: "ຂາຍແພັກເກັດ",
  path: "/customers",
  title: "ລູກຄ້າ",
  icon: UserRound,
  idKey: "id",
  api: "/customer/getall",
  // ຟັງຊັນ CRUD ມາຈາກ src/service/customerService.js
  crud: {
    list: customerService.getAll,
    getOne: customerService.getOne,
    create: customerService.insert,
    update: customerService.update,
    toggle: customerService.toggleActive,
    remove: customerService.remove,
  },
  searchPlaceholder: "ຄົ້ນຫາ ຊື່ / ທີ່ຢູ່",
  filters: [{ name: "active", label: "ສະຖານະ", options: BOOL_ACTIVE }],
  columns: [
    { key: "fullname", label: "ຊື່ ແລະ ນາມສະກຸນ", strong: true },
    { key: "phone", label: "ເບີໂທ" },
    { key: "address", label: "ທີ່ຢູ່" },
    { key: "sells", label: "ການຊື້", render: (r) => `${r.sells?.length ?? 0} ຄັ້ງ` },
    activeCol(),
    createdAt,
  ],
  fields: [
    { name: "fullname", label: "ຊື່ ແລະ ນາມສະກຸນ", required: true },
    { name: "phone", label: "ເບີໂທ", type: "number", required: true },
    { name: "address", label: "ທີ່ຢູ່", type: "textarea", required: true },
  ],
  links: [{ label: "ການຂາຍ", to: (r) => `/sells?customerId=${r.id}` }],
};

export default customersConfig;
