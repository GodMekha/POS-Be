import { useCallback, useEffect, useState } from "react";

const DESKTOP_MIN_WIDTH = 1024;
const MOBILE_MAX_WIDTH = 768;

/** state ຂອງ sidebar: ເປີດເລີ່ມຕົ້ນເທິງ desktop, ປິດອັດຕະໂນມັດເມື່ອຈໍນ້ອຍ */
export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= DESKTOP_MIN_WIDTH);

  useEffect(() => {
    const onResize = () => window.innerWidth < MOBILE_MAX_WIDTH && setIsOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggle = useCallback(() => setIsOpen((open) => !open), []);
  return { isOpen, toggle };
};
