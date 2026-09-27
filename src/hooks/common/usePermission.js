import { useCallback } from "react";
import { useStore } from "../../store/createStore.js";
import { authStore } from "../../store/authStore.js";
import { ACTIONS, hasPermission } from "../../constants/permissions.js";

const EMPTY = {};

/**
 * ກວດສິດຂອງຜູ້ໃຊ້ປັດຈຸບັນ (ຕາຕະລາງສິດມາຈາກ API)
 *   const { can, role } = usePermission();
 *   can("product", "create")
 */
export const usePermission = () => {
  const user = useStore(authStore, (s) => s.user);
  const permissions = user?.permissions ?? EMPTY;

  const can = useCallback(
    (resource, action = ACTIONS.read) => hasPermission(permissions, resource, action),
    [permissions]
  );

  return { role: user?.role, permissions, can, hasAnyAccess: Object.keys(permissions).length > 0 };
};
