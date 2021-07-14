import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')
const target_server = "http://172.17.13.166:21780/"
const viteConfig = {
    // 端口号(默认3000)
    port: 3000,
    // 是否自动打开浏览器(默认false)
    open: true,
    // 是否开启 https
    // https: false,
    // 服务端渲染
    // ssr: false,
    // 引入第三方的配置
    optimizeDeps: {
        include: ["element-plus/lib/locale/lang/zh-cn","moment", "axios"]
    },
    // 生产环境路径，类似webpack的assetsPath
    base: './',
    // 打包后目录,默认dist
    outDir: 'dist',
    // 别名配置
    resolve:{
        alias: {
            // 键必须以斜线开始和结束
            '@': path.resolve(__dirname, 'src')
        },
    },
    
    // 代理配置
    server: {
        proxy: {
            '/board': {
                target: target_server,
                changeOrigin: true,
                // rewrite: path => path.replace(/^\/board/, "")
            },
            '/channel': {
                target: target_server,
                changeOrigin: true,
            },
            '/pad': {
                target: target_server,//设置你调用的接口域名和端口号 别忘了加http
                changeOrigin: true,
            },
            '/log': {
                target: target_server,//设置你调用的接口域名和端口号 别忘了加http
                changeOrigin: true,
            },
            '/sys': {
                target: target_server,//设置你调用的接口域名和端口号 别忘了加http
                changeOrigin: true,
            },
            '/user': {
                target: target_server,//设置你调用的接口域名和端口号 别忘了加http
                changeOrigin: true,
            },
            '/file': {
                target: target_server,//设置你调用的接口域名和端口号 别忘了加http
                changeOrigin: true,
            },
            '/set': {
                target: target_server,//设置你调用的接口域名和端口号 别忘了加http
                changeOrigin: true,
            },
        },
    },
}
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    ...viteConfig
})
