/*
 * @Author: linqibin
 * @Date: 2025-05-29 17:52:35
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-16 09:57:21
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import {
  delProductApi,
  getProductPagesApi,
  unpublishProductApi,
} from "@/api/product";
import type { ResProduct } from "@/api/type";
import AddButton from "@/components/AddButton";
import EditButton from "@/components/EditButton";
import PageTitle from "@/components/PageTitle";
import {
  PRODUCT_TYPE,
  PRODUCT_TYPE_LIST,
  PUBLISH_STATUS,
  PUBLISH_STATUS_COLOR,
  PUBLISH_STATUS_LIST,
} from "@/constants";
import useFetchLogic from "@/hooks/useFetchLogic";
import { StarFilled } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";

const EnterpriseProduct: React.FC = () => {
  const {
    records,
    loading,
    total,
    onUnPublish,
    onDelete,
    page,
    setPage,
    onSearch,
    onReset,
    messageHolder,
    modalHolder,
    queryForm,
  } = useFetchLogic<ResProduct>({
    name: "产品",
    fetch: getProductPagesApi,
    delete: delProductApi,
    unpublish: unpublishProductApi,
  });

  const columns = useMemo(() => {
    return [
      {
        title: "序号",
        dataIndex: "index",
        key: "index",
      },
      {
        title: "产品名称",
        dataIndex: "productName",
        key: "productName",
      },
      {
        title: "产品类别",
        dataIndex: "productType",
        key: "productType",
        render: (v: number) => {
          return PRODUCT_TYPE.get(v) ?? "--";
        },
      },
      {
        title: "热门",
        dataIndex: "popular",
        key: "popular",
        render: (v: number) => {
          return (
            <StarFilled
              style={{ fontSize: 16, color: v ? "#f6d814" : "#f0f0f0" }}
            />
          );
        },
      },
      {
        title: "排序",
        dataIndex: "sort",
        key: "sort",
      },
      {
        title: "创建人",
        dataIndex: "creator",
        key: "creator",
      },
      {
        title: "创建时间",
        dataIndex: "creatTime",
        key: "creatTime",
        render: (v: string) => {
          return dayjs(v).format("YYYY-MM-DD HH:mm:ss");
        },
      },
      {
        title: "发布时间",
        dataIndex: "publishTime",
        key: "publishTime",
        render: (v: string) => {
          return v ? dayjs(v).format("YYYY-MM-DD HH:mm:ss") : "--";
        },
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        render: (v: number) => {
          return (
            <Tag color={PUBLISH_STATUS_COLOR.get(v)}>
              {PUBLISH_STATUS.get(v)}
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
              {record.status === 2 ? (
                <>
                  <EditButton
                    record={record}
                    url="/product/view?type=view"
                    label="查看banner"
                  >
                    查看
                  </EditButton>
                  <Typography.Link onClick={() => onUnPublish(record.id)}>
                    下架
                  </Typography.Link>
                </>
              ) : (
                <>
                  <EditButton
                    record={record}
                    url="/product/edit"
                    label="编辑banner"
                  >
                    编辑
                  </EditButton>
                  <Typography.Link onClick={() => onDelete(record.id)}>
                    删除
                  </Typography.Link>
                </>
              )}
            </Space>
          );
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageTitle text="企业产品" />
      <Row justify="space-between" style={{ marginBottom: 10 }}>
        <AddButton url="/product/create" label="新增产品" />
        <Row style={{ margin: "5px 0" }}>
          <Form layout="inline" form={queryForm}>
            <Form.Item name="productName">
              <Input placeholder="产品名称" style={{ width: 200 }} />
            </Form.Item>
            <Form.Item name="queryDate">
              <DatePicker
                placeholder="发布时间"
                showMinute
                style={{ width: 200 }}
              />
            </Form.Item>
            <Form.Item name="productType">
              <Select
                placeholder="产品类别"
                options={PRODUCT_TYPE_LIST}
                style={{ width: 200 }}
              />
            </Form.Item>
            <Form.Item name="status">
              <Select
                placeholder="状态"
                options={PUBLISH_STATUS_LIST}
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
        rowKey="id"
        scroll={{ x: "max-content" }}
        pagination={{
          current: page.pageNum,
          pageSize: page.pageSize,
          total,
          onChange: (current) =>
            setPage((pre) => ({ ...pre, pageNum: current })),
        }}
      />
      {modalHolder}
      {messageHolder}
    </>
  );
};
export default EnterpriseProduct;
