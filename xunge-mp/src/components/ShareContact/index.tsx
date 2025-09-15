/*
 * @Author: linqibin
 * @Date: 2025-06-03 14:10:59
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-20 10:56:57
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import { Button, View, Image, Text } from "@tarojs/components";
import "./index.scss";

const ShareContact: React.FC<{
  sendMessagePath?: string;
  sendMessageTitle?: string;
  sendMessageImg?: string;
}> = ({ sendMessagePath, sendMessageTitle, sendMessageImg }) => {
  return (
    <View className='button-group'>
      <Button openType='share' className='share-button'>
        <Image
          src={require("@/assets/images/icon/share.png")}
          className='button-icon'
        />
        <Text>分享</Text>
      </Button>
      <Button
        openType='contact'
        className='contact-button'
        showMessageCard
        sendMessageTitle={sendMessageTitle}
        sendMessagePath={sendMessagePath}
        sendMessageImg={sendMessageImg}
      >
        <Image
          src={require("@/assets/images/icon/contact.png")}
          className='button-icon'
        />
        <Text>咨询</Text>
      </Button>
    </View>
  );
};
export default ShareContact;
