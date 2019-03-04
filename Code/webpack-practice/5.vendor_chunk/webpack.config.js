let path = require('path');
let webpack = require('webpack');

module.exports = {
    entry: {
        app: './index.js',
        vendors: ['jquery']
    },
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,// exclude 是必不匹配选项（优先于 test 和 include）
                loader: "babel-loader?presets[]=env"
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendors', // 对应 entry 中的 vendor 入口, 入口数组中指定的依赖模块即最终存放于 vendors.js 文件中的依赖模块
            filename: 'vendors.js'
        })
    ]
}