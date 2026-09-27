import { useCallback, useState } from "react";

/**
 * ຄຸມການເປີດ/ປິດ modal ພ້ອມຂໍ້ມູນທີ່ຕິດມາ
 *   const del = useDisclosure();  del.open(row);  del.isOpen;  del.data;  del.close();
 */
export const useDisclosure = () => {
  const [state, setState] = useState({ isOpen: false, data: null });
  const open = useCallback((data = null) => setState({ isOpen: true, data }), []);
  const close = useCallback(() => setState({ isOpen: false, data: null }), []);
  return { ...state, open, close };
};
