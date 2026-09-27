import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { Card } from "../ui/index.js";

/** ສະແດງເມື່ອຜູ້ໃຊ້ບໍ່ມີສິດເຂົ້າໜ້ານີ້ */
const Forbidden = ({ message = "ທ່ານບໍ່ມີສິດເຂົ້າເຖິງໜ້ານີ້" }) => (
  <Card className="p-10 flex flex-col items-center text-center">
    <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-500 flex items-center justify-center">
      <ShieldAlert size={28} />
    </div>
    <h1 className="mt-4 text-xl font-bold text-slate-800 dark:text-white">403 — ບໍ່ມີສິດເຂົ້າໃຊ້</h1>
    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{message}</p>
    <Link to="/" className="mt-5 text-sm text-blue-600">
      ກັບໜ້າຫຼັກ
    </Link>
  </Card>
);

export default Forbidden;
