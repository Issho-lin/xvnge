/*
 * @Author: linqibin
 * @Date: 2025-06-16 11:12:08
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-16 11:12:39
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import md5 from 'md5'

const interceptor: Taro.interceptor = (chain) => {
  const requestParams = chain.requestParams
  const random = Math.floor(Math.random() * 1000)
  const timestamp = dayjs().format('YYYYMMDD')
  const key = 'u8gt8542we'
  const sign = md5(
    `random${random}timestamp${timestamp}key${key}`
  ).toLocaleUpperCase()
  requestParams.header = {
    ...requestParams.header,
    random,
    timestamp,
    sign,
  }
  return chain
    .proceed(requestParams)
    .then((res: Taro.request.SuccessCallbackResult<any>) => {
      if (res.statusCode === 200) {
        const { code, message } = res.data
        if (code !== 200 && message) {
          Taro.showToast({
            title: message,
            icon: 'none',
            duration: 2000,
          })
        }
        return res.data
      }
      return res
    })
}

declare type IResponse<T> = {
  data: T
  code: number
  message: string
}
Taro.addInterceptor(interceptor)

function request<T>(params: any, method: keyof Taro.request.Method = 'GET') {
  let { url, data, header } = params
  let contentType = 'application/json'
  // contentType = params.header?.contentType || contentType
  // console.log(JSON.parse(JSON.stringify(data)))
  const option: Taro.request.Option<any> = {
    url: process.env.JD_SERVER_URL + url,
    data: JSON.parse(JSON.stringify(data ?? {})),
    method: method,
    header: {
      'content-type': contentType,
      ...header,
    },
  }
  return Taro.request(option) as any as Promise<IResponse<T>>
}

export default request
