import { NavLink } from "react-router-dom";
import { LayoutDashboard, LogOut, UserCog } from "lucide-react";
import { RESOURCES } from "../config/resources";
import { useAuth } from "../hooks/useAuth";
import { cx } from "../components/ui";

const linkCls = (isOpen) => ({ isActive }) =>
  cx(
    "flex items-center gap-x-3 px-3 py-2.5 rounded-xl text-sm transition-all",
    !isOpen && "justify-center",
    isActive
      ? "bg-blue-50 text-blue-600 font-semibold dark:bg-blue-500/10 dark:text-blue-400"
      : "text-slate-500 hover:bg-slate-50 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-800"
  );

const SideBarComponents = ({ isOpen }) => {
  const { logout } = useAuth();

  return (
    <aside
      className={cx(
        "bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen sticky top-0 shrink-0 flex flex-col transition-all duration-300",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className={cx("flex gap-x-3 items-center h-16 px-5 shrink-0", !isOpen && "justify-center px-0")}>
        <div className="bg-blue-600 p-1.5 rounded-lg text-white shrink-0 shadow-md">
          <LayoutDashboard size={22} />
        </div>
        {isOpen && <h1 className="text-slate-800 dark:text-white font-bold text-lg">POS Admin</h1>}
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 pb-4 custom-scrollbar">
        <NavLink to="/" end className={linkCls(isOpen)} title="ໜ້າຫຼັກ">
          <LayoutDashboard size={20} className="shrink-0" />
          {isOpen && <span>ໜ້າຫຼັກ</span>}
        </NavLink>

        {isOpen && (
          <div className="px-3 mt-4 mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            ຂໍ້ມູນ (16 controller)
          </div>
        )}
        {RESOURCES.map((r, i) => (
          <NavLink key={r.key} to={r.path} className={linkCls(isOpen)} title={`${i + 1}. ${r.title}`}>
            <r.icon size={20} className="shrink-0" />
            {isOpen && (
              <span className="truncate">
                <span className="inline-block w-6 text-slate-400 tabular-nums">{i + 1}.</span>
                {r.title}
              </span>
            )}
          </NavLink>
        ))}

        <div className="mt-4">
          {isOpen && <div className="px-3 mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">ບັນຊີ</div>}
          <NavLink to="/profile" className={linkCls(isOpen)} title="ໂປຣໄຟລ໌">
            <UserCog size={20} className="shrink-0" />
            {isOpen && <span>ໂປຣໄຟລ໌ / ລະຫັດຜ່ານ</span>}
          </NavLink>
        </div>
      </nav>

      <div className="border-t border-slate-100 dark:border-slate-800 p-3 shrink-0">
        <button
          onClick={logout}
          className={cx("flex items-center gap-x-3 px-3 py-2.5 w-full text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all text-sm", !isOpen && "justify-center")}
        >
          <LogOut size={20} />
          {isOpen && <span>ອອກຈາກລະບົບ</span>}
        </button>
      </div>
    </aside>
  );
};

export default SideBarComponents;
