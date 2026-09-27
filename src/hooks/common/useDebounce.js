import { useEffect, useState } from "react";

/** ລໍຖ້າໃຫ້ພິມສຳເລັດກ່ອນຈຶ່ງອັບເດດຄ່າ (ໃຊ້ກັບຊ່ອງຄົ້ນຫາ) */
export const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};
