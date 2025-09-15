/*
 * @Author: linqibin
 * @Date: 2025-06-03 14:13:45
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-03 14:15:02
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
import Taro from '@tarojs/taro'
import { useMemo } from 'react'
import './index.scss'

const RichText: React.FC<{ text: string }> = ({ text }) => {
  const onTapLink = (e: any) => {
    Taro.navigateTo({ url: e.detail.href })
  }
  const html = useMemo(() => {
    return text
      .replace(/\n<video/g, '<video')
      .replace(/<\/video>\n/g, '</video>')
  }, [text])
  // @ts-ignore
  return <wxparser rich-text={html} onTapLink={onTapLink} bindtapLink />
}
export default RichText
