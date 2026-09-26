// Controller 7: Order — hook ທີ່ໃຊ້ orderService
import { orderService } from "../../service/orderService.js";
import { useList } from "../useList.js";
import { useOne } from "../useOne.js";
import { useActions } from "../useMutation.js";

/** ລາຍການ Order (getAll): const { rows, totalPage, loading, error, reload } = useOrderList({ page: 1, limit: 15 }) */
export const useOrderList = (params) => useList(orderService.getAll, params);

/** Order 1 ລາຍການ (getOne) */
export const useOrder = (id) => useOne(orderService.getOne, id);

/** ຄຳສັ່ງ ເພີ່ມ/ແກ້/ລຶບ/ປ່ຽນສະຖານະ ຂອງ Order */
export const useOrderActions = () => useActions(orderService);
