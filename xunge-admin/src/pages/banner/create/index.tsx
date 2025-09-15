import PageTitle from "@/components/PageTitle";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Space,
} from "antd";
import RichEditor from "@/components/RichEditor";
import Preview from "@/components/Preview";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Upload from "@/components/Upload";
import { useRequest } from "ahooks";
import type { ReqPublishBanner, ResBanner } from "@/api/type";
import { addBannerApi, publishBannerApi, updateBannerApi } from "@/api/banner";
import useLocation from "@/hooks/useLocation";
import { useNavigate } from "react-router-dom";
import { useTabsStore } from "@/store/tabs";

interface Fields {
  bannerName: string;
  sort: number;
  bannerUrl: string;
  publishType: number;
  content: string;
  link: string;
}

const CreateBanner: React.FC = () => {
  const isPublish = useRef(false);
  const { query } = useLocation<{ type: string }>();

  const isView = useMemo(() => {
    return query.type === "view";
  }, [query.type]);

  const state: ResBanner = history.state.usr;

  const { runAsync: dispatch, loading } = useRequest(
    async (params: ReqPublishBanner) => {
      if (isPublish.current) {
        return await publishBannerApi(params);
      }
      if (params.id) {
        return await updateBannerApi({ ...params, id: params.id! });
      }
      return await addBannerApi(params);
    },
    { manual: true }
  );

  const [form] = Form.useForm();
  const publishType = Form.useWatch("publishType", form);
  const content = Form.useWatch("content", form);
  const bannerName = Form.useWatch("bannerName", form);
  const bannerUrl = Form.useWatch("bannerUrl", form);

  useEffect(() => {
    if (state) {
      form.setFieldsValue({
        bannerName: state.bannerName,
        sort: state.sort,
        bannerUrl: state.bannerUrl,
        publishType: state.publishType,
        content: state.publishType === 1 ? state.publishingContent : undefined,
        link: state.publishType === 2 ? state.publishingContent : undefined,
      });
    }
  }, [form, state]);

  const [showPreview, setShowPreview] = useState(false);

  const onPreview = useCallback(() => {
    console.log("onPreview", showPreview);
    setShowPreview((pre) => {
      console.log("setShowPreview", pre);
      return true;
    });
  }, [showPreview]);

  useEffect(() => {
    console.log("preview", showPreview);
  }, [showPreview]);

  const [msg, contextHolder] = message.useMessage();
  const closeCurrentTab = useTabsStore((state) => state.closeCurrentTab);

  const onFinish = async (values: Fields) => {
    const params = {
      id: state?.id,
      bannerName: values.bannerName,
      sort: values.sort,
      bannerUrl: values.bannerUrl,
      publishType: values.publishType,
      publishingContent:
        values.publishType === 1 ? values.content : values.link,
    };
    const res = await dispatch(params);
    if (res.code === 200) {
      msg.success(isPublish.current ? "发布成功" : "保存成功");
      closeCurrentTab();
      navigate("/banner");
    }
  };

  const navigate = useNavigate();

  const [modal, modalHolder] = Modal.useModal();

  const onPublish = () => {
    modal.confirm({
      title: "提示",
      content: "立即发布当前banner？",
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
        text={isView ? "查看banner" : state?.id ? "编辑banner" : "新增banner"}
      />
      <Form
        form={form}
        labelCol={{ span: 2 }}
        style={{ width: 1280 }}
        onFinish={onFinish}
        disabled={isView}
      >
        <Form.Item
          label="banner标题"
          name="bannerName"
          rules={[{ required: true }]}
        >
          <Input style={{ width: 240 }} maxLength={20} showCount />
        </Form.Item>
        <Form.Item label="banner排序" name="sort">
          <InputNumber style={{ width: 240 }} />
        </Form.Item>
        <Form.Item
          label="banner封面"
          rules={[{ required: true }]}
          name="bannerUrl"
          extra="支持扩展名：JPG、JPEG、PNG格式；大小不超过5M，推荐尺寸,750*320px"
        >
          <Upload />
        </Form.Item>
        <Form.Item
          label="发布类型"
          name="publishType"
          initialValue={1}
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value={1}>文本内容</Radio>
            <Radio value={2}>网址</Radio>
          </Radio.Group>
        </Form.Item>
        {publishType === 1 ? (
          <Form.Item
            label="发布内容"
            name="content"
            rules={[{ required: true }]}
          >
            <RichEditor menuEvents={onPreview} readOnly={isView} />
          </Form.Item>
        ) : (
          <Form.Item label="网址链接" name="link" rules={[{ required: true }]}>
            <Input.TextArea
              rows={4}
              maxLength={500}
              showCount
              style={{ width: 448 }}
            />
          </Form.Item>
        )}
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
                navigate("/banner");
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
        <Preview content={content} title={bannerName} imgUrl={bannerUrl} />
      </Modal>
      {contextHolder}
      {modalHolder}
    </>
  );
};

export default CreateBanner;
