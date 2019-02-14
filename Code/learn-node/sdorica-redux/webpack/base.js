const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'inline-source-map' : 'hidden-source-map',
    entry: {
        app: './src/index.js'
    },
    output: {
        publicPath: '/dist', // js引用路径或者CDN地址
        // path: join(__dirname, 'dist'), // 打包文件的输出目录
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]-[hash:5].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@Api': path.resolve('src/api'),
            '@Components': path.resolve('src/components'),
            '@Images': path.resolve('src/images'),
            '@Pages': path.resolve('src/pages'),
            '@Utils': path.resolve('src/utils')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }, {
                test: [/.css$|.less$/],
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            // 开启 CSS Modules
                            modules: true,
                            sourceMap: isDevelopment,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: loader => [
                                // 可以配置多个插件
                                require('autoprefixer')({
                                    browsers: [' > 0.15% in CN ']
                                })
                            ]
                        }
                    }, {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            modifyVars: {
                                'primary-color': '#1DA57A',
                                'link-color': '#1DA57A',
                                'border-radius-base': '2px',
                            },
                            javascriptEnabled: true,
                        },
                    }
                ],
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash:5].[ext]',
                            outputPath: '../assets/'
                        }
                    }
                ]
            }
        ]
    },
    //分包处理
    optimization: {
        splitChunks: {
            //cacheGroups 里每个对象就是一个用户定义的 chunk
            cacheGroups: {
                //把所有 node_modules 中引入的模块打包成一个模块
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Sdorica-Redux',
            filename: 'index.html',
            template: path.resolve(__dirname, '../index.html'),
            inject: true,
            hash: true,
            cache: true,
            minify: false
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true
            // }
        }),
        new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].css' : '[name]-[hash:5].css',
            chunkFilename: isDevelopment ? '[id].css' : '[id]-[hash:5].css'
        }),
    ]
}