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
import Forgotpassword from "../pages/user/auth/ForgotPassword";
import Cart from "../pages/user/cart/Cart";
import Payment from "../pages/user/cart/Payment";
import PaymentSuccess from "../pages/user/cart/PaymentSuccess";
import UpdateProduct from "../pages/admin/products/UpdateProduct";
import OrderDetails from "../pages/user/orders/OrderDetails";
import Category from "../pages/admin/categories/Category";
import Provider from "../pages/admin/providers/Provider";
import Products from "../pages/user/products/Products";
import Color from "../pages/admin/colors/Color";
import Brand from "../pages/admin/brands/Brand";
import Size from "../pages/admin/sizes/Size";
import UserDetails from "../pages/admin/user/UserDetails";
import Discount from "../pages/admin/discount/Discount";
import Stoke from "../pages/admin/stoke/Stoke";
import ProductDetailAdmin from "../pages/admin/products/ProductDetailAdmin";

const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: <ProtectRouter role={Role.ROLE_ADMIN}> <AdminLayout><Dashboard /></AdminLayout></ProtectRouter>
  },
  {
    path: '/admin/products/update/:id',
    element: <ProtectRouter role={Role.ROLE_ADMIN}> <AdminLayout><UpdateProduct /></AdminLayout></ProtectRouter>
  },
  {
    path: '/admin/products/createProducts/categories',
    element: <ProtectRouter role={Role.ROLE_ADMIN}> <AdminLayout><Category /></AdminLayout></ProtectRouter>
  },
  {
    path: '/admin/products/createProducts/providers',
    element: <ProtectRouter role={Role.ROLE_ADMIN}> <AdminLayout><Provider /></AdminLayout></ProtectRouter>
  },
  {
    path: '/admin/products/createProducts/colors',
    element: <ProtectRouter role={Role.ROLE_ADMIN}> <AdminLayout><Color /></AdminLayout></ProtectRouter>
  },
  {
    path: '/admin/products/createProducts/brands',
    element: <ProtectRouter role={Role.ROLE_ADMIN}> <AdminLayout><Brand /></AdminLayout></ProtectRouter>
  },
  {
    path: '/admin/products/createProducts/sizes',
    element: <ProtectRouter role={Role.ROLE_ADMIN}> <AdminLayout><Size /></AdminLayout></ProtectRouter>
  },
  {
    path: '/admin/users/user-detail/:email',
    element: <ProtectRouter role={Role.ROLE_ADMIN}> <AdminLayout><UserDetails /></AdminLayout></ProtectRouter>
  },
  {
    path: '/admin/products',
    element: <ProtectRouter role={Role.ROLE_ADMIN}> <AdminLayout><Product /></AdminLayout></ProtectRouter>
  },
  {
    path: '/admin/products/createProducts',
    element: <ProtectRouter role={Role.ROLE_ADMIN}> <AdminLayout><CreateProduct /></AdminLayout></ProtectRouter>
  },
  {
    path: '/admin/users',
    element: <ProtectRouter role={Role.ROLE_ADMIN}> <AdminLayout><User /></AdminLayout></ProtectRouter>
  },
  {
    path: '/admin/invoices',
    element: <ProtectRouter role={Role.ROLE_ADMIN}> <AdminLayout><Invoice /></AdminLayout></ProtectRouter>
  },
  {
    path: '/admin/messages',
    element: <ProtectRouter role={Role.ROLE_ADMIN}> <AdminLayout><Message /></AdminLayout></ProtectRouter>
  },
  {
    path: '/admin/statistics/revenue',
    element: <ProtectRouter role={Role.ROLE_ADMIN}> <AdminLayout><RevenueStatistics /></AdminLayout></ProtectRouter>
  },
  {
    path: '/admin/statistics/best-sellers',
    element: <ProtectRouter role={Role.ROLE_ADMIN}> <AdminLayout><BestSeller /></AdminLayout></ProtectRouter>
  },
  {
    path: '/admin/discounts',
    element: <ProtectRouter role={Role.ROLE_ADMIN}> <AdminLayout><Discount /></AdminLayout></ProtectRouter>
  },
  {
    path: '/admin/stokes',
    element: <ProtectRouter role={Role.ROLE_ADMIN}> <AdminLayout><Stoke /></AdminLayout></ProtectRouter>
  },
  // {
  //   path: '/admin/products/product-detail/:id',
  //   element: <AdminLayout><ProductDetailAdmin /></AdminLayout>
  // },
];

const userRoutes = [
  {
    path: "/chat",
    element: <ProtectRouter role={Role.ROLE_USER}><UserLayout><RoomChat /></UserLayout></ProtectRouter>,
  },
  {
    path: '/user/:email/:tab?',
    element: <ProtectRouter role={Role.ROLE_USER}><UserLayout><UserDetail /></UserLayout></ProtectRouter>,
  },

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
    path: '/products',
    element: <UserLayout><Products /></UserLayout>
  }
  ,
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
    path: "/forgot-password",
    element: <UserLayout><Forgotpassword /></UserLayout>
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/cart",
    element: <UserLayout><Cart /></UserLayout>
  },
  {
    path: "/payment",
    element: <UserLayout><Payment /></UserLayout>
  },
  {
    path: '/payments-success',
    element: <UserLayout><PaymentSuccess /></UserLayout>
  },
  {
    path: '/order-details/:id',
    element: <UserLayout><OrderDetails /></UserLayout>
  },

];

export const router = createBrowserRouter([
  ...adminRoutes,
  ...userRoutes,
  ...publicRoutes
]);