// Controller 15: SellDetail — hook ທີ່ໃຊ້ sellDetailService
import { sellDetailService } from "../../service/sellDetailService.js";
import { useList } from "../useList.js";
import { useOne } from "../useOne.js";
import { useActions } from "../useMutation.js";

/** ລາຍການ SellDetail (getAll): const { rows, totalPage, loading, error, reload } = useSellDetailList({ page: 1, limit: 15 }) */
export const useSellDetailList = (params) => useList(sellDetailService.getAll, params);

/** SellDetail 1 ລາຍການ (getOne) */
export const useSellDetail = (id) => useOne(sellDetailService.getOne, id);

/** ຄຳສັ່ງ ເພີ່ມ/ແກ້/ລຶບ/ປ່ຽນສະຖານະ ຂອງ SellDetail */
export const useSellDetailActions = () => useActions(sellDetailService);
