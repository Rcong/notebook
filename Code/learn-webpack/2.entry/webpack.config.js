let path = require('path');

module.exports = {
    entry: {
        bundle1: './src/index.js',
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