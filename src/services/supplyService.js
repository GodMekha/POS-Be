import { http } from "../api/httpClient.js";

/** Controller 16: Supply — /supply/* */
export const supplyService = {
  getAll: (params) => http.get("/supply/getAll", params), // active
  getOne: (id) => http.get(`/supply/getOne/${id}`),
  insert: (body) => http.post("/supply/insert", body), // { company, phone, sellName, position }
  update: (id, body) => http.put(`/supply/update/${id}`, body),
  toggleActive: (id) => http.put(`/supply/update/active/${id}`),
  remove: (id) => http.delete(`/supply/delete/${id}`),
};
