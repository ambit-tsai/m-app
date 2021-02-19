const vue = require('@vitejs/plugin-vue');
const path = require('path');


module.exports = {
    root: path.resolve(__dirname, '../'),
    base: './',
    plugins: [
        vue(),
    ],
    alias: {
        '@ambit_tsai/m-app': path.resolve(__dirname, '../../../dist/m-app'),
    },
}