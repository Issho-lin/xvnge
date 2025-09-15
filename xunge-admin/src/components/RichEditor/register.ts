/*
 * @Author: linqibin
 * @Date: 2024-06-25 16:36:26
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-17 10:50:53
 * @Description:
 *
 * Copyright (c) 2024 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import type { IDomEditor } from '@wangeditor/editor'
import { Boot } from '@wangeditor/editor'
import { renderCustomVideoConf } from './render-elem'
import { customVideoToHtmlConf } from './elem-html'
import { parseCustomVideoHtmlConf } from './parse-elem-html'
import withCustomVideo from './plugin'
import PreviewButton from './PreviewButton'

export function registerCustomNode() {
  Boot.registerRenderElem(renderCustomVideoConf)
  Boot.registerElemToHtml(customVideoToHtmlConf)
  Boot.registerParseElemHtml(parseCustomVideoHtmlConf)
  Boot.registerPlugin(withCustomVideo)
}

export function registerMenu(editor: IDomEditor) {
  const allRegisterMenu = editor.getAllMenuKeys() // 获取所有已注册的菜单
  if (allRegisterMenu.includes('preview')) {
    console.log(allRegisterMenu)
    // 已注册过 preview 菜单
    const previewMenu = editor.getMenuConfig('uploadImage')
    console.log(previewMenu)
    // previewMenu.menuEvents = menuEvents
    // previewMenu.menuEvents = menuEvents
    // previewMenu.editor = editor
    return
  }
  Boot.registerMenu({ key: 'preview', factory: () => new PreviewButton()   })
}
