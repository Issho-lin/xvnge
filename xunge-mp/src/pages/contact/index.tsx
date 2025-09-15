/*
 * @Author: linqibin
 * @Date: 2025-05-30 16:48:58
 * @LastEditors: linqibin
 * @LastEditTime: 2025-05-30 17:16:31
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useTabBar } from '@/hooks/useTabBar'
import './index.scss'

export default function Contact() {

  useTabBar(2)

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <Text>Hello world!</Text>
    </View>
  )
}
