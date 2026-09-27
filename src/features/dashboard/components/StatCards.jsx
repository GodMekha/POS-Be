import { Link } from "react-router-dom";
import { Card } from "../../../components/ui/index.js";
import { formatNumber } from "../../../utils/format.js";

const formatCount = (count) => {
  if (count === undefined) return "…";
  if (count === null) return "–";
  return formatNumber(count);
};

const StatCards = ({ cards, counts }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
    {cards.map(({ key, label, icon: Icon, to, color }) => (
      <Link key={key} to={to} className="group">
        <Card className="p-5 h-full transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} text-white flex items-center justify-center shadow-sm`}>
            <Icon size={20} />
          </div>
          <p className="mt-4 text-2xl font-bold text-slate-800 dark:text-white tabular-nums">{formatCount(counts[key])}</p>
          <p className="text-sm text-slate-400">{label}</p>
        </Card>
      </Link>
    ))}
  </div>
);

export default StatCards;
