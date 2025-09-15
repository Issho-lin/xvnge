import HTTP from "@/service/http"

export const getImageHostApi = () => {
    return HTTP.GET<string>('/operation/wechat/banner/getImagePath')
}