/**
 * @Author: Jecyu
 * @Date: 2017-10-23 10:38:07 am 
 * @Modified By: JeCyu 
 * @Last Modified time: 2017-11-20 12:01:05 pm 
 */

'use strict';

let _mq = require('util/mq.js');
require('./index.scss');
require('page/common/index.js');
require('page/common/nav/index.js');

// 逻辑
// 1.通过ajax获取mock数据，通过hogan来动态渲染
// 2.实现单条删除以及全选删除逻辑，选中图标的状态切换