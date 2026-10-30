import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import PropertyDetails from "@/pages/PropertyDetails";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import TenantPortal from "@/pages/TenantPortal";
import OwnerPortal from "@/pages/OwnerPortal";
import BrokerPortal from "@/pages/BrokerPortal";
import AdminPortal from "@/pages/AdminPortal";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/explore", element: <Explore /> },
      { path: "/property/:id", element: <PropertyDetails /> },
      { path: "/properties/:id", element: <PropertyDetails /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/tenant", element: <TenantPortal /> },
      { path: "/owner", element: <OwnerPortal /> },
      { path: "/broker", element: <BrokerPortal /> },
      { path: "/admin", element: <AdminPortal /> },
      { path: "/login", element: <Login /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
