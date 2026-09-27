import Forbidden from "../components/feedback/Forbidden.jsx";
import { usePermission } from "../hooks/common/usePermission.js";

/** ປ້ອງກັນ route ຕາມສິດ: <RequirePermission resource="product">...</RequirePermission> */
const RequirePermission = ({ resource, action = "read", children }) => {
  const { can } = usePermission();
  return can(resource, action) ? children : <Forbidden />;
};

export default RequirePermission;
