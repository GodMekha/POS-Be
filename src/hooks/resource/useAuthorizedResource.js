import { useMemo } from "react";
import { usePermission } from "../common/usePermission.js";
import { filterCrudByPermission } from "../../features/resources/lib/permissions.js";
import { RESOURCES } from "../../features/resources/registry.js";

/** resource config ທີ່ເຫຼືອສະເພາະຄຳສັ່ງທີ່ຜູ້ໃຊ້ປັດຈຸບັນມີສິດ */
export const useAuthorizedResource = (resource) => {
  const { can } = usePermission();
  return useMemo(() => filterCrudByPermission(resource, can, RESOURCES), [resource, can]);
};
