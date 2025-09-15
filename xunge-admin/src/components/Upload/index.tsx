/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: linqibin
 * @Date: 2025-06-12 17:10:41
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-17 17:28:04
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import { PlusOutlined } from "@ant-design/icons";
import { Upload as AntUpload, message, Image, Space } from "antd";
import "./index.scss";
import { getAuthorization } from "@/utils/tools";
import host from "@/service/host";
import { UPLOAD_URL } from "@/api/upload";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { useEffect, useRef, useState } from "react";
import { useImageHost } from "@/store/imageHost";

interface UploadProps {
  mintype?: string[];
  maxSize?: number;
  compressor?: number;
  value?: string;
  onChange?: (value?: string) => void;
  desc?: React.ReactNode;
}

const Upload: React.FC<UploadProps> = ({
  mintype = [],
  maxSize = 5 * 1024 * 1024,
  onChange,
  value,
  desc
}) => {
  const [preview, setShowPreview] = useState(false);
  const [thumbUrl, setThumbUrl] = useState<string>();
  const [isValid, setIsValid] = useState(false);
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const isChange = useRef(false);

  const imageHost = useImageHost(state => state.imageHost)

  useEffect(() => {
    if (isChange.current) {
      return;
    }
    if (!value) {
      setFileList([]);
    } else {
      setFileList([
        {
          uid: value,
          name: value,
          status: "done",
          url: imageHost + value,
          thumbUrl: imageHost + value,
          response: { data: value, code: 200 },
        },
      ]);
    }
  }, [imageHost, value]);

  const beforeUpload = async (file: RcFile) => {
    console.log(file);
    const arr = file.name.split(".");
    const suffix = arr[arr.length - 1];
    const isValidType = mintype.length === 0 || mintype.includes(suffix);
    console.log(suffix, mintype);
    const isLt200M = file.size < maxSize;
    setIsValid(isValidType && isLt200M);
    if (!isValidType) {
      message.info("该文件格式不支持上传！");
      return false;
    }
    if (!isLt200M) {
      message.warning(`文件大小不能超过${maxSize / 1024 / 1024}MB!`);
      return false;
    }
    return Promise.resolve(file);
  };

  const hanleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (!isValid) {
      return;
    }
    const { status, response } = info.file;
    console.log(status, response);
    isChange.current = true;
    setFileList(info.fileList);
    if (status === "done") {
      if (response.code === 200) {
        onChange?.(response.data);
      } else {
        message.error(response.message);
      }
    } else if (status === "error") {
      message.error("上传失败");
    }
    setTimeout(() => {
      isChange.current = false;
    }, 500);
  };

  const onRemove = () => {
    onChange?.()
  }

  const onPreview = (file: UploadFile<any>) => {
    console.log(file);
    setThumbUrl(file.thumbUrl);
    setShowPreview(true);
  };
  
  return (
    <>
      <Space direction="vertical" style={{ marginBottom: 10 }}>
      <AntUpload
        listType="picture-card"
        className="list-card-uploader"
        multiple={false}
        maxCount={1}
        headers={getAuthorization() as any}
        action={host.env + UPLOAD_URL}
        beforeUpload={beforeUpload}
        onPreview={onPreview}
        onChange={hanleChange}
        onRemove={onRemove}
        fileList={fileList}
      >
        <PlusOutlined />
      </AntUpload>
      {!!desc && <div className="uploader-desc">{desc}</div>}
      </Space>
      <Image
        style={{ display: "none" }}
        src={thumbUrl}
        preview={{
          visible: preview,
          src: thumbUrl,
          onVisibleChange: () => {
            setShowPreview(false);
          },
        }}
      />
    </>
  );
};
export default Upload;
