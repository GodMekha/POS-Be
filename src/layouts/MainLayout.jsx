import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import { useSidebar } from "../hooks/common/useSidebar.js";

const MainLayout = () => {
  const sidebar = useSidebar();
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0b0f19]">
      <Sidebar isOpen={sidebar.isOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar isSidebarOpen={sidebar.isOpen} onToggleSidebar={sidebar.toggle} />
        <main className="p-4 md:p-6 lg:p-8 flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
