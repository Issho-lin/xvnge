import HTTP from "@/service/http";
import type { ReqUpdatePass, ReqUpdateUserInfo, ResUserInfo } from "./type";

export const getUserInfoApi = () => {
  return HTTP.GET<ResUserInfo>("/account/gdUser/personInfo");
};

export const updataPasswordApi = (params: ReqUpdatePass) => {
  return HTTP.POST("/account/gdUser/updatePass", params);
};

export const updateUserInfoApi = (params: ReqUpdateUserInfo) => {
  return HTTP.POST("/account/gdUser/upPersonInfo", params);
};
