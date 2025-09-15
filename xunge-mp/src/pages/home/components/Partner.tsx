/*
 * @Author: linqibin
 * @Date: 2025-06-09 17:38:22
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-26 15:19:59
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import { View, Image } from "@tarojs/components";
import "./Partner.scss";

const Partner: React.FC = () => {
  return (
    <View className='partner'>
      <Image
        className='partner-title'
        mode='aspectFill'
        src={require("@/assets/images/partner/1.png")}
      />
      <View className='partner-content'>
        <Image
          className='partner-content-img'
          mode='aspectFit'
          src={require("@/assets/images/partner/huawei.png")}
        />
        <Image
          className='partner-content-img'
          mode='aspectFit'
          src={require("@/assets/images/partner/fusion.jpg")}
        />
        <Image
          className='partner-content-img'
          mode='aspectFit'
          src={require("@/assets/images/partner/dianxin.png")}
        />
        <Image
          className='partner-content-img'
          mode='aspectFit'
          src={require("@/assets/images/partner/yidong.png")}
        />
      </View>
    </View>
  );
};
export default Partner;
