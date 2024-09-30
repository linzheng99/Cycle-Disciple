import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { NotFound } from "./components/common/NotFound";
import Container from "./pages/container";
import Home from "./pages/home";

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    // TODO 可以使用函数生成一个tree
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: '/',
            element: <Container />
          },
        ]
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]

export const router = createBrowserRouter(routes);

