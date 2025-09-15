/*
 * @Author: linqibin
 * @Date: 2025-05-29 16:08:33
 * @LastEditors: linqibin
 * @LastEditTime: 2025-07-02 17:46:28
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      port: 5174,
      proxy: {
        '/api': {
          target: env.VITE_APP_IP,
          changeOrigin: true,
          secure: false,
          // rewrite: (url: string) => url.replace(/^\/proxy/, ''),
          configure: (proxy) => {
            proxy.on('proxyRes', (proxyRes) => {
              proxyRes.headers['x-real-url'] = env.VITE_APP_IP
            })
          },
        },
      },
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
      host: '0.0.0.0',
    }
  })
}
