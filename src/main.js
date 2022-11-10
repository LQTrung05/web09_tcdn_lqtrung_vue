import { createApp } from 'vue'
import App from './App.vue'

import storeConfigs from './store'

//Lifecycle bắt đầu được khởi tạo này
const app = createApp(App);
app.use(storeConfigs)
app.mount('#app');
