import { useCallback, useState } from "react";
import { invalidateLookup } from "../common/useLookups.js";
import { toast } from "../../store/toastStore.js";

/**
 * ຄຳສັ່ງໃນແຖວຕາຕະລາງ: ລຶບ / ເປີດ-ປິດ / ປ່ຽນສະຖານະ
 * ສຳເລັດແລ້ວ → ລ້າງ cache dropdown + ໂຫລດລາຍການໃໝ່
 */
export const useResourceActions = (resource, reload) => {
  const [busy, setBusy] = useState(false);
  const { crud, idKey, key } = resource;

  const refresh = useCallback(() => {
    invalidateLookup(key);
    reload();
  }, [key, reload]);

  const run = useCallback(
    async (action, successMessage) => {
      setBusy(true);
      try {
        await action();
        toast.success(successMessage);
        refresh();
        return true;
      } catch (e) {
        toast.error(e.message);
        return false;
      } finally {
        setBusy(false);
      }
    },
    [refresh]
  );

  return {
    busy,
    refresh,
    remove: (row) => run(() => crud.remove(row[idKey]), "ລຶບສຳເລັດ"),
    toggleActive: (row) => run(() => crud.toggleActive(row[idKey]), "ປ່ຽນສະຖານະສຳເລັດ"),
    changeStatus: (row, status) => run(() => crud.changeStatus(row[idKey], status), "ປ່ຽນສະຖານະສຳເລັດ"),
  };
};
