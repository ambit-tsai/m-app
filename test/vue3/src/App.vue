<template>
    <Container class="app">
        <Header>
            <router-link to="/" active-class="" exact-active-class="">
                <h1 title="<m-app>">&lt;m-app&gt;</h1>
            </router-link>
            <Button @click="showAppTable = true" type="success" size="mini" round>Manage App</Button>
            <MicroAppTable v-model="showAppTable" />
        </Header>

        <Container>
            <Aside width="200px">
                <Menu :router="true">
                    <MenuItem v-for="(item, i) in appList" :key="i" :index="item.route">
                        <i :class="item.icon"></i>{{ item.name }}
                    </MenuItem>
                </Menu>
            </Aside>
            
            <Main>
                <router-view />
            </Main>
        </Container>
    </Container>
</template>


<script setup>
import Container from 'element-plus/es/el-container';
import Header from 'element-plus/es/el-header';
import Button from 'element-plus/es/el-button';
import MicroAppTable from './components/MicroAppTable.vue';
import Aside from 'element-plus/es/el-aside';
import Menu from 'element-plus/es/el-menu';
import MenuItem from 'element-plus/es/el-menu-item';
import Main from 'element-plus/es/el-main';
import { ref, provide } from 'vue';
import { useRouter } from 'vue-router';
import { createMicroApp } from './createMicroApp';

const list = [
    {
        name: 'React App', route: '/react/', icon: 'el-icon-apple',
        entry: import.meta.env.DEV ? 'http://localhost:8001/' : './',
    },
    {
        name: 'Vue 2 App', route: '/vue2/', icon: 'el-icon-cherry',
        entry: import.meta.env.DEV ? 'http://localhost:8002/' : './',
    },
];
const router = useRouter();
for (const item of list) {
    router.addRoute({
        name: item.name,
        path: item.route + ':pathMatch(.*)*',
        component: createMicroApp(item),
    });
}

const showAppTable = ref(false);
const appList = ref(list);
provide('appList', appList);
</script>


<style scoped>
:global(html),
:global(body) {
    height: 100%;
    margin: 0;
}
.app {
    height: 100%;
}
.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(48, 65, 86);
}
.el-header > a {
    text-decoration: none;
}
.el-header h1 {
    position: relative;
    color: white;
    /* text-shadow: -2px -1px 0 #FF0050, 0px 0px 6px #00FAF0; */
    text-shadow: -2px -1px 0 #FF0050;
}
.el-header h1::after {
    content: attr(title);
    display: block;
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    text-shadow: none;
    background-image: linear-gradient(-45deg, rgba(0,250,240,0), rgba(0,250,240,0) 45%, rgb(0,250,240) 50%, rgba(0,250,240,0) 55%, rgba(0,250,240,0));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: title 2s linear infinite;
}
.el-menu {
    height: 100%;
}
.el-main {
    overflow: auto;
}
</style>
<style>
@keyframes title {
    0% {
        background-position-x: 0;
    }
    100% {
        background-position-x: 100px;
    }
}
</style>
