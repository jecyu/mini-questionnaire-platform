// 逻辑处理service负责ajax地址请求，index.js负责渲染、传参数
    // 1.ajax获取问卷列表
    // 2.ajax获取问卷详细信息 

let _mq = require('util/mq.js');
    
let _questionnaire = {
    // 获取问卷列表
    getQuestList: function(listParam, resolve, reject) {
        _mq.request({
            url: _mq.getServerUrl('https://easy-mock.com/mock/5a15609724f7a9469678a714/mnq_1511350423448/survey/list.do'),
            data: listParam,
            method: 'get',
            success: resolve,
            error: reject          
        });     
    },
    // 
    getQuestDetail: function(questionnaireId, resolve, reject) {
        _mq.request({
            url: _mq.getServerUrl('https://easy-mock.com/mock/5a15609724f7a9469678a714/mnq_1511350423448/survey/detail.do'),
            data: {
                questionnaireId: questionnaireId
            },
            success: resolve,
            error: reject
        });
    }
};

module.exports = _questionnaire;
