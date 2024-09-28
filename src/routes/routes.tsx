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

export const router = createBrowserRouter([
  {
    path: "/home",
    element: <UserLayout><Home /></UserLayout>
  },
  {
    path: "/admin/dashboard",
    element: <AdminLayout><Dashboard/></AdminLayout>
  },
  {
    path: "/admin/products",
    element: <AdminLayout><Product/></AdminLayout>
  },
  {
    path: "/admin/products/createProducts",
    element: <AdminLayout><CreateProduct/></AdminLayout>
  },
  {
    path: "/admin/users",
    element: <AdminLayout><User/></AdminLayout>
  },
  {
    path: "/login",
    element: <Login/>
  }, 
  {
    path: "/register",
    element: <Register/>
  }, 
])