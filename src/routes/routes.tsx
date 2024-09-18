import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/user/UserLayout";
import Home from "../pages/user/home/Home";
import Dashboard from "../pages/admin/Dashboard";

export const router = createBrowserRouter([

  {
    path: "/home",
    element: <UserLayout><Home /></UserLayout>
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
])