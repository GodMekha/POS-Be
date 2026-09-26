import { useCallback, useEffect, useState } from "react";
import { normalizeList } from "../service/api/apiClient.js";

/**
 * ດຶງລາຍການຈາກ service (getAll / getBy...)
 *   const { rows, totalPage, loading, error, reload } = useList(productService.getAll, { page, limit });
 * fetcher = null → ບໍ່ດຶງ
 */
export const useList = (fetcher, params) => {
  const [state, setState] = useState({ rows: [], totalPage: 1, loading: !!fetcher, error: "" });
  const key = JSON.stringify(params ?? {});

  const reload = useCallback(async () => {
    if (!fetcher) return;
    setState((s) => ({ ...s, loading: true, error: "" }));
    try {
      const { rows, totalPage } = normalizeList(await fetcher(JSON.parse(key)));
      setState({ rows, totalPage: Math.max(1, totalPage), loading: false, error: "" });
    } catch (e) {
      setState({ rows: [], totalPage: 1, loading: false, error: e.message });
    }
  }, [fetcher, key]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { ...state, reload };
};
