// Controller 15: SellDetail  (api-pos/src/controller/user/SellDetail.js)
import { sellDetailService } from "../../service/sellDetailService.js";
import { ListChecks } from "lucide-react";
import { short, createdAt } from "../../config/constants.js";

const sellDetailsConfig = {
  key: "sellDetails",
  group: "ຂາຍແພັກເກັດ",
  path: "/sell-details",
  title: "ລາຍລະອຽດການຂາຍ",
  icon: ListChecks,
  idKey: "id",
  noSearch: true,
  api: "/sell/detail/getAll",
  // ຟັງຊັນ CRUD ມາຈາກ src/service/sellDetailService.js
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
    { key: "sellId", label: "ການຂາຍ", render: (r) => `#${short(r.sellId)}`, strong: true },
    { key: "part", label: "ອຸປະກອນ", render: (r) => r.part?.list ?? "-" },
    { key: "amount", label: "ຈຳນວນ", type: "number" },
    { key: "total", label: "ລວມ", type: "money" },
    createdAt,
  ],
  fields: [
    { name: "sellId", label: "ການຂາຍ", type: "select", source: "sells", required: true },
    { name: "partId", label: "ອຸປະກອນ", type: "select", source: "parts", required: true },
    { name: "amount", label: "ຈຳນວນ", type: "number", required: true },
    { name: "total", label: "ລວມ", type: "number", required: true, hint: "ຄິດໄລ່ອັດຕະໂນມັດ = ຈຳນວນ × ລາຄາອຸປະກອນ" },
  ],
  onFieldChange: (name, form, lookups) => {
    if (!["partId", "amount"].includes(name)) return null;
    const p = lookups.parts?.find((x) => x.id === form.partId);
    if (!p || !form.amount) return null;
    return { total: Number(form.amount) * p.price };
  },
};

export default sellDetailsConfig;
