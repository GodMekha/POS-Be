import { useSyncExternalStore } from "react";

/**
 * Store ຂະໜາດນ້ອຍ (ແທນ Context / Redux) — state ຢູ່ນອກ React,
 * component ອ່ານຜ່ານ hook `useStore` ເຊິ່ງ re-render ສະເພາະເມື່ອຄ່າທີ່ເລືອກປ່ຽນ.
 *
 *   const counter = createStore({ count: 0 });
 *   counter.setState((s) => ({ count: s.count + 1 }));
 *   const count = useStore(counter, (s) => s.count);
 */
export const createStore = (initialState) => {
  let state = typeof initialState === "function" ? initialState() : initialState;
  const listeners = new Set();

  const getState = () => state;

  const setState = (partial) => {
    const patch = typeof partial === "function" ? partial(state) : partial;
    if (!patch) return;
    state = { ...state, ...patch };
    listeners.forEach((listener) => listener(state));
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { getState, setState, subscribe };
};

const identity = (state) => state;

/** selector ຕ້ອງສົ່ງຄືນຄ່າທີ່ stable (primitive ຫຼື reference ເດີມໃນ state) */
export const useStore = (store, selector = identity) =>
  useSyncExternalStore(store.subscribe, () => selector(store.getState()));
