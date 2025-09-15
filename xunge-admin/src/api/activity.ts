/*
 * @Author: linqibin
 * @Date: 2025-06-17 08:38:11
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-17 08:51:14
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
import HTTP from "@/service/http";
import type { ReqActivity, ReqAddActivity, ReqDelActivity, ReqPublishActivity, ReqUnpublishActivity, ReqUpdateActivity, ResActivity } from "./type";

export const getActivityPagesApi = (params: ReqActivity) => {
  return HTTP.GET<{ total: number; records: ResActivity[] }>(
    "/operation/wechat/discountActivity/queryActivityPage",
    params
  );
};

export const addActivityApi = (params: ReqAddActivity) => {
  return HTTP.POST("/operation/wechat/discountActivity/addActivity", params);
};

export const updateActivityApi = (params: ReqUpdateActivity) => {
  return HTTP.POST("/operation/wechat/discountActivity/editActivity", params);
}

export const delActivityApi = (params: ReqDelActivity) => {
  return HTTP.GET("/operation/wechat/discountActivity/deleteActivity", params);
};

export const publishActivityApi = (params: ReqPublishActivity) => {
  return HTTP.POST("/operation/wechat/discountActivity/publishActivity", params);
};

export const unpublishActivityApi = (params: ReqUnpublishActivity) => {
  return HTTP.GET("/operation/wechat/discountActivity/removeActivity", params);
}
