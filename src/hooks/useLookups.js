import { useEffect, useState } from "react";
import { normalizeList } from "../service/api/apiClient.js";
import { LOOKUPS } from "../config/resources.js";

// cache ຂໍ້ມູນ dropdown ໄວ້ໃນ memory
const cache = new Map();

export const invalidateLookup = (key) => cache.delete(key);

export const fetchLookup = (key) => {
  if (!cache.has(key)) {
    const p = LOOKUPS[key]
      .fetch({ limit: 1000 })
      .then((d) => normalizeList(d).rows)
      .catch((e) => {
        cache.delete(key);
        throw e;
      });
    cache.set(key, p);
  }
  return cache.get(key);
};

/** ດຶງຂໍ້ມູນສຳລັບ dropdown ເຊັ່ນ useLookups(["categories", "products"]) */
export const useLookups = (keys) => {
  const [data, setData] = useState({});
  const sig = [...new Set(keys)].sort().join(",");
  useEffect(() => {
    let alive = true;
    sig.split(",").filter(Boolean).forEach((k) =>
      fetchLookup(k)
        .then((rows) => alive && setData((s) => ({ ...s, [k]: rows })))
        .catch(() => alive && setData((s) => ({ ...s, [k]: [] })))
    );
    return () => {
      alive = false;
    };
  }, [sig]);
  return data;
};

export const lookupOptions = (key, rows) => {
  const def = LOOKUPS[key];
  return (rows || []).map((r) => ({ value: r[def.value], label: def.label(r) }));
};
