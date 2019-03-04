const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        app: './src/index.js',
        helper: './src/helper.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                include: [
                    path.resolve(__dirname, "src")
                ],// test 和 include 具有相同的作用，都是必须匹配选项
                exclude: /node_modules/,// exclude 是必不匹配选项（优先于 test 和 include）
                loader: "babel-loader?presets[]=env"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: '6.source_map'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist')
    }
};