var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: [
            'webpack-hot-middleware/client',
            './index'
        ],
        vendors: ['react', 'react-dom', 'react-router']
    },
    output: {
        filename: 'index.bundle.js',
        publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendors', 
            filename: 'vendors.js'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            __DEV__: true
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}