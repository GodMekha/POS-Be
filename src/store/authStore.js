import { createStore } from "./createStore.js";
import { authService } from "../services/authService.js";
import { onUnauthorized } from "../api/httpClient.js";
import { tokenStorage, userStorage } from "../utils/storage.js";

/** user = { user_id, username, phoneNumber, role, permissions, ... } */
export const authStore = createStore(() => ({
  token: tokenStorage.getToken(),
  user: userStorage.get(),
}));

const saveUser = (user) => {
  userStorage.save(user);
  authStore.setState({ user });
};

export const authActions = {
  async login(phoneNumber, password) {
    const { token, refreshToken, ...user } = await authService.login({ phoneNumber, password });
    tokenStorage.save(token, refreshToken);
    authStore.setState({ token });
    saveUser(user);
    return user;
  },

  /** ດຶງ role/permissions ລ່າສຸດ (ເຊັ່ນ ເມື່ອ super_admin ຫາກໍປ່ຽນສິດໃຫ້) */
  async refreshSession() {
    if (!authStore.getState().token) return;
    try {
      saveUser(await authService.me());
    } catch {
      // 401 → onUnauthorized ຈັດການ logout ແລ້ວ
    }
  },

  logout() {
    tokenStorage.clear();
    userStorage.clear();
    authStore.setState({ token: null, user: null });
  },
};

// token ໝົດອາຍຸ → ອອກຈາກລະບົບອັດຕະໂນມັດ
onUnauthorized(authActions.logout);
