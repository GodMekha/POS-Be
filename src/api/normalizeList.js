/**
 * getAll ສົ່ງ { data, totalPage } ສ່ວນ getBy ສົ່ງ array → ແປງໃຫ້ເປັນຮູບແບບດຽວກັນ
 * @returns {{ rows: any[], totalPage: number }}
 */
export const normalizeList = (payload) => {
  if (Array.isArray(payload)) return { rows: payload, totalPage: 1 };
  return { rows: payload?.data ?? [], totalPage: Math.max(1, payload?.totalPage || 1) };
};

/** ຈຳນວນລາຍການທັງໝົດ (ເອີ້ນ getAll ດ້ວຍ limit=1 → totalPage == count) */
export const countOf = async (service) => {
  const payload = await service.getAll({ limit: 1 });
  return payload?.totalPage ?? 0;
};
