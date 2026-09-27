import { useList } from "../common/useList.js";
import { useOne } from "../common/useOne.js";
import { useActions } from "../common/useMutation.js";

/**
 * ສ້າງ hook ມາດຕະຖານ 3 ໂຕໃຫ້ service ໃດໜຶ່ງ:
 *   useList(params)  → { rows, totalPage, loading, error, reload }
 *   useOne(id)       → { data, loading, error, reload }
 *   useActions()     → { insert, update, remove, ..., loading, error }
 */
export const createEntityHooks = (service) => ({
  useList: (params) => useList(service.getAll, params),
  useOne: (id) => useOne(service.getOne, id),
  useActions: () => useActions(service),
});
