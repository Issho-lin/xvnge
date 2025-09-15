/*
 * @Author: linqibin
 * @Date: 2025-05-30 16:48:58
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-26 15:06:14
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */

import { View, ScrollView, Image, ITouchEvent } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { useTabBar } from "@/hooks/useTabBar";
import Search from "@/components/Search";
// import { ResProduct } from "@/api/type";
import { useRef, useState } from "react";
import { PRODUCT_CATEGORY, PRODUCT_CATEGORY_MAP } from "./const";
import "./index.scss";
import { useProduct } from "./hooks";

export default function Product() {
  useTabBar(1);

  const { productList, getProductList } = useProduct();

  const [refresherTriggered, setRefresherTriggered] = useState(false);
  const [activeCategory, setActiveCategory] = useState(
    PRODUCT_CATEGORY[0].value
  );
  // const [scrollIntoView, setScrollIntoView] = useState("");
  // const [scrollWithAnimation, setScrollWithAnimation] = useState(true);

  // const scrollViewRef = useRef<any>();

  const scrollToTop = () => {
    Taro.createSelectorQuery()
      .select('#product-scroll-view')
      .node()
      .exec((res) => {
        res[0].node.scrollTo({ top: 0, animated: false })
      })
  }

  const onRefresherRefresh = async () => {
    setRefresherTriggered(true);
    await getProductList({ productType: activeCategory });
    setRefresherTriggered(false);
  };

  const isClick = useRef<boolean>(false);

  const handleCategoryClick = (categoryId: string) => {
    isClick.current = true;
    setActiveCategory(categoryId);
    getProductList({ productType: categoryId });
    scrollToTop()
    // setScrollIntoView(`product_${categoryId}`);
  };

  // const handleScroll = (_event: any) => {
  //   if (isClick.current) {
  //     isClick.current = false;
  //     return;
  //   }
  //   let searchBoxHeight = 0;
  //   Taro.createSelectorQuery()
  //     .selectAll(".search-box")
  //     .boundingClientRect()
  //     .exec((rects) => {
  //       const { height, top } = rects[0][0];
  //       searchBoxHeight = height + top * 2;
  //     });
  //   Taro.createSelectorQuery()
  //     .selectAll(".product-item")
  //     .boundingClientRect()
  //     .exec((rects) => {
  //       rects[0].forEach((rect) => {
  //         if (rect.top - searchBoxHeight <= 50) {
  //           setActiveCategory(rect.id.replace("product_", ""));
  //         }
  //       });
  //     });
  // };


  const onDetail = (id: number) => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}&type=product`,
    });
  };

  useDidShow(async () => {
    const params = Taro.getStorageSync("categoryId");
    Taro.removeStorageSync("categoryId");
    // setScrollWithAnimation(false);
    if (params) {
      handleCategoryClick(params);
    } else {
      handleCategoryClick(PRODUCT_CATEGORY[0].value);
    }
  });

  // const [productMap, setProductMap] = useState<Map<number, ResProduct[]>>(
  //   new Map()
  // );

  // useEffect(() => {
  //   if (productList.length > 0) {
  //     const map = new Map();
  //     productList.forEach((item) => {
  //       if (map.has(item.productType)) {
  //         map.set(item.productType, [...map.get(item.productType), item]);
  //       } else {
  //         map.set(item.productType, [item]);
  //       }
  //     });
  //     setProductMap(map);
  //   } else {
  //     setProductMap(new Map());
  //   }
  // }, [productList]);

  const onSearch = (e: ITouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    Taro.navigateTo({
      url: "/pages/search/index?type=product",
    });
  };

  return (
    <View className='product_page'>
      <Search onClick={onSearch} disabled />
      <View className='container'>
        <View className='category'>
          {PRODUCT_CATEGORY.map((item) => {
            return (
              <View
                key={item.value}
                className={`category-item ${
                  activeCategory === item.value ? "active" : ""
                }`}
                onClick={() => {
                  // setScrollWithAnimation(true);
                  handleCategoryClick(item.value);
                }}
              >
                {item.label}
              </View>
            );
          })}
        </View>
        <ScrollView
          id='product-scroll-view'
          className='scroll-view'
          scrollY
          refresherEnabled
          enhanced
          refresherTriggered={refresherTriggered}
          onRefresherRefresh={onRefresherRefresh}
          // scrollWithAnimation={scrollWithAnimation}
          // scrollAnimationDuration='30'
          // ref={scrollViewRef}
          // onScroll={handleScroll}
          // scrollIntoView={scrollIntoView}
        >
          {/* {PRODUCT_CATEGORY.map((item) => {
            return (
              <View
                key={item.value}
                className='product-item'
                id={`product_${item.value}`}
              >
                <View className='product-item-title'>{item.label}</View>
                <View className='product-item-content'>
                  {!productMap.get(+item.value)?.length && (
                    <View className='no-product'>
                      <Image
                        className='no-product-img'
                        src={require("@/assets/images/empty.png")}
                      />
                      <View className='no-product-text'>暂无产品</View>
                    </View>
                  )}
                  {productMap.get(+item.value)?.map((child) => {
                    return (
                      <View
                        key={child.id}
                        className='product-item-content-item'
                        onTap={() => onDetail(child.id)}
                      >
                        <View
                          className='product-item-content-item-bg'
                          style={{
                            backgroundImage: `url(${child.productUrl})`,
                          }}
                        >
                          <View className='product-name'>
                            {child.productName}
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })} */}
          <View className='product-item'>
            <View className='product-item-title'>
              {PRODUCT_CATEGORY_MAP.get(activeCategory)}
            </View>
            <View className='product-item-content'>
              {!productList?.length ? (
                <View className='no-product'>
                  <Image
                    className='no-product-img'
                    src={require("@/assets/images/empty.png")}
                  />
                  <View className='no-product-text'>暂无产品</View>
                </View>
              ) : (
                productList?.map((child) => (
                  <View
                    key={child.id}
                    className='product-item-content-item'
                    onTap={() => onDetail(child.id)}
                  >
                    <View
                      className='product-item-content-item-bg'
                      style={{
                        backgroundImage: `url(${child.productUrl})`,
                      }}
                    >
                      <View className='product-name'>{child.productName}</View>
                    </View>
                  </View>
                ))
              )}
            </View>
          </View>
          <View className='no-more'>-- 没有更多了哦 --</View>
        </ScrollView>
      </View>
    </View>
  );
}
