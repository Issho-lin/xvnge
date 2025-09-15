/*
 * @Author: linqibin
 * @Date: 2025-06-05 14:59:06
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-19 18:15:10
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import { Row } from "antd";
// import phone from "@/assets/img/phone.jpg";
import styles from "./index.module.scss";
import { useImageHost } from "@/store/imageHost";
import { LeftOutlined } from "@ant-design/icons";

const Preview: React.FC<{
  content?: string;
  title?: string;
  imgUrl?: string;
  activityLink?: string;
}> = ({ content = "", title = "标题", imgUrl, activityLink }) => {
  const imageHost = useImageHost((state) => state.imageHost);

  return (
    <Row justify="center">
      {/* <img src={phone} style={{ height: 700, borderRadius: 25 }} /> */}
      <div className={styles.box}>
        <LeftOutlined className={styles.back} />
        <div className={styles.content}>
          {!!imgUrl && (
            <div className={styles.img_box}>
              <img src={imageHost + imgUrl} className={styles.img} />
              {!!activityLink && (
                <div className={styles.link}>
                  <div className={styles.link_title}>优惠注册链接：</div>
                  <div className={styles.link_content}>{activityLink}</div>
                </div>
              )}
            </div>
          )}
          <h3 className={styles.title}>{title}</h3>
          <div
            className={styles.content_box}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </Row>
  );
};
export default Preview;
