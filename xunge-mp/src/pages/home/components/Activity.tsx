/*
 * @Author: linqibin
 * @Date: 2025-06-09 17:20:18
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-18 16:24:03
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import { View } from "@tarojs/components";
import { ResActivity } from "@/api/type";
import Taro from "@tarojs/taro";
import "./Activity.scss";

// const data = [
//   { id: 1, name: "活动1", img: "#bad5df" },
//   { id: 2, name: "活动2", img: "#c3d1bf" },
//   { id: 3, name: "活动3", img: "#d0c0a9" },
//   { id: 4, name: "活动4", img: "#bad5df" },
//   { id: 5, name: "活动5", img: "#c3d1bf" },
//   // { id: 6, name: "产品6", img: "#d0c0a9" },
//   // { id: 7, name: "产品7", img: "#bad5df" },
// ];

interface ActivityProps {
  data: ResActivity[];
}

const Activity: React.FC<ActivityProps> = ({ data }) => {
  const onLinkUrl = (item: (typeof data)[0]) => {
    console.log(item);
    if (item.publishType === 1) {
      console.log("内容---", item.activityContent);
      Taro.navigateTo({
        url: `/pages/detail/index?id=${item.id}&type=activity`,
      });
    } else {
      Taro.redirectTo({
        url: `/pages/webview/index?url=${item.activityContent}`,
      });
    }
  };
  return (
    <View className='activity'>
      <View className='activity-title'>特惠活动</View>
      <View className='activity-content'>
        {data.map((item) => {
          return (
            <View
              key={item.id}
              className='activity-content-item'
              style={{ backgroundImage: `url(${item.activityUrl})` }}
              onTap={() => onLinkUrl(item)}
            >
              <View className='activity-content-item-name'>
                {item.activityName}
              </View>
              <View className='activity-content-item-desc'>
                {item.activityTitle}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
export default Activity;
