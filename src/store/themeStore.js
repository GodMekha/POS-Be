import { createStore } from "./createStore.js";
import { themeStorage } from "../utils/storage.js";

/**
 * Theme: light / dark / system (ຕາມການຕັ້ງຄ່າຂອງເຄື່ອງ)
 * - theme    = ສິ່ງທີ່ຜູ້ໃຊ້ເລືອກ
 * - resolved = ສີທີ່ສະແດງຈິງ (light | dark)
 * index.html ມີ script ນ້ອຍໆ ທີ່ໃສ່ class .dark ກ່ອນ React ໂຫລດ (ກັນຈໍກະພິບ)
 */
export const THEMES = { light: "light", dark: "dark", system: "system" };
export const THEME_ORDER = [THEMES.light, THEMES.dark, THEMES.system];

const systemQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
const systemTheme = () => (systemQuery?.matches ? THEMES.dark : THEMES.light);
const resolve = (theme) => (theme === THEMES.system ? systemTheme() : theme);

const readSavedTheme = () => {
  const saved = themeStorage.get();
  return THEME_ORDER.includes(saved) ? saved : THEMES.system;
};

const applyToDocument = (resolved) => {
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === THEMES.dark);
  root.style.colorScheme = resolved; // date picker, select, scrollbar ຂອງ browser ປ່ຽນສີນຳ
};

const initialTheme = readSavedTheme();
export const themeStore = createStore({ theme: initialTheme, resolved: resolve(initialTheme) });

applyToDocument(themeStore.getState().resolved);
themeStore.subscribe(({ resolved }) => applyToDocument(resolved));

// ເມື່ອເລືອກ system ແລ້ວ OS ປ່ຽນ light/dark → ປ່ຽນຕາມທັນທີ
systemQuery?.addEventListener("change", () => {
  const { theme } = themeStore.getState();
  if (theme === THEMES.system) themeStore.setState({ resolved: resolve(theme) });
});

const setTheme = (theme) => {
  themeStorage.save(theme);
  themeStore.setState({ theme, resolved: resolve(theme) });
};

export const themeActions = {
  setTheme,
  /** light → dark → system → light */
  cycle: () => {
    const { theme } = themeStore.getState();
    setTheme(THEME_ORDER[(THEME_ORDER.indexOf(theme) + 1) % THEME_ORDER.length]);
  },
  /** ສະຫຼັບ light ↔ dark (ອີງຕາມສີທີ່ສະແດງຢູ່) */
  toggle: () => setTheme(themeStore.getState().resolved === THEMES.dark ? THEMES.light : THEMES.dark),
};
