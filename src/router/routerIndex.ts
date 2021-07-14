import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import login from '@/view/login/login.vue'
import layout from '@/view/layout/layout.vue'
import duty from '@/view/duty/duty.vue'
import optionMng from '@/view/optionMng/channel.vue'
import systemLog from '@/view/systemLog/systemLog.vue'
import sysSetting from '@/view/sysSetting/sysSetting.vue'
const routes = [
    {
        path: '/',
        redirect: '/login'
        // component: home
    },
    {
        path: '/login',
        name: '登录',
        component: login,
        meta: {
            keepAlive: true
        }
    },
    {
        path: "/layout",
        name: "公用样式",
        component: layout,
        meta: {
            keepAlive: true
        },
        children: [
            {
                path: "/duty",
                name: "实时状态",
                component: duty,
                meta: {
                    keepAlive: true
                }
            },
            {
                path: "/optionMng",
                name: "配置管理",
                component: optionMng,
                meta: {
                    keepAlive: true
                }
            },
            {
                path: "/systemLog",
                name: "切换日志",
                component: systemLog,
                meta: {
                    keepAlive: true
                },
                children: []
            },
            {
                path: "/sysSetting",
                name: "系统管理",
                component: sysSetting,
                meta: {
                    keepAlive: true
                },
                children: []
            },
        ]
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router