/*
 * @Author: linqibin
 * @Date: 2025-06-13 14:02:06
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-13 15:33:52
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
import HTTP from "@/service/http"
import type { ReqAddBanner, ReqBanner, ReqDelBanner, ReqPublishBanner, ReqUnpublishBanner, ReqUpdateBanner, ResBanner } from "./type"

export const getBannerPagesApi = (params: ReqBanner) => {
    return HTTP.GET<{ total: number, records: ResBanner[] }>('/operation/wechat/banner/queryBannerPage', params)
}

export const addBannerApi = (params: ReqAddBanner) => {
    return HTTP.POST('/operation/wechat/banner/addBanner', params)
}

export const updateBannerApi = (params: ReqUpdateBanner) => {
    return HTTP.POST('/operation/wechat/banner/editBanner', params)
}

export const delBannerApi = (params: ReqDelBanner) => {
    return HTTP.GET('/operation/wechat/banner/deleteBanner', params)
}

export const publishBannerApi = (params: ReqPublishBanner) => {
    return HTTP.POST('/operation/wechat/banner/publishBanner', params)
}

export const unPublishBannerApi = (params: ReqUnpublishBanner) => {
    return HTTP.GET('/operation/wechat/banner/removeBanner', params)
}