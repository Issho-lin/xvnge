/*
 * @Author: linqibin
 * @Date: 2025-05-30 16:48:58
 * @LastEditors: linqibin
 * @LastEditTime: 2025-07-09 14:56:16
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import { View, ScrollView, Image } from "@tarojs/components";
import { useTabBar } from "@/hooks/useTabBar";
import Taro from "@tarojs/taro";
import { useState } from "react";
import Solutions from "./components/Solutions";
import { useDocument, useSolution } from "./hooks";
import "./index.scss";

export default function Document() {
  useTabBar(3);

  const { solutionList, getSolutionList } = useSolution();
  const { docList, getDocList } = useDocument();

  const [refresherTriggered, setRefresherTriggered] = useState(false);

  const onRefresherRefresh = async () => {
    setRefresherTriggered(true);
    await Promise.all([getSolutionList(), getDocList()]);
    setRefresherTriggered(false);
  };

  const onLinkUrl = (item: typeof docList[0]) => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${item.id}&type=doc`,
    });
  };

  return (
    <View className='document-page'>
      <ScrollView
        id='document-scroll-view'
        className='scroll-view'
        scrollY
        refresherEnabled
        enhanced
        refresherTriggered={refresherTriggered}
        onRefresherRefresh={onRefresherRefresh}
      >
        <Solutions data={solutionList} />
        {docList.map((item) => {
          return (
            <View key={item.id} className='item' onTap={() => onLinkUrl(item)}>
              <View className='item-content'>
                <View className='item-title'>{item.docName}</View>
                <View
                  className='item-desc'
                  // dangerouslySetInnerHTML={{ __html: item.docContent }}
                ></View>
              </View>
              <Image
                className='item-image'
                src={item.docUrl || require("@/assets/images/document/1.png")}
              />
            </View>
          );
        })}
        <View className='no-more'>-- 没有更多了哦 --</View>
      </ScrollView>
    </View>
  );
}
