import { inputClass } from "./styles.js";
import { cx } from "../../utils/cx.js";

/** <select> ທີ່ຮັບ options = [{ value, label }] */
export const Select = ({ options = [], placeholder = "— ເລືອກ —", value, onChange, className, ...props }) => (
  <select
    className={cx(inputClass, className)}
    value={value ?? ""}
    onChange={(event) => onChange(event.target.value)}
    {...props}
  >
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
