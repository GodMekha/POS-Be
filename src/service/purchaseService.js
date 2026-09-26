// Controller 12: Purchase — /purchase/*
import { http } from "./api/apiClient.js";

export const purchaseService = {
  getAll: (params) => http.get("/purchase/getAll", params), // params.status, supplyId
  getBySupply: (supply_id) => http.get(`/purchase/getBy/${supply_id}`),
  getOne: (id) => http.get(`/purchase/getOne/${id}`),
  insert: (body) => http.post("/purchase/insert", body), // { supplyId, currency, expressName, expressPrice, totalPrice }
  update: (id, body) => http.put(`/purchase/update/${id}`, body),
  toggleStatus: (id) => http.put(`/purchase/update/status/${id}`),
  remove: (id) => http.delete(`/purchase/delete/${id}`),
};
