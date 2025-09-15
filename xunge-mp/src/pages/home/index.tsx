/*
 * @Author: linqibin
 * @Date: 2025-05-26 09:19:11
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-18 16:59:23
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
import { ITouchEvent, ScrollView, View } from "@tarojs/components";
import { useTabBar } from "@/hooks/useTabBar";
import Search from "@/components/Search";
import { useState } from "react";
import Taro, { useShareAppMessage } from "@tarojs/taro";
import Banner from "./components/Banner";
import Category from "./components/Category";
import HotProduct from "./components/Product";
import Activity from "./components/Activity";
import Partner from "./components/Partner";
import Contact from "./components/Contact";
import "./index.scss";
import { useActivity, useBanner, useProduct } from "./hooks";

export default function Home() {
  useTabBar(0);

  const { bannerList, getBanner } = useBanner()
  const { productList, getProductList } = useProduct()
  const { activityList, getActivityList } = useActivity()

  const [refresherTriggered, setRefresherTriggered] = useState(false);

  const onRefresherRefresh = async () => {
    setRefresherTriggered(true);
    await Promise.all([
      getBanner(),
      getProductList(),
      getActivityList()
    ]);
    setRefresherTriggered(false);
  };

  const onSearch = (e: ITouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    Taro.navigateTo({
      url: "/pages/search/index",
    });
  };

  useShareAppMessage(() => {
    return {
      title: "  ",
      path: "/pages/home/index",
    };
  })

  return (
    <View className='home-page'>
      <Search onClick={onSearch} disabled />
      <ScrollView
        id='home-scroll-view'
        className='scroll-view'
        scrollY
        refresherEnabled
        enhanced
        refresherTriggered={refresherTriggered}
        onRefresherRefresh={onRefresherRefresh}
      >
        <Banner data={bannerList} />
        <Category />
        <HotProduct data={productList} />
        <Activity data={activityList} />
        <Partner />
        <Contact />
        <View className='no-more'>-- 没有更多了哦 --</View>
      </ScrollView>
    </View>
  );
}
