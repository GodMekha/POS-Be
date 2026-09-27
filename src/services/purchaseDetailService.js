import { http } from "../api/httpClient.js";

/** Controller 13: PurchaseDetail — /purchase/detail/* */
export const purchaseDetailService = {
  getAll: (params) => http.get("/purchase/detail/getAll", params), // status, purchaseId
  getByPurchase: (purchaseId) => http.get(`/purchase/detail/getBy/${purchaseId}`),
  getOne: (id) => http.get(`/purchase/detail/getOne/${id}`),
  insert: (body) => http.post("/purchase/detail/insert", body), // { purchaseId, list, unit, amount, price, total }
  update: (id, body) => http.put(`/purchase/detail/update/${id}`, body),
  toggleStatus: (id) => http.put(`/purchase/detail/update/status/${id}`),
  remove: (id) => http.delete(`/purchase/detail/delete/${id}`),
};
