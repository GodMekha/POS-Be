import { Badge, ImageThumb } from "../ui/index.js";
import { toLookupOptions } from "../../hooks/common/useLookups.js";
import { findOption } from "../../constants/options.js";
import { displayValue, formatDate, formatNumber, shortId } from "../../utils/format.js";

const renderLookup = (column, value, lookups) => {
  const option = findOption(toLookupOptions(column.lookup, lookups[column.lookup]), value);
  if (option) return option.label;
  return value ? shortId(value) : "-";
};

const RENDERERS = {
  money: (value) => formatNumber(value),
  number: (value) => formatNumber(value),
  date: (value) => <span className="text-slate-400 whitespace-nowrap">{formatDate(value)}</span>,
  bool: (value) => (value ? <Badge color="green">ເປີດ</Badge> : <Badge color="red">ປິດ</Badge>),
  image: (value) => <ImageThumb src={value} />,
  badge: (value, column) => {
    const option = findOption(column.options, value);
    return <Badge color={option?.color}>{option?.label ?? value ?? "-"}</Badge>;
  },
};

/** ສະແດງຄ່າໃນ cell ຕາມ column.type / column.render / column.lookup */
const CellValue = ({ column, row, lookups }) => {
  if (column.render) return column.render(row);

  const value = row[column.key];
  if (column.lookup) return renderLookup(column, value, lookups);

  const render = RENDERERS[column.type];
  return render ? render(value, column) : displayValue(value);
};

export default CellValue;
