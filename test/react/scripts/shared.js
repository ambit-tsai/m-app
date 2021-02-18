const path = require('path');
const ROOT = path.resolve(__dirname, '../');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    context: ROOT,
    entry: path.resolve(ROOT, './src/main.jsx'),
    output: {
        path: path.resolve(ROOT, '../../docs/react/'),
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    },
                }],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.svg$/,
                type: 'asset/inline',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${ROOT}/src/index.html`,
            filename: 'index.html',
        }),
    ],
}