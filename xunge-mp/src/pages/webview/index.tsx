/*
 * @Author: linqibin
 * @Date: 2025-06-18 14:35:12
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-25 18:00:13
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import {
  Image,
  View,
  WebView,
} from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import "./index.scss";

const TransferH5: React.FC = () => {
  const [url, setUrl] = useState<string>();
  const [isError, setIsError] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>();

  useLoad((params) => {
    console.log(params);
    setUrl(params.url);
  });
  useEffect(() => {
    Taro.showLoading({ title: "加载中..." });
    return () => {
      Taro.hideLoading();
    };
  }, []);

  useEffect(() => {
    // 10秒后加载失败
    timer.current = setTimeout(() => {
      setIsError(true);
      Taro.hideLoading();
      timer.current = null;
    }, 10 * 1000);
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, []);

  if (!url) {
    return null;
  }
  if (isError) {
    return (
      <View className='webview-error'>
        <Image
          className='webview-error-image'
          src={require("@/assets/images/error.png")}
        />
        <View className='webview-error-desc'>访问异常，请稍后重试</View>
      </View>
    );
  }
  return (
    <WebView
      src={url}
      onError={() => {
        if (timer.current) {
          clearTimeout(timer.current)
          timer.current = null
        }
        setIsError(true)
        Taro.hideLoading()
      }}
      onLoad={() => {
        if (timer.current) {
          clearTimeout(timer.current);
          timer.current = null;
        }
        Taro.hideLoading();
      }}
    ></WebView>
  );
};
export default TransferH5;
