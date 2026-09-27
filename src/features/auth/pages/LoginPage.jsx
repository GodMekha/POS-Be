import { Navigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Lock, Phone, User } from "lucide-react";
import { AUTH_TABS, useAuthForm } from "../hooks/useAuthForm.js";
import { useAuth } from "../../../hooks/common/useAuth.js";
import { Button, ErrorBox, ThemeToggle, inputClass } from "../../../components/ui/index.js";
import { cx } from "../../../utils/cx.js";

const IconInput = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
    <input className={`${inputClass} pl-10 py-3`} {...props} />
  </div>
);

const Brand = () => (
  <div className="flex items-center gap-3 mb-8">
    <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-600/30">
      <LayoutDashboard size={24} />
    </div>
    <div>
      <h1 className="text-xl font-bold text-slate-800 dark:text-white">POS ຫຼັງບ້ານ</h1>
      <p className="text-xs text-slate-400">ລະບົບຈັດການຮ້ານ</p>
    </div>
  </div>
);

const Tabs = ({ active, onChange }) => (
  <div className="flex p-1 mb-6 rounded-2xl bg-slate-100 dark:bg-slate-800">
    {AUTH_TABS.map((tab) => (
      <button
        key={tab.key}
        type="button"
        onClick={() => onChange(tab.key)}
        className={cx(
          "flex-1 py-2 text-sm rounded-xl transition-all",
          active === tab.key ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600 font-semibold" : "text-slate-500 dark:text-slate-400"
        )}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

const LoginForm = () => {
  const { tab, setTab, values, bind, submit, loading, error, submitLabel } = useAuthForm();

  return (
    <>
      <Tabs active={tab} onChange={setTab} />
      <form onSubmit={submit} className="space-y-4">
        <ErrorBox>{error}</ErrorBox>
        {tab === "register" && (
          <IconInput icon={User} placeholder="ຊື່ຜູ້ໃຊ້" value={values.username} onChange={bind("username")} required />
        )}
        <IconInput
          icon={Phone}
          type="tel"
          inputMode="numeric"
          placeholder="ເບີໂທລະສັບ"
          value={values.phoneNumber}
          onChange={bind("phoneNumber")}
          required
        />
        <IconInput
          icon={Lock}
          type="password"
          placeholder="ລະຫັດຜ່ານ"
          value={values.password}
          onChange={bind("password")}
          required
        />
        <Button type="submit" loading={loading} className="w-full py-3">
          {submitLabel}
        </Button>
        <p className="text-center text-xs text-slate-400">ລືມລະຫັດຜ່ານ? ກະລຸນາຕິດຕໍ່ Admin ເພື່ອຕັ້ງລະຫັດໃໝ່</p>
      </form>
    </>
  );
};

const LoginPage = () => {
  const { isAuth } = useAuth();
  const location = useLocation();
  if (isAuth) return <Navigate to={location.state?.from || "/"} replace />;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
      <ThemeToggle className="absolute top-4 right-4" />
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100 dark:border-slate-800 p-8">
        <Brand />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
