// Controller 16: Supply — hook ທີ່ໃຊ້ supplyService
import { supplyService } from "../../service/supplyService.js";
import { useList } from "../useList.js";
import { useOne } from "../useOne.js";
import { useActions } from "../useMutation.js";

/** ລາຍການ Supply (getAll): const { rows, totalPage, loading, error, reload } = useSupplyList({ page: 1, limit: 15 }) */
export const useSupplyList = (params) => useList(supplyService.getAll, params);

/** Supply 1 ລາຍການ (getOne) */
export const useSupply = (id) => useOne(supplyService.getOne, id);

/** ຄຳສັ່ງ ເພີ່ມ/ແກ້/ລຶບ/ປ່ຽນສະຖານະ ຂອງ Supply */
export const useSupplyActions = () => useActions(supplyService);
