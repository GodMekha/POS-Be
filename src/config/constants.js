// ຄ່າຄົງທີ່ ແລະ helper ທີ່ໃຊ້ຮ່ວມກັນ
// ---------- ຄ່າຄົງທີ່ (ກົງກັບ service/message.js ຂອງ API) ----------
export const ORDER_STATUS = [
  { value: "await", label: "ລໍຖ້າ", color: "amber" },
  { value: "pedding", label: "ກຳລັງດຳເນີນການ", color: "blue" },
  { value: "success", label: "ສຳເລັດ", color: "green" },
  { value: "cancel", label: "ຍົກເລີກ", color: "red" },
];
export const ROLES = [
  { value: "general", label: "ທົ່ວໄປ", color: "slate" },
  { value: "admin", label: "Admin", color: "blue" },
  { value: "super_admin", label: "Super Admin", color: "purple" },
];
export const CURRENCIES = [
  { value: "LAK", label: "LAK (ກີບ)" },
  { value: "THB", label: "THB (ບາດ)" },
  { value: "USD", label: "USD (ໂດລາ)" },
];
export const BOOL_ACTIVE = [
  { value: "true", label: "ເປີດໃຊ້ງານ" },
  { value: "false", label: "ປິດໃຊ້ງານ" },
];

export const short = (id) => (id ? String(id).slice(0, 8) : "-");
export const num = (n) => Number(n || 0).toLocaleString("en-US");
export const createdAt = { key: "createdAt", label: "ວັນທີສ້າງ", type: "date" };
export const activeCol = (key = "active") => ({ key, label: "ສະຖານະ", type: "bool" });
