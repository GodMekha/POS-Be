import { useState } from "react";
import { useAuth } from "../../../hooks/common/useAuth.js";
import { useMutation } from "../../../hooks/common/useMutation.js";
import { useOne } from "../../../hooks/common/useOne.js";
import { useDisclosure } from "../../../hooks/common/useDisclosure.js";
import { authService } from "../../../services/authService.js";
import { toast } from "../../../store/toastStore.js";

const EMPTY_PASSWORD = { oldPassword: "", newPassword: "", confirm: "" };

/** State ຂອງໜ້າໂປຣໄຟລ໌: ຂໍ້ມູນຜູ້ໃຊ້ + ປ່ຽນລະຫັດຜ່ານ + ລຶບບັນຊີ */
export const useProfile = () => {
  const { user, logout } = useAuth();
  const { data } = useOne(authService.getOne, user?.user_id);
  const info = data ?? user;

  const [password, setPassword] = useState(EMPTY_PASSWORD);
  const [mismatch, setMismatch] = useState("");
  const change = useMutation(authService.changePassword);
  const deleteConfirm = useDisclosure();

  const bindPassword = (name) => (event) => setPassword((prev) => ({ ...prev, [name]: event.target.value }));

  const changePassword = async (event) => {
    event.preventDefault();
    setMismatch("");
    if (password.newPassword !== password.confirm) {
      setMismatch("ລະຫັດຜ່ານໃໝ່ບໍ່ກົງກັນ");
      return;
    }
    try {
      await change.mutate({ oldPassword: password.oldPassword, newPassword: password.newPassword });
      toast.success("ປ່ຽນລະຫັດຜ່ານສຳເລັດ");
      setPassword(EMPTY_PASSWORD);
    } catch {
      // ສະແດງຜ່ານ change.error
    }
  };

  const deleteAccount = async () => {
    try {
      await authService.deleteMe();
      toast.success("ລຶບບັນຊີແລ້ວ");
      logout();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return {
    info,
    password,
    bindPassword,
    changePassword,
    saving: change.loading,
    error: mismatch || change.error,
    deleteConfirm,
    deleteAccount,
  };
};
