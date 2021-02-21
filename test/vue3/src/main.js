import { createApp, h } from 'vue';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import { PROJECT_NAME } from './constant';
import '@ambit_tsai/m-app';


const app = createApp({
    render: () => h(App),
});
app.config.devtools = true;
app.config.isCustomElement = tag => tag.startsWith('m-');
app.use(router);
app.mount(document.body);


// 404 redirect
const redirect = localStorage.getItem('redirect');
if (redirect) {
    localStorage.setItem('redirect', '');
    router.replace(redirect.replace(PROJECT_NAME, '/'));
}