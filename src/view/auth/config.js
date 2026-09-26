// Controller 1: Auth  (api-pos/src/controller/user/Auth.js)
import { authService } from "../../service/authService.js";
import { UsersRound } from "lucide-react";
import { ROLES, createdAt, activeCol } from "../../config/constants.js";

const usersConfig = {
  key: "users",
  group: "ລະບົບ",
  path: "/users",
  title: "ຜູ້ໃຊ້ລະບົບ",
  icon: UsersRound,
  idKey: "user_id",
  api: "/auth/getall",
  // ຟັງຊັນ CRUD ມາຈາກ src/service/authService.js
  crud: {
    list: authService.getAll,
    getOne: authService.getOne,
    create: authService.register,
  },
  createLabel: "ລົງທະບຽນຜູ້ໃຊ້",
  searchPlaceholder: "ຄົ້ນຫາ ຊື່ / ເບີໂທ",
  filters: [{ name: "status", label: "ສິດ (role)", options: ROLES }],
  columns: [
    { key: "username", label: "ຊື່ຜູ້ໃຊ້", strong: true },
    { key: "phoneNumber", label: "ເບີໂທ" },
    { key: "role", label: "ສິດ", type: "badge", options: ROLES },
    activeCol(),
    createdAt,
  ],
  fields: [
    { name: "username", label: "ຊື່ຜູ້ໃຊ້", required: true },
    { name: "phoneNumber", label: "ເບີໂທ", type: "number", required: true },
    { name: "password", label: "ລະຫັດຜ່ານ", type: "password", required: true },
  ],
};

export default usersConfig;
