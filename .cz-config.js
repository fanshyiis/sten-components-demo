/*
 * @Author: caopx
 * @Date: 2021-10-20 14:35:09
 * @LastEditTime: 2021-10-21 10:54:33
 */
module.exports = {
    types: [
        { value: "feat", name: "feat ð:    æ°å¢æ°çç¹æ§" },
        { value: "fix", name: "fix ð:    ä¿®å¤ BUG" },
        { value: "docs", name: "docs ð:    ä¿®æ¹ææ¡£ãæ³¨é" },
        { value: "refactor", name: "refactor ð¸:    ä»£ç éæï¼æ³¨æåç¹æ§ãä¿®å¤åºåå¼" },
        { value: "perf", name: "perf â¡:    æåæ§è½" },
        { value: "test", name: "test ð:    æ·»å ä¸ä¸ªæµè¯" },
        { value: "tool", name: "tool ð:    å¼åå·¥å·åå¨(æå»ºãèææ¶å·¥å·ç­)" },
        { value: "style", name: "style â:    å¯¹ä»£ç æ ¼å¼çä¿®æ¹ä¸å½±åé»è¾" },
        { value: "revert", name: "revert ð:     çæ¬åæ»" },
        { value: "update", name: "update â¬:    ç¬¬ä¸æ¹åºåçº§ " }
    ],
  
    scopes: [{ name: 'ç»ä»¶' }, { name: 'æ ·å¼' }, { name: 'ææ¡£æ´æ¹' }, { name: 'å¶å®åæ´' }],
  
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
        type: "éæ©ä¸ç§ä½ çæäº¤ç±»å:",
        scope: "éæ©ä¸ä¸ªscope (å¯é):",
        // used if allowCustomScopes is true
        customScope: "Denote the SCOPE of this change:",
        subject: "ç®è¦è¯´æ:\n",
        body: 'è¯¦ç»è¯´æï¼ä½¿ç¨"|"æ¢è¡(å¯é)ï¼\n',
        breaking: "éå¼å®¹æ§è¯´æ (å¯é):\n",
        footer: "å³èå³é­çissueï¼ä¾å¦ï¼#31, #34(å¯é):\n",
        confirmCommit: "ç¡®å®æäº¤?"
    },
  
    allowCustomScopes: true,
    allowBreakingChanges: ['æ°å¢', 'ä¿®å¤'],
    // skip any questions you want
    // skipQuestions: ['body'],
  
    // limit subject length
    subjectLimit: 100,
    // breaklineChar: '|', // It is supported for fields body and footer.
    // footerPrefix : 'ISSUES CLOSED:'
    // askForBreakingChangeFirst : true, // default is false
  };