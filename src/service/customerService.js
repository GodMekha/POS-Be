// Controller 3: Customer — /customer/*
import { http } from "./api/apiClient.js";

export const customerService = {
  getAll: (params) => http.get("/customer/getall", params),
  getOne: (id) => http.get(`/customer/getone/${id}`),
  insert: (body) => http.post("/customer/insert", body), // { fullname, phone, address }
  update: (id, body) => http.put(`/customer/update/${id}`, body),
  toggleActive: (id) => http.put(`/customer/update/active/${id}`),
  remove: (id) => http.delete(`/customer/delete/${id}`),
};
