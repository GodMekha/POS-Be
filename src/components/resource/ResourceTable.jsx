import CellValue from "./CellValue.jsx";
import RowActions from "./RowActions.jsx";
import { hasRowActions } from "../../features/resources/lib/form.js";
import { cx } from "../../utils/cx.js";

const SKELETON_ROWS = 5;
const isNumeric = (column) => column.type === "money" || column.type === "number";

const MessageRow = ({ colSpan, children }) => (
  <tr>
    <td colSpan={colSpan} className="py-16 text-center text-slate-400">
      {children}
    </td>
  </tr>
);

const SkeletonRows = ({ colSpan }) =>
  Array.from({ length: SKELETON_ROWS }, (_, i) => (
    <tr key={i}>
      <td colSpan={colSpan} className="py-3 px-2">
        <div className="h-6 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
      </td>
    </tr>
  ));

/**
 * ຕາຕະລາງລາຍການ — ເປັນ presentational component (ຮັບ props, ບໍ່ມີ state)
 */
const ResourceTable = ({ resource, rows, loading, error, offset, lookups, rowHandlers }) => {
  const withActions = hasRowActions(resource);
  const colSpan = resource.columns.length + 2;
  const isEmpty = rows.length === 0;

  return (
    <div className="overflow-x-auto -mx-2 mt-2">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-slate-400 text-xs uppercase tracking-wide border-b border-slate-100 dark:border-slate-800">
            <th className="py-3 px-2 w-10">#</th>
            {resource.columns.map((column) => (
              <th
                key={column.key}
                className={cx("py-3 px-2 font-medium whitespace-nowrap", isNumeric(column) && "text-right")}
              >
                {column.label}
              </th>
            ))}
            {withActions && <th className="py-3 px-2 text-center">ດຳເນີນການ</th>}
          </tr>
        </thead>

        <tbody className="text-slate-600 dark:text-slate-300">
          {loading && isEmpty && <SkeletonRows colSpan={colSpan} />}
          {!loading && isEmpty && !error && <MessageRow colSpan={colSpan}>ບໍ່ມີຂໍ້ມູນ</MessageRow>}

          {rows.map((row, index) => (
            <tr
              key={row[resource.idKey] ?? index}
              className="border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50/70 dark:hover:bg-slate-800/40"
            >
              <td className="py-3 px-2 text-slate-400">{offset + index + 1}</td>
              {resource.columns.map((column) => (
                <td
                  key={column.key}
                  className={cx(
                    "py-3 px-2 max-w-[260px] truncate",
                    column.strong && "font-semibold text-slate-800 dark:text-white",
                    isNumeric(column) && "text-right tabular-nums"
                  )}
                >
                  <CellValue column={column} row={row} lookups={lookups} />
                </td>
              ))}
              {withActions && (
                <td className="py-2 px-2">
                  <RowActions resource={resource} row={row} {...rowHandlers} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceTable;
