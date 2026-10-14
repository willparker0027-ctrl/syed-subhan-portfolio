// QA: screenshot each section of the deployed oni-ronin site.
const PORT = 9347;
const URL = 'https://oni-ronin.vercel.app/';
const OUT = process.env.HOME + '/workspace/oni-ronin/qa';
const fs = require('fs');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
  const page = (await res.json()).find((t) => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const pending = new Map();
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      const { resolve, reject } = pending.get(m.id);
      pending.delete(m.id);
      m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result);
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const cur = ++id;
      pending.set(cur, { resolve, reject });
      ws.send(JSON.stringify({ id: cur, method, params }));
    });
  const evaluate = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    return r.result && r.result.value;
  };
  const shot = async (name) => {
    const { cssVisualViewport: v } = await send('Page.getLayoutMetrics').then((r) => r);
    const vw = v.clientWidth, vh = v.clientHeight;
    const r = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
    fs.mkdirSync(OUT, { recursive: true });
    fs.writeFileSync(`${OUT}/${name}.jpg`, Buffer.from(r.data, 'base64'));
    console.log('shot', name, vw + 'x' + vh);
  };

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.navigate', { url: URL });
  await sleep(7000);
  await shot('01-preloader');
  await evaluate(`document.querySelector('[data-enter="muted"]')?.click()`);
  await sleep(5000);
  await shot('02-hero');
  for (const [sel, name, wait] of [
    ['#world', '03-world', 4000],
    ['#services', '04-services', 5000],
    ['#arsenal', '05-arsenal', 4000],
    ['#editions', '06-editions', 4000],
    ['#footer', '07-footer', 4000],
  ]) {
    await evaluate(`document.querySelector('${sel}')?.scrollIntoView({block:'start'})`);
    await sleep(wait);
    await shot(name);
  }
  const errs = await evaluate(`window.__qaErrors ? window.__qaErrors.join('\\n').slice(0,500) : 'n/a'`);
  console.log('page errors:', errs);
  ws.close();
  process.exit(0);
}
main().catch((e) => { console.error('ERR', e.message); process.exit(1); });
