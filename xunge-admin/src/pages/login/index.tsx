/*
 * @Author: linqibin
 * @Date: 2025-05-29 17:54:00
 * @LastEditors: linqibin
 * @LastEditTime: 2025-09-28 09:38:35
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import loginImg from "@/assets/img/login-img.svg";
import loginLogo from "@/assets/img/logo2.png";
import LoginBg from "./components/LoginBg";
import styles from "./index.module.scss";
import { Button, Checkbox, Form, Input, Row, Space } from "antd";
import { useNavigate } from "react-router-dom";
import md5 from "md5";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useTabsStore } from "@/store/tabs";
import { AES } from "@/utils/crypto";
import { loginApi } from '@/api/login'
import { useRequest } from "ahooks";
import { useUserInfo } from "@/store/userInfo";

interface Fields {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [form] = Form.useForm();
  // const [msg, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { addTab, clearTabs } = useTabsStore();
  const { setUserType } = useUserInfo();
  const [isRemember, setIsRemember] = useState(false);

  const onRemember = (v: boolean) => {
    setIsRemember(v);
    if (v) {
      const username = form.getFieldValue("username");
      const password = form.getFieldValue("password");
      localStorage.setItem("username", username);
      localStorage.setItem("password", AES.encrypt(password));
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
  }
  const { run: onLogin, loading } = useRequest(
    async (values: Fields) => {
      const res = await loginApi({
        username: values.username,
        access: md5(values.password).toUpperCase(),
        grant_type: 'app_password',
      })
      if (res.code === -1) {
        // msg.error(res.message)
      } else if (res.access_token) {
        onRemember(isRemember);
        Cookies.set(
          "token",
          AES.encrypt(res.access_token),
          { expires: 1 }
        );
        // 登录成功
        setUserType(res.userType)
        addTab({ key: "/banner", label: "首页Banner" });
        navigate("/banner");
      }
    },
    { manual: true } 
  )

  useEffect(() => {
    Cookies.remove("token");
    clearTabs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    if (username && password) {
      setIsRemember(true);
      form.setFieldsValue({
        username,
        password: AES.decrypt(password),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.login}>
      <section
        className={`${styles["login-box"]} ${styles.animated} ${styles.flipInY}`}
      >
        <div className={styles["login-left"]}>
          <img className={styles["login-img"]} src={loginImg} />
        </div>
        <div className={styles["login-right"]}>
          <Space direction="vertical">
            <Row align="middle" style={{ marginBottom: 16 }}>
              <img className={styles.logo} src={loginLogo} />
              <span className={styles.title}>迅鸽产品系统</span>
            </Row>
            <Form form={form} onFinish={onLogin}>
              <Form.Item name="username" rules={[{ required: true, message: '请输入账号' }]}>
                <Input type="text" placeholder="用户名" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "请输入密码" }]}
              >
                <Input.Password placeholder="密码"  />
              </Form.Item>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={() => form.submit()}
                loading={loading}
              >
                登录
              </Button>
              <Row className={styles.remember}>
                <Checkbox
                  checked={isRemember}
                  onChange={(e) => {
                    onRemember(e.target.checked);
                  }}
                >
                  记住密码
                </Checkbox>
              </Row>
            </Form>
          </Space>
        </div>
      </section>
      <LoginBg />
      {/* {contextHolder} */}
      
    </div>
  );
};
export default Login;
