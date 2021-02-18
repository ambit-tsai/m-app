import { createApp, h } from 'vue';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import 'm-app';


const app = createApp({
    render: () => h(App),
});
app.config.devtools = true;
app.config.isCustomElement = tag => tag.startsWith('m-');
app.use(router);
app.mount(document.body);