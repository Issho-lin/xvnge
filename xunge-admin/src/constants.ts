/*
 * @Author: linqibin
 * @Date: 2025-06-13 14:58:48
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-16 08:52:38
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
import { generateMapToOptions } from "@/utils/tools"

export const PUBLISH_STATUS = new Map([
    [1, "待发布"],
    [2, "已发布"],
    [3, "已下架"],
])
export const PUBLISH_STATUS_COLOR = new Map([
    [1, "#fdbd36"],
    [2, "#87d068"],
    [3, "#a09d9d"],
])
export const PUBLISH_STATUS_LIST = generateMapToOptions(PUBLISH_STATUS)


export const PRODUCT_TYPE = new Map([
    [1, "云服务"],
    [2, "GPU算力"],
    [3, "AI算法"],
    [4, "服务器/存储"],
    [5, "海外IDC"]
])
export const PRODUCT_TYPE_LIST = generateMapToOptions(PRODUCT_TYPE)