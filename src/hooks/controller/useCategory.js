// Controller 2: Category — hook ທີ່ໃຊ້ categoryService
import { categoryService } from "../../service/categoryService.js";
import { useList } from "../useList.js";
import { useOne } from "../useOne.js";
import { useActions } from "../useMutation.js";

/** ລາຍການ Category (getAll): const { rows, totalPage, loading, error, reload } = useCategoryList({ page: 1, limit: 15 }) */
export const useCategoryList = (params) => useList(categoryService.getAll, params);

/** Category 1 ລາຍການ (getOne) */
export const useCategory = (id) => useOne(categoryService.getOne, id);

/** ຄຳສັ່ງ ເພີ່ມ/ແກ້/ລຶບ/ປ່ຽນສະຖານະ ຂອງ Category */
export const useCategoryActions = () => useActions(categoryService);
