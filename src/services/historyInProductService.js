import { http } from "../api/httpClient.js";

/** Controller 5: HistoryInProduct — /history/product/* */
export const historyInProductService = {
  getAll: (params) => http.get("/history/product/getall", params), // productId
  getOne: (id) => http.get(`/history/product/getone/${id}`),
  getByProduct: (productId) => http.get(`/history/product/getby/${productId}`),
  insert: (body) => http.post("/history/product/insert", body), // { productId, productName, productDetail, productQty, productPrice }
  update: (id, body) => http.put(`/history/product/update/${id}`, body),
  remove: (id) => http.delete(`/history/product/delete/${id}`),
};
