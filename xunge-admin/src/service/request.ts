import { message } from "antd";
import axios, { type AxiosRequestConfig } from "axios";
import host from "./host";
import type { MessageType } from "antd/es/message/interface";
// import { createBrowserHistory } from "history";
import { getAuthorization } from "@/utils/tools";


// const history = createBrowserHistory();

export type IResponse<T> = {
  code: number;
  data: T;
  message: string;
  apiId: string;
};

type ToastType = {
  type: "warning" | "error" | "success";
  content: string;
  onClose?: () => void;
  duration?: number;
};

let msg: MessageType | null = null;

const toast = ({ type, content, onClose, duration = 2 }: ToastType) => {
  if (!msg) {
    msg = message[type](content, duration, () => {
      msg = null;
      onClose?.();
    });
  }
};

const Axios = axios.create({
  baseURL: host.env,
  withCredentials: false,
});

Axios.interceptors.request.use((config) => {
  // console.log(config)
  if (!navigator.onLine) {
    toast({
      type: "error",
      content: "网络已断开，请检查网络",
    });
  }
  if (config.url === '/authcent/auth2/oauth/token') {
    return config
  }
  const authorization = getAuthorization()
  
  config.headers = new axios.AxiosHeaders({
    ...config.headers,
    ...authorization
  })
  return config;
});

Axios.interceptors.response.use(
  (response) => {
    const { data: res, config } = response;
    // console.log(res, config)
    if (config?.responseType === "blob" && response.headers) {
      const contentType = response.headers["content-type"];
      // console.log(contentType)
      if (!contentType?.startsWith("application/json")) {
        let fileName = "";
        const contentDisposition = response.headers["content-disposition"];
        if (contentDisposition) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches !== null && matches[1]) {
            fileName = decodeURIComponent(matches[1].replace(/['"]/g, ""));
          }
        }
        const fileSize = response.headers["file-size"];
        // console.log(res)
        return {
          data: new Blob([res]),
          fileName,
          fileSize,
        };
      } else {
        const reader = new FileReader();
        reader.readAsText(res);
        return new Promise((resolve) => {
          reader.onload = (e: ProgressEvent<FileReader>) => {
            const rst = JSON.parse(e.target?.result as string);
            message.info(rst.message);
            resolve(rst);
          };
        });
      }
    }
    // token失效
    if (res.code === 401 || res.code === 110) {
      toast({
        type: "warning",
        content: res.message,
        duration: 1,
        onClose: () => {
          location.href = '/login'
          // console.log('下线了...', history)
          // history.push("/login");
        },
      });
      return;
    }
    // 异常
    if (res.code && res.code !== 200 && res.message) {
      toast({
        type: "warning",
        content: res.message,
      });
    }
    // 操作成功
    // if (
    //   config.method?.toUpperCase() !== "GET" &&
    //   res.code === 200 &&
    //   res.message
    // ) {
    //   toast({
    //     type: "success",
    //     content: res.message,
    //   });
    // }
    if (typeof res.data === "object" && res.data !== null) {
      res.data.data = res.data.data ?? res.data.records ?? [];
    }
    return res;
  },
  (error) => {
    // console.log(error)
    // 响应错误处理
    const { data } = error.response ?? {};
    if (data?.message) {
      toast({
        type: "warning",
        content: data.message,
        duration: 1,
        onClose: () => {
          if (data.code === 401) {
            location.href = '/login'
            // history.push("/login");
          }
        },
      });
    } else {
      toast({
        type: "warning",
        content: error.message,
      });
    }
    return Promise.reject(error);
  }
);

export let cancelRequest = (cancelMsg: string) => {
  // 取消请求
  console.log(cancelMsg);
};
export async function request<T>(config: AxiosRequestConfig<unknown>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res: any = await Axios.request({
    ...config,
    cancelToken: new axios.CancelToken(function executor(c) {
      cancelRequest = c;
    }),
  });
  return {
    ...res,
    apiId: config.url,
  } as Promise<IResponse<T>>;
}
