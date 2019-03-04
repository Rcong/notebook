let path = require('path');

module.exports = {
    entry: {//多个入口打包,参考pc的模式,具体到某一个某块,再去加载某些js的时候。
        bundle1: './src/index1.js',
        bundle2: './src/index2.js',
        bundle3: './src/index3.js',
        bundle4: './src/index4.js',
        bundle5: './src/index5.js',
        bundle6: './src/index6.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
}