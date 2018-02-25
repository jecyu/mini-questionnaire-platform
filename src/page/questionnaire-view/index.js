/*
 * @Author: jecyu 
 * @Date: 2018-01-28 19:04:21 
 * @Last Modified by: jecyu
 * @Last Modified time: 2018-02-25 23:23:52
 */
"use strict";

require("./index.scss");
require("page/common/index.js");
require("../../components/Calendar/index.js");
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

    /* === 初始化日历组件 === */
    var datepicker = $("#datepicker");
    datepicker.datepicker({
      monthNames: [
        "一月",
        "二月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      dateFormat: "yy-mm-dd"
    });
  },
  bindEvent: function() {
    // 存储 page 对象
    var _this = this;

    /* ======================== 日历组件处理 ==================== */

    /* ========================== 提交问卷 ================================ */
    $(".mod-quest__foot").on("click", ".js-btn--submit", function() {
      // 提交问卷
      _this.submitQuestionnaire();
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

    // 过滤当前问卷的数据
    _this.filter(current_questionnaire);
    // 生成指定的字符串
    questionListHtml = _mq.renderHtml(templateIndex, current_questionnaire);
    // 把渲染后的模版添加到 DOM 中
    $listCon.html(questionListHtml);
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
      }
      // 文本题
      if (data.questionList[i].qtype == "text") {
        data.questionList[i].isText = true;
      }
    }
  },
  /**
   * 提交问卷
   * @param answer
   */
  submitQuestionnaire: function() {
    let _this = this;
    // 声明一个答案数组
    let answer = [];

    /* ========= 遍历所有勾选的选项、及文本题的答案 =========== */
    // 遍历该问卷所有题目
    // 取得所有题目
    let questions = $(".question .js-question__item");

    /* === 遍历所有题目 === */
    questions.each(function() {
      // 新建一个问题答案数组
      let question_answer = [];
      // 存储当前题目的类型
      let question_qtype = $(this).attr("data-qtype");
      // 存储当前题目的选项
      let question_options = $(this).find(".question__option-item");
      /* === 遍历所有选项 === */
      question_options.each(function(index) {
        // 回答的内容
        let answer_content = "";
        // 判断问题的类型
        // 文本题
        if (question_qtype == "text") {
          answer_content = $(this)
            .find(".question__option-textarea") // 找到文本框
            .val() // 取得里面的值
            .trim(); // 去掉字符串前后的空格
        }
        // 单选题
        if (question_qtype == "single") {
          // 新建一个选项对象
          let option = { id: 1 };
          option.id = index + 1;
          // 取得被选择的选项 id
          if (
            $(this)
              .find(".question__option-raido") // 找到选项的按钮
              .prop("checked") // 找到勾选的选项
          ) {
            // 存储进问题答案容器
            answer_content.push(option.id);
          } 
        }
        // 多选题
        if (question_qtype == "multi") {
          // 新建一个选项对象
          let option = { id: 1 };
          option.id = index + 1;
          // 取得被选择的选项 id
          if (
            $(this)
              .find(".question__option-checkbox") // 找到选项的按钮
              .prop("checked") // 找到勾选的选项
          ) {
            // 存储进问题答案容器
            answer_content = option.id;
          } 
        }
          
        // 存储进问题答案容器
        question_answer.push(answer_content);
      });

      // 把当前问题存储进当前问卷中
      // current_quest.questionList.push(question);
      answer.push(question_answer);
    });

    // 调用 store 里的回答问卷函数
    let res = _store.sumbitAnswer(_this.data.questionnaire_id, answer);
    // 反馈
    if (res === true) {
      alert("问卷提交成功！");
    } else {
      alert(res);
    }

    // 打印本地数据
    console.log(_store.fetch().questionnaireList);
  }
};

$(document).ready(function() {
  page.init();
});
