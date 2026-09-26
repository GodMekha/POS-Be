// Controller 1: Auth — /auth/*
import { http } from "./api/apiClient.js";

export const authService = {
  getAll: (params) => http.get("/auth/getall", params),
  getOne: (user_id) => http.get(`/auth/getone/${user_id}`),
  register: (body) => http.post("/auth/register", body), // { username, phoneNumber, password }
  login: (body) => http.post("/auth/login", body), // { phoneNumber, password }
  forgot: (body) => http.post("/auth/forgot", body), // { phoneNumber, newPassword }
  changePassword: (body) => http.put("/auth/changePassword", body), // { oldPassword, newPassword }
  deleteMe: () => http.delete("/auth/delete"),
};
