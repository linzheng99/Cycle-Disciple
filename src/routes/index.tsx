import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "~/App";
import { NotFound } from "~/components/common/NotFound";
import { buildRoutes } from "~/helper/router-helper";
import { Activity } from "~/pages/activity";
import { Dashboard } from "~/pages/dashboard";
import { ExchangeToken } from "~/pages/exchange_token";
import { Login } from "~/pages/login";
import { Profile } from "~/pages/profile";


export interface IRouteItem {
  path: string;
  element: React.ReactNode;
  errorElement?: React.ReactNode;
  children?: IRouteItem[];
  meta?: {
    isCheck?: boolean;
  };
}

export const routes: IRouteItem[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        meta: {
          isCheck: true,
        }
      },
      {
        path: "/activity",
        element: <Activity />,
        meta: {
          isCheck: true,
        }
      },
      {
        path: "/profile",
        element: <Profile />,
        meta: {
          isCheck: true,
        }
      },
      {
        path: "/exchange_token",
        element: <ExchangeToken />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  }
]

export const router = createBrowserRouter(buildRoutes(routes));


