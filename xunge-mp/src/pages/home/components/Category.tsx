/*
 * @Author: linqibin
 * @Date: 2025-06-09 14:39:13
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-09 18:21:13
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { PRODUCT_CATEGORY } from "@/pages/product/const";
import "./Category.scss";

const Category: React.FC = () => {
  const onCategoryClick = (e: typeof PRODUCT_CATEGORY[0]) => {
    console.log(e);
    Taro.setStorageSync("categoryId", e.value);
    Taro.switchTab({
      url: `/pages/product/index`,
    })
  };
  return (
    <View className='category-row'>
      {PRODUCT_CATEGORY.map((item) => {
        return (
          <View
            key={item.value}
            className='category-item'
            onClick={() => onCategoryClick(item)}
          >
            <Image
              className='category-item-img'
              mode='aspectFill'
              src={require(`@/assets/images/product/${item.icon}.png`)}
            />
            <Text className='category-item-label'>{item.label}</Text>
          </View>
        );
      })}
    </View>
  );
};
export default Category;
