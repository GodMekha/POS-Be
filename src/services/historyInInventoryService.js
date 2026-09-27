import { http } from "../api/httpClient.js";

/** Controller 4: HistoryInInventory — /history/inventory/* */
export const historyInInventoryService = {
  getAll: (params) => http.get("/history/inventory/getall", params), // inventoryId, active
  getOne: (id) => http.get(`/history/inventory/getone/${id}`),
  insert: (body) => http.post("/history/inventory/insert", body), // { inventoryId, list, unit, amount, price }
  update: (id, body) => http.put(`/history/inventory/update/${id}`, body),
  toggleActive: (id) => http.put(`/history/inventory/update/active/${id}`),
  remove: (id) => http.delete(`/history/inventory/delete/${id}`),
};
