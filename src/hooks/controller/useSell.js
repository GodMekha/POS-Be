// Controller 14: Sell — hook ທີ່ໃຊ້ sellService
import { sellService } from "../../service/sellService.js";
import { useList } from "../useList.js";
import { useOne } from "../useOne.js";
import { useActions } from "../useMutation.js";

/** ລາຍການ Sell (getAll): const { rows, totalPage, loading, error, reload } = useSellList({ page: 1, limit: 15 }) */
export const useSellList = (params) => useList(sellService.getAll, params);

/** Sell 1 ລາຍການ (getOne) */
export const useSell = (id) => useOne(sellService.getOne, id);

/** ຄຳສັ່ງ ເພີ່ມ/ແກ້/ລຶບ/ປ່ຽນສະຖານະ ຂອງ Sell */
export const useSellActions = () => useActions(sellService);
