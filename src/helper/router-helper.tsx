import React from "react";

import type { IRouteItem } from "~/routes";
import GuardRoute from "~/routes/guard";

export function buildRoutes(routeList: IRouteItem[]): IRouteItem[] {
  return routeList.map(item => {
    if (item.meta?.isCheck) {
      return {
        ...item,
        element: React.createElement(GuardRoute, null, item.element),
        children: item.children ? buildRoutes(item.children) : undefined
      };
    }
    if (item.children) {
      return {
        ...item,
        children: buildRoutes(item.children)
      };
    }
    return item;
  });
}
