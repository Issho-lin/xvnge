/*
 * @Author: linqibin
 * @Date: 2025-06-05 17:54:22
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-20 14:05:20
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import PageTitle from "@/components/PageTitle";
import { Button, Form, Input, message, Modal, Space } from "antd";
import RichEditor from "@/components/RichEditor";
import Preview from "@/components/Preview";
import { useEffect, useMemo, useRef, useState } from "react";
import useLocation from "@/hooks/useLocation";
import type { ReqPublishDoc, ResDoc } from "@/api/type";
import { useRequest } from "ahooks";
import { addDocApi, publishDocApi, updateDocApi } from "@/api/document";
import { useTabsStore } from "@/store/tabs";
import { useNavigate } from "react-router-dom";
import Upload from "@/components/Upload";
interface Fields {
  docName: string;
  docContent: string;
  docUrl: string;
}

const CreateDocument: React.FC = () => {
  const isPublish = useRef(false);
  const { query } = useLocation<{ type: string }>();

  const isView = useMemo(() => {
    return query.type === "view";
  }, [query.type]);

  const state: ResDoc = history.state.usr;

  const { runAsync: dispatch, loading } = useRequest(
    async (params: ReqPublishDoc) => {
      if (isPublish.current) {
        return await publishDocApi(params);
      }
      if (params.id) {
        return await updateDocApi({ ...params, id: params.id! });
      }
      return await addDocApi(params);
    },
    { manual: true }
  );

  const [form] = Form.useForm();
  const docContent = Form.useWatch("docContent", form);
  const docUrl = Form.useWatch("docUrl", form);
  const docName = Form.useWatch("docName", form);

  useEffect(() => {
    if (state) {
      form.setFieldsValue({
        docName: state.docName,
        docContent: state.docContent,
        docUrl: state.docUrl,
      });
    }
  }, [form, state]);

  const [showPreview, setShowPreview] = useState(false);

  const onPreview = () => {
    setShowPreview(true);
  };

  const [msg, contextHolder] = message.useMessage();
  const closeCurrentTab = useTabsStore((state) => state.closeCurrentTab);

  const onFinish = async (values: Fields) => {
    const params = {
      id: state?.id,
      ...values,
    };
    const res = await dispatch(params);
    if (res.code === 200) {
      msg.success(isPublish.current ? "发布成功" : "保存成功");
      closeCurrentTab();
      navigate("/document");
    }
  };

  const navigate = useNavigate();

  const [modal, modalHolder] = Modal.useModal();

  const onPublish = () => {
    modal.confirm({
      title: "提示",
      content: "立即发布当前文档？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        isPublish.current = true;
        form.submit();
      },
    });
  };


  return (
    <>
      <PageTitle
        text={isView ? "查看文档" : state?.id ? "编辑文档" : "新增文档"}
      />
      <Form
        form={form}
        labelCol={{ span: 2 }}
        style={{ width: 1280 }}
        onFinish={onFinish}
        disabled={isView}
      >
        <Form.Item label="文档名称" name="docName" rules={[{ required: true }]}>
          <Input style={{ width: 240 }} maxLength={20} showCount />
        </Form.Item>
        <Form.Item
          label="文档封面"
          name="docUrl"
          extra="支持扩展名：JPG、JPEG、PNG格式；大小不超过5M，推荐尺寸220*120px"
        >
          <Upload />
        </Form.Item>
        <Form.Item
          label="文档内容"
          name="docContent"
          rules={[{ required: true }]}
        >
          <RichEditor menuEvents={onPreview} />
        </Form.Item>
        <Form.Item label={<span />} colon={false}>
          <Space size="large">
            {!isView && (
              <>
                <Button
                  color="primary"
                  variant="outlined"
                  loading={!isPublish.current && loading}
                  onClick={() => {
                    isPublish.current = false;
                    form.submit();
                  }}
                >
                  保存
                </Button>
                <Button
                  type="primary"
                  onClick={onPublish}
                  loading={isPublish.current && loading}
                >
                  发布
                </Button>
              </>
            )}
            <Button
              onClick={() => {
                closeCurrentTab();
                navigate("/document");
              }}
              disabled={false}
            >
              取消
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <Modal
        open={showPreview}
        centered
        width={400}
        onCancel={() => setShowPreview(false)}
        footer={null}
      >
        <Preview content={docContent} title={docName} imgUrl={docUrl} />
      </Modal>
      {contextHolder}
      {modalHolder}
    </>
  );
};

export default CreateDocument;
