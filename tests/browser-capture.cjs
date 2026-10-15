// npm install; npx playwright install chromium; npm run test:browser
// CHROME_PATH optionally selects an existing Chromium binary.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{}),args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage']});
 try {
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 page.setDefaultTimeout(5000);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',r=>r.fulfill({contentType:'text/html; charset=utf-8',body:`<html><head><meta charset="utf-8"><style>body{font:18px sans-serif}main{padding:40px}article{margin-bottom:30px}p{max-width:650px}td{border:1px solid;padding:10px}</style></head><body><main><article data-testid="conversation-turn-1"><div data-message-author-role="assistant"><p id="first">这是第一段内容，用来测试鼠标选中文字。</p><p id="second">这是第二段内容，保留<strong>加粗格式</strong>。</p><table><tr><td>用户数</td><td>每天统计</td></tr></table></div></article><article data-testid="conversation-turn-2"><p id="fallback">没有角色属性时也应当可以摘录。</p></article></main><nav id="outside">导航文字不能被摘录</nav></body></html>`}));
 await page.goto('https://chatgpt.com/c/capture-test');
 await page.evaluate(()=>{
  let stored=null;
  window.chrome={runtime:{sendMessage:async m=>{
   if(m.type==='read')return {ok:true,doc:stored};
   if(m.type==='write'){stored={...m.doc,revision:(stored?.revision||0)+1};return {ok:true,doc:stored};}
   return {ok:true};
  }},storage:{local:{get:async()=>({}),set:async()=>{}},onChanged:{addListener(){}}}};
 });
 for(const f of ['naming.js','content.js'])await page.addScriptTag({path:f==='content.js'&&process.env.CONTENT_SCRIPT?process.env.CONTENT_SCRIPT:path.join(__dirname,'..',f)});
 await page.locator('#toggle').waitFor();await page.waitForTimeout(100);
 await page.locator('#toggle').click();
 const capture=page.locator('#capture'),editor=page.locator('#editor');
 const select=async (selector,mode='contents')=>{
  await page.evaluate(({selector,mode})=>{const r=document.createRange(),el=document.querySelector(selector);mode==='node'?r.selectNode(el):r.selectNodeContents(el);getSelection().removeAllRanges();getSelection().addRange(r);el.dispatchEvent(new MouseEvent('mouseup',{bubbles:true}));},{selector,mode});
  await capture.waitFor({state:'visible'});
 };
 // Real mouse input, not a mocked Selection: drag -> visible button -> click.
 const box=await page.locator('#first').boundingBox();
 await page.mouse.move(box.x+1,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+180,box.y+box.height/2,{steps:12});await page.mouse.up();
 const selected=await page.evaluate(()=>getSelection().toString());assert(selected.length>0);
 await capture.click();assert((await editor.innerText()).includes(selected));
 console.log('PASS real mouse drag and capture click');
 // Parent-boundary selections used by triple-click and select-all.
 await select('[data-message-author-role]','node');await capture.click();
 assert((await editor.innerText()).includes('第二段内容'));assert.equal(await editor.locator('table').count(),1);
 console.log('PASS parent endpoints, multiple paragraphs and table');
 // Existing page layouts without the role attribute must remain capturable.
 await select('#fallback');await capture.click();assert((await editor.innerText()).includes('没有角色属性'));
 console.log('PASS message container fallback');
 // Mouseup handlers on the site cannot suppress capture.
 await page.locator('#first').evaluate(el=>el.addEventListener('mouseup',e=>e.stopPropagation()));
 await select('#first');await capture.click();
 console.log('PASS page stops event propagation');
 // Preserve the editor caret while a different selection is active in the page.
 await editor.fill('前后');await editor.focus();await page.keyboard.press('Home');await page.keyboard.press('ArrowRight');
 await select('#fallback');await capture.click();assert.equal(await editor.innerText(),'前没有角色属性时也应当可以摘录。后');
 console.log('PASS insert at saved caret');
 await select('#second');await capture.click();assert(await editor.locator('strong').count()>0);
 console.log('PASS formatting retained');
 // A keyboard-style selection update without mouseup must also show capture.
 await page.evaluate(()=>{const main=document.querySelector('main');main.tabIndex=-1;main.focus();const r=document.createRange();r.selectNodeContents(document.querySelector('#first'));getSelection().removeAllRanges();getSelection().addRange(r);});
 await capture.waitFor({state:'visible'});await capture.click();
 console.log('PASS selectionchange without mouseup');
 await page.locator('#close').click();await select('#fallback');await capture.click();assert(await editor.isVisible());
 console.log('PASS capture opens collapsed document');
 // Only message content is copied when selection extends into surrounding UI.
 await page.evaluate(()=>{const r=document.createRange();r.setStart(document.querySelector('#fallback').firstChild,0);r.setEnd(document.querySelector('#outside').firstChild,4);getSelection().removeAllRanges();getSelection().addRange(r);document.dispatchEvent(new MouseEvent('mouseup'));});
 await capture.click();assert(!(await editor.innerText()).includes('导航文字'));
 await page.evaluate(()=>{const r=document.createRange();r.selectNodeContents(document.querySelector('#outside'));getSelection().removeAllRanges();getSelection().addRange(r);document.dispatchEvent(new MouseEvent('mouseup'));});
 await capture.waitFor({state:'hidden'});
 // Reproduce the reported true/0 result: no role, article, or turn markers.
 await page.evaluate(()=>{
  document.querySelectorAll('[data-message-author-role],[data-testid]').forEach(el=>{el.removeAttribute('data-message-author-role');el.removeAttribute('data-testid')});
  document.querySelectorAll('article').forEach(el=>{const div=document.createElement('div');div.append(...el.childNodes);el.replaceWith(div)});
 });
 assert.equal(await page.locator('[data-message-author-role],main article,[data-testid^="conversation-turn-"]').count(),0);
 const plainBox=await page.locator('#first').boundingBox();
 await page.mouse.move(plainBox.x+1,plainBox.y+plainBox.height/2);await page.mouse.down();await page.mouse.move(plainBox.x+180,plainBox.y+plainBox.height/2,{steps:12});await page.mouse.up();
 const plainSelected=await page.evaluate(()=>getSelection().toString());assert(plainSelected.length>0);
 const beforePlain=await editor.innerText();await capture.click();assert((await editor.innerText()).length>beforePlain.length);assert((await editor.innerText()).includes(plainSelected));
 console.log('PASS reported zero-container layout: real drag and insert');
 await select('#second');await capture.click();assert(await editor.locator('strong').count()>0);
 const beforeTables=await editor.locator('table').count();await select('table','node');await capture.click();assert.equal(await editor.locator('table').count(),beforeTables+1);
 await page.evaluate(()=>{const r=document.createRange();r.selectNodeContents(document.querySelector('#outside'));getSelection().removeAllRanges();getSelection().addRange(r);document.dispatchEvent(new MouseEvent('mouseup'));});
 await capture.waitFor({state:'hidden'});
 console.log('PASS zero-container formatting/table; navigation excluded');
 assert.deepEqual(errors,[]);
 console.log('PASS surrounding UI excluded; no browser errors');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
