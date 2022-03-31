import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@fortawesome/fontawesome-free/css/all.css'
import VuePanel from './components/Dashboard/Panel'

createApp(App)
  .use(ElementPlus)
  .use(VuePanel)
  .use(router)
  .use(store)
  .mount('#app')
