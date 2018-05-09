/**
 * 在 base 文件里，将开发坏境和生产环境中通用的配置放在这里
 */
const webpack             = require('webpack');
const path                = require("path");
const CleanWebpackPlugin  = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置,dev / online
// var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 获取HtmlWebpackPlugin的参数（多页应用时，避免代码冗余）
var getHtmlConfig = function(name, title) {
    // 把整个对象传过去
    return {
      template: './view/' + name + '.html',
      filename: 'view/' + name + '.html',
      title: title,
      favicon : './images/favicon.ico',
      inject: true,
      hash: true,
      chunks: ['common', name]
    }
}

/**
 * 映射目录
 * @param {*} dir
 */
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

/* 配置常量 */
// 源代码的根目录（本地物理文件路径）
const SRC_PATH = path.resolve(__dirname, '../src');
// 打包后的资源根目录（本地物理文件路径）
const ASSETS_BUILD_PATH = path.resolve(__dirname, '../dist');
// const ASSETS_PUBLIC_PATH = '/assets/'; // 部署上线
const ASSETS_PUBLIC_PATH = '../'; // 本地测试

module.exports = {
  context: SRC_PATH, // 设置源代码的默认根路径
  resolve: {
    extensions: ['.js', '.jsx'], // 同时支持 js 和 jsx
    alias: {
      node_modules: `${__dirname}../node_modules`,
      util: `${SRC_PATH}/util`,
      images: `${SRC_PATH}/images`,
      page: `${SRC_PATH}/page`,
      service: `${SRC_PATH}/service`
    }
  },
  entry: {
    // 注意 entry 中的路径都是相对于 SRC_PATH 的路径
    common: './page/common/index.js',
    index: './page/index/index.js',
    'new-questionnaire': ['./page/new-questionnaire/index.js'],
    'questionnaire-detail': [
      './page/questionnaire-detail/index.js'
    ],
    'questionnaire-view': ['./page/questionnaire-view/index.js'],
    'questionnaire-data': ['./page/questionnaire-data/index.js']
  },
  output: {
    path: ASSETS_BUILD_PATH, // 打包后输出文件放置的地方
    publicPath: ASSETS_BUILD_PATH, // 打包后的文件访问依赖包的路径
    filename: 'js/[name].js'
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
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            // outputPath: 'img/'
            name: 'images/[name].[ext]'
          }
        }]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      // string主要作为模版供模版引擎hogan使用
      {
        test: /\.string$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              removeAttributeQuotes: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 清除dist文件
    new CleanWebpackPlugin(['js', 'css', 'fonts', 'view', 'images'], {
      root: ASSETS_BUILD_PATH,
      verbose: true,
      dry: false
    }),
    // 独立通用模块到js/base.js
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'common'],
      minChunks: Infinity,      
      filename: 'js/[name].js'
    }),
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('new-questionnaire', '新建问卷')),
    new HtmlWebpackPlugin(getHtmlConfig('questionnaire-detail', '问卷详情')),
    new HtmlWebpackPlugin(getHtmlConfig('questionnaire-view', '查看问卷')),
    new HtmlWebpackPlugin(getHtmlConfig('questionnaire-data', '查看数据'))
  ]
};

// 使用环境变量来判断开发环境来启动服务器
// if ('dev' === WEBPACK_ENV) {
//   config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
// }
