/*
 * @Author: linqibin
 * @Date: 2024-06-25 16:26:35
 * @LastEditors: linqibin
 * @LastEditTime: 2024-06-25 17:16:37
 * @Description:
 *
 * Copyright (c) 2024 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import type { SlateElement } from '@wangeditor/editor'
import type { CustomVideoElement } from './custom-types'

function customVideoElemtToHtml(elem: SlateElement): string {
  const { src, width = 300, height = 54 } = elem as CustomVideoElement
  // 通过data-w-e开头的data数据，存放一些必要的信息，到时候通过setHtml将富文本信息还原回编辑器的时候，才能使编辑器正常识别
  const html = `<div 
                    data-w-e-type="custom-video"
                    data-w-e-is-void
                    data-w-e-type="custom-video"
                    data-w-e-width="${width}"
                    data-w-e-height="${height}"
                    data-src="${src}"
                    data-width="${width}"
                    data-height="${height}"
                >
                    <video controls src="${src}" style="width: ${width};height:${height};max-width: 100%"/>
                </div>`
  return html
}

const customVideoToHtmlConf = {
  type: 'custom-video',
  elemToHtml: customVideoElemtToHtml,
}

export { customVideoToHtmlConf }
