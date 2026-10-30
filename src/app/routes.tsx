import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

const Home = lazy(() => import("@/pages/Home"));
const Explore = lazy(() => import("@/pages/Explore"));
const PropertyDetails = lazy(() => import("@/pages/PropertyDetails"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const TenantPortal = lazy(() => import("@/pages/TenantPortal"));
const OwnerPortal = lazy(() => import("@/pages/OwnerPortal"));
const BrokerPortal = lazy(() => import("@/pages/BrokerPortal"));
const AdminPortal = lazy(() => import("@/pages/AdminPortal"));
const Login = lazy(() => import("@/pages/Login"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function RouteSuspense({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="h-7 w-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <RouteSuspense><Home /></RouteSuspense> },
      { path: "/explore", element: <RouteSuspense><Explore /></RouteSuspense> },
      { path: "/property/:id", element: <RouteSuspense><PropertyDetails /></RouteSuspense> },
      { path: "/properties/:id", element: <RouteSuspense><PropertyDetails /></RouteSuspense> },
      { path: "/about", element: <RouteSuspense><About /></RouteSuspense> },
      { path: "/contact", element: <RouteSuspense><Contact /></RouteSuspense> },
      { path: "/tenant", element: <RouteSuspense><TenantPortal /></RouteSuspense> },
      { path: "/owner", element: <RouteSuspense><OwnerPortal /></RouteSuspense> },
      { path: "/broker", element: <RouteSuspense><BrokerPortal /></RouteSuspense> },
      { path: "/admin", element: <RouteSuspense><AdminPortal /></RouteSuspense> },
      { path: "/login", element: <RouteSuspense><Login /></RouteSuspense> },
      { path: "/dashboard", element: <RouteSuspense><Dashboard /></RouteSuspense> },
      { path: "*", element: <RouteSuspense><NotFound /></RouteSuspense> },
    ],
  },
]);
