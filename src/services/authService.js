import { http } from "../api/httpClient.js";

/** Controller 1: Auth — /auth/* */
export const authService = {
  // ສາທາລະນະ
  login: (body) => http.post("/auth/login", body), // { phoneNumber, password } → user + role + permissions + token
  register: (body) => http.post("/auth/register", body), // { username, phoneNumber, password } → role general

  // ບັນຊີຕົວເອງ
  me: () => http.get("/auth/me"),
  changePassword: (body) => http.put("/auth/changePassword", body), // { oldPassword, newPassword }
  deleteMe: () => http.delete("/auth/delete"),

  // ຈັດການຜູ້ໃຊ້ (super_admin, admin)
  getAll: (params) => http.get("/auth/getall", params),
  getOne: (userId) => http.get(`/auth/getone/${userId}`),
  createUser: (body) => http.post("/auth/users", body), // { username, phoneNumber, password, role? }
  updateUser: async (userId, { username, newPassword }) => {
    const user = await http.put(`/auth/update/${userId}`, { username });
    if (newPassword) await http.put(`/auth/reset-password/${userId}`, { newPassword });
    return user;
  },
  toggleActive: (userId) => http.put(`/auth/update/active/${userId}`),
  resetPassword: (userId, newPassword) => http.put(`/auth/reset-password/${userId}`, { newPassword }),
  remove: (userId) => http.delete(`/auth/delete/${userId}`),

  // ກຳນົດສິດ (super_admin)
  getRoles: () => http.get("/auth/roles"),
  updateRole: (userId, role) => http.put(`/auth/role/${userId}`, { role }),
};
