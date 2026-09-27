import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/common/useAuth.js";

/** ຕ້ອງ login ກ່ອນ — ຖ້າບໍ່ ສົ່ງໄປ /login ພ້ອມຈື່ໜ້າເດີມ */
const ProtectedRoute = () => {
  const { isAuth } = useAuth();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
