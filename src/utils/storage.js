/** Wrapper ຂອງ localStorage ທີ່ບໍ່ throw (private mode / storage ຖືກບລັອກ) */
const safe = (fn, fallback = null) => {
  try {
    return fn();
  } catch {
    return fallback;
  }
};

export const storage = {
  get: (key) => safe(() => localStorage.getItem(key)),
  set: (key, value) => safe(() => localStorage.setItem(key, value)),
  remove: (key) => safe(() => localStorage.removeItem(key)),
  getJson: (key) => safe(() => JSON.parse(localStorage.getItem(key) || "null")),
  setJson: (key, value) => safe(() => localStorage.setItem(key, JSON.stringify(value))),
};

const KEYS = { token: "token", refreshToken: "refreshToken", user: "user", theme: "theme" };

export const tokenStorage = {
  getToken: () => storage.get(KEYS.token),
  save: (token, refreshToken) => {
    storage.set(KEYS.token, token);
    if (refreshToken) storage.set(KEYS.refreshToken, refreshToken);
  },
  clear: () => {
    storage.remove(KEYS.token);
    storage.remove(KEYS.refreshToken);
  },
};

export const userStorage = {
  get: () => storage.getJson(KEYS.user),
  save: (user) => storage.setJson(KEYS.user, user),
  clear: () => storage.remove(KEYS.user),
};

export const themeStorage = {
  get: () => storage.get(KEYS.theme),
  save: (theme) => storage.set(KEYS.theme, theme),
};
