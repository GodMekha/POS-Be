// Controller 2: Category  (api-pos/src/controller/user/Category.js)
import { categoryService } from "../../service/categoryService.js";
import { Tags } from "lucide-react";
import { createdAt, activeCol } from "../../config/constants.js";

const categoriesConfig = {
  key: "categories",
  group: "ສິນຄ້າ",
  path: "/categories",
  title: "ໝວດໝູ່ສິນຄ້າ",
  icon: Tags,
  idKey: "category_id",
  multipart: true,
  api: "/category/getall",
  // ຟັງຊັນ CRUD ມາຈາກ src/service/categoryService.js
  crud: {
    list: categoryService.getAll,
    getOne: categoryService.getOne,
    create: categoryService.insert,
    update: categoryService.update,
    remove: categoryService.remove,
  },
  searchPlaceholder: "ຄົ້ນຫາຊື່ໝວດໝູ່",
  columns: [
    { key: "icon", label: "ໄອຄອນ", type: "image" },
    { key: "name", label: "ຊື່ໝວດໝູ່", strong: true },
    activeCol(),
    createdAt,
  ],
  fields: [
    { name: "name", label: "ຊື່ໝວດໝູ່", required: true },
    // API: insert ໃຊ້ key "files", update ໃຊ້ key "icon" (ບັງຄັບທັງສອງ)
    { name: "icon", label: "ໄອຄອນ", type: "file", required: true, requiredOnEdit: true, uploadKey: { create: "files", update: "icon" } },
  ],
};

export default categoriesConfig;
