/**
 * 这里是用于开发环境的 Webpack 配置，继承自 base
 */
const webpack = require('webpack');
// 读取同一目录下的 base config
const config = require('./webpack.base.conf');
const path = require('path');

// 添加 webpack-dev-server 相关的配置
config.devServer = {
  contentBase: './', // 本地服务器所加载的页面所在的目录
  port: 8088,
  inline: true,
  // publicPath: '/assets/'
  publicPath: '/dist/' // 这里必须是 /dist/，对应打包路径 path，devServer 才能访问记忆内存
  // headers: { 'Access-Contro-Allow-Origin': '*' },
  // // 可用
  // proxy: {
  //   '/users/': {
  //     target: 'http://[::1]:3000',
  //     secure: false,
  //     changeOrigin: true
  //   }
  // }
};


config.module.rules.push({
  test: /\.scss$/,
  use: [
    'style-loader',
    'css-loader',
    'sass-loader',
    'postcss-loader'
  ]
}, {
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader'
  ]
});

// 真实场景中， React、jQuery 等优先走全站的 CDN，所以要放在 externals 中
config.externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  // include jQuery from a CDN instead of bundling it，且让$为全局变量
  jquery: 'window.$'
};

// 添加 Sourcemap 支持
config.plugins.push(new webpack.SourceMapDevToolPlugin({
  filename: '[file].map',
  exclude: ['vendor.js'] // vendor 通常不需要 sourcemap
}));

// Hot module replacement
Object.keys(config.entry).forEach((key) => {
  // 这里有一个私有的约定，如果 entry 是一个数组，则证明它需要被 hot module replace
  if (Array.isArray(config.entry[key])) {
    config.entry[key].unshift(
      'webpack-dev-server/client?http://0.0.0.0:8088',
      'webpack/hot/only-dev-server'
    );
  }
});

config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = config;
