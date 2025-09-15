/*
 * @Author: linqibin
 * @Date: 2025-06-18 10:57:43
 * @LastEditors: linqibin
 * @LastEditTime: 2025-07-02 10:48:50
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
import Cookies from "js-cookie";

export const useLoginStatus = () => {
  const token = Cookies.get("token");
  return {
    isLogin: !!token
  };
};
