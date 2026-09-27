import { cx } from "../../utils/cx.js";

export const Card = ({ className, children }) => (
  <div
    className={cx(
      "bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800",
      className
    )}
  >
    {children}
  </div>
);
