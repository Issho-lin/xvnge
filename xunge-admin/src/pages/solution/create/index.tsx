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
import type { ReqPublishSolution, ResSolution } from "@/api/type";
import { useRequest } from "ahooks";
import {
  addSolutionApi,
  publishSolutionApi,
  updateSolutionApi,
} from "@/api/solution";
import { useTabsStore } from "@/store/tabs";
import { useNavigate } from "react-router-dom";
import Upload from "@/components/Upload";

interface Fields {
  solutionName: string;
  sort: number;
  solutionUrl: string;
  publishType: number;
  content: string;
  link: string;
}

const CreateSolution: React.FC = () => {
  const isPublish = useRef(false);
  const { query } = useLocation<{ type: string }>();

  const isView = useMemo(() => {
    return query.type === "view";
  }, [query.type]);

  const state: ResSolution = history.state.usr;

  const { runAsync: dispatch, loading } = useRequest(
    async (params: ReqPublishSolution) => {
      if (isPublish.current) {
        return await publishSolutionApi(params);
      }
      if (params.id) {
        return await updateSolutionApi({ ...params, id: params.id! });
      }
      return await addSolutionApi(params);
    },
    { manual: true }
  );

  const [form] = Form.useForm();
  const publishType = Form.useWatch("publishType", form);
  const content = Form.useWatch("content", form);

  useEffect(() => {
    if (state) {
      form.setFieldsValue({
        solutionName: state.solutionName,
        sort: state.sort,
        solutionUrl: state.solutionUrl,
        publishType: state.publishType,
        content: state.publishType === 1 ? state.solutionContent : undefined,
        link: state.publishType === 2 ? state.solutionContent : undefined,
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
      solutionName: values.solutionName,
      sort: values.sort,
      solutionUrl: values.solutionUrl,
      publishType: values.publishType,
      solutionContent: values.publishType === 1 ? values.content : values.link,
    };
    const res = await dispatch(params);
    if (res.code === 200) {
      msg.success(isPublish.current ? "发布成功" : "保存成功");
      closeCurrentTab();
      navigate("/solution");
    }
  };

  const navigate = useNavigate();

  const [modal, modalHolder] = Modal.useModal();

  const onPublish = () => {
    modal.confirm({
      title: "提示",
      content: "立即发布当前方案？",
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
        text={isView ? "查看方案" : state?.id ? "编辑方案" : "新增方案"}
      />
      <Form
        form={form}
        labelCol={{ span: 2 }}
        style={{ width: 1280 }}
        onFinish={onFinish}
        disabled={isView}
      >
        <Form.Item
          label="方案名称"
          name="solutionName"
          rules={[{ required: true }]}
        >
          <Input style={{ width: 240 }} maxLength={20} showCount />
        </Form.Item>
        <Form.Item label="方案排序" name="sort">
          <InputNumber style={{ width: 240 }} />
        </Form.Item>
        <Form.Item
          label="方案封面"
          rules={[{ required: true }]}
          name="solutionUrl"
          extra="支持扩展名：JPG、JPEG、PNG格式；大小不超过5M，推荐尺寸750*320px"
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
            label="方案内容"
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
                navigate("/solution");
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
        <Preview content={content} />
      </Modal>
      {contextHolder}
      {modalHolder}
    </>
  );
};

export default CreateSolution;
