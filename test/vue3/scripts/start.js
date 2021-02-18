const sharedOptions = require('./shared');


module.exports = {
    ...sharedOptions,

    server: {
        port: 8000,
        open: true,
    },
}