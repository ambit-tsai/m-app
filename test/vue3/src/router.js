import { createRouter, createWebHistory } from 'vue-router';
import { PROJECT_NAME } from './constant';
import Home from './components/Home.vue';


export default createRouter({
    history: createWebHistory(PROJECT_NAME),
    routes: [
        {
            path: '/',
            component: Home,
        },
    ],
});