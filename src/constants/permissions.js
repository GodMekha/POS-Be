/**
 * ຊື່ resource / action ຕ້ອງກົງກັບ api-pos/src/config/permissions.js
 * (ຕາຕະລາງສິດຕົວຈິງ API ສົ່ງມາໃຫ້ຕອນ login ແລະ /auth/me — frontend ບໍ່ hard-code)
 */
export const ACTIONS = { read: "read", create: "create", update: "update", delete: "delete" };

export const RESOURCES_KEY = {
  user: "user",
  role: "role",
  category: "category",
  customer: "customer",
  historyInventory: "historyInventory",
  historyProduct: "historyProduct",
  inventory: "inventory",
  order: "order",
  orderDetail: "orderDetail",
  package: "package",
  part: "part",
  product: "product",
  purchase: "purchase",
  purchaseDetail: "purchaseDetail",
  sell: "sell",
  sellDetail: "sellDetail",
  supply: "supply",
};

/** ຄຳສັ່ງ crud ຂອງ ResourcePage → action ທີ່ຕ້ອງມີ */
export const CRUD_ACTION = {
  list: ACTIONS.read,
  getOne: ACTIONS.read,
  create: ACTIONS.create,
  update: ACTIONS.update,
  toggleActive: ACTIONS.update,
  changeStatus: ACTIONS.update,
  remove: ACTIONS.delete,
};

/** permissions = { product: ["read", ...] } */
export const hasPermission = (permissions, resource, action = ACTIONS.read) =>
  Boolean(permissions?.[resource]?.includes(action));
