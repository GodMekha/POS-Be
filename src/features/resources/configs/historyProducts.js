// Controller 5: HistoryInProduct (api-pos/src/controller/user/HistoryInProduct.js)
import { History } from "lucide-react";
import { historyInProductService } from "../../../services/historyInProductService.js";
import { createdAtColumn } from "../../../constants/columns.js";

/** ເລືອກສິນຄ້າແລ້ວ ເຕີມ ຊື່/ລາຍລະອຽດ/ລາຄາ ໃຫ້ອັດຕະໂນມັດ */
const fillFromProduct = (name, form, lookups) => {
  if (name !== "productId") return null;
  const product = lookups.products?.find((x) => x.product_id === form.productId);
  if (!product) return null;
  return {
    productName: product.productName,
    productDetail: product.productDetail ?? "",
    productPrice: product.productPrice,
  };
};

export default {
  key: "historyProducts",
  permission: "historyProduct", // ສິດໃນ api-pos (config/permissions.js)
  group: "ສິນຄ້າ",
  path: "/history-products",
  title: "ປະຫວັດນຳເຂົ້າສິນຄ້າ",
  icon: History,
  idKey: "hip_id",
  api: "/history/product/getall",
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
    createdAtColumn,
  ],
  fields: [
    { name: "productId", label: "ສິນຄ້າ", type: "select", source: "products", required: true },
    { name: "productName", label: "ຊື່ສິນຄ້າ", required: true },
    { name: "productDetail", label: "ລາຍລະອຽດ", type: "textarea" },
    { name: "productQty", label: "ຈຳນວນ", type: "number", required: true },
    { name: "productPrice", label: "ລາຄາ", type: "number", required: true },
  ],
  onFieldChange: fillFromProduct,
};
