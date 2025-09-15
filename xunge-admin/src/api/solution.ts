/*
 * @Author: linqibin
 * @Date: 2025-06-17 14:58:05
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-17 15:01:02
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
import HTTP from "@/service/http";
import type { ReqAddSolution, ReqDelSolution, ReqPublishSolution, ReqSolution, ReqUnpublishSolution, ReqUpdateSolution, ResSolution } from "./type";

export const getSolutionPagesApi = (params: ReqSolution) => {
  return HTTP.GET<{ total: number; records: ResSolution[] }>(
    "/operation/wechat/solution/querySolutionPage",
    params
  );
};

export const addSolutionApi = (params: ReqAddSolution) => {
  return HTTP.POST("/operation/wechat/solution/addSolution", params);
};

export const updateSolutionApi = (params: ReqUpdateSolution) => {
  return HTTP.POST("/operation/wechat/solution/editSolution", params);
}

export const delSolutionApi = (params: ReqDelSolution) => {
  return HTTP.GET("/operation/wechat/solution/deleteSolution", params);
}

export const publishSolutionApi = (params: ReqPublishSolution) => {
  return HTTP.POST("/operation/wechat/solution/publishSolution", params);
}

export const unpublishSolutionApi = (params: ReqUnpublishSolution) => {
  return HTTP.GET("/operation/wechat/solution/removeSolution", params);
}