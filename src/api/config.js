/**
 * Base URL ຂອງ api-pos — ຕັ້ງຄ່າໃນ .env: VITE_API_BASE_URL=http://localhost:3000
 */
const env = import.meta.env ?? {};

export const BASE_URL = (env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
export const API_PREFIX = "/api/v1";
export const API_URL = `${BASE_URL}${API_PREFIX}`;
