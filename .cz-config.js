/*
 * @Author: caopx
 * @Date: 2021-10-20 14:35:09
 * @LastEditTime: 2021-10-21 10:54:33
 */
module.exports = {
    types: [
        { value: "feat", name: "feat 🍄:    新增新的特性" },
        { value: "fix", name: "fix 🐛:    修复 BUG" },
        { value: "docs", name: "docs 📄:    修改文档、注释" },
        { value: "refactor", name: "refactor 🎸:    代码重构，注意和特性、修复区分开" },
        { value: "perf", name: "perf ⚡:    提升性能" },
        { value: "test", name: "test 👀:    添加一个测试" },
        { value: "tool", name: "tool 🚗:    开发工具变动(构建、脚手架工具等)" },
        { value: "style", name: "style ✂:    对代码格式的修改不影响逻辑" },
        { value: "revert", name: "revert 🌝:     版本回滚" },
        { value: "update", name: "update ⬆:    第三方库升级 " }
    ],
  
    scopes: [{ name: '组件' }, { name: '样式' }, { name: '文档更改' }, { name: '其它变更' }],
  
    allowTicketNumber: false,
    isTicketNumberRequired: false,
    ticketNumberPrefix: 'TICKET-',
    ticketNumberRegExp: '\\d{1,5}',
  
    // it needs to match the value for field type. Eg.: 'fix'
    /*
    scopeOverrides: {
      fix: [
        {name: 'merge'},
        {name: 'style'},
        {name: 'e2eTest'},
        {name: 'unitTest'}
      ]
    },
    */
    // override the messages, defaults are as follows
    messages: {
        type: "选择一种你的提交类型:",
        scope: "选择一个scope (可选):",
        // used if allowCustomScopes is true
        customScope: "Denote the SCOPE of this change:",
        subject: "简要说明:\n",
        body: '详细说明，使用"|"换行(可选)：\n',
        breaking: "非兼容性说明 (可选):\n",
        footer: "关联关闭的issue，例如：#31, #34(可选):\n",
        confirmCommit: "确定提交?"
    },
  
    allowCustomScopes: true,
    allowBreakingChanges: ['新增', '修复'],
    // skip any questions you want
    // skipQuestions: ['body'],
  
    // limit subject length
    subjectLimit: 100,
    // breaklineChar: '|', // It is supported for fields body and footer.
    // footerPrefix : 'ISSUES CLOSED:'
    // askForBreakingChangeFirst : true, // default is false
  };