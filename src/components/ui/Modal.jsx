import { useEffect } from "react";
import { X } from "lucide-react";
import { cx } from "../../utils/cx.js";

const useEscapeKey = (active, onEscape) => {
  useEffect(() => {
    if (!active) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && onEscape?.();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, onEscape]);
};

export const Modal = ({ open, onClose, title, children, footer, wide = false }) => {
  useEscapeKey(open, onClose);
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={cx(
          "w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col max-h-[90vh]",
          wide ? "max-w-3xl" : "max-w-lg"
        )}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </header>
        <div className="px-6 py-5 overflow-y-auto">{children}</div>
        {footer && (
          <footer className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};
