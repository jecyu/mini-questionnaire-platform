const key = "test";

// 新增问卷的id
let newId = 3;
let data = {};

let _store = {
  // 初始化数据
  data: {
    // 用户列表
    userlist: [
      {
        // 用户id
        id: 1,
        // 用户名
        name: "admin",
        // 拥有的问卷id
        own: [1, 2]
      }
    ],
    // 问卷列表
    questionnaireList: [
      {
        // 全局唯一id
        id: 1,
        // 拥有者id
        owner: 1,
        // 问卷标题
        title: "大学生微信表情的使用情况调查问卷",
        // 问卷状态:有"draft","released","closed"三种
        state: "released",
        // 发布日期
        releaseDate: "11/11/2017",
        // 截止日期
        deadline: "11/31/2017",
        // 问题列表
        questionList: [
          {
            order: 1,
            stem: "你的性别是",
            qtype: "single",
            required: true,
            options: [
              {
                id: 1,
                content: "男"
              },
              {
                id: 2,
                content: "女"
              }
            ]
          },
          {
            order: 2,
            stem: "你的年级是",
            qtype: "single",
            required: true,
            options: [
              {
                id: 1,
                content: "大一"
              },
              {
                id: 2,
                content: "大二"
              },
              {
                id: 3,
                content: "大三"
              },
              {
                id: 4,
                content: "大四"
              },
              {
                id: 5,
                content: "研究生以上"
              }
            ]
          },
          {
            order: 3,
            stem: "你的专业是",
            qtype: "single",
            required: true,
            options: [
              {
                id: 1,
                content: "理工类"
              },
              {
                id: 2,
                content: "文史类"
              },
              {
                id: 3,
                content: "其他"
              }
            ]
          },
          {
            order: 4,
            stem: "你曾通过哪些途径获取微信表情",
            qtype: "multi",
            required: true,
            options: [
              {
                id: 1,
                content: "自己制作"
              },
              {
                id: 2,
                content: "保存好友发送的表情"
              },
              {
                id: 3,
                content: "在表情商店下载免费表情"
              },
              {
                id: 4,
                content: "在表情商店下载付费表情"
              },
              {
                id: 5,
                content: "其他"
              }
            ]
          },
          {
            order: 5,
            stem: "你使用微信表情的题材有",
            qtype: "multi",
            required: true,
            options: [
              {
                id: 1,
                content: "动漫明星"
              },
              {
                id: 2,
                content: "动漫人物"
              },
              {
                id: 3,
                content: "纯文字类"
              },
              {
                id: 4,
                content: "身边的人"
              },
              {
                id: 5,
                content: "美食"
              },
              {
                id: 6,
                content: "其它"
              }
            ]
          },
          {
            order: 6,
            stem: "你觉得微信表情包有什么不足？",
            qtype: "text",
            required: false,
            options: []
          }
        ],
        // 作答者
        respondents: [
          [1, 2, 2, [1, 3, 5], [1, 2, 3], "可以增加多点内容，nice!"],
          [1, 3, 3, [2, 3, 4], [1, 5], "无可奉告"],
          [2, 3, 1, [2, 4, 5], [2, 4, 5, 6], ""],
          [2, 1, 2, [1, 3, 4], [1, 2, 3, 5], ""],
          [2, 2, 1, [1, 2, 4, 5], [2, 3, 4], ""],
          [2, 3, 1, [2, 3, 4], [2, 4], ""],
          [2, 2, 3, [2, 3, 4], [1, 4], ""],
          [1, 1, 1, [1, 3, 5], [1, 2, 3], ""],
          [1, 2, 3, [1, 3, 5], [1, 2, 3, 6], ""],
          [1, 3, 2, [1, 3, 5], [1, 2, 3], ""],
          [2, 2, 2, [2, 3, 5], [2, 3, 4, 5], ""],
          [2, 2, 1, [2, 3, 5], [2, 3, 4, 5], ""],
          [2, 3, 3, [2, 3, 5], [4, 5], ""],
          [2, 3, 1, [2, 3, 5], [2, 3, 5, 6], ""],
          [2, 2, 1, [2, 3, 5], [2, 3, 4, 5, 6], ""]
        ]
      },
      {
        // 全局唯一id
        id: 2,
        // 拥有者id
        owner: 1,
        // 问卷标题
        title: "大学生求职就业取向调查问卷",
        // 问卷状态:有"draft","released","closed"三种
        state: "draft",
        // 发布日期
        releaseDate: null,
        // 截止日期
        deadline: null,
        // 问题列表
        questionList: [
          {
            order: 1,
            stem: "认为现在形势如何？",
            qtype: "single",
            required: true,
            options: [
              {
                id: 1,
                content: "形势严峻，就业难"
              },
              {
                id: 2,
                content: "形势正常"
              },
              {
                id: 3,
                content: "形势较好，就业容易"
              },
              {
                id: 4,
                content: "不了解"
              }
            ]
          },
          {
            order: 2,
            stem: "你为什么选择当前专业？",
            qtype: "single",
            required: true,
            options: [
              {
                id: 1,
                content: "父母意见"
              },
              {
                id: 2,
                content: "社会热点"
              },
              {
                id: 3,
                content: "调剂"
              },
              {
                id: 4,
                content: "自己意愿"
              }
            ]
          },
          {
            order: 3,
            stem: "你现在了解（关注）过自己专业的就业形势吗？",
            qtype: "single",
            required: true,
            options: [
              {
                id: 1,
                content: "了解（关注）"
              },
              {
                id: 2,
                content: "完全不了解（完全不关注）"
              },
              {
                id: 3,
                content: "略知一二"
              }
            ]
          },
          {
            order: 4,
            stem: "你认为目前面对就业自己最欠缺是什么",
            qtype: "multi",
            required: true,
            options: [
              {
                id: 1,
                content: "与人沟通协调的能力"
              },
              {
                id: 2,
                content: "专业知识与技能"
              },
              {
                id: 3,
                content: "解决与应对问题的能力"
              },
              {
                id: 4,
                content: "压力的耐受性，在困难中重生的能力"
              },
              {
                id: 5,
                content: "工作经验与社会阅历"
              },
              {
                id: 6,
                content: "一定的外语技能和电脑技能"
              },
              {
                id: 7,
                content: "就业技能与面试技能"
              }
            ]
          },
          {
            order: 5,
            stem: "你期待毕业后第一份工作的薪酬是多少？",
            qtype: "multi",
            required: true,
            options: [
              {
                id: 1,
                content: "3000-4000元"
              },
              {
                id: 2,
                content: "对社会认知不够"
              },
              {
                id: 3,
                content: "对未来目标不明"
              },
              {
                id: 4,
                content: "对就业准备不当"
              }
            ]
          },
          {
            order: 6,
            stem: "对于当代大学生您还有什么其他想法",
            qtype: "text",
            required: false,
            options: []
          }
        ],
        // 作答者
        respondents: []
      }
    ]
  },
  /**
   * 初始化数据
   */
  initData: function() {
    localStorage.setItem(key, JSON.stringify(this.data));
  },
  /**
   * 获取本地数据
   */
  fetch: function() {
    return JSON.parse(localStorage.getItem(key));
  },
  /**
   * 获取指定问卷
   * @param {number} qid 问卷id
   */
  fetchquestionnaire: function(qid) {
    let localdata = this.fetch();
    for (let i = 0, len = localdata.length; i < len; i++) {
      if (localdata.questionnaireList[i] === qid) {
        return localdata.questionnaireList[i];
      }
    }
  },
  /**
   * 新增问卷
   * @param {Number} o 问卷所有者
   * @return {Number} 新问卷的标识
   */
  addQuestionnaire: function(o) {
    let q = {
      id: newId++,
      owner: o,
      title: "我的问卷",
      state: "draft",
      releaseDate: null,
      deadline: null,
      questionList: [],
      respondents: []
    };
    this.data.questionnaireList.push(q);
    localStorage.setItem(key, JSON.stringify(this.data));
    return q.id;
  },
  /**
   * 删除问卷
   * @param {Number} qid 问卷标识
   */
  deleteQuestionnaire: function(qid) {
    let _this = this;
    for (let i = 0; i < _this.data.questionnaireList.length; i++) {
      if (_this.data.questionnaireList[i].id === qid) {
        _this.data.questionnaireList.splice(i, 1);
        localStorage.setItem(key, JSON.stringify(_this.data));
        return true;
      }
    }
    return false;
  },
  /**
   * 保存问卷
   * @param {*} qid 问卷唯一标识，不可更改
   * @param {*} title 问卷标题
   * @param {*} deadline 问卷截至日期
   * @param {*} questionList 问卷问题列表
   */
  saveQuestionnaire: function(qid, title, deadline, questionList) {
    var _this = this;
    for (let i = 0; i < _this.data.questionnaireList.length; i++) {
      if (_this.data.questionnaireList[i].id === qid) {
        _this.data.questionnaireList[i].title = title;
        _this.data.questionnaireList[i].deadline = deadline;
        _this.data.questionnaireList[i].questionList = questionList;
        localStorage.setItem(key, JSON.stringify(_this.data));
        return true;
      }
    }
    return false;
  },

  /**
   * 发布问卷
   * @param {*} qid 问卷标识
   */
  releaseQuestionnaire: function(qid) {
    let _this = this;
    let current = new Date();
    for (let i = 0; i < _this.data.questionnaireList.length; i++) {
      if (_this.data.questionnaireList[i].id === qid) {
        // 是否满足发布要求：设置了截至日期，且至少有一道问题
        if (_this.data.questionnaireList[i].deadline === null) {
          return "please set a deadline";
        } else if (_this.data.questionnaireList[i].questionList.length === 0) {
          return "Empty question list";
        }
        _this.data.questionnaireList[i].state = "released";
        _this.data.questionnaireList[i].releaseDate =
          current.getMonth() +
          1 +
          "/" +
          current.getDate() +
          "/" +
          current.getFullYear();
        localStorage.setItem(key, JSON.stringify(_this.data));
        return true;
      }
    }
  },

  /**
   * 回答问卷
   * @param {*} qid 问卷标识
   * @param {*} ans 对每道题的作答
   */
  sumbitAnswer: function(qid, ans) {
    for (let i = 0; i < _this.data.questionList.length; i++) {
      if (_this.data.questionnaireList[i].id === qid) {
        _this.data.questionnaireList[i].respondents.push(ans);
        localStorage.setItem(key, JSON.stringify(_this.data));
        return true;
      }
    }
  }
};

module.exports = _store;
