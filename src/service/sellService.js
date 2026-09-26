// Controller 14: Sell — /sell/*
import { http } from "./api/apiClient.js";

export const sellService = {
  getAll: (params) => http.get("/sell/getAll", params), // params.status, customerId, packageId
  getByCustomer: (id) => http.get(`/sell/getBy/customer/${id}`),
  getByPackage: (id) => http.get(`/sell/getBy/package/${id}`),
  getOne: (id) => http.get(`/sell/getOne/${id}`),
  insert: (body) => http.post("/sell/insert", body), // { customerId, packageId, discount, totalPrice, status }
  update: (id, body) => http.put(`/sell/update/${id}`, body),
  updateStatus: (id, status) => http.put(`/sell/update/status/${id}`, { status }),
  remove: (id) => http.delete(`/sell/delete/${id}`),
};
