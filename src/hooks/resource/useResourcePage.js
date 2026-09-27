import { useMemo } from "react";
import { useDisclosure } from "../common/useDisclosure.js";
import { useLookups } from "../common/useLookups.js";
import { useResourceActions } from "./useResourceActions.js";
import { useResourceQuery } from "./useResourceQuery.js";
import { collectLookupKeys } from "../../features/resources/lib/form.js";

/**
 * Hook ລວມ (facade) ຂອງໜ້າ CRUD — ໜ້າ UI ບໍ່ມີ state ຂອງຕົວເອງ ນອກຈາກເອີ້ນ hook ນີ້
 */
export const useResourcePage = (resource) => {
  const query = useResourceQuery(resource);
  const lookupKeys = useMemo(() => collectLookupKeys(resource), [resource]);
  const lookups = useLookups(lookupKeys);
  const actions = useResourceActions(resource, query.reload);

  const modals = {
    form: useDisclosure(), // data: null = ເພີ່ມ, row = ແກ້ໄຂ
    view: useDisclosure(),
    remove: useDisclosure(),
    status: useDisclosure(),
  };

  return { query, lookups, actions, modals };
};
