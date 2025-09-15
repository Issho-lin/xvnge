/*
 * @Author: linqibin
 * @Date: 2025-05-29 17:51:30
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-19 17:03:26
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import {
  delBannerApi,
  getBannerPagesApi,
  unPublishBannerApi,
} from "@/api/banner";
import AddButton from "@/components/AddButton";
import EditButton from "@/components/EditButton";
import PageTitle from "@/components/PageTitle";
import {
  PUBLISH_STATUS,
  PUBLISH_STATUS_COLOR,
  PUBLISH_STATUS_LIST,
} from "@/constants";
import useFetchLogic from "@/hooks/useFetchLogic";
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

const HomeBanner: React.FC = () => {
  const {
    records,
    loading,
    total,
    page,
    setPage,
    queryForm,
    onSearch,
    onReset,
    modalHolder,
    messageHolder,
    onDelete,
    onUnPublish,
  } = useFetchLogic({
    name: "banner",
    fetch: getBannerPagesApi,
    delete: delBannerApi,
    unpublish: unPublishBannerApi,
  });

  const columns = useMemo(() => {
    return [
      {
        title: "序号",
        dataIndex: "index",
        key: "index",
      },
      {
        title: "banner名称",
        dataIndex: "bannerName",
        key: "bannerName",
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
        dataIndex: "createTime",
        key: "createTime",
        render: (v: string) => {
          return v ? dayjs(v).format("YYYY-MM-DD HH:mm:ss") : "--";
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
                    url="/banner/view?type=view"
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
                    url="/banner/edit"
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
      <PageTitle text="首页Banner" />
      <Row justify="space-between" style={{ marginBottom: 10 }}>
        <AddButton url="/banner/create" label="新增banner" />
        <Row style={{ margin: "5px 0" }}>
          <Form layout="inline" form={queryForm}>
            <Form.Item name="bannerName">
              <Input placeholder="banner名称" style={{ width: 200 }} />
            </Form.Item>
            <Form.Item name="queryDate">
              <DatePicker
                placeholder="发布时间"
                showMinute
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
export default HomeBanner;
