import { useState } from "react";
import { useAuth } from "../common/useAuth.js";
import { usePermission } from "../common/usePermission.js";
import { useMutation } from "../common/useMutation.js";
import { toast } from "../../store/toastStore.js";
import {
  buildInitialValues,
  buildPayload,
  findMissingFields,
  visibleFields,
} from "../../features/resources/lib/form.js";

/**
 * State ຂອງຟອມ ເພີ່ມ/ແກ້ໄຂ — component ຈະ mount ໃໝ່ທຸກຄັ້ງທີ່ເປີດ
 * ດັ່ງນັ້ນຄ່າເລີ່ມຕົ້ນຖືກຄິດໄລ່ຄັ້ງດຽວໃນ useState (ບໍ່ຕ້ອງ reset ດ້ວຍ useEffect)
 */
export const useResourceForm = ({ resource, row, lookups, presetValues, onSaved }) => {
  const { user } = useAuth();
  const { can } = usePermission();
  const isEdit = Boolean(row);
  const [fields] = useState(() => visibleFields(resource.fields, { isEdit, can }));

  const [values, setValues] = useState(() => buildInitialValues({ fields, row, user, presetValues }));
  const [files, setFiles] = useState({});
  const [validationError, setValidationError] = useState("");

  const save = useMutation((payload) =>
    isEdit ? resource.crud.update(row[resource.idKey], payload) : resource.crud.create(payload)
  );

  const setField = (name, value) =>
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      const derived = resource.onFieldChange?.(name, next, lookups);
      return derived ? { ...next, ...derived } : next;
    });

  const setFile = (name, file) => setFiles((prev) => ({ ...prev, [name]: file }));

  const submit = async (event) => {
    event.preventDefault();
    setValidationError("");

    const missing = findMissingFields({ fields, values, files, isEdit });
    if (missing.length) {
      setValidationError(`ກະລຸນາປ້ອນ: ${missing.map((f) => f.label).join(", ")}`);
      return;
    }

    try {
      await save.mutate(buildPayload({ resource, fields, values, files, isEdit }));
      toast.success(isEdit ? "ແກ້ໄຂສຳເລັດ" : "ບັນທຶກສຳເລັດ");
      onSaved();
    } catch {
      // error ຖືກເກັບໄວ້ໃນ save.error ແລ້ວ
    }
  };

  return {
    isEdit,
    fields,
    values,
    files,
    setField,
    setFile,
    submit,
    saving: save.loading,
    error: validationError || save.error,
  };
};
