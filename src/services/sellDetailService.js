import { http } from "../api/httpClient.js";

/** Controller 15: SellDetail — /sell/detail/* */
export const sellDetailService = {
  getAll: (params) => http.get("/sell/detail/getAll", params), // sellId, partId
  getBySell: (id) => http.get(`/sell/detail/getBy/sell/detail/${id}`),
  getByPart: (id) => http.get(`/sell/detail/getBy/part/${id}`),
  getOne: (id) => http.get(`/sell/detail/getOne/${id}`),
  insert: (body) => http.post("/sell/detail/insert", body), // { sellId, partId, amount, total }
  update: (id, body) => http.put(`/sell/detail/update/${id}`, body),
  remove: (id) => http.delete(`/sell/detail/delete/${id}`),
};
