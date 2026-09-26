// Controller 4: HistoryInInventory — hook ທີ່ໃຊ້ historyInInventoryService
import { historyInInventoryService } from "../../service/historyInInventoryService.js";
import { useList } from "../useList.js";
import { useOne } from "../useOne.js";
import { useActions } from "../useMutation.js";

/** ລາຍການ HistoryInInventory (getAll): const { rows, totalPage, loading, error, reload } = useHistoryInInventoryList({ page: 1, limit: 15 }) */
export const useHistoryInInventoryList = (params) => useList(historyInInventoryService.getAll, params);

/** HistoryInInventory 1 ລາຍການ (getOne) */
export const useHistoryInInventory = (id) => useOne(historyInInventoryService.getOne, id);

/** ຄຳສັ່ງ ເພີ່ມ/ແກ້/ລຶບ/ປ່ຽນສະຖານະ ຂອງ HistoryInInventory */
export const useHistoryInInventoryActions = () => useActions(historyInInventoryService);
