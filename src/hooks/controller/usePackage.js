// Controller 9: Package — hook ທີ່ໃຊ້ packageService
import { packageService } from "../../service/packageService.js";
import { useList } from "../useList.js";
import { useOne } from "../useOne.js";
import { useActions } from "../useMutation.js";

/** ລາຍການ Package (getAll): const { rows, totalPage, loading, error, reload } = usePackageList({ page: 1, limit: 15 }) */
export const usePackageList = (params) => useList(packageService.getAll, params);

/** Package 1 ລາຍການ (getOne) */
export const usePackage = (id) => useOne(packageService.getOne, id);

/** ຄຳສັ່ງ ເພີ່ມ/ແກ້/ລຶບ/ປ່ຽນສະຖານະ ຂອງ Package */
export const usePackageActions = () => useActions(packageService);
