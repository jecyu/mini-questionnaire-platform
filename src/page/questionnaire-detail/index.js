/*
 * @Author: jecyu 
 * @Date: 2018-01-28 19:04:21 
 * @Last Modified by: jecyu
 * @Last Modified time: 2018-02-13 23:21:44
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
  init: function() {
    this.onLoad();
  },
  onLoad: function() {
    // 获取当前问卷的 id
    const questionnaire_id = _mq.getUrlParam("questionnaireId");
    // 加载当前问卷
    this.loadCurrentQuest(questionnaire_id);

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

    /* === 添加单选题 === */
    $btns_qtype.on("click", "#js-single", function() {
      // 声明一个问题对象
      let question = {
        order: _this.updateQuestionOrder(),
        stem: "单选题",
        qtype: "single",
        required: false,
        options: [
          {
            id: 1,
            content: "选项1"
          },
          {
            id: 2,
            content: "选项2"
          }
        ]
      };
      _this.addSingleType(question);
    });

    /* === 添加多选题 === */
    $btns_qtype.on("click", "#js-multi", function() {
      // 声明一个问题对象
      let question = {
        order: _this.updateQuestionOrder(),
        stem: "多选题",
        qtype: "multi",
        required: false,
        options: [
          {
            id: 1,
            content: "选项1"
          },
          {
            id: 2,
            content: "选项2"
          }
        ]
      };
      _this.addMultiType(question);
    });

    /* === 添加文本题 === */
    $btns_qtype.on("click", "#js-textarea", function() {
      // 声明一个问题对象
      let question = {
        order: _this.updateQuestionOrder(),
        stem: "文本题",
        qtype: "text",
        required: false,
        options: []
      };
      _this.addTextType(question);
    });

    /* ========================== 保存问卷 ================================ */
    $(".mod-quest__foot").on("click", ".js-btn--save", function() {
      // 保存问卷
      _this.saveQuestionnaire();
    });

    /* ========================== 发布问卷 ================================ */
    $(".mod-quest__foot").on("click", ".js-btn--submit", function() {
      // 取得当前的截至日期
      const deadline_date = $("#datepicker").val();
      // 如果不满足截止日期大于当前日期，则返回 false
      if (!_this.isProperDate(deadline_date)) {
        alert("问卷截止日期不能小于当前日期哦！");
        return false;
      }
      // 发布问卷
      _this.releaseQuestionnaire();
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
    // 判断问卷列表是否为空，用在hogan渲染模版
    data.notEmpty = !!data.questionList.length;

    // 过滤处理问题类型
    for (let i = 0, len = data.questionList.length; i < len; i++) {
      // 单选题
      if (data.questionList[i].qtype == "single") {
      }
      // 多选题
      if (data.questionList[i].qtype == "multi") {
      }
      // 文本题
      if (data.questionList[i].qtype == "text") {
      }
    }
  },

  /**
   * 添加单选题
   * @param {string} question_order 问题顺序
   */
  addSingleType: function(question) {
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
                      <input class="question__option-input" type="text" value="选项1">
                    </label>
                    <span class="question__btn btn question__option-del">
                      <i class="question__icon fa fa-trash-o"></i>删除</span>
                  </li>
                  <li class="question__option-item">
                    <input class="question__option-radio" type="radio" name="single" disabled>
                    <label class="question__option-label" for="">
                      <input class="question__option-input" type="text" value="选项2">
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
  },
  /**
   * 添加多选题
   */
  addMultiType: function(question) {
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
                      <input class="question__option-input" type="text" value="选项1">
                    </label>
                    <span class="question__btn btn question__option-del">
                      <i class="question__icon  fa fa-trash-o"></i>删除</span>
                  </li>
                  <li class="question__option-item">
                    <input class="question__option-checkbox" type="checkbox" disabled>
                    <label class="question__option-label" for="">
                      <input class="question__option-input" type="text" value="选项2">
                    </label>
                    <span class="question__btn btn question__option-del">
                      <i class="question__icon  fa fa-trash-o"></i>删除</span>
                  </li>
                  <li class="question__option-item">
                    <input class="question__option-checkbox" type="checkbox" disabled>
                    <label class="question__option-label" for="">
                      <input class="question__option-input" type="text" value="选项3">
                    </label>
                    <span class="question__btn btn question__option-del">
                      <i class="question__icon  fa fa-trash-o"></i>删除</span>
                  </li>
                  <li class="question__option-item">
                    <input class="question__option-checkbox" type="checkbox" disabled>
                    <label class="question__option-label" for="">
                      <input class="question__option-input" type="text" value="选项4">
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
  addTextType: function(question) {
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
   * @param {object} question 新增的问题
   */
  prepareQuestionActionBtn: function(question) {
    // 存储 page 对象
    var _this = this;
    // 取得当前题目的 order，但是后面删除题目，会更新这个值。需要随时获取
    let questioin_order = question.order;
    let question__type = question.qtype;
    // 取得所有的问题操作按钮容器
    const $question_action_btn = $(".question__action-buttons");
    if ($question_action_btn.length === 0) return false;

    /* ====================== 题目上移 ====================== */
    $question_action_btn
      .find(".question__item-moveUp")
      .unbind("click")
      .bind("click", function(event) {
        // 禁止冒泡
        event.stopPropagation();
        // 找到当前题目
        let $current_question = $(this).parents(".question__item");
        // 取得当前题目的顺序，这里取出来是字符串
        let questioin_order = parseInt($current_question.attr("data-order"));
        // 取得所有题目
        let questions = $(".question").children(".question__item");

        if (questioin_order === 1) {
          console.log("第一题？");
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

    /* ====================== 题目下移 ==================== */
    $question_action_btn
      .find(".question__item-moveDown")
      .unbind("click")
      .bind("click", function(event) {
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

    /* ===================== 题目复用 ========================== */
    $question_action_btn
      .find(".question__item-copy")
      .unbind("click")
      .bind("click", function(event) {
        // 找到当前题目
        let $current_question = $(this).parents(".question__item");
        // 复制当前的题目及它的所有子元素、绑定事件
        let $clone_question = $current_question.clone(true, true);
        // 插入到该题目的后面
        $current_question.after($clone_question);
        // 更新问题的 order
        _this.updateQuestionOrder();
      });

    /* =================== 题目删除 ========================= */

    // 从问题列表中删除
    $question_action_btn
      .find(".question__item-delete")
      .unbind("click") // 防止触发两次单击事件
      .bind("click", function(event) {
        $(this)
          .parents(".question__item") // 找到当前的题目
          .remove(); // 从 DOM 中移除
        // 更新问题的 order
        _this.updateQuestionOrder();
      });

    /* ============================ 删除选项 ======================== */
    _this.deleteOption();

    /* ========================= 新增选项 ============================== */
    // 单选题的选项字符串模版
    let single_optionHtml = ``;
    let single_option = ``;
    // 找到新增选项的按钮
    let option_install_btns = $(".question__option-install");
    // 选项字符串数组（把多项和单选模版放到数组里 ）
    const option_html_object = {
      single: "",
      multi: "",
      order: 0
    };
    // option_html_object.single = ` <li class="question__option-item">
    //     <input class="question__option-radio" type="radio" name="single" disabled>
    //     <label class="question__option-label" for="">
    //       <input type="text" value="${'选项' + option_html_object.order}">
    //     </label>
    //     <span class="question__btn btn question__option-del">
    //       <i class="question__icon fa fa-trash-o"></i>删除</span>
    //   </li>`;
    // option_html_object.multi = `     <li class="question__option-item">
    //     <input class="question__option-checkbox" type="checkbox" disabled>
    //     <label class="question__option-label" for="">
    //       <input type="text" value="${'选项' + option_html_object.order}">
    //     </label>
    //     <span class="question__btn btn question__option-del">
    //       <i class="question__icon  fa fa-trash-o"></i>删除</span>
    //   </li>`;

    // 绑定单击新增选项事件
    option_install_btns.each(function(index) {
      $(this)
        .unbind("click") // 防止二次触发
        .bind("click", function() {
          // 取得当前所有选项
          let options = $(this)
            .parents(".question__action-buttons")
            .siblings(".question__option") //  找到选项的容器
            .children(); // 取得里面的子元素
          // 更新选项的顺序
          option_html_object.order = options.length + 1;

          // 声明一个模版字符串
          let option_html = "";
          // 判断当前的类型
          // 单选题
          if (question__type === "single") {
            option_html = ` <li class="question__option-item">
        <input class="question__option-radio" type="radio" name="single" disabled>
        <label class="question__option-label" for="">
          <input class="question__option-input" type="text" value="${"选项" +
            option_html_object.order}">
        </label>
        <span class="question__btn btn question__option-del">
          <i class="question__icon fa fa-trash-o"></i>删除</span>
      </li>`;
          }
          // 多选题
          if (question__type === "multi") {
            option_html = `     <li class="question__option-item">
        <input class="question__option-checkbox" type="checkbox" disabled>
        <label class="question__option-label" for="">
          <input class="question__option-input" type="text" value="${"选项" +
            option_html_object.order}">
        </label>
        <span class="question__btn btn question__option-del">
          <i class="question__icon  fa fa-trash-o"></i>删除</span>
      </li>`;
          }

          // 找到当前选项的父容器
          $(this)
            .parents(".question__action-buttons")
            .siblings(".question__option") // 找到选项的容器
            .append(option_html); // 插入新的选项

          // 绑定选项的单击删除事件
          _this.deleteOption();
        });
    });
  },

  /**
   * 题目的移入移出事件
   */
  questionMouseEvent: function() {
    // 找到每道题目
    let question_item = $(".js-question__item");
    if (question_item.length === 0) return false;
    $(".question__btn") // 找到所有的操作按钮
      .css("visibility", "hidden"); // 显示
    // 鼠标移入，显示出该题目相关的操作按钮
    question_item.mouseover(function() {
      $(this)
        .find(".question__btn") // 找到所有的操作按钮
        .css("visibility", "visible"); // 显示
    });
    question_item.mouseout(function() {
      $(this)
        .find(".question__btn") // 找到所有的操作按钮
        .css("visibility", "hidden"); // 显示
    });
  },
  /**
   * 更新当前题目的顺序
   */
  updateQuestionOrder: function() {
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
      questions.each(function(index) {
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
   * 删除选项
   */
  deleteOption: function() {
    // 存储 page 对象
    const _this = this;
    // 找到删除选项的按钮
    let option_delete_btns = $(".question__option-del");

    // 绑定单击删除选项事件
    option_delete_btns.each(function(index) {
      $(this)
        .unbind("click") // 防止二次触发
        .bind("click", function() {
          // 找到它的父元素选项
          let $cur_option = $(this).parent();
          // 从 DOM 树中移除
          $cur_option.remove();
        });
    });
  },
  /**
   * 更新当前选项的 id
   * @param {object} question 当前问题
   */
  updateOptionId: function(question) {
    // 1. 查询当前的选项的数量。==》不用更新，直接保存问卷或发布问卷存储即可
    // 2. 如果为0，则返回 id = 1
    // 3.1 如果不为0，则返回当前 id = sum
    // 3.2 如果不为0，重置当前问题所有选项 的 id 值，从 1 开始依次赋值，更新。
    // 可以适用于 新增、删除选项
    let options = question.children(".question__option-item");
    // 声明选项的顺序
    let option_id = 0;
    if (options.length <= 0) {
      option_id = 1;
    } else {
      option_id = options.length + 1;
      // 更新所有问题的 order
      options.each(function(index) {
        // let option_id = "选项" + (index + 1);
        // 更新 data-id 的值
        $(this).attr("data-id", index + 1);
      });
    }

    return option_id;
  },

  /**
   * 判断当前截至日期的正确性
   * @param {object} +deadlineDate 截至日期
   * @returns {boolean} 布尔值
   */
  isProperDate: function(deadlineDate) {
    // 分别存进deadline数组中
    const deadline = deadlineDate.split("-"),
      deadline_yy = deadline[0],
      deadline_mm = deadline[1],
      deadline_dd = deadline[2];
    // 取得当前日期
    const now = new Date(),
      yy = now.getFullYear(),
      mm = now.getMonth() + 1,
      dd = now.getDate();

    // 判断是否早于当前日期
    if (
      deadline_yy < yy ||
      (deadline_yy == yy && deadline_mm < mm) ||
      (deadline_yy == yy && deadline_mm == mm && deadline_dd < dd)
    ) {
      return false;
    } else {
      return true;
    }
  },
  /**
   * 保存问卷
   */
  saveQuestionnaire: function() {
    const _this = this;
    // 1.从 localStorage 中获取当前新建的问卷
    // let current_quest =
    //   _store.data.questionnaireList[_store.data.questionnaireList.length - 1];
    // 定义一个问题列表
    let questionList = [];

    // 2.存储当前问卷标题 title
    let quest_title = $(".mod-quest .mod-quest__title").val();
    // current_quest.title = quest_title;

    // 3.存储问卷截至日期 deadline
    // 取得当前的截至日期
    const deadline_date = $("#datepicker").val();
    // current_quest.deadline = deadline_date;

    // 4.存储问卷问题列表 questionList

    // 4.1 遍历该问卷所有题目
    // 取得所有题目
    let questions = $(".question .js-question__item");

    /* === 遍历所有题目 === */
    questions.each(function() {
      // 新建一个问题对象
      let question = {
        order: 1,
        stem: "",
        qtype: "",
        required: false,
        options: []
      };

      // 存储当前题目的顺序
      question.order = $(this).attr("data-order");
      // 存储当前题目标题
      questions.stem = $(this)
        .find(".question__title-stem") // 找到当前题目的标题
        .val(); // 取得输入框里的 值
      // 存储当前题目的类型
      question.qtype = $(this).attr("data-qtype");
      // 存储当前题目的必填状态
      if (
        $(this)
          .find("input.question__message-checkbox") // 取得复选框
          .is(":checked")
      ) {
        // 是否选中
        question.required = true;
      } else {
        question.required = false;
      }
      // 存储当前题目的选项
      let question_options = $(this).find(".question__option-item");
      /* === 遍历所有选项 === */
      question_options.each(function(index) {
        // 新建一个选项对象
        let option = {
          id: 1,
          content: ""
        };
        option.id = index + 1;
        option.content = $(this)
          .find(".question__option-input") // 找到选项的输入框
          .val(); // 取得输入框里的值

        // 存储当前题目的选项中
        // 存储进选项容器
        question.options[question.options.length] = option;
      });

      // 把当前问题存储进当前问卷中
      // current_quest.questionList.push(question);
      questionList.push(question);
    });

    // id, title, deadline, questionList 存进 localStorage中
    _store.saveQuestionnaire(
      _this.data.new_quest_id,
      quest_title,
      deadline_date,
      questionList
    );

    // 打印本地数据
    console.log(_store.fetch().questionnaireList);
  },
  /**
   * 发布问卷
   */
  releaseQuestionnaire: function() {
    let _this = this;
    // 先保存问卷
    _this.saveQuestionnaire();
    // 调用 store 里的发布问卷函数
    let res = _store.releaseQuestionnaire(_this.data.new_quest_id);
    // 反馈
    if (res === true) {
      alert("问卷发布成功！");
    } else {
      alert(res);
    }
  }
};

$(document).ready(function() {
  page.init();
});
