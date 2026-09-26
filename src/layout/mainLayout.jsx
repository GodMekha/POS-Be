import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarComponents from "./sidebar";
import NavbarComponents from "./navbar";

const MainLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);
  useEffect(() => {
    const h = () => window.innerWidth < 768 && setIsOpen(false);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0b0f19]">
      <SidebarComponents isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <NavbarComponents isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="p-4 md:p-6 lg:p-8 flex-1 min-w-0">{children ?? <Outlet />}</main>
      </div>
    </div>
  );
};

export default MainLayout;
