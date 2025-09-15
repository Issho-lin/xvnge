import request from './request'

export default class HTTP {
  static GET<T>(url: string, data?: Record<string, any>) {
    return request<T>({
      url,
      data,
    })
  }

  static POST<T>(url: string, data: Record<string, any>, header?: any) {
    return request<T>(
      {
        url,
        data,
        header,
      },
      'POST'
    )
  }

  static PUT<T>(url: string, data: Record<string, any>, header?: any) {
    return request<T>(
      {
        url,
        data,
        header,
      },
      'PUT'
    )
  }

  static DELETE<T>(url: string, data: Record<string, any>) {
    return request<T>(
      {
        url,
        data,
      },
      'DELETE'
    )
  }
}
