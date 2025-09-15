/*
 * @Author: linqibin
 * @Date: 2024-09-20 14:26:28
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-10 08:53:14
 * @Description:
 *
 * Copyright (c) 2024 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */

export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/product/index',
    'pages/contact/index',
    'pages/document/index',
    'pages/detail/index',
    'pages/search/index',
    'pages/webview/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    custom: true,
    color: '#333333',
    selectedColor: '#333333',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: './assets/images/tab/home.png',
        selectedIconPath: './assets/images/tab/home_light.png',
      },
      {
        pagePath: 'pages/product/index',
        text: '产品',
        iconPath: './assets/images/tab/product.png',
        selectedIconPath: './assets/images/tab/product_light.png',
      },
      {
        pagePath: 'pages/contact/index',
        text: '咨询',
        iconPath: './assets/images/tab/contact.png',
        selectedIconPath: './assets/images/tab/contact_light.png',
      },
      {
        pagePath: 'pages/document/index',
        text: '方案/资讯',
        iconPath: './assets/images/tab/document.png',
        selectedIconPath: './assets/images/tab/document_light.png',
      },
    ]
  },
  plugins: {
    wxparserPlugin: {
      version: '0.4.0',
      provider: 'wx9d4d4ffa781ff3ac',
    },
  },
  lazyCodeLoading: 'requiredComponents',
  __usePrivacyCheck__: true,
})
