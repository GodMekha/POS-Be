// Controller 15: SellDetail (api-pos/src/controller/user/SellDetail.js)
import { ListChecks } from "lucide-react";
import { sellDetailService } from "../../../services/sellDetailService.js";
import { createdAtColumn } from "../../../constants/columns.js";
import { shortId } from "../../../utils/format.js";

/** ລວມ = ຈຳນວນ × ລາຄາອຸປະກອນ */
const calculateTotal = (name, form, lookups) => {
  if (!["partId", "amount"].includes(name)) return null;
  const part = lookups.parts?.find((x) => x.id === form.partId);
  if (!part || !form.amount) return null;
  return { total: Number(form.amount) * part.price };
};

export default {
  key: "sellDetails",
  permission: "sellDetail", // ສິດໃນ api-pos (config/permissions.js)
  group: "ຂາຍແພັກເກັດ",
  path: "/sell-details",
  title: "ລາຍລະອຽດການຂາຍ",
  icon: ListChecks,
  idKey: "id",
  noSearch: true,
  api: "/sell/detail/getAll",
  crud: {
    list: sellDetailService.getAll,
    getOne: sellDetailService.getOne,
    create: sellDetailService.insert,
    update: sellDetailService.update,
    remove: sellDetailService.remove,
  },
  filters: [
    { name: "sellId", label: "ການຂາຍ", source: "sells" },
    { name: "partId", label: "ອຸປະກອນ", source: "parts" },
  ],
  columns: [
    { key: "sellId", label: "ການຂາຍ", render: (r) => `#${shortId(r.sellId)}`, strong: true },
    { key: "part", label: "ອຸປະກອນ", render: (r) => r.part?.list ?? "-" },
    { key: "amount", label: "ຈຳນວນ", type: "number" },
    { key: "total", label: "ລວມ", type: "money" },
    createdAtColumn,
  ],
  fields: [
    { name: "sellId", label: "ການຂາຍ", type: "select", source: "sells", required: true },
    { name: "partId", label: "ອຸປະກອນ", type: "select", source: "parts", required: true },
    { name: "amount", label: "ຈຳນວນ", type: "number", required: true },
    { name: "total", label: "ລວມ", type: "number", required: true, hint: "ຄິດໄລ່ອັດຕະໂນມັດ = ຈຳນວນ × ລາຄາອຸປະກອນ" },
  ],
  onFieldChange: calculateTotal,
};
