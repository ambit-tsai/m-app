const path = require('path');
const ROOT = path.resolve(__dirname, '../');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    context: ROOT,
    entry: path.resolve(ROOT, './src/main.js'),
    output: {
        path: path.resolve(ROOT, '../../docs/vue2/'),
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,    // "vue-style-loader" doesn't support ES Module
                        },
                    },
                ],
            },
            {
                test: /\.png$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: `${ROOT}/src/index.html`,
            filename: 'index.html',
        }),
    ],
}