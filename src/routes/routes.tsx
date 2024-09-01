import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/user/UserLayout";
import Home from "../pages/user/home/Home";

export const router = createBrowserRouter([

  {
    path: "/home",
    element: <UserLayout><Home /></UserLayout>
  },

])