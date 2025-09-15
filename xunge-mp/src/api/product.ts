/*
 * @Author: linqibin
 * @Date: 2025-06-16 11:22:50
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-16 11:24:24
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
import HTTP from "@/server/http"
import { ReqProduct, ResProduct } from "./type"

export const getProductListApi = (params?: ReqProduct) => {
    return HTTP.GET<ResProduct[]>('/operation/wechat/product/getProductList', params)
}