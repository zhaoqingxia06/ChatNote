let queue = Promise.resolve();
chrome.runtime.onMessage.addListener((m, sender, reply) => {
  const trusted = sender.url && (/^https:\/\/(chatgpt\.com|chat\.openai\.com)\//.test(sender.url) || sender.url.startsWith(chrome.runtime.getURL('')));
  if (!trusted) return;
  if (!['read', 'write', 'nativeSaved'].includes(m.type) || typeof m.key !== 'string' || !m.key.startsWith('article:')) return;
  queue = queue.catch(() => {}).then(async () => {
    const stored = (await chrome.storage.local.get(m.key))[m.key] || null;
    if (m.type === 'nativeSaved') {
      if (!stored) return {
        ok: false
      };
      stored.lastSaved = Date.now();
      stored.savedFileName = String(m.savedFileName || stored.savedFileName || '');
      stored.savedFolderName = String(m.savedFolderName || stored.savedFolderName || '');
      await chrome.storage.local.set({
        [m.key]: stored
      });
      return {
        ok: true,
        savedAt: stored.lastSaved
      };
    }
    if (m.type === 'read') return {
      ok: true,
      doc: stored
    };
    if ((stored?.revision || 0) !== m.revision) return {
      ok: false,
      conflict: true,
      doc: stored
    };
    const doc = {
      fileNameManual: !!m.doc.fileNameManual,
      savedFileName: stored?.savedFileName || '',
      savedFolderName: stored?.savedFolderName || '',
      lastSaved: stored?.lastSaved || null,
      fileName: Array.from(String(m.doc.fileName || stored?.fileName || '未命名文档').replace(/[\\/:*?"<>|\x00-\x1f]/g, '').replace(/\s+/g, '')).slice(0, 8).join('') || '未命名文档',
      created: stored?.created || stored?.updated || Number(m.doc.created) || Date.now(),
      title: String(m.doc.title || ''),
      html: String(m.doc.html || ''),
      scroll: Number(m.doc.scroll) || 0,
      md: String(m.doc.md || ''),
      revision: (stored?.revision || 0) + 1,
      updated: Date.now()
    };
    await chrome.storage.local.set({
      [m.key]: doc
    });
    return {
      ok: true,
      doc,
      sync: {
        state: 'off'
      }
    };
  }).then(reply).catch(() => reply({
    ok: false,
    error: true
  }));
  return true;
});
