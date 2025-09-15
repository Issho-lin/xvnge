import HTTP from "@/server/http"

export const getImageHostApi = () => {
    return HTTP.GET<string>('/operation/wechat/banner/getImagePath')
}