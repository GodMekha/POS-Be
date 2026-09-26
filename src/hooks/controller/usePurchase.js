// Controller 12: Purchase — hook ທີ່ໃຊ້ purchaseService
import { purchaseService } from "../../service/purchaseService.js";
import { useList } from "../useList.js";
import { useOne } from "../useOne.js";
import { useActions } from "../useMutation.js";

/** ລາຍການ Purchase (getAll): const { rows, totalPage, loading, error, reload } = usePurchaseList({ page: 1, limit: 15 }) */
export const usePurchaseList = (params) => useList(purchaseService.getAll, params);

/** Purchase 1 ລາຍການ (getOne) */
export const usePurchase = (id) => useOne(purchaseService.getOne, id);

/** ຄຳສັ່ງ ເພີ່ມ/ແກ້/ລຶບ/ປ່ຽນສະຖານະ ຂອງ Purchase */
export const usePurchaseActions = () => useActions(purchaseService);
