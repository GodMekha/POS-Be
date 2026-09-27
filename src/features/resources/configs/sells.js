// Controller 14: Sell (api-pos/src/controller/user/Sell.js)
import { BadgeDollarSign } from "lucide-react";
import { sellService } from "../../../services/sellService.js";
import { ORDER_STATUS } from "../../../constants/options.js";
import { createdAtColumn } from "../../../constants/columns.js";

/** ລາຄາລວມ = ລາຄາແພັກເກັດ − ສ່ວນຫຼຸດ% */
const calculateTotalPrice = (name, form, lookups) => {
  if (!["packageId", "discount"].includes(name)) return null;
  const pkg = lookups.packages?.find((x) => x.id === form.packageId);
  if (!pkg) return null;
  const discountPercent = Number(form.discount || 0);
  return { totalPrice: Math.round(pkg.price - (pkg.price * discountPercent) / 100) };
};

export default {
  key: "sells",
  permission: "sell", // ສິດໃນ api-pos (config/permissions.js)
  group: "ຂາຍແພັກເກັດ",
  path: "/sells",
  title: "ການຂາຍ",
  icon: BadgeDollarSign,
  idKey: "id",
  api: "/sell/getAll",
  crud: {
    list: sellService.getAll,
    getOne: sellService.getOne,
    create: sellService.insert,
    update: sellService.update,
    changeStatus: sellService.updateStatus,
    remove: sellService.remove,
  },
  statusOptions: ORDER_STATUS,
  searchPlaceholder: "ຄົ້ນຫາສະຖານະ",
  filters: [
    { name: "customerId", label: "ລູກຄ້າ", source: "customers" },
    { name: "packageId", label: "ແພັກເກັດ", source: "packages" },
    { name: "status", label: "ສະຖານະ", options: ORDER_STATUS },
  ],
  columns: [
    { key: "customer", label: "ລູກຄ້າ", render: (r) => r.customer?.fullname ?? "-", strong: true },
    { key: "phone", label: "ເບີໂທ", render: (r) => r.customer?.phone ?? "-" },
    { key: "package", label: "ແພັກເກັດ", render: (r) => r.package?.name ?? "-" },
    { key: "discount", label: "ສ່ວນຫຼຸດ (%)", type: "number" },
    { key: "totalPrice", label: "ລາຄາລວມ", type: "money" },
    { key: "status", label: "ສະຖານະ", type: "badge", options: ORDER_STATUS },
    createdAtColumn,
  ],
  fields: [
    { name: "customerId", label: "ລູກຄ້າ", type: "select", source: "customers", required: true },
    { name: "packageId", label: "ແພັກເກັດ", type: "select", source: "packages", required: true },
    { name: "discount", label: "ສ່ວນຫຼຸດ (%)", type: "number", step: "0.01", required: true, default: 0 },
    {
      name: "totalPrice",
      label: "ລາຄາລວມ",
      type: "number",
      required: true,
      hint: "ຄິດໄລ່ອັດຕະໂນມັດ = ລາຄາແພັກເກັດ − ສ່ວນຫຼຸດ%",
    },
    { name: "status", label: "ສະຖານະ", type: "select", options: ORDER_STATUS, required: true, default: "await" },
  ],
  onFieldChange: calculateTotalPrice,
  links: [{ label: "ລາຍລະອຽດ", to: (r) => `/sell-details?sellId=${r.id}` }],
};
