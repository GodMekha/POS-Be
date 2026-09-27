import { Plus, RefreshCw } from "lucide-react";
import { Button } from "../ui/index.js";

const ResourceHeader = ({ resource, loading, onReload, onCreate }) => {
  const Icon = resource.icon;
  return (
    <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center">
          <Icon size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{resource.title}</h1>
          <p className="text-xs text-slate-400 font-mono">{resource.api}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" onClick={onReload} title="ໂຫລດໃໝ່">
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </Button>
        {resource.crud.create && (
          <Button onClick={onCreate}>
            <Plus size={16} /> {resource.createLabel || `ເພີ່ມ${resource.title}`}
          </Button>
        )}
      </div>
    </header>
  );
};

export default ResourceHeader;
