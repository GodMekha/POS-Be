// Controller 10: Part — /part/*
import { http } from "./api/apiClient.js";

export const partService = {
  getAll: (params) => http.get("/part/getAll", params),
  getOne: (id) => http.get(`/part/getOne/${id}`),
  insert: (body) => http.post("/part/insert", body), // { list, amount, price }
  update: (id, body) => http.put(`/part/update/${id}`, body),
  remove: (id) => http.delete(`/part/delete/${id}`),
};
