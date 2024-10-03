import { useEffect } from "react";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";

import { routes } from "./index";

const GuardRoute = ({ children }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("access_token") || "";
  const mathchs = matchRoutes(routes, location);

  const isExist = mathchs?.some((item) => item.pathname === location.pathname);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if (token && isExist) {
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate("/dashboard");
      } else {
        navigate(location.pathname);
      }
    }
  }, [token, location.pathname]);

  return children;
};

export default GuardRoute;
