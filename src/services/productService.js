import { http } from "../api/httpClient.js";

/** Controller 11: Product — /product/*  (insert/update ສົ່ງເປັນ FormData) */
export const productService = {
  getAll: (params) => http.get("/product/getAll", params), // status
  getByCategory: (categoryId) => http.get(`/product/getBy/${categoryId}`),
  getOne: (id) => http.get(`/product/getOne/${id}`),
  insert: (formData) => http.post("/product/insert", formData), // categoryId, productName, productDetail, productQty, productPrice + image
  update: (id, formData) => http.put(`/product/update/${id}`, formData),
  remove: (id) => http.delete(`/product/delete/${id}`),
};
