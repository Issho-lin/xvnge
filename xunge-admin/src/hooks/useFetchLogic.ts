import type { IResponse } from "@/service/request";
import { generateRecords } from "@/utils/tools";
import { useRequest } from "ahooks";
import { Form, message, Modal } from "antd";
import dayjs from "dayjs";
import { useReducer, useState } from "react";

interface Props<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetch: (params: any) => Promise<IResponse<{
        total: number;
        records: T[];
    }>>
    delete: (params: { id: number }) => Promise<IResponse<unknown>>
    unpublish: (params: { id: number }) => Promise<IResponse<unknown>>
    name: string
}

export default function useFetchLogic<T>(props: Props<T>) {
    const [page, setPage] = useState({ pageNum: 1, pageSize: 10 });
    const [queryForm] = Form.useForm();
  
    const [queryParams, getQueryParams] = useReducer(() => {
      const { queryDate, ...rest } = queryForm.getFieldsValue();
      return {
        ...rest,
        queryDate: queryDate ? dayjs(queryDate).format("YYYY-MM-DD") : undefined,
      };
    }, {});
  
    const { loading, data: { records = [], total = 0 } = {} } = useRequest(
      async () => {
        const res = await props.fetch({
          ...queryParams,
          ...page,
        });
        if (res.code !== 200) {
          return { records: [], total: 0 };
        }
        return generateRecords(res.data, page);
      },
      { manual: false, refreshDeps: [page, queryParams] }
    );
  
    const onSearch = () => {
      getQueryParams();
      setPage({ pageNum: 1, pageSize: 10 });
    };
  
    const onReset = () => {
      queryForm.resetFields();
      onSearch();
    };
  
    const [modal, modalHolder] = Modal.useModal()
    const [msg, messageHolder] = message.useMessage();
  
    const onUnPublish = async (id: number) => {
      modal.confirm({
        title: "提示",
        content: `确认下架当前${props.name}？`,
        onOk: async () => {
          const res = await props.unpublish({ id });
          if (res.code === 200) {
            msg.success("下架成功");
            onSearch()
          }
        }
      })
    }
  
    const onDelete = async (id: number) => {
      modal.confirm({
        title: "提示",
        content: `确认删除当前${props.name}？`,
        onOk: async () => {
          const res = await props.delete({ id });
          if (res.code === 200) {
            msg.success("删除成功");
            if (records.length === 1 && page.pageNum > 1) {
              setPage((pre) => ({...pre, pageNum: page.pageNum - 1 }))
            } else {
              onSearch()
            }
          }
        }
      })
    }

    return {
        loading,
        records,
        total,
        page,
        setPage,
        queryForm,
        onSearch,
        onReset,
        onUnPublish,
        onDelete,
        modalHolder,
        messageHolder
    }
}