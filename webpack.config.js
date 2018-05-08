/**
 * 在 base 文件里，将开发坏境和生产环境中通用的配置放在这里
 */
let webpack             = require('webpack');
let path                = require("path");
let CleanWebpackPlugin  = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 环境变量配置,dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 获取HtmlWebpackPlugin的参数（多页应用时，避免代码冗余）
var getHtmlConfig = function(name, title) {
    // 把整个对象传过去
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        title: title,
        favicon : './src/image/favicon.ico',
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
}


// entry
const entry = {
    'common': __dirname + '/src/page/common/index.js',
    'index':  __dirname + '/src/page/index/index.js'
};

// plugin
const plugins = [
    // 独立通用模块到js/base.js
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'js/base.js'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // 清除dist文件
    new CleanWebpackPlugin(["js", "css", "fonts", "view", "img"], {
        root: __dirname + "/dist/",
        verbose: true,
        dry: false
    }),
    // 把css单独打包到文件里
    new ExtractTextPlugin('css/[name].css'),
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    // 让$指向jQuery
    new webpack.ProvidePlugin({ // Automatically load modules instead of having to import or require them everywhere.
        $: 'jquery',
        jQuery: 'jquery'
    })
];

let config = {
    target: 'web',
    cache: true,
    entry: entry,
    output: {
        path: __dirname + '/dist', // 输出文件放置的地方
        publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '../', // 打包后的文件访问依赖包的路径
        filename: 'js/[name].js' // 文件名
    },
    // include jQuery from a CDN instead of bundling it，且让$为全局变量
    externals: {
        'jquery': 'window.$'
    },
    resolve: {
        alias: {
            node_modules: path.join(__dirname, '/node_modules'),
            lib         : path.join(__dirname, '/src/lib'),
            util        : path.join(__dirname, '/src/util'),
            component   : path.join(__dirname, '/src/component'),
            service     : path.join(__dirname, '/src/service'),
            page        : path.join(__dirname, '/src/page')
        }
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            }, 
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader', 'postcss-loader'],
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader', 'postcss-loader'],
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        outputPath: 'img/'
                    }
                }]
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                use: 'url-loader?limit=1000&name=fonts/[name].[ext]'
            },
            // 将jQuery暴露到全局
            {
                test: path.join(__dirname, '/src/libs/jq/jquery-3.2.1.min.js'),
                loader: 'expose?jQuery'
            }
        ]
    },
    plugins: plugins
};

// 使用环境变量来判断开发环境来启动服务器
if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;