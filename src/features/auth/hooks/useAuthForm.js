import { useState } from "react";
import { useAuth } from "../../../hooks/common/useAuth.js";
import { useMutation } from "../../../hooks/common/useMutation.js";
import { authService } from "../../../services/authService.js";
import { toast } from "../../../store/toastStore.js";

export const AUTH_TABS = [
  { key: "login", label: "ເຂົ້າສູ່ລະບົບ" },
  { key: "register", label: "ລົງທະບຽນ" },
];

const EMPTY_FORM = { username: "", phoneNumber: "", password: "" };

/**
 * State ຂອງໜ້າ Login (2 tab: ເຂົ້າລະບົບ / ລົງທະບຽນ)
 * ລືມລະຫັດຜ່ານ → ໃຫ້ admin ຕັ້ງໃໝ່ໃຫ້ (API ປິດ /auth/forgot ແບບສາທາລະນະແລ້ວ ເພື່ອຄວາມປອດໄພ)
 */
export const useAuthForm = () => {
  const { login } = useAuth();

  const [tab, setTabState] = useState("login");
  const [values, setValues] = useState(EMPTY_FORM);

  const handlers = {
    // login ສຳເລັດ → authStore ປ່ຽນ → LoginPage redirect ໃຫ້ເອງ
    login: () => login(values.phoneNumber, values.password),
    register: async () => {
      const { username, phoneNumber, password } = values;
      await authService.register({ username, phoneNumber, password });
      toast.success("ລົງທະບຽນສຳເລັດ — ກະລຸນາລໍຖ້າ Super Admin ກຳນົດສິດໃຫ້");
      setTabState("login");
    },
  };

  const { mutate, loading, error, reset } = useMutation((currentTab) => handlers[currentTab]());

  const setTab = (next) => {
    setTabState(next);
    reset();
  };

  /** onChange={bind("phoneNumber")} */
  const bind = (name) => (event) => setValues((prev) => ({ ...prev, [name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    try {
      await mutate(tab);
    } catch {
      // ສະແດງຜ່ານ error
    }
  };

  const submitLabel = AUTH_TABS.find((t) => t.key === tab).label;

  return { tab, setTab, values, bind, submit, loading, error, submitLabel };
};
