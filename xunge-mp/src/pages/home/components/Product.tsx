import { ScrollView, View } from "@tarojs/components";
import React, { useMemo } from "react";
import { ResProduct } from "@/api/type";
import Taro from "@tarojs/taro";
import "./Product.scss";

interface HotProductProps {
  data: ResProduct[];
}

const HotProduct: React.FC<HotProductProps> = ({ data }) => {
  const groupData = useMemo(() => {
    const list: ((typeof data)[0] & { img: string })[][] = [];
    const color = ["#bad5df", "#c3d1bf", "#d0c0a9"];
    for (let i = 0; i < data.length; i += 3) {
      list.push(
        data.slice(i, i + 3).map((item, idx) => ({ ...item, img: color[idx] }))
      );
    }
    return list;
  }, [data]);

  const onLinkUrl = (item: typeof data[0]) => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${item.id}&type=product`,
    });
  };
  return (
    <View className='hot-product'>
      <View className='hot-product-title'>热门产品</View>
      <ScrollView scrollX className='scroll-x-view'>
        <View className='hot-product-row'>
          {groupData.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {index === 0 && item.length === 1 ? (
                  <View
                    className='hot-product-item-01'
                    // style={{ background: item[0].img }}
                    style={{ backgroundImage: `url(${item[0].hotBigUrl || item[0].productUrl})` }}
                    onTap={() => onLinkUrl(item[0])}
                  >
                    <View className='hot-product-item-label'>
                      {item[0].productName}
                    </View>
                  </View>
                ) : index === 0 && item.length === 2 ? (
                  item.map((o) => {
                    return (
                      <View
                        key={o.id}
                        className='hot-product-item-02'
                        // style={{ background: o.img }}
                        style={{ backgroundImage: `url(${o.hotBigUrl || o.productUrl})` }}
                        onTap={() => onLinkUrl(o)}
                      >
                        <View className='hot-product-item-label'>
                          {o.productName}
                        </View>
                      </View>
                    );
                  })
                ) : item.length === 2 ? (
                  <View className='hot-product-item-row'>
                    {item.map((o) => {
                      return (
                        <View
                          key={o.id}
                          className='hot-product-item'
                          // style={{ background: o.img }}
                          style={{ backgroundImage: `url(${o.hotSmallUrl || o.productUrl})` }}
                          onTap={() => onLinkUrl(o)}
                        >
                          <View className='hot-product-item-label'>
                            {o.productName}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                ) : (
                  <>
                    <View
                      className='hot-product-item-03-01'
                      style={{
                        // background: item[0].img,
                        backgroundImage: `url(${item[0].hotBigUrl || item[0].productUrl})`,
                        marginRight: groupData.length === 1 ? "16rpx" : "5rpx",
                      }}
                      onTap={() => onLinkUrl(item[0])}
                    >
                      <View className='hot-product-item-label'>
                        {item[0].productName}
                      </View>
                    </View>
                    {item.length === 3 && (
                      <View className='hot-product-item-row'>
                        <View
                          className='hot-product-item'
                          // style={{ background: item[1].img }}
                          style={{ backgroundImage: `url(${item[1].hotSmallUrl || item[1].productUrl})` }}
                          onTap={() => onLinkUrl(item[1])}
                        >
                          <View className='hot-product-item-label'>
                            {item[1].productName}
                          </View>
                        </View>
                        <View
                          className='hot-product-item'
                          // style={{ background: item[2].img }}
                          style={{ backgroundImage: `url(${item[2].hotSmallUrl || item[2].productUrl})` }}
                          onTap={() => onLinkUrl(item[2])}
                        >
                          <View className='hot-product-item-label'>
                            {item[2].productName}
                          </View>
                        </View>
                      </View>
                    )}
                  </>
                )}
              </React.Fragment>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
export default HotProduct;
