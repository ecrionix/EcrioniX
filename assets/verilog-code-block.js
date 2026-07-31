/* Shared Verilog code-block highlighter + copy-to-clipboard for EcrioniX course lessons.
   Usage: <div class="code-panel"><div class="code-panel-head">...<button class="copy-btn"
   onclick="copyLabCode('someId', this)">Copy</button></div><pre id="someId">...raw code...</pre></div>
   Include this script (defer) plus verilog-code-block.css on any lesson page with code blocks. */
(function () {
  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  var KEYWORDS = ['module','endmodule','function','endfunction','task','endtask',
    'begin','end','if','else','case','endcase','default',
    'for','while','initial','always','assign','parameter','localparam',
    'generate','endgenerate','genvar'];
  var TYPES = ['input','output','inout','reg','wire','integer','real','logic','signed','unsigned'];
  var EDGES = ['posedge', 'negedge'];

  var KEYWORD_SET = new Set(KEYWORDS);
  var TYPE_SET = new Set(TYPES);
  var EDGE_SET = new Set(EDGES);

  var TOKEN_RE = /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*")|(\$\w+)|(\d+'[bhdBHDoO][0-9a-fA-Fxz_]+)|(\b\d+\.?\d*\b)|([A-Za-z_]\w*)|(\s+)|([^\sA-Za-z_0-9]+)/g;

  function highlightVerilog(code) {
    var out = '';
    var m;
    TOKEN_RE.lastIndex = 0;
    while ((m = TOKEN_RE.exec(code)) !== null) {
      var comment = m[1], str = m[2], sys = m[3], sizedNum = m[4], num = m[5], word = m[6], space = m[7], punct = m[8];
      if (comment) out += '<span class="hl-cmt">' + esc(comment) + '</span>';
      else if (str) out += '<span class="hl-str">' + esc(str) + '</span>';
      else if (sys) out += '<span class="hl-sys">' + esc(sys) + '</span>';
      else if (sizedNum) out += '<span class="hl-num">' + esc(sizedNum) + '</span>';
      else if (num) out += '<span class="hl-num">' + esc(num) + '</span>';
      else if (word) {
        if (KEYWORD_SET.has(word)) out += '<span class="hl-kw">' + esc(word) + '</span>';
        else if (TYPE_SET.has(word)) out += '<span class="hl-type">' + esc(word) + '</span>';
        else if (EDGE_SET.has(word)) out += '<span class="hl-edge">' + esc(word) + '</span>';
        else out += esc(word);
      }
      else if (space) out += space;
      else if (punct) out += esc(punct);
    }
    return out;
  }

  function initCodePanels() {
    var blocks = document.querySelectorAll('.code-panel pre');
    for (var i = 0; i < blocks.length; i++) {
      var pre = blocks[i];
      if (pre.dataset.highlighted) continue;
      var raw = pre.textContent;
      pre.dataset.raw = raw;
      pre.innerHTML = highlightVerilog(raw);
      pre.dataset.highlighted = 'true';
    }
  }

  window.copyLabCode = function (id, btn) {
    var el = document.getElementById(id);
    var text = el.dataset.raw || el.textContent;
    var original = btn.innerText;
    var showResult = function (label) {
      btn.innerText = label;
      setTimeout(function () { btn.innerText = original; }, 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { showResult('Copied!'); }).catch(function () { showResult('Failed — select & copy manually'); });
    } else {
      showResult('Failed — select & copy manually');
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodePanels);
  } else {
    initCodePanels();
  }
})();
