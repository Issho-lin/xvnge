/*
 * @Author: linqibin
 * @Date: 2025-05-29 16:08:33
 * @LastEditors: linqibin
 * @LastEditTime: 2025-07-03 09:01:37
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import { ConfigProvider } from "antd";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale("en");

function App() {
  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: "#1684fc", borderRadius: 4 } }}
      locale={zhCN}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
