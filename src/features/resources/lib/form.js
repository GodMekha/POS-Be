/**
 * Pure function ສຳລັບຟອມ resource (ບໍ່ມີ React → test ງ່າຍ)
 */
import { isEmpty } from "../../../utils/format.js";

export const isFileField = (field) => field.type === "file";

/** ຕອນແກ້ໄຂ: ໃຊ້ requiredOnEdit ຖ້າມີ, ບໍ່ດັ່ງນັ້ນ field ທີ່ບໍ່ແມ່ນ file ໃຊ້ required ເດີມ */
export const isFieldRequired = (field, isEdit) => {
  if (!isEdit) return Boolean(field.required);
  return field.requiredOnEdit ?? (!isFileField(field) && Boolean(field.required));
};

/** ຄ່າເລີ່ມຕົ້ນຂອງຟອມ: ແຖວເດີມ (ແກ້ໄຂ) → ຄ່າຈາກຕົວກອງ URL → default */
export const buildInitialValues = ({ fields, row, user, presetValues = {} }) =>
  Object.fromEntries(
    fields
      .filter((field) => !isFileField(field))
      .map((field) => {
        if (row) return [field.name, row[field.name] ?? ""];
        if (presetValues[field.name]) return [field.name, presetValues[field.name]];
        if (field.defaultFromUser) return [field.name, user?.user_id ?? ""];
        return [field.name, field.default ?? ""];
      })
  );

/** ລາຍຊື່ field ທີ່ຍັງບໍ່ໄດ້ປ້ອນ */
export const findMissingFields = ({ fields, values, files, isEdit }) =>
  fields.filter((field) => {
    if (!isFieldRequired(field, isEdit)) return false;
    return isFileField(field) ? !files[field.name] : isEmpty(values[field.name]);
  });

/** ສ້າງ body ສົ່ງ API: JSON ທຳມະດາ ຫຼື FormData (ເມື່ອ resource.multipart) */
export const buildPayload = ({ resource, fields = resource.fields, values, files, isEdit }) => {
  if (!resource.multipart) return { ...values };

  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => formData.append(key, value ?? ""));
  fields
    .filter((field) => isFileField(field) && files[field.name])
    .forEach((field) => {
      const key = field.uploadKey ? field.uploadKey[isEdit ? "update" : "create"] : field.name;
      formData.append(key, files[field.name]);
    });
  return formData;
};

/** key ຂອງ lookup ທັງໝົດທີ່ resource ໃຊ້ (fields + filters + columns) */
export const collectLookupKeys = (resource) => [
  ...resource.fields.filter((f) => f.source).map((f) => f.source),
  ...(resource.filters ?? []).filter((f) => f.source).map((f) => f.source),
  ...resource.columns.filter((c) => c.lookup).map((c) => c.lookup),
];

/** resource ນີ້ມີປຸ່ມດຳເນີນການໃນແຖວບໍ່ */
export const hasRowActions = ({ crud, links }) =>
  Boolean(crud.getOne || crud.update || crud.remove || crud.toggleActive || crud.changeStatus || links?.length);

/**
 * field ທີ່ສະແດງໃນຟອມ:
 *   only: "create" | "edit"  → ສະແດງສະເພາະໂໝດນັ້ນ
 *   permission: [resource, action] → ສະແດງສະເພາະຜູ້ທີ່ມີສິດ
 */
export const visibleFields = (fields, { isEdit, can }) =>
  fields.filter((field) => {
    if (field.only === "create" && isEdit) return false;
    if (field.only === "edit" && !isEdit) return false;
    if (field.permission && !can(...field.permission)) return false;
    return true;
  });
