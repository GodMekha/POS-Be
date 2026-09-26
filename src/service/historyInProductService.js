// Controller 5: HistoryInProduct — /history/product/*
import { http } from "./api/apiClient.js";

export const historyInProductService = {
  getAll: (params) => http.get("/history/product/getall", params), // params.productId
  getOne: (hip_id) => http.get(`/history/product/getone/${hip_id}`),
  getByProduct: (product_id) => http.get(`/history/product/getby/${product_id}`),
  insert: (body) => http.post("/history/product/insert", body), // { productId, productName, productDetail, productQty, productPrice }
  update: (hip_id, body) => http.put(`/history/product/update/${hip_id}`, body),
  remove: (hip_id) => http.delete(`/history/product/delete/${hip_id}`),
};
