import { http } from "../api/httpClient.js";

/** Controller 7: Order — /order/* */
export const orderService = {
  getAll: (params) => http.get("/order/getall", params), // status, userId
  getOne: (id) => http.get(`/order/getone/${id}`),
  getByUser: () => http.get("/order/getby"), // ອໍເດີຂອງຜູ້ໃຊ້ທີ່ login
  getByStatus: (status) => http.get("/order/status", { status }),
  insert: (body) => http.post("/order/insert", body), // { userId, totalPrice, currency, status }
  update: (id, body) => http.put(`/order/update/${id}`, body),
  updateStatus: (id, status) => http.put(`/order/update/status/${id}`, { status }),
  remove: (id) => http.delete(`/order/delete/${id}`),
};
