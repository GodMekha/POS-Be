import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/common/useTheme.js";
import { cx } from "../../utils/cx.js";

const OPTIONS = {
  light: { icon: Sun, label: "ໂໝດແຈ້ງ" },
  dark: { icon: Moon, label: "ໂໝດມືດ" },
  system: { icon: Monitor, label: "ຕາມເຄື່ອງ" },
};

/** ປຸ່ມປ່ຽນ theme: ກົດວົນ ແຈ້ງ → ມືດ → ຕາມເຄື່ອງ */
export const ThemeToggle = ({ className }) => {
  const { theme, cycleTheme } = useTheme();
  const { icon: Icon, label } = OPTIONS[theme];
  return (
    <button
      type="button"
      onClick={cycleTheme}
      title={`Theme: ${label} (ກົດເພື່ອປ່ຽນ)`}
      aria-label={`ປ່ຽນ theme — ປັດຈຸບັນ: ${label}`}
      className={cx(
        "w-10 h-10 flex items-center justify-center rounded-xl transition-all active:scale-90 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-yellow-400 dark:hover:bg-slate-700",
        className
      )}
    >
      <Icon size={20} />
    </button>
  );
};
