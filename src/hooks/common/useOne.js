import { useAsync } from "./useAsync.js";

/** ດຶງຂໍ້ມູນ 1 ລາຍການ: const { data, loading, error, reload } = useOne(productService.getOne, id) */
export const useOne = (fetcher, id) => useAsync(() => (id ? fetcher(id) : null), [fetcher, id]);
