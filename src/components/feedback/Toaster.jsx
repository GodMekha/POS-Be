import { CheckCircle2, XCircle } from "lucide-react";
import { useToasts } from "../../hooks/common/useToasts.js";
import { cx } from "../../utils/cx.js";

const Toaster = () => {
  const toasts = useToasts();
  return (
    <div className="fixed top-4 right-4 z-[200] space-y-2 w-80">
      {toasts.map(({ id, message, type }) => {
        const isError = type === "error";
        const Icon = isError ? XCircle : CheckCircle2;
        return (
          <div
            key={id}
            role="status"
            className={cx(
              "flex items-start gap-2 p-3 rounded-xl shadow-lg text-sm text-white",
              isError ? "bg-red-600" : "bg-emerald-600"
            )}
          >
            <Icon size={18} className="shrink-0" />
            <span>{message}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Toaster;
