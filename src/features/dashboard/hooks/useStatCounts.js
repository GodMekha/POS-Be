import { useEffect, useState } from "react";
import { countOf } from "../../../api/normalizeList.js";

/**
 * ຈຳນວນທັງໝົດຂອງແຕ່ລະ card: { products: 12, customers: null (error), orders: undefined (loading) }
 * @param {Array} cards  ບັດທີ່ຜູ້ໃຊ້ມີສິດເບິ່ງ
 */
export const useStatCounts = (cards) => {
  const [counts, setCounts] = useState({});
  const signature = cards.map((c) => c.key).join(",");

  useEffect(() => {
    let alive = true;
    cards.forEach(({ key, service }) =>
      countOf(service)
        .catch(() => null)
        .then((count) => alive && setCounts((prev) => ({ ...prev, [key]: count })))
    );
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  return counts;
};
