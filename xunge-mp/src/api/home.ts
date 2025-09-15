import HTTP from "@/server/http"
import { ReqById, ReqProductDoc, ResActivity, ResBanner, ResDoc, ResProduct } from "./type"

export const getBannerListApi = (params?: ReqById) => {
    return HTTP.GET<ResBanner[]>('/operation/wechat/banner/getBannerList', params)
}

export const getHotProductListApi = () => {
    return HTTP.GET<ResProduct[]>('/operation/wechat/product/getHotProductList')
}

export const getActivityListApi = (params?: ReqById) => {
    return HTTP.GET<ResActivity[]>('/operation/wechat/discountActivity/getActivityList', params)
}

export const getProductDocListApi = (params: ReqProductDoc) => {
    return HTTP.GET<{
        docList: ResDoc[]
        productList: ResProduct[]
    }>('/operation/wechat/product/queryProductDoc', params)
}