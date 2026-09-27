import { http } from "../api/httpClient.js";

/** Controller 8: OrderDetail — /order/detail/* */
export const orderDetailService = {
  getAll: (params) => http.get("/order/detail/getall", params), // orderId, status
  getOne: (id) => http.get(`/order/detail/getone/${id}`),
  getByOrder: (orderId) => http.get(`/order/detail/getby/${orderId}`),
  insert: (body) => http.post("/order/detail/insert", body), // { orderId, productId, amount, total, status }
  update: (id, body) => http.put(`/order/detail/update/${id}`, body),
  remove: (id) => http.delete(`/order/detail/delete/${id}`),
};
