import { useEffect, useMemo, useState } from "react";
import { normalizeList } from "../../api/normalizeList.js";
import { LOOKUPS } from "../../features/resources/lookups.js";
import { LOOKUP_LIMIT } from "../../constants/options.js";
import { usePermission } from "./usePermission.js";

// cache ຂໍ້ມູນ dropdown ໄວ້ໃນ memory (ແບ່ງປັນທຸກໜ້າ)
const cache = new Map();

export const invalidateLookup = (key) => cache.delete(key);

export const fetchLookup = (key) => {
  if (!cache.has(key)) {
    const promise = LOOKUPS[key]
      .fetch({ limit: LOOKUP_LIMIT })
      .then((payload) => normalizeList(payload).rows)
      .catch((error) => {
        cache.delete(key);
        throw error;
      });
    cache.set(key, promise);
  }
  return cache.get(key);
};

/** ແປງແຖວເປັນ { value, label } ສຳລັບ <select> */
export const toLookupOptions = (key, rows) => {
  const def = LOOKUPS[key];
  return (rows ?? []).map((row) => ({ value: row[def.value], label: def.label(row) }));
};

/** ດຶງຂໍ້ມູນ dropdown: const lookups = useLookups(["categories", "products"]) */
export const useLookups = (keys) => {
  const [data, setData] = useState({});
  const { can } = usePermission();
  // ດຶງສະເພາະ lookup ທີ່ມີສິດອ່ານ (ບໍ່ດັ່ງນັ້ນ API ຈະຕອບ 403)
  const signature = useMemo(
    () => [...new Set(keys)].filter((key) => can(LOOKUPS[key].permission)).sort().join(","),
    [keys, can]
  );

  useEffect(() => {
    let alive = true;
    const save = (key, rows) => alive && setData((prev) => ({ ...prev, [key]: rows }));

    signature
      .split(",")
      .filter(Boolean)
      .forEach((key) =>
        fetchLookup(key)
          .then((rows) => save(key, rows))
          .catch(() => save(key, []))
      );

    return () => {
      alive = false;
    };
  }, [signature]);

  return data;
};
