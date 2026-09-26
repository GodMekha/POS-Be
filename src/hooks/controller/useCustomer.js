// Controller 3: Customer — hook ທີ່ໃຊ້ customerService
import { customerService } from "../../service/customerService.js";
import { useList } from "../useList.js";
import { useOne } from "../useOne.js";
import { useActions } from "../useMutation.js";

/** ລາຍການ Customer (getAll): const { rows, totalPage, loading, error, reload } = useCustomerList({ page: 1, limit: 15 }) */
export const useCustomerList = (params) => useList(customerService.getAll, params);

/** Customer 1 ລາຍການ (getOne) */
export const useCustomer = (id) => useOne(customerService.getOne, id);

/** ຄຳສັ່ງ ເພີ່ມ/ແກ້/ລຶບ/ປ່ຽນສະຖານະ ຂອງ Customer */
export const useCustomerActions = () => useActions(customerService);
