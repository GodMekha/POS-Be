import { useCallback, useEffect, useRef, useState } from "react";

const IDLE = { data: null, loading: false, error: "" };

/**
 * Hook ພື້ນຖານສຳລັບດຶງຂໍ້ມູນ async — ຈັດການ loading / error / race condition.
 *   const { data, loading, error, reload } = useAsync(() => service.getOne(id), [id]);
 * @param {() => Promise<any> | null} asyncFn  ສົ່ງ null ມາ = ບໍ່ຕ້ອງດຶງ
 * @param {any[]} deps  ດຶງໃໝ່ເມື່ອຄ່າໃນ deps ປ່ຽນ
 */
export const useAsync = (asyncFn, deps) => {
  const [state, setState] = useState(() => ({ ...IDLE, loading: true }));
  const requestId = useRef(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const run = useCallback(asyncFn, deps);

  const reload = useCallback(async () => {
    const id = ++requestId.current;
    const promise = run();
    if (!promise) {
      setState(IDLE);
      return;
    }
    setState((s) => ({ ...s, loading: true, error: "" }));
    try {
      const data = await promise;
      if (id === requestId.current) setState({ data, loading: false, error: "" });
    } catch (e) {
      if (id === requestId.current) setState({ data: null, loading: false, error: e.message });
    }
  }, [run]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { ...state, reload };
};
