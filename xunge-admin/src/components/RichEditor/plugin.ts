import type { IDomEditor } from '@wangeditor/editor'
import { DomEditor } from '@wangeditor/editor'
import type { CustomVideoElement } from './custom-types'
import { Transforms } from 'slate'

function withCustomVideo<T extends IDomEditor>(editor: T): T {
  const { isVoid, normalizeNode } = editor
  const newEditor = editor
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  newEditor.isVoid = (elem: CustomVideoElement) => {
    const { type } = elem

    if (type === 'custom-video') {
      return true
    }

    return isVoid(elem)
  }

  // 重写 normalizeNode
  newEditor.normalizeNode = ([node, path]) => {
    const type = DomEditor.getNodeType(node)
    if (type === 'custom-video') {
      const isLast = DomEditor.isLastNode(newEditor, node)
      if (isLast) {
        Transforms.insertNodes(newEditor, DomEditor.genEmptyParagraph(), { at: [path[0] + 1] })
      }
    }
    return normalizeNode([node, path])
  }

  return newEditor
}
export default withCustomVideo
