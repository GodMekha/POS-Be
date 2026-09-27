import { ImageThumb, Select, inputClass } from "../ui/index.js";
import { toLookupOptions } from "../../hooks/common/useLookups.js";
import { useFilePreview } from "../../hooks/common/useFilePreview.js";

const FileInput = ({ file, currentImage, onFile }) => {
  const preview = useFilePreview(file);
  return (
    <div className="flex items-center gap-4">
      <ImageThumb src={preview || currentImage} size="md" />
      <div className="flex-1">
        <input
          type="file"
          accept="image/*"
          onChange={(event) => onFile(event.target.files?.[0] || null)}
          className="block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 dark:file:bg-blue-500/15 dark:file:text-blue-300 dark:hover:file:bg-blue-500/25"
        />
        {currentImage && <p className="mt-1 text-xs text-slate-400">API ບັງຄັບໃຫ້ອັບໂຫລດຮູບໃໝ່ທຸກຄັ້ງທີ່ແກ້ໄຂ</p>}
      </div>
    </div>
  );
};

const INPUT_TYPES = { number: "number", password: "password" };

/** Input 1 ຊ່ອງ ຕາມ field.type: select / textarea / file / text / number / password */
const FieldInput = ({ field, value, onChange, file, onFile, currentImage, lookups }) => {
  switch (field.type) {
    case "select":
      return (
        <Select
          options={field.source ? toLookupOptions(field.source, lookups[field.source]) : field.options}
          value={value}
          onChange={onChange}
        />
      );
    case "textarea":
      return (
        <textarea
          rows={3}
          className={inputClass}
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      );
    case "file":
      return <FileInput file={file} currentImage={currentImage} onFile={onFile} />;
    default:
      return (
        <input
          type={INPUT_TYPES[field.type] ?? "text"}
          step={field.step}
          className={inputClass}
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      );
  }
};

export default FieldInput;
