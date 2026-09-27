import { useMemo } from "react";
import { useAsync } from "./useAsync.js";
import { normalizeList } from "../../api/normalizeList.js";

/**
 * ດຶງລາຍການຈາກ service (getAll / getBy...)
 *   const { rows, totalPage, loading, error, reload } = useList(productService.getAll, { page, limit });
 * fetcher = null → ບໍ່ດຶງ
 */
export const useList = (fetcher, params) => {
  const paramsKey = JSON.stringify(params ?? {});
  const { data, loading, error, reload } = useAsync(
    () => fetcher?.(JSON.parse(paramsKey)).then(normalizeList) ?? null,
    [fetcher, paramsKey]
  );
  const { rows, totalPage } = useMemo(() => data ?? { rows: [], totalPage: 1 }, [data]);
  return { rows, totalPage, loading, error, reload };
};
