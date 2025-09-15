/*
 * @Author: linqibin
 * @Date: 2025-06-17 16:03:42
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-20 10:07:05
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
import { getProductDocListApi } from "@/api/home";
import { ReqProductDoc, ResDoc, ResProduct } from "@/api/type";
import { useImageHost } from "@/hooks/useImageHost";
import { useState } from "react";

export function useProductDoc() {
    const { getImagePath } = useImageHost()
    const [productList, setProductList] = useState<ResProduct[]>([]);
    const [docList, setDocList] = useState<ResDoc[]>([])
    const getProductDocList = async (params: ReqProductDoc) => {
      const imagePath = await getImagePath();
      const res = await getProductDocListApi(params);
      if (res.code === 200) {
        setProductList(
          res.data?.productList?.map((item) => ({
            ...item,
            productUrl: imagePath? imagePath + item.productUrl : "",
          })) || []
        );
        setDocList(
          res.data?.docList?.map((item) => ({
           ...item,
            docUrl: imagePath && item.docUrl ? imagePath + item.docUrl : "",
          })) || []
        );
      }
    }
  
    return { productList, docList, setProductList, setDocList, getProductDocList }
  }