import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const DATE_KEYS = ["startDate", "endDate"];

/**
 * ຕົວກອງເກັບໄວ້ໃນ URL (?orderId=...&startDate=...) ເພື່ອໃຫ້ແຊລິ້ງ ແລະ ກົດ back ໄດ້
 */
export const useUrlFilters = (filters) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const values = useMemo(
    () => Object.fromEntries(filters.map((f) => [f.name, searchParams.get(f.name) || ""])),
    [filters, searchParams]
  );

  const dateRange = {
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
  };

  const setFilter = useCallback(
    (name, value) => {
      const next = new URLSearchParams(searchParams);
      if (value) next.set(name, value);
      else next.delete(name);
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const clearFilters = useCallback(() => setSearchParams({}, { replace: true }), [setSearchParams]);

  const activeCount =
    filters.filter((f) => values[f.name]).length + DATE_KEYS.filter((k) => dateRange[k]).length;

  return { values, dateRange, setFilter, clearFilters, activeCount };
};
