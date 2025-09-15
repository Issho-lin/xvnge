import HTTP from "@/server/http"
import { ReqById, ResDoc, ResSolution } from "./type"

export const getSolutionListApi = (params?: ReqById) => {
    return HTTP.GET<ResSolution[]>('/operation/wechat/solution/getSolutionList', params)
}

export const getDocumentListApi = (params?: ReqById) => {
    return HTTP.GET<ResDoc[]>('/operation/wechat/doc/getDocList', params)
}