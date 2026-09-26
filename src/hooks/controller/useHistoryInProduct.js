// Controller 5: HistoryInProduct — hook ທີ່ໃຊ້ historyInProductService
import { historyInProductService } from "../../service/historyInProductService.js";
import { useList } from "../useList.js";
import { useOne } from "../useOne.js";
import { useActions } from "../useMutation.js";

/** ລາຍການ HistoryInProduct (getAll): const { rows, totalPage, loading, error, reload } = useHistoryInProductList({ page: 1, limit: 15 }) */
export const useHistoryInProductList = (params) => useList(historyInProductService.getAll, params);

/** HistoryInProduct 1 ລາຍການ (getOne) */
export const useHistoryInProduct = (id) => useOne(historyInProductService.getOne, id);

/** ຄຳສັ່ງ ເພີ່ມ/ແກ້/ລຶບ/ປ່ຽນສະຖານະ ຂອງ HistoryInProduct */
export const useHistoryInProductActions = () => useActions(historyInProductService);
