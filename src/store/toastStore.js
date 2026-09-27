import { createStore } from "./createStore.js";

const TOAST_DURATION_MS = 3500;

export const toastStore = createStore({ items: [] });

const dismiss = (id) => toastStore.setState(({ items }) => ({ items: items.filter((t) => t.id !== id) }));

const show = (message, type) => {
  const id = `${Date.now()}-${Math.random()}`;
  toastStore.setState(({ items }) => ({ items: [...items, { id, message, type }] }));
  setTimeout(() => dismiss(id), TOAST_DURATION_MS);
};

/** ເອີ້ນໄດ້ທຸກບ່ອນ (ບໍ່ຕ້ອງຢູ່ໃນ component): toast.success("ບັນທຶກສຳເລັດ") */
export const toast = {
  success: (message) => show(message, "success"),
  error: (message) => show(message, "error"),
  dismiss,
};
