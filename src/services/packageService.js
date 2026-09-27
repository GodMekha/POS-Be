import { http } from "../api/httpClient.js";

/** Controller 9: Package — /package/* */
export const packageService = {
  getAll: (params) => http.get("/package/getAll", params), // active
  getOne: (id) => http.get(`/package/getOne/${id}`),
  insert: (body) => http.post("/package/insert", body), // { name, timeline, price }
  update: (id, body) => http.put(`/package/update/${id}`, body),
  toggleActive: (id) => http.put(`/package/update/status/${id}`),
  remove: (id) => http.delete(`/package/delete/${id}`),
};
