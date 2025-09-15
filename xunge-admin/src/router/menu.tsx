/*
 * @Author: linqibin
 * @Date: 2025-05-30 14:40:17
 * @LastEditors: linqibin
 * @LastEditTime: 2025-07-02 16:48:28
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import {
  CarryOutOutlined,
  FileTextOutlined,
  HomeOutlined,
  ProductOutlined,
  TagOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const menuList = [
  {
    key: "banner",
    icon: <HomeOutlined />,
    label: <Link to="/banner">首页Banner</Link>,
  },
  {
    key: "product",
    icon: <ProductOutlined />,
    label: <Link to="/product">企业产品</Link>,
  },
  {
    key: "activity",
    icon: <TagOutlined />,
    label: <Link to="/activity">优惠活动</Link>,
  },
  {
    key: "solution",
    icon: <CarryOutOutlined />,
    label: <Link to="/solution">解决方案</Link>,
  },
  {
    key: "document",
    icon: <FileTextOutlined />,
    label: <Link to="/document">技术文档</Link>,
  },
  {
    key: "account",
    icon: <UsergroupAddOutlined />,
    label: <Link to="/account">账号管理</Link>,
  },
];

export const MENU_MAP = new Map([
  ["/banner", "首页Banner"],
  ["/product", "企业产品"],
  ["/activity", "优惠活动"],
  ["/solution", "解决方案"],
  ["/document", "技术文档"],
  ['/user', '个人信息'],
  ['/account', '账号管理'],
]);

export default menuList;
