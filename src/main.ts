import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn'
import router from './router/routerIndex'
const app = createApp(App)

 /**
  * 获取焦点 - 自定义指令
  * 调用方式：v-focus-me="true"
  */
app.directive("focus-me", {beforeMount(el,binding) {
    if(binding.value){
        if(el.children) {
            // 对于el-input输入框
            el.children[0].focus();
        }else {
            // 对于原生input输入框
            el.focus();
        }
    }
}});

app.use(router)
app.use(ElementPlus,{locale})
app.mount('#app')
