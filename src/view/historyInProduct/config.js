// Controller 5: HistoryInProduct  (api-pos/src/controller/user/HistoryInProduct.js)
import { historyInProductService } from "../../service/historyInProductService.js";
import { History } from "lucide-react";
import { createdAt } from "../../config/constants.js";

const historyProductsConfig = {
  key: "historyProducts",
  group: "ສິນຄ້າ",
  path: "/history-products",
  title: "ປະຫວັດນຳເຂົ້າສິນຄ້າ",
  icon: History,
  idKey: "hip_id",
  api: "/history/product/getall",
  // ຟັງຊັນ CRUD ມາຈາກ src/service/historyInProductService.js
  crud: {
    list: historyInProductService.getAll,
    getOne: historyInProductService.getOne,
    create: historyInProductService.insert,
    update: historyInProductService.update,
    remove: historyInProductService.remove,
  },
  searchPlaceholder: "ຄົ້ນຫາຊື່ / ລາຍລະອຽດ",
  filters: [{ name: "productId", label: "ສິນຄ້າ", source: "products" }],
  columns: [
    { key: "productName", label: "ຊື່ສິນຄ້າ", strong: true },
    { key: "productDetail", label: "ລາຍລະອຽດ" },
    { key: "productQty", label: "ຈຳນວນ", type: "number" },
    { key: "productPrice", label: "ລາຄາ", type: "money" },
    createdAt,
  ],
  fields: [
    { name: "productId", label: "ສິນຄ້າ", type: "select", source: "products", required: true },
    { name: "productName", label: "ຊື່ສິນຄ້າ", required: true },
    { name: "productDetail", label: "ລາຍລະອຽດ", type: "textarea" },
    { name: "productQty", label: "ຈຳນວນ", type: "number", required: true },
    { name: "productPrice", label: "ລາຄາ", type: "number", required: true },
  ],
  // ເລືອກສິນຄ້າແລ້ວ ເຕີມຊື່/ລາຄາໃຫ້ອັດຕະໂນມັດ
  onFieldChange: (name, form, lookups) => {
    if (name !== "productId") return null;
    const p = lookups.products?.find((x) => x.product_id === form.productId);
    if (!p) return null;
    return { productName: p.productName, productDetail: p.productDetail ?? "", productPrice: p.productPrice };
  },
};

export default historyProductsConfig;
