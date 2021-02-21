import { createApp, h } from 'vue';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import '@ambit_tsai/m-app';


const redirect = localStorage.getItem('redirect');
if (redirect) {
    localStorage.setItem('redirect', '');
    router.replace(redirect);
}


const app = createApp({
    render: () => h(App),
});
app.config.devtools = true;
app.config.isCustomElement = tag => tag.startsWith('m-');
app.use(router);
app.mount(document.body);