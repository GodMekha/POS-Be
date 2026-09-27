import { useEffect, useState } from "react";

/** ອ່ານ File ເປັນ data URL ສຳລັບ preview ຮູບ */
export const useFilePreview = (file) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!file) return undefined;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
    return () => reader.abort();
  }, [file]);

  return file ? preview : null;
};
