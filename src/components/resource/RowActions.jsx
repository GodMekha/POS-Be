import { useNavigate } from "react-router-dom";
import { ArrowRightLeft, ExternalLink, Eye, Pencil, Power, Trash2 } from "lucide-react";
import { IconButton } from "../ui/index.js";

/** ປຸ່ມດຳເນີນການໃນແຕ່ລະແຖວ — ສະແດງສະເພາະປຸ່ມທີ່ resource.crud ຮອງຮັບ */
const RowActions = ({ resource, row, onView, onEdit, onDelete, onToggle, onChangeStatus }) => {
  const navigate = useNavigate();
  const { crud, links, toggleField = "active" } = resource;

  return (
    <div className="flex items-center justify-center gap-1">
      {links?.map((link) => (
        <button
          key={link.label}
          type="button"
          onClick={() => navigate(link.to(row))}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 whitespace-nowrap"
        >
          <ExternalLink size={13} /> {link.label}
        </button>
      ))}
      {crud.getOne && (
        <IconButton title="ເບິ່ງ" onClick={() => onView(row)}>
          <Eye size={16} />
        </IconButton>
      )}
      {crud.changeStatus && (
        <IconButton title={resource.statusTitle ?? "ປ່ຽນສະຖານະ"} onClick={() => onChangeStatus(row)}>
          <ArrowRightLeft size={16} />
        </IconButton>
      )}
      {crud.toggleActive && (
        <IconButton
          title="ເປີດ/ປິດ"
          onClick={() => onToggle(row)}
          className={row[toggleField] ? "text-emerald-500" : "text-slate-300"}
        >
          <Power size={16} />
        </IconButton>
      )}
      {crud.update && (
        <IconButton title="ແກ້ໄຂ" onClick={() => onEdit(row)}>
          <Pencil size={16} />
        </IconButton>
      )}
      {crud.remove && (
        <IconButton title="ລຶບ" onClick={() => onDelete(row)} className="hover:!text-red-500">
          <Trash2 size={16} />
        </IconButton>
      )}
    </div>
  );
};

export default RowActions;
