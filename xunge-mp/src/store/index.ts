/*
 * @Author: linqibin
 * @Date: 2025-06-16 11:32:16
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-16 11:34:29
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
import Taro from '@tarojs/taro'
import type { StorageData } from './type'

const globalData: StorageData = {}

export default class Storage {
  static get<K extends keyof StorageData>(key: K): StorageData[K] | undefined {
    try {
      const value = Taro.getStorageSync(key)
      if (value) {
        return value as StorageData[K]
      }
      return globalData[key]
    } catch (e) {
      console.log(e)
      console.log('globalData------', globalData)
      return globalData[key]
    }
  }
  static set<K extends keyof StorageData>(key: K, value: StorageData[K]) {
    try {
      globalData[key] = value
      Taro.setStorageSync(key, value)
    } catch (e) {
      console.log(e)
      globalData[key] = value
    }
  }
  static remove<K extends keyof StorageData>(key: K) {
    try {
      delete globalData[key]
      Taro.removeStorageSync(key)
    } catch (e) {
      console.log(e)
      delete globalData[key]
    }
  }
}
