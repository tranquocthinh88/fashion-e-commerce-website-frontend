import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/user/UserLayout";
import Home from "../pages/user/home/Home";
import Dashboard from "../pages/admin/Dashboard";
import AdminLayout from "../layouts/admin/AdminLayout";
import Product from "../pages/admin/products/Product";
import CreateProduct from "../pages/admin/products/CreateProduct";
import User from "../pages/admin/user/User";
import Login from "../pages/user/auth/Login";
import Register from "../pages/user/auth/Register";
import RevenueStatistics from "../pages/admin/statistics/RevenueStatistics";
import BestSeller from "../pages/admin/statistics/BestSeller";
import Message from "../pages/admin/message/Message";
import Invoice from "../pages/admin/invoice/Invoice";
import ProductDetail from "../pages/user/products/ProductDetail";

export const router = createBrowserRouter([
  {
    path: "/home",
    element: <UserLayout><Home /></UserLayout>
  },
  {
    path: '/products/:id',
    element: <UserLayout><ProductDetail /></UserLayout>
  },
  {
    path: "/admin/dashboard",
    element: <AdminLayout><Dashboard /></AdminLayout>
  },
  {
    path: "/admin/products",
    element: <AdminLayout><Product /></AdminLayout>
  },
  {
    path: "/admin/products/createProducts",
    element: <AdminLayout><CreateProduct /></AdminLayout>
  },
  {
    path: "/admin/users",
    element: <AdminLayout><User /></AdminLayout>
  },
  {
    path: "/admin/invoices",
    element: <AdminLayout><Invoice /></AdminLayout>
  },
  {
    path: "/admin/messages",
    element: <AdminLayout><Message /></AdminLayout>
  },
  {
    path: "/admin/statistics/revenue",
    element: <AdminLayout><RevenueStatistics /></AdminLayout>
  },
  {
    path: "/admin/statistics/best-sellers",
    element: <AdminLayout><BestSeller /></AdminLayout>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
])