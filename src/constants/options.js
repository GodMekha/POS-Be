// ຄ່າຄົງທີ່ (ກົງກັບ service/message.js ຂອງ api-pos)

export const ORDER_STATUS = [
  { value: "await", label: "ລໍຖ້າ", color: "amber" },
  { value: "pedding", label: "ກຳລັງດຳເນີນການ", color: "blue" },
  { value: "success", label: "ສຳເລັດ", color: "green" },
  { value: "cancel", label: "ຍົກເລີກ", color: "red" },
];

/** ຕ້ອງກົງກັບ api-pos/src/config/permissions.js */
export const ROLES = [
  { value: "super_admin", label: "Super Admin", color: "purple" },
  { value: "admin", label: "Admin", color: "blue" },
  { value: "sell", label: "ພະນັກງານຂາຍ", color: "green" },
  { value: "staff", label: "ພະນັກງານສາງ", color: "amber" },
  { value: "general", label: "ລໍຖ້າກຳນົດສິດ", color: "slate" },
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

export const PAGE_SIZES = [10, 15, 25, 50, 100];
export const DEFAULT_PAGE_SIZE = 15;
export const LOOKUP_LIMIT = 1000;
export const LOW_STOCK_THRESHOLD = 10;

export const findOption = (options, value) => options?.find((o) => o.value === value);
