import { Link } from "react-router-dom";
import { AlignLeft, ChevronRight, Menu, UserCircle } from "lucide-react";
import { useAuth } from "../hooks/common/useAuth.js";
import { useBreadcrumbs } from "../hooks/common/useBreadcrumbs.js";
import { Badge, ThemeToggle } from "../components/ui/index.js";
import { ROLES, findOption } from "../constants/options.js";

const Breadcrumbs = () => {
  const crumbs = useBreadcrumbs();
  return (
    <div className="hidden sm:flex items-center gap-x-2 text-sm font-medium border-l pl-4 border-slate-200 dark:border-slate-700">
      <Link to="/" className="text-slate-400 hover:text-blue-500">
        ໜ້າຫຼັກ
      </Link>
      {crumbs.map(({ to, label, isLast }) => (
        <div key={to} className="flex items-center gap-x-2">
          <ChevronRight size={12} className="text-slate-300" />
          {isLast ? (
            <span className="font-bold text-slate-800 dark:text-blue-400">{label}</span>
          ) : (
            <Link to={to} className="text-slate-400 hover:text-blue-500">
              {label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

const UserMenu = () => {
  const { user } = useAuth();
  const role = findOption(ROLES, user?.role);
  return (
    <Link to="/profile" className="flex items-center gap-x-3 border-l pl-4 border-slate-200 dark:border-slate-700">
      <div className="text-right hidden sm:block">
        <p className="text-sm font-bold leading-none mb-1 text-slate-800 dark:text-white">{user?.username || "User"}</p>
        <p className="text-[11px] text-slate-400">
          {user?.phoneNumber} {role && <Badge color={role.color}>{role.label}</Badge>}
        </p>
      </div>
      <UserCircle size={36} className="text-blue-600" />
    </Link>
  );
};

const Navbar = ({ isSidebarOpen, onToggleSidebar }) => (
  <nav className="h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-[50] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
    <div className="flex items-center gap-x-4 min-w-0">
      <button
        type="button"
        onClick={onToggleSidebar}
        className="p-2 rounded-lg transition-all active:scale-90 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        {isSidebarOpen ? <AlignLeft size={22} /> : <Menu size={22} />}
      </button>
      <Breadcrumbs />
    </div>

    <div className="flex items-center gap-x-4">
      <ThemeToggle />
      <UserMenu />
    </div>
  </nav>
);

export default Navbar;
