/*
 * @Author: linqibin
 * @Date: 2025-06-03 11:47:18
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-23 14:26:33
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import { Image, ScrollView, View } from "@tarojs/components";
import ShareContact from "@/components/ShareContact";
import Taro, { useLoad, useShareAppMessage } from "@tarojs/taro";
import { useMemo, useState } from "react";
import RichText from "@/components/RichText";
import { useActivity, useBanner } from "../home/hooks";
import "./index.scss";
import { useProduct } from "../product/hooks";
import { useDocument, useSolution } from "../document/hooks";

const TITLE_MAP = {
  banner: "banner详情",
  product: "产品详情",
  activity: "活动详情",
  solution: "方案详情",
  doc: "文档详情",
};

const ProductDetail: React.FC = () => {
  const [type, setType] = useState("");
  const [id, setId] = useState<number>();

  const { bannerList, getBanner } = useBanner(false);
  const { productList, getProductList } = useProduct(false);
  const { activityList, getActivityList } = useActivity(false);
  const { solutionList, getSolutionList } = useSolution(false);
  const { docList, getDocList } = useDocument(false);

  const getData = async (_type: string, _id: number) => {
    if (_type === "banner") {
      await getBanner({ id: _id });
    } else if (_type === "product") {
      await getProductList({ id: _id });
    } else if (_type === "activity") {
      await getActivityList({ id: _id });
    } else if (_type === "solution") {
      await getSolutionList({ id: _id });
    } else if (_type === "doc") {
      await getDocList({ id: _id });
    }
  }

  useLoad((params) => {
    console.log("params", params);
    if (!params) {
      return;
    }
    setId(+params.id);
    setType(params.type);
    Taro.setNavigationBarTitle({ title: TITLE_MAP[params.type] });
    getData(params.type, +params.id);
  });

  const data = useMemo(() => {
    if (type === "banner") {
      const item = bannerList[0];
      return {
        name: item?.bannerName,
        img: item?.bannerUrl,
        content: item?.publishingContent,
      };
    } else if (type === "product") {
      const item = productList[0];
      return {
        name: item?.productName,
        img: item?.productUrl,
        content: item?.productContent,
      };
    } else if (type === "activity") {
      const item = activityList[0];
      return {
        name: item?.activityName,
        img: item?.activityUrl,
        content: item?.activityContent,
      };
    } else if (type === "solution") {
      const item = solutionList[0];
      return {
        name: item?.solutionName,
        img: item?.solutionUrl,
        content: item?.solutionContent,
      };
    } else if (type === "doc") {
      const item = docList[0];
      return {
        name: item?.docName,
        img: item?.docUrl,
        content: item?.docContent,
      };
    }
    return null;
  }, [type, bannerList, productList, activityList, solutionList, docList]);

  const onPreviewImg = () => {
    if (!data?.img) {
      return;
    }
    Taro.previewImage({
      urls: [data.img],
      current: 0,
    });
  };

  useShareAppMessage((_payload) => {
    return {
      title: TITLE_MAP[type],
      path: `pages/detail/index?id=${id}&type=${type}`,
    };
  });

  const [refresherTriggered, setRefresherTriggered] = useState(false);

  const onRefresherRefresh = async () => {
    setRefresherTriggered(true);
    if (id) {
      await getData(type, id);
    }
    setRefresherTriggered(false);
  };

  const onActivityLink = (item: typeof activityList[0]) => {
    if (!item.activityLink) {
      return;
    }
    Taro.redirectTo({
      url: `/pages/webview/index?url=${item.activityLink}`,
    });
  };

  return (
    <View className='detail-page'>
      <ScrollView
        className='scroll-view'
        scrollY
        refresherEnabled
        enhanced
        refresherTriggered={refresherTriggered}
        onRefresherRefresh={onRefresherRefresh}
      >
        <View className='content'>
          {!!data?.img && (
            <View className='img-box'>
              <Image
                src={data.img}
                mode='widthFix'
                className='img'
                onTap={onPreviewImg}
              />
              {!!activityList?.[0]?.activityLink && (
                <View className='link'>
                  <View className='link-title'>优惠注册链接：</View>
                  <View className='link-content' onTap={() => onActivityLink(activityList[0])}>{activityList[0].activityLink}</View>
                </View>
              )}
            </View>
          )}
          <View className='name'>{data?.name}</View>
          {!!data?.content && <View className='content-box'><RichText text={data.content} /></View>}
        </View>
      </ScrollView>
      <ShareContact
        sendMessagePath={`/pages/detail/index.html?id=${id}&type=${type}`}
      />
    </View>
  );
};
export default ProductDetail;
