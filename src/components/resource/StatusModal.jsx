import { Badge, Modal } from "../ui/index.js";
import { cx } from "../../utils/cx.js";

/** ເລືອກສະຖານະໃໝ່ (Order / Sell) ຫຼື ສິດຂອງຜູ້ໃຊ້ (Users) */
const StatusModal = ({ open, title = "ປ່ຽນສະຖານະ", options = [], current, busy, onSelect, onClose }) => (
  <Modal open={open} onClose={onClose} title={title}>
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          disabled={busy}
          onClick={() => onSelect(option.value)}
          className={cx(
            "p-4 rounded-2xl border-2 text-left transition-colors",
            current === option.value
              ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
              : "border-slate-100 dark:border-slate-800 hover:border-slate-300"
          )}
        >
          <Badge color={option.color}>{option.label}</Badge>
          <div className="mt-2 text-xs text-slate-400 font-mono">{option.value}</div>
        </button>
      ))}
    </div>
  </Modal>
);

export default StatusModal;
