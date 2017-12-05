let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src")
                ],// test 和 include 具有相同的作用，都是必须匹配选项
                exclude: /node_modules/,// exclude 是必不匹配选项（优先于 test 和 include）
                loader: "babel-loader",
                options: {
                    presets: ["env"]
                },
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            title: 'Plugin-demos',
            filename: 'index.html'
        })
    ]
}