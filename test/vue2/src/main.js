import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';


Vue.config.devtools = true;
Vue.use(VueRouter);


const Home = {
    functional: true,
    render: h => h('h2', {}, [
        'The router is using "hash" mode',
    ]),
};
const User = {
    functional: true,
    render: h => h('h2', {}, [
        'User',
    ]),
};
const About = {
    functional: true,
    render: h => h('h2', {}, [
        'About',
    ]),
};


if (window.mRoot) {
    addEventListener('MicroAppReady', startApp);
} else {
    startApp();
}


function startApp() {
    new Vue({
        el: '#app',
        render: h => h(App),
        router: new VueRouter({
            mode: 'hash',
            routes: [
                { path: '/', component: Home },
                { path: '/user', component: User },
                { path: '/about', component: About },
            ],
        }),
    });
}