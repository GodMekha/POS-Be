import { Loader2 } from "lucide-react";
import { cx } from "../../utils/cx.js";

const VARIANTS = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-600/20",
  ghost:
    "border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

export const Button = ({ variant = "primary", className, children, loading = false, disabled, ...props }) => (
  <button
    className={cx(
      "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
      VARIANTS[variant],
      className
    )}
    disabled={loading || disabled}
    {...props}
  >
    {loading && <Loader2 size={16} className="animate-spin" />}
    {children}
  </button>
);
