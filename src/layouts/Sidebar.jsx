import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, LogOut, UserCog } from "lucide-react";
import { RESOURCES, groupResources } from "../features/resources/registry.js";
import { readableResources } from "../features/resources/lib/permissions.js";
import { useAuth } from "../hooks/common/useAuth.js";
import { usePermission } from "../hooks/common/usePermission.js";
import { cx } from "../utils/cx.js";

const linkClass = (collapsed) => ({ isActive }) =>
  cx(
    "flex items-center gap-x-3 px-3 py-2.5 rounded-xl text-sm transition-all",
    collapsed && "justify-center",
    isActive
      ? "bg-blue-50 text-blue-600 font-semibold dark:bg-blue-500/10 dark:text-blue-400"
      : "text-slate-500 hover:bg-slate-50 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-800"
  );

const SectionTitle = ({ show, children }) =>
  show ? (
    <div className="px-3 mt-4 mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">{children}</div>
  ) : null;

const NavItem = ({ to, icon: Icon, label, isOpen, end }) => (
  <NavLink to={to} end={end} className={linkClass(!isOpen)} title={label}>
    <Icon size={20} className="shrink-0" />
    {isOpen && <span className="truncate">{label}</span>}
  </NavLink>
);

/** ເມນູສະເພາະໜ້າທີ່ຜູ້ໃຊ້ມີສິດເບິ່ງ */
const useMenuGroups = () => {
  const { can } = usePermission();
  return useMemo(() => groupResources(readableResources(RESOURCES, can)), [can]);
};

const Sidebar = ({ isOpen }) => {
  const { logout } = useAuth();
  const menuGroups = useMenuGroups();

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
        <NavItem to="/" end icon={LayoutDashboard} label="ໜ້າຫຼັກ" isOpen={isOpen} />

        {menuGroups.map(({ group, items }) => (
          <div key={group}>
            <SectionTitle show={isOpen}>{group}</SectionTitle>
            {items.map((resource) => (
              <NavItem key={resource.key} to={resource.path} icon={resource.icon} label={resource.title} isOpen={isOpen} />
            ))}
          </div>
        ))}

        <SectionTitle show={isOpen}>ບັນຊີ</SectionTitle>
        <NavItem to="/profile" icon={UserCog} label="ໂປຣໄຟລ໌ / ລະຫັດຜ່ານ" isOpen={isOpen} />
      </nav>

      <div className="border-t border-slate-100 dark:border-slate-800 p-3 shrink-0">
        <button
          type="button"
          onClick={logout}
          className={cx(
            "flex items-center gap-x-3 px-3 py-2.5 w-full text-slate-500 dark:text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all text-sm",
            !isOpen && "justify-center"
          )}
        >
          <LogOut size={20} />
          {isOpen && <span>ອອກຈາກລະບົບ</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
