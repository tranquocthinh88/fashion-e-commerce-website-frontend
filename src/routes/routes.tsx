import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/user/UserLayout";
import Home from "../pages/user/home/Home";
import Dashboard from "../pages/admin/Dashboard";
import AdminLayout from "../layouts/admin/AdminLayout";
import Product from "../pages/admin/products/Product";
import CreateProduct from "../pages/admin/products/CreateProduct";

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
  }
])