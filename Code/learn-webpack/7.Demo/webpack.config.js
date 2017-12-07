const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                include: [
                    path.resolve(__dirname, "src")
                ],// test 和 include 具有相同的作用，都是必须匹配选项
                exclude: /node_modules/,// exclude 是必不匹配选项（优先于 test 和 include）
                loader: "babel-loader?presets[]=env&presets[]=react"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: '7.Demo',
            template: 'index.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};