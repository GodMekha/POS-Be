import { http } from "../api/httpClient.js";

/** Controller 2: Category — /category/*  (insert/update ສົ່ງເປັນ FormData) */
export const categoryService = {
  getAll: (params) => http.get("/category/getall", params),
  getOne: (id) => http.get(`/category/getone/${id}`),
  insert: (formData) => http.post("/category/insert", formData), // name + files(icon)
  update: (id, formData) => http.put(`/category/update/${id}`, formData), // name + icon
  remove: (id) => http.delete(`/category/delete/${id}`),
};
