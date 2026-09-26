import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

const Toaster = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const h = (e) => {
      const t = e.detail;
      setItems((s) => [...s, t]);
      setTimeout(() => setItems((s) => s.filter((x) => x.id !== t.id)), 3500);
    };
    window.addEventListener("app:toast", h);
    return () => window.removeEventListener("app:toast", h);
  }, []);
  return (
    <div className="fixed top-4 right-4 z-[200] space-y-2 w-80">
      {items.map((t) => (
        <div
          key={t.id}
          className={`flex items-start gap-2 p-3 rounded-xl shadow-lg text-sm text-white ${t.type === "error" ? "bg-red-600" : "bg-emerald-600"}`}
        >
          {t.type === "error" ? <XCircle size={18} className="shrink-0" /> : <CheckCircle2 size={18} className="shrink-0" />}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
};
export default Toaster;
