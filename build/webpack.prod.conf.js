const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 读取同一目录下的 base config
const config = require('./webpack.base.conf');

config.module.rules.push({
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      'css-loader',
      'sass-loader',
      'postcss-loader'
    ]
  })
  // exclude: /node_modules/
}, {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'postcss-loader']
  })
});

// 真实场景中， React、jQuery 等优先走全站的 CDN，所以要放在 externals 中
config.externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  // include jQuery from a CDN instead of bundling it，且让$为全局变量
  jquery: 'window.$'
};


config.plugins.push(
  // 官方文档推荐使用下面的插件确保 NODE_ENV
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }),
  // 启动 minify
  new webpack.LoaderOptionsPlugin({ minimize: true }),
  // 抽取 CSS 文件
  new ExtractTextPlugin({
    filename: 'css/[name].css',
    allChunks: true,
    ignoreOrder: true
  }),
);

module.exports = config;