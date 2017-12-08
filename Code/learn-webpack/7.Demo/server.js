const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');
const args = require('minimist')(process.argv.slice(2));


let config = args.env === 'prod' ? prodConfig : devConfig;
let options = {
    contentBase: './dist',
    hot: true,
    host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);

new webpackDevServer(webpack(config), options).listen(3000, 'localhost', () => {
    console.log('listening on port 3000');
});