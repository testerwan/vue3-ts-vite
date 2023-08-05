// @ts-nocheck
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from '@/App.vue'
import gloablComponent from '@/components/index.ts'
import 'element-plus/theme-chalk/dark/css-vars.css'
import router from './router'
import './permession.ts'
import 'virtual:svg-icons-register'
import pinia from './store'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(gloablComponent)
app.use(router)
app.use(pinia)
app.mount('#app')
