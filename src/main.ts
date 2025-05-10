import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'
import useRouterOsData from './composables/router-os-data'
import router from './routes'

const { saveData } = useRouterOsData()

saveData()
createApp(App)
  .use(router)
  .mount('#app')
