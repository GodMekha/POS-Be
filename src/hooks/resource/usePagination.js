import { useCallback, useState } from "react";
import { DEFAULT_PAGE_SIZE } from "../../constants/options.js";

/**
 * state ຂອງການແບ່ງໜ້າ — ກັບໄປໜ້າ 1 ອັດຕະໂນມັດເມື່ອ `resetKey` ປ່ຽນ
 * (ເຊັ່ນ ເມື່ອຄົ້ນຫາ ຫຼື ປ່ຽນຕົວກອງ) ໂດຍບໍ່ຕ້ອງໃຊ້ useEffect
 */
export const usePagination = (resetKey, initialLimit = DEFAULT_PAGE_SIZE) => {
  const [state, setState] = useState({ page: 1, resetKey });
  const [limit, setLimitState] = useState(initialLimit);

  const page = state.resetKey === resetKey ? state.page : 1;

  const setPage = useCallback(
    (next) =>
      setState((prev) => {
        const current = prev.resetKey === resetKey ? prev.page : 1;
        return { resetKey, page: typeof next === "function" ? next(current) : next };
      }),
    [resetKey]
  );

  const setLimit = useCallback(
    (next) => {
      setLimitState(next);
      setState({ page: 1, resetKey });
    },
    [resetKey]
  );

  return { page, limit, setPage, setLimit, offset: (page - 1) * limit };
};
