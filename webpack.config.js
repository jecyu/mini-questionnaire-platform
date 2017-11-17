/* npm install sass-loader node-sass webpack url-loader style-loader css-loader --save-dev
extract-text-webpack-plugin clean-webpack-plugin  postcss-loader autoprefixer
*/
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin  = require("clean-webpack-plugin");

// 环境变量配置,dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 获取HtmlWebpackPlugin的参数（多页应用时，避免代码冗余）
var getHtmlConfig = function(name, title) {
    // 把整个对象传过去
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name +'.html',        
        title   : title,
        // favicon : './favicon.ico',
        inject  : true,
        hash    : true,
        chunks  : ['common', name]  
    }
}

// entry
const entry = {
    'common': [__dirname + '/src/page/common/index.js'],
    'index': [__dirname + '/src/page/index/index.js']
};

// plugin
const plugins = [
    // 独立通用模块到js/base.js
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'js/base.js'
    }),
    // 清除dist文件
    new CleanWebpackPlugin(["js", "css", "resource", "view"], {
        root: __dirname + "/dist/",
        verbose: true,
        dry: false
    }),
    // 把css单独打包到文件里
    new ExtractTextPlugin('css/[name].css'),
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页'))
];




let config = {
    target: 'web',
    cache: true,
    entry :  entry,
    output: {
        path      : __dirname + '/dist',  // 输出文件放置的地方
        publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '../',                      // 打包后的文件访问依赖包的路径
        filename  : 'js/[name].js'        // 文件名
    },
    externals: {
        'jquery': 'window.$'
    },
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            page        : __dirname + '/src/page',
            image       : __dirname + '/src/image',
            util        : __dirname + '/src/util',
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.scss$/, 
                use : ExtractTextPlugin.extract({
                        fallback: 'style-loader', 
                        use: ['css-loader', 'sass-loader', 'postcss-loader'], 
                }) 
            },
            {
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
                use: 'url-loader?limit=100&name=resource/[name].[ext]'                 
            }
        ]
    },
    plugins: plugins  
};

// 使用环境变量来判断开发环境来启动服务器
if('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;