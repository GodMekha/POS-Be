import { useState } from "react";
import { useDebounce } from "../common/useDebounce.js";
import { useList } from "../common/useList.js";
import { usePagination } from "./usePagination.js";
import { useUrlFilters } from "./useUrlFilters.js";

const EMPTY_FILTERS = [];

/**
 * State ທັງໝົດຂອງຕາຕະລາງ resource: ຄົ້ນຫາ + ຕົວກອງ + ແບ່ງໜ້າ + ດຶງຂໍ້ມູນ
 */
export const useResourceQuery = (resource) => {
  const filters = resource.filters ?? EMPTY_FILTERS;
  const urlFilters = useUrlFilters(filters);

  const [searchInput, setSearchInput] = useState("");
  const search = useDebounce(searchInput.trim());

  const resetKey = JSON.stringify([search, urlFilters.values, urlFilters.dateRange]);
  const pagination = usePagination(resetKey);

  // ຕົວກອງທີ່ມີ endpoint ສະເພາະ (ເຊັ່ນ productService.getByCategory) ຈະແທນ getAll
  const byFilter = filters.find((f) => f.fetchBy && urlFilters.values[f.name]);
  const fetcher = byFilter ? byFilter.fetchBy : resource.crud.list;

  const buildParams = () => {
    if (byFilter) return urlFilters.values[byFilter.name];
    const query = {
      page: pagination.page,
      limit: pagination.limit,
      search: resource.noSearch ? undefined : search,
      ...urlFilters.dateRange,
    };
    filters.filter((f) => !f.fetchBy).forEach((f) => (query[f.name] = urlFilters.values[f.name]));
    return query;
  };

  // useList ປຽບທຽບ params ດ້ວຍ JSON → ບໍ່ຕ້ອງ memo
  const list = useList(fetcher, buildParams());

  return {
    ...list,
    ...pagination,
    searchInput,
    setSearchInput,
    filters: urlFilters,
  };
};
