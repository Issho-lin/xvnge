/*
 * @Author: linqibin
 * @Date: 2025-06-12 15:59:45
 * @LastEditors: linqibin
 * @LastEditTime: 2025-07-02 10:11:52
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from "./request";
import type { ResponseType } from "axios";
import qs from "qs";

export default class HTTP {
  static GET<T>(
    url: string,
    params?: Record<string, any>,
    responseType?: ResponseType,
    headers?: Record<string, any>
  ) {
    return request<T>({
      url,
      method: "GET",
      params,
      responseType,
      paramsSerializer: (param) =>
        qs.stringify(param, { arrayFormat: "repeat" }),
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        ...headers,
      },
    });
  }

  static POST<T>(
    url: string,
    body?: Record<string, any>,
    responseType?: ResponseType,
    headers?: Record<string, any>
  ) {
    return request<T>({
      url,
      method: "POST",
      data: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        ...headers,
      },
      responseType,
    });
  }

  static POSTENCODED<T>(url: string, body?: Record<string, any>) {
    return request<T>({
      url,
      method: "POST",
      data: body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  static POSTFORM<T>(
    url: string,
    data?: Record<string, any>,
    responseType?: ResponseType
  ) {
    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === "string") {
          data[key] = data[key].trim();
        }
        formData.append(key, data[key]);
      });
    }
    return request<T>({
      url,
      method: "POST",
      data: formData,
      responseType,
    });
  }

  static PUT<T>(
    url: string,
    data?: Record<string, any>,
    responseType?: ResponseType
  ) {
    return request<T>({
      url,
      method: "PUT",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      responseType,
    });
  }

  static DELETE<T>(url: string, params?: Record<string, any>) {
    return request<T>({
      url,
      method: "DELETE",
      params,
    });
  }
}
