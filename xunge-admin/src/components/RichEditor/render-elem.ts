/*
 * @Author: linqibin
 * @Date: 2024-06-25 16:19:51
 * @LastEditors: linqibin
 * @LastEditTime: 2024-06-25 17:32:43
 * @Description:
 *
 * Copyright (c) 2024 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import type { IDomEditor, SlateElement } from '@wangeditor/editor'
import { DomEditor } from '@wangeditor/editor'
import type { VNode } from 'snabbdom'
import { h } from 'snabbdom'
import type { CustomVideoElement } from './custom-types'

function renderCustomVideoElement(
  elemNode: SlateElement,
  _children: VNode[] | null,
  editor: IDomEditor,
): VNode {
  const { src = '', width = '100%', height = 'auto' } = elemNode as CustomVideoElement
  const selected = DomEditor.isNodeSelected(editor, elemNode)

  const videoVnode = h(
    'video', // html标签
    {
      props: {
        src: src,
        contentEditable: false,
        controls: true,
      },
      style: {
        width: width,
        height: height,
        'max-width': '100%',
      },
    },
  )
  const vnode = h(
    'div',
    {
      props: {
        className: 'w-e-textarea-video-container',
        'data-selected': selected ? 'true' : '',
      },
    },
    videoVnode,
  )
  const containerVnode = h(
    'div',
    {
      props: {
        contentEditable: false,
      },
      on: {
        mousedown: (e) => e.preventDefault(),
      },
    },
    vnode,
  )

  return containerVnode
}
const renderCustomVideoConf = {
  type: 'custom-video',
  renderElem: renderCustomVideoElement,
}

export { renderCustomVideoConf }
