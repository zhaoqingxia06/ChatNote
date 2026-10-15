(() => {
  'use strict';
  // Independent of ChatNote's editor: a sidebar failure must never affect document editing.
  const PREFIX = 'article:conversation:';
  const BADGE = 'data-chatnote-badge';
  const marked = new Set();
  const hasContent = doc => {
    if (!doc) return false;
    const md = String(doc.md || '').trim();
    if (md) return true;
    const plain = String(doc.html || '').replace(/<[^>]*>/g, '').replace(/&nbsp;|&#160;/gi, ' ').trim();
    return !!plain || /<(img|table|hr)\\b/i.test(String(doc.html || ''));
  };
  const idFromHref = href => {
    try {
      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return null;
      return url.pathname.match(/^\\/c\\/([^/]+)\\/?$/)?.[1] || null;
    } catch { return null; }
  };
  const style = document.createElement('style');
  style.textContent = `
    [${BADGE}]{display:inline-flex;align-items:center;justify-content:center;flex:none;
      width:18px;height:18px;margin-inline-end:5px;color:inherit;opacity:.7;
      vertical-align:middle;pointer-events:auto;border:0;background:transparent;
      padding:0;cursor:pointer;border-radius:4px}
    [${BADGE}]:hover{opacity:1;background:rgba(128,128,128,.12)}
    [${BADGE}]:focus-visible{outline:2px solid currentColor;outline-offset:2px}
    [${BADGE}] svg{display:block;width:15px;height:15px}
  `;
  (document.head || document.documentElement).append(style);
  let scheduled = false;
  function scan() {
    scheduled = false;
    // Link semantics survive most class-name and wrapper changes.
    for (const link of document.querySelectorAll('a[href*="/c/"]')) {
      if (link.closest('#cg-notes-host')) continue;
      const id = idFromHref(link.getAttribute('href'));
      if (!id) continue;
      const existing = link.querySelector('[' + BADGE + ']');
      if (!marked.has(id)) {
        existing?.remove();
        continue;
      }
      if (existing) continue;
      // Don't change ChatGPT's link or title text; inject a small independent element.
      const badge = document.createElement('button');
      badge.type = 'button';
      badge.setAttribute(BADGE, '');
      badge.setAttribute('aria-label', '打开 ChatNote 笔记');
      badge.title = '打开 ChatNote 笔记';
      badge.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>';
      badge.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const target = new URL(link.href);
        if (location.pathname !== target.pathname) link.click();
        let attempts = 0;
        const openWhenReady = () => {
          const host = document.getElementById('cg-notes-host');
          const toggle = host?.shadowRoot?.getElementById('toggle');
          if (location.pathname === target.pathname && toggle && !toggle.hidden) {
            toggle.click();
          } else if (attempts++ < 20) {
            setTimeout(openWhenReady, 150);
          }
        };
        setTimeout(openWhenReady, 100);
      });
      // Prefer the title span when available; otherwise prepend to the link.
      const title = link.querySelector('span[dir], span.truncate');
      (title?.parentElement && title.parentElement !== link ? title.parentElement : link).prepend(badge);
    }
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    setTimeout(scan, 100);
  }
  chrome.storage.local.get(null).then(data => {
    for (const [key, value] of Object.entries(data)) {
      if (key.startsWith(PREFIX) && hasContent(value)) marked.add(key.slice(PREFIX.length));
    }
    schedule();
  }).catch(() => {});
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;
    let changed = false;
    for (const [key, change] of Object.entries(changes)) {
      if (!key.startsWith(PREFIX)) continue;
      const id = key.slice(PREFIX.length);
      if (hasContent(change.newValue)) marked.add(id);
      else marked.delete(id);
      changed = true;
    }
    if (changed) schedule();
  });
  const observer = new MutationObserver(mutations => {
    if (mutations.some(m => m.type === 'childList' &&
      [...m.addedNodes, ...m.removedNodes].some(n => n.nodeType === 1 && !n.hasAttribute?.(BADGE)))) schedule();
  });
  observer.observe(document.documentElement, {childList:true,subtree:true});
  schedule();
})();