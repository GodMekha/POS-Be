import { useStore } from "../../store/createStore.js";
import { THEMES, themeActions, themeStore } from "../../store/themeStore.js";

/**
 * const { theme, resolvedTheme, isDark, setTheme, cycleTheme, toggleTheme } = useTheme();
 *   theme         = "light" | "dark" | "system" (ສິ່ງທີ່ເລືອກ)
 *   resolvedTheme = "light" | "dark" (ສີທີ່ສະແດງຈິງ)
 */
export const useTheme = () => {
  const theme = useStore(themeStore, (s) => s.theme);
  const resolvedTheme = useStore(themeStore, (s) => s.resolved);
  return {
    theme,
    resolvedTheme,
    isDark: resolvedTheme === THEMES.dark,
    setTheme: themeActions.setTheme,
    cycleTheme: themeActions.cycle,
    toggleTheme: themeActions.toggle,
  };
};
