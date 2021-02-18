const webpack = require('webpack');
const sharedOptions = require('./shared');


webpack({
    ...sharedOptions,
    mode: 'production',
}, (err, stats) => {
    if (err) {
        console.error(err, stats);
    }
});