/*
 * @Author: linqibin
 * @Date: 2025-05-30 16:45:40
 * @LastEditors: linqibin
 * @LastEditTime: 2025-05-30 17:24:36
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import React from "react";
import Taro from "@tarojs/taro";
import { Button, Image, View } from "@tarojs/components";
import { list, color, selectedColor } from "./const";
import "./index.scss";

class CustomBar extends React.Component {
  state = {
    selected: 0,
  };

  switchTab = (url) => {
    Taro.switchTab({ url: `/${url}` });
  };

  render() {
    const { selected } = this.state;

    return (
      <View className='tab-bar'>
        {list.map((item, index) => {
          const content = (
            <>
              <Image
                src={
                  selected === index
                    ? `.${item.selectedIconPath}`
                    : `.${item.iconPath}`
                }
                mode='aspectFit'
                className='tab-bar-item-icon'
              />
              <View
                className='tab-bar-item-text'
                style={{ color: selected === index ? selectedColor : color }}
              >
                {item.text}
              </View>
            </>
          );
          if (index === 2) {
            return (
              <Button
                key={item.pagePath}
                openType='contact'
                className='tab-bar-item'
              >
                {content}
              </Button>
            )
          }
          return (
            <View
              key={item.pagePath}
              className='tab-bar-item'
              onClick={() => {
                this.switchTab(item.pagePath);
              }}
            >
              {content}
            </View>
          );
        })}
      </View>
    );
  }
}

export default CustomBar;
