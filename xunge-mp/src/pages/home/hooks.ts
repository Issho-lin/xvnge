/*
 * @Author: linqibin
 * @Date: 2025-06-16 11:31:33
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-18 15:44:50
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
import { useState } from "react";
import * as Home from "@/api/home";
import { ReqById, ResActivity, ResBanner, ResProduct } from "@/api/type";
import { useDidShow } from "@tarojs/taro";
import { useImageHost } from "@/hooks/useImageHost";

export function useBanner(immediate = true) {
  const { getImagePath } = useImageHost();
  const [bannerList, setBannerList] = useState<ResBanner[]>([]);
  const getBanner = async (params?: ReqById) => {
    const imagePath = await getImagePath();
    const res = await Home.getBannerListApi(params);
    if (res.code === 200) {
      setBannerList(
        res.data
          .map((item) => ({
            ...item,
            bannerUrl: imagePath ? imagePath + item.bannerUrl : "",
          }))
          .filter((item) => item.bannerUrl)
      );
    }
  };

  useDidShow(() => {
    if (immediate) {
      getBanner();
    }
  });

  return { bannerList, getBanner };
}

export function useProduct() {
  const { getImagePath } = useImageHost();
  const [productList, setProductList] = useState<ResProduct[]>([]);
  const getProductList = async () => {
    const imagePath = await getImagePath();
    const res = await Home.getHotProductListApi();
    if (res.code === 200) {
      setProductList(
        res.data.splice(0, 3).map((item) => ({
          ...item,
          productUrl:
            imagePath && item.productUrl ? imagePath + item.productUrl : "",
          hotBigUrl:
            imagePath && item.hotBigUrl ? imagePath + item.hotBigUrl : "",
          hotSmallUrl:
            imagePath && item.hotSmallUrl ? imagePath + item.hotSmallUrl : "",
        }))
      );
    }
  };

  useDidShow(() => {
    getProductList();
  });

  return { productList, getProductList };
}

export function useActivity(immediate = true) {
  const { getImagePath } = useImageHost();
  const [activityList, setActivityList] = useState<ResActivity[]>([]);
  const getActivityList = async (params?: ReqById) => {
    const imagePath = await getImagePath();
    const res = await Home.getActivityListApi(params);
    if (res.code === 200) {
      setActivityList(
        res.data.map((item) => ({
          ...item,
          activityUrl: imagePath ? imagePath + item.activityUrl : "",
        }))
      );
    }
  };

  useDidShow(() => {
    if (immediate) {
      getActivityList();
    }
  });

  return { activityList, getActivityList };
}
