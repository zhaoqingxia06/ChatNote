(() => {
  if (document.getElementById('cg-notes-host')) return;
  const host = document.createElement('div');
  host.id = 'cg-notes-host';
  document.documentElement.append(host);
  const root = host.attachShadow({
    mode: 'open'
  });
  root.innerHTML = `<style>
:host{all:initial;font:14px/1.7 system-ui,"Microsoft YaHei",sans-serif;color:#28352f}*{box-sizing:border-box}button,input{font:inherit}button{cursor:pointer;border:0;border-radius:6px;padding:6px 10px;background:#f0f4f1;color:#385046}button:hover{background:#e4ede7}button:focus-visible{outline:2px solid #258369}#toggle{position:fixed;right:18px;bottom:100px;z-index:2147483646;background:#176c56;color:white;padding:10px 15px}#panel{position:relative;right:auto;top:auto;width:var(--width,460px);height:100dvh;z-index:2147483645;background:white;box-shadow:none;display:flex;flex-direction:column;border-left:1px solid #e2e8e3}#panel[hidden],#capture[hidden]{display:none}header{padding:16px 24px;display:flex;align-items:center;gap:8px;border-bottom:1px solid #edf0ed}header span{flex:1;color:#7c8b82;font-size:12px}#filemeta{flex:1;min-width:0}#filename{width:8ch;max-width:100%;min-width:0;font:600 14px system-ui;color:#28352f;border:0;border-bottom:1px solid transparent;background:transparent;outline:none;padding:2px 0}#filename:focus{border-bottom-color:#258369}#namewrap{display:flex;align-items:center;gap:6px;min-width:0}#namewrap>span{flex:none;font-size:12px}#created{display:block;font-size:11px;color:#8a958e;margin-top:3px;line-height:1.5}#sheet{flex:1;overflow:auto;padding:26px 32px 90px}#title{width:100%;border:0;background:transparent;outline:none;font-size:27px;line-height:1.4;font-weight:650;padding:0;margin:0 0 22px;color:#25352e}#editor{outline:0;min-height:70vh;overflow-wrap:anywhere;font-size:15px;line-height:1.9}#editor:empty:before{content:attr(data-placeholder);color:#a6afa8;pointer-events:none}#editor p{margin:0 0 14px}#editor h1{font-size:26px}#editor h2{font-size:21px}#editor h3{font-size:18px}#editor h4{font-size:16px}#editor h5{font-size:15px;font-weight:650}#editor h6{font-size:14px;font-weight:650}#editor img{max-width:100%;height:auto}#editor .table-scroll{max-width:100%;overflow-x:auto;margin:18px 0}#editor table{display:table;max-width:none;border-collapse:collapse;font-size:13px;margin:0;width:100%}#editor td,#editor th{border:1px solid #dce4df;padding:8px 10px;min-width:50px;overflow-wrap:anywhere}#editor pre{white-space:pre-wrap;background:#f6f8f5;padding:12px}#editor blockquote{margin:14px 0;padding:8px 14px;border-left:3px solid #b5c6bb;color:#516158}#editor blockquote.highlight-block{background:#edf5ef;border-left-color:#258369;border-radius:6px;color:#28352f}#editor a{color:#18765c}#saveMeta{display:flex;align-items:center;gap:6px;font-size:11px;color:#8a958e;margin-top:3px}#savedTime{white-space:nowrap}#locationBtn{font-size:11px;color:#176c56;background:none;padding:0}#saveLocation[hidden],#locationBtn[hidden],#created[hidden]{display:none}#saveLocation{position:absolute;top:76px;left:16px;right:16px;z-index:2147483647;border:1px solid #e2e8e3;background:white;box-shadow:0 5px 20px #0002;border-radius:8px;padding:12px;display:flex;align-items:center;gap:8px;min-width:0;margin-top:4px}#locationText{overflow-wrap:anywhere;flex:1;min-width:0}#changeFolder{font-size:11px;padding:2px 5px;background:transparent;color:#176c56;flex:none}footer{padding:8px 24px;font-size:11px;color:#8a958e;border-top:1px solid #edf0ed}#grip{position:absolute;left:-4px;top:0;width:8px;height:100%;cursor:col-resize;touch-action:none}#capture{position:fixed;z-index:2147483647;background:#176c56;color:white;box-shadow:0 3px 16px #0002}@media(max-width:760px){#panel{width:min(var(--width,460px),100vw)}#sheet{padding:24px}}
#tools{position:fixed;z-index:2147483647;display:flex;flex-wrap:wrap;gap:4px;padding:7px;background:white;box-shadow:0 4px 22px #0002;border:1px solid #e1e8e2;border-radius:9px;max-width:430px;font-size:12px}#tools[hidden],#tabletools[hidden]{display:none}#tools button{padding:4px 6px}#tools select{font:inherit;max-width:100px;padding:4px;border:1px solid #ddd;border-radius:5px}#tabletools{display:flex;gap:4px;flex-wrap:wrap;width:100%;border-top:1px solid #eee;padding-top:5px}
#resizeguide{position:fixed;z-index:2147483647;background:#21866a;width:3px;pointer-events:none;box-shadow:0 0 0 2px #21866a22}#resizeguide[hidden]{display:none}#editor ul.task-list{list-style:none;padding-left:0}#editor li[data-task]{display:flex;gap:8px;align-items:flex-start;margin:8px 0}#editor li[data-task] input{flex:none;margin:7px 0 0;width:16px;height:16px;accent-color:#176c56;cursor:pointer}#editor .task-text{flex:1;min-width:0}#editor li[data-done="true"] .task-text{color:#8a948c;text-decoration:line-through}
</style><div id="resizeguide" hidden></div><div id="tools" hidden><select id="blocktype" aria-label="段落格式"><option value="P">正文</option><option value="H1">H1 标题</option><option value="H2">H2 标题</option><option value="H3">H3 标题</option><option value="H4">H4 标题</option><option value="H5">H5 标题</option><option value="H6">H6 标题</option></select><button data-format="bold" title="加粗">B</button><button data-format="italic" title="斜体">I</button><button data-format="strikeThrough" title="删除线">删除线</button><button data-highlight="#fff2a8">黄</button><button data-highlight="#d7f3da">绿</button><button data-highlight="#ffdce8">粉</button><button data-highlight="transparent">去高亮</button><button data-format="insertUnorderedList">列表</button><button data-format="insertOrderedList">编号</button><button id="quote">引用</button><button id="code">代码</button><button id="link">链接</button><button id="rule">分隔线</button><button id="clearformat">清格式</button><button id="newtable">插入表格</button><button id="undo">撤销</button><button id="redo">重做</button><div id="tabletools" hidden><button data-table="rowBefore">上插行</button><button data-table="rowAfter">下插行</button><button data-table="colBefore">左插列</button><button data-table="colAfter">右插列</button><button data-table="deleteRow">删行</button><button data-table="deleteCol">删列</button><button data-table="fit">适应宽度</button></div></div><button id="toggle">✎ 文档</button><aside id="panel" hidden><div id="grip"></div><header><div id="filemeta"><div id="namewrap"><input id="filename" aria-label="文件名称" title="点击修改文件名称（最多8个字）"><span>.md</span></div><div id="saveMeta"><time id="savedTime"></time><button id="locationBtn" hidden aria-expanded="false">保存位置</button></div><time id="created" hidden></time></div><button id="newtodo" hidden></button><button id="obsidian" title="选择文件夹并保存当前文档">选择保存位置</button><button id="close">收起</button></header><div id="sheet"><input id="title" type="hidden"><div id="editor" contenteditable="true" role="textbox" aria-label="文章正文" aria-multiline="true" data-placeholder="输入 # 空格写标题、- 空格写列表、- [ ] 空格写待办；Ctrl+P 插入表格…"></div></div><footer><div id="status">正在读取…</div><div id="saveLocation" hidden role="dialog" aria-label="保存位置"><span id="locationText">尚未设置文件夹</span><button id="changeFolder" title="重新选择默认保存文件夹">设置保存位置</button></div></footer></aside><button id="capture" hidden>放入文档</button>`;
  const $ = id => root.getElementById(id),
    editor = $('editor');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[c]);
  const safeURL = s => {
    if (!s) return '';
    try {
      const u = new URL(s, location.href);
      return ['https:', 'http:'].includes(u.protocol) ? u.href : '';
    } catch {
      return '';
    }
  };
  function clean(html) {
    const t = document.createElement('template');
    t.innerHTML = html;
    const allowed = new Set('P BR DIV SPAN MARK STRIKE DEL STRONG B EM I U S H1 H2 H3 H4 H5 H6 UL OL LI BLOCKQUOTE PRE CODE TABLE COLGROUP COL THEAD TBODY TFOOT TR TH TD A IMG HR INPUT'.split(' '));
    for (const input of t.content.querySelectorAll('li > input[type="checkbox"]')) {
      const li = input.parentElement;
      li.dataset.task = 'true';
      li.dataset.done = input.hasAttribute('checked') ? 'true' : 'false';
      li.closest('ul')?.classList.add('task-list');
    }
    for (const el of [...t.content.querySelectorAll('*')]) {
      if (['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'SVG', 'BUTTON'].includes(el.tagName)) {
        el.remove();
        continue;
      }
      if (el.tagName === 'INPUT' && !(el.type === 'checkbox' && el.parentElement?.tagName === 'LI')) {
        el.remove();
        continue;
      }
      if (!allowed.has(el.tagName)) {
        el.replaceWith(...el.childNodes);
        continue;
      }
      for (const attr of [...el.attributes]) {
        if (!['href', 'src', 'alt', 'colspan', 'rowspan', 'style', 'class', 'data-task', 'data-done', 'type', 'checked', 'contenteditable'].includes(attr.name)) el.removeAttribute(attr.name);
      }
      for (const a of ['data-task', 'data-done']) if (el.tagName !== 'LI') el.removeAttribute(a);
      if (el.tagName !== 'INPUT') for (const a of ['type', 'checked', 'contenteditable']) el.removeAttribute(a);
      if (el.tagName === 'INPUT') {
        el.type = 'checkbox';
        el.setAttribute('contenteditable', 'false');
      }
      if (el.hasAttribute('class') && !(el.tagName === 'DIV' && el.className === 'table-scroll' || el.tagName === 'UL' && el.className === 'task-list' || el.tagName === 'SPAN' && el.className === 'task-text' || el.tagName === 'BLOCKQUOTE' && el.className === 'highlight-block')) el.removeAttribute('class');
      if (el.hasAttribute('style')) {
        const old = el.style;
        const bg = old.backgroundColor,
          w = old.width,
          h = old.height,
          layout = old.tableLayout;
        el.removeAttribute('style');
        if (el.tagName === 'TABLE' && layout === 'fixed') el.style.tableLayout = 'fixed';
        if (['SPAN', 'MARK', 'TD', 'TH'].includes(el.tagName) && /^(#[0-9a-f]{3,8}|rgb[a]?\([\d.,% ]+\)|yellow|transparent)$/i.test(bg)) el.style.backgroundColor = bg;
        for (const [name, value] of [['width', w], ['height', h]]) if (['TABLE', 'COL', 'TD', 'TH', 'TR', 'IMG'].includes(el.tagName) && /^\d+(\.\d+)?(px|%)$/.test(value) && parseFloat(value) <= (el.tagName === 'TABLE' ? 20000 : 2000)) el.style[name] = value;
      }
      for (const a of ['href', 'src']) if (el.hasAttribute(a)) {
        const url = safeURL(el.getAttribute(a));
        url ? el.setAttribute(a, url) : el.removeAttribute(a);
      }
      if (el.tagName === 'A') {
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
      }
    }
    return t.innerHTML;
  }
  let insertionBookmark = null;
  let key = '',
    doc = null,
    dirty = false,
    conflict = false,
    saving = false,
    range = null,
    pending = '',
    pendingKey = '',
    timer,
    width = 460,
    selected = false,
    ready = false;
  let draft = 'article:draft:' + crypto.randomUUID();
  const getKey = () => {
    const m = location.pathname.match(/\/c\/([^/]+)/);
    return m ? 'article:conversation:' + m[1] : draft;
  };
  const layoutStyle = document.createElement('style');
  layoutStyle.id = 'cg-notes-layout';
  document.head.append(layoutStyle);
  function updateSavedTime() {
    const fileSaved = !!doc?.lastSaved;
    const time = fileSaved ? doc.lastSaved : doc?.updated;
    $('savedTime').textContent = time ? '保存于 ' + new Intl.DateTimeFormat('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(new Date(time)) : '';
    $('savedTime').title = fileSaved ? '最近一次MD文件保存时间' : '最近一次浏览器自动保存时间';
    $('locationBtn').hidden = !fileSaved;
  }
  const status = s => {
    updateSavedTime();
    $('status').textContent = /^已保存/.test(s) ? '已自动保存到浏览器' : s;
  };
  const message = m => chrome.runtime.sendMessage(m);
  function shortName(text) {
    return Array.from(String(text || '').replace(/[\\/:*?"<>|\x00-\x1f]/g, '').replace(/\s+/g, '').trim()).slice(0, 8).join('') || '未命名文档';
  }
  function conversationName() {
    const nodes = [...document.querySelectorAll('[data-message-author-role="user"],[data-message-author-role="assistant"]')];
    const users = nodes.filter(n => n.dataset.messageAuthorRole === 'user');
    const recent = users.slice(-2).map(n => n.textContent.trim());
    let reply = '';
    if (users.length === 1) {
      const start = nodes.indexOf(users[0]);
      reply = nodes.slice(start + 1).find(n => n.dataset.messageAuthorRole === 'assistant')?.textContent.trim() || '';
    }
    return ChatNoteNaming.summarize(recent, reply);
  }
  function fitFileName() {
    const el = $('filename');
    el.style.width = Math.max(1, Array.from(el.value).reduce((n, c) => n + (/[^\x00-\xff]/.test(c) ? 1 : 0.6), 0)) + 'em';
  }
  function updateFileMeta() {
    $('filename').value = doc?.fileName || '未命名文档';
    fitFileName();
    const date = new Date(doc?.created || Date.now());
    $('created').dateTime = date.toISOString();
    $('created').textContent = '创建于 ' + new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
  }
  // Keep the raw rename draft while editing; commit only on blur or Enter.
  function commitFileName() {
    if (!ready || conflict) return;
    const raw = $('filename').value.trim();
    if (!raw) {
      $('filename').value = doc.fileName;
      return;
    }
    const name = shortName(raw);
    $('filename').value = name;
    if (name !== doc.fileName) {
      doc.fileName = name;
      doc.fileNameManual = true;
      mark();
    }
  }
  $('filename').addEventListener('input', fitFileName);
  $('filename').addEventListener('blur', () => {
    commitFileName();
    fitFileName();
  });
  $('filename').addEventListener('keydown', e => {
    if (e.isComposing) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      commitFileName();
      $('filename').blur();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      $('filename').value = doc.fileName;
      $('filename').blur();
    }
  });
  function snapshot() {
    return {
      fileName: doc.fileName,
      fileNameManual: !!doc.fileNameManual,
      created: doc.created,
      title: $('title').value,
      html: clean(editor.innerHTML),
      scroll: $('sheet').scrollTop,
      md: ($('title').value ? '# ' + $('title').value + '\n\n' : '') + mdHTML(editor.innerHTML) + '\n'
    };
  }
  function setDoc(value) {
    hideTableHover();
    doc = value || {
      title: '',
      html: '',
      scroll: 0,
      revision: 0
    };
    doc.fileName = doc.fileNameManual ? shortName(doc.fileName) : conversationName();
    doc.created = doc.created || doc.updated || Date.now();
    updateFileMeta();
    updateSaveLocation();
    $('title').value = '';
    editor.innerHTML = clean(doc.html);
    if (doc.title) {
      const h = document.createElement('h1');
      h.textContent = doc.title;
      editor.prepend(h);
      doc.title = '';
    }
    ;
    ensureExit();
    $('sheet').scrollTop = doc.scroll || 0;
    dirty = false;
    conflict = false;
    range = null;
    editor.contentEditable = 'true';
    $('title').disabled = false;
    status('已保存 · 一次对话，一篇文档');
    resetHistory();
  }
  function mark() {
    if (!ready || conflict || !key.startsWith('article:conversation:')) return;
    dirty = true;
    status('正在保存…');
    clearTimeout(timer);
    timer = setTimeout(flush, 250);
  }
  async function flush() {
    clearTimeout(timer);
    if (!ready || !dirty || conflict || saving || composing) return;
    const writingKey = key,
      payload = snapshot(),
      rev = doc.revision;
    saving = true;
    try {
      const r = await message({
        type: 'write',
        key: writingKey,
        revision: rev,
        doc: payload
      });
      if (key !== writingKey) return;
      if (r.ok) {
        doc = r.doc;
        dirty = JSON.stringify(snapshot()) !== JSON.stringify(payload);
        status(dirty ? '正在保存…' : r.sync?.state === 'synced' ? '已保存 · MD 已同步' : r.sync?.state === 'external' ? '本地已保存 · MD 被外部修改，已暂停同步' : r.sync?.state === 'permission' ? '本地已保存 · MD 同步需重新授权' : r.sync?.state === 'error' ? '本地已保存 · MD 写入失败' : '已保存');
      } else if (r.conflict) {
        conflict = true;
        editor.contentEditable = 'false';
        $('title').disabled = true;
        status('另一窗口已更新，请复制当前未保存内容后刷新页面');
      } else status('保存失败，请复制正文保留内容后重试');
    } catch {
      status('连接已中断，请复制正文保留内容后刷新页面');
    } finally {
      saving = false;
      if (dirty && !conflict) timer = setTimeout(flush, 300);
    }
  }
  async function load(next) {
    ready = false;
    key = next;
    closeSaveLocation();
    if (!next.startsWith('article:conversation:')) {
      open(false);
    } else {
      $('toggle').hidden = !$('panel').hidden;
    }
    range = null;
    editRange = null;
    pending = '';
    $('capture').hidden = true;
    $('tools').hidden = true;
    commandMenu.hidden = true;
    hideTableHover();
    clearTableSelection();
    editor.contentEditable = 'false';
    $('filename').disabled = false;
    $('obsidian').disabled = false;
    $('changeFolder').disabled = false;
    editor.dataset.placeholder = '输入 Markdown，或 Ctrl+P 插入内容…';
    if (!key.startsWith('article:conversation:')) {
      doc = null;
      editor.innerHTML = '';
      $('filename').value = '';
      $('filename').disabled = true;
      $('created').textContent = '';
      $('obsidian').disabled = true;
      $('changeFolder').disabled = true;
      editor.dataset.placeholder = '开始聊天后，即可记录笔记';
      dirty = false;
      conflict = false;
      status('请先发送消息或打开已有聊天');
      return;
    }
    try {
      const r = await message({
        type: 'read',
        key
      });
      if (r.ok) {
        const needsMeta = !r.doc?.fileName || !r.doc?.created || !!r.doc?.title || !r.doc.fileNameManual;
        setDoc(r.doc);
        ready = true;
        if (r.doc && needsMeta) mark();
      } else status('读取失败，请刷新页面');
    } catch {
      status('扩展已更新，请刷新页面');
    }
  }
  let navigating = false;
  async function navigate() {
    const next = getKey();
    if (next === key || navigating || saving) return;
    editor.contentEditable = 'false';
    navigating = true;
    try {
      await flush();
      if (dirty || conflict) {
        status('有未保存内容，请先完成保存再切换聊天');
        return;
      }
      await load(next);
    } finally {
      navigating = false;
    }
  }
  function splitLimits() {
    const total = document.documentElement.clientWidth || innerWidth;
    const chatMin = Math.min(480, Math.max(240, total * 0.45));
    const noteMin = Math.min(320, Math.max(220, total * 0.4));
    return {
      total,
      min: noteMin,
      max: Math.max(noteMin, total - chatMin)
    };
  }
  function layout() {
    const on = !$('panel').hidden;
    const limits = splitLimits();
    width = Math.max(limits.min, Math.min(width, limits.max));
    $('panel').style.setProperty('--width', width + 'px');
    host.style.display = on ? 'block' : 'contents';
    layoutStyle.textContent = on ? `
 html{display:grid!important;grid-template-columns:minmax(0,1fr) ${width}px!important;grid-template-rows:100dvh!important;--chatnote-chat-width:calc(100vw - ${width}px);}
 html>body{grid-column:1!important;grid-row:1!important;width:100%!important;min-width:0!important;max-width:100%!important;margin:0!important;position:relative!important;height:100dvh!important;transform:translateZ(0)!important;}
 html>#cg-notes-host{grid-column:2!important;grid-row:1!important;width:${width}px!important;min-width:0!important;height:100dvh!important;position:relative!important;}
 body>#root,body>#__next{width:100%!important;min-width:0!important;max-width:100%!important;}
 body .w-screen{width:100%!important;}body main{min-width:0!important;max-width:100%!important;}
 body main :is([data-message-author-role],.markdown){min-width:0!important;overflow-wrap:anywhere;}
 body main :is(pre,.tableContainer){max-width:100%;overflow-x:auto;}
 ` : '';
  }
  function open(on = true) {
    const inChat = /\/c\/[^/]+/.test(location.pathname);
    $('panel').hidden = !on || !inChat;
    $('toggle').hidden = on || !inChat;
    layout();
  }
  $('toggle').onclick = () => open();
  $('close').onclick = () => {
    $('tools').hidden = true;
    open(false);
  };
  $('title').oninput = mark;
  editor.oninput = () => {
    if (composing) return;
    normalizeEditor();
    ensureExit();
    remember();
    record();
    mark();
  };
  $('sheet').addEventListener('scroll', () => {
    $('tools').hidden = true;
    $('resizeguide').hidden = true;
    if (ready && !conflict) mark();
  });
  function ensureExit() {
    for (const table of editor.querySelectorAll('table')) if (!table.parentElement.classList.contains('table-scroll')) {
      const wrap = document.createElement('div');
      wrap.className = 'table-scroll';
      table.before(wrap);
      wrap.append(table);
    }
    const last = editor.lastElementChild;
    if (last && (['TABLE', 'IMG', 'PRE', 'HR'].includes(last.tagName) || last.classList.contains('table-scroll'))) {
      const p = document.createElement('p');
      p.append(document.createElement('br'));
      editor.append(p);
    }
    return editor.lastElementChild;
  }
  function goBelow() {
    if (!ready || conflict) return;
    const p = ensureExit();
    if (!p) return;
    const r = document.createRange();
    r.selectNodeContents(p);
    r.collapse(true);
    editor.focus({
      preventScroll: true
    });
    const s = selection();
    s.removeAllRanges();
    s.addRange(r);
    range = r.cloneRange();
  }
  editor.addEventListener('mousedown', e => {
    if (e.target !== editor) return;
    const table = editor.querySelector('table:last-of-type');
    if (table && e.clientY > table.getBoundingClientRect().bottom) {
      e.preventDefault();
      goBelow();
    }
  });
  editor.addEventListener('keydown', e => {
    if (e.key !== 'ArrowDown') return;
    const r = composedRange(selection());
    const el = r?.startContainer.nodeType === 3 ? r.startContainer.parentElement : r?.startContainer;
    const cell = el?.closest?.('td,th');
    const table = cell?.closest('table');
    if (table && cell === table.rows[table.rows.length - 1]?.cells[table.rows[table.rows.length - 1].cells.length - 1] && table === editor.querySelector('table:last-of-type')) {
      e.preventDefault();
      goBelow();
    }
  });
  function selection() {
    return root.getSelection?.() || window.getSelection();
  }
  function composedRange(s) {
    if (s?.rangeCount) {
      const rr = s.getRangeAt(0);
      if (editor.contains(rr.startContainer)) return rr;
    }
    const sr = window.getSelection()?.getComposedRanges?.({
      shadowRoots: [root]
    })?.[0];
    if (!sr) return s?.rangeCount ? s.getRangeAt(0) : null;
    const r = document.createRange();
    r.setStart(sr.startContainer, sr.startOffset);
    r.setEnd(sr.endContainer, sr.endOffset);
    return r;
  }
  function remember() {
    const s = selection();
    const r = composedRange(s);
    if (!r) return;
    if (editor.contains(r.startContainer) && editor.contains(r.endContainer)) {
      editRange = r.cloneRange();
      range = r.cloneRange();
      if (!range.collapsed) {
        range.collapse(false);
      }
    }
  }
  root.addEventListener('mouseup', remember);
  root.addEventListener('keyup', remember);
  document.addEventListener('selectionchange', remember);
  function insert(html) {
    if (!ready || conflict || getKey() !== key) {
      status('文档尚未准备好，或另一窗口正在编辑');
      return;
    }
    const beforeScroll = $('sheet').scrollTop;
    open();
    let r = range;
    if (!r || !editor.contains(r.startContainer)) {
      r = document.createRange();
      r.selectNodeContents(editor);
      r.collapse(false);
    }
    const s = selection();
    editor.focus({
      preventScroll: true
    });
    s.removeAllRanges();
    s.addRange(r);
    let text = clean(html);
    const prepared = document.createElement('template');
    prepared.innerHTML = text;
    const tail = prepared.content.lastElementChild;
    if (tail && ['TABLE', 'IMG', 'PRE', 'HR'].includes(tail.tagName)) text += '<p><br></p>';
    let used = false;
    const node = r.startContainer.nodeType === 3 ? r.startContainer.parentElement : r.startContainer;
    const paragraph = node.closest?.('p,h1,h2,h3,h4,h5,h6');
    if (prepared.content.querySelector('table') && paragraph && editor.contains(paragraph) && !paragraph.closest('td,th')) {
      record();
      const right = document.createRange();
      right.selectNodeContents(paragraph);
      right.setStart(r.startContainer, r.startOffset);
      const after = document.createElement('p');
      after.append(right.extractContents());
      if (!after.textContent && !after.children.length) after.innerHTML = '<br>';
      const fragment = document.createElement('template');
      fragment.innerHTML = text;
      const inserted = [...fragment.content.childNodes];
      paragraph.after(fragment.content);
      const last = inserted.at(-1);
      last?.after(after);
      if (!paragraph.textContent && !paragraph.querySelector('img,input')) paragraph.remove();
      r.selectNodeContents(after);
      r.collapse(true);
      s.removeAllRanges();
      s.addRange(r);
      used = true;
    }
    try {
      if (!used) used = document.execCommand('insertHTML', false, text);
    } catch {}
    if (!used) {
      const t = document.createElement('template');
      t.innerHTML = text;
      const fragment = t.content;
      const last = fragment.lastChild;
      r.insertNode(fragment);
      if (last) {
        r.setStartAfter(last);
        r.collapse(true);
        s.removeAllRanges();
        s.addRange(r);
      }
    }
    ensureExit();
    remember();
    record();
    editor.blur();
    $('tools').hidden = true;
    $('sheet').scrollTop = beforeScroll;
    mark();
    $('capture').hidden = true;
    pending = '';
    selected = false;
  }
  editor.addEventListener('paste', e => {
    e.preventDefault();
    remember();
    const c = e.clipboardData;
    insert(c.getData('text/html') || '<p>' + esc(c.getData('text/plain')).replace(/\n/g, '<br>') + '</p>');
    editor.focus({
      preventScroll: true
    });
  });
  function messageBody(node) {
    const el = node?.nodeType === 3 ? node.parentElement : node;
    if (!el || el.getRootNode() === root || el.closest('textarea,input,[contenteditable="true"],nav,header,aside,button,[role="button"]')) return null;
    return el.closest('[data-message-author-role="assistant"],[data-message-author-role="user"]');
  }
  function eligible(node) {
    return ready && key.startsWith('article:conversation:') && !!messageBody(node);
  }
  function show(html, x, y) {
    pending = clean(html);
    pendingKey = getKey();
    $('capture').hidden = false;
    $('capture').style.left = Math.max(8, Math.min(x, innerWidth - 140)) + 'px';
    $('capture').style.top = Math.max(8, Math.min(y, innerHeight - 45)) + 'px';
  }
  document.addEventListener('mouseup', () => setTimeout(() => {
    const s = window.getSelection();
    if (!s?.rangeCount || s.isCollapsed) {
      selected = false;
      $('capture').hidden = true;
      pending = '';
      return;
    }
    const r = s.getRangeAt(0);
    if (!eligible(r.startContainer) || !eligible(r.endContainer) || messageBody(r.startContainer) !== messageBody(r.endContainer)) {
      $('capture').hidden = true;
      pending = '';
      selected = false;
      return;
    }
    selected = true;
    const t = document.createElement('div');
    t.append(r.cloneContents());
    const box = r.getBoundingClientRect();
    show(t.innerHTML, box.right, box.bottom + 8);
  }, 0));
  document.addEventListener('mouseover', e => {
    if (selected) return;
    const el = e.target.closest?.('table,img,video');
    if (!el || !eligible(el)) return;
    let html = el.outerHTML;
    if (el.tagName === 'VIDEO') html = '<p><a href="' + esc(safeURL(el.currentSrc || el.src) || location.href) + '">视频链接</a></p>';
    const b = el.getBoundingClientRect();
    show(html, b.right - 130, b.top + 8);
  });
  $('capture').onmousedown = e => e.preventDefault();
  $('capture').onclick = () => {
    if (pendingKey === key) insert(pending);
  };
  document.addEventListener('scroll', e => {
    if (e.composedPath().includes(host)) return;
    $('capture').hidden = true;
  }, true);
  document.addEventListener('mousedown', e => {
    if (e.composedPath().includes(host)) return;
    $('tools').hidden = true;
    if (!window.getSelection()?.toString()) {
      $('capture').hidden = true;
      selected = false;
    }
  });
  let dragging = false;
  $('grip').onpointerdown = e => {
    if (e.button !== 0) return;
    e.preventDefault();
    dragging = true;
    $('grip').setPointerCapture(e.pointerId);
    document.documentElement.classList.add('chatnote-resizing');
  };
  $('grip').onpointermove = e => {
    if (!dragging) return;
    const limits = splitLimits();
    width = Math.max(limits.min, Math.min(limits.max, limits.total - e.clientX));
    layout();
  };
  const finishDrag = () => {
    if (!dragging) return;
    dragging = false;
    document.documentElement.classList.remove('chatnote-resizing');
    chrome.storage.local.set({
      articleWidth: width
    }).catch(() => {});
  };
  $('grip').onpointerup = finishDrag;
  $('grip').onpointercancel = finishDrag;
  $('grip').onlostpointercapture = finishDrag;
  window.addEventListener('resize', layout);
  function mdHTML(html) {
    const t = document.createElement('div');
    t.innerHTML = clean(html);
    const inline = node => [...node.childNodes].map(convert).join('');
    function convert(n) {
      if (n.nodeType === 3) return n.textContent.replace(/([\\`*_[\]])/g, '\\$1');
      if (n.nodeType !== 1) return '';
      const tag = n.tagName,
        c = () => inline(n);
      if (tag === 'INPUT') return '';
      if (tag === 'BR') return '\n';
      if (tag === 'IMG') return '![' + (n.alt || '图片') + '](' + n.src + ')';
      if (tag === 'A') return n.hasAttribute('href') ? '[' + c() + '](' + n.href + ')' : c();
      if (['STRONG', 'B'].includes(tag)) return '**' + c() + '**';
      if (['EM', 'I'].includes(tag)) return '*' + c() + '*';
      if (['S', 'STRIKE', 'DEL'].includes(tag)) return '~~' + c() + '~~';
      if (/^H[1-6]$/.test(tag)) return '\n\n' + '#'.repeat(+tag[1]) + ' ' + c() + '\n\n';
      if (tag === 'PRE') return '\n\n```\n' + n.textContent + '\n```\n\n';
      if (tag === 'CODE') return '`' + n.textContent.replace(/`/g, '\\`') + '`';
      if (tag === 'BLOCKQUOTE' && n.className === 'highlight-block') return '\n\n> [!note]\n' + c().trim().split('\n').map(l => '> ' + l).join('\n') + '\n\n';
      if (tag === 'BLOCKQUOTE') return '\n\n' + c().trim().split('\n').map(l => '> ' + l).join('\n') + '\n\n';
      if (tag === 'TABLE') {
        const rows = [...n.rows].map(r => [...r.cells].map(cell => inline(cell).trim().replace(/\|/g, '\\|').replace(/\n+/g, '<br>')));
        if (!rows.length) return '';
        const count = Math.max(...rows.map(r => r.length));
        return '\n\n' + rows.map((r, i) => '| ' + Array.from({
          length: count
        }, (_, j) => r[j] || '').join(' | ') + ' |' + (i === 0 ? '\n| ' + Array(count).fill('---').join(' | ') + ' |' : '')).join('\n') + '\n\n';
      }
      if (['UL', 'OL'].includes(tag)) return '\n' + [...n.children].map((li, i) => (li.dataset.task === 'true' ? '- [' + (li.querySelector('input')?.hasAttribute('checked') ? 'x' : ' ') + '] ' : tag === 'OL' ? i + 1 + '. ' : '- ') + inline(li).trim().replace(/\n/g, '\n  ')).join('\n') + '\n\n';
      if (['P', 'DIV'].includes(tag)) return c() + '\n\n';
      if (tag === 'HR') return '\n\n---\n\n';
      return c();
    }
    return inline(t).replace(/\n{3,}/g, '\n\n').trim();
  }
  let composing = false,
    editRange = null,
    activeCell = null,
    history = [],
    historyIndex = -1,
    restoring = false;
  function historyState() {
    const r = composedRange(selection());
    let caret = null;
    if (r && editor.contains(r.startContainer) && editor.contains(r.endContainer)) {
      const path = n => {
        const a = [];
        while (n !== editor) {
          a.unshift([...n.parentNode.childNodes].indexOf(n));
          n = n.parentNode;
        }
        return a;
      };
      caret = {
        start: path(r.startContainer),
        so: r.startOffset,
        end: path(r.endContainer),
        eo: r.endOffset
      };
    }
    return {
      html: editor.innerHTML,
      title: $('title').value,
      caret
    };
  }
  function resetHistory() {
    history = [historyState()];
    historyIndex = 0;
    editRange = null;
    activeCell = null;
    $('tools').hidden = true;
  }
  function record() {
    if (restoring || composing) return;
    const next = historyState();
    if (historyIndex >= 0 && next.html === history[historyIndex].html && next.title === history[historyIndex].title) {
      history[historyIndex].caret = next.caret;
      return;
    }
    history.splice(historyIndex + 1);
    history.push(next);
    if (history.length > 150) history.shift();
    historyIndex = history.length - 1;
  }
  function restoreHistory(delta) {
    hideTableHover();
    const i = historyIndex + delta;
    if (i < 0 || i >= history.length || conflict) return;
    historyIndex = i;
    restoring = true;
    editor.innerHTML = history[i].html;
    $('title').value = history[i].title;
    range = null;
    editRange = null;
    activeCell = null;
    ensureExit();
    restoring = false;
    mark();
    $('tools').hidden = true;
    editor.focus({
      preventScroll: true
    });
    const caret = history[i].caret;
    if (caret) try {
      const resolve = path => path.reduce((n, j) => n.childNodes[j], editor);
      const rr = document.createRange();
      rr.setStart(resolve(caret.start), caret.so);
      rr.setEnd(resolve(caret.end), caret.eo);
      selection().removeAllRanges();
      selection().addRange(rr);
      remember();
    } catch {}
  }
  function edit(fn) {
    if (!ready || conflict || composing) return;
    record();
    fn();
    ensureExit();
    remember();
    record();
    mark();
  }
  function useRange() {
    if (editRange && editor.contains(editRange.startContainer)) {
      editor.focus({
        preventScroll: true
      });
      const s = selection();
      s.removeAllRanges();
      s.addRange(editRange);
      return editRange;
    }
    return null;
  }
  function block() {
    const r = editRange || composedRange(selection());
    const el = r?.startContainer.nodeType === 3 ? r.startContainer.parentElement : r?.startContainer;
    return el?.closest?.('p,h1,h2,h3,h4,h5,h6,blockquote,pre,div');
  }
  function changeBlock(tag) {
    edit(() => {
      useRange();
      const b = block();
      if (!b || b === editor || b.closest('td,th')) return;
      const next = document.createElement(tag);
      next.innerHTML = b.innerHTML;
      b.replaceWith(next);
      const r = document.createRange();
      r.selectNodeContents(next);
      r.collapse(false);
      editRange = r;
      range = r.cloneRange();
      selection().removeAllRanges();
      selection().addRange(r);
    });
  }
  function inlineFormat(command, value) {
    edit(() => {
      const r = useRange();
      if (!r || r.collapsed) return;
      let done = false;
      try {
        done = document.execCommand(command, false, value);
      } catch {}
      if (!done) {
        const tags = {
          bold: 'strong',
          italic: 'em',
          strikeThrough: 's',
          hiliteColor: 'span'
        };
        const tag = tags[command];
        if (!tag) return;
        const el = document.createElement(tag);
        if (command === 'hiliteColor') el.style.backgroundColor = value;
        el.append(r.extractContents());
        r.insertNode(el);
        r.selectNodeContents(el);
        selection().removeAllRanges();
        selection().addRange(r);
        editRange = r.cloneRange();
      }
    });
  }
  function showTools(force = false) {
    if (!ready || conflict || composing || $('panel').hidden) return;
    remember();
    const r = editRange;
    if (!r || !editor.contains(r.startContainer)) return;
    const el = r.startContainer.nodeType === 3 ? r.startContainer.parentElement : r.startContainer;
    activeCell = el.closest?.('td,th') || null;
    if (!force && r.collapsed) {
      $('tools').hidden = true;
      return;
    }
    $('tabletools').hidden = !activeCell;
    const b = block();
    $('blocktype').value = /^H[1-6]$/.test(b?.tagName) ? b.tagName : 'P';
    const rect = r.getBoundingClientRect();
    $('tools').hidden = false;
    $('tools').style.right = '16px';
    $('tools').style.top = Math.max(65, Math.min(rect.bottom + 8, innerHeight - 170)) + 'px';
    $('tools').style.maxWidth = Math.max(280, width - 32) + 'px';
  }
  root.addEventListener('mouseup', e => {
    if (e.composedPath().includes($('tools'))) return;
    if (e.composedPath().includes(editor)) showTools();
  });
  root.addEventListener('keyup', e => {
    if (e.composedPath().includes(editor)) $('tools').hidden = true;
  });
  $('tools').addEventListener('mousedown', e => {
    if (e.target.tagName !== 'SELECT') e.preventDefault();
  });
  $('blocktype').onchange = () => changeBlock($('blocktype').value);
  for (const btn of root.querySelectorAll('[data-format]')) btn.onclick = () => {
    const cmd = btn.dataset.format;
    if (cmd.includes('List')) edit(() => {
      useRange();
      let done = false;
      try {
        done = document.execCommand(cmd, false, null);
      } catch {}
      if (!done) {
        const b = block();
        if (b && b !== editor) {
          const list = document.createElement(cmd === 'insertOrderedList' ? 'ol' : 'ul');
          const li = document.createElement('li');
          li.innerHTML = b.innerHTML;
          list.append(li);
          b.replaceWith(list);
        }
      }
    });else inlineFormat(cmd);
  };
  for (const btn of root.querySelectorAll('[data-highlight]')) btn.onclick = () => {
    if (btn.dataset.highlight === 'transparent') edit(() => {
      const r = useRange();
      if (!r) return;
      const el = r.startContainer.nodeType === 3 ? r.startContainer.parentElement : r.startContainer;
      let at = el;
      while (at && at !== editor) {
        at.style?.removeProperty('background-color');
        at = at.parentElement;
      }
      const fragment = r.extractContents();
      for (const n of fragment.querySelectorAll?.('[style]') || []) n.style.removeProperty('background-color');
      r.insertNode(fragment);
    });else inlineFormat('hiliteColor', btn.dataset.highlight);
  };
  $('quote').onclick = () => changeBlock('blockquote');
  $('code').onclick = () => changeBlock('pre');
  $('rule').onclick = () => {
    useRange();
    insert('<hr><p><br></p>');
  };
  $('link').onclick = () => {
    const url = prompt('输入链接地址（https://…）');
    const safe = safeURL(url);
    if (!safe || !url) return;
    edit(() => {
      const r = useRange();
      if (!r || r.collapsed) return;
      const a = document.createElement('a');
      a.href = safe;
      a.append(r.extractContents());
      r.insertNode(a);
    });
  };
  $('clearformat').onclick = () => edit(() => {
    const r = useRange();
    if (!r || r.collapsed) return;
    const t = document.createElement('div');
    t.append(r.extractContents());
    r.insertNode(document.createTextNode(t.textContent));
  });
  $('undo').onclick = () => restoreHistory(-1);
  $('redo').onclick = () => restoreHistory(1);
  $('title').addEventListener('input', record);
  function tableEdit(action) {
    edit(() => {
      const cell = activeCell;
      if (!cell?.isConnected) return;
      const table = cell.closest('table'),
        row = cell.parentElement,
        ci = cell.cellIndex,
        ri = row.rowIndex;
      const cells = [...table.querySelectorAll('td,th')];
      table.querySelector('colgroup')?.remove();
      table.style.removeProperty('table-layout');
      table.style.removeProperty('width');
      if (action !== 'fit' && cells.some(c => c.colSpan > 1 || c.rowSpan > 1)) {
        status('合并单元格表格暂不支持增删行列');
        return;
      }
      if (action === 'deleteRow') {
        row.remove();
        if (!table.rows.length) table.remove();
      }
      if (action === 'deleteCol') {
        for (const r of [...table.rows]) r.cells[ci]?.remove();
        if (!table.querySelector('td,th')) table.remove();
      }
      if (action.startsWith('row')) {
        const nr = document.createElement('tr');
        for (const c of row.cells) {
          const nc = document.createElement(c.tagName);
          nc.innerHTML = '<br>';
          nc.style.width = c.style.width;
          nr.append(nc);
        }
        row[action === 'rowBefore' ? 'before' : 'after'](nr);
      }
      if (action.startsWith('col')) {
        for (const r of table.rows) {
          const old = r.cells[ci];
          if (!old) continue;
          const nc = document.createElement(old.tagName);
          nc.innerHTML = '<br>';
          old[action === 'colBefore' ? 'before' : 'after'](nc);
        }
      }
      if (action === 'fit') {
        table.style.width = '100%';
        for (const c of cells) {
          c.style.removeProperty('width');
          c.parentElement.style.removeProperty('height');
        }
      }
      activeCell = null;
      $('tools').hidden = true;
      range = null;
      editRange = null;
    });
  }
  for (const btn of root.querySelectorAll('[data-table]')) btn.onclick = () => tableEdit(btn.dataset.table);
  let resizing = null;
  function guide(hit) {
    if (!hit || hit.kind !== 'width') {
      $('resizeguide').hidden = true;
      return;
    }
    const b = hit.cell.getBoundingClientRect(),
      t = hit.cell.closest('table').getBoundingClientRect();
    $('resizeguide').hidden = false;
    $('resizeguide').style.left = b.right - 1 + 'px';
    $('resizeguide').style.top = t.top + 'px';
    $('resizeguide').style.height = t.height + 'px';
  }
  function freezeColumns(table) {
    let group = table.querySelector('colgroup');
    if (!group) {
      group = document.createElement('colgroup');
      for (const cell of table.rows[0]?.cells || []) {
        const col = document.createElement('col');
        col.style.width = Math.max(50, cell.getBoundingClientRect().width || parseFloat(cell.style.width) || 100) + 'px';
        group.append(col);
      }
      table.prepend(group);
    }
    table.style.tableLayout = 'fixed';
    table.style.width = [...group.children].reduce((sum, c) => sum + parseFloat(c.style.width || 100), 0) + 'px';
    return group;
  }
  function resizeHit(e) {
    const cell = e.target.closest?.('td,th');
    if (!cell || !editor.contains(cell)) return null;
    const b = cell.getBoundingClientRect();
    if (cell.cellIndex > 0 && Math.abs(e.clientX - b.left) <= 8) {
      const prev = cell.parentElement.cells[cell.cellIndex - 1],
        pb = prev.getBoundingClientRect();
      return {
        cell: prev,
        kind: 'width',
        base: pb.width,
        start: e.clientX
      };
    }
    if (Math.abs(e.clientX - b.right) <= 8) return {
      cell,
      kind: 'width',
      base: b.width,
      start: e.clientX
    };
    if (Math.abs(e.clientY - b.bottom) <= 6) return {
      cell,
      kind: 'height',
      base: b.height,
      start: e.clientY
    };
    return null;
  }
  editor.addEventListener('pointermove', e => {
    if (resizing) {
      const diff = (resizing.kind === 'width' ? e.clientX : e.clientY) - resizing.start;
      const size = Math.max(resizing.kind === 'width' ? 50 : 28, Math.min(1800, resizing.base + diff));
      if (resizing.kind === 'width') {
        const table = resizing.cell.closest('table'),
          group = freezeColumns(table);
        if (group.children[resizing.cell.cellIndex]) group.children[resizing.cell.cellIndex].style.width = size + 'px';
        for (const r of table.rows) if (r.cells[resizing.cell.cellIndex]) r.cells[resizing.cell.cellIndex].style.width = size + 'px';
        table.style.width = [...group.children].reduce((sum, c) => sum + parseFloat(c.style.width || 100), 0) + 'px';
        guide(resizing);
      } else resizing.cell.parentElement.style.height = size + 'px';
      return;
    }
    const hit = resizeHit(e);
    guide(hit);
    editor.style.cursor = hit ? hit.kind === 'width' ? 'col-resize' : 'row-resize' : '';
  });
  editor.addEventListener('pointerdown', e => {
    if (conflict || !ready) return;
    const hit = resizeHit(e);
    if (!hit) return;
    e.preventDefault();
    if ([...hit.cell.closest('table').querySelectorAll('td,th')].some(c => c.colSpan > 1 || c.rowSpan > 1)) {
      status('合并单元格暂不支持拖动列宽');
      return;
    }
    record();
    if (hit.kind === 'width') freezeColumns(hit.cell.closest('table'));
    resizing = hit;
    editor.setPointerCapture(e.pointerId);
    $('tools').hidden = true;
  });
  function endResize() {
    if (!resizing) return;
    resizing = null;
    $('resizeguide').hidden = true;
    record();
    mark();
    editor.style.cursor = '';
  }
  editor.addEventListener('pointerup', endResize);
  editor.addEventListener('pointercancel', endResize);
  editor.addEventListener('pointerleave', () => {
    if (!resizing) {
      $('resizeguide').hidden = true;
      editor.style.cursor = '';
    }
  });
  editor.addEventListener('keydown', e => {
    if (composing || e.isComposing) return;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      restoreHistory(e.shiftKey ? 1 : -1);
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      restoreHistory(1);
      return;
    }
    if ((e.ctrlKey || e.metaKey) && ['b', 'i'].includes(e.key.toLowerCase())) {
      e.preventDefault();
      remember();
      inlineFormat(e.key.toLowerCase() === 'b' ? 'bold' : 'italic');
      return;
    }
    if (e.key === 'Tab') {
      remember();
      const r = editRange;
      const el = r?.startContainer.nodeType === 3 ? r.startContainer.parentElement : r?.startContainer;
      const c = el?.closest?.('td,th');
      if (c) {
        e.preventDefault();
        const cells = [...c.closest('table').querySelectorAll('td,th')],
          next = cells[cells.indexOf(c) + (e.shiftKey ? -1 : 1)];
        if (next) {
          const rr = document.createRange();
          rr.selectNodeContents(next);
          rr.collapse(true);
          selection().removeAllRanges();
          selection().addRange(rr);
          remember();
        } else goBelow();
      }
      return;
    }
  });
  const NativeFolderStore = {
    async db() {
      return new Promise((resolve, reject) => {
        const r = indexedDB.open('chat-note-native-folders', 1);
        r.onupgradeneeded = () => r.result.createObjectStore('handles');
        r.onsuccess = () => resolve(r.result);
        r.onerror = () => reject(r.error);
      });
    },
    async get(k) {
      const db = await this.db();
      try {
        return await new Promise((resolve, reject) => {
          const r = db.transaction('handles').objectStore('handles').get(k);
          r.onsuccess = () => resolve(r.result);
          r.onerror = () => reject(r.error);
        });
      } finally {
        db.close();
      }
    },
    async put(k, v) {
      const db = await this.db();
      try {
        return await new Promise((resolve, reject) => {
          const tx = db.transaction('handles', 'readwrite');
          tx.objectStore('handles').put(v, k);
          tx.oncomplete = resolve;
          tx.onerror = () => reject(tx.error);
        });
      } finally {
        db.close();
      }
    }
  };
  let nativeDir = null,
    nativeSaving = false;
  function updateSaveLocation() {
    const name = doc?.savedFileName;
    const folder = doc?.savedFolderName;
    $('locationText').textContent = folder && name ? '文件位置：' + folder + '/' + name : nativeDir ? '默认文件夹：' + nativeDir.name : '尚未设置文件夹';
    $('locationText').title = '显示文件夹名称，浏览器不提供完整系统路径';
    $('changeFolder').textContent = nativeDir ? '更改保存位置' : '设置保存位置';
  }
  NativeFolderStore.get('default').then(d => {
    nativeDir = d;
    updateSaveLocation();
  }).catch(() => {});
  async function saveNative(changeDirectory = false) {
    if (!ready || conflict || nativeSaving || getKey() !== key) return;
    if (!window.showDirectoryPicker) {
      status('当前浏览器不支持原生文件夹选择，请使用桌面 Chrome 或 Edge');
      return;
    }
    nativeSaving = true;
    const savingKey = key;
    let target = nativeDir;
    try {
      // Invoke the picker immediately from the button gesture, before asynchronous draft writes.
      if (changeDirectory || !target) target = await window.showDirectoryPicker({
        mode: 'readwrite',
        id: 'chat-note-save',
        startIn: target || 'documents'
      });else if ((await target.queryPermission({
        mode: 'readwrite'
      })) !== 'granted' && (await target.requestPermission({
        mode: 'readwrite'
      })) !== 'granted') {
        status('没有写入权限，请通过更改保存位置重新选择文件夹');
        return;
      }
      if (key !== savingKey || getKey() !== savingKey) return;
      commitFileName();
      await flush();
      if (dirty || conflict || key !== savingKey) {
        status('正文尚未保存完成，请稍后重试');
        return;
      }
      const savedSnapshot = snapshot();
      const savedName = doc.fileName;
      const file = await target.getFileHandle(savedName + '.md', {
        create: true
      });
      const writer = await file.createWritable();
      try {
        await writer.write(savedSnapshot.md);
        await writer.close();
      } catch (e) {
        await writer.abort?.();
        throw e;
      }
      nativeDir = target;
      await NativeFolderStore.put('default', target);
      const result = await message({
        type: 'nativeSaved',
        key: savingKey,
        savedFileName: savedName + '.md',
        savedFolderName: target.name
      });
      if (key === savingKey && doc) {
        doc.lastSaved = result.savedAt || Date.now();
        doc.savedFileName = savedName + '.md';
        doc.savedFolderName = target.name;
        updateSaveLocation();
        status('保存成功');
      }
    } catch (e) {
      if (e.name !== 'AbortError') status('保存失败：' + (e.name === 'NotAllowedError' ? '请通过更改保存位置重新选择文件夹' : '请检查文件夹和写入权限'));
    } finally {
      nativeSaving = false;
    }
  }
  $('obsidian').onclick = () => saveNative(true);
  $('changeFolder').onclick = () => {
    closeSaveLocation();
    saveNative(true);
  };
  function closeSaveLocation() {
    $('saveLocation').hidden = true;
    $('locationBtn').setAttribute('aria-expanded', 'false');
  }
  $('locationBtn').onclick = () => {
    const show = $('saveLocation').hidden;
    updateSaveLocation();
    $('saveLocation').hidden = !show;
    $('locationBtn').setAttribute('aria-expanded', String(show));
  };
  document.addEventListener('pointerdown', e => {
    if (!e.composedPath().includes($('saveLocation')) && !e.composedPath().includes($('locationBtn'))) closeSaveLocation();
  }, true);
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !$('saveLocation').hidden) {
      e.preventDefault();
      closeSaveLocation();
      $('locationBtn').focus();
    }
  }, true);
  function caretBookmark() {
    const r = range;
    if (!r || !editor.contains(r.startContainer)) return null;
    const path = [];
    let n = r.startContainer;
    while (n !== editor) {
      path.unshift([...n.parentNode.childNodes].indexOf(n));
      n = n.parentNode;
    }
    return {
      path,
      offset: r.startOffset,
      key
    };
  }
  function restoreInsertion() {
    if (!insertionBookmark) return;
    const {
      path,
      offset
    } = insertionBookmark;
    const node = path.reduce((n, i) => n?.childNodes[i], editor);
    if (!node) return;
    const r = document.createRange();
    r.setStart(node, Math.min(offset, node.nodeType === 3 ? node.length : node.childNodes.length));
    r.collapse(true);
    range = r;
    editRange = r.cloneRange();
  }
  $('newtable').onmousedown = e => e.preventDefault();
  $('newtable').onclick = () => {
    if (!ready || conflict) return;
    insertionBookmark = caretBookmark();
    $('tools').hidden = true;
    let html = '<table><tbody>';
    for (let i = 0; i < 3; i++) {
      const tag = i === 0 ? 'th' : 'td';
      html += '<tr>' + ('<' + tag + '><br></' + tag + '>').repeat(3) + '</tr>';
    }
    html += '</tbody></table><p><br></p>';
    const oldTables = new Set(editor.querySelectorAll('table'));
    restoreInsertion();
    insert(html);
    const added = [...editor.querySelectorAll('table')].find(t => !oldTables.has(t));
    const cell = added?.querySelector('th,td');
    if (cell) {
      editor.focus({
        preventScroll: true
      });
      caretAt(cell);
    }
  };
  function leaveTask(li) {
    const list = li.parentElement,
      p = document.createElement('p'),
      text = li.querySelector('.task-text');
    if (text) p.append(...text.childNodes);else p.append(...[...li.childNodes].filter(n => n.nodeName !== 'INPUT'));
    if (!p.childNodes.length) p.innerHTML = '<br>';
    const after = list.cloneNode(false);
    while (li.nextSibling) after.append(li.nextSibling);
    list.after(p);
    if (after.children.length) p.after(after);
    li.remove();
    if (!list.children.length) list.remove();
    return p;
  }
  function normalizeEditor() {
    const current = composedRange(selection());
    const node = current?.startContainer,
      offset = current?.startOffset;
    for (const li of [...editor.querySelectorAll('li[data-task]')]) if (!li.querySelector('input[type=checkbox]')) leaveTask(li);
    for (const div of [...editor.querySelectorAll('div:not(.table-scroll)')]) {
      if (div.closest('td,th,li,pre') || [...div.children].some(n => n.tagName !== 'BR' && !['SPAN', 'B', 'I', 'STRONG', 'EM'].includes(n.tagName))) continue;
      const children = [...div.childNodes];
      if (!children.some((n, i) => n.nodeName === 'BR' && i < children.length - 1)) continue;
      let line = document.createElement('p');
      const fragment = document.createDocumentFragment();
      fragment.append(line);
      for (const n of children) {
        if (n.nodeName === 'BR') {
          if (!line.childNodes.length) line.append(n);
          line = document.createElement('p');
          fragment.append(line);
        } else line.append(n);
      }
      if (!line.childNodes.length) line.innerHTML = '<br>';
      div.replaceWith(fragment);
    }
    let p = null;
    for (const n of [...editor.childNodes]) {
      if (n.nodeType === 3 || n.nodeName === 'BR') {
        if (!p) {
          p = document.createElement('p');
          n.before(p);
        }
        p.append(n);
        if (n.nodeName === 'BR') p = null;
      } else p = null;
    }
    if (node?.isConnected && editor.contains(node)) {
      try {
        const rr = document.createRange();
        rr.setStart(node, Math.min(offset, node.nodeType === 3 ? node.length : node.childNodes.length));
        rr.collapse(true);
        selection().removeAllRanges();
        selection().addRange(rr);
        remember();
      } catch {}
    }
  }
  editor.addEventListener('keydown', e => {
    if (e.defaultPrevented || e.key !== 'Backspace' || e.isComposing || composing) return;
    remember();
    const r = editRange;
    if (!r?.collapsed) return;
    const el = r.startContainer.nodeType === 3 ? r.startContainer.parentElement : r.startContainer,
      li = el.closest?.('li[data-task]');
    if (!li) return;
    const text = li.querySelector('.task-text');
    const prefix = document.createRange();
    prefix.selectNodeContents(text || li);
    try {
      prefix.setEnd(r.startContainer, r.startOffset);
    } catch {
      return;
    }
    if (prefix.toString().length) return;
    e.preventDefault();
    edit(() => {
      const p = leaveTask(li);
      editor.focus({
        preventScroll: true
      });
      caretAt(p);
    });
  });
  function taskItem(html = '') {
    const li = document.createElement('li');
    li.dataset.task = 'true';
    li.dataset.done = 'false';
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.setAttribute('contenteditable', 'false');
    const text = document.createElement('span');
    text.className = 'task-text';
    text.innerHTML = html || '<br>';
    li.append(box, text);
    return li;
  }
  function focusTask(li) {
    const span = li.querySelector('.task-text') || li;
    editor.focus({
      preventScroll: true
    });
    const rr = document.createRange();
    rr.selectNodeContents(span);
    rr.collapse(true);
    selection().removeAllRanges();
    selection().addRange(rr);
    remember();
  }
  $('newtodo').onclick = () => {
    edit(() => {
      const b = block();
      const list = document.createElement('ul');
      list.className = 'task-list';
      const li = taskItem(b && b !== editor && !b.closest('td,th,li') ? b.innerHTML : '');
      list.append(li);
      if (b && b !== editor && !b.closest('td,th,li')) b.replaceWith(list);else {
        editor.append(list);
      }
      focusTask(li);
    });
  };
  editor.addEventListener('change', e => {
    const box = e.target;
    if (box.tagName !== 'INPUT' || box.type !== 'checkbox' || !box.closest('li[data-task]')) return;
    if (conflict) {
      box.checked = box.hasAttribute('checked');
      return;
    }
    edit(() => {
      box.toggleAttribute('checked', box.checked);
      box.closest('li').dataset.done = box.checked ? 'true' : 'false';
    });
  });
  editor.addEventListener('keydown', e => {
    if (composing || e.isComposing || e.key !== 'Enter' || e.shiftKey) return;
    remember();
    const r = editRange;
    const el = r?.startContainer.nodeType === 3 ? r.startContainer.parentElement : r?.startContainer;
    const li = el?.closest?.('li[data-task]');
    if (!li) return;
    e.preventDefault();
    edit(() => {
      const text = li.querySelector('.task-text');
      if (!text?.textContent.trim()) {
        const p = document.createElement('p');
        p.innerHTML = '<br>';
        const list = li.parentElement;
        list.after(p);
        li.remove();
        if (!list.children.length) list.remove();
        const rr = document.createRange();
        rr.selectNodeContents(p);
        rr.collapse(true);
        selection().removeAllRanges();
        selection().addRange(rr);
        remember();
        return;
      }
      const tail = document.createRange();
      tail.selectNodeContents(text);
      if (r && text.contains(r.startContainer)) tail.setStart(r.startContainer, r.startOffset);else tail.collapse(false);
      const t = document.createElement('div');
      t.append(tail.extractContents());
      const next = taskItem(t.innerHTML);
      li.after(next);
      focusTask(next);
    });
  });
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local' || !changes[key] || saving || !ready) return;
    const next = changes[key].newValue;
    if (!next) return;
    if (next.revision === doc.revision) {
      if (next.lastSaved > (doc.lastSaved || 0)) {
        doc.lastSaved = next.lastSaved;
        if (!dirty) status('保存成功');
      }
      return;
    }
    if (dirty) {
      conflict = true;
      editor.contentEditable = 'false';
      $('title').disabled = true;
      status('另一窗口已更新：请导出本页，再刷新读取最新文档');
    } else setDoc(next);
  });
  editor.addEventListener('contextmenu', e => {
    if (!ready || conflict) return;
    e.preventDefault();
    const pos = document.caretPositionFromPoint?.(e.clientX, e.clientY, {
      shadowRoots: [root]
    });
    if (pos && editor.contains(pos.offsetNode)) {
      const r = document.createRange();
      r.setStart(pos.offsetNode, pos.offset);
      r.collapse(true);
      selection().removeAllRanges();
      selection().addRange(r);
      remember();
    } else remember();
    showTools(true);
  });
  editor.addEventListener('compositionstart', () => {
    composing = true;
  });
  editor.addEventListener('compositionend', () => {
    composing = false;
    normalizeEditor();
    ensureExit();
    remember();
    record();
    mark();
  });

  // Table controls live outside the document so exports and persisted HTML stay clean.
  const tableHover = document.createElement('div');
  tableHover.id = 'tableHover';
  tableHover.hidden = true;
  tableHover.innerHTML = '<button id="addColumn" aria-label="添加列" title="添加列">+</button><button id="addRow" aria-label="添加行" title="添加行">+</button><button id="removeRow" aria-label="选中当前行" title="选中当前行">⋮</button><button id="removeColumn" aria-label="选中当前列" title="选中当前列">⋯</button>';
  root.append(tableHover);
  const hoverStyle = document.createElement('style');
  hoverStyle.textContent = '#tableHover[hidden]{display:none}#tableHover button{position:fixed;z-index:2147483647;width:24px;height:24px;padding:0;line-height:24px;font-size:18px;border:1px solid #cee0d5;border-radius:5px;background:#eef6f1;color:#176b56;box-shadow:0 2px 6px #0001}#tableHover #removeRow,#tableHover #removeColumn{color:#a7473c;background:#fff4f1;border-color:#f0d7d1}';
  root.append(hoverStyle);
  let hoverCell = null,
    hoverTimer,
    insertBoundary = null,
    tableSelection = null;
  const selectionOverlay = document.createElement('div');
  selectionOverlay.id = 'tableSelection';
  selectionOverlay.hidden = true;
  selectionOverlay.innerHTML = '<button id="deleteSelection" type="button">删除选中行</button>';
  root.append(selectionOverlay);
  const selectedStyle = document.createElement('style');
  selectedStyle.textContent = '#tableSelection{position:fixed;pointer-events:none;border:2px solid #258369;background:#25836918;z-index:2147483646}#tableSelection[hidden]{display:none}#deleteSelection{position:absolute;right:0;top:-34px;pointer-events:auto;background:#fff4f1;color:#a7473c;white-space:nowrap}';
  root.append(selectedStyle);
  function clearTableSelection() {
    tableSelection = null;
    selectionOverlay.hidden = true;
  }
  function selectTableAxis(axis, preview = false) {
    const cell = hoverCell;
    if (!cell?.isConnected) return;
    if (!preview) tableSelection = {
      cell,
      axis
    };
    $('deleteSelection').hidden = preview;
    const table = cell.closest('table'),
      tb = table.getBoundingClientRect(),
      b = axis === 'row' ? cell.parentElement.getBoundingClientRect() : cell.getBoundingClientRect();
    selectionOverlay.hidden = false;
    Object.assign(selectionOverlay.style, {
      left: (axis === 'row' ? tb.left : b.left) + 'px',
      top: (axis === 'row' ? b.top : tb.top) + 'px',
      width: (axis === 'row' ? tb.width : b.width) + 'px',
      height: (axis === 'row' ? b.height : tb.height) + 'px'
    });
    $('deleteSelection').textContent = axis === 'row' ? '删除选中行' : '删除选中列';
  }
  function hideTableHover() {
    clearTimeout(hoverTimer);
    tableHover.hidden = true;
    hoverCell = null;
    if (!tableSelection) selectionOverlay.hidden = true;
  }
  function showTableHover(cell, side) {
    if (!ready || conflict || resizing || !cell?.isConnected) {
      hideTableHover();
      return;
    }
    clearTimeout(hoverTimer);
    hoverCell = cell;
    const table = cell.closest('table'),
      tb = table.getBoundingClientRect(),
      cb = cell.getBoundingClientRect(),
      rb = cell.parentElement.getBoundingClientRect();
    const sheet = $('sheet').getBoundingClientRect();
    const place = (id, x, y) => {
      const btn = $(id);
      btn.style.left = Math.max(2, Math.min(x, innerWidth - 26)) + 'px';
      btn.style.top = Math.max(2, Math.min(y, innerHeight - 26)) + 'px';
      btn.hidden = id !== side || y < sheet.top || y > sheet.bottom - 24 || x < sheet.left - 26 || x > sheet.right;
    };
    tableHover.hidden = false;
    const pos = insertBoundary ?? 0;
    const colX = table.rows[0].cells[pos]?.getBoundingClientRect().left ?? tb.right;
    const rowY = table.rows[pos]?.getBoundingClientRect().top ?? tb.bottom;
    place('addColumn', colX - 12, tb.bottom + 3);
    place('addRow', tb.right + 3, rowY - 12);
    place('removeRow', tb.left - 27, rb.top + rb.height / 2 - 12);
    place('removeColumn', cb.left + cb.width / 2 - 12, tb.top - 27);
  }
  $('sheet').addEventListener('pointermove', e => {
    if (e.target.closest?.('input,button')) return;
    let best = null;
    for (const table of editor.querySelectorAll('table')) {
      const b = table.getBoundingClientRect();
      if (e.clientX < b.left - 20 || e.clientX > b.right + 20 || e.clientY < b.top - 20 || e.clientY > b.bottom + 20) continue;
      const rows = [...table.rows];
      if (!rows.length) continue;
      const columns = [...rows[0].cells];
      let side,
        distance = 99,
        boundary = null,
        cell = null;
      // Add only at a grid-line intersection on the right/bottom outer edge.
      const rowLines = rows.map((r, i) => ({
        pos: r.getBoundingClientRect().top,
        index: i
      }));
      rowLines.push({
        pos: b.bottom,
        index: rows.length
      });
      const colLines = columns.map((c, i) => ({
        pos: c.getBoundingClientRect().left,
        index: i
      }));
      colLines.push({
        pos: b.right,
        index: columns.length
      });
      const nearRow = rowLines.find(x => Math.abs(e.clientY - x.pos) <= 6),
        nearCol = colLines.find(x => Math.abs(e.clientX - x.pos) <= 6);
      if (Math.abs(e.clientX - b.right) <= 8 && nearRow) {
        side = 'addRow';
        distance = Math.abs(e.clientX - b.right);
        boundary = nearRow.index;
        cell = rows[Math.min(boundary, rows.length - 1)].cells[0];
      } else if (Math.abs(e.clientY - b.bottom) <= 8 && nearCol) {
        side = 'addColumn';
        distance = Math.abs(e.clientY - b.bottom);
        boundary = nearCol.index;
        cell = columns[Math.min(boundary, columns.length - 1)];
      } else if (Math.abs(e.clientX - b.left) <= 8 && e.clientY > b.top + 6 && e.clientY < b.bottom - 6) {
        side = 'removeRow';
        cell = rows.find(r => {
          const x = r.getBoundingClientRect();
          return e.clientY >= x.top && e.clientY < x.bottom;
        })?.cells[0];
        distance = Math.abs(e.clientX - b.left);
      } else if (Math.abs(e.clientY - b.top) <= 8 && e.clientX > b.left + 6 && e.clientX < b.right - 6) {
        side = 'removeColumn';
        cell = columns.find(c => {
          const x = c.getBoundingClientRect();
          return e.clientX >= x.left && e.clientX < x.right;
        });
        distance = Math.abs(e.clientY - b.top);
      }
      if (cell && (!best || distance < best.distance)) best = {
        cell,
        side,
        distance,
        boundary
      };
    }
    if (best) {
      insertBoundary = best.boundary;
      showTableHover(best.cell, best.side);
      if (!tableSelection) {
        if (best.side === 'removeRow' || best.side === 'removeColumn') selectTableAxis(best.side === 'removeRow' ? 'row' : 'column', true);else selectionOverlay.hidden = true;
      }
    } else {
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(hideTableHover, 140);
    }
  });
  document.addEventListener('click', e => {
    if (!e.composedPath().includes($('sheet')) && !e.composedPath().includes(tableHover)) hideTableHover();
  }, true);
  $('sheet').addEventListener('pointerleave', () => {
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(hideTableHover, 180);
  });
  tableHover.addEventListener('pointerenter', () => clearTimeout(hoverTimer));
  tableHover.addEventListener('pointerleave', () => {
    hoverTimer = setTimeout(hideTableHover, 180);
  });
  tableHover.addEventListener('mousedown', e => e.preventDefault());
  function hoverTableEdit(action) {
    const cell = hoverCell;
    if (!cell?.isConnected || !editor.contains(cell)) return;
    const table = cell.closest('table');
    const boundary = insertBoundary;
    clearTableSelection();
    if ([...table.querySelectorAll('td,th')].some(c => c.rowSpan > 1 || c.colSpan > 1)) {
      status('合并单元格暂不支持增删行列');
      return;
    }
    if (action === 'addRow' && table.rows.length >= 100 || action === 'addColumn' && table.rows[0].cells.length >= 30) {
      status('最多支持100行、30列');
      return;
    }
    edit(() => {
      const row = cell.parentElement,
        ri = row.rowIndex,
        ci = cell.cellIndex;
      let focus;
      if (action === 'addRow') {
        const tr = document.createElement('tr');
        for (const c of table.rows[table.rows.length - 1].cells) {
          const td = document.createElement('td');
          td.innerHTML = '<br>';
          td.style.width = c.style.width;
          tr.append(td);
        }
        const at = boundary ?? table.rows.length;
        const before = table.rows[at];
        if (before) before.before(tr);else table.rows[table.rows.length - 1].after(tr);
        focus = tr.cells[0];
      }
      if (action === 'addColumn') {
        for (const tr of table.rows) {
          const td = document.createElement(tr === table.rows[0] && tr.querySelector('th') ? 'th' : 'td');
          td.innerHTML = '<br>';
          const at = boundary ?? tr.cells.length;
          if (tr.cells[at]) tr.cells[at].before(td);else tr.append(td);
        }
        const group = table.querySelector('colgroup');
        if (group) {
          const col = document.createElement('col');
          col.style.width = '100px';
          if (group.children[boundary]) group.children[boundary].before(col);else group.append(col);
          table.style.width = [...group.children].reduce((sum, c) => sum + (parseFloat(c.style.width) || 100), 0) + 'px';
        }
        focus = table.rows[ri].lastElementChild;
      }
      if (action === 'removeRow') {
        row.remove();
        focus = table.rows[Math.min(ri, table.rows.length - 1)]?.cells[ci];
      }
      if (action === 'removeColumn') {
        for (const tr of table.rows) tr.cells[ci]?.remove();
        const group = table.querySelector('colgroup');
        if (group) {
          group.children[ci]?.remove();
          table.style.width = [...group.children].reduce((sum, c) => sum + (parseFloat(c.style.width) || 100), 0) + 'px';
        }
        focus = table.rows[ri]?.cells[Math.min(ci, table.rows[ri].cells.length - 1)];
      }
      if (!table.rows.length || !table.querySelector('td,th')) {
        const wrap = table.parentElement.classList.contains('table-scroll') ? table.parentElement : table;
        const p = document.createElement('p');
        p.innerHTML = '<br>';
        wrap.replaceWith(p);
        focus = p;
      }
      hideTableHover();
      editor.focus({
        preventScroll: true
      });
      if (focus) caretAt(focus);
    });
  }
  for (const action of ['addColumn', 'addRow']) $(action).onclick = () => hoverTableEdit(action);
  $('removeRow').onclick = () => selectTableAxis('row');
  $('removeColumn').onclick = () => selectTableAxis('column');
  function deleteTableAxis() {
    if (!tableSelection) return;
    hoverCell = tableSelection.cell;
    hoverTableEdit(tableSelection.axis === 'row' ? 'removeRow' : 'removeColumn');
  }
  selectionOverlay.addEventListener('mousedown', e => e.preventDefault());
  $('deleteSelection').onclick = deleteTableAxis;
  root.addEventListener('keydown', e => {
    if (!tableSelection) return;
    if (e.key === 'Escape') {
      clearTableSelection();
      return;
    }
    if (['Backspace', 'Delete'].includes(e.key) && !e.isComposing) {
      e.preventDefault();
      e.stopPropagation();
      deleteTableAxis();
    }
  }, true);
  $('sheet').addEventListener('mousedown', () => clearTableSelection());
  $('sheet').addEventListener('input', clearTableSelection);
  $('sheet').addEventListener('scroll', clearTableSelection);
  window.addEventListener('resize', clearTableSelection);
  $('sheet').addEventListener('scroll', hideTableHover);
  window.addEventListener('resize', hideTableHover);
  $('close').addEventListener('click', () => {
    hideTableHover();
    clearTableSelection();
  });

  // Split Markdown headings explicitly so browser contenteditable behavior cannot trap Enter.
  editor.addEventListener('keydown', e => {
    if (e.defaultPrevented || e.key !== 'Enter' || e.shiftKey || e.isComposing || composing) return;
    remember();
    const r = editRange;
    const el = r?.startContainer.nodeType === 3 ? r.startContainer.parentElement : r?.startContainer;
    const heading = el?.closest?.('h1,h2,h3,h4,h5,h6');
    if (!heading || heading.closest('td,th')) return;
    e.preventDefault();
    edit(() => {
      r.deleteContents();
      const tail = document.createRange();
      tail.selectNodeContents(heading);
      tail.setStart(r.startContainer, r.startOffset);
      const p = document.createElement('p');
      p.append(tail.extractContents());
      if (!p.childNodes.length) p.innerHTML = '<br>';
      if (!heading.childNodes.length) heading.innerHTML = '<br>';
      heading.after(p);
      editor.focus({
        preventScroll: true
      });
      caretAt(p);
    });
  });
  // Markdown input rules operate on the prefix before the caret, preserving trailing content.
  function caretAt(node, end = false) {
    const r = document.createRange();
    r.selectNodeContents(node);
    r.collapse(!end);
    selection().removeAllRanges();
    selection().addRange(r);
    remember();
  }
  function inputBlock(r) {
    let el = r.startContainer.nodeType === 3 ? r.startContainer.parentElement : r.startContainer;
    while (el && el !== editor) {
      if (el.matches('li,p,h1,h2,h3,h4,h5,h6,div') && !el.classList.contains('task-text')) return el;
      el = el.parentElement;
    }
    return editor;
  }
  editor.addEventListener('keydown', e => {
    if (e.defaultPrevented || composing || e.isComposing || e.key !== ' ' || e.ctrlKey || e.metaKey || e.altKey) return;
    remember();
    let r = editRange;
    if (!r?.collapsed || !editor.contains(r.startContainer)) return;
    let b = inputBlock(r);
    if (b === editor) {
      normalizeEditor();
      remember();
      r = editRange;
      b = inputBlock(r);
    }
    if (b.closest('td,th,pre,blockquote') || b.closest('li[data-task]')) return;
    const prefixRange = document.createRange();
    prefixRange.selectNodeContents(b);
    prefixRange.setEnd(r.startContainer, r.startOffset);
    const prefix = prefixRange.toString();
    const heading = prefix.match(/^(#{1,6})$/),
      task = prefix.match(/^(?:- )?\[([ xX])\]$/);
    const bullet = /^[-*]$/.test(prefix);
    if (!heading && !task && !bullet) return;
    if (b === editor && [...prefixRange.cloneContents().childNodes].some(n => n.nodeType === 1 && n.tagName !== 'BR')) return;
    if (b.tagName === 'LI' && !task) return;
    e.preventDefault();
    edit(() => {
      prefixRange.deleteContents();
      const tail = document.createRange();
      tail.selectNodeContents(b);
      let fragment = tail.extractContents();
      const content = document.createElement('div');
      content.append(fragment);
      if (content.firstChild?.nodeType === 3) content.firstChild.textContent = content.firstChild.textContent.replace(/^ /, '');
      let n;
      if (heading) {
        n = document.createElement('h' + heading[1].length);
        n.append(...content.childNodes);
        if (!n.childNodes.length) n.innerHTML = '<br>';
      } else if (task) {
        n = taskItem(content.innerHTML);
        if (task[1].toLowerCase() === 'x') {
          n.querySelector('input').checked = true;
          n.querySelector('input').setAttribute('checked', '');
          n.dataset.done = 'true';
        }
      } else {
        n = document.createElement('li');
        n.append(...content.childNodes);
        if (!n.childNodes.length) n.innerHTML = '<br>';
      }
      if (b.tagName === 'LI') {
        b.replaceWith(n);
        if (task) n.parentElement.classList.add('task-list');
      } else {
        let replacement = n;
        if (!heading) {
          replacement = document.createElement('ul');
          if (task) replacement.className = 'task-list';
          replacement.append(n);
        }
        if (b === editor) editor.append(replacement);else b.replaceWith(replacement);
      }
      if (task) focusTask(n);else caretAt(n);
    });
  });
  const commandMenu = document.createElement('div');
  commandMenu.id = 'commandMenu';
  commandMenu.hidden = true;
  commandMenu.setAttribute('role', 'dialog');
  commandMenu.setAttribute('aria-label', '插入');
  commandMenu.innerHTML = '<input id="commandSearch" placeholder="搜索插入项…" aria-label="搜索插入项"><div id="commandItems" role="listbox"></div><small>方向键选择 · Enter 插入 · Esc 关闭</small>';
  root.append(commandMenu);
  const style = document.createElement('style');
  style.textContent = '#commandMenu{position:fixed;right:24px;top:100px;width:300px;padding:12px;background:white;border:1px solid #ddd;border-radius:10px;box-shadow:0 8px 40px #0002;z-index:2147483647}#commandMenu[hidden]{display:none}#commandSearch{width:100%;padding:8px 4px;border:0;border-bottom:1px solid #dce4df;border-radius:0;margin-bottom:8px;background:transparent;outline:none;box-shadow:none}#commandSearch:focus{border-bottom:2px solid #258369}#commandItems{max-height:min(360px,50vh);overflow-y:auto}#commandItems button{display:flex;align-items:center;gap:10px;width:100%;text-align:left;margin:3px 0}#commandItems svg{width:18px;height:18px;flex:none;color:#65786c}.commandSection{font-size:11px;color:#87938b;padding:4px 4px 6px}.headingChoices{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:4px;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #edf0ed}#commandItems .headingChoices button{justify-content:center;padding:8px 0;margin:0;font-weight:600;font-size:13px}#commandItems button[aria-selected="true"]{background:#dcece3}#commandMenu small{color:#87938b;font-size:11px}#editor ul{padding-left:24px}';
  root.append(style);
  function commandBlock(tag, highlight = false) {
    edit(() => {
      const r = useRange();
      if (!r) return;
      let b = block();
      if (b?.closest('td,th,li')) {
        status('请在正文段落中插入此类内容');
        return;
      }
      const n = document.createElement(tag);
      if (highlight) n.className = 'highlight-block';
      if (b && b !== editor) {
        n.innerHTML = b.innerHTML || '<br>';
        b.replaceWith(n);
      } else {
        n.innerHTML = '<br>';
        r.insertNode(n);
      }
      caretAt(n);
      remember();
    });
  }
  const commands = [...[1, 2, 3, 4, 5, 6].map(n => ({
    label: '标题 H' + n,
    run: () => commandBlock('h' + n)
  })), {
    label: '检查列表',
    run: () => $('newtodo').click()
  }, {
    label: '引用',
    run: () => commandBlock('blockquote')
  }, {
    label: '高亮块',
    run: () => commandBlock('blockquote', true)
  }, {
    label: '插入表格',
    run: () => $('newtable').click()
  }];
  let commandIndex = 0,
    visibleCommands = [],
    commandBookmark = null;
  const commandIcons = {
    '检查列表': '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="m7 12 3 3 7-7"/>',
    '引用': '<path d="M10 6H4v7h5c0 3-1 4-4 5M21 6h-6v7h5c0 3-1 4-4 5"/>',
    '高亮块': '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M7 8v8m4-6h6m-6 4h4"/>',
    '插入表格': '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>'
  };
  function renderCommands() {
    visibleCommands = commands.filter(c => c.label.includes($('commandSearch').value.trim()));
    commandIndex = Math.min(commandIndex, Math.max(0, visibleCommands.length - 1));
    const items = $('commandItems');
    items.replaceChildren();
    let headings = null;
    visibleCommands.forEach((c, i) => {
      const heading = c.label.match(/^标题 H([1-6])$/);
      const btn = document.createElement('button');
      btn.setAttribute('role', 'option');
      btn.setAttribute('aria-label', c.label);
      btn.setAttribute('aria-selected', String(i === commandIndex));
      btn.onclick = () => runCommand(i);
      if (heading) {
        if (!headings) {
          const label = document.createElement('div');
          label.className = 'commandSection';
          label.textContent = '标题';
          items.append(label);
          headings = document.createElement('div');
          headings.className = 'headingChoices';
          headings.setAttribute('role', 'group');
          headings.setAttribute('aria-label', '标题级别');
          items.append(headings);
        }
        btn.textContent = 'H' + heading[1];
        btn.title = c.label;
        headings.append(btn);
      } else {
        btn.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + commandIcons[c.label] + '</svg><span>' + c.label + '</span>';
        items.append(btn);
      }
    });
    if (!visibleCommands.length) {
      const empty = document.createElement('div');
      empty.className = 'commandSection';
      empty.textContent = '未找到匹配项';
      items.append(empty);
    }
  }
  function closeCommands(restore = true) {
    commandMenu.hidden = true;
    if (restore) {
      insertionBookmark = commandBookmark;
      restoreInsertion();
      editor.focus({
        preventScroll: true
      });
      useRange();
    }
  }
  function runCommand(i) {
    const c = visibleCommands[i];
    if (!c) return;
    closeCommands();
    c.run();
    editor.focus({
      preventScroll: true
    });
    remember();
  }
  function openCommands() {
    if (!ready || conflict) return;
    remember();
    const caret = editRange?.getBoundingClientRect();
    const el = editRange?.startContainer.nodeType === 3 ? editRange.startContainer.parentElement : editRange?.startContainer;
    const anchor = caret?.height ? caret : el?.getBoundingClientRect();
    commandBookmark = caretBookmark();
    $('tools').hidden = true;
    commandMenu.hidden = false;
    commandIndex = 0;
    $('commandSearch').value = '';
    renderCommands();
    const width = Math.min(300, innerWidth - 24);
    commandMenu.style.width = width + 'px';
    commandMenu.style.right = 'auto';
    commandMenu.style.left = Math.max(12, Math.min(anchor?.left || anchor?.right || $('editor').getBoundingClientRect().left, innerWidth - width - 12)) + 'px';
    const height = commandMenu.getBoundingClientRect().height || 160;
    const below = (anchor?.bottom || 100) + 8;
    commandMenu.style.top = Math.max(12, below + height < innerHeight ? below : (anchor?.top || below) - height - 8) + 'px';
    $('commandSearch').focus();
  }
  $('commandSearch').oninput = () => {
    commandIndex = 0;
    renderCommands();
  };
  commandMenu.addEventListener('keydown', e => {
    if (e.isComposing) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeCommands();
    } else if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      commandIndex = (commandIndex + (['ArrowDown', 'ArrowRight'].includes(e.key) ? 1 : -1) + visibleCommands.length) % Math.max(1, visibleCommands.length);
      renderCommands();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(commandIndex);
    }
  });
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p' && !$('panel').hidden && (e.composedPath().includes(editor) || e.composedPath().includes(commandMenu))) {
      e.preventDefault();
      e.stopPropagation();
      if (ready && !conflict) openCommands();
    }
  }, true);
  // Dismiss visible extension dialogs before page handlers, even if focus has moved outside.
  window.addEventListener('keydown', e => {
    if (e.key !== 'Escape' || e.isComposing) return;
    if (!commandMenu.hidden) {
      e.preventDefault();
      e.stopImmediatePropagation();
      closeCommands();
      return;
    }
    if (!$('tools').hidden) {
      e.preventDefault();
      e.stopImmediatePropagation();
      $('tools').hidden = true;
    }
  }, true);
  window.addEventListener('pagehide', () => {
    flush();
  });
  window.addEventListener('beforeunload', e => {
    if (dirty) {
      flush();
      e.preventDefault();
      e.returnValue = '';
    }
  });
  chrome.storage.local.get('articleWidth').then(r => {
    width = r.articleWidth || 460;
    layout();
  });
  load(getKey());
  setInterval(() => {
    navigate();
    if (ready && !conflict && !doc.fileNameManual && doc.fileName === '未命名文档') {
      const name = conversationName();
      if (name !== '未命名文档') {
        doc.fileName = name;
        updateFileMeta();
        mark();
      }
    }
  }, 500);
})();
