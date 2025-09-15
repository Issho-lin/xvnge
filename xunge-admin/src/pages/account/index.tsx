/*
 * @Author: linqibin
 * @Date: 2025-07-02 15:18:58
 * @LastEditors: linqibin
 * @LastEditTime: 2025-07-03 08:49:00
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import {
  activateAccountApi,
  addAccountApi,
  getAccountPagesApi,
  updateAccountApi,
} from "@/api/account";
import type { ResAccount } from "@/api/type";
import PageTitle from "@/components/PageTitle";
import Color from "@/utils/color";
import { EyeOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
  Button,
  Divider,
  Form,
  Image,
  Input,
  message,
  Modal,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { useMemo, useReducer, useState } from "react";
import "./index.scss";
import Upload from "@/components/Upload";
import { useImageHost } from "@/store/imageHost";

type Fields = {
  headPhoto: string;
  loginName: string;
  realName: string;
  mobile: string;
  remark: string;
};

const Account: React.FC = () => {
  const [page, setPage] = useState({ pageNum: 1, pageSize: 10 });
  const [queryForm] = Form.useForm();

  const [queryParams, getQueryParams] = useReducer(() => {
    return queryForm.getFieldsValue();
  }, {});

  const { loading, data: { records = [], total = 0 } = {} } = useRequest(
    async () => {
      const res = await getAccountPagesApi({
        ...queryParams,
        ...page,
      });
      if (res.code !== 200) {
        return { records: [], total: 0 };
      }
      return {
        records: res.data.data.map((item) => ({
          ...item,
          color: Color.Rgba(1),
        })),
        total: res.data.total,
      };
    },
    { manual: false, refreshDeps: [page, queryParams] }
  );

  const onSearch = () => {
    getQueryParams();
    setPage((pre) => ({ ...pre, pageNum: 1 }));
  };
  const onReset = () => {
    queryForm.resetFields();
    onSearch();
  };

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [userId, setUserId] = useState<number>();
  const imageHost = useImageHost(state => state.imageHost)

  const onAdd = () => {
    setUserId(undefined);
    form.resetFields();
    setVisible(true);
  };

  const { run: onFinish, loading: confirmLoading } = useRequest(
    async (values: Fields) => {
      if (userId) {
        const res = await updateAccountApi({
          userId,
          ...values,
        });
        if (res.code === 200) {
          msg.success("修改成功");
          setVisible(false);
          setPage((pre) => ({ ...pre }));
        }
      } else {
        const res = await addAccountApi(values);
        if (res.code === 200) {
          msg.success("添加成功");
          setVisible(false);
          setPage((pre) => ({ ...pre, pageNum: 1 }));
        }
      }
    },
    { manual: true }
  );

  const onEdit = (record: ResAccount) => {
    console.log(record);
    setUserId(record.userId);
    form.setFieldsValue({
      headPhoto: record.headPhoto?.replace(imageHost, ""),
      loginName: record.loginName,
      realName: record.realName,
      mobile: record.mobile,
      remark: record.remark,
    });
    setVisible(true);
  };

  const [modal, modalHolder] = Modal.useModal();
  const [msg, msgHolder] = message.useMessage();

  const onActivate = async (record: ResAccount) => {
    console.log(record);
    modal.confirm({
      title: "提示",
      content: `确认${record.status === 1 ? "禁" : "启"}用此账号？`,
      onOk: async () => {
        const res = await activateAccountApi({
          userId: record.userId,
          status: record.status === 1 ? 0 : 1,
        });
        if (res.code === 200) {
          msg.success("下架成功");
          onSearch();
        }
      },
    });
  };

  const columns = useMemo(() => {
    return [
      {
        key: "headPhoto",
        dataIndex: "headPhoto",
        title: "头像",
        width: 80,
        render: (url: string, record: ResAccount) => {
          return url ? (
            <Image
              src={url}
              preview={{
                mask: <EyeOutlined title="预览" />,
              }}
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                lineHeight: "48px",
                textAlign: "center",
                backgroundColor: record.color,
                color: "#fff",
                fontSize: 18,
              }}
            >
              {record.realName.slice(0, 1)}
            </div>
          );
        },
      },
      {
        key: "realName",
        dataIndex: "realName",
        title: "姓名",
      },
      {
        key: "loginName",
        dataIndex: "loginName",
        title: "用户账号",
      },
      {
        key: "mobile",
        dataIndex: "mobile",
        title: "手机号码",
      },
      {
        key: "creatorName",
        dataIndex: "creatorName",
        title: "创建人",
      },
      {
        key: "createTime",
        dataIndex: "createTime",
        title: "创建时间",
      },
      {
        key: "status",
        dataIndex: "status",
        title: "状态",
        render: (status: number) => {
          return (
            <Tag color={status === 1 ? "success" : "error"}>
              {status === 1 ? "已启用" : "已禁用"}
            </Tag>
          );
        },
      },
      {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        width: 140,
        fixed: "right" as FixedType,
        render: (_: string, record: (typeof records)[0]) => {
          return (
            <Space split={<Divider type="vertical" />}>
              <Typography.Link onClick={() => onEdit(record)}>
                编辑
              </Typography.Link>
              <Typography.Link onClick={() => onActivate(record)}>
                {record.status === 1 ? "禁用" : "启用"}
              </Typography.Link>
            </Space>
          );
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <PageTitle text="账号管理" />
      <Row justify="space-between" style={{ marginBottom: 10 }}>
        <Button color="primary" variant="outlined" onClick={onAdd}>
          新增账号
        </Button>
        <Row style={{ margin: "5px 0" }}>
          <Form layout="inline" form={queryForm}>
            <Form.Item name="searchKey">
              <Input
                placeholder="请输入账号、姓名、电话"
                style={{ width: 200 }}
              />
            </Form.Item>
          </Form>
          <Space>
            <Button type="primary" onClick={onSearch}>
              查询
            </Button>
            <Button onClick={onReset}>重置</Button>
          </Space>
        </Row>
      </Row>
      <Table
        columns={columns}
        dataSource={records}
        loading={loading}
        rowKey="userId"
        scroll={{ x: "max-content" }}
        pagination={{
          current: page.pageNum,
          pageSize: page.pageSize,
          total,
          onChange: (current) =>
            setPage((pre) => ({ ...pre, pageNum: current })),
        }}
      />
      <Modal
        title="新增账号"
        confirmLoading={confirmLoading}
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={() => form.submit()}
      >
        <Form
          style={{ padding: "20px 30px 10px" }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item name="headPhoto" label={<span />} colon={false}>
            <Upload />
          </Form.Item>
          <Form.Item label="账号" name="loginName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="姓名" name="realName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="手机号" name="mobile" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      {modalHolder}
      {msgHolder}
    </>
  );
};

export default Account;
