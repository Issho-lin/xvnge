/*
 * @Author: linqibin
 * @Date: 2025-06-13 14:03:56
 * @LastEditors: linqibin
 * @LastEditTime: 2025-07-02 17:02:35
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
export type ReqLogin = {
  grant_type: "app_password";
  username: string;
  access: string;
};

export type ResLogin = {
  access_token: string;
  token_type: string;
  expires_in: number;
  userType: number;
  userId: number;
  code: number;
  message: string;
};

export type ResUserInfo = {
  userId: number;
  imagePath: string;
  headPhoto: string;
  lastLoginTime: string;
  loginName: string;
  mobile: string;
  realName: string;
  userId: number;
};

export type ReqUpdateUserInfo = {
    realName?: string
    headPhoto?: string
  }

export type ReqUpdatePass = {
  oldPass: string;
  newPass: string;
  confirmPass: string;
};

export type Page = {
  pageNum: number;
  pageSize: number;
};

export type ReqBanner = Page & {
  bannerName?: string;
  queryDate?: string;
  /** 1 待发布 2 已发布 3 已下架 */
  status?: number;
};

export type ResBanner = {
  id: number;
  bannerName: string;
  sort: number;
  bannerUrl: string;
  /** 发布类型：1 文本内容  2 网址 */
  publishType: number;
  publishingContent: string;
  creator: string;
  createTime: string;
  publishTime: string;
  status: number;
};

export type ReqAddBanner = {
  bannerName: string;
  sort: number;
  bannerUrl: string;
  publishType: number;
  publishingContent: string;
};

export type ReqUpdateBanner = ReqAddBanner & {
  id: number;
};

export type ReqDelBanner = {
  id: number;
};

export type ReqPublishBanner = ReqAddBanner & {
  id?: number;
};

export type ReqUnpublishBanner = {
  id: number;
};

export type ReqProduct = Page & {
  productName?: string;
  /** 产品类型：1 云服务、2 GPU算力、3 AI算法、4 服务器/存储、5 海外IDC */
  productType?: number;
  queryDate?: string;
  status?: number;
};

export type ResProduct = {
  id: number;
  productName: string;
  productType: number;
  sort: number;
  popular: boolean;
  productUrl: string;
  productContent: string;
  creator: string;
  createTime: number;
  publishTime: number;
  status: number;
  hotBigUrl: string;
  hotSmallUrl: string;
};

export type ReqAddProduct = {
  productName: string;
  productType: number;
  sort: number;
  popular: boolean;
  productUrl: string;
  hotBigUrl: string;
  hotSmallUrl: string;
  productContent: string;
};

export type ReqUpdateProduct = ReqAddProduct & {
  id: number;
};

export type ReqDelProduct = {
  id: number;
};

export type ReqPublishProduct = ReqAddProduct & {
  id?: number;
};

export type ReqUnpublishProduct = {
  id: number;
};

export type ReqActivity = Page & {
  queryDate?: string;
  /** 1 待发布 2 已发布 3 已下架 */
  status?: number;
};

export type ResActivity = {
  id: number;
  activityName: string;
  sort: number;
  activityTitle: string;
  publishType: number;
  activityContent: string;
  activityLink: string;
  creator: string;
  createTime: string;
  publishTime: string;
  status: number;
  activityUrl: string;
};

export type ReqAddActivity = {
  activityName: string;
  sort: number;
  activityTitle: string;
  publishType: number;
  activityContent: string;
  activityLink: string;
};

export type ReqUpdateActivity = ReqAddActivity & {
  id: number;
};

export type ReqDelActivity = {
  id: number;
};

export type ReqPublishActivity = ReqAddActivity & {
  id?: number;
};

export type ReqUnpublishActivity = {
  id: number;
};

export type ReqSolution = Page & {
  solutionName?: string;
  queryDate?: string;
  status?: number;
};

export type ResSolution = {
  id: number;
  solutionName: string;
  publishType: number;
  sort: number;
  solutionUrl: string;
  solutionContent: string;
  creator: string;
  createTime: string;
  publishTime: string;
  status: number;
};

export type ReqAddSolution = {
  solutionName: string;
  publishType: number;
  sort: number;
  solutionUrl: string;
  solutionContent: string;
};

export type ReqUpdateSolution = ReqAddSolution & {
  id: number;
};

export type ReqDelSolution = {
  id: number;
};

export type ReqPublishSolution = ReqAddSolution & {
  id?: number;
};

export type ReqUnpublishSolution = {
  id: number;
};

export type ReqDoc = Page & {
  docName?: string;
  queryDate?: string;
  status?: number;
};

export type ResDoc = {
  id: number;
  docName: string;
  docUrl: string;
  sort: number;
  docContent: string;
  creator: string;
  createTime: string;
  publishTime: string;
  status: number;
};

export type ReqAddDoc = {
  docName: string;
  docContent: string;
};

export type ReqUpdateDoc = ReqAddDoc & {
  id: number;
};

export type ReqDelDoc = {
  id: number;
};

export type ReqPublishDoc = ReqAddDoc & {
  id?: number;
};

export type ReqUnpublishDoc = {
  id: number;
};

export type ReqAccount = Page & {
  searchKey?: string;
};

export type ResAccount = {
  userId: number;
  realName: string;
  loginName: string;
  status: number;
  mobile: string;
  lastLoginTime: string;
  createTime: string;
  roleNames: string;
  creatorName: string;
  color: string;
  headPhoto: string;
  remark: string;
};

export type ReqUpdateAccount = {
  userId?: number;
  loginName: string;
  mobile: string;
  realName: string;
  headPhoto?: string;
};

export type ReqActivateAccount = {
  userId: number;
  status: number;
};
