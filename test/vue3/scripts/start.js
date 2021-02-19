const sharedOptions = require('./shared');


module.exports = {
    ...sharedOptions,

    server: {
        port: 8000,
        open: true,
        proxy: {
            '/react/': {
                target: 'http://127.0.0.1:8001/',
                rewrite: path => path.replace(/^\/react\//, '/'),
            },
            '/vue2/': {
                target: 'http://127.0.0.1:8002/',
                rewrite: path => path.replace(/^\/vue2\//, '/'),
            },
        },
    },
}