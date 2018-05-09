webpackJsonp([4],[function(t,e,n){"use strict";var i="test",s={data:{userlist:[{id:1,name:"admin",own:[1,2]}],questionnaireList:[{id:1,owner:1,title:"大学生微信表情的使用情况调查问卷",state:"released",releaseDate:"11/11/2017",deadline:"11/31/2017",questionList:[{order:1,stem:"你的性别是",qtype:"single",required:!0,options:[{id:1,content:"男"},{id:2,content:"女"}]},{order:2,stem:"你的年级是",qtype:"single",required:!0,options:[{id:1,content:"大一"},{id:2,content:"大二"},{id:3,content:"大三"},{id:4,content:"大四"},{id:5,content:"研究生以上"}]},{order:3,stem:"你的专业是",qtype:"single",required:!0,options:[{id:1,content:"理工类"},{id:2,content:"文史类"},{id:3,content:"其他"}]},{order:4,stem:"你曾通过哪些途径获取微信表情",qtype:"multi",required:!0,options:[{id:1,content:"自己制作"},{id:2,content:"保存好友发送的表情"},{id:3,content:"在表情商店下载免费表情"},{id:4,content:"在表情商店下载付费表情"},{id:5,content:"其他"}]},{order:5,stem:"你使用微信表情的题材有",qtype:"multi",required:!0,options:[{id:1,content:"动漫明星"},{id:2,content:"动漫人物"},{id:3,content:"纯文字类"},{id:4,content:"身边的人"},{id:5,content:"美食"},{id:6,content:"其它"}]},{order:6,stem:"你觉得微信表情包有什么不足？",qtype:"text",required:!1,options:[]}],respondents:[[1,2,2,[1,3,5],[1,2,3],"可以增加多点内容，nice!"],[1,3,3,[2,3,4],[1,5],"无可奉告"],[2,3,1,[2,4,5],[2,4,5,6],""],[2,1,2,[1,3,4],[1,2,3,5],""],[2,2,1,[1,2,4,5],[2,3,4],""],[2,3,1,[2,3,4],[2,4],""],[2,2,3,[2,3,4],[1,4],""],[1,1,1,[1,3,5],[1,2,3],""],[1,2,3,[1,3,5],[1,2,3,6],""],[1,3,2,[1,3,5],[1,2,3],""],[2,2,2,[2,3,5],[2,3,4,5],""],[2,2,1,[2,3,5],[2,3,4,5],""],[2,3,3,[2,3,5],[4,5],""],[2,3,1,[2,3,5],[2,3,5,6],""],[2,2,1,[2,3,5],[2,3,4,5,6],""]]},{id:2,owner:1,title:"大学生求职就业取向调查问卷",state:"draft",releaseDate:null,deadline:null,questionList:[{order:1,stem:"认为现在形势如何？",qtype:"single",required:!0,options:[{id:1,content:"形势严峻，就业难"},{id:2,content:"形势正常"},{id:3,content:"形势较好，就业容易"},{id:4,content:"不了解"}]},{order:2,stem:"你为什么选择当前专业？",qtype:"single",required:!0,options:[{id:1,content:"父母意见"},{id:2,content:"社会热点"},{id:3,content:"调剂"},{id:4,content:"自己意愿"}]},{order:3,stem:"你现在了解（关注）过自己专业的就业形势吗？",qtype:"single",required:!0,options:[{id:1,content:"了解（关注）"},{id:2,content:"完全不了解（完全不关注）"},{id:3,content:"略知一二"}]},{order:4,stem:"你认为目前面对就业自己最欠缺是什么",qtype:"multi",required:!0,options:[{id:1,content:"与人沟通协调的能力"},{id:2,content:"专业知识与技能"},{id:3,content:"解决与应对问题的能力"},{id:4,content:"压力的耐受性，在困难中重生的能力"},{id:5,content:"工作经验与社会阅历"},{id:6,content:"一定的外语技能和电脑技能"},{id:7,content:"就业技能与面试技能"}]},{order:5,stem:"你期待毕业后第一份工作的薪酬是多少？",qtype:"multi",required:!0,options:[{id:1,content:"3000-4000元"},{id:2,content:"4000-5000元"},{id:3,content:"5000-6000元"},{id:4,content:"6000-7000元"}]},{order:6,stem:"对于当代大学生您还有什么其他想法",qtype:"text",required:!1,options:[]}],respondents:[]}]},initData:function(){localStorage.setItem(i,JSON.stringify(this.data))},fetch:function(){return JSON.parse(localStorage.getItem(i))},fetchQuestionnaire:function(t){for(var e=this.fetch(),n=0,i=e.questionnaireList.length;n<i;n++)if(e.questionnaireList[n].id==t)return e.questionnaireList[n]},addQuestionnaire:function(t,e){var n={id:++e,owner:t,title:"我的问卷",state:"draft",releaseDate:null,deadline:null,questionList:[],respondents:[]},s=this.fetch();return this.data=s,this.data.questionnaireList.push(n),localStorage.setItem(i,JSON.stringify(this.data)),n.id},deleteQuestionnaire:function(t){for(var e=this,n=0;n<e.data.questionnaireList.length;n++)if(e.data.questionnaireList[n].id===t)return e.data.questionnaireList.splice(n,1),localStorage.setItem(i,JSON.stringify(e.data)),!0;return!1},saveQuestionnaire:function(t,e,n,s){var a=this,r=this.fetch();this.data=r;for(var o=0;o<a.data.questionnaireList.length;o++)if(a.data.questionnaireList[o].id==t)return a.data.questionnaireList[o].title=e,a.data.questionnaireList[o].deadline=n,a.data.questionnaireList[o].questionList=s,localStorage.setItem(i,JSON.stringify(a.data)),!0;return!1},releaseQuestionnaire:function(t){for(var e=this,n=new Date,s=0;s<e.data.questionnaireList.length;s++)if(e.data.questionnaireList[s].id==t)return null===e.data.questionnaireList[s].deadline?"是不是忘了设置截至日期啦！":0===e.data.questionnaireList[s].questionList.length?"至少要设置一道问题哦！":(e.data.questionnaireList[s].state="released",e.data.questionnaireList[s].releaseDate=n.getMonth()+1+"/"+n.getDate()+"/"+n.getFullYear(),localStorage.setItem(i,JSON.stringify(e.data)),!0)},sumbitAnswer:function(t,e){var n=this,s=this.fetch();n.data=s;for(var a=0;a<n.data.questionnaireList.length;a++)if(n.data.questionnaireList[a].id==t)return n.data.questionnaireList[a].respondents.push(e),localStorage.setItem(i,JSON.stringify(n.data)),!0}};t.exports=s},function(t,e,n){"use strict";var i=n(2),s={serverHost:""},a={request:function(t){$.ajax({type:t.method||"get",url:t.url||"",dataType:t.type||"json",data:t.data||"",success:function(e){console.log(e.data),"function"==typeof t.success&&t.success(e.data,e.msg)},error:function(e){"function"==typeof t.error&&t.error(e.statusText)}})},getServerUrl:function(t){return s.serverHost+t},getUrlParam:function(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),n=window.location.search.substring(1).match(e);return n?decodeURIComponent(n[2]):null},renderHtml:function(t,e){return i.compile(t).render(e)},goHome:function(){window.location.href="./index.html"},storageAvailable:function(t){try{var e=window[t],n="__storage_test__";return e.setItem(n,n),e.removeItem(n),!0}catch(t){return t instanceof DOMException&&(22===t.code||1014===t.code||"QuotaExceededError"===t.name||"NS_ERROR_DOM_QUOTA_REACHED"===t.name)&&0!==e.length}}};t.exports=a},function(t,e,n){var i=n(3);i.Template=n(4).Template,i.template=i.Template,t.exports=i},function(t,e,n){!function(t){function e(t){"}"===t.n.substr(t.n.length-1)&&(t.n=t.n.substring(0,t.n.length-1))}function n(t){return t.trim?t.trim():t.replace(/^\s*|\s*$/g,"")}function i(t,e,n){if(e.charAt(n)!=t.charAt(0))return!1;for(var i=1,s=t.length;i<s;i++)if(e.charAt(n+i)!=t.charAt(i))return!1;return!0}function s(e,n,i,o){var c=[],l=null,u=null,d=null;for(u=i[i.length-1];e.length>0;){if(d=e.shift(),u&&"<"==u.tag&&!(d.tag in L))throw new Error("Illegal content in < super tag.");if(t.tags[d.tag]<=t.tags.$||a(d,o))i.push(d),d.nodes=s(e,d.tag,i,o);else{if("/"==d.tag){if(0===i.length)throw new Error("Closing tag without opener: /"+d.n);if(l=i.pop(),d.n!=l.n&&!r(d.n,l.n,o))throw new Error("Nesting error: "+l.n+" vs. "+d.n);return l.end=d.i,c}"\n"==d.tag&&(d.last=0==e.length||"\n"==e[0].tag)}c.push(d)}if(i.length>0)throw new Error("missing closing tag: "+i.pop().n);return c}function a(t,e){for(var n=0,i=e.length;n<i;n++)if(e[n].o==t.n)return t.tag="#",!0}function r(t,e,n){for(var i=0,s=n.length;i<s;i++)if(n[i].c==t&&n[i].o==e)return!0}function o(t){var e=[];for(var n in t)e.push('"'+l(n)+'": function(c,p,t,i) {'+t[n]+"}");return"{ "+e.join(",")+" }"}function c(t){var e=[];for(var n in t.partials)e.push('"'+l(n)+'":{name:"'+l(t.partials[n].name)+'", '+c(t.partials[n])+"}");return"partials: {"+e.join(",")+"}, subs: "+o(t.subs)}function l(t){return t.replace(m,"\\\\").replace(g,'\\"').replace(b,"\\n").replace(q,"\\r").replace(v,"\\u2028").replace(y,"\\u2029")}function u(t){return~t.indexOf(".")?"d":"f"}function d(t,e){var n="<"+(e.prefix||""),i=n+t.n+k++;return e.partials[i]={name:t.n,partials:{}},e.code+='t.b(t.rp("'+l(i)+'",c,p,"'+(t.indent||"")+'"));',i}function f(t,e){e.code+="t.b(t.t(t."+u(t.n)+'("'+l(t.n)+'",c,p,0)));'}function h(t){return"t.b("+t+");"}var p=/\S/,g=/\"/g,b=/\n/g,q=/\r/g,m=/\\/g,v=/\u2028/,y=/\u2029/;t.tags={"#":1,"^":2,"<":3,$:4,"/":5,"!":6,">":7,"=":8,_v:9,"{":10,"&":11,_t:12},t.scan=function(s,a){function r(){h.length>0&&(g.push({tag:"_t",text:new String(h)}),h="")}function o(){for(var e=!0,n=m;n<g.length;n++)if(!(e=t.tags[g[n].tag]<t.tags._v||"_t"==g[n].tag&&null===g[n].text.match(p)))return!1;return e}function c(t,e){if(r(),t&&o())for(var n,i=m;i<g.length;i++)g[i].text&&((n=g[i+1])&&">"==n.tag&&(n.indent=g[i].text.toString()),g.splice(i,1));else e||g.push({tag:"\n"});b=!1,m=g.length}var l=s.length,u=0,d=null,f=null,h="",g=[],b=!1,q=0,m=0,v="{{",y="}}";for(a&&(a=a.split(" "),v=a[0],y=a[1]),q=0;q<l;q++)0==u?i(v,s,q)?(--q,r(),u=1):"\n"==s.charAt(q)?c(b):h+=s.charAt(q):1==u?(q+=v.length-1,f=t.tags[s.charAt(q+1)],d=f?s.charAt(q+1):"_v","="==d?(q=function(t,e){var i="="+y,s=t.indexOf(i,e),a=n(t.substring(t.indexOf("=",e)+1,s)).split(" ");return v=a[0],y=a[a.length-1],s+i.length-1}(s,q),u=0):(f&&q++,u=2),b=q):i(y,s,q)?(g.push({tag:d,n:n(h),otag:v,ctag:y,i:"/"==d?b-v.length:q+y.length}),h="",q+=y.length-1,u=0,"{"==d&&("}}"==y?q++:e(g[g.length-1]))):h+=s.charAt(q);return c(b,!0),g};var L={_t:!0,"\n":!0,$:!0,"/":!0};t.stringify=function(e,n,i){return"{code: function (c,p,i) { "+t.wrapMain(e.code)+" },"+c(e)+"}"};var k=0;t.generate=function(e,n,i){k=0;var s={code:"",subs:{},partials:{}};return t.walk(e,s),i.asString?this.stringify(s,n,i):this.makeTemplate(s,n,i)},t.wrapMain=function(t){return'var t=this;t.b(i=i||"");'+t+"return t.fl();"},t.template=t.Template,t.makeTemplate=function(t,e,n){var i=this.makePartials(t);return i.code=new Function("c","p","i",this.wrapMain(t.code)),new this.template(i,e,this,n)},t.makePartials=function(t){var e,n={subs:{},partials:t.partials,name:t.name};for(e in n.partials)n.partials[e]=this.makePartials(n.partials[e]);for(e in t.subs)n.subs[e]=new Function("c","p","t","i",t.subs[e]);return n},t.codegen={"#":function(e,n){n.code+="if(t.s(t."+u(e.n)+'("'+l(e.n)+'",c,p,1),c,p,0,'+e.i+","+e.end+',"'+e.otag+" "+e.ctag+'")){t.rs(c,p,function(c,p,t){',t.walk(e.nodes,n),n.code+="});c.pop();}"},"^":function(e,n){n.code+="if(!t.s(t."+u(e.n)+'("'+l(e.n)+'",c,p,1),c,p,1,0,0,"")){',t.walk(e.nodes,n),n.code+="};"},">":d,"<":function(e,n){var i={partials:{},code:"",subs:{},inPartial:!0};t.walk(e.nodes,i);var s=n.partials[d(e,n)];s.subs=i.subs,s.partials=i.partials},$:function(e,n){var i={subs:{},code:"",partials:n.partials,prefix:e.n};t.walk(e.nodes,i),n.subs[e.n]=i.code,n.inPartial||(n.code+='t.sub("'+l(e.n)+'",c,p,i);')},"\n":function(t,e){e.code+=h('"\\n"'+(t.last?"":" + i"))},_v:function(t,e){e.code+="t.b(t.v(t."+u(t.n)+'("'+l(t.n)+'",c,p,0)));'},_t:function(t,e){e.code+=h('"'+l(t.text)+'"')},"{":f,"&":f},t.walk=function(e,n){for(var i,s=0,a=e.length;s<a;s++)(i=t.codegen[e[s].tag])&&i(e[s],n);return n},t.parse=function(t,e,n){return n=n||{},s(t,"",[],n.sectionTags||[])},t.cache={},t.cacheKey=function(t,e){return[t,!!e.asString,!!e.disableLambda,e.delimiters,!!e.modelGet].join("||")},t.compile=function(e,n){n=n||{};var i=t.cacheKey(e,n),s=this.cache[i];if(s){var a=s.partials;for(var r in a)delete a[r].instance;return s}return s=this.generate(this.parse(this.scan(e,n.delimiters),e,n),e,n),this.cache[i]=s}}(e)},function(t,e,n){!function(t){function e(t,e,n){var i;return e&&"object"==typeof e&&(void 0!==e[t]?i=e[t]:n&&e.get&&"function"==typeof e.get&&(i=e.get(t))),i}function n(t,e,n,i,s,a){function r(){}function o(){}r.prototype=t,o.prototype=t.subs;var c,l=new r;l.subs=new o,l.subsText={},l.buf="",i=i||{},l.stackSubs=i,l.subsText=a;for(c in e)i[c]||(i[c]=e[c]);for(c in i)l.subs[c]=i[c];s=s||{},l.stackPartials=s;for(c in n)s[c]||(s[c]=n[c]);for(c in s)l.partials[c]=s[c];return l}function i(t){return String(null===t||void 0===t?"":t)}function s(t){return t=i(t),u.test(t)?t.replace(a,"&amp;").replace(r,"&lt;").replace(o,"&gt;").replace(c,"&#39;").replace(l,"&quot;"):t}t.Template=function(t,e,n,i){t=t||{},this.r=t.code||this.r,this.c=n,this.options=i||{},this.text=e||"",this.partials=t.partials||{},this.subs=t.subs||{},this.buf=""},t.Template.prototype={r:function(t,e,n){return""},v:s,t:i,render:function(t,e,n){return this.ri([t],e||{},n)},ri:function(t,e,n){return this.r(t,e,n)},ep:function(t,e){var i=this.partials[t],s=e[i.name];if(i.instance&&i.base==s)return i.instance;if("string"==typeof s){if(!this.c)throw new Error("No compiler available.");s=this.c.compile(s,this.options)}if(!s)return null;if(this.partials[t].base=s,i.subs){e.stackText||(e.stackText={});for(key in i.subs)e.stackText[key]||(e.stackText[key]=void 0!==this.activeSub&&e.stackText[this.activeSub]?e.stackText[this.activeSub]:this.text);s=n(s,i.subs,i.partials,this.stackSubs,this.stackPartials,e.stackText)}return this.partials[t].instance=s,s},rp:function(t,e,n,i){var s=this.ep(t,n);return s?s.ri(e,n,i):""},rs:function(t,e,n){var i=t[t.length-1];if(!d(i))return void n(t,e,this);for(var s=0;s<i.length;s++)t.push(i[s]),n(t,e,this),t.pop()},s:function(t,e,n,i,s,a,r){var o;return(!d(t)||0!==t.length)&&("function"==typeof t&&(t=this.ms(t,e,n,i,s,a,r)),o=!!t,!i&&o&&e&&e.push("object"==typeof t?t:e[e.length-1]),o)},d:function(t,n,i,s){var a,r=t.split("."),o=this.f(r[0],n,i,s),c=this.options.modelGet,l=null;if("."===t&&d(n[n.length-2]))o=n[n.length-1];else for(var u=1;u<r.length;u++)a=e(r[u],o,c),void 0!==a?(l=o,o=a):o="";return!(s&&!o)&&(s||"function"!=typeof o||(n.push(l),o=this.mv(o,n,i),n.pop()),o)},f:function(t,n,i,s){for(var a=!1,r=null,o=!1,c=this.options.modelGet,l=n.length-1;l>=0;l--)if(r=n[l],void 0!==(a=e(t,r,c))){o=!0;break}return o?(s||"function"!=typeof a||(a=this.mv(a,n,i)),a):!s&&""},ls:function(t,e,n,s,a){var r=this.options.delimiters;return this.options.delimiters=a,this.b(this.ct(i(t.call(e,s)),e,n)),this.options.delimiters=r,!1},ct:function(t,e,n){if(this.options.disableLambda)throw new Error("Lambda features disabled.");return this.c.compile(t,this.options).render(e,n)},b:function(t){this.buf+=t},fl:function(){var t=this.buf;return this.buf="",t},ms:function(t,e,n,i,s,a,r){var o,c=e[e.length-1],l=t.call(c);return"function"==typeof l?!!i||(o=this.activeSub&&this.subsText&&this.subsText[this.activeSub]?this.subsText[this.activeSub]:this.text,this.ls(l,c,n,o.substring(s,a),r)):l},mv:function(t,e,n){var s=e[e.length-1],a=t.call(s);return"function"==typeof a?this.ct(i(a.call(s)),s,n):a},sub:function(t,e,n,i){var s=this.subs[t];s&&(this.activeSub=t,s(e,n,this,i),this.activeSub=!1)}};var a=/&/g,r=/</g,o=/>/g,c=/\'/g,l=/\"/g,u=/[&<>\"\']/,d=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}}(e)},function(t,e,n){"use strict";var i={qStateFormat:function(t){return"draft"===t?"未发布":"released"===t?"发布中":"closed"===t?"已结束":"[状态错误]"},pureDate:function(t){if(null===t||"-"===t)return"-";var e=t.split("/");return e[2]+"-"+e[0]+"-"+e[1]},qTypeFormat:function(t){return"single"===t?"单选题":"multi"===t?"多选题":"text"===t?"文本题":"unknown"}};t.exports=i},,,,,,,,,,,function(t,e,n){"use strict";n(17),n(10);var i=n(0),s=n(1),a=n(5),r=n(18),o={init:function(){this.onLoad()},onLoad:function(){this.loadList(),this.bindEvent()},bindEvent:function(){},loadList:function(){var t=this,e="",n=$(".questionnaire-list"),a=i.fetch();a||i.initData(),t.filter(a),e=s.renderHtml(r,a),n.html(e),t.prepareOperaBtn()},prepareOperaBtn:function(){var t=this;$("body").on("click","a.btn--is-disabled",function(t){t.preventDefault()}),jQuery.fn.extend({disable:function(t){return this.each(function(){$(this).toggleClass("btn--is-disabled",t)})}});var e=($(".quest-item"),$(".quest-select")),n=$(".quest-select-all"),s=$(".quest-footer").find(".btn-deleteAll");$("body").on("click",".quest-select",function(i){i.stopPropagation();var a=$(this),r=a.parents(".quest-item").data("quest-id"),o=!0;console.log(r),e.each(function(){$(this).prop("checked")||(o=!1)}),o?(n.prop("checked",!0),s.disable(!1),s.bind("click",t.delAllQuest)):(n.prop("checked",!1),s.disable(!0));var c=a.parents(".quest-item").find("a.btn");$(this).change(function(){a.prop("checked")?c.each(function(){$(this).disable(!1)}):c.each(function(){$(this).disable(!0)})})}),$("body").on("click",".quest-select-all",function(n){var i=$(this);n.stopPropagation();var a=$(".questionnaire-list").find(".btn");i.prop("checked")?(a.each(function(){$(this).disable(!1)}),e.each(function(){$(this).prop("checked",!0)}),s.bind("click",t.delAllQuest)):a.each(function(){$(this).disable(!0),e.each(function(){$(this).prop("checked",!1)})})}),$("body").on("click",".btn-delete",function(e){e.preventDefault();var n=$(this).parents(".quest-item").find(".quest-select").prop("checked"),s=$(this).parents(".quest-item").data("quest-id");if(!confirm("是否确定删除该问卷？"))return!1;n&&($(this).parents(".quest-item").remove(),i.deleteQuestionnaire(s),t.loadList()),console.log(i.fetch().questionnaireList)}),$("body").on("click",".btn-")},filter:function(t){if(!t)return!1;t.notEmpty=!!t.questionnaireList.length;for(var e=0,n=t.questionnaireList.length;e<n;e++)"released"===t.questionnaireList[e].state?t.questionnaireList[e].isRelease=!0:t.questionnaireList[e].isRelease=!1,t.questionnaireList[e].stateText=a.qStateFormat(t.questionnaireList[e].state),t.questionnaireList[e].releaseDateText=a.pureDate(t.questionnaireList[e].releaseDate)},delAllQuest:function(){var t=$(".quest-item");if(!confirm("是否删除所有问卷？"))return!1;t.each(function(){$(this).remove();var t=$(this).data("quest-id");i.deleteQuestionnaire(t)}),o.loadList()}};$(document).ready(function(){o.init()})},function(t,e){},function(t,e){t.exports='{{! 如果是非空的话}} {{#notEmpty}} <thead class="quest-head"> <tr> <th class="quest-cell cell-select">&nbsp;</th> <th class="quest-cell cell-title">标题</th> <th class="quest-cell cell-date">时间</th> <th class="quest-cell cell-status">状态</th> <th class="quest-cell cell-opera">操作</th> <th class="quest-cell cell-create"><a href="./new-questionnaire.html" class="btn-create js-create-questionnaire"><i class="fa fa-plus"></i>新建问卷</a></th> </tr> </thead> <tbody class="quest-body"> {{#questionnaireList}} <tr class="quest-item" data-quest-id="{{id}}"> <td class="quest-cell cell-check"> <label class="quest-label"> <input type="checkbox" class="quest-select"> </label> </td> <td class="quest-cell">{{title}}</td> <td class="quest-cell">{{releaseDateText}}</td> {{#isRelease}} <td class="quest-cell release">{{stateText}}</td> <td class="quest-cell cell-oprea" colspan="2"> <a class="btn btn--is-disabled" href="./questionnaire-view.html?questionnaireId={{id}}">查看问卷</a> <a class="btn btn--is-disabled" href="./questionnaire-data.html?questionnaireId={{id}}">查看数据</a> </td> {{/isRelease}} {{^isRelease}} <td class="quest-cell">{{stateText}}</td> <td class="quest-cell cell-oprea" colspan="2"> <a class="btn btn--is-disabled" href="./questionnaire-detail.html?questionnaireId={{id}}">编辑</a> <a class="btn-delete btn btn--is-disabled" href="./questionnaire-detail.html.html?questionnaireId={{id}}">删除</a> <a class="btn btn--is-disabled" href="./questionnaire-view.html?questionnaireId={{id}}">查看问卷</a> </td> {{/isRelease}} </tr> {{/questionnaireList}} </tbody> <tfoot class="quest-footer"> <tr> <td class="quest-cell cell-check"> <label> <input type="checkbox" id="selectAll" class="quest-select-all"> </label> </td> <td class="quest-cell" colspan="5"><label for="selectAll">全选</label><a class="btn btn-deleteAll btn--is-disabled">删除</a></td> </tr> </tfoot> {{/notEmpty}} {{^notEmpty}} <div class="create-container"> <a href="./new-questionnaire.html" class="js-create-questionnaire btn-create btn-create--large"> <i class="fa fa-plus"></i>新建问卷 </a> </div> {{/notEmpty}} '}],[16]);