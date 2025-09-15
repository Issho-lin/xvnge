/*
 * @Author: linqibin
 * @Date: 2025-06-05 09:37:51
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-13 10:34:10
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
import styles from './index.module.scss'

interface PageTitleProps {
  text: string
}

const PageTitle: React.FC<PageTitleProps> = ({ text }) => {
  return (
    <div className={styles.title}>{text}</div>
  )
}
export default PageTitle