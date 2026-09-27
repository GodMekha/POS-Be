import { useCallback, useMemo, useState } from "react";

/**
 * ຫໍ່ຟັງຊັນ insert/update/delete ໃຫ້ມີ loading + error
 *   const { mutate, loading, error } = useMutation(productService.insert);
 */
export const useMutation = (mutationFn) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const mutate = useCallback(
    async (...args) => {
      setLoading(true);
      setError("");
      try {
        return await mutationFn(...args);
      } catch (e) {
        setError(e.message);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [mutationFn]
  );

  const reset = useCallback(() => setError(""), []);

  return { mutate, loading, error, reset };
};

const isQuery = (name) => name.startsWith("get");

/**
 * ຫໍ່ທຸກຟັງຊັນທີ່ບໍ່ແມ່ນ get* ຂອງ service ດ້ວຍ loading/error ດຽວກັນ
 *   const { insert, update, remove, loading, error } = useActions(categoryService);
 */
export const useActions = (service) => {
  const call = useCallback((fn, ...args) => fn(...args), []);
  const { mutate, loading, error } = useMutation(call);

  const actions = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(service)
          .filter(([name]) => !isQuery(name))
          .map(([name, fn]) => [name, (...args) => mutate(fn, ...args)])
      ),
    [service, mutate]
  );

  return { ...actions, loading, error };
};
