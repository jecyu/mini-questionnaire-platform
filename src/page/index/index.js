/**
 * @Author: Jecyu
 * @Date: 2017-10-23 10:38:07 am
 * @Modified By: JeCyu
 * @Last Modified time: 2017-11-20 12:01:05 pm
 */
// localstorage

"use strict";

require("./index.scss");
require("page/common/index.js");
// 引入localStore模块
let _store = require("mocks/store.js");
let _mq = require("util/mq.js");
let _filter = require("util/Filters/filter.js");
let templateIndex = require("./index.string");

// 逻辑
// 1.通过localStorage获取mock数据，通过hogan来动态渲染
// 2.实现单条删除以及全选删除逻辑，选中图标的状态切换
// 3.判断发布状态，决定“发布中”添加特殊颜色，选择渲染“查看问卷”或“查看数据”
// console.log(_store.data);

let page = {
  // 初始化
  init: function() {
    this.onLoad();
  },
  onLoad: function() {
    this.loadList();
    this.bindEvent();
  },
  bindEvent: function() {
    var _this = this;
    // 禁用锚按钮
    $("body").on("click", "a.btn--is-disabled", function noBubbling(event) {
      // 禁止 a 链接的默认行为
      event.preventDefault();
    });
    // 添加 disabled 方法到 jQuery对象中，以便链式调用
    jQuery.fn.extend({
      disable: function(state) {
        return this.each(function() {
          var $this = $(this);
          $this.toggleClass("btn--is-disabled", state);
        });
      }
    });

    /*
     * 单条问卷的选择、取消选择
     */
    $("body").on("click", ".quest-select", function(event) {
      // 禁止冒泡
      event.stopPropagation();

      let $this = $(this);
      // 取得当前问卷的 id
      let quest_id = $this.parents(".quest-item").data("quest-id");
      // 取得所有的 问卷select 按钮
      let quest_selects = $(".quest-select");
      // 取得全选 select 按钮
      let quest_selectAll = $(".quest-select-all");
      // 取得全选的 “删除” 按钮
      let quest_delAll = quest_selectAll
        .parents(".quest-footer")
        .find(".btn-deleteAll");
      // 全部选择标识符
      let is_selectAll = true;

      console.log(quest_id);
      // 判断是否已经全选
      quest_selects.each(function() {
        if (!$(this).prop("checked")) {
          is_selectAll = false;
        }
      });
      // 若全选，则给予全选按钮 checked
      if (is_selectAll) {
        quest_selectAll.prop("checked", true);
        quest_delAll.disable(false);
      } else {
        quest_selectAll.prop("checked", false);
        quest_delAll.disable(true);
      }

      // 找到该条问卷操作按钮
      let opera_btns = $this.parents(".quest-item").find("a.btn");
      // 复选框状态改变
      $(this).change(function() {
        // 选中状态，释放操作按钮
        if ($this.prop("checked")) {
          opera_btns.each(function() {
            $(this).disable(false);
          });
        } else {
          opera_btns.each(function() {
            $(this).disable(true);
          });
        }
      });
    });

    /**
     * 问卷的全选、取消全选
     * 全选删除逻辑
     */
    $("body").on("click", ".quest-select-all", function(event) {
      let $this = $(this);
      event.stopPropagation();

      // 找到所有的选择条目选框
      let quest_selects = $(".quest-select");
      // 获取到所有的问卷条目
      let quest_items = $(".quest-item");
      // 找到所有的操作按钮
      let opera_btns = $(".questionnaire-list").find(".btn");

      // 选中状态，释放操作按钮
      if ($this.prop("checked")) {
        opera_btns.each(function() {
          $(this).disable(false);
        });

        // 选择所有的条目 checked
        quest_selects.each(function() {
          $(this).prop("checked", true);
        });

        // 实现全选删除
        let btn_deleteAll = $(".quest-footer").find(".btn-deleteAll");
        btn_deleteAll.click(function delAllQuest() {
          // 二次确认是否删除
          if (!confirm("是否删除所有问卷？")) return false;
          quest_items.each(function() {
            // 从 DOM 中移除
            $(this).remove();
            let quest_id = $(this).data("quest-id");
            // 从 localStorge 中移除
            _store.deleteQuestionnaire(quest_id);
            // console.log(_store.fetch());
          });

          // 重新获取问卷列表，重新渲染视图
          _this.loadList();
        });
      } else {
        opera_btns.each(function() {
          $(this).disable(true);
          // 取消选择所有的条目 checked
          quest_selects.each(function() {
            $(this).prop("checked", false);
          });
        });
      }
    });

    /*
     * 实现单条问卷删除
     */

    $("body").on("click", ".btn-delete", function delQuest(event) {
      // 禁用 a 的默认行为
      event.preventDefault();

      // 取得当前问卷的选择状态
      let isChecked = $(this)
        .parents(".quest-item")
        .find(".quest-select")
        .prop("checked");
      // 取得当前问卷的 ID
      let quest_id = $(this)
        .parents(".quest-item")
        .data("quest-id");

      // 二次确认是否删除 （todo 用 modal 替换）
      if (!confirm("是否确定删除该问卷？")) return false;
      // 判断是否为 checked
      if (isChecked) {
        // 从 DOM 中移除
        $(this)
          .parents(".quest-item")
          .remove();
        // 从 localdata 中移除
        _store.deleteQuestionnaire(quest_id);
        // console.log(_store.fetch());

        // 重新渲染视图
        _this.loadList();
      }
    });
  },
  /**
   * 加载问卷列表
   */
  loadList: function() {
    let _this = this;
    let questionnaireListHtml = "";
    let $listCon = $(".questionnaire-list");

    // 渲染Html
    _this.filter(_store.data);
    // 存储到本地
    _store.initData();

    questionnaireListHtml = _mq.renderHtml(templateIndex, _store.data);
    $listCon.html(questionnaireListHtml);
  },
  /**
   * 数据匹配,添加flag判断
   * @param data {object}
   */
  filter: function(data) {
    // 判断问卷列表是否为空，用在hogan渲染模版
    data.notEmpty = !!data.questionnaireList.length;

    // 过滤处理发布状态
    for (let i = 0, len = data.questionnaireList.length; i < len; i++) {
      // 添加状态标识
      if (data.questionnaireList[i].state === "released") {
        data.questionnaireList[i].isRelease = true;
      } else {
        data.questionnaireList[i].isRelease = false;
      }
      // 发布状态文本格式处理
      data.questionnaireList[i].stateText = _filter.qStateFormat(
        data.questionnaireList[i].state
      );
      // 日期格式处理
      data.questionnaireList[i].releaseDateText = _filter.pureDate(
        data.questionnaireList[i].releaseDate
      );
    }
  }
};

$(document).ready(function() {
  page.init();
});
