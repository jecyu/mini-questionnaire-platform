/**
 * @Author: Jecyu
 * @Date: 2017-10-23 10:38:07 am 
 * @Modified By: JeCyu 
 * @Last Modified time: 2017-11-20 12:01:05 pm 
 */

'use strict';

require('./index.scss');
require('page/common/index.js');
let _mq            = require('util/mq.js');
let _questionnaire = require('service/questionnaire-service.js');
let templateIndex  = require('./index.string');

// 逻辑
// 1.通过ajax获取mock数据，通过hogan来动态渲染
// 2.实现单条删除以及全选删除逻辑，选中图标的状态切换
// 3.判断发布状态，决定“发布中”添加特殊颜色，选择渲染“查看问卷”或“查看数据”

let page = {
    data: {
        listParam: {
            pageNum: 1,
            pageSize: 10
        }
    },
    // 初始化
    init: function() {
        this.onLoad();
    },
    onLoad: function() {
        this.loadList();
        // 根据返回的文本赋予"发布中"特殊标识
        // console.log('test');
        console.log($('.quest-cell').text());
        if ($('.quest-cell').text() == '发布中') {
            $(this).addClass('release');
        }
    },
    bindEvent: function() {
        // 实现单条删除、及全选删除逻辑
    },
    // 加载问卷列表
    loadList: function() {
        let _this                 = this;
        let questionnaireListHtml = '';
        let $listCon = $('.questionnaire-list');
        
        // 渲染Html
        _questionnaire.getQuestList(this.data.listParam, function(res) {
            console.log('request success');            
            // 过滤问卷列表信息
            _this.filter(res);

            questionnaireListHtml = _mq.renderHtml(templateIndex, res);
            $listCon.html(questionnaireListHtml); 
        }, function(err) {
            console.log('request err');
        });
    },
    // 数据匹配,添加flag判断
    filter: function(data) {
        // 判断问卷列表是否为空，用在hogan渲染模版
        data.notEmpty = !!data.list.length;
    }
};

$(document).ready(function() {
    page.init();
});