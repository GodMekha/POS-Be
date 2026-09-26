// Controller 1: Auth — hook ທີ່ໃຊ້ authService
import { authService } from "../../service/authService.js";
import { useList } from "../useList.js";
import { useOne } from "../useOne.js";
import { useActions } from "../useMutation.js";

/** ລາຍການ User (getAll): const { rows, totalPage, loading, error, reload } = useUserList({ page: 1, limit: 15 }) */
export const useUserList = (params) => useList(authService.getAll, params);

/** User 1 ລາຍການ (getOne) */
export const useUser = (id) => useOne(authService.getOne, id);

/** ຄຳສັ່ງ ເພີ່ມ/ແກ້/ລຶບ/ປ່ຽນສະຖານະ ຂອງ User */
export const useUserActions = () => useActions(authService);
