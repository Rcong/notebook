var path = require('path');

module.exports = {
    entry: [
        './index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: "babel-loader",
            exclude: [
                path.resolve(__dirname, "/node_modules/")
            ]
        }]
    }
}