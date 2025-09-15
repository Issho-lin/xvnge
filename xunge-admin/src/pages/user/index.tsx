/*
 * @Author: linqibin
 * @Date: 2025-07-02 11:49:24
 * @LastEditors: linqibin
 * @LastEditTime: 2025-07-02 17:02:14
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import { Col, Divider, Form, Input, message, Modal, Row } from "antd";
import Upload from "@/components/Upload";
import styles from "./index.module.scss";
import { useUserInfo } from "@/store/userInfo";
import { useEffect, useState } from "react";
import md5 from "md5";
import { updataPasswordApi, updateUserInfoApi } from "@/api/user";
import { useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";

type Fields = {
  oldPass: string;
  newPass: string;
  confirmPass: string;
};

const Text: React.FC<{ value?: string }> = ({ value }) => {
  return <span className={styles.text}>{value}</span>;
};

const UserCenter: React.FC = () => {
  const { userInfo, setHeadPhoto } = useUserInfo();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      realName: userInfo?.realName,
      loginName: userInfo?.loginName,
      mobile: userInfo?.mobile,
      lastLoginTime: userInfo?.lastLoginTime,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const [passForm] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const [msg, contextHolder] = message.useMessage();

  const { run: onUpdatePass, loading } = useRequest(
    async (values: Fields) => {
      const res = await updataPasswordApi({
        oldPass: md5(values.oldPass).toUpperCase(),
        newPass: md5(values.newPass).toUpperCase(),
        confirmPass: md5(values.confirmPass).toUpperCase(),
      });
      if (res.code === 200) {
        msg.success({
          content: "修改成功，请重新登录",
          duration: 1,
          onClose: () => {
            setVisible(false);
            navigate("/login");
          },
        });
      }
    },
    { manual: true }
  );

  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (userInfo?.headPhoto) {
      setAvatar(userInfo?.headPhoto);
    }
  }, [userInfo?.headPhoto]);

  const onUpload = async (value?: string) => {
    console.log(value);
    if (!value) {
      setAvatar("");
      return;
    } else {
      setAvatar(value);
      const res = await updateUserInfoApi({ headPhoto: value });
      if (res.code === 200) {
        msg.success("上传成功");
        setHeadPhoto(value);
      }
    }
  };

  return (
    <div className={styles["user-center"]}>
      <h3 className={styles.title}>基本信息</h3>
      <Row>
        <Upload value={avatar} onChange={onUpload} />
        <div style={{ marginLeft: 48, width: 800 }}>
          <Form
            form={form}
            colon={false}
            labelCol={{ span: 7 }}
            labelAlign="left"
          >
            <Row>
              <Col span={12}>
                <Form.Item label="用户姓名" name="realName">
                  <Text />
                </Form.Item>
                <Form.Item label="账号ID" name="loginName">
                  <Text />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="手机号码" name="mobile">
                  <Text />
                </Form.Item>
                <Form.Item label="最近登录时间" name="lastLoginTime">
                  <Text />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Row>
      <Divider />
      <h3 className={styles.title}>安全设置</h3>
      <Row>
        <span className={styles["pass-label"]}>密码</span>
        <span>********</span>
        <a
          className={styles["update-pass"]}
          onClick={() => {
            passForm.resetFields();
            setVisible(true);
          }}
        >
          修改密码
        </a>
      </Row>
      <Modal
        title="修改密码"
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={() => passForm.submit()}
        confirmLoading={loading}
      >
        <Form
          form={passForm}
          onFinish={onUpdatePass}
          labelCol={{ span: 5 }}
          style={{ padding: 30 }}
        >
          <Form.Item label="原密码" name="oldPass" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="newPass"
            required
            rules={[
              {
                validator(_rule, value) {
                  const oldPass = passForm.getFieldValue("oldPass");
                  if (!value) {
                    return Promise.reject(new Error("请输入新密码"));
                  } else if (value.length < 6) {
                    return Promise.reject(new Error("密码长度不小于6位"));
                  } else if (value === oldPass) {
                    return Promise.reject(new Error("新密码不能与原密码相同"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPass"
            required
            rules={[
              {
                validator(_rule, value) {
                  const newPass = passForm.getFieldValue("newPass");
                  if (!value) {
                    return Promise.reject(new Error("请输入确认密码"));
                  } else if (value !== newPass) {
                    return Promise.reject(new Error("两次密码输入不一致"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
    </div>
  );
};
export default UserCenter;
