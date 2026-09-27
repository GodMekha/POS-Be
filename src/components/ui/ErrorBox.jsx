import { AlertTriangle } from "lucide-react";

export const ErrorBox = ({ children }) => {
  if (!children) return null;
  return (
    <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-sm dark:bg-red-500/10 dark:text-red-300">
      <AlertTriangle size={18} className="shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
};
