import FieldInput from "./FieldInput.jsx";
import { Button, ErrorBox, Modal } from "../ui/index.js";
import { useResourceForm } from "../../hooks/resource/useResourceForm.js";
import { isFieldRequired } from "../../features/resources/lib/form.js";
import { cx } from "../../utils/cx.js";

const FORM_ID = "resource-form";
const WIDE_FORM_MIN_FIELDS = 6;
const isFullWidth = (field) => field.type === "textarea" || field.type === "file";

/**
 * ຟອມ ເພີ່ມ / ແກ້ໄຂ — render ສະເພາະຕອນເປີດ (ເບິ່ງ ResourcePage)
 * state ທັງໝົດຢູ່ໃນ useResourceForm
 */
const ResourceFormModal = ({ resource, row, lookups, presetValues, onClose, onSaved }) => {
  const form = useResourceForm({ resource, row, lookups, presetValues, onSaved });
  const wide = form.fields.length >= WIDE_FORM_MIN_FIELDS;

  return (
    <Modal
      open
      onClose={onClose}
      title={`${form.isEdit ? "ແກ້ໄຂ" : "ເພີ່ມ"} ${resource.title}`}
      wide={wide}
      footer={
        <>
          <Button variant="ghost" type="button" onClick={onClose}>
            ຍົກເລີກ
          </Button>
          <Button type="submit" form={FORM_ID} loading={form.saving}>
            ບັນທຶກ
          </Button>
        </>
      }
    >
      <form id={FORM_ID} onSubmit={form.submit} className="space-y-4">
        <ErrorBox>{form.error}</ErrorBox>
        <div className={cx("grid gap-4", wide && "sm:grid-cols-2")}>
          {form.fields.map((field) => (
            <label key={field.name} className={cx("block", isFullWidth(field) && "sm:col-span-2")}>
              <span className="block mb-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">
                {field.label} {isFieldRequired(field, form.isEdit) && <span className="text-red-500">*</span>}
              </span>
              <FieldInput
                field={field}
                value={form.values[field.name]}
                onChange={(value) => form.setField(field.name, value)}
                file={form.files[field.name]}
                onFile={(file) => form.setFile(field.name, file)}
                currentImage={form.isEdit ? row?.[field.name] : null}
                lookups={lookups}
              />
              {field.hint && <span className="block mt-1 text-xs text-slate-400">{field.hint}</span>}
            </label>
          ))}
        </div>
      </form>
    </Modal>
  );
};

export default ResourceFormModal;
