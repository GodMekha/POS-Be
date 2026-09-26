// Controller 8: OrderDetail — /order/detail/*
import { http } from "./api/apiClient.js";

export const orderDetailService = {
  getAll: (params) => http.get("/order/detail/getall", params), // params.orderId, status
  getOne: (id) => http.get(`/order/detail/getone/${id}`),
  getByOrder: (order_id) => http.get(`/order/detail/getby/${order_id}`),
  insert: (body) => http.post("/order/detail/insert", body), // { orderId, productId, amount, total, status }
  update: (id, body) => http.put(`/order/detail/update/${id}`, body),
  remove: (id) => http.delete(`/order/detail/delete/${id}`),
};
