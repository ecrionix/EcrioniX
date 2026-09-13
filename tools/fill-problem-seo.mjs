/**
 * Inject crawler-visible unique copy into each /problems/<slug>/ page
 * and a static problem list on the hub. Run from repo root: node tools/fill-problem-seo.mjs
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadCatalog() {
  const code = fs.readFileSync(path.join(root, 'assets/problems-catalog.js'), 'utf8');
  const ctx = { window: {}, globalThis: {} };
  ctx.window = ctx;
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  vm.runInContext(code, ctx);
  return ctx.ECRIONIX_PROBLEMS;
}

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function strip(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const TRUST =
  '© 2026 EcrioniX · <a href="/">Home</a> · <a href="/about/">About</a> · <a href="/contact/">Contact</a> · <a href="/legal/privacy.html">Privacy</a> · <a href="/legal/terms.html">Terms</a> · <a href="/legal/disclaimer.html">Disclaimer</a> · <a href="/problems/">All problems</a>';

function related(all, p) {
  return all
    .filter((x) => x.slug !== p.slug && x.category === p.category)
    .slice(0, 4);
}

function article(p, all) {
  const tags = (p.tags || []).join(', ') || 'Verilog RTL';
  const concept = p.concept || '';
  const conceptText = strip(concept);
  const rel = related(all, p);
  const relHtml = rel
    .map(
      (r) =>
        `<li><a href="/problems/${r.slug}/">${esc(r.title)}</a> — ${esc(r.lede)}</li>`
    )
    .join('');
  const starterLines = (p.starter || '')
    .split('\n')
    .slice(0, 12)
    .join('\n');
  const how =
    p.difficulty === 'easy'
      ? `This is an introductory kata. Prefer a clear continuous assignment or a small combinational always block. Name the module <code>top_module</code> and keep the port list identical to the table — the hidden testbench instantiates that name.`
      : p.difficulty === 'medium'
        ? `This is a medium kata: you will need sequential logic or a small FSM. Decide what is registered versus combinational before you type. Reset polarity and clock edge must match the spec; the judge will fail you on the first mismatched cycle.`
        : `This is a hard kata. Sketch the state bits and the illegal overlaps (full/empty, wrap, simultaneous enable) on paper first. A design that “usually works” in your head will fail a directed corner in the hidden tests.`;
  const why = `Engineers use “${esc(p.title)}” as a building block in ${esc(p.category).toLowerCase()}. Interviewers ask for the same ports and the same corner cases this judge covers. Completing it in the browser is the same skill as writing synthesizable RTL at work, minus the EDA license.`;
  const tests = `Hidden tests instantiate <code>top_module</code>, drive the ports, and compare every sample against a golden model. They do not grade coding style. They do grade X/Z, off-by-one counters, and ignoring enables. Sign in only when you want the run saved on the leaderboard — the specification below is public.`;
  const faq1 = `What does the ${esc(p.title)} problem ask for? ${esc(p.lede)} Implement it as Verilog module top_module with the listed ports.`;
  const faq2 = `Is ${esc(p.title)} combinational or sequential? Tags: ${esc(tags)}. Follow the clock/reset ports if they appear in the table; if there is no clock, use continuous assignment or combinational always @(*).`;
  const faq3 = `How is ${esc(p.title)} graded? A hidden SystemVerilog/Verilog testbench in the EcrioniX judge simulates your module in the browser. You pass when every directed vector matches, including the waveform contract shown on this page.`;

  const desc = `${p.title} — ${p.lede} Graded Verilog problem (${p.difficulty}, ${p.points} pts) in ${p.category}. Write top_module, run hidden tests in the browser.`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: p.title,
    description: desc,
    url: `https://ecrionix.org/problems/${p.slug}/`,
    educationalLevel: p.difficulty,
    learningResourceType: 'Practice problem',
    isPartOf: { '@type': 'CreativeWork', name: 'EcrioniX Verilog Problems', url: 'https://ecrionix.org/problems/' },
    publisher: { '@type': 'Organization', name: 'EcrioniX', url: 'https://ecrionix.org/' },
  };

  return { desc, html: `
<article class="problem-seo" id="problemSeo">
  <p class="crumb"><a href="/problems/">Verilog problems</a> / ${esc(p.category)}</p>
  <h2>What you must build</h2>
  <p>${esc(p.lede)}</p>
  <p>${why}</p>
  <div class="concept-static">${concept}</div>
  <h2>Port contract</h2>
  <p>The judge instantiates exactly these ports. Extra ports or a different module name fail to elaborate.</p>
  <div class="ports-static">${p.portsHtml || ''}</div>
  <h2>How to approach this kata</h2>
  <p>${how}</p>
  <p>${tests}</p>
  <h2>Starter shape</h2>
  <p>Copy this skeleton into the editor (or press Reset starter). Fill the body; do not rename the module.</p>
  <pre class="starter-pre">${esc(starterLines)}</pre>
  <h2>Why this shows up in interviews</h2>
  <p>${esc(p.title)} sits under <strong>${esc(p.category)}</strong> (${esc(tags)}). ${esc(conceptText)}</p>
  <p>A passing solution is synthesizable intent: no delays in the DUT, no initial blocks inside <code>top_module</code>, and no reference to testbench tasks. Use blocking assignments only in combinational always blocks; use non-blocking for registers clocked by <code>clk</code>.</p>
  ${relHtml ? `<h2>Related problems</h2><ul>${relHtml}</ul>` : ''}
  <h2>FAQ</h2>
  <details><summary>What does this problem require?</summary><p>${esc(faq1)}</p></details>
  <details><summary>Combinational or sequential?</summary><p>${esc(faq2)}</p></details>
  <details><summary>How does the auto-grader work?</summary><p>${esc(faq3)}</p></details>
</article>
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
` };
}

function patchProblemPage(file, p, all) {
  let t = fs.readFileSync(file, 'utf8');
  const { desc, html } = article(p, all);
  const title = `${p.title} — Verilog problem (${p.difficulty}) | EcrioniX`;
  t = t.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  t = t.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${esc(title)}">`
  );
  t = t.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${esc(desc).slice(0, 300)}">`
  );
  if (!t.includes('name="description"')) {
    t = t.replace(
      '<meta charset="UTF-8">',
      `<meta charset="UTF-8">\n<meta name="description" content="${esc(desc).slice(0, 300)}">\n<meta name="robots" content="index,follow">`
    );
  }
  t = t.replace(
    '<div id="authLoading"><div class="auth-spinner"></div></div>',
    '<div id="authLoading" style="display:none"><div class="auth-spinner"></div></div>'
  );
  t = t.replace(
    '<div id="pageContent" style="display:none">',
    '<div id="pageContent">'
  );
  t = t.replace(
    /<h1 id="problemTitle"[^>]*>[\s\S]*?<\/h1>/,
    `<h1 id="problemTitle" style="font-size:1.55rem;color:var(--heading,#f8fafc);margin-bottom:.35rem">${esc(p.title)}</h1>`
  );
  t = t.replace(
    /<p id="problemLede"[^>]*>[\s\S]*?<\/p>/,
    `<p id="problemLede" style="color:var(--sl);margin-bottom:1rem">${esc(p.lede)}</p>`
  );
  if (t.includes('id="problemSeo"')) {
    t = t.replace(/<article class="problem-seo"[\s\S]*?<\/article>\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, html.trim());
  } else {
    t = t.replace('<div class="solve-layout">', html + '\n    <div class="solve-layout">');
  }
  t = t.replace(/<footer>[\s\S]*?<\/footer>/, `<footer>${TRUST}</footer>`);
  fs.writeFileSync(file, t);
}

function hubList(all) {
  return all
    .map((p) => {
      return `<a class="problem-row" href="/problems/${p.slug}/">
      <span class="problem-diff ${esc(p.difficulty)}">${esc(p.difficulty)}</span>
      <div class="problem-body">
        <div class="problem-title">${esc(p.title)}</div>
        <div class="problem-meta">${esc(p.category)} · ${esc((p.tags || []).join(', '))} — ${esc(p.lede)}</div>
      </div>
      <span class="problem-pts">${p.points} pts</span>
    </a>`;
    })
    .join('\n');
}

function main() {
  const all = loadCatalog();
  let n = 0;
  for (const p of all) {
    const file = path.join(root, 'problems', p.slug, 'index.html');
    if (!fs.existsSync(file)) {
      console.warn('missing html', p.slug);
      continue;
    }
    patchProblemPage(file, p, all);
    n++;
  }
  const hub = path.join(root, 'problems', 'index.html');
  let h = fs.readFileSync(hub, 'utf8');
  const list = hubList(all);
  if (h.includes('id="problemList"')) {
    h = h.replace(
      /<div class="problem-list" id="problemList"><\/div>/,
      `<div class="problem-list" id="problemList">\n${list}\n        </div>`
    );
    h = h.replace(
      /<div class="problem-list" id="problemList">[\s\S]*?<\/div>\s*<\/div>\s*<aside>/,
      `<div class="problem-list" id="problemList">\n${list}\n        </div>\n      </div>\n      <aside>`
    );
  }
  fs.writeFileSync(hub, h);
  console.log('patched problems', n, 'of', all.length);
}

main();
