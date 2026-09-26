// Controller 10: Part — hook ທີ່ໃຊ້ partService
import { partService } from "../../service/partService.js";
import { useList } from "../useList.js";
import { useOne } from "../useOne.js";
import { useActions } from "../useMutation.js";

/** ລາຍການ Part (getAll): const { rows, totalPage, loading, error, reload } = usePartList({ page: 1, limit: 15 }) */
export const usePartList = (params) => useList(partService.getAll, params);

/** Part 1 ລາຍການ (getOne) */
export const usePart = (id) => useOne(partService.getOne, id);

/** ຄຳສັ່ງ ເພີ່ມ/ແກ້/ລຶບ/ປ່ຽນສະຖານະ ຂອງ Part */
export const usePartActions = () => useActions(partService);
