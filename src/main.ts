import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import useRouterOsData from './composables/router-os-data'

const {saveData} = useRouterOsData();

saveData();
createApp(App).mount('#app')
