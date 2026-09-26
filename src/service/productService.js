// Controller 11: Product — /product/*   (insert/update ສົ່ງເປັນ FormData)
import { http } from "./api/apiClient.js";

export const productService = {
  getAll: (params) => http.get("/product/getAll", params), // params.status
  getByCategory: (category_id) => http.get(`/product/getBy/${category_id}`),
  getOne: (id) => http.get(`/product/getOne/${id}`),
  insert: (formData) => http.post("/product/insert", formData), // categoryId, productName, productDetail, productQty, productPrice + image
  update: (id, formData) => http.put(`/product/update/${id}`, formData),
  remove: (id) => http.delete(`/product/delete/${id}`),
};
