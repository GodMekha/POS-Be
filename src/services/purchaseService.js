import { http } from "../api/httpClient.js";

/** Controller 12: Purchase — /purchase/* */
export const purchaseService = {
  getAll: (params) => http.get("/purchase/getAll", params), // status, supplyId
  getBySupply: (supplyId) => http.get(`/purchase/getBy/${supplyId}`),
  getOne: (id) => http.get(`/purchase/getOne/${id}`),
  insert: (body) => http.post("/purchase/insert", body), // { supplyId, currency, expressName, expressPrice, totalPrice }
  update: (id, body) => http.put(`/purchase/update/${id}`, body),
  toggleStatus: (id) => http.put(`/purchase/update/status/${id}`),
  remove: (id) => http.delete(`/purchase/delete/${id}`),
};
