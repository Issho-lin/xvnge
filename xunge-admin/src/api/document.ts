import HTTP from "@/service/http";
import type { ReqAddDoc, ReqDelDoc, ReqDoc, ReqPublishDoc, ReqUnpublishDoc, ReqUpdateDoc, ResDoc } from "./type";

export const getDocPagesApi = (params: ReqDoc) => {
  return HTTP.GET<{ total: number; records: ResDoc[] }>(
    "/operation/wechat/doc/queryDocPage",
    params
  );
};

export const addDocApi = (params: ReqAddDoc) => {
  return HTTP.POST("/operation/wechat/doc/addDoc", params);
};

export const updateDocApi = (params: ReqUpdateDoc) => {
  return HTTP.POST("/operation/wechat/doc/editDoc", params);
}

export const delDocApi = (params: ReqDelDoc) => {
  return HTTP.GET("/operation/wechat/doc/deleteDoc", params);
}

export const publishDocApi = (params: ReqPublishDoc) => {
  return HTTP.POST("/operation/wechat/doc/publishDoc", params);
}

export const unpublishDocApi = (params: ReqUnpublishDoc) => {
  return HTTP.GET("/operation/wechat/doc/removeDoc", params);
}