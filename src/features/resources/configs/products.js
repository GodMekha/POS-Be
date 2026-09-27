// Controller 11: Product (api-pos/src/controller/user/Product.js)
import { Package } from "lucide-react";
import { productService } from "../../../services/productService.js";
import { BOOL_ACTIVE } from "../../../constants/options.js";
import { activeColumn } from "../../../constants/columns.js";

export default {
  key: "products",
  permission: "product", // ສິດໃນ api-pos (config/permissions.js)
  group: "ສິນຄ້າ",
  path: "/products",
  title: "ສິນຄ້າ",
  icon: Package,
  idKey: "product_id",
  multipart: true,
  api: "/product/getAll",
  crud: {
    list: productService.getAll,
    getOne: productService.getOne,
    create: productService.insert,
    update: productService.update,
    remove: productService.remove,
  },
  searchPlaceholder: "ຄົ້ນຫາຊື່ສິນຄ້າ",
  filters: [
    // ເມື່ອເລືອກໝວດໝູ່ ຈະໃຊ້ endpoint getBy/:category_id ແທນ getAll
    { name: "categoryId", label: "ໝວດໝູ່", source: "categories", fetchBy: productService.getByCategory },
    { name: "status", label: "ສະຖານະ", options: BOOL_ACTIVE },
  ],
  columns: [
    { key: "image", label: "ຮູບ", type: "image" },
    { key: "productName", label: "ຊື່ສິນຄ້າ", strong: true },
    { key: "category", label: "ໝວດໝູ່", render: (r) => r.category?.name ?? "-" },
    { key: "productQty", label: "ຈຳນວນ", type: "number" },
    { key: "productPrice", label: "ລາຄາ", type: "money" },
    { key: "barcode", label: "Barcode" },
    activeColumn(),
  ],
  fields: [
    { name: "categoryId", label: "ໝວດໝູ່", type: "select", source: "categories", required: true },
    { name: "productName", label: "ຊື່ສິນຄ້າ", required: true },
    { name: "productDetail", label: "ລາຍລະອຽດ", type: "textarea", required: true },
    { name: "productQty", label: "ຈຳນວນ", type: "number", required: true },
    { name: "productPrice", label: "ລາຄາ", type: "number", required: true },
    { name: "image", label: "ຮູບສິນຄ້າ", type: "file", required: true, requiredOnEdit: true },
  ],
  links: [{ label: "ປະຫວັດສິນຄ້າ", to: (r) => `/history-products?productId=${r.product_id}` }],
};
