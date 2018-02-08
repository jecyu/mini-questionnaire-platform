/*
 * @Author: jecyu 
 * @Date: 2018-01-28 19:04:21 
 * @Last Modified by: jecyu
 * @Last Modified time: 2018-02-08 23:23:20
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
// 1.

let page = {
  data: {},
  // 初始化
  init: function () {
    this.onLoad();
  },
  onLoad: function () {
    this.bindEvent();
  },
  bindEvent: function () {
    // 存储 page 对象
    var _this = this;

    /* ======================== 日历组件处理 ==================== */
    // 初始化日历组件
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

    // 获得当前的日期，填充到输入框中
    let current_date = datepicker.datepicker("getDate");
    // console.log(current_date);
    datepicker.attr("value", current_date);

    /* ===================== 问卷题目的处理 ==================== */

    // 找到添加问题按钮
    let btn_add = $("#js-add-question");
    // 取得题目类型按钮容器
    let $btns_qtype = $("#js-question-type");

    // 如果当前按钮不存在，则返回 false
    if ($btns_qtype === 0) return false;
    $btns_qtype.hide();
    // 单击监听事件，折叠题目类型按钮
    btn_add.on("click", function showBtnQtype() {
      $btns_qtype.toggle();
    });

    /* === 新建问卷 === */
    _store.addQuestionnaire(1);

    /* === 添加单选题 === */
    $btns_qtype.on("click", "#js-single", function () {
      // 声明一个问题对象
      let question = {
        order: _this.updateQuestionOrder(),
        stem: "单选题",
        qtype: "single",
        required: false,
        options: [{
            id: 1,
            content: "选项一"
          },
          {
            id: 2,
            content: "选项二"
          }
        ]
      };
      _this.addSingleType(question);
    });

    /* === 添加多选题 === */
    $btns_qtype.on("click", "#js-multi", function () {
      // 声明一个问题对象
      let question = {
        order: _this.updateQuestionOrder(),
        stem: "多选题",
        qtype: "multi",
        required: false,
        options: [{
            id: 1,
            content: "选项一"
          },
          {
            id: 2,
            content: "选项二"
          }
        ]
      }; // 顺序为问题的长度 + 1
      _this.addMultiType(question);
    });

    /* === 添加文本题 === */
    $btns_qtype.on("click", "#js-textarea", function () {
      // 声明一个问题对象
      let question = {
        order: _this.updateQuestionOrder(),
        stem: "文本题",
        qtype: "text",
        required: false,
        options: []
      }; // 顺序为问题的长度 + 1
      _this.addTextType(question);
    });
  },
  /**
   * 添加单选题
   * @param {string} question_order 问题顺序
   */
  addSingleType: function (question) {
    var _this = this;

    // 该题的顺序
    var question_order = question.order;
    var question_btn_html = `   <li class="question__btn btn question__item-moveUp left">
                      <i class="fa question__icon fa-arrow-circle-o-up"></i>上移</li>
                    <li class="question__btn btn question__item-moveDown left">
                      <i class="fa question__icon fa-arrow-circle-o-down"></i>下移</li>`;
    // 判断是否是第一题
    // if (question_order === 1) {
    //   question_btn_html = `
    //                 <li class="question__btn btn question__item-moveUp left">
    //                   <i class="fa question__icon fa-arrow-circle-o-down"></i>下移</li>`;
    // }
    // 判断是否是最后一题
    // if (question_length > 2 && question_order === question_length) {
    //   question_btn_html = `
    //                 <li class="question__btn btn question__item-moveUp left">
    //                   <i class="fa question__icon fa-arrow-circle-o-down"></i>上移</li>`;
    // }

    // 单选题字符串
    var single_html = `   <div class="question__item js-question__item" data-order="${
      question.order
    }" data-qtype="${question.qtype}">
                <h4 class="question__title">
                  <label class="question__title-order">${"Q" +
                    question_order}</label>
                  <input type="text" class="question__title-stem question__title-stem" value="单选题"></input>
                </h4>
                <p class="question__message">
                  <input class="question__message-checkbox" type="checkbox">
                  <label class="question__message-label" for="required">此题是否必填</label>
                </p>
                <ul class="question__option">
                  <li class="question__option-item">
                    <input class="question__option-radio" type="radio" name="single" disabled>
                    <label class="question__option-label" for="">
                      <input type="text" value="选项一">
                    </label>
                    <span class="question__btn btn question__option-del">
                      <i class="question__icon fa fa-trash-o"></i>删除</span>
                  </li>
                  <li class="question__option-item">
                    <input class="question__option-radio" type="radio" name="single" disabled>
                    <label class="question__option-label" for="">
                      <input class="question__option-input" type="text" value="选项二">
                    </label>
                    <span class="question__btn btn question__option-del">
                      <i class="question__icon fa fa-trash-o"></i>删除</span>
                  </li>
                </ul>
                <div class="question__action-buttons clearfix">
                  <p class="question__btn btn question__option-install left">
                    <i class="fa question__icon fa-plus-circle"></i>新增选项</p>
                  <ul class="right">
                    ${question_btn_html}
                    <li class="question__btn btn question__item-copy left">
                      <i class="fa question__icon fa-copy"></i>复用</li>
                    <li class="question__btn btn question__item-delete left">
                      <i class="fa question__icon fa-trash-o"></i>删除</li>
                  </ul>
                </div>
              </div>`;

    $(".question").append(single_html);
    // 题目的移入移出，控制操作按钮的显示或隐藏
    _this.questionMouseEvent();
    // 准备问题的操作按钮
    _this.prepareQuestionActionBtn(question);

    // 新增选项
    // 删除选项
  },
  /**
   * 添加多选题
   */
  addMultiType: function (question) {
    var _this = this;

    // 该题的顺序
    var question_order = "Q" + question.order;
    // 单选题字符串
    var multi_html = `     <div class="question__item js-question__item" data-order="${
      question.order
    }" data-qtype="${question.qtype}">
                <h4 class="question__title">
                  <label class="question__title-order">${question_order}</label>
                  <input type="text" class="question__title-stem" value="多选题"></input>
                </h4>
                <p class="question__message">
                  <input class="question__message-checkbox" id="required" type="checkbox">
                  <label class="question__message-label" for="required">此题是否必填</label>
                </p>
                <ul class="question__option">
                  <li class="question__option-item">
                    <input class="question__option-checkbox" type="checkbox" disabled>
                    <label class="question__option-label" for="">
                      <input type="text" value="选项一">
                    </label>
                    <span class="question__btn btn question__option-del">
                      <i class="question__icon  fa fa-trash-o"></i>删除</span>
                  </li>
                  <li class="question__option-item">
                    <input class="question__option-checkbox" type="checkbox" disabled>
                    <label class="question__option-label" for="">
                      <input type="text" value="选项二">
                    </label>
                    <span class="question__btn btn question__option-del">
                      <i class="question__icon  fa fa-trash-o"></i>删除</span>
                  </li>
                  <li class="question__option-item">
                    <input class="question__option-checkbox" type="checkbox" disabled>
                    <label class="question__option-label" for="">
                      <input type="text" value="选项三">
                    </label>
                    <span class="question__btn btn question__option-del">
                      <i class="question__icon  fa fa-trash-o"></i>删除</span>
                  </li>
                  <li class="question__option-item">
                    <input class="question__option-checkbox" type="checkbox" disabled>
                    <label class="question__option-label" for="">
                      <input type="text" value="选项四">
                    </label>
                    <span class="question__btn btn question__option-del">
                      <i class="question__icon  fa fa-trash-o"></i>删除</span>
                  </li>
                </ul>
                <div class="question__action-buttons clearfix">
                  <p class="question__btn btn question__option-install left">
                    <i class="fa question__icon fa-plus-circle"></i>新增选项</p>
                  <ul class="right">
                    <li class="question__btn btn question__item-moveUp left">
                      <i class="fa question__icon fa-arrow-circle-o-up"></i>上移</li>
                    <li class="question__btn btn question__item-moveDown left">
                      <i class="fa question__icon fa-arrow-circle-o-down"></i>下移</li>
                    <li class="question__btn btn question__item-copy left">
                      <i class="fa question__icon fa-copy"></i>复用</li>
                    <li class="question__btn btn question__item-delete left">
                      <i class="fa question__icon fa-trash-o"></i>删除</li>
                  </ul>
                </div>
              </div> `;

    $(".question").append(multi_html);
    // 题目的移入移出，控制操作按钮的显示或隐藏
    _this.questionMouseEvent();
    // 准备问题的操作按钮
    _this.prepareQuestionActionBtn(question);
  },
  /**
   * 添加文本题
   */
  addTextType: function (question) {
    var _this = this;
    // 该题的顺序
    var question_order = "Q" + question.order;
    // 单选题字符串
    var text_html = ` <div class="js-question__item question__item question__item-text" data-order="${
      question.order
    }" data-qtype="${question.qtype}">
                <h4 class="question__title">
                  <label class="question__title-order">${question_order}</label>
                  <input type="text" class="question__title-stem" value="文本题"></input>
                </h4>
                <p class="question__message">
                  <input class="question__message-checkbox" id="required" type="checkbox">
                  <label class="question__message-label" for="required">此题是否必填</label>
                </p>
                <div class="question__option-item">
                  <textarea class="question__option-textarea" name="" id="" cols="30" rows="10" disabled>

                  </textarea>
                </div>
                <div class="question__action-buttons clearfix">
                  <ul class="right">
                    <li class="question__btn btn question__item-moveUp left">
                      <i class="fa question__icon fa-arrow-circle-o-up"></i>上移</li>
                    <li class="question__btn btn question__item-moveDown left">
                      <i class="fa question__icon fa-arrow-circle-o-down"></i>下移</li>
                    <li class="question__btn btn question__item-copy left">
                      <i class="fa question__icon fa-copy"></i>复用</li>
                    <li class="question__btn btn question__item-delete left">
                      <i class="fa question__icon fa-trash-o"></i>删除</li>
                  </ul>
                </div>
              </div>`;

    $(".question").append(text_html);
    // 题目的移入移出，控制操作按钮的显示或隐藏
    _this.questionMouseEvent();
    // 准备问题的操作按钮
    _this.prepareQuestionActionBtn(question);
  },
  /**
   * 准备操作按钮
   */
  prepareQuestionActionBtn: function (question) {
    // 存储 page 对象
    var _this = this;
    // 取得当前题目的 order，但是后面删除题目，会更新这个值。需要随时获取
    let questioin_order = question.order;
    // 取得所有的问题操作按钮容器
    let $question_action_btn = $(".question__action-buttons");
    if ($question_action_btn.length === 0) return false;

    /* === 题目上移 === */
    $question_action_btn.find(".question__item-moveUp").
    unbind('click').bind('click', function (event) {
      // 禁止冒泡
      event.stopPropagation();
      // 找到当前题目
      let $current_question = $(this).parents(".question__item");
      // 取得当前题目的顺序，这里取出来是字符串
      let questioin_order = parseInt($current_question.attr("data-order"));
      // 取得所有题目
      let questions = $(".question").children(".question__item");

      if (questioin_order === 1) {
        console.log('第一题？');
        // 第一题
        alert("当前题目是第一题，不能上移哟！");
      } else {
        // 找到该题目的上一题
        let $prev_question = $current_question.prev();
        // 移动当前题目到上一题的前面
        $current_question.after($prev_question);
        // 更新问题的 order
        _this.updateQuestionOrder();
      }
    });

    /* === 题目下移 === */
    $question_action_btn.find(".question__item-moveDown").
    unbind('click').bind('click', function (event) {
      // 找到当前题目
      let $current_question = $(this).parents(".question__item");
      // 取得当前题目的顺序，这里取出来是字符串，所以比较的时候，使用 ==
      let questioin_order = parseInt($current_question.attr("data-order"));
      // 取得所有题目
      let questions = $(".question").children(".question__item");

      if (questioin_order === questions.length) {
        // 最后一题
        alert("当前题目是最后一题，不能下移哟！");
      } else {
        // 找到当前题目的下一题
        let $next_question = $current_question.next();
        // 移动当前题目到下一题的后面
        $next_question.after($current_question);
        // 更新问题的 order
        _this.updateQuestionOrder();
      }

    });

    /* === 题目复用 === */
    $question_action_btn.find(".question__item-copy").
    unbind('click').bind('click', function (event) {
      // 找到当前题目
      let $current_question = $(this).parents(".question__item");
      // 复制当前的题目及它的所有子元素、绑定事件
      let $clone_question = $current_question.clone(true, true);
      // 插入到该题目的后面
      $current_question.after($clone_question);
      // 更新问题的 order
      _this.updateQuestionOrder();

    });

    /* === 题目删除 ==== */
    // 从问题列表中删除
    $question_action_btn.find(".question__item-delete").
    unbind('click').bind('click', function (event) {
      $(this)
        .parents(".question__item") // 找到当前的题目
        .remove(); // 从 DOM 中移除
      // 更新问题的 order
      _this.updateQuestionOrder();

      // 防止触发两次单击事件
      return false;
    });

    /* === 新增选项 === */
    /* === 删除选项 === */
  },

  /**
   * 题目的移入移出事件
   */
  questionMouseEvent: function () {
    // 找到每道题目
    let question_item = $(".js-question__item");
    if (question_item.length === 0) return false;
    $(".question__btn") // 找到所有的操作按钮
      .css("visibility", "hidden"); // 显示
    // 鼠标移入，显示出该题目相关的操作按钮
    question_item.mouseover(function () {
      $(this)
        .find(".question__btn") // 找到所有的操作按钮
        .css("visibility", "visible"); // 显示
    });
    question_item.mouseout(function () {
      $(this)
        .find(".question__btn") // 找到所有的操作按钮
        .css("visibility", "hidden"); // 显示
    });
  },
  /**
   * 更新当前题目的顺序
   */
  updateQuestionOrder: function () {
    // 1. 查询当前的问题的数量
    // 2. 如果为0，则返回 order = 1
    // 3.1 如果不为0，则返回当前 order = sum
    // 3.2 如果不为0，重置当前问题所有的 order 值，从 1 开始依次赋值，更新。
    // 可以适用于 复用、删除、上移、下移、新增题目
    let questions = $(".question").children(".question__item");
    // 声明题目的顺序
    let order = 0;
    if (questions.length <= 0) {
      order = 1;
    } else {
      order = questions.length + 1;
      // 更新所有问题的 order
      questions.each(function (index) {
        let order = "Q" + (index + 1);
        // 同时更新 data-order 的值
        $(this).attr("data-order", index + 1);
        $(this)
          .find(".question__title-order") // 找到问题顺序标签
          .html(order); // 改变它的 nodeValue 值
      });
    }

    return order;
  },
  /**
   * 更新选项
   */
  /**
   * 日期的处理
   */
  /**
   * 加载当前的问题列表
   */
  loadQuestionList: function () {}
};

$(document).ready(function () {
  page.init();
});