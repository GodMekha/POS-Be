import { useCallback, useEffect, useState } from "react";

/** ດຶງຂໍ້ມູນ 1 ລາຍການ: const { data, loading, error } = useOne(productService.getOne, id) */
export const useOne = (fetcher, id) => {
  const [state, setState] = useState({ data: null, loading: !!id, error: "" });
  const reload = useCallback(async () => {
    if (!id) return;
    setState((s) => ({ ...s, loading: true, error: "" }));
    try {
      setState({ data: await fetcher(id), loading: false, error: "" });
    } catch (e) {
      setState({ data: null, loading: false, error: e.message });
    }
  }, [fetcher, id]);
  useEffect(() => {
    reload();
  }, [reload]);
  return { ...state, reload };
};
