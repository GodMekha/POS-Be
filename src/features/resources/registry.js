/**
 * ລາຍການ resource (CRUD) ທັງ 16 controller ຂອງ api-pos
 * ເພີ່ມໜ້າໃໝ່: ສ້າງໄຟລ໌ໃນ configs/ ແລ້ວເພີ່ມເຂົ້າ array ນີ້ — router ແລະ sidebar ຈະສ້າງໃຫ້ເອງ
 */
import users from "./configs/users.js";
import categories from "./configs/categories.js";
import customers from "./configs/customers.js";
import historyInventories from "./configs/historyInventories.js";
import historyProducts from "./configs/historyProducts.js";
import inventories from "./configs/inventories.js";
import orders from "./configs/orders.js";
import orderDetails from "./configs/orderDetails.js";
import packages from "./configs/packages.js";
import parts from "./configs/parts.js";
import products from "./configs/products.js";
import purchases from "./configs/purchases.js";
import purchaseDetails from "./configs/purchaseDetails.js";
import sells from "./configs/sells.js";
import sellDetails from "./configs/sellDetails.js";
import supplies from "./configs/supplies.js";

export const RESOURCES = [
  users,
  categories,
  customers,
  historyInventories,
  historyProducts,
  inventories,
  orders,
  orderDetails,
  packages,
  parts,
  products,
  purchases,
  purchaseDetails,
  sells,
  sellDetails,
  supplies,
];

/** ຈັດກຸ່ມຕາມ `group` ສຳລັບ sidebar: [{ group, items: [...] }] */
export const groupResources = (resources) =>
  resources.reduce((groups, resource) => {
    const found = groups.find((g) => g.group === resource.group);
    if (found) found.items.push(resource);
    else groups.push({ group: resource.group, items: [resource] });
    return groups;
  }, []);

/** path segment → title (ໃຊ້ໃນ breadcrumb) */
export const PAGE_TITLES = {
  ...Object.fromEntries(RESOURCES.map((r) => [r.path.slice(1), r.title])),
  profile: "ໂປຣໄຟລ໌",
};
