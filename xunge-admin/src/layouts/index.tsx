/*
 * @Author: linqibin
 * @Date: 2025-05-30 10:35:44
 * @LastEditors: linqibin
 * @LastEditTime: 2025-07-03 09:22:30
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import { Layout as AntLayout, Avatar, Dropdown, Menu, Row, Space } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useMemo } from "react";
import menuList, { MENU_MAP } from "../router/menu";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CaretDownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import logo from "@/assets/img/logo.png";
import Tabs from "@/components/Tabs";
import { useTabsStore } from "@/store/tabs";
import { useImageHost } from "@/store/imageHost";
import { useUserInfo } from "@/store/userInfo";
import withLogin from "@/hoc/withLogin";
import "./index.scss";

const Layout: React.FC = () => {
  const siderStyle: React.CSSProperties = {
    overflow: "auto",
    height: "calc(100vh - 64px)",
    position: "sticky",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    backgroundColor: "#ffffff",
    paddingTop: 30,
    boxSizing: "border-box",
  };

  const headerStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#4369ff",
    paddingLeft: 24,
    paddingRight: 24,
  };

  const contentStyle: React.CSSProperties = {
    margin: 0,
    background: "#ffffff",
    borderRadius: 6,
    overflow: "auto",
    height: "calc(100vh - 64px - 54px - 24px)",
    padding: 20,
  };

  const navigate = useNavigate();

  const items = [
    {
      label: "个人信息",
      key: "1",
      icon: <UserOutlined />,
      onClick: () => {
        navigate("/user");
        addTab({ key: '/user', label: '个人信息' });
      },
    },
    {
      label: "退出登录",
      key: "2",
      icon: <LogoutOutlined />,
      onClick: () => {
        navigate("/login");
      },
    },
  ];

  const { addTab } = useTabsStore();
  const { pathname } = useLocation();

  const menuSelectedKeys = useMemo(() => {
    return [pathname === "/" ? "banner" : pathname.split("/")[1]];
  }, [pathname]);

  const { getImageHost } = useImageHost();
  const { userInfo, getUserInfo, userType } = useUserInfo();

  useEffect(() => {
    getImageHost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menuListWithLogin = useMemo(() => {
    if (userType === 0) {
      return menuList;
    } else {
      return menuList.filter((item) => item.key !== "account");
    }
  }, [userType])

  return (
    <AntLayout>
      <Header style={headerStyle}>
        <Row justify="space-between" align="middle" style={{ width: "100%" }}>
          <div className="header-logo">
            <img src={logo} className="logo" alt="logo" />
            迅鸽产品系统
          </div>
          <Dropdown menu={{ items }} placement="bottom">
            <Space style={{ cursor: 'pointer' }}>
              <Avatar
                style={{ backgroundColor: "#eaf0fe", color: "#97adff" }}
                icon={<UserOutlined />}
                src={
                  userInfo?.headPhoto
                    ? userInfo.imagePath + userInfo.headPhoto
                    : null
                }
              />
              <span style={{ color: "#ffffff" }}>{userInfo?.loginName}</span>
              <CaretDownOutlined style={{ color: '#ffffff', fontSize: 12 }} />
            </Space>
          </Dropdown>
        </Row>
      </Header>
      <AntLayout hasSider>
        <Sider width={200} style={siderStyle}>
          <Menu
            mode="inline"
            selectedKeys={menuSelectedKeys}
            style={{ borderRight: 0, backgroundColor: "#ffffff" }}
            items={menuListWithLogin}
            onClick={(e) => {
              const item = MENU_MAP.get(`/${e.key}`);
              if (item) {
                addTab({
                  key: `/${e.key}`,
                  label: item,
                });
              }
            }}
          />
        </Sider>
        <AntLayout style={{ padding: "0 12px 12px" }}>
          <Tabs />
          <Content style={contentStyle}>
            <Outlet />
          </Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  );
};

const LayoutWithLogin = withLogin(Layout);

export default LayoutWithLogin;