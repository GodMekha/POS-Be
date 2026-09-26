// Controller 8: OrderDetail — hook ທີ່ໃຊ້ orderDetailService
import { orderDetailService } from "../../service/orderDetailService.js";
import { useList } from "../useList.js";
import { useOne } from "../useOne.js";
import { useActions } from "../useMutation.js";

/** ລາຍການ OrderDetail (getAll): const { rows, totalPage, loading, error, reload } = useOrderDetailList({ page: 1, limit: 15 }) */
export const useOrderDetailList = (params) => useList(orderDetailService.getAll, params);

/** OrderDetail 1 ລາຍການ (getOne) */
export const useOrderDetail = (id) => useOne(orderDetailService.getOne, id);

/** ຄຳສັ່ງ ເພີ່ມ/ແກ້/ລຶບ/ປ່ຽນສະຖານະ ຂອງ OrderDetail */
export const useOrderDetailActions = () => useActions(orderDetailService);
