/*
 * @Author: linqibin
 * @Date: 2025-06-11 15:57:05
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-13 17:07:29
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import { useTabsStore, type ResMenuType } from "@/store/tabs";
import styles from "./index.module.scss";
import { useMemo, type MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cx from "classnames";
import { CloseOutlined } from "@ant-design/icons";

const Tabs: React.FC = () => {
  const { tabs, removeTab } = useTabsStore();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const activeIndex = useMemo(() => {
    const index = tabs.findIndex((item) => {
      return item.key === pathname + search;
    });
    return index;
  }, [pathname, search, tabs]);

  const handleClose = (
    e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>,
    item: ResMenuType,
    index: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    removeTab(item.key);
    if (activeIndex === index) {
      if (index > 0) {
        navigate(tabs[activeIndex - 1].key, { state: tabs[activeIndex - 1].state });
      } else {
        navigate(tabs[1].key, { state: tabs[1].state });
      }
    }
  };
  return (
    <div className={styles.tabs}>
      <ul className={styles["tab-list"]}>
        {tabs.map((item, index) => (
          <li
            key={item.key}
            className={cx(
              styles["tab-item"],
              { [styles.active]: activeIndex === index },
              { [styles.prev]: activeIndex - 1 === index },
              { [styles.next]: activeIndex + 1 === index }
            )}
            onClick={() => {
              if (activeIndex !== index) {
                navigate(item.key, { state: item.state });
              }
            }}
          >
            <div className={styles.text}>
              <a>{item.label}</a>
              {tabs.length > 1 && (
                <span
                  className={styles.close}
                  onClick={(e) => handleClose(e, item, index)}
                >
                  <CloseOutlined />
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Tabs;
