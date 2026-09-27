import { cx } from "../../utils/cx.js";

export const IconButton = ({ className, children, ...props }) => (
  <button
    type="button"
    className={cx(
      "p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none",
      className
    )}
    {...props}
  >
    {children}
  </button>
);
