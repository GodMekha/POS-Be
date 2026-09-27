import { useAsync } from "../common/useAsync.js";

/**
 * ດຶງລາຍລະອຽດ (getOne). ຖ້າ API ຜິດພາດ → ໃຊ້ຂໍ້ມູນຈາກແຖວໃນຕາຕະລາງແທນ ພ້ອມຄຳເຕືອນ
 */
export const useResourceDetail = (resource, row) => {
  const { data, loading } = useAsync(async () => {
    if (!resource.crud.getOne) return { detail: row, warning: "" };
    try {
      return { detail: await resource.crud.getOne(row[resource.idKey]), warning: "" };
    } catch (e) {
      return { detail: row, warning: `getOne ຜິດພາດ (${e.message}) — ສະແດງຂໍ້ມູນຈາກຕາຕະລາງແທນ` };
    }
  }, [resource, row]);

  return { detail: data?.detail ?? null, warning: data?.warning ?? "", loading };
};
