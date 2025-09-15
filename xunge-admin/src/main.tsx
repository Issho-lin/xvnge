/*
 * @Author: linqibin
 * @Date: 2025-05-29 16:08:33
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-19 09:28:17
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@ant-design/v5-patch-for-react-19'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
