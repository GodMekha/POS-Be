// Controller 6: Inventory — hook ທີ່ໃຊ້ inventoryService
import { inventoryService } from "../../service/inventoryService.js";
import { useList } from "../useList.js";
import { useOne } from "../useOne.js";
import { useActions } from "../useMutation.js";

/** ລາຍການ Inventory (getAll): const { rows, totalPage, loading, error, reload } = useInventoryList({ page: 1, limit: 15 }) */
export const useInventoryList = (params) => useList(inventoryService.getAll, params);

/** Inventory 1 ລາຍການ (getOne) */
export const useInventory = (id) => useOne(inventoryService.getOne, id);

/** ຄຳສັ່ງ ເພີ່ມ/ແກ້/ລຶບ/ປ່ຽນສະຖານະ ຂອງ Inventory */
export const useInventoryActions = () => useActions(inventoryService);
