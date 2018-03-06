/*
 * @Author: jecyu 
 * @Date: 2018-01-28 19:04:21 
 * @Last Modified by: jecyu
 * @Last Modified time: 2018-03-06 23:52:22
 */
"use strict";

require("./index.scss");
require("page/common/index.js");
require("../../components/Calendar/index.js");
// let echarts = require("echarts");

// 引入localStore模块
let _store = require("mocks/store.js");
let _mq = require("util/mq.js");
let _filter = require("util/Filters/filter.js");
let templateIndex = require("./index.string");

// 逻辑
// 1.遍历问卷数据

let page = {
  data: {},
  // 初始化
  init: function() {
    this.onLoad();
  },
  onLoad: function() {
    // 获取当前问卷的 id
    this.data.questionnaire_id = _mq.getUrlParam("questionnaireId");
    // 加载当前问卷
    this.loadCurrentQuest(this.data.questionnaire_id);

    this.bindEvent();
    // 打印本地数据
    console.log(_store.fetch().questionnaireList);
  },
  bindEvent: function() {
    // 存储 page 对象
    var _this = this;

    /* ======================== 日历组件处理 ==================== */

    /* ========================== 提交问卷 ================================ */
    $(".mod-quest__foot").on("click", ".js-btn--submit", function() {
      let isFilled = _this.isFilled();
      /* === 判断当前所有必填的题目是否已填 === */
      if (isFilled) {
        // 提交问卷
        _this.submitQuestionnaire();
      } else {
        alert("请确保所有内容填写正确哦！");
      }
      // 打印本地数据
      console.log(_store.fetch().questionnaireList);
    });
  },
  /**
   * 加载当前问卷
   * @param {string} QuestId 问卷的 id
   */
  loadCurrentQuest: function(QuestionnaireId) {
    let _this = this;
    let questionListHtml = "";
    let $listCon = $(".mod-quest");

    // 获取指定问卷的数据
    const current_questionnaire = _store.fetchQuestionnaire(QuestionnaireId);

    // 根据当前问卷的状态，来决定是否能够提交
    if (current_questionnaire.state == "released") {
      current_questionnaire.isSubmit = true;
    }

    // 过滤当前问卷的数据
    _this.filter(current_questionnaire);
    // 生成指定的字符串
    questionListHtml = _mq.renderHtml(templateIndex, current_questionnaire);
    // 把渲染后的模版添加到 DOM 中
    $listCon.html(questionListHtml);

    // 获取 respondents里的数据
    _this.fetchRespondents(current_questionnaire);

    // 渲染数据
    _this.renderCharts(current_questionnaire);

    // // 打印本地数据
    // console.log(_store.fetch().questionnaireList);
  },
  /**
   * 数据匹配,添加flag判断
   * @param data {object}
   */
  filter: function(data) {
    const _this = this;
    // 判断问卷列表是否为空，用在hogan渲染模版
    data.notEmpty = !!data.questionList.length;

    // 过滤处理问题类型
    for (let i = 0, len = data.questionList.length; i < len; i++) {
      // 单选题
      if (data.questionList[i].qtype == "single") {
        data.questionList[i].isSingle = true;
      }
      // 多选题
      if (data.questionList[i].qtype == "multi") {
        data.questionList[i].isMulti = true;

        // 渲染echats
        // 基于准备好的 DOM，初始化 echats 实例
        // let question_id = "Q" + data.questionList[i].order;
      }
      // 文本题
      if (data.questionList[i].qtype == "text") {
        data.questionList[i].isText = true;
      }
    }
  },
  /**
   * 渲染问卷数据
   * @param {object} questionnaire 指定问卷
   */
  renderCharts: function(questionnaire) {
    // 1.多选项的处理
    // 2.文本项的处理
    let cur_quest = questionnaire;

    for (let i in cur_quest.questionList) {
      // 饼图
      const option = {
        series: {
          type: "pie",
          data: []
        }
      };

      // 单选题
      if (cur_quest.questionList[i].qtype == "single") {
        for (let j in cur_quest.questionList[i].options) {
          cur_quest.questionList[i].options[j].proportion =
            cur_quest.questionList[i].options.length / 1 * 100;
        }
      }
      // 多选题
      if (cur_quest.questionList[i].qtype == "multi") {
        // 渲染echats
        // 基于准备好的 DOM，初始化 echats 实例
        let question_id = "Q" + cur_quest.questionList[i].order;
        let myChart = echarts.init(document.getElementById(question_id));

        // 遍历该题所有选项
        for (let j in cur_quest.questionList[i].options) {
          // 选项对象
          let option_object = {};
          option_object.name = cur_quest.questionList[i].options[j].content;
          // 随机模拟值
          option_object.value = Math.random(100);
          // 把相对于的回答者的值存储下来
          option.series.data.push(option_object);
        }

        // 使用刚指定的配置项和数据显示图表
        myChart.setOption(option);
      }
      // 文本题
      if (cur_quest.questionList[i].qtype == "text") {
      }
    }
  },
  /**
   * 读取问卷的回答者，更新到问卷对应的选项中
   */
  fetchRespondents: function(questionnaire) {
    let _this = this;
    let cur_quest = questionnaire;
    let cur_respondents = cur_quest.respondents;

    // 无人答题
    if (cur_respondents.length === 0) {
      return false;
    }

    // 遍历所有回答答案
    for (let index in cur_respondents) {
    }
  }
};

$(document).ready(function() {
  page.init();
});
