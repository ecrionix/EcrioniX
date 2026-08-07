/* EcrioniX Assistant — lightweight, dependency-free topic recommender.
   Asks what the visitor wants to learn and suggests relevant pages.
   Static-site friendly: all matching happens in the browser. */
(function(){
  if (window.__ecxBot) return; window.__ecxBot = true;

  // ---- Theme: apply saved preference + load shared CSS/toggle on public pages ----
  (function(){
    try {
      var t = localStorage.getItem('ecrionix-theme')
        || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      document.documentElement.setAttribute('data-theme', t);
    } catch (e) {}

    function ensureStylesheet(href) {
      if ([].some.call(document.styleSheets, function (s) { return s.href && s.href.indexOf(href) !== -1; })) return;
      if (document.querySelector('link[href="' + href + '"]')) return;
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
    ensureStylesheet('/assets/theme-toggle.css');
    ensureStylesheet('/assets/site-theme.css?v=2');

    function ensureToggleScript() {
      if (document.getElementById('themeToggleBtn') || window.__ecxThemeToggleLoading) return;
      if ([].some.call(document.scripts, function (s) { return s.src && s.src.indexOf('theme-toggle.js') !== -1; })) return;
      window.__ecxThemeToggleLoading = true;
      var s = document.createElement('script');
      s.src = '/assets/theme-toggle.js';
      s.defer = true;
      document.head.appendChild(s);
    }
    ensureToggleScript();
  })();

  // ---- curated topic index ----
  var IDX = [
    {t:"Topics Directory", u:"/topics/", s:"Navigate", k:"topics directory category browse hubs courses tools"},
    {t:"All Courses Roadmap", u:"/courses/", s:"Navigate", k:"courses roadmap learning path"},
    // VLSI / physical
    {t:"VLSI Hub — all chip-design topics", u:"/vlsi/", s:"VLSI", k:"vlsi chip design asic soc semiconductor"},
    {t:"Physical Design — netlist to GDSII", u:"/physical-design/", s:"VLSI", k:"physical design floorplan placement routing pnr gdsii backend"},
    {t:"VLSI Design Flow (animated)", u:"/vlsi-design-flow/", s:"VLSI", k:"rtl to gdsii flow design flow stages asic"},
    {t:"Logic Synthesis — RTL to gates", u:"/synthesis/", s:"VLSI", k:"synthesis yosys netlist constraints sdc gates"},
    {t:"Design for Test (DFT)", u:"/dft/", s:"VLSI", k:"dft scan atpg bist jtag fault coverage test"},
    {t:"Low-Power VLSI Design", u:"/low-power/", s:"VLSI", k:"low power clock gating power gating leakage dvfs upf dynamic"},
    {t:"FinFET vs GAA Transistors", u:"/finfet-vs-gaa/", s:"VLSI", k:"finfet gaa transistor nanosheet 2nm 3nm gate all around"},
    {t:"Transistor Size Evolution", u:"/transistor-evolution/", s:"VLSI", k:"transistor scaling nm node moore history size"},
    {t:"VLSI Career Roadmap", u:"/vlsi-career-roadmap/", s:"Career", k:"career roadmap job vlsi how to start domains salary"},
    // Digital electronics
    {t:"Digital Electronics Hub", u:"/digital-electronics/", s:"Digital", k:"digital electronics logic boolean basics gates combinational sequential"},
    {t:"Logic Gates", u:"/digital-electronics/logic-gates/", s:"Digital", k:"logic gates and or not nand nor xor truth table"},
    {t:"Boolean Algebra Laws", u:"/digital-electronics/boolean-law/", s:"Digital", k:"boolean algebra laws demorgan simplification"},
    {t:"K-Map Solver (tool)", u:"/tools/kmap-solver/", s:"Digital", k:"karnaugh map kmap minimization sop boolean simplify"},
    {t:"What is a GPU?", u:"/digital-electronics/what-is-gpu/", s:"Digital", k:"gpu graphics parallel cores"},
    // Verilog / RTL
    {t:"Verilog Tutorials", u:"/verilog/", s:"Verilog/RTL", k:"verilog hdl rtl coding always assign data types"},
    {t:"RTL Design", u:"/rtl_design/", s:"Verilog/RTL", k:"rtl design fsm pipeline coding style"},
    {t:"SystemVerilog", u:"/systemverilog/", s:"Verilog/RTL", k:"systemverilog uvm verification always_ff logic classes"},
    {t:"Online Verilog Simulator", u:"/tools/verilog-simulator/", s:"Verilog/RTL", k:"verilog simulator compiler online iverilog run waveform vcd synthesis"},
    {t:"Verilog Linter (tool)", u:"/tools/verilog-lint/", s:"Verilog/RTL", k:"lint verilog bugs latch sensitivity width mismatch"},
    {t:"FSM Designer → Verilog (tool)", u:"/tools/fsm-designer/", s:"Verilog/RTL", k:"fsm state machine designer verilog moore mealy"},
    {t:"Verilog Spot-the-Bug (game)", u:"/tools/verilog-spot-the-bug/", s:"Verilog/RTL", k:"verilog bug game debug rtl quiz"},
    {t:"Register Map Generator (tool)", u:"/tools/regmap-gen/", s:"Verilog/RTL", k:"register map generator apb axi rtl ral ipxact datasheet"},
    {t:"Logic Gate Simulator (tool)", u:"/tools/logic-sim/", s:"Verilog/RTL", k:"logic simulator gates circuit build seven segment counter"},
    // STA / CDC
    {t:"Static Timing Analysis (STA) Hub", u:"/sta/", s:"STA/CDC", k:"sta timing analysis setup hold slack path clock"},
    {t:"Setup & Hold Time", u:"/sta/setup-hold/", s:"STA/CDC", k:"setup hold time violation timing"},
    {t:"Clock Tree Synthesis", u:"/sta/clock-tree/", s:"STA/CDC", k:"clock tree cts skew latency"},
    {t:"SDC Constraints", u:"/sta/sdc/", s:"STA/CDC", k:"sdc constraints create clock input output delay"},
    {t:"Timing Closure", u:"/sta/timing-closure/", s:"STA/CDC", k:"timing closure fix violations slack"},
    {t:"CDC Lab (tool)", u:"/tools/cdc-lab/", s:"STA/CDC", k:"cdc clock domain crossing metastability synchronizer fifo"},
    {t:"Metastability & CDC FIFO", u:"/vlsi/metastability-cdc-fifo/", s:"STA/CDC", k:"metastability cdc fifo synchronizer mtbf"},
    // Protocols
    {t:"Hardware Protocols Hub", u:"/protocols/", s:"Protocols", k:"protocols amba axi apb ahb pcie ddr cxl jtag i2c spi bus"},
    {t:"AXI Protocol", u:"/protocols/axi/", s:"Protocols", k:"axi amba burst channels handshake read write"},
    {t:"APB Protocol", u:"/protocols/apb/", s:"Protocols", k:"apb peripheral bus amba low power"},
    {t:"AHB Protocol", u:"/protocols/ahb/", s:"Protocols", k:"ahb bus pipelined burst"},
    {t:"I2C Protocol", u:"/protocols/i2c/", s:"Protocols", k:"i2c two wire sda scl sensor"},
    {t:"SPI Protocol", u:"/protocols/spi/", s:"Protocols", k:"spi mosi miso sclk full duplex"},
    {t:"PCIe Protocol", u:"/protocols/pcie/", s:"Protocols", k:"pcie pci express lanes gen serial"},
    {t:"AXI-to-APB Bridge (tool)", u:"/tools/axi-apb-bridge/", s:"Protocols", k:"axi apb bridge fsm timing block diagram"},
    // ARM course
    {t:"ARM Architecture from Scratch (course)", u:"/arm-architecture/", s:"ARM", k:"arm architecture course cortex registers instruction set mmu cache trustzone aarch64 beginner"},
    {t:"ARM Day 1 — What is ARM?", u:"/arm-architecture/day-01-what-is-arm/", s:"ARM", k:"arm risc cisc start beginner day 1 what is arm"},
    // AI hardware / future
    {t:"What Is an AI Chip?", u:"/what-is-an-ai-chip/", s:"AI Hardware", k:"ai chip accelerator npu tpu systolic array gemm inference training"},
    {t:"Beyond HBM — AI Memory Alternatives", u:"/ai-memory-alternatives/", s:"AI Hardware", k:"memory hbm pim in-memory compute memristor reram ai"},
    {t:"Photonics Explained", u:"/photonics-explained/", s:"AI Hardware", k:"photonics light optical computing waveguide"},
    {t:"Quantum Computing Explained", u:"/quantum-computing-explained/", s:"AI Hardware", k:"quantum computing qubit superposition entanglement chip"},
    {t:"Is Moore's Law Dead? (animated)", u:"/is-moores-law-dead/", s:"AI Hardware", k:"moore law dead dennard scaling transistor count"},
    {t:"RISC-V vs ARM", u:"/risc-v-vs-arm/", s:"AI Hardware", k:"risc-v vs arm isa open source comparison"},
    {t:"The AI Semiconductor Boom", u:"/ai-semiconductor-boom/", s:"AI Hardware", k:"ai semiconductor boom memory demand hbm gpu chips"},
    // Architecture labs / games
    {t:"GPU Lab — How a GPU Works", u:"/tools/gpu-lab/", s:"Labs & Games", k:"gpu lab simt parallel cpu vs gpu interactive"},
    {t:"Systolic Array Lab", u:"/tools/systolic-array-lab/", s:"Labs & Games", k:"systolic array matrix multiply dataflow ai accelerator"},
    {t:"Cache Simulator", u:"/tools/cache-sim/", s:"Labs & Games", k:"cache simulator hit miss amat associativity"},
    {t:"Booster Landing Game (SpaceX-style)", u:"/tools/booster-landing/", s:"Labs & Games", k:"rocket booster landing game spacex physics fun"},
    {t:"Logic Forge (puzzle game)", u:"/tools/logic-forge/", s:"Labs & Games", k:"logic puzzle game gates build fun"},
    {t:"All Tools & Labs", u:"/tools/", s:"Labs & Games", k:"tools labs games interactive all simulators"},
    // Interview
    {t:"Interview Prep", u:"/interview/", s:"Career", k:"interview questions vlsi prep placement digital"}
  ];

  var CHIPS = [
    ["VLSI","vlsi physical design synthesis dft low power"],
    ["Verilog & RTL","verilog rtl systemverilog simulator fsm"],
    ["Protocols","protocols axi apb ahb i2c spi pcie"],
    ["STA & CDC","sta timing setup hold clock cdc metastability"],
    ["ARM course","arm architecture course cortex"],
    ["AI chips","ai chip gpu quantum photonics moore memory"],
    ["Tools & games","tools labs games simulator gpu cache booster"],
    ["Interview prep","interview questions placement prep"]
  ];

  function search(q){
    q=(q||"").toLowerCase();
    var toks=q.split(/[^a-z0-9+]+/).filter(function(x){return x.length>1;});
    if(!toks.length) return [];
    var scored=IDX.map(function(e){
      var hay=(e.t+" "+e.k+" "+e.s).toLowerCase();
      var sc=0;
      toks.forEach(function(tk){
        if(e.t.toLowerCase().indexOf(tk)>=0) sc+=3;
        else if(hay.indexOf(tk)>=0) sc+=1;
      });
      return {e:e,sc:sc};
    }).filter(function(x){return x.sc>0;});
    scored.sort(function(a,b){return b.sc-a.sc;});
    return scored.slice(0,5).map(function(x){return x.e;});
  }

  // ---- styles ----
  var css = ''
  +'#ecx-bot-btn{position:fixed;left:18px;bottom:18px;z-index:99998;width:56px;height:56px;border-radius:50%;border:none;cursor:pointer;background:linear-gradient(135deg,#1d4ed8,#0ea5e9);color:#fff;font-size:24px;box-shadow:0 6px 20px rgba(14,165,233,.4);transition:transform .15s}'
  +'#ecx-bot-btn:hover{transform:scale(1.08)}'
  +'#ecx-bot-btn .dot{position:absolute;top:-2px;right:-2px;width:14px;height:14px;background:#4ade80;border:2px solid #020617;border-radius:50%}'
  +'#ecx-bot{position:fixed;left:18px;bottom:84px;z-index:99999;width:330px;max-width:calc(100vw - 36px);height:460px;max-height:calc(100vh - 120px);background:#0b1220;border:1px solid rgba(148,163,184,.18);border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.5);display:none;flex-direction:column;overflow:hidden;font-family:Outfit,system-ui,sans-serif}'
  +'#ecx-bot.open{display:flex}'
  +'#ecx-bot .hd{background:linear-gradient(135deg,#0f1e3d,#0b2540);padding:12px 14px;display:flex;align-items:center;gap:9px;border-bottom:1px solid rgba(148,163,184,.15)}'
  +'#ecx-bot .hd .av{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#38bdf8,#2dd4bf);display:flex;align-items:center;justify-content:center;font-size:16px}'
  +'#ecx-bot .hd b{color:#f1f5f9;font-size:14px;font-weight:700}#ecx-bot .hd span{color:#4ade80;font-size:11px;display:block}'
  +'#ecx-bot .hd .x{margin-left:auto;background:none;border:none;color:#94a3b8;font-size:20px;cursor:pointer;line-height:1}'
  +'#ecx-bot .body{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:9px}'
  +'#ecx-bot .msg{max-width:88%;padding:9px 12px;border-radius:12px;font-size:13px;line-height:1.5}'
  +'#ecx-bot .bot{background:#15233b;color:#e2e8f0;border-bottom-left-radius:3px;align-self:flex-start}'
  +'#ecx-bot .me{background:linear-gradient(135deg,#1d4ed8,#0ea5e9);color:#fff;border-bottom-right-radius:3px;align-self:flex-end}'
  +'#ecx-bot .chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:2px}'
  +'#ecx-bot .chip{background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.35);color:#7dd3fc;font-size:12px;padding:5px 10px;border-radius:999px;cursor:pointer}'
  +'#ecx-bot .chip:hover{background:rgba(56,189,248,.22)}'
  +'#ecx-bot .rec{display:block;background:#0e1a30;border:1px solid rgba(148,163,184,.15);border-radius:10px;padding:8px 10px;text-decoration:none;margin-top:5px}'
  +'#ecx-bot .rec:hover{border-color:#38bdf8}'
  +'#ecx-bot .rec .rt{color:#38bdf8;font-size:12.5px;font-weight:600;display:block}'
  +'#ecx-bot .rec .rs{color:#64748b;font-size:10.5px}'
  +'#ecx-bot .ft{display:flex;gap:6px;padding:10px;border-top:1px solid rgba(148,163,184,.15);background:#0b1220}'
  +'#ecx-bot .ft input{flex:1;background:#15233b;border:1px solid rgba(148,163,184,.2);border-radius:9px;padding:9px 11px;color:#e2e8f0;font-size:13px;outline:none}'
  +'#ecx-bot .ft input:focus{border-color:#38bdf8}'
  +'#ecx-bot .ft button{background:linear-gradient(135deg,#1d4ed8,#0ea5e9);border:none;color:#fff;border-radius:9px;padding:0 14px;cursor:pointer;font-size:15px}';

  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  // ---- build DOM ----
  var btn=document.createElement('button'); btn.id='ecx-bot-btn'; btn.title='Ask EcrioniX Assistant';
  btn.innerHTML='💬<span class="dot"></span>';
  var box=document.createElement('div'); box.id='ecx-bot';
  box.innerHTML=''
    +'<div class="hd"><div class="av">🤖</div><div><b>EcrioniX Assistant</b><span>● online</span></div><button class="x" aria-label="Close">×</button></div>'
    +'<div class="body" id="ecx-body"></div>'
    +'<div class="ft"><input id="ecx-in" type="text" placeholder="Type a topic… e.g. AXI, cache, ARM" autocomplete="off"><button id="ecx-send" aria-label="Send">➤</button></div>';
  document.body.appendChild(btn); document.body.appendChild(box);

  var body=box.querySelector('#ecx-body'), input=box.querySelector('#ecx-in');
  function el(cls,html){var d=document.createElement('div');d.className=cls;d.innerHTML=html;body.appendChild(d);body.scrollTop=body.scrollHeight;return d;}
  function botMsg(h){return el('msg bot',h);}
  function meMsg(h){return el('msg me',h);}

  function showChips(){
    var wrap=document.createElement('div'); wrap.className='chips';
    CHIPS.forEach(function(c){
      var b=document.createElement('button'); b.className='chip'; b.textContent=c[0];
      b.onclick=function(){ meMsg(c[0]); respond(c[1], c[0]); };
      wrap.appendChild(b);
    });
    body.appendChild(wrap); body.scrollTop=body.scrollHeight;
  }

  function respond(query, label){
    var res=search(query);
    setTimeout(function(){
      if(!res.length){
        botMsg("Hmm, I didn't find a match for that. Try a keyword like <b>AXI</b>, <b>STA</b>, <b>cache</b>, <b>FinFET</b>, <b>ARM</b>, or tap a topic below 👇");
        showChips(); return;
      }
      var m=botMsg("Here’s what I’d explore for <b>"+(label||query)+"</b>:");
      res.forEach(function(e){
        var a=document.createElement('a'); a.className='rec'; a.href=e.u;
        a.innerHTML='<span class="rt">'+e.t+' →</span><span class="rs">'+e.s+'</span>';
        body.appendChild(a);
      });
      var more=botMsg("Want something else? Pick a topic or type another keyword.");
      showChips();
    }, 250);
  }

  var greeted=false;
  function greet(){
    if(greeted) return; greeted=true;
    botMsg("👋 Hi! I’m the EcrioniX Assistant. <b>What are you trying to learn today?</b>");
    botMsg("Pick a topic below, or type a keyword (e.g. <i>AXI, cache, FinFET, ARM, Moore’s law</i>).");
    showChips();
  }
  function openBox(){ box.classList.add('open'); greet(); setTimeout(function(){input.focus();},100); }
  function closeBox(){ box.classList.remove('open'); }

  btn.onclick=function(){ box.classList.contains('open')?closeBox():openBox(); };
  box.querySelector('.x').onclick=closeBox;
  function send(){ var v=input.value.trim(); if(!v) return; meMsg(v.replace(/</g,'&lt;')); input.value=''; respond(v, v); }
  box.querySelector('#ecx-send').onclick=send;
  input.addEventListener('keydown',function(e){ if(e.key==='Enter') send(); });

  // ---- Universal mobile menu fix ----
  // 1) Repair pages where hamburger exists but JS never bound (script errors).
  // 2) Inject a hamburger on pages that hide .nav-links with no toggle.
  (function(){
    var css = ''
      +'html,body{max-width:100%;overflow-x:clip}'
      +'.navbar,.nav,nav.navbar{overflow:visible!important}'
      +'.hamburger,.ecx-mnav-btn{display:none;background:none;border:none;cursor:pointer;padding:8px;flex-direction:column;gap:5px;flex-shrink:0;min-width:44px;min-height:44px;align-items:center;justify-content:center;z-index:120;position:relative}'
      +'.hamburger span,.ecx-mnav-btn span{display:block;width:22px;height:2px;background:#e2e8f0;border-radius:2px}'
      +'.mobile-menu{display:none;flex-direction:column;background:#0c1526;border-top:1px solid rgba(148,163,184,.15);padding:.75rem 1.15rem 1rem;gap:0;position:absolute;left:0;right:0;top:100%;z-index:250;max-height:min(70vh,560px);overflow-y:auto;-webkit-overflow-scrolling:touch;box-shadow:0 16px 40px rgba(0,0,0,.45);list-style:none;margin:0}'
      +'.mobile-menu.open{display:flex!important}'
      +'.mobile-menu a{color:#818cf8;text-decoration:none;font-size:.95rem;padding:.75rem 0;border-bottom:1px solid rgba(148,163,184,.1);min-height:44px;display:flex;align-items:center}'
      +'.mobile-menu a:last-child{border-bottom:none}'
      +'@media(max-width:768px){'
        +'.nav-links:not(.ecx-mnav-open){display:none!important}'
        +'.hamburger,.ecx-mnav-btn{display:flex!important}'
        +'.nav-links.ecx-mnav-managed.ecx-mnav-open{display:flex!important;position:absolute;left:0;right:0;top:100%;flex-direction:column;background:#0c1526;border-bottom:1px solid rgba(148,163,184,.15);padding:.75rem 1.25rem;gap:0!important;z-index:250;list-style:none;margin:0;max-height:min(70vh,560px);overflow-y:auto}'
        +'.nav-links.ecx-mnav-open a,.nav-links.ecx-mnav-open li{padding:.7rem 0;border-bottom:1px solid rgba(148,163,184,.1);display:block}'
        +'.nav-links.ecx-mnav-open li:last-child,.nav-links.ecx-mnav-open a:last-child{border-bottom:none}'
        +'.container,.wrap,.content,.page,.hero{padding-left:max(.9rem,env(safe-area-inset-left));padding-right:max(.9rem,env(safe-area-inset-right));box-sizing:border-box}'
        +'img,svg,video,canvas,iframe{max-width:100%;height:auto}'
        +'table{display:block;max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}'
      +'}'
      +'@media(max-width:480px){'
        +'h1{font-size:clamp(1.25rem,6vw,1.75rem)!important;line-height:1.25}'
        +'.cards-grid,.card-grid,.grid{grid-template-columns:1fr!important}'
      +'}';
    var st = document.createElement('style');
    st.setAttribute('data-ecx-mnav','1');
    st.textContent = css;
    document.head.appendChild(st);

    function bindHamburger(ham, menu) {
      if (!ham || !menu || ham.dataset.ecxBound === '1') return;
      ham.dataset.ecxBound = '1';
      ham.setAttribute('aria-expanded', 'false');
      ham.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var open = menu.classList.toggle('open');
        ham.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          menu.classList.remove('open');
          ham.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Repair existing hamburger + mobile-menu pairs (even if page JS failed)
    document.querySelectorAll('.hamburger').forEach(function (ham) {
      var nav = ham.closest('.navbar, .nav, nav') || ham.parentElement;
      if (nav) {
        var cs = getComputedStyle(nav);
        if (cs.position === 'static') nav.style.position = 'relative';
        nav.style.overflow = 'visible';
      }
      var menu = (nav && nav.querySelector('.mobile-menu')) || document.getElementById('mobileMenu') || document.querySelector('.mobile-menu');
      if (!menu) return;
      // Replace node to drop any broken/duplicate page listeners, then bind once
      if (ham.dataset.ecxBound !== '1') {
        var fresh = ham.cloneNode(true);
        ham.parentNode.replaceChild(fresh, ham);
        bindHamburger(fresh, menu);
      }
    });

    // Inject hamburger for pages that only have .nav-links
    document.querySelectorAll('.nav-links').forEach(function (links) {
      var container = links.parentElement;
      if (!container) return;
      if (container.querySelector('.hamburger') || container.querySelector('.ecx-mnav-btn')) return;
      // If a sibling mobile-menu exists under the outer nav, skip injection
      var outer = container.closest('.navbar, .nav, nav') || container;
      if (outer.querySelector('.mobile-menu') && outer.querySelector('.hamburger')) return;

      var cs = getComputedStyle(container);
      if (cs.position === 'static') container.style.position = 'relative';
      container.style.overflow = 'visible';
      links.classList.add('ecx-mnav-managed');

      var mbtn = document.createElement('button');
      mbtn.className = 'ecx-mnav-btn';
      mbtn.type = 'button';
      mbtn.setAttribute('aria-label', 'Toggle menu');
      mbtn.innerHTML = '<span></span><span></span><span></span>';
      mbtn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        links.classList.toggle('ecx-mnav-open');
      };
      container.appendChild(mbtn);
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { links.classList.remove('ecx-mnav-open'); });
      });
    });

    document.addEventListener('click', function (e) {
      document.querySelectorAll('.mobile-menu.open').forEach(function (menu) {
        var nav = menu.closest('.navbar, .nav, nav') || menu.parentElement;
        var ham = nav && nav.querySelector('.hamburger');
        if (menu.contains(e.target) || (ham && ham.contains(e.target))) return;
        menu.classList.remove('open');
        if (ham) ham.setAttribute('aria-expanded', 'false');
      });
      document.querySelectorAll('.nav-links.ecx-mnav-open').forEach(function (links) {
        var btn = links.parentElement && links.parentElement.querySelector('.ecx-mnav-btn');
        if (links.contains(e.target) || (btn && btn.contains(e.target))) return;
        links.classList.remove('ecx-mnav-open');
      });
    });
  })();
})();
