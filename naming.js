// Pure local topic naming. Never consumes page titles or navigation labels.
(() => {
  const subjects = [['自定义声音', /自定义声音/], ['声音识别', /声音识别|环境音/], ['文档命名', /文档.{0,3}(命名|名称)|命名规则/], ['保存设置', /保存|另存为/], ['表格编辑', /表格|行列/], ['语音转写', /语音转文字|语音转写|转录/], ['听障产品', /听障|无障碍通话/], ['手语产品', /手语/], ['产品宣传', /宣传片|宣传视频|产品介绍/], ['数据埋点', /埋点|买点/], ['数据看板', /看板|仪表盘/], ['交互设计', /交互|分栏|布局/], ['简历', /简历/], ['旅行', /旅行|旅游|行程/], ['产品', /产品/]];
  const intents = [['对比', /对比|比较|差异/], ['方案', /方案|设计|规划|怎么做|如何做/], ['评估', /评估|评价|是否|要不要/], ['调研', /调研|研究|调查/], ['优化', /优化|修改|修复|改进/], ['总结', /总结|梳理|整理|报告/]];
  const stop = new Set(['研究', '调研', '调查', '设计', '规划', '修改', '修复', '整理', '梳理', '总结', '比较', '对比', '评估', '评价', '优化', '帮忙', '请你', '帮我', '请帮', '希望', '需要', '这个', '那个', '我们', '你们', '一下', '可以', '什么', '如何', '怎么', '为什么', '继续', '好的', '确认', '落实', '支持', '增加', '删除', '现在', '已经', '进行', '一个', '一些', '内容', '功能', '用户', '问题', '输出', '生成', '不要', '就是', '以及', '然后', '分析', '介绍', '标题', '根据', '按照', '最近', '两轮']);
  function summarize(users, reply = '') {
    const recent = users.filter(x => typeof x === 'string' && x.trim()).slice(-2);
    if (!recent.length) return '未命名文档';
    const latest = recent.at(-1),
      previous = recent.at(-2) || '';
    const meaningful = t => t.replace(/[\s，。！？、；：,.!?]/g, '');
    if (recent.every(t => /^(好的?|嗯|是的?|继续|落实|按这个规则落实|谢谢|确认|修改)$/.test(meaningful(t)))) return '未命名文档';
    let subject = subjects.map(([name, re], i) => ({
      name,
      score: (re.test(latest) ? 4 : 0) + (re.test(previous) ? 2 : 0),
      i
    })).filter(x => x.score).sort((a, b) => b.score - a.score || a.i - b.i)[0]?.name;
    if (!subject && typeof Intl.Segmenter === 'function') {
      const seg = new Intl.Segmenter('zh', {
          granularity: 'word'
        }),
        candidates = new Map();
      for (const [text, weight] of [[latest, 4], [previous, 2]]) for (const part of seg.segment(text)) {
        const word = part.segment;
        if (!part.isWordLike || stop.has(word) || !/^([\p{Script=Han}]{2,6}|[A-Za-z][A-Za-z0-9]{1,7})$/u.test(word)) continue;
        candidates.set(word, (candidates.get(word) || 0) + weight);
      }
      subject = [...candidates].sort((a, b) => b[1] - a[1])[0]?.[0];
    }
    if (!subject) return '未命名文档';
    // Only first-turn naming may use the reply to clarify the requested output type.
    const intentText = latest + ' ' + previous + (recent.length === 1 ? ' ' + reply : '');
    const intent = intents.find(([, re]) => re.test(intentText))?.[0] || '笔记';
    const name = subject.endsWith(intent) ? subject : subject + intent;
    return Array.from(name).length <= 8 ? name : Array.from(subject).length <= 8 ? subject : '未命名文档';
  }
  globalThis.ChatNoteNaming = {
    summarize
  };
})();
