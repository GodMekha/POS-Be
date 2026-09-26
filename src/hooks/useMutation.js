import { useCallback, useMemo, useState } from "react";

/** ຫໍ່ຟັງຊັນ insert/update/delete: const { mutate, loading, error } = useMutation(productService.insert) */
export const useMutation = (fn) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mutate = useCallback(
    async (...args) => {
      setLoading(true);
      setError("");
      try {
        return await fn(...args);
      } catch (e) {
        setError(e.message);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );
  return { mutate, loading, error };
};

/**
 * ຫໍ່ທຸກຟັງຊັນທີ່ບໍ່ແມ່ນ get* ຂອງ service
 *   const { insert, update, remove, loading, error } = useActions(categoryService);
 */
export const useActions = (service) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const actions = useMemo(() => {
    const out = {};
    Object.entries(service)
      .filter(([name]) => !name.startsWith("get"))
      .forEach(([name, fn]) => {
        out[name] = async (...args) => {
          setLoading(true);
          setError("");
          try {
            return await fn(...args);
          } catch (e) {
            setError(e.message);
            throw e;
          } finally {
            setLoading(false);
          }
        };
      });
    return out;
  }, [service]);
  return { ...actions, loading, error };
};
