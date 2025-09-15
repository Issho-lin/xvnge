import HTTP from "@/service/http"
import type { ReqLogin, ResLogin } from "./type"

export const loginApi = (params: ReqLogin) => {
    return HTTP.POSTENCODED('/authcent/auth2/oauth/token', params) as unknown as Promise<ResLogin>
}