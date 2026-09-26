// Controller 11: Product — hook ທີ່ໃຊ້ productService
import { productService } from "../../service/productService.js";
import { useList } from "../useList.js";
import { useOne } from "../useOne.js";
import { useActions } from "../useMutation.js";

/** ລາຍການ Product (getAll): const { rows, totalPage, loading, error, reload } = useProductList({ page: 1, limit: 15 }) */
export const useProductList = (params) => useList(productService.getAll, params);

/** Product 1 ລາຍການ (getOne) */
export const useProduct = (id) => useOne(productService.getOne, id);

/** ຄຳສັ່ງ ເພີ່ມ/ແກ້/ລຶບ/ປ່ຽນສະຖານະ ຂອງ Product */
export const useProductActions = () => useActions(productService);
