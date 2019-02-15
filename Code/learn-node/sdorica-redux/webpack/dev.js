const webpack = require("webpack");
const merge = require('webpack-merge')
const { join } = require('path');
const webpackBaseConfig = require('./base.js')

module.exports = merge(webpackBaseConfig, {
    devServer: {
        // proxy: {
        //     '/api': 'http://localhost:7878'
        // },
        open: true,
        openPage: 'dist/index.html',
        hot: true, // 热重载
        contentBase: './src/',
        port: 8080, // 本地服务器端口号
        compress: true, // 开启gzip
        overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
        disableHostCheck: true,
        historyApiFallback: true,//设置为true，当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
        noInfo: false//启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
});