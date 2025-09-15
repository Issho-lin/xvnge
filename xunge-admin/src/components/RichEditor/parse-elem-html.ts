/*
 * @Author: linqibin
 * @Date: 2024-06-25 16:29:47
 * @LastEditors: linqibin
 * @LastEditTime: 2024-06-25 16:30:11
 * @Description:
 *
 * Copyright (c) 2024 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import type { SlateElement } from '@wangeditor/editor'

function parseCustomVideoElementHtml(
  domElem: Element,
  //   children: SlateDescendant[],
  //   editor: IDomEditor,
): SlateElement {
  const src = domElem.getAttribute('data-src') // 这些就是elem-html.ts自定义扩展存放的地方，可以根据需要自行扩展
  const height = domElem.getAttribute('data-height')
  const width = domElem.getAttribute('data-width')
  const customVideo = {
    // 这里的信息要和custom-types.ts一致
    type: 'custom-video',
    src,
    width,
    height,
    children: [{ text: '' }],
  }
  return customVideo
}
const parseCustomVideoHtmlConf = {
  selector: 'div[data-w-e-type="custom-video"]', // 这个就是elem-html.ts中第一个div里包含的信息
  parseElemHtml: parseCustomVideoElementHtml,
}

export { parseCustomVideoHtmlConf }
