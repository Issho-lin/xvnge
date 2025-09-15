import PageTitle from "@/components/PageTitle";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Select,
  Space,
} from "antd";
import RichEditor from "@/components/RichEditor";
import Preview from "@/components/Preview";
import { useEffect, useMemo, useRef, useState } from "react";
import useLocation from "@/hooks/useLocation";
import type { ReqPublishProduct, ResProduct } from "@/api/type";
import { useRequest } from "ahooks";
import {
  addProductApi,
  publishProductApi,
  updateProductApi,
} from "@/api/product";
import { useTabsStore } from "@/store/tabs";
import { useNavigate } from "react-router-dom";
import { PRODUCT_TYPE_LIST } from "@/constants";
import Upload from "@/components/Upload";

interface Fields {
  productName: string;
  productType: number;
  sort: number;
  popular: boolean;
  productUrl: string;
  productContent: string;
  hotBigUrl: string;
  hotSmallUrl: string;
}

const CreateProduct: React.FC = () => {
  const isPublish = useRef(false);
  const { query } = useLocation<{ type: string }>();

  const isView = useMemo(() => {
    return query.type === "view";
  }, [query.type]);

  const state: ResProduct = history.state.usr;

  const { runAsync: dispatch, loading } = useRequest(
    async (params: ReqPublishProduct) => {
      if (isPublish.current) {
        return await publishProductApi(params);
      }
      if (params.id) {
        return await updateProductApi({ ...params, id: params.id! });
      }
      return await addProductApi(params);
    },
    { manual: true }
  );

  const [form] = Form.useForm();
  const content = Form.useWatch("productContent", form);
  const productUrl = Form.useWatch("productUrl", form);
  const productName = Form.useWatch("productName", form);
  const popular = Form.useWatch("popular", form);

  useEffect(() => {
    if (state) {
      form.setFieldsValue({
        productName: state.productName,
        productType: +state.productType,
        sort: state.sort,
        popular: state.popular,
        productUrl: state.productUrl,
        productContent: state.productContent,
        hotBigUrl: state.hotBigUrl,
        hotSmallUrl: state.hotSmallUrl,
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
      ...values,
    };
    const res = await dispatch(params);
    if (res.code === 200) {
      msg.success(isPublish.current ? "发布成功" : "保存成功", 1, () => {
        closeCurrentTab();
        navigate("/product");
      });
    }
  };

  const navigate = useNavigate();

  const [modal, modalHolder] = Modal.useModal();

  const onPublish = () => {
    modal.confirm({
      title: "提示",
      content: "立即发布当前产品？",
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
          label="产品名称"
          name="productName"
          rules={[{ required: true }]}
        >
          <Input style={{ width: 240 }} maxLength={20} showCount />
        </Form.Item>
        <Form.Item
          label="产品类别"
          name="productType"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="请选择"
            options={PRODUCT_TYPE_LIST}
            style={{ width: 240 }}
          />
        </Form.Item>
        <Form.Item label="产品排序" name="sort">
          <InputNumber style={{ width: 240 }} />
        </Form.Item>
        <Form.Item
          label="热门产品"
          name="popular"
          initialValue={false}
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="产品封面"
          required
          // name="productUrl"
          // rules={[{ required: true }]}
          extra={`支持扩展名：JPG、JPEG、PNG格式；大小不超过5M；列表主图推荐尺寸：490*160px；
            ${
              popular
                ? "热门第一版位推荐尺寸：360*450px；热门第二、三版位推荐尺寸：330*220px"
                : ""
            }`}
        >
          {/* <Upload /> */}
          <Space size="large">
            <Form.Item
              name="productUrl"
              noStyle
              rules={[{ required: true, message: "请上传列表主图" }]}
            >
              <Upload desc="列表主图" />
            </Form.Item>
            {popular && (
              <>
                <Form.Item
                  name="hotBigUrl"
                  noStyle
                  rules={[
                    { required: true, message: "请上传热门第一版位封面" },
                  ]}
                >
                  <Upload desc="热门第一版位封面" />
                </Form.Item>
                <Form.Item
                  name="hotSmallUrl"
                  noStyle
                  rules={[
                    { required: true, message: "请上传热门第二、三版位封面" },
                  ]}
                >
                  <Upload desc="热门第二、三版位封面" />
                </Form.Item>
              </>
            )}
          </Space>
        </Form.Item>
        <Form.Item
          label="产品详情"
          name="productContent"
          rules={[{ required: true }]}
        >
          <RichEditor menuEvents={onPreview} readOnly={isView} />
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
                navigate("/product");
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
        <Preview content={content} title={productName} imgUrl={productUrl} />
      </Modal>
      {contextHolder}
      {modalHolder}
    </>
  );
};

export default CreateProduct;
