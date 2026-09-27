import { useLocation } from "react-router-dom";
import { PAGE_TITLES } from "../../features/resources/registry.js";

/** ["/orders"] → [{ to: "/orders", label: "ອໍເດີ", isLast: true }] */
export const useBreadcrumbs = () => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  return segments.map((segment, index) => ({
    to: `/${segments.slice(0, index + 1).join("/")}`,
    label: PAGE_TITLES[segment] || segment,
    isLast: index === segments.length - 1,
  }));
};
