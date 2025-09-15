/*
 * @Author: linqibin
 * @Date: 2025-06-16 14:29:23
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-18 15:46:12
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
import { getProductListApi } from "@/api/product";
import { ReqProduct, ResProduct } from "@/api/type";
import { useImageHost } from "@/hooks/useImageHost";
import { useDidShow } from "@tarojs/taro";
import { useState } from "react";

export function useProduct(immediate = false) {
    const { getImagePath } = useImageHost()
    const [productList, setProductList] = useState<ResProduct[]>([]);
    const getProductList = async (params?: ReqProduct) => {
      const imagePath = await getImagePath();
      const res = await getProductListApi(params);
      if (res.code === 200) {
        setProductList(
          res.data.map((item) => ({
            ...item,
            productUrl: imagePath? imagePath + item.productUrl : "",
          }))
        );
      }
    }
  
    useDidShow(() => {
      if (immediate) {
        getProductList();
      }
    })
  
    return { productList, getProductList }
  }