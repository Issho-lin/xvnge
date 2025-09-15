/*
 * @Author: linqibin
 * @Date: 2024-09-26 15:49:17
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-19 18:27:56
 * @Description:
 *
 * Copyright (c) 2024 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import { Image, Swiper, SwiperItem, View } from "@tarojs/components";
import { useState } from "react";
import Taro from "@tarojs/taro";
import { ResSolution } from "@/api/type";
import pic1 from "@/assets/images/Idiot/图层10.png";
import "./Solutions.scss";

interface SolutionProps {
  data: ResSolution[];
}

const Solutions: React.FC<SolutionProps> = ({ data }) => {
  const [autoplay, setAutoplay] = useState(true);

  const [current, setCurrent] = useState(0);

  const onLinkUrl = (item: typeof data[0]) => {
    console.log(item);
    if (item.publishType === 1) {
      console.log('内容---', item.solutionContent);
      Taro.navigateTo({
        url: `/pages/detail/index?id=${item.id}&type=solution`,
      });
    } else {
      Taro.redirectTo({
        url: `/pages/webview/index?url=${item.solutionContent}`,
      });
    }
  };

  return (
    <View className='banner-container'>
      <Swiper
        className='banner'
        // indicatorColor='#FFFFFF'
        // indicatorActiveColor='#2A89FF'
        circular
        indicatorDots={false}
        autoplay={autoplay}
        current={current}
        onChange={(e) => {
          setCurrent(e.detail.current);
          setAutoplay(true);
        }}
      >
        {!data?.length ? (
          <SwiperItem>
            <Image
              className='banner_item'
              src={pic1}
            />
          </SwiperItem>
        ) : (
          data.map((item, idx) => (
            <SwiperItem key={idx}>
              <Image
                className='banner_item'
                mode='aspectFill'
                src={item.solutionUrl}
                onTap={() => onLinkUrl(item)}
              />
            </SwiperItem>
          ))
        )}
      </Swiper>
      <View className='banner_indicator'>
        {data.map((_, idx) => (
          <View
            key={idx}
            className={`banner_indicator_item ${
              idx === current ? "banner_indicator_item_active" : ""
            }`}
          />
        ))}
      </View>
    </View>
  );
};
export default Solutions;
