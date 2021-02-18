<template>
    <div class="app">
        <router-link to="/" class="logo">
            <img src="./logo.png" />
        </router-link>

        <div class="links">
            <router-link to="/user">/user</router-link>
            <router-link to="/about">/about</router-link>
        </div>

        <router-view />
    </div>
</template>


<style scoped>
.app {
    text-align: center;
}
.logo {
    display: inline-block;
}
.logo > img {
    width: 150px;
    height: 150px;
}
.links {
    margin-bottom: 16px;
}
.links > a + a {
    margin-left: 16px;
}
</style>