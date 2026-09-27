import { ImageOff } from "lucide-react";
import { cx } from "../../utils/cx.js";

const SIZES = { sm: "w-10 h-10 rounded-xl", md: "w-20 h-20 rounded-2xl" };

/** ຮູບຂະໜາດນ້ອຍ ພ້ອມ placeholder ເມື່ອບໍ່ມີຮູບ */
export const ImageThumb = ({ src, size = "sm" }) =>
  src ? (
    <img src={src} alt="" className={cx(SIZES[size], "object-cover border border-slate-100 dark:border-slate-700")} />
  ) : (
    <div
      className={cx(
        SIZES[size],
        "bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-300"
      )}
    >
      <ImageOff size={size === "sm" ? 16 : 24} />
    </div>
  );
