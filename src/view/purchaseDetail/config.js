// Controller 13: PurchaseDetail  (api-pos/src/controller/user/PurchaseDetail.js)
import { purchaseDetailService } from "../../service/purchaseDetailService.js";
import { FileText } from "lucide-react";
import { BOOL_ACTIVE, short, activeCol } from "../../config/constants.js";

const purchaseDetailsConfig = {
  key: "purchaseDetails",
  group: "ຈັດຊື້",
  path: "/purchase-details",
  title: "ລາຍການສັ່ງຊື້",
  icon: FileText,
  idKey: "pd_id",
  api: "/purchase/detail/getAll",
  // ຟັງຊັນ CRUD ມາຈາກ src/service/purchaseDetailService.js
  crud: {
    list: purchaseDetailService.getAll,
    getOne: purchaseDetailService.getOne,
    create: purchaseDetailService.insert,
    update: purchaseDetailService.update,
    toggle: purchaseDetailService.toggleStatus,
    remove: purchaseDetailService.remove,
  },
  toggleField: "status",
  searchPlaceholder: "ຄົ້ນຫາລາຍການ",
  filters: [
    { name: "purchaseId", label: "ການສັ່ງຊື້", source: "purchases" },
    { name: "status", label: "ສະຖານະ", options: BOOL_ACTIVE },
  ],
  columns: [
    { key: "purchaseId", label: "ການສັ່ງຊື້", render: (r) => `#${short(r.purchaseId)}` },
    { key: "list", label: "ລາຍການ", strong: true },
    { key: "unit", label: "ຫົວໜ່ວຍ" },
    { key: "amount", label: "ຈຳນວນ", type: "number" },
    { key: "price", label: "ລາຄາ", type: "money" },
    { key: "total", label: "ລວມ", type: "money" },
    activeCol("status"),
  ],
  fields: [
    { name: "purchaseId", label: "ການສັ່ງຊື້", type: "select", source: "purchases", required: true },
    { name: "list", label: "ລາຍການ", required: true },
    { name: "unit", label: "ຫົວໜ່ວຍ", required: true },
    { name: "amount", label: "ຈຳນວນ", type: "number", required: true },
    { name: "price", label: "ລາຄາ", type: "number", required: true },
    { name: "total", label: "ລວມ", type: "number", required: true, hint: "ຄິດໄລ່ອັດຕະໂນມັດ = ຈຳນວນ × ລາຄາ" },
  ],
  onFieldChange: (name, form) => {
    if (!["amount", "price"].includes(name) || !form.amount || !form.price) return null;
    return { total: Number(form.amount) * Number(form.price) };
  },
};

export default purchaseDetailsConfig;
