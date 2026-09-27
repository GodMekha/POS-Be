import { useStore } from "../../store/createStore.js";
import { toastStore } from "../../store/toastStore.js";

/** ລາຍການ toast ທີ່ກຳລັງສະແດງ (ໃຊ້ໃນ <Toaster />) */
export const useToasts = () => useStore(toastStore, (s) => s.items);
