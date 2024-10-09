import { useEffect } from "react";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";

import { getAthleteInfo } from "~/api/athlete";
import { getLocalStorage } from "~/lib/local";
import { buildUserInfo, usePermissionStore, useUserStore } from "~/store";

import { routes } from "./index";

const GuardRoute = ({ children }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = getLocalStorage("access_token");
  const permissionStore = usePermissionStore()
  const userStore = useUserStore()
  const mathchs = matchRoutes(routes, location);

  const isExist = mathchs?.some((item) => item.pathname === location.pathname);

  useEffect(() => {
    if (!token) {
      permissionStore.refreshLastBuildTime()
      navigate("/login");
    }
    if (token && isExist) {
      if (!permissionStore.lastBuildTime) setUserInfo()
      permissionStore.setLastBuildTime()
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate("/dashboard");
      } else {
        navigate(location.pathname);
      }
    }
  }, [token, location.pathname]);

  async function setUserInfo() {
    const res = await getAthleteInfo()
    userStore.setUser(buildUserInfo(res))
  }

  return children;
};

export default GuardRoute;
