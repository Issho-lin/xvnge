/*
 * @Author: linqibin
 * @Date: 2025-07-02 15:21:54
 * @LastEditors: linqibin
 * @LastEditTime: 2025-07-02 15:24:31
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import HTTP from "@/service/http";
import type { ReqAccount, ReqActivateAccount, ReqUpdateAccount, ResAccount } from "./type";

export const getAccountPagesApi = (params: ReqAccount) => {
  return HTTP.GET<{ total: number; data: ResAccount[] }>("/account/gdUser/page", params);
};


export const addAccountApi = (params: ReqUpdateAccount) => {
    return HTTP.POST('/account/gdUser/save', params)
  }

  export const updateAccountApi = (params: ReqUpdateAccount) => {
    return HTTP.POST('/account/gdUser/update', params)
  }

  export const activateAccountApi = (params: ReqActivateAccount) => {
    return HTTP.POST('/account/gdUser/active', params)
  }