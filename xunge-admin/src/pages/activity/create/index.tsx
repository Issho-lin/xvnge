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
import { useEffect, useMemo, useRef, useState } from "react";
import useLocation from "@/hooks/useLocation";
import type { ReqPublishActivity, ResActivity } from "@/api/type";
import { useRequest } from "ahooks";
import {
  addActivityApi,
  publishActivityApi,
  updateActivityApi,
} from "@/api/activity";
import { useTabsStore } from "@/store/tabs";
import { useNavigate } from "react-router-dom";
import Upload from "@/components/Upload";

interface Fields {
  activityName: string;
  sort: number;
  activityTitle: string;
  publishType: number;
  activityLink: string;
  content: string;
  link: string;
  activityUrl: string;
}

const CreateActivity: React.FC = () => {
  const isPublish = useRef(false);
  const { query } = useLocation<{ type: string }>();

  const isView = useMemo(() => {
    return query.type === "view";
  }, [query.type]);

  const state: ResActivity = history.state.usr;

  const { runAsync: dispatch, loading } = useRequest(
    async (params: ReqPublishActivity) => {
      if (isPublish.current) {
        return await publishActivityApi(params);
      }
      if (params.id) {
        return await updateActivityApi({ ...params, id: params.id! });
      }
      return await addActivityApi(params);
    },
    { manual: true }
  );

  const [form] = Form.useForm();
  const content = Form.useWatch("content", form);
  const activityTitle = Form.useWatch("activityTitle", form);
  const activityUrl = Form.useWatch("activityUrl", form);
  const publishType = Form.useWatch("publishType", form);
  const activityLink = Form.useWatch("activityLink", form);

  useEffect(() => {
    if (state) {
      form.setFieldsValue({
        activityName: state.activityName,
        sort: state.sort,
        activityTitle: state.activityTitle,
        publishType: state.publishType,
        activityLink: state.activityLink,
        content: state.publishType === 1 ? state.activityContent : undefined,
        link: state.publishType === 2 ? state.activityContent : undefined,
        activityUrl: state.activityUrl,
      });
    }
  }, [form, state]);

  const [showPreview, setShowPreview] = useState(false);

  const onPreview = () => {
    console.log("preview", showPreview);
    setShowPreview(true);
  };

  const [msg, contextHolder] = message.useMessage();
  const closeCurrentTab = useTabsStore((state) => state.closeCurrentTab);

  const onFinish = async (values: Fields) => {
    const params = {
      id: state?.id,
      activityName: values.activityName,
      sort: values.sort,
      activityTitle: values.activityTitle,
      publishType: values.publishType,
      activityLink: values.activityLink,
      activityUrl: values.activityUrl,
      activityContent: values.publishType === 1 ? values.content : values.link,
    };
    const res = await dispatch(params);
    if (res.code === 200) {
      msg.success(isPublish.current ? "发布成功" : "保存成功", 1, () => {
        closeCurrentTab();
        navigate("/activity");
      });
    }
  };

  const navigate = useNavigate();

  const [modal, modalHolder] = Modal.useModal();

  const onPublish = () => {
    modal.confirm({
      title: "提示",
      content: "立即发布当前活动？",
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
        text={isView ? "查看产品" : state?.id ? "编辑产品" : "新增产品"}
      />
      <Form
        form={form}
        labelCol={{ span: 2 }}
        style={{ width: 1280 }}
        onFinish={onFinish}
        disabled={isView}
      >
        <Form.Item
          label="活动名称"
          name="activityName"
          rules={[{ required: true }]}
        >
          <Input style={{ width: 240 }} maxLength={20} showCount />
        </Form.Item>
        <Form.Item label="活动排序" name="sort">
          <InputNumber style={{ width: 240 }} />
        </Form.Item>
        <Form.Item
          label="活动封面"
          rules={[{ required: true }]}
          name="activityUrl"
          extra="支持扩展名：JPG、JPEG、PNG格式；大小不超过5M，推荐尺寸350*240px"
        >
          <Upload />
        </Form.Item>
        <Form.Item
          label="优惠标语"
          name="activityTitle"
          rules={[{ required: true }]}
        >
          <Input style={{ width: 240 }} maxLength={20} showCount />
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
            <RichEditor menuEvents={onPreview} />
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
        <Form.Item
          label="优惠注册链接"
          name="activityLink"
          rules={[{ required: true }]}
        >
          <Input.TextArea
            rows={4}
            maxLength={500}
            showCount
            style={{ width: 448 }}
          />
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
                navigate("/activity");
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
        <Preview content={content} title={activityTitle} imgUrl={activityUrl} activityLink={activityLink} />
      </Modal>
      {contextHolder}
      {modalHolder}
    </>
  );
};

export default CreateActivity;
