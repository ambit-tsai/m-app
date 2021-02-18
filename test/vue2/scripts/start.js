const sharedOptions = require('./shared');
const PORT = 8002;


module.exports = {
    ...sharedOptions,
    mode: 'development',
    output: {
        ...sharedOptions.output,
        publicPath: `http://127.0.0.1:${PORT}/`,
    },
    devServer: {
        port: PORT,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
}