import { Modal } from "../ui/index.js";
import { useResourceDetail } from "../../hooks/resource/useResourceDetail.js";
import { formatDate } from "../../utils/format.js";

const HIDDEN_KEYS = ["password"];
const IMAGE_URL = /^https?:\/\/.+\.(png|jpe?g|gif|webp|svg)$/i;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}T/;

/** ສະແດງຄ່າໃດກໍໄດ້ຈາກ API ໃຫ້ອ່ານງ່າຍ */
const renderValue = (value) => {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return String(value);
  if (typeof value === "string" && IMAGE_URL.test(value))
    return <img src={value} alt="" className="w-24 h-24 rounded-xl object-cover" />;
  if (typeof value === "string" && ISO_DATE.test(value)) return formatDate(value);
  if (Array.isArray(value)) return `${value.length} ລາຍການ`;
  if (typeof value === "object") return <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(value, null, 2)}</pre>;
  return String(value);
};

const DetailList = ({ data }) => (
  <dl className="divide-y divide-slate-100 dark:divide-slate-800">
    {Object.entries(data)
      .filter(([key]) => !HIDDEN_KEYS.includes(key))
      .map(([key, value]) => (
        <div key={key} className="grid grid-cols-3 gap-4 py-2.5 text-sm">
          <dt className="text-slate-400 font-mono text-xs pt-0.5">{key}</dt>
          <dd className="col-span-2 text-slate-700 dark:text-slate-200 break-all">{renderValue(value)}</dd>
        </div>
      ))}
  </dl>
);

/** ລາຍລະອຽດ (getOne) — render ສະເພາະຕອນເປີດ */
const ResourceViewModal = ({ resource, row, onClose }) => {
  const { detail, warning } = useResourceDetail(resource, row);
  return (
    <Modal open onClose={onClose} title={`ລາຍລະອຽດ ${resource.title}`} wide>
      {warning && <div className="mb-3 text-xs text-amber-600">{warning}</div>}
      {detail ? <DetailList data={detail} /> : <p className="text-slate-400">ກຳລັງໂຫລດ...</p>}
    </Modal>
  );
};

export default ResourceViewModal;
