import { createApp } from 'vue'
import App from './App.vue'
import storeConfigs from './store'
import router from "./router"
//Lifecycle bắt đầu được khởi tạo này
const app = createApp(App);
app.use(storeConfigs)
app.use(router)
app.mount('#app');
