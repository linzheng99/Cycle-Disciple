import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "./App";
import { NotFound } from "./components/common/NotFound";
import { Activity } from "./pages/activity";
import { Dashboard } from "./pages/dashboard";

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    // TODO 可以使用函数生成一个tree
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/activity",
        element: <Activity />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]

export const router = createBrowserRouter(routes);

