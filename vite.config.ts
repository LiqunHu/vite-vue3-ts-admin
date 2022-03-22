import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  base: './', // 打包路径
  server: {
    proxy: {
      // '/v1/api/node/admin': {
      //   target: 'http://localhost:9090', // 接口的域名
      //   secure: false, // 如果是https接口，需要配置这个参数
      //   changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      //   pathRewrite: {
      //     '^/v1/api/node/admin': '/api/node/admin'
      //   }
      // },
      // '/v1/api/node/auth': {
      //   target: 'http://localhost:9090', // 接口的域名
      //   secure: false, // 如果是https接口，需要配置这个参数
      //   changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      //   pathRewrite: {
      //     '^/v1/api/node/auth': '/api/node/auth'
      //   }
      // },
      // '/v1/api': {
      //   target: 'http://localhost:9091', // 接口的域名
      //   secure: false, // 如果是https接口，需要配置这个参数
      //   changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      //   pathRewrite: {
      //     '^/v1/api': '/api'
      //   }
      // },
      '/v1/api': {
        target: 'https://test.shipformula.com', // 接口的域名
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      },
      '/temp': { target: 'http://localhost:9090' },
      '/files': { target: 'http://localhost:9090' },
      '/filesys': { target: 'http://localhost:9090' },
    },
  },
})
