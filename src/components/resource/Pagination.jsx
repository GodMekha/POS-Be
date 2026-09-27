import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton, inputClass } from "../ui/index.js";
import { PAGE_SIZES } from "../../constants/options.js";
import { ELLIPSIS, buildPageNumbers } from "../../utils/pagination.js";
import { cx } from "../../utils/cx.js";

const PageSizeSelect = ({ limit, onChange }) => (
  <div className="flex items-center gap-2">
    ສະແດງ
    <select
      className={`${inputClass} !w-auto !py-1`}
      value={limit}
      onChange={(event) => onChange(Number(event.target.value))}
    >
      {PAGE_SIZES.map((size) => (
        <option key={size}>{size}</option>
      ))}
    </select>
    ລາຍການ / ໜ້າ
  </div>
);

const Pagination = ({ page, totalPage, limit, onPageChange, onLimitChange }) => (
  <footer className="flex flex-wrap items-center justify-between gap-3 mt-6 text-sm text-slate-500 dark:text-slate-400">
    <PageSizeSelect limit={limit} onChange={onLimitChange} />

    <nav className="flex items-center gap-1">
      <IconButton disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        <ChevronLeft size={16} />
      </IconButton>

      {buildPageNumbers(page, totalPage).map((p, i) =>
        p === ELLIPSIS ? (
          <span key={`gap-${i}`} className="px-2">
            {ELLIPSIS}
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={cx(
              "w-8 h-8 rounded-lg text-sm",
              p === page ? "bg-blue-600 text-white" : "hover:bg-slate-100 dark:hover:bg-slate-800"
            )}
          >
            {p}
          </button>
        )
      )}

      <IconButton disabled={page >= totalPage} onClick={() => onPageChange(page + 1)}>
        <ChevronRight size={16} />
      </IconButton>
    </nav>
  </footer>
);

export default Pagination;
