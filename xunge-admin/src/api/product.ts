import HTTP from "@/service/http"
import type { ReqAddProduct, ReqDelProduct, ReqProduct, ReqPublishProduct, ReqUnpublishProduct, ReqUpdateProduct, ResProduct } from "./type"


export const getProductPagesApi = (params: ReqProduct) => {
    return HTTP.GET<{ total: number, records: ResProduct[] }>('/operation/wechat/product/queryProductPage', params)
}

export const addProductApi = (params: ReqAddProduct) => {
    return HTTP.POST('/operation/wechat/product/addProduct', params)
}

export const updateProductApi = (params: ReqUpdateProduct) => {
    return HTTP.POST('/operation/wechat/product/editProduct', params)
}

export const delProductApi = (params: ReqDelProduct) => {
    return HTTP.GET('/operation/wechat/product/deleteProduct', params)
}

export const publishProductApi = (params: ReqPublishProduct) => {
    return HTTP.POST('/operation/wechat/product/publishProduct', params)
}

export const unpublishProductApi = (params: ReqUnpublishProduct) => {
    return HTTP.GET('/operation/wechat/product/removeProduct', params)
}
