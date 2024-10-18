import { createBrowserRouter, Navigate } from "react-router-dom";
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
import RoomChat from "../pages/user/chat/RoomChat";
import ProtectRouter from "./ProtectRoutes";
import { Role } from "../models/user.model";
import LoginSuccsess from "../pages/user/auth/LoginSuccess";
import UserDetail from "../pages/user/user/UserDetail";

const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: <ProtectRouter role={Role.ROLE_ADMIN}> <AdminLayout><Dashboard /></AdminLayout></ProtectRouter>
  },
];

const userRoutes = [
  {
    path: "/chat",
    element: <ProtectRouter role={Role.ROLE_USER}><UserLayout><RoomChat /></UserLayout></ProtectRouter>,
  },
  {
    path: '/user/:email',
    element: <ProtectRouter role={Role.ROLE_USER}><UserLayout><UserDetail /></UserLayout></ProtectRouter>,
  }
];

const publicRoutes = [
  {
    path: "/home",
    element: <UserLayout><Home /></UserLayout>
  },
  {
    path: "/",
    element: <Navigate to="/home" />
  },
  {
    path: '/products/:id',
    element: <UserLayout><ProductDetail /></UserLayout>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: '/auth/login-success',
    element: <LoginSuccsess></LoginSuccsess>
  },
  {
    path: "/register",
    element: <Register />
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
];

export const router = createBrowserRouter([
  ...adminRoutes,
  ...userRoutes,
  ...publicRoutes
]);

// export const router1 = createBrowserRouter([
  
  
// ])