/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: linqibin
 * @Date: 2024-06-21 09:30:19
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-19 18:17:42
 * @Description:
 *
 * Copyright (c) 2024 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import "./index.scss";
import React, { useEffect, useMemo, useState } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import {
  type IDomEditor,
  type IEditorConfig,
  type IToolbarConfig,
} from "@wangeditor/editor";
// import host from '@/api/host'
// import { uploadMediaUrl } from '@/api/facility/knowledgeBase/repo'
// import { getAuthorization } from '@/utils/tool'
import { registerCustomNode, registerMenu } from "./register";
import { message } from "antd";
import host from "@/service/host";
import { getAuthorization } from "@/utils/tools";
import { UPLOAD_URL, UPLOAD_VIDEO_URL } from "@/api/upload";
import { useImageHost } from "@/store/imageHost";

interface IP {
  value?: string;
  onChange?: (v: string) => void;
  height?: string;
  excludeKeys?: string[];
  readOnly?: boolean;
  menuEvents?: (key: string, editor: IDomEditor) => void;
}

const RichEditor: React.FC<IP> = ({
  value,
  onChange,
  height = "320px",
  excludeKeys = ["insertTable"],
  readOnly = false,
  menuEvents,
}) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  // const editor = useRef<IDomEditor | null>(null)
  const imageHost = useImageHost(state => state.imageHost)

  const toolbarConfig: Partial<IToolbarConfig> = useMemo(() => {
    return {
      excludeKeys: excludeKeys, // 排除插入图片、视频、音频和表格的选项
      insertKeys: {
        index: 999,
        keys: ["preview"],
      },
    };
  }, [excludeKeys]);

  const editorConfig: Partial<IEditorConfig> = useMemo(() => {
    return {
      placeholder: "",
      readOnly,
      autoFocus: false,
      MENU_CONF: {
        uploadImage: {
          server: host.env + UPLOAD_URL,
          headers: getAuthorization(),
          fieldName: 'file',
          maxFileSize: 5 * 1024 * 1024, // 5M
          customInsert(res: any, insertFn: (arg0: any, arg1: any, arg2: any) => void) {
            console.log(res)
            if (res.code === 200) {
              const rst = imageHost + res.data
              insertFn(rst, rst, rst)
            }
          },
          onFailed(file: File, res: any) {
            // TS 语法
            // onFailed(file, res) {           // JS 语法
            console.log(`${file.name} 上传失败`, res)
          },
          // 上传错误，或者触发 timeout 超时
          onError(file: File, err: any) {
            // TS 语法
            console.log(file.name, file.size)
            if (file.size > 5 * 1024 * 1024) {
              message.error(`${file.name} 上传出错：图片大小不能超过5M`)
              return
            }
            message.error(`${file.name} 上传出错：${err}`)
          },
        },
        uploadVideo: {
          server: host.env + UPLOAD_VIDEO_URL,
          headers: getAuthorization(),
          fieldName: 'file',
          maxFileSize: 20 * 1024 * 1024, // 20M
          customInsert(res: any, insertFn: (arg0: any) => void) {
            if (res.code === 200) {
              insertFn(imageHost + res.data)
              // const node = { type: 'custom-video', src: res.data, children: [{ text: '' }] }
              // editor.current?.insertNode(node)
            }
          },
          onFailed(file: File, res: any) {
            // TS 语法
            // onFailed(file, res) {           // JS 语法
            console.log(`${file.name} 上传失败`, res)
          },
          // 上传错误，或者触发 timeout 超时
          onError(file: File, err: any) {
            // TS 语法
            console.log(file.name, file.size)
            if (file.size > 5 * 1024 * 1024) {
              message.error(`${file.name} 上传出错：视频大小不能超过20M`)
              return
            }
            message.error(`${file.name} 上传出错：${err}`)
          },
        },
      },
    };
  }, [imageHost, readOnly]);

  useEffect(() => {
    return () => {
      if (editor === null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  useEffect(() => {
    if (editor) {
      editor.on('preview', () => {
        menuEvents?.('preview', editor)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor])

  return (
    <>
      <div className="rich-editor-container">
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          className="rich-editor-tool-bar"
        />
        <Editor
          defaultConfig={editorConfig}
          value={value}
          onCreated={(e) => {
            registerCustomNode();
            registerMenu(e);
            setEditor(e);
          }}
          onChange={(e) => {
            onChange?.(e.getHtml());
          }}
          mode="default"
          style={{ height, overflowY: "hidden" }}
        />
      </div>
    </>
  );
};

export default RichEditor;
