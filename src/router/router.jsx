import { createBrowserRouter, Navigate, Outlet, RouterProvider, useLocation } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import { useAuth } from "../hooks/useAuth";
import Dashboard from "../view/dashboard/page/Dashboard";

// ---- ໜ້າຂອງ 16 controller (src/view/<controller>/page) ----
import Login from "../view/auth/page/Login";                           // 1  Auth
import Profile from "../view/auth/page/Profile";                       // 1  Auth
import Auth from "../view/auth/page/Auth";                             // 1  Auth
import Category from "../view/category/page/Category";                 // 2
import Customer from "../view/customer/page/Customer";                 // 3
import HistoryInInventory from "../view/historyInInventory/page/HistoryInInventory"; // 4
import HistoryInProduct from "../view/historyInProduct/page/HistoryInProduct";       // 5
import Inventory from "../view/inventory/page/Inventory";              // 6
import Order from "../view/order/page/Order";                          // 7
import OrderDetail from "../view/orderDetail/page/OrderDetail";        // 8
import Package from "../view/package/page/Package";                    // 9
import Part from "../view/part/page/Part";                             // 10
import Product from "../view/product/page/Product";                    // 11
import Purchase from "../view/purchase/page/Purchase";                 // 12
import PurchaseDetail from "../view/purchaseDetail/page/PurchaseDetail"; // 13
import Sell from "../view/sell/page/Sell";                             // 14
import SellDetail from "../view/sellDetail/page/SellDetail";           // 15
import Supply from "../view/supply/page/Supply";                       // 16

// ປ້ອງກັນໜ້າທີ່ຕ້ອງ login
const Protected = () => {
  const { isAuth } = useAuth();
  const location = useLocation();
  if (!isAuth) return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    element: <Protected />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/profile", element: <Profile /> },
      { path: "/users", element: <Auth /> },
      { path: "/categories", element: <Category /> },
      { path: "/customers", element: <Customer /> },
      { path: "/history-inventories", element: <HistoryInInventory /> },
      { path: "/history-products", element: <HistoryInProduct /> },
      { path: "/inventories", element: <Inventory /> },
      { path: "/orders", element: <Order /> },
      { path: "/order-details", element: <OrderDetail /> },
      { path: "/packages", element: <Package /> },
      { path: "/parts", element: <Part /> },
      { path: "/products", element: <Product /> },
      { path: "/purchases", element: <Purchase /> },
      { path: "/purchase-details", element: <PurchaseDetail /> },
      { path: "/sells", element: <Sell /> },
      { path: "/sell-details", element: <SellDetail /> },
      { path: "/supplies", element: <Supply /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

const RouterPath = () => <RouterProvider router={router} />;

export default RouterPath;
