// Hook ຂອງ 16 controller — ສ້າງຈາກ factory ດຽວກັນ ເພື່ອບໍ່ໃຫ້ຂຽນໂຄດຊ້ຳ
import * as services from "../../services/index.js";
import { createEntityHooks } from "./createEntityHooks.js";

const auth = createEntityHooks(services.authService);
const category = createEntityHooks(services.categoryService);
const customer = createEntityHooks(services.customerService);
const historyInInventory = createEntityHooks(services.historyInInventoryService);
const historyInProduct = createEntityHooks(services.historyInProductService);
const inventory = createEntityHooks(services.inventoryService);
const order = createEntityHooks(services.orderService);
const orderDetail = createEntityHooks(services.orderDetailService);
const pkg = createEntityHooks(services.packageService);
const part = createEntityHooks(services.partService);
const product = createEntityHooks(services.productService);
const purchase = createEntityHooks(services.purchaseService);
const purchaseDetail = createEntityHooks(services.purchaseDetailService);
const sell = createEntityHooks(services.sellService);
const sellDetail = createEntityHooks(services.sellDetailService);
const supply = createEntityHooks(services.supplyService);

export const { useList: useUserList, useOne: useUser, useActions: useUserActions } = auth;
export const { useList: useCategoryList, useOne: useCategory, useActions: useCategoryActions } = category;
export const { useList: useCustomerList, useOne: useCustomer, useActions: useCustomerActions } = customer;
export const {
  useList: useHistoryInInventoryList,
  useOne: useHistoryInInventory,
  useActions: useHistoryInInventoryActions,
} = historyInInventory;
export const {
  useList: useHistoryInProductList,
  useOne: useHistoryInProduct,
  useActions: useHistoryInProductActions,
} = historyInProduct;
export const { useList: useInventoryList, useOne: useInventory, useActions: useInventoryActions } = inventory;
export const { useList: useOrderList, useOne: useOrder, useActions: useOrderActions } = order;
export const { useList: useOrderDetailList, useOne: useOrderDetail, useActions: useOrderDetailActions } = orderDetail;
export const { useList: usePackageList, useOne: usePackage, useActions: usePackageActions } = pkg;
export const { useList: usePartList, useOne: usePart, useActions: usePartActions } = part;
export const { useList: useProductList, useOne: useProduct, useActions: useProductActions } = product;
export const { useList: usePurchaseList, useOne: usePurchase, useActions: usePurchaseActions } = purchase;
export const {
  useList: usePurchaseDetailList,
  useOne: usePurchaseDetail,
  useActions: usePurchaseDetailActions,
} = purchaseDetail;
export const { useList: useSellList, useOne: useSell, useActions: useSellActions } = sell;
export const { useList: useSellDetailList, useOne: useSellDetail, useActions: useSellDetailActions } = sellDetail;
export const { useList: useSupplyList, useOne: useSupply, useActions: useSupplyActions } = supply;
