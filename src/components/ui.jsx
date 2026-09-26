import { useEffect } from "react";
import { X, Loader2, AlertTriangle } from "lucide-react";

export const cx = (...c) => c.filter(Boolean).join(" ");

export const fmtNumber = (n) =>
  n === null || n === undefined || n === "" ? "-" : Number(n).toLocaleString("en-US");

export const fmtDate = (d) => {
  if (!d) return "-";
  const x = new Date(d);
  if (isNaN(x)) return String(d);
  return x.toLocaleString("en-GB", {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
};

const BADGE = {
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  red: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300",
  slate: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
};

export const Badge = ({ color = "slate", children }) => (
  <span className={cx("inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap", BADGE[color] || BADGE.slate)}>
    {children}
  </span>
);

export const Button = ({ variant = "primary", className, children, loading, ...p }) => {
  const v = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-600/20",
    ghost: "border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800",
    danger: "bg-red-600 text-white hover:bg-red-700",
  }[variant];
  return (
    <button
      className={cx("inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed", v, className)}
      disabled={loading || p.disabled}
      {...p}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
};

export const inputCls =
  "w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100";

export const Card = ({ className, children }) => (
  <div className={cx("bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800", className)}>
    {children}
  </div>
);

export const Modal = ({ open, onClose, title, children, footer, wide }) => {
  useEffect(() => {
    if (!open) return;
    const h = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onMouseDown={onClose}>
      <div
        className={cx("w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col max-h-[90vh]", wide ? "max-w-3xl" : "max-w-lg")}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <X size={20} />
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
};

export const ErrorBox = ({ children }) =>
  children ? (
    <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-sm dark:bg-red-500/10 dark:text-red-300">
      <AlertTriangle size={18} className="shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  ) : null;

// ---- toast ແບບງ່າຍ ----
export const toast = (message, type = "success") =>
  window.dispatchEvent(new CustomEvent("app:toast", { detail: { message, type, id: Date.now() + Math.random() } }));
