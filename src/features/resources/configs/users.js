// Controller 1: Auth (api-pos/src/controller/user/Auth.js)
import { UsersRound } from "lucide-react";
import { authService } from "../../../services/authService.js";
import { ROLES } from "../../../constants/options.js";
import { activeColumn, createdAtColumn } from "../../../constants/columns.js";

export default {
  key: "users",
  permission: "user", // ສິດໃນ api-pos (config/permissions.js)
  group: "ລະບົບ",
  path: "/users",
  title: "ຜູ້ໃຊ້ລະບົບ",
  icon: UsersRound,
  idKey: "user_id",
  api: "/auth/getall",
  crud: {
    list: authService.getAll,
    getOne: authService.getOne,
    create: authService.createUser,
    update: authService.updateUser,
    toggleActive: authService.toggleActive,
    changeStatus: authService.updateRole, // ປຸ່ມ "ປ່ຽນສະຖານະ" = ກຳນົດສິດ
    remove: authService.remove,
  },
  // ກຳນົດສິດ ຕ້ອງມີ role:update (super_admin ເທົ່ານັ້ນ) — admin ຈະບໍ່ເຫັນປຸ່ມນີ້
  crudPermissions: { changeStatus: ["role", "update"] },
  statusOptions: ROLES,
  statusField: "role",
  statusTitle: "ກຳນົດສິດເຂົ້າໃຊ້",
  createLabel: "ເພີ່ມຜູ້ໃຊ້",
  searchPlaceholder: "ຄົ້ນຫາ ຊື່ / ເບີໂທ",
  filters: [{ name: "status", label: "ສິດ (role)", options: ROLES }],
  columns: [
    { key: "username", label: "ຊື່ຜູ້ໃຊ້", strong: true },
    { key: "phoneNumber", label: "ເບີໂທ" },
    { key: "role", label: "ສິດ", type: "badge", options: ROLES },
    activeColumn(),
    createdAtColumn,
  ],
  fields: [
    { name: "username", label: "ຊື່ຜູ້ໃຊ້", required: true },
    { name: "phoneNumber", label: "ເບີໂທ", type: "number", required: true, only: "create" },
    { name: "password", label: "ລະຫັດຜ່ານ", type: "password", required: true, only: "create" },
    {
      name: "newPassword",
      label: "ຕັ້ງລະຫັດຜ່ານໃໝ່",
      type: "password",
      only: "edit",
      hint: "ເວັ້ນວ່າງໄວ້ ຖ້າບໍ່ຕ້ອງການປ່ຽນ",
    },
    {
      name: "role",
      label: "ສິດເຂົ້າໃຊ້",
      type: "select",
      options: ROLES,
      only: "create",
      default: "general",
      permission: ["role", "update"], // admin ບໍ່ເຫັນຊ່ອງນີ້ → ຜູ້ໃຊ້ໃໝ່ໄດ້ general
    },
  ],
};
