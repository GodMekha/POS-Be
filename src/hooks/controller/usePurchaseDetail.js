// Controller 13: PurchaseDetail — hook ທີ່ໃຊ້ purchaseDetailService
import { purchaseDetailService } from "../../service/purchaseDetailService.js";
import { useList } from "../useList.js";
import { useOne } from "../useOne.js";
import { useActions } from "../useMutation.js";

/** ລາຍການ PurchaseDetail (getAll): const { rows, totalPage, loading, error, reload } = usePurchaseDetailList({ page: 1, limit: 15 }) */
export const usePurchaseDetailList = (params) => useList(purchaseDetailService.getAll, params);

/** PurchaseDetail 1 ລາຍການ (getOne) */
export const usePurchaseDetail = (id) => useOne(purchaseDetailService.getOne, id);

/** ຄຳສັ່ງ ເພີ່ມ/ແກ້/ລຶບ/ປ່ຽນສະຖານະ ຂອງ PurchaseDetail */
export const usePurchaseDetailActions = () => useActions(purchaseDetailService);
