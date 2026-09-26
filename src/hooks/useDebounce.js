import { useEffect, useState } from "react";

// ລໍຖ້າໃຫ້ພິມສຳເລັດກ່ອນຈຶ່ງອັບເດດຄ່າ (ໃຊ້ກັບຊ່ອງຄົ້ນຫາ)
export const useDebounce = (value, delay = 400) => {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
};
