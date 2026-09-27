import { http } from "../api/httpClient.js";

/** Controller 6: Inventory — /inventory/* */
export const inventoryService = {
  getAll: (params) => http.get("/inventory/getall", params), // status
  getOne: (id) => http.get(`/inventory/getone/${id}`),
  insert: (body) => http.post("/inventory/insert", body), // { list, unit, amount, price }
  update: (id, body) => http.put(`/inventory/update/${id}`, body),
  remove: (id) => http.delete(`/inventory/delete/${id}`),
};
