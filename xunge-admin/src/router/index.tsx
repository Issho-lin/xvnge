/*
 * @Author: linqibin
 * @Date: 2025-05-30 10:36:40
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-12 16:57:29
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import { lazy } from "react";
import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";
import config from "./routes";
import type { RouteConfig } from "./type";

const pages = {
  ...import.meta.glob("../pages/**/**.tsx"),
  ...import.meta.glob("../layouts/**.tsx"),
} as {
  [x: string]: () => Promise<{
    default: React.FC<object>;
  }>;
};

const getRoutes = (routes: RouteConfig[]): RouteObject[] => {
  return routes.map((route) => {
    const { path, component, children, redirect } = route;
    if (!component && redirect) {
      return {
        path,
        element: <Navigate to={redirect} />,
      };
    }
    const Element = lazy(pages[`../${component}.tsx`]);
    if (children && children.length > 0) {
      return {
        path,
        element: <Element />,
        children: getRoutes(children),
      };
    }
    return {
      path,
      element: <Element />,
    };
  });
};


const router = createBrowserRouter(getRoutes(config));

export default router;
