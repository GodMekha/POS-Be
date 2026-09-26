import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Phone, Lock, User } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { authService } from "../../../service";
import { Button, ErrorBox, inputCls, toast } from "../../../components/ui";

const TABS = [
  { key: "login", label: "ເຂົ້າສູ່ລະບົບ" },
  { key: "register", label: "ລົງທະບຽນ" },
  { key: "forgot", label: "ລືມລະຫັດຜ່ານ" },
];

const Field = ({ icon: Icon, ...p }) => (
  <div className="relative">
    <Icon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
    <input className={inputCls + " pl-10 py-3"} {...p} />
  </div>
);

const Login = () => {
  const { login, isAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ username: "", phoneNumber: "", password: "", newPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuth) return <Navigate to={location.state?.from || "/"} replace />;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (tab === "login") {
        await login(form.phoneNumber, form.password);
        navigate(location.state?.from || "/", { replace: true });
      } else if (tab === "register") {
        await authService.register({ username: form.username, phoneNumber: form.phoneNumber, password: form.password });
        toast("ລົງທະບຽນສຳເລັດ, ກະລຸນາເຂົ້າສູ່ລະບົບ");
        setTab("login");
      } else {
        await authService.forgot({ phoneNumber: form.phoneNumber, newPassword: form.newPassword });
        toast("ຕັ້ງລະຫັດຜ່ານໃໝ່ສຳເລັດ");
        setTab("login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100 dark:border-slate-800 p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-600/30">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">POS ຫຼັງບ້ານ</h1>
            <p className="text-xs text-slate-400">ລະບົບຈັດການຮ້ານ</p>
          </div>
        </div>

        <div className="flex p-1 mb-6 rounded-2xl bg-slate-100 dark:bg-slate-800">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => { setTab(t.key); setError(""); }}
              className={`flex-1 py-2 text-sm rounded-xl transition-all ${tab === t.key ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600 font-semibold" : "text-slate-500"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-4">
          <ErrorBox>{error}</ErrorBox>
          {tab === "register" && <Field icon={User} placeholder="ຊື່ຜູ້ໃຊ້" value={form.username} onChange={set("username")} required />}
          <Field icon={Phone} type="tel" inputMode="numeric" placeholder="ເບີໂທລະສັບ" value={form.phoneNumber} onChange={set("phoneNumber")} required />
          {tab !== "forgot" ? (
            <Field icon={Lock} type="password" placeholder="ລະຫັດຜ່ານ" value={form.password} onChange={set("password")} required />
          ) : (
            <Field icon={Lock} type="password" placeholder="ລະຫັດຜ່ານໃໝ່" value={form.newPassword} onChange={set("newPassword")} required />
          )}
          <Button type="submit" loading={loading} className="w-full py-3">
            {TABS.find((t) => t.key === tab).label}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
