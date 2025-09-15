/*
 * @Author: linqibin
 * @Date: 2025-05-30 11:54:29
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-05 17:29:58
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import __404__ from "@/assets/img/404.svg";

const NotFound: React.FC = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img style={{ width: 600 }} src={__404__} alt="404" />
    </div>
  );
};
export default NotFound;
