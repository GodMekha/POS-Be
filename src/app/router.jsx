import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import RequirePermission from "./RequirePermission.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import ResourcePage from "../components/resource/ResourcePage.jsx";
import { RESOURCES } from "../features/resources/registry.js";

/** lazy-load ໜ້າ (ແຍກ bundle — Dashboard ມີ apexcharts ຂະໜາດໃຫຍ່) */
const lazyPage = (importPage) => async () => ({ Component: (await importPage()).default });

// ໜ້າ CRUD ທັງ 16 ສ້າງອັດຕະໂນມັດຈາກ registry (key ບັງຄັບໃຫ້ state reset ເມື່ອປ່ຽນໜ້າ)
// ທຸກໜ້າຖືກປ້ອງກັນດ້ວຍສິດ read ຂອງ resource ນັ້ນ
const resourceRoutes = RESOURCES.map((resource) => ({
  path: resource.path,
  element: (
    <RequirePermission resource={resource.permission}>
      <ResourcePage key={resource.key} resource={resource} />
    </RequirePermission>
  ),
}));

export const router = createBrowserRouter([
  { path: "/login", lazy: lazyPage(() => import("../features/auth/pages/LoginPage.jsx")) },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/", lazy: lazyPage(() => import("../features/dashboard/pages/DashboardPage.jsx")) },
          { path: "/profile", lazy: lazyPage(() => import("../features/auth/pages/ProfilePage.jsx")) },
          ...resourceRoutes,
          { path: "*", element: <Navigate to="/" replace /> },
        ],
      },
    ],
  },
]);
