/*
 * @Author: linqibin
 * @Date: 2025-05-30 10:34:51
 * @LastEditors: linqibin
 * @LastEditTime: 2025-07-02 11:51:01
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
/*
 * @Author: linqibin
 * @Date: 2025-05-30 10:34:51
 * @LastEditors: linqibin
 * @LastEditTime: 2025-05-30 11:54:23
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import type { RouteConfig } from "./type";

const config: RouteConfig[] = [
  {
    path: "/login",
    component: "pages/login/index",
  },
  {
    path: "/",
    component: "layouts/index",
    children: [
      {
        path: "/",
        redirect: "/banner",
      },
      {
        path: "/banner",
        component: "pages/banner/index",
      },
      {
        path: "/banner/create",
        component: "pages/banner/create/index",
      },
      {
        path: "/banner/edit",
        component: "pages/banner/create/index",
      },
      {
        path: "/banner/view",
        component: "pages/banner/create/index",
      },
      {
        path: "/product",
        component: "pages/product/index",
      },
      {
        path: "/product/create",
        component: "pages/product/create/index",
      },
      {
        path: "/product/edit",
        component: "pages/product/create/index",
      },
      {
        path: "/product/view",
        component: "pages/product/create/index",
      },
      {
        path: "/activity",
        component: "pages/activity/index",
      },
      {
        path: "/activity/create",
        component: "pages/activity/create/index",
      },
      {
        path: "/activity/edit",
        component: "pages/activity/create/index",
      },
      {
        path: "/activity/view",
        component: "pages/activity/create/index",
      },
      {
        path: "/solution",
        component: "pages/solution/index",
      },
      {
        path: "/solution/create",
        component: "pages/solution/create/index",
      },
      {
        path: "/solution/edit",
        component: "pages/solution/create/index",
      },
      {
        path: "/solution/view",
        component: "pages/solution/create/index",
      },
      {
        path: "/document",
        component: "pages/document/index",
      },
      {
        path: "/document/create",
        component: "pages/document/create/index",
      },
      {
        path: "/document/edit",
        component: "pages/document/create/index",
      },
      {
        path: "/document/view",
        component: "pages/document/create/index",
      },
      {
        path: "/user",
        component: "pages/user/index",
      },
      {
        path: "/account",
        component: "pages/account/index",
      }
    ],
  },
  {
    path: "*",
    component: "pages/404/index",
  },
];
export default config;
