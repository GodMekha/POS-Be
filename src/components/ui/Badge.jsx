import { cx } from "../../utils/cx.js";

const COLORS = {
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  red: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300",
  slate: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
};

export const Badge = ({ color = "slate", children }) => (
  <span
    className={cx(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap",
      COLORS[color] ?? COLORS.slate
    )}
  >
    {children}
  </span>
);
