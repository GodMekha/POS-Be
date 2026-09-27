import { useStore } from "../../store/createStore.js";
import { authActions, authStore } from "../../store/authStore.js";

/** const { user, token, isAuth, login, logout } = useAuth(); */
export const useAuth = () => {
  const { token, user } = useStore(authStore);
  return { token, user, isAuth: Boolean(token), login: authActions.login, logout: authActions.logout };
};
