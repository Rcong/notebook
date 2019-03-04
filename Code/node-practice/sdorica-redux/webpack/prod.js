const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackBaseConfig = require('./base.js')

module.exports = merge(webpackBaseConfig, {
    optimization: {
        minimizer: [
            // 压缩JS
            new UglifyJsPlugin({
                output: {
                    // 删除所有的注释
                    comments: false,
                    // 最紧凑的输出
                    beautify: false
                },
                compress: {
                    // 删除所有的 `console` 语句
                    // 还可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                }
            }),
            // 压缩CSS
            new OptimizeCSSAssetsPlugin()
        ]
    }
})