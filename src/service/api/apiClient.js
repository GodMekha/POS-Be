// =====================================================================
//  API client: ຕໍ່ BASE_URL + ແນບ token + ຈັດການ error
// =====================================================================
import { API_URL } from "./baseUrl.js";

export class ApiError extends Error {
  constructor(message, status, detail) {
    super(message);
    this.status = status;
    this.detail = detail;
  }
}

export const tokenStorage = {
  get: () => localStorage.getItem("token"),
  set: (t, refresh) => {
    localStorage.setItem("token", t);
    if (refresh) localStorage.setItem("refreshToken", refresh);
  },
  clear: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },
};

const isAuthFailure = (status, json) =>
  status === 401 || /TokenExpiredError|JsonWebTokenError|jwt/i.test(JSON.stringify(json?.error ?? ""));

export async function request(path, { method = "GET", body, params } = {}) {
  const url = new URL(API_URL + path);
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  });

  const headers = {};
  const token = tokenStorage.get();
  if (token) headers.Authorization = `Bearer ${token}`;

  let payload;
  if (body instanceof FormData) payload = body; // multipart (ອັບໂຫລດຮູບ)
  else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(url, { method, headers, body: payload });
  } catch {
    throw new ApiError(`ບໍ່ສາມາດເຊື່ອມຕໍ່ API ໄດ້ (${API_URL})`, 0);
  }

  let json = {};
  try {
    json = await res.json();
  } catch {
    /* no body */
  }

  if (!res.ok || json.success === false) {
    if (token && isAuthFailure(res.status, json)) window.dispatchEvent(new Event("auth:logout"));
    const detail = typeof json.error === "string" ? json.error : json.error?.message || json.error?.name || "";
    throw new ApiError((json.message || `HTTP ${res.status}`) + (detail ? ` — ${detail}` : ""), res.status, json.error);
  }
  return json.data; // api-pos ສົ່ງ { success, message, data }
}

// shortcut
export const http = {
  get: (path, params) => request(path, { params }),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  delete: (path) => request(path, { method: "DELETE" }),
};

// getAll ສົ່ງ { data, totalPage } ສ່ວນ getBy ສົ່ງ array
export const normalizeList = (d) =>
  Array.isArray(d) ? { rows: d, totalPage: 1 } : { rows: d?.data ?? [], totalPage: d?.totalPage || 1 };
