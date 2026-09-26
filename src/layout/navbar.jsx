import { UserCircle, ChevronRight, Moon, Sun, Menu, AlignLeft } from "lucide-react";
import { useTheme } from "../config/theme/ThemeContext";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { RESOURCES } from "../config/resources";

const TITLES = Object.fromEntries(RESOURCES.map((r) => [r.path.slice(1), r.title]));
TITLES.profile = "ໂປຣໄຟລ໌";

const NavbarComponents = ({ isOpen, setIsOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-[50] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-x-4 min-w-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg transition-all active:scale-90 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {isOpen ? <AlignLeft size={22} /> : <Menu size={22} />}
        </button>

        <div className="hidden sm:flex items-center gap-x-2 text-sm font-medium border-l pl-4 border-slate-200 dark:border-slate-700">
          <Link to="/" className="text-slate-400 hover:text-blue-500">ໜ້າຫຼັກ</Link>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const label = TITLES[name] || name;
            return (
              <div key={routeTo} className="flex items-center gap-x-2">
                <ChevronRight size={12} className="text-slate-300" />
                {isLast ? (
                  <span className="font-bold text-slate-800 dark:text-blue-400">{label}</span>
                ) : (
                  <Link to={routeTo} className="text-slate-400 hover:text-blue-500">{label}</Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-x-4">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-xl transition-all active:scale-90 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-yellow-400 dark:hover:bg-slate-700"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <Link to="/profile" className="flex items-center gap-x-3 border-l pl-4 border-slate-200 dark:border-slate-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none mb-1 text-slate-800 dark:text-white">{user?.username || "User"}</p>
            <p className="text-[11px] text-slate-400">{user?.phoneNumber}</p>
          </div>
          <UserCircle size={36} className="text-blue-600" />
        </Link>
      </div>
    </nav>
  );
};

export default NavbarComponents;
