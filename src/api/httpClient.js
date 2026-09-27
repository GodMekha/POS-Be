/**
 * HTTP client: ຕໍ່ URL + ແນບ token + ແປງ error ໃຫ້ເປັນ ApiError
 * api-pos ສົ່ງກັບມາເປັນ { success, message, data }
 */
import { API_URL } from "./config.js";
import { ApiError } from "./ApiError.js";
import { tokenStorage } from "../utils/storage.js";

let unauthorizedHandler = () => {};

/** ລົງທະບຽນຟັງຊັນທີ່ຈະຖືກເອີ້ນເມື່ອ token ໝົດອາຍຸ (authStore ເປັນຄົນລົງທະບຽນ) */
export const onUnauthorized = (handler) => {
  unauthorizedHandler = handler;
};

const JWT_ERROR = /TokenExpiredError|JsonWebTokenError|jwt/i;

const isAuthFailure = (status, json) => status === 401 || JWT_ERROR.test(JSON.stringify(json?.error ?? ""));

const buildUrl = (path, params = {}) => {
  const url = new URL(API_URL + path);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  });
  return url;
};

const buildRequestInit = (method, body) => {
  const headers = {};
  const token = tokenStorage.getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  if (body === undefined) return { method, headers };
  if (body instanceof FormData) return { method, headers, body };

  headers["Content-Type"] = "application/json";
  return { method, headers, body: JSON.stringify(body) };
};

const parseJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};

const toErrorMessage = (json, status) => {
  const detail = typeof json.error === "string" ? json.error : json.error?.message || json.error?.name || "";
  const message = json.message || `HTTP ${status}`;
  return detail ? `${message} — ${detail}` : message;
};

export async function request(path, { method = "GET", body, params } = {}) {
  const init = buildRequestInit(method, body);

  let response;
  try {
    response = await fetch(buildUrl(path, params), init);
  } catch {
    throw new ApiError(`ບໍ່ສາມາດເຊື່ອມຕໍ່ API ໄດ້ (${API_URL})`, 0);
  }

  const json = await parseJson(response);
  const failed = !response.ok || json.success === false;

  if (failed) {
    if (init.headers.Authorization && isAuthFailure(response.status, json)) unauthorizedHandler();
    throw new ApiError(toErrorMessage(json, response.status), response.status, json.error);
  }
  return json.data;
}

export const http = {
  get: (path, params) => request(path, { params }),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  delete: (path) => request(path, { method: "DELETE" }),
};
