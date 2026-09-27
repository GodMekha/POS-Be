import { Search, X } from "lucide-react";
import { Button, Select, inputClass } from "../ui/index.js";
import { toLookupOptions } from "../../hooks/common/useLookups.js";

const FilterLabel = ({ label, children }) => (
  <label className="text-xs text-slate-500 dark:text-slate-400">
    <span className="block mb-1">{label}</span>
    {children}
  </label>
);

const SearchInput = ({ value, placeholder, onChange }) => (
  <div className="relative flex-1 min-w-[200px] max-w-sm">
    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
    <input
      className={`${inputClass} pl-9`}
      placeholder={placeholder || "ຄົ້ນຫາ..."}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  </div>
);

/** ແຖບຄົ້ນຫາ + ຕົວກອງ + ຊ່ວງວັນທີ */
const ResourceToolbar = ({ resource, query, lookups }) => {
  const { filters } = query;

  return (
    <div className="flex flex-wrap items-end gap-3 mb-5">
      {!resource.noSearch && (
        <SearchInput
          value={query.searchInput}
          placeholder={resource.searchPlaceholder}
          onChange={query.setSearchInput}
        />
      )}

      {resource.filters?.map((filter) => (
        <FilterLabel key={filter.name} label={filter.label}>
          <Select
            className="min-w-[150px] max-w-[240px]"
            placeholder="ທັງໝົດ"
            options={filter.source ? toLookupOptions(filter.source, lookups[filter.source]) : filter.options}
            value={filters.values[filter.name]}
            onChange={(value) => filters.setFilter(filter.name, value)}
          />
        </FilterLabel>
      ))}

      <FilterLabel label="ແຕ່ວັນທີ">
        <input
          type="date"
          className={inputClass}
          value={filters.dateRange.startDate}
          onChange={(event) => filters.setFilter("startDate", event.target.value)}
        />
      </FilterLabel>
      <FilterLabel label="ຫາວັນທີ">
        <input
          type="date"
          className={inputClass}
          value={filters.dateRange.endDate}
          onChange={(event) => filters.setFilter("endDate", event.target.value)}
        />
      </FilterLabel>

      {filters.activeCount > 0 && (
        <Button variant="ghost" onClick={filters.clearFilters}>
          <X size={14} /> ລ້າງຕົວກອງ ({filters.activeCount})
        </Button>
      )}
    </div>
  );
};

export default ResourceToolbar;
