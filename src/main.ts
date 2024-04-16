import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { OhVueIcon} from 'oh-vue-icons';

const app = createApp(App)

app.component('v-icon', OhVueIcon)
app.use(router)

app.mount('#app')
