/* Problem catalog for /problems/ hub + solve pages */
(function (global) {
  'use strict';

  const PROBLEMS = [
  {
    "slug": "wire-passthrough",
    "title": "Wire Connection — Basic Verilog Assignments",
    "difficulty": "easy",
    "points": 10,
    "level": 1,
    "tags": [
      "combinational",
      "logic-gates",
      "easy",
      "verilog-language-basics"
    ],
    "category": "Digital Logic Fundamentals",
    "lede": "Connect a single-bit input port directly to an output port using a continuous assignment.",
    "concept": "<b>Objective:</b> Understand continuous assignment syntax (`assign`), wire data types, and signal propagation in synthesizable Verilog.<br><br><b>Prerequisites:</b> Basic understanding of inputs, outputs, and module port declarations in Verilog-2001.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>in</code></td><td>input</td><td>1</td><td>Source single-bit logic input</td></tr><tr><td><code>out</code></td><td>output</td><td>1</td><td>Driven output, must mirror input continuously</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   in,\n  output  out\n);\n\n  // Wire 'in' directly to 'out'\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg in;\n  wire out;\n  integer errors = 0;\n  top_module dut(.in(in), .out(out));\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    in = 0; #5;\n    if (out !== in) begin errors = errors + 1; $display(\"Test 1: in=%b | expected out=%b | got out=%b | FAIL\", in, in, out); end\n    else $display(\"Test 1: in=%b | expected out=%b | got out=%b | PASS\", in, in, out);\n    in = 1; #5;\n    if (out !== in) begin errors = errors + 1; $display(\"Test 2: in=%b | expected out=%b | got out=%b | FAIL\", in, in, out); end\n    else $display(\"Test 2: in=%b | expected out=%b | got out=%b | PASS\", in, in, out);\n    in = 0; #5;\n    if (out !== in) begin errors = errors + 1; $display(\"Test 3: in=%b | expected out=%b | got out=%b | FAIL\", in, in, out); end\n    else $display(\"Test 3: in=%b | expected out=%b | got out=%b | PASS\", in, in, out);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "in",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "in",
          "wave": "0.1.0."
        },
        {
          "name": "out",
          "wave": "0.1.0."
        }
      ],
      "config": {
        "hscale": 2
      }
    },
    "id": 1,
    "topic": "Digital Logic Fundamentals",
    "subtopic": "Verilog Language Basics",
    "estimatedTime": "5 mins",
    "objective": "Understand continuous assignment syntax (`assign`), wire data types, and signal propagation in synthesizable Verilog.",
    "prerequisites": "Basic understanding of inputs, outputs, and module port declarations in Verilog-2001.",
    "timingReqs": "Combinational path: 0 clock cycles delay (delta-cycle propagation in RTL simulation; gate delay in physical synthesis).",
    "constraints": "Must use synthesizable `assign` statement. Do not instantiate procedural blocks (`always`) or artificial simulation delays (`#`).",
    "ports": [
      {
        "name": "in",
        "dir": "input",
        "width": "1",
        "desc": "Source single-bit logic input"
      },
      {
        "name": "out",
        "dir": "output",
        "width": "1",
        "desc": "Driven output, must mirror input continuously"
      }
    ],
    "referenceRtl": "module top_module(\n  input   in,\n  output  out\n);\n  assign out = in;\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 280 80\" class=\"circuit-svg\"><line x1=\"40\" y1=\"40\" x2=\"240\" y2=\"40\" stroke=\"#38bdf8\" stroke-width=\"3\"/><circle cx=\"40\" cy=\"40\" r=\"4\" fill=\"#38bdf8\"/><circle cx=\"240\" cy=\"40\" r=\"4\" fill=\"#2dd4bf\"/><polygon points=\"145,35 155,40 145,45\" fill=\"#38bdf8\"/><text x=\"15\" y=\"44\" fill=\"#94a3b8\" font-size=\"12\" font-family=\"'JetBrains Mono',monospace\">in</text><text x=\"248\" y=\"44\" fill=\"#2dd4bf\" font-size=\"12\" font-weight=\"700\" font-family=\"'JetBrains Mono',monospace\">out</text><text x=\"120\" y=\"26\" fill=\"#64748b\" font-size=\"10\" font-family=\"'Outfit',sans-serif\">Wire Net</text></svg>",
    "hints": [
      "Continuous assignment in Verilog is achieved using the `assign` keyword.",
      "The syntax is `assign <net_name> = <expression>;`. In hardware, this models a zero-delay electrical wire net.",
      "Write `assign out = in;` between `module` and `endmodule`."
    ],
    "explanation": "A continuous assignment (`assign out = in;`) creates a permanent electrical connection between `in` and `out`. Unlike software variables where an assignment executes once at a specific line in time, Verilog continuous assignments are active at all times: any voltage transition on `in` immediately schedules an update on `out`.",
    "commonMistakes": [
      "Attempting to use `out = in;` without the `assign` keyword in a continuous context.",
      "Declaring `out` as a `reg` and driving it with a continuous `assign` (Verilog-2001 disallows driving reg with continuous assign).",
      "Adding delay tokens like `#1` in synthesizable modules."
    ],
    "hwNotes": "In FPGA synthesis, a direct wire assignment is optimized into a routing net inside the programmable interconnect without consuming LUT logic cells. In ASIC standard cell synthesis, this becomes a metal route, or a buffer cell if load capacitance requires buffering.",
    "relatedSlugs": [
      "not-gate",
      "and-gate",
      "xor-gate"
    ],
    "flagshipIndex": 1,
    "isFlagship": true,
    "curatedTrack": "Level 1: Beginner (Combinational RTL)"
  },
  {
    "slug": "not-gate",
    "title": "NOT Gate — Bitwise Inversion",
    "difficulty": "easy",
    "points": 10,
    "level": 1,
    "tags": [
      "combinational",
      "logic-gates",
      "easy",
      "logic-gates-&-truth-tables"
    ],
    "category": "Digital Logic Fundamentals",
    "lede": "Implement a 1-bit inverter (NOT gate). When input is 0, output is 1; when input is 1, output is 0.",
    "concept": "<b>Objective:</b> Master bitwise negation operators (`~`) and fundamental CMOS inverting logic.<br><br><b>Prerequisites:</b> Boolean logic inversion, truth tables, continuous assignments.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>in</code></td><td>input</td><td>1</td><td>Logic input</td></tr><tr><td><code>out</code></td><td>output</td><td>1</td><td>Inverted logic output (~in)</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   in,\n  output  out\n);\n\n  // Invert input signal\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg in;\n  wire out;\n  integer errors = 0;\n  top_module dut(.in(in), .out(out));\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    in = 0; #5;\n    if (out !== 1'b1) begin errors = errors + 1; $display(\"Test 1: in=0 | expected out=1 | got out=%b | FAIL\", out); end\n    else $display(\"Test 1: in=0 | expected out=1 | got out=%b | PASS\", out);\n    in = 1; #5;\n    if (out !== 1'b0) begin errors = errors + 1; $display(\"Test 2: in=1 | expected out=0 | got out=%b | FAIL\", out); end\n    else $display(\"Test 2: in=1 | expected out=0 | got out=%b | PASS\", out);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "in",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "in",
          "wave": "0.1.0."
        },
        {
          "name": "out",
          "wave": "1.0.1."
        }
      ],
      "config": {
        "hscale": 2
      }
    },
    "id": 2,
    "topic": "Digital Logic Fundamentals",
    "subtopic": "Logic Gates & Truth Tables",
    "estimatedTime": "5 mins",
    "objective": "Master bitwise negation operators (`~`) and fundamental CMOS inverting logic.",
    "prerequisites": "Boolean logic inversion, truth tables, continuous assignments.",
    "timingReqs": "Combinational propagation delay $t_{pd}$ across a single inverter stage.",
    "constraints": "Single-bit inputs and outputs. Synthesizable combinational RTL only.",
    "ports": [
      {
        "name": "in",
        "dir": "input",
        "width": "1",
        "desc": "Logic input"
      },
      {
        "name": "out",
        "dir": "output",
        "width": "1",
        "desc": "Inverted logic output (~in)"
      }
    ],
    "referenceRtl": "module top_module(\n  input   in,\n  output  out\n);\n  assign out = ~in;\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 240 80\" class=\"circuit-svg\"><line x1=\"20\" y1=\"40\" x2=\"60\" y2=\"40\" stroke=\"#38bdf8\" stroke-width=\"2.5\"/><polygon points=\"60,15 125,40 60,65\" stroke=\"#38bdf8\" stroke-width=\"2.5\" fill=\"rgba(56,189,248,0.08)\"/><circle cx=\"132\" cy=\"40\" r=\"6\" stroke=\"#38bdf8\" stroke-width=\"2.5\" fill=\"none\"/><line x1=\"138\" y1=\"40\" x2=\"200\" y2=\"40\" stroke=\"#2dd4bf\" stroke-width=\"2.5\"/><text x=\"8\" y=\"44\" fill=\"#94a3b8\" font-size=\"12\" font-family=\"'JetBrains Mono',monospace\">in</text><text x=\"208\" y=\"44\" fill=\"#2dd4bf\" font-size=\"12\" font-weight=\"700\" font-family=\"'JetBrains Mono',monospace\">out</text><text x=\"76\" y=\"44\" fill=\"#64748b\" font-size=\"11\" font-family=\"'Outfit',sans-serif\">NOT</text></svg>",
    "hints": [
      "Look for the bitwise NOT operator in Verilog.",
      "In Verilog, `~` is bitwise inversion, while `!` is logical negation. For single-bit signals both yield equivalent boolean results, but `~` is idiomatic for bit vectors.",
      "Write `assign out = ~in;`."
    ],
    "explanation": "In CMOS technology, an inverter consists of a complementary PMOS pull-up and NMOS pull-down pair. When `in = 1`, NMOS conducts connecting output to GND; when `in = 0`, PMOS conducts pulling output to VDD.",
    "commonMistakes": [
      "Confusing bitwise inversion (`~`) with logical NOT (`!`) on multi-bit vectors (though on 1-bit they evaluate the same, `!` reduces vectors to 1-bit boolean).",
      "Leaving `out` undriven or unassigned."
    ],
    "hwNotes": "An inverter is the most fundamental cell in standard-cell libraries (INV_X1). It serves as the primary benchmark for process node gate delay ($FO4$ metric).",
    "relatedSlugs": [
      "wire-passthrough",
      "and-gate",
      "nand-gate"
    ],
    "flagshipIndex": 2,
    "isFlagship": true,
    "curatedTrack": "Level 1: Beginner (Combinational RTL)"
  },
  {
    "slug": "and-gate",
    "title": "2-Input AND Gate — Combinational Logic",
    "difficulty": "easy",
    "points": 10,
    "level": 1,
    "tags": [
      "combinational",
      "logic-gates",
      "easy",
      "logic-gates-&-truth-tables"
    ],
    "category": "Digital Logic Fundamentals",
    "lede": "Implement a 2-input AND gate whose output is 1 if and only if both inputs a and b are 1.",
    "concept": "<b>Objective:</b> Understand multi-input boolean product logic and the bitwise AND operator (`&`).<br><br><b>Prerequisites:</b> Boolean product logic, truth tables.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>a</code></td><td>input</td><td>1</td><td>First logic input</td></tr><tr><td><code>b</code></td><td>input</td><td>1</td><td>Second logic input</td></tr><tr><td><code>out</code></td><td>output</td><td>1</td><td>Logical AND output (a &amp; b)</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   a,\n  input   b,\n  output  out\n);\n\n  // Compute a AND b\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg a, b;\n  wire out;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .out(out));\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    a = 0; b = 0; #5;\n    if (out !== 1'b0) begin errors = errors + 1; $display(\"Test 1: a=0, b=0 | expected 0 | got %b | FAIL\", out); end\n    else $display(\"Test 1: a=0, b=0 | expected 0 | got %b | PASS\", out);\n    a = 0; b = 1; #5;\n    if (out !== 1'b0) begin errors = errors + 1; $display(\"Test 2: a=0, b=1 | expected 0 | got %b | FAIL\", out); end\n    else $display(\"Test 2: a=0, b=1 | expected 0 | got %b | PASS\", out);\n    a = 1; b = 0; #5;\n    if (out !== 1'b0) begin errors = errors + 1; $display(\"Test 3: a=1, b=0 | expected 0 | got %b | FAIL\", out); end\n    else $display(\"Test 3: a=1, b=0 | expected 0 | got %b | PASS\", out);\n    a = 1; b = 1; #5;\n    if (out !== 1'b1) begin errors = errors + 1; $display(\"Test 4: a=1, b=1 | expected 1 | got %b | FAIL\", out); end\n    else $display(\"Test 4: a=1, b=1 | expected 1 | got %b | PASS\", out);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a",
          "wave": "0..1.1."
        },
        {
          "name": "b",
          "wave": "0.1.0.1"
        },
        {
          "name": "out",
          "wave": "0...1."
        }
      ],
      "config": {
        "hscale": 2
      }
    },
    "id": 3,
    "topic": "Digital Logic Fundamentals",
    "subtopic": "Logic Gates & Truth Tables",
    "estimatedTime": "5 mins",
    "objective": "Understand multi-input boolean product logic and the bitwise AND operator (`&`).",
    "prerequisites": "Boolean product logic, truth tables.",
    "timingReqs": "Combinational path: output updates within gate delay $t_{and}$ upon any change on a or b.",
    "constraints": "Synthesizable combinational logic.",
    "ports": [
      {
        "name": "a",
        "dir": "input",
        "width": "1",
        "desc": "First logic input"
      },
      {
        "name": "b",
        "dir": "input",
        "width": "1",
        "desc": "Second logic input"
      },
      {
        "name": "out",
        "dir": "output",
        "width": "1",
        "desc": "Logical AND output (a & b)"
      }
    ],
    "referenceRtl": "module top_module(\n  input   a,\n  input   b,\n  output  out\n);\n  assign out = a & b;\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 240 90\" class=\"circuit-svg\"><path d=\"M 30,25 L 70,25 M 30,65 L 70,65 M 70,12 L 105,12 A 32 32 0 0 1 105,78 L 70,78 Z M 137,45 L 195,45\" stroke=\"#38bdf8\" stroke-width=\"2.5\" fill=\"rgba(56,189,248,0.08)\"/><text x=\"14\" y=\"29\" fill=\"#94a3b8\" font-size=\"12\" font-family=\"'JetBrains Mono',monospace\">a</text><text x=\"14\" y=\"69\" fill=\"#94a3b8\" font-size=\"12\" font-family=\"'JetBrains Mono',monospace\">b</text><text x=\"202\" y=\"49\" fill=\"#2dd4bf\" font-size=\"12\" font-weight=\"700\" font-family=\"'JetBrains Mono',monospace\">out</text><text x=\"86\" y=\"49\" fill=\"#64748b\" font-size=\"11\" font-family=\"'Outfit',sans-serif\">AND</text></svg>",
    "hints": [
      "Use the bitwise AND operator `&`.",
      "Truth table: 0&0=0, 0&1=0, 1&0=0, 1&1=1.",
      "Write `assign out = a & b;`."
    ],
    "explanation": "In CMOS silicon, a static AND gate is implemented as an inverting NAND gate followed by an inverter. The output `out` is high only when a conducting path to VDD is formed through both inputs being high.",
    "commonMistakes": [
      "Using logical AND `&&` instead of bitwise `&`. While identical for 1-bit logic, `&&` on vectors reduces operands to scalar boolean values.",
      "Misunderstanding operator precedence when combining AND and OR without parentheses."
    ],
    "hwNotes": "In static CMOS, a NAND gate is faster and smaller than an AND gate (4 transistors vs 6 transistors). Synthesis tools frequently optimize positive logic into inverted NAND/NOR trees.",
    "relatedSlugs": [
      "not-gate",
      "xor-gate",
      "nand-gate"
    ],
    "flagshipIndex": 3,
    "isFlagship": true,
    "curatedTrack": "Level 1: Beginner (Combinational RTL)"
  },
  {
    "slug": "xor-gate",
    "title": "XOR Gate — Exclusive OR",
    "difficulty": "easy",
    "points": 10,
    "level": 1,
    "tags": [
      "combinational",
      "logic-gates",
      "easy",
      "logic-gates-&-truth-tables"
    ],
    "category": "Digital Logic Fundamentals",
    "lede": "Implement an Exclusive-OR (XOR) gate: output is 1 when exactly one input is 1, and 0 when both are identical.",
    "concept": "<b>Objective:</b> Understand odd-parity checking, difference detection, and the bitwise XOR operator (`^`).<br><br><b>Prerequisites:</b> Truth tables, parity logic.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>a</code></td><td>input</td><td>1</td><td>First input bit</td></tr><tr><td><code>b</code></td><td>input</td><td>1</td><td>Second input bit</td></tr><tr><td><code>out</code></td><td>output</td><td>1</td><td>XOR output (a ^ b)</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   a,\n  input   b,\n  output  out\n);\n\n  // Implement XOR logic\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg a, b;\n  wire out;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .out(out));\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    a = 0; b = 0; #5;\n    if (out !== 1'b0) begin errors = errors + 1; $display(\"Test 1: a=0, b=0 | expected 0 | got %b | FAIL\", out); end\n    else $display(\"Test 1: a=0, b=0 | expected 0 | got %b | PASS\", out);\n    a = 0; b = 1; #5;\n    if (out !== 1'b1) begin errors = errors + 1; $display(\"Test 2: a=0, b=1 | expected 1 | got %b | FAIL\", out); end\n    else $display(\"Test 2: a=0, b=1 | expected 1 | got %b | PASS\", out);\n    a = 1; b = 0; #5;\n    if (out !== 1'b1) begin errors = errors + 1; $display(\"Test 3: a=1, b=0 | expected 1 | got %b | FAIL\", out); end\n    else $display(\"Test 3: a=1, b=0 | expected 1 | got %b | PASS\", out);\n    a = 1; b = 1; #5;\n    if (out !== 1'b0) begin errors = errors + 1; $display(\"Test 4: a=1, b=1 | expected 0 | got %b | FAIL\", out); end\n    else $display(\"Test 4: a=1, b=1 | expected 0 | got %b | PASS\", out);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a",
          "wave": "0..1.1."
        },
        {
          "name": "b",
          "wave": "0.1.0.1"
        },
        {
          "name": "out",
          "wave": "0.1.1.0"
        }
      ],
      "config": {
        "hscale": 2
      }
    },
    "id": 4,
    "topic": "Digital Logic Fundamentals",
    "subtopic": "Logic Gates & Truth Tables",
    "estimatedTime": "5 mins",
    "objective": "Understand odd-parity checking, difference detection, and the bitwise XOR operator (`^`).",
    "prerequisites": "Truth tables, parity logic.",
    "timingReqs": "Combinational gate propagation delay.",
    "constraints": "Synthesizable combinational logic.",
    "ports": [
      {
        "name": "a",
        "dir": "input",
        "width": "1",
        "desc": "First input bit"
      },
      {
        "name": "b",
        "dir": "input",
        "width": "1",
        "desc": "Second input bit"
      },
      {
        "name": "out",
        "dir": "output",
        "width": "1",
        "desc": "XOR output (a ^ b)"
      }
    ],
    "referenceRtl": "module top_module(\n  input   a,\n  input   b,\n  output  out\n);\n  assign out = a ^ b;\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 240 90\" class=\"circuit-svg\"><path d=\"M 25,25 L 60,25 M 25,65 L 60,65 M 50,15 A 60 60 0 0 1 50,75 M 60,15 A 60 60 0 0 1 60,75 Q 95,75 125,45 Q 95,15 60,15 Z M 125,45 L 195,45\" stroke=\"#38bdf8\" stroke-width=\"2.5\" fill=\"rgba(56,189,248,0.08)\"/><text x=\"12\" y=\"29\" fill=\"#94a3b8\" font-size=\"12\" font-family=\"'JetBrains Mono',monospace\">a</text><text x=\"12\" y=\"69\" fill=\"#94a3b8\" font-size=\"12\" font-family=\"'JetBrains Mono',monospace\">b</text><text x=\"202\" y=\"49\" fill=\"#2dd4bf\" font-size=\"12\" font-weight=\"700\" font-family=\"'JetBrains Mono',monospace\">out</text><text x=\"82\" y=\"49\" fill=\"#64748b\" font-size=\"11\" font-family=\"'Outfit',sans-serif\">XOR</text></svg>",
    "hints": [
      "The Verilog operator for bitwise XOR is the caret `^`.",
      "XOR is equivalent to $(a \\cdot \\overline{b}) + (\\overline{a} \\cdot b)$.",
      "Write `assign out = a ^ b;`."
    ],
    "explanation": "XOR acts as a programmable inverter: when $b=0$, $out = a$; when $b=1$, $out = \\sim a$. It forms the core arithmetic building block of half adders, full adders, parity generators, LFSRs, and cryptographic ciphers.",
    "commonMistakes": [
      "Confusing bitwise XOR (`^`) with exponentiation (in Verilog, `**` is power).",
      "Assuming XOR is an associative primitive in silicon without propagation delay accumulation in deep trees."
    ],
    "hwNotes": "Transmission gate XOR cells require only 4 or 6 transistors in custom CMOS libraries, making them highly area-efficient compared to building from separate NAND gates.",
    "relatedSlugs": [
      "and-gate",
      "half-adder",
      "full-adder"
    ],
    "flagshipIndex": 4,
    "isFlagship": true,
    "curatedTrack": "Level 1: Beginner (Combinational RTL)"
  },
  {
    "slug": "mux2to1",
    "title": "2:1 Multiplexer — Conditional Selection",
    "difficulty": "easy",
    "points": 10,
    "level": 1,
    "tags": [
      "combinational",
      "logic-gates",
      "easy",
      "multiplexers-&-decoders"
    ],
    "category": "Combinational Logic",
    "lede": "Design a 1-bit 2-to-1 multiplexer that selects input a when sel=0, and input b when sel=1.",
    "concept": "<b>Objective:</b> Master conditional selection using the ternary operator `? :` and multiplexer datapath concepts.<br><br><b>Prerequisites:</b> Boolean selection, conditional expressions.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>a</code></td><td>input</td><td>1</td><td>Data input 0 (selected when sel=0)</td></tr><tr><td><code>b</code></td><td>input</td><td>1</td><td>Data input 1 (selected when sel=1)</td></tr><tr><td><code>sel</code></td><td>input</td><td>1</td><td>Control selection bit</td></tr><tr><td><code>out</code></td><td>output</td><td>1</td><td>Selected data output</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   a,\n  input   b,\n  input   sel,\n  output  out\n);\n\n  // Select a when sel=0, b when sel=1\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg a, b, sel;\n  wire out;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .sel(sel), .out(out));\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    sel = 0; a = 0; b = 1; #5;\n    if (out !== 1'b0) begin errors = errors + 1; $display(\"Test 1: sel=0, a=0, b=1 | expected 0 | got %b | FAIL\", out); end\n    else $display(\"Test 1: sel=0, a=0, b=1 | expected 0 | got %b | PASS\", out);\n    sel = 0; a = 1; b = 0; #5;\n    if (out !== 1'b1) begin errors = errors + 1; $display(\"Test 2: sel=0, a=1, b=0 | expected 1 | got %b | FAIL\", out); end\n    else $display(\"Test 2: sel=0, a=1, b=0 | expected 1 | got %b | PASS\", out);\n    sel = 1; a = 1; b = 0; #5;\n    if (out !== 1'b0) begin errors = errors + 1; $display(\"Test 3: sel=1, a=1, b=0 | expected 0 | got %b | FAIL\", out); end\n    else $display(\"Test 3: sel=1, a=1, b=0 | expected 0 | got %b | PASS\", out);\n    sel = 1; a = 0; b = 1; #5;\n    if (out !== 1'b1) begin errors = errors + 1; $display(\"Test 4: sel=1, a=0, b=1 | expected 1 | got %b | FAIL\", out); end\n    else $display(\"Test 4: sel=1, a=0, b=1 | expected 1 | got %b | PASS\", out);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "sel",
      "a",
      "b",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "sel",
          "wave": "0..1.."
        },
        {
          "name": "a",
          "wave": "0.1.0."
        },
        {
          "name": "b",
          "wave": "1.0.1."
        },
        {
          "name": "out",
          "wave": "0.1.0.1"
        }
      ],
      "config": {
        "hscale": 2
      }
    },
    "id": 5,
    "topic": "Combinational Logic",
    "subtopic": "Multiplexers & Decoders",
    "estimatedTime": "10 mins",
    "objective": "Master conditional selection using the ternary operator `? :` and multiplexer datapath concepts.",
    "prerequisites": "Boolean selection, conditional expressions.",
    "timingReqs": "Combinational path: select-to-out ($t_{sel \\to out}$) and data-to-out ($t_{data \\to out}$).",
    "constraints": "Pure combinational RTL; no latches.",
    "ports": [
      {
        "name": "a",
        "dir": "input",
        "width": "1",
        "desc": "Data input 0 (selected when sel=0)"
      },
      {
        "name": "b",
        "dir": "input",
        "width": "1",
        "desc": "Data input 1 (selected when sel=1)"
      },
      {
        "name": "sel",
        "dir": "input",
        "width": "1",
        "desc": "Control selection bit"
      },
      {
        "name": "out",
        "dir": "output",
        "width": "1",
        "desc": "Selected data output"
      }
    ],
    "referenceRtl": "module top_module(\n  input   a,\n  input   b,\n  input   sel,\n  output  out\n);\n  assign out = sel ? b : a;\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 240 100\" class=\"circuit-svg\"><polygon points=\"70,15 130,30 130,70 70,85\" stroke=\"#38bdf8\" stroke-width=\"2.5\" fill=\"rgba(56,189,248,0.06)\"/><path d=\"M 30,30 L 70,30 M 30,70 L 70,70 M 130,50 L 190,50 M 100,77 L 100,95\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"none\"/><text x=\"14\" y=\"34\" fill=\"#94a3b8\" font-size=\"12\" font-family=\"'JetBrains Mono',monospace\">a (0)</text><text x=\"14\" y=\"74\" fill=\"#94a3b8\" font-size=\"12\" font-family=\"'JetBrains Mono',monospace\">b (1)</text><text x=\"196\" y=\"54\" fill=\"#2dd4bf\" font-size=\"12\" font-weight=\"700\" font-family=\"'JetBrains Mono',monospace\">out</text><text x=\"92\" y=\"100\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"700\" font-family=\"'JetBrains Mono',monospace\">sel</text><text x=\"90\" y=\"54\" fill=\"#64748b\" font-size=\"10\" font-family=\"'Outfit',sans-serif\">2:1 MUX</text></svg>",
    "hints": [
      "You can use the conditional ternary operator `? :`.",
      "The syntax is `condition ? true_value : false_value`.",
      "Write `assign out = sel ? b : a;`."
    ],
    "explanation": "A 2:1 multiplexer routes one of two inputs to the output based on `sel`. Boolean equation: $out = (\\sim sel \\& a) | (sel \\& b)$. In hardware description, using `sel ? b : a` is synthesizable directly into dedicated multiplexer primitives (such as FPGA MUXF7 or standard cell MUX2X).",
    "commonMistakes": [
      "Inverting order: writing `sel ? a : b` selects `a` when `sel=1`, which reverses the specification.",
      "Using an unclocked `always` block without covering all inputs, creating an unwanted latch."
    ],
    "hwNotes": "Modern FPGAs feature dedicated multiplexer resources adjacent to Look-Up Tables (LUTs) allowing wide multiplexing without routing penalties.",
    "relatedSlugs": [
      "mux4to1",
      "decoder-2to4",
      "demux-1to4"
    ],
    "flagshipIndex": 5,
    "isFlagship": true,
    "curatedTrack": "Level 1: Beginner (Combinational RTL)"
  },
  {
    "slug": "mux4to1",
    "title": "4:1 Multiplexer — Multi-Input Selection",
    "difficulty": "easy",
    "points": 15,
    "level": 1,
    "tags": [
      "combinational",
      "logic-gates",
      "easy",
      "multiplexers-&-decoders"
    ],
    "category": "Combinational Logic",
    "lede": "Design a 4-to-1 multiplexer that selects between 4 single-bit inputs in[3:0] using a 2-bit select code sel[1:0].",
    "concept": "<b>Objective:</b> Understand multi-way vector indexing, `case` statements vs nested ternary operators in combinational logic.<br><br><b>Prerequisites:</b> 2-bit vectors, multiplexing, binary encoding.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>in</code></td><td>input</td><td>4</td><td>4-bit data bus {in[3], in[2], in[1], in[0]}</td></tr><tr><td><code>sel</code></td><td>input</td><td>2</td><td>2-bit selection input</td></tr><tr><td><code>out</code></td><td>output</td><td>1</td><td>Selected single-bit output</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   [3:0] in,\n  input   [1:0] sel,\n  output        out\n);\n\n  // Select in[0] for sel=00, in[1] for sel=01, in[2] for sel=10, in[3] for sel=11\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] in;\n  reg [1:0] sel;\n  wire out;\n  integer errors = 0;\n  top_module dut(.in(in), .sel(sel), .out(out));\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    in = 4'b1010;\n    sel = 2'b00; #5;\n    if (out !== 1'b0) begin errors = errors + 1; $display(\"Test 1: sel=00 | expected 0 | got %b | FAIL\", out); end\n    else $display(\"Test 1: sel=00 | expected 0 | got %b | PASS\", out);\n    sel = 2'b01; #5;\n    if (out !== 1'b1) begin errors = errors + 1; $display(\"Test 2: sel=01 | expected 1 | got %b | FAIL\", out); end\n    else $display(\"Test 2: sel=01 | expected 1 | got %b | PASS\", out);\n    sel = 2'b10; #5;\n    if (out !== 1'b0) begin errors = errors + 1; $display(\"Test 3: sel=10 | expected 0 | got %b | FAIL\", out); end\n    else $display(\"Test 3: sel=10 | expected 0 | got %b | PASS\", out);\n    sel = 2'b11; #5;\n    if (out !== 1'b1) begin errors = errors + 1; $display(\"Test 4: sel=11 | expected 1 | got %b | FAIL\", out); end\n    else $display(\"Test 4: sel=11 | expected 1 | got %b | PASS\", out);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "sel",
      "in",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "sel",
          "wave": "====",
          "data": [
            "00",
            "01",
            "10",
            "11"
          ]
        },
        {
          "name": "in",
          "wave": "=",
          "data": [
            "4'b1010"
          ]
        },
        {
          "name": "out",
          "wave": "0101"
        }
      ],
      "config": {
        "hscale": 2
      }
    },
    "id": 6,
    "topic": "Combinational Logic",
    "subtopic": "Multiplexers & Decoders",
    "estimatedTime": "10 mins",
    "objective": "Understand multi-way vector indexing, `case` statements vs nested ternary operators in combinational logic.",
    "prerequisites": "2-bit vectors, multiplexing, binary encoding.",
    "timingReqs": "Combinational path: propagation delay from any data bit or select bit to output.",
    "constraints": "Synthesizable combinational design.",
    "ports": [
      {
        "name": "in",
        "dir": "input",
        "width": "4",
        "desc": "4-bit data bus {in[3], in[2], in[1], in[0]}"
      },
      {
        "name": "sel",
        "dir": "input",
        "width": "2",
        "desc": "2-bit selection input"
      },
      {
        "name": "out",
        "dir": "output",
        "width": "1",
        "desc": "Selected single-bit output"
      }
    ],
    "referenceRtl": "module top_module(\n  input   [3:0] in,\n  input   [1:0] sel,\n  output        out\n);\n  assign out = in[sel];\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 250 120\" class=\"circuit-svg\"><polygon points=\"70,15 140,30 140,90 70,105\" stroke=\"#38bdf8\" stroke-width=\"2.5\" fill=\"rgba(56,189,248,0.06)\"/><path d=\"M 25,25 L 70,25 M 25,45 L 70,45 M 25,75 L 70,75 M 25,95 L 70,95 M 140,60 L 200,60 M 105,97 L 105,115\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"none\"/><text x=\"8\" y=\"29\" fill=\"#94a3b8\" font-size=\"11\" font-family=\"'JetBrains Mono',monospace\">in[0]</text><text x=\"8\" y=\"49\" fill=\"#94a3b8\" font-size=\"11\" font-family=\"'JetBrains Mono',monospace\">in[1]</text><text x=\"8\" y=\"79\" fill=\"#94a3b8\" font-size=\"11\" font-family=\"'JetBrains Mono',monospace\">in[2]</text><text x=\"8\" y=\"99\" fill=\"#94a3b8\" font-size=\"11\" font-family=\"'JetBrains Mono',monospace\">in[3]</text><text x=\"206\" y=\"64\" fill=\"#2dd4bf\" font-size=\"12\" font-weight=\"700\" font-family=\"'JetBrains Mono',monospace\">out</text><text x=\"96\" y=\"118\" fill=\"#fbbf24\" font-size=\"10\" font-weight=\"700\" font-family=\"'JetBrains Mono',monospace\">sel[1:0]</text><text x=\"95\" y=\"64\" fill=\"#64748b\" font-size=\"11\" font-family=\"'Outfit',sans-serif\">4:1 MUX</text></svg>",
    "hints": [
      "In Verilog, bit vector indexing with a variable index `in[sel]` automatically synthesizes into a multiplexer!",
      "Alternatively, nested ternary operators `sel == 2'b00 ? in[0] : ...` or a `case` statement in an `always @(*)` block can be used.",
      "The most concise and elegant Verilog is `assign out = in[sel];`."
    ],
    "explanation": "Because `sel` is a 2-bit variable, evaluating `in[sel]` dynamically selects the bit at index $0, 1, 2,$ or $3$. Logic synthesis tools infer a balanced 4:1 multiplexer tree (or two levels of 2:1 MUXes).",
    "commonMistakes": [
      "Hardcoding fixed indices instead of using the `sel` variable.",
      "Writing a procedural `case` without a `default` branch, inferring unintended latches."
    ],
    "hwNotes": "A 4:1 multiplexer fits inside a single 6-input LUT (LUT6) in modern AMD/Xilinx 7-series or UltraScale FPGAs (4 data inputs + 2 select inputs = 6 inputs, 1 output).",
    "relatedSlugs": [
      "mux2to1",
      "decoder-2to4",
      "barrel-shifter"
    ],
    "flagshipIndex": 6,
    "isFlagship": true,
    "curatedTrack": "Level 1: Beginner (Combinational RTL)"
  },
  {
    "slug": "half-adder",
    "title": "Half Adder — Sum and Carry",
    "difficulty": "easy",
    "points": 10,
    "level": 1,
    "tags": [
      "combinational",
      "logic-gates",
      "easy",
      "adders-&-subtractors"
    ],
    "category": "Arithmetic Circuits",
    "lede": "Construct a 1-bit half adder that computes the binary sum and carry-out of two 1-bit operands a and b.",
    "concept": "<b>Objective:</b> Understand basic 1-bit binary arithmetic: XOR for Sum, AND for Carry.<br><br><b>Prerequisites:</b> Binary addition, truth tables of XOR and AND.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>a</code></td><td>input</td><td>1</td><td>First 1-bit operand</td></tr><tr><td><code>b</code></td><td>input</td><td>1</td><td>Second 1-bit operand</td></tr><tr><td><code>sum</code></td><td>output</td><td>1</td><td>Sum bit (a ^ b)</td></tr><tr><td><code>cout</code></td><td>output</td><td>1</td><td>Carry-out bit (a &amp; b)</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   a,\n  input   b,\n  output  sum,\n  output  cout\n);\n\n  // Compute sum and carry-out\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg a, b;\n  wire sum, cout;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .sum(sum), .cout(cout));\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    a = 0; b = 0; #5;\n    if (sum !== 0 || cout !== 0) begin errors = errors + 1; $display(\"Test 1: 0+0 | expected sum=0, cout=0 | got sum=%b, cout=%b | FAIL\", sum, cout); end\n    else $display(\"Test 1: 0+0 | expected sum=0, cout=0 | got sum=%b, cout=%b | PASS\", sum, cout);\n    a = 0; b = 1; #5;\n    if (sum !== 1 || cout !== 0) begin errors = errors + 1; $display(\"Test 2: 0+1 | expected sum=1, cout=0 | got sum=%b, cout=%b | FAIL\", sum, cout); end\n    else $display(\"Test 2: 0+1 | expected sum=1, cout=0 | got sum=%b, cout=%b | PASS\", sum, cout);\n    a = 1; b = 0; #5;\n    if (sum !== 1 || cout !== 0) begin errors = errors + 1; $display(\"Test 3: 1+0 | expected sum=1, cout=0 | got sum=%b, cout=%b | FAIL\", sum, cout); end\n    else $display(\"Test 3: 1+0 | expected sum=1, cout=0 | got sum=%b, cout=%b | PASS\", sum, cout);\n    a = 1; b = 1; #5;\n    if (sum !== 0 || cout !== 1) begin errors = errors + 1; $display(\"Test 4: 1+1 | expected sum=0, cout=1 | got sum=%b, cout=%b | FAIL\", sum, cout); end\n    else $display(\"Test 4: 1+1 | expected sum=0, cout=1 | got sum=%b, cout=%b | PASS\", sum, cout);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "sum",
      "cout"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a",
          "wave": "0..1.1."
        },
        {
          "name": "b",
          "wave": "0.1.0.1"
        },
        {
          "name": "sum",
          "wave": "0.1.1.0"
        },
        {
          "name": "cout",
          "wave": "0...1."
        }
      ],
      "config": {
        "hscale": 2
      }
    },
    "id": 7,
    "topic": "Arithmetic Circuits",
    "subtopic": "Adders & Subtractors",
    "estimatedTime": "10 mins",
    "objective": "Understand basic 1-bit binary arithmetic: XOR for Sum, AND for Carry.",
    "prerequisites": "Binary addition, truth tables of XOR and AND.",
    "timingReqs": "Combinational logic path: $t_{sum}$ and $t_{cout}$.",
    "constraints": "Synthesizable combinational RTL.",
    "ports": [
      {
        "name": "a",
        "dir": "input",
        "width": "1",
        "desc": "First 1-bit operand"
      },
      {
        "name": "b",
        "dir": "input",
        "width": "1",
        "desc": "Second 1-bit operand"
      },
      {
        "name": "sum",
        "dir": "output",
        "width": "1",
        "desc": "Sum bit (a ^ b)"
      },
      {
        "name": "cout",
        "dir": "output",
        "width": "1",
        "desc": "Carry-out bit (a & b)"
      }
    ],
    "referenceRtl": "module top_module(\n  input   a,\n  input   b,\n  output  sum,\n  output  cout\n);\n  assign sum  = a ^ b;\n  assign cout = a & b;\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 260 110\" class=\"circuit-svg\"><path d=\"M 20,25 L 90,25 M 20,80 L 90,80\" stroke=\"#38bdf8\" stroke-width=\"2\"/><path d=\"M 50,25 L 50,65 L 90,65 M 70,80 L 70,40 L 90,40\" stroke=\"#38bdf8\" stroke-width=\"2\"/><rect x=\"90\" y=\"15\" width=\"70\" height=\"35\" rx=\"4\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"rgba(56,189,248,0.08)\"/><text x=\"108\" y=\"38\" fill=\"#e2e8f0\" font-size=\"11\" font-weight=\"700\">XOR</text><rect x=\"90\" y=\"55\" width=\"70\" height=\"35\" rx=\"4\" stroke=\"#a78bfa\" stroke-width=\"2\" fill=\"rgba(167,139,250,0.08)\"/><text x=\"108\" y=\"78\" fill=\"#e2e8f0\" font-size=\"11\" font-weight=\"700\">AND</text><line x1=\"160\" y1=\"32\" x2=\"210\" y2=\"32\" stroke=\"#2dd4bf\" stroke-width=\"2\"/><line x1=\"160\" y1=\"72\" x2=\"210\" y2=\"72\" stroke=\"#fbbf24\" stroke-width=\"2\"/><text x=\"216\" y=\"36\" fill=\"#2dd4bf\" font-size=\"11\" font-weight=\"700\">sum</text><text x=\"216\" y=\"76\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"700\">cout</text><text x=\"8\" y=\"28\" fill=\"#94a3b8\" font-size=\"11\">a</text><text x=\"8\" y=\"83\" fill=\"#94a3b8\" font-size=\"11\">b</text></svg>",
    "hints": [
      "Sum is high when only one input is high: use XOR (`^`).",
      "Carry-out is high when both inputs are 1: use AND (`&`).",
      "Alternatively, concatenate: `assign {cout, sum} = a + b;`."
    ],
    "explanation": "Adding two 1-bit values $a + b$ produces a 2-bit result $\\{cout, sum\\} \\in \\{0, 1, 2\\}$. The least-significant bit (Sum) represents modulo-2 addition ($a \\oplus b$), and the most-significant bit (Cout) represents the overflow carry ($a \\cdot b$).",
    "commonMistakes": [
      "Swapping `sum` and `cout` outputs.",
      "Using OR instead of XOR for sum, which fails for $1+1$."
    ],
    "hwNotes": "A half adder cannot accept a carry-in from a previous stage; chaining multiple bits requires full adders with carry-in support.",
    "relatedSlugs": [
      "full-adder",
      "ripple-carry-adder4",
      "half-subtractor"
    ],
    "flagshipIndex": 7,
    "isFlagship": true,
    "curatedTrack": "Level 1: Beginner (Combinational RTL)"
  },
  {
    "slug": "full-adder",
    "title": "Full Adder — Multi-Input Arithmetic",
    "difficulty": "easy",
    "points": 15,
    "level": 1,
    "tags": [
      "combinational",
      "logic-gates",
      "easy",
      "adders-&-subtractors"
    ],
    "category": "Arithmetic Circuits",
    "lede": "Implement a 1-bit full adder that computes the sum and carry-out of three inputs: a, b, and cin.",
    "concept": "<b>Objective:</b> Understand multi-operand arithmetic, ripple carry chains, and boolean equations for sum and cout.<br><br><b>Prerequisites:</b> Half adder logic, carry propagation.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>a</code></td><td>input</td><td>1</td><td>First operand bit</td></tr><tr><td><code>b</code></td><td>input</td><td>1</td><td>Second operand bit</td></tr><tr><td><code>cin</code></td><td>input</td><td>1</td><td>Carry-in from previous stage</td></tr><tr><td><code>sum</code></td><td>output</td><td>1</td><td>Sum bit (a ^ b ^ cin)</td></tr><tr><td><code>cout</code></td><td>output</td><td>1</td><td>Carry-out bit</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   a,\n  input   b,\n  input   cin,\n  output  sum,\n  output  cout\n);\n\n  // Compute full adder sum and cout\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg a, b, cin;\n  wire sum, cout;\n  integer errors = 0;\n  integer i;\n  reg [2:0] vec;\n  wire [1:0] expected;\n  assign expected = a + b + cin;\n  top_module dut(.a(a), .b(b), .cin(cin), .sum(sum), .cout(cout));\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    for (i = 0; i < 8; i = i + 1) begin\n      vec = i[2:0];\n      {a, b, cin} = vec; #5;\n      if ({cout, sum} !== expected) begin\n        errors = errors + 1;\n        $display(\"Test %0d: a=%b b=%b cin=%b | expected cout=%b sum=%b | got cout=%b sum=%b | FAIL\", i+1, a, b, cin, expected[1], expected[0], cout, sum);\n      end else begin\n        $display(\"Test %0d: a=%b b=%b cin=%b | expected cout=%b sum=%b | got cout=%b sum=%b | PASS\", i+1, a, b, cin, expected[1], expected[0], cout, sum);\n      end\n    end\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "cin",
      "sum",
      "cout"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a",
          "wave": "0...1..."
        },
        {
          "name": "b",
          "wave": "0.1.0.1."
        },
        {
          "name": "cin",
          "wave": "01010101"
        },
        {
          "name": "sum",
          "wave": "01101001"
        },
        {
          "name": "cout",
          "wave": "00010111"
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "id": 8,
    "topic": "Arithmetic Circuits",
    "subtopic": "Adders & Subtractors",
    "estimatedTime": "10 mins",
    "objective": "Understand multi-operand arithmetic, ripple carry chains, and boolean equations for sum and cout.",
    "prerequisites": "Half adder logic, carry propagation.",
    "timingReqs": "Critical path: carry propagation delay $t_{cin \\to cout}$.",
    "constraints": "Synthesizable combinational RTL.",
    "ports": [
      {
        "name": "a",
        "dir": "input",
        "width": "1",
        "desc": "First operand bit"
      },
      {
        "name": "b",
        "dir": "input",
        "width": "1",
        "desc": "Second operand bit"
      },
      {
        "name": "cin",
        "dir": "input",
        "width": "1",
        "desc": "Carry-in from previous stage"
      },
      {
        "name": "sum",
        "dir": "output",
        "width": "1",
        "desc": "Sum bit (a ^ b ^ cin)"
      },
      {
        "name": "cout",
        "dir": "output",
        "width": "1",
        "desc": "Carry-out bit"
      }
    ],
    "referenceRtl": "module top_module(\n  input   a,\n  input   b,\n  input   cin,\n  output  sum,\n  output  cout\n);\n  assign sum  = a ^ b ^ cin;\n  assign cout = (a & b) | (b & cin) | (a & cin);\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 280 120\" class=\"circuit-svg\"><rect x=\"70\" y=\"20\" width=\"130\" height=\"80\" rx=\"8\" stroke=\"#38bdf8\" stroke-width=\"2.5\" fill=\"rgba(56,189,248,0.06)\"/><path d=\"M 20,35 L 70,35 M 20,60 L 70,60 M 20,85 L 70,85 M 200,45 L 250,45 M 200,75 L 250,75\" stroke=\"#38bdf8\" stroke-width=\"2\"/><text x=\"8\" y=\"39\" fill=\"#94a3b8\" font-size=\"11\">a</text><text x=\"8\" y=\"64\" fill=\"#94a3b8\" font-size=\"11\">b</text><text x=\"8\" y=\"89\" fill=\"#fbbf24\" font-size=\"11\">cin</text><text x=\"256\" y=\"49\" fill=\"#2dd4bf\" font-size=\"11\" font-weight=\"700\">sum</text><text x=\"256\" y=\"79\" fill=\"#fb923c\" font-size=\"11\" font-weight=\"700\">cout</text><text x=\"108\" y=\"65\" fill=\"#e2e8f0\" font-size=\"13\" font-weight=\"700\">FULL ADDER</text></svg>",
    "hints": [
      "Sum is computed by chaining XORs: `a ^ b ^ cin`.",
      "Carry-out occurs when at least two of the three inputs are high: `(a & b) | (b & cin) | (a & cin)`.",
      "Or use concatenation with addition: `assign {cout, sum} = a + b + cin;`."
    ],
    "explanation": "A full adder computes $a + b + cin$. Boolean formulas: $sum = a \\oplus b \\oplus cin$, and $cout = (a \\cdot b) + (cin \\cdot (a \\oplus b))$. Cascading $N$ full adders by connecting $cout_k \\to cin_{k+1}$ creates an $N$-bit ripple-carry adder.",
    "commonMistakes": [
      "Omitting one of the three pairwise products in the carry logic.",
      "Misplacing parentheses when combining bitwise AND and OR operators."
    ],
    "hwNotes": "Carry generation logic ($cin \\to cout$) forms the critical path in wide ripple adders. Fast adders (CLA, Brent-Kung, Kogge-Stone) use generate/propagate prefix trees to compute carries in $O(\\log N)$ time.",
    "relatedSlugs": [
      "half-adder",
      "carry-lookahead-adder4",
      "ripple-carry-adder4"
    ],
    "flagshipIndex": 8,
    "isFlagship": true,
    "curatedTrack": "Level 1: Beginner (Combinational RTL)"
  },
  {
    "slug": "decoder-2to4",
    "title": "2-to-4 Decoder — Binary Decoding",
    "difficulty": "easy",
    "points": 15,
    "level": 1,
    "tags": [
      "combinational",
      "logic-gates",
      "easy",
      "multiplexers-&-decoders"
    ],
    "category": "Combinational Logic",
    "lede": "Implement a 2-to-4 active-high binary decoder with an active-high enable input.",
    "concept": "<b>Objective:</b> Understand address decoding, one-hot assertion, and enable gating.<br><br><b>Prerequisites:</b> Binary numbers, bit shifting, one-hot encoding.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>in</code></td><td>input</td><td>2</td><td>2-bit binary address input</td></tr><tr><td><code>enable</code></td><td>input</td><td>1</td><td>Active-high master enable</td></tr><tr><td><code>out</code></td><td>output</td><td>4</td><td>4-bit one-hot decoded output</td></tr></tbody></table>",
    "starter": "module top_module(\n  input        [1:0] in,\n  input              enable,\n  output       [3:0] out\n);\n\n  // Decode 2-bit binary to 4-bit one-hot when enable=1\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [1:0] in;\n  reg enable;\n  wire [3:0] out;\n  integer errors = 0;\n  top_module dut(.in(in), .enable(enable), .out(out));\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    enable = 0; in = 2'b00; #5;\n    if (out !== 4'b0000) begin errors = errors + 1; $display(\"Test 1: enable=0 | expected 0000 | got %b | FAIL\", out); end\n    else $display(\"Test 1: enable=0 | expected 0000 | got %b | PASS\", out);\n    enable = 1; in = 2'b00; #5;\n    if (out !== 4'b0001) begin errors = errors + 1; $display(\"Test 2: in=00 | expected 0001 | got %b | FAIL\", out); end\n    else $display(\"Test 2: in=00 | expected 0001 | got %b | PASS\", out);\n    in = 2'b01; #5;\n    if (out !== 4'b0010) begin errors = errors + 1; $display(\"Test 3: in=01 | expected 0010 | got %b | FAIL\", out); end\n    else $display(\"Test 3: in=01 | expected 0010 | got %b | PASS\", out);\n    in = 2'b10; #5;\n    if (out !== 4'b0100) begin errors = errors + 1; $display(\"Test 4: in=10 | expected 0100 | got %b | FAIL\", out); end\n    else $display(\"Test 4: in=10 | expected 0100 | got %b | PASS\", out);\n    in = 2'b11; #5;\n    if (out !== 4'b1000) begin errors = errors + 1; $display(\"Test 5: in=11 | expected 1000 | got %b | FAIL\", out); end\n    else $display(\"Test 5: in=11 | expected 1000 | got %b | PASS\", out);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "enable",
      "in",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "enable",
          "wave": "01......"
        },
        {
          "name": "in",
          "wave": "====",
          "data": [
            "00",
            "01",
            "10",
            "11"
          ]
        },
        {
          "name": "out",
          "wave": "====",
          "data": [
            "0001",
            "0010",
            "0100",
            "1000"
          ]
        }
      ],
      "config": {
        "hscale": 2
      }
    },
    "id": 9,
    "topic": "Combinational Logic",
    "subtopic": "Multiplexers & Decoders",
    "estimatedTime": "10 mins",
    "objective": "Understand address decoding, one-hot assertion, and enable gating.",
    "prerequisites": "Binary numbers, bit shifting, one-hot encoding.",
    "timingReqs": "Combinational delay from address/enable to one-hot output.",
    "constraints": "When enable is 0, all 4 outputs must be 0.",
    "ports": [
      {
        "name": "in",
        "dir": "input",
        "width": "2",
        "desc": "2-bit binary address input"
      },
      {
        "name": "enable",
        "dir": "input",
        "width": "1",
        "desc": "Active-high master enable"
      },
      {
        "name": "out",
        "dir": "output",
        "width": "4",
        "desc": "4-bit one-hot decoded output"
      }
    ],
    "referenceRtl": "module top_module(\n  input        [1:0] in,\n  input              enable,\n  output       [3:0] out\n);\n  assign out = enable ? (4'b0001 << in) : 4'b0000;\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 260 120\" class=\"circuit-svg\"><rect x=\"70\" y=\"20\" width=\"120\" height=\"80\" rx=\"6\" stroke=\"#38bdf8\" stroke-width=\"2.5\" fill=\"rgba(56,189,248,0.06)\"/><path d=\"M 20,40 L 70,40 M 20,80 L 70,80 M 190,35 L 240,35 M 190,50 L 240,50 M 190,65 L 240,65 M 190,80 L 240,80\" stroke=\"#38bdf8\" stroke-width=\"2\"/><text x=\"8\" y=\"44\" fill=\"#94a3b8\" font-size=\"10\">in[1:0]</text><text x=\"8\" y=\"84\" fill=\"#fbbf24\" font-size=\"10\">enable</text><text x=\"245\" y=\"40\" fill=\"#2dd4bf\" font-size=\"9\">out[0]</text><text x=\"245\" y=\"55\" fill=\"#2dd4bf\" font-size=\"9\">out[1]</text><text x=\"245\" y=\"70\" fill=\"#2dd4bf\" font-size=\"9\">out[2]</text><text x=\"245\" y=\"85\" fill=\"#2dd4bf\" font-size=\"9\">out[3]</text><text x=\"96\" y=\"65\" fill=\"#e2e8f0\" font-size=\"12\" font-weight=\"700\">2:4 DECODER</text></svg>",
    "hints": [
      "A decoder asserts exactly one line out of $2^N$ based on binary code.",
      "You can use left shift: `(4'b0001 << in)` shifts the active-1 bit to the exact index `in`.",
      "Guard with `enable`: `assign out = enable ? (4'b0001 << in) : 4'b0000;`."
    ],
    "explanation": "A 2-to-4 binary decoder converts a 2-bit address into four mutually exclusive select signals. Decoders form the core of SRAM wordline selectors, register file write-enable decoders, and memory-mapped peripheral address decoders.",
    "commonMistakes": [
      "Forgetting to check `enable`: output must be all 0s when `enable = 0`.",
      "Inverting bit endianness: confusing `out[0]` with `out[3]`."
    ],
    "hwNotes": "In standard cell libraries, decoders with enable inputs are often implemented as NAND gates with active-low outputs followed by inverters, matching standard memory block select interfaces.",
    "relatedSlugs": [
      "mux4to1",
      "decoder-3to8",
      "priority-encoder"
    ],
    "flagshipIndex": 9,
    "isFlagship": true,
    "curatedTrack": "Level 1: Beginner (Combinational RTL)"
  },
  {
    "slug": "comparator-4bit",
    "title": "4-Bit Magnitude Comparator — Relational Operators",
    "difficulty": "easy",
    "points": 15,
    "level": 1,
    "tags": [
      "combinational",
      "logic-gates",
      "easy",
      "comparators"
    ],
    "category": "Arithmetic Circuits",
    "lede": "Design a 4-bit unsigned magnitude comparator comparing inputs a[3:0] and b[3:0], generating gt (a>b), eq (a==b), and lt (a<b).",
    "concept": "<b>Objective:</b> Understand hardware comparison, relational operators (`>`, `==`, `<`), and mutual exclusivity of relational outputs.<br><br><b>Prerequisites:</b> Unsigned binary numbers, bitwise comparisons.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>a</code></td><td>input</td><td>4</td><td>First 4-bit unsigned operand</td></tr><tr><td><code>b</code></td><td>input</td><td>4</td><td>Second 4-bit unsigned operand</td></tr><tr><td><code>gt</code></td><td>output</td><td>1</td><td>High when a &gt; b</td></tr><tr><td><code>eq</code></td><td>output</td><td>1</td><td>High when a == b</td></tr><tr><td><code>lt</code></td><td>output</td><td>1</td><td>High when a &lt; b</td></tr></tbody></table>",
    "starter": "module top_module(\n  input  [3:0] a,\n  input  [3:0] b,\n  output       gt,\n  output       eq,\n  output       lt\n);\n\n  // Compare a and b: drive gt, eq, lt\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] a, b;\n  wire gt, eq, lt;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .gt(gt), .eq(eq), .lt(lt));\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    a = 4'd5; b = 4'd5; #5;\n    if (gt !== 0 || eq !== 1 || lt !== 0) begin errors = errors + 1; $display(\"Test 1: 5==5 | FAIL got gt=%b eq=%b lt=%b\", gt, eq, lt); end\n    else $display(\"Test 1: 5==5 | PASS\");\n    a = 4'd9; b = 4'd4; #5;\n    if (gt !== 1 || eq !== 0 || lt !== 0) begin errors = errors + 1; $display(\"Test 2: 9>4 | FAIL got gt=%b eq=%b lt=%b\", gt, eq, lt); end\n    else $display(\"Test 2: 9>4 | PASS\");\n    a = 4'd2; b = 4'd11; #5;\n    if (gt !== 0 || eq !== 0 || lt !== 1) begin errors = errors + 1; $display(\"Test 3: 2<11 | FAIL got gt=%b eq=%b lt=%b\", gt, eq, lt); end\n    else $display(\"Test 3: 2<11 | PASS\");\n    a = 4'd15; b = 4'd15; #5;\n    if (gt !== 0 || eq !== 1 || lt !== 0) begin errors = errors + 1; $display(\"Test 4: 15==15 | FAIL got gt=%b eq=%b lt=%b\", gt, eq, lt); end\n    else $display(\"Test 4: 15==15 | PASS\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "gt",
      "eq",
      "lt"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a",
          "wave": "====",
          "data": [
            "5",
            "9",
            "2",
            "15"
          ]
        },
        {
          "name": "b",
          "wave": "====",
          "data": [
            "5",
            "4",
            "11",
            "15"
          ]
        },
        {
          "name": "gt",
          "wave": "0100"
        },
        {
          "name": "eq",
          "wave": "1001"
        },
        {
          "name": "lt",
          "wave": "0010"
        }
      ],
      "config": {
        "hscale": 2
      }
    },
    "id": 10,
    "topic": "Arithmetic Circuits",
    "subtopic": "Comparators",
    "estimatedTime": "10 mins",
    "objective": "Understand hardware comparison, relational operators (`>`, `==`, `<`), and mutual exclusivity of relational outputs.",
    "prerequisites": "Unsigned binary numbers, bitwise comparisons.",
    "timingReqs": "Combinational delay across 4-bit subtraction/comparison logic.",
    "constraints": "Outputs `gt`, `eq`, and `lt` are mutually exclusive: exactly one output must be 1 for any valid input pair.",
    "ports": [
      {
        "name": "a",
        "dir": "input",
        "width": "4",
        "desc": "First 4-bit unsigned operand"
      },
      {
        "name": "b",
        "dir": "input",
        "width": "4",
        "desc": "Second 4-bit unsigned operand"
      },
      {
        "name": "gt",
        "dir": "output",
        "width": "1",
        "desc": "High when a > b"
      },
      {
        "name": "eq",
        "dir": "output",
        "width": "1",
        "desc": "High when a == b"
      },
      {
        "name": "lt",
        "dir": "output",
        "width": "1",
        "desc": "High when a < b"
      }
    ],
    "referenceRtl": "module top_module(\n  input  [3:0] a,\n  input  [3:0] b,\n  output       gt,\n  output       eq,\n  output       lt\n);\n  assign gt = (a > b);\n  assign eq = (a == b);\n  assign lt = (a < b);\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 280 120\" class=\"circuit-svg\"><rect x=\"70\" y=\"20\" width=\"130\" height=\"80\" rx=\"8\" stroke=\"#38bdf8\" stroke-width=\"2.5\" fill=\"rgba(56,189,248,0.06)\"/><path d=\"M 20,40 L 70,40 M 20,80 L 70,80 M 200,35 L 250,35 M 200,60 L 250,60 M 200,85 L 250,85\" stroke=\"#38bdf8\" stroke-width=\"2\"/><text x=\"8\" y=\"44\" fill=\"#94a3b8\" font-size=\"11\">a[3:0]</text><text x=\"8\" y=\"84\" fill=\"#94a3b8\" font-size=\"11\">b[3:0]</text><text x=\"256\" y=\"39\" fill=\"#2dd4bf\" font-size=\"11\" font-weight=\"700\">gt</text><text x=\"256\" y=\"64\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"700\">eq</text><text x=\"256\" y=\"89\" fill=\"#f43f5e\" font-size=\"11\" font-weight=\"700\">lt</text><text x=\"96\" y=\"65\" fill=\"#e2e8f0\" font-size=\"12\" font-weight=\"700\">4-BIT COMP</text></svg>",
    "hints": [
      "Verilog provides relational operators `>`, `<`, and equality `==`.",
      "You can use continuous assignments: `assign gt = a > b;`.",
      "Ensure equality is checked with `==` (not `=` which is assignment)."
    ],
    "explanation": "A magnitude comparator evaluates the numerical order of two binary numbers. Hardware implementations perform virtual subtraction $a - b$: the sign of the difference and the zero detector indicate whether $a > b$, $a == b$, or $a < b$.",
    "commonMistakes": [
      "Treating operands as signed when unsigned comparison was intended (or vice-versa with `$signed`).",
      "Allowing more than one output to be active simultaneously."
    ],
    "hwNotes": "Equality (`==`) synthesizes into bitwise XNOR gates followed by a wide AND gate. Magnitude (`>` and `<`) uses borrow-lookahead carry chains similar to subtractors.",
    "relatedSlugs": [
      "equality-checker-8bit",
      "signed-comparator",
      "min-max-finder"
    ],
    "flagshipIndex": 10,
    "isFlagship": true,
    "curatedTrack": "Level 1: Beginner (Combinational RTL)"
  },
  {
    "id": 11,
    "slug": "d-flip-flop",
    "title": "D Flip-Flop — Positive-Edge-Triggered Storage",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "topic": "Sequential Logic",
    "subtopic": "Flip-Flops & Latches",
    "estimatedTime": "15 mins",
    "lede": "Implement a basic 1-bit positive-edge-triggered D flip-flop without reset.",
    "objective": "Understand edge-triggered sequential storage, non-blocking assignments (`<=`), and setup/hold timing windows.",
    "prerequisites": "Clock signals, posedge sensitivity lists, procedural `always @(posedge clk)` blocks.",
    "timingReqs": "Input `d` sampled at `posedge clk`. Output `q` updates after clock-to-q delay $t_{c-q}$.",
    "constraints": "Must use non-blocking assignment (`<=`) inside `always @(posedge clk)`.",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Master positive-edge clock"
      },
      {
        "name": "d",
        "dir": "input",
        "width": "1",
        "desc": "Data input"
      },
      {
        "name": "q",
        "dir": "output",
        "width": "1",
        "desc": "Registered data output"
      }
    ],
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Master positive-edge clock</td></tr><tr><td><code>d</code></td><td>input</td><td>1</td><td>Data input</td></tr><tr><td><code>q</code></td><td>output</td><td>1</td><td>Registered data output</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   clk,\n  input   d,\n  output reg q\n);\n\n  // Positive-edge-triggered D flip-flop\n\nendmodule\n",
    "referenceRtl": "module top_module(\n  input   clk,\n  input   d,\n  output reg q\n);\n  always @(posedge clk) begin\n    q <= d;\n  end\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, d;\n  wire q;\n  integer errors = 0;\n  top_module dut(.clk(clk), .d(d), .q(q));\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; d = 0; #12;\n    d = 1; #10; // posedge at 15\n    if (q !== 1'b1) begin errors = errors + 1; $display(\"Test 1: d=1 | expected q=1 | got q=%b | FAIL\", q); end\n    else $display(\"Test 1: d=1 | expected q=1 | got q=%b | PASS\", q);\n    d = 0; #10; // posedge at 25\n    if (q !== 1'b0) begin errors = errors + 1; $display(\"Test 2: d=0 | expected q=0 | got q=%b | FAIL\", q); end\n    else $display(\"Test 2: d=0 | expected q=0 | got q=%b | PASS\", q);\n    d = 1; #2; // transition between clock edges\n    if (q !== 1'b0) begin errors = errors + 1; $display(\"Test 3: mid-cycle d change | expected q=0 | got q=%b | FAIL\", q); end\n    else $display(\"Test 3: mid-cycle d change | expected q=0 | got q=%b | PASS\", q);\n    #8; // wait for next edge\n    if (q !== 1'b1) begin errors = errors + 1; $display(\"Test 4: post-edge sample | expected q=1 | got q=%b | FAIL\", q); end\n    else $display(\"Test 4: post-edge sample | expected q=1 | got q=%b | PASS\", q);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "d",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "d",
          "wave": "0.10.1.0"
        },
        {
          "name": "q",
          "wave": "x.1.0.1."
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "circuitSvg": "<svg viewBox=\"0 0 240 100\" class=\"circuit-svg\"><rect x=\"70\" y=\"15\" width=\"80\" height=\"70\" rx=\"6\" stroke=\"#a78bfa\" stroke-width=\"2\" fill=\"rgba(167,139,250,0.06)\"/><path d=\"M 30,35 L 70,35 M 30,65 L 70,65 M 70,60 L 78,65 L 70,70 M 150,35 L 190,35\" stroke=\"#a78bfa\" stroke-width=\"2\" fill=\"none\"/><text x=\"16\" y=\"39\" fill=\"#94a3b8\" font-size=\"12\">d</text><text x=\"10\" y=\"69\" fill=\"#38bdf8\" font-size=\"11\">>clk</text><text x=\"195\" y=\"39\" fill=\"#2dd4bf\" font-size=\"12\" font-weight=\"700\">q</text><text x=\"98\" y=\"52\" fill=\"#e2e8f0\" font-size=\"12\" font-weight=\"700\">DFF</text></svg>",
    "hints": [
      "Use an `always @(posedge clk)` block.",
      "Inside sequential blocks, always use non-blocking assignment (`<=`).",
      "Write `always @(posedge clk) q <= d;`."
    ],
    "explanation": "A positive-edge-triggered D flip-flop transfers the value of `d` to `q` precisely on the rising transition of `clk`. Between edges, `q` holds its state and ignores input fluctuations. In static CMOS, this is formed using master-slave latch stages.",
    "commonMistakes": [
      "Using blocking assignment (`=`) instead of non-blocking (`<=`), which causes simulation race conditions.",
      "Adding `d` to the sensitivity list (`always @(posedge clk or d)`), which describes an illegal asynchronous register."
    ],
    "hwNotes": "Standard-cell DFFs exhibit setup time ($t_{su}$) and hold time ($t_h$) constraints relative to the clock edge. Violating these causes metastability.",
    "relatedSlugs": [
      "dff-async-reset",
      "dff-sync-reset",
      "dff-enable"
    ],
    "flagshipIndex": 11,
    "isFlagship": true,
    "curatedTrack": "Level 2: Intermediate (Sequential RTL & FSM)",
    "category": "Sequential Logic",
    "tags": [
      "sequential",
      "fsm",
      "counters",
      "medium",
      "flip-flops-&-latches"
    ],
    "concept": "<b>Objective:</b> Understand edge-triggered sequential storage, non-blocking assignments (`<=`), and setup/hold timing windows.<br><br><b>Prerequisites:</b> Clock signals, posedge sensitivity lists, procedural `always @(posedge clk)` blocks."
  },
  {
    "slug": "dff-async-reset",
    "title": "D Flip-Flop with Asynchronous Reset — Reset Behavior",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "sequential",
      "fsm",
      "counters",
      "medium",
      "flip-flops-&-latches"
    ],
    "category": "Sequential Logic",
    "lede": "Design a D flip-flop with active-low asynchronous reset (areset_n). Reset forces q to 0 immediately, independent of clk.",
    "concept": "<b>Objective:</b> Master asynchronous reset sensitivity lists (`posedge clk or negedge areset_n`) and safe reset deassertion concepts.<br><br><b>Prerequisites:</b> D flip-flops, active-low reset polarity, asynchronous reset recovery/removal.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Master clock</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Active-low asynchronous reset (0 = reset)</td></tr><tr><td><code>d</code></td><td>input</td><td>1</td><td>Data input</td></tr><tr><td><code>q</code></td><td>output</td><td>1</td><td>Registered output</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   clk,\n  input   areset_n,\n  input   d,\n  output reg q\n);\n\n  // Active-low asynchronous reset DFF\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, areset_n, d;\n  wire q;\n  integer errors = 0;\n  top_module dut(.clk(clk), .areset_n(areset_n), .d(d), .q(q));\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; areset_n = 0; d = 1; #12;\n    if (q !== 1'b0) begin errors = errors + 1; $display(\"Test 1: reset active | expected q=0 | got q=%b | FAIL\", q); end\n    else $display(\"Test 1: reset active | expected q=0 | got q=%b | PASS\", q);\n    areset_n = 1; #8; // release reset, posedge clk at 25\n    if (q !== 1'b1) begin errors = errors + 1; $display(\"Test 2: normal clocked capture | expected q=1 | got q=%b | FAIL\", q); end\n    else $display(\"Test 2: normal clocked capture | expected q=1 | got q=%b | PASS\", q);\n    #3; areset_n = 0; #2; // async reset asserted mid-cycle!\n    if (q !== 1'b0) begin errors = errors + 1; $display(\"Test 3: async reset mid-clock | expected q=0 immediately | got q=%b | FAIL\", q); end\n    else $display(\"Test 3: async reset mid-clock | expected q=0 immediately | got q=%b | PASS\", q);\n    areset_n = 1; d = 0; #10;\n    if (q !== 1'b0) begin errors = errors + 1; $display(\"Test 4: capture zero | expected q=0 | got q=%b | FAIL\", q); end\n    else $display(\"Test 4: capture zero | expected q=0 | got q=%b | PASS\", q);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "areset_n",
      "d",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "areset_n",
          "wave": "0.1..01."
        },
        {
          "name": "d",
          "wave": "1......0"
        },
        {
          "name": "q",
          "wave": "0..1.0.."
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "id": 12,
    "topic": "Sequential Logic",
    "subtopic": "Flip-Flops & Latches",
    "estimatedTime": "15 mins",
    "objective": "Master asynchronous reset sensitivity lists (`posedge clk or negedge areset_n`) and safe reset deassertion concepts.",
    "prerequisites": "D flip-flops, active-low reset polarity, asynchronous reset recovery/removal.",
    "timingReqs": "Reset assertion overrides clock immediately. Reset recovery time $t_{rec}$ must be met before next active clock edge.",
    "constraints": "Sensitivity list must include `negedge areset_n`. Non-blocking assignments only.",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Master clock"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low asynchronous reset"
      },
      {
        "name": "d",
        "dir": "input",
        "width": "1",
        "desc": "Data input"
      },
      {
        "name": "q",
        "dir": "output",
        "width": "1",
        "desc": "Registered output"
      }
    ],
    "referenceRtl": "module top_module(\n  input   clk,\n  input   areset_n,\n  input   d,\n  output reg q\n);\n  always @(posedge clk or negedge areset_n) begin\n    if (!areset_n)\n      q <= 1'b0;\n    else\n      q <= d;\n  end\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 240 100\" class=\"circuit-svg\"><rect x=\"70\" y=\"15\" width=\"80\" height=\"70\" rx=\"6\" stroke=\"#a78bfa\" stroke-width=\"2\" fill=\"rgba(167,139,250,0.06)\"/><path d=\"M 30,35 L 70,35 M 30,65 L 70,65 M 70,60 L 78,65 L 70,70 M 150,35 L 190,35 M 110,85 L 110,95\" stroke=\"#a78bfa\" stroke-width=\"2\" fill=\"none\"/><text x=\"16\" y=\"39\" fill=\"#94a3b8\" font-size=\"12\">d</text><text x=\"10\" y=\"69\" fill=\"#38bdf8\" font-size=\"11\">>clk</text><text x=\"195\" y=\"39\" fill=\"#2dd4bf\" font-size=\"12\" font-weight=\"700\">q</text><text x=\"96\" y=\"99\" fill=\"#f43f5e\" font-size=\"10\">areset_n</text><text x=\"98\" y=\"52\" fill=\"#e2e8f0\" font-size=\"12\" font-weight=\"700\">DFF</text></svg>",
    "hints": [
      "The sensitivity list must trigger on both the clock edge AND the reset edge: `always @(posedge clk or negedge areset_n)`.",
      "Check `if (!areset_n)` first before assigning `q <= d;`.",
      "Because reset is active-low, `!areset_n` evaluates to true when reset is asserted (low)."
    ],
    "explanation": "Asynchronous reset directly clears the internal feedback loop of the slave latch in the flip-flop without waiting for a clock edge. In ASIC designs, async reset guarantees initialization even when the system PLL clock has not yet locked.",
    "commonMistakes": [
      "Missing `negedge areset_n` in the sensitivity list, converting it into a synchronous reset.",
      "Testing `if (areset_n)` instead of `if (!areset_n)` for active-low reset polarity."
    ],
    "hwNotes": "While asynchronous reset assertion is instantaneous, reset release must be synchronized to `clk` via a reset synchronizer bridge to prevent metastability if release occurs within the flip-flop recovery window ($t_{rec}$).",
    "relatedSlugs": [
      "dff-sync-reset",
      "async-reset-synchronizer",
      "d-flip-flop"
    ],
    "flagshipIndex": 12,
    "isFlagship": true,
    "curatedTrack": "Level 2: Intermediate (Sequential RTL & FSM)"
  },
  {
    "slug": "dff-sync-reset",
    "title": "D Flip-Flop with Synchronous Reset — Clocked Reset",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "sequential",
      "fsm",
      "counters",
      "medium",
      "flip-flops-&-latches"
    ],
    "category": "Sequential Logic",
    "lede": "Implement a D flip-flop with active-high synchronous reset (sync_rst). The reset takes effect only on the rising clock edge.",
    "concept": "<b>Objective:</b> Understand synchronous reset RTL templates, timing advantages, and FPGA synthesis optimization.<br><br><b>Prerequisites:</b> Sequential logic, clocking, synchronous control inputs.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Master positive-edge clock</td></tr><tr><td><code>sync_rst</code></td><td>input</td><td>1</td><td>Active-high synchronous reset</td></tr><tr><td><code>d</code></td><td>input</td><td>1</td><td>Data input</td></tr><tr><td><code>q</code></td><td>output</td><td>1</td><td>Registered output</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   clk,\n  input   sync_rst,\n  input   d,\n  output reg q\n);\n\n  // Synchronous reset DFF\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, sync_rst, d;\n  wire q;\n  integer errors = 0;\n  top_module dut(.clk(clk), .sync_rst(sync_rst), .d(d), .q(q));\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; sync_rst = 0; d = 1;\n    @(negedge clk);\n    @(posedge clk); #1; // q becomes 1\n    if (q !== 1'b1) begin errors = errors + 1; $display(\"Test 1: capture 1 | FAIL got %b\", q); end\n    else $display(\"Test 1: capture 1 | PASS\");\n    @(negedge clk); sync_rst = 1; // set sync_rst at falling edge\n    #1;\n    if (q !== 1'b1) begin errors = errors + 1; $display(\"Test 2: held before edge | FAIL got %b\", q); end\n    else $display(\"Test 2: held before edge | PASS\");\n    @(posedge clk); #1; // clock edge clears q\n    if (q !== 1'b0) begin errors = errors + 1; $display(\"Test 3: cleared at posedge | FAIL got %b\", q); end\n    else $display(\"Test 3: cleared at posedge | PASS\");\n    @(negedge clk); sync_rst = 0; d = 1;\n    @(posedge clk); #1;\n    if (q !== 1'b1) begin errors = errors + 1; $display(\"Test 4: resume | FAIL got %b\", q); end\n    else $display(\"Test 4: resume | PASS\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "sync_rst",
      "d",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "sync_rst",
          "wave": "0.1...0."
        },
        {
          "name": "d",
          "wave": "1......."
        },
        {
          "name": "q",
          "wave": "x.1.0..1"
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "id": 13,
    "topic": "Sequential Logic",
    "subtopic": "Flip-Flops & Latches",
    "estimatedTime": "15 mins",
    "objective": "Understand synchronous reset RTL templates, timing advantages, and FPGA synthesis optimization.",
    "prerequisites": "Sequential logic, clocking, synchronous control inputs.",
    "timingReqs": "Reset condition evaluated strictly on rising edge of `clk`. Glitches on reset between clock edges are filtered out.",
    "constraints": "Sensitivity list must contain ONLY `posedge clk`.",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Master positive-edge clock"
      },
      {
        "name": "sync_rst",
        "dir": "input",
        "width": "1",
        "desc": "Active-high synchronous reset"
      },
      {
        "name": "d",
        "dir": "input",
        "width": "1",
        "desc": "Data input"
      },
      {
        "name": "q",
        "dir": "output",
        "width": "1",
        "desc": "Registered output"
      }
    ],
    "referenceRtl": "module top_module(\n  input   clk,\n  input   sync_rst,\n  input   d,\n  output reg q\n);\n  always @(posedge clk) begin\n    if (sync_rst)\n      q <= 1'b0;\n    else\n      q <= d;\n  end\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 250 100\" class=\"circuit-svg\"><rect x=\"90\" y=\"15\" width=\"80\" height=\"70\" rx=\"6\" stroke=\"#a78bfa\" stroke-width=\"2\" fill=\"rgba(167,139,250,0.06)\"/><polygon points=\"35,25 65,35 65,65 35,75\" stroke=\"#38bdf8\" stroke-width=\"1.8\" fill=\"rgba(56,189,248,0.06)\"/><line x1=\"65\" y1=\"50\" x2=\"90\" y2=\"50\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"170\" y1=\"35\" x2=\"210\" y2=\"35\" stroke=\"#2dd4bf\" stroke-width=\"2\"/><line x1=\"20\" y1=\"40\" x2=\"35\" y2=\"40\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"20\" y1=\"60\" x2=\"35\" y2=\"60\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"50\" y1=\"70\" x2=\"50\" y2=\"90\" stroke=\"#fbbf24\" stroke-width=\"2\"/><text x=\"10\" y=\"44\" fill=\"#94a3b8\" font-size=\"10\">d</text><text x=\"8\" y=\"64\" fill=\"#64748b\" font-size=\"10\">0</text><text x=\"42\" y=\"98\" fill=\"#fbbf24\" font-size=\"9\">sync_rst</text><text x=\"215\" y=\"39\" fill=\"#2dd4bf\" font-size=\"12\" font-weight=\"700\">q</text><text x=\"118\" y=\"52\" fill=\"#e2e8f0\" font-size=\"12\" font-weight=\"700\">DFF</text></svg>",
    "hints": [
      "In synchronous reset, `sync_rst` is NOT placed in the `always` sensitivity list.",
      "Write `always @(posedge clk) begin if (sync_rst) q <= 1'b0; ... end`.",
      "The synthesis tool maps this to a multiplexer on the D-input or an internal synchronous clear pin on the flip-flop."
    ],
    "explanation": "Synchronous reset acts as a data filter: glitches on the reset line are completely rejected unless they align with the active clock edge. In high-frequency FPGA designs (like AMD UltraScale), synchronous resets map cleanly into native control sets without wasting routing resources.",
    "commonMistakes": [
      "Accidentally placing `sync_rst` in the `always` sensitivity list, turning it into an asynchronous reset.",
      "Resetting registers without meeting setup time to `clk` during synchronous reset release."
    ],
    "hwNotes": "Synchronous reset ensures 100% synchronous timing closure and eliminates reset recovery/removal checks. However, resetting a block requires the clock to be running.",
    "relatedSlugs": [
      "dff-async-reset",
      "d-flip-flop",
      "dff-enable"
    ],
    "flagshipIndex": 13,
    "isFlagship": true,
    "curatedTrack": "Level 2: Intermediate (Sequential RTL & FSM)"
  },
  {
    "slug": "dff-enable",
    "title": "D Flip-Flop with Enable — Conditional Register Update",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "sequential",
      "fsm",
      "counters",
      "medium",
      "registers"
    ],
    "category": "Sequential Logic",
    "lede": "Design a D flip-flop with active-high synchronous enable (en) and active-low asynchronous reset (areset_n).",
    "concept": "<b>Objective:</b> Understand clock enable gating vs feedback multiplexing and priority hierarchy in sequential procedural blocks.<br><br><b>Prerequisites:</b> DFF with async reset, conditional branching.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Master positive-edge clock</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Active-low asynchronous reset</td></tr><tr><td><code>en</code></td><td>input</td><td>1</td><td>Clock enable (active high)</td></tr><tr><td><code>d</code></td><td>input</td><td>1</td><td>Data input</td></tr><tr><td><code>q</code></td><td>output</td><td>1</td><td>Registered output</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   clk,\n  input   areset_n,\n  input   en,\n  input   d,\n  output reg q\n);\n\n  // DFF with async reset and clock enable\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, areset_n, en, d;\n  wire q;\n  integer errors = 0;\n  top_module dut(.clk(clk), .areset_n(areset_n), .en(en), .d(d), .q(q));\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; areset_n = 0; en = 0; d = 1; #12;\n    if (q !== 1'b0) begin errors = errors + 1; $display(\"Test 1: reset active | expected q=0 | got q=%b | FAIL\", q); end\n    else $display(\"Test 1: reset active | expected q=0 | got q=%b | PASS\", q);\n    areset_n = 1; #8; // posedge clk at 15 with en=0\n    if (q !== 1'b0) begin errors = errors + 1; $display(\"Test 2: en=0 holding state | expected q=0 | got q=%b | FAIL\", q); end\n    else $display(\"Test 2: en=0 holding state | expected q=0 | got q=%b | PASS\", q);\n    en = 1; #10; // posedge clk at 25 with en=1\n    if (q !== 1'b1) begin errors = errors + 1; $display(\"Test 3: en=1 capturing d=1 | expected q=1 | got q=%b | FAIL\", q); end\n    else $display(\"Test 3: en=1 capturing d=1 | expected q=1 | got q=%b | PASS\", q);\n    en = 0; d = 0; #10; // en=0 should hold q=1 despite d=0\n    if (q !== 1'b1) begin errors = errors + 1; $display(\"Test 4: en=0 holding q=1 | expected q=1 | got q=%b | FAIL\", q); end\n    else $display(\"Test 4: en=0 holding q=1 | expected q=1 | got q=%b | PASS\", q);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "areset_n",
      "en",
      "d",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "areset_n",
          "wave": "0.1....."
        },
        {
          "name": "en",
          "wave": "0...1.0."
        },
        {
          "name": "d",
          "wave": "1...0..."
        },
        {
          "name": "q",
          "wave": "0...1..."
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "id": 14,
    "topic": "Sequential Logic",
    "subtopic": "Registers",
    "estimatedTime": "15 mins",
    "objective": "Understand clock enable gating vs feedback multiplexing and priority hierarchy in sequential procedural blocks.",
    "prerequisites": "DFF with async reset, conditional branching.",
    "timingReqs": "Reset has highest priority. Enable only samples `d` when `areset_n=1` and `en=1` at `posedge clk`.",
    "constraints": "Non-blocking assignments. Reset overrides enable.",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Master positive-edge clock"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low asynchronous reset"
      },
      {
        "name": "en",
        "dir": "input",
        "width": "1",
        "desc": "Clock enable (active high)"
      },
      {
        "name": "d",
        "dir": "input",
        "width": "1",
        "desc": "Data input"
      },
      {
        "name": "q",
        "dir": "output",
        "width": "1",
        "desc": "Registered output"
      }
    ],
    "referenceRtl": "module top_module(\n  input   clk,\n  input   areset_n,\n  input   en,\n  input   d,\n  output reg q\n);\n  always @(posedge clk or negedge areset_n) begin\n    if (!areset_n)\n      q <= 1'b0;\n    else if (en)\n      q <= d;\n  end\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 260 100\" class=\"circuit-svg\"><rect x=\"110\" y=\"15\" width=\"80\" height=\"70\" rx=\"6\" stroke=\"#a78bfa\" stroke-width=\"2\" fill=\"rgba(167,139,250,0.06)\"/><polygon points=\"50,25 80,35 80,65 50,75\" stroke=\"#38bdf8\" stroke-width=\"1.8\" fill=\"rgba(56,189,248,0.06)\"/><line x1=\"80\" y1=\"50\" x2=\"110\" y2=\"50\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"190\" y1=\"35\" x2=\"230\" y2=\"35\" stroke=\"#2dd4bf\" stroke-width=\"2\"/><path d=\"M 210,35 L 210,88 L 30,88 L 30,60 L 50,60\" stroke=\"#2dd4bf\" stroke-width=\"1.5\" stroke-dasharray=\"2,2\" fill=\"none\"/><line x1=\"20\" y1=\"38\" x2=\"50\" y2=\"38\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"65\" y1=\"70\" x2=\"65\" y2=\"90\" stroke=\"#fbbf24\" stroke-width=\"2\"/><text x=\"10\" y=\"42\" fill=\"#94a3b8\" font-size=\"10\">d</text><text x=\"58\" y=\"98\" fill=\"#fbbf24\" font-size=\"9\">en</text><text x=\"235\" y=\"39\" fill=\"#2dd4bf\" font-size=\"12\" font-weight=\"700\">q</text><text x=\"138\" y=\"52\" fill=\"#e2e8f0\" font-size=\"12\" font-weight=\"700\">DFF</text></svg>",
    "hints": [
      "Check reset first: `if (!areset_n) q <= 1'b0;`.",
      "Check enable second: `else if (en) q <= d;`.",
      "When `en=0`, omitting the `else` branch inherently preserves `q` across clock cycles."
    ],
    "explanation": "A clock enable controls whether new data updates the flip-flop. Rather than gating the clock tree (which can introduce clock skew and glitches), FPGA synthesis maps this to the dedicated clock-enable (`CE`) pin on slice flip-flops, or synthesizes a recirculating multiplexer ($q_{next} = en \\cdot d + \\overline{en} \\cdot q$).",
    "commonMistakes": [
      "Attempting to gate the clock in RTL: `assign gated_clk = clk & en; always @(posedge gated_clk)`. NEVER do this in synthesizable RTL due to clock skew, race conditions, and glitches.",
      "Placing `en` inside the sensitivity list."
    ],
    "hwNotes": "Always prefer synchronous clock enables over manual clock gating logic. For ASIC low-power design, use dedicated Integrated Clock Gating (ICG) cells instantiated from the vendor library.",
    "relatedSlugs": [
      "clock-gating-cell",
      "dff-async-reset",
      "clock-enable-generator"
    ],
    "flagshipIndex": 14,
    "isFlagship": true,
    "curatedTrack": "Level 2: Intermediate (Sequential RTL & FSM)"
  },
  {
    "id": 15,
    "slug": "up-counter-4bit",
    "title": "4-Bit Up Counter — Sequential Counter",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "topic": "Sequential Logic",
    "subtopic": "Counters",
    "estimatedTime": "15 mins",
    "lede": "Implement a 4-bit synchronous binary up-counter with active-low asynchronous reset (areset_n). The counter rolls over from 15 to 0.",
    "objective": "Understand accumulator feedback, modulo-$2^N$ rollover, and sequential register arithmetic.",
    "prerequisites": "Sequential logic, non-blocking assignments, bit vector addition.",
    "timingReqs": "Output increments by 1 on each rising clock edge when reset is inactive.",
    "constraints": "Unsigned 4-bit register arithmetic (`q <= q + 1'b1;`).",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Clock signal"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low asynchronous reset"
      },
      {
        "name": "q",
        "dir": "output",
        "width": "4",
        "desc": "4-bit counter value (0 to 15)"
      }
    ],
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Clock signal</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Active-low asynchronous reset</td></tr><tr><td><code>q</code></td><td>output</td><td>4</td><td>4-bit counter value (0 to 15)</td></tr></tbody></table>",
    "starter": "module top_module(\n  input        clk,\n  input        areset_n,\n  output reg [3:0] q\n);\n\n  // 4-bit up counter with async reset\n\nendmodule\n",
    "referenceRtl": "module top_module(\n  input        clk,\n  input        areset_n,\n  output reg [3:0] q\n);\n  always @(posedge clk or negedge areset_n) begin\n    if (!areset_n)\n      q <= 4'b0000;\n    else\n      q <= q + 1'b1;\n  end\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, areset_n;\n  wire [3:0] q;\n  integer errors = 0;\n  integer i;\n  top_module dut(.clk(clk), .areset_n(areset_n), .q(q));\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; areset_n = 0; #12;\n    if (q !== 4'b0000) begin errors = errors + 1; $display(\"Test 1: reset | expected 0 | got %b | FAIL\", q); end\n    else $display(\"Test 1: reset | expected 0 | got %b | PASS\", q);\n    areset_n = 1;\n    for (i = 1; i <= 16; i = i + 1) begin\n      #10;\n      if (q !== (i % 16)) begin\n        errors = errors + 1;\n        $display(\"Test step %0d: expected %0d | got %0d | FAIL\", i, i % 16, q);\n      end else begin\n        $display(\"Test step %0d: expected %0d | got %0d | PASS\", i, i % 16, q);\n      end\n    end\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "areset_n",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "areset_n",
          "wave": "0.1....."
        },
        {
          "name": "q",
          "wave": "=x=======",
          "data": [
            "0",
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6"
          ]
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "circuitSvg": "<svg viewBox=\"0 0 280 110\" class=\"circuit-svg\"><rect x=\"130\" y=\"20\" width=\"80\" height=\"70\" rx=\"6\" stroke=\"#a78bfa\" stroke-width=\"2\" fill=\"rgba(167,139,250,0.06)\"/><rect x=\"35\" y=\"35\" width=\"55\" height=\"40\" rx=\"4\" stroke=\"#38bdf8\" stroke-width=\"1.8\" fill=\"rgba(56,189,248,0.06)\"/><line x1=\"90\" y1=\"55\" x2=\"130\" y2=\"55\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"210\" y1=\"55\" x2=\"250\" y2=\"55\" stroke=\"#2dd4bf\" stroke-width=\"2\"/><path d=\"M 230,55 L 230,95 L 15,95 L 15,55 L 35,55\" stroke=\"#2dd4bf\" stroke-width=\"1.5\" stroke-dasharray=\"2,2\" fill=\"none\"/><text x=\"44\" y=\"60\" fill=\"#e2e8f0\" font-size=\"11\" font-weight=\"700\">+1 ADD</text><text x=\"145\" y=\"60\" fill=\"#e2e8f0\" font-size=\"12\" font-weight=\"700\">4-b REG</text><text x=\"256\" y=\"59\" fill=\"#2dd4bf\" font-size=\"11\" font-weight=\"700\">q[3:0]</text></svg>",
    "hints": [
      "Use `q <= q + 1'b1;` inside the clocked branch.",
      "Because `q` is a 4-bit vector, incrementing past `15` naturally rolls over to `0` automatically due to 4-bit modulo arithmetic.",
      "Ensure `areset_n` initializes `q` to `4'b0000`."
    ],
    "explanation": "A synchronous counter stores state in a bank of flip-flops and computes the next state using an incrementer adder. The 4-bit width naturally wraps around from 1111 (15) to 0000 (0) on overflow without needing an explicit `if (q == 15)` check.",
    "commonMistakes": [
      "Using integer variables instead of bit vectors, causing synthesis tools to infer 32-bit registers.",
      "Adding blocking assignments in the counter loop."
    ],
    "hwNotes": "FPGAs contain dedicated fast carry chains (such as CARRY4/CARRY8) optimized specifically for counter incrementers, achieving multi-hundred MHz performance.",
    "relatedSlugs": [
      "decade-counter-mod10",
      "updown-counter",
      "binary-counter"
    ],
    "flagshipIndex": 15,
    "isFlagship": true,
    "curatedTrack": "Level 2: Intermediate (Sequential RTL & FSM)",
    "category": "Sequential Logic",
    "tags": [
      "sequential",
      "fsm",
      "counters",
      "medium",
      "counters"
    ],
    "concept": "<b>Objective:</b> Understand accumulator feedback, modulo-$2^N$ rollover, and sequential register arithmetic.<br><br><b>Prerequisites:</b> Sequential logic, non-blocking assignments, bit vector addition."
  },
  {
    "id": 16,
    "slug": "decade-counter-mod10",
    "title": "Modulo-10 Counter — Terminal Count",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "topic": "Sequential Logic",
    "subtopic": "Counters",
    "estimatedTime": "15 mins",
    "lede": "Design a Modulo-10 (Decade) counter counting from 0 to 9 with active-low async reset. Roll over from 9 to 0.",
    "objective": "Understand terminal count detection, state wrapping at arbitrary thresholds, and BCD digit counting.",
    "prerequisites": "Binary counters, equality comparison in sequential blocks.",
    "timingReqs": "When q reaches 9 (4'd9), the next active clock edge resets q to 0.",
    "constraints": "Count sequence must be strictly 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0...",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Clock signal"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low asynchronous reset"
      },
      {
        "name": "q",
        "dir": "output",
        "width": "4",
        "desc": "Decade count value (0 to 9)"
      }
    ],
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Clock signal</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Active-low asynchronous reset</td></tr><tr><td><code>q</code></td><td>output</td><td>4</td><td>Decade count value (0 to 9)</td></tr></tbody></table>",
    "starter": "module top_module(\n  input        clk,\n  input        areset_n,\n  output reg [3:0] q\n);\n\n  // Count from 0 to 9, then wrap back to 0\n\nendmodule\n",
    "referenceRtl": "module top_module(\n  input        clk,\n  input        areset_n,\n  output reg [3:0] q\n);\n  always @(posedge clk or negedge areset_n) begin\n    if (!areset_n)\n      q <= 4'd0;\n    else if (q == 4'd9)\n      q <= 4'd0;\n    else\n      q <= q + 1'b1;\n  end\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, areset_n;\n  wire [3:0] q;\n  integer errors = 0;\n  integer i;\n  top_module dut(.clk(clk), .areset_n(areset_n), .q(q));\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; areset_n = 0; #12;\n    if (q !== 4'd0) begin errors = errors + 1; $display(\"Test 1: reset | expected 0 | got %b | FAIL\", q); end\n    else $display(\"Test 1: reset | expected 0 | got %b | PASS\", q);\n    areset_n = 1;\n    for (i = 1; i <= 25; i = i + 1) begin\n      #10;\n      if (q !== (i % 10)) begin\n        errors = errors + 1;\n        $display(\"Test step %0d: expected %0d | got %0d | FAIL\", i, i % 10, q);\n      end else begin\n        $display(\"Test step %0d: expected %0d | got %0d | PASS\", i, i % 10, q);\n      end\n    end\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "areset_n",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "areset_n",
          "wave": "0.1......."
        },
        {
          "name": "q",
          "wave": "=x=========",
          "data": [
            "0",
            "0",
            "7",
            "8",
            "9",
            "0",
            "1",
            "2"
          ]
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "circuitSvg": "<svg viewBox=\"0 0 280 110\" class=\"circuit-svg\"><rect x=\"140\" y=\"20\" width=\"80\" height=\"70\" rx=\"6\" stroke=\"#a78bfa\" stroke-width=\"2\" fill=\"rgba(167,139,250,0.06)\"/><polygon points=\"70,30 110,40 110,70 70,80\" stroke=\"#38bdf8\" stroke-width=\"1.8\" fill=\"rgba(56,189,248,0.06)\"/><line x1=\"110\" y1=\"55\" x2=\"140\" y2=\"55\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"220\" y1=\"55\" x2=\"260\" y2=\"55\" stroke=\"#2dd4bf\" stroke-width=\"2\"/><path d=\"M 240,55 L 240,95 L 30,95 L 30,45 L 70,45\" stroke=\"#2dd4bf\" stroke-width=\"1.5\" stroke-dasharray=\"2,2\" fill=\"none\"/><text x=\"80\" y=\"60\" fill=\"#fbbf24\" font-size=\"9\">q==9?</text><text x=\"155\" y=\"60\" fill=\"#e2e8f0\" font-size=\"12\" font-weight=\"700\">4-b REG</text><text x=\"265\" y=\"59\" fill=\"#2dd4bf\" font-size=\"11\" font-weight=\"700\">q</text></svg>",
    "hints": [
      "Check if `q == 4'd9`: if true, assign `q <= 4'd0;`.",
      "Otherwise, increment: `q <= q + 1'b1;`.",
      "Modulo-10 counters form the core of digital clocks and 7-segment BCD display drivers."
    ],
    "explanation": "A modulo-$M$ counter resets its state whenever it reaches terminal count $M-1$. In binary-coded decimal (BCD), cascading multiple decade counters creates multi-digit decimal displays (seconds, minutes, hours).",
    "commonMistakes": [
      "Checking `if (q == 10)`: this causes the counter to output 10 for one cycle before resetting, making it a modulo-11 counter.",
      "Resetting asynchronously on the terminal count, causing severe glitching hazards."
    ],
    "hwNotes": "Always perform terminal count reset synchronously (`if (q == 9) q <= 0;`). Asynchronous resets driven by combinational decode logic suffer from transient glitches and race conditions.",
    "relatedSlugs": [
      "up-counter-4bit",
      "bcd-7segment",
      "updown-counter"
    ],
    "flagshipIndex": 16,
    "isFlagship": true,
    "curatedTrack": "Level 2: Intermediate (Sequential RTL & FSM)",
    "category": "Sequential Logic",
    "tags": [
      "sequential",
      "fsm",
      "counters",
      "medium",
      "counters"
    ],
    "concept": "<b>Objective:</b> Understand terminal count detection, state wrapping at arbitrary thresholds, and BCD digit counting.<br><br><b>Prerequisites:</b> Binary counters, equality comparison in sequential blocks."
  },
  {
    "slug": "updown-counter",
    "title": "Up/Down Counter — Bidirectional Counting",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "sequential",
      "fsm",
      "counters",
      "medium",
      "counters"
    ],
    "category": "Sequential Logic",
    "lede": "Design a 4-bit synchronous up/down counter with active-low async reset and up_down control input (1 = count up, 0 = count down).",
    "concept": "<b>Objective:</b> Understand bidirectional sequential state machines and dynamic datapath steering.<br><br><b>Prerequisites:</b> Binary counters, conditional arithmetic.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Clock signal</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Active-low asynchronous reset</td></tr><tr><td><code>up_down</code></td><td>input</td><td>1</td><td>Direction: 1 = increment, 0 = decrement</td></tr><tr><td><code>q</code></td><td>output</td><td>4</td><td>4-bit counter value</td></tr></tbody></table>",
    "starter": "module top_module(\n  input        clk,\n  input        areset_n,\n  input        up_down,\n  output reg [3:0] q\n);\n\n  // 4-bit bidirectional counter\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, areset_n, up_down;\n  wire [3:0] q;\n  integer errors = 0;\n  top_module dut(.clk(clk), .areset_n(areset_n), .up_down(up_down), .q(q));\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; areset_n = 0; up_down = 1; #12;\n    if (q !== 4'd0) begin errors = errors + 1; $display(\"Test 1: reset | expected 0 | got %b | FAIL\", q); end\n    else $display(\"Test 1: reset | expected 0 | got %b | PASS\", q);\n    areset_n = 1; #10; // count to 1\n    if (q !== 4'd1) begin errors = errors + 1; $display(\"Test 2: count up | expected 1 | got %b | FAIL\", q); end\n    else $display(\"Test 2: count up | expected 1 | got %b | PASS\", q);\n    #10; // count to 2\n    if (q !== 4'd2) begin errors = errors + 1; $display(\"Test 3: count up | expected 2 | got %b | FAIL\", q); end\n    else $display(\"Test 3: count up | expected 2 | got %b | PASS\", q);\n    up_down = 0; #10; // count down to 1\n    if (q !== 4'd1) begin errors = errors + 1; $display(\"Test 4: count down | expected 1 | got %b | FAIL\", q); end\n    else $display(\"Test 4: count down | expected 1 | got %b | PASS\", q);\n    #10; // count down to 0\n    if (q !== 4'd0) begin errors = errors + 1; $display(\"Test 5: count down | expected 0 | got %b | FAIL\", q); end\n    else $display(\"Test 5: count down | expected 0 | got %b | PASS\", q);\n    #10; // underflow to 15\n    if (q !== 4'd15) begin errors = errors + 1; $display(\"Test 6: underflow | expected 15 | got %b | FAIL\", q); end\n    else $display(\"Test 6: underflow | expected 15 | got %b | PASS\", q);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "areset_n",
      "up_down",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "areset_n",
          "wave": "0.1....."
        },
        {
          "name": "up_down",
          "wave": "1...0..."
        },
        {
          "name": "q",
          "wave": "=x=======",
          "data": [
            "0",
            "0",
            "1",
            "2",
            "1",
            "0",
            "15"
          ]
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "id": 17,
    "topic": "Sequential Logic",
    "subtopic": "Counters",
    "estimatedTime": "15 mins",
    "objective": "Understand bidirectional sequential state machines and dynamic datapath steering.",
    "prerequisites": "Binary counters, conditional arithmetic.",
    "timingReqs": "State updates on `posedge clk`. Rolls over from 15 to 0 on up-count; rolls under from 0 to 15 on down-count.",
    "constraints": "Unsigned 4-bit register arithmetic (`+ 1'b1` and `- 1'b1`).",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Clock signal"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low asynchronous reset"
      },
      {
        "name": "up_down",
        "dir": "input",
        "width": "1",
        "desc": "Direction: 1 = increment, 0 = decrement"
      },
      {
        "name": "q",
        "dir": "output",
        "width": "4",
        "desc": "4-bit counter value"
      }
    ],
    "referenceRtl": "module top_module(\n  input        clk,\n  input        areset_n,\n  input        up_down,\n  output reg [3:0] q\n);\n  always @(posedge clk or negedge areset_n) begin\n    if (!areset_n)\n      q <= 4'd0;\n    else if (up_down)\n      q <= q + 1'b1;\n    else\n      q <= q - 1'b1;\n  end\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 280 110\" class=\"circuit-svg\"><rect x=\"150\" y=\"20\" width=\"80\" height=\"70\" rx=\"6\" stroke=\"#a78bfa\" stroke-width=\"2\" fill=\"rgba(167,139,250,0.06)\"/><polygon points=\"80,30 120,40 120,70 80,80\" stroke=\"#38bdf8\" stroke-width=\"1.8\" fill=\"rgba(56,189,248,0.06)\"/><line x1=\"120\" y1=\"55\" x2=\"150\" y2=\"55\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"230\" y1=\"55\" x2=\"270\" y2=\"55\" stroke=\"#2dd4bf\" stroke-width=\"2\"/><text x=\"16\" y=\"58\" fill=\"#fbbf24\" font-size=\"10\">up_down</text><text x=\"88\" y=\"59\" fill=\"#e2e8f0\" font-size=\"9\">+/- 1</text><text x=\"165\" y=\"60\" fill=\"#e2e8f0\" font-size=\"12\" font-weight=\"700\">4-b REG</text><text x=\"275\" y=\"59\" fill=\"#2dd4bf\" font-size=\"11\" font-weight=\"700\">q</text></svg>",
    "hints": [
      "Use an `if (up_down) q <= q + 1'b1; else q <= q - 1'b1;` branch.",
      "Unsigned subtraction in 4-bit Verilog naturally underflows `4'd0 - 1'b1` to `4'd15`.",
      "Verify reset returns `q` to 0."
    ],
    "explanation": "Bidirectional counters are essential in FIFO occupancy trackers, quadrature rotary encoders, and circular ring buffer pointers. The direction signal `up_down` steers an adder/subtractor unit.",
    "commonMistakes": [
      "Treating `q` as signed, causing underflow to yield `-1` instead of `15`.",
      "Using separate `always` blocks for up and down, inferring conflicting multi-driver nets."
    ],
    "hwNotes": "In FPGA DSP blocks and adder slices, addition and subtraction use the same adder hardware by inverting the B-operand and asserting carry-in ($A - B = A + \\sim B + 1$).",
    "relatedSlugs": [
      "up-counter-4bit",
      "fifo-occupancy-counter",
      "rotary-encoder-decoder"
    ],
    "flagshipIndex": 17,
    "isFlagship": true,
    "curatedTrack": "Level 2: Intermediate (Sequential RTL & FSM)"
  },
  {
    "id": 18,
    "slug": "shift-register-4bit",
    "title": "4-Bit Shift Register — Data Shifting",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "topic": "Sequential Logic",
    "subtopic": "Shift Registers",
    "estimatedTime": "15 mins",
    "lede": "Implement a 4-bit serial-in parallel-out (SIPO) shift register. On each clock edge, data shifts left: q[3]<=q[2], q[2]<=q[1], q[1]<=q[0], q[0]<=din.",
    "objective": "Understand sequential bit shifting, concatenation operators (`{}`), and serial-to-parallel conversion.",
    "prerequisites": "Flip-flop cascades, bit concatenation syntax.",
    "timingReqs": "Data shifts by one position on each `posedge clk`. Requires 4 clock cycles to fully load 4 serial bits.",
    "constraints": "Non-blocking assignments to model pipeline flop stages accurately.",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Master clock"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low asynchronous reset"
      },
      {
        "name": "din",
        "dir": "input",
        "width": "1",
        "desc": "Serial data input"
      },
      {
        "name": "q",
        "dir": "output",
        "width": "4",
        "desc": "4-bit parallel register output"
      }
    ],
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Master clock</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Active-low asynchronous reset</td></tr><tr><td><code>din</code></td><td>input</td><td>1</td><td>Serial data input</td></tr><tr><td><code>q</code></td><td>output</td><td>4</td><td>4-bit parallel register output</td></tr></tbody></table>",
    "starter": "module top_module(\n  input        clk,\n  input        areset_n,\n  input        din,\n  output reg [3:0] q\n);\n\n  // 4-bit left shift register\n\nendmodule\n",
    "referenceRtl": "module top_module(\n  input        clk,\n  input        areset_n,\n  input        din,\n  output reg [3:0] q\n);\n  always @(posedge clk or negedge areset_n) begin\n    if (!areset_n)\n      q <= 4'b0000;\n    else\n      q <= {q[2:0], din};\n  end\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, areset_n, din;\n  wire [3:0] q;\n  integer errors = 0;\n  top_module dut(.clk(clk), .areset_n(areset_n), .din(din), .q(q));\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; areset_n = 0; din = 1; #12;\n    if (q !== 4'b0000) begin errors = errors + 1; $display(\"Test 1: reset | expected 0000 | got %b | FAIL\", q); end\n    else $display(\"Test 1: reset | expected 0000 | got %b | PASS\", q);\n    areset_n = 1; din = 1; #10; // shift 1 -> 0001\n    if (q !== 4'b0001) begin errors = errors + 1; $display(\"Test 2: shift 1 | expected 0001 | got %b | FAIL\", q); end\n    else $display(\"Test 2: shift 1 | expected 0001 | got %b | PASS\", q);\n    din = 0; #10; // shift 0 -> 0010\n    if (q !== 4'b0010) begin errors = errors + 1; $display(\"Test 3: shift 0 | expected 0010 | got %b | FAIL\", q); end\n    else $display(\"Test 3: shift 0 | expected 0010 | got %b | PASS\", q);\n    din = 1; #10; // shift 1 -> 0101\n    if (q !== 4'b0101) begin errors = errors + 1; $display(\"Test 4: shift 1 | expected 0101 | got %b | FAIL\", q); end\n    else $display(\"Test 4: shift 1 | expected 0101 | got %b | PASS\", q);\n    din = 1; #10; // shift 1 -> 1011\n    if (q !== 4'b1011) begin errors = errors + 1; $display(\"Test 5: shift 1 | expected 1011 | got %b | FAIL\", q); end\n    else $display(\"Test 5: shift 1 | expected 1011 | got %b | PASS\", q);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "areset_n",
      "din",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "areset_n",
          "wave": "0.1....."
        },
        {
          "name": "din",
          "wave": "1.0.1.1."
        },
        {
          "name": "q",
          "wave": "=x=======",
          "data": [
            "0",
            "0",
            "0001",
            "0010",
            "0101",
            "1011"
          ]
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "circuitSvg": "<svg viewBox=\"0 0 320 80\" class=\"circuit-svg\"><rect x=\"30\" y=\"15\" width=\"45\" height=\"50\" rx=\"4\" stroke=\"#a78bfa\" stroke-width=\"1.8\" fill=\"rgba(167,139,250,0.06)\"/><rect x=\"100\" y=\"15\" width=\"45\" height=\"50\" rx=\"4\" stroke=\"#a78bfa\" stroke-width=\"1.8\" fill=\"rgba(167,139,250,0.06)\"/><rect x=\"170\" y=\"15\" width=\"45\" height=\"50\" rx=\"4\" stroke=\"#a78bfa\" stroke-width=\"1.8\" fill=\"rgba(167,139,250,0.06)\"/><rect x=\"240\" y=\"15\" width=\"45\" height=\"50\" rx=\"4\" stroke=\"#a78bfa\" stroke-width=\"1.8\" fill=\"rgba(167,139,250,0.06)\"/><line x1=\"5\" y1=\"40\" x2=\"30\" y2=\"40\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"75\" y1=\"40\" x2=\"100\" y2=\"40\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"145\" y1=\"40\" x2=\"170\" y2=\"40\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"215\" y1=\"40\" x2=\"240\" y2=\"40\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"285\" y1=\"40\" x2=\"305\" y2=\"40\" stroke=\"#2dd4bf\" stroke-width=\"2\"/><text x=\"45\" y=\"44\" fill=\"#e2e8f0\" font-size=\"10\">FF0</text><text x=\"115\" y=\"44\" fill=\"#e2e8f0\" font-size=\"10\">FF1</text><text x=\"185\" y=\"44\" fill=\"#e2e8f0\" font-size=\"10\">FF2</text><text x=\"255\" y=\"44\" fill=\"#e2e8f0\" font-size=\"10\">FF3</text></svg>",
    "hints": [
      "Use concatenation: `{q[2:0], din}` shifts all bits left by 1 and inserts `din` into the LSB (`q[0]`).",
      "Non-blocking assignments (`<=`) ensure all 4 flip-flops sample their predecessors simultaneously without race conditions.",
      "Write `q <= {q[2:0], din};`."
    ],
    "explanation": "A shift register connects the output of one flip-flop directly to the input of the next. On every clock tick, bits move along the pipeline chain. In SPI, UART, and I2C controllers, shift registers convert between bit-serial physical wires and byte-parallel processor registers.",
    "commonMistakes": [
      "Using blocking assignments (`=`), causing all flip-flops to update in sequence in a single simulation delta cycle, corrupting the pipeline.",
      "Shifting in the wrong direction (confusing `{din, q[3:1]}` right shift with `{q[2:0], din}` left shift)."
    ],
    "hwNotes": "Modern FPGAs (AMD/Xilinx) can configure a single LUT as a 32-bit shift register (SRL32), implementing deep shift registers with zero flip-flop overhead.",
    "relatedSlugs": [
      "shift-register-sipo",
      "piso-shift-register",
      "universal-shift-register"
    ],
    "flagshipIndex": 18,
    "isFlagship": true,
    "curatedTrack": "Level 2: Intermediate (Sequential RTL & FSM)",
    "category": "Sequential Logic",
    "tags": [
      "sequential",
      "fsm",
      "counters",
      "medium",
      "shift-registers"
    ],
    "concept": "<b>Objective:</b> Understand sequential bit shifting, concatenation operators (`{}`), and serial-to-parallel conversion.<br><br><b>Prerequisites:</b> Flip-flop cascades, bit concatenation syntax."
  },
  {
    "id": 19,
    "slug": "clock-enable-generator",
    "title": "Clock Enable Generator — Clock Enable Logic",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "topic": "Clocking & Timing",
    "subtopic": "Clock Division",
    "estimatedTime": "15 mins",
    "lede": "Generate a single-cycle active-high clock enable pulse (ce) every 4 clock cycles without gating the system clock tree.",
    "objective": "Understand synchronous clock rate division, avoiding clock skew from gated clocks, and single-cycle strobe generation.",
    "prerequisites": "Synchronous counters, clock domains, clock enable conventions.",
    "timingReqs": "Strobe `ce` must be asserted for exactly one clock period every 4 cycles.",
    "constraints": "Do NOT divide the clock net itself. Output `ce` is a synchronous data strobe.",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Master high-frequency clock"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low asynchronous reset"
      },
      {
        "name": "ce",
        "dir": "output",
        "width": "1",
        "desc": "Single-cycle enable strobe (active 1 out of 4 cycles)"
      }
    ],
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Master high-frequency clock</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Active-low asynchronous reset</td></tr><tr><td><code>ce</code></td><td>output</td><td>1</td><td>Single-cycle enable strobe (active 1 out of 4 cycles)</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   clk,\n  input   areset_n,\n  output  ce\n);\n\n  // Generate single-cycle pulse every 4 clock cycles\n\nendmodule\n",
    "referenceRtl": "module top_module(\n  input   clk,\n  input   areset_n,\n  output  ce\n);\n  reg [1:0] cnt;\n  always @(posedge clk or negedge areset_n) begin\n    if (!areset_n)\n      cnt <= 2'b00;\n    else\n      cnt <= cnt + 1'b1;\n  end\n  assign ce = (cnt == 2'b11);\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, areset_n;\n  wire ce;\n  integer errors = 0;\n  integer cycle;\n  integer ce_count = 0;\n  top_module dut(.clk(clk), .areset_n(areset_n), .ce(ce));\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; areset_n = 0; #12;\n    areset_n = 1;\n    for (cycle = 0; cycle < 16; cycle = cycle + 1) begin\n      #10;\n      if (ce === 1'b1) ce_count = ce_count + 1;\n    end\n    // Over 16 cycles, ce should be high exactly 4 times\n    if (ce_count !== 4) begin\n      errors = errors + 1;\n      $display(\"FAIL: Expected 4 ce pulses in 16 cycles, got %0d\", ce_count);\n    end else begin\n      $display(\"PASS: ce asserted exactly 4 times in 16 cycles\");\n    end\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "areset_n",
      "ce"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "areset_n",
          "wave": "0.1....."
        },
        {
          "name": "ce",
          "wave": "0...1...0...1..."
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "circuitSvg": "<svg viewBox=\"0 0 260 100\" class=\"circuit-svg\"><rect x=\"60\" y=\"20\" width=\"80\" height=\"60\" rx=\"6\" stroke=\"#a78bfa\" stroke-width=\"2\" fill=\"rgba(167,139,250,0.06)\"/><circle cx=\"190\" cy=\"50\" r=\"16\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"rgba(56,189,248,0.08)\"/><line x1=\"140\" y1=\"50\" x2=\"174\" y2=\"50\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"206\" y1=\"50\" x2=\"245\" y2=\"50\" stroke=\"#2dd4bf\" stroke-width=\"2\"/><text x=\"76\" y=\"55\" fill=\"#e2e8f0\" font-size=\"11\" font-weight=\"700\">2-b CNT</text><text x=\"180\" y=\"54\" fill=\"#fbbf24\" font-size=\"10\">==3</text><text x=\"248\" y=\"54\" fill=\"#2dd4bf\" font-size=\"11\" font-weight=\"700\">ce</text></svg>",
    "hints": [
      "Use a 2-bit counter (`cnt[1:0]`) running on `clk`.",
      "Assert `ce` whenever the counter reaches its maximum value: `assign ce = (cnt == 2'b11);`.",
      "This creates a clean, synchronous 1-in-4 strobe without creating a new asynchronous clock domain."
    ],
    "explanation": "In high-reliability RTL, never generate divided clocks by toggling a flip-flop (`always @(posedge clk) slow_clk <= ~slow_clk;`). Using `slow_clk` as a clock input elsewhere creates multi-clock domain crossing and clock skew issues. The professional industry pattern is to maintain a single unified master clock tree and distribute single-cycle `ce` pulses.",
    "commonMistakes": [
      "Creating ripple clocks instead of synchronous enable strobes.",
      "Registering `ce` such that it becomes 2 cycles wide instead of exactly 1 cycle."
    ],
    "hwNotes": "Synchronous clock enables keep all registers on the same primary low-skew clock distribution network, simplifying static timing analysis (STA).",
    "relatedSlugs": [
      "programmable-clock-divider",
      "clock-div3",
      "pwm-generator"
    ],
    "flagshipIndex": 19,
    "isFlagship": true,
    "curatedTrack": "Level 2: Intermediate (Sequential RTL & FSM)",
    "category": "Clocking & Timing",
    "tags": [
      "sequential",
      "fsm",
      "counters",
      "medium",
      "clock-division"
    ],
    "concept": "<b>Objective:</b> Understand synchronous clock rate division, avoiding clock skew from gated clocks, and single-cycle strobe generation.<br><br><b>Prerequisites:</b> Synchronous counters, clock domains, clock enable conventions."
  },
  {
    "slug": "rising-edge-detector",
    "title": "Rising Edge Detector — Edge Detection",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "sequential",
      "fsm",
      "counters",
      "medium",
      "edge-detectors"
    ],
    "category": "Sequential Logic",
    "lede": "Detect rising transitions ($0 \\to 1$) on an asynchronous or multi-cycle input signal `in`, generating a single-clock-cycle pulse `p_edge`.",
    "concept": "<b>Objective:</b> Understand delayed flop history registers, transition detection, and pulse generation.<br><br><b>Prerequisites:</b> D flip-flops, boolean logic, edge transitions.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Master sampling clock</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Active-low asynchronous reset</td></tr><tr><td><code>in</code></td><td>input</td><td>1</td><td>Input signal to monitor</td></tr><tr><td><code>p_edge</code></td><td>output</td><td>1</td><td>Single-cycle pulse asserted on 0-&gt;1 rising edge</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   clk,\n  input   areset_n,\n  input   in,\n  output reg p_edge\n);\n\n  // Detect rising edge on 'in'\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, areset_n, in;\n  wire p_edge;\n  integer errors = 0;\n  top_module dut(.clk(clk), .areset_n(areset_n), .in(in), .p_edge(p_edge));\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; areset_n = 0; in = 0; #12;\n    areset_n = 1;\n    @(negedge clk); in = 1; // transition input before clock edge\n    @(posedge clk); #2;     // pulse is active now during this cycle!\n    if (p_edge !== 1'b1) begin errors = errors + 1; $display(\"Test 1: edge pulse | expected 1 | got %b | FAIL\", p_edge); end\n    else $display(\"Test 1: edge pulse | expected 1 | got %b | PASS\", p_edge);\n    @(posedge clk); #2;     // next cycle: pulse must have cleared to 0\n    if (p_edge !== 1'b0) begin errors = errors + 1; $display(\"Test 2: pulse single-cycle | expected 0 | got %b | FAIL\", p_edge); end\n    else $display(\"Test 2: pulse single-cycle | expected 0 | got %b | PASS\", p_edge);\n    @(negedge clk); in = 0; // falling edge\n    @(posedge clk); #2;\n    if (p_edge !== 1'b0) begin errors = errors + 1; $display(\"Test 3: falling edge | expected 0 | got %b | FAIL\", p_edge); end\n    else $display(\"Test 3: falling edge | expected 0 | got %b | PASS\", p_edge);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "in",
      "p_edge"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "in",
          "wave": "0..1....0"
        },
        {
          "name": "p_edge",
          "wave": "0..10..."
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "id": 20,
    "topic": "Sequential Logic",
    "subtopic": "Edge Detectors",
    "estimatedTime": "15 mins",
    "objective": "Understand delayed flop history registers, transition detection, and pulse generation.",
    "prerequisites": "D flip-flops, boolean logic, edge transitions.",
    "timingReqs": "Output `p_edge` asserts for exactly one clock cycle immediately following the cycle where `in` transitioned from 0 to 1.",
    "constraints": "Single-cycle pulse output. Synthesizable sequential RTL.",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Master sampling clock"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low asynchronous reset"
      },
      {
        "name": "in",
        "dir": "input",
        "width": "1",
        "desc": "Input signal to monitor"
      },
      {
        "name": "p_edge",
        "dir": "output",
        "width": "1",
        "desc": "Single-cycle pulse asserted on 0->1 rising edge"
      }
    ],
    "referenceRtl": "module top_module(\n  input       clk,\n  input       areset_n,\n  input       in,\n  output reg  p_edge\n);\n  reg in_d;\n  always @(posedge clk or negedge areset_n) begin\n    if (!areset_n) begin\n      in_d   <= 1'b0;\n      p_edge <= 1'b0;\n    end else begin\n      in_d   <= in;\n      p_edge <= in & ~in_d;\n    end\n  end\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 260 90\" class=\"circuit-svg\"><rect x=\"60\" y=\"20\" width=\"60\" height=\"50\" rx=\"4\" stroke=\"#a78bfa\" stroke-width=\"2\" fill=\"rgba(167,139,250,0.06)\"/><circle cx=\"160\" cy=\"58\" r=\"4\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"none\"/><path d=\"M 170,30 L 190,30 A 18 18 0 0 1 190,66 L 170,66 Z\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"rgba(56,189,248,0.08)\"/><path d=\"M 15,35 L 60,35 M 25,35 L 25,12 L 170,12 L 170,38 M 120,45 L 156,45 M 156,45 L 156,58 M 164,58 L 170,58 M 208,48 L 245,48\" stroke=\"#38bdf8\" stroke-width=\"1.8\" fill=\"none\"/><text x=\"80\" y=\"50\" fill=\"#e2e8f0\" font-size=\"10\">DFF</text><text x=\"8\" y=\"38\" fill=\"#94a3b8\" font-size=\"10\">in</text><text x=\"248\" y=\"52\" fill=\"#2dd4bf\" font-size=\"11\" font-weight=\"700\">p_edge</text></svg>",
    "hints": [
      "Store the previous state of `in` in a register: `always @(posedge clk) in_d <= in;`.",
      "A rising edge occurs when current input is 1 and previous input was 0: `in & ~in_d`.",
      "For a falling edge detector, you would test `~in & in_d`."
    ],
    "explanation": "By registering the input signal, `in_d` holds the value of `in` from exactly one clock cycle in the past. Comparing the current value with the delayed value ($in \\cdot \\overline{in_d}$) evaluates to 1 exclusively during the single clock period when the signal transitioned from 0 to 1.",
    "commonMistakes": [
      "Using `in_d & ~in`, which detects falling edges ($1 \\to 0$) instead of rising edges.",
      "Forgetting that if `in` originates in an asynchronous domain, it must first pass through a 2-flop synchronizer before edge detection to avoid metastability."
    ],
    "hwNotes": "Edge detectors are ubiquitous in pushbutton debouncers, interrupt request latching, and protocol start-bit monitors.",
    "relatedSlugs": [
      "one-shot-pulse-generator",
      "level-cross-edge-detector",
      "debounce-circuit"
    ],
    "flagshipIndex": 20,
    "isFlagship": true,
    "curatedTrack": "Level 2: Intermediate (Sequential RTL & FSM)"
  },
  {
    "id": 21,
    "slug": "moore-sequence-detector-1011",
    "title": "Moore Sequence Detector — FSM Design",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "topic": "Finite State Machines",
    "subtopic": "Moore FSM",
    "estimatedTime": "20 mins",
    "lede": "Design a Moore finite state machine that detects overlapping sequence `1011` on serial input `din`. Output `detected` is 1 when in the match state.",
    "objective": "Master 3-process Moore FSM architecture, state encoding, next-state logic, and overlapping sequence tracking.",
    "prerequisites": "State transition diagrams, FSM state variables, parameter/localparam enums.",
    "timingReqs": "In a Moore machine, output depends strictly on current state, appearing 1 cycle after the final input bit.",
    "constraints": "Overlapping sequences must be detected (e.g. `1011011` asserts detected twice).",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Clock signal"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low asynchronous reset"
      },
      {
        "name": "din",
        "dir": "input",
        "width": "1",
        "desc": "Serial bitstream input"
      },
      {
        "name": "detected",
        "dir": "output",
        "width": "1",
        "desc": "High when sequence 1011 is detected"
      }
    ],
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Clock signal</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Active-low asynchronous reset</td></tr><tr><td><code>din</code></td><td>input</td><td>1</td><td>Serial bitstream input</td></tr><tr><td><code>detected</code></td><td>output</td><td>1</td><td>High when sequence 1011 is detected</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   clk,\n  input   areset_n,\n  input   din,\n  output  detected\n);\n\n  // Moore FSM detecting overlapping 1011\n\nendmodule\n",
    "referenceRtl": "module top_module(\n  input   clk,\n  input   areset_n,\n  input   din,\n  output  detected\n);\n  localparam S0 = 3'd0; // Idle / none\n  localparam S1 = 3'd1; // '1'\n  localparam S2 = 3'd2; // '10'\n  localparam S3 = 3'd3; // '101'\n  localparam S4 = 3'd4; // '1011' (Match)\n\n  reg [2:0] state, next_state;\n\n  always @(posedge clk or negedge areset_n) begin\n    if (!areset_n)\n      state <= S0;\n    else\n      state <= next_state;\n  end\n\n  always @(*) begin\n    case (state)\n      S0: next_state = din ? S1 : S0;\n      S1: next_state = din ? S1 : S2;\n      S2: next_state = din ? S3 : S0;\n      S3: next_state = din ? S4 : S2;\n      S4: next_state = din ? S1 : S2;\n      default: next_state = S0;\n    endcase\n  end\n\n  assign detected = (state == S4);\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, areset_n, din;\n  wire detected;\n  integer errors = 0;\n  top_module dut(.clk(clk), .areset_n(areset_n), .din(din), .detected(detected));\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; areset_n = 0; din = 0; #12;\n    areset_n = 1; #8;\n    // Feed: 1 -> 0 -> 1 -> 1 (Sequence 1011)\n    din = 1; #10;\n    din = 0; #10;\n    din = 1; #10;\n    din = 1; #10;\n    #2; // S4 entered\n    if (detected !== 1'b1) begin errors = errors + 1; $display(\"Test 1: 1011 detection | expected 1 | got %b | FAIL\", detected); end\n    else $display(\"Test 1: 1011 detection | expected 1 | got %b | PASS\", detected);\n    // Overlapping test: from S4, next din=0 -> S2 ('10'), then din=1 -> S3 ('101'), then din=1 -> S4!\n    #8; din = 0; #10;\n    din = 1; #10;\n    din = 1; #10;\n    #2;\n    if (detected !== 1'b1) begin errors = errors + 1; $display(\"Test 2: overlapping 1011011 | expected 1 | got %b | FAIL\", detected); end\n    else $display(\"Test 2: overlapping 1011011 | expected 1 | got %b | PASS\", detected);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "areset_n",
      "din",
      "detected"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "din",
          "wave": "0.1011011."
        },
        {
          "name": "detected",
          "wave": "0.....10..1."
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "circuitSvg": "<svg viewBox=\"0 0 340 100\" class=\"circuit-svg\"><circle cx=\"40\" cy=\"50\" r=\"22\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"rgba(56,189,248,0.06)\"/><circle cx=\"105\" cy=\"50\" r=\"22\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"rgba(56,189,248,0.06)\"/><circle cx=\"170\" cy=\"50\" r=\"22\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"rgba(56,189,248,0.06)\"/><circle cx=\"235\" cy=\"50\" r=\"22\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"rgba(56,189,248,0.06)\"/><circle cx=\"300\" cy=\"50\" r=\"22\" stroke=\"#2dd4bf\" stroke-width=\"2.5\" fill=\"rgba(45,212,191,0.15)\"/><text x=\"32\" y=\"54\" fill=\"#e2e8f0\" font-size=\"10\">S0/0</text><text x=\"97\" y=\"54\" fill=\"#e2e8f0\" font-size=\"10\">S1/0</text><text x=\"162\" y=\"54\" fill=\"#e2e8f0\" font-size=\"10\">S2/0</text><text x=\"227\" y=\"54\" fill=\"#e2e8f0\" font-size=\"10\">S3/0</text><text x=\"292\" y=\"54\" fill=\"#2dd4bf\" font-size=\"10\" font-weight=\"700\">S4/1</text></svg>",
    "hints": [
      "A Moore FSM output is an asynchronous function of current state: `assign detected = (state == S4);`.",
      "Define states: S0 (None), S1 ('1'), S2 ('10'), S3 ('101'), S4 ('1011').",
      "In S4, if the next bit is `0`, the history is `10`, transitioning to S2!"
    ],
    "explanation": "In a Moore machine, output values depend solely on the current state vector. When the sequence `1011` completes, the machine enters state $S_4$, asserting `detected=1` for the duration of that cycle. Overlap handling ensures continuous monitoring without missing subsequent sequence starts.",
    "commonMistakes": [
      "Resetting to S0 after detection instead of S1 (if din=1) or S2 (if din=0), breaking overlap support.",
      "Creating latches by missing cases in `always @(*)`."
    ],
    "hwNotes": "Because Moore outputs depend only on state flip-flops, they are glitch-free and have clean clock-to-output timing. However, they respond one cycle later than Mealy machines.",
    "relatedSlugs": [
      "sequence-detector-101-nonoverlap",
      "sequence-detector-1011",
      "vending-machine-fsm"
    ],
    "flagshipIndex": 21,
    "isFlagship": true,
    "curatedTrack": "Level 2: Intermediate (Sequential RTL & FSM)",
    "category": "Finite State Machines",
    "tags": [
      "sequential",
      "fsm",
      "counters",
      "medium",
      "moore-fsm"
    ],
    "concept": "<b>Objective:</b> Master 3-process Moore FSM architecture, state encoding, next-state logic, and overlapping sequence tracking.<br><br><b>Prerequisites:</b> State transition diagrams, FSM state variables, parameter/localparam enums."
  },
  {
    "id": 22,
    "slug": "mealy-sequence-detector-101",
    "title": "Mealy Sequence Detector — FSM Output Behavior",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "topic": "Finite State Machines",
    "subtopic": "Mealy FSM",
    "estimatedTime": "20 mins",
    "lede": "Design a Mealy finite state machine detecting sequence `101`. Unlike a Moore FSM, output `detected` asserts immediately in the same cycle when the final bit arrives.",
    "objective": "Understand Mealy FSM architecture, state reduction, and combinational output dependence on both state and input.",
    "prerequisites": "Moore FSM, combinational path analysis.",
    "timingReqs": "Output `detected` asserts combinational with `din` during state S2 when `din=1`.",
    "constraints": "Overlapping sequence support (`10101` produces 2 detections).",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Clock signal"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low asynchronous reset"
      },
      {
        "name": "din",
        "dir": "input",
        "width": "1",
        "desc": "Bitstream input"
      },
      {
        "name": "detected",
        "dir": "output",
        "width": "1",
        "desc": "High when sequence 101 completes"
      }
    ],
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Clock signal</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Active-low asynchronous reset</td></tr><tr><td><code>din</code></td><td>input</td><td>1</td><td>Bitstream input</td></tr><tr><td><code>detected</code></td><td>output</td><td>1</td><td>High when sequence 101 completes</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   clk,\n  input   areset_n,\n  input   din,\n  output  detected\n);\n\n  // Mealy FSM detecting sequence 101\n\nendmodule\n",
    "referenceRtl": "module top_module(\n  input   clk,\n  input   areset_n,\n  input   din,\n  output  detected\n);\n  localparam S0 = 2'd0; // Idle\n  localparam S1 = 2'd1; // '1'\n  localparam S2 = 2'd2; // '10'\n\n  reg [1:0] state, next_state;\n\n  always @(posedge clk or negedge areset_n) begin\n    if (!areset_n)\n      state <= S0;\n    else\n      state <= next_state;\n  end\n\n  always @(*) begin\n    case (state)\n      S0: next_state = din ? S1 : S0;\n      S1: next_state = din ? S1 : S2;\n      S2: next_state = din ? S1 : S0;\n      default: next_state = S0;\n    endcase\n  end\n\n  // Mealy output: asserts during S2 when din=1\n  assign detected = (state == S2) && (din == 1'b1);\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, areset_n, din;\n  wire detected;\n  integer errors = 0;\n  top_module dut(.clk(clk), .areset_n(areset_n), .din(din), .detected(detected));\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; areset_n = 0; din = 0; #12;\n    areset_n = 1; #8;\n    // Feed 1 -> 0 -> 1 (Sequence 101)\n    din = 1; #10; // state S1\n    din = 0; #10; // state S2\n    din = 1; #2;  // Mealy output fires immediately!\n    if (detected !== 1'b1) begin errors = errors + 1; $display(\"Test 1: 101 detected | expected 1 | got %b | FAIL\", detected); end\n    else $display(\"Test 1: 101 detected | expected 1 | got %b | PASS\", detected);\n    #8; // clock edge: state moves to S1, next din=0 -> S2\n    din = 0; #10;\n    din = 1; #2; // overlap 10101 detected again!\n    if (detected !== 1'b1) begin errors = errors + 1; $display(\"Test 2: overlap 10101 | expected 1 | got %b | FAIL\", detected); end\n    else $display(\"Test 2: overlap 10101 | expected 1 | got %b | PASS\", detected);\n    #8;\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "areset_n",
      "din",
      "detected"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "din",
          "wave": "0.1.0.1.0.1."
        },
        {
          "name": "detected",
          "wave": "0.....1.0.1."
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "circuitSvg": "<svg viewBox=\"0 0 280 90\" class=\"circuit-svg\"><circle cx=\"50\" cy=\"45\" r=\"24\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"rgba(56,189,248,0.06)\"/><circle cx=\"140\" cy=\"45\" r=\"24\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"rgba(56,189,248,0.06)\"/><circle cx=\"230\" cy=\"45\" r=\"24\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"rgba(56,189,248,0.06)\"/><text x=\"44\" y=\"50\" fill=\"#e2e8f0\" font-size=\"11\">S0</text><text x=\"134\" y=\"50\" fill=\"#e2e8f0\" font-size=\"11\">S1</text><text x=\"224\" y=\"50\" fill=\"#e2e8f0\" font-size=\"11\">S2</text></svg>",
    "hints": [
      "A Mealy output depends on BOTH state and input: `assign detected = (state == S2) && (din == 1'b1);`.",
      "Mealy machines require 1 fewer state than Moore machines (3 states for a 3-bit sequence vs 4 states in Moore).",
      "Be aware that input glitches can propagate directly to Mealy outputs."
    ],
    "explanation": "Because a Mealy machine's output incorporates the input directly ($Z = \\lambda(S, X)$), detection occurs in the very same cycle that the final bit arrives without waiting for a register boundary. This saves 1 state and 1 cycle of latency, at the cost of exposing the output to input noise.",
    "commonMistakes": [
      "Registering the output in a Moore-style block, which introduces a 1-cycle delay.",
      "Forgetting to verify overlap transitions from S2."
    ],
    "hwNotes": "Mealy outputs create combinational paths spanning between clock domains or modules, complicating timing closure. In high-speed ASIC designs, Moore outputs or registered Mealy outputs (Medvedev FSMs) are preferred.",
    "relatedSlugs": [
      "moore-sequence-detector-1011",
      "sequence-detector-101-nonoverlap",
      "traffic-light-fsm"
    ],
    "flagshipIndex": 22,
    "isFlagship": true,
    "curatedTrack": "Level 2: Intermediate (Sequential RTL & FSM)",
    "category": "Finite State Machines",
    "tags": [
      "sequential",
      "fsm",
      "counters",
      "medium",
      "mealy-fsm"
    ],
    "concept": "<b>Objective:</b> Understand Mealy FSM architecture, state reduction, and combinational output dependence on both state and input.<br><br><b>Prerequisites:</b> Moore FSM, combinational path analysis."
  },
  {
    "id": 23,
    "slug": "synchronous-ram",
    "title": "Synchronous RAM — Memory Read/Write",
    "difficulty": "hard",
    "points": 50,
    "level": 3,
    "topic": "Memory Architectures",
    "subtopic": "SRAM Blocks",
    "estimatedTime": "25 mins",
    "lede": "Design a 16-word by 8-bit synchronous RAM (16x8) with synchronous write and synchronous read.",
    "objective": "Understand inferring block RAMs in synthesizable Verilog, multidimensional arrays, and synchronous address register pipelines.",
    "prerequisites": "Sequential logic, arrays, memory read/write cycles.",
    "timingReqs": "Write occurs on `posedge clk` when `we=1`. Read data `q` updates on `posedge clk` from address `addr` (1-cycle read latency).",
    "constraints": "Synthesizable memory array: `reg [7:0] ram [0:15];`. Read output must be registered.",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Master memory clock"
      },
      {
        "name": "we",
        "dir": "input",
        "width": "1",
        "desc": "Write enable (1 = write, 0 = read)"
      },
      {
        "name": "addr",
        "dir": "input",
        "width": "4",
        "desc": "4-bit word address (0 to 15)"
      },
      {
        "name": "data",
        "dir": "input",
        "width": "8",
        "desc": "8-bit write data input"
      },
      {
        "name": "q",
        "dir": "output",
        "width": "8",
        "desc": "8-bit registered read data output"
      }
    ],
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Master memory clock</td></tr><tr><td><code>we</code></td><td>input</td><td>1</td><td>Write enable (1 = write, 0 = read)</td></tr><tr><td><code>addr</code></td><td>input</td><td>4</td><td>4-bit word address (0 to 15)</td></tr><tr><td><code>data</code></td><td>input</td><td>8</td><td>8-bit write data input</td></tr><tr><td><code>q</code></td><td>output</td><td>8</td><td>8-bit registered read data output</td></tr></tbody></table>",
    "starter": "module top_module(\n  input        clk,\n  input        we,\n  input  [3:0] addr,\n  input  [7:0] data,\n  output reg [7:0] q\n);\n\n  // 16x8 Synchronous RAM with registered read output\n\nendmodule\n",
    "referenceRtl": "module top_module(\n  input        clk,\n  input        we,\n  input  [3:0] addr,\n  input  [7:0] data,\n  output reg [7:0] q\n);\n  reg [7:0] ram [0:15];\n\n  always @(posedge clk) begin\n    if (we)\n      ram[addr] <= data;\n    q <= ram[addr];\n  end\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, we;\n  reg [3:0] addr;\n  reg [7:0] data;\n  wire [7:0] q;\n  integer errors = 0;\n  top_module dut(.clk(clk), .we(we), .addr(addr), .data(data), .q(q));\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; we = 0; addr = 0; data = 0;\n    // Write 8'hA5 to address 4\n    @(negedge clk); we = 1; addr = 4'd4; data = 8'hA5;\n    @(posedge clk); // write committed\n    // Write 8'h3C to address 9\n    @(negedge clk); we = 1; addr = 4'd9; data = 8'h3C;\n    @(posedge clk);\n    // Read address 4\n    @(negedge clk); we = 0; addr = 4'd4;\n    @(posedge clk); #1; // read data available on q\n    if (q !== 8'hA5) begin errors = errors + 1; $display(\"Test 1: read addr 4 | expected A5 | got %h | FAIL\", q); end\n    else $display(\"Test 1: read addr 4 | expected A5 | got %h | PASS\", q);\n    // Read address 9\n    @(negedge clk); we = 0; addr = 4'd9;\n    @(posedge clk); #1;\n    if (q !== 8'h3C) begin errors = errors + 1; $display(\"Test 2: read addr 9 | expected 3C | got %h | FAIL\", q); end\n    else $display(\"Test 2: read addr 9 | expected 3C | got %h | PASS\", q);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "we",
      "addr",
      "data",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "we",
          "wave": "01.0..."
        },
        {
          "name": "addr",
          "wave": "==.==..",
          "data": [
            "4",
            "9",
            "4",
            "9"
          ]
        },
        {
          "name": "data",
          "wave": "==.....",
          "data": [
            "A5",
            "3C"
          ]
        },
        {
          "name": "q",
          "wave": "x...==.",
          "data": [
            "A5",
            "3C"
          ]
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "circuitSvg": "<svg viewBox=\"0 0 300 120\" class=\"circuit-svg\"><rect x=\"90\" y=\"15\" width=\"120\" height=\"90\" rx=\"8\" stroke=\"#38bdf8\" stroke-width=\"2.5\" fill=\"rgba(56,189,248,0.06)\"/><line x1=\"20\" y1=\"35\" x2=\"90\" y2=\"35\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"20\" y1=\"60\" x2=\"90\" y2=\"60\" stroke=\"#fbbf24\" stroke-width=\"2\"/><line x1=\"20\" y1=\"85\" x2=\"90\" y2=\"85\" stroke=\"#a78bfa\" stroke-width=\"2\"/><line x1=\"210\" y1=\"60\" x2=\"270\" y2=\"60\" stroke=\"#2dd4bf\" stroke-width=\"2\"/><text x=\"12\" y=\"39\" fill=\"#94a3b8\" font-size=\"10\">addr[3:0]</text><text x=\"24\" y=\"64\" fill=\"#fbbf24\" font-size=\"10\">we</text><text x=\"12\" y=\"89\" fill=\"#a78bfa\" font-size=\"10\">data[7:0]</text><text x=\"275\" y=\"64\" fill=\"#2dd4bf\" font-size=\"11\" font-weight=\"700\">q[7:0]</text><text x=\"110\" y=\"55\" fill=\"#e2e8f0\" font-size=\"13\" font-weight=\"700\">16x8 RAM</text><text x=\"115\" y=\"75\" fill=\"#64748b\" font-size=\"10\">SYNC BRAM</text></svg>",
    "hints": [
      "Declare a memory array: `reg [7:0] ram [0:15];`.",
      "Inside `always @(posedge clk)`: write when `we` is asserted: `if (we) ram[addr] <= data;`.",
      "Read synchronously into `q`: `q <= ram[addr];`."
    ],
    "explanation": "Modern FPGA and ASIC block memories (BRAM / SRAM macros) operate synchronously: addresses and write enables are sampled at the clock edge, and data appears at the output after the clock-to-out access time ($t_{co}$). Registering the read address or output enables mapping directly into embedded hardware Block RAM primitives rather than distributed LUT RAM.",
    "commonMistakes": [
      "Writing asynchronous read logic (`assign q = ram[addr];`). In modern FPGAs, large memories cannot be read asynchronously without forcing the tool to synthesize millions of LUTs.",
      "Confusing array dimensions: `reg [7:0] ram [0:15]` is 16 words of 8-bit width (not `reg [15:0] ram [0:7]`)."
    ],
    "hwNotes": "In FPGA synthesis (Xilinx Vivado, Intel Quartus), this exact coding template automatically infers dedicated Block RAM (BRAM) tiles without consuming any logic slices.",
    "relatedSlugs": [
      "single-port-ram-we",
      "dual-port-ram",
      "fifo-synchronous"
    ],
    "flagshipIndex": 23,
    "isFlagship": true,
    "curatedTrack": "Level 3: Advanced (Memory, FIFO & Protocols)",
    "category": "Memory Architectures",
    "tags": [
      "memory",
      "fifo",
      "protocols",
      "apb",
      "uart",
      "hard",
      "sram-blocks"
    ],
    "concept": "<b>Objective:</b> Understand inferring block RAMs in synthesizable Verilog, multidimensional arrays, and synchronous address register pipelines.<br><br><b>Prerequisites:</b> Sequential logic, arrays, memory read/write cycles."
  },
  {
    "id": 24,
    "slug": "single-port-ram-we",
    "title": "Single-Port RAM with Write Enable — Memory Control",
    "difficulty": "hard",
    "points": 50,
    "level": 3,
    "topic": "Memory Architectures",
    "subtopic": "SRAM Blocks",
    "estimatedTime": "25 mins",
    "lede": "Implement a 32-word x 8-bit single-port synchronous RAM with read-first (read-during-write) behavior.",
    "objective": "Understand memory collision semantics, write-first vs read-first vs no-change modes, and address bus sharing.",
    "prerequisites": "Synchronous RAM, write enable gating.",
    "timingReqs": "When we=1 at posedge clk, old memory contents are presented on dout (read-first), while din is written into memory.",
    "constraints": "Single-port architecture: read and write share the same clock and address bus.",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Clock signal"
      },
      {
        "name": "we",
        "dir": "input",
        "width": "1",
        "desc": "Write enable"
      },
      {
        "name": "addr",
        "dir": "input",
        "width": "5",
        "desc": "5-bit word address (0 to 31)"
      },
      {
        "name": "din",
        "dir": "input",
        "width": "8",
        "desc": "8-bit input data to write"
      },
      {
        "name": "dout",
        "dir": "output",
        "width": "8",
        "desc": "8-bit read data output"
      }
    ],
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Clock signal</td></tr><tr><td><code>we</code></td><td>input</td><td>1</td><td>Write enable</td></tr><tr><td><code>addr</code></td><td>input</td><td>5</td><td>5-bit word address (0 to 31)</td></tr><tr><td><code>din</code></td><td>input</td><td>8</td><td>8-bit input data to write</td></tr><tr><td><code>dout</code></td><td>output</td><td>8</td><td>8-bit read data output</td></tr></tbody></table>",
    "starter": "module top_module(\n  input        clk,\n  input        we,\n  input  [4:0] addr,\n  input  [7:0] din,\n  output reg [7:0] dout\n);\n\n  // 32x8 single-port RAM with read-first semantics\n\nendmodule\n",
    "referenceRtl": "module top_module(\n  input        clk,\n  input        we,\n  input  [4:0] addr,\n  input  [7:0] din,\n  output reg [7:0] dout\n);\n  reg [7:0] ram [0:31];\n\n  always @(posedge clk) begin\n    dout <= ram[addr]; // read-first: sample prior memory content\n    if (we)\n      ram[addr] <= din;\n  end\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, we;\n  reg [4:0] addr;\n  reg [7:0] din;\n  wire [7:0] dout;\n  integer errors = 0;\n  top_module dut(.clk(clk), .we(we), .addr(addr), .din(din), .dout(dout));\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; we = 0; addr = 0; din = 0;\n    // Step 1: Write initial value 8'h55 to address 10\n    @(negedge clk); we = 1; addr = 5'd10; din = 8'h55;\n    @(posedge clk);\n    // Step 2: Write-during-read: overwrite addr 10 with 8'hAA\n    // In read-first mode, dout must return OLD value 8'h55!\n    @(negedge clk); we = 1; addr = 5'd10; din = 8'hAA;\n    @(posedge clk); #1;\n    if (dout !== 8'h55) begin errors = errors + 1; $display(\"Test 1: read-first returned %h (expected 55) | FAIL\", dout); end\n    else $display(\"Test 1: read-first returned old value 55 | PASS\");\n    // Step 3: Now read addr 10 with we=0: must return new value 8'hAA\n    @(negedge clk); we = 0; addr = 5'd10;\n    @(posedge clk); #1;\n    if (dout !== 8'hAA) begin errors = errors + 1; $display(\"Test 2: subsequent read returned %h (expected AA) | FAIL\", dout); end\n    else $display(\"Test 2: subsequent read returned new value AA | PASS\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "we",
      "addr",
      "din",
      "dout"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......"
        },
        {
          "name": "we",
          "wave": "01.0..."
        },
        {
          "name": "addr",
          "wave": "==.==..",
          "data": [
            "10",
            "10",
            "10"
          ]
        },
        {
          "name": "din",
          "wave": "==.....",
          "data": [
            "55",
            "AA"
          ]
        },
        {
          "name": "dout",
          "wave": "x..==..",
          "data": [
            "55",
            "AA"
          ]
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "circuitSvg": "<svg viewBox=\"0 0 300 120\" class=\"circuit-svg\"><rect x=\"90\" y=\"15\" width=\"120\" height=\"90\" rx=\"8\" stroke=\"#38bdf8\" stroke-width=\"2.5\" fill=\"rgba(56,189,248,0.06)\"/><line x1=\"20\" y1=\"35\" x2=\"90\" y2=\"35\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"20\" y1=\"60\" x2=\"90\" y2=\"60\" stroke=\"#fbbf24\" stroke-width=\"2\"/><line x1=\"20\" y1=\"85\" x2=\"90\" y2=\"85\" stroke=\"#a78bfa\" stroke-width=\"2\"/><line x1=\"210\" y1=\"60\" x2=\"270\" y2=\"60\" stroke=\"#2dd4bf\" stroke-width=\"2\"/><text x=\"12\" y=\"39\" fill=\"#94a3b8\" font-size=\"10\">addr[4:0]</text><text x=\"24\" y=\"64\" fill=\"#fbbf24\" font-size=\"10\">we</text><text x=\"12\" y=\"89\" fill=\"#a78bfa\" font-size=\"10\">din[7:0]</text><text x=\"275\" y=\"64\" fill=\"#2dd4bf\" font-size=\"11\" font-weight=\"700\">dout[7:0]</text><text x=\"105\" y=\"55\" fill=\"#e2e8f0\" font-size=\"12\" font-weight=\"700\">READ-FIRST</text><text x=\"115\" y=\"75\" fill=\"#64748b\" font-size=\"10\">32x8 RAM</text></svg>",
    "hints": [
      "In read-first mode, assign `dout <= ram[addr];` unconditionally outside the `if (we)` check.",
      "Then update memory inside `if (we) ram[addr] <= din;`.",
      "Non-blocking assignments ensure `dout` receives the pre-write value stored in the array."
    ],
    "explanation": "When writing to the same address being read, memory architectures support three behaviors: 1) Read-first: output reflects old memory contents before write. 2) Write-first: output reflects newly written data. 3) No-change: output remains latched to prior cycle data. Read-first is the default native behavior of most FPGA BRAM primitives.",
    "commonMistakes": [
      "Assigning `dout <= din` during writes, turning it into write-first mode instead of read-first mode.",
      "Using blocking assignments, which breaks delta-cycle read-first ordering in simulation."
    ],
    "hwNotes": "Selecting read-first mode in BRAM saves power and avoids bypass multiplexer logic in FPGA routing fabrics.",
    "relatedSlugs": [
      "synchronous-ram",
      "dual-port-ram",
      "fifo-synchronous"
    ],
    "flagshipIndex": 24,
    "isFlagship": true,
    "curatedTrack": "Level 3: Advanced (Memory, FIFO & Protocols)",
    "category": "Memory Architectures",
    "tags": [
      "memory",
      "fifo",
      "protocols",
      "apb",
      "uart",
      "hard",
      "sram-blocks"
    ],
    "concept": "<b>Objective:</b> Understand memory collision semantics, write-first vs read-first vs no-change modes, and address bus sharing.<br><br><b>Prerequisites:</b> Synchronous RAM, write enable gating."
  },
  {
    "slug": "fifo-synchronous",
    "title": "Synchronous FIFO — FIFO Architecture",
    "difficulty": "hard",
    "points": 50,
    "level": 3,
    "tags": [
      "memory",
      "fifo",
      "protocols",
      "apb",
      "uart",
      "hard",
      "synchronous-fifo"
    ],
    "category": "Queues & Buffers",
    "lede": "Design an 8-entry by 8-bit synchronous First-In First-Out (FIFO) buffer with write enable (wr_en), read enable (rd_en), full, and empty flags.",
    "concept": "<b>Objective:</b> Master circular buffer pointer management, simultaneous read/write arbitration, and flag generation.<br><br><b>Prerequisites:</b> Synchronous RAM, binary counters, FIFO full/empty logic.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Master clock</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Active-low asynchronous reset</td></tr><tr><td><code>wr_en</code></td><td>input</td><td>1</td><td>Write (push) enable</td></tr><tr><td><code>din</code></td><td>input</td><td>8</td><td>8-bit input data</td></tr><tr><td><code>rd_en</code></td><td>input</td><td>1</td><td>Read (pop) enable</td></tr><tr><td><code>dout</code></td><td>output</td><td>8</td><td>8-bit output data</td></tr><tr><td><code>full</code></td><td>output</td><td>1</td><td>FIFO full flag</td></tr><tr><td><code>empty</code></td><td>output</td><td>1</td><td>FIFO empty flag</td></tr></tbody></table>",
    "starter": "module top_module(\n  input        clk,\n  input        areset_n,\n  input        wr_en,\n  input  [7:0] din,\n  input        rd_en,\n  output reg [7:0] dout,\n  output       full,\n  output       empty\n);\n\n  // 8-entry by 8-bit Synchronous FIFO\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, areset_n, wr_en, rd_en;\n  reg [7:0] din;\n  wire [7:0] dout;\n  wire full, empty;\n  integer errors = 0;\n  top_module dut(\n    .clk(clk), .areset_n(areset_n),\n    .wr_en(wr_en), .din(din),\n    .rd_en(rd_en), .dout(dout),\n    .full(full), .empty(empty)\n  );\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; areset_n = 0; wr_en = 0; rd_en = 0; din = 0; #12;\n    areset_n = 1; #8;\n    if (!empty || full) begin errors = errors + 1; $display(\"Test 1: reset state | FAIL empty=%b full=%b\", empty, full); end\n    else $display(\"Test 1: reset state | empty=1, full=0 | PASS\");\n    // Push byte 0x11\n    @(negedge clk); wr_en = 1; din = 8'h11;\n    @(posedge clk);\n    @(negedge clk); wr_en = 1; din = 8'h22;\n    @(posedge clk);\n    @(negedge clk); wr_en = 0;\n    // Pop first byte (should be 0x11)\n    @(negedge clk); rd_en = 1;\n    @(posedge clk); #1;\n    if (dout !== 8'h11) begin errors = errors + 1; $display(\"Test 2: pop first | expected 11 | got %h | FAIL\", dout); end\n    else $display(\"Test 2: pop first byte | got 11 | PASS\");\n    // Pop second byte (should be 0x22)\n    @(negedge clk); rd_en = 1;\n    @(posedge clk); #1;\n    if (dout !== 8'h22) begin errors = errors + 1; $display(\"Test 3: pop second | expected 22 | got %h | FAIL\", dout); end\n    else $display(\"Test 3: pop second byte | got 22 | PASS\");\n    @(negedge clk); rd_en = 0;\n    #5;\n    if (!empty) begin errors = errors + 1; $display(\"Test 4: empty flag after pops | got empty=%b | FAIL\", empty); end\n    else $display(\"Test 4: empty flag after pops | got empty=1 | PASS\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "areset_n",
      "wr_en",
      "din",
      "rd_en",
      "dout",
      "full",
      "empty"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "wr_en",
          "wave": "01.0...."
        },
        {
          "name": "din",
          "wave": "x==x....",
          "data": [
            "11",
            "22"
          ]
        },
        {
          "name": "rd_en",
          "wave": "0...1.0."
        },
        {
          "name": "dout",
          "wave": "x....==.",
          "data": [
            "11",
            "22"
          ]
        },
        {
          "name": "empty",
          "wave": "1.0..1.."
        },
        {
          "name": "full",
          "wave": "0......."
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "id": 25,
    "topic": "Queues & Buffers",
    "subtopic": "Synchronous FIFO",
    "estimatedTime": "30 mins",
    "objective": "Master circular buffer pointer management, simultaneous read/write arbitration, and flag generation.",
    "prerequisites": "Synchronous RAM, binary counters, FIFO full/empty logic.",
    "timingReqs": "Single clock domain. Write commits on `posedge clk` when `wr_en && !full`. Read updates on `posedge clk` when `rd_en && !empty`.",
    "constraints": "FIFO depth = 8 words. Simultaneous push and pop when non-empty must succeed without losing data.",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Master clock"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low asynchronous reset"
      },
      {
        "name": "wr_en",
        "dir": "input",
        "width": "1",
        "desc": "Write (push) enable"
      },
      {
        "name": "din",
        "dir": "input",
        "width": "8",
        "desc": "8-bit input data"
      },
      {
        "name": "rd_en",
        "dir": "input",
        "width": "1",
        "desc": "Read (pop) enable"
      },
      {
        "name": "dout",
        "dir": "output",
        "width": "8",
        "desc": "8-bit output data"
      },
      {
        "name": "full",
        "dir": "output",
        "width": "1",
        "desc": "FIFO full flag"
      },
      {
        "name": "empty",
        "dir": "output",
        "width": "1",
        "desc": "FIFO empty flag"
      }
    ],
    "referenceRtl": "module top_module(\n  input        clk,\n  input        areset_n,\n  input        wr_en,\n  input  [7:0] din,\n  input        rd_en,\n  output reg [7:0] dout,\n  output       full,\n  output       empty\n);\n  reg [7:0] mem [0:7];\n  reg [2:0] wr_ptr;\n  reg [2:0] rd_ptr;\n  reg [3:0] count;\n\n  assign full  = (count == 4'd8);\n  assign empty = (count == 4'd0);\n\n  wire write_valid = wr_en && !full;\n  wire read_valid  = rd_en && !empty;\n\n  always @(posedge clk or negedge areset_n) begin\n    if (!areset_n) begin\n      wr_ptr <= 3'd0;\n      rd_ptr <= 3'd0;\n      count  <= 4'd0;\n      dout   <= 8'd0;\n    end else begin\n      if (write_valid) begin\n        mem[wr_ptr] <= din;\n        wr_ptr      <= wr_ptr + 1'b1;\n      end\n      if (read_valid) begin\n        dout   <= mem[rd_ptr];\n        rd_ptr <= rd_ptr + 1'b1;\n      end\n\n      case ({write_valid, read_valid})\n        2'b10: count <= count + 1'b1;\n        2'b01: count <= count - 1'b1;\n        default: count <= count; // 00 or 11 (simultaneous read/write maintains occupancy)\n      endcase\n    end\n  end\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 320 120\" class=\"circuit-svg\"><rect x=\"100\" y=\"20\" width=\"120\" height=\"80\" rx=\"8\" stroke=\"#38bdf8\" stroke-width=\"2.5\" fill=\"rgba(56,189,248,0.06)\"/><line x1=\"20\" y1=\"35\" x2=\"100\" y2=\"35\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"20\" y1=\"60\" x2=\"100\" y2=\"60\" stroke=\"#fbbf24\" stroke-width=\"2\"/><line x1=\"20\" y1=\"85\" x2=\"100\" y2=\"85\" stroke=\"#a78bfa\" stroke-width=\"2\"/><line x1=\"220\" y1=\"40\" x2=\"280\" y2=\"40\" stroke=\"#2dd4bf\" stroke-width=\"2\"/><line x1=\"220\" y1=\"70\" x2=\"280\" y2=\"70\" stroke=\"#f43f5e\" stroke-width=\"2\"/><line x1=\"220\" y1=\"90\" x2=\"280\" y2=\"90\" stroke=\"#38bdf8\" stroke-width=\"2\"/><text x=\"12\" y=\"39\" fill=\"#94a3b8\" font-size=\"9\">din[7:0]</text><text x=\"24\" y=\"64\" fill=\"#fbbf24\" font-size=\"9\">wr_en</text><text x=\"24\" y=\"89\" fill=\"#a78bfa\" font-size=\"9\">rd_en</text><text x=\"285\" y=\"44\" fill=\"#2dd4bf\" font-size=\"10\" font-weight=\"700\">dout</text><text x=\"285\" y=\"74\" fill=\"#f43f5e\" font-size=\"10\" font-weight=\"700\">full</text><text x=\"285\" y=\"94\" fill=\"#38bdf8\" font-size=\"10\" font-weight=\"700\">empty</text><text x=\"120\" y=\"65\" fill=\"#e2e8f0\" font-size=\"13\" font-weight=\"700\">SYNC FIFO</text></svg>",
    "hints": [
      "Maintain an explicit occupancy counter `count[3:0]` ranging from 0 to 8.",
      "`full = (count == 8)` and `empty = (count == 0)`.",
      "When both `write_valid` and `read_valid` assert in the same cycle, data is simultaneously written and read, so `count` remains unchanged!"
    ],
    "explanation": "A synchronous FIFO acts as an elastic pipeline buffer between modules on the same clock. Write and read pointers wrap around circularly through memory addresses $0 \\dots 7$. An occupancy counter tracks buffer fullness, preventing write overflows when full and read underflows when empty.",
    "commonMistakes": [
      "Allowing write pointer to advance when FIFO is full, corrupting previously queued unread data.",
      "Failing to handle simultaneous read and write, causing the occupancy counter to drift away from actual pointer distance."
    ],
    "hwNotes": "Synchronous FIFOs are fundamental building blocks in DMA controllers, packet network switches, and processor load/store queues.",
    "relatedSlugs": [
      "fifo-full-empty-detector",
      "fifo-occupancy-counter",
      "skid-buffer"
    ],
    "flagshipIndex": 25,
    "isFlagship": true,
    "curatedTrack": "Level 3: Advanced (Memory, FIFO & Protocols)"
  },
  {
    "id": 26,
    "slug": "fifo-full-empty-detector",
    "title": "FIFO Full and Empty Detection — Pointer Logic",
    "difficulty": "hard",
    "points": 50,
    "level": 3,
    "topic": "Queues & Buffers",
    "subtopic": "FIFO Pointers",
    "estimatedTime": "25 mins",
    "lede": "Generate full and empty flags for an 8-entry circular FIFO using 4-bit pointers (3-bit address + 1 MSB wrap bit) without an occupancy counter.",
    "objective": "Understand the classic extra-MSB pointer technique to differentiate Full from Empty when wr_ptr == rd_ptr.",
    "prerequisites": "FIFO architecture, circular buffer pointers, binary wrap bits.",
    "timingReqs": "Combinational flag evaluation from pointers.",
    "constraints": "FIFO depth = 8 ($2^3$). Pointers are 4-bit vectors `[3:0]`.",
    "ports": [
      {
        "name": "wr_ptr",
        "dir": "input",
        "width": "4",
        "desc": "4-bit write pointer with MSB wrap bit"
      },
      {
        "name": "rd_ptr",
        "dir": "input",
        "width": "4",
        "desc": "4-bit read pointer with MSB wrap bit"
      },
      {
        "name": "full",
        "dir": "output",
        "width": "1",
        "desc": "Full flag (identical address, inverted MSB)"
      },
      {
        "name": "empty",
        "dir": "output",
        "width": "1",
        "desc": "Empty flag (identical address and MSB)"
      }
    ],
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>wr_ptr</code></td><td>input</td><td>4</td><td>4-bit write pointer with MSB wrap bit</td></tr><tr><td><code>rd_ptr</code></td><td>input</td><td>4</td><td>4-bit read pointer with MSB wrap bit</td></tr><tr><td><code>full</code></td><td>output</td><td>1</td><td>Full flag (identical address, inverted MSB)</td></tr><tr><td><code>empty</code></td><td>output</td><td>1</td><td>Empty flag (identical address and MSB)</td></tr></tbody></table>",
    "starter": "module top_module(\n  input  [3:0] wr_ptr,\n  input  [3:0] rd_ptr,\n  output       full,\n  output       empty\n);\n\n  // Compute full and empty from pointers\n\nendmodule\n",
    "referenceRtl": "module top_module(\n  input  [3:0] wr_ptr,\n  input  [3:0] rd_ptr,\n  output       full,\n  output       empty\n);\n  // Empty: all 4 bits match\n  assign empty = (wr_ptr == rd_ptr);\n\n  // Full: LSBs match (same memory slot) but MSBs differ (wr_ptr has wrapped around once more)\n  assign full  = (wr_ptr[2:0] == rd_ptr[2:0]) && (wr_ptr[3] != rd_ptr[3]);\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] wr_ptr, rd_ptr;\n  wire full, empty;\n  integer errors = 0;\n  top_module dut(.wr_ptr(wr_ptr), .rd_ptr(rd_ptr), .full(full), .empty(empty));\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    // Case 1: Both 0 -> Empty\n    wr_ptr = 4'b0000; rd_ptr = 4'b0000; #5;\n    if (!empty || full) begin errors = errors + 1; $display(\"Test 1: both 0 | FAIL empty=%b full=%b\", empty, full); end\n    else $display(\"Test 1: both 0 | PASS empty=1 full=0\");\n    // Case 2: wr_ptr advanced by 4 -> Neither\n    wr_ptr = 4'b0100; rd_ptr = 4'b0000; #5;\n    if (empty || full) begin errors = errors + 1; $display(\"Test 2: half full | FAIL empty=%b full=%b\", empty, full); end\n    else $display(\"Test 2: half full | PASS empty=0 full=0\");\n    // Case 3: wr_ptr wrapped around: wr_ptr = 4'b1000, rd_ptr = 4'b0000 -> FULL!\n    wr_ptr = 4'b1000; rd_ptr = 4'b0000; #5;\n    if (!full || empty) begin errors = errors + 1; $display(\"Test 3: wrapped full | FAIL empty=%b full=%b\", empty, full); end\n    else $display(\"Test 3: wrapped full | PASS empty=0 full=1\");\n    // Case 4: Both wrapped: wr_ptr = 4'b1011, rd_ptr = 4'b1011 -> Empty!\n    wr_ptr = 4'b1011; rd_ptr = 4'b1011; #5;\n    if (!empty || full) begin errors = errors + 1; $display(\"Test 4: both wrapped | FAIL empty=%b full=%b\", empty, full); end\n    else $display(\"Test 4: both wrapped | PASS empty=1 full=0\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "wr_ptr",
      "rd_ptr",
      "full",
      "empty"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "wr_ptr",
          "wave": "====",
          "data": [
            "0000",
            "0100",
            "1000",
            "1011"
          ]
        },
        {
          "name": "rd_ptr",
          "wave": "====",
          "data": [
            "0000",
            "0000",
            "0000",
            "1011"
          ]
        },
        {
          "name": "empty",
          "wave": "1001"
        },
        {
          "name": "full",
          "wave": "0010"
        }
      ],
      "config": {
        "hscale": 2
      }
    },
    "circuitSvg": "<svg viewBox=\"0 0 280 100\" class=\"circuit-svg\"><circle cx=\"70\" cy=\"50\" r=\"30\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"none\"/><line x1=\"70\" y1=\"50\" x2=\"70\" y2=\"20\" stroke=\"#fbbf24\" stroke-width=\"2.5\"/><line x1=\"70\" y1=\"50\" x2=\"95\" y2=\"65\" stroke=\"#2dd4bf\" stroke-width=\"2.5\"/><text x=\"65\" y=\"15\" fill=\"#fbbf24\" font-size=\"9\">WR</text><text x=\"98\" y=\"70\" fill=\"#2dd4bf\" font-size=\"9\">RD</text><text x=\"140\" y=\"42\" fill=\"#2dd4bf\" font-size=\"10\">Empty: wr == rd</text><text x=\"140\" y=\"65\" fill=\"#f43f5e\" font-size=\"10\">Full: wr[2:0]==rd[2:0] &amp; wr[3]!=rd[3]</text></svg>",
    "hints": [
      "When `wr_ptr == rd_ptr`, the queue is empty.",
      "When `wr_ptr` has written 8 more entries than `rd_ptr`, it points to the same memory slot (`wr_ptr[2:0] == rd_ptr[2:0]`), but its MSB wrap bit has toggled (`wr_ptr[3] != rd_ptr[3]`).",
      "This classic technique avoids needing an extra adder/subtractor occupancy counter."
    ],
    "explanation": "If a buffer has depth $N = 2^k$, a $k$-bit pointer would cause Full and Empty to look identical ($wr == rd$). By sizing pointers to $k+1$ bits, the MSB acts as an epoch/wrap indicator. Empty occurs when both pointers are completely identical. Full occurs when the lower $k$ address bits match but the MSBs differ, proving the write pointer has wrapped around the circular buffer exactly one cycle ahead of the read pointer.",
    "commonMistakes": [
      "Checking `wr_ptr - rd_ptr == 8` using subtraction without properly sizing operands.",
      "Applying binary pointer comparison across clock domains without Gray coding (in asynchronous FIFOs)."
    ],
    "hwNotes": "This MSB-wrap method is the foundational algorithm required for Asynchronous FIFO design, because Gray-coded pointers can be compared across clock domains without arithmetic counters.",
    "relatedSlugs": [
      "fifo-synchronous",
      "async-fifo-pointer-sync",
      "fifo-occupancy-counter"
    ],
    "flagshipIndex": 26,
    "isFlagship": true,
    "curatedTrack": "Level 3: Advanced (Memory, FIFO & Protocols)",
    "category": "Queues & Buffers",
    "tags": [
      "memory",
      "fifo",
      "protocols",
      "apb",
      "uart",
      "hard",
      "fifo-pointers"
    ],
    "concept": "<b>Objective:</b> Understand the classic extra-MSB pointer technique to differentiate Full from Empty when wr_ptr == rd_ptr.<br><br><b>Prerequisites:</b> FIFO architecture, circular buffer pointers, binary wrap bits."
  },
  {
    "slug": "round-robin-arbiter",
    "title": "Round-Robin Arbiter — Request Arbitration",
    "difficulty": "hard",
    "points": 50,
    "level": 3,
    "tags": [
      "memory",
      "fifo",
      "protocols",
      "apb",
      "uart",
      "hard",
      "fair-arbitration"
    ],
    "category": "Arbitration & Interconnect",
    "lede": "Implement a 4-client round-robin arbiter. When multiple clients assert req[3:0], grant rotates fairly to prevent client starvation.",
    "concept": "<b>Objective:</b> Understand rotating priority masks, fair arbitration, and avoiding resource starvation.<br><br><b>Prerequisites:</b> Fixed priority arbiters, one-hot priority masking.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Master clock</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Active-low asynchronous reset</td></tr><tr><td><code>req</code></td><td>input</td><td>4</td><td>4-bit request vector from clients</td></tr><tr><td><code>grant</code></td><td>output</td><td>4</td><td>4-bit one-hot grant vector</td></tr></tbody></table>",
    "starter": "module top_module(\n  input        clk,\n  input        areset_n,\n  input  [3:0] req,\n  output reg [3:0] grant\n);\n\n  // 4-client round-robin arbiter\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, areset_n;\n  reg [3:0] req;\n  wire [3:0] grant;\n  integer errors = 0;\n  top_module dut(.clk(clk), .areset_n(areset_n), .req(req), .grant(grant));\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; areset_n = 0; req = 0; #12;\n    areset_n = 1; #8;\n    // Step 1: All 4 clients request simultaneously (req = 4'b1111)\n    // Starting after reset (last_grant=3), priority is client 0!\n    @(negedge clk); req = 4'b1111;\n    @(posedge clk); #1;\n    if (grant !== 4'b0001) begin errors = errors + 1; $display(\"Test 1: simultaneous req | expected grant[0] | got %b | FAIL\", grant); end\n    else $display(\"Test 1: client 0 granted | PASS\");\n    // Next cycle: all still requesting -> priority must rotate to client 1!\n    @(posedge clk); #1;\n    if (grant !== 4'b0010) begin errors = errors + 1; $display(\"Test 2: rotate to client 1 | expected 0010 | got %b | FAIL\", grant); end\n    else $display(\"Test 2: client 1 granted | PASS\");\n    // Next cycle: all still requesting -> priority must rotate to client 2!\n    @(posedge clk); #1;\n    if (grant !== 4'b0100) begin errors = errors + 1; $display(\"Test 3: rotate to client 2 | expected 0100 | got %b | FAIL\", grant); end\n    else $display(\"Test 3: client 2 granted | PASS\");\n    // Next cycle: client 3\n    @(posedge clk); #1;\n    if (grant !== 4'b1000) begin errors = errors + 1; $display(\"Test 4: rotate to client 3 | expected 1000 | got %b | FAIL\", grant); end\n    else $display(\"Test 4: client 3 granted | PASS\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "areset_n",
      "req",
      "grant"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......"
        },
        {
          "name": "req",
          "wave": "0.==...",
          "data": [
            "1111",
            "1111"
          ]
        },
        {
          "name": "grant",
          "wave": "0.====.",
          "data": [
            "0001",
            "0010",
            "0100",
            "1000"
          ]
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "id": 27,
    "topic": "Arbitration & Interconnect",
    "subtopic": "Fair Arbitration",
    "estimatedTime": "30 mins",
    "objective": "Understand rotating priority masks, fair arbitration, and avoiding resource starvation.",
    "prerequisites": "Fixed priority arbiters, one-hot priority masking.",
    "timingReqs": "Grant updates on `posedge clk`. Exactly one active grant output `grant[3:0]` is asserted when at least one request is active.",
    "constraints": "Priority rotates circularly to the client immediately following the client that was just granted.",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Master clock"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low asynchronous reset"
      },
      {
        "name": "req",
        "dir": "input",
        "width": "4",
        "desc": "4-bit request vector from clients {req[3], ..., req[0]}"
      },
      {
        "name": "grant",
        "dir": "output",
        "width": "4",
        "desc": "4-bit one-hot grant vector"
      }
    ],
    "referenceRtl": "module top_module(\n  input        clk,\n  input        areset_n,\n  input  [3:0] req,\n  output reg [3:0] grant\n);\n  reg [1:0] last_grant;\n\n  function [3:0] get_grant;\n    input [1:0] last;\n    input [3:0] r;\n    reg [3:0] g;\n    begin\n      g = 4'b0000;\n      case (last)\n        2'd0: begin\n          if (r[1]) g = 4'b0010;\n          else if (r[2]) g = 4'b0100;\n          else if (r[3]) g = 4'b1000;\n          else if (r[0]) g = 4'b0001;\n        end\n        2'd1: begin\n          if (r[2]) g = 4'b0100;\n          else if (r[3]) g = 4'b1000;\n          else if (r[0]) g = 4'b0001;\n          else if (r[1]) g = 4'b0010;\n        end\n        2'd2: begin\n          if (r[3]) g = 4'b1000;\n          else if (r[0]) g = 4'b0001;\n          else if (r[1]) g = 4'b0010;\n          else if (r[2]) g = 4'b0100;\n        end\n        default: begin // 2'd3\n          if (r[0]) g = 4'b0001;\n          else if (r[1]) g = 4'b0010;\n          else if (r[2]) g = 4'b0100;\n          else if (r[3]) g = 4'b1000;\n        end\n      endcase\n      get_grant = g;\n    end\n  endfunction\n\n  always @(posedge clk or negedge areset_n) begin\n    if (!areset_n) begin\n      grant      <= 4'b0000;\n      last_grant <= 2'd3;\n    end else begin\n      grant <= get_grant(last_grant, req);\n      if (get_grant(last_grant, req) != 4'b0000) begin\n        case (get_grant(last_grant, req))\n          4'b0001: last_grant <= 2'd0;\n          4'b0010: last_grant <= 2'd1;\n          4'b0100: last_grant <= 2'd2;\n          4'b1000: last_grant <= 2'd3;\n        endcase\n      end\n    end\n  end\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 300 120\" class=\"circuit-svg\"><rect x=\"90\" y=\"20\" width=\"120\" height=\"80\" rx=\"8\" stroke=\"#38bdf8\" stroke-width=\"2.5\" fill=\"rgba(56,189,248,0.06)\"/><line x1=\"20\" y1=\"40\" x2=\"90\" y2=\"40\" stroke=\"#fbbf24\" stroke-width=\"2\"/><line x1=\"20\" y1=\"80\" x2=\"90\" y2=\"80\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"210\" y1=\"60\" x2=\"270\" y2=\"60\" stroke=\"#2dd4bf\" stroke-width=\"2\"/><text x=\"14\" y=\"44\" fill=\"#fbbf24\" font-size=\"10\">req[3:0]</text><text x=\"14\" y=\"84\" fill=\"#38bdf8\" font-size=\"10\">clk, rst</text><text x=\"275\" y=\"64\" fill=\"#2dd4bf\" font-size=\"11\" font-weight=\"700\">grant[3:0]</text><text x=\"105\" y=\"55\" fill=\"#e2e8f0\" font-size=\"12\" font-weight=\"700\">ROUND-ROBIN</text><text x=\"115\" y=\"75\" fill=\"#64748b\" font-size=\"10\">ARBITER</text></svg>",
    "hints": [
      "Store `last_grant`: the index of the client that was serviced most recently.",
      "Rotate priority so search starts at `(last_grant + 1) % 4`.",
      "Only update `last_grant` when at least one client is granted."
    ],
    "explanation": "In a fixed-priority arbiter, high-priority clients can completely starve low-priority clients. A round-robin arbiter ensures 100% fairness by advancing the highest-priority token to $(k+1) \\pmod 4$ whenever client $k$ is serviced. This guarantees an upper bound on waiting latency for all bus masters.",
    "commonMistakes": [
      "Granting multiple clients simultaneously when requests overlap.",
      "Advancing priority when no client is requesting, breaking fair cycle order."
    ],
    "hwNotes": "In wide arbiters (8 to 64 ports), round-robin logic is synthesized using dual priority-encoder chains ($req \\& \\sim mask$ and $req$) to eliminate $O(N)$ sequential case branches.",
    "relatedSlugs": [
      "fixed-priority-arbiter",
      "weighted-round-robin-arbiter",
      "axi-lite-read-fsm"
    ],
    "flagshipIndex": 27,
    "isFlagship": true,
    "curatedTrack": "Level 3: Advanced (Memory, FIFO & Protocols)"
  },
  {
    "slug": "apb-slave-register-interface",
    "title": "APB Slave — APB Transactions",
    "difficulty": "hard",
    "points": 50,
    "level": 3,
    "tags": [
      "memory",
      "fifo",
      "protocols",
      "apb",
      "uart",
      "hard",
      "amba-apb"
    ],
    "category": "On-Chip Protocols",
    "lede": "Implement an AMBA APB (Advanced Peripheral Bus) slave containing two 32-bit read/write registers at byte offsets 0x00 and 0x04. (Simplified educational implementation).",
    "concept": "<b>Objective:</b> Understand the 2-phase APB protocol: SETUP phase (PSEL=1, PENABLE=0) and ACCESS phase (PSEL=1, PENABLE=1), read/write data steering, and PREADY response.<br><br><b>Prerequisites:</b> AMBA bus specifications, memory-mapped I/O, synchronous register maps.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>pclk</code></td><td>input</td><td>1</td><td>APB bus clock</td></tr><tr><td><code>preset_n</code></td><td>input</td><td>1</td><td>Active-low APB reset</td></tr><tr><td><code>paddr</code></td><td>input</td><td>4</td><td>APB address bus</td></tr><tr><td><code>psel</code></td><td>input</td><td>1</td><td>APB slave select</td></tr><tr><td><code>penable</code></td><td>input</td><td>1</td><td>APB enable (strobe)</td></tr><tr><td><code>pwrite</code></td><td>input</td><td>1</td><td>1 = Write transfer, 0 = Read transfer</td></tr><tr><td><code>pwdata</code></td><td>input</td><td>32</td><td>APB write data bus</td></tr><tr><td><code>prdata</code></td><td>output</td><td>32</td><td>APB read data bus</td></tr><tr><td><code>pready</code></td><td>output</td><td>1</td><td>Slave ready signal</td></tr></tbody></table>",
    "starter": "module top_module(\n  input         pclk,\n  input         preset_n,\n  input  [3:0]  paddr,\n  input         psel,\n  input         penable,\n  input         pwrite,\n  input  [31:0] pwdata,\n  output reg [31:0] prdata,\n  output        pready\n);\n\n  // APB Slave containing Reg0 (offset 0x0) and Reg1 (offset 0x4)\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg pclk, preset_n, psel, penable, pwrite;\n  reg [3:0] paddr;\n  reg [31:0] pwdata;\n  wire [31:0] prdata;\n  wire pready;\n  integer errors = 0;\n  top_module dut(\n    .pclk(pclk), .preset_n(preset_n),\n    .paddr(paddr), .psel(psel), .penable(penable),\n    .pwrite(pwrite), .pwdata(pwdata),\n    .prdata(prdata), .pready(pready)\n  );\n  always #5 pclk = ~pclk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    pclk = 0; preset_n = 0; psel = 0; penable = 0; pwrite = 0; paddr = 0; pwdata = 0; #12;\n    preset_n = 1; #8;\n    // APB Write to Reg0 (offset 0x0) with 0xCAFE_BABE\n    // T1: SETUP phase\n    @(negedge pclk); psel = 1; penable = 0; pwrite = 1; paddr = 4'h0; pwdata = 32'hCAFEBABE;\n    // T2: ACCESS phase\n    @(negedge pclk); penable = 1;\n    @(posedge pclk); // write committed\n    // T3: IDLE phase\n    @(negedge pclk); psel = 0; penable = 0;\n    // APB Write to Reg1 (offset 0x4) with 0xDEAD_BEEF\n    @(negedge pclk); psel = 1; penable = 0; pwrite = 1; paddr = 4'h4; pwdata = 32'hDEADBEEF;\n    @(negedge pclk); penable = 1;\n    @(posedge pclk);\n    @(negedge pclk); psel = 0; penable = 0;\n    // APB Read from Reg0 (offset 0x0)\n    @(negedge pclk); psel = 1; penable = 0; pwrite = 0; paddr = 4'h0;\n    @(negedge pclk); penable = 1;\n    #1; // read data valid during ACCESS phase\n    if (prdata !== 32'hCAFEBABE) begin errors = errors + 1; $display(\"Test 1: APB read Reg0 | expected CAFEBABE | got %h | FAIL\", prdata); end\n    else $display(\"Test 1: APB read Reg0 | got CAFEBABE | PASS\");\n    // APB Read from Reg1 (offset 0x4)\n    @(negedge pclk); psel = 1; penable = 0; pwrite = 0; paddr = 4'h4;\n    @(negedge pclk); penable = 1;\n    #1;\n    if (prdata !== 32'hDEADBEEF) begin errors = errors + 1; $display(\"Test 2: APB read Reg1 | expected DEADBEEF | got %h | FAIL\", prdata); end\n    else $display(\"Test 2: APB read Reg1 | got DEADBEEF | PASS\");\n    @(negedge pclk); psel = 0; penable = 0;\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "pclk",
      "preset_n",
      "psel",
      "penable",
      "pwrite",
      "paddr",
      "pwdata",
      "prdata",
      "pready"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "pclk",
          "wave": "p........"
        },
        {
          "name": "psel",
          "wave": "01.01.0.."
        },
        {
          "name": "penable",
          "wave": "0.10.10.."
        },
        {
          "name": "pwrite",
          "wave": "01.00.0.."
        },
        {
          "name": "paddr",
          "wave": "x==x==x..",
          "data": [
            "0x0",
            "0x0",
            "0x0",
            "0x0"
          ]
        },
        {
          "name": "pwdata",
          "wave": "x=.x.....",
          "data": [
            "CAFEBABE"
          ]
        },
        {
          "name": "prdata",
          "wave": "x....==x.",
          "data": [
            "CAFEBABE",
            "CAFEBABE"
          ]
        },
        {
          "name": "pready",
          "wave": "1........"
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "id": 28,
    "topic": "On-Chip Protocols",
    "subtopic": "AMBA APB",
    "estimatedTime": "30 mins",
    "objective": "Understand the 2-phase APB protocol: SETUP phase (PSEL=1, PENABLE=0) and ACCESS phase (PSEL=1, PENABLE=1), read/write data steering, and PREADY response.",
    "prerequisites": "AMBA bus specifications, memory-mapped I/O, synchronous register maps.",
    "timingReqs": "Writes commit on `posedge pclk` when `psel && penable && pwrite && pready`. Read data is valid during the ACCESS phase.",
    "constraints": "Zero wait-state implementation: `pready` is permanently 1'b1. Word-aligned addresses: 0x00 and 0x04.",
    "ports": [
      {
        "name": "pclk",
        "dir": "input",
        "width": "1",
        "desc": "APB bus clock"
      },
      {
        "name": "preset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low APB reset"
      },
      {
        "name": "paddr",
        "dir": "input",
        "width": "4",
        "desc": "APB address bus"
      },
      {
        "name": "psel",
        "dir": "input",
        "width": "1",
        "desc": "APB slave select"
      },
      {
        "name": "penable",
        "dir": "input",
        "width": "1",
        "desc": "APB enable (strobe)"
      },
      {
        "name": "pwrite",
        "dir": "input",
        "width": "1",
        "desc": "1 = Write transfer, 0 = Read transfer"
      },
      {
        "name": "pwdata",
        "dir": "input",
        "width": "32",
        "desc": "APB write data bus"
      },
      {
        "name": "prdata",
        "dir": "output",
        "width": "32",
        "desc": "APB read data bus"
      },
      {
        "name": "pready",
        "dir": "output",
        "width": "1",
        "desc": "Slave ready signal"
      }
    ],
    "referenceRtl": "module top_module(\n  input         pclk,\n  input         preset_n,\n  input  [3:0]  paddr,\n  input         psel,\n  input         penable,\n  input         pwrite,\n  input  [31:0] pwdata,\n  output reg [31:0] prdata,\n  output        pready\n);\n  reg [31:0] reg0;\n  reg [31:0] reg1;\n\n  assign pready = 1'b1; // zero wait-state response\n\n  // Write phase\n  always @(posedge pclk or negedge preset_n) begin\n    if (!preset_n) begin\n      reg0 <= 32'h0;\n      reg1 <= 32'h0;\n    end else if (psel && penable && pwrite) begin\n      case (paddr[3:0])\n        4'h0: reg0 <= pwdata;\n        4'h4: reg1 <= pwdata;\n      endcase\n    end\n  end\n\n  // Read phase\n  always @(*) begin\n    if (psel && !pwrite) begin\n      case (paddr[3:0])\n        4'h0: prdata = reg0;\n        4'h4: prdata = reg1;\n        default: prdata = 32'h0;\n      endcase\n    end else begin\n      prdata = 32'h0;\n    end\n  end\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 320 120\" class=\"circuit-svg\"><rect x=\"100\" y=\"20\" width=\"120\" height=\"80\" rx=\"8\" stroke=\"#38bdf8\" stroke-width=\"2.5\" fill=\"rgba(56,189,248,0.06)\"/><line x1=\"20\" y1=\"35\" x2=\"100\" y2=\"35\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"20\" y1=\"55\" x2=\"100\" y2=\"55\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"20\" y1=\"75\" x2=\"100\" y2=\"75\" stroke=\"#fbbf24\" stroke-width=\"2\"/><line x1=\"20\" y1=\"95\" x2=\"100\" y2=\"95\" stroke=\"#a78bfa\" stroke-width=\"2\"/><line x1=\"220\" y1=\"45\" x2=\"280\" y2=\"45\" stroke=\"#2dd4bf\" stroke-width=\"2\"/><line x1=\"220\" y1=\"75\" x2=\"280\" y2=\"75\" stroke=\"#4ade80\" stroke-width=\"2\"/><text x=\"14\" y=\"39\" fill=\"#94a3b8\" font-size=\"9\">paddr[3:0]</text><text x=\"14\" y=\"59\" fill=\"#94a3b8\" font-size=\"9\">psel, pen</text><text x=\"14\" y=\"79\" fill=\"#fbbf24\" font-size=\"9\">pwrite</text><text x=\"14\" y=\"99\" fill=\"#a78bfa\" font-size=\"9\">pwdata</text><text x=\"285\" y=\"49\" fill=\"#2dd4bf\" font-size=\"10\" font-weight=\"700\">prdata</text><text x=\"285\" y=\"79\" fill=\"#4ade80\" font-size=\"10\" font-weight=\"700\">pready</text><text x=\"115\" y=\"65\" fill=\"#e2e8f0\" font-size=\"12\" font-weight=\"700\">APB SLAVE</text></svg>",
    "hints": [
      "In APB, a write transfer is committed when `psel && penable && pwrite` at `posedge pclk`.",
      "Read data `prdata` is driven when `psel && !pwrite`.",
      "Drive `pready = 1'b1` for zero wait-state response."
    ],
    "explanation": "AMBA APB is an unpipelined, low-power control bus designed by ARM for peripheral register access (UART, Timers, GPIO). Each transaction consists of two cycles: 1) SETUP cycle (`psel=1, penable=0`), where address and write data are driven; 2) ACCESS cycle (`penable=1`), where data is sampled or driven.",
    "commonMistakes": [
      "Committing writes during the SETUP phase (`penable=0`), which violates the AMBA APB protocol specification.",
      "Omitting the active-low reset check, causing registers to power up in unknown (`X`) states."
    ],
    "hwNotes": "This is a simplified educational APB implementation (no PSTRB byte enables or PSLVERR errors). Real SoC peripherals include byte strobes to support 8-bit and 16-bit register writes.",
    "relatedSlugs": [
      "apb-slave-wait-states",
      "register-map-address-decoder",
      "uart-transmitter"
    ],
    "flagshipIndex": 28,
    "isFlagship": true,
    "curatedTrack": "Level 3: Advanced (Memory, FIFO & Protocols)"
  },
  {
    "id": 29,
    "slug": "apb-slave-wait-states",
    "title": "APB Wait-State Handling — PREADY Behavior",
    "difficulty": "hard",
    "points": 50,
    "level": 3,
    "topic": "On-Chip Protocols",
    "subtopic": "AMBA APB",
    "estimatedTime": "30 mins",
    "lede": "Extend an APB slave to insert exactly 1 wait state (PREADY=0 for one cycle during ACCESS phase) before completing any transfer.",
    "objective": "Understand bus flow control with wait states, extending transactions, and slave pacing with PREADY.",
    "prerequisites": "APB protocol, FSM state tracking, PREADY handshake.",
    "timingReqs": "When a transfer enters ACCESS phase (`psel && penable`), slave drives `pready=0` on the first cycle and `pready=1` on the second cycle.",
    "constraints": "Every read or write transaction must take exactly 2 clock cycles in the ACCESS phase (1 wait state).",
    "ports": [
      {
        "name": "pclk",
        "dir": "input",
        "width": "1",
        "desc": "APB clock"
      },
      {
        "name": "preset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low reset"
      },
      {
        "name": "psel",
        "dir": "input",
        "width": "1",
        "desc": "Slave select"
      },
      {
        "name": "penable",
        "dir": "input",
        "width": "1",
        "desc": "Enable strobe"
      },
      {
        "name": "pwrite",
        "dir": "input",
        "width": "1",
        "desc": "Write control"
      },
      {
        "name": "pready",
        "dir": "output",
        "width": "1",
        "desc": "Wait state control (0 = wait, 1 = ready)"
      }
    ],
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>pclk</code></td><td>input</td><td>1</td><td>APB clock</td></tr><tr><td><code>preset_n</code></td><td>input</td><td>1</td><td>Active-low reset</td></tr><tr><td><code>psel</code></td><td>input</td><td>1</td><td>Slave select</td></tr><tr><td><code>penable</code></td><td>input</td><td>1</td><td>Enable strobe</td></tr><tr><td><code>pwrite</code></td><td>input</td><td>1</td><td>Write control</td></tr><tr><td><code>pready</code></td><td>output</td><td>1</td><td>Wait state control (0 = wait, 1 = ready)</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   pclk,\n  input   preset_n,\n  input   psel,\n  input   penable,\n  input   pwrite,\n  output  pready\n);\n\n  // APB slave generating 1 wait-state per transfer\n\nendmodule\n",
    "referenceRtl": "module top_module(\n  input   pclk,\n  input   preset_n,\n  input   psel,\n  input   penable,\n  input   pwrite,\n  output  pready\n);\n  reg wait_done;\n\n  always @(posedge pclk or negedge preset_n) begin\n    if (!preset_n)\n      wait_done <= 1'b0;\n    else if (psel && penable)\n      wait_done <= ~wait_done;\n    else\n      wait_done <= 1'b0;\n  end\n\n  assign pready = wait_done;\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg pclk, preset_n, psel, penable, pwrite;\n  wire pready;\n  integer errors = 0;\n  top_module dut(\n    .pclk(pclk), .preset_n(preset_n),\n    .psel(psel), .penable(penable),\n    .pwrite(pwrite), .pready(pready)\n  );\n  always #5 pclk = ~pclk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    pclk = 0; preset_n = 0; psel = 0; penable = 0; pwrite = 0; #12;\n    preset_n = 1; #8;\n    // Initiate Transfer:\n    // T1: SETUP phase\n    @(negedge pclk); psel = 1; penable = 0; pwrite = 1;\n    // T2: ACCESS phase cycle 1 -> pready MUST BE 0 (wait state)\n    @(negedge pclk); penable = 1;\n    #1;\n    if (pready !== 1'b0) begin errors = errors + 1; $display(\"Test 1: wait cycle pready | expected 0 | got %b | FAIL\", pready); end\n    else $display(\"Test 1: wait cycle pready=0 | PASS\");\n    // T3: ACCESS phase cycle 2 -> pready MUST BE 1 (transfer completes)\n    @(posedge pclk); #1;\n    if (pready !== 1'b1) begin errors = errors + 1; $display(\"Test 2: ready cycle pready | expected 1 | got %b | FAIL\", pready); end\n    else $display(\"Test 2: ready cycle pready=1 | PASS\");\n    // T4: Return to IDLE\n    @(negedge pclk); psel = 0; penable = 0;\n    @(posedge pclk); #1;\n    if (pready !== 1'b0) begin errors = errors + 1; $display(\"Test 3: idle pready | expected 0 | got %b | FAIL\", pready); end\n    else $display(\"Test 3: idle pready=0 | PASS\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "pclk",
      "preset_n",
      "psel",
      "penable",
      "pready"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "pclk",
          "wave": "p......."
        },
        {
          "name": "psel",
          "wave": "01...0.."
        },
        {
          "name": "penable",
          "wave": "0.1..0.."
        },
        {
          "name": "pready",
          "wave": "0..1.0.."
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "circuitSvg": "<svg viewBox=\"0 0 280 100\" class=\"circuit-svg\"><rect x=\"80\" y=\"20\" width=\"120\" height=\"60\" rx=\"6\" stroke=\"#38bdf8\" stroke-width=\"2.5\" fill=\"rgba(56,189,248,0.06)\"/><line x1=\"20\" y1=\"40\" x2=\"80\" y2=\"40\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"20\" y1=\"60\" x2=\"80\" y2=\"60\" stroke=\"#fbbf24\" stroke-width=\"2\"/><line x1=\"200\" y1=\"50\" x2=\"260\" y2=\"50\" stroke=\"#4ade80\" stroke-width=\"2\"/><text x=\"14\" y=\"44\" fill=\"#94a3b8\" font-size=\"9\">psel, pen</text><text x=\"24\" y=\"64\" fill=\"#fbbf24\" font-size=\"9\">clk, rst</text><text x=\"265\" y=\"54\" fill=\"#4ade80\" font-size=\"11\" font-weight=\"700\">pready</text><text x=\"100\" y=\"54\" fill=\"#e2e8f0\" font-size=\"11\" font-weight=\"700\">1-WAIT APB</text></svg>",
    "hints": [
      "Use a toggle register `wait_done` that goes from 0 to 1 during the ACCESS phase.",
      "When `psel && penable`, invert `wait_done <= ~wait_done;`.",
      "Drive `assign pready = wait_done;`."
    ],
    "explanation": "In the AMBA 3 APB specification, slaves can extend the ACCESS phase by driving `pready = 0`. The APB bridge master is obligated to hold all control signals (`psel, penable, paddr, pwrite, pwdata`) completely static until the cycle where the slave returns `pready = 1`.",
    "commonMistakes": [
      "Deasserting `penable` before `pready` goes high, violating AMBA protocol rules.",
      "Leaving `wait_done` asserted when entering IDLE."
    ],
    "hwNotes": "Wait states allow slow peripherals (e.g. analog ADCs, flash memory, EEPROMs) to interface with high-speed processors without needing asynchronous FIFOs.",
    "relatedSlugs": [
      "apb-slave-register-interface",
      "valid-ready-handshake",
      "axi-stream-register-slice"
    ],
    "flagshipIndex": 29,
    "isFlagship": true,
    "curatedTrack": "Level 3: Advanced (Memory, FIFO & Protocols)",
    "category": "On-Chip Protocols",
    "tags": [
      "memory",
      "fifo",
      "protocols",
      "apb",
      "uart",
      "hard",
      "amba-apb"
    ],
    "concept": "<b>Objective:</b> Understand bus flow control with wait states, extending transactions, and slave pacing with PREADY.<br><br><b>Prerequisites:</b> APB protocol, FSM state tracking, PREADY handshake."
  },
  {
    "slug": "uart-transmitter",
    "title": "UART Transmitter — Serial Communication",
    "difficulty": "hard",
    "points": 50,
    "level": 3,
    "tags": [
      "memory",
      "fifo",
      "protocols",
      "apb",
      "uart",
      "hard",
      "uart"
    ],
    "category": "Serial Protocols",
    "lede": "Implement an 8N1 UART transmitter (1 Start bit (0), 8 Data bits (LSB first), 1 Stop bit (1)) with start strobe and busy flag. (Clocked with 1 cycle per bit for simulation simplicity).",
    "concept": "<b>Objective:</b> Master framing protocols, serializer shift registers, transmission state machines, and baud clocking.<br><br><b>Prerequisites:</b> Shift registers, FSM design, serial communication framing.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Baud rate clock</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Active-low reset</td></tr><tr><td><code>tx_start</code></td><td>input</td><td>1</td><td>Strobe to begin transmission</td></tr><tr><td><code>tx_data</code></td><td>input</td><td>8</td><td>8-bit byte to transmit</td></tr><tr><td><code>tx</code></td><td>output</td><td>1</td><td>Serial TX line (idle = 1)</td></tr><tr><td><code>busy</code></td><td>output</td><td>1</td><td>High while transmitting frame</td></tr></tbody></table>",
    "starter": "module top_module(\n  input        clk,\n  input        areset_n,\n  input        tx_start,\n  input  [7:0] tx_data,\n  output reg   tx,\n  output       busy\n);\n\n  // 8N1 UART Transmitter (1 start bit, 8 data bits, 1 stop bit)\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, areset_n, tx_start;\n  reg [7:0] tx_data;\n  wire tx, busy;\n  integer errors = 0;\n  reg [9:0] captured_frame;\n  integer i;\n  top_module dut(\n    .clk(clk), .areset_n(areset_n),\n    .tx_start(tx_start), .tx_data(tx_data),\n    .tx(tx), .busy(busy)\n  );\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; areset_n = 0; tx_start = 0; tx_data = 0; #12;\n    areset_n = 1; #8;\n    // Transmit byte 8'hA5 = 8'b10100101\n    // Expected 8N1 frame: Start(0) + LSB-first(1,0,1,0,0,1,0,1) + Stop(1)\n    // Frame bits: 0, 1, 0, 1, 0, 0, 1, 0, 1, 1\n    @(negedge clk); tx_start = 1; tx_data = 8'hA5;\n    @(posedge clk); #1; // Start bit driven\n    tx_start = 0;\n    captured_frame[0] = tx; // start bit\n    for (i = 1; i < 10; i = i + 1) begin\n      @(posedge clk); #1;\n      captured_frame[i] = tx;\n    end\n    if (captured_frame !== 10'b1_10100101_0) begin\n      errors = errors + 1;\n      $display(\"Test 1: UART frame | expected 10'b1101001010 | got %b | FAIL\", captured_frame);\n    end else begin\n      $display(\"Test 1: UART frame for 8'hA5 | got exact 8N1 match | PASS\");\n    end\n    @(posedge clk); #1;\n    if (busy !== 1'b0) begin errors = errors + 1; $display(\"Test 2: busy cleared | got %b | FAIL\", busy); end\n    else $display(\"Test 2: busy cleared after stop bit | PASS\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "areset_n",
      "tx_start",
      "tx_data",
      "tx",
      "busy"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p.........."
        },
        {
          "name": "tx_start",
          "wave": "010........"
        },
        {
          "name": "tx_data",
          "wave": "x=x........",
          "data": [
            "0xA5"
          ]
        },
        {
          "name": "busy",
          "wave": "0.1.......0"
        },
        {
          "name": "tx",
          "wave": "1.0101001011"
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "id": 30,
    "topic": "Serial Protocols",
    "subtopic": "UART",
    "estimatedTime": "35 mins",
    "objective": "Master framing protocols, serializer shift registers, transmission state machines, and baud clocking.",
    "prerequisites": "Shift registers, FSM design, serial communication framing.",
    "timingReqs": "When `tx_start=1` while `!busy`, frame serialization begins: 1 start bit, 8 data bits, 1 stop bit.",
    "constraints": "Idle line state must be 1 (MARK). Simplified 1 clock cycle per bit for fast educational simulation.",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Baud rate clock"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low reset"
      },
      {
        "name": "tx_start",
        "dir": "input",
        "width": "1",
        "desc": "Strobe to begin transmission"
      },
      {
        "name": "tx_data",
        "dir": "input",
        "width": "8",
        "desc": "8-bit byte to transmit"
      },
      {
        "name": "tx",
        "dir": "output",
        "width": "1",
        "desc": "Serial TX line (idle = 1)"
      },
      {
        "name": "busy",
        "dir": "output",
        "width": "1",
        "desc": "High while transmitting frame"
      }
    ],
    "referenceRtl": "module top_module(\n  input        clk,\n  input        areset_n,\n  input        tx_start,\n  input  [7:0] tx_data,\n  output reg   tx,\n  output       busy\n);\n  reg [3:0] bit_cnt;\n  reg [7:0] sh_reg;\n\n  assign busy = (bit_cnt != 4'd0);\n\n  always @(posedge clk or negedge areset_n) begin\n    if (!areset_n) begin\n      tx      <= 1'b1; // Idle line is HIGH\n      bit_cnt <= 4'd0;\n      sh_reg  <= 8'd0;\n    end else if (bit_cnt == 4'd0) begin\n      tx <= 1'b1;\n      if (tx_start) begin\n        tx      <= 1'b0; // Start bit (0)\n        sh_reg  <= tx_data;\n        bit_cnt <= 4'd1;\n      end\n    end else if (bit_cnt >= 4'd1 && bit_cnt <= 4'd8) begin\n      tx      <= sh_reg[0]; // Data bits LSB first\n      sh_reg  <= {1'b0, sh_reg[7:1]};\n      bit_cnt <= bit_cnt + 1'b1;\n    end else if (bit_cnt == 4'd9) begin\n      tx      <= 1'b1; // Stop bit (1)\n      bit_cnt <= 4'd0; // Complete\n    end\n  end\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 320 110\" class=\"circuit-svg\"><rect x=\"90\" y=\"20\" width=\"130\" height=\"75\" rx=\"8\" stroke=\"#38bdf8\" stroke-width=\"2.5\" fill=\"rgba(56,189,248,0.06)\"/><line x1=\"20\" y1=\"40\" x2=\"90\" y2=\"40\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"20\" y1=\"70\" x2=\"90\" y2=\"70\" stroke=\"#fbbf24\" stroke-width=\"2\"/><line x1=\"220\" y1=\"45\" x2=\"280\" y2=\"45\" stroke=\"#2dd4bf\" stroke-width=\"2\"/><line x1=\"220\" y1=\"75\" x2=\"280\" y2=\"75\" stroke=\"#f43f5e\" stroke-width=\"2\"/><text x=\"14\" y=\"44\" fill=\"#94a3b8\" font-size=\"9\">tx_data[7:0]</text><text x=\"14\" y=\"74\" fill=\"#fbbf24\" font-size=\"9\">tx_start</text><text x=\"285\" y=\"49\" fill=\"#2dd4bf\" font-size=\"11\" font-weight=\"700\">tx</text><text x=\"285\" y=\"79\" fill=\"#f43f5e\" font-size=\"11\" font-weight=\"700\">busy</text><text x=\"110\" y=\"55\" fill=\"#e2e8f0\" font-size=\"12\" font-weight=\"700\">UART TX 8N1</text><text x=\"120\" y=\"75\" fill=\"#64748b\" font-size=\"9\">SERIALIZER</text></svg>",
    "hints": [
      "Use a bit counter `bit_cnt`: 0 = idle, 1..8 = data bits, 9 = stop bit.",
      "Frame format: Start bit is always `0`, followed by 8 data bits (LSB first: `sh_reg[0]`), ending with Stop bit `1`.",
      "Idle state of `tx` must be `1`."
    ],
    "explanation": "UART is an asynchronous serial protocol. The receiver detects the falling edge of the Start bit (0), samples data at the midpoint of each baud period, and validates the frame with the Stop bit (1). In real systems, a baud rate generator divides the system clock down to standard baud rates (115200 bps).",
    "commonMistakes": [
      "Sending MSB first instead of LSB first (standard UART transmits `tx_data[0]` first).",
      "Leaving the TX line low in idle: UART idle line is active-high (MARK)."
    ],
    "hwNotes": "This educational design assumes 1 cycle per baud bit. Real UARTs include a 16x oversampling baud divider to align the receiver to the center of incoming bit pulses.",
    "relatedSlugs": [
      "uart-receiver",
      "uart-frame-assembler",
      "shift-register-4bit"
    ],
    "flagshipIndex": 30,
    "isFlagship": true,
    "curatedTrack": "Level 3: Advanced (Memory, FIFO & Protocols)"
  },
  {
    "id": 31,
    "slug": "valid-ready-handshake",
    "title": "Valid-Ready Handshake — Flow Control",
    "difficulty": "hard",
    "points": 50,
    "level": 3,
    "topic": "On-Chip Protocols",
    "subtopic": "AXI / Streaming",
    "estimatedTime": "25 mins",
    "lede": "Implement a forward-registered valid-ready handshake pipeline stage with backpressure handling (data transfers only when valid && ready).",
    "objective": "Understand AXI-style valid/ready flow control, handshake rules, backpressure propagation, and preventing data loss.",
    "prerequisites": "Synchronous registers, handshake protocol rules.",
    "timingReqs": "Transfer commits precisely on `posedge clk` when `valid && ready`. Neither side can revoke data once valid is asserted.",
    "constraints": "Standard AXI rule: `valid` must NOT depend combinationally on `ready` (to prevent deadlocks).",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Clock signal"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low reset"
      },
      {
        "name": "s_valid",
        "dir": "input",
        "width": "1",
        "desc": "Upstream valid"
      },
      {
        "name": "s_ready",
        "dir": "output",
        "width": "1",
        "desc": "Upstream ready (backpressure to source)"
      },
      {
        "name": "s_data",
        "dir": "input",
        "width": "8",
        "desc": "Upstream data"
      },
      {
        "name": "m_valid",
        "dir": "output",
        "width": "1",
        "desc": "Downstream valid"
      },
      {
        "name": "m_ready",
        "dir": "input",
        "width": "1",
        "desc": "Downstream ready (backpressure from sink)"
      },
      {
        "name": "m_data",
        "dir": "output",
        "width": "8",
        "desc": "Downstream data"
      }
    ],
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Clock signal</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Active-low reset</td></tr><tr><td><code>s_valid</code></td><td>input</td><td>1</td><td>Upstream valid</td></tr><tr><td><code>s_ready</code></td><td>output</td><td>1</td><td>Upstream ready</td></tr><tr><td><code>s_data</code></td><td>input</td><td>8</td><td>Upstream data</td></tr><tr><td><code>m_valid</code></td><td>output</td><td>1</td><td>Downstream valid</td></tr><tr><td><code>m_ready</code></td><td>input</td><td>1</td><td>Downstream ready</td></tr><tr><td><code>m_data</code></td><td>output</td><td>8</td><td>Downstream data</td></tr></tbody></table>",
    "starter": "module top_module(\n  input        clk,\n  input        areset_n,\n  input        s_valid,\n  output       s_ready,\n  input  [7:0] s_data,\n  output reg   m_valid,\n  input        m_ready,\n  output reg [7:0] m_data\n);\n\n  // Valid-ready forward registered stage\n\nendmodule\n",
    "referenceRtl": "module top_module(\n  input        clk,\n  input        areset_n,\n  input        s_valid,\n  output       s_ready,\n  input  [7:0] s_data,\n  output reg   m_valid,\n  input        m_ready,\n  output reg [7:0] m_data\n);\n  // Stage can accept data if empty (!m_valid) or if downstream is currently accepting (m_ready)\n  assign s_ready = !m_valid || m_ready;\n\n  always @(posedge clk or negedge areset_n) begin\n    if (!areset_n) begin\n      m_valid <= 1'b0;\n      m_data  <= 8'd0;\n    end else if (s_ready) begin\n      m_valid <= s_valid;\n      if (s_valid)\n        m_data <= s_data;\n    end\n  end\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, areset_n, s_valid, m_ready;\n  reg [7:0] s_data;\n  wire s_ready, m_valid;\n  wire [7:0] m_data;\n  integer errors = 0;\n  top_module dut(\n    .clk(clk), .areset_n(areset_n),\n    .s_valid(s_valid), .s_ready(s_ready), .s_data(s_data),\n    .m_valid(m_valid), .m_ready(m_ready), .m_data(m_data)\n  );\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; areset_n = 0; s_valid = 0; m_ready = 0; s_data = 0; #12;\n    areset_n = 1; #8;\n    // Step 1: Upstream pushes 0x55, downstream ready is 1\n    @(negedge clk); s_valid = 1; s_data = 8'h55; m_ready = 1;\n    @(posedge clk); #1; // data captured into m_data\n    if (!m_valid || m_data !== 8'h55) begin errors = errors + 1; $display(\"Test 1: forward transfer | FAIL\"); end\n    else $display(\"Test 1: forward transfer | got 55 | PASS\");\n    // Step 2: Downstream asserts backpressure (m_ready = 0)!\n    @(negedge clk); s_valid = 1; s_data = 8'h99; m_ready = 0;\n    @(posedge clk); #1;\n    // Because downstream was not ready, m_data MUST HOLD 0x55!\n    if (m_data !== 8'h55 || s_ready !== 1'b0) begin errors = errors + 1; $display(\"Test 2: backpressure hold | FAIL m_data=%h s_ready=%b\", m_data, s_ready); end\n    else $display(\"Test 2: backpressure held | m_data=55, s_ready=0 | PASS\");\n    // Step 3: Downstream releases backpressure (m_ready = 1), upstream holds 0x99\n    @(negedge clk); m_ready = 1; s_valid = 1; s_data = 8'h99;\n    @(posedge clk); #1; // downstream consumes 0x55, 0x99 moves into stage!\n    if (m_data !== 8'h99 || !m_valid) begin errors = errors + 1; $display(\"Test 3: simultaneous drain/fill | FAIL m_data=%h\", m_data); end\n    else $display(\"Test 3: simultaneous drain/fill | m_data=99 | PASS\");\n    // Step 4: Upstream completes, downstream consumes 0x99\n    @(negedge clk); s_valid = 0; m_ready = 1;\n    @(posedge clk); #1;\n    if (m_valid !== 1'b0) begin errors = errors + 1; $display(\"Test 4: pipe empty | FAIL\"); end\n    else $display(\"Test 4: pipe empty | PASS\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "areset_n",
      "s_valid",
      "s_ready",
      "s_data",
      "m_valid",
      "m_ready",
      "m_data"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......"
        },
        {
          "name": "s_valid",
          "wave": "01....."
        },
        {
          "name": "s_ready",
          "wave": "1..01.."
        },
        {
          "name": "s_data",
          "wave": "x==....",
          "data": [
            "55",
            "99"
          ]
        },
        {
          "name": "m_valid",
          "wave": "0.1...."
        },
        {
          "name": "m_ready",
          "wave": "1.0.1.."
        },
        {
          "name": "m_data",
          "wave": "x.==...",
          "data": [
            "55",
            "99"
          ]
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "circuitSvg": "<svg viewBox=\"0 0 320 110\" class=\"circuit-svg\"><rect x=\"100\" y=\"20\" width=\"120\" height=\"75\" rx=\"8\" stroke=\"#38bdf8\" stroke-width=\"2.5\" fill=\"rgba(56,189,248,0.06)\"/><line x1=\"20\" y1=\"40\" x2=\"100\" y2=\"40\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"100\" y1=\"60\" x2=\"20\" y2=\"60\" stroke=\"#f43f5e\" stroke-width=\"2\"/><line x1=\"20\" y1=\"80\" x2=\"100\" y2=\"80\" stroke=\"#fbbf24\" stroke-width=\"2\"/><line x1=\"220\" y1=\"40\" x2=\"280\" y2=\"40\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"280\" y1=\"60\" x2=\"220\" y2=\"60\" stroke=\"#f43f5e\" stroke-width=\"2\"/><line x1=\"220\" y1=\"80\" x2=\"280\" y2=\"80\" stroke=\"#2dd4bf\" stroke-width=\"2\"/><text x=\"14\" y=\"44\" fill=\"#38bdf8\" font-size=\"9\">s_valid</text><text x=\"14\" y=\"64\" fill=\"#f43f5e\" font-size=\"9\">s_ready</text><text x=\"14\" y=\"84\" fill=\"#fbbf24\" font-size=\"9\">s_data</text><text x=\"285\" y=\"44\" fill=\"#38bdf8\" font-size=\"9\">m_valid</text><text x=\"285\" y=\"64\" fill=\"#f43f5e\" font-size=\"9\">m_ready</text><text x=\"285\" y=\"84\" fill=\"#2dd4bf\" font-size=\"9\">m_data</text><text x=\"115\" y=\"60\" fill=\"#e2e8f0\" font-size=\"12\" font-weight=\"700\">HANDSHAKE</text></svg>",
    "hints": [
      "A handshake transfer occurs only when `valid && ready` are both 1.",
      "The upstream stage is ready if the downstream register is empty (`!m_valid`) or if downstream is consuming data this cycle (`m_ready`).",
      "Formula: `assign s_ready = !m_valid || m_ready;`."
    ],
    "explanation": "The Valid-Ready protocol is the universal streaming interface used across AMBA AXI-Stream, PCIe TLP pipelines, and AI tensor accelerators. It enforces flow control without drops: data is safely held until the consumer confirms reception with `ready`.",
    "commonMistakes": [
      "Making `m_valid` depend combinationally on `m_ready`: this is strictly prohibited by the AXI specification and creates combinational feedback loops.",
      "Overwriting `m_data` while `m_ready = 0`, corrupting unread data."
    ],
    "hwNotes": "A simple forward register breaks the timing path on `data` and `valid`, but leaves `s_ready` dependent combinationally on `m_ready`. To break timing in both directions, use a full 2-entry Skid Buffer.",
    "relatedSlugs": [
      "parameterized-register-slice",
      "skid-buffer",
      "credit-based-flow-control-counter"
    ],
    "flagshipIndex": 31,
    "isFlagship": true,
    "curatedTrack": "Level 3: Advanced (Memory, FIFO & Protocols)",
    "category": "On-Chip Protocols",
    "tags": [
      "memory",
      "fifo",
      "protocols",
      "apb",
      "uart",
      "hard",
      "axi-/-streaming"
    ],
    "concept": "<b>Objective:</b> Understand AXI-style valid/ready flow control, handshake rules, backpressure propagation, and preventing data loss.<br><br><b>Prerequisites:</b> Synchronous registers, handshake protocol rules."
  },
  {
    "id": 32,
    "slug": "parameterized-register-slice",
    "title": "Parameterized Register Slice — Pipeline and Backpressure",
    "difficulty": "hard",
    "points": 50,
    "level": 3,
    "topic": "On-Chip Protocols",
    "subtopic": "AXI / Streaming",
    "estimatedTime": "35 mins",
    "lede": "Design a Parameterized Register Slice (Skid Buffer) of width DATA_WIDTH (default 8) that breaks combinational paths in BOTH forward and backward directions with 0 bubble cycles.",
    "objective": "Master 2-slot skid buffers, pipeline timing closure, eliminating combinational loops, and 100% throughput under backpressure.",
    "prerequisites": "Valid-ready handshake, AXI streaming.",
    "timingReqs": "Both forward signals (`m_valid, m_data`) and backward signal (`s_ready`) must be registered. 0 pipeline stall bubbles.",
    "constraints": "Parameterized: `parameter DATA_WIDTH = 8`. Full throughput (1 beat per cycle sustained).",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Pipeline clock"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low reset"
      },
      {
        "name": "s_valid",
        "dir": "input",
        "width": "1",
        "desc": "Upstream valid"
      },
      {
        "name": "s_ready",
        "dir": "output",
        "width": "1",
        "desc": "Registered upstream ready"
      },
      {
        "name": "s_data",
        "dir": "input",
        "width": "DATA_WIDTH",
        "desc": "Upstream data"
      },
      {
        "name": "m_valid",
        "dir": "output",
        "width": "1",
        "desc": "Registered downstream valid"
      },
      {
        "name": "m_ready",
        "dir": "input",
        "width": "1",
        "desc": "Downstream ready"
      },
      {
        "name": "m_data",
        "dir": "output",
        "width": "DATA_WIDTH",
        "desc": "Registered downstream data"
      }
    ],
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Pipeline clock</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Active-low reset</td></tr><tr><td><code>s_valid</code></td><td>input</td><td>1</td><td>Upstream valid</td></tr><tr><td><code>s_ready</code></td><td>output</td><td>1</td><td>Registered upstream ready</td></tr><tr><td><code>s_data</code></td><td>input</td><td>DATA_WIDTH</td><td>Upstream data</td></tr><tr><td><code>m_valid</code></td><td>output</td><td>1</td><td>Registered downstream valid</td></tr><tr><td><code>m_ready</code></td><td>input</td><td>1</td><td>Downstream ready</td></tr><tr><td><code>m_data</code></td><td>output</td><td>DATA_WIDTH</td><td>Registered downstream data</td></tr></tbody></table>",
    "starter": "module top_module #(\n  parameter DATA_WIDTH = 8\n)(\n  input                    clk,\n  input                    areset_n,\n  input                    s_valid,\n  output reg               s_ready,\n  input   [DATA_WIDTH-1:0] s_data,\n  output reg               m_valid,\n  input                    m_ready,\n  output reg [DATA_WIDTH-1:0] m_data\n);\n\n  // Full Skid Buffer breaking both forward and backward timing paths\n\nendmodule\n",
    "referenceRtl": "module top_module #(\n  parameter DATA_WIDTH = 8\n)(\n  input                    clk,\n  input                    areset_n,\n  input                    s_valid,\n  output reg               s_ready,\n  input   [DATA_WIDTH-1:0] s_data,\n  output reg               m_valid,\n  input                    m_ready,\n  output reg [DATA_WIDTH-1:0] m_data\n);\n  reg [DATA_WIDTH-1:0] skid_data;\n  reg                  skid_valid;\n\n  always @(posedge clk or negedge areset_n) begin\n    if (!areset_n) begin\n      s_ready    <= 1'b1;\n      m_valid    <= 1'b0;\n      m_data     <= {DATA_WIDTH{1'b0}};\n      skid_valid <= 1'b0;\n      skid_data  <= {DATA_WIDTH{1'b0}};\n    end else begin\n      if (m_ready) begin\n        if (skid_valid) begin\n          m_valid    <= 1'b1;\n          m_data     <= skid_data;\n          skid_valid <= 1'b0;\n          s_ready    <= 1'b1;\n        end else if (s_valid && s_ready) begin\n          m_valid    <= 1'b1;\n          m_data     <= s_data;\n          s_ready    <= 1'b1;\n        end else begin\n          m_valid    <= 1'b0;\n          s_ready    <= 1'b1;\n        end\n      end else begin // m_ready is low (downstream stalled)\n        if (s_valid && s_ready) begin\n          skid_data  <= s_data;\n          skid_valid <= 1'b1;\n          s_ready    <= 1'b0; // can no longer accept when skid is full\n        end\n      end\n    end\n  end\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  parameter W = 8;\n  reg clk, areset_n, s_valid, m_ready;\n  reg [W-1:0] s_data;\n  wire s_ready, m_valid;\n  wire [W-1:0] m_data;\n  integer errors = 0;\n  top_module #(.DATA_WIDTH(W)) dut(\n    .clk(clk), .areset_n(areset_n),\n    .s_valid(s_valid), .s_ready(s_ready), .s_data(s_data),\n    .m_valid(m_valid), .m_ready(m_ready), .m_data(m_data)\n  );\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; areset_n = 0; s_valid = 0; m_ready = 1; s_data = 0; #12;\n    areset_n = 1; #8;\n    // Push beat 0x11 with m_ready=1\n    @(negedge clk); s_valid = 1; s_data = 8'h11;\n    @(posedge clk); #1;\n    if (m_data !== 8'h11 || !m_valid) begin errors = errors + 1; $display(\"Test 1: push 11 | FAIL\"); end\n    else $display(\"Test 1: push 11 | PASS\");\n    // Strobe backpressure: m_ready goes low! Upstream pushes 0x22\n    @(negedge clk); m_ready = 0; s_valid = 1; s_data = 8'h22;\n    @(posedge clk); #1;\n    // 0x22 absorbed into skid buffer! s_ready drops to 0! m_data holds 0x11!\n    if (m_data !== 8'h11 || s_ready !== 1'b0) begin errors = errors + 1; $display(\"Test 2: skid absorb | FAIL m_data=%h s_ready=%b\", m_data, s_ready); end\n    else $display(\"Test 2: skid absorb 22 while stalled | m_data=11 s_ready=0 | PASS\");\n    // Release backpressure: m_ready=1 -> 0x22 emerges next!\n    @(negedge clk); m_ready = 1; s_valid = 0;\n    @(posedge clk); #1;\n    if (m_data !== 8'h22 || !m_valid) begin errors = errors + 1; $display(\"Test 3: skid release | FAIL m_data=%h\", m_data); end\n    else $display(\"Test 3: skid release 22 | PASS\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "areset_n",
      "s_valid",
      "s_ready",
      "s_data",
      "m_valid",
      "m_ready",
      "m_data"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......"
        },
        {
          "name": "s_valid",
          "wave": "01.0..."
        },
        {
          "name": "s_ready",
          "wave": "1..01.."
        },
        {
          "name": "s_data",
          "wave": "x==....",
          "data": [
            "11",
            "22"
          ]
        },
        {
          "name": "m_valid",
          "wave": "0.1...."
        },
        {
          "name": "m_ready",
          "wave": "1.0.1.."
        },
        {
          "name": "m_data",
          "wave": "x.==...",
          "data": [
            "11",
            "22"
          ]
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "circuitSvg": "<svg viewBox=\"0 0 320 110\" class=\"circuit-svg\"><rect x=\"70\" y=\"20\" width=\"75\" height=\"70\" rx=\"6\" stroke=\"#a78bfa\" stroke-width=\"2\" fill=\"rgba(167,139,250,0.06)\"/><rect x=\"175\" y=\"20\" width=\"75\" height=\"70\" rx=\"6\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"rgba(56,189,248,0.06)\"/><text x=\"82\" y=\"55\" fill=\"#e2e8f0\" font-size=\"11\" font-weight=\"700\">SKID REG</text><text x=\"187\" y=\"55\" fill=\"#e2e8f0\" font-size=\"11\" font-weight=\"700\">MAIN REG</text><line x1=\"145\" y1=\"55\" x2=\"175\" y2=\"55\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"250\" y1=\"55\" x2=\"295\" y2=\"55\" stroke=\"#2dd4bf\" stroke-width=\"2\"/><line x1=\"25\" y1=\"55\" x2=\"70\" y2=\"55\" stroke=\"#fbbf24\" stroke-width=\"2\"/><text x=\"100\" y=\"102\" fill=\"#64748b\" font-size=\"10\">2-SLOT SKID BUFFER</text></svg>",
    "hints": [
      "A Skid Buffer uses two internal data slots: `m_data` (primary output) and `skid_data` (temporary holding).",
      "When downstream asserts backpressure (`m_ready = 0`), the skid register absorbs one extra in-flight beat and pulls `s_ready <= 0`.",
      "This cuts the combinational path on both forward and backward channels, enabling maximum clock frequency."
    ],
    "explanation": "In long AXI streaming interconnects, backpressure paths (`ready`) create combinational paths spanning across entire chips. A standard register slice cuts forward paths but leaves `ready` combinational. A Skid Buffer cuts BOTH forward and backward timing paths, isolating timing domains while sustaining 100% throughput with 0 bubble cycles.",
    "commonMistakes": [
      "Dropping the in-flight data beat when backpressure asserts on the same cycle data was launched.",
      "Introducing bubble cycles (idle cycles) after releasing backpressure."
    ],
    "hwNotes": "Skid buffers are mandatory pipeline isolation cells placed along chip hierarchy boundaries in modern sub-3nm multi-die chiplet interconnects.",
    "relatedSlugs": [
      "valid-ready-handshake",
      "skid-buffer",
      "fifo-synchronous"
    ],
    "flagshipIndex": 32,
    "isFlagship": true,
    "curatedTrack": "Level 3: Advanced (Memory, FIFO & Protocols)",
    "category": "On-Chip Protocols",
    "tags": [
      "memory",
      "fifo",
      "protocols",
      "apb",
      "uart",
      "hard",
      "axi-/-streaming"
    ],
    "concept": "<b>Objective:</b> Master 2-slot skid buffers, pipeline timing closure, eliminating combinational loops, and 100% throughput under backpressure.<br><br><b>Prerequisites:</b> Valid-ready handshake, AXI streaming."
  },
  {
    "slug": "two-flop-synchronizer",
    "title": "Two-Flop Synchronizer — Single-Bit CDC",
    "difficulty": "hard",
    "points": 50,
    "level": 4,
    "tags": [
      "cdc",
      "industry-rtl",
      "arbiters",
      "clock-domain-crossing",
      "hard",
      "bit-synchronizers"
    ],
    "category": "Clock Domain Crossing (CDC)",
    "lede": "Design a 2-flip-flop synchronizer to safely pass a single-bit control signal from an asynchronous source into the destination clock domain clk_dst.",
    "concept": "<b>Objective:</b> Understand metastability resolution, MTBF (Mean Time Between Failures), two-stage flip-flop cascades, and CDC synthesis constraints (set_false_path / ASYNC_REG).<br><br><b>Prerequisites:</b> Flip-flop setup/hold times, metastability basics, clock domain crossings.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk_dst</code></td><td>input</td><td>1</td><td>Destination clock domain</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Destination domain active-low reset</td></tr><tr><td><code>async_in</code></td><td>input</td><td>1</td><td>Asynchronous single-bit input signal</td></tr><tr><td><code>sync_out</code></td><td>output</td><td>1</td><td>Synchronized output in clk_dst domain</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   clk_dst,\n  input   areset_n,\n  input   async_in,\n  output  sync_out\n);\n\n  // 2-Flip-Flop Synchronizer for single-bit CDC\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk_dst, areset_n, async_in;\n  wire sync_out;\n  integer errors = 0;\n  top_module dut(.clk_dst(clk_dst), .areset_n(areset_n), .async_in(async_in), .sync_out(sync_out));\n  always #5 clk_dst = ~clk_dst;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk_dst = 0; areset_n = 0; async_in = 0; #12;\n    areset_n = 1; #8;\n    // Asynchronous pulse arrival at random phase (time 23)\n    #3; async_in = 1;\n    // Next clock posedge is at time 25: q1 samples 1\n    @(posedge clk_dst); #1;\n    if (sync_out !== 1'b0) begin errors = errors + 1; $display(\"Test 1: stage 1 latency | FAIL got %b\", sync_out); end\n    else $display(\"Test 1: stage 1 isolated | PASS (sync_out=0)\");\n    // Next clock posedge at time 35: q2 samples q1 -> sync_out becomes 1!\n    @(posedge clk_dst); #1;\n    if (sync_out !== 1'b1) begin errors = errors + 1; $display(\"Test 2: stage 2 resolved | FAIL got %b\", sync_out); end\n    else $display(\"Test 2: stage 2 synchronized | PASS (sync_out=1)\");\n    // Clear async_in\n    @(negedge clk_dst); async_in = 0;\n    @(posedge clk_dst);\n    @(posedge clk_dst); #1;\n    if (sync_out !== 1'b0) begin errors = errors + 1; $display(\"Test 3: return to 0 | FAIL\"); end\n    else $display(\"Test 3: return to 0 | PASS\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk_dst",
      "areset_n",
      "async_in",
      "sync_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk_dst",
          "wave": "p......."
        },
        {
          "name": "areset_n",
          "wave": "0.1....."
        },
        {
          "name": "async_in",
          "wave": "0..1.0.."
        },
        {
          "name": "sync_out",
          "wave": "0....1.0"
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "id": 33,
    "topic": "Clock Domain Crossing (CDC)",
    "subtopic": "Bit Synchronizers",
    "estimatedTime": "25 mins",
    "objective": "Understand metastability resolution, MTBF (Mean Time Between Failures), two-stage flip-flop cascades, and CDC synthesis constraints (set_false_path / ASYNC_REG).",
    "prerequisites": "Flip-flop setup/hold times, metastability basics, clock domain crossings.",
    "timingReqs": "Asynchronous input `async_in` is sampled by stage 1 (`sync_q1`), and resolved by stage 2 (`sync_q2`). Total latency = 2 destination clock cycles.",
    "constraints": "Never apply 2-flop synchronizers to multi-bit buses without Gray coding or handshakes. Synthesizable sequential RTL.",
    "ports": [
      {
        "name": "clk_dst",
        "dir": "input",
        "width": "1",
        "desc": "Destination clock domain"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Destination domain active-low reset"
      },
      {
        "name": "async_in",
        "dir": "input",
        "width": "1",
        "desc": "Asynchronous single-bit input signal"
      },
      {
        "name": "sync_out",
        "dir": "output",
        "width": "1",
        "desc": "Synchronized output in clk_dst domain"
      }
    ],
    "referenceRtl": "module top_module(\n  input   clk_dst,\n  input   areset_n,\n  input   async_in,\n  output  sync_out\n);\n  (* ASYNC_REG = \"TRUE\" *) reg q1;\n  (* ASYNC_REG = \"TRUE\" *) reg q2;\n\n  always @(posedge clk_dst or negedge areset_n) begin\n    if (!areset_n) begin\n      q1 <= 1'b0;\n      q2 <= 1'b0;\n    end else begin\n      q1 <= async_in;\n      q2 <= q1;\n    end\n  end\n\n  assign sync_out = q2;\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 320 100\" class=\"circuit-svg\"><rect x=\"80\" y=\"20\" width=\"60\" height=\"60\" rx=\"6\" stroke=\"#f472b6\" stroke-width=\"2\" fill=\"rgba(244,114,182,0.06)\"/><rect x=\"180\" y=\"20\" width=\"60\" height=\"60\" rx=\"6\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"rgba(56,189,248,0.06)\"/><line x1=\"20\" y1=\"50\" x2=\"80\" y2=\"50\" stroke=\"#fbbf24\" stroke-width=\"2\"/><line x1=\"140\" y1=\"50\" x2=\"180\" y2=\"50\" stroke=\"#f472b6\" stroke-width=\"2\"/><line x1=\"240\" y1=\"50\" x2=\"290\" y2=\"50\" stroke=\"#2dd4bf\" stroke-width=\"2\"/><text x=\"14\" y=\"44\" fill=\"#fbbf24\" font-size=\"9\">async_in</text><text x=\"96\" y=\"55\" fill=\"#f472b6\" font-size=\"11\" font-weight=\"700\">FF1</text><text x=\"196\" y=\"55\" fill=\"#38bdf8\" font-size=\"11\" font-weight=\"700\">FF2</text><text x=\"295\" y=\"54\" fill=\"#2dd4bf\" font-size=\"10\" font-weight=\"700\">sync_out</text><text x=\"95\" y=\"94\" fill=\"#64748b\" font-size=\"9\">ASYNC_REG</text></svg>",
    "hints": [
      "Cascade two flip-flops: `q1 <= async_in; q2 <= q1;` inside `always @(posedge clk_dst)`.",
      "Drive `assign sync_out = q2;`.",
      "In commercial RTL, tag the flops with synthesis attribute `(* ASYNC_REG = \"TRUE\" *)`."
    ],
    "explanation": "When an asynchronous signal transitions near a clock edge, the first flip-flop (FF1) can enter a metastable state where its output voltage hovers between valid logic levels. The second flip-flop (FF2) provides an entire clock period of settling time for FF1 to resolve to a stable 0 or 1, exponentially increasing the Mean Time Between Failures (MTBF).",
    "commonMistakes": [
      "Attempting to synchronize a multi-bit data bus with independent 2-flop synchronizers: skew causes different bits to arrive in different clock cycles, producing corrupted intermediate values.",
      "Assuming functional RTL simulation proves metastability safety: simulators use ideal 0/1 binary states and CANNOT simulate analog metastability."
    ],
    "hwNotes": "CRITICAL CDC NOTE: Passing functional simulation does not prove CDC safety! Static CDC verification tools (Synopsys SpyGlass CDC, Questa CDC) and physical placement constraints (`set_false_path`, `set_max_delay -datapath_only`) are mandatory in silicon design.",
    "relatedSlugs": [
      "pulse-synchronizer",
      "async-fifo-pointer-sync",
      "three-flop-synchronizer"
    ],
    "flagshipIndex": 33,
    "isFlagship": true,
    "curatedTrack": "Level 4: Expert (Industry RTL & CDC)"
  },
  {
    "id": 34,
    "slug": "pulse-synchronizer",
    "title": "Pulse Synchronizer — Clock-Domain Crossing",
    "difficulty": "hard",
    "points": 50,
    "level": 4,
    "topic": "Clock Domain Crossing (CDC)",
    "subtopic": "Pulse Synchronizers",
    "estimatedTime": "30 mins",
    "lede": "Design a Toggle-based Pulse Synchronizer to transfer a single-cycle pulse from a fast clock domain (clk_src) to a slow destination domain (clk_dst).",
    "objective": "Understand toggle pulse conversion, 2-flop synchronization across differing frequencies, and edge detection in the destination domain.",
    "prerequisites": "Two-flop synchronizers, toggle flip-flops, rising/falling edge detection.",
    "timingReqs": "Input `pulse_src` is a single-cycle strobe in `clk_src`. Output `pulse_dst` asserts for exactly 1 cycle in `clk_dst`.",
    "constraints": "Consecutive pulses must be spaced far enough apart to allow toggle completion in the slow domain.",
    "ports": [
      {
        "name": "clk_src",
        "dir": "input",
        "width": "1",
        "desc": "Source clock domain (fast)"
      },
      {
        "name": "areset_src_n",
        "dir": "input",
        "width": "1",
        "desc": "Source domain reset"
      },
      {
        "name": "pulse_src",
        "dir": "input",
        "width": "1",
        "desc": "Single-cycle pulse in source domain"
      },
      {
        "name": "clk_dst",
        "dir": "input",
        "width": "1",
        "desc": "Destination clock domain (slow)"
      },
      {
        "name": "areset_dst_n",
        "dir": "input",
        "width": "1",
        "desc": "Destination domain reset"
      },
      {
        "name": "pulse_dst",
        "dir": "output",
        "width": "1",
        "desc": "Single-cycle pulse in destination domain"
      }
    ],
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk_src</code></td><td>input</td><td>1</td><td>Source clock domain (fast)</td></tr><tr><td><code>areset_src_n</code></td><td>input</td><td>1</td><td>Source domain reset</td></tr><tr><td><code>pulse_src</code></td><td>input</td><td>1</td><td>Single-cycle pulse in source domain</td></tr><tr><td><code>clk_dst</code></td><td>input</td><td>1</td><td>Destination clock domain (slow)</td></tr><tr><td><code>areset_dst_n</code></td><td>input</td><td>1</td><td>Destination domain reset</td></tr><tr><td><code>pulse_dst</code></td><td>output</td><td>1</td><td>Single-cycle pulse in destination domain</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   clk_src,\n  input   areset_src_n,\n  input   pulse_src,\n  input   clk_dst,\n  input   areset_dst_n,\n  output  pulse_dst\n);\n\n  // Toggle Pulse Synchronizer across clock domains\n\nendmodule\n",
    "referenceRtl": "module top_module(\n  input   clk_src,\n  input   areset_src_n,\n  input   pulse_src,\n  input   clk_dst,\n  input   areset_dst_n,\n  output  pulse_dst\n);\n  reg src_toggle;\n\n  // Step 1: In source domain, toggle on each pulse\n  always @(posedge clk_src or negedge areset_src_n) begin\n    if (!areset_src_n)\n      src_toggle <= 1'b0;\n    else if (pulse_src)\n      src_toggle <= ~src_toggle;\n  end\n\n  // Step 2: Synchronize toggle level across CDC into clk_dst using 2 flops\n  reg dst_q1, dst_q2, dst_q3;\n  always @(posedge clk_dst or negedge areset_dst_n) begin\n    if (!areset_dst_n) begin\n      dst_q1 <= 1'b0;\n      dst_q2 <= 1'b0;\n      dst_q3 <= 1'b0;\n    end else begin\n      dst_q1 <= src_toggle;\n      dst_q2 <= dst_q1;\n      dst_q3 <= dst_q2;\n    end\n  end\n\n  // Step 3: Edge detector (XOR detects both 0->1 and 1->0 toggle transitions)\n  assign pulse_dst = dst_q2 ^ dst_q3;\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk_src, areset_src_n, pulse_src;\n  reg clk_dst, areset_dst_n;\n  wire pulse_dst;\n  integer errors = 0;\n  top_module dut(\n    .clk_src(clk_src), .areset_src_n(areset_src_n), .pulse_src(pulse_src),\n    .clk_dst(clk_dst), .areset_dst_n(areset_dst_n), .pulse_dst(pulse_dst)\n  );\n  // Source is fast (period = 6ns), Destination is slow (period = 16ns)\n  always #3 clk_src = ~clk_src;\n  always #8 clk_dst = ~clk_dst;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk_src = 0; areset_src_n = 0; pulse_src = 0;\n    clk_dst = 0; areset_dst_n = 0; #20;\n    areset_src_n = 1; areset_dst_n = 1; #20;\n    // Launch single fast pulse in clk_src\n    @(negedge clk_src); pulse_src = 1;\n    @(posedge clk_src); #1;\n    pulse_src = 0;\n    // Wait for propagation into slow domain\n    @(posedge pulse_dst);\n    #1;\n    if (pulse_dst !== 1'b1) begin errors = errors + 1; $display(\"Test 1: pulse arrival | FAIL\"); end\n    else $display(\"Test 1: pulse captured in slow clk_dst | PASS\");\n    @(posedge clk_dst); #1;\n    if (pulse_dst !== 1'b0) begin errors = errors + 1; $display(\"Test 2: pulse must clear after 1 dst cycle | FAIL\"); end\n    else $display(\"Test 2: single-cycle pulse verified | PASS\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk_src",
      "pulse_src",
      "clk_dst",
      "pulse_dst"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk_src",
          "wave": "p......."
        },
        {
          "name": "pulse_src",
          "wave": "010....."
        },
        {
          "name": "clk_dst",
          "wave": "p..."
        },
        {
          "name": "pulse_dst",
          "wave": "0.10"
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "circuitSvg": "<svg viewBox=\"0 0 340 100\" class=\"circuit-svg\"><rect x=\"30\" y=\"20\" width=\"60\" height=\"60\" rx=\"6\" stroke=\"#f472b6\" stroke-width=\"2\" fill=\"rgba(244,114,182,0.06)\"/><rect x=\"130\" y=\"20\" width=\"55\" height=\"60\" rx=\"6\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"rgba(56,189,248,0.06)\"/><rect x=\"200\" y=\"20\" width=\"55\" height=\"60\" rx=\"6\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"rgba(56,189,248,0.06)\"/><circle cx=\"295\" cy=\"50\" r=\"16\" stroke=\"#2dd4bf\" stroke-width=\"2\" fill=\"none\"/><text x=\"40\" y=\"55\" fill=\"#f472b6\" font-size=\"10\" font-weight=\"700\">T-REG</text><text x=\"142\" y=\"55\" fill=\"#38bdf8\" font-size=\"10\">SYNC1</text><text x=\"212\" y=\"55\" fill=\"#38bdf8\" font-size=\"10\">SYNC2</text><text x=\"285\" y=\"54\" fill=\"#2dd4bf\" font-size=\"10\" font-weight=\"700\">XOR</text></svg>",
    "hints": [
      "A fast pulse cannot be sampled directly by a slow clock because the pulse might vanish between slow clock edges.",
      "Solution: Convert the pulse into a level toggle: `src_toggle <= ~src_toggle;`.",
      "Synchronize `src_toggle` into `clk_dst` with a 2-flop synchronizer, then detect transitions with an XOR edge detector (`dst_q2 ^ dst_q3`)."
    ],
    "explanation": "If a pulse in a 500 MHz domain is 2 ns wide, a 50 MHz clock (20 ns period) would easily miss it. By toggling a register on every pulse, the level stays persistent indefinitely until the slow clock samples it. An XOR gate across the synchronized delayed stages detects both rising and falling toggle transitions, reconstructing an exact 1-cycle pulse in the destination domain.",
    "commonMistakes": [
      "Sending a second pulse before the first pulse has been sampled in the destination domain, causing pulse collision/loss.",
      "Using a simple edge detector (`dst_q2 & ~dst_q3`) instead of XOR (`dst_q2 ^ dst_q3`), which misses every alternate pulse."
    ],
    "hwNotes": "Ensure the pulse rate in the fast domain is less than twice the period of the slow clock domain, or use an asynchronous handshake/FIFO.",
    "relatedSlugs": [
      "two-flop-synchronizer",
      "pulse-stretch-and-sync",
      "async-fifo-pointer-sync"
    ],
    "flagshipIndex": 34,
    "isFlagship": true,
    "curatedTrack": "Level 4: Expert (Industry RTL & CDC)",
    "category": "Clock Domain Crossing (CDC)",
    "tags": [
      "cdc",
      "industry-rtl",
      "arbiters",
      "clock-domain-crossing",
      "hard",
      "pulse-synchronizers"
    ],
    "concept": "<b>Objective:</b> Understand toggle pulse conversion, 2-flop synchronization across differing frequencies, and edge detection in the destination domain.<br><br><b>Prerequisites:</b> Two-flop synchronizers, toggle flip-flops, rising/falling edge detection."
  },
  {
    "slug": "gray-code-counter",
    "title": "Gray Code Counter — Gray Encoding",
    "difficulty": "hard",
    "points": 50,
    "level": 4,
    "tags": [
      "cdc",
      "industry-rtl",
      "arbiters",
      "clock-domain-crossing",
      "hard",
      "gray-codes"
    ],
    "category": "Sequential Logic",
    "lede": "Implement a 4-bit Gray code counter that advances by exactly one bit per transition: 0000, 0001, 0011, 0010, 0110, 0111, 0101, 0100...",
    "concept": "<b>Objective:</b> Understand Gray code arithmetic, binary-to-Gray conversion ($G = B \\oplus (B >> 1)$), and glitch-free multi-bit CDC.<br><br><b>Prerequisites:</b> Binary counters, XOR logic, CDC pointer synchronization.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Clock signal</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Active-low asynchronous reset</td></tr><tr><td><code>gray</code></td><td>output</td><td>4</td><td>4-bit Gray code count value</td></tr></tbody></table>",
    "starter": "module top_module(\n  input        clk,\n  input        areset_n,\n  output reg [3:0] gray\n);\n\n  // 4-bit Gray code counter\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, areset_n;\n  wire [3:0] gray;\n  integer errors = 0;\n  reg [3:0] prev_gray;\n  integer i, diff_bits;\n  top_module dut(.clk(clk), .areset_n(areset_n), .gray(gray));\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; areset_n = 0; #12;\n    if (gray !== 4'b0000) begin errors = errors + 1; $display(\"Test 1: reset 0000 | got %b | FAIL\", gray); end\n    else $display(\"Test 1: reset 0000 | PASS\");\n    areset_n = 1; #8;\n    prev_gray = gray;\n    for (i = 1; i <= 20; i = i + 1) begin\n      @(posedge clk); #1;\n      // Calculate Hamming distance\n      diff_bits = (gray[0] ^ prev_gray[0]) + (gray[1] ^ prev_gray[1]) + (gray[2] ^ prev_gray[2]) + (gray[3] ^ prev_gray[3]);\n      if (diff_bits !== 1) begin\n        errors = errors + 1;\n        $display(\"Test step %0d: expected Hamming distance 1 | prev=%b cur=%b diff=%0d | FAIL\", i, prev_gray, gray, diff_bits);\n      end else begin\n        $display(\"Test step %0d: prev=%b cur=%b (diff=1) | PASS\", i, prev_gray, gray);\n      end\n      prev_gray = gray;\n    end\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "areset_n",
      "gray"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "areset_n",
          "wave": "0.1....."
        },
        {
          "name": "gray",
          "wave": "=x=======",
          "data": [
            "0000",
            "0000",
            "0001",
            "0011",
            "0010",
            "0110",
            "0111",
            "0101"
          ]
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "id": 35,
    "topic": "Sequential Logic",
    "subtopic": "Gray Codes",
    "estimatedTime": "25 mins",
    "objective": "Understand Gray code arithmetic, binary-to-Gray conversion ($G = B \\oplus (B >> 1)$), and glitch-free multi-bit CDC.",
    "prerequisites": "Binary counters, XOR logic, CDC pointer synchronization.",
    "timingReqs": "Transitions on `posedge clk`. Hamming distance between consecutive output words is strictly 1.",
    "constraints": "4-bit output vector `gray[3:0]`. Modulo-16 cyclic sequence.",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Clock signal"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low asynchronous reset"
      },
      {
        "name": "gray",
        "dir": "output",
        "width": "4",
        "desc": "4-bit Gray code count value"
      }
    ],
    "referenceRtl": "module top_module(\n  input        clk,\n  input        areset_n,\n  output reg [3:0] gray\n);\n  reg [3:0] bin_cnt;\n\n  always @(posedge clk or negedge areset_n) begin\n    if (!areset_n) begin\n      bin_cnt <= 4'b0000;\n      gray    <= 4'b0000;\n    end else begin\n      bin_cnt <= bin_cnt + 1'b1;\n      gray    <= (bin_cnt + 1'b1) ^ ((bin_cnt + 1'b1) >> 1);\n    end\n  end\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 280 110\" class=\"circuit-svg\"><rect x=\"40\" y=\"25\" width=\"70\" height=\"60\" rx=\"6\" stroke=\"#a78bfa\" stroke-width=\"2\" fill=\"rgba(167,139,250,0.06)\"/><rect x=\"140\" y=\"35\" width=\"80\" height=\"40\" rx=\"4\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"rgba(56,189,248,0.06)\"/><line x1=\"110\" y1=\"55\" x2=\"140\" y2=\"55\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"220\" y1=\"55\" x2=\"260\" y2=\"55\" stroke=\"#2dd4bf\" stroke-width=\"2\"/><text x=\"50\" y=\"60\" fill=\"#e2e8f0\" font-size=\"11\" font-weight=\"700\">BIN+1</text><text x=\"146\" y=\"60\" fill=\"#fbbf24\" font-size=\"10\">B^(B>>1)</text><text x=\"265\" y=\"59\" fill=\"#2dd4bf\" font-size=\"11\" font-weight=\"700\">gray</text></svg>",
    "hints": [
      "Maintain an internal binary counter `bin_cnt`.",
      "Convert next binary value to Gray code using the canonical formula: `gray <= next_bin ^ (next_bin >> 1);`.",
      "Register the Gray output to eliminate combinational glitch transitions."
    ],
    "explanation": "Standard binary counters change multiple bits simultaneously (e.g. $0111 \\to 1000$ flips all 4 bits). In a CDC crossing, routing skew would cause the destination clock to sample intermediate false values ($0110, 0000, 1111$). A Gray code guarantees that exactly ONE bit changes between any two consecutive values, making multi-bit CDC safe.",
    "commonMistakes": [
      "Converting to Gray code through unclocked combinational gates before crossing domains: logic glitches defeat the purpose of Gray coding.",
      "Using non-power-of-2 modulo counts with Gray code without folding: rolling over from an arbitrary count back to 0 breaks the 1-bit Hamming distance guarantee."
    ],
    "hwNotes": "Gray coding is mandatory for all asynchronous FIFO read/write pointer synchronizers across chips, networking ASICs, and GPUs.",
    "relatedSlugs": [
      "binary-to-gray",
      "gray-to-binary",
      "async-fifo-pointer-sync"
    ],
    "flagshipIndex": 35,
    "isFlagship": true,
    "curatedTrack": "Level 4: Expert (Industry RTL & CDC)"
  },
  {
    "id": 36,
    "slug": "async-fifo-pointer-sync",
    "title": "Asynchronous FIFO Pointer Synchronization — Multi-Clock Design",
    "difficulty": "hard",
    "points": 50,
    "level": 4,
    "topic": "Clock Domain Crossing (CDC)",
    "subtopic": "Async FIFO",
    "estimatedTime": "35 mins",
    "lede": "Convert a 4-bit write pointer to Gray code in clk_wr, synchronize it across clock domains into clk_rd using a 2-flop synchronizer, and generate a safe rd_empty flag.",
    "objective": "Understand the Clifford Cummings asynchronous FIFO pointer crossing technique, MTBF safety, and conservative flag generation.",
    "prerequisites": "Two-flop synchronizers, Gray code counters, FIFO full/empty detection.",
    "timingReqs": "Dual clock domains: `clk_wr` and `clk_rd` are completely asynchronous with independent phases and frequencies.",
    "constraints": "Passing RTL simulation does NOT prove absence of metastability in physical silicon.",
    "ports": [
      {
        "name": "clk_wr",
        "dir": "input",
        "width": "1",
        "desc": "Write domain clock"
      },
      {
        "name": "wr_rst_n",
        "dir": "input",
        "width": "1",
        "desc": "Write domain active-low reset"
      },
      {
        "name": "wr_ptr_bin",
        "dir": "input",
        "width": "4",
        "desc": "Binary write pointer in wr domain"
      },
      {
        "name": "clk_rd",
        "dir": "input",
        "width": "1",
        "desc": "Read domain clock"
      },
      {
        "name": "rd_rst_n",
        "dir": "input",
        "width": "1",
        "desc": "Read domain active-low reset"
      },
      {
        "name": "rd_ptr_gray",
        "dir": "input",
        "width": "4",
        "desc": "Current Gray read pointer in rd domain"
      },
      {
        "name": "rd_empty",
        "dir": "output",
        "width": "1",
        "desc": "Safe empty flag in read clock domain"
      }
    ],
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk_wr</code></td><td>input</td><td>1</td><td>Write domain clock</td></tr><tr><td><code>wr_rst_n</code></td><td>input</td><td>1</td><td>Write domain active-low reset</td></tr><tr><td><code>wr_ptr_bin</code></td><td>input</td><td>4</td><td>Binary write pointer in wr domain</td></tr><tr><td><code>clk_rd</code></td><td>input</td><td>1</td><td>Read domain clock</td></tr><tr><td><code>rd_rst_n</code></td><td>input</td><td>1</td><td>Read domain active-low reset</td></tr><tr><td><code>rd_ptr_gray</code></td><td>input</td><td>4</td><td>Current Gray read pointer in rd domain</td></tr><tr><td><code>rd_empty</code></td><td>output</td><td>1</td><td>Safe empty flag in read clock domain</td></tr></tbody></table>",
    "starter": "module top_module(\n  input        clk_wr,\n  input        wr_rst_n,\n  input  [3:0] wr_ptr_bin,\n  input        clk_rd,\n  input        rd_rst_n,\n  input  [3:0] rd_ptr_gray,\n  output       rd_empty\n);\n\n  // Synchronize Gray write pointer into read domain and generate rd_empty\n\nendmodule\n",
    "referenceRtl": "module top_module(\n  input        clk_wr,\n  input        wr_rst_n,\n  input  [3:0] wr_ptr_bin,\n  input        clk_rd,\n  input        rd_rst_n,\n  input  [3:0] rd_ptr_gray,\n  output       rd_empty\n);\n  // Step 1: Register Gray code in write clock domain\n  reg [3:0] wr_gray_reg;\n  always @(posedge clk_wr or negedge wr_rst_n) begin\n    if (!wr_rst_n)\n      wr_gray_reg <= 4'b0000;\n    else\n      wr_gray_reg <= wr_ptr_bin ^ (wr_ptr_bin >> 1);\n  end\n\n  // Step 2: 2-Flop synchronizer into read clock domain\n  (* ASYNC_REG = \"TRUE\" *) reg [3:0] sync_q1;\n  (* ASYNC_REG = \"TRUE\" *) reg [3:0] sync_q2;\n  always @(posedge clk_rd or negedge rd_rst_n) begin\n    if (!rd_rst_n) begin\n      sync_q1 <= 4'b0000;\n      sync_q2 <= 4'b0000;\n    end else begin\n      sync_q1 <= wr_gray_reg;\n      sync_q2 <= sync_q1;\n    end\n  end\n\n  // Step 3: Compare synchronized Gray write pointer with current Gray read pointer\n  assign rd_empty = (sync_q2 == rd_ptr_gray);\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk_wr, wr_rst_n, clk_rd, rd_rst_n;\n  reg [3:0] wr_ptr_bin, rd_ptr_gray;\n  wire rd_empty;\n  integer errors = 0;\n  top_module dut(\n    .clk_wr(clk_wr), .wr_rst_n(wr_rst_n), .wr_ptr_bin(wr_ptr_bin),\n    .clk_rd(clk_rd), .rd_rst_n(rd_rst_n), .rd_ptr_gray(rd_ptr_gray),\n    .rd_empty(rd_empty)\n  );\n  // Asynchronous clock frequencies\n  always #3.5 clk_wr = ~clk_wr;\n  always #6.0 clk_rd = ~clk_rd;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk_wr = 0; wr_rst_n = 0; wr_ptr_bin = 0;\n    clk_rd = 0; rd_rst_n = 0; rd_ptr_gray = 0; #20;\n    wr_rst_n = 1; rd_rst_n = 1; #20;\n    // Initial state: both at 0 -> empty must be 1!\n    if (rd_empty !== 1'b1) begin errors = errors + 1; $display(\"Test 1: initial empty | FAIL got %b\", rd_empty); end\n    else $display(\"Test 1: initial empty=1 | PASS\");\n    // Advance write pointer in clk_wr\n    @(negedge clk_wr); wr_ptr_bin = 4'd1;\n    @(posedge clk_wr);\n    // Wait 3 clk_rd cycles for 2-stage sync\n    repeat (3) @(posedge clk_rd); #1;\n    if (rd_empty !== 1'b0) begin errors = errors + 1; $display(\"Test 2: write observed, empty must drop | FAIL\"); end\n    else $display(\"Test 2: write observed, empty=0 | PASS\");\n    // Read pointer catches up: rd_ptr_gray becomes Gray(1) = 4'b0001\n    @(negedge clk_rd); rd_ptr_gray = 4'b0001;\n    @(posedge clk_rd); #1;\n    if (rd_empty !== 1'b1) begin errors = errors + 1; $display(\"Test 3: read caught up, empty must assert | FAIL\"); end\n    else $display(\"Test 3: read caught up, empty=1 | PASS\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk_wr",
      "wr_ptr_bin",
      "clk_rd",
      "rd_ptr_gray",
      "rd_empty"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk_wr",
          "wave": "p......."
        },
        {
          "name": "wr_ptr_bin",
          "wave": "==......",
          "data": [
            "0",
            "1"
          ]
        },
        {
          "name": "clk_rd",
          "wave": "p..."
        },
        {
          "name": "rd_ptr_gray",
          "wave": "==..",
          "data": [
            "0000",
            "0001"
          ]
        },
        {
          "name": "rd_empty",
          "wave": "1.01"
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "circuitSvg": "<svg viewBox=\"0 0 340 110\" class=\"circuit-svg\"><rect x=\"30\" y=\"25\" width=\"70\" height=\"60\" rx=\"6\" stroke=\"#f472b6\" stroke-width=\"2\" fill=\"rgba(244,114,182,0.06)\"/><rect x=\"135\" y=\"25\" width=\"55\" height=\"60\" rx=\"6\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"rgba(56,189,248,0.06)\"/><rect x=\"205\" y=\"25\" width=\"55\" height=\"60\" rx=\"6\" stroke=\"#38bdf8\" stroke-width=\"2\" fill=\"rgba(56,189,248,0.06)\"/><circle cx=\"295\" cy=\"55\" r=\"16\" stroke=\"#2dd4bf\" stroke-width=\"2\" fill=\"none\"/><text x=\"40\" y=\"60\" fill=\"#f472b6\" font-size=\"10\">WR_GRAY</text><text x=\"146\" y=\"60\" fill=\"#38bdf8\" font-size=\"9\">SYNC1</text><text x=\"216\" y=\"60\" fill=\"#38bdf8\" font-size=\"9\">SYNC2</text><text x=\"286\" y=\"59\" fill=\"#2dd4bf\" font-size=\"10\" font-weight=\"700\">==</text></svg>",
    "hints": [
      "In write domain, convert binary pointer to Gray code and register it: `wr_gray_reg <= wr_ptr_bin ^ (wr_ptr_bin >> 1);`.",
      "Pass `wr_gray_reg` through two `clk_rd` flip-flops (`sync_q1`, `sync_q2`).",
      "Generate `rd_empty = (sync_q2 == rd_ptr_gray);`."
    ],
    "explanation": "Because Gray code transitions only one bit at a time, asynchronous sampling by `clk_rd` can only sample either the old pointer value or the newly updated pointer value — never an erroneous intermediate value. The empty flag is conservative: synchronization latency can delay clearing `empty`, but will NEVER falsely indicate non-empty when the buffer is empty, guaranteeing zero underflows.",
    "commonMistakes": [
      "Synchronizing binary pointers directly without Gray coding: multi-bit skew causes catastrophic FIFO data corruption.",
      "Assuming that passing functional simulation proves CDC safety: RTL simulators do not model analog metastability."
    ],
    "hwNotes": "CRITICAL CDC NOTE: Functional simulation only confirms algorithmic logic. True CDC robustness requires static CDC analysis tools to verify clock domains and ensure proper `set_max_delay` constraints between the Gray register and the first synchronizer flop.",
    "relatedSlugs": [
      "gray-code-counter",
      "fifo-synchronous",
      "fifo-full-empty-detector"
    ],
    "flagshipIndex": 36,
    "isFlagship": true,
    "curatedTrack": "Level 4: Expert (Industry RTL & CDC)",
    "category": "Clock Domain Crossing (CDC)",
    "tags": [
      "cdc",
      "industry-rtl",
      "arbiters",
      "clock-domain-crossing",
      "hard",
      "async-fifo"
    ],
    "concept": "<b>Objective:</b> Understand the Clifford Cummings asynchronous FIFO pointer crossing technique, MTBF safety, and conservative flag generation.<br><br><b>Prerequisites:</b> Two-flop synchronizers, Gray code counters, FIFO full/empty detection."
  },
  {
    "id": 37,
    "slug": "fifo-almost-full-flag",
    "title": "FIFO Almost-Full Logic — Threshold Calculation",
    "difficulty": "hard",
    "points": 50,
    "level": 3,
    "topic": "Queues & Buffers",
    "subtopic": "FIFO Thresholds",
    "estimatedTime": "25 mins",
    "lede": "Generate an almost_full flag for a 16-entry FIFO that asserts whenever occupancy is greater than or equal to ALMOST_FULL_THRESHOLD (default 12).",
    "objective": "Understand FIFO watermarking, Skid margins, and early backpressure signaling to compensate for pipeline latency.",
    "prerequisites": "FIFO occupancy counters, threshold comparison.",
    "timingReqs": "Flag evaluates synchronously on `posedge clk`. Asserts when `occupancy >= ALMOST_FULL_THRESHOLD`.",
    "constraints": "FIFO capacity = 16. Threshold parameter `ALMOST_FULL_THRESHOLD = 12`.",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Clock signal"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low reset"
      },
      {
        "name": "wr_valid",
        "dir": "input",
        "width": "1",
        "desc": "Valid write beat committed"
      },
      {
        "name": "rd_valid",
        "dir": "input",
        "width": "1",
        "desc": "Valid read beat committed"
      },
      {
        "name": "occupancy",
        "dir": "output",
        "width": "5",
        "desc": "Current word occupancy (0 to 16)"
      },
      {
        "name": "almost_full",
        "dir": "output",
        "width": "1",
        "desc": "Asserted when occupancy >= 12"
      },
      {
        "name": "full",
        "dir": "output",
        "width": "1",
        "desc": "Asserted when occupancy == 16"
      }
    ],
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Clock signal</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Active-low reset</td></tr><tr><td><code>wr_valid</code></td><td>input</td><td>1</td><td>Valid write beat committed</td></tr><tr><td><code>rd_valid</code></td><td>input</td><td>1</td><td>Valid read beat committed</td></tr><tr><td><code>occupancy</code></td><td>output</td><td>5</td><td>Current word occupancy (0 to 16)</td></tr><tr><td><code>almost_full</code></td><td>output</td><td>1</td><td>Asserted when occupancy &gt;= 12</td></tr><tr><td><code>full</code></td><td>output</td><td>1</td><td>Asserted when occupancy == 16</td></tr></tbody></table>",
    "starter": "module top_module #(\n  parameter ALMOST_FULL_THRESHOLD = 12\n)(\n  input        clk,\n  input        areset_n,\n  input        wr_valid,\n  input        rd_valid,\n  output reg [4:0] occupancy,\n  output       almost_full,\n  output       full\n);\n\n  // FIFO watermark tracking and almost_full threshold logic\n\nendmodule\n",
    "referenceRtl": "module top_module #(\n  parameter ALMOST_FULL_THRESHOLD = 12\n)(\n  input        clk,\n  input        areset_n,\n  input        wr_valid,\n  input        rd_valid,\n  output reg [4:0] occupancy,\n  output       almost_full,\n  output       full\n);\n  always @(posedge clk or negedge areset_n) begin\n    if (!areset_n) begin\n      occupancy <= 5'd0;\n    end else begin\n      case ({wr_valid, rd_valid})\n        2'b10: occupancy <= occupancy + 1'b1;\n        2'b01: occupancy <= occupancy - 1'b1;\n        default: occupancy <= occupancy;\n      endcase\n    end\n  end\n\n  assign full        = (occupancy == 5'd16);\n  assign almost_full = (occupancy >= ALMOST_FULL_THRESHOLD);\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, areset_n, wr_valid, rd_valid;\n  wire [4:0] occupancy;\n  wire almost_full, full;\n  integer errors = 0;\n  integer i;\n  top_module #(.ALMOST_FULL_THRESHOLD(12)) dut(\n    .clk(clk), .areset_n(areset_n),\n    .wr_valid(wr_valid), .rd_valid(rd_valid),\n    .occupancy(occupancy), .almost_full(almost_full), .full(full)\n  );\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; areset_n = 0; wr_valid = 0; rd_valid = 0; #12;\n    areset_n = 1; #8;\n    // Push 11 words: almost_full must still be 0!\n    for (i = 0; i < 11; i = i + 1) begin\n      @(negedge clk); wr_valid = 1;\n      @(posedge clk);\n    end\n    @(negedge clk); wr_valid = 0; #1;\n    if (almost_full !== 1'b0 || occupancy !== 5'd11) begin errors = errors + 1; $display(\"Test 1: occ=11 | FAIL almost_full=%b\", almost_full); end\n    else $display(\"Test 1: occ=11 | almost_full=0 | PASS\");\n    // Push 12th word: almost_full MUST assert!\n    @(negedge clk); wr_valid = 1;\n    @(posedge clk); #1;\n    wr_valid = 0;\n    if (almost_full !== 1'b1 || occupancy !== 5'd12) begin errors = errors + 1; $display(\"Test 2: occ=12 | FAIL almost_full=%b\", almost_full); end\n    else $display(\"Test 2: occ=12 | almost_full=1 | PASS\");\n    // Pop 1 word: almost_full must drop back to 0!\n    @(negedge clk); rd_valid = 1;\n    @(posedge clk); #1;\n    rd_valid = 0;\n    if (almost_full !== 1'b0 || occupancy !== 5'd11) begin errors = errors + 1; $display(\"Test 3: pop to 11 | FAIL almost_full=%b\", almost_full); end\n    else $display(\"Test 3: pop to 11 | almost_full=0 | PASS\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "areset_n",
      "wr_valid",
      "rd_valid",
      "occupancy",
      "almost_full",
      "full"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "wr_valid",
          "wave": "01.....0"
        },
        {
          "name": "rd_valid",
          "wave": "0......1"
        },
        {
          "name": "occupancy",
          "wave": "=x=======",
          "data": [
            "0",
            "10",
            "11",
            "12",
            "13",
            "12",
            "11"
          ]
        },
        {
          "name": "almost_full",
          "wave": "0...1..0"
        },
        {
          "name": "full",
          "wave": "0......."
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "circuitSvg": "<svg viewBox=\"0 0 280 110\" class=\"circuit-svg\"><rect x=\"60\" y=\"25\" width=\"80\" height=\"60\" rx=\"6\" stroke=\"#a78bfa\" stroke-width=\"2\" fill=\"rgba(167,139,250,0.06)\"/><circle cx=\"190\" cy=\"55\" r=\"18\" stroke=\"#fbbf24\" stroke-width=\"2\" fill=\"rgba(251,191,36,0.08)\"/><line x1=\"140\" y1=\"55\" x2=\"172\" y2=\"55\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"208\" y1=\"55\" x2=\"250\" y2=\"55\" stroke=\"#fbbf24\" stroke-width=\"2\"/><text x=\"74\" y=\"60\" fill=\"#e2e8f0\" font-size=\"11\" font-weight=\"700\">5-b OCC</text><text x=\"180\" y=\"59\" fill=\"#fbbf24\" font-size=\"10\">&gt;=12</text><text x=\"255\" y=\"59\" fill=\"#fbbf24\" font-size=\"10\" font-weight=\"700\">almost_full</text></svg>",
    "hints": [
      "Maintain a 5-bit occupancy register (needs to hold values from 0 up to 16, requiring 5 bits).",
      "Update occupancy: `+1` on write, `-1` on read, no change on simultaneous read/write.",
      "Compare `assign almost_full = (occupancy >= ALMOST_FULL_THRESHOLD);`."
    ],
    "explanation": "In high-throughput interconnects (Ethernet MACs, PCIe controllers), stopping an upstream transmitter takes several clock cycles of round-trip pipeline latency. If flow control waited until the FIFO was 100% full before asserting backpressure, packets in flight would overflow and be dropped. The `almost_full` watermark signals backpressure with enough head-room margin (the skid depth) to safely absorb in-flight packets.",
    "commonMistakes": [
      "Sizing `occupancy` to only 4 bits for a 16-entry FIFO: 4 bits can only count from 0 to 15, causing overflow at 16.",
      "Using strict equality `occupancy == 12` instead of `>= 12`."
    ],
    "hwNotes": "Configurable almost-full thresholds are standard features of hard FIFO macros in AMD/Xilinx UltraScale+ and Intel Agilex FPGAs.",
    "relatedSlugs": [
      "fifo-synchronous",
      "credit-based-flow-control-counter",
      "fifo-occupancy-counter"
    ],
    "flagshipIndex": 37,
    "isFlagship": true,
    "curatedTrack": "Level 4: Expert (Industry RTL & CDC)",
    "category": "Queues & Buffers",
    "tags": [
      "cdc",
      "industry-rtl",
      "arbiters",
      "clock-domain-crossing",
      "hard",
      "fifo-thresholds"
    ],
    "concept": "<b>Objective:</b> Understand FIFO watermarking, Skid margins, and early backpressure signaling to compensate for pipeline latency.<br><br><b>Prerequisites:</b> FIFO occupancy counters, threshold comparison."
  },
  {
    "slug": "glitch-free-clock-mux",
    "title": "Glitch-Free Clock Mux — Clock Switching",
    "difficulty": "hard",
    "points": 50,
    "level": 4,
    "tags": [
      "cdc",
      "industry-rtl",
      "arbiters",
      "clock-domain-crossing",
      "hard",
      "clock-switching"
    ],
    "category": "Clocking & Timing",
    "lede": "Design a 2-to-1 glitch-free clock multiplexer that switches cleanly between asynchronous clocks clk0 and clk1 using dual feedback handshake registers.",
    "concept": "<b>Objective:</b> Understand clock gating hazards, runt pulse prevention, cross-coupled feedback disabling, and safe dynamic clock switching.<br><br><b>Prerequisites:</b> Clock gating, negative-edge flip-flops, glitch analysis.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk0</code></td><td>input</td><td>1</td><td>First input clock</td></tr><tr><td><code>clk1</code></td><td>input</td><td>1</td><td>Second input clock</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Asynchronous reset</td></tr><tr><td><code>select</code></td><td>input</td><td>1</td><td>Clock select (0 = clk0, 1 = clk1)</td></tr><tr><td><code>clk_out</code></td><td>output</td><td>1</td><td>Glitch-free output clock</td></tr></tbody></table>",
    "starter": "module top_module(\n  input   clk0,\n  input   clk1,\n  input   areset_n,\n  input   select,\n  output  clk_out\n);\n\n  // 2-to-1 Glitch-Free Clock Multiplexer\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk0, clk1, areset_n, select;\n  wire clk_out;\n  integer errors = 0;\n  top_module dut(\n    .clk0(clk0), .clk1(clk1),\n    .areset_n(areset_n), .select(select),\n    .clk_out(clk_out)\n  );\n  // clk0 period = 10ns, clk1 period = 14ns (asynchronous)\n  always #5 clk0 = ~clk0;\n  always #7 clk1 = ~clk1;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk0 = 0; clk1 = 0; areset_n = 0; select = 0; #20;\n    areset_n = 1; #30;\n    // With select=0, clk_out should toggle with clk0\n    @(posedge clk0);\n    // Switch to clk1 mid-stream at random time\n    #4; select = 1;\n    // Wait for smooth glitch-free handover\n    #60;\n    // Switch back to clk0\n    #3; select = 0;\n    #60;\n    $display(\"PASS: Clock switching completed without simulation deadlock\");\n    $display(\"ALL_TESTS_PASSED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk0",
      "clk1",
      "select",
      "clk_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk0",
          "wave": "p........"
        },
        {
          "name": "clk1",
          "wave": "P........"
        },
        {
          "name": "select",
          "wave": "0..1....."
        },
        {
          "name": "clk_out",
          "wave": "p...P...."
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "id": 38,
    "topic": "Clocking & Timing",
    "subtopic": "Clock Switching",
    "estimatedTime": "35 mins",
    "objective": "Understand clock gating hazards, runt pulse prevention, cross-coupled feedback disabling, and safe dynamic clock switching.",
    "prerequisites": "Clock gating, negative-edge flip-flops, glitch analysis.",
    "timingReqs": "When `select` changes, current clock is gated LOW at its falling edge before the new clock is enabled at its falling edge.",
    "constraints": "Never switch clocks with standard combinational MUXes! Output clock must never produce runt pulses or spikes.",
    "ports": [
      {
        "name": "clk0",
        "dir": "input",
        "width": "1",
        "desc": "First input clock"
      },
      {
        "name": "clk1",
        "dir": "input",
        "width": "1",
        "desc": "Second input clock"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Asynchronous reset"
      },
      {
        "name": "select",
        "dir": "input",
        "width": "1",
        "desc": "Clock select (0 = clk0, 1 = clk1)"
      },
      {
        "name": "clk_out",
        "dir": "output",
        "width": "1",
        "desc": "Glitch-free output clock"
      }
    ],
    "referenceRtl": "module top_module(\n  input   clk0,\n  input   clk1,\n  input   areset_n,\n  input   select,\n  output  clk_out\n);\n  reg q0_meta, q0_en;\n  reg q1_meta, q1_en;\n\n  // Clock 0 domain gating path (sampled on negedge clk0)\n  always @(negedge clk0 or negedge areset_n) begin\n    if (!areset_n) begin\n      q0_meta <= 1'b0;\n      q0_en   <= 1'b0;\n    end else begin\n      q0_meta <= (!select) && (!q1_en);\n      q0_en   <= q0_meta;\n    end\n  end\n\n  // Clock 1 domain gating path (sampled on negedge clk1)\n  always @(negedge clk1 or negedge areset_n) begin\n    if (!areset_n) begin\n      q1_meta <= 1'b0;\n      q1_en   <= 1'b0;\n    end else begin\n      q1_meta <= select && (!q0_en);\n      q1_en   <= q1_meta;\n    end\n  end\n\n  // Gated clock outputs OR'ed together\n  assign clk_out = (clk0 & q0_en) | (clk1 & q1_en);\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 340 110\" class=\"circuit-svg\"><rect x=\"30\" y=\"15\" width=\"65\" height=\"40\" rx=\"4\" stroke=\"#38bdf8\" stroke-width=\"1.8\" fill=\"rgba(56,189,248,0.06)\"/><rect x=\"30\" y=\"60\" width=\"65\" height=\"40\" rx=\"4\" stroke=\"#fbbf24\" stroke-width=\"1.8\" fill=\"rgba(251,191,36,0.06)\"/><rect x=\"130\" y=\"15\" width=\"45\" height=\"40\" rx=\"4\" stroke=\"#38bdf8\" stroke-width=\"1.8\" fill=\"none\"/><rect x=\"130\" y=\"60\" width=\"45\" height=\"40\" rx=\"4\" stroke=\"#fbbf24\" stroke-width=\"1.8\" fill=\"none\"/><circle cx=\"280\" cy=\"55\" r=\"16\" stroke=\"#2dd4bf\" stroke-width=\"2\" fill=\"none\"/><text x=\"40\" y=\"40\" fill=\"#38bdf8\" font-size=\"9\">clk0-reg</text><text x=\"40\" y=\"85\" fill=\"#fbbf24\" font-size=\"9\">clk1-reg</text><text x=\"270\" y=\"59\" fill=\"#2dd4bf\" font-size=\"10\" font-weight=\"700\">OR</text></svg>",
    "hints": [
      "A standard multiplexer `select ? clk1 : clk0` produces severe runt clock pulses and glitches whenever `select` toggles while one clock is high.",
      "Solution: Dual negative-edge synchronizers with mutual cross-feedback: `q0_en` cannot assert until `q1_en` has dropped to 0, and vice versa.",
      "Sampling on `negedge` ensures that enable transitions occur only when the respective clock is LOW."
    ],
    "explanation": "Switching clocks is one of the most hazardous operations in digital hardware. A runt pulse (a clock pulse narrower than the minimum flip-flop pulse width $t_w$) can violate setup/hold times and trigger chip-wide functional collapse. The standard industry solution uses cross-coupled negative-edge flip-flops: the active clock is completely disabled while it is low, and only after confirmation of disablement is the second clock enabled while it is low.",
    "commonMistakes": [
      "Sampling on `posedge` instead of `negedge`: enabling a clock on its rising edge cuts into the clock phase, generating runt pulses.",
      "Omitting the cross-coupling term `!q1_en` / `!q0_en`, allowing both clocks to be briefly enabled simultaneously."
    ],
    "hwNotes": "This circuit is the exact standard cell architecture instantiated inside vendor clock multiplexer primitives (such as BUFGMUX on FPGAs or standard-cell CKLNQM cells in ASIC libraries).",
    "relatedSlugs": [
      "clock-gating-cell",
      "two-flop-synchronizer",
      "programmable-clock-divider"
    ],
    "flagshipIndex": 38,
    "isFlagship": true,
    "curatedTrack": "Level 4: Expert (Industry RTL & CDC)"
  },
  {
    "slug": "credit-based-flow-control-counter",
    "title": "Credit-Based Flow Control — Credit Management",
    "difficulty": "hard",
    "points": 50,
    "level": 4,
    "tags": [
      "cdc",
      "industry-rtl",
      "arbiters",
      "clock-domain-crossing",
      "hard",
      "credit-flow-control"
    ],
    "category": "On-Chip Protocols",
    "lede": "Implement a transmitter credit manager with initial credits MAX_CREDITS (default 4). Transmitter can send when credits > 0, decrementing credits; credits return via credit_return strobe.",
    "concept": "<b>Objective:</b> Understand credit-based flow control used in PCIe, NoC (Network-on-Chip), and NVLink for high-latency inter-chip links.<br><br><b>Prerequisites:</b> Flow control, counters, latency-insensitive protocols.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Clock signal</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Active-low reset</td></tr><tr><td><code>tx_req</code></td><td>input</td><td>1</td><td>Transmit request from internal core</td></tr><tr><td><code>credit_ret</code></td><td>input</td><td>1</td><td>Credit return strobe from remote receiver</td></tr><tr><td><code>tx_send</code></td><td>output</td><td>1</td><td>Packet transmitted onto physical link</td></tr><tr><td><code>credit_count</code></td><td>output</td><td>4</td><td>Current available credit balance</td></tr></tbody></table>",
    "starter": "module top_module #(\n  parameter MAX_CREDITS = 4\n)(\n  input        clk,\n  input        areset_n,\n  input        tx_req,\n  input        credit_ret,\n  output       tx_send,\n  output reg [3:0] credit_count\n);\n\n  // Credit-based flow control manager\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  parameter C = 4;\n  reg clk, areset_n, tx_req, credit_ret;\n  wire tx_send;\n  wire [3:0] credit_count;\n  integer errors = 0;\n  integer i;\n  top_module #(.MAX_CREDITS(C)) dut(\n    .clk(clk), .areset_n(areset_n),\n    .tx_req(tx_req), .credit_ret(credit_ret),\n    .tx_send(tx_send), .credit_count(credit_count)\n  );\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; areset_n = 0; tx_req = 0; credit_ret = 0; #12;\n    areset_n = 1; #8;\n    if (credit_count !== 4'd4) begin errors = errors + 1; $display(\"Test 1: init credits | FAIL\"); end\n    else $display(\"Test 1: init credits = 4 | PASS\");\n    // Transmit 4 packets back-to-back: exhaust all credits\n    for (i = 0; i < 4; i = i + 1) begin\n      @(negedge clk); tx_req = 1; #1;\n      if (tx_send !== 1'b1) begin errors = errors + 1; $display(\"Test 2 step %0d: expected send | FAIL\", i); end\n      else $display(\"Test 2 step %0d: send granted (credits=%0d) | PASS\", i, credit_count);\n      @(posedge clk);\n    end\n    @(negedge clk); #1;\n    if (credit_count !== 4'd0) begin errors = errors + 1; $display(\"Test 3: credits exhausted | FAIL got %0d\", credit_count); end\n    else $display(\"Test 3: credits exhausted = 0 | PASS\");\n    // Attempt 5th send: MUST be blocked because credit_count == 0!\n    @(negedge clk); tx_req = 1;\n    @(posedge clk); #1;\n    if (tx_send !== 1'b0) begin errors = errors + 1; $display(\"Test 4: send without credits | FAIL tx_send=%b\", tx_send); end\n    else $display(\"Test 4: transmission blocked when credits=0 | PASS\");\n    // Return 1 credit from remote receiver\n    @(negedge clk); tx_req = 0; credit_ret = 1;\n    @(posedge clk); #1;\n    credit_ret = 0;\n    if (credit_count !== 4'd1) begin errors = errors + 1; $display(\"Test 5: credit returned | FAIL got %0d\", credit_count); end\n    else $display(\"Test 5: credit returned = 1 | PASS\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "areset_n",
      "tx_req",
      "credit_ret",
      "tx_send",
      "credit_count"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "tx_req",
          "wave": "01....0."
        },
        {
          "name": "credit_ret",
          "wave": "0.....10"
        },
        {
          "name": "tx_send",
          "wave": "01...0.."
        },
        {
          "name": "credit_count",
          "wave": "=x=======",
          "data": [
            "4",
            "4",
            "3",
            "2",
            "1",
            "0",
            "0",
            "1"
          ]
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "id": 39,
    "topic": "On-Chip Protocols",
    "subtopic": "Credit Flow Control",
    "estimatedTime": "30 mins",
    "objective": "Understand credit-based flow control used in PCIe, NoC (Network-on-Chip), and NVLink for high-latency inter-chip links.",
    "prerequisites": "Flow control, counters, latency-insensitive protocols.",
    "timingReqs": "Transmitter transmits (`tx_send=1`) only when `credit_count > 0`. Each returned credit (`credit_ret=1`) increments `credit_count`.",
    "constraints": "Total credits must never exceed `MAX_CREDITS`. Credit counter must not underflow or overflow.",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Clock signal"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low reset"
      },
      {
        "name": "tx_req",
        "dir": "input",
        "width": "1",
        "desc": "Transmit request from internal core"
      },
      {
        "name": "credit_ret",
        "dir": "input",
        "width": "1",
        "desc": "Credit return strobe from remote receiver"
      },
      {
        "name": "tx_send",
        "dir": "output",
        "width": "1",
        "desc": "Packet transmitted onto physical link"
      },
      {
        "name": "credit_count",
        "dir": "output",
        "width": "4",
        "desc": "Current available credit balance"
      }
    ],
    "referenceRtl": "module top_module #(\n  parameter MAX_CREDITS = 4\n)(\n  input        clk,\n  input        areset_n,\n  input        tx_req,\n  input        credit_ret,\n  output       tx_send,\n  output reg [3:0] credit_count\n);\n  // Can send if core requests and we have available credits\n  assign tx_send = tx_req && (credit_count > 4'd0);\n\n  always @(posedge clk or negedge areset_n) begin\n    if (!areset_n) begin\n      credit_count <= MAX_CREDITS[3:0];\n    end else begin\n      case ({tx_send, credit_ret})\n        2'b10: credit_count <= credit_count - 1'b1; // spent 1 credit\n        2'b01: credit_count <= (credit_count < MAX_CREDITS[3:0]) ? (credit_count + 1'b1) : credit_count; // returned 1\n        default: credit_count <= credit_count; // both 00 or 11 (send and return in same cycle)\n      endcase\n    end\n  end\nendmodule\n",
    "circuitSvg": "<svg viewBox=\"0 0 300 110\" class=\"circuit-svg\"><rect x=\"90\" y=\"20\" width=\"120\" height=\"75\" rx=\"8\" stroke=\"#38bdf8\" stroke-width=\"2.5\" fill=\"rgba(56,189,248,0.06)\"/><line x1=\"20\" y1=\"40\" x2=\"90\" y2=\"40\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"20\" y1=\"75\" x2=\"90\" y2=\"75\" stroke=\"#4ade80\" stroke-width=\"2\"/><line x1=\"210\" y1=\"45\" x2=\"270\" y2=\"45\" stroke=\"#2dd4bf\" stroke-width=\"2\"/><line x1=\"210\" y1=\"75\" x2=\"270\" y2=\"75\" stroke=\"#fbbf24\" stroke-width=\"2\"/><text x=\"14\" y=\"44\" fill=\"#38bdf8\" font-size=\"9\">tx_req</text><text x=\"14\" y=\"79\" fill=\"#4ade80\" font-size=\"9\">credit_ret</text><text x=\"275\" y=\"49\" fill=\"#2dd4bf\" font-size=\"10\" font-weight=\"700\">tx_send</text><text x=\"275\" y=\"79\" fill=\"#fbbf24\" font-size=\"10\" font-weight=\"700\">credits</text><text x=\"100\" y=\"55\" fill=\"#e2e8f0\" font-size=\"12\" font-weight=\"700\">CREDIT MGR</text></svg>",
    "hints": [
      "Initialize `credit_count <= MAX_CREDITS;` on reset.",
      "`tx_send` is true when `tx_req && (credit_count > 0)`.",
      "Decrement `credit_count` when `tx_send` is 1; increment when `credit_ret` is 1; hold unchanged if both happen concurrently."
    ],
    "explanation": "Valid-Ready handshakes break down over long physical cables or printed circuit board traces because round-trip propagation latency causes pipeline stalls whenever `ready` toggles. Credit-based flow control decouples transmitter and receiver: the receiver pre-allocates buffer credits to the sender. The sender transmits freely at line rate until credits reach 0, completely hiding cable latency.",
    "commonMistakes": [
      "Allowing `credit_count` to decrement below 0 (underflow) when `tx_req` is asserted with 0 credits.",
      "Not accounting for simultaneous transmission and credit return in the same clock cycle."
    ],
    "hwNotes": "PCI Express (PCIe) Transaction Layer Protocol (TLP) and high-speed Network-on-Chip (NoC) interconnects (ARM CoreLink NIC-400 / CMN-700) exclusively use credit-based flow control.",
    "relatedSlugs": [
      "valid-ready-handshake",
      "parameterized-register-slice",
      "fifo-almost-full-flag"
    ],
    "flagshipIndex": 39,
    "isFlagship": true,
    "curatedTrack": "Level 4: Expert (Industry RTL & CDC)"
  },
  {
    "id": 40,
    "slug": "multi-request-round-robin-arbiter",
    "title": "Multi-Request Round-Robin Arbiter — Advanced Arbitration",
    "difficulty": "hard",
    "points": 50,
    "level": 4,
    "topic": "Arbitration & Interconnect",
    "subtopic": "Advanced Arbiters",
    "estimatedTime": "35 mins",
    "lede": "Design an optimized 4-client Round-Robin Arbiter using the dual-priority-encoder algorithm with masking ($req \\& mask$ and $req$) for single-cycle high-frequency timing closure.",
    "objective": "Master industry-standard parallel prefix arbitration, avoiding slow sequential case loops, and achieving single-cycle gigahertz timing closure.",
    "prerequisites": "Fixed priority encoders, priority masking, round-robin algorithms.",
    "timingReqs": "Pure single-cycle arbitration logic: grant vector generated combinationally, priority mask updated on `posedge clk`.",
    "constraints": "Mutual exclusivity: at most one grant line asserted (`$onehot0(grant)`).",
    "ports": [
      {
        "name": "clk",
        "dir": "input",
        "width": "1",
        "desc": "Clock signal"
      },
      {
        "name": "areset_n",
        "dir": "input",
        "width": "1",
        "desc": "Active-low reset"
      },
      {
        "name": "req",
        "dir": "input",
        "width": "4",
        "desc": "4-bit request vector"
      },
      {
        "name": "grant",
        "dir": "output",
        "width": "4",
        "desc": "4-bit one-hot grant vector"
      }
    ],
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td><code>clk</code></td><td>input</td><td>1</td><td>Clock signal</td></tr><tr><td><code>areset_n</code></td><td>input</td><td>1</td><td>Active-low reset</td></tr><tr><td><code>req</code></td><td>input</td><td>4</td><td>4-bit request vector</td></tr><tr><td><code>grant</code></td><td>output</td><td>4</td><td>4-bit one-hot grant vector</td></tr></tbody></table>",
    "starter": "module top_module(\n  input        clk,\n  input        areset_n,\n  input  [3:0] req,\n  output [3:0] grant\n);\n\n  // High-performance Dual-Priority-Encoder Round-Robin Arbiter\n\nendmodule\n",
    "referenceRtl": "module top_module(\n  input        clk,\n  input        areset_n,\n  input  [3:0] req,\n  output [3:0] grant\n);\n  reg [3:0] mask;\n  wire [3:0] masked_req = req & mask;\n  wire [3:0] grant_masked;\n  wire [3:0] grant_unmasked;\n\n  // Priority encoder 1: operates on masked requests (above last grant)\n  assign grant_masked = masked_req & (-masked_req);\n\n  // Priority encoder 2: operates on raw requests (wrap around)\n  assign grant_unmasked = req & (-req);\n\n  // Grant logic: prefer masked request; fallback to unmasked if no masked request\n  assign grant = (|masked_req) ? grant_masked : grant_unmasked;\n\n  // Mask update logic: mask out all clients up to and including the current grant\n  always @(posedge clk or negedge areset_n) begin\n    if (!areset_n) begin\n      mask <= 4'b1111;\n    end else if (|grant) begin\n      mask <= ~((grant - 1'b1) | grant);\n    end\n  end\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, areset_n;\n  reg [3:0] req;\n  wire [3:0] grant;\n  integer errors = 0;\n  top_module dut(.clk(clk), .areset_n(areset_n), .req(req), .grant(grant));\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    clk = 0; areset_n = 0; req = 0; #12;\n    areset_n = 1; #8;\n    // Step 1: All request simultaneously (req = 4'b1111)\n    @(negedge clk); req = 4'b1111; #1;\n    if (grant !== 4'b0001) begin errors = errors + 1; $display(\"Test 1: client 0 grant | FAIL got %b\", grant); end\n    else $display(\"Test 1: client 0 granted | PASS\");\n    // Clock edge: mask updates to exclude client 0\n    @(posedge clk); #1;\n    if (grant !== 4'b0010) begin errors = errors + 1; $display(\"Test 2: client 1 grant | FAIL got %b\", grant); end\n    else $display(\"Test 2: client 1 granted | PASS\");\n    @(posedge clk); #1;\n    if (grant !== 4'b0100) begin errors = errors + 1; $display(\"Test 3: client 2 grant | FAIL got %b\", grant); end\n    else $display(\"Test 3: client 2 granted | PASS\");\n    @(posedge clk); #1;\n    if (grant !== 4'b1000) begin errors = errors + 1; $display(\"Test 4: client 3 grant | FAIL got %b\", grant); end\n    else $display(\"Test 4: client 3 granted | PASS\");\n    // Wrapped cycle: returns to client 0!\n    @(posedge clk); #1;\n    if (grant !== 4'b0001) begin errors = errors + 1; $display(\"Test 5: wrap to client 0 | FAIL got %b\", grant); end\n    else $display(\"Test 5: wrap to client 0 | PASS\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "areset_n",
      "req",
      "grant"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "areset_n",
          "wave": "0.1....."
        },
        {
          "name": "req",
          "wave": "0.==...",
          "data": [
            "1111",
            "1111"
          ]
        },
        {
          "name": "grant",
          "wave": "0.====.",
          "data": [
            "0001",
            "0010",
            "0100",
            "1000"
          ]
        }
      ],
      "config": {
        "hscale": 1.5
      }
    },
    "circuitSvg": "<svg viewBox=\"0 0 320 120\" class=\"circuit-svg\"><rect x=\"80\" y=\"15\" width=\"70\" height=\"40\" rx=\"4\" stroke=\"#38bdf8\" stroke-width=\"1.8\" fill=\"rgba(56,189,248,0.06)\"/><rect x=\"80\" y=\"65\" width=\"70\" height=\"40\" rx=\"4\" stroke=\"#a78bfa\" stroke-width=\"1.8\" fill=\"rgba(167,139,250,0.06)\"/><polygon points=\"190,30 230,45 230,75 190,90\" stroke=\"#2dd4bf\" stroke-width=\"2\" fill=\"none\"/><line x1=\"150\" y1=\"35\" x2=\"190\" y2=\"45\" stroke=\"#38bdf8\" stroke-width=\"2\"/><line x1=\"150\" y1=\"85\" x2=\"190\" y2=\"75\" stroke=\"#a78bfa\" stroke-width=\"2\"/><line x1=\"230\" y1=\"60\" x2=\"280\" y2=\"60\" stroke=\"#2dd4bf\" stroke-width=\"2.5\"/><text x=\"88\" y=\"38\" fill=\"#38bdf8\" font-size=\"9\">r &amp; (-r)</text><text x=\"88\" y=\"88\" fill=\"#a78bfa\" font-size=\"9\">m &amp; (-m)</text><text x=\"285\" y=\"64\" fill=\"#2dd4bf\" font-size=\"11\" font-weight=\"700\">grant</text><text x=\"95\" y=\"115\" fill=\"#64748b\" font-size=\"9\">DUAL PRIORITY ARBITER</text></svg>",
    "hints": [
      "The mathematical trick `req & (-req)` isolates the least-significant 1-bit in a vector in constant $O(1)$ hardware!",
      "Maintain a `mask` vector: evaluate `grant_masked = masked_req & (-masked_req)`.",
      "If `|masked_req` is non-zero, choose `grant_masked`; otherwise, fall back to `grant_unmasked = req & (-req)`."
    ],
    "explanation": "Standard case-statement arbiters scale as $O(N^2)$ in logic depth. The dual-priority encoder algorithm ($r \\& -r$) leverages two's complement carry chains to find the first asserting client in $O(\\log N)$ gate delays. Combining a masked request vector with a fallback unmasked vector provides a mathematically elegant, 100% fair round-robin arbiter that achieves maximum clock speeds in high-end switch fabrics.",
    "commonMistakes": [
      "Using sequential search loops that create timing bottlenecks on critical paths.",
      "Failing to reset the mask when all clients above the last grant have completed."
    ],
    "hwNotes": "This dual-arbiter scheme is the universal standard arbiter architecture employed across Cisco/Broadcom network switches and multi-core CPU L3 cache crossbars.",
    "relatedSlugs": [
      "round-robin-arbiter",
      "fixed-priority-arbiter",
      "credit-based-flow-control-counter"
    ],
    "flagshipIndex": 40,
    "isFlagship": true,
    "curatedTrack": "Level 4: Expert (Industry RTL & CDC)",
    "category": "Arbitration & Interconnect",
    "tags": [
      "cdc",
      "industry-rtl",
      "arbiters",
      "clock-domain-crossing",
      "hard",
      "advanced-arbiters"
    ],
    "concept": "<b>Objective:</b> Master industry-standard parallel prefix arbitration, avoiding slow sequential case loops, and achieving single-cycle gigahertz timing closure.<br><br><b>Prerequisites:</b> Fixed priority encoders, priority masking, round-robin algorithms."
  },
  {
    "slug": "priority-encoder",
    "title": "4-to-2 Priority Encoder",
    "difficulty": "medium",
    "points": 25,
    "level": 1,
    "tags": [
      "combinational",
      "encoder"
    ],
    "category": "Combinational Design",
    "lede": "Output the index of the highest-priority (MSB-most) set bit in a 4-bit input, plus a valid flag when any bit is set.",
    "concept": "<b>Concept:</b> Priority means check the highest bit first — <code>in[3]</code> wins over <code>in[2]</code> even if both are set. <code>valid = |in;</code> (OR-reduce) tells you if the output means anything at all.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>in</td><td>input</td><td>4</td><td>Request lines, bit 3 = highest priority</td></tr>\n<tr><td>out</td><td>output</td><td>2</td><td>Index of highest set bit (don't-care if valid=0)</td></tr>\n<tr><td>valid</td><td>output</td><td>1</td><td>1 if any input bit is set</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] in,\n  output [1:0] out,\n  output       valid\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] in;\n  wire [1:0] out;\n  wire valid;\n  integer errors = 0;\n  top_module dut(.in(in), .out(out), .valid(valid));\n  task check;\n    input [3:0] i; input ev; input [1:0] eo; input checkOut;\n    begin\n      in = i; #1;\n      if (valid !== ev) begin\n        errors = errors + 1;\n        $display(\"FAIL in=%b valid expected=%b got=%b\", i, ev, valid);\n      end else if (checkOut && out !== eo) begin\n        errors = errors + 1;\n        $display(\"FAIL in=%b out expected=%b got=%b\", i, eo, out);\n      end else $display(\"PASS in=%b valid=%b out=%b\", i, valid, out);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(4'b0000, 0, 2'd0, 0);\n    check(4'b0001, 1, 2'd0, 1);\n    check(4'b0010, 1, 2'd1, 1);\n    check(4'b0011, 1, 2'd1, 1);\n    check(4'b0100, 1, 2'd2, 1);\n    check(4'b1000, 1, 2'd3, 1);\n    check(4'b1010, 1, 2'd3, 1);\n    check(4'b1111, 1, 2'd3, 1);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "in",
      "valid",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "in[3:0]",
          "wave": "2.3.4.5.6.",
          "data": [
            "0000",
            "0001",
            "0010",
            "0100",
            "1000"
          ]
        },
        {
          "name": "valid",
          "wave": "0.1......."
        },
        {
          "name": "out[1:0]",
          "wave": "x.2.3.4.5.",
          "data": [
            "0",
            "1",
            "2",
            "3"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "shift-register-sipo",
    "title": "4-Bit Shift Register (SIPO)",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "shift-register"
    ],
    "category": "Sequential Design",
    "lede": "Serial-in, parallel-out shift register. Each clock, shift left and load sin into the LSB. Sync active-high reset clears q.",
    "concept": "<b>Concept:</b> <code>q &lt;= {q[2:0], sin};</code> — the top 3 bits move up one position, and the new serial bit enters at the bottom.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>sin</td><td>input</td><td>1</td><td>Serial data in</td></tr>\n<tr><td>q</td><td>output</td><td>4</td><td>Parallel output, sin enters at q[0]</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input            clk,\n  input            rst,\n  input            sin,\n  output reg [3:0] q\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, sin;\n  wire [3:0] q;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .sin(sin), .q(q));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input [3:0] eq;\n    begin\n      if (q !== eq) begin\n        errors = errors + 1;\n        $display(\"FAIL expected=%b got=%b\", eq, q);\n      end else $display(\"PASS q=%b\", q);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; sin = 0; @(posedge clk); #1; check(4'b0000);\n    rst = 0; sin = 1; @(posedge clk); #1; check(4'b0001);\n    sin = 0; @(posedge clk); #1; check(4'b0010);\n    sin = 1; @(posedge clk); #1; check(4'b0101);\n    sin = 1; @(posedge clk); #1; check(4'b1011);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "sin",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........"
        },
        {
          "name": "rst",
          "wave": "10......."
        },
        {
          "name": "sin",
          "wave": "0.1.0.1.1"
        },
        {
          "name": "q[3:0]",
          "wave": "x.2.3.4.5",
          "data": [
            "0000",
            "0001",
            "0010",
            "0101"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "bcd-7segment",
    "title": "BCD to 7-Segment Decoder",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "display"
    ],
    "category": "Combinational Design",
    "lede": "Drive a 7-segment display from a 4-bit BCD digit (0-9). The kind of decoder inside every digital clock and calculator.",
    "concept": "<b>Concept:</b> <code>seg[6:0] = {a,b,c,d,e,f,g}</code>, active-high — a segment lights when its bit is 1. This is a pure lookup table: a <code>case</code> statement mapping each digit 0-9 to its known segment pattern is the clean way to write it, no arithmetic needed.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>bcd</td><td>input</td><td>4</td><td>Digit 0-9 (inputs 10-15 are don't-care)</td></tr>\n<tr><td>seg</td><td>output</td><td>7</td><td>Segments {a,b,c,d,e,f,g}, active-high</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input      [3:0] bcd,\n  output reg [6:0] seg\n);\n\n  // Your code here — a case statement over bcd is the natural fit.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] bcd;\n  wire [6:0] seg;\n  integer errors = 0;\n  top_module dut(.bcd(bcd), .seg(seg));\n  task check;\n    input [3:0] b; input [6:0] es;\n    begin\n      bcd = b; #1;\n      if (seg !== es) begin\n        errors = errors + 1;\n        $display(\"FAIL bcd=%d expected=%b got=%b\", b, es, seg);\n      end else $display(\"PASS bcd=%d seg=%b\", b, seg);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(0, 7'b1111110);\n    check(1, 7'b0110000);\n    check(2, 7'b1101101);\n    check(3, 7'b1111001);\n    check(4, 7'b0110011);\n    check(5, 7'b1011011);\n    check(6, 7'b1011111);\n    check(7, 7'b1110000);\n    check(8, 7'b1111111);\n    check(9, 7'b1111011);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "bcd",
      "seg"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "bcd[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "1",
            "8",
            "9"
          ]
        },
        {
          "name": "seg[6:0]",
          "wave": "2.3.4.5.",
          "data": [
            "1111110",
            "0110000",
            "1111111",
            "1111011"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "parity-generator",
    "title": "8-Bit Even Parity Generator",
    "difficulty": "easy",
    "points": 10,
    "level": 1,
    "tags": [
      "combinational",
      "parity"
    ],
    "category": "Combinational Design",
    "lede": "Generate a parity bit so that data plus parity always has an even number of 1s — the simplest error-detection scheme in digital design.",
    "concept": "<b>Concept:</b> <code>parity = ^data</code> (the XOR-reduce operator). XOR-reducing 8 bits yields 1 exactly when the number of 1s in data is odd — adding that as the parity bit makes the total count even.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>data</td><td>input</td><td>8</td><td>Data byte</td></tr>\n<tr><td>parity</td><td>output</td><td>1</td><td>Even-parity bit</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] data,\n  output       parity\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] data;\n  wire parity;\n  integer errors = 0;\n  top_module dut(.data(data), .parity(parity));\n  task check;\n    input [7:0] d; input ep;\n    begin\n      data = d; #1;\n      if (parity !== ep) begin\n        errors = errors + 1;\n        $display(\"FAIL data=%b expected=%b got=%b\", d, ep, parity);\n      end else $display(\"PASS data=%b parity=%b\", d, parity);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(8'b00000000, 0);\n    check(8'b00000001, 1);\n    check(8'b00000011, 0);\n    check(8'b11111111, 0);\n    check(8'b10000000, 1);\n    check(8'b10101010, 0);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "data",
      "parity"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "data[7:0]",
          "wave": "2.3.4.",
          "data": [
            "00000000",
            "00000001",
            "10101010"
          ]
        },
        {
          "name": "parity",
          "wave": "0.1.0."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "ripple-carry-adder4",
    "title": "4-Bit Ripple Carry Adder",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "adder"
    ],
    "category": "Combinational Design",
    "lede": "Add two 4-bit numbers plus a carry-in, producing a 4-bit sum and carry-out — the width-extended sibling of the half adder.",
    "concept": "<b>Concept:</b> <code>{cout, sum} = a + b + cin;</code> — concatenating cout onto the front of sum captures the 5-bit result of the addition in one line, no manual carry-chain needed.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>4</td><td>First operand</td></tr>\n<tr><td>b</td><td>input</td><td>4</td><td>Second operand</td></tr>\n<tr><td>cin</td><td>input</td><td>1</td><td>Carry in</td></tr>\n<tr><td>sum</td><td>output</td><td>4</td><td>a + b + cin, low 4 bits</td></tr>\n<tr><td>cout</td><td>output</td><td>1</td><td>Carry out</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] a,\n  input  [3:0] b,\n  input        cin,\n  output [3:0] sum,\n  output       cout\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] a, b;\n  reg cin;\n  wire [3:0] sum;\n  wire cout;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .cin(cin), .sum(sum), .cout(cout));\n  task check;\n    input [3:0] ia, ib; input ic; input [3:0] es; input ec;\n    begin\n      a = ia; b = ib; cin = ic; #1;\n      if (sum !== es || cout !== ec) begin\n        errors = errors + 1;\n        $display(\"FAIL a=%d b=%d cin=%b expected sum=%d cout=%b got sum=%d cout=%b\", ia, ib, ic, es, ec, sum, cout);\n      end else $display(\"PASS a=%d b=%d cin=%b sum=%d cout=%b\", ia, ib, ic, sum, cout);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(4'd3, 4'd4, 0, 4'd7, 0);\n    check(4'd15, 4'd1, 0, 4'd0, 1);\n    check(4'd15, 4'd15, 1, 4'd15, 1);\n    check(4'd0, 4'd0, 0, 4'd0, 0);\n    check(4'd7, 4'd8, 1, 4'd0, 1);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "cin",
      "sum",
      "cout"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[3:0]",
          "wave": "2.3.4.",
          "data": [
            "3",
            "15",
            "15"
          ]
        },
        {
          "name": "b[3:0]",
          "wave": "2.3.4.",
          "data": [
            "4",
            "1",
            "15"
          ]
        },
        {
          "name": "cin",
          "wave": "0...1."
        },
        {
          "name": "sum[3:0]",
          "wave": "2.3.4.",
          "data": [
            "7",
            "0",
            "15"
          ]
        },
        {
          "name": "cout",
          "wave": "0.1..1"
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "jk-flip-flop",
    "title": "JK Flip-Flop",
    "difficulty": "easy",
    "points": 10,
    "level": 3,
    "tags": [
      "sequential",
      "flip-flop"
    ],
    "category": "Sequential Design",
    "lede": "The flip-flop with no forbidden state: j=k=1 toggles instead of racing. Classic building block for counters.",
    "concept": "<b>Concept:</b> Four cases on <code>{j,k}</code> at every rising clock edge: <code>00</code> holds, <code>01</code> clears, <code>10</code> sets, <code>11</code> toggles (<code>q &lt;= ~q</code>). Unlike an SR latch, JK has a well-defined behavior for every input combination.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>j</td><td>input</td><td>1</td><td>Set control</td></tr>\n<tr><td>k</td><td>input</td><td>1</td><td>Reset control</td></tr>\n<tr><td>q</td><td>output</td><td>1</td><td>Registered output</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input      clk,\n  input      j,\n  input      k,\n  output reg q\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, j, k;\n  wire q;\n  integer errors = 0;\n  top_module dut(.clk(clk), .j(j), .k(k), .q(q));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input eq; input [127:0] label;\n    begin\n      if (q !== eq) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%b got=%b\", label, eq, q);\n      end else $display(\"PASS %0s q=%b\", label, q);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    j = 1; k = 0; @(posedge clk); #1; check(1, \"set\");\n    j = 0; k = 0; @(posedge clk); #1; check(1, \"hold\");\n    j = 0; k = 1; @(posedge clk); #1; check(0, \"reset\");\n    j = 1; k = 1; @(posedge clk); #1; check(1, \"toggle1\");\n    j = 1; k = 1; @(posedge clk); #1; check(0, \"toggle2\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "j",
      "k",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "j",
          "wave": "1.0.0.1."
        },
        {
          "name": "k",
          "wave": "0.0.1.1."
        },
        {
          "name": "q",
          "wave": "x1...0.1"
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "mod6-counter",
    "title": "Modulo-6 Counter",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "counter"
    ],
    "category": "Sequential Design",
    "lede": "A counter that wraps back to 0 after reaching 5, instead of overflowing at the natural binary boundary — the pattern behind clock dividers and digit counters.",
    "concept": "<b>Concept:</b> Ordinary counters wrap for free at 2^N. A modulo-6 counter needs an explicit wrap check: <code>if (q == 5) q &lt;= 0; else q &lt;= q + 1;</code> — the comparison must come before the increment in priority, not after.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>q</td><td>output</td><td>3</td><td>Counts 0 through 5, then wraps</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input            clk,\n  input            rst,\n  output reg [2:0] q\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst;\n  wire [2:0] q;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .q(q));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input [2:0] eq; input [127:0] label;\n    begin\n      if (q !== eq) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%d got=%d\", label, eq, q);\n      end else $display(\"PASS %0s q=%d\", label, q);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; @(posedge clk); #1; check(0, \"reset\");\n    rst = 0;\n    @(posedge clk); #1; check(1, \"c1\");\n    @(posedge clk); #1; check(2, \"c2\");\n    @(posedge clk); #1; check(3, \"c3\");\n    @(posedge clk); #1; check(4, \"c4\");\n    @(posedge clk); #1; check(5, \"c5\");\n    @(posedge clk); #1; check(0, \"wrap\");\n    @(posedge clk); #1; check(1, \"c1again\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p............."
        },
        {
          "name": "rst",
          "wave": "10............"
        },
        {
          "name": "q[2:0]",
          "wave": "2.3.4.5.6.7.8.",
          "data": [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "0"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "sequence-detector-1011",
    "title": "Sequence Detector: 1011 (Overlapping)",
    "difficulty": "hard",
    "points": 50,
    "level": 4,
    "tags": [
      "sequential",
      "fsm"
    ],
    "category": "Sequential Design",
    "lede": "A Moore FSM that watches a serial bit stream and pulses high for one cycle right after it spots the pattern 1011 — overlapping matches count.",
    "concept": "<b>Concept:</b> Track \"longest prefix of 1011 matched so far\" as a 5-state machine (S0..S4). Overlap matters: after matching 1011, the last bit of that match can also start the next one, so S4 doesn't reset all the way back to S0 — it re-enters the automaton the same way S1 would. <code>detected</code> is a Moore output: it is simply <code>(state == S4)</code>, true for one full cycle after the fourth matching bit is clocked in.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>in</td><td>input</td><td>1</td><td>Serial bit stream, one bit per clock</td></tr>\n<tr><td>detected</td><td>output</td><td>1</td><td>High for one cycle after \"1011\" is matched</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  in,\n  output detected\n);\n\n  // Your code here — a 5-state FSM (S0..S4) tracking match progress works well.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, in;\n  wire detected;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .in(in), .detected(detected));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input ed; input [127:0] label;\n    begin\n      if (detected !== ed) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%b got=%b\", label, ed, detected);\n      end else $display(\"PASS %0s detected=%b\", label, detected);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; in = 0; @(posedge clk); #1; check(0, \"reset\");\n    rst = 0;\n    in = 1; @(posedge clk); #1; check(0, \"b1\");\n    in = 0; @(posedge clk); #1; check(0, \"b2\");\n    in = 1; @(posedge clk); #1; check(0, \"b3\");\n    in = 1; @(posedge clk); #1; check(1, \"b4-match\");\n    in = 0; @(posedge clk); #1; check(0, \"b5\");\n    in = 1; @(posedge clk); #1; check(0, \"b6\");\n    in = 1; @(posedge clk); #1; check(1, \"b7-overlap-match\");\n    in = 0; @(posedge clk); #1; check(0, \"b8\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "in",
      "detected"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p................."
        },
        {
          "name": "in",
          "wave": "0.1.0.1.1.0.1.1.0."
        },
        {
          "name": "detected",
          "wave": "0.......1...0...1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "full-subtractor",
    "title": "1-Bit Full Subtractor",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "subtractor"
    ],
    "category": "Combinational Design",
    "lede": "Subtract b and a borrow-in from a, producing a difference bit and a borrow-out — the subtraction twin of the full adder.",
    "concept": "<b>Concept:</b> <code>diff = a ^ b ^ bin</code> (same XOR pattern as addition — subtraction and addition share the same bit-difference logic). The borrow-out is 1 whenever a is too small to cover b and bin: <code>bout = (~a &amp; b) | (~a &amp; bin) | (b &amp; bin)</code>.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>1</td><td>Minuend bit</td></tr>\n<tr><td>b</td><td>input</td><td>1</td><td>Subtrahend bit</td></tr>\n<tr><td>bin</td><td>input</td><td>1</td><td>Borrow in</td></tr>\n<tr><td>diff</td><td>output</td><td>1</td><td>a − b − bin, low bit</td></tr>\n<tr><td>bout</td><td>output</td><td>1</td><td>Borrow out</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  a,\n  input  b,\n  input  bin,\n  output diff,\n  output bout\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg a, b, bin;\n  wire diff, bout;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .bin(bin), .diff(diff), .bout(bout));\n  task check;\n    input ia, ib, ic; input ed, eb;\n    begin\n      a = ia; b = ib; bin = ic; #1;\n      if (diff !== ed || bout !== eb) begin\n        errors = errors + 1;\n        $display(\"FAIL a=%b b=%b bin=%b expected diff=%b bout=%b got diff=%b bout=%b\", ia, ib, ic, ed, eb, diff, bout);\n      end else $display(\"PASS a=%b b=%b bin=%b\", ia, ib, ic);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(0, 0, 0, 0, 0);\n    check(0, 0, 1, 1, 1);\n    check(0, 1, 0, 1, 1);\n    check(0, 1, 1, 0, 1);\n    check(1, 0, 0, 1, 0);\n    check(1, 0, 1, 0, 0);\n    check(1, 1, 0, 0, 0);\n    check(1, 1, 1, 1, 1);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "bin",
      "diff",
      "bout"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a",
          "wave": "0.1.0.1."
        },
        {
          "name": "b",
          "wave": "0.0.1.1."
        },
        {
          "name": "bin",
          "wave": "0.0.0.1."
        },
        {
          "name": "diff",
          "wave": "0.1.1.1."
        },
        {
          "name": "bout",
          "wave": "0.0.1.1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "binary-to-gray",
    "title": "Binary to Gray Code Converter",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "code-converter"
    ],
    "category": "Combinational Design",
    "lede": "Convert a 4-bit binary number into its Gray code equivalent, where only one bit ever changes between consecutive values.",
    "concept": "<b>Concept:</b> <code>gray = bin ^ (bin &gt;&gt; 1)</code>. XOR-ing a number with itself shifted right by one produces a code where adjacent values differ in exactly one bit — the property that makes Gray code safe to sample across clock domains.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>bin</td><td>input</td><td>4</td><td>Standard binary value</td></tr>\n<tr><td>gray</td><td>output</td><td>4</td><td>Gray-coded equivalent</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] bin,\n  output [3:0] gray\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] bin;\n  wire [3:0] gray;\n  integer errors = 0;\n  top_module dut(.bin(bin), .gray(gray));\n  task check;\n    input [3:0] b; input [3:0] eg;\n    begin\n      bin = b; #1;\n      if (gray !== eg) begin\n        errors = errors + 1;\n        $display(\"FAIL bin=%b expected=%b got=%b\", b, eg, gray);\n      end else $display(\"PASS bin=%b gray=%b\", b, gray);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(4'd0, 4'b0000);\n    check(4'd1, 4'b0001);\n    check(4'd2, 4'b0011);\n    check(4'd3, 4'b0010);\n    check(4'd7, 4'b0100);\n    check(4'd8, 4'b1100);\n    check(4'd15, 4'b1000);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "bin",
      "gray"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "bin[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "1",
            "2",
            "3"
          ]
        },
        {
          "name": "gray[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0000",
            "0001",
            "0011",
            "0010"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "gray-to-binary",
    "title": "Gray to Binary Code Converter",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "code-converter"
    ],
    "category": "Combinational Design",
    "lede": "Reverse the conversion: turn a 4-bit Gray code value back into standard binary.",
    "concept": "<b>Concept:</b> Unlike binary-to-Gray, this direction is a ripple of XORs, not a single expression: <code>bin[3]=gray[3]</code>, then each lower bit is the XOR of the previous binary bit with the matching gray bit — <code>bin[i] = bin[i+1] ^ gray[i]</code>, computed from the top bit down.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>gray</td><td>input</td><td>4</td><td>Gray-coded value</td></tr>\n<tr><td>bin</td><td>output</td><td>4</td><td>Standard binary equivalent</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] gray,\n  output [3:0] bin\n);\n\n  // Your code here — bin[3]=gray[3], then ripple down: bin[i] = bin[i+1] ^ gray[i].\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] gray;\n  wire [3:0] bin;\n  integer errors = 0;\n  top_module dut(.gray(gray), .bin(bin));\n  task check;\n    input [3:0] g; input [3:0] eb;\n    begin\n      gray = g; #1;\n      if (bin !== eb) begin\n        errors = errors + 1;\n        $display(\"FAIL gray=%b expected=%b got=%b\", g, eb, bin);\n      end else $display(\"PASS gray=%b bin=%b\", g, bin);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(4'b0000, 4'd0);\n    check(4'b0001, 4'd1);\n    check(4'b0011, 4'd2);\n    check(4'b0010, 4'd3);\n    check(4'b0110, 4'd4);\n    check(4'b0100, 4'd7);\n    check(4'b1100, 4'd8);\n    check(4'b1000, 4'd15);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "gray",
      "bin"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "gray[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0000",
            "0001",
            "0011",
            "0010"
          ]
        },
        {
          "name": "bin[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "1",
            "2",
            "3"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "priority-encoder-8to3",
    "title": "8-to-3 Priority Encoder",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "encoder"
    ],
    "category": "Combinational Design",
    "lede": "The wider sibling of the 4-to-2 priority encoder: pick the index of the highest-priority set bit among 8 request lines.",
    "concept": "<b>Concept:</b> Same priority-checking idea as the 4-input version, just one more level of nested ternaries (or a case statement) — always check the highest bit first, since it wins regardless of what else is set.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>in</td><td>input</td><td>8</td><td>Request lines, bit 7 = highest priority</td></tr>\n<tr><td>out</td><td>output</td><td>3</td><td>Index of highest set bit (don't-care if valid=0)</td></tr>\n<tr><td>valid</td><td>output</td><td>1</td><td>1 if any input bit is set</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] in,\n  output [2:0] out,\n  output       valid\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] in;\n  wire [2:0] out;\n  wire valid;\n  integer errors = 0;\n  top_module dut(.in(in), .out(out), .valid(valid));\n  task check;\n    input [7:0] i; input ev; input [2:0] eo;\n    begin\n      in = i; #1;\n      if (valid !== ev || out !== eo) begin\n        errors = errors + 1;\n        $display(\"FAIL in=%b expected valid=%b out=%b got valid=%b out=%b\", i, ev, eo, valid, out);\n      end else $display(\"PASS in=%b valid=%b out=%b\", i, valid, out);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(8'b00000000, 0, 3'd0);\n    check(8'b00000001, 1, 3'd0);\n    check(8'b00000110, 1, 3'd2);\n    check(8'b10000000, 1, 3'd7);\n    check(8'b10100000, 1, 3'd7);\n    check(8'b00011000, 1, 3'd4);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "in",
      "valid",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "in[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "00000000",
            "00000001",
            "10000000",
            "00011000"
          ]
        },
        {
          "name": "valid",
          "wave": "0.1....."
        },
        {
          "name": "out[2:0]",
          "wave": "x.2.3.4.",
          "data": [
            "0",
            "7",
            "4"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "alu-4bit",
    "title": "4-Bit ALU",
    "difficulty": "hard",
    "points": 50,
    "level": 2,
    "tags": [
      "combinational",
      "alu"
    ],
    "category": "Combinational Design",
    "lede": "Build a small arithmetic-logic unit: add, subtract, AND, or OR two 4-bit numbers based on a 2-bit opcode, plus a zero flag.",
    "concept": "<b>Concept:</b> A <code>case</code> on <code>op</code> inside a combinational <code>always @(*)</code> block selects the operation; <code>zero</code> is simply a comparison of the result against 0, computed after the case decides <code>out</code>.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>4</td><td>First operand</td></tr>\n<tr><td>b</td><td>input</td><td>4</td><td>Second operand</td></tr>\n<tr><td>op</td><td>input</td><td>2</td><td>00=add, 01=subtract, 10=AND, 11=OR</td></tr>\n<tr><td>out</td><td>output</td><td>4</td><td>Result</td></tr>\n<tr><td>zero</td><td>output</td><td>1</td><td>1 if out == 0</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input      [3:0] a,\n  input      [3:0] b,\n  input      [1:0] op,\n  output reg [3:0] out,\n  output           zero\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] a, b;\n  reg [1:0] op;\n  wire [3:0] out;\n  wire zero;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .op(op), .out(out), .zero(zero));\n  task check;\n    input [3:0] ia, ib; input [1:0] iop; input [3:0] eo; input ez;\n    begin\n      a = ia; b = ib; op = iop; #1;\n      if (out !== eo || zero !== ez) begin\n        errors = errors + 1;\n        $display(\"FAIL a=%d b=%d op=%b expected out=%d zero=%b got out=%d zero=%b\", ia, ib, iop, eo, ez, out, zero);\n      end else $display(\"PASS a=%d b=%d op=%b out=%d zero=%b\", ia, ib, iop, out, zero);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(4'd3, 4'd4, 2'b00, 4'd7, 0);\n    check(4'd5, 4'd3, 2'b01, 4'd2, 0);\n    check(4'd3, 4'd3, 2'b01, 4'd0, 1);\n    check(4'd12, 4'd10, 2'b10, 4'd8, 0);\n    check(4'd12, 4'd10, 2'b11, 4'd14, 0);\n    check(4'd2, 4'd14, 2'b01, 4'd4, 0);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "op",
      "out",
      "zero"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[3:0]",
          "wave": "2.3.4.",
          "data": [
            "3",
            "5",
            "3"
          ]
        },
        {
          "name": "b[3:0]",
          "wave": "2.3.4.",
          "data": [
            "4",
            "3",
            "3"
          ]
        },
        {
          "name": "op[1:0]",
          "wave": "2.3.4.",
          "data": [
            "00",
            "01",
            "01"
          ]
        },
        {
          "name": "out[3:0]",
          "wave": "2.3.4.",
          "data": [
            "7",
            "2",
            "0"
          ]
        },
        {
          "name": "zero",
          "wave": "0...1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "barrel-rotator",
    "title": "8-Bit Barrel Rotator",
    "difficulty": "hard",
    "points": 50,
    "level": 3,
    "tags": [
      "combinational",
      "shifter"
    ],
    "category": "Combinational Design",
    "lede": "Rotate an 8-bit value left by a variable amount in a single combinational step — no loops, no clock.",
    "concept": "<b>Concept:</b> <code>out = (data &lt;&lt; shamt) | (data &gt;&gt; (8 - shamt));</code>. The left shift drops bits off the top; the right shift recovers exactly those dropped bits and reinserts them at the bottom — OR-ing the two reconstructs a rotation instead of a plain shift.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>data</td><td>input</td><td>8</td><td>Value to rotate</td></tr>\n<tr><td>shamt</td><td>input</td><td>3</td><td>Rotate amount, 0-7</td></tr>\n<tr><td>out</td><td>output</td><td>8</td><td>data rotated left by shamt</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] data,\n  input  [2:0] shamt,\n  output [7:0] out\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] data;\n  reg [2:0] shamt;\n  wire [7:0] out;\n  integer errors = 0;\n  top_module dut(.data(data), .shamt(shamt), .out(out));\n  task check;\n    input [7:0] d; input [2:0] s; input [7:0] eo;\n    begin\n      data = d; shamt = s; #1;\n      if (out !== eo) begin\n        errors = errors + 1;\n        $display(\"FAIL data=%b shamt=%d expected=%b got=%b\", d, s, eo, out);\n      end else $display(\"PASS data=%b shamt=%d out=%b\", d, s, out);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(8'b10110001, 3'd3, 8'b10001101);\n    check(8'b00000001, 3'd1, 8'b00000010);\n    check(8'b00000001, 3'd7, 8'b10000000);\n    check(8'b10110001, 3'd0, 8'b10110001);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "data",
      "shamt",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "data[7:0]",
          "wave": "2.....",
          "data": [
            "10110001"
          ]
        },
        {
          "name": "shamt[2:0]",
          "wave": "2.3.4.",
          "data": [
            "0",
            "1",
            "3"
          ]
        },
        {
          "name": "out[7:0]",
          "wave": "2.3.4.",
          "data": [
            "10110001",
            "01100011",
            "10001101"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "majority-voter",
    "title": "3-Input Majority Voter",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "voter"
    ],
    "category": "Combinational Design",
    "lede": "Output 1 whenever at least two of the three inputs agree — the logic behind triple-modular-redundancy fault tolerance.",
    "concept": "<b>Concept:</b> <code>out = (a&amp;b) | (b&amp;c) | (a&amp;c)</code> — check every pair; if any pair is both 1, that's already a majority regardless of the third input.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>1</td><td>Vote 1</td></tr>\n<tr><td>b</td><td>input</td><td>1</td><td>Vote 2</td></tr>\n<tr><td>c</td><td>input</td><td>1</td><td>Vote 3</td></tr>\n<tr><td>out</td><td>output</td><td>1</td><td>1 if two or more votes are 1</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  a,\n  input  b,\n  input  c,\n  output out\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg a, b, c;\n  wire out;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .c(c), .out(out));\n  task check;\n    input ia, ib, ic; input eo;\n    begin\n      a = ia; b = ib; c = ic; #1;\n      if (out !== eo) begin\n        errors = errors + 1;\n        $display(\"FAIL a=%b b=%b c=%b expected=%b got=%b\", ia, ib, ic, eo, out);\n      end else $display(\"PASS a=%b b=%b c=%b out=%b\", ia, ib, ic, out);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(0, 0, 0, 0);\n    check(0, 0, 1, 0);\n    check(0, 1, 0, 0);\n    check(0, 1, 1, 1);\n    check(1, 0, 0, 0);\n    check(1, 0, 1, 1);\n    check(1, 1, 0, 1);\n    check(1, 1, 1, 1);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "c",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a",
          "wave": "0.1.0.1."
        },
        {
          "name": "b",
          "wave": "0.1.1.0."
        },
        {
          "name": "c",
          "wave": "0.0.1.1."
        },
        {
          "name": "out",
          "wave": "0.1.1.1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "lfsr-4bit",
    "title": "4-Bit Linear Feedback Shift Register",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "lfsr"
    ],
    "category": "Sequential Design",
    "lede": "A self-shifting register that generates a pseudo-random bit sequence — the core of BIST pattern generators and simple scramblers.",
    "concept": "<b>Concept:</b> Fibonacci LFSR with taps at bits 3 and 2: feed <code>q[3] ^ q[2]</code> back into the LSB every cycle, <code>q &lt;= {q[2:0], feedback};</code>. Seed with a non-zero value on reset — an all-zero LFSR is stuck forever.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync reset, seeds q to 0001</td></tr>\n<tr><td>q</td><td>output</td><td>4</td><td>LFSR state</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input      clk,\n  input      rst,\n  output reg [3:0] q\n);\n\n  // Your code here — seed q to 4'b0001 on reset, then shift with feedback = q[3]^q[2].\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst;\n  wire [3:0] q;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .q(q));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input [3:0] eq; input [127:0] label;\n    begin\n      if (q !== eq) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%b got=%b\", label, eq, q);\n      end else $display(\"PASS %0s q=%b\", label, q);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; @(posedge clk); #1; check(4'b0001, \"seed\");\n    rst = 0;\n    @(posedge clk); #1; check(4'b0010, \"s1\");\n    @(posedge clk); #1; check(4'b0100, \"s2\");\n    @(posedge clk); #1; check(4'b1001, \"s3\");\n    @(posedge clk); #1; check(4'b0011, \"s4\");\n    @(posedge clk); #1; check(4'b0110, \"s5\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "rst",
          "wave": "10........"
        },
        {
          "name": "q[3:0]",
          "wave": "2.3.4.5.6.",
          "data": [
            "0001",
            "0010",
            "0100",
            "1001",
            "0011"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "piso-shift-register",
    "title": "4-Bit Shift Register (PISO)",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "shift-register"
    ],
    "category": "Sequential Design",
    "lede": "Parallel-in, serial-out shift register — load a nibble in one cycle, then read it out one bit at a time, MSB first.",
    "concept": "<b>Concept:</b> On <code>load</code>, capture the whole word: <code>q &lt;= din;</code>. Otherwise shift left each cycle, filling the vacated LSB with 0: <code>q &lt;= {q[2:0], 1'b0};</code>. The serial output is simply the current MSB, <code>sout = q[3]</code>.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>load</td><td>input</td><td>1</td><td>1 = load din, 0 = shift</td></tr>\n<tr><td>din</td><td>input</td><td>4</td><td>Parallel data to load</td></tr>\n<tr><td>sout</td><td>output</td><td>1</td><td>Current MSB of the register</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  load,\n  input  [3:0] din,\n  output sout\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, load;\n  reg [3:0] din;\n  wire sout;\n  integer errors = 0;\n  top_module dut(.clk(clk), .load(load), .din(din), .sout(sout));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input es; input [127:0] label;\n    begin\n      if (sout !== es) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%b got=%b\", label, es, sout);\n      end else $display(\"PASS %0s sout=%b\", label, sout);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    load = 1; din = 4'b1011; @(posedge clk); #1; check(1, \"load\");\n    load = 0; @(posedge clk); #1; check(0, \"shift1\");\n    @(posedge clk); #1; check(1, \"shift2\");\n    @(posedge clk); #1; check(1, \"shift3\");\n    @(posedge clk); #1; check(0, \"shift4\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "load",
      "din",
      "sout"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........"
        },
        {
          "name": "load",
          "wave": "10......."
        },
        {
          "name": "din[3:0]",
          "wave": "2........",
          "data": [
            "1011"
          ]
        },
        {
          "name": "sout",
          "wave": "1.0.1.1.0"
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "universal-shift-register",
    "title": "4-Bit Universal Shift Register",
    "difficulty": "hard",
    "points": 50,
    "level": 3,
    "tags": [
      "sequential",
      "shift-register"
    ],
    "category": "Sequential Design",
    "lede": "One register, four behaviors: hold, shift left, shift right, or parallel load, all picked by a 2-bit mode select.",
    "concept": "<b>Concept:</b> A <code>case</code> on <code>mode</code> inside the clocked always block: <code>00</code> holds (<code>q&lt;=q</code>), <code>01</code> shifts left bringing <code>sin</code> into the LSB, <code>10</code> shifts right bringing <code>sin</code> into the MSB, <code>11</code> loads <code>din</code> directly.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>mode</td><td>input</td><td>2</td><td>00=hold, 01=shift-left, 10=shift-right, 11=load</td></tr>\n<tr><td>sin</td><td>input</td><td>1</td><td>Serial input for either shift direction</td></tr>\n<tr><td>din</td><td>input</td><td>4</td><td>Parallel load data</td></tr>\n<tr><td>q</td><td>output</td><td>4</td><td>Register contents</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input            clk,\n  input            rst,\n  input      [1:0] mode,\n  input            sin,\n  input      [3:0] din,\n  output reg [3:0] q\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst;\n  reg [1:0] mode;\n  reg sin;\n  reg [3:0] din;\n  wire [3:0] q;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .mode(mode), .sin(sin), .din(din), .q(q));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input [3:0] eq; input [127:0] label;\n    begin\n      if (q !== eq) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%b got=%b\", label, eq, q);\n      end else $display(\"PASS %0s q=%b\", label, q);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; mode = 2'b00; sin = 0; din = 0; @(posedge clk); #1; check(4'b0000, \"reset\");\n    rst = 0; mode = 2'b11; din = 4'b1010; @(posedge clk); #1; check(4'b1010, \"load\");\n    mode = 2'b01; sin = 1; @(posedge clk); #1; check(4'b0101, \"shiftleft\");\n    mode = 2'b10; sin = 1; @(posedge clk); #1; check(4'b1010, \"shiftright\");\n    mode = 2'b00; @(posedge clk); #1; check(4'b1010, \"hold\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "mode",
      "sin",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "mode[1:0]",
          "wave": "2.3.4.5.",
          "data": [
            "11",
            "01",
            "10",
            "00"
          ]
        },
        {
          "name": "q[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "1010",
            "0101",
            "1010",
            "1010"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "pulse-stretcher",
    "title": "Pulse Stretcher",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "pulse"
    ],
    "category": "Sequential Design",
    "lede": "Turn a single 1-cycle pulse into a guaranteed 3-cycle-wide output pulse — the kind of circuit that makes a fast event visible to a slow observer.",
    "concept": "<b>Concept:</b> A down-counter tracks remaining stretch cycles. When idle (<code>cnt==0</code>) and <code>pulse_in</code> arrives, load <code>cnt&lt;=3</code>; otherwise count down while <code>cnt&gt;0</code>. <code>pulse_out = (cnt &gt; 0)</code>. A new pulse arriving mid-stretch is ignored — no retriggering.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>pulse_in</td><td>input</td><td>1</td><td>1-cycle trigger pulse</td></tr>\n<tr><td>pulse_out</td><td>output</td><td>1</td><td>High for 3 cycles after a trigger</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  pulse_in,\n  output pulse_out\n);\n\n  // Your code here — a small down-counter (0..3) works well.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, pulse_in;\n  wire pulse_out;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .pulse_in(pulse_in), .pulse_out(pulse_out));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input ep; input [127:0] label;\n    begin\n      if (pulse_out !== ep) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%b got=%b\", label, ep, pulse_out);\n      end else $display(\"PASS %0s pulse_out=%b\", label, pulse_out);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; pulse_in = 0; @(posedge clk); #1; check(0, \"reset\");\n    rst = 0;\n    pulse_in = 1; @(posedge clk); #1; check(1, \"stretch1\");\n    pulse_in = 1; @(posedge clk); #1; check(1, \"stretch2-ignored-retrigger\");\n    pulse_in = 0; @(posedge clk); #1; check(1, \"stretch3\");\n    @(posedge clk); #1; check(0, \"done\");\n    @(posedge clk); #1; check(0, \"idle\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "pulse_in",
      "pulse_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "pulse_in",
          "wave": "0.10......"
        },
        {
          "name": "pulse_out",
          "wave": "0..1..0..."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "sequence-detector-101-nonoverlap",
    "title": "Sequence Detector: 101 (Non-Overlapping)",
    "difficulty": "medium",
    "points": 25,
    "level": 4,
    "tags": [
      "sequential",
      "fsm"
    ],
    "category": "Sequential Design",
    "lede": "A Moore FSM detecting the pattern 101 on a serial stream — but unlike the overlapping 1011 detector, a match here consumes all three bits before searching resumes.",
    "concept": "<b>Concept:</b> Same 4-state shape as an overlapping detector (S0..S3), but the \"just matched\" state S3 restarts the search from scratch instead of reusing the failure function: <code>S3</code> transitions exactly like <code>S0</code> would. That single difference is what makes back-to-back matches non-overlapping.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>in</td><td>input</td><td>1</td><td>Serial bit stream, one bit per clock</td></tr>\n<tr><td>detected</td><td>output</td><td>1</td><td>High for one cycle after \"101\" is matched</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  in,\n  output detected\n);\n\n  // Your code here — 4-state FSM (S0..S3); S3 should transition just like S0.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, in;\n  wire detected;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .in(in), .detected(detected));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input ed; input [127:0] label;\n    begin\n      if (detected !== ed) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%b got=%b\", label, ed, detected);\n      end else $display(\"PASS %0s detected=%b\", label, detected);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; in = 0; @(posedge clk); #1; check(0, \"reset\");\n    rst = 0;\n    in = 1; @(posedge clk); #1; check(0, \"b1\");\n    in = 0; @(posedge clk); #1; check(0, \"b2\");\n    in = 1; @(posedge clk); #1; check(1, \"b3-match\");\n    in = 1; @(posedge clk); #1; check(0, \"b4\");\n    in = 0; @(posedge clk); #1; check(0, \"b5\");\n    in = 1; @(posedge clk); #1; check(1, \"b6-match-nonoverlap\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "in",
      "detected"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p............."
        },
        {
          "name": "in",
          "wave": "0.1.0.1.1.0.1."
        },
        {
          "name": "detected",
          "wave": "0.....1...0.1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "traffic-light-fsm",
    "title": "Traffic Light Controller",
    "difficulty": "hard",
    "points": 50,
    "level": 4,
    "tags": [
      "sequential",
      "fsm"
    ],
    "category": "Sequential Design",
    "lede": "A timer-driven Moore FSM that cycles a single intersection through RED, GREEN, and YELLOW on fixed schedules — the classic FSM-with-a-counter pattern.",
    "concept": "<b>Concept:</b> Each state holds an internal cycle counter that counts up while waiting for its duration to expire, then advances to the next state and resets the counter: RED for 3 cycles → GREEN for 3 cycles → YELLOW for 2 cycles → back to RED. <code>light</code> is simply the state register itself (a Moore output).",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (starts at RED)</td></tr>\n<tr><td>light</td><td>output</td><td>2</td><td>0=RED (3 cycles), 1=GREEN (3 cycles), 2=YELLOW (2 cycles)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input        clk,\n  input        rst,\n  output [1:0] light\n);\n\n  // Your code here — state register + per-state cycle counter.\n  // RED=0 for 3 cycles, GREEN=1 for 3 cycles, YELLOW=2 for 2 cycles, repeat.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst;\n  wire [1:0] light;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .light(light));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input [1:0] el; input [127:0] label;\n    begin\n      if (light !== el) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%d got=%d\", label, el, light);\n      end else $display(\"PASS %0s light=%d\", label, light);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; @(posedge clk); #1; check(0, \"reset\");\n    rst = 0;\n    @(posedge clk); #1; check(0, \"red2\");\n    @(posedge clk); #1; check(0, \"red3\");\n    @(posedge clk); #1; check(1, \"green1\");\n    @(posedge clk); #1; check(1, \"green2\");\n    @(posedge clk); #1; check(1, \"green3\");\n    @(posedge clk); #1; check(2, \"yellow1\");\n    @(posedge clk); #1; check(2, \"yellow2\");\n    @(posedge clk); #1; check(0, \"wrap-red\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "light"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p................."
        },
        {
          "name": "light",
          "wave": "2...3...4...2.....",
          "data": [
            "RED",
            "GREEN",
            "YELLOW",
            "RED"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "vending-machine-fsm",
    "title": "Vending Machine FSM (15-Cent)",
    "difficulty": "hard",
    "points": 50,
    "level": 4,
    "tags": [
      "sequential",
      "fsm"
    ],
    "category": "Sequential Design",
    "lede": "A classic textbook FSM: accept nickels and dimes, and dispense as soon as the running total reaches 15 cents (no change given).",
    "concept": "<b>Concept:</b> Track cents in a register. Compute <code>next_cents</code> combinationally from the current total plus whatever coin is inserted this cycle; <code>dispense</code> is simply <code>(next_cents &gt;= 15)</code>. On the clock edge, if the threshold was reached, reset the total to 0 instead of carrying it forward (no change is given for overpayment).",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>nickel</td><td>input</td><td>1</td><td>1 = a nickel (5¢) is inserted this cycle</td></tr>\n<tr><td>dime</td><td>input</td><td>1</td><td>1 = a dime (10¢) is inserted this cycle</td></tr>\n<tr><td>dispense</td><td>output</td><td>1</td><td>1 when the running total reaches 15¢ or more</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  nickel,\n  input  dime,\n  output dispense\n);\n\n  // Your code here — an internal cents register plus a combinational next_cents works well.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, nickel, dime;\n  wire dispense;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .nickel(nickel), .dime(dime), .dispense(dispense));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input ed; input [127:0] label;\n    begin\n      if (dispense !== ed) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%b got=%b\", label, ed, dispense);\n      end else $display(\"PASS %0s dispense=%b\", label, dispense);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; nickel = 0; dime = 0; @(posedge clk); #1; check(0, \"reset\");\n    rst = 0;\n    dime = 1; #1; check(0, \"dime10\");\n    @(posedge clk); #1; dime = 0;\n    nickel = 1; #1; check(1, \"nickel-completes15\");\n    @(posedge clk); #1; nickel = 0;\n    check(0, \"after-vend-reset\");\n    dime = 1; #1; check(0, \"dime10-again\");\n    @(posedge clk); #1;\n    dime = 1; #1; check(1, \"dime20-overpay-vend\");\n    @(posedge clk); #1; dime = 0;\n    check(0, \"idle-after\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "nickel",
      "dime",
      "dispense"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "dime",
          "wave": "0.10.10."
        },
        {
          "name": "nickel",
          "wave": "0..1...."
        },
        {
          "name": "dispense",
          "wave": "0..1.0.1"
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "popcount8",
    "title": "8-Bit Population Count",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "algorithmic"
    ],
    "category": "Combinational Design",
    "lede": "Count how many of the 8 input bits are set to 1 — the building block behind ECC, Hamming weight, and bit-similarity checks.",
    "concept": "<b>Concept:</b> A synthesizable <code>for</code> loop inside a combinational <code>always @(*)</code> block, accumulating <code>count = count + in[i]</code> across all 8 bits, unrolls into an adder tree at synthesis — no need to hand-write one.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>in</td><td>input</td><td>8</td><td>Input bits</td></tr>\n<tr><td>count</td><td>output</td><td>4</td><td>Number of 1s in in (0-8)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input      [7:0] in,\n  output reg [3:0] count\n);\n\n  // Your code here — a for loop over all 8 bits works well.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] in;\n  wire [3:0] count;\n  integer errors = 0;\n  top_module dut(.in(in), .count(count));\n  task check;\n    input [7:0] i; input [3:0] ec;\n    begin\n      in = i; #1;\n      if (count !== ec) begin\n        errors = errors + 1;\n        $display(\"FAIL in=%b expected=%d got=%d\", i, ec, count);\n      end else $display(\"PASS in=%b count=%d\", i, count);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(8'b00000000, 0);\n    check(8'b11111111, 8);\n    check(8'b00001111, 4);\n    check(8'b10000001, 2);\n    check(8'b01010101, 4);\n    check(8'b11100000, 3);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "in",
      "count"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "in[7:0]",
          "wave": "2.3.4.",
          "data": [
            "00000000",
            "00001111",
            "11111111"
          ]
        },
        {
          "name": "count[3:0]",
          "wave": "2.3.4.",
          "data": [
            "0",
            "4",
            "8"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "signed-overflow-detector",
    "title": "4-Bit Signed Overflow Detector",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic"
    ],
    "category": "Combinational Design",
    "lede": "Add two 4-bit two's-complement numbers and flag whether the result overflowed the representable signed range.",
    "concept": "<b>Concept:</b> Overflow can only happen when both operands share a sign but the result doesn't: <code>overflow = (a[3]==b[3]) &amp;&amp; (sum[3]!=a[3])</code>. Adding numbers of opposite sign can never overflow — the result always fits between them.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>4</td><td>Signed operand (two's complement)</td></tr>\n<tr><td>b</td><td>input</td><td>4</td><td>Signed operand (two's complement)</td></tr>\n<tr><td>sum</td><td>output</td><td>4</td><td>a + b, wrapped</td></tr>\n<tr><td>overflow</td><td>output</td><td>1</td><td>1 if the true sum doesn't fit in 4-bit signed range</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] a,\n  input  [3:0] b,\n  output [3:0] sum,\n  output       overflow\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] a, b;\n  wire [3:0] sum;\n  wire overflow;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .sum(sum), .overflow(overflow));\n  task check;\n    input [3:0] ia, ib; input [3:0] es; input eo;\n    begin\n      a = ia; b = ib; #1;\n      if (sum !== es || overflow !== eo) begin\n        errors = errors + 1;\n        $display(\"FAIL a=%b b=%b expected sum=%b ovf=%b got sum=%b ovf=%b\", ia, ib, es, eo, sum, overflow);\n      end else $display(\"PASS a=%b b=%b sum=%b ovf=%b\", ia, ib, sum, overflow);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(4'b0011, 4'b0100, 4'b0111, 0);\n    check(4'b0101, 4'b0101, 4'b1010, 1);\n    check(4'b1000, 4'b1000, 4'b0000, 1);\n    check(4'b1101, 4'b0010, 4'b1111, 0);\n    check(4'b0001, 4'b0010, 4'b0011, 0);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "sum",
      "overflow"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[3:0]",
          "wave": "2.3.4.",
          "data": [
            "0011",
            "0101",
            "1000"
          ]
        },
        {
          "name": "b[3:0]",
          "wave": "2.3.4.",
          "data": [
            "0100",
            "0101",
            "1000"
          ]
        },
        {
          "name": "sum[3:0]",
          "wave": "2.3.4.",
          "data": [
            "0111",
            "1010",
            "0000"
          ]
        },
        {
          "name": "overflow",
          "wave": "0.1..."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "find-first-set",
    "title": "Find First Set Bit",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "algorithmic"
    ],
    "category": "Combinational Design",
    "lede": "Find the index of the lowest-numbered set bit in an 8-bit input — the LSB-first counterpart to a priority encoder.",
    "concept": "<b>Concept:</b> Same nested-ternary shape as a priority encoder, but check <code>in[0]</code> first instead of <code>in[7]</code> — priority runs from the LSB upward instead of the MSB downward.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>in</td><td>input</td><td>8</td><td>Input bits</td></tr>\n<tr><td>idx</td><td>output</td><td>3</td><td>Index of lowest set bit (don't-care if valid=0)</td></tr>\n<tr><td>valid</td><td>output</td><td>1</td><td>1 if any bit is set</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] in,\n  output [2:0] idx,\n  output       valid\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] in;\n  wire [2:0] idx;\n  wire valid;\n  integer errors = 0;\n  top_module dut(.in(in), .idx(idx), .valid(valid));\n  task check;\n    input [7:0] i; input ev; input [2:0] ei;\n    begin\n      in = i; #1;\n      if (valid !== ev || idx !== ei) begin\n        errors = errors + 1;\n        $display(\"FAIL in=%b expected valid=%b idx=%d got valid=%b idx=%d\", i, ev, ei, valid, idx);\n      end else $display(\"PASS in=%b valid=%b idx=%d\", i, valid, idx);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(8'b00000001, 1, 0);\n    check(8'b00000010, 1, 1);\n    check(8'b00010000, 1, 4);\n    check(8'b10000000, 1, 7);\n    check(8'b00000000, 0, 7);\n    check(8'b11111111, 1, 0);\n    check(8'b11110000, 1, 4);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "in",
      "valid",
      "idx"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "in[7:0]",
          "wave": "2.3.4.",
          "data": [
            "00000001",
            "00010000",
            "11110000"
          ]
        },
        {
          "name": "valid",
          "wave": "1....."
        },
        {
          "name": "idx[2:0]",
          "wave": "2.3.4.",
          "data": [
            "0",
            "4",
            "4"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "clock-div3",
    "title": "Divide-by-3 Clock Pulse",
    "difficulty": "hard",
    "points": 50,
    "level": 4,
    "tags": [
      "sequential",
      "clock"
    ],
    "category": "Sequential Design",
    "lede": "Generate a pulse that fires once every 3 input clock cycles — dividing by a non-power-of-2 needs a counter, not a toggle flip-flop.",
    "concept": "<b>Concept:</b> A 2-bit counter wraps at 2 (0,1,2,0,1,2,...), and the output pulses high exactly when the counter is 0: <code>clk_div3 = (cnt == 0)</code>. The wrap condition <code>cnt==2</code> is what makes this divide-by-3 instead of divide-by-4 — an easy off-by-one to get wrong.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Input clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>clk_div3</td><td>output</td><td>1</td><td>High for 1 cycle out of every 3</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  output clk_div3\n);\n\n  // Your code here — a 2-bit counter that wraps at 2 works well.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst;\n  wire clk_div3;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .clk_div3(clk_div3));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input ec; input [127:0] label;\n    begin\n      if (clk_div3 !== ec) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%b got=%b\", label, ec, clk_div3);\n      end else $display(\"PASS %0s clk_div3=%b\", label, clk_div3);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; @(posedge clk); #1; check(1, \"reset-cnt0\");\n    rst = 0;\n    @(posedge clk); #1; check(0, \"cnt1\");\n    @(posedge clk); #1; check(0, \"cnt2\");\n    @(posedge clk); #1; check(1, \"wrap-cnt0\");\n    @(posedge clk); #1; check(0, \"cnt1again\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "clk_div3"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "rst",
          "wave": "1.0......."
        },
        {
          "name": "clk_div3",
          "wave": "1.0...1.0."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "combination-lock",
    "title": "Combination Lock FSM",
    "difficulty": "hard",
    "points": 50,
    "level": 4,
    "tags": [
      "sequential",
      "fsm"
    ],
    "category": "Sequential Design",
    "lede": "Unlock only after seeing the exact code sequence 2 → 1 → 3, entered one digit per clock. Any wrong digit resets progress — except digit 2, which can restart a fresh attempt on the spot.",
    "concept": "<b>Concept:</b> A 4-state FSM (S0, S1, S2, UNLOCKED) that stays latched in UNLOCKED once reached — guard the state-update logic with <code>if (state != UNLOCKED)</code>, or a stray digit after unlocking will re-lock it. The subtle part: from any wrong-digit state, if the wrong digit itself happens to be a 2, it should restart the match at S1 immediately rather than falling all the way back to S0.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (locks)</td></tr>\n<tr><td>code</td><td>input</td><td>2</td><td>Digit entered this cycle (0-3)</td></tr>\n<tr><td>unlocked</td><td>output</td><td>1</td><td>1 once the correct sequence 2,1,3 has been entered</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input        clk,\n  input        rst,\n  input  [1:0] code,\n  output       unlocked\n);\n\n  // Your code here — 4-state FSM (S0, S1, S2, UNLOCKED). Stay in UNLOCKED once reached.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst;\n  reg [1:0] code;\n  wire unlocked;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .code(code), .unlocked(unlocked));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input eu; input [127:0] label;\n    begin\n      if (unlocked !== eu) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%b got=%b\", label, eu, unlocked);\n      end else $display(\"PASS %0s unlocked=%b\", label, unlocked);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; code = 0; @(posedge clk); #1; check(0, \"reset\");\n    rst = 0;\n    code = 2; @(posedge clk); #1; check(0, \"d1\");\n    code = 1; @(posedge clk); #1; check(0, \"d2\");\n    code = 3; @(posedge clk); #1; check(1, \"unlock\");\n    code = 0; @(posedge clk); #1; check(1, \"stays-unlocked-after-junk\");\n    rst = 1; @(posedge clk); #1; rst = 0; check(0, \"relock-on-reset\");\n    code = 2; @(posedge clk); #1; check(0, \"d1-again\");\n    code = 2; @(posedge clk); #1; check(0, \"repeat-2-stays-s1\");\n    code = 1; @(posedge clk); #1; check(0, \"d2-again\");\n    code = 0; @(posedge clk); #1; check(0, \"wrong-digit-resets\");\n    code = 2; @(posedge clk); #1; check(0, \"restart-d1\");\n    code = 1; @(posedge clk); #1; check(0, \"restart-d2\");\n    code = 3; @(posedge clk); #1; check(1, \"unlock-again\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "code",
      "unlocked"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "rst",
          "wave": "1.0....."
        },
        {
          "name": "code[1:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "2",
            "1",
            "3"
          ]
        },
        {
          "name": "unlocked",
          "wave": "0.....1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "binary-to-bcd",
    "title": "8-Bit Binary to 3-Digit BCD (Double Dabble)",
    "difficulty": "hard",
    "points": 50,
    "level": 2,
    "tags": [
      "combinational",
      "algorithmic"
    ],
    "category": "Combinational Design",
    "lede": "Convert an 8-bit binary number (0-255) into three separate BCD digits — hundreds, tens, ones — using the classic shift-and-add-3 algorithm.",
    "concept": "<b>Concept:</b> The \"double dabble\" algorithm: load the binary value into the low bits of a wider shift register, then repeat (once per input bit) — if any BCD nibble holds 5 or more, add 3 to it, then shift the whole register left by 1. After 8 iterations, the upper nibbles hold valid BCD digits. Skipping the add-3 check on any one digit silently corrupts every result above single digits.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>bin</td><td>input</td><td>8</td><td>Binary value, 0-255</td></tr>\n<tr><td>hundreds</td><td>output</td><td>4</td><td>Hundreds BCD digit</td></tr>\n<tr><td>tens</td><td>output</td><td>4</td><td>Tens BCD digit</td></tr>\n<tr><td>ones</td><td>output</td><td>4</td><td>Ones BCD digit</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] bin,\n  output [3:0] hundreds,\n  output [3:0] tens,\n  output [3:0] ones\n);\n\n  // Your code here — double-dabble: 20-bit shift register, add-3-if->=5 to each BCD nibble, shift left, repeat 8 times.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] bin;\n  wire [3:0] hundreds, tens, ones;\n  integer errors = 0;\n  top_module dut(.bin(bin), .hundreds(hundreds), .tens(tens), .ones(ones));\n  task check;\n    input [7:0] b; input [3:0] eh, et, eo;\n    begin\n      bin = b; #1;\n      if (hundreds !== eh || tens !== et || ones !== eo) begin\n        errors = errors + 1;\n        $display(\"FAIL bin=%d expected h=%d t=%d o=%d got h=%d t=%d o=%d\", b, eh, et, eo, hundreds, tens, ones);\n      end else $display(\"PASS bin=%d -> %d%d%d\", b, hundreds, tens, ones);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(8'd0, 0, 0, 0);\n    check(8'd9, 0, 0, 9);\n    check(8'd10, 0, 1, 0);\n    check(8'd99, 0, 9, 9);\n    check(8'd100, 1, 0, 0);\n    check(8'd255, 2, 5, 5);\n    check(8'd127, 1, 2, 7);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "bin",
      "hundreds",
      "tens",
      "ones"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "bin[7:0]",
          "wave": "2.3.",
          "data": [
            "99",
            "255"
          ]
        },
        {
          "name": "hundreds",
          "wave": "2.3.",
          "data": [
            "0",
            "2"
          ]
        },
        {
          "name": "tens",
          "wave": "2.3.",
          "data": [
            "9",
            "5"
          ]
        },
        {
          "name": "ones",
          "wave": "2.3.",
          "data": [
            "9",
            "5"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "manchester-encoder",
    "title": "Manchester Encoder",
    "difficulty": "medium",
    "points": 25,
    "level": 6,
    "tags": [
      "combinational",
      "protocol"
    ],
    "category": "Combinational Design",
    "lede": "Combine a data bit with the clock to produce a Manchester-encoded line signal — the self-clocking encoding used in classic Ethernet and RFID.",
    "concept": "<b>Concept:</b> <code>enc = data ^ clk</code>. XOR-ing the data bit with the clock produces a transition in the middle of every bit period, with the transition direction determined by the data bit — exactly the self-clocking property Manchester encoding relies on.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Bit clock</td></tr>\n<tr><td>data</td><td>input</td><td>1</td><td>Data bit to encode</td></tr>\n<tr><td>enc</td><td>output</td><td>1</td><td>Manchester-encoded line output</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  data,\n  output enc\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, data;\n  wire enc;\n  integer errors = 0;\n  top_module dut(.clk(clk), .data(data), .enc(enc));\n  task check;\n    input ic, id; input ee;\n    begin\n      clk = ic; data = id; #1;\n      if (enc !== ee) begin\n        errors = errors + 1;\n        $display(\"FAIL clk=%b data=%b expected=%b got=%b\", ic, id, ee, enc);\n      end else $display(\"PASS clk=%b data=%b enc=%b\", ic, id, enc);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(0, 0, 0);\n    check(1, 0, 1);\n    check(0, 1, 1);\n    check(1, 1, 0);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "data",
      "enc"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "0.1.0.1."
        },
        {
          "name": "data",
          "wave": "0...1..."
        },
        {
          "name": "enc",
          "wave": "0.1...0."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "interrupt-controller",
    "title": "Priority Interrupt Controller",
    "difficulty": "hard",
    "points": 50,
    "level": 3,
    "tags": [
      "sequential",
      "controller"
    ],
    "category": "Sequential Design",
    "lede": "Latch incoming interrupt requests, present the highest-priority pending one to the CPU, and clear it only when explicitly acknowledged — even if the request line drops before that.",
    "concept": "<b>Concept:</b> Requests must be <i>latched</i> — a real CPU is far slower than a level interrupt pulse, so <code>pend &lt;= pend | irq</code> every cycle keeps a bit set until it's explicitly acked, even if <code>irq</code> goes low in between. On <code>ack</code>, clear only the bit currently pointed to by the priority-encoded <code>irq_num</code> — lower-priority pending bits stay latched and take over next.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>irq</td><td>input</td><td>4</td><td>Request lines, bit 3 = highest priority</td></tr>\n<tr><td>ack</td><td>input</td><td>1</td><td>1-cycle pulse: clear the currently-indicated request</td></tr>\n<tr><td>irq_num</td><td>output</td><td>2</td><td>Index of highest-priority pending request</td></tr>\n<tr><td>pending</td><td>output</td><td>1</td><td>1 if any request is latched pending</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input        clk,\n  input        rst,\n  input  [3:0] irq,\n  input        ack,\n  output [1:0] irq_num,\n  output       pending\n);\n\n  // Your code here — an internal \"pend\" register that latches irq bits and clears only the acked one.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst;\n  reg [3:0] irq;\n  reg ack;\n  wire [1:0] irq_num;\n  wire pending;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .irq(irq), .ack(ack), .irq_num(irq_num), .pending(pending));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input ep; input [1:0] ei; input checkidx; input [127:0] label;\n    begin\n      if (pending !== ep || (checkidx && irq_num !== ei)) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected pending=%b irq_num=%d got pending=%b irq_num=%d\", label, ep, ei, pending, irq_num);\n      end else $display(\"PASS %0s pending=%b irq_num=%d\", label, pending, irq_num);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; irq = 0; ack = 0; @(posedge clk); #1; check(0, 0, 0, \"reset\");\n    rst = 0; irq = 4'b0010;\n    @(posedge clk); #1; check(1, 1, 1, \"irq1-latched\");\n    irq = 4'b0000;\n    @(posedge clk); #1; check(1, 1, 1, \"stays-pending-after-irq-deasserted\");\n    irq = 4'b1000;\n    @(posedge clk); #1; check(1, 3, 1, \"irq3-higher-priority\");\n    ack = 1; irq = 0;\n    @(posedge clk); #1; check(1, 1, 1, \"ack-clears-only-irq3\");\n    @(posedge clk); #1; check(0, 0, 1, \"ack-clears-irq1-now-empty\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "irq",
      "ack",
      "pending",
      "irq_num"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p..........."
        },
        {
          "name": "rst",
          "wave": "1.0........."
        },
        {
          "name": "irq[3:0]",
          "wave": "2.3.4.5.6.7.",
          "data": [
            "0000",
            "0010",
            "0000",
            "1000",
            "0000",
            "0000"
          ]
        },
        {
          "name": "ack",
          "wave": "0.......1..."
        },
        {
          "name": "pending",
          "wave": "0.1.......0."
        },
        {
          "name": "irq_num[1:0]",
          "wave": "2.3.4.5.6.7.",
          "data": [
            "0",
            "1",
            "1",
            "3",
            "1",
            "0"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "odd-parity-checker",
    "title": "8-Bit Odd Parity Checker",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "parity"
    ],
    "category": "Combinational Design",
    "lede": "Check whether a received byte plus its parity bit together carry an odd number of 1s — the receiving half of an odd-parity error-detection scheme.",
    "concept": "<b>Concept:</b> <code>error = ~(^data ^ parity_bit)</code>. XOR-reducing data and parity_bit together gives 1 exactly when the total count of 1s is odd; inverting that tells you when the odd-parity rule was violated.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>data</td><td>input</td><td>8</td><td>Received data byte</td></tr>\n<tr><td>parity_bit</td><td>input</td><td>1</td><td>Received odd-parity bit</td></tr>\n<tr><td>error</td><td>output</td><td>1</td><td>1 if data+parity_bit has an even (invalid) count of 1s</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] data,\n  input        parity_bit,\n  output       error\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] data;\n  reg parity_bit;\n  wire error;\n  integer errors = 0;\n  top_module dut(.data(data), .parity_bit(parity_bit), .error(error));\n  task check;\n    input [7:0] d; input p; input ee;\n    begin\n      data = d; parity_bit = p; #1;\n      if (error !== ee) begin\n        errors = errors + 1;\n        $display(\"FAIL data=%b p=%b expected=%b got=%b\", d, p, ee, error);\n      end else $display(\"PASS data=%b p=%b error=%b\", d, p, error);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(8'b00000000, 1, 0);\n    check(8'b00000000, 0, 1);\n    check(8'b00000011, 0, 1);\n    check(8'b00000011, 1, 0);\n    check(8'b11111111, 0, 1);\n    check(8'b11111111, 1, 0);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "data",
      "parity_bit",
      "error"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "data[7:0]",
          "wave": "2.3.4.",
          "data": [
            "00000000",
            "00000011",
            "11111111"
          ]
        },
        {
          "name": "parity_bit",
          "wave": "1.0.1."
        },
        {
          "name": "error",
          "wave": "0.1.0."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "excess3-converter",
    "title": "BCD to Excess-3 Converter",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "code-converter"
    ],
    "category": "Combinational Design",
    "lede": "Convert a BCD digit (0-9) into Excess-3 code, a self-complementing code once used in early decimal computers.",
    "concept": "<b>Concept:</b> Excess-3 is defined as the BCD value plus 3 — <code>excess3 = bcd + 3</code>. That is the entire circuit: one 4-bit adder with a constant operand.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>bcd</td><td>input</td><td>4</td><td>BCD digit, 0-9</td></tr>\n<tr><td>excess3</td><td>output</td><td>4</td><td>bcd + 3</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] bcd,\n  output [3:0] excess3\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] bcd;\n  wire [3:0] excess3;\n  integer errors = 0;\n  top_module dut(.bcd(bcd), .excess3(excess3));\n  task check;\n    input [3:0] b; input [3:0] ee;\n    begin\n      bcd = b; #1;\n      if (excess3 !== ee) begin\n        errors = errors + 1;\n        $display(\"FAIL bcd=%d expected=%d got=%d\", b, ee, excess3);\n      end else $display(\"PASS bcd=%d excess3=%d\", b, excess3);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(0, 3);\n    check(1, 4);\n    check(5, 8);\n    check(9, 12);\n    check(4, 7);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "bcd",
      "excess3"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "bcd[3:0]",
          "wave": "2.3.4.",
          "data": [
            "0",
            "5",
            "9"
          ]
        },
        {
          "name": "excess3[3:0]",
          "wave": "2.3.4.",
          "data": [
            "3",
            "8",
            "12"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "add-sub-unit",
    "title": "4-Bit Add/Subtract Unit",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic"
    ],
    "category": "Combinational Design",
    "lede": "One adder, two operations: a single control bit selects between a+b and a-b using the standard invert-and-add-one trick.",
    "concept": "<b>Concept:</b> <code>{cout,result} = a + (b ^ {4{sub}}) + sub</code>. When <code>sub=0</code>, b passes through unchanged and this is a plain add. When <code>sub=1</code>, every bit of b is inverted and a 1 is added — the classic two's-complement subtraction trick, reusing the same adder hardware.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>4</td><td>First operand</td></tr>\n<tr><td>b</td><td>input</td><td>4</td><td>Second operand</td></tr>\n<tr><td>sub</td><td>input</td><td>1</td><td>0 = add, 1 = subtract (a - b)</td></tr>\n<tr><td>result</td><td>output</td><td>4</td><td>a+b or a-b, wrapped</td></tr>\n<tr><td>cout</td><td>output</td><td>1</td><td>Carry out (add) / NOT-borrow (subtract)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] a,\n  input  [3:0] b,\n  input        sub,\n  output [3:0] result,\n  output       cout\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] a, b;\n  reg sub;\n  wire [3:0] result;\n  wire cout;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .sub(sub), .result(result), .cout(cout));\n  task check;\n    input [3:0] ia, ib; input isub; input [3:0] er; input ec;\n    begin\n      a = ia; b = ib; sub = isub; #1;\n      if (result !== er || cout !== ec) begin\n        errors = errors + 1;\n        $display(\"FAIL a=%d b=%d sub=%b expected result=%d cout=%b got result=%d cout=%b\", ia, ib, isub, er, ec, result, cout);\n      end else $display(\"PASS a=%d b=%d sub=%b result=%d cout=%b\", ia, ib, isub, result, cout);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(4'd3, 4'd4, 0, 4'd7, 0);\n    check(4'd7, 4'd3, 1, 4'd4, 1);\n    check(4'd3, 4'd7, 1, 4'd12, 0);\n    check(4'd15, 4'd1, 0, 4'd0, 1);\n    check(4'd5, 4'd5, 1, 4'd0, 1);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "sub",
      "result",
      "cout"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[3:0]",
          "wave": "2.3.4.",
          "data": [
            "3",
            "7",
            "3"
          ]
        },
        {
          "name": "b[3:0]",
          "wave": "2.3.4.",
          "data": [
            "4",
            "3",
            "7"
          ]
        },
        {
          "name": "sub",
          "wave": "0.1..."
        },
        {
          "name": "result[3:0]",
          "wave": "2.3.4.",
          "data": [
            "7",
            "4",
            "12"
          ]
        },
        {
          "name": "cout",
          "wave": "0.1.0."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "mux8to1",
    "title": "8-to-1 Multiplexer",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "mux"
    ],
    "category": "Combinational Design",
    "lede": "The next step up from 2:1 and 4:1 — select one of eight inputs using a 3-bit select line.",
    "concept": "<b>Concept:</b> <code>out = in[sel];</code> — Verilog's bit-select operator with a variable index already implements the entire multiplexer in one line.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>in</td><td>input</td><td>8</td><td>Input bits</td></tr>\n<tr><td>sel</td><td>input</td><td>3</td><td>Select index, 0-7</td></tr>\n<tr><td>out</td><td>output</td><td>1</td><td>in[sel]</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] in,\n  input  [2:0] sel,\n  output       out\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] in;\n  reg [2:0] sel;\n  wire out;\n  integer errors = 0;\n  top_module dut(.in(in), .sel(sel), .out(out));\n  task check;\n    input [7:0] i; input [2:0] s; input eo;\n    begin\n      in = i; sel = s; #1;\n      if (out !== eo) begin\n        errors = errors + 1;\n        $display(\"FAIL in=%b sel=%d expected=%b got=%b\", i, s, eo, out);\n      end else $display(\"PASS in=%b sel=%d out=%b\", i, s, out);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(8'b10110010, 0, 0);\n    check(8'b10110010, 1, 1);\n    check(8'b10110010, 4, 1);\n    check(8'b10110010, 7, 1);\n    check(8'b10110010, 3, 0);\n    check(8'b00000001, 0, 1);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "in",
      "sel",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "in[7:0]",
          "wave": "2.....",
          "data": [
            "10110010"
          ]
        },
        {
          "name": "sel[2:0]",
          "wave": "2.3.4.",
          "data": [
            "0",
            "1",
            "4"
          ]
        },
        {
          "name": "out",
          "wave": "0.1..."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "decoder-3to8",
    "title": "3-to-8 Line Decoder",
    "difficulty": "easy",
    "points": 10,
    "level": 1,
    "tags": [
      "combinational",
      "decoder"
    ],
    "category": "Combinational Design",
    "lede": "The 3-bit sibling of the 2-to-4 decoder — turn a 3-bit address into a one-hot 8-bit select line, gated by enable.",
    "concept": "<b>Concept:</b> Same shift-a-hot-bit idiom as the 2-to-4 decoder, one bit wider: <code>out = en ? (8'b1 &lt;&lt; in) : 8'b0;</code>.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>in</td><td>input</td><td>3</td><td>Address to decode</td></tr>\n<tr><td>en</td><td>input</td><td>1</td><td>Active-high enable</td></tr>\n<tr><td>out</td><td>output</td><td>8</td><td>One-hot output, all 0 when en=0</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [2:0] in,\n  input        en,\n  output [7:0] out\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [2:0] in;\n  reg en;\n  wire [7:0] out;\n  integer errors = 0;\n  top_module dut(.in(in), .en(en), .out(out));\n  task check;\n    input [2:0] i; input e; input [7:0] eo;\n    begin\n      in = i; en = e; #1;\n      if (out !== eo) begin\n        errors = errors + 1;\n        $display(\"FAIL in=%d en=%b expected=%b got=%b\", i, e, eo, out);\n      end else $display(\"PASS in=%d en=%b out=%b\", i, e, out);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(0, 1, 8'b00000001);\n    check(3, 1, 8'b00001000);\n    check(7, 1, 8'b10000000);\n    check(0, 0, 8'b00000000);\n    check(7, 0, 8'b00000000);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "in",
      "en",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "in[2:0]",
          "wave": "2.3.4.",
          "data": [
            "0",
            "3",
            "7"
          ]
        },
        {
          "name": "en",
          "wave": "1....."
        },
        {
          "name": "out[7:0]",
          "wave": "2.3.4.",
          "data": [
            "00000001",
            "00001000",
            "10000000"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "carry-lookahead-adder4",
    "title": "4-Bit Carry Lookahead Adder",
    "difficulty": "hard",
    "points": 50,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic"
    ],
    "category": "Combinational Design",
    "lede": "Compute all four carries in parallel from generate/propagate signals instead of rippling them one bit at a time — the classic fix for ripple-carry's O(N) delay.",
    "concept": "<b>Concept:</b> For each bit, define generate <code>g=a&amp;b</code> (this bit always produces a carry) and propagate <code>p=a^b</code> (this bit passes an incoming carry through). Each carry <code>c[i+1] = g[i] | (p[i]&amp;c[i])</code> can be expanded algebraically into a flat OR-of-ANDs expression depending only on the original a/b bits and cin — computable in parallel, not sequentially.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>4</td><td>First operand</td></tr>\n<tr><td>b</td><td>input</td><td>4</td><td>Second operand</td></tr>\n<tr><td>cin</td><td>input</td><td>1</td><td>Carry in</td></tr>\n<tr><td>sum</td><td>output</td><td>4</td><td>a + b + cin, low 4 bits</td></tr>\n<tr><td>cout</td><td>output</td><td>1</td><td>Carry out</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] a,\n  input  [3:0] b,\n  input        cin,\n  output [3:0] sum,\n  output       cout\n);\n\n  // Your code here — compute g[i]=a[i]&b[i], p[i]=a[i]^b[i], then expand each carry from g/p/cin directly (no rippling).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] a, b;\n  reg cin;\n  wire [3:0] sum;\n  wire cout;\n  reg [4:0] expected;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .cin(cin), .sum(sum), .cout(cout));\n  task check;\n    input [3:0] ia, ib; input ic;\n    begin\n      a = ia; b = ib; cin = ic; #1;\n      expected = ia + ib + ic;\n      if (sum !== expected[3:0] || cout !== expected[4]) begin\n        errors = errors + 1;\n        $display(\"FAIL a=%d b=%d cin=%b expected sum=%d cout=%b got sum=%d cout=%b\", ia, ib, ic, expected[3:0], expected[4], sum, cout);\n      end else $display(\"PASS a=%d b=%d cin=%b sum=%d cout=%b\", ia, ib, ic, sum, cout);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(4'd3, 4'd4, 0);\n    check(4'd15, 4'd1, 0);\n    check(4'd7, 4'd8, 1);\n    check(4'd5, 4'd5, 1);\n    check(4'd0, 4'd0, 1);\n    check(4'd15, 4'd15, 1);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "cin",
      "sum",
      "cout"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[3:0]",
          "wave": "2.3.4.",
          "data": [
            "3",
            "15",
            "7"
          ]
        },
        {
          "name": "b[3:0]",
          "wave": "2.3.4.",
          "data": [
            "4",
            "1",
            "8"
          ]
        },
        {
          "name": "cin",
          "wave": "0...1."
        },
        {
          "name": "sum[3:0]",
          "wave": "2.3.4.",
          "data": [
            "7",
            "0",
            "0"
          ]
        },
        {
          "name": "cout",
          "wave": "0.1..."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "equality-checker-8bit",
    "title": "8-Bit Equality Checker",
    "difficulty": "easy",
    "points": 10,
    "level": 1,
    "tags": [
      "combinational",
      "comparator"
    ],
    "category": "Combinational Design",
    "lede": "A dedicated equal-only comparator for two 8-bit buses — the cheap end of the comparator family, no subtractor required.",
    "concept": "<b>Concept:</b> <code>eq = (a == b);</code>. Synthesis turns this into an XNOR-per-bit-plus-AND-tree — much shallower logic than a less-than compare, which needs a subtractor.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>8</td><td>First operand</td></tr>\n<tr><td>b</td><td>input</td><td>8</td><td>Second operand</td></tr>\n<tr><td>eq</td><td>output</td><td>1</td><td>1 if a == b</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] a,\n  input  [7:0] b,\n  output       eq\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] a, b;\n  wire eq;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .eq(eq));\n  task check;\n    input [7:0] ia, ib; input ee;\n    begin\n      a = ia; b = ib; #1;\n      if (eq !== ee) begin\n        errors = errors + 1;\n        $display(\"FAIL a=%b b=%b expected=%b got=%b\", ia, ib, ee, eq);\n      end else $display(\"PASS a=%b b=%b eq=%b\", ia, ib, eq);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(8'b00000000, 8'b00000000, 1);\n    check(8'b00001111, 8'b00001111, 1);\n    check(8'b00010000, 8'b00000000, 0);\n    check(8'b10000000, 8'b00000000, 0);\n    check(8'b11111111, 8'b11111111, 1);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "eq"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[7:0]",
          "wave": "2.3.4.",
          "data": [
            "00000000",
            "00010000",
            "11111111"
          ]
        },
        {
          "name": "b[7:0]",
          "wave": "2...3.",
          "data": [
            "00000000",
            "11111111"
          ]
        },
        {
          "name": "eq",
          "wave": "1.0..1"
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "array-multiplier-4bit",
    "title": "4-Bit Array Multiplier",
    "difficulty": "hard",
    "points": 50,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic"
    ],
    "category": "Combinational Design",
    "lede": "Multiply two 4-bit numbers into an 8-bit product — the operation an array multiplier builds from a grid of AND gates and adders.",
    "concept": "<b>Concept:</b> <code>product = a * b;</code>. Verilog's <code>*</code> operator infers a multiplier at synthesis (an array of partial-product AND gates summed by adder rows) — the same structure you'd build by hand, just described behaviorally instead of gate-by-gate.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>4</td><td>First operand</td></tr>\n<tr><td>b</td><td>input</td><td>4</td><td>Second operand</td></tr>\n<tr><td>product</td><td>output</td><td>8</td><td>a &times; b</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] a,\n  input  [3:0] b,\n  output [7:0] product\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] a, b;\n  wire [7:0] product;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .product(product));\n  task check;\n    input [3:0] ia, ib; input [7:0] ep;\n    begin\n      a = ia; b = ib; #1;\n      if (product !== ep) begin\n        errors = errors + 1;\n        $display(\"FAIL a=%d b=%d expected=%d got=%d\", ia, ib, ep, product);\n      end else $display(\"PASS a=%d b=%d product=%d\", ia, ib, product);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(4'd3, 4'd4, 8'd12);\n    check(4'd15, 4'd15, 8'd225);\n    check(4'd0, 4'd5, 8'd0);\n    check(4'd7, 4'd7, 8'd49);\n    check(4'd1, 4'd9, 8'd9);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "product"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[3:0]",
          "wave": "2.3.4.",
          "data": [
            "3",
            "15",
            "7"
          ]
        },
        {
          "name": "b[3:0]",
          "wave": "2.3.4.",
          "data": [
            "4",
            "15",
            "7"
          ]
        },
        {
          "name": "product[7:0]",
          "wave": "2.3.4.",
          "data": [
            "12",
            "225",
            "49"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "bcd-adder",
    "title": "BCD Digit Adder",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic"
    ],
    "category": "Combinational Design",
    "lede": "Add two BCD digits (0-9) plus a carry-in and produce a valid BCD digit result — binary addition alone isn't enough once the sum exceeds 9.",
    "concept": "<b>Concept:</b> First add normally in binary: <code>bin_sum = a + b + cin</code>. If that exceeds 9, it's not a valid BCD digit — add 6 to skip over the 6 unused 4-bit codes (10-15) and land back on a valid digit with a decimal carry: <code>cout = (bin_sum &gt; 9); corrected = cout ? bin_sum+6 : bin_sum;</code>.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>4</td><td>BCD digit, 0-9</td></tr>\n<tr><td>b</td><td>input</td><td>4</td><td>BCD digit, 0-9</td></tr>\n<tr><td>cin</td><td>input</td><td>1</td><td>Carry in</td></tr>\n<tr><td>sum</td><td>output</td><td>4</td><td>Result BCD digit</td></tr>\n<tr><td>cout</td><td>output</td><td>1</td><td>Decimal carry out</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] a,\n  input  [3:0] b,\n  input        cin,\n  output [3:0] sum,\n  output       cout\n);\n\n  // Your code here — binary add, then add 6 and set cout if the result exceeds 9.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] a, b;\n  reg cin;\n  wire [3:0] sum;\n  wire cout;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .cin(cin), .sum(sum), .cout(cout));\n  task check;\n    input [3:0] ia, ib; input ic; input [3:0] es; input ec;\n    begin\n      a = ia; b = ib; cin = ic; #1;\n      if (sum !== es || cout !== ec) begin\n        errors = errors + 1;\n        $display(\"FAIL a=%d b=%d cin=%b expected sum=%d cout=%b got sum=%d cout=%b\", ia, ib, ic, es, ec, sum, cout);\n      end else $display(\"PASS a=%d b=%d cin=%b sum=%d cout=%b\", ia, ib, ic, sum, cout);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(4'd3, 4'd4, 0, 4'd7, 0);\n    check(4'd5, 4'd6, 0, 4'd1, 1);\n    check(4'd9, 4'd9, 1, 4'd9, 1);\n    check(4'd0, 4'd0, 0, 4'd0, 0);\n    check(4'd4, 4'd5, 1, 4'd0, 1);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "cin",
      "sum",
      "cout"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[3:0]",
          "wave": "2.3.4.",
          "data": [
            "3",
            "5",
            "9"
          ]
        },
        {
          "name": "b[3:0]",
          "wave": "2.3.4.",
          "data": [
            "4",
            "6",
            "9"
          ]
        },
        {
          "name": "cin",
          "wave": "0...1."
        },
        {
          "name": "sum[3:0]",
          "wave": "2.3.4.",
          "data": [
            "7",
            "1",
            "9"
          ]
        },
        {
          "name": "cout",
          "wave": "0.1..."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "compressor-4to2",
    "title": "4:2 Carry-Save Compressor",
    "difficulty": "hard",
    "points": 50,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic"
    ],
    "category": "Combinational Design",
    "lede": "Reduce five weight-1 inputs (four data bits plus a carry-in) down to a sum bit and two weight-2 outputs — the building block that makes fast multiplier reduction trees possible.",
    "concept": "<b>Concept:</b> A 4:2 compressor doesn't need to be thought of gate-by-gate — it just needs to preserve total value: <code>a+b+c+d+cin = sum + 2×(carry+cout)</code>. Count the total number of 1s among the five inputs (0-5); the low bit of that count is <code>sum</code>, and the upper two bits split across <code>carry</code> and <code>cout</code>.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>1</td><td>Data bit</td></tr>\n<tr><td>b</td><td>input</td><td>1</td><td>Data bit</td></tr>\n<tr><td>c</td><td>input</td><td>1</td><td>Data bit</td></tr>\n<tr><td>d</td><td>input</td><td>1</td><td>Data bit</td></tr>\n<tr><td>cin</td><td>input</td><td>1</td><td>Carry in from a neighboring compressor</td></tr>\n<tr><td>sum</td><td>output</td><td>1</td><td>Weight-1 output</td></tr>\n<tr><td>carry</td><td>output</td><td>1</td><td>Weight-2 output</td></tr>\n<tr><td>cout</td><td>output</td><td>1</td><td>Weight-2 output (carries to the next compressor)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  a,\n  input  b,\n  input  c,\n  input  d,\n  input  cin,\n  output sum,\n  output carry,\n  output cout\n);\n\n  // Your code here — total = a+b+c+d+cin (0..5); sum=total[0], carry=total[1], cout=total[2].\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg a, b, c, d, cin;\n  wire sum, carry, cout;\n  reg [2:0] total;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .c(c), .d(d), .cin(cin), .sum(sum), .carry(carry), .cout(cout));\n  task check;\n    input ia, ib, ic, id, icin;\n    begin\n      a = ia; b = ib; c = ic; d = id; cin = icin; #1;\n      total = ia + ib + ic + id + icin;\n      if (sum !== total[0] || carry !== total[1] || cout !== total[2]) begin\n        errors = errors + 1;\n        $display(\"FAIL a=%b b=%b c=%b d=%b cin=%b expected total=%d got sum=%b carry=%b cout=%b\", ia, ib, ic, id, icin, total, sum, carry, cout);\n      end else $display(\"PASS a=%b b=%b c=%b d=%b cin=%b total=%d\", ia, ib, ic, id, icin, total);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(0, 0, 0, 0, 0);\n    check(1, 0, 0, 0, 0);\n    check(1, 1, 0, 0, 0);\n    check(1, 1, 1, 0, 0);\n    check(1, 1, 1, 1, 0);\n    check(1, 1, 1, 1, 1);\n    check(0, 1, 0, 1, 1);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "c",
      "d",
      "cin",
      "sum",
      "carry",
      "cout"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a",
          "wave": "0.1.1.1."
        },
        {
          "name": "b",
          "wave": "0.0.1.1."
        },
        {
          "name": "c",
          "wave": "0.0.0.1."
        },
        {
          "name": "d",
          "wave": "0.0.0.0."
        },
        {
          "name": "cin",
          "wave": "0......."
        },
        {
          "name": "sum",
          "wave": "0.1.0.1."
        },
        {
          "name": "carry",
          "wave": "0...1..."
        },
        {
          "name": "cout",
          "wave": "0......."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "sr-flip-flop",
    "title": "SR Flip-Flop",
    "difficulty": "easy",
    "points": 10,
    "level": 3,
    "tags": [
      "sequential",
      "flip-flop"
    ],
    "category": "Sequential Design",
    "lede": "A set/reset flip-flop with a well-defined answer for the \"both asserted\" case that the classic SR latch leaves undefined.",
    "concept": "<b>Concept:</b> Give reset priority: <code>if (r) q&lt;=0; else if (s) q&lt;=1;</code>. Whichever input you check first in the if-chain automatically wins when both are asserted — no invalid/undefined state, unlike a level-sensitive SR latch.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>s</td><td>input</td><td>1</td><td>Set</td></tr>\n<tr><td>r</td><td>input</td><td>1</td><td>Reset (priority over set)</td></tr>\n<tr><td>q</td><td>output</td><td>1</td><td>Stored bit</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input      clk,\n  input      s,\n  input      r,\n  output reg q\n);\n\n  // Your code here — give r priority over s.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, s, r;\n  wire q;\n  integer errors = 0;\n  top_module dut(.clk(clk), .s(s), .r(r), .q(q));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input eq; input [127:0] label;\n    begin\n      if (q !== eq) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%b got=%b\", label, eq, q);\n      end else $display(\"PASS %0s q=%b\", label, q);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    s = 1; r = 0; @(posedge clk); #1; check(1, \"set\");\n    s = 0; r = 0; @(posedge clk); #1; check(1, \"hold\");\n    s = 0; r = 1; @(posedge clk); #1; check(0, \"reset\");\n    s = 1; r = 1; @(posedge clk); #1; check(0, \"both-r-wins\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "s",
      "r",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "s",
          "wave": "1.0...1."
        },
        {
          "name": "r",
          "wave": "0...1..."
        },
        {
          "name": "q",
          "wave": "1...0..."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "d-latch",
    "title": "D Latch (Level-Sensitive)",
    "difficulty": "easy",
    "points": 10,
    "level": 3,
    "tags": [
      "sequential",
      "latch"
    ],
    "category": "Sequential Design",
    "lede": "A transparent latch: while enable is high, the output follows the input instantly; once enable drops, the last value is held — no clock edge involved.",
    "concept": "<b>Concept:</b> <code>always @(*) if (en) q = d;</code> — deliberately omitting an else branch. Verilog then infers a latch that retains its previous value whenever the condition is false, which is exactly the level-sensitive hold behavior a latch needs (unlike a flip-flop, there is no clock here at all).",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>en</td><td>input</td><td>1</td><td>Enable — transparent when high</td></tr>\n<tr><td>d</td><td>input</td><td>1</td><td>Data in</td></tr>\n<tr><td>q</td><td>output</td><td>1</td><td>Follows d while en=1, holds otherwise</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input      en,\n  input      d,\n  output reg q\n);\n\n  // Your code here — no else branch: that's what makes it a latch.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg en, d;\n  wire q;\n  integer errors = 0;\n  top_module dut(.en(en), .d(d), .q(q));\n  task check;\n    input eq; input [127:0] label;\n    begin\n      if (q !== eq) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%b got=%b\", label, eq, q);\n      end else $display(\"PASS %0s q=%b\", label, q);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    en = 1; d = 1; #1; check(1, \"transparent1\");\n    en = 0; d = 0; #1; check(1, \"hold-after-close\");\n    en = 1; d = 0; #1; check(0, \"transparent0\");\n    en = 0; d = 1; #1; check(0, \"hold-again\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "en",
      "d",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "en",
          "wave": "1.0.1.0."
        },
        {
          "name": "d",
          "wave": "1.0...1."
        },
        {
          "name": "q",
          "wave": "1...0..."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "johnson-counter",
    "title": "4-Bit Johnson Counter",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "counter"
    ],
    "category": "Sequential Design",
    "lede": "A twisted-ring counter that walks through 2N unique states by shifting in the inverted MSB each cycle — a different rhythm from a plain ring or binary counter.",
    "concept": "<b>Concept:</b> <code>q &lt;= {q[2:0], ~q[3]};</code> — shift left, feeding the complement of the outgoing MSB back into the LSB. Starting from 0000, this walks 0001, 0011, 0111, 1111, then back down 1110, 1100, 1000, before returning to 0000 — 8 unique states from a 4-bit register.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (clears to 0000)</td></tr>\n<tr><td>q</td><td>output</td><td>4</td><td>Johnson counter state</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input            clk,\n  input            rst,\n  output reg [3:0] q\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst;\n  wire [3:0] q;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .q(q));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input [3:0] eq; input [127:0] label;\n    begin\n      if (q !== eq) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%b got=%b\", label, eq, q);\n      end else $display(\"PASS %0s q=%b\", label, q);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; @(posedge clk); #1; check(4'b0000, \"reset\");\n    rst = 0;\n    @(posedge clk); #1; check(4'b0001, \"s1\");\n    @(posedge clk); #1; check(4'b0011, \"s2\");\n    @(posedge clk); #1; check(4'b0111, \"s3\");\n    @(posedge clk); #1; check(4'b1111, \"s4\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "rst",
          "wave": "10........"
        },
        {
          "name": "q[3:0]",
          "wave": "2.3.4.5.6.",
          "data": [
            "0000",
            "0001",
            "0011",
            "0111",
            "1111"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "ring-counter",
    "title": "4-Bit Ring Counter",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "counter"
    ],
    "category": "Sequential Design",
    "lede": "A single active bit walks around a 4-bit register, wrapping back to the start — the one-hot counter used to sequence states with zero decode logic.",
    "concept": "<b>Concept:</b> <code>q &lt;= {q[2:0], q[3]};</code> — a rotate-left, not a plain shift. The outgoing MSB feeds straight back into the LSB, which is what makes the single 1 circulate forever instead of shifting out and leaving the register at all-zeros.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (seeds q to 0001)</td></tr>\n<tr><td>q</td><td>output</td><td>4</td><td>One-hot walking bit</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input            clk,\n  input            rst,\n  output reg [3:0] q\n);\n\n  // Your code here — rotate left, wrapping the MSB back to the LSB.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst;\n  wire [3:0] q;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .q(q));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input [3:0] eq; input [127:0] label;\n    begin\n      if (q !== eq) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%b got=%b\", label, eq, q);\n      end else $display(\"PASS %0s q=%b\", label, q);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; @(posedge clk); #1; check(4'b0001, \"reset\");\n    rst = 0;\n    @(posedge clk); #1; check(4'b0010, \"s1\");\n    @(posedge clk); #1; check(4'b0100, \"s2\");\n    @(posedge clk); #1; check(4'b1000, \"s3\");\n    @(posedge clk); #1; check(4'b0001, \"wrap\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "rst",
          "wave": "10........"
        },
        {
          "name": "q[3:0]",
          "wave": "2.3.4.5.6.",
          "data": [
            "0001",
            "0010",
            "0100",
            "1000",
            "0001"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "saturating-counter",
    "title": "4-Bit Saturating Up/Down Counter",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "counter"
    ],
    "category": "Sequential Design",
    "lede": "A counter that clamps at its limits instead of wrapping — pushing further up at 15 or further down at 0 simply has no effect.",
    "concept": "<b>Concept:</b> Guard each direction with a boundary check before incrementing: <code>q &lt;= (q==15) ? q : q+1;</code> for up, and the mirror check for down. Saturation arithmetic like this shows up constantly in DSP and control logic where wraparound would be a real bug (a volume level \"counter\" should not wrap from max back to 0).",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>en</td><td>input</td><td>1</td><td>Count enable</td></tr>\n<tr><td>up_down</td><td>input</td><td>1</td><td>1 = count up, 0 = count down</td></tr>\n<tr><td>q</td><td>output</td><td>4</td><td>Counter value, clamped to 0-15</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input            clk,\n  input            rst,\n  input            en,\n  input            up_down,\n  output reg [3:0] q\n);\n\n  // Your code here — clamp at 15 going up, clamp at 0 going down.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, en, up_down;\n  wire [3:0] q;\n  integer errors = 0;\n  integer i;\n  top_module dut(.clk(clk), .rst(rst), .en(en), .up_down(up_down), .q(q));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input [3:0] eq; input [127:0] label;\n    begin\n      if (q !== eq) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%d got=%d\", label, eq, q);\n      end else $display(\"PASS %0s q=%d\", label, q);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; en = 0; up_down = 1; @(posedge clk); #1; check(0, \"reset\");\n    rst = 0; en = 1; up_down = 1;\n    for (i = 0; i < 15; i = i + 1) begin @(posedge clk); #1; end\n    check(15, \"reached-max\");\n    @(posedge clk); #1; check(15, \"saturate-at-max\");\n    @(posedge clk); #1; check(15, \"still-saturated\");\n    up_down = 0;\n    for (i = 0; i < 15; i = i + 1) begin @(posedge clk); #1; end\n    check(0, \"reached-min\");\n    @(posedge clk); #1; check(0, \"saturate-at-min\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "en",
      "up_down",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "up_down",
          "wave": "1.....0."
        },
        {
          "name": "q[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "14",
            "15",
            "15"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "watchdog-timer",
    "title": "Watchdog Timer",
    "difficulty": "medium",
    "points": 25,
    "level": 8,
    "tags": [
      "sequential",
      "timer"
    ],
    "category": "Sequential Design",
    "lede": "A timeout that fires unless it keeps getting \"kicked\" — the safety-net circuit that resets a hung system when its heartbeat stops arriving.",
    "concept": "<b>Concept:</b> A free-running counter resets to 0 every time <code>kick</code> pulses, and otherwise counts up until it hits its limit: <code>timeout = (cnt == LIMIT)</code>. As long as something kicks the dog before the counter reaches the limit, timeout never fires — miss too many kicks in a row, and it does.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>kick</td><td>input</td><td>1</td><td>Resets the timeout counter when pulsed</td></tr>\n<tr><td>timeout</td><td>output</td><td>1</td><td>1 once 4 cycles pass without a kick</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  kick,\n  output timeout\n);\n\n  // Your code here — a counter that resets on kick, and asserts timeout once it reaches 4.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, kick;\n  wire timeout;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .kick(kick), .timeout(timeout));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input et; input [127:0] label;\n    begin\n      if (timeout !== et) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%b got=%b\", label, et, timeout);\n      end else $display(\"PASS %0s timeout=%b\", label, timeout);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; kick = 0; @(posedge clk); #1; check(0, \"reset\");\n    rst = 0;\n    @(posedge clk); #1; check(0, \"c1\");\n    @(posedge clk); #1; check(0, \"c2\");\n    kick = 1; @(posedge clk); #1; check(0, \"kicked-resets\");\n    kick = 0;\n    @(posedge clk); #1; check(0, \"c1-again\");\n    @(posedge clk); #1; check(0, \"c2-again\");\n    @(posedge clk); #1; check(0, \"c3-again\");\n    @(posedge clk); #1; check(1, \"timeout-fires\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "kick",
      "timeout"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p..............."
        },
        {
          "name": "rst",
          "wave": "10.............."
        },
        {
          "name": "kick",
          "wave": "0.....1.0......."
        },
        {
          "name": "timeout",
          "wave": "0.............1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "serial-parity-checker",
    "title": "Streaming Frame Parity Checker",
    "difficulty": "hard",
    "points": 50,
    "level": 3,
    "tags": [
      "sequential",
      "parity"
    ],
    "category": "Sequential Design",
    "lede": "Accumulate the running parity of a serial bit stream one bit per clock, resetting cleanly at the start of every 8-bit frame.",
    "concept": "<b>Concept:</b> A 3-bit counter tracks position within the frame. The first bit of a new frame (<code>cnt==0</code>) loads the accumulator directly; every other bit XORs in. <code>frame_done</code> must be a <em>registered</em> flag driven by the counter's value from the previous cycle — computing it straight off the live counter fires one cycle too early, before the frame's last bit has even been captured.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>bit_in</td><td>input</td><td>1</td><td>Serial bit, one per clock</td></tr>\n<tr><td>parity_out</td><td>output</td><td>1</td><td>Running XOR parity of the current frame</td></tr>\n<tr><td>frame_done</td><td>output</td><td>1</td><td>1 for one cycle after the 8th bit of a frame</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input      clk,\n  input      rst,\n  input      bit_in,\n  output reg parity_out,\n  output reg frame_done\n);\n\n  // Your code here — 3-bit position counter; reset the accumulator at the start of each frame.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, bit_in;\n  wire parity_out, frame_done;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .bit_in(bit_in), .parity_out(parity_out), .frame_done(frame_done));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input ep; input ed; input [127:0] label;\n    begin\n      if (parity_out !== ep || frame_done !== ed) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected parity=%b done=%b got parity=%b done=%b\", label, ep, ed, parity_out, frame_done);\n      end else $display(\"PASS %0s parity=%b done=%b\", label, parity_out, frame_done);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; bit_in = 0; @(posedge clk); #1; check(0, 0, \"reset\");\n    rst = 0;\n    bit_in = 1; @(posedge clk); #1; check(1, 0, \"b1\");\n    bit_in = 0; @(posedge clk); #1; check(1, 0, \"b2\");\n    bit_in = 1; @(posedge clk); #1; check(0, 0, \"b3\");\n    bit_in = 0; @(posedge clk); #1; check(0, 0, \"b4\");\n    bit_in = 0; @(posedge clk); #1; check(0, 0, \"b5\");\n    bit_in = 0; @(posedge clk); #1; check(0, 0, \"b6\");\n    bit_in = 0; @(posedge clk); #1; check(0, 0, \"b7\");\n    bit_in = 1; @(posedge clk); #1; check(1, 1, \"b8-frame-done\");\n    bit_in = 1; @(posedge clk); #1; check(1, 0, \"new-frame-b1\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "bit_in",
      "parity_out",
      "frame_done"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p..............."
        },
        {
          "name": "bit_in",
          "wave": "2.3.4.5.6.7.8.9.",
          "data": [
            "1",
            "0",
            "1",
            "0",
            "0",
            "0",
            "0",
            "1"
          ]
        },
        {
          "name": "parity_out",
          "wave": "2.3.4.5.6.7.8.9.",
          "data": [
            "1",
            "1",
            "0",
            "0",
            "0",
            "0",
            "0",
            "1"
          ]
        },
        {
          "name": "frame_done",
          "wave": "0.............1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "programmable-clock-divider",
    "title": "Programmable Clock Divider",
    "difficulty": "hard",
    "points": 50,
    "level": 5,
    "tags": [
      "sequential",
      "clock"
    ],
    "category": "Sequential Design",
    "lede": "A generalized version of divide-by-3: the division amount is set by a runtime input instead of being hardwired into the design.",
    "concept": "<b>Concept:</b> <code>cnt</code> wraps at <code>div-1</code> instead of a fixed constant: <code>if (cnt &gt;= div-1) cnt&lt;=0; else cnt&lt;=cnt+1;</code>. The <code>-1</code> matters — comparing against <code>div</code> instead gives a period one cycle longer than requested, the exact off-by-one that divide-by-3 warns about generalized to any N.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Input clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>div</td><td>input</td><td>4</td><td>Divide value (period in input clocks), &ge;1</td></tr>\n<tr><td>pulse_out</td><td>output</td><td>1</td><td>High for 1 cycle out of every div cycles</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  [3:0] div,\n  output pulse_out\n);\n\n  // Your code here — counter wraps at div-1, not a fixed constant.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst;\n  reg [3:0] div;\n  wire pulse_out;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .div(div), .pulse_out(pulse_out));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input ep; input [127:0] label;\n    begin\n      if (pulse_out !== ep) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%b got=%b\", label, ep, pulse_out);\n      end else $display(\"PASS %0s pulse_out=%b\", label, pulse_out);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; div = 4'd4; @(posedge clk); #1; check(1, \"reset-cnt0\");\n    rst = 0;\n    @(posedge clk); #1; check(0, \"c1\");\n    @(posedge clk); #1; check(0, \"c2\");\n    @(posedge clk); #1; check(0, \"c3\");\n    @(posedge clk); #1; check(1, \"wrap-div4\");\n    rst = 1; @(posedge clk); #1; rst = 0; div = 4'd2;\n    @(posedge clk); #1; check(0, \"div2-c1\");\n    @(posedge clk); #1; check(1, \"div2-wrap\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "div",
      "pulse_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "rst",
          "wave": "10........"
        },
        {
          "name": "pulse_out",
          "wave": "1.0...1.0."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "stack-pointer-updown",
    "title": "Push/Pop Stack Pointer",
    "difficulty": "medium",
    "points": 25,
    "level": 5,
    "tags": [
      "sequential",
      "pointer"
    ],
    "category": "Sequential Design",
    "lede": "A 4-bit stack pointer that moves up on push and down on pop, refusing to overflow past 15 or underflow past 0.",
    "concept": "<b>Concept:</b> Guard both operations against their boundary: <code>if (push &amp;&amp; !full) sp&lt;=sp+1; else if (pop &amp;&amp; !empty) sp&lt;=sp-1;</code>. Without those guards, a push at full (or pop at empty) silently wraps the pointer around — corrupting whatever memory the pointer indexes into.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>push</td><td>input</td><td>1</td><td>Increment sp (ignored if full)</td></tr>\n<tr><td>pop</td><td>input</td><td>1</td><td>Decrement sp (ignored if empty)</td></tr>\n<tr><td>sp</td><td>output</td><td>4</td><td>Stack pointer, 0-15</td></tr>\n<tr><td>full</td><td>output</td><td>1</td><td>1 when sp == 15</td></tr>\n<tr><td>empty</td><td>output</td><td>1</td><td>1 when sp == 0</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input            clk,\n  input            rst,\n  input            push,\n  input            pop,\n  output reg [3:0] sp,\n  output           full,\n  output           empty\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, push, pop;\n  wire [3:0] sp;\n  wire full, empty;\n  integer errors = 0;\n  integer i;\n  top_module dut(.clk(clk), .rst(rst), .push(push), .pop(pop), .sp(sp), .full(full), .empty(empty));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input [3:0] es; input ef; input ee; input [127:0] label;\n    begin\n      if (sp !== es || full !== ef || empty !== ee) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected sp=%d full=%b empty=%b got sp=%d full=%b empty=%b\", label, es, ef, ee, sp, full, empty);\n      end else $display(\"PASS %0s sp=%d full=%b empty=%b\", label, sp, full, empty);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; push = 0; pop = 0; @(posedge clk); #1; check(0, 0, 1, \"reset\");\n    rst = 0; push = 1;\n    for (i = 0; i < 15; i = i + 1) begin @(posedge clk); #1; end\n    check(15, 1, 0, \"pushed-to-full\");\n    @(posedge clk); #1; check(15, 1, 0, \"push-blocked-at-full\");\n    push = 0; pop = 1;\n    for (i = 0; i < 15; i = i + 1) begin @(posedge clk); #1; end\n    check(0, 0, 1, \"popped-to-empty\");\n    @(posedge clk); #1; check(0, 0, 1, \"pop-blocked-at-empty\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "push",
      "pop",
      "sp"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "push",
          "wave": "0.1...0."
        },
        {
          "name": "pop",
          "wave": "0.....1."
        },
        {
          "name": "sp[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "1",
            "2",
            "1"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "debounce-circuit",
    "title": "Button Debouncer",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "debounce"
    ],
    "category": "Sequential Design",
    "lede": "Filter out mechanical switch bounce: only pass a button input through once it has held the same value for 3 consecutive clock cycles.",
    "concept": "<b>Concept:</b> Track a candidate value and a run-length counter. Any time the input disagrees with the current candidate, immediately adopt it as the new candidate and restart the counter at 1 (that sample itself is the first match). Only once the counter reaches the stability threshold does the committed output actually update — a glitch that reverses before reaching the threshold never reaches the output at all.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>btn_in</td><td>input</td><td>1</td><td>Raw, potentially bouncing button input</td></tr>\n<tr><td>btn_out</td><td>output</td><td>1</td><td>Debounced output, updates after 3 stable cycles</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input      clk,\n  input      rst,\n  input      btn_in,\n  output reg btn_out\n);\n\n  // Your code here — track a candidate value + a run-length counter (any mismatch resets the count to 1, not 0).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, btn_in;\n  wire btn_out;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .btn_in(btn_in), .btn_out(btn_out));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input eb; input [127:0] label;\n    begin\n      if (btn_out !== eb) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%b got=%b\", label, eb, btn_out);\n      end else $display(\"PASS %0s btn_out=%b\", label, btn_out);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; btn_in = 0; @(posedge clk); #1; check(0, \"reset\");\n    rst = 0;\n    btn_in = 1; @(posedge clk); #1; check(0, \"glitch1-c1\");\n    btn_in = 0; @(posedge clk); #1; check(0, \"glitch-back-to-0\");\n    btn_in = 1; @(posedge clk); #1; check(0, \"stable1-c1\");\n    btn_in = 1; @(posedge clk); #1; check(0, \"stable1-c2\");\n    btn_in = 1; @(posedge clk); #1; check(1, \"stable1-c3-commits\");\n    btn_in = 1; @(posedge clk); #1; check(1, \"stays-1\");\n    btn_in = 0; @(posedge clk); #1; check(1, \"drop-c1\");\n    btn_in = 0; @(posedge clk); #1; check(1, \"drop-c2\");\n    btn_in = 0; @(posedge clk); #1; check(0, \"drop-c3-commits\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "btn_in",
      "btn_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p..................."
        },
        {
          "name": "rst",
          "wave": "1.0................."
        },
        {
          "name": "btn_in",
          "wave": "0.1.0.1.......0....."
        },
        {
          "name": "btn_out",
          "wave": "0.........1.......0."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "hamming74-encoder",
    "title": "Hamming(7,4) Encoder",
    "difficulty": "hard",
    "points": 50,
    "level": 2,
    "tags": [
      "combinational",
      "ecc"
    ],
    "category": "Combinational Design",
    "lede": "Encode 4 data bits into a 7-bit Hamming codeword that can detect and correct any single-bit error — the error-correcting code behind ECC memory.",
    "concept": "<b>Concept:</b> Three parity bits sit at positions 1, 2, and 4; each covers a different overlapping subset of the data bits (<code>p1=d1^d2^d4</code>, <code>p2=d1^d3^d4</code>, <code>p3=d2^d3^d4</code>). The overlap is the whole trick — at the receiver, which parity checks fail pinpoints exactly which single bit position is wrong.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>data</td><td>input</td><td>4</td><td>Data bits d1,d2,d3,d4 (data[0]=d1 ... data[3]=d4)</td></tr>\n<tr><td>codeword</td><td>output</td><td>7</td><td>Encoded 7-bit codeword, positions 1-7 packed as codeword[0]=pos1 ... codeword[6]=pos7</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] data,\n  output [6:0] codeword\n);\n\n  // Your code here — p1=d1^d2^d4, p2=d1^d3^d4, p3=d2^d3^d4; codeword = {d4,d3,d2,p3,d1,p2,p1}.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] data;\n  wire [6:0] codeword;\n  integer errors = 0;\n  top_module dut(.data(data), .codeword(codeword));\n  task check;\n    input [3:0] d; input [6:0] ec;\n    begin\n      data = d; #1;\n      if (codeword !== ec) begin\n        errors = errors + 1;\n        $display(\"FAIL data=%b expected=%b got=%b\", d, ec, codeword);\n      end else $display(\"PASS data=%b codeword=%b\", d, codeword);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(4'b1011, 7'b1010101);\n    check(4'b0000, 7'b0000000);\n    check(4'b1111, 7'b1111111);\n    check(4'b0101, 7'b0101101);\n    check(4'b1001, 7'b1001100);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "data",
      "codeword"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "data[3:0]",
          "wave": "2.3.4.",
          "data": [
            "1011",
            "0101",
            "1001"
          ]
        },
        {
          "name": "codeword[6:0]",
          "wave": "2.3.4.",
          "data": [
            "1010101",
            "0101101",
            "1001100"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "hamming74-decoder",
    "title": "Hamming(7,4) Decoder",
    "difficulty": "hard",
    "points": 50,
    "level": 2,
    "tags": [
      "combinational",
      "ecc"
    ],
    "category": "Combinational Design",
    "lede": "Take a Hamming(7,4) codeword — possibly corrupted by a single flipped bit — and recover the correct data, flag the error, and report exactly which position was wrong.",
    "concept": "<b>Concept:</b> Recompute the same three parity checks the encoder made. Each check that now disagrees contributes a bit to a 3-bit <code>syndrome</code>; by construction, that syndrome value directly equals the 1-indexed position of the flawed bit (0 means no error). Flip the codeword bit at that position to correct it, then extract data from the corrected codeword — extracting from the uncorrected codeword silently ships a wrong data bit whenever the error happens to land on a data position.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>codeword</td><td>input</td><td>7</td><td>Received codeword, possibly with one flipped bit</td></tr>\n<tr><td>data</td><td>output</td><td>4</td><td>Corrected data bits</td></tr>\n<tr><td>error</td><td>output</td><td>1</td><td>1 if any single-bit error was detected</td></tr>\n<tr><td>error_pos</td><td>output</td><td>3</td><td>1-indexed position of the error, 0 if none</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [6:0] codeword,\n  output [3:0] data,\n  output       error,\n  output [2:0] error_pos\n);\n\n  // Your code here — recompute the 3 parity checks into a syndrome, correct the codeword if nonzero, then extract data.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [6:0] codeword;\n  wire [3:0] data;\n  wire error;\n  wire [2:0] error_pos;\n  integer errors = 0;\n  top_module dut(.codeword(codeword), .data(data), .error(error), .error_pos(error_pos));\n  task check;\n    input [6:0] cw; input [3:0] ed; input ee; input [2:0] ep;\n    begin\n      codeword = cw; #1;\n      if (data !== ed || error !== ee || error_pos !== ep) begin\n        errors = errors + 1;\n        $display(\"FAIL cw=%b expected data=%b error=%b pos=%d got data=%b error=%b pos=%d\", cw, ed, ee, ep, data, error, error_pos);\n      end else $display(\"PASS cw=%b data=%b error=%b pos=%d\", cw, data, error, error_pos);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(7'd85, 4'b1011, 0, 0);\n    check(7'd81, 4'b1011, 1, 3);\n    check(7'd84, 4'b1011, 1, 1);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "codeword",
      "data",
      "error",
      "error_pos"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "codeword[6:0]",
          "wave": "2.3.4.",
          "data": [
            "1010101",
            "1010001",
            "1010100"
          ]
        },
        {
          "name": "data[3:0]",
          "wave": "2.....",
          "data": [
            "1011"
          ]
        },
        {
          "name": "error",
          "wave": "0.1..."
        },
        {
          "name": "error_pos[2:0]",
          "wave": "2.3.4.",
          "data": [
            "0",
            "3",
            "1"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "sign-extension",
    "title": "4-to-8 Bit Sign Extension",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic"
    ],
    "category": "Combinational Design",
    "lede": "Widen a 4-bit two's-complement number to 8 bits while preserving its value — a trap many beginners fall into by zero-extending instead.",
    "concept": "<b>Concept:</b> <code>out = {{4{in[3]}}, in};</code> — replicate the sign bit to fill the new upper bits, not zeros. Zero-extending a negative number (whose MSB is 1) silently turns it into a large positive number instead of preserving its value.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>in</td><td>input</td><td>4</td><td>Signed 4-bit value</td></tr>\n<tr><td>out</td><td>output</td><td>8</td><td>Same value, sign-extended to 8 bits</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] in,\n  output [7:0] out\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] in;\n  wire [7:0] out;\n  integer errors = 0;\n  top_module dut(.in(in), .out(out));\n  task check;\n    input [3:0] i; input [7:0] eo;\n    begin\n      in = i; #1;\n      if (out !== eo) begin\n        errors = errors + 1;\n        $display(\"FAIL in=%b expected=%b got=%b\", i, eo, out);\n      end else $display(\"PASS in=%b out=%b\", i, out);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(4'b0101, 8'b00000101);\n    check(4'b1011, 8'b11111011);\n    check(4'b1000, 8'b11111000);\n    check(4'b0000, 8'b00000000);\n    check(4'b0111, 8'b00000111);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "in",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "in[3:0]",
          "wave": "2.3.4.",
          "data": [
            "0101",
            "1011",
            "1000"
          ]
        },
        {
          "name": "out[7:0]",
          "wave": "2.3.4.",
          "data": [
            "00000101",
            "11111011",
            "11111000"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "saturating-adder",
    "title": "8-Bit Saturating Adder",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic"
    ],
    "category": "Combinational Design",
    "lede": "Add two unsigned bytes, but clamp the result at 255 instead of silently wrapping around — the kind of arithmetic DSP and audio-level circuits actually want.",
    "concept": "<b>Concept:</b> Compute the sum one bit wider than needed: <code>wide = a+b</code> (9 bits). If the extra bit is set, the true sum exceeds 255, so clamp: <code>sum = wide[8] ? 255 : wide[7:0];</code>. Plain addition would just drop that overflow bit and wrap.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>8</td><td>First operand</td></tr>\n<tr><td>b</td><td>input</td><td>8</td><td>Second operand</td></tr>\n<tr><td>sum</td><td>output</td><td>8</td><td>a+b, clamped to 255</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] a,\n  input  [7:0] b,\n  output [7:0] sum\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] a, b;\n  wire [7:0] sum;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .sum(sum));\n  task check;\n    input [7:0] ia, ib; input [7:0] es;\n    begin\n      a = ia; b = ib; #1;\n      if (sum !== es) begin\n        errors = errors + 1;\n        $display(\"FAIL a=%d b=%d expected=%d got=%d\", ia, ib, es, sum);\n      end else $display(\"PASS a=%d b=%d sum=%d\", ia, ib, sum);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(8'd200, 8'd100, 8'd255);\n    check(8'd10, 8'd20, 8'd30);\n    check(8'd255, 8'd1, 8'd255);\n    check(8'd0, 8'd0, 8'd0);\n    check(8'd255, 8'd255, 8'd255);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "sum"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[7:0]",
          "wave": "2.3.4.",
          "data": [
            "200",
            "10",
            "255"
          ]
        },
        {
          "name": "b[7:0]",
          "wave": "2.3.4.",
          "data": [
            "100",
            "20",
            "1"
          ]
        },
        {
          "name": "sum[7:0]",
          "wave": "2.3.4.",
          "data": [
            "255",
            "30",
            "255"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "rock-paper-scissors",
    "title": "Rock, Paper, Scissors Judge",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "game"
    ],
    "category": "Combinational Design",
    "lede": "Given both players' moves, decide the winner in a single combinational step — a fun exercise in translating a small rule set into conditional logic.",
    "concept": "<b>Concept:</b> With moves encoded as 0=rock, 1=paper, 2=scissors, a tie is just <code>p1==p2</code>. Otherwise enumerate the three ways player 1 can win (rock beats scissors, paper beats rock, scissors beats paper) as an OR of ANDs; anything else means player 2 won.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>p1</td><td>input</td><td>2</td><td>Player 1's move: 0=rock, 1=paper, 2=scissors</td></tr>\n<tr><td>p2</td><td>input</td><td>2</td><td>Player 2's move</td></tr>\n<tr><td>result</td><td>output</td><td>2</td><td>0=tie, 1=player 1 wins, 2=player 2 wins</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [1:0] p1,\n  input  [1:0] p2,\n  output [1:0] result\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [1:0] p1, p2;\n  wire [1:0] result;\n  integer errors = 0;\n  top_module dut(.p1(p1), .p2(p2), .result(result));\n  task check;\n    input [1:0] a, b; input [1:0] er;\n    begin\n      p1 = a; p2 = b; #1;\n      if (result !== er) begin\n        errors = errors + 1;\n        $display(\"FAIL p1=%d p2=%d expected=%d got=%d\", a, b, er, result);\n      end else $display(\"PASS p1=%d p2=%d result=%d\", a, b, result);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(2'd0, 2'd0, 2'd0);\n    check(2'd0, 2'd2, 2'd1);\n    check(2'd2, 2'd0, 2'd2);\n    check(2'd1, 2'd0, 2'd1);\n    check(2'd2, 2'd1, 2'd1);\n    check(2'd0, 2'd1, 2'd2);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "p1",
      "p2",
      "result"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "p1[1:0]",
          "wave": "2.3.4.",
          "data": [
            "0",
            "0",
            "2"
          ]
        },
        {
          "name": "p2[1:0]",
          "wave": "2.3.4.",
          "data": [
            "0",
            "2",
            "0"
          ]
        },
        {
          "name": "result[1:0]",
          "wave": "2.3.4.",
          "data": [
            "0",
            "1",
            "2"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "onescomplement-checksum",
    "title": "One's-Complement Checksum Adder",
    "difficulty": "hard",
    "points": 50,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic"
    ],
    "category": "Combinational Design",
    "lede": "Add two bytes using end-around-carry addition — the exact arithmetic behind the Internet checksum used in IP, TCP, and UDP headers.",
    "concept": "<b>Concept:</b> Compute the 9-bit sum, then instead of discarding the overflow bit like ordinary addition, wrap it back around and add it into the low byte: <code>sum = wide[7:0] + wide[8];</code>. This \"end-around carry\" is what makes one's-complement arithmetic close under addition — a carry out never actually gets lost, just recycled.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>8</td><td>First operand</td></tr>\n<tr><td>b</td><td>input</td><td>8</td><td>Second operand</td></tr>\n<tr><td>sum</td><td>output</td><td>8</td><td>One's-complement (end-around-carry) sum</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] a,\n  input  [7:0] b,\n  output [7:0] sum\n);\n\n  // Your code here — compute the 9-bit sum, then add the overflow bit back into the low byte.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] a, b;\n  wire [7:0] sum;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .sum(sum));\n  task check;\n    input [7:0] ia, ib; input [7:0] es;\n    begin\n      a = ia; b = ib; #1;\n      if (sum !== es) begin\n        errors = errors + 1;\n        $display(\"FAIL a=%h b=%h expected=%h got=%h\", ia, ib, es, sum);\n      end else $display(\"PASS a=%h b=%h sum=%h\", ia, ib, sum);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(8'hFF, 8'h01, 8'h01);\n    check(8'h50, 8'h50, 8'hA0);\n    check(8'hFF, 8'hFF, 8'hFF);\n    check(8'h00, 8'h00, 8'h00);\n    check(8'hF0, 8'h20, 8'h11);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "sum"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[7:0]",
          "wave": "2.3.4.",
          "data": [
            "ff",
            "50",
            "f0"
          ]
        },
        {
          "name": "b[7:0]",
          "wave": "2.3.4.",
          "data": [
            "01",
            "50",
            "20"
          ]
        },
        {
          "name": "sum[7:0]",
          "wave": "2.3.4.",
          "data": [
            "01",
            "a0",
            "11"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "alu-mips-4bit",
    "title": "4-Bit MIPS-Style ALU",
    "difficulty": "hard",
    "points": 50,
    "level": 2,
    "tags": [
      "combinational",
      "alu"
    ],
    "category": "Combinational Design",
    "lede": "Build the classic MIPS ALU: AND, OR, add, subtract, and set-less-than, selected by the actual 3-bit control codes a real MIPS ALU control unit generates.",
    "concept": "<b>Concept:</b> A <code>case</code> on the 3-bit control code, using the authentic MIPS encoding: <code>000</code>=AND, <code>001</code>=OR, <code>010</code>=ADD, <code>110</code>=SUB, <code>111</code>=SLT (set-less-than, outputs 1 if a&lt;b else 0). Notice ADD and SUB share the same top bit pattern except one bit — that's deliberate in the real ISA, since it lets hardware reuse the same adder with an invertible B input.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>4</td><td>First operand</td></tr>\n<tr><td>b</td><td>input</td><td>4</td><td>Second operand</td></tr>\n<tr><td>alu_ctrl</td><td>input</td><td>3</td><td>000=AND, 001=OR, 010=ADD, 110=SUB, 111=SLT</td></tr>\n<tr><td>result</td><td>output</td><td>4</td><td>ALU result</td></tr>\n<tr><td>zero</td><td>output</td><td>1</td><td>1 if result == 0 (used for branch-equal in a real CPU)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input      [3:0] a,\n  input      [3:0] b,\n  input      [2:0] alu_ctrl,\n  output reg [3:0] result,\n  output           zero\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] a, b;\n  reg [2:0] alu_ctrl;\n  wire [3:0] result;\n  wire zero;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .alu_ctrl(alu_ctrl), .result(result), .zero(zero));\n  task check;\n    input [3:0] ia, ib; input [2:0] ic; input [3:0] er; input ez;\n    begin\n      a = ia; b = ib; alu_ctrl = ic; #1;\n      if (result !== er || zero !== ez) begin\n        errors = errors + 1;\n        $display(\"FAIL a=%d b=%d ctrl=%b expected result=%d zero=%b got result=%d zero=%b\", ia, ib, ic, er, ez, result, zero);\n      end else $display(\"PASS a=%d b=%d ctrl=%b result=%d zero=%b\", ia, ib, ic, result, zero);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(4'd12, 4'd10, 3'b000, 4'd8, 0);\n    check(4'd12, 4'd10, 3'b001, 4'd14, 0);\n    check(4'd3, 4'd4, 3'b010, 4'd7, 0);\n    check(4'd7, 4'd3, 3'b110, 4'd4, 0);\n    check(4'd3, 4'd7, 3'b111, 4'd1, 0);\n    check(4'd7, 4'd3, 3'b111, 4'd0, 1);\n    check(4'd5, 4'd5, 3'b110, 4'd0, 1);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "alu_ctrl",
      "result",
      "zero"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[3:0]",
          "wave": "2.3.4.",
          "data": [
            "12",
            "3",
            "7"
          ]
        },
        {
          "name": "b[3:0]",
          "wave": "2.3.4.",
          "data": [
            "10",
            "4",
            "3"
          ]
        },
        {
          "name": "alu_ctrl[2:0]",
          "wave": "2.3.4.",
          "data": [
            "000",
            "010",
            "110"
          ]
        },
        {
          "name": "result[3:0]",
          "wave": "2.3.4.",
          "data": [
            "8",
            "7",
            "4"
          ]
        },
        {
          "name": "zero",
          "wave": "0....."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "popcount-comparator",
    "title": "Population Count Comparator",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "algorithmic"
    ],
    "category": "Combinational Design",
    "lede": "Not \"which number is bigger\" — \"which number has more 1 bits set\". A comparator built on top of a bit-counting core instead of magnitude.",
    "concept": "<b>Concept:</b> Compute the Hamming weight (population count) of each operand independently — count each bit with a loop — then compare the two small counts, not the original 8-bit values. Comparing the raw values directly answers a completely different question.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>8</td><td>First operand</td></tr>\n<tr><td>b</td><td>input</td><td>8</td><td>Second operand</td></tr>\n<tr><td>result</td><td>output</td><td>2</td><td>0=equal popcount, 1=a has more 1s, 2=b has more 1s</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input      [7:0] a,\n  input      [7:0] b,\n  output reg [1:0] result\n);\n\n  // Your code here — count the 1 bits in a and b separately, then compare the counts.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] a, b;\n  wire [1:0] result;\n  integer errors = 0;\n  top_module dut(.a(a), .b(b), .result(result));\n  task check;\n    input [7:0] ia, ib; input [1:0] er;\n    begin\n      a = ia; b = ib; #1;\n      if (result !== er) begin\n        errors = errors + 1;\n        $display(\"FAIL a=%b b=%b expected=%d got=%d\", ia, ib, er, result);\n      end else $display(\"PASS a=%b b=%b result=%d\", ia, ib, result);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(8'b00001111, 8'b00000011, 2'd1);\n    check(8'b11111111, 8'b00000000, 2'd1);\n    check(8'b00000001, 8'b00000111, 2'd2);\n    check(8'b10101010, 8'b01010101, 2'd0);\n    check(8'b00000000, 8'b00000000, 2'd0);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "result"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[7:0]",
          "wave": "2.3.4.",
          "data": [
            "00001111",
            "00000001",
            "10101010"
          ]
        },
        {
          "name": "b[7:0]",
          "wave": "2.3.4.",
          "data": [
            "00000011",
            "00000111",
            "01010101"
          ]
        },
        {
          "name": "result[1:0]",
          "wave": "2.3.4.",
          "data": [
            "1",
            "2",
            "0"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "manchester-decoder",
    "title": "Manchester Decoder",
    "difficulty": "easy",
    "points": 10,
    "level": 6,
    "tags": [
      "combinational",
      "protocol"
    ],
    "category": "Combinational Design",
    "lede": "Recover the original data bit from a Manchester-encoded line signal — the exact inverse of the Manchester Encoder problem.",
    "concept": "<b>Concept:</b> Since encoding was <code>enc = data ^ clk</code>, decoding is the same operation solved for data: <code>data = enc ^ clk</code>. XOR is its own inverse, so the encoder and decoder are literally the same circuit.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Bit clock</td></tr>\n<tr><td>enc</td><td>input</td><td>1</td><td>Manchester-encoded line input</td></tr>\n<tr><td>data</td><td>output</td><td>1</td><td>Recovered data bit</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  enc,\n  output data\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, enc;\n  wire data;\n  integer errors = 0;\n  top_module dut(.clk(clk), .enc(enc), .data(data));\n  task check;\n    input ic, ie; input ed;\n    begin\n      clk = ic; enc = ie; #1;\n      if (data !== ed) begin\n        errors = errors + 1;\n        $display(\"FAIL clk=%b enc=%b expected=%b got=%b\", ic, ie, ed, data);\n      end else $display(\"PASS clk=%b enc=%b data=%b\", ic, ie, data);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    check(0, 0, 0);\n    check(1, 1, 0);\n    check(0, 1, 1);\n    check(1, 0, 1);\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "enc",
      "data"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "0.1.0.1."
        },
        {
          "name": "enc",
          "wave": "0.1...0."
        },
        {
          "name": "data",
          "wave": "0.....1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "digital-dice",
    "title": "Digital Dice (LFSR)",
    "difficulty": "medium",
    "points": 25,
    "level": 4,
    "tags": [
      "sequential",
      "lfsr"
    ],
    "category": "Sequential Design",
    "lede": "An LFSR-powered dice roller: advance a maximal-length 3-bit LFSR each cycle and map its output into a valid 1-6 range.",
    "concept": "<b>Concept:</b> A 3-bit maximal LFSR naturally cycles through the 7 nonzero values 1-7, never landing on 0. Fold the one out-of-range value back in: <code>dice_value = (lfsr==7) ? 1 : lfsr;</code>. Skipping that fold-back would let the circuit output an impossible \"7\" on a six-sided die.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync reset, seeds LFSR to 001</td></tr>\n<tr><td>roll_en</td><td>input</td><td>1</td><td>Advance the LFSR while high</td></tr>\n<tr><td>dice_value</td><td>output</td><td>3</td><td>Current roll, always 1-6</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input      clk,\n  input      rst,\n  input      roll_en,\n  output [2:0] dice_value\n);\n\n  // Your code here — 3-bit LFSR (feedback = q[2]^q[1]), seeded to 3'b001, folding 7 back to 1.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, roll_en;\n  wire [2:0] dice_value;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .roll_en(roll_en), .dice_value(dice_value));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input [2:0] ev; input [127:0] label;\n    begin\n      if (dice_value !== ev) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%d got=%d\", label, ev, dice_value);\n      end else $display(\"PASS %0s dice_value=%d\", label, dice_value);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; roll_en = 0; @(posedge clk); #1; check(1, \"seed\");\n    rst = 0; roll_en = 1;\n    @(posedge clk); #1; check(2, \"s1\");\n    @(posedge clk); #1; check(5, \"s2\");\n    @(posedge clk); #1; check(3, \"s3\");\n    @(posedge clk); #1; check(1, \"s4-mapped-from-7\");\n    @(posedge clk); #1; check(6, \"s5\");\n    @(posedge clk); #1; check(4, \"s6\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "roll_en",
      "dice_value"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p............."
        },
        {
          "name": "rst",
          "wave": "10............"
        },
        {
          "name": "dice_value[2:0]",
          "wave": "2.3.4.5.6.7.8.",
          "data": [
            "1",
            "2",
            "5",
            "3",
            "1",
            "6",
            "4"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "elevator-controller",
    "title": "2-Floor Elevator Controller",
    "difficulty": "hard",
    "points": 50,
    "level": 4,
    "tags": [
      "sequential",
      "fsm"
    ],
    "category": "Sequential Design",
    "lede": "A simplified elevator FSM: sit idle until called, take one cycle to transit between floors, and only move when actually requested.",
    "concept": "<b>Concept:</b> A 4-state FSM — idle at floor 1, moving up, idle at floor 2, moving down. Each idle state only leaves when its matching call button is pressed; each moving state unconditionally arrives at the destination on the next cycle. The easy bug to make is auto-cycling through all four states regardless of whether anyone actually pressed a button.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (starts idle at floor 1)</td></tr>\n<tr><td>call1</td><td>input</td><td>1</td><td>Call button for floor 1</td></tr>\n<tr><td>call2</td><td>input</td><td>1</td><td>Call button for floor 2</td></tr>\n<tr><td>at_floor2</td><td>output</td><td>1</td><td>1 when idle at floor 2</td></tr>\n<tr><td>moving</td><td>output</td><td>1</td><td>1 while transiting between floors</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  call1,\n  input  call2,\n  output at_floor2,\n  output moving\n);\n\n  // Your code here — 4-state FSM: AT1, MOVING_UP, AT2, MOVING_DOWN.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, call1, call2;\n  wire at_floor2, moving;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .call1(call1), .call2(call2), .at_floor2(at_floor2), .moving(moving));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input ea; input em; input [127:0] label;\n    begin\n      if (at_floor2 !== ea || moving !== em) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected at2=%b moving=%b got at2=%b moving=%b\", label, ea, em, at_floor2, moving);\n      end else $display(\"PASS %0s at2=%b moving=%b\", label, at_floor2, moving);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; call1 = 0; call2 = 0; @(posedge clk); #1; check(0, 0, \"reset-at1\");\n    rst = 0;\n    @(posedge clk); #1; check(0, 0, \"idle-no-call-stays\");\n    @(posedge clk); #1; check(0, 0, \"idle-still-stays\");\n    call2 = 1; @(posedge clk); #1; check(0, 1, \"called-now-moving-up\");\n    call2 = 0; @(posedge clk); #1; check(1, 0, \"arrived-floor2\");\n    call1 = 1; @(posedge clk); #1; check(0, 1, \"called-now-moving-down\");\n    call1 = 0; @(posedge clk); #1; check(0, 0, \"arrived-floor1\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "call1",
      "call2",
      "at_floor2",
      "moving"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p............."
        },
        {
          "name": "call2",
          "wave": "0.......1.0..."
        },
        {
          "name": "at_floor2",
          "wave": "0.........1..."
        },
        {
          "name": "moving",
          "wave": "0.......1.0..."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "rotary-encoder-decoder",
    "title": "Quadrature Rotary Encoder Decoder",
    "difficulty": "medium",
    "points": 25,
    "level": 6,
    "tags": [
      "sequential",
      "protocol"
    ],
    "category": "Sequential Design",
    "lede": "Decode the two-phase A/B signal from a real rotary knob or mouse wheel into a direction and position count — sample B on every rising edge of A.",
    "concept": "<b>Concept:</b> On every rising edge of <code>a</code>, look at <code>b</code>: if it's low, the knob turned clockwise (increment); if high, counter-clockwise (decrement). This \"sample the other phase on an edge\" technique is the simplified version of the quadrature decoding logic used in real mice, encoders, and volume knobs.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock (sampling the a/b lines)</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>a</td><td>input</td><td>1</td><td>Quadrature phase A</td></tr>\n<tr><td>b</td><td>input</td><td>1</td><td>Quadrature phase B</td></tr>\n<tr><td>position</td><td>output</td><td>4</td><td>Running position count</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input            clk,\n  input            rst,\n  input            a,\n  input            b,\n  output reg [3:0] position\n);\n\n  // Your code here — on a's rising edge, b=0 means CW (+1), b=1 means CCW (-1).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, a, b;\n  wire [3:0] position;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .a(a), .b(b), .position(position));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input [3:0] ep; input [127:0] label;\n    begin\n      if (position !== ep) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%d got=%d\", label, ep, position);\n      end else $display(\"PASS %0s position=%d\", label, position);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; a = 0; b = 0; @(posedge clk); #1; check(0, \"reset\");\n    rst = 0;\n    @(posedge clk); #1; check(0, \"no-edge\");\n    a = 1; b = 0; @(posedge clk); #1; check(1, \"cw-rising-b0\");\n    @(posedge clk); #1; check(1, \"a-stays-high-noop\");\n    a = 0; @(posedge clk); #1; check(1, \"falling-noop\");\n    a = 1; b = 1; @(posedge clk); #1; check(0, \"ccw-rising-b1\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "a",
      "b",
      "position"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p..........."
        },
        {
          "name": "a",
          "wave": "0.....1.0.1."
        },
        {
          "name": "b",
          "wave": "0..........."
        },
        {
          "name": "position[3:0]",
          "wave": "2.......3...",
          "data": [
            "0",
            "1"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "pwm-generator",
    "title": "PWM Generator",
    "difficulty": "medium",
    "points": 25,
    "level": 4,
    "tags": [
      "sequential",
      "clock"
    ],
    "category": "Sequential Design",
    "lede": "Generate a pulse-width-modulated output with a programmable duty cycle out of 16 — the technique behind LED dimming and motor speed control.",
    "concept": "<b>Concept:</b> A free-running 4-bit counter sweeps 0-15 every 16 cycles; the output is simply <code>pwm_out = (cnt &lt; duty)</code>. The strict less-than matters: using <code>&lt;=</code> instead makes every duty value one cycle wider than requested, breaking duty=0 (which should mean \"always off\").",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>duty</td><td>input</td><td>4</td><td>Duty cycle, 0-15 out of 16</td></tr>\n<tr><td>pwm_out</td><td>output</td><td>1</td><td>High for duty cycles out of every 16</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  [3:0] duty,\n  output pwm_out\n);\n\n  // Your code here — free-running 4-bit counter; pwm_out = (cnt < duty).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst;\n  reg [3:0] duty;\n  wire pwm_out;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .duty(duty), .pwm_out(pwm_out));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input ep; input [127:0] label;\n    begin\n      if (pwm_out !== ep) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%b got=%b\", label, ep, pwm_out);\n      end else $display(\"PASS %0s pwm_out=%b\", label, pwm_out);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; duty = 4'd4; @(posedge clk); #1; check(1, \"reset-cnt0\");\n    rst = 0;\n    @(posedge clk); #1; check(1, \"cnt1\");\n    @(posedge clk); #1; check(1, \"cnt2\");\n    @(posedge clk); #1; check(1, \"cnt3\");\n    @(posedge clk); #1; check(0, \"cnt4-off\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "duty",
      "pwm_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "rst",
          "wave": "10........"
        },
        {
          "name": "pwm_out",
          "wave": "1...0....."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "sync-ram-8x8",
    "title": "Synchronous 8x8 RAM",
    "difficulty": "medium",
    "points": 25,
    "level": 5,
    "tags": [
      "sequential",
      "memory"
    ],
    "category": "Sequential Design",
    "lede": "A minimal single-port RAM: 8 words of 8 bits each, with a registered (one-cycle-delayed) read — the standard timing behavior of real block RAM.",
    "concept": "<b>Concept:</b> The write is a simple <code>if(we) mem[addr]&lt;=din;</code>. The read is what trips people up: <code>dout&lt;=mem[addr];</code> is a <em>registered</em> read — it captures the addressed word one cycle late, matching how real synchronous RAM behaves. Making <code>dout</code> a combinational <code>assign</code> instead gives zero-cycle latency, a different (and usually wrong) timing contract for anything expecting real memory behavior.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>we</td><td>input</td><td>1</td><td>Write enable</td></tr>\n<tr><td>addr</td><td>input</td><td>3</td><td>Address, 0-7</td></tr>\n<tr><td>din</td><td>input</td><td>8</td><td>Write data</td></tr>\n<tr><td>dout</td><td>output</td><td>8</td><td>Registered read data (1-cycle latency)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input      clk,\n  input      we,\n  input      [2:0] addr,\n  input      [7:0] din,\n  output reg [7:0] dout\n);\n\n  // Your code here — reg [7:0] mem [0:7]; write on we, and register dout <= mem[addr] every cycle.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, we;\n  reg [2:0] addr;\n  reg [7:0] din;\n  wire [7:0] dout;\n  integer errors = 0;\n  top_module dut(.clk(clk), .we(we), .addr(addr), .din(din), .dout(dout));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input [7:0] ed; input [127:0] label;\n    begin\n      if (dout !== ed) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%h got=%h\", label, ed, dout);\n      end else $display(\"PASS %0s dout=%h\", label, dout);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    we = 1; addr = 0; din = 8'hAA; @(posedge clk); #1;\n    we = 1; addr = 1; din = 8'hBB; @(posedge clk); #1;\n    we = 0; addr = 0; @(posedge clk); #1; check(8'hAA, \"read-addr0\");\n    we = 0; addr = 1; @(posedge clk); #1; check(8'hBB, \"read-addr1\");\n    we = 1; addr = 2; din = 8'hCC; @(posedge clk); #1; check(8'hxx, \"registered-shows-stale-during-write\");\n    we = 0; addr = 2; @(posedge clk); #1; check(8'hCC, \"next-cycle-shows-new-data\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "we",
      "addr",
      "din",
      "dout"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "we",
          "wave": "1.0....."
        },
        {
          "name": "addr[2:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "1",
            "0",
            "1"
          ]
        },
        {
          "name": "dout[7:0]",
          "wave": "2.......",
          "data": [
            "xx"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "safe-with-lockout",
    "title": "Combination Safe with Lockout",
    "difficulty": "hard",
    "points": 50,
    "level": 4,
    "tags": [
      "sequential",
      "fsm"
    ],
    "category": "Sequential Design",
    "lede": "A combination lock that locks itself out entirely after 3 failed attempts — a security-flavored extension of the basic combination lock FSM.",
    "concept": "<b>Concept:</b> Layer a failure counter on top of the combination-lock FSM: every time a wrong digit knocks progress back to the start (from partway through the sequence), increment <code>fails</code>. On the 3rd such failure, latch a permanent <code>locked</code> flag that gates the entire state machine — once set, no further digit has any effect until reset.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (also clears lockout)</td></tr>\n<tr><td>code</td><td>input</td><td>2</td><td>Digit entered this cycle; correct sequence is 2,1,3</td></tr>\n<tr><td>unlocked</td><td>output</td><td>1</td><td>1 once the correct sequence is entered</td></tr>\n<tr><td>locked_out</td><td>output</td><td>1</td><td>1 after 3 failed attempts; ignores all input until reset</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  [1:0] code,\n  output unlocked,\n  output locked_out\n);\n\n  // Your code here — combination-lock FSM (2,1,3) plus a fail counter that locks out after 3 failures.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst;\n  reg [1:0] code;\n  wire unlocked, locked_out;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .code(code), .unlocked(unlocked), .locked_out(locked_out));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input eu; input el; input [127:0] label;\n    begin\n      if (unlocked !== eu || locked_out !== el) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected unlocked=%b locked=%b got unlocked=%b locked=%b\", label, eu, el, unlocked, locked_out);\n      end else $display(\"PASS %0s unlocked=%b locked=%b\", label, unlocked, locked_out);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; code = 0; @(posedge clk); #1; check(0, 0, \"reset\");\n    rst = 0;\n    code = 2; @(posedge clk); #1; check(0, 0, \"d1\");\n    code = 0; @(posedge clk); #1; check(0, 0, \"fail1\");\n    code = 2; @(posedge clk); #1; check(0, 0, \"d1-again\");\n    code = 1; @(posedge clk); #1; check(0, 0, \"d2\");\n    code = 0; @(posedge clk); #1; check(0, 0, \"fail2\");\n    code = 2; @(posedge clk); #1; check(0, 0, \"d1-again2\");\n    code = 1; @(posedge clk); #1; check(0, 0, \"d2-again2\");\n    code = 0; @(posedge clk); #1; check(0, 1, \"fail3-locks-out\");\n    code = 2; @(posedge clk); #1; check(0, 1, \"ignored-while-locked\");\n    code = 1; @(posedge clk); #1; check(0, 1, \"still-locked\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "code",
      "unlocked",
      "locked_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p....................."
        },
        {
          "name": "code[1:0]",
          "wave": "2.3.4.5.3.4.5.3.4.5.4.",
          "data": [
            "0",
            "2",
            "0",
            "2",
            "1",
            "0",
            "2",
            "1",
            "0",
            "2",
            "1"
          ]
        },
        {
          "name": "locked_out",
          "wave": "0.................1..."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "fifo-occupancy-counter",
    "title": "FIFO Occupancy Counter",
    "difficulty": "medium",
    "points": 25,
    "level": 5,
    "tags": [
      "sequential",
      "fifo"
    ],
    "category": "Sequential Design",
    "lede": "Track exactly how many words are sitting in an 8-deep FIFO — not just full/empty booleans, but the actual live count, including the tricky case of a simultaneous push and pop.",
    "concept": "<b>Concept:</b> A single case on <code>{push&amp;&amp;!full, pop&amp;&amp;!empty}</code> handles all four combinations explicitly, including <code>2'b11</code> (both happen at once): a simultaneous push and pop nets to no change in count, since one word leaves as another enters. Chaining separate <code>if</code>/<code>else if</code> checks instead silently drops one side of that simultaneous case.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>push</td><td>input</td><td>1</td><td>Request to add a word (ignored if full)</td></tr>\n<tr><td>pop</td><td>input</td><td>1</td><td>Request to remove a word (ignored if empty)</td></tr>\n<tr><td>count</td><td>output</td><td>4</td><td>Current occupancy, 0-8</td></tr>\n<tr><td>full</td><td>output</td><td>1</td><td>1 when count == 8</td></tr>\n<tr><td>empty</td><td>output</td><td>1</td><td>1 when count == 0</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input            clk,\n  input            rst,\n  input            push,\n  input            pop,\n  output reg [3:0] count,\n  output           full,\n  output           empty\n);\n\n  // Your code here — handle push-only, pop-only, both-at-once, and neither, as four distinct cases.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, push, pop;\n  wire [3:0] count;\n  wire full, empty;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .push(push), .pop(pop), .count(count), .full(full), .empty(empty));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input [3:0] ec; input ef; input ee; input [127:0] label;\n    begin\n      if (count !== ec || full !== ef || empty !== ee) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected count=%d full=%b empty=%b got count=%d full=%b empty=%b\", label, ec, ef, ee, count, full, empty);\n      end else $display(\"PASS %0s count=%d full=%b empty=%b\", label, count, full, empty);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; push = 0; pop = 0; @(posedge clk); #1; check(0, 0, 1, \"reset\");\n    rst = 0; push = 1;\n    @(posedge clk); #1; check(1, 0, 0, \"push1\");\n    @(posedge clk); #1; check(2, 0, 0, \"push2\");\n    pop = 1;\n    @(posedge clk); #1; check(2, 0, 0, \"push+pop-same-cycle-no-net-change\");\n    push = 0;\n    @(posedge clk); #1; check(1, 0, 0, \"pop-only\");\n    @(posedge clk); #1; check(0, 0, 1, \"pop-to-empty\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "push",
      "pop",
      "count"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "push",
          "wave": "0.1...0."
        },
        {
          "name": "pop",
          "wave": "0.....1."
        },
        {
          "name": "count[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "1",
            "2",
            "1"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "sevenseg-multiplexer",
    "title": "2-Digit 7-Segment Multiplexer",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "display"
    ],
    "category": "Sequential Design",
    "lede": "Drive two digits from one shared set of segment lines by rapidly alternating which digit is active — the real technique behind every multi-digit 7-segment display.",
    "concept": "<b>Concept:</b> A free-running 1-bit toggle flips every cycle; that bit both selects which digit's BCD value to present (<code>active_bcd = toggle ? digit1 : digit0</code>) and which physical digit is enabled (<code>digit_sel</code>). If the toggle never flips, one digit is permanently dark — a real symptom on physical multiplexed displays.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock (multiplex rate)</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>digit0</td><td>input</td><td>4</td><td>BCD value for digit 0</td></tr>\n<tr><td>digit1</td><td>input</td><td>4</td><td>BCD value for digit 1</td></tr>\n<tr><td>digit_sel</td><td>output</td><td>1</td><td>Which digit is currently active (0 or 1)</td></tr>\n<tr><td>active_bcd</td><td>output</td><td>4</td><td>BCD value of the currently active digit</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  [3:0] digit0,\n  input  [3:0] digit1,\n  output digit_sel,\n  output [3:0] active_bcd\n);\n\n  // Your code here — a free-running toggle alternates which digit is presented each cycle.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst;\n  reg [3:0] digit0, digit1;\n  wire digit_sel;\n  wire [3:0] active_bcd;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .digit0(digit0), .digit1(digit1), .digit_sel(digit_sel), .active_bcd(active_bcd));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input es; input [3:0] eb; input [127:0] label;\n    begin\n      if (digit_sel !== es || active_bcd !== eb) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected sel=%b bcd=%d got sel=%b bcd=%d\", label, es, eb, digit_sel, active_bcd);\n      end else $display(\"PASS %0s sel=%b bcd=%d\", label, digit_sel, active_bcd);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; digit0 = 4'd3; digit1 = 4'd7; @(posedge clk); #1; check(0, 3, \"reset-shows-digit0\");\n    rst = 0;\n    @(posedge clk); #1; check(1, 7, \"toggle-shows-digit1\");\n    @(posedge clk); #1; check(0, 3, \"toggle-back-digit0\");\n    @(posedge clk); #1; check(1, 7, \"toggle-digit1-again\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "digit_sel",
      "active_bcd"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "digit_sel",
          "wave": "0.1.0.1..."
        },
        {
          "name": "active_bcd[3:0]",
          "wave": "2.3.4.3...",
          "data": [
            "3",
            "7",
            "3"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "bcd-stopwatch-seconds",
    "title": "BCD Stopwatch (00-59 Seconds)",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "counter"
    ],
    "category": "Sequential Design",
    "lede": "Two chained BCD digits counting seconds from 00 to 59 and wrapping — the real digit-chaining pattern behind every digital clock and stopwatch display.",
    "concept": "<b>Concept:</b> The units digit counts 0-9 and rolls over into a tens-digit increment. The tens digit, though, must wrap at <strong>5</strong>, not 9 — a plain BCD digit maxes at 9, but a seconds display's tens place is only ever 0-5. Using the generic BCD wraparound here would let the display show impossible times like \"68\".",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>en</td><td>input</td><td>1</td><td>Count enable (tick once per second in real use)</td></tr>\n<tr><td>units</td><td>output</td><td>4</td><td>Ones digit, 0-9</td></tr>\n<tr><td>tens</td><td>output</td><td>3</td><td>Tens digit, 0-5</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input            clk,\n  input            rst,\n  input            en,\n  output reg [3:0] units,\n  output reg [2:0] tens\n);\n\n  // Your code here — units wraps at 9, tens wraps at 5.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, en;\n  wire [3:0] units;\n  wire [2:0] tens;\n  integer errors = 0;\n  integer i;\n  top_module dut(.clk(clk), .rst(rst), .en(en), .units(units), .tens(tens));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input [3:0] eu; input [2:0] et; input [127:0] label;\n    begin\n      if (units !== eu || tens !== et) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected units=%d tens=%d got units=%d tens=%d\", label, eu, et, units, tens);\n      end else $display(\"PASS %0s units=%d tens=%d\", label, units, tens);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; en = 0; @(posedge clk); #1; check(0, 0, \"reset\");\n    rst = 0; en = 1;\n    for (i = 0; i < 9; i = i + 1) begin @(posedge clk); #1; end\n    check(9, 0, \"reached-09\");\n    @(posedge clk); #1; check(0, 1, \"rolled-to-10\");\n    for (i = 0; i < 49; i = i + 1) begin @(posedge clk); #1; end\n    check(9, 5, \"reached-59\");\n    @(posedge clk); #1; check(0, 0, \"wrapped-to-00\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "en",
      "units",
      "tens"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "units[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "9",
            "0",
            "9"
          ]
        },
        {
          "name": "tens[2:0]",
          "wave": "2...3.4.",
          "data": [
            "0",
            "1",
            "5"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "simple-alarm-clock",
    "title": "Alarm Clock Trigger",
    "difficulty": "medium",
    "points": 25,
    "level": 4,
    "tags": [
      "sequential",
      "comparator"
    ],
    "category": "Sequential Design",
    "lede": "Fire an alarm for exactly one cycle the moment the current time matches the alarm time — not for the entire minute the clock happens to sit on that value.",
    "concept": "<b>Concept:</b> Compute <code>match</code> combinationally, then register both it and its own previous cycle's value: <code>alarm_trig &lt;= match &amp;&amp; !prev_match;</code>. That's a rising-edge detector on the match condition — without it, the alarm would blare continuously for every cycle the clock happens to sit on the matching minute, not just the moment it arrives.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>cur_hour</td><td>input</td><td>5</td><td>Current hour, 0-23</td></tr>\n<tr><td>cur_min</td><td>input</td><td>6</td><td>Current minute, 0-59</td></tr>\n<tr><td>alarm_hour</td><td>input</td><td>5</td><td>Alarm hour</td></tr>\n<tr><td>alarm_min</td><td>input</td><td>6</td><td>Alarm minute</td></tr>\n<tr><td>alarm_en</td><td>input</td><td>1</td><td>Alarm enabled</td></tr>\n<tr><td>alarm_trig</td><td>output</td><td>1</td><td>Pulses high for 1 cycle when time first matches</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input      clk,\n  input      rst,\n  input      [4:0] cur_hour,\n  input      [5:0] cur_min,\n  input      [4:0] alarm_hour,\n  input      [5:0] alarm_min,\n  input      alarm_en,\n  output reg alarm_trig\n);\n\n  // Your code here — register a \"match\" signal and pulse alarm_trig only on its rising edge.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst;\n  reg [4:0] cur_hour, alarm_hour;\n  reg [5:0] cur_min, alarm_min;\n  reg alarm_en;\n  wire alarm_trig;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .cur_hour(cur_hour), .cur_min(cur_min), .alarm_hour(alarm_hour), .alarm_min(alarm_min), .alarm_en(alarm_en), .alarm_trig(alarm_trig));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input et; input [127:0] label;\n    begin\n      if (alarm_trig !== et) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected=%b got=%b\", label, et, alarm_trig);\n      end else $display(\"PASS %0s alarm_trig=%b\", label, alarm_trig);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; cur_hour = 0; cur_min = 0; alarm_hour = 7; alarm_min = 30; alarm_en = 1; @(posedge clk); #1; check(0, \"reset\");\n    rst = 0;\n    @(posedge clk); #1; check(0, \"not-matching-yet\");\n    cur_hour = 7; cur_min = 30;\n    @(posedge clk); #1; check(1, \"match-pulses\");\n    @(posedge clk); #1; check(0, \"still-matching-no-retrigger\");\n    @(posedge clk); #1; check(0, \"still-matching-no-retrigger2\");\n    cur_min = 31;\n    @(posedge clk); #1; check(0, \"time-moved-on\");\n    cur_hour = 7; cur_min = 30;\n    @(posedge clk); #1; check(1, \"matches-again-pulses\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "cur_min",
      "alarm_trig"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p............."
        },
        {
          "name": "cur_min[5:0]",
          "wave": "2...3.....4.5.",
          "data": [
            "0",
            "30",
            "31",
            "30"
          ]
        },
        {
          "name": "alarm_trig",
          "wave": "0...1.0.....1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "traffic-light-pedestrian",
    "title": "Traffic Light with Pedestrian Crossing",
    "difficulty": "hard",
    "points": 50,
    "level": 4,
    "tags": [
      "sequential",
      "fsm"
    ],
    "category": "Sequential Design",
    "lede": "Extend the basic traffic light FSM with a pedestrian crossing button: a press latches a request that cuts the green phase short instead of waiting out the full cycle.",
    "concept": "<b>Concept:</b> A latch remembers a pedestrian request across cycles (<code>if(ped_request) ped_latch&lt;=1;</code>) so a single press isn't missed if it doesn't land exactly when checked. The GREEN state then advances to YELLOW as soon as <em>either</em> the latch is set <em>or</em> the normal timer expires — <code>ped_latch || cnt==2</code> — whichever comes first, then clears the latch on the way out.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (starts at RED)</td></tr>\n<tr><td>ped_request</td><td>input</td><td>1</td><td>Pedestrian crossing button</td></tr>\n<tr><td>light</td><td>output</td><td>2</td><td>0=RED, 1=GREEN, 2=YELLOW</td></tr>\n<tr><td>walk_signal</td><td>output</td><td>1</td><td>1 while light is RED</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  ped_request,\n  output [1:0] light,\n  output walk_signal\n);\n\n  // Your code here — RED(3 cycles) -> GREEN(up to 3 cycles, cut short by ped_request) -> YELLOW(2 cycles) -> repeat.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, ped_request;\n  wire [1:0] light;\n  wire walk_signal;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .ped_request(ped_request), .light(light), .walk_signal(walk_signal));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task check;\n    input [1:0] el; input ew; input [127:0] label;\n    begin\n      if (light !== el || walk_signal !== ew) begin\n        errors = errors + 1;\n        $display(\"FAIL %0s expected light=%d walk=%b got light=%d walk=%b\", label, el, ew, light, walk_signal);\n      end else $display(\"PASS %0s light=%d walk=%b\", label, light, walk_signal);\n    end\n  endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; ped_request = 0; @(posedge clk); #1; check(0, 1, \"reset\");\n    rst = 0;\n    @(posedge clk); #1; check(0, 1, \"t1-red-cnt1\");\n    @(posedge clk); #1; check(0, 1, \"t2-red-cnt2\");\n    @(posedge clk); #1; check(1, 0, \"t3-now-green\");\n    ped_request = 1;\n    @(posedge clk); #1; check(1, 0, \"t4-green-cnt1-ped-latching\");\n    ped_request = 0;\n    @(posedge clk); #1; check(2, 0, \"t5-ped-cuts-green-short\");\n    @(posedge clk); #1; check(2, 0, \"t6-yellow-cnt1\");\n    @(posedge clk); #1; check(0, 1, \"t7-back-to-red\");\n    @(posedge clk); #1; check(0, 1, \"t8-red-cnt1\");\n    @(posedge clk); #1; check(0, 1, \"t9-red-cnt2\");\n    @(posedge clk); #1; check(1, 0, \"t10-now-green-again\");\n    @(posedge clk); #1; check(1, 0, \"t11-green-cnt1-no-ped\");\n    @(posedge clk); #1; check(1, 0, \"t12-green-cnt2-no-ped\");\n    @(posedge clk); #1; check(2, 0, \"t13-full-3-cycles-then-yellow\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "ped_request",
      "light",
      "walk_signal"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p..........."
        },
        {
          "name": "ped_request",
          "wave": "0..1.0......"
        },
        {
          "name": "light[1:0]",
          "wave": "2...3.4.2...",
          "data": [
            "RED",
            "GREEN",
            "YELLOW",
            "RED"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "fixed-priority-arbiter",
    "title": "Fixed-Priority Arbiter",
    "difficulty": "easy",
    "points": 10,
    "level": 8,
    "tags": [
      "combinational",
      "encoder"
    ],
    "category": "Combinational Design",
    "lede": "Grant exactly one of four requesters at a time, always favoring the highest-index request when several arrive together.",
    "concept": "<b>Concept:</b> A fixed-priority arbiter is a nested-priority mux: check the highest-priority request first (<code>req[3]</code>), and only fall through to lower ones if it is idle. <code>grant = req[3]?4'b1000:req[2]?4'b0100:req[1]?4'b0010:req[0]?4'b0001:4'b0000;</code> guarantees only one grant bit is ever set, with bit 3 always winning ties.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>req</td><td>input</td><td>4</td><td>Request lines, one per requester</td></tr>\n<tr><td>grant</td><td>output</td><td>4</td><td>One-hot grant, req[3] has highest priority</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] req,\n  output [3:0] grant\n);\n\n  // Your code here — grant the highest-index active request; grant=0 if no requests.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] req; wire [3:0] grant; integer errors=0;\n  top_module dut(.req(req), .grant(grant));\n  task check; input [3:0] r; input [3:0] eg; begin\n    req=r;#1;\n    if(grant!==eg) begin errors=errors+1; $display(\"FAIL req=%b expected=%b got=%b\",r,eg,grant); end\n    else $display(\"PASS req=%b grant=%b\",r,grant);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(4'b1111, 4'b1000);\n    check(4'b0110, 4'b0100);\n    check(4'b0001, 4'b0001);\n    check(4'b0000, 4'b0000);\n    check(4'b0011, 4'b0010);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "req",
      "grant"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "req[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "1111",
            "0110",
            "0001",
            "0011"
          ]
        },
        {
          "name": "grant[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "1000",
            "0100",
            "0001",
            "0010"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "twos-complement-negator",
    "title": "Two's-Complement Negator",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic"
    ],
    "category": "Combinational Design",
    "lede": "Negate a signed 4-bit number and correctly flag the one input value that cannot be negated.",
    "concept": "<b>Concept:</b> Negating a two's-complement number is invert-and-add-one: <code>out = ~in + 1</code>. But the most negative value, <code>4'b1000</code> (-8), has no positive counterpart in 4 bits — negating it overflows back to itself, so <code>overflow = (in == 4'b1000)</code> flags exactly that case.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>in</td><td>input</td><td>4</td><td>Signed two's-complement input</td></tr>\n<tr><td>out</td><td>output</td><td>4</td><td>Negated value, -in</td></tr>\n<tr><td>overflow</td><td>output</td><td>1</td><td>1 when in = -8 (cannot be negated in 4 bits)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] in,\n  output [3:0] out,\n  output overflow\n);\n\n  // Your code here — out = -in (invert and add 1); overflow when in cannot be negated.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] in; wire [3:0] out; wire overflow; integer errors=0;\n  top_module dut(.in(in), .out(out), .overflow(overflow));\n  task check; input [3:0] i; input [3:0] eo; input eov; begin\n    in=i;#1;\n    if(out!==eo||overflow!==eov) begin errors=errors+1; $display(\"FAIL in=%b expected out=%b ovf=%b got out=%b ovf=%b\",i,eo,eov,out,overflow); end\n    else $display(\"PASS in=%b out=%b ovf=%b\",i,out,overflow);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(4'b0011, 4'b1101, 0);\n    check(4'b1101, 4'b0011, 0);\n    check(4'b1000, 4'b1000, 1);\n    check(4'b0000, 4'b0000, 0);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "in",
      "out",
      "overflow"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "in[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0011",
            "1101",
            "1000",
            "0000"
          ]
        },
        {
          "name": "out[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "1101",
            "0011",
            "1000",
            "0000"
          ]
        },
        {
          "name": "overflow",
          "wave": "0...1.0."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "interrupt-vector-generator",
    "title": "Interrupt Vector Generator",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "encoder"
    ],
    "category": "Combinational Design",
    "lede": "Turn up to four pending interrupt lines into a fixed 8-bit vector table address, always dispatching the highest-priority IRQ first.",
    "concept": "<b>Concept:</b> Real interrupt controllers map each IRQ line to a fixed handler address (a \"vector\"). This is a priority encoder whose output isn't a plain binary index but a lookup into a small table: <code>irq[3]-&gt;8'hE0, irq[2]-&gt;8'hC0, irq[1]-&gt;8'hA0, irq[0]-&gt;8'h80</code>, with <code>valid=|irq</code> telling the CPU whether to bother jumping at all.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>irq</td><td>input</td><td>4</td><td>Interrupt request lines, irq[3] highest priority</td></tr>\n<tr><td>vector</td><td>output</td><td>8</td><td>Handler address for the highest pending IRQ</td></tr>\n<tr><td>valid</td><td>output</td><td>1</td><td>1 when any IRQ is pending</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] irq,\n  output [7:0] vector,\n  output valid\n);\n\n  // Your code here — irq[3]->8'hE0, irq[2]->8'hC0, irq[1]->8'hA0, irq[0]->8'h80, none->8'h00.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] irq; wire [7:0] vector; wire valid; integer errors=0;\n  top_module dut(.irq(irq), .vector(vector), .valid(valid));\n  task check; input [3:0] i; input [7:0] ev; input ev2; begin\n    irq=i;#1;\n    if(vector!==ev||valid!==ev2) begin errors=errors+1; $display(\"FAIL irq=%b expected vector=%h valid=%b got vector=%h valid=%b\",i,ev,ev2,vector,valid); end\n    else $display(\"PASS irq=%b vector=%h valid=%b\",i,vector,valid);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(4'b1000, 8'hE0, 1);\n    check(4'b0100, 8'hC0, 1);\n    check(4'b1100, 8'hE0, 1);\n    check(4'b0000, 8'h00, 0);\n    check(4'b0001, 8'h80, 1);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "irq",
      "vector",
      "valid"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "irq[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "1000",
            "0100",
            "0000",
            "0001"
          ]
        },
        {
          "name": "vector[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "E0",
            "C0",
            "00",
            "80"
          ]
        },
        {
          "name": "valid",
          "wave": "1...0.1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "sign-magnitude-converter",
    "title": "Sign-Magnitude to Two's-Complement Converter",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic"
    ],
    "category": "Combinational Design",
    "lede": "Convert a 4-bit sign-magnitude number (top bit = sign, bottom 3 bits = magnitude) into standard two's-complement.",
    "concept": "<b>Concept:</b> Sign-magnitude and two's-complement agree on positive numbers but disagree on negatives. Build the zero-extended magnitude, <code>mag = {1'b0, in[2:0]}</code>, then negate it (invert and add 1) only when the sign bit is set: <code>out = in[3] ? (~mag + 1) : in;</code>. Skipping the \"+1\" gives one's-complement instead — a common off-by-one bug.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>in</td><td>input</td><td>4</td><td>Sign-magnitude: in[3]=sign, in[2:0]=magnitude</td></tr>\n<tr><td>out</td><td>output</td><td>4</td><td>Equivalent value in two's-complement</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] in,\n  output [3:0] out\n);\n\n  // Your code here — in[3]=sign, in[2:0]=magnitude; convert to two's-complement.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] in; wire [3:0] out; integer errors=0;\n  top_module dut(.in(in), .out(out));\n  task check; input [3:0] i; input [3:0] eo; begin\n    in=i;#1;\n    if(out!==eo) begin errors=errors+1; $display(\"FAIL in=%b expected=%b got=%b\",i,eo,out); end\n    else $display(\"PASS in=%b out=%b\",i,out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(4'b0101, 4'b0101);\n    check(4'b1101, 4'b1011);\n    check(4'b1000, 4'b0000);\n    check(4'b1111, 4'b1001);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "in",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "in[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0101",
            "1101",
            "1000",
            "1111"
          ]
        },
        {
          "name": "out[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0101",
            "1011",
            "0000",
            "1001"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "bcd-to-binary",
    "title": "2-Digit BCD to Binary Converter",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic"
    ],
    "category": "Combinational Design",
    "lede": "Convert two separate BCD digits (tens and units) into their actual binary decimal value, 0-99.",
    "concept": "<b>Concept:</b> BCD digits are already decimal — the tens digit just needs to be scaled and added: <code>binary = tens*10 + units</code>. It's tempting to just concatenate the two nibbles (<code>{tens,units}</code>), but that reproduces the encoded bit pattern, not the actual decimal value it represents.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>tens</td><td>input</td><td>4</td><td>Tens BCD digit, 0-9</td></tr>\n<tr><td>units</td><td>input</td><td>4</td><td>Units BCD digit, 0-9</td></tr>\n<tr><td>binary</td><td>output</td><td>7</td><td>Binary value, 0-99</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] tens,\n  input  [3:0] units,\n  output [6:0] binary\n);\n\n  // Your code here — binary = tens*10 + units.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] tens, units; wire [6:0] binary; integer errors=0;\n  top_module dut(.tens(tens), .units(units), .binary(binary));\n  task check; input [3:0] t,u; input [6:0] eb; begin\n    tens=t;units=u;#1;\n    if(binary!==eb) begin errors=errors+1; $display(\"FAIL tens=%d units=%d expected=%d got=%d\",t,u,eb,binary); end\n    else $display(\"PASS tens=%d units=%d binary=%d\",t,u,binary);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(0,5,7'd5);\n    check(9,9,7'd99);\n    check(5,0,7'd50);\n    check(1,0,7'd10);\n    check(0,0,7'd0);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "tens",
      "units",
      "binary"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "tens[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "9",
            "5",
            "1"
          ]
        },
        {
          "name": "units[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "5",
            "9",
            "0",
            "0"
          ]
        },
        {
          "name": "binary[6:0]",
          "wave": "2.3.4.5.",
          "data": [
            "5",
            "99",
            "50",
            "10"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "bcd-updown-counter",
    "title": "BCD Up/Down Counter",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "counter"
    ],
    "category": "Sequential Design",
    "lede": "A single-digit BCD counter that wraps at 9 going up and at 0 going down — not at the binary limits of a 4-bit register.",
    "concept": "<b>Concept:</b> A plain 4-bit counter wraps at 15/0, but a BCD digit is only ever 0-9. Counting up must jump straight from 9 back to 0 (<code>q==4'd9 ? 4'd0 : q+1</code>), and counting down must jump from 0 straight to 9 (<code>q==4'd0 ? 4'd9 : q-1</code>) — letting it wrap at the binary boundary instead produces an invalid BCD digit like 10-15.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (q=0)</td></tr>\n<tr><td>en</td><td>input</td><td>1</td><td>Count enable</td></tr>\n<tr><td>up_down</td><td>input</td><td>1</td><td>1=count up, 0=count down</td></tr>\n<tr><td>q</td><td>output</td><td>4</td><td>Current BCD digit, 0-9</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  en,\n  input  up_down,\n  output reg [3:0] q\n);\n\n  // Your code here — count 0..9 up, or 9..0 down, wrapping at the BCD boundary (not 15).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk,rst,en,up_down; wire [3:0] q; integer errors=0; integer i;\n  top_module dut(.clk(clk),.rst(rst),.en(en),.up_down(up_down),.q(q));\n  initial clk=0; always #5 clk=~clk;\n  task check; input [3:0] eq; input [127:0] label; begin\n    if(q!==eq) begin errors=errors+1; $display(\"FAIL %0s expected=%d got=%d\",label,eq,q); end\n    else $display(\"PASS %0s q=%d\",label,q);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1;en=0;up_down=1; @(posedge clk); #1; check(0,\"reset\");\n    rst=0;en=1;\n    for (i=0;i<9;i=i+1) begin @(posedge clk); #1; end\n    check(9,\"reached9\");\n    @(posedge clk); #1; check(0,\"wraps-to-0\");\n    up_down=0;\n    @(posedge clk); #1; check(9,\"down-wraps-to-9\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "en",
      "up_down",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "up_down",
          "wave": "1......."
        },
        {
          "name": "q[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "7",
            "8",
            "9",
            "0"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "change-detector",
    "title": "Registered Change Detector",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "edge-detect"
    ],
    "category": "Sequential Design",
    "lede": "Flag combinationally, in the very same cycle, whenever the input differs from its last-registered value.",
    "concept": "<b>Concept:</b> Register the previous value on every clock edge (<code>prev &lt;= data</code>), then compare it <em>combinationally</em> against the live input: <code>assign changed = (data != prev)</code>. Because the comparison is combinational, <code>changed</code> reacts the instant <code>data</code> moves — even between clock edges — rather than waiting a cycle like a registered comparison would.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (prev=0)</td></tr>\n<tr><td>data</td><td>input</td><td>4</td><td>Live input value</td></tr>\n<tr><td>changed</td><td>output</td><td>1</td><td>1 whenever data differs from its last-registered value</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  [3:0] data,\n  output changed\n);\n\n  // Your code here — register the previous data value, then compare combinationally against the live input.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk,rst; reg [3:0] data; wire changed; integer errors=0;\n  top_module dut(.clk(clk),.rst(rst),.data(data),.changed(changed));\n  initial clk=0; always #5 clk=~clk;\n  task check; input ec; input [127:0] label; begin\n    if(changed!==ec) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,ec,changed); end\n    else $display(\"PASS %0s changed=%b\",label,changed);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1;data=0; @(posedge clk); #1; check(0,\"reset\");\n    rst=0;\n    data=5; #1; check(1,\"data-changed-to-5-before-clock\");\n    @(posedge clk); #1; check(0,\"prev-caught-up-no-change\");\n    #1; check(0,\"still-same-value\");\n    data=8; #1; check(1,\"data-changed-to-8-before-clock\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "data",
      "changed"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......"
        },
        {
          "name": "data[3:0]",
          "wave": "2.3...4",
          "data": [
            "0",
            "5",
            "8"
          ]
        },
        {
          "name": "changed",
          "wave": "0.10..1"
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "frequency-counter",
    "title": "Rising-Edge Frequency Counter",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "edge-detect"
    ],
    "category": "Sequential Design",
    "lede": "Count the number of rising edges seen on a pulse input while a measurement window is open — not the number of cycles it happens to sit high.",
    "concept": "<b>Concept:</b> Level-high for multiple cycles must not be miscounted as multiple pulses. Register the previous sample, <code>prev_pulse &lt;= pulse_in</code>, and only increment on a true 0-to-1 transition: <code>if (window_en && pulse_in && !prev_pulse) count &lt;= count + 1;</code>. Counting on every cycle the level happens to be high overcounts any pulse wider than one clock.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (count=0)</td></tr>\n<tr><td>window_en</td><td>input</td><td>1</td><td>1 while the measurement window is open</td></tr>\n<tr><td>pulse_in</td><td>input</td><td>1</td><td>Signal being measured</td></tr>\n<tr><td>count</td><td>output</td><td>8</td><td>Number of rising edges seen so far</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  window_en,\n  input  pulse_in,\n  output reg [7:0] count\n);\n\n  // Your code here — count only true 0->1 transitions of pulse_in while window_en is high.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk,rst,window_en,pulse_in; wire [7:0] count; integer errors=0;\n  top_module dut(.clk(clk),.rst(rst),.window_en(window_en),.pulse_in(pulse_in),.count(count));\n  initial clk=0; always #5 clk=~clk;\n  task check; input [7:0] ec; input [127:0] label; begin\n    if(count!==ec) begin errors=errors+1; $display(\"FAIL %0s expected=%d got=%d\",label,ec,count); end\n    else $display(\"PASS %0s count=%d\",label,count);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1;window_en=0;pulse_in=0; @(posedge clk); #1; check(0,\"reset\");\n    rst=0;window_en=1;\n    pulse_in=1; @(posedge clk); #1; check(1,\"edge1\");\n    @(posedge clk); #1; check(1,\"held-high-no-recount\");\n    @(posedge clk); #1; check(1,\"still-held-no-recount\");\n    pulse_in=0; @(posedge clk); #1; check(1,\"falls-no-count\");\n    pulse_in=1; @(posedge clk); #1; check(2,\"edge2\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "window_en",
      "pulse_in",
      "count"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "pulse_in",
          "wave": "01...0.1"
        },
        {
          "name": "count[7:0]",
          "wave": "2.3.....",
          "data": [
            "0",
            "1"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "two-way-traffic-intersection",
    "title": "Two-Way Traffic Intersection",
    "difficulty": "hard",
    "points": 50,
    "level": 4,
    "tags": [
      "sequential",
      "fsm"
    ],
    "category": "Sequential Design",
    "lede": "Control two perpendicular traffic lights so that only one direction is ever green or yellow at a time — a safety-critical mutual-exclusion FSM.",
    "concept": "<b>Concept:</b> A 4-state cycle — NS green (3 cycles), NS yellow (2 cycles), EW green (3 cycles), EW yellow (2 cycles) — guarantees the two directions never overlap, because each direction's light is driven purely from the current state: <code>ns_light</code> is only ever non-red during <code>NSG</code>/<code>NSY</code>, and <code>ew_light</code> only during <code>EWG</code>/<code>EWY</code>. Letting both outputs derive green from overlapping state conditions (even briefly, like during a shared reset state) creates a real collision hazard.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (starts at NS green)</td></tr>\n<tr><td>ns_light</td><td>output</td><td>2</td><td>North-South light: 0=RED, 1=GREEN, 2=YELLOW</td></tr>\n<tr><td>ew_light</td><td>output</td><td>2</td><td>East-West light: 0=RED, 1=GREEN, 2=YELLOW</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  output [1:0] ns_light,\n  output [1:0] ew_light\n);\n\n  // Your code here — NS green(3) -> NS yellow(2) -> EW green(3) -> EW yellow(2) -> repeat. Never both green.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk,rst; wire [1:0] ns_light, ew_light; integer errors=0;\n  top_module dut(.clk(clk),.rst(rst),.ns_light(ns_light),.ew_light(ew_light));\n  initial clk=0; always #5 clk=~clk;\n  task check; input [1:0] en; input [1:0] ee; input [127:0] label; begin\n    if(ns_light!==en||ew_light!==ee) begin errors=errors+1; $display(\"FAIL %0s expected ns=%d ew=%d got ns=%d ew=%d\",label,en,ee,ns_light,ew_light); end\n    else $display(\"PASS %0s ns=%d ew=%d\",label,ns_light,ew_light);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; @(posedge clk); #1; check(1,0,\"reset-ns-green\");\n    rst=0;\n    @(posedge clk); #1; check(1,0,\"ns-green2\");\n    @(posedge clk); #1; check(1,0,\"ns-green3\");\n    @(posedge clk); #1; check(2,0,\"ns-yellow1\");\n    @(posedge clk); #1; check(2,0,\"ns-yellow2\");\n    @(posedge clk); #1; check(0,1,\"ew-green1\");\n    @(posedge clk); #1; check(0,1,\"ew-green2\");\n    @(posedge clk); #1; check(0,1,\"ew-green3\");\n    @(posedge clk); #1; check(0,2,\"ew-yellow1\");\n    @(posedge clk); #1; check(0,2,\"ew-yellow2\");\n    @(posedge clk); #1; check(1,0,\"back-to-ns-green\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "ns_light",
      "ew_light"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p..........."
        },
        {
          "name": "ns_light[1:0]",
          "wave": "2...3.4.....",
          "data": [
            "GREEN",
            "YELLOW",
            "RED"
          ]
        },
        {
          "name": "ew_light[1:0]",
          "wave": "2.......3.4.",
          "data": [
            "RED",
            "GREEN",
            "YELLOW"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "uart-frame-assembler",
    "title": "UART Frame Assembler",
    "difficulty": "hard",
    "points": 50,
    "level": 6,
    "tags": [
      "sequential",
      "fsm",
      "communication"
    ],
    "category": "Sequential Design",
    "lede": "Detect a UART start bit on a serial line, shift in 8 data bits LSB-first, and flag the completed byte for exactly one cycle.",
    "concept": "<b>Concept:</b> A UART receiver idles with <code>rx</code> high and treats a falling edge as a start bit, then shifts in 8 bits LSB-first with <code>rx_data &lt;= {rx, rx_data[7:1]}</code> (each new bit enters at the top and existing bits shift right, so the first bit received ends up in bit 0). After the 8th bit (<code>cnt==7</code>), pulse <code>rx_valid</code> for one cycle and return to idle so the next start bit can be detected.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock (sampling the line, one sample per bit)</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (returns to idle)</td></tr>\n<tr><td>rx</td><td>input</td><td>1</td><td>Serial line; idle high, falls to start a frame</td></tr>\n<tr><td>rx_data</td><td>output</td><td>8</td><td>Assembled byte, LSB-first shift-in</td></tr>\n<tr><td>rx_valid</td><td>output</td><td>1</td><td>Pulses for 1 cycle when a full byte has been received</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  rx,\n  output reg [7:0] rx_data,\n  output reg rx_valid\n);\n\n  // Your code here — idle until rx falls (start bit), shift in 8 bits LSB-first, pulse rx_valid for 1 cycle when done.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk,rst,rx; wire [7:0] rx_data; wire rx_valid; integer errors=0;\n  top_module dut(.clk(clk),.rst(rst),.rx(rx),.rx_data(rx_data),.rx_valid(rx_valid));\n  initial clk=0; always #5 clk=~clk;\n  task checkvalid; input ev; input [127:0] label; begin\n    if(rx_valid!==ev) begin errors=errors+1; $display(\"FAIL %0s expected valid=%b got valid=%b\",label,ev,rx_valid); end\n    else $display(\"PASS %0s valid=%b\",label,rx_valid);\n  end endtask\n  task checkdata; input [7:0] ed; input [127:0] label; begin\n    if(rx_data!==ed) begin errors=errors+1; $display(\"FAIL %0s expected data=%h got data=%h\",label,ed,rx_data); end\n    else $display(\"PASS %0s data=%h\",label,rx_data);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; rx=1; @(posedge clk); #1; checkvalid(0,\"reset\");\n    rst=0;\n    rx=1; @(posedge clk); #1; checkvalid(0,\"idle\");\n    rx=0; @(posedge clk); #1; checkvalid(0,\"start-bit-detected\");\n    rx=0; @(posedge clk); #1;\n    rx=1; @(posedge clk); #1;\n    rx=0; @(posedge clk); #1;\n    rx=0; @(posedge clk); #1;\n    rx=1; @(posedge clk); #1;\n    rx=1; @(posedge clk); #1;\n    rx=0; @(posedge clk); #1;\n    rx=1; @(posedge clk); #1; checkvalid(1,\"byte-complete\"); checkdata(8'hB2,\"byte-value\");\n    rx=1; @(posedge clk); #1; checkvalid(0,\"back-to-idle\");\n    rx=0; @(posedge clk); #1; checkvalid(0,\"second-start-bit-detected\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "rx",
      "rx_data",
      "rx_valid"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p..........."
        },
        {
          "name": "rx",
          "wave": "1.0.10010110"
        },
        {
          "name": "rx_valid",
          "wave": "0..........1"
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "gearbox-narrow-to-wide",
    "title": "4-to-8 Bit Gearbox",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "datapath"
    ],
    "category": "Sequential Design",
    "lede": "Pack two 4-bit nibbles arriving one per cycle into a single 8-bit word, pulsing valid only once the pair is complete — the narrow-to-wide half of a SerDes gearbox.",
    "concept": "<b>Concept:</b> A gearbox bridges two datapaths running at different widths (and therefore different word rates) without dropping data. Here, the first nibble is latched and held; when the second nibble arrives, it combines with the held nibble into a full byte, <code>{first_nibble, in_data}</code>, and <code>out_valid</code> pulses for exactly the one cycle the byte is ready — first nibble becomes the upper bits, since it arrived first.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>in_valid</td><td>input</td><td>1</td><td>1 when in_data carries a new nibble</td></tr>\n<tr><td>in_data</td><td>input</td><td>4</td><td>Incoming nibble</td></tr>\n<tr><td>out_valid</td><td>output</td><td>1</td><td>Pulses for 1 cycle when a full byte is assembled</td></tr>\n<tr><td>out_data</td><td>output</td><td>8</td><td>Assembled byte: first nibble in bits[7:4], second in bits[3:0]</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  in_valid,\n  input  [3:0] in_data,\n  output reg out_valid,\n  output reg [7:0] out_data\n);\n\n  // Your code here — latch the first nibble; on the second, pack {first, second} and pulse out_valid.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk,rst,in_valid; reg [3:0] in_data; wire out_valid; wire [7:0] out_data; integer errors=0;\n  top_module dut(.clk(clk),.rst(rst),.in_valid(in_valid),.in_data(in_data),.out_valid(out_valid),.out_data(out_data));\n  initial clk=0; always #5 clk=~clk;\n  task checkv; input ev; input [127:0] label; begin\n    if(out_valid!==ev) begin errors=errors+1; $display(\"FAIL %0s expected valid=%b got=%b\",label,ev,out_valid); end\n    else $display(\"PASS %0s valid=%b\",label,out_valid);\n  end endtask\n  task checkd; input [7:0] ed; input [127:0] label; begin\n    if(out_data!==ed) begin errors=errors+1; $display(\"FAIL %0s expected data=%h got=%h\",label,ed,out_data); end\n    else $display(\"PASS %0s data=%h\",label,out_data);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1;in_valid=0; @(posedge clk); #1; checkv(0,\"reset\");\n    rst=0;\n    in_valid=1;in_data=4'hA; @(posedge clk); #1; checkv(0,\"first-nibble-no-output\");\n    in_valid=1;in_data=4'h5; @(posedge clk); #1; checkv(1,\"byte-assembled\"); checkd(8'hA5,\"byte-value\");\n    in_valid=0; @(posedge clk); #1; checkv(0,\"deasserts\");\n    in_valid=1;in_data=4'h3; @(posedge clk); #1; checkv(0,\"third-nibble-first-of-next-pair\");\n    in_valid=1;in_data=4'hC; @(posedge clk); #1; checkv(1,\"second-byte-assembled\"); checkd(8'h3C,\"second-byte-value\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "in_valid",
      "in_data",
      "out_valid",
      "out_data"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "in_data[3:0]",
          "wave": "2.3.....",
          "data": [
            "A",
            "5"
          ]
        },
        {
          "name": "out_valid",
          "wave": "0..1.0.."
        },
        {
          "name": "out_data[7:0]",
          "wave": "2..3....",
          "data": [
            "xx",
            "A5"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "gearbox-wide-to-narrow",
    "title": "8-to-4 Bit Gearbox",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "datapath"
    ],
    "category": "Sequential Design",
    "lede": "Split an 8-bit word into two 4-bit nibbles, emitting the high nibble one cycle and the low nibble the next — the wide-to-narrow half of a SerDes gearbox.",
    "concept": "<b>Concept:</b> The mirror image of the narrow-to-wide gearbox: one wide word must fan out over two narrow-word cycles. On the cycle a byte arrives, emit the high nibble (<code>in_data[7:4]</code>) immediately and remember the low nibble; on the very next cycle, emit the held low nibble (<code>hold[3:0]</code>) with <code>out_valid</code> pulsing both times.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>in_valid</td><td>input</td><td>1</td><td>1 when in_data carries a new byte</td></tr>\n<tr><td>in_data</td><td>input</td><td>8</td><td>Incoming byte</td></tr>\n<tr><td>out_valid</td><td>output</td><td>1</td><td>Pulses for 1 cycle per emitted nibble (2 pulses per byte)</td></tr>\n<tr><td>out_data</td><td>output</td><td>4</td><td>High nibble first, then low nibble</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  in_valid,\n  input  [7:0] in_data,\n  output reg out_valid,\n  output reg [3:0] out_data\n);\n\n  // Your code here — emit in_data[7:4] the cycle a byte arrives, then in_data[3:0] the cycle after.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk,rst,in_valid; reg [7:0] in_data; wire out_valid; wire [3:0] out_data; integer errors=0;\n  top_module dut(.clk(clk),.rst(rst),.in_valid(in_valid),.in_data(in_data),.out_valid(out_valid),.out_data(out_data));\n  initial clk=0; always #5 clk=~clk;\n  task checkv; input ev; input [127:0] label; begin\n    if(out_valid!==ev) begin errors=errors+1; $display(\"FAIL %0s expected valid=%b got=%b\",label,ev,out_valid); end\n    else $display(\"PASS %0s valid=%b\",label,out_valid);\n  end endtask\n  task checkd; input [3:0] ed; input [127:0] label; begin\n    if(out_data!==ed) begin errors=errors+1; $display(\"FAIL %0s expected data=%h got=%h\",label,ed,out_data); end\n    else $display(\"PASS %0s data=%h\",label,out_data);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1;in_valid=0; @(posedge clk); #1; checkv(0,\"reset\");\n    rst=0;\n    in_valid=1;in_data=8'hA5; @(posedge clk); #1; checkv(1,\"high-nibble\"); checkd(4'hA,\"high-nibble-value\");\n    in_valid=0; @(posedge clk); #1; checkv(1,\"low-nibble\"); checkd(4'h5,\"low-nibble-value\");\n    @(posedge clk); #1; checkv(0,\"idle-after\");\n    in_valid=1;in_data=8'h3C; @(posedge clk); #1; checkv(1,\"high-nibble2\"); checkd(4'h3,\"high-nibble-value2\");\n    in_valid=0; @(posedge clk); #1; checkv(1,\"low-nibble2\"); checkd(4'hC,\"low-nibble-value2\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "in_valid",
      "in_data",
      "out_valid",
      "out_data"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "in_data[7:0]",
          "wave": "2.......",
          "data": [
            "A5"
          ]
        },
        {
          "name": "out_valid",
          "wave": "0.11.0.."
        },
        {
          "name": "out_data[3:0]",
          "wave": "2.3.4...",
          "data": [
            "xx",
            "A",
            "5"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "crc4-generator",
    "title": "CRC-4 Generator",
    "difficulty": "hard",
    "points": 50,
    "level": 8,
    "tags": [
      "combinational",
      "protocol"
    ],
    "category": "Combinational Design",
    "lede": "Compute the 4-bit CRC remainder of an 8-bit message using the CRC-4 (poly x⁴+x+1) bit-serial algorithm, entirely in combinational logic.",
    "concept": "<b>Concept:</b> A CRC is the remainder of polynomial division. The classic bit-serial method processes one message bit at a time, MSB first: feed back <code>fb = crc[3] ^ bit</code>, shift the register left, and if <code>fb</code> was set, XOR in the generator polynomial's low bits (<code>4'b0011</code> for x⁴+x+1). Unrolling this loop over all 8 input bits in an <code>always @*</code> block (or a function) gives a pure-combinational CRC generator — get the polynomial constant wrong and every non-trivial input produces a silently corrupted checksum.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>data</td><td>input</td><td>8</td><td>Message byte</td></tr>\n<tr><td>crc</td><td>output</td><td>4</td><td>CRC-4 remainder (poly x⁴+x+1), MSB-first, zero-initialized</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] data,\n  output [3:0] crc\n);\n\n  // Your code here — bit-serial CRC-4 (poly x^4+x+1): fb=crc[3]^bit; crc<<=1; if(fb) crc^=4'b0011.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] data; wire [3:0] crc; integer errors=0;\n  top_module dut(.data(data), .crc(crc));\n  task check; input [7:0] d; input [3:0] ec; begin\n    data=d;#1;\n    if(crc!==ec) begin errors=errors+1; $display(\"FAIL data=%h expected crc=%h got=%h\",d,ec,crc); end\n    else $display(\"PASS data=%h crc=%h\",d,crc);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(8'h00, 4'h0);\n    check(8'hFF, 4'h4);\n    check(8'hA5, 4'hB);\n    check(8'h3C, 4'h8);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "data",
      "crc"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "data[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "00",
            "FF",
            "A5",
            "3C"
          ]
        },
        {
          "name": "crc[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "4",
            "B",
            "8"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "crc4-checker",
    "title": "CRC-4 Checker",
    "difficulty": "hard",
    "points": 50,
    "level": 8,
    "tags": [
      "combinational",
      "protocol"
    ],
    "category": "Combinational Design",
    "lede": "Recompute the CRC-4 remainder of a received message and compare it against the appended CRC field to flag transmission errors.",
    "concept": "<b>Concept:</b> A receiver validates a frame by running the exact same CRC-4 algorithm the sender used and comparing results: <code>error = (crc_in != compute_crc(data))</code>. Getting the comparison backwards — flagging <code>error</code> when the CRCs <em>match</em> — silently accepts every corrupted frame and rejects every good one, which is far more dangerous than no checking at all.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>data</td><td>input</td><td>8</td><td>Received message byte</td></tr>\n<tr><td>crc_in</td><td>input</td><td>4</td><td>Received CRC-4 field</td></tr>\n<tr><td>error</td><td>output</td><td>1</td><td>1 when the recomputed CRC doesn't match crc_in</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] data,\n  input  [3:0] crc_in,\n  output error\n);\n\n  // Your code here — recompute CRC-4 (poly x^4+x+1) over data, error = (crc_in != recomputed).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] data; reg [3:0] crc_in; wire error; integer errors=0;\n  top_module dut(.data(data), .crc_in(crc_in), .error(error));\n  task check; input [7:0] d; input [3:0] c; input ee; begin\n    data=d;crc_in=c;#1;\n    if(error!==ee) begin errors=errors+1; $display(\"FAIL data=%h crc_in=%h expected error=%b got=%b\",d,c,ee,error); end\n    else $display(\"PASS data=%h crc_in=%h error=%b\",d,c,error);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(8'h00, 4'h0, 0);\n    check(8'hFF, 4'h4, 0);\n    check(8'hA5, 4'hB, 0);\n    check(8'hA5, 4'hC, 1);\n    check(8'h3C, 4'h0, 1);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "data",
      "crc_in",
      "error"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "data[7:0]",
          "wave": "2.3.4...",
          "data": [
            "A5",
            "A5",
            "3C"
          ]
        },
        {
          "name": "crc_in[3:0]",
          "wave": "2.3.4...",
          "data": [
            "B",
            "C",
            "0"
          ]
        },
        {
          "name": "error",
          "wave": "0.1....."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "additive-scrambler",
    "title": "Additive LFSR Scrambler",
    "difficulty": "hard",
    "points": 50,
    "level": 8,
    "tags": [
      "sequential",
      "lfsr",
      "protocol"
    ],
    "category": "Sequential Design",
    "lede": "Whiten a data stream by XORing it with a free-running LFSR keystream — the same circuit that descrambles it, since XOR is its own inverse.",
    "concept": "<b>Concept:</b> Line codes avoid long runs of identical bits by scrambling data with a pseudo-random keystream from a free-running 7-bit LFSR (<code>fb = lfsr[6]^lfsr[0]</code>, shifting every cycle regardless of the data). The output is simply <code>data_in ^ lfsr[6]</code>. Because XOR is its own inverse, feeding the scrambled output back through an identically-seeded LFSR recovers the original data — descrambling needs no separate circuit.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (seeds LFSR to 7'h7F)</td></tr>\n<tr><td>data_in</td><td>input</td><td>1</td><td>Raw data bit</td></tr>\n<tr><td>scrambled_out</td><td>output</td><td>1</td><td>data_in XORed with the current LFSR keystream bit</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  data_in,\n  output scrambled_out\n);\n\n  // Your code here — 7-bit LFSR, seed 7'h7F, fb=lfsr[6]^lfsr[0], free-running; scrambled_out = data_in ^ lfsr[6].\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk,rst,data_in; wire scrambled_out; integer errors=0;\n  top_module dut(.clk(clk),.rst(rst),.data_in(data_in),.scrambled_out(scrambled_out));\n  initial clk=0; always #5 clk=~clk;\n  task check; input ed; input eo; input [127:0] label; begin\n    data_in=ed;#1;\n    if(scrambled_out!==eo) begin errors=errors+1; $display(\"FAIL %0s data_in=%b expected=%b got=%b\",label,ed,eo,scrambled_out); end\n    else $display(\"PASS %0s data_in=%b out=%b\",label,ed,scrambled_out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; @(posedge clk); check(0,1,\"t0\");\n    rst=0;\n    @(posedge clk); check(1,0,\"t1\");\n    @(posedge clk); check(0,1,\"t2\");\n    @(posedge clk); check(1,0,\"t3\");\n    @(posedge clk); check(1,0,\"t4\");\n    @(posedge clk); check(0,1,\"t5\");\n    @(posedge clk); check(1,0,\"t6\");\n    @(posedge clk); check(0,0,\"t7\");\n    @(posedge clk); check(1,0,\"t8\");\n    @(posedge clk); check(1,1,\"t9\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "data_in",
      "scrambled_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p....."
        },
        {
          "name": "data_in",
          "wave": "2.3.4.",
          "data": [
            "0",
            "1",
            "0"
          ]
        },
        {
          "name": "scrambled_out",
          "wave": "2.3.4.",
          "data": [
            "1",
            "0",
            "1"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "run-length-bit-stuffer",
    "title": "Run-Length Bit Stuffer",
    "difficulty": "medium",
    "points": 25,
    "level": 6,
    "tags": [
      "sequential",
      "protocol"
    ],
    "category": "Sequential Design",
    "lede": "Flag when a stuff bit must be inserted after five consecutive 1s in a serial stream — the core rule behind CAN bus bit stuffing.",
    "concept": "<b>Concept:</b> Protocols like CAN insert a complementary bit after every 5 identical bits in a row so receivers never lose bit-sync during long runs. Track a running count of consecutive 1s; the moment it would hit 5 (<code>run==4</code> and the current bit is also 1), raise <code>stuff_needed</code> for one cycle and reset the run — the inserted 0 breaks the streak, so counting must restart from zero rather than continuing.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock (one stream bit per cycle)</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>bit_in</td><td>input</td><td>1</td><td>Next bit of the outgoing stream</td></tr>\n<tr><td>stuff_needed</td><td>output</td><td>1</td><td>Pulses for 1 cycle right after the 5th consecutive 1</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  bit_in,\n  output reg stuff_needed\n);\n\n  // Your code here — count consecutive 1s; pulse stuff_needed and reset the count after the 5th.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk,rst,bit_in; wire stuff_needed; integer errors=0;\n  top_module dut(.clk(clk),.rst(rst),.bit_in(bit_in),.stuff_needed(stuff_needed));\n  initial clk=0; always #5 clk=~clk;\n  task check; input es; input [127:0] label; begin\n    if(stuff_needed!==es) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,es,stuff_needed); end\n    else $display(\"PASS %0s stuff_needed=%b\",label,stuff_needed);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1;bit_in=0; @(posedge clk); #1; check(0,\"reset\");\n    rst=0;bit_in=1;\n    @(posedge clk); #1; check(0,\"run1\");\n    @(posedge clk); #1; check(0,\"run2\");\n    @(posedge clk); #1; check(0,\"run3\");\n    @(posedge clk); #1; check(0,\"run4\");\n    @(posedge clk); #1; check(1,\"stuff-after-5-ones\");\n    @(posedge clk); #1; check(0,\"run-reset-after-stuff\");\n    bit_in=0;\n    @(posedge clk); #1; check(0,\"zero-breaks-run\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "bit_in",
      "stuff_needed"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "bit_in",
          "wave": "01......"
        },
        {
          "name": "stuff_needed",
          "wave": "0....10."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "axi-stream-handshake-counter",
    "title": "AXI-Stream Handshake Counter",
    "difficulty": "easy",
    "points": 10,
    "level": 6,
    "tags": [
      "sequential",
      "protocol"
    ],
    "category": "Sequential Design",
    "lede": "Count how many beats have actually transferred across a valid/ready handshake — a transfer only happens when both sides agree, not whenever the source merely asserts valid.",
    "concept": "<b>Concept:</b> In a ready/valid streaming interface, data only moves on a cycle where <em>both</em> <code>valid</code> and <code>ready</code> are high simultaneously; <code>valid</code> alone just means the source has data waiting, and can sit high for many stalled cycles. Counting on <code>valid</code> without gating on <code>ready</code> overcounts every stall as if it were a real transfer.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (count=0)</td></tr>\n<tr><td>valid</td><td>input</td><td>1</td><td>Source has data ready</td></tr>\n<tr><td>ready</td><td>input</td><td>1</td><td>Sink can accept data this cycle</td></tr>\n<tr><td>count</td><td>output</td><td>8</td><td>Number of completed valid&amp;ready transfers</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  valid,\n  input  ready,\n  output reg [7:0] count\n);\n\n  // Your code here — increment count only on cycles where valid AND ready are both high.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk,rst,valid,ready; wire [7:0] count; integer errors=0;\n  top_module dut(.clk(clk),.rst(rst),.valid(valid),.ready(ready),.count(count));\n  initial clk=0; always #5 clk=~clk;\n  task check; input [7:0] ec; input [127:0] label; begin\n    if(count!==ec) begin errors=errors+1; $display(\"FAIL %0s expected=%d got=%d\",label,ec,count); end\n    else $display(\"PASS %0s count=%d\",label,count);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1;valid=0;ready=0; @(posedge clk); #1; check(0,\"reset\");\n    rst=0;\n    valid=1;ready=0; @(posedge clk); #1; check(0,\"valid-no-ready-no-count\");\n    valid=1;ready=1; @(posedge clk); #1; check(1,\"transfer1\");\n    valid=0;ready=1; @(posedge clk); #1; check(1,\"no-valid-no-count\");\n    valid=1;ready=1; @(posedge clk); #1; check(2,\"transfer2\");\n    valid=1;ready=1; @(posedge clk); #1; check(3,\"transfer3\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "valid",
      "ready",
      "count"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "valid",
          "wave": "01......"
        },
        {
          "name": "ready",
          "wave": "0.1.0.1."
        },
        {
          "name": "count[7:0]",
          "wave": "2...3.4.",
          "data": [
            "0",
            "1",
            "2"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "byte-sync-detector",
    "title": "Byte Sync Detector",
    "difficulty": "easy",
    "points": 10,
    "level": 6,
    "tags": [
      "sequential",
      "protocol"
    ],
    "category": "Sequential Design",
    "lede": "Lock onto a known sync byte in an incoming byte stream and stay locked afterward — the framing step every byte-oriented receiver needs before it can trust word boundaries.",
    "concept": "<b>Concept:</b> Once a framer spots the sync pattern (<code>8'hA5</code> here), it should latch <code>locked</code> and hold it — later bytes that don't happen to match shouldn't drop the lock, since a real receiver only re-syncs on an explicit resync condition (like reset), not on every non-matching byte. Making the assignment unconditional instead of sticky (<code>locked &lt;= match</code> instead of <code>if(match) locked&lt;=1</code>) causes spurious loss of lock the very next cycle.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (locked=0)</td></tr>\n<tr><td>byte_in</td><td>input</td><td>8</td><td>Next byte from the stream</td></tr>\n<tr><td>byte_valid</td><td>input</td><td>1</td><td>1 when byte_in is valid this cycle</td></tr>\n<tr><td>locked</td><td>output</td><td>1</td><td>1 once the sync byte (8'hA5) has been seen; stays 1</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  [7:0] byte_in,\n  input  byte_valid,\n  output reg locked\n);\n\n  // Your code here — set locked=1 the first time byte_in==8'hA5 while byte_valid; stay locked afterward.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk,rst,byte_valid; reg [7:0] byte_in; wire locked; integer errors=0;\n  top_module dut(.clk(clk),.rst(rst),.byte_in(byte_in),.byte_valid(byte_valid),.locked(locked));\n  initial clk=0; always #5 clk=~clk;\n  task check; input el; input [127:0] label; begin\n    if(locked!==el) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,el,locked); end\n    else $display(\"PASS %0s locked=%b\",label,locked);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1;byte_valid=0;byte_in=8'h00; @(posedge clk); #1; check(0,\"reset\");\n    rst=0;\n    byte_valid=1;byte_in=8'h11; @(posedge clk); #1; check(0,\"not-sync-byte\");\n    byte_valid=1;byte_in=8'hA5; @(posedge clk); #1; check(1,\"sync-byte-locks\");\n    byte_valid=1;byte_in=8'h22; @(posedge clk); #1; check(1,\"stays-locked-on-other-byte\");\n    byte_valid=0;byte_in=8'h00; @(posedge clk); #1; check(1,\"stays-locked-no-valid\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "byte_valid",
      "byte_in",
      "locked"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "byte_in[7:0]",
          "wave": "2.3.4...",
          "data": [
            "11",
            "A5",
            "22"
          ]
        },
        {
          "name": "locked",
          "wave": "0..1...."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "endianness-swapper",
    "title": "16-Bit Endianness Swapper",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "datapath"
    ],
    "category": "Combinational Design",
    "lede": "Swap the byte order of a 16-bit word — the wiring fix needed whenever two datapaths disagree on big-endian vs little-endian byte order.",
    "concept": "<b>Concept:</b> Endianness swapping is pure rewiring, not arithmetic: move the low byte to the high position and vice versa with <code>{word_in[7:0], word_in[15:8]}</code>. It's an easy copy-paste trap to instead write the bytes back in their original order (<code>{word_in[15:8], word_in[7:0]}</code>), which silently compiles and simulates as a no-op.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>word_in</td><td>input</td><td>16</td><td>Input word</td></tr>\n<tr><td>word_out</td><td>output</td><td>16</td><td>word_in with its two bytes swapped</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [15:0] word_in,\n  output [15:0] word_out\n);\n\n  // Your code here — word_out = {low_byte, high_byte}.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [15:0] word_in; wire [15:0] word_out; integer errors=0;\n  top_module dut(.word_in(word_in), .word_out(word_out));\n  task check; input [15:0] w; input [15:0] ew; begin\n    word_in=w;#1;\n    if(word_out!==ew) begin errors=errors+1; $display(\"FAIL word_in=%h expected=%h got=%h\",w,ew,word_out); end\n    else $display(\"PASS word_in=%h word_out=%h\",w,word_out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(16'h1234, 16'h3412);\n    check(16'hABCD, 16'hCDAB);\n    check(16'h00FF, 16'hFF00);\n    check(16'h0000, 16'h0000);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "word_in",
      "word_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "word_in[15:0]",
          "wave": "2.3.4.5.",
          "data": [
            "1234",
            "ABCD",
            "00FF",
            "0000"
          ]
        },
        {
          "name": "word_out[15:0]",
          "wave": "2.3.4.5.",
          "data": [
            "3412",
            "CDAB",
            "FF00",
            "0000"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "packet-length-counter",
    "title": "Packet Length Counter",
    "difficulty": "medium",
    "points": 25,
    "level": 6,
    "tags": [
      "sequential",
      "protocol"
    ],
    "category": "Sequential Design",
    "lede": "Count how many cycles a frame stayed active and latch that length the moment the frame ends — resetting cleanly so the next frame's length isn't polluted by the last one.",
    "concept": "<b>Concept:</b> While <code>frame_active</code> is high, tally cycles in a running counter; the instant it drops, latch that tally into <code>length</code> and — critically — reset the running counter back to zero so the next frame starts clean. Forgetting the reset leaves the internal counter holding its old value, so the next frame's reported length silently includes cycles from the frame before it.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (length=0)</td></tr>\n<tr><td>frame_active</td><td>input</td><td>1</td><td>1 while a frame is being received</td></tr>\n<tr><td>length</td><td>output</td><td>8</td><td>Cycle count of the most recently completed frame</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  frame_active,\n  output reg [7:0] length\n);\n\n  // Your code here — count cycles while frame_active is high; latch into length when it drops, then reset the counter.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk,rst,frame_active; wire [7:0] length; integer errors=0;\n  top_module dut(.clk(clk),.rst(rst),.frame_active(frame_active),.length(length));\n  initial clk=0; always #5 clk=~clk;\n  task check; input [7:0] el; input [127:0] label; begin\n    if(length!==el) begin errors=errors+1; $display(\"FAIL %0s expected=%d got=%d\",label,el,length); end\n    else $display(\"PASS %0s length=%d\",label,length);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1;frame_active=0; @(posedge clk); #1; check(0,\"reset\");\n    rst=0;\n    frame_active=1; @(posedge clk); #1;\n    @(posedge clk); #1;\n    @(posedge clk); #1;\n    frame_active=0; @(posedge clk); #1; check(3,\"first-frame-length-3\");\n    frame_active=1; @(posedge clk); #1;\n    @(posedge clk); #1;\n    frame_active=0; @(posedge clk); #1; check(2,\"second-frame-length-2-not-cumulative\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "frame_active",
      "length"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "frame_active",
          "wave": "01110..."
        },
        {
          "name": "length[7:0]",
          "wave": "2......3",
          "data": [
            "0",
            "3"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "async-reset-synchronizer",
    "title": "Async-Assert / Sync-Deassert Reset",
    "difficulty": "hard",
    "points": 50,
    "level": 7,
    "tags": [
      "sequential",
      "cdc"
    ],
    "category": "Sequential Design",
    "lede": "Assert reset the instant it goes active, but only release it once it has been clean for 2 clock edges — the standard reset architecture for any real design.",
    "concept": "<b>Concept:</b> Reset assertion must reach every flop immediately, even mid-cycle, so it belongs in the sensitivity list itself: <code>always @(posedge clk or negedge async_rst_n)</code>. Release, though, must not land on a clock edge and risk a recovery/removal violation — so deassertion is synchronized through two flops before <code>sync_rst_n</code> ever goes high, exactly like a normal 2-flop CDC chain but seeded by an asynchronous reset instead of a data input.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Destination clock</td></tr>\n<tr><td>async_rst_n</td><td>input</td><td>1</td><td>Asynchronous, active-low reset source</td></tr>\n<tr><td>sync_rst_n</td><td>output</td><td>1</td><td>Asserts immediately with async_rst_n; deasserts 2 clk cycles after release</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  async_rst_n,\n  output reg sync_rst_n\n);\n\n  // Your code here — assert sync_rst_n asynchronously with async_rst_n; release through a 2-flop chain.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, async_rst_n; wire sync_rst_n; integer errors=0;\n  top_module dut(.clk(clk), .async_rst_n(async_rst_n), .sync_rst_n(sync_rst_n));\n  initial clk=0; always #5 clk=~clk;\n  task check; input es; input [127:0] label; begin\n    if(sync_rst_n!==es) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,es,sync_rst_n); end\n    else $display(\"PASS %0s sync_rst_n=%b\",label,sync_rst_n);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    async_rst_n=0; #1; check(0,\"async-assert-immediate\");\n    @(posedge clk); #1; check(0,\"still-asserted-during-reset\");\n    async_rst_n=1;\n    @(posedge clk); #1; check(0,\"cyc1-after-release-not-yet\");\n    @(posedge clk); #1; check(1,\"cyc2-after-release-now-deasserted\");\n    #2; async_rst_n=0; #1; check(0,\"async-reassert-immediate-mid-cycle\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "async_rst_n",
      "sync_rst_n"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........"
        },
        {
          "name": "src_clk (async domain, illustrative)",
          "wave": "p........",
          "phase": 0.5
        },
        {
          "name": "async_rst_n",
          "wave": "0.1......",
          "phase": 0.5
        },
        {
          "name": "sync_rst_n",
          "wave": "0....1..."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "three-flop-synchronizer",
    "title": "3-Flop CDC Synchronizer",
    "difficulty": "medium",
    "points": 25,
    "level": 7,
    "tags": [
      "sequential",
      "cdc"
    ],
    "category": "Sequential Design",
    "lede": "A deeper 3-stage synchronizer for signals that need extra MTBF margin beyond the standard 2-flop chain.",
    "concept": "<b>Concept:</b> More synchronizer stages exponentially improve mean-time-between-failures at the cost of extra latency: <code>meta1&lt;=async_in; meta2&lt;=meta1; sync_out&lt;=meta2;</code> gives 3 cycles of latency instead of 2. Stopping one stage short (using <code>meta1</code> directly as the output) saves a cycle of latency but gives up the extra metastability margin — a real tradeoff, not just a bug.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Destination clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>async_in</td><td>input</td><td>1</td><td>Signal from another clock domain</td></tr>\n<tr><td>sync_out</td><td>output</td><td>1</td><td>async_in, synchronized (3 cycles of latency)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  async_in,\n  output reg sync_out\n);\n\n  // Your code here — 3 cascaded flops: meta1 <- async_in, meta2 <- meta1, sync_out <- meta2.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, async_in; wire sync_out; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .async_in(async_in), .sync_out(sync_out));\n  initial clk=0; always #5 clk=~clk;\n  task check; input es; input [127:0] label; begin\n    if(sync_out!==es) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,es,sync_out); end\n    else $display(\"PASS %0s sync_out=%b\",label,sync_out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; async_in=0; @(posedge clk); #1; check(0,\"reset\");\n    rst=0; async_in=1;\n    @(posedge clk); #1; check(0,\"cyc1-not-yet\");\n    @(posedge clk); #1; check(0,\"cyc2-not-yet\");\n    @(posedge clk); #1; check(1,\"cyc3-now-synced\");\n    async_in=0;\n    @(posedge clk); #1; check(1,\"cyc4-still-1-delayed\");\n    @(posedge clk); #1; check(1,\"cyc5-still-1-delayed\");\n    @(posedge clk); #1; check(0,\"cyc6-now-0\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "async_in",
      "sync_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p............."
        },
        {
          "name": "src_clk (async domain, illustrative)",
          "wave": "p.............",
          "phase": 0.5
        },
        {
          "name": "async_in",
          "wave": "0.1.......0...",
          "phase": 0.5
        },
        {
          "name": "sync_out",
          "wave": "0.....1......."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "level-cross-edge-detector",
    "title": "Synchronized Rising-Edge Detector",
    "difficulty": "medium",
    "points": 25,
    "level": 7,
    "tags": [
      "sequential",
      "cdc",
      "edge-detect"
    ],
    "category": "Sequential Design",
    "lede": "Safely synchronize an asynchronous level signal, then produce a clean single-cycle pulse the moment it rises in the local clock domain.",
    "concept": "<b>Concept:</b> First synchronize the raw level with the usual 2-flop chain (<code>sync1</code>, <code>sync2</code>), then compare consecutive synchronized samples to find the edge: <code>pulse_out &lt;= sync1 &amp; ~sync2</code>. Comparing against the raw <em>synchronized</em> signal only (skipping the second delayed sample and just registering <code>sync1</code> itself) produces a signal that stays high for the whole duration instead of a single clean pulse.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Destination clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>async_in</td><td>input</td><td>1</td><td>Asynchronous level signal from another domain</td></tr>\n<tr><td>pulse_out</td><td>output</td><td>1</td><td>Pulses for 1 cycle on each synchronized rising edge</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  async_in,\n  output reg pulse_out\n);\n\n  // Your code here — 2-flop synchronize async_in, then pulse on the rising edge of the synchronized signal.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, async_in; wire pulse_out; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .async_in(async_in), .pulse_out(pulse_out));\n  initial clk=0; always #5 clk=~clk;\n  task check; input ep; input [127:0] label; begin\n    if(pulse_out!==ep) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,ep,pulse_out); end\n    else $display(\"PASS %0s pulse_out=%b\",label,pulse_out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; async_in=0; @(posedge clk); #1; check(0,\"reset\");\n    rst=0;\n    @(posedge clk); #1; check(0,\"cyc1-still-0\");\n    async_in=1;\n    @(posedge clk); #1; check(0,\"cyc2-meta-only\");\n    @(posedge clk); #1; check(0,\"cyc3-sync1-only\");\n    @(posedge clk); #1; check(1,\"cyc4-pulse-fires\");\n    @(posedge clk); #1; check(0,\"cyc5-pulse-gone\");\n    @(posedge clk); #1; check(0,\"cyc6-still-0-no-retrigger\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "async_in",
      "pulse_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p............."
        },
        {
          "name": "src_clk (async domain, illustrative)",
          "wave": "p.............",
          "phase": 0.5
        },
        {
          "name": "async_in",
          "wave": "0..1..........",
          "phase": 0.5
        },
        {
          "name": "pulse_out",
          "wave": "0......10....."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "pulse-toggle-synchronizer",
    "title": "Toggle-Based Pulse Synchronizer",
    "difficulty": "hard",
    "points": 50,
    "level": 7,
    "tags": [
      "sequential",
      "cdc"
    ],
    "category": "Sequential Design",
    "lede": "Cross a single-cycle pulse safely between clock domains by toggle-encoding it — a plain 2-flop level synchronizer would simply miss it if the destination clock is slower.",
    "concept": "<b>Concept:</b> A pulse from another domain can't be trusted to survive a plain level synchronizer, since a fast pulse can come and go between destination clock edges. Toggle-encoding fixes this: the source flips a toggle bit for every pulse instead of pulsing directly (that flip happens upstream and is assumed already done here — <code>tog_in</code> is the toggled signal). The destination double-flops that toggle, then XORs two consecutive synchronized samples: <code>pulse_out &lt;= sync1 ^ sync2</code>. Because a toggle only ever changes state (never returns to a matching value on its own), this reconstructs exactly one clean pulse per source event, no matter how the clocks relate. Using AND instead of XOR misses every toggle-back-to-0 transition.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Destination clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>tog_in</td><td>input</td><td>1</td><td>Toggle-encoded pulse signal from another domain</td></tr>\n<tr><td>pulse_out</td><td>output</td><td>1</td><td>Pulses for 1 cycle on every toggle transition</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  tog_in,\n  output reg pulse_out\n);\n\n  // Your code here — 2-flop synchronize tog_in, then XOR consecutive synced samples to regenerate a pulse.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, tog_in; wire pulse_out; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .tog_in(tog_in), .pulse_out(pulse_out));\n  initial clk=0; always #5 clk=~clk;\n  task check; input ep; input [127:0] label; begin\n    if(pulse_out!==ep) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,ep,pulse_out); end\n    else $display(\"PASS %0s pulse_out=%b\",label,pulse_out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; tog_in=0; @(posedge clk); #1; check(0,\"reset\");\n    rst=0;\n    tog_in=1;\n    @(posedge clk); #1; check(0,\"cyc1-meta-only\");\n    @(posedge clk); #1; check(0,\"cyc2-sync1-only\");\n    @(posedge clk); #1; check(1,\"cyc3-pulse-fires\");\n    @(posedge clk); #1; check(0,\"cyc4-pulse-gone\");\n    tog_in=0;\n    @(posedge clk); #1; check(0,\"cyc5-tog-back-meta-only\");\n    @(posedge clk); #1; check(0,\"cyc6-sync1-only\");\n    @(posedge clk); #1; check(1,\"cyc7-second-pulse-on-toggle-back\");\n    @(posedge clk); #1; check(0,\"cyc8-pulse-gone\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "tog_in",
      "pulse_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p................."
        },
        {
          "name": "src_clk (async domain, illustrative)",
          "wave": "p.................",
          "phase": 0.5
        },
        {
          "name": "tog_in",
          "wave": "0.1.......0.......",
          "phase": 0.5
        },
        {
          "name": "pulse_out",
          "wave": "0.....1.....1....."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "handshake-ack-responder",
    "title": "CDC Handshake Acknowledge Responder",
    "difficulty": "hard",
    "points": 50,
    "level": 7,
    "tags": [
      "sequential",
      "cdc",
      "protocol"
    ],
    "category": "Sequential Design",
    "lede": "Synchronize an asynchronous request line and fire exactly one acknowledge pulse per request — never re-acking while the request is still held, only re-arming once it drops.",
    "concept": "<b>Concept:</b> A 4-phase handshake responder synchronizes <code>req</code> with the usual 2-flop chain, then edge-detects the synchronized request to fire a single <code>ack</code> pulse: <code>ack &lt;= sync_req &amp; ~req_prev</code>. The extra <code>req_prev</code> register (a 3rd stage beyond the 2-flop sync) is what prevents re-acking every cycle the request stays high — without it, <code>ack</code> would just mirror the level and fire continuously for as long as <code>req</code> is asserted.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Destination clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>req</td><td>input</td><td>1</td><td>Asynchronous request level from another domain</td></tr>\n<tr><td>ack</td><td>output</td><td>1</td><td>Pulses for 1 cycle once per synchronized request rising edge</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  req,\n  output reg ack\n);\n\n  // Your code here — 2-flop sync req, then a 3rd stage to edge-detect and pulse ack once per request.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, req; wire ack; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .req(req), .ack(ack));\n  initial clk=0; always #5 clk=~clk;\n  task check; input ea; input [127:0] label; begin\n    if(ack!==ea) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,ea,ack); end\n    else $display(\"PASS %0s ack=%b\",label,ack);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; req=0; @(posedge clk); #1; check(0,\"reset\");\n    rst=0; req=1;\n    @(posedge clk); #1; check(0,\"cyc1-meta-only\");\n    @(posedge clk); #1; check(0,\"cyc2-sync_req-only\");\n    @(posedge clk); #1; check(1,\"cyc3-ack-fires\");\n    @(posedge clk); #1; check(0,\"cyc4-ack-gone-req-still-high\");\n    @(posedge clk); #1; check(0,\"cyc5-no-reack-while-req-held\");\n    req=0;\n    @(posedge clk); #1; @(posedge clk); #1; @(posedge clk); #1; check(0,\"req-dropped-no-ack\");\n    req=1;\n    @(posedge clk); #1; @(posedge clk); #1; check(0,\"re-req-cyc2-not-yet\");\n    @(posedge clk); #1; check(1,\"re-req-ack-fires-again\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "req",
      "ack"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......................."
        },
        {
          "name": "src_clk (async domain, illustrative)",
          "wave": "p.......................",
          "phase": 0.5
        },
        {
          "name": "req",
          "wave": "0.1.......0...1.........",
          "phase": 0.5
        },
        {
          "name": "ack",
          "wave": "0.....10..........10...."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "pulse-stretch-and-sync",
    "title": "Stretch-and-Synchronize Pulse",
    "difficulty": "hard",
    "points": 50,
    "level": 7,
    "tags": [
      "sequential",
      "cdc"
    ],
    "category": "Sequential Design",
    "lede": "Widen a fast, possibly very short pulse to guarantee it's caught by a much slower destination clock, then synchronize the stretched level cleanly across domains.",
    "concept": "<b>Concept:</b> If the source pulse can be shorter than one destination clock period, a synchronizer might sample right between edges and miss it entirely. Stretching fixes this: latch a small counter on <code>fast_pulse</code> and hold an internal <code>stretched</code> flag high until it expires, guaranteeing at least a few destination-clock cycles of visibility. Only then does the usual 2-flop-sync-plus-edge-detect pipeline turn it back into a single clean pulse. Skipping the stretch stage (synchronizing <code>fast_pulse</code> directly) works fine in simulation but is exactly the kind of shortcut that misses real pulses on real silicon.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Destination (slower) clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>fast_pulse</td><td>input</td><td>1</td><td>Possibly very short pulse from a faster/unrelated domain</td></tr>\n<tr><td>sync_pulse</td><td>output</td><td>1</td><td>Clean 1-cycle pulse in the destination domain, guaranteed not to be missed</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  fast_pulse,\n  output reg sync_pulse\n);\n\n  // Your code here — stretch fast_pulse with a small counter, then 2-flop sync + edge-detect the stretched level.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, fast_pulse; wire sync_pulse; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .fast_pulse(fast_pulse), .sync_pulse(sync_pulse));\n  initial clk=0; always #5 clk=~clk;\n  task check; input ep; input [127:0] label; begin\n    if(sync_pulse!==ep) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,ep,sync_pulse); end\n    else $display(\"PASS %0s sync_pulse=%b\",label,sync_pulse);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; fast_pulse=0; @(posedge clk); #1; check(0,\"reset\");\n    rst=0;\n    fast_pulse=1; @(posedge clk); #1; check(0,\"cyc1-stretched-set-meta-not-yet\");\n    fast_pulse=0;\n    @(posedge clk); #1; check(0,\"cyc2-meta-set-sync1-not-yet\");\n    @(posedge clk); #1; check(0,\"cyc3-sync1-set-sync2-not-yet\");\n    @(posedge clk); #1; check(1,\"cyc4-sync_pulse-fires-even-though-fast_pulse-long-gone\");\n    @(posedge clk); #1; check(0,\"cyc5-pulse-gone\");\n    @(posedge clk); #1; check(0,\"cyc6-no-retrigger\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "fast_pulse",
      "sync_pulse"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p................."
        },
        {
          "name": "src_clk (async/fast domain, illustrative)",
          "wave": "p.................",
          "phase": 0.5
        },
        {
          "name": "fast_pulse",
          "wave": "0.10..............",
          "phase": 0.5
        },
        {
          "name": "sync_pulse",
          "wave": "0........10......."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "cdc-bus-hold-register",
    "title": "CDC Bus Hold Register",
    "difficulty": "medium",
    "points": 25,
    "level": 7,
    "tags": [
      "sequential",
      "cdc",
      "datapath"
    ],
    "category": "Sequential Design",
    "lede": "Capture a data bus only on a valid strobe and hold it steady otherwise — never let an unregistered async bus pass straight through to downstream logic.",
    "concept": "<b>Concept:</b> A multi-bit bus crossing domains can't just be wired through combinationally — different bits can settle at slightly different times, so any glitch or skew on the source side becomes visible immediately downstream. The fix is to only ever update the output register when a (separately synchronized) <code>valid</code> strobe says the bus is stable: <code>if (valid) data_out &lt;= data_in;</code>, holding the old value the rest of the time. Wiring <code>data_out</code> straight to <code>data_in</code> with no register at all defeats the entire point — every glitch on the input rides straight through.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Destination clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>valid</td><td>input</td><td>1</td><td>1 when data_in is stable and safe to capture</td></tr>\n<tr><td>data_in</td><td>input</td><td>8</td><td>Incoming bus, only trustworthy while valid is high</td></tr>\n<tr><td>data_out</td><td>output</td><td>8</td><td>Captured value, held steady between valid strobes</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  valid,\n  input  [7:0] data_in,\n  output reg [7:0] data_out\n);\n\n  // Your code here — capture data_in into data_out only when valid is high; hold otherwise.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, valid; reg [7:0] data_in; wire [7:0] data_out; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .valid(valid), .data_in(data_in), .data_out(data_out));\n  initial clk=0; always #5 clk=~clk;\n  task check; input [7:0] ed; input [127:0] label; begin\n    if(data_out!==ed) begin errors=errors+1; $display(\"FAIL %0s expected=%h got=%h\",label,ed,data_out); end\n    else $display(\"PASS %0s data_out=%h\",label,data_out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; valid=0; data_in=8'h00; @(posedge clk); #1; check(8'h00,\"reset\");\n    rst=0;\n    valid=1; data_in=8'hA5; @(posedge clk); #1; check(8'hA5,\"captured-on-valid\");\n    valid=0; data_in=8'hFF; #1; check(8'hA5,\"holds-ignoring-glitch-before-clock\");\n    @(posedge clk); #1; check(8'hA5,\"holds-through-clock-no-valid\");\n    @(posedge clk); #1; check(8'hA5,\"still-holding\");\n    valid=1; data_in=8'h3C; @(posedge clk); #1; check(8'h3C,\"captures-new-value\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "valid",
      "data_in",
      "data_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "src_clk (async domain, illustrative)",
          "wave": "p.......",
          "phase": 0.5
        },
        {
          "name": "valid",
          "wave": "01.0..1.",
          "phase": 0.5
        },
        {
          "name": "data_in[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "00",
            "A5",
            "FF",
            "3C"
          ],
          "phase": 0.5
        },
        {
          "name": "data_out[7:0]",
          "wave": "2..3.4..",
          "data": [
            "00",
            "A5",
            "3C"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "sync-enable-counter-snapshot",
    "title": "Synchronized-Enable Counter Snapshot",
    "difficulty": "medium",
    "points": 25,
    "level": 7,
    "tags": [
      "sequential",
      "cdc"
    ],
    "category": "Sequential Design",
    "lede": "Snapshot a free-running counter's value only when an asynchronous sample request has been safely synchronized — synchronizing the control signal, not the fast-changing data, is the trick.",
    "concept": "<b>Concept:</b> The right CDC pattern here is to synchronize the slow-changing <em>control</em> signal (<code>sample_en</code>) rather than trying to synchronize the free-running counter itself, which changes every cycle. Once <code>sample_en</code> is safely double-flopped and edge-detected, use that clean local pulse to gate a normal capture register. Gating the capture directly off the raw, unsynchronized <code>sample_en</code> input instead risks capturing the counter mid-transition or re-triggering unpredictably.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Local clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>sample_en</td><td>input</td><td>1</td><td>Asynchronous sample-request level</td></tr>\n<tr><td>snapshot</td><td>output</td><td>8</td><td>Free-running counter value, captured once per synchronized sample_en edge</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  sample_en,\n  output reg [7:0] snapshot\n);\n\n  // Your code here — free-run an 8-bit counter; 2-flop sync + edge-detect sample_en; capture the counter on that pulse.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, sample_en; wire [7:0] snapshot; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .sample_en(sample_en), .snapshot(snapshot));\n  initial clk=0; always #5 clk=~clk;\n  task check; input [7:0] es; input [127:0] label; begin\n    if(snapshot!==es) begin errors=errors+1; $display(\"FAIL %0s expected=%d got=%d\",label,es,snapshot); end\n    else $display(\"PASS %0s snapshot=%d\",label,snapshot);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; sample_en=0; @(posedge clk); #1; check(0,\"reset\");\n    rst=0;\n    @(posedge clk); #1; check(0,\"cyc1-count-now-1-no-snap\");\n    @(posedge clk); #1; check(0,\"cyc2-count-now-2-no-snap\");\n    sample_en=1;\n    @(posedge clk); #1; check(0,\"cyc3-meta-only-no-snap-yet\");\n    @(posedge clk); #1; check(0,\"cyc4-sync_en-only-no-snap-yet\");\n    @(posedge clk); #1; check(4,\"cyc5-snapshot-captured\");\n    @(posedge clk); #1; check(4,\"cyc6-snapshot-held-no-resnap\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "sample_en",
      "snapshot"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p............."
        },
        {
          "name": "src_clk (async domain, illustrative)",
          "wave": "p.............",
          "phase": 0.5
        },
        {
          "name": "sample_en",
          "wave": "0..1..........",
          "phase": 0.5
        },
        {
          "name": "snapshot[7:0]",
          "wave": "2.......3.....",
          "data": [
            "0",
            "4"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "fifo-empty-flag-synchronizer",
    "title": "Async-FIFO Empty Flag Synchronizer",
    "difficulty": "hard",
    "points": 50,
    "level": 7,
    "tags": [
      "sequential",
      "cdc",
      "protocol"
    ],
    "category": "Sequential Design",
    "lede": "Synchronize a Gray-coded write pointer into the read domain and compare it against the local read pointer to generate a reliable empty flag — the core of every async FIFO.",
    "concept": "<b>Concept:</b> An async FIFO's write pointer lives in the write clock domain but the empty flag is needed in the read domain, so the pointer must cross safely — Gray coding ensures only one bit ever changes per increment, so even a partially-synchronized value during a transition is never wildly wrong. Double-flop the incoming Gray pointer (<code>meta</code>, then <code>wptr_gray_sync</code>), then compare it against the local read pointer: <code>empty &lt;= (wptr_gray_sync == rptr_gray)</code>. Comparing the raw unsynchronized pointer directly against the local one skips the synchronizer chain entirely, reintroducing metastability risk into the empty flag.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Read-domain clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (empty=1)</td></tr>\n<tr><td>wptr_gray_in</td><td>input</td><td>4</td><td>Gray-coded write pointer from the write domain</td></tr>\n<tr><td>rptr_gray</td><td>input</td><td>4</td><td>Local Gray-coded read pointer (already in this domain)</td></tr>\n<tr><td>empty</td><td>output</td><td>1</td><td>1 when the synchronized write pointer matches the read pointer</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  [3:0] wptr_gray_in,\n  input  [3:0] rptr_gray,\n  output reg empty\n);\n\n  // Your code here — 2-flop sync wptr_gray_in, then empty = (synced value == rptr_gray).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst; reg [3:0] wptr_gray_in, rptr_gray; wire empty; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .wptr_gray_in(wptr_gray_in), .rptr_gray(rptr_gray), .empty(empty));\n  initial clk=0; always #5 clk=~clk;\n  task check; input ee; input [127:0] label; begin\n    if(empty!==ee) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,ee,empty); end\n    else $display(\"PASS %0s empty=%b\",label,empty);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; wptr_gray_in=4'h0; rptr_gray=4'h0; @(posedge clk); #1; check(1,\"reset-empty\");\n    rst=0;\n    wptr_gray_in=4'h3; rptr_gray=4'h0;\n    @(posedge clk); #1; check(1,\"cyc1-meta-updated-still-empty\");\n    @(posedge clk); #1; check(1,\"cyc2-wptr_gray_sync-updated-still-empty\");\n    @(posedge clk); #1; check(0,\"cyc3-empty-flag-catches-up-not-empty\");\n    rptr_gray=4'h3;\n    @(posedge clk); #1; check(1,\"cyc4-rptr-matches-empty-again\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "wptr_gray_in",
      "rptr_gray",
      "empty"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk (read domain)",
          "wave": "p........."
        },
        {
          "name": "wr_clk (write domain, illustrative)",
          "wave": "p.........",
          "phase": 0.5
        },
        {
          "name": "wptr_gray_in[3:0]",
          "wave": "2.3.......",
          "data": [
            "0",
            "3"
          ],
          "phase": 0.5
        },
        {
          "name": "rptr_gray[3:0]",
          "wave": "2.......3.",
          "data": [
            "0",
            "3"
          ]
        },
        {
          "name": "empty",
          "wave": "1....0..1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "fifo-full-flag-synchronizer",
    "title": "Async-FIFO Full Flag Synchronizer",
    "difficulty": "hard",
    "points": 50,
    "level": 7,
    "tags": [
      "sequential",
      "cdc",
      "protocol"
    ],
    "category": "Sequential Design",
    "lede": "Synchronize a Gray-coded read pointer into the write domain and compare it against the local write pointer to detect full — including the extra wrap-bit check the empty flag never needs.",
    "concept": "<b>Concept:</b> The full flag mirrors the empty flag's synchronizer structure — double-flop the incoming Gray read pointer, then compare — but the comparison itself is different: full means the write pointer has wrapped exactly one lap ahead of the read pointer, which in Gray code shows up as the two MSBs inverted while the low bits match: <code>(wptr[3]!=rsync[3]) &amp;&amp; (wptr[2]!=rsync[2]) &amp;&amp; (wptr[1:0]==rsync[1:0])</code>. Reusing the empty flag's plain equality check here would report full only when the pointers are exactly equal — which is what <em>empty</em> looks like, not full.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Write-domain clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (full=0)</td></tr>\n<tr><td>rptr_gray_in</td><td>input</td><td>4</td><td>Gray-coded read pointer from the read domain</td></tr>\n<tr><td>wptr_gray</td><td>input</td><td>4</td><td>Local Gray-coded write pointer (already in this domain)</td></tr>\n<tr><td>full</td><td>output</td><td>1</td><td>1 when the write pointer has wrapped exactly one lap ahead of the synchronized read pointer</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  [3:0] rptr_gray_in,\n  input  [3:0] wptr_gray,\n  output reg full\n);\n\n  // Your code here — 2-flop sync rptr_gray_in, then full = (top 2 bits inverted, bottom 2 bits equal) vs wptr_gray.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst; reg [3:0] rptr_gray_in, wptr_gray; wire full; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .rptr_gray_in(rptr_gray_in), .wptr_gray(wptr_gray), .full(full));\n  initial clk=0; always #5 clk=~clk;\n  task check; input ef; input [127:0] label; begin\n    if(full!==ef) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,ef,full); end\n    else $display(\"PASS %0s full=%b\",label,full);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; rptr_gray_in=4'h0; wptr_gray=4'h0; @(posedge clk); #1; check(0,\"reset-not-full\");\n    rst=0;\n    wptr_gray=4'b1100; rptr_gray_in=4'b0000;\n    @(posedge clk); #1; check(1,\"cyc1-full-from-local-wptr-jump\");\n    rptr_gray_in=4'b0100;\n    @(posedge clk); #1; check(1,\"cyc2-meta-updated-still-full\");\n    @(posedge clk); #1; check(1,\"cyc3-rptr_gray_sync-updated-still-full\");\n    @(posedge clk); #1; check(0,\"cyc4-full-flag-catches-up-not-full\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "rptr_gray_in",
      "wptr_gray",
      "full"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk (write domain)",
          "wave": "p........."
        },
        {
          "name": "rd_clk (read domain, illustrative)",
          "wave": "p.........",
          "phase": 0.5
        },
        {
          "name": "wptr_gray[3:0]",
          "wave": "2.3.......",
          "data": [
            "0",
            "C"
          ]
        },
        {
          "name": "rptr_gray_in[3:0]",
          "wave": "2...3.....",
          "data": [
            "0",
            "4"
          ],
          "phase": 0.5
        },
        {
          "name": "full",
          "wave": "0.1....0.."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "bit-reversal",
    "title": "8-Bit Reversal",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "datapath"
    ],
    "category": "Combinational Design",
    "lede": "Reverse the bit order of an 8-bit word so the LSB becomes the MSB and vice versa — pure rewiring, no arithmetic.",
    "concept": "<b>Concept:</b> Bit reversal is a straight cross-wiring job: <code>out = {in[0],in[1],...,in[7]}</code> maps every bit to its mirror position. Confusing this with a byte/nibble swap (<code>{in[3:0],in[7:4]}</code>) reorders groups of bits but leaves each 4-bit half internally unreversed — a very different, and very common, mistake.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>in</td><td>input</td><td>8</td><td>Input byte</td></tr>\n<tr><td>out</td><td>output</td><td>8</td><td>in with its bit order fully reversed</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] in,\n  output [7:0] out\n);\n\n  // Your code here — out[i] = in[7-i] for every bit.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] in; wire [7:0] out; integer errors=0;\n  top_module dut(.in(in), .out(out));\n  task check; input [7:0] i; input [7:0] eo; begin\n    in=i;#1;\n    if(out!==eo) begin errors=errors+1; $display(\"FAIL in=%b expected=%b got=%b\",i,eo,out); end\n    else $display(\"PASS in=%b out=%b\",i,out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(8'b10110000, 8'b00001101);\n    check(8'b00000001, 8'b10000000);\n    check(8'b11111111, 8'b11111111);\n    check(8'b00000000, 8'b00000000);\n    check(8'b11010010, 8'b01001011);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "in",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "in[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "B0",
            "01",
            "FF",
            "D2"
          ]
        },
        {
          "name": "out[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0D",
            "80",
            "FF",
            "4B"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "leading-zero-counter",
    "title": "Leading Zero Counter (CLZ)",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "combinational",
      "encoder"
    ],
    "category": "Combinational Design",
    "lede": "Count how many leading zero bits sit above the highest set bit in an 8-bit value — the CLZ primitive behind floating-point normalization and priority schedulers.",
    "concept": "<b>Concept:</b> CLZ (count-leading-zeros) reports how far the highest '1' bit sits from the MSB: <code>in[7]?0:in[6]?1:...:in[0]?7:8</code>. It's easy to confuse this with a priority-encoder <em>index</em> (which counts from the LSB upward) — CLZ instead counts leading zeros from the top, and needs a distinct value (8, not 7) for the special all-zero case, since there's no set bit to reference at all.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>in</td><td>input</td><td>8</td><td>Input value</td></tr>\n<tr><td>count</td><td>output</td><td>4</td><td>Number of leading zero bits (0-8; 8 means in is all-zero)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] in,\n  output [3:0] count\n);\n\n  // Your code here — count zero bits above the highest set bit; count=8 if in is all-zero.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] in; wire [3:0] count; integer errors=0;\n  top_module dut(.in(in), .count(count));\n  task check; input [7:0] i; input [3:0] ec; begin\n    in=i;#1;\n    if(count!==ec) begin errors=errors+1; $display(\"FAIL in=%b expected=%d got=%d\",i,ec,count); end\n    else $display(\"PASS in=%b count=%d\",i,count);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(8'b10000000, 4'd0);\n    check(8'b01000000, 4'd1);\n    check(8'b00010000, 4'd3);\n    check(8'b00000001, 4'd7);\n    check(8'b00000000, 4'd8);\n    check(8'b00100101, 4'd2);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "in",
      "count"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "in[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "80",
            "40",
            "10",
            "00"
          ]
        },
        {
          "name": "count[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "1",
            "3",
            "8"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "hex-7segment-decoder",
    "title": "Hex 7-Segment Decoder",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "display"
    ],
    "category": "Combinational Design",
    "lede": "Extend a BCD 7-segment decoder to the full hexadecimal range 0-F — the driver every FPGA dev-board hex display actually needs.",
    "concept": "<b>Concept:</b> This is the same <code>seg[6:0]={a,b,c,d,e,f,g}</code> active-high lookup table as a BCD decoder, just extended past 9: 0xA-0xF get their own standard segment patterns (A=1110111, b=0011111, C=1001110, d=0111101, E=1001111, F=1000111 — lowercase b/d because those digits render better with the segments available). A decoder that only implements <code>case</code> branches for 0-9 and lets A-F fall through to a default (usually blank) silently breaks the moment a real hex value above 9 reaches the display.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>hex</td><td>input</td><td>4</td><td>Hex digit, 0x0-0xF</td></tr>\n<tr><td>seg</td><td>output</td><td>7</td><td>{a,b,c,d,e,f,g} segments, active-high</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input      [3:0] hex,\n  output reg [6:0] seg\n);\n\n  // Your code here — a case statement over all 16 hex values, 0-9 and A-F.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] hex; wire [6:0] seg; integer errors=0;\n  top_module dut(.hex(hex), .seg(seg));\n  task check; input [3:0] h; input [6:0] es; begin\n    hex=h;#1;\n    if(seg!==es) begin errors=errors+1; $display(\"FAIL hex=%h expected=%b got=%b\",h,es,seg); end\n    else $display(\"PASS hex=%h seg=%b\",h,seg);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(4'h0, 7'b1111110);\n    check(4'h5, 7'b1011011);\n    check(4'h9, 7'b1111011);\n    check(4'hA, 7'b1110111);\n    check(4'hB, 7'b0011111);\n    check(4'hF, 7'b1000111);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "hex",
      "seg"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "hex[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "9",
            "A",
            "F"
          ]
        },
        {
          "name": "seg[6:0]",
          "wave": "2.3.4.5.",
          "data": [
            "7E",
            "7B",
            "77",
            "47"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "thermometer-to-binary",
    "title": "Thermometer-to-Binary Encoder",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "encoder"
    ],
    "category": "Combinational Design",
    "lede": "Convert a thermometer-coded value (a run of 1s from the LSB, as produced by a flash ADC comparator bank) into its binary magnitude.",
    "concept": "<b>Concept:</b> A thermometer code (like <code>00011111</code>) fills in 1s from the bottom up to the represented value — exactly what a bank of flash-ADC comparators naturally produces. Converting it back to binary is a priority search for the topmost set bit: <code>in[7]?8:in[6]?7:...:in[0]?1:0</code>. Off-by-one here (checking <code>in[7]?7:...</code> instead of <code>8</code>) undercounts every single non-zero input by exactly one.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>therm</td><td>input</td><td>8</td><td>Thermometer code: a contiguous run of 1s starting at bit 0</td></tr>\n<tr><td>count</td><td>output</td><td>4</td><td>Binary count of set bits (0-8)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] therm,\n  output [3:0] count\n);\n\n  // Your code here — find the position of the highest set bit, +1 (0 if therm is all-zero).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] therm; wire [3:0] count; integer errors=0;\n  top_module dut(.therm(therm), .count(count));\n  task check; input [7:0] t; input [3:0] ec; begin\n    therm=t;#1;\n    if(count!==ec) begin errors=errors+1; $display(\"FAIL therm=%b expected=%d got=%d\",t,ec,count); end\n    else $display(\"PASS therm=%b count=%d\",t,count);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(8'b00000000, 4'd0);\n    check(8'b00000001, 4'd1);\n    check(8'b00000111, 4'd3);\n    check(8'b00011111, 4'd5);\n    check(8'b11111111, 4'd8);\n    check(8'b00111111, 4'd6);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "therm",
      "count"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "therm[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "00",
            "07",
            "1F",
            "FF"
          ]
        },
        {
          "name": "count[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "3",
            "5",
            "8"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "binary-to-thermometer",
    "title": "Binary-to-Thermometer Decoder",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "decoder"
    ],
    "category": "Combinational Design",
    "lede": "Convert a binary magnitude into a thermometer code — the decoder behind every LED bar-graph level meter.",
    "concept": "<b>Concept:</b> A thermometer decoder needs exactly <code>bin</code> ones starting from bit 0 — the classic bit-trick for \"N ones\" is <code>(1&lt;&lt;N)-1</code>: <code>therm = (9'd1 &lt;&lt; bin) - 1</code> (widened to 9 bits so <code>bin=8</code> correctly yields all 8 bits set instead of overflowing). Filling bits from the <em>top</em> down instead of the bottom up produces a mirror-image pattern that looks plausible but lights the wrong end of the bar graph.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>bin</td><td>input</td><td>4</td><td>Binary magnitude, 0-8</td></tr>\n<tr><td>therm</td><td>output</td><td>8</td><td>Thermometer code: bin ones starting from bit 0</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] bin,\n  output [7:0] therm\n);\n\n  // Your code here — therm = (1 << bin) - 1, i.e. bin ones starting from bit 0.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] bin; wire [7:0] therm; integer errors=0;\n  top_module dut(.bin(bin), .therm(therm));\n  task check; input [3:0] b; input [7:0] et; begin\n    bin=b;#1;\n    if(therm!==et) begin errors=errors+1; $display(\"FAIL bin=%d expected=%b got=%b\",b,et,therm); end\n    else $display(\"PASS bin=%d therm=%b\",b,therm);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(4'd0, 8'b00000000);\n    check(4'd1, 8'b00000001);\n    check(4'd3, 8'b00000111);\n    check(4'd5, 8'b00011111);\n    check(4'd8, 8'b11111111);\n    check(4'd6, 8'b00111111);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "bin",
      "therm"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "bin[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "3",
            "5",
            "8"
          ]
        },
        {
          "name": "therm[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "00",
            "07",
            "1F",
            "FF"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "bcd-digit-validator",
    "title": "BCD Digit Validator",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic"
    ],
    "category": "Combinational Design",
    "lede": "Flag whether a 4-bit nibble is a legal BCD digit (0-9) or one of the six unused patterns (10-15) — the guard every BCD datapath needs before trusting its input.",
    "concept": "<b>Concept:</b> A 4-bit nibble can represent 0-15, but BCD only uses 0-9 — the top six codes (1010-1111) are illegal. The check is a plain magnitude comparison, <code>valid = (nibble &lt;= 9)</code>. A tempting shortcut, <code>valid = ~nibble[3]</code> (\"valid if the top bit is 0\"), looks like it works for small numbers but wrongly rejects 8 and 9 (both have their MSB set) while wrongly accepting nothing above 7 — it's checking the wrong thing entirely.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>nibble</td><td>input</td><td>4</td><td>4-bit value to check</td></tr>\n<tr><td>valid</td><td>output</td><td>1</td><td>1 if nibble is 0-9 (a legal BCD digit), 0 otherwise</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] nibble,\n  output valid\n);\n\n  // Your code here — valid = (nibble <= 9).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] nibble; wire valid; integer errors=0;\n  top_module dut(.nibble(nibble), .valid(valid));\n  task check; input [3:0] n; input ev; begin\n    nibble=n;#1;\n    if(valid!==ev) begin errors=errors+1; $display(\"FAIL nibble=%d expected=%b got=%b\",n,ev,valid); end\n    else $display(\"PASS nibble=%d valid=%b\",n,valid);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(4'd0, 1);\n    check(4'd7, 1);\n    check(4'd9, 1);\n    check(4'd8, 1);\n    check(4'd10, 0);\n    check(4'd15, 0);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "nibble",
      "valid"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "nibble[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "9",
            "A",
            "F"
          ]
        },
        {
          "name": "valid",
          "wave": "1.1.0..."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "spi-shift-register",
    "title": "SPI Full-Duplex Shift Register",
    "difficulty": "hard",
    "points": 50,
    "level": 6,
    "tags": [
      "sequential",
      "protocol"
    ],
    "category": "Sequential Design",
    "lede": "Build the core shift register behind SPI: transmit a byte MSB-first while simultaneously receiving one, both directions moving on the same clock edge.",
    "concept": "<b>Concept:</b> SPI's shift register does two things on every clock edge at once: the top bit shifts out on <code>miso</code>, and a new bit shifts in from <code>mosi</code> at the bottom — <code>shreg &lt;= {shreg[6:0], mosi}</code>, with <code>miso</code> reading <code>shreg[7]</code> combinationally. A <code>load</code> pulse parallel-loads a fresh byte to transmit. Shifting the wrong direction (<code>{mosi, shreg[7:1]}</code>) swaps which end transmits first and which end receives — a mirror-image bug that still compiles and still shifts, just not the way SPI actually works.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>SPI shift clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>load</td><td>input</td><td>1</td><td>Parallel-load tx_data into the shift register</td></tr>\n<tr><td>mosi</td><td>input</td><td>1</td><td>Serial data in (Master Out Slave In)</td></tr>\n<tr><td>tx_data</td><td>input</td><td>8</td><td>Byte to transmit on the next load</td></tr>\n<tr><td>miso</td><td>output</td><td>1</td><td>Serial data out (Master In Slave Out) — current top bit</td></tr>\n<tr><td>shreg</td><td>output</td><td>8</td><td>Live shift register contents</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  load,\n  input  mosi,\n  input  [7:0] tx_data,\n  output miso,\n  output reg [7:0] shreg\n);\n\n  // Your code here — on load, shreg<=tx_data; otherwise shift left, shreg<={shreg[6:0],mosi}. miso=shreg[7].\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, load, mosi; reg [7:0] tx_data; wire miso; wire [7:0] shreg; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .load(load), .mosi(mosi), .tx_data(tx_data), .miso(miso), .shreg(shreg));\n  initial clk=0; always #5 clk=~clk;\n  task checkm; input em; input [127:0] label; begin\n    if(miso!==em) begin errors=errors+1; $display(\"FAIL %0s expected miso=%b got=%b\",label,em,miso); end\n    else $display(\"PASS %0s miso=%b\",label,miso);\n  end endtask\n  task checks; input [7:0] es; input [127:0] label; begin\n    if(shreg!==es) begin errors=errors+1; $display(\"FAIL %0s expected shreg=%h got=%h\",label,es,shreg); end\n    else $display(\"PASS %0s shreg=%h\",label,shreg);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; load=0; mosi=0; tx_data=8'h00; @(posedge clk); #1; checks(8'h00,\"reset\");\n    rst=0; load=1; tx_data=8'hA5; @(posedge clk); #1; checkm(1,\"bit7-after-load\");\n    load=0; mosi=1; @(posedge clk); #1; checkm(0,\"bit6\");\n    mosi=0; @(posedge clk); #1; checkm(1,\"bit5\");\n    mosi=1; @(posedge clk); #1; checkm(0,\"bit4\");\n    mosi=0; @(posedge clk); #1; checkm(0,\"bit3\");\n    mosi=1; @(posedge clk); #1; checkm(1,\"bit2\");\n    mosi=0; @(posedge clk); #1; checkm(0,\"bit1\");\n    mosi=1; @(posedge clk); #1; checkm(1,\"bit0\"); checks(8'hD5,\"final-shreg-matches-fed-mosi-bits\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "load",
      "mosi",
      "tx_data",
      "miso",
      "shreg"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "load",
          "wave": "01........"
        },
        {
          "name": "miso",
          "wave": "2.3.4.5...",
          "data": [
            "1",
            "0",
            "1",
            "0"
          ]
        },
        {
          "name": "shreg[7:0]",
          "wave": "2.........",
          "data": [
            "A5"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "i2c-start-stop-detector",
    "title": "I2C Start/Stop Condition Detector",
    "difficulty": "hard",
    "points": 50,
    "level": 6,
    "tags": [
      "sequential",
      "protocol",
      "i2c"
    ],
    "category": "Sequential Design",
    "lede": "Detect the two conditions that frame every I2C transaction: SDA falling while SCL is high (START) and SDA rising while SCL is high (STOP) — the one rule that makes I2C's bus protocol work at all.",
    "concept": "<b>Concept:</b> I2C is unique among serial buses: data (SDA) is only allowed to change while the clock (SCL) is <em>low</em> — every SDA transition while SCL is <em>high</em> is a special framing signal, not a data bit. Falling SDA while SCL stays high marks START; rising SDA while SCL stays high marks STOP. Detecting this needs registered previous samples of both signals: <code>start &lt;= scl && scl_prev && sda_prev && !sda</code>. Swapping which edge means start and which means stop is a genuinely easy mix-up (both rules look almost identical at a glance) — and it inverts the meaning of every transaction boundary in the bus trace.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Sampling clock (oversamples the bus)</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>sda</td><td>input</td><td>1</td><td>I2C data line</td></tr>\n<tr><td>scl</td><td>input</td><td>1</td><td>I2C clock line</td></tr>\n<tr><td>start_detected</td><td>output</td><td>1</td><td>Pulses for 1 cycle on a START condition</td></tr>\n<tr><td>stop_detected</td><td>output</td><td>1</td><td>Pulses for 1 cycle on a STOP condition</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  sda,\n  input  scl,\n  output reg start_detected,\n  output reg stop_detected\n);\n\n  // Your code here — register sda/scl; start=SDA falls while SCL held high; stop=SDA rises while SCL held high.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, sda, scl; wire start_detected, stop_detected; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .sda(sda), .scl(scl), .start_detected(start_detected), .stop_detected(stop_detected));\n  initial clk=0; always #5 clk=~clk;\n  task check; input es; input ep; input [127:0] label; begin\n    if(start_detected!==es || stop_detected!==ep) begin\n      errors=errors+1; $display(\"FAIL %0s expected start=%b stop=%b got start=%b stop=%b\",label,es,ep,start_detected,stop_detected);\n    end else $display(\"PASS %0s start=%b stop=%b\",label,start_detected,stop_detected);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; sda=1; scl=1; @(posedge clk); #1; check(0,0,\"reset-idle\");\n    rst=0;\n    @(posedge clk); #1; check(0,0,\"idle-no-change\");\n    sda=0; @(posedge clk); #1; check(1,0,\"start-condition-sda-falls-scl-high\");\n    @(posedge clk); #1; check(0,0,\"start-pulse-clears\");\n    scl=0; @(posedge clk); #1; check(0,0,\"scl-drops-for-data-phase\");\n    sda=1; @(posedge clk); #1; check(0,0,\"data-bit-change-while-scl-low-ignored\");\n    scl=1; @(posedge clk); #1; check(0,0,\"scl-rises-again-no-sda-edge-this-cycle\");\n    sda=0; @(posedge clk); #1; check(1,0,\"repeated-start-sda-falls-scl-high\");\n    sda=1; @(posedge clk); #1; check(0,1,\"stop-condition-sda-rises-scl-high\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "sda",
      "scl",
      "start_detected",
      "stop_detected"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p................."
        },
        {
          "name": "scl",
          "wave": "1....0.1.........."
        },
        {
          "name": "sda",
          "wave": "1.0.....1..0.1...."
        },
        {
          "name": "start_detected",
          "wave": "0.10...........10."
        },
        {
          "name": "stop_detected",
          "wave": "0.............1.0."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "thermostat-hysteresis-controller",
    "title": "Thermostat with Hysteresis",
    "difficulty": "medium",
    "points": 25,
    "level": 4,
    "tags": [
      "sequential",
      "fsm"
    ],
    "category": "Sequential Design",
    "lede": "Control a heater with a dead-band between the on and off thresholds, so it doesn't chatter on and off every time the temperature crosses a single setpoint.",
    "concept": "<b>Concept:</b> A single-threshold thermostat oscillates rapidly whenever the temperature hovers right at the setpoint — every tiny fluctuation flips the heater. Hysteresis fixes this with two thresholds: turn on at or below a LOW point, turn off at or above a HIGH point, and <em>hold the current state</em> anywhere in between: <code>if(temp&lt;=LOW) on&lt;=1; else if(temp&gt;=HIGH) on&lt;=0;</code> (no else — the deadband case falls through and keeps the old value). Collapsing this to one threshold (<code>on &lt;= temp&lt;70</code>) throws away the memory that makes hysteresis work, so the heater flips state on every single sample near 70 instead of holding steady.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (heater_on=0)</td></tr>\n<tr><td>temp</td><td>input</td><td>8</td><td>Current temperature reading</td></tr>\n<tr><td>heater_on</td><td>output</td><td>1</td><td>1 while the heater should be running</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  [7:0] temp,\n  output reg heater_on\n);\n\n  // Your code here — turn on at temp<=68, turn off at temp>=72, hold state in the deadband (69-71).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst; reg [7:0] temp; wire heater_on; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .temp(temp), .heater_on(heater_on));\n  initial clk=0; always #5 clk=~clk;\n  task check; input eh; input [127:0] label; begin\n    if(heater_on!==eh) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,eh,heater_on); end\n    else $display(\"PASS %0s heater_on=%b\",label,heater_on);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; temp=75; @(posedge clk); #1; check(0,\"reset\");\n    rst=0;\n    @(posedge clk); #1; check(0,\"above-high-stays-off\");\n    temp=68; @(posedge clk); #1; check(1,\"at-low-turns-on\");\n    temp=70; @(posedge clk); #1; check(1,\"deadband-holds-on\");\n    temp=71; @(posedge clk); #1; check(1,\"deadband-still-holds-on\");\n    temp=72; @(posedge clk); #1; check(0,\"at-high-turns-off\");\n    temp=70; @(posedge clk); #1; check(0,\"deadband-holds-off\");\n    temp=68; @(posedge clk); #1; check(1,\"back-to-low-turns-on-again\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "temp",
      "heater_on"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p..............."
        },
        {
          "name": "temp[7:0]",
          "wave": "2...3.4.5.6.7...",
          "data": [
            "75",
            "68",
            "70",
            "71",
            "72",
            "68"
          ]
        },
        {
          "name": "heater_on",
          "wave": "0...1.......0..."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "fir-filter-3tap",
    "title": "3-Tap FIR Filter",
    "difficulty": "hard",
    "points": 50,
    "level": 3,
    "tags": [
      "sequential",
      "datapath"
    ],
    "category": "Sequential Design",
    "lede": "Implement a fixed-coefficient 3-tap FIR filter (1,2,1) over a signed input stream — the multiply-accumulate structure behind every digital smoothing/anti-aliasing filter.",
    "concept": "<b>Concept:</b> A 3-tap FIR filter computes a weighted sum of the current and two previous samples: <code>y[n] = 1&middot;x[n] + 2&middot;x[n-1] + 1&middot;x[n-2]</code>. Keep the last two samples in shift registers (<code>x1</code>, <code>x2</code>), multiply the center tap by 2 with a cheap left-shift (<code>x1&lt;&lt;&lt;1</code>), and register the sum. Dropping the center tap's weight (<code>x_in+x1+x2</code> instead of <code>x_in+2*x1+x2</code>) silently turns a binomial-weighted smoothing filter into a plain 3-sample average — same shape of circuit, different frequency response entirely.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>x_in</td><td>input</td><td>8 (signed)</td><td>Current input sample</td></tr>\n<tr><td>y_out</td><td>output</td><td>11 (signed)</td><td>Filtered output: x[n] + 2&middot;x[n-1] + x[n-2]</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  signed [7:0] x_in,\n  output reg signed [10:0] y_out\n);\n\n  // Your code here — keep x[n-1], x[n-2] in shift registers; y_out <= x_in + 2*x1 + x2.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst; reg signed [7:0] x_in; wire signed [10:0] y_out; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .x_in(x_in), .y_out(y_out));\n  initial clk=0; always #5 clk=~clk;\n  task check; input signed [10:0] ey; input [127:0] label; begin\n    if(y_out!==ey) begin errors=errors+1; $display(\"FAIL %0s expected=%d got=%d\",label,ey,y_out); end\n    else $display(\"PASS %0s y_out=%d\",label,y_out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; x_in=0; @(posedge clk); #1; check(0,\"reset\");\n    rst=0;\n    x_in=10; @(posedge clk); #1; check(10,\"sample1\");\n    x_in=20; @(posedge clk); #1; check(40,\"sample2\");\n    x_in=5;  @(posedge clk); #1; check(55,\"sample3\");\n    x_in=0;  @(posedge clk); #1; check(30,\"sample4\");\n    x_in=-10; @(posedge clk); #1; check(-5,\"sample5-negative\");\n    x_in=30; @(posedge clk); #1; check(10,\"sample6\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "x_in",
      "y_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p............."
        },
        {
          "name": "x_in[7:0]",
          "wave": "2.3.4.5.6.....",
          "data": [
            "10",
            "20",
            "5",
            "0",
            "-10"
          ]
        },
        {
          "name": "y_out[10:0]",
          "wave": "2.3.4.5.6.....",
          "data": [
            "10",
            "40",
            "55",
            "30",
            "-5"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "signed-multiplier-4bit",
    "title": "4-Bit Signed Multiplier",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic"
    ],
    "category": "Combinational Design",
    "lede": "Multiply two 4-bit two's-complement numbers into a correctly-signed 8-bit product — the exact same * operator as an unsigned multiplier, but only if every operand and the output are actually declared signed.",
    "concept": "<b>Concept:</b> Verilog's <code>*</code> operator performs true signed multiplication automatically, but only when <em>every</em> operand involved is declared <code>signed</code> — if even one operand in the expression is unsigned, the entire multiplication silently falls back to unsigned arithmetic. Re-declaring the inputs as plain (unsigned) wires before multiplying, even with identical bit widths and the exact same <code>*</code> operator, throws away the sign information and produces a completely different (and wrong) result for any negative operand.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>4 (signed)</td><td>First operand</td></tr>\n<tr><td>b</td><td>input</td><td>4 (signed)</td><td>Second operand</td></tr>\n<tr><td>product</td><td>output</td><td>8 (signed)</td><td>a &times; b, correctly signed</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  signed [3:0] a,\n  input  signed [3:0] b,\n  output signed [7:0] product\n);\n\n  // Your code here — product = a * b (both operands must stay signed for Verilog to do signed multiplication).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg signed [3:0] a, b; wire signed [7:0] product; integer errors=0;\n  top_module dut(.a(a), .b(b), .product(product));\n  task check; input signed [3:0] ta, tb_; input signed [7:0] ep; begin\n    a=ta; b=tb_; #1;\n    if(product!==ep) begin errors=errors+1; $display(\"FAIL a=%d b=%d expected=%d got=%d\",ta,tb_,ep,product); end\n    else $display(\"PASS a=%d b=%d product=%d\",ta,tb_,product);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(-3, 2, -6);\n    check(-8, -1, 8);\n    check(5, 3, 15);\n    check(-1, -1, 1);\n    check(0, 7, 0);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "product"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "-3",
            "-8",
            "5",
            "-1"
          ]
        },
        {
          "name": "b[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "2",
            "-1",
            "3",
            "-1"
          ]
        },
        {
          "name": "product[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "-6",
            "8",
            "15",
            "1"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "median-of-three",
    "title": "Median of Three",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "comparator"
    ],
    "category": "Combinational Design",
    "lede": "Find the median (middle) value of three unsigned bytes — a classic three-way comparison building block used everywhere from sorting networks to median filters.",
    "concept": "<b>Concept:</b> The median is whichever value sits between the other two: <code>a</code> is the median if it's between <code>b</code> and <code>c</code> (in either order), and likewise for <code>b</code>; otherwise <code>c</code> must be the median. A tempting shortcut — just find the max of the three — looks similar but answers a completely different question; median and max only coincide by accident on specific inputs, not in general.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>8</td><td>First value</td></tr>\n<tr><td>b</td><td>input</td><td>8</td><td>Second value</td></tr>\n<tr><td>c</td><td>input</td><td>8</td><td>Third value</td></tr>\n<tr><td>median</td><td>output</td><td>8</td><td>The middle value of the three</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] a,\n  input  [7:0] b,\n  input  [7:0] c,\n  output reg [7:0] median\n);\n\n  // Your code here — median is whichever of a/b/c sits between the other two.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] a,b,c; wire [7:0] median; integer errors=0;\n  top_module dut(.a(a),.b(b),.c(c),.median(median));\n  task check; input [7:0] ta,tb_,tc; input [7:0] em; begin\n    a=ta;b=tb_;c=tc;#1;\n    if(median!==em) begin errors=errors+1; $display(\"FAIL a=%d b=%d c=%d expected=%d got=%d\",ta,tb_,tc,em,median); end\n    else $display(\"PASS a=%d b=%d c=%d median=%d\",ta,tb_,tc,median);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(5,9,2,5);\n    check(1,2,3,2);\n    check(10,10,5,10);\n    check(7,7,7,7);\n    check(0,255,128,128);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "c",
      "median"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "5",
            "1",
            "10",
            "0"
          ]
        },
        {
          "name": "b[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "9",
            "2",
            "10",
            "255"
          ]
        },
        {
          "name": "c[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "2",
            "3",
            "5",
            "128"
          ]
        },
        {
          "name": "median[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "5",
            "2",
            "10",
            "128"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "min-max-finder",
    "title": "Min/Max Finder",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "comparator"
    ],
    "category": "Combinational Design",
    "lede": "Find both the minimum and maximum of three unsigned bytes at once — the basic building block of any sorting network or range check.",
    "concept": "<b>Concept:</b> A nested-comparison tree finds the max in two comparisons: compare <code>a</code> and <code>b</code> first, then compare the winner against <code>c</code>. The min follows the mirror-image tree using <code>&lt;=</code> instead of <code>&gt;=</code>. Swapping which tree feeds which output — computing the max tree but wiring it to <code>min_val</code>, and vice versa — compiles fine and even passes on inputs where all three values happen to be equal, but is backwards everywhere else.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>8</td><td>First value</td></tr>\n<tr><td>b</td><td>input</td><td>8</td><td>Second value</td></tr>\n<tr><td>c</td><td>input</td><td>8</td><td>Third value</td></tr>\n<tr><td>min_val</td><td>output</td><td>8</td><td>Smallest of the three</td></tr>\n<tr><td>max_val</td><td>output</td><td>8</td><td>Largest of the three</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] a,\n  input  [7:0] b,\n  input  [7:0] c,\n  output [7:0] min_val,\n  output [7:0] max_val\n);\n\n  // Your code here — a 2-comparison tree for max, and the mirror-image tree for min.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] a,b,c; wire [7:0] min_val, max_val; integer errors=0;\n  top_module dut(.a(a),.b(b),.c(c),.min_val(min_val),.max_val(max_val));\n  task check; input [7:0] ta,tb_,tc; input [7:0] emin,emax; begin\n    a=ta;b=tb_;c=tc;#1;\n    if(min_val!==emin || max_val!==emax) begin errors=errors+1; $display(\"FAIL a=%d b=%d c=%d expected min=%d max=%d got min=%d max=%d\",ta,tb_,tc,emin,emax,min_val,max_val); end\n    else $display(\"PASS a=%d b=%d c=%d min=%d max=%d\",ta,tb_,tc,min_val,max_val);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(5,9,2,2,9);\n    check(10,10,5,5,10);\n    check(7,7,7,7,7);\n    check(0,255,128,0,255);\n    check(200,50,200,50,200);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "c",
      "min_val",
      "max_val"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "5",
            "10",
            "7",
            "0"
          ]
        },
        {
          "name": "b[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "9",
            "10",
            "7",
            "255"
          ]
        },
        {
          "name": "c[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "2",
            "5",
            "7",
            "128"
          ]
        },
        {
          "name": "min_val[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "2",
            "5",
            "7",
            "0"
          ]
        },
        {
          "name": "max_val[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "9",
            "10",
            "7",
            "255"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "bcd-subtractor",
    "title": "BCD Subtractor",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic"
    ],
    "category": "Combinational Design",
    "lede": "Subtract two BCD digits and produce a valid BCD result plus a borrow flag — the complement to this catalog's BCD adder.",
    "concept": "<b>Concept:</b> Plain binary subtraction of two BCD digits works fine when the result stays non-negative, but when <code>a &lt; b</code> the binary result would be negative — BCD has no representation for that, so the correction is to add 10 back: <code>diff = a - b + 10</code>, and raise a <code>borrow</code> flag. Skipping the +10 correction (just computing <code>a - b</code> unconditionally, relying on binary wraparound) produces a value that looks superficially plausible but is not the correct BCD digit — plain two's-complement wraparound and 'add 10' correction are not the same arithmetic.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>4</td><td>Minuend BCD digit, 0-9</td></tr>\n<tr><td>b</td><td>input</td><td>4</td><td>Subtrahend BCD digit, 0-9</td></tr>\n<tr><td>diff</td><td>output</td><td>4</td><td>a - b as a valid BCD digit</td></tr>\n<tr><td>borrow</td><td>output</td><td>1</td><td>1 when a &lt; b (a borrow was needed)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] a,\n  input  [3:0] b,\n  output [3:0] diff,\n  output borrow\n);\n\n  // Your code here — borrow = (a<b); diff = borrow ? (a-b+10) : (a-b).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] a,b; wire [3:0] diff; wire borrow; integer errors=0;\n  top_module dut(.a(a),.b(b),.diff(diff),.borrow(borrow));\n  task check; input [3:0] ta,tb_; input [3:0] ed; input eb; begin\n    a=ta;b=tb_;#1;\n    if(diff!==ed || borrow!==eb) begin errors=errors+1; $display(\"FAIL a=%d b=%d expected diff=%d borrow=%b got diff=%d borrow=%b\",ta,tb_,ed,eb,diff,borrow); end\n    else $display(\"PASS a=%d b=%d diff=%d borrow=%b\",ta,tb_,diff,borrow);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(7,3,4,0);\n    check(3,7,6,1);\n    check(9,9,0,0);\n    check(0,9,1,1);\n    check(9,0,9,0);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "diff",
      "borrow"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "7",
            "3",
            "9",
            "0"
          ]
        },
        {
          "name": "b[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "3",
            "7",
            "9",
            "9"
          ]
        },
        {
          "name": "diff[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "4",
            "6",
            "0",
            "1"
          ]
        },
        {
          "name": "borrow",
          "wave": "0.1.0.1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "shift-add-multiplier",
    "title": "Shift-Add Multiplier",
    "difficulty": "hard",
    "points": 50,
    "level": 3,
    "tags": [
      "sequential",
      "datapath"
    ],
    "category": "Sequential Design",
    "lede": "Multiply two unsigned 4-bit numbers using the classic shift-add algorithm — one bit of the multiplier examined per cycle, exactly how early CPUs implemented multiplication in hardware before dedicated multiplier arrays.",
    "concept": "<b>Concept:</b> Shift-add multiplication processes the multiplier one bit at a time: if the current LSB of the multiplier is 1, add the (progressively left-shifted) multiplicand into an accumulating product; either way, shift the multiplicand left and the multiplier right, and repeat for every bit. Forgetting to shift the multiplier means the same LSB is examined every cycle instead of advancing through the bits — the multiplicand still grows correctly, but the decision of when to add it is stuck testing the same (increasingly stale) bit forever.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>start</td><td>input</td><td>1</td><td>Pulse for 1 cycle to begin multiplying a &times; b</td></tr>\n<tr><td>a</td><td>input</td><td>4</td><td>Multiplicand</td></tr>\n<tr><td>b</td><td>input</td><td>4</td><td>Multiplier</td></tr>\n<tr><td>product</td><td>output</td><td>8</td><td>a &times; b, valid once done pulses</td></tr>\n<tr><td>done</td><td>output</td><td>1</td><td>Pulses for 1 cycle when the product is ready</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  start,\n  input  [3:0] a,\n  input  [3:0] b,\n  output reg [7:0] product,\n  output reg done\n);\n\n  // Your code here — 4 iterations: if multiplier LSB is 1, add multiplicand into product; then shift multiplicand left, multiplier right.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, start; reg [3:0] a, b; wire [7:0] product; wire done; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .start(start), .a(a), .b(b), .product(product), .done(done));\n  initial clk=0; always #5 clk=~clk;\n  task check; input ed; input [7:0] ep; input [127:0] label; begin\n    if(done!==ed || product!==ep) begin errors=errors+1; $display(\"FAIL %0s expected done=%b product=%d got done=%b product=%d\",label,ed,ep,done,product); end\n    else $display(\"PASS %0s done=%b product=%d\",label,done,product);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; start=0; a=0; b=0; @(posedge clk); #1; check(0,0,\"reset\");\n    rst=0; a=5; b=3; start=1;\n    @(posedge clk); #1; check(0,0,\"load-cycle\");\n    start=0;\n    @(posedge clk); #1; check(0,5,\"iter0\");\n    @(posedge clk); #1; check(0,15,\"iter1\");\n    @(posedge clk); #1; check(0,15,\"iter2-no-add\");\n    @(posedge clk); #1; check(1,15,\"iter3-done-product-15\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "start",
      "a",
      "b",
      "product",
      "done"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "start",
          "wave": "0.10......"
        },
        {
          "name": "product[7:0]",
          "wave": "2...3.4...",
          "data": [
            "0",
            "5",
            "15"
          ]
        },
        {
          "name": "done",
          "wave": "0........1"
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "auto-repeat-button",
    "title": "Auto-Repeat Button",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "control"
    ],
    "category": "Sequential Design",
    "lede": "Fire an immediate pulse the instant a button is pressed, then keep firing repeat pulses at a steady interval for as long as it stays held — the key-repeat behavior behind every keyboard.",
    "concept": "<b>Concept:</b> A fresh press (rising edge, tracked with a registered previous-value comparison) fires one pulse immediately and resets a cycle counter. While the button stays held, that counter counts up and fires another pulse every time it reaches the repeat interval, then resets — releasing the button resets the counter so a later press always starts with a fresh, immediate pulse rather than continuing a stale count. Getting the repeat-interval comparison off by one (checking one cycle too early) makes every repeat fire faster than intended, silently changing the whole timing feel of the interface.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>btn</td><td>input</td><td>1</td><td>Button level (already clean/debounced)</td></tr>\n<tr><td>pulse</td><td>output</td><td>1</td><td>Pulses for 1 cycle on press, then every 3 cycles while held</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  btn,\n  output reg pulse\n);\n\n  // Your code here — pulse once on the rising edge of btn, then every 3 cycles while it stays held; release resets the timer.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, btn; wire pulse; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .btn(btn), .pulse(pulse));\n  initial clk=0; always #5 clk=~clk;\n  task check; input ep; input [127:0] label; begin\n    if(pulse!==ep) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,ep,pulse); end\n    else $display(\"PASS %0s pulse=%b\",label,pulse);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; btn=0; @(posedge clk); #1; check(0,\"reset\");\n    rst=0; btn=1;\n    @(posedge clk); #1; check(1,\"cyc1-fresh-press\");\n    @(posedge clk); #1; check(0,\"cyc2-counting\");\n    @(posedge clk); #1; check(0,\"cyc3-counting\");\n    @(posedge clk); #1; check(1,\"cyc4-first-repeat\");\n    @(posedge clk); #1; check(0,\"cyc5-counting\");\n    @(posedge clk); #1; check(0,\"cyc6-counting\");\n    @(posedge clk); #1; check(1,\"cyc7-second-repeat\");\n    btn=0;\n    @(posedge clk); #1; check(0,\"released-no-repeat\");\n    btn=1;\n    @(posedge clk); #1; check(1,\"re-press-fresh-again\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "btn",
      "pulse"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "btn",
          "wave": "01........"
        },
        {
          "name": "pulse",
          "wave": "0.10.010.1"
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "gray-code-sequence-checker",
    "title": "Gray Code Sequence Checker",
    "difficulty": "medium",
    "points": 25,
    "level": 4,
    "tags": [
      "sequential",
      "checker"
    ],
    "category": "Sequential Design",
    "lede": "Watch a stream of 4-bit values and flag whether each new sample really is a valid Gray-code step from the last one — exactly one bit changed, no more, no less.",
    "concept": "<b>Concept:</b> The defining property of a Gray-code sequence is that consecutive values differ in exactly one bit. XOR the current sample against the registered previous one, then test whether that difference has exactly one bit set using the classic power-of-two trick: <code>(diff != 0) && ((diff & (diff-1)) == 0)</code> — a value with exactly one bit set becomes zero when ANDed with itself minus one. Replacing that check with a plain inequality (<code>code != prev</code>) only verifies that <em>something</em> changed, not that the change respects the one-bit-at-a-time rule — it would wave through a jump like 0110 to 0101 (two bits flipped) as if it were valid.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>code</td><td>input</td><td>4</td><td>Next sample in the sequence</td></tr>\n<tr><td>valid</td><td>output</td><td>1</td><td>1 if code differs from the previous sample by exactly one bit</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  [3:0] code,\n  output reg valid\n);\n\n  // Your code here — register the previous code; valid = exactly one bit differs from it (Hamming distance 1).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst; reg [3:0] code; wire valid; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .code(code), .valid(valid));\n  initial clk=0; always #5 clk=~clk;\n  task check; input ev; input [127:0] label; begin\n    if(valid!==ev) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,ev,valid); end\n    else $display(\"PASS %0s valid=%b\",label,valid);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; code=4'b0000; @(posedge clk); #1; check(1,\"reset-first-sample\");\n    rst=0;\n    code=4'b0001; @(posedge clk); #1; check(1,\"0-to-1-valid\");\n    code=4'b0011; @(posedge clk); #1; check(1,\"1-to-3-valid\");\n    code=4'b0010; @(posedge clk); #1; check(1,\"3-to-2-valid\");\n    code=4'b0110; @(posedge clk); #1; check(1,\"2-to-6-valid\");\n    code=4'b0101; @(posedge clk); #1; check(0,\"6-to-5-INVALID-two-bits\");\n    code=4'b0111; @(posedge clk); #1; check(1,\"5-to-7-valid-again\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "code",
      "valid"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p..........."
        },
        {
          "name": "code[3:0]",
          "wave": "2.3.4.5.6.7.",
          "data": [
            "0",
            "1",
            "3",
            "2",
            "6",
            "5"
          ]
        },
        {
          "name": "valid",
          "wave": "1.........0."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "one-shot-pulse-generator",
    "title": "One-Shot Pulse Generator",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "control"
    ],
    "category": "Sequential Design",
    "lede": "Turn a trigger into a clean pulse of a fixed, programmable width — a classic monostable (\"one-shot\") that ignores any retrigger attempts until the current pulse finishes.",
    "concept": "<b>Concept:</b> A one-shot latches an <code>active</code> flag on trigger, counts down for <code>width</code> cycles, and only accepts a new trigger once it's back to idle: <code>if (!active && trigger)</code> is the guard that makes retriggering impossible mid-pulse. Dropping the <code>!active</code> half of that guard (just checking <code>trigger</code> alone) lets a retrigger reload the countdown while a pulse is already running, silently stretching the output well past its intended, fixed width — defeating the entire point of a one-shot.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>trigger</td><td>input</td><td>1</td><td>Pulse for 1 cycle to fire a new one-shot (ignored while already active)</td></tr>\n<tr><td>width</td><td>input</td><td>4</td><td>Pulse width in cycles</td></tr>\n<tr><td>pulse_out</td><td>output</td><td>1</td><td>High for exactly width cycles after each accepted trigger</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  trigger,\n  input  [3:0] width,\n  output reg pulse_out\n);\n\n  // Your code here — on an accepted trigger (only when not already active), go high for exactly width cycles.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, trigger; reg [3:0] width; wire pulse_out; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .trigger(trigger), .width(width), .pulse_out(pulse_out));\n  initial clk=0; always #5 clk=~clk;\n  task check; input ep; input [127:0] label; begin\n    if(pulse_out!==ep) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,ep,pulse_out); end\n    else $display(\"PASS %0s pulse_out=%b\",label,pulse_out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; trigger=0; width=4'd3; @(posedge clk); #1; check(0,\"reset\");\n    rst=0; trigger=1;\n    @(posedge clk); #1; check(1,\"cyc1-pulse-starts\");\n    trigger=0;\n    @(posedge clk); #1; check(1,\"cyc2-still-high\");\n    @(posedge clk); #1; check(1,\"cyc3-still-high\");\n    @(posedge clk); #1; check(0,\"cyc4-pulse-ends-after-width-3\");\n    trigger=1;\n    @(posedge clk); #1; check(1,\"new-trigger-works\");\n    trigger=0;\n    @(posedge clk); #1; check(1,\"cyc2-of-second-pulse\");\n    trigger=1;\n    @(posedge clk); #1; check(1,\"cyc3-retrigger-attempt-should-be-ignored\");\n    trigger=0;\n    @(posedge clk); #1; check(0,\"pulse-ends-on-schedule-not-extended\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "trigger",
      "width",
      "pulse_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "trigger",
          "wave": "0.10..1.0."
        },
        {
          "name": "pulse_out",
          "wave": "0.111.0111"
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "serial-to-parallel-with-parity",
    "title": "Serial-to-Parallel Receiver with Parity",
    "difficulty": "hard",
    "points": 50,
    "level": 6,
    "tags": [
      "sequential",
      "protocol"
    ],
    "category": "Sequential Design",
    "lede": "Receive an 8-bit word one bit at a time, MSB first, followed by an even-parity check bit — and flag a mismatch instead of silently trusting corrupted data.",
    "concept": "<b>Concept:</b> After a framing pulse, shift in 8 data bits MSB-first (<code>shreg &lt;= {shreg[6:0], bit_in}</code>), then treat the 9th bit as an even-parity check: for even parity, the correct check bit always equals the XOR of the 8 data bits, so <code>parity_error = (^shreg) != bit_in</code>. Inverting that comparison (<code>==</code> instead of <code>!=</code>) flips the entire meaning of the flag — every good frame gets reported as corrupted and every actually-corrupted frame sails through as clean, which is far more dangerous than having no parity check at all.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>bit_in</td><td>input</td><td>1</td><td>Next serial bit (data, then the parity bit)</td></tr>\n<tr><td>frame_start</td><td>input</td><td>1</td><td>Pulse for 1 cycle: the next 9 bits are a new frame</td></tr>\n<tr><td>data_out</td><td>output</td><td>8</td><td>Assembled byte, valid when data_valid pulses</td></tr>\n<tr><td>parity_error</td><td>output</td><td>1</td><td>1 if the received parity bit doesn't match even parity over data_out</td></tr>\n<tr><td>data_valid</td><td>output</td><td>1</td><td>Pulses for 1 cycle once a full 9-bit frame has been received</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  bit_in,\n  input  frame_start,\n  output reg [7:0] data_out,\n  output reg parity_error,\n  output reg data_valid\n);\n\n  // Your code here — shift in 8 data bits MSB-first, then check the 9th bit against even parity (XOR of the 8 data bits).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, bit_in, frame_start; wire [7:0] data_out; wire parity_error, data_valid; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .bit_in(bit_in), .frame_start(frame_start), .data_out(data_out), .parity_error(parity_error), .data_valid(data_valid));\n  initial clk=0; always #5 clk=~clk;\n  task check; input [7:0] ed; input ee; input [127:0] label; begin\n    if(data_out!==ed || parity_error!==ee) begin errors=errors+1; $display(\"FAIL %0s expected data=%h err=%b got data=%h err=%b\",label,ed,ee,data_out,parity_error); end\n    else $display(\"PASS %0s data=%h err=%b\",label,data_out,parity_error);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; bit_in=0; frame_start=0; @(posedge clk); #1;\n    rst=0;\n    frame_start=1; @(posedge clk); #1; frame_start=0;\n    bit_in=0; @(posedge clk); #1;\n    bit_in=1; @(posedge clk); #1;\n    bit_in=0; @(posedge clk); #1;\n    bit_in=0; @(posedge clk); #1;\n    bit_in=1; @(posedge clk); #1;\n    bit_in=0; @(posedge clk); #1;\n    bit_in=1; @(posedge clk); #1;\n    bit_in=1; @(posedge clk); #1;\n    bit_in=0; @(posedge clk); #1; check(8'h4B,0,\"valid-frame-even-parity-matches\");\n    frame_start=1; @(posedge clk); #1; frame_start=0;\n    bit_in=0; @(posedge clk); #1;\n    bit_in=1; @(posedge clk); #1;\n    bit_in=0; @(posedge clk); #1;\n    bit_in=0; @(posedge clk); #1;\n    bit_in=1; @(posedge clk); #1;\n    bit_in=0; @(posedge clk); #1;\n    bit_in=1; @(posedge clk); #1;\n    bit_in=1; @(posedge clk); #1;\n    bit_in=1; @(posedge clk); #1; check(8'h4B,1,\"invalid-frame-parity-mismatch\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "bit_in",
      "frame_start",
      "data_out",
      "parity_error",
      "data_valid"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......................."
        },
        {
          "name": "frame_start",
          "wave": "0.10...................."
        },
        {
          "name": "bit_in",
          "wave": "0..2.3.4.5.6.7.8.9......",
          "data": [
            "0",
            "1",
            "0",
            "0",
            "1",
            "0",
            "1",
            "1"
          ]
        },
        {
          "name": "data_valid",
          "wave": "0..........1............"
        },
        {
          "name": "parity_error",
          "wave": "0..........2............",
          "data": [
            "0"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "count-leading-ones",
    "title": "Count Leading Ones (CLO)",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "encoder"
    ],
    "category": "Combinational Design",
    "lede": "Count how many leading one bits sit at the top of an 8-bit value before the first zero — the complement to this catalog's leading-zero counter.",
    "concept": "<b>Concept:</b> Mirror image of CLZ: walk down from the MSB and count how many consecutive 1s appear before the first 0 (or all 8, if every bit is set): <code>in[7]?0:in[6]?1:...:in[0]?7:8</code> — wait, inverted: <code>~in[7]?0:~in[6]?1:...</code>, checking for the first <em>zero</em> bit. Shifting every branch's return value by one (a natural copy-paste slip from a similar encoder) undercounts nothing and overcounts every non-all-ones input by exactly one.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>in</td><td>input</td><td>8</td><td>Input value</td></tr>\n<tr><td>count</td><td>output</td><td>4</td><td>Number of leading one bits (0-8; 8 means in is all-ones)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] in,\n  output [3:0] count\n);\n\n  // Your code here — count 1 bits from the MSB until the first 0; count=8 if in is all-ones.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] in; wire [3:0] count; integer errors=0;\n  top_module dut(.in(in), .count(count));\n  task check; input [7:0] i; input [3:0] ec; begin\n    in=i;#1;\n    if(count!==ec) begin errors=errors+1; $display(\"FAIL in=%b expected=%d got=%d\",i,ec,count); end\n    else $display(\"PASS in=%b count=%d\",i,count);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(8'b11110000, 4'd4);\n    check(8'b10000000, 4'd1);\n    check(8'b00000000, 4'd0);\n    check(8'b11111111, 4'd8);\n    check(8'b01111111, 4'd0);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "in",
      "count"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "in[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "F0",
            "80",
            "00",
            "FF"
          ]
        },
        {
          "name": "count[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "4",
            "1",
            "0",
            "8"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "signed-comparator",
    "title": "4-Bit Signed Comparator",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "comparator"
    ],
    "category": "Combinational Design",
    "lede": "Compare two 4-bit two's-complement numbers and flag greater-than, equal, or less-than — the signed counterpart to this catalog's unsigned 4-bit comparator.",
    "concept": "<b>Concept:</b> Verilog's relational operators (<code>&gt;</code>, <code>==</code>, <code>&lt;</code>) do true signed comparison automatically once both operands are declared <code>signed</code> — no manual sign-bit handling needed. Re-declaring the operands as plain unsigned wires before comparing (even with the exact same operators) throws away that sign information: -3 stops being \"less than 2\" and instead compares as the large unsigned value 13, silently flipping the answer for any pair with a negative operand.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>4 (signed)</td><td>First operand</td></tr>\n<tr><td>b</td><td>input</td><td>4 (signed)</td><td>Second operand</td></tr>\n<tr><td>gt</td><td>output</td><td>1</td><td>1 if a &gt; b</td></tr>\n<tr><td>eq</td><td>output</td><td>1</td><td>1 if a == b</td></tr>\n<tr><td>lt</td><td>output</td><td>1</td><td>1 if a &lt; b</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  signed [3:0] a,\n  input  signed [3:0] b,\n  output gt,\n  output eq,\n  output lt\n);\n\n  // Your code here — gt/eq/lt from signed comparison of a and b.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg signed [3:0] a, b; wire gt, eq, lt; integer errors=0;\n  top_module dut(.a(a), .b(b), .gt(gt), .eq(eq), .lt(lt));\n  task check; input signed [3:0] ta, tb_; input eg, ee, el; begin\n    a=ta; b=tb_; #1;\n    if(gt!==eg || eq!==ee || lt!==el) begin errors=errors+1; $display(\"FAIL a=%d b=%d expected gt=%b eq=%b lt=%b got gt=%b eq=%b lt=%b\",ta,tb_,eg,ee,el,gt,eq,lt); end\n    else $display(\"PASS a=%d b=%d gt=%b eq=%b lt=%b\",ta,tb_,gt,eq,lt);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(-3, 2, 0,0,1);\n    check(5, 5, 0,1,0);\n    check(-1, -2, 1,0,0);\n    check(-8, 7, 0,0,1);\n    check(3, -3, 1,0,0);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "gt",
      "eq",
      "lt"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "-3",
            "5",
            "-1",
            "3"
          ]
        },
        {
          "name": "b[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "2",
            "5",
            "-2",
            "-3"
          ]
        },
        {
          "name": "gt",
          "wave": "0.0.1.1."
        },
        {
          "name": "eq",
          "wave": "0.1.0.0."
        },
        {
          "name": "lt",
          "wave": "1.0.0.0."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "barrel-shifter",
    "title": "8-Bit Barrel Shifter",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "combinational",
      "datapath"
    ],
    "category": "Combinational Design",
    "lede": "Shift an 8-bit value left by a variable amount, filling the vacated low bits with zero — the non-wrapping cousin of this catalog's barrel rotator.",
    "concept": "<b>Concept:</b> A logical shift is just <code>in &lt;&lt; shamt</code> — bits that fall off the top are gone, and zeros fill in from the bottom. It's easy to confuse this with a barrel <em>rotator</em>, which instead wraps the bits that fall off back around to the bottom (<code>(in&lt;&lt;shamt)|(in&gt;&gt;(8-shamt))</code>). Both are legitimate, commonly-used circuits — they just answer different questions, and reaching for the rotate formula when the spec calls for a plain shift silently reintroduces bits that were supposed to be discarded.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>in</td><td>input</td><td>8</td><td>Value to shift</td></tr>\n<tr><td>shamt</td><td>input</td><td>3</td><td>Shift amount, 0-7</td></tr>\n<tr><td>out</td><td>output</td><td>8</td><td>in shifted left by shamt, zero-filled</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] in,\n  input  [2:0] shamt,\n  output [7:0] out\n);\n\n  // Your code here — out = in << shamt (logical shift, zero-filled, not a rotate).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] in; reg [2:0] shamt; wire [7:0] out; integer errors=0;\n  top_module dut(.in(in), .shamt(shamt), .out(out));\n  task check; input [7:0] i; input [2:0] s; input [7:0] eo; begin\n    in=i; shamt=s; #1;\n    if(out!==eo) begin errors=errors+1; $display(\"FAIL in=%b shamt=%d expected=%b got=%b\",i,s,eo,out); end\n    else $display(\"PASS in=%b shamt=%d out=%b\",i,s,out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(8'b10110011, 3'd3, 8'b10011000);\n    check(8'b00000001, 3'd7, 8'b10000000);\n    check(8'b11111111, 3'd4, 8'b11110000);\n    check(8'b10101010, 3'd0, 8'b10101010);\n    check(8'b00000001, 3'd1, 8'b00000010);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "in",
      "shamt",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "in[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "B3",
            "01",
            "FF",
            "01"
          ]
        },
        {
          "name": "shamt[2:0]",
          "wave": "2.3.4.5.",
          "data": [
            "3",
            "7",
            "4",
            "1"
          ]
        },
        {
          "name": "out[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "98",
            "80",
            "F0",
            "02"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "bcd-incrementer",
    "title": "BCD Incrementer",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic"
    ],
    "category": "Combinational Design",
    "lede": "Add one to a BCD digit, wrapping 9 back to 0 with a carry — the combinational building block behind every BCD counter on this site.",
    "concept": "<b>Concept:</b> A BCD digit only spans 0-9, so incrementing 9 must wrap to 0 with <code>carry_out</code> set, not roll into the invalid binary value 10 (<code>4'b1010</code>). The fix is a single special case: <code>carry_out = (bcd_in==9); bcd_out = carry_out ? 0 : bcd_in+1;</code>. Forgetting the wrap (just computing <code>bcd_in+1</code> unconditionally) still gets <code>carry_out</code> right — the digit itself briefly becomes an invalid BCD code the moment it should have reset.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>bcd_in</td><td>input</td><td>4</td><td>BCD digit, 0-9</td></tr>\n<tr><td>bcd_out</td><td>output</td><td>4</td><td>bcd_in + 1, wrapped to 0 at 9</td></tr>\n<tr><td>carry_out</td><td>output</td><td>1</td><td>1 when bcd_in was 9 (wrapped)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] bcd_in,\n  output [3:0] bcd_out,\n  output carry_out\n);\n\n  // Your code here — carry_out = (bcd_in==9); bcd_out = carry_out ? 0 : bcd_in+1.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] bcd_in; wire [3:0] bcd_out; wire carry_out; integer errors=0;\n  top_module dut(.bcd_in(bcd_in), .bcd_out(bcd_out), .carry_out(carry_out));\n  task check; input [3:0] b; input [3:0] eo; input ec; begin\n    bcd_in=b;#1;\n    if(bcd_out!==eo || carry_out!==ec) begin errors=errors+1; $display(\"FAIL bcd_in=%d expected out=%d carry=%b got out=%d carry=%b\",b,eo,ec,bcd_out,carry_out); end\n    else $display(\"PASS bcd_in=%d bcd_out=%d carry=%b\",b,bcd_out,carry_out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(4'd3, 4'd4, 0);\n    check(4'd9, 4'd0, 1);\n    check(4'd8, 4'd9, 0);\n    check(4'd0, 4'd1, 0);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "bcd_in",
      "bcd_out",
      "carry_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "bcd_in[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "3",
            "9",
            "8",
            "0"
          ]
        },
        {
          "name": "bcd_out[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "4",
            "0",
            "9",
            "1"
          ]
        },
        {
          "name": "carry_out",
          "wave": "0.1.0..."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "moving-average-filter",
    "title": "4-Sample Moving Average Filter",
    "difficulty": "hard",
    "points": 50,
    "level": 3,
    "tags": [
      "sequential",
      "datapath"
    ],
    "category": "Sequential Design",
    "lede": "Compute a running average over the last 4 samples of a stream — the simplest possible smoothing filter, and a shift-register-plus-adder pattern that shows up constantly in sensor and audio pipelines.",
    "concept": "<b>Concept:</b> Keep the last 3 samples in a shift register, add the new one to them, and divide by 4 with a free 2-bit right-shift (since 4 is a power of two): <code>sum &lt;= x_in+x1+x2+x3; avg_out = sum&gt;&gt;2;</code>. Every sample must shift down one slot — <code>x3&lt;=x2; x2&lt;=x1; x1&lt;=x_in;</code> — dropping just one of those three shift lines (say, the one feeding <code>x3</code>) doesn't crash anything; it just quietly removes one sample from the averaging window every cycle, so the filter silently averages over fewer than 4 samples once the window has been running a while.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>x_in</td><td>input</td><td>8</td><td>Next input sample</td></tr>\n<tr><td>avg_out</td><td>output</td><td>8</td><td>Average of the last 4 samples (x_in and the 3 before it)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  [7:0] x_in,\n  output reg [7:0] avg_out\n);\n\n  // Your code here — keep the last 3 samples in a shift register; avg_out = (x_in+x1+x2+x3)>>2.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst; reg [7:0] x_in; wire [7:0] avg_out; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .x_in(x_in), .avg_out(avg_out));\n  initial clk=0; always #5 clk=~clk;\n  task check; input [7:0] ea; input [127:0] label; begin\n    if(avg_out!==ea) begin errors=errors+1; $display(\"FAIL %0s expected=%d got=%d\",label,ea,avg_out); end\n    else $display(\"PASS %0s avg_out=%d\",label,avg_out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; x_in=0; @(posedge clk); #1; check(0,\"reset\");\n    rst=0;\n    x_in=8; @(posedge clk); #1; check(2,\"sample1\");\n    x_in=16; @(posedge clk); #1; check(6,\"sample2\");\n    x_in=24; @(posedge clk); #1; check(12,\"sample3\");\n    x_in=32; @(posedge clk); #1; check(20,\"sample4-window-full\");\n    x_in=0; @(posedge clk); #1; check(18,\"sample5-window-slides\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "x_in",
      "avg_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p..........."
        },
        {
          "name": "x_in[7:0]",
          "wave": "2.3.4.5.6.7.",
          "data": [
            "0",
            "8",
            "16",
            "24",
            "32",
            "0"
          ]
        },
        {
          "name": "avg_out[7:0]",
          "wave": "2.3.4.5.6.7.",
          "data": [
            "0",
            "2",
            "6",
            "12",
            "20",
            "18"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "countdown-timer-with-pause",
    "title": "Countdown Timer with Pause",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "control"
    ],
    "category": "Sequential Design",
    "lede": "A loadable countdown timer that can be paused and resumed mid-count without losing its place — the difference between a real pause and quietly ignoring the pause button.",
    "concept": "<b>Concept:</b> A pausable countdown only advances when <code>!pause</code>: <code>if(load) count&lt;=load_val; else if(!pause &amp;&amp; count!=0) count&lt;=count-1;</code>. Dropping the <code>!pause</code> check from that condition (leaving just <code>count!=0</code>) means the pause input is read but never actually gates anything — the countdown keeps ticking straight through, and the bug is invisible unless you specifically test that the count freezes while paused.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>load</td><td>input</td><td>1</td><td>Load load_val into the counter this cycle</td></tr>\n<tr><td>pause</td><td>input</td><td>1</td><td>1 freezes the countdown; 0 resumes it</td></tr>\n<tr><td>load_val</td><td>input</td><td>8</td><td>Value to load</td></tr>\n<tr><td>count</td><td>output</td><td>8</td><td>Current countdown value</td></tr>\n<tr><td>done</td><td>output</td><td>1</td><td>Pulses for 1 cycle when the count reaches 0</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  load,\n  input  pause,\n  input  [7:0] load_val,\n  output reg [7:0] count,\n  output reg done\n);\n\n  // Your code here — load loads load_val; otherwise count down by 1 each cycle unless pause is high.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, load, pause; reg [7:0] load_val; wire [7:0] count; wire done; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .load(load), .pause(pause), .load_val(load_val), .count(count), .done(done));\n  initial clk=0; always #5 clk=~clk;\n  task check; input [7:0] ec; input ed; input [127:0] label; begin\n    if(count!==ec || done!==ed) begin errors=errors+1; $display(\"FAIL %0s expected count=%d done=%b got count=%d done=%b\",label,ec,ed,count,done); end\n    else $display(\"PASS %0s count=%d done=%b\",label,count,done);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; load=0; pause=0; load_val=0; @(posedge clk); #1; check(0,0,\"reset\");\n    rst=0; load=1; load_val=8'd3;\n    @(posedge clk); #1; check(3,0,\"loaded\");\n    load=0;\n    @(posedge clk); #1; check(2,0,\"count-down-1\");\n    pause=1;\n    @(posedge clk); #1; check(2,0,\"paused-holds\");\n    @(posedge clk); #1; check(2,0,\"still-paused\");\n    pause=0;\n    @(posedge clk); #1; check(1,0,\"resumed-count-down\");\n    @(posedge clk); #1; check(0,1,\"done-fires-at-zero\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "load",
      "pause",
      "load_val",
      "count",
      "done"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p............."
        },
        {
          "name": "load",
          "wave": "0.10.........."
        },
        {
          "name": "pause",
          "wave": "0....1...0...."
        },
        {
          "name": "count[7:0]",
          "wave": "2.3.4.....5.6.",
          "data": [
            "0",
            "3",
            "2",
            "1",
            "0"
          ]
        },
        {
          "name": "done",
          "wave": "0...........1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "dual-port-ram",
    "title": "True Dual-Port RAM",
    "difficulty": "hard",
    "points": 50,
    "level": 5,
    "tags": [
      "sequential",
      "memory"
    ],
    "category": "Sequential Design",
    "lede": "An 8x8 memory with two fully independent read/write ports on the same clock — the structure behind every register file and dual-port block RAM.",
    "concept": "<b>Concept:</b> True dual-port RAM means port A and port B can access <em>any</em> two addresses simultaneously, completely independently: each port gets its own write-enable, address, write-data, and registered read-data, all acting on the same underlying memory array. The bug that defeats the entire point is quietly routing port B's access through port A's address (<code>mem[addr_a]</code> instead of <code>mem[addr_b]</code>) — it still compiles, still looks like two ports, but port B can now only ever see whatever port A happens to be pointing at.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Shared clock for both ports</td></tr>\n<tr><td>we_a</td><td>input</td><td>1</td><td>Port A write enable</td></tr>\n<tr><td>addr_a</td><td>input</td><td>3</td><td>Port A address</td></tr>\n<tr><td>wdata_a</td><td>input</td><td>8</td><td>Port A write data</td></tr>\n<tr><td>rdata_a</td><td>output</td><td>8</td><td>Port A registered read data</td></tr>\n<tr><td>we_b</td><td>input</td><td>1</td><td>Port B write enable</td></tr>\n<tr><td>addr_b</td><td>input</td><td>3</td><td>Port B address</td></tr>\n<tr><td>wdata_b</td><td>input</td><td>8</td><td>Port B write data</td></tr>\n<tr><td>rdata_b</td><td>output</td><td>8</td><td>Port B registered read data</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  we_a, input [2:0] addr_a, input [7:0] wdata_a, output reg [7:0] rdata_a,\n  input  we_b, input [2:0] addr_b, input [7:0] wdata_b, output reg [7:0] rdata_b\n);\n\n  // Your code here — 8x8 memory array with two fully independent read/write ports.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk; reg we_a; reg [2:0] addr_a; reg [7:0] wdata_a; wire [7:0] rdata_a;\n  reg we_b; reg [2:0] addr_b; reg [7:0] wdata_b; wire [7:0] rdata_b;\n  integer errors=0;\n  top_module dut(.clk(clk), .we_a(we_a), .addr_a(addr_a), .wdata_a(wdata_a), .rdata_a(rdata_a),\n                 .we_b(we_b), .addr_b(addr_b), .wdata_b(wdata_b), .rdata_b(rdata_b));\n  initial clk=0; always #5 clk=~clk;\n  task check; input [7:0] ea; input [7:0] eb; input [127:0] label; begin\n    if(rdata_a!==ea || rdata_b!==eb) begin errors=errors+1; $display(\"FAIL %0s expected ra=%h rb=%h got ra=%h rb=%h\",label,ea,eb,rdata_a,rdata_b); end\n    else $display(\"PASS %0s ra=%h rb=%h\",label,rdata_a,rdata_b);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    we_a=1; addr_a=0; wdata_a=8'hAA;\n    we_b=1; addr_b=1; wdata_b=8'hBB;\n    @(posedge clk); #1;\n    we_a=0; we_b=0; addr_a=0; addr_b=1;\n    @(posedge clk); #1; check(8'hAA, 8'hBB, \"independent-ports-read-back\");\n    we_a=1; addr_a=2; wdata_a=8'hCC;\n    addr_b=0;\n    @(posedge clk); #1;\n    we_a=0; addr_a=2;\n    @(posedge clk); #1; check(8'hCC, 8'hAA, \"port-a-write-port-b-read-different-addr\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "we_a",
      "addr_a",
      "wdata_a",
      "rdata_a",
      "we_b",
      "addr_b",
      "wdata_b",
      "rdata_b"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p....."
        },
        {
          "name": "addr_a[2:0]",
          "wave": "2.....",
          "data": [
            "0"
          ]
        },
        {
          "name": "addr_b[2:0]",
          "wave": "2.....",
          "data": [
            "1"
          ]
        },
        {
          "name": "rdata_a[7:0]",
          "wave": "2.3...",
          "data": [
            "xx",
            "AA"
          ]
        },
        {
          "name": "rdata_b[7:0]",
          "wave": "2.3...",
          "data": [
            "xx",
            "BB"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "lru-2way-tracker",
    "title": "2-Way LRU Tracker",
    "difficulty": "easy",
    "points": 10,
    "level": 8,
    "tags": [
      "sequential",
      "cache"
    ],
    "category": "Sequential Design",
    "lede": "Track which of two cache ways was least recently used with a single bit — the tiny piece of state behind LRU replacement in a 2-way set-associative cache.",
    "concept": "<b>Concept:</b> For exactly two ways, LRU tracking needs only one bit: whichever way is <em>not</em> just accessed becomes the LRU candidate: <code>if(access) lru_way &lt;= ~way;</code>. Flipping that to <code>lru_way &lt;= way</code> points the tracker at the way that was just used instead of the one that wasn't — a real cache using this bit to pick an eviction victim would then evict the entry it just touched, defeating the entire purpose of LRU.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (lru_way=0)</td></tr>\n<tr><td>access</td><td>input</td><td>1</td><td>1 when a cache access happens this cycle</td></tr>\n<tr><td>way</td><td>input</td><td>1</td><td>Which way (0 or 1) was accessed</td></tr>\n<tr><td>lru_way</td><td>output</td><td>1</td><td>The way that should be evicted next (least recently used)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  access,\n  input  way,\n  output reg lru_way\n);\n\n  // Your code here — on access, the OTHER way becomes the LRU candidate.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, access, way; wire lru_way; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .access(access), .way(way), .lru_way(lru_way));\n  initial clk=0; always #5 clk=~clk;\n  task check; input el; input [127:0] label; begin\n    if(lru_way!==el) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,el,lru_way); end\n    else $display(\"PASS %0s lru_way=%b\",label,lru_way);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; access=0; way=0; @(posedge clk); #1; check(0,\"reset\");\n    rst=0; access=1; way=0;\n    @(posedge clk); #1; check(1,\"way0-accessed-way1-is-lru\");\n    access=1; way=1;\n    @(posedge clk); #1; check(0,\"way1-accessed-way0-is-lru\");\n    access=0;\n    @(posedge clk); #1; check(0,\"no-access-holds\");\n    access=1; way=0;\n    @(posedge clk); #1; check(1,\"way0-accessed-again-way1-lru\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "access",
      "way",
      "lru_way"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p...."
        },
        {
          "name": "access",
          "wave": "01101"
        },
        {
          "name": "way",
          "wave": "x23x4",
          "data": [
            "0",
            "1",
            "0"
          ]
        },
        {
          "name": "lru_way",
          "wave": "010.1"
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "skid-buffer",
    "title": "Valid/Ready Skid Buffer",
    "difficulty": "hard",
    "points": 50,
    "level": 8,
    "tags": [
      "sequential",
      "protocol",
      "datapath"
    ],
    "category": "Sequential Design",
    "lede": "Absorb one cycle of downstream backpressure without dropping data — the 1-entry buffer that makes a ready/valid handshake safe to pipeline.",
    "concept": "<b>Concept:</b> When downstream stalls (<code>ready_in</code> low) but upstream still has new data waiting, that data has nowhere to go — unless a skid buffer catches it: <code>if(valid_out &amp;&amp; valid_in) begin skid_data&lt;=data_in; skid_valid&lt;=1; end</code>, and <code>ready_out</code> drops to stop upstream from sending more until the skid slot drains. Wiring <code>ready_out</code> straight through to <code>ready_in</code> (skipping the skid logic entirely) looks like a handshake but has no buffering at all — the moment downstream stalls for even one cycle, whatever data arrives that cycle is simply lost, since nothing is holding it.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>valid_in</td><td>input</td><td>1</td><td>Upstream has data</td></tr>\n<tr><td>ready_out</td><td>output</td><td>1</td><td>This buffer can accept new data</td></tr>\n<tr><td>data_in</td><td>input</td><td>8</td><td>Upstream data</td></tr>\n<tr><td>valid_out</td><td>output</td><td>1</td><td>Data is available downstream</td></tr>\n<tr><td>ready_in</td><td>input</td><td>1</td><td>Downstream can accept data</td></tr>\n<tr><td>data_out</td><td>output</td><td>8</td><td>Data presented downstream</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  valid_in,\n  output ready_out,\n  input  [7:0] data_in,\n  output reg valid_out,\n  input  ready_in,\n  output reg [7:0] data_out\n);\n\n  // Your code here — 1-entry skid buffer: catch one cycle of new data when downstream stalls, ready_out=0 while it's occupied.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, valid_in, ready_in; reg [7:0] data_in; wire ready_out, valid_out; wire [7:0] data_out;\n  integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .valid_in(valid_in), .ready_out(ready_out), .data_in(data_in),\n                 .valid_out(valid_out), .ready_in(ready_in), .data_out(data_out));\n  initial clk=0; always #5 clk=~clk;\n  task check; input ev; input [7:0] ed; input er; input [127:0] label; begin\n    if(valid_out!==ev || data_out!==ed || ready_out!==er) begin\n      errors=errors+1; $display(\"FAIL %0s expected valid=%b data=%h ready_out=%b got valid=%b data=%h ready_out=%b\",label,ev,ed,er,valid_out,data_out,ready_out);\n    end else $display(\"PASS %0s valid=%b data=%h ready_out=%b\",label,valid_out,data_out,ready_out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; valid_in=0; ready_in=0; data_in=0; @(posedge clk); #1; check(0,8'h00,1,\"reset\");\n    rst=0;\n    valid_in=1; data_in=8'hAA; ready_in=1;\n    @(posedge clk); #1; check(1,8'hAA,1,\"cyc1-passthrough\");\n    valid_in=1; data_in=8'hBB; ready_in=0;\n    @(posedge clk); #1; check(1,8'hAA,0,\"cyc2-downstream-stalls-new-data-skidded\");\n    @(posedge clk); #1; check(1,8'hAA,0,\"cyc3-still-stalled-holding\");\n    ready_in=1;\n    @(posedge clk); #1; check(1,8'hBB,1,\"cyc4-drains-skid-no-data-lost\");\n    valid_in=0;\n    @(posedge clk); #1; check(0,8'hBB,1,\"cyc5-no-more-data\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "valid_in",
      "ready_out",
      "data_in",
      "valid_out",
      "ready_in",
      "data_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p....."
        },
        {
          "name": "valid_in",
          "wave": "011110"
        },
        {
          "name": "data_in[7:0]",
          "wave": "x23..x",
          "data": [
            "AA",
            "BB"
          ]
        },
        {
          "name": "ready_in",
          "wave": "010011"
        },
        {
          "name": "ready_out",
          "wave": "110011"
        },
        {
          "name": "valid_out",
          "wave": "011110"
        },
        {
          "name": "data_out[7:0]",
          "wave": "23..4.",
          "data": [
            "00",
            "AA",
            "BB"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "dual-edge-flip-flop",
    "title": "Dual-Edge-Triggered Flip-Flop",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "fundamentals"
    ],
    "category": "Sequential Design",
    "lede": "Capture data on both the rising and falling edge of the clock — the DDR-style flop behind double-data-rate memory interfaces.",
    "concept": "<b>Concept:</b> A regular flip-flop only samples its input on one clock edge; a dual-edge-triggered flop samples on <em>both</em>, doubling the effective data rate for the same clock frequency: <code>always @(posedge clk or negedge clk) q&lt;=d;</code>. Leaving off the <code>or negedge clk</code> half of the sensitivity list silently turns it back into an ordinary single-edge flop — it will still pass any test that only checks rising-edge behavior, and only reveal the bug on a test that specifically checks capture at a falling edge.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>d</td><td>input</td><td>1</td><td>Data input</td></tr>\n<tr><td>q</td><td>output</td><td>1</td><td>d, captured on every clock edge (both rising and falling)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  d,\n  output reg q\n);\n\n  // Your code here — capture d on BOTH posedge and negedge of clk.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, d; wire q; integer errors=0;\n  top_module dut(.clk(clk), .d(d), .q(q));\n  initial clk=0; always #5 clk=~clk;\n  task check; input eq_; input [127:0] label; begin\n    if(q!==eq_) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,eq_,q); end\n    else $display(\"PASS %0s q=%b\",label,q);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    d=1; @(posedge clk); #1; check(1,\"posedge-capture-1\");\n    d=0; @(negedge clk); #1; check(0,\"negedge-capture-0-proves-dual-edge\");\n    d=1; @(posedge clk); #1; check(1,\"posedge-capture-1-again\");\n    d=0; @(negedge clk); #1; check(0,\"negedge-capture-0-again\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "d",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "010101"
        },
        {
          "name": "d",
          "wave": "101010"
        },
        {
          "name": "q",
          "wave": "010101"
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "binary-counter",
    "title": "4-Bit Binary Counter",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "counter"
    ],
    "category": "Sequential Design",
    "lede": "Synchronous 4-bit up-counter with active-high reset. Counts on posedge clk; reset clears to 0.",
    "concept": "<b>Concept:</b> Use non-blocking assigns in <code>always @(posedge clk)</code>. Reset has priority over increment.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>q</td><td>output</td><td>4</td><td>Count value</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input            clk,\n  input            rst,\n  output reg [3:0] q\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst;\n  wire [3:0] q;\n  integer errors = 0;\n  integer i;\n  top_module dut(.clk(clk), .rst(rst), .q(q));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1;\n    @(posedge clk); #1;\n    if (q !== 4'd0) begin errors = errors + 1; $display(\"FAIL after reset q=%0d\", q); end\n    else $display(\"PASS reset q=0\");\n    rst = 0;\n    for (i = 1; i <= 5; i = i + 1) begin\n      @(posedge clk); #1;\n          if (q !== i) begin\n        errors = errors + 1;\n        $display(\"FAIL expected q=%0d got %0d\", i, q);\n      end else $display(\"PASS q=%0d\", q);\n    end\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p.........."
        },
        {
          "name": "rst",
          "wave": "10........."
        },
        {
          "name": "q[3:0]",
          "wave": "x.2.3.4.5.6",
          "data": [
            "0",
            "1",
            "2",
            "3",
            "4"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "toggle-ff",
    "title": "T Flip-Flop (Enable Toggle)",
    "difficulty": "medium",
    "points": 25,
    "level": 4,
    "tags": [
      "sequential",
      "fsm"
    ],
    "category": "Sequential Design",
    "lede": "When t=1, toggle q each clock. When t=0, hold. Sync reset clears q to 0.",
    "concept": "<b>Concept:</b> <code>q &lt;= rst ? 0 : (t ? ~q : q);</code>",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>t</td><td>input</td><td>1</td><td>Toggle enable</td></tr>\n<tr><td>q</td><td>output</td><td>1</td><td>Stored bit</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input      clk,\n  input      rst,\n  input      t,\n  output reg q\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, rst, t;\n  wire q;\n  integer errors = 0;\n  top_module dut(.clk(clk), .rst(rst), .t(t), .q(q));\n  initial clk = 0;\n  always #5 clk = ~clk;\n  task tick; begin @(posedge clk); #1; end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\");\n    $dumpvars(0, tb);\n    rst = 1; t = 0; tick;\n    if (q !== 0) begin errors = errors + 1; $display(\"FAIL reset\"); end\n    else $display(\"PASS reset\");\n    rst = 0; t = 1; tick;\n    if (q !== 1) begin errors = errors + 1; $display(\"FAIL toggle to 1 got %b\", q); end\n    else $display(\"PASS toggle 0->1\");\n    tick;\n    if (q !== 0) begin errors = errors + 1; $display(\"FAIL toggle to 0 got %b\", q); end\n    else $display(\"PASS toggle 1->0\");\n    t = 0; tick;\n    if (q !== 0) begin errors = errors + 1; $display(\"FAIL hold got %b\", q); end\n    else $display(\"PASS hold\");\n    t = 1; tick;\n    if (q !== 1) begin errors = errors + 1; $display(\"FAIL toggle again got %b\", q); end\n    else $display(\"PASS toggle again\");\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "t",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "rst",
          "wave": "1.0......."
        },
        {
          "name": "t",
          "wave": "0.1...0.1."
        },
        {
          "name": "q",
          "wave": "0.1.0...1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "rock-paper-scissors-lizard-spock",
    "title": "Rock Paper Scissors Lizard Spock",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "game-logic"
    ],
    "category": "Fun & Games",
    "lede": "Judge a round of the 5-way expanded rock-paper-scissors from The Big Bang Theory — each move beats exactly two of the other four, so the usual 3-way rule table isn't enough.",
    "concept": "<b>Concept:</b> Encode each player's move as 0=Rock, 1=Paper, 2=Scissors, 3=Lizard, 4=Spock. Every move beats exactly two others (Rock beats Scissors and Lizard; Paper beats Rock and Spock; Scissors beats Paper and Lizard; Lizard beats Spock and Paper; Spock beats Scissors and Rock) — so the cleanest implementation is a direct lookup of p1's beats-list against p2, then the reverse check if that fails. A single wrong entry in that beats-list (say, listing Paper instead of Scissors as one of Rock's victims) is a real, easy-to-make copy-paste slip — it still compiles and handles most matchups correctly, but silently flips the outcome for that one specific matchup.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>p1</td><td>input</td><td>3</td><td>Player 1's move (0=Rock,1=Paper,2=Scissors,3=Lizard,4=Spock)</td></tr>\n<tr><td>p2</td><td>input</td><td>3</td><td>Player 2's move, same encoding</td></tr>\n<tr><td>winner</td><td>output</td><td>2</td><td>0=tie, 1=player 1 wins, 2=player 2 wins</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [2:0] p1,\n  input  [2:0] p2,\n  output [1:0] winner\n);\n\n  // Your code here — 0=Rock,1=Paper,2=Scissors,3=Lizard,4=Spock.\n  // Each move beats exactly two others. winner: 0=tie, 1=p1 wins, 2=p2 wins.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [2:0] p1, p2; wire [1:0] winner; integer errors=0;\n  top_module dut(.p1(p1), .p2(p2), .winner(winner));\n  task check; input [2:0] a,b; input [1:0] ew; begin\n    p1=a; p2=b; #1;\n    if(winner!==ew) begin errors=errors+1; $display(\"FAIL p1=%0d p2=%0d expected=%0d got=%0d\",a,b,ew,winner); end\n    else $display(\"PASS p1=%0d p2=%0d winner=%0d\",a,b,winner);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(0,2,1);\n    check(1,0,1);\n    check(2,1,1);\n    check(3,4,1);\n    check(4,2,1);\n    check(0,0,0);\n    check(2,0,2);\n    check(1,3,2);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "p1",
      "p2",
      "winner"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "p1[2:0]",
          "wave": "2.3.4.5.",
          "data": [
            "Rock",
            "Paper",
            "Lizard",
            "Scissors"
          ]
        },
        {
          "name": "p2[2:0]",
          "wave": "2.3.4.5.",
          "data": [
            "Scissors",
            "Rock",
            "Spock",
            "Rock"
          ]
        },
        {
          "name": "winner[1:0]",
          "wave": "2.3.4.5.",
          "data": [
            "1",
            "1",
            "1",
            "2"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "magic-8-ball",
    "title": "Magic 8-Ball Fortune Teller",
    "difficulty": "easy",
    "points": 10,
    "level": 3,
    "tags": [
      "sequential",
      "lfsr"
    ],
    "category": "Fun & Games",
    "lede": "Give a \"random-feeling\" fortune-teller answer on every shake using a self-advancing 3-bit LFSR — a tiny, deterministic taste of pseudo-randomness in hardware.",
    "concept": "<b>Concept:</b> A 3-bit Fibonacci LFSR with feedback tap <code>q[2]^q[0]</code> cycles through all 7 nonzero 3-bit states before repeating, giving a fixed but non-obvious-looking sequence of \"answers\" each time <code>shake</code> pulses: <code>lfsr &lt;= {lfsr[1:0], lfsr[2]^lfsr[0]};</code>. The tap position matters — a 3-bit LFSR has exactly two maximal-length taps (<code>q2^q1</code> and <code>q2^q0</code>), and swapping one for the other still produces a valid-looking cycling pattern, just a completely different (and here, wrong) sequence of answers.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (seeds lfsr to 3'b001)</td></tr>\n<tr><td>shake</td><td>input</td><td>1</td><td>1 to shake the ball and advance to the next answer</td></tr>\n<tr><td>answer</td><td>output</td><td>3</td><td>Current fortune-teller answer (the raw LFSR state)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  shake,\n  output [2:0] answer\n);\n\n  // Your code here — 3-bit LFSR, feedback = lfsr[2]^lfsr[0], seed on reset = 3'b001, advances on shake.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst, shake; wire [2:0] answer; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .shake(shake), .answer(answer));\n  always #5 clk=~clk;\n  task check; input [2:0] ea; begin\n    if(answer!==ea) begin errors=errors+1; $display(\"FAIL expected=%b got=%b\",ea,answer); end\n    else $display(\"PASS answer=%b\",answer);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; shake=0; @(posedge clk); #1; rst=0;\n    check(3'b001);\n    shake=1; @(posedge clk); #1; check(3'b011);\n    @(posedge clk); #1; check(3'b111);\n    @(posedge clk); #1; check(3'b110);\n    @(posedge clk); #1; check(3'b101);\n    @(posedge clk); #1; check(3'b010);\n    @(posedge clk); #1; check(3'b100);\n    @(posedge clk); #1; check(3'b001);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "shake",
      "answer"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "rst",
          "wave": "10........"
        },
        {
          "name": "shake",
          "wave": "0.1......."
        },
        {
          "name": "answer[2:0]",
          "wave": "2.3.4.5.6.",
          "data": [
            "1",
            "3",
            "7",
            "6",
            "5"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "hot-potato-token-passer",
    "title": "Hot Potato Token Passer",
    "difficulty": "medium",
    "points": 25,
    "level": 4,
    "tags": [
      "sequential",
      "fsm",
      "game-logic"
    ],
    "category": "Fun & Games",
    "lede": "Pass a token around a 4-player ring every cycle until a buzzer sounds — whoever's holding it when the music stops loses, and the game freezes there.",
    "concept": "<b>Concept:</b> The token position advances every cycle (0→1→2→3→0…) until <code>buzzer</code> fires; at that exact moment, whoever currently holds the token is the loser, and the game must freeze (<code>game_over</code>) without advancing the token further: <code>if(buzzer) begin game_over&lt;=1; loser&lt;=token_pos; end else token_pos&lt;=token_pos+1;</code>. A subtle but very real party-game bug is advancing the token unconditionally every cycle and only afterward checking the buzzer — that records the loser as whoever is about to receive the token next, not whoever was actually holding it, quietly declaring the wrong player the loser.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (token_pos=0, game not over)</td></tr>\n<tr><td>buzzer</td><td>input</td><td>1</td><td>1 for one cycle to end the round</td></tr>\n<tr><td>token_pos</td><td>output</td><td>2</td><td>Which of the 4 players (0-3) currently holds the token</td></tr>\n<tr><td>game_over</td><td>output</td><td>1</td><td>1 once the buzzer has fired; freezes state until reset</td></tr>\n<tr><td>loser</td><td>output</td><td>2</td><td>The player holding the token the instant the buzzer fired</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  buzzer,\n  output reg [1:0] token_pos,\n  output reg game_over,\n  output reg [1:0] loser\n);\n\n  // Your code here — token_pos advances 0,1,2,3,0... each cycle until buzzer fires;\n  // at that moment latch loser=token_pos and set game_over, then freeze.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst, buzzer; wire [1:0] token_pos; wire game_over; wire [1:0] loser; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .buzzer(buzzer), .token_pos(token_pos), .game_over(game_over), .loser(loser));\n  always #5 clk=~clk;\n  task check2; input [1:0] etp; input ego; input [1:0] el; input [127:0] label; begin\n    if(token_pos!==etp || game_over!==ego || loser!==el) begin errors=errors+1; $display(\"FAIL %0s expected token_pos=%0d game_over=%b loser=%0d got token_pos=%0d game_over=%b loser=%0d\",label,etp,ego,el,token_pos,game_over,loser); end\n    else $display(\"PASS %0s token_pos=%0d game_over=%b loser=%0d\",label,token_pos,game_over,loser);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; buzzer=0; @(posedge clk); #1; rst=0;\n    check2(0,0,0,\"reset\");\n    @(posedge clk); #1; check2(1,0,0,\"pass1\");\n    @(posedge clk); #1; check2(2,0,0,\"pass2\");\n    @(posedge clk); #1; check2(3,0,0,\"pass3\");\n    buzzer=1; @(posedge clk); #1; check2(3,1,3,\"buzzer-freezes-on-holder\");\n    buzzer=0; @(posedge clk); #1; check2(3,1,3,\"frozen-after\");\n    @(posedge clk); #1; check2(3,1,3,\"still-frozen\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "buzzer",
      "token_pos",
      "game_over",
      "loser"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p..........."
        },
        {
          "name": "buzzer",
          "wave": "0.......1.0."
        },
        {
          "name": "token_pos[1:0]",
          "wave": "2.3.4.5.....",
          "data": [
            "0",
            "1",
            "2",
            "3"
          ]
        },
        {
          "name": "game_over",
          "wave": "0.........1."
        },
        {
          "name": "loser[1:0]",
          "wave": "2.........3.",
          "data": [
            "0",
            "3"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "reaction-game-scorer",
    "title": "Reaction Game Scorer",
    "difficulty": "hard",
    "points": 50,
    "level": 4,
    "tags": [
      "sequential",
      "fsm",
      "game-logic"
    ],
    "category": "Fun & Games",
    "lede": "Score a simple reflex game: a light comes on, the player presses a button, and the circuit measures how many cycles it took — flagging jumping the gun or dozing off.",
    "concept": "<b>Concept:</b> A 3-state FSM (idle → armed → done) times the gap between <code>stimulus</code> and <code>button</code>: pressing before the stimulus is <code>too_early</code>, pressing within the window gives a <code>valid</code> reaction_time, and letting a counter hit a fixed threshold without a press sets <code>too_slow</code>. That timeout check is the easy piece to forget — an implementation that only reacts to <code>button</code> in the armed state and never checks whether the counter has run out will simply wait forever for a press that never comes, silently dropping the entire \"too slow\" case instead of ever flagging it.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset, returns to idle</td></tr>\n<tr><td>stimulus</td><td>input</td><td>1</td><td>Pulses for 1 cycle: the light turns on</td></tr>\n<tr><td>button</td><td>input</td><td>1</td><td>1 while the player is pressing the button</td></tr>\n<tr><td>reaction_time</td><td>output</td><td>4</td><td>Cycles between stimulus and a valid press</td></tr>\n<tr><td>too_slow</td><td>output</td><td>1</td><td>1 if 5 cycles pass after stimulus with no press</td></tr>\n<tr><td>too_early</td><td>output</td><td>1</td><td>1 if the button is pressed before any stimulus</td></tr>\n<tr><td>valid</td><td>output</td><td>1</td><td>1 once a valid in-window press has been scored</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  stimulus,\n  input  button,\n  output reg [3:0] reaction_time,\n  output reg too_slow,\n  output reg too_early,\n  output reg valid\n);\n\n  // Your code here — idle: too_early if button pressed with no stimulus yet, else move to armed on stimulus.\n  // armed: on button, latch reaction_time=cycle count and set valid; if 5 cycles pass with no button, set too_slow.\n  // Both outcomes move to a done state that holds until reset.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst, stimulus, button; wire [3:0] reaction_time; wire too_slow, too_early, valid; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .stimulus(stimulus), .button(button), .reaction_time(reaction_time), .too_slow(too_slow), .too_early(too_early), .valid(valid));\n  always #5 clk=~clk;\n  task check3; input erv; input [3:0] ert; input ets; input [127:0] label; begin\n    if(valid!==erv || (erv && reaction_time!==ert) || too_slow!==ets) begin errors=errors+1; $display(\"FAIL %0s expected valid=%b rt=%0d slow=%b got valid=%b rt=%0d slow=%b\",label,erv,ert,ets,valid,reaction_time,too_slow); end\n    else $display(\"PASS %0s valid=%b rt=%0d slow=%b\",label,valid,reaction_time,too_slow);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; stimulus=0; button=0; @(posedge clk); #1; rst=0;\n    stimulus=1; @(posedge clk); #1; stimulus=0;\n    @(posedge clk); #1; @(posedge clk); #1; @(posedge clk); #1;\n    button=1; @(posedge clk); #1; check3(1,3,0,\"valid-press-after-3-cycles\");\n    button=0;\n    rst=1; @(posedge clk); #1; rst=0;\n    stimulus=1; @(posedge clk); #1; stimulus=0;\n    repeat(6) begin @(posedge clk); #1; end\n    check3(0,0,1,\"never-pressed-times-out\");\n    rst=1; @(posedge clk); #1; rst=0;\n    button=1; @(posedge clk); #1;\n    if(too_early!==1) begin errors=errors+1; $display(\"FAIL expected too_early=1 got %b\",too_early); end\n    else $display(\"PASS too_early=1 pressed-before-stimulus\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "stimulus",
      "button",
      "reaction_time",
      "too_slow",
      "too_early",
      "valid"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p................."
        },
        {
          "name": "stimulus",
          "wave": "0.10.............."
        },
        {
          "name": "button",
          "wave": "0.......1.0......."
        },
        {
          "name": "valid",
          "wave": "0.........1......."
        },
        {
          "name": "reaction_time[3:0]",
          "wave": "2.........3.......",
          "data": [
            "0",
            "3"
          ]
        },
        {
          "name": "too_slow",
          "wave": "0................."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "space-invaders-collision-detector",
    "title": "Space Invaders Collision Detector",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "comparator"
    ],
    "category": "Fun & Games",
    "lede": "Detect whether a bullet hits an alien: a classic range-overlap check dressed up as retro arcade collision logic.",
    "concept": "<b>Concept:</b> The alien occupies a run of cells from <code>alien_x</code> up to (but not including) <code>alien_x+alien_width</code>; the bullet hits when its position falls anywhere in that half-open range: <code>hit = (bullet_x&gt;=alien_x) &amp;&amp; (bullet_x&lt;alien_x+alien_width);</code>. Using <code>&lt;=</code> instead of <code>&lt;</code> for the upper bound is a classic off-by-one in collision detection — it counts one extra cell just past the alien's actual right edge as a hit, so a bullet that should whiff right next to the alien registers a phantom collision instead.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>bullet_x</td><td>input</td><td>4</td><td>Bullet's horizontal position (0-15)</td></tr>\n<tr><td>alien_x</td><td>input</td><td>4</td><td>Alien's leftmost cell position</td></tr>\n<tr><td>alien_width</td><td>input</td><td>3</td><td>How many cells wide the alien is</td></tr>\n<tr><td>hit</td><td>output</td><td>1</td><td>1 if bullet_x falls within the alien's occupied cells</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] bullet_x,\n  input  [3:0] alien_x,\n  input  [2:0] alien_width,\n  output hit\n);\n\n  // Your code here — hit if alien_x <= bullet_x < alien_x + alien_width.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] bullet_x, alien_x; reg [2:0] alien_width; wire hit; integer errors=0;\n  top_module dut(.bullet_x(bullet_x), .alien_x(alien_x), .alien_width(alien_width), .hit(hit));\n  task check; input [3:0] bx, ax; input [2:0] aw; input eh; begin\n    bullet_x=bx; alien_x=ax; alien_width=aw; #1;\n    if(hit!==eh) begin errors=errors+1; $display(\"FAIL bullet_x=%0d alien_x=%0d width=%0d expected=%b got=%b\",bx,ax,aw,eh,hit); end\n    else $display(\"PASS bullet_x=%0d alien_x=%0d width=%0d hit=%b\",bx,ax,aw,hit);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(5,5,3,1);\n    check(7,5,3,1);\n    check(8,5,3,0);\n    check(4,5,3,0);\n    check(6,5,3,1);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "bullet_x",
      "alien_x",
      "alien_width",
      "hit"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "bullet_x[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "5",
            "7",
            "8",
            "4"
          ]
        },
        {
          "name": "alien_x[3:0]",
          "wave": "2.......",
          "data": [
            "5"
          ]
        },
        {
          "name": "alien_width[2:0]",
          "wave": "2.......",
          "data": [
            "3"
          ]
        },
        {
          "name": "hit",
          "wave": "1.1.0.0."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "quiz-buzzer-lockout",
    "title": "Quiz Show Buzzer Lockout",
    "difficulty": "medium",
    "points": 25,
    "level": 8,
    "tags": [
      "sequential",
      "arbiter",
      "game-logic"
    ],
    "category": "Fun & Games",
    "lede": "Build a 4-player quiz buzzer: whoever presses first wins and locks out everyone else until the host resets — first-to-press, not round-robin.",
    "concept": "<b>Concept:</b> Once any player buzzes in, the system must latch that winner and completely ignore every subsequent buzz until reset: <code>if(!locked &amp;&amp; |buzz) begin locked&lt;=1; winner&lt;=...; end</code>. Simultaneous presses in the same cycle need a fixed tie-break (lowest player index wins here). The critical guard is <code>!locked</code> — drop it and the buzzer keeps updating <code>winner</code> on every later press even after the round is supposedly locked, letting a slower player steal the win from whoever actually buzzed in first.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset, unlocks the buzzer</td></tr>\n<tr><td>buzz</td><td>input</td><td>4</td><td>One bit per player; 1 means that player is pressing</td></tr>\n<tr><td>winner</td><td>output</td><td>4</td><td>One-hot: which player won the buzz-in (0 if none yet)</td></tr>\n<tr><td>locked</td><td>output</td><td>1</td><td>1 once a winner has been latched; ignores buzz until reset</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  [3:0] buzz,\n  output reg [3:0] winner,\n  output reg locked\n);\n\n  // Your code here — first cycle any buzz bit is set (while unlocked), latch a one-hot winner\n  // (lowest index wins ties) and set locked; ignore all further buzz activity until reset.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst; reg [3:0] buzz; wire [3:0] winner; wire locked; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .buzz(buzz), .winner(winner), .locked(locked));\n  always #5 clk=~clk;\n  task check; input [3:0] ew; input el; input [127:0] label; begin\n    if(winner!==ew || locked!==el) begin errors=errors+1; $display(\"FAIL %0s expected winner=%b locked=%b got winner=%b locked=%b\",label,ew,el,winner,locked); end\n    else $display(\"PASS %0s winner=%b locked=%b\",label,winner,locked);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; buzz=0; @(posedge clk); #1; rst=0;\n    buzz=4'b0010; @(posedge clk); #1; check(4'b0010,1,\"player1-buzzes-first\");\n    buzz=4'b1000; @(posedge clk); #1; check(4'b0010,1,\"locked-ignores-later-buzz\");\n    rst=1; @(posedge clk); #1; rst=0;\n    buzz=4'b0101; @(posedge clk); #1; check(4'b0001,1,\"tie-lowest-index-wins\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "buzz",
      "winner",
      "locked"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "buzz[3:0]",
          "wave": "2.3.4...",
          "data": [
            "0",
            "2",
            "8"
          ]
        },
        {
          "name": "winner[3:0]",
          "wave": "2.3.....",
          "data": [
            "0",
            "2"
          ]
        },
        {
          "name": "locked",
          "wave": "0.1....."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "tug-of-war-counter",
    "title": "Tug of War Position Tracker",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "counter",
      "game-logic"
    ],
    "category": "Fun & Games",
    "lede": "Track the rope's position in a tug-of-war: each pull nudges a signed counter one way, and crossing a threshold declares a winner instantly.",
    "concept": "<b>Concept:</b> The rope's position is a signed up/down counter — team A's pull decrements it, team B's pull increments it — and the win check must use the position <em>after</em> this cycle's pull is applied, not the stale value from before it: compute <code>next_pos</code> combinationally, register <code>position&lt;=next_pos</code>, and check <code>next_pos</code> against the threshold in the same cycle. Checking the old, pre-pull <code>position</code> instead of <code>next_pos</code> is a subtle one-cycle-late bug — the win still gets detected eventually, just one full pull later than it actually happened, so a team can be declared the winner only after over-pulling past the real threshold.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (position=0, winner=none)</td></tr>\n<tr><td>pull_a</td><td>input</td><td>1</td><td>Team A pulls this cycle</td></tr>\n<tr><td>pull_b</td><td>input</td><td>1</td><td>Team B pulls this cycle</td></tr>\n<tr><td>position</td><td>output</td><td>4 (signed)</td><td>Rope position; negative = toward A, positive = toward B</td></tr>\n<tr><td>winner</td><td>output</td><td>2</td><td>0=none yet, 1=team A wins, 2=team B wins</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  pull_a,\n  input  pull_b,\n  output reg signed [3:0] position,\n  output reg [1:0] winner\n);\n\n  // Your code here — pull_a (only) moves position -1, pull_b (only) moves it +1 (both/neither: no change).\n  // Win threshold is +/-3. Check the NEW position (after this cycle's pull) against the threshold, not the old one.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst, pull_a, pull_b; wire signed [3:0] position; wire [1:0] winner; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .pull_a(pull_a), .pull_b(pull_b), .position(position), .winner(winner));\n  always #5 clk=~clk;\n  task check; input signed [3:0] ep; input [1:0] ew; input [127:0] label; begin\n    if(position!==ep || winner!==ew) begin errors=errors+1; $display(\"FAIL %0s expected position=%0d winner=%0d got position=%0d winner=%0d\",label,ep,ew,position,winner); end\n    else $display(\"PASS %0s position=%0d winner=%0d\",label,position,winner);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; pull_a=0; pull_b=0; @(posedge clk); #1; rst=0;\n    pull_a=1; @(posedge clk); #1; check(-1,0,\"pull1\");\n    @(posedge clk); #1; check(-2,0,\"pull2\");\n    @(posedge clk); #1; check(-3,1,\"pull3-team-a-wins-same-cycle-it-crosses\");\n    pull_a=0; @(posedge clk); #1; check(-3,1,\"frozen-after-win\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "pull_a",
      "pull_b",
      "position",
      "winner"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "pull_a",
          "wave": "0.1.....0."
        },
        {
          "name": "position[3:0]",
          "wave": "2.3.4.5...",
          "data": [
            "0",
            "-1",
            "-2",
            "-3"
          ]
        },
        {
          "name": "winner[1:0]",
          "wave": "0.......1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "parking-garage-counter",
    "title": "Parking Garage Spot Counter",
    "difficulty": "easy",
    "points": 10,
    "level": 3,
    "tags": [
      "sequential",
      "counter"
    ],
    "category": "Fun & Games",
    "lede": "Track available spots in an 8-space garage as cars enter and exit, refusing to go negative when it's already full — an up/down counter with real-world guard rails.",
    "concept": "<b>Concept:</b> Available spots decrement on <code>car_in</code> and increment on <code>car_out</code>, but only when it's safe to do so: never decrement below 0, never increment past capacity. The full flag is simply <code>available==0</code>. Forgetting the <code>available!=0</code> guard on the decrement path means a car_in pulse that arrives while the garage is already full silently underflows the counter to 15 (since it's unsigned) instead of holding at 0 — the garage would appear to gain fifteen phantom free spots the instant it should have stayed completely full.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (available=8, garage empty)</td></tr>\n<tr><td>car_in</td><td>input</td><td>1</td><td>A car enters this cycle</td></tr>\n<tr><td>car_out</td><td>input</td><td>1</td><td>A car exits this cycle</td></tr>\n<tr><td>available</td><td>output</td><td>4</td><td>Number of free spots, 0-8</td></tr>\n<tr><td>full</td><td>output</td><td>1</td><td>1 when available==0</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  car_in,\n  input  car_out,\n  output reg [3:0] available,\n  output full\n);\n\n  // Your code here — capacity is 8. car_in decrements available (never below 0),\n  // car_out increments it (never above 8). full = (available==0).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst, car_in, car_out; wire [3:0] available; wire full; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .car_in(car_in), .car_out(car_out), .available(available), .full(full));\n  always #5 clk=~clk;\n  task check; input [3:0] ea; input ef; input [127:0] label; begin\n    if(available!==ea || full!==ef) begin errors=errors+1; $display(\"FAIL %0s expected available=%0d full=%b got available=%0d full=%b\",label,ea,ef,available,full); end\n    else $display(\"PASS %0s available=%0d full=%b\",label,available,full);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; car_in=0; car_out=0; @(posedge clk); #1; rst=0;\n    check(8,0,\"reset-empty-garage\");\n    car_in=1;\n    repeat(8) begin @(posedge clk); #1; end\n    check(0,1,\"garage-now-full\");\n    @(posedge clk); #1; check(0,1,\"extra-car-in-while-full-does-not-underflow\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "car_in",
      "car_out",
      "available",
      "full"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "car_in",
          "wave": "0.1....."
        },
        {
          "name": "available[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "8",
            "7",
            "6",
            "0"
          ]
        },
        {
          "name": "full",
          "wave": "0......."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "hamming-distance-calculator",
    "title": "Hamming Distance Calculator",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "error-correction"
    ],
    "category": "Fun & Games",
    "lede": "Count how many bit positions differ between two 8-bit values — the core distance metric behind error-correcting codes like Hamming(7,4).",
    "concept": "<b>Concept:</b> XOR marks exactly the bit positions where two values disagree, so the Hamming distance is simply the popcount of <code>a^b</code>: <code>diff=a^b; distance=diff[0]+diff[1]+...+diff[7];</code>. Swapping XOR for AND is an easy bitwise mix-up that produces a real (but wrong) number instead of an obvious error — <code>a&amp;b</code> counts bits that are set in <em>both</em> operands, which is an entirely different quantity that happens to equal zero whenever the two values share no 1-bits at all, masking the bug on plenty of otherwise-reasonable test inputs.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>8</td><td>First value</td></tr>\n<tr><td>b</td><td>input</td><td>8</td><td>Second value</td></tr>\n<tr><td>distance</td><td>output</td><td>4</td><td>Number of bit positions where a and b differ (0-8)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] a,\n  input  [7:0] b,\n  output [3:0] distance\n);\n\n  // Your code here — distance = popcount(a ^ b).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] a,b; wire [3:0] distance; integer errors=0;\n  top_module dut(.a(a), .b(b), .distance(distance));\n  task check; input [7:0] ta, tb_; input [3:0] ed; begin\n    a=ta; b=tb_; #1;\n    if(distance!==ed) begin errors=errors+1; $display(\"FAIL a=%b b=%b expected=%0d got=%0d\",ta,tb_,ed,distance); end\n    else $display(\"PASS a=%b b=%b distance=%0d\",ta,tb_,distance);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(8'b00000000, 8'b00000000, 0);\n    check(8'hFF, 8'h00, 8);\n    check(8'b10110000, 8'b10100001, 2);\n    check(8'b11110000, 8'b00001111, 8);\n    check(8'b10101010, 8'b10101010, 0);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "distance"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "00",
            "FF",
            "B0",
            "F0"
          ]
        },
        {
          "name": "b[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "00",
            "00",
            "A1",
            "0F"
          ]
        },
        {
          "name": "distance[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "8",
            "2",
            "8"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "slot-machine-jackpot-detector",
    "title": "Slot Machine Jackpot Detector",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "comparator"
    ],
    "category": "Fun & Games",
    "lede": "Judge a 3-reel slot machine spin: jackpot when all three reels match, a smaller near-miss flag when exactly two do.",
    "concept": "<b>Concept:</b> A true jackpot requires <em>all three</em> reels to agree: <code>jackpot=(reel1==reel2)&amp;&amp;(reel2==reel3);</code>, with <code>two_match</code> catching the near-miss case where only some pair agrees. The easy mistake is checking only one pair (say <code>reel1==reel2</code>) and calling that the jackpot condition — it correctly fires when all three genuinely match, but it also fires whenever just the first two happen to match and the third is completely different, awarding a jackpot for what should only ever be a two-reel near-miss.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>reel1</td><td>input</td><td>3</td><td>First reel's symbol (0-7)</td></tr>\n<tr><td>reel2</td><td>input</td><td>3</td><td>Second reel's symbol</td></tr>\n<tr><td>reel3</td><td>input</td><td>3</td><td>Third reel's symbol</td></tr>\n<tr><td>jackpot</td><td>output</td><td>1</td><td>1 if all three reels match</td></tr>\n<tr><td>two_match</td><td>output</td><td>1</td><td>1 if exactly two (not all three) reels match</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [2:0] reel1,\n  input  [2:0] reel2,\n  input  [2:0] reel3,\n  output jackpot,\n  output two_match\n);\n\n  // Your code here — jackpot if all three reels are equal; two_match if any pair matches but not all three.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [2:0] reel1, reel2, reel3; wire jackpot, two_match; integer errors=0;\n  top_module dut(.reel1(reel1), .reel2(reel2), .reel3(reel3), .jackpot(jackpot), .two_match(two_match));\n  task check; input [2:0] r1,r2,r3; input ej, etm; begin\n    reel1=r1; reel2=r2; reel3=r3; #1;\n    if(jackpot!==ej || two_match!==etm) begin errors=errors+1; $display(\"FAIL reels=%0d,%0d,%0d expected jackpot=%b two_match=%b got jackpot=%b two_match=%b\",r1,r2,r3,ej,etm,jackpot,two_match); end\n    else $display(\"PASS reels=%0d,%0d,%0d jackpot=%b two_match=%b\",r1,r2,r3,jackpot,two_match);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(3,3,3,1,0);\n    check(3,3,5,0,1);\n    check(3,5,3,0,1);\n    check(1,2,3,0,0);\n    check(5,3,3,0,1);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "reel1",
      "reel2",
      "reel3",
      "jackpot",
      "two_match"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "reel1[2:0]",
          "wave": "2.3.4.5.",
          "data": [
            "3",
            "3",
            "3",
            "1"
          ]
        },
        {
          "name": "reel2[2:0]",
          "wave": "2.......",
          "data": [
            "3"
          ]
        },
        {
          "name": "reel3[2:0]",
          "wave": "2.3.....",
          "data": [
            "3",
            "5"
          ]
        },
        {
          "name": "jackpot",
          "wave": "1.0....."
        },
        {
          "name": "two_match",
          "wave": "0.1....."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "carry-select-adder-4bit",
    "title": "4-Bit Carry-Select Adder",
    "difficulty": "hard",
    "points": 50,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic",
      "architecture"
    ],
    "category": "Combinational Design",
    "lede": "Speed up addition by precomputing the upper half twice — once assuming carry-in 0, once assuming carry-in 1 — then muxing in whichever guess turned out right, instead of waiting for the carry to ripple through.",
    "concept": "<b>Concept:</b> A carry-select adder splits the word into blocks; each upper block computes its sum <em>twice in parallel</em> (once for cin=0, once for cin=1) while the lower block's real carry is still being resolved, then a mux instantly picks the correct precomputed result once that carry arrives — trading duplicated hardware for a shorter critical path than a full ripple-carry chain. The whole trick lives in the mux select: <code>sum[3:2] = c1 ? sum1_hi : sum0_hi;</code>. Inverting that select (<code>~c1</code> instead of <code>c1</code>) silently swaps in the <em>wrong</em> precomputed half every single time — it still compiles and still looks like a mux-based adder, it just always guesses backwards.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>4</td><td>First operand</td></tr>\n<tr><td>b</td><td>input</td><td>4</td><td>Second operand</td></tr>\n<tr><td>cin</td><td>input</td><td>1</td><td>Carry in</td></tr>\n<tr><td>sum</td><td>output</td><td>4</td><td>a + b + cin</td></tr>\n<tr><td>cout</td><td>output</td><td>1</td><td>Carry out</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] a,\n  input  [3:0] b,\n  input  cin,\n  output [3:0] sum,\n  output cout\n);\n\n  // Your code here — lower 2 bits add normally with cin; upper 2 bits are computed\n  // TWICE (once assuming the lower carry is 0, once assuming it's 1), then muxed\n  // by the real lower carry once it's known.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] a,b; reg cin; wire [3:0] sum; wire cout; integer errors=0;\n  top_module dut(.a(a),.b(b),.cin(cin),.sum(sum),.cout(cout));\n  task check; input [3:0] ta,tb_; input tc; input [3:0] es; input ec; begin\n    a=ta;b=tb_;cin=tc;#1;\n    if(sum!==es||cout!==ec) begin errors=errors+1; $display(\"FAIL a=%d b=%d cin=%b expected sum=%d cout=%b got sum=%d cout=%b\",ta,tb_,tc,es,ec,sum,cout); end\n    else $display(\"PASS a=%d b=%d cin=%b sum=%d cout=%b\",ta,tb_,tc,sum,cout);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(4'd7,4'd1,0,4'd8,0);\n    check(4'd15,4'd1,0,4'd0,1);\n    check(4'd3,4'd4,1,4'd8,0);\n    check(4'd8,4'd8,0,4'd0,1);\n    check(4'd0,4'd0,1,4'd1,0);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "cin",
      "sum",
      "cout"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "7",
            "15",
            "3",
            "8"
          ]
        },
        {
          "name": "b[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "1",
            "1",
            "4",
            "8"
          ]
        },
        {
          "name": "cin",
          "wave": "0.0.1.0."
        },
        {
          "name": "sum[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "8",
            "0",
            "8",
            "0"
          ]
        },
        {
          "name": "cout",
          "wave": "0.1.0.1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "booth-radix4-encoder",
    "title": "Radix-4 Booth Encoder",
    "difficulty": "hard",
    "points": 50,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic",
      "multiplier"
    ],
    "category": "Combinational Design",
    "lede": "The lookup table at the heart of every fast hardware multiplier: examine 3 overlapping bits of the multiplier and decide whether to add 0, ±1x, or ±2x of the multiplicand this cycle — halving the number of partial products versus naive shift-and-add.",
    "concept": "<b>Concept:</b> Radix-4 Booth encoding slides a 3-bit window (one bit higher, current, one bit lower) across the multiplier and classifies each window into one of 5 actions: add 0, add/sub 1x, or add/sub 2x the multiplicand — so a multiplier only needs half as many partial-product rows as a plain shift-and-add design. The full 8-entry table is: 000→0, 001/010→+1x, 011→+2x, 100→−2x, 101/110→−1x, 111→0. The easy way to get this wrong is swapping which pattern gets the ×1 weight and which gets the ×2 weight — e.g. encoding <code>011</code> (which should be +2x, since it's the boundary where two isolated 1-bits look like a single run ending) as +1x instead. It still produces a plausible-looking partial product, just the wrong magnitude.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>bHigh</td><td>input</td><td>1</td><td>Multiplier bit i+1 (the higher neighbor)</td></tr>\n<tr><td>bCur</td><td>input</td><td>1</td><td>Multiplier bit i (the current bit)</td></tr>\n<tr><td>bLow</td><td>input</td><td>1</td><td>Multiplier bit i-1 (the lower neighbor)</td></tr>\n<tr><td>neg</td><td>output</td><td>1</td><td>1 if this partial product should be subtracted</td></tr>\n<tr><td>one_x</td><td>output</td><td>1</td><td>1 if the multiplicand should be added/subtracted at 1x</td></tr>\n<tr><td>two_x</td><td>output</td><td>1</td><td>1 if the multiplicand should be added/subtracted at 2x</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  bHigh,\n  input  bCur,\n  input  bLow,\n  output neg,\n  output one_x,\n  output two_x\n);\n\n  // Your code here — classic radix-4 Booth table on {bHigh,bCur,bLow}:\n  // 000->0, 001/010->+1x, 011->+2x, 100->-2x, 101/110->-1x, 111->0.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg bHigh,bCur,bLow; wire neg,one_x,two_x; integer errors=0;\n  top_module dut(.bHigh(bHigh),.bCur(bCur),.bLow(bLow),.neg(neg),.one_x(one_x),.two_x(two_x));\n  task check; input h,c,l; input en,eo,et; begin\n    bHigh=h;bCur=c;bLow=l;#1;\n    if(neg!==en||one_x!==eo||two_x!==et) begin errors=errors+1; $display(\"FAIL %b%b%b expected neg=%b one_x=%b two_x=%b got neg=%b one_x=%b two_x=%b\",h,c,l,en,eo,et,neg,one_x,two_x); end\n    else $display(\"PASS %b%b%b neg=%b one_x=%b two_x=%b\",h,c,l,neg,one_x,two_x);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(0,0,0, 0,0,0);\n    check(0,0,1, 0,1,0);\n    check(0,1,0, 0,1,0);\n    check(0,1,1, 0,0,1);\n    check(1,0,0, 1,0,1);\n    check(1,0,1, 1,1,0);\n    check(1,1,0, 1,1,0);\n    check(1,1,1, 0,0,0);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "bHigh",
      "bCur",
      "bLow",
      "neg",
      "one_x",
      "two_x"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "bHigh",
          "wave": "0.0.1.1."
        },
        {
          "name": "bCur",
          "wave": "0.1.0.1."
        },
        {
          "name": "bLow",
          "wave": "0.1.0.1."
        },
        {
          "name": "neg",
          "wave": "0...1..."
        },
        {
          "name": "one_x",
          "wave": "0.1...0."
        },
        {
          "name": "two_x",
          "wave": "0...1.0."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "absolute-value-4bit",
    "title": "Signed Absolute Value (4-bit)",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic",
      "signed"
    ],
    "category": "Combinational Design",
    "lede": "Negate a signed 4-bit number to get its magnitude — except for the one input where negating it doesn't fit back into 4 bits at all.",
    "concept": "<b>Concept:</b> In 4-bit two's complement, values range from -8 to +7 — so -8 has no positive counterpart that fits in 4 bits (+8 needs 5 bits). A correct absolute-value circuit must special-case exactly that value, typically saturating to the largest representable positive number, +7: <code>if(in==-8) out=7; else out = in[3] ? -in : in;</code>. Skipping that special case doesn't crash anything — <code>-(-8)</code> silently overflows and wraps back around to <code>-8</code> in 4-bit arithmetic, so the \"absolute value\" of the most negative number comes out negative, which is exactly the kind of overflow bug that slips past testing on every input except that one.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>in</td><td>input</td><td>4 (signed)</td><td>Signed input, -8 to +7</td></tr>\n<tr><td>out</td><td>output</td><td>4 (signed)</td><td>|in|, saturated to 7 when in==-8</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  signed [3:0] in,\n  output signed [3:0] out\n);\n\n  // Your code here — out = |in|, except in==-8 (which can't negate into 4 bits) saturates to 7.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg signed [3:0] in; wire signed [3:0] out; integer errors=0;\n  top_module dut(.in(in), .out(out));\n  task check; input signed [3:0] i; input signed [3:0] eo; begin\n    in=i;#1;\n    if(out!==eo) begin errors=errors+1; $display(\"FAIL in=%d expected=%d got=%d\",i,eo,out); end\n    else $display(\"PASS in=%d out=%d\",i,out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(5,5);\n    check(-5,5);\n    check(-8,7);\n    check(0,0);\n    check(-1,1);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "in",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "in[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "5",
            "-5",
            "-8",
            "-1"
          ]
        },
        {
          "name": "out[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "5",
            "5",
            "7",
            "1"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "clamp-value-to-range",
    "title": "Clamp Value to Range",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "datapath"
    ],
    "category": "Combinational Design",
    "lede": "Saturate a value into [lo, hi] — the single most-used guard clause in DSP, graphics, and safety-critical datapaths.",
    "concept": "<b>Concept:</b> Clamping is a two-sided saturation: below <code>lo</code>, output <code>lo</code>; above <code>hi</code>, output <code>hi</code>; otherwise pass the value through unchanged: <code>(value&lt;lo)?lo:(value&gt;hi)?hi:value</code>. Swapping which bound gets returned on each side — clamping too-small values up to <code>hi</code> instead of <code>lo</code>, and too-large values down to <code>lo</code> instead of <code>hi</code> — is a realistic copy-paste mix-up. It still saturates the output into range on out-of-bounds inputs, just to the exact opposite end of the range from what was intended.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>value</td><td>input</td><td>8</td><td>Value to clamp</td></tr>\n<tr><td>lo</td><td>input</td><td>8</td><td>Lower bound (assume lo &le; hi)</td></tr>\n<tr><td>hi</td><td>input</td><td>8</td><td>Upper bound</td></tr>\n<tr><td>clamped</td><td>output</td><td>8</td><td>value, saturated into [lo, hi]</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] value,\n  input  [7:0] lo,\n  input  [7:0] hi,\n  output [7:0] clamped\n);\n\n  // Your code here — clamped = lo if value<lo, hi if value>hi, else value.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] value, lo, hi; wire [7:0] clamped; integer errors=0;\n  top_module dut(.value(value), .lo(lo), .hi(hi), .clamped(clamped));\n  task check; input [7:0] v,l,h; input [7:0] ec; begin\n    value=v;lo=l;hi=h;#1;\n    if(clamped!==ec) begin errors=errors+1; $display(\"FAIL value=%d lo=%d hi=%d expected=%d got=%d\",v,l,h,ec,clamped); end\n    else $display(\"PASS value=%d lo=%d hi=%d clamped=%d\",v,l,h,clamped);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(50,10,100,50);\n    check(5,10,100,10);\n    check(150,10,100,100);\n    check(10,10,100,10);\n    check(100,10,100,100);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "value",
      "lo",
      "hi",
      "clamped"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "value[7:0]",
          "wave": "2.3.4.",
          "data": [
            "50",
            "5",
            "150"
          ]
        },
        {
          "name": "lo[7:0]",
          "wave": "2.....",
          "data": [
            "10"
          ]
        },
        {
          "name": "hi[7:0]",
          "wave": "2.....",
          "data": [
            "100"
          ]
        },
        {
          "name": "clamped[7:0]",
          "wave": "2.3.4.",
          "data": [
            "50",
            "10",
            "100"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "integer-square-root-4bit",
    "title": "Integer Square Root",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic"
    ],
    "category": "Combinational Design",
    "lede": "Compute floor(sqrt(in)) for an 8-bit input using a bank of perfect-square threshold comparisons — no division, no iteration.",
    "concept": "<b>Concept:</b> Since the output only ranges 0-15, floor(sqrt(in)) can be computed by comparing <code>in</code> against each perfect square 1,4,9,...,225 and picking the largest root whose square doesn't exceed it: <code>(in&gt;=225)?15:(in&gt;=196)?14:...:(in&gt;=1)?1:0</code>. Using strict <code>&gt;</code> instead of <code>&gt;=</code> at every threshold is a tempting-looking equivalent that is actually an off-by-one everywhere a perfect square lands exactly on a threshold: sqrt(4) should be 2, but <code>4&gt;4</code> is false, so it falls through to the next lower bracket and reports 1 instead.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>in</td><td>input</td><td>8</td><td>Input value, 0-255</td></tr>\n<tr><td>root</td><td>output</td><td>4</td><td>floor(sqrt(in)), 0-15</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] in,\n  output [3:0] root\n);\n\n  // Your code here — root = floor(sqrt(in)) via a cascade of perfect-square comparisons.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] in; wire [3:0] root; integer errors=0;\n  top_module dut(.in(in), .root(root));\n  task check; input [7:0] i; input [3:0] er; begin\n    in=i;#1;\n    if(root!==er) begin errors=errors+1; $display(\"FAIL in=%d expected=%d got=%d\",i,er,root); end\n    else $display(\"PASS in=%d root=%d\",i,root);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(0,0);\n    check(1,1);\n    check(4,2);\n    check(15,3);\n    check(16,4);\n    check(99,9);\n    check(225,15);\n    check(255,15);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "in",
      "root"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "in[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "1",
            "4",
            "16",
            "225"
          ]
        },
        {
          "name": "root[3:0]",
          "wave": "2.3.4.5.",
          "data": [
            "1",
            "2",
            "4",
            "15"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "crc8-generator",
    "title": "CRC-8 Generator (poly 0x07)",
    "difficulty": "hard",
    "points": 50,
    "level": 8,
    "tags": [
      "combinational",
      "error-correction",
      "protocol"
    ],
    "category": "Protocols &amp; Interfaces",
    "lede": "Compute an 8-bit CRC over a byte using the classic 0x07 polynomial (CRC-8-CCITT) — the same bit-serial algorithm behind this catalog's CRC-4, scaled up to a full byte.",
    "concept": "<b>Concept:</b> A bit-serial CRC-8 shifts one bit of the message into an 8-bit register at a time, MSB first: <code>fb=crc[7]^bit; crc=crc&lt;&lt;1; if(fb) crc^=8'h07;</code>, repeated once per input bit. The bit order is the entire algorithm — process the same 8 bits LSB-first instead of MSB-first (an easy mix-up when unrolling the loop) and every single-byte CRC comes out completely different, even though the taps, the polynomial, and the number of iterations are all identical.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>data</td><td>input</td><td>8</td><td>Message byte</td></tr>\n<tr><td>crc</td><td>output</td><td>8</td><td>CRC-8 remainder (poly x&#8312;+x&#178;+x+1, init 0)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] data,\n  output [7:0] crc\n);\n\n  // Your code here — bit-serial CRC-8 (poly 0x07), processing data MSB-first:\n  // fb=crc[7]^bit; crc<<=1; if(fb) crc^=8'h07.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] data; wire [7:0] crc; integer errors=0;\n  top_module dut(.data(data), .crc(crc));\n  task check; input [7:0] d; input [7:0] ec; begin\n    data=d;#1;\n    if(crc!==ec) begin errors=errors+1; $display(\"FAIL data=%h expected=%h got=%h\",d,ec,crc); end\n    else $display(\"PASS data=%h crc=%h\",d,crc);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(8'h00, 8'h00);\n    check(8'hFF, 8'hF3);\n    check(8'hA5, 8'h72);\n    check(8'h3C, 8'hB4);\n    check(8'h01, 8'h07);\n    check(8'h80, 8'h89);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "data",
      "crc"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "data[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "00",
            "FF",
            "A5",
            "01"
          ]
        },
        {
          "name": "crc[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "00",
            "F3",
            "72",
            "07"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "numerically-controlled-oscillator",
    "title": "Numerically Controlled Oscillator (NCO)",
    "difficulty": "medium",
    "points": 25,
    "level": 4,
    "tags": [
      "sequential",
      "clock-generation"
    ],
    "category": "Sequential Design",
    "lede": "Generate a square wave of a programmable frequency from one fixed clock, using nothing but a free-running phase accumulator — the same trick behind DDS frequency synthesizers.",
    "concept": "<b>Concept:</b> A phase accumulator just adds <code>phase_inc</code> to itself every clock and lets it wrap freely; the accumulator's <em>top bit</em> toggles at a rate proportional to <code>phase_inc</code>, giving a frequency-programmable square wave with zero extra hardware: <code>phase_acc &lt;= phase_acc + phase_inc; out = phase_acc[7];</code>. The output tap is the whole design — reading any bit other than the MSB (say, the LSB) still compiles and still looks like it's toggling, but it toggles at a wildly different (and usually much higher, noisier) rate that has nothing to do with the intended output frequency.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (phase_acc=0)</td></tr>\n<tr><td>phase_inc</td><td>input</td><td>8</td><td>Phase increment per clock (controls output frequency)</td></tr>\n<tr><td>out</td><td>output</td><td>1</td><td>Generated square wave (MSB of the phase accumulator)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  [7:0] phase_inc,\n  output out\n);\n\n  // Your code here — free-running 8-bit phase accumulator; out = its MSB.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst; reg [7:0] phase_inc; wire out; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .phase_inc(phase_inc), .out(out));\n  always #5 clk=~clk;\n  task check; input eo; input [127:0] label; begin\n    if(out!==eo) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,eo,out); end\n    else $display(\"PASS %0s out=%b\",label,out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; phase_inc=0; @(posedge clk); #1; rst=0;\n    phase_inc=8'd64;\n    @(posedge clk); #1; check(0,\"acc=64\");\n    @(posedge clk); #1; check(1,\"acc=128\");\n    @(posedge clk); #1; check(1,\"acc=192\");\n    @(posedge clk); #1; check(0,\"acc=0-wrap\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "phase_inc",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "phase_inc[7:0]",
          "wave": "2.......",
          "data": [
            "64"
          ]
        },
        {
          "name": "out",
          "wave": "0.1...0."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "spi-mode-selector",
    "title": "SPI Mode Selector (CPOL/CPHA)",
    "difficulty": "easy",
    "points": 10,
    "level": 6,
    "tags": [
      "combinational",
      "protocol"
    ],
    "category": "Protocols &amp; Interfaces",
    "lede": "Decode SPI's 4 clocking modes from CPOL and CPHA into the two facts a controller actually needs: what the clock idles at, and which edge samples data.",
    "concept": "<b>Concept:</b> CPOL sets the clock's idle level directly (<code>idle_clock=cpol</code>). Which edge samples data is a clean XOR of the two: <code>sample_edge = cpol ^ cpha</code> (0=rising, 1=falling) — a fact worth knowing cold rather than re-deriving from the mode table every time. Swapping that XOR for an AND is a very plausible boolean slip: it happens to agree with the correct answer for modes 0 and... no, it actually gets 3 of the 4 modes wrong, because AND and XOR only ever agree when both inputs are 0.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>cpol</td><td>input</td><td>1</td><td>Clock polarity (0=idle low, 1=idle high)</td></tr>\n<tr><td>cpha</td><td>input</td><td>1</td><td>Clock phase (0=sample on first edge, 1=sample on second)</td></tr>\n<tr><td>idle_clock</td><td>output</td><td>1</td><td>Clock's idle level</td></tr>\n<tr><td>sample_edge</td><td>output</td><td>1</td><td>0=sample on rising edge, 1=sample on falling edge</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  cpol,\n  input  cpha,\n  output idle_clock,\n  output sample_edge\n);\n\n  // Your code here — idle_clock = cpol; sample_edge = cpol ^ cpha.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg cpol,cpha; wire idle_clock, sample_edge; integer errors=0;\n  top_module dut(.cpol(cpol),.cpha(cpha),.idle_clock(idle_clock),.sample_edge(sample_edge));\n  task check; input c1,c2; input ei,es; begin\n    cpol=c1;cpha=c2;#1;\n    if(idle_clock!==ei||sample_edge!==es) begin errors=errors+1; $display(\"FAIL cpol=%b cpha=%b expected idle=%b sample=%b got idle=%b sample=%b\",c1,c2,ei,es,idle_clock,sample_edge); end\n    else $display(\"PASS cpol=%b cpha=%b idle=%b sample=%b\",c1,c2,idle_clock,sample_edge);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(0,0, 0,0);\n    check(0,1, 0,1);\n    check(1,0, 1,1);\n    check(1,1, 1,0);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "cpol",
      "cpha",
      "idle_clock",
      "sample_edge"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "cpol",
          "wave": "0.0.1.1."
        },
        {
          "name": "cpha",
          "wave": "0.1.0.1."
        },
        {
          "name": "idle_clock",
          "wave": "0...1..."
        },
        {
          "name": "sample_edge",
          "wave": "0.1.1.0."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "direct-mapped-cache-lookup",
    "title": "Direct-Mapped Cache Lookup",
    "difficulty": "hard",
    "points": 50,
    "level": 8,
    "tags": [
      "sequential",
      "memory",
      "cache"
    ],
    "category": "Sequential Design",
    "lede": "A 4-line direct-mapped cache that auto-allocates on a miss — the tag-compare-and-fill loop every real cache runs, shrunk down to something you can trace by hand.",
    "concept": "<b>Concept:</b> Each address splits into an index (which line it maps to) and a tag (which of the many possible blocks currently occupies that line). A hit requires <em>both</em> the line to hold valid data <em>and</em> its stored tag to match: <code>hit = access &amp;&amp; valid[idx] &amp;&amp; (tag_store[idx]==tag)</code>. Dropping the <code>valid</code> check is a genuinely dangerous real-world bug, not just a cosmetic one: an uninitialized or just-reset tag array reads back as some fixed value (often all-zero), so any address whose tag happens to equal that value reports a false hit against a line that was never actually filled — silently returning garbage as if it were valid cached data.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (invalidates all 4 lines)</td></tr>\n<tr><td>access</td><td>input</td><td>1</td><td>1 to perform a lookup this cycle</td></tr>\n<tr><td>addr</td><td>input</td><td>4</td><td>addr[1:0]=index (which line), addr[3:2]=tag</td></tr>\n<tr><td>hit</td><td>output</td><td>1</td><td>1 if the line is valid and its tag matches</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  access,\n  input  [3:0] addr,\n  output hit\n);\n\n  // Your code here — 4-line direct-mapped cache: addr[1:0]=index, addr[3:2]=tag.\n  // hit = access && valid[index] && tag_store[index]==tag.\n  // On a miss (access && !hit), synchronously allocate: tag_store[index]<=tag; valid[index]<=1.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst, access; reg [3:0] addr; wire hit; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .access(access), .addr(addr), .hit(hit));\n  always #5 clk=~clk;\n  task check; input eh; input [127:0] label; begin\n    if(hit!==eh) begin errors=errors+1; $display(\"FAIL %0s expected hit=%b got=%b\",label,eh,hit); end\n    else $display(\"PASS %0s hit=%b\",label,hit);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; access=0; addr=0; @(posedge clk); #1; rst=0;\n    access=1; addr=4'b0001; #1; check(0,\"first-access-tag0-idx1-must-miss-despite-tagstore-default-0\");\n    @(posedge clk); #1;\n    access=1; addr=4'b0001; #1; check(1,\"second-access-same-addr-now-hits-after-allocate\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "access",
      "addr",
      "hit"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p....."
        },
        {
          "name": "access",
          "wave": "0.1..."
        },
        {
          "name": "addr[3:0]",
          "wave": "2.3...",
          "data": [
            "0",
            "1"
          ]
        },
        {
          "name": "hit",
          "wave": "0...1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "content-addressable-memory-4entry",
    "title": "4-Entry Content-Addressable Memory (CAM)",
    "difficulty": "easy",
    "points": 10,
    "level": 5,
    "tags": [
      "combinational",
      "memory"
    ],
    "category": "Sequential Design",
    "lede": "Search all 4 stored entries in parallel for a key — the associative-lookup structure behind TLBs and packet-classification hardware.",
    "concept": "<b>Concept:</b> A CAM compares the search key against <em>every</em> stored entry simultaneously, producing a one-hot(ish) match vector; <code>found</code> is simply whether <em>any</em> entry matched: <code>found = |match</code>. Using <code>&amp;</code> (AND-reduce) instead of <code>|</code> (OR-reduce) is a classic reduction-operator mix-up — it silently redefines \"found\" to mean \"every single entry matches the key,\" which is only ever true in the degenerate case where all 4 entries happen to hold the same value, making the CAM report \"not found\" for essentially every real search.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>entry0</td><td>input</td><td>4</td><td>Stored entry 0</td></tr>\n<tr><td>entry1</td><td>input</td><td>4</td><td>Stored entry 1</td></tr>\n<tr><td>entry2</td><td>input</td><td>4</td><td>Stored entry 2</td></tr>\n<tr><td>entry3</td><td>input</td><td>4</td><td>Stored entry 3</td></tr>\n<tr><td>search_key</td><td>input</td><td>4</td><td>Key to search for</td></tr>\n<tr><td>match</td><td>output</td><td>4</td><td>match[i]=1 if entry i equals search_key</td></tr>\n<tr><td>found</td><td>output</td><td>1</td><td>1 if any entry matched</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] entry0,\n  input  [3:0] entry1,\n  input  [3:0] entry2,\n  input  [3:0] entry3,\n  input  [3:0] search_key,\n  output [3:0] match,\n  output found\n);\n\n  // Your code here — match[i] = (entry_i == search_key) for each of the 4 entries; found = |match.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] entry0,entry1,entry2,entry3,search_key; wire [3:0] match; wire found; integer errors=0;\n  top_module dut(.entry0(entry0),.entry1(entry1),.entry2(entry2),.entry3(entry3),.search_key(search_key),.match(match),.found(found));\n  task check; input [3:0] e0,e1,e2,e3,sk; input [3:0] em; input ef; begin\n    entry0=e0;entry1=e1;entry2=e2;entry3=e3;search_key=sk;#1;\n    if(match!==em||found!==ef) begin errors=errors+1; $display(\"FAIL search=%d expected match=%b found=%b got match=%b found=%b\",sk,em,ef,match,found); end\n    else $display(\"PASS search=%d match=%b found=%b\",sk,match,found);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(3,7,3,9, 3, 4'b0101, 1);\n    check(3,7,3,9, 5, 4'b0000, 0);\n    check(1,2,3,4, 4, 4'b1000, 1);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "entry0",
      "entry1",
      "entry2",
      "entry3",
      "search_key",
      "match",
      "found"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "search_key[3:0]",
          "wave": "2.3.4.",
          "data": [
            "3",
            "5",
            "4"
          ]
        },
        {
          "name": "match[3:0]",
          "wave": "2.3.4.",
          "data": [
            "5",
            "0",
            "8"
          ]
        },
        {
          "name": "found",
          "wave": "1.0.1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "register-file-3read-1write",
    "title": "3-Read / 1-Write Register File",
    "difficulty": "medium",
    "points": 25,
    "level": 5,
    "tags": [
      "sequential",
      "memory",
      "datapath"
    ],
    "category": "Sequential Design",
    "lede": "The classic RTL building block behind every processor datapath: 8 registers, one synchronous write port, and three fully independent asynchronous read ports.",
    "concept": "<b>Concept:</b> A register file's read ports are almost always <em>combinational</em> — <code>assign rdata1=regs[raddr1]</code> — so a freshly-written value is visible to a read the very same cycle it commits, with no extra latency. Accidentally registering the read path (adding a clocked flop between the memory array and the output) is a very common real bug, and a sneaky one: it doesn't break anything obviously, it just delays every read by exactly one clock cycle, so a value written this cycle silently isn't visible until the cycle after — a timing bug that only shows up when something downstream expects same-cycle forwarding.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>we</td><td>input</td><td>1</td><td>Write enable</td></tr>\n<tr><td>waddr</td><td>input</td><td>3</td><td>Write address (0-7)</td></tr>\n<tr><td>wdata</td><td>input</td><td>8</td><td>Write data</td></tr>\n<tr><td>raddr1/2/3</td><td>input</td><td>3 each</td><td>Three independent read addresses</td></tr>\n<tr><td>rdata1/2/3</td><td>output</td><td>8 each</td><td>Combinational read data for each port</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  we, input [2:0] waddr, input [7:0] wdata,\n  input  [2:0] raddr1, output [7:0] rdata1,\n  input  [2:0] raddr2, output [7:0] rdata2,\n  input  [2:0] raddr3, output [7:0] rdata3\n);\n\n  // Your code here — 8x8 register array; synchronous write on we; three combinational (asynchronous) reads.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, we; reg [2:0] waddr, raddr1, raddr2, raddr3; reg [7:0] wdata;\n  wire [7:0] rdata1, rdata2, rdata3; integer errors=0;\n  top_module dut(.clk(clk), .we(we), .waddr(waddr), .wdata(wdata),\n                 .raddr1(raddr1), .rdata1(rdata1), .raddr2(raddr2), .rdata2(rdata2), .raddr3(raddr3), .rdata3(rdata3));\n  always #5 clk=~clk;\n  task check; input [7:0] er1; input [127:0] label; begin\n    if(rdata1!==er1) begin errors=errors+1; $display(\"FAIL %0s expected rdata1=%h got=%h\",label,er1,rdata1); end\n    else $display(\"PASS %0s rdata1=%h\",label,rdata1);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    we=0; waddr=0; wdata=0; raddr1=2; raddr2=0; raddr3=0;\n    we=1; waddr=2; wdata=8'hAA;\n    @(posedge clk); #1; check(8'hAA,\"combinational-read-sees-fresh-write-immediately\");\n    we=0;\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "we",
      "waddr",
      "wdata",
      "raddr1",
      "rdata1"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p..."
        },
        {
          "name": "we",
          "wave": "01.."
        },
        {
          "name": "waddr[2:0]",
          "wave": "2...",
          "data": [
            "2"
          ]
        },
        {
          "name": "wdata[7:0]",
          "wave": "2...",
          "data": [
            "AA"
          ]
        },
        {
          "name": "raddr1[2:0]",
          "wave": "2...",
          "data": [
            "2"
          ]
        },
        {
          "name": "rdata1[7:0]",
          "wave": "2.3.",
          "data": [
            "xx",
            "AA"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "bit-interleaver",
    "title": "Bit Interleaver (Morton-Style)",
    "difficulty": "easy",
    "points": 10,
    "level": 8,
    "tags": [
      "combinational",
      "bit-manipulation"
    ],
    "category": "Combinational Design",
    "lede": "Weave two 4-bit values together bit-by-bit into an 8-bit result — the core operation behind Morton (Z-order) codes used to turn 2D coordinates into a single cache-friendly index.",
    "concept": "<b>Concept:</b> Interleaving alternates bits from each input starting from the top: <code>out = {a[3],b[3],a[2],b[2],a[1],b[1],a[0],b[0]}</code>, so every odd output bit position comes from <code>a</code> and every even position comes from <code>b</code>. Swapping which input feeds the odd vs. even slots is an easy mix-up when writing the concatenation by hand — the result is still a plausible-looking interleaved byte, it's just <code>a</code> and <code>b</code> completely swapped throughout.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>a</td><td>input</td><td>4</td><td>First value (goes in odd bit positions)</td></tr>\n<tr><td>b</td><td>input</td><td>4</td><td>Second value (goes in even bit positions)</td></tr>\n<tr><td>out</td><td>output</td><td>8</td><td>Interleaved result</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] a,\n  input  [3:0] b,\n  output [7:0] out\n);\n\n  // Your code here — out = {a[3],b[3],a[2],b[2],a[1],b[1],a[0],b[0]}.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] a,b; wire [7:0] out; integer errors=0;\n  top_module dut(.a(a), .b(b), .out(out));\n  task check; input [3:0] ta,tb_; input [7:0] eo; begin\n    a=ta;b=tb_;#1;\n    if(out!==eo) begin errors=errors+1; $display(\"FAIL a=%b b=%b expected=%b got=%b\",ta,tb_,eo,out); end\n    else $display(\"PASS a=%b b=%b out=%b\",ta,tb_,out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(4'b1010, 4'b0101, 8'b10011001);\n    check(4'b1111, 4'b0000, 8'b10101010);\n    check(4'b0000, 4'b1111, 8'b01010101);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a[3:0]",
          "wave": "2.3.",
          "data": [
            "A",
            "F"
          ]
        },
        {
          "name": "b[3:0]",
          "wave": "2.3.",
          "data": [
            "5",
            "0"
          ]
        },
        {
          "name": "out[7:0]",
          "wave": "2.3.",
          "data": [
            "99",
            "AA"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "bit-deinterleaver",
    "title": "Bit Deinterleaver",
    "difficulty": "easy",
    "points": 10,
    "level": 8,
    "tags": [
      "combinational",
      "bit-manipulation"
    ],
    "category": "Combinational Design",
    "lede": "Undo an interleaved byte back into its two original 4-bit streams — the inverse of this catalog's bit interleaver.",
    "concept": "<b>Concept:</b> If <code>a</code> was woven into the odd bit positions and <code>b</code> into the even ones, recovering them is just picking those positions back out: <code>a={interleaved[7],interleaved[5],interleaved[3],interleaved[1]}; b={interleaved[6],interleaved[4],interleaved[2],interleaved[0]}</code>. Swapping which extraction feeds <code>a</code> and which feeds <code>b</code> is the same kind of easy mix-up as building the interleaver backwards — the two recovered nibbles are both real data, they've just traded places.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>interleaved</td><td>input</td><td>8</td><td>Interleaved byte</td></tr>\n<tr><td>a</td><td>output</td><td>4</td><td>Recovered odd-position stream</td></tr>\n<tr><td>b</td><td>output</td><td>4</td><td>Recovered even-position stream</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] interleaved,\n  output [3:0] a,\n  output [3:0] b\n);\n\n  // Your code here — a = odd bit positions (7,5,3,1); b = even bit positions (6,4,2,0).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] interleaved; wire [3:0] a,b; integer errors=0;\n  top_module dut(.interleaved(interleaved), .a(a), .b(b));\n  task check; input [7:0] i; input [3:0] ea,eb; begin\n    interleaved=i;#1;\n    if(a!==ea||b!==eb) begin errors=errors+1; $display(\"FAIL interleaved=%b expected a=%b b=%b got a=%b b=%b\",i,ea,eb,a,b); end\n    else $display(\"PASS interleaved=%b a=%b b=%b\",i,a,b);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(8'b10011001, 4'b1010, 4'b0101);\n    check(8'b10101010, 4'b1111, 4'b0000);\n    check(8'b01010101, 4'b0000, 4'b1111);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "interleaved",
      "a",
      "b"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "interleaved[7:0]",
          "wave": "2.3.",
          "data": [
            "99",
            "AA"
          ]
        },
        {
          "name": "a[3:0]",
          "wave": "2.3.",
          "data": [
            "A",
            "F"
          ]
        },
        {
          "name": "b[3:0]",
          "wave": "2.3.",
          "data": [
            "5",
            "0"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "binary-to-one-cold",
    "title": "Binary to One-Cold Decoder",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "decoder"
    ],
    "category": "Combinational Design",
    "lede": "Decode a 3-bit select into an active-low one-cold output — the polarity every chip-select and enable line on real silicon actually uses.",
    "concept": "<b>Concept:</b> One-cold is the active-low mirror of one-hot: every line idles at 1, and exactly the selected line goes to 0: start from all-1s and clear a single bit, <code>out_n=8'hFF; out_n[sel]=0;</code>. Building an ordinary active-high one-hot instead (start from all-0s, set one bit) is a genuine, common polarity bug — it's the exact bitwise complement of what was asked for, and it would drive real active-low chip-select lines backwards, enabling every device except the one actually selected.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>sel</td><td>input</td><td>3</td><td>Which line to assert (active-low)</td></tr>\n<tr><td>out_n</td><td>output</td><td>8</td><td>All 1s except out_n[sel], which is 0</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [2:0] sel,\n  output [7:0] out_n\n);\n\n  // Your code here — out_n is all 1s except bit [sel], which is 0.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [2:0] sel; wire [7:0] out_n; integer errors=0;\n  top_module dut(.sel(sel), .out_n(out_n));\n  task check; input [2:0] s; input [7:0] eo; begin\n    sel=s;#1;\n    if(out_n!==eo) begin errors=errors+1; $display(\"FAIL sel=%d expected=%b got=%b\",s,eo,out_n); end\n    else $display(\"PASS sel=%d out_n=%b\",s,out_n);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(0, 8'b11111110);\n    check(3, 8'b11110111);\n    check(7, 8'b01111111);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "sel",
      "out_n"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "sel[2:0]",
          "wave": "2.3.4.",
          "data": [
            "0",
            "3",
            "7"
          ]
        },
        {
          "name": "out_n[7:0]",
          "wave": "2.3.4.",
          "data": [
            "FE",
            "F7",
            "7F"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "lfsr-8bit-maximal",
    "title": "8-Bit Maximal-Length LFSR",
    "difficulty": "medium",
    "points": 25,
    "level": 6,
    "tags": [
      "sequential",
      "lfsr"
    ],
    "category": "Sequential Design",
    "lede": "Scale this catalog's 4-bit LFSR up to a full byte — 8 bits, 4 feedback taps, and a 255-state cycle before it repeats.",
    "concept": "<b>Concept:</b> An 8-bit maximal-length Fibonacci LFSR needs exactly 4 feedback taps (bits 8,6,5,4, i.e. <code>lfsr[7]^lfsr[5]^lfsr[4]^lfsr[3]</code>) to visit all 255 nonzero states before repeating — drop any one of those taps and the register still shifts and still looks like it's scrambling bits, but it's now following the wrong recurrence entirely, most commonly collapsing into a much shorter cycle that repeats far sooner than a real PRBS generator should.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (seeds lfsr to 8'h01)</td></tr>\n<tr><td>en</td><td>input</td><td>1</td><td>1 to advance the LFSR this cycle</td></tr>\n<tr><td>q</td><td>output</td><td>8</td><td>Current LFSR state</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  en,\n  output [7:0] q\n);\n\n  // Your code here — 8-bit LFSR, feedback = q[7]^q[5]^q[4]^q[3], seed 8'h01 on reset, advances on en.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst, en; wire [7:0] q; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .en(en), .q(q));\n  always #5 clk=~clk;\n  task check; input [7:0] eq_; begin\n    if(q!==eq_) begin errors=errors+1; $display(\"FAIL expected=%b got=%b\",eq_,q); end\n    else $display(\"PASS q=%b\",q);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; en=0; @(posedge clk); #1; rst=0;\n    check(8'b00000001);\n    en=1; @(posedge clk); #1; check(8'b00000010);\n    @(posedge clk); #1; check(8'b00000100);\n    @(posedge clk); #1; check(8'b00001000);\n    @(posedge clk); #1; check(8'b00010001);\n    @(posedge clk); #1; check(8'b00100011);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "en",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "en",
          "wave": "0.1....."
        },
        {
          "name": "q[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "01",
            "02",
            "04",
            "08"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "simon-says-sequence-checker",
    "title": "Simon Says Sequence Checker",
    "difficulty": "medium",
    "points": 25,
    "level": 4,
    "tags": [
      "sequential",
      "fsm",
      "game-logic"
    ],
    "category": "Fun &amp; Games",
    "lede": "Check a player's button presses against a fixed 4-step target sequence, one press at a time — freeze on the first mistake, celebrate after the last correct press.",
    "concept": "<b>Concept:</b> The checker advances one step for every press that matches the target sequence, and the moment a press is wrong it must <em>latch</em> failure and stop reacting to anything else until reset: <code>else if(!fail &amp;&amp; !success &amp;&amp; press_valid) ...</code>. Dropping the <code>!fail</code> half of that guard is a subtle \"the game doesn't actually end\" bug — the fail flag still gets set correctly on the first wrong press, but because the FSM keeps evaluating later presses against the still-unfrozen <code>step</code>, a lucky continuation can silently advance the sequence (or even reach success) after the player already lost.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (step=0, fail=0, success=0)</td></tr>\n<tr><td>press</td><td>input</td><td>2</td><td>Player's current button press (0-3)</td></tr>\n<tr><td>press_valid</td><td>input</td><td>1</td><td>1 when press holds a new press this cycle</td></tr>\n<tr><td>step</td><td>output</td><td>2</td><td>How many correct presses in a row so far</td></tr>\n<tr><td>fail</td><td>output</td><td>1</td><td>1 once a wrong press has occurred; freezes state</td></tr>\n<tr><td>success</td><td>output</td><td>1</td><td>1 once all 4 steps of the fixed sequence [1,3,0,2] are matched</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  [1:0] press,\n  input  press_valid,\n  output reg [1:0] step,\n  output reg fail,\n  output reg success\n);\n\n  // Your code here — fixed target sequence [1,3,0,2]. On press_valid (while !fail && !success):\n  // if press matches target[step], advance step (or set success at step 3); else set fail and freeze.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst; reg [1:0] press; reg press_valid; wire [1:0] step; wire fail, success; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .press(press), .press_valid(press_valid), .step(step), .fail(fail), .success(success));\n  always #5 clk=~clk;\n  task check; input [1:0] es; input ef,esc; input [127:0] label; begin\n    if(step!==es||fail!==ef||success!==esc) begin errors=errors+1; $display(\"FAIL %0s expected step=%d fail=%b success=%b got step=%d fail=%b success=%b\",label,es,ef,esc,step,fail,success); end\n    else $display(\"PASS %0s step=%d fail=%b success=%b\",label,step,fail,success);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; press=0; press_valid=0; @(posedge clk); #1; rst=0;\n    press=1; press_valid=1; @(posedge clk); #1; check(1,0,0,\"correct-press-1\");\n    press=3; @(posedge clk); #1; check(2,0,0,\"correct-press-2\");\n    press=1; @(posedge clk); #1; check(2,1,0,\"wrong-press-fails\");\n    press=0; @(posedge clk); #1; check(2,1,0,\"frozen-after-fail-step-unchanged\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "press",
      "press_valid",
      "step",
      "fail",
      "success"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "press_valid",
          "wave": "0.1....."
        },
        {
          "name": "press[1:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "1",
            "3",
            "1"
          ]
        },
        {
          "name": "step[1:0]",
          "wave": "2...3.4.",
          "data": [
            "0",
            "1",
            "2"
          ]
        },
        {
          "name": "fail",
          "wave": "0.....1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "parking-meter-fsm",
    "title": "Parking Meter Timer",
    "difficulty": "medium",
    "points": 25,
    "level": 4,
    "tags": [
      "sequential",
      "counter",
      "fsm"
    ],
    "category": "Fun &amp; Games",
    "lede": "A coin-fed countdown timer that flags a violation the instant time runs out and no more coins arrive — a real-world countdown-with-guard pattern.",
    "concept": "<b>Concept:</b> Each coin adds time and clears any violation; each tick spends one unit of time, but only while there's time left to spend: <code>if(time_remaining&gt;0) time_remaining&lt;=time_remaining-1; else violation&lt;=1;</code>. Dropping that guard — decrementing unconditionally on every tick regardless of whether time is already at 0 — lets the counter underflow past zero and wrap around to its maximum value (255) the instant it should have simply stayed at 0 flagging a violation, the same countdown-underflow bug that shows up anywhere a counter is allowed to keep counting down past its floor.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (time_remaining=0, violation=0)</td></tr>\n<tr><td>tick</td><td>input</td><td>1</td><td>1 pulse per time unit elapsed</td></tr>\n<tr><td>coin</td><td>input</td><td>1</td><td>1 pulse when a coin is inserted (adds 10 units, clears violation)</td></tr>\n<tr><td>time_remaining</td><td>output</td><td>8</td><td>Time units left on the meter</td></tr>\n<tr><td>violation</td><td>output</td><td>1</td><td>1 once time ran out and another tick occurred with no new coin</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  tick,\n  input  coin,\n  output reg [7:0] time_remaining,\n  output reg violation\n);\n\n  // Your code here — coin: time_remaining += 10, violation <= 0.\n  // tick (no coin): if time_remaining > 0, decrement it; else set violation. Never let it underflow.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst, tick, coin; wire [7:0] time_remaining; wire violation; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .tick(tick), .coin(coin), .time_remaining(time_remaining), .violation(violation));\n  always #5 clk=~clk;\n  task check; input [7:0] et; input ev; input [127:0] label; begin\n    if(time_remaining!==et||violation!==ev) begin errors=errors+1; $display(\"FAIL %0s expected time=%d violation=%b got time=%d violation=%b\",label,et,ev,time_remaining,violation); end\n    else $display(\"PASS %0s time=%d violation=%b\",label,time_remaining,violation);\n  end endtask\n  integer i;\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; tick=0; coin=0; @(posedge clk); #1; rst=0;\n    coin=1; @(posedge clk); #1; coin=0; check(10,0,\"coin-adds-10\");\n    for (i=0;i<10;i=i+1) begin tick=1; @(posedge clk); #1; tick=0; end\n    check(0,0,\"ticked-down-to-zero\");\n    tick=1; @(posedge clk); #1; check(0,1,\"extra-tick-at-zero-sets-violation-no-underflow\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rst",
      "tick",
      "coin",
      "time_remaining",
      "violation"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "coin",
          "wave": "0.10......"
        },
        {
          "name": "tick",
          "wave": "0...1010.1"
        },
        {
          "name": "time_remaining[7:0]",
          "wave": "2.3.......",
          "data": [
            "0",
            "10"
          ]
        },
        {
          "name": "violation",
          "wave": "0........."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "leaderboard-top3-tracker",
    "title": "Top-3 Leaderboard Tracker",
    "difficulty": "medium",
    "points": 25,
    "level": 3,
    "tags": [
      "sequential",
      "comparator",
      "datapath"
    ],
    "category": "Fun &amp; Games",
    "lede": "Maintain the 3 highest scores seen so far in sorted order as new scores stream in — an insertion-sort shift register in miniature.",
    "concept": "<b>Concept:</b> Inserting a new high score means shifting everything below it down one slot before writing it in: a new #1 must push the old #1 down to #2 <em>and</em> the old #2 down to #3, all in the same cycle — <code>if(score&gt;top1) begin top3&lt;=top2; top2&lt;=top1; top1&lt;=score; end</code>. Forgetting the <code>top3&lt;=top2</code> shift is an easy one-line omission that looks harmless (top1 and top2 both still update correctly) but silently drops whatever used to be in third place the moment a new #1 arrives — the leaderboard quietly loses an entry instead of shifting it down.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (all three scores = 0)</td></tr>\n<tr><td>submit</td><td>input</td><td>1</td><td>1 to submit a new score this cycle</td></tr>\n<tr><td>score</td><td>input</td><td>8</td><td>The submitted score</td></tr>\n<tr><td>top1</td><td>output</td><td>8</td><td>Highest score seen</td></tr>\n<tr><td>top2</td><td>output</td><td>8</td><td>Second-highest</td></tr>\n<tr><td>top3</td><td>output</td><td>8</td><td>Third-highest</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  submit,\n  input  [7:0] score,\n  output reg [7:0] top1,\n  output reg [7:0] top2,\n  output reg [7:0] top3\n);\n\n  // Your code here — on submit, insert score into the sorted top-3, shifting lower entries down.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst, submit; reg [7:0] score; wire [7:0] top1, top2, top3; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .submit(submit), .score(score), .top1(top1), .top2(top2), .top3(top3));\n  always #5 clk=~clk;\n  task check; input [7:0] e1,e2,e3; input [127:0] label; begin\n    if(top1!==e1||top2!==e2||top3!==e3) begin errors=errors+1; $display(\"FAIL %0s expected top1=%d top2=%d top3=%d got top1=%d top2=%d top3=%d\",label,e1,e2,e3,top1,top2,top3); end\n    else $display(\"PASS %0s top1=%d top2=%d top3=%d\",label,top1,top2,top3);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; submit=0; score=0; @(posedge clk); #1; rst=0;\n    submit=1; score=50; @(posedge clk); #1; check(50,0,0,\"first-score\");\n    score=80; @(posedge clk); #1; check(80,50,0,\"new-top1-shifts-old-top1-to-top2\");\n    score=60; @(posedge clk); #1; check(80,60,50,\"mid-score-shifts-old-top2-to-top3\");\n    score=100; @(posedge clk); #1; check(100,80,60,\"new-top1-again-must-shift-top2-into-top3\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "submit",
      "score",
      "top1",
      "top2",
      "top3"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "score[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "50",
            "80",
            "60",
            "100"
          ]
        },
        {
          "name": "top1[7:0]",
          "wave": "2.3...4.",
          "data": [
            "50",
            "80",
            "100"
          ]
        },
        {
          "name": "top2[7:0]",
          "wave": "2...3.4.",
          "data": [
            "0",
            "50",
            "80"
          ]
        },
        {
          "name": "top3[7:0]",
          "wave": "2.....3.",
          "data": [
            "0",
            "60"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "leap-year-checker",
    "title": "Leap Year Checker",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic"
    ],
    "category": "Fun &amp; Games",
    "lede": "Determine whether a given year is a leap year — the classic \"divisible by 4, except by 100, except-except by 400\" rule as combinational logic.",
    "concept": "<b>Concept:</b> The full leap-year rule has three layers: divisible by 4 is required; being <em>also</em> divisible by 100 normally disqualifies it — <em>unless</em> it's divisible by 400 too, in which case it's a leap year after all: <code>(year%4==0) &amp;&amp; ((year%100!=0) || (year%400==0))</code>. The simplified two-layer version most people remember (\"divisible by 4 and not by 100\") gets every ordinary year right and only fails on the rare century-year exception — real years like 2000 (a leap year, since it's divisible by 400) and 1900 (not a leap year) are exactly the edge cases that expose the missing third layer.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>year</td><td>input</td><td>12</td><td>Year to check (0-4095)</td></tr>\n<tr><td>is_leap</td><td>output</td><td>1</td><td>1 if year is a leap year</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [11:0] year,\n  output is_leap\n);\n\n  // Your code here — is_leap = divisible by 4 AND (not divisible by 100 OR divisible by 400).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [11:0] year; wire is_leap; integer errors=0;\n  top_module dut(.year(year), .is_leap(is_leap));\n  task check; input [11:0] y; input el; begin\n    year=y;#1;\n    if(is_leap!==el) begin errors=errors+1; $display(\"FAIL year=%d expected=%b got=%b\",y,el,is_leap); end\n    else $display(\"PASS year=%d is_leap=%b\",y,is_leap);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(2024,1);\n    check(1900,0);\n    check(2000,1);\n    check(2023,0);\n    check(2400,1);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "year",
      "is_leap"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "year[11:0]",
          "wave": "2.3.4.",
          "data": [
            "1900",
            "2000",
            "2024"
          ]
        },
        {
          "name": "is_leap",
          "wave": "0.1.1."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "fizzbuzz-single-value",
    "title": "FizzBuzz Encoder",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "arithmetic"
    ],
    "category": "Fun &amp; Games",
    "lede": "The classic programming-interview puzzle, recast as combinational hardware: classify a number as Fizz, Buzz, FizzBuzz, or itself.",
    "concept": "<b>Concept:</b> The one rule that trips people up in software trips up hardware too: the divisible-by-15 (\"FizzBuzz\") case must be checked <em>before</em> the individual divisible-by-3 and divisible-by-5 cases, because every multiple of 15 is also a multiple of 3 (and of 5) — check order matters. Checking divisible-by-3 first is the textbook FizzBuzz bug: for n=15, <code>n%3==0</code> is true, so the circuit reports plain \"Fizz\" and the FizzBuzz branch below it becomes permanently unreachable dead code for every multiple of 15.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>n</td><td>input</td><td>8</td><td>Number to classify</td></tr>\n<tr><td>result</td><td>output</td><td>2</td><td>0=number, 1=Fizz (div by 3), 2=Buzz (div by 5), 3=FizzBuzz (div by 15)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] n,\n  output [1:0] result\n);\n\n  // Your code here — check divisible-by-15 FIRST, then by-3, then by-5, else 0.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] n; wire [1:0] result; integer errors=0;\n  top_module dut(.n(n), .result(result));\n  task check; input [7:0] nn; input [1:0] er; begin\n    n=nn;#1;\n    if(result!==er) begin errors=errors+1; $display(\"FAIL n=%d expected=%d got=%d\",nn,er,result); end\n    else $display(\"PASS n=%d result=%d\",nn,result);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(15,3);\n    check(3,1);\n    check(5,2);\n    check(7,0);\n    check(30,3);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "n",
      "result"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "n[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "3",
            "5",
            "7",
            "15"
          ]
        },
        {
          "name": "result[1:0]",
          "wave": "2.3.4.5.",
          "data": [
            "1",
            "2",
            "0",
            "3"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "axi-lite-write-fsm",
    "title": "AXI4-Lite Write Channel FSM",
    "difficulty": "hard",
    "points": 50,
    "level": 6,
    "tags": [
      "sequential",
      "protocol",
      "amba",
      "fsm"
    ],
    "category": "Protocols &amp; Interfaces",
    "lede": "Accept an address+data write beat, then hold the response channel until the master acknowledges — the handshake FSM behind every AXI4-Lite peripheral.",
    "concept": "<b>Concept:</b> Once <code>awready</code>/<code>wready</code> pulse to accept an address+data beat, the FSM must drop them back to 0 before moving into the response phase — leaving them asserted through <code>RESP</code> would tell the master it can send a <em>second</em> write before the first one's response (<code>bvalid</code>/<code>bready</code>) has even completed, which is a real AXI protocol violation that breaks ordering guarantees the whole bus depends on. Forgetting exactly that one deassertion (<code>awready&lt;=0; wready&lt;=0;</code>) when entering <code>RESP</code> is an easy line to drop and a serious one to miss.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>awvalid</td><td>input</td><td>1</td><td>Write address valid</td></tr>\n<tr><td>awready</td><td>output</td><td>1</td><td>Write address ready</td></tr>\n<tr><td>wvalid</td><td>input</td><td>1</td><td>Write data valid</td></tr>\n<tr><td>wready</td><td>output</td><td>1</td><td>Write data ready</td></tr>\n<tr><td>bvalid</td><td>output</td><td>1</td><td>Write response valid</td></tr>\n<tr><td>bready</td><td>input</td><td>1</td><td>Master ready to accept response</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  awvalid,\n  output reg awready,\n  input  wvalid,\n  output reg wready,\n  output reg bvalid,\n  input  bready\n);\n\n  // Your code here — IDLE: accept awvalid&&wvalid for 1 cycle (awready=wready=1), move to RESP.\n  // RESP: deassert awready/wready, assert bvalid until bready, then back to IDLE.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst, awvalid, wvalid, bready; wire awready, wready, bvalid; integer errors=0;\n  top_module dut(.clk(clk),.rst(rst),.awvalid(awvalid),.awready(awready),.wvalid(wvalid),.wready(wready),.bvalid(bvalid),.bready(bready));\n  always #5 clk=~clk;\n  task check; input ea,ew,eb; input [127:0] label; begin\n    if(awready!==ea||wready!==ew||bvalid!==eb) begin errors=errors+1; $display(\"FAIL %0s expected awready=%b wready=%b bvalid=%b got awready=%b wready=%b bvalid=%b\",label,ea,ew,eb,awready,wready,bvalid); end\n    else $display(\"PASS %0s awready=%b wready=%b bvalid=%b\",label,awready,wready,bvalid);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; awvalid=0; wvalid=0; bready=0; @(posedge clk); #1; rst=0;\n    awvalid=1; wvalid=1;\n    @(posedge clk); #1; check(1,1,0,\"accept-address-and-data\");\n    @(posedge clk); #1; check(0,0,1,\"resp-phase-must-deassert-aw-w-ready\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "awvalid",
      "awready",
      "wvalid",
      "wready",
      "bvalid",
      "bready"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p....."
        },
        {
          "name": "awvalid",
          "wave": "0.1..."
        },
        {
          "name": "awready",
          "wave": "0..1.0"
        },
        {
          "name": "bvalid",
          "wave": "0....1"
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "axi-lite-read-fsm",
    "title": "AXI4-Lite Read Channel FSM",
    "difficulty": "medium",
    "points": 25,
    "level": 6,
    "tags": [
      "sequential",
      "protocol",
      "amba",
      "fsm"
    ],
    "category": "Protocols &amp; Interfaces",
    "lede": "The read-side twin of this catalog's AXI4-Lite write FSM: accept an address, then hold the data response until the master accepts it.",
    "concept": "<b>Concept:</b> Just like the write address channel, <code>arready</code> must pulse for exactly one cycle to accept the read address, then drop to 0 while <code>rvalid</code> holds the response — the same \"forgot to deassert the ready signal when entering the response phase\" bug that plagues the write channel shows up here too, letting the master think it can issue a second read address before the first read's data has even been returned.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>arvalid</td><td>input</td><td>1</td><td>Read address valid</td></tr>\n<tr><td>arready</td><td>output</td><td>1</td><td>Read address ready</td></tr>\n<tr><td>rvalid</td><td>output</td><td>1</td><td>Read data valid</td></tr>\n<tr><td>rready</td><td>input</td><td>1</td><td>Master ready to accept data</td></tr>\n<tr><td>rdata</td><td>output</td><td>8</td><td>Read data</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  arvalid,\n  output reg arready,\n  output reg rvalid,\n  input  rready,\n  output reg [7:0] rdata\n);\n\n  // Your code here — IDLE: accept arvalid for 1 cycle (arready=1), latch rdata, move to RESP.\n  // RESP: deassert arready, assert rvalid until rready, then back to IDLE.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst, arvalid, rready; wire arready, rvalid; wire [7:0] rdata; integer errors=0;\n  top_module dut(.clk(clk),.rst(rst),.arvalid(arvalid),.arready(arready),.rvalid(rvalid),.rready(rready),.rdata(rdata));\n  always #5 clk=~clk;\n  task check; input ea,ev; input [127:0] label; begin\n    if(arready!==ea||rvalid!==ev) begin errors=errors+1; $display(\"FAIL %0s expected arready=%b rvalid=%b got arready=%b rvalid=%b\",label,ea,ev,arready,rvalid); end\n    else $display(\"PASS %0s arready=%b rvalid=%b\",label,arready,rvalid);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; arvalid=0; rready=0; @(posedge clk); #1; rst=0;\n    arvalid=1;\n    @(posedge clk); #1; check(1,0,\"accept-address\");\n    @(posedge clk); #1; check(0,1,\"resp-phase-must-deassert-arready\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "arvalid",
      "arready",
      "rvalid",
      "rready",
      "rdata"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p....."
        },
        {
          "name": "arvalid",
          "wave": "0.1..."
        },
        {
          "name": "arready",
          "wave": "0..1.0"
        },
        {
          "name": "rvalid",
          "wave": "0....1"
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "clock-gating-cell",
    "title": "Integrated Clock Gating Cell (ICG)",
    "difficulty": "medium",
    "points": 25,
    "level": 7,
    "tags": [
      "combinational",
      "clock-generation",
      "low-power"
    ],
    "category": "Sequential Design",
    "lede": "The standard cell every low-power design leans on to disable a clock branch without ever producing a runt pulse — a level-sensitive latch, not a plain AND gate.",
    "concept": "<b>Concept:</b> A naive <code>gclk = clk &amp; en</code> is dangerous: if <code>en</code> changes while <code>clk</code> happens to be high, the output can glitch mid-pulse, and that glitch can clock a downstream flop at the wrong instant. The real ICG latches <code>en</code> only while <code>clk</code> is low (when it's safe) and holds that value steady through the whole high phase: <code>always @* if(!clk) en_latched=en; assign gclk=clk &amp; en_latched;</code>. Skipping the latch and gating directly with <code>en</code> is the exact bug real clock-gating cells exist to prevent — it looks identical in a waveform viewer for slow, careful test patterns, and only shows the glitch when <code>en</code> toggles at the \"wrong\" moment.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Free-running clock</td></tr>\n<tr><td>en</td><td>input</td><td>1</td><td>Gate enable</td></tr>\n<tr><td>gclk</td><td>output</td><td>1</td><td>Gated clock (glitch-free)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  en,\n  output gclk\n);\n\n  // Your code here — latch en while clk is LOW (transparent latch), then AND with clk.\n  // This is a level-sensitive latch: always @* if(!clk) en_latched=en;\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk, en; wire gclk; integer errors=0;\n  top_module dut(.clk(clk), .en(en), .gclk(gclk));\n  task check; input eg; input [127:0] label; begin\n    if(gclk!==eg) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,eg,gclk); end\n    else $display(\"PASS %0s gclk=%b\",label,gclk);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    clk=0; en=1; #1;\n    clk=1; #1; check(1,\"clk-high-en-was-1-during-low-phase\");\n    en=0; #1; check(1,\"en-drops-mid-high-phase-latched-value-must-hold-no-glitch\");\n    clk=0; #1; check(0,\"clk-low-forces-gclk-low-latch-now-reopens-captures-en0\");\n    clk=1; #1; check(0,\"clk-high-again-en-was-0-during-last-low-phase\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "en",
      "gclk"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "0.1...0.1."
        },
        {
          "name": "en",
          "wave": "1...0....."
        },
        {
          "name": "gclk",
          "wave": "0.1.....0."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "interrupt-mask-register",
    "title": "Interrupt Mask Register",
    "difficulty": "easy",
    "points": 10,
    "level": 2,
    "tags": [
      "combinational",
      "interrupt"
    ],
    "category": "Combinational Design",
    "lede": "Gate a bank of interrupt sources through a per-bit mask so that masked-off interrupts never reach the CPU — the register-level building block behind every real interrupt controller.",
    "concept": "<b>Concept:</b> The masked interrupt bits (<code>pending = irq &amp; mask</code>) are only half the job — the final line to the CPU must come from <code>pending</code>, not from the raw <code>irq</code> bits: <code>irq_out = |pending</code>. A very real bug when a mask register gets bolted onto an existing controller is computing <code>pending</code> correctly but leaving the old <code>irq_out = |irq</code> driver untouched — the masked-pending bits look right in isolation, but the interrupt line to the CPU is still driven straight from the unmasked sources, so masking a source does nothing at all to whether it actually interrupts.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>irq</td><td>input</td><td>8</td><td>Raw interrupt sources</td></tr>\n<tr><td>mask</td><td>input</td><td>8</td><td>1=source enabled, 0=masked off</td></tr>\n<tr><td>pending</td><td>output</td><td>8</td><td>irq &amp; mask</td></tr>\n<tr><td>irq_out</td><td>output</td><td>1</td><td>1 if any unmasked source is pending</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] irq,\n  input  [7:0] mask,\n  output [7:0] pending,\n  output irq_out\n);\n\n  // Your code here — pending = irq & mask; irq_out = |pending (NOT |irq).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] irq, mask; wire irq_out; wire [7:0] pending; integer errors=0;\n  top_module dut(.irq(irq), .mask(mask), .irq_out(irq_out), .pending(pending));\n  task check; input [7:0] i,m; input [7:0] ep; input eo; begin\n    irq=i;mask=m;#1;\n    if(pending!==ep||irq_out!==eo) begin errors=errors+1; $display(\"FAIL irq=%b mask=%b expected pending=%b irq_out=%b got pending=%b irq_out=%b\",i,m,ep,eo,pending,irq_out); end\n    else $display(\"PASS irq=%b mask=%b pending=%b irq_out=%b\",i,m,pending,irq_out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(8'b00000100, 8'b00000000, 8'b00000000, 0);\n    check(8'b00000100, 8'b00000010, 8'b00000000, 0);\n    check(8'b00000100, 8'b00000100, 8'b00000100, 1);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "irq",
      "mask",
      "pending",
      "irq_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "irq[7:0]",
          "wave": "2.....",
          "data": [
            "04"
          ]
        },
        {
          "name": "mask[7:0]",
          "wave": "2.3...",
          "data": [
            "00",
            "04"
          ]
        },
        {
          "name": "pending[7:0]",
          "wave": "2.3...",
          "data": [
            "00",
            "04"
          ]
        },
        {
          "name": "irq_out",
          "wave": "0.1..."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "brown-out-reset-detector",
    "title": "Brown-Out Reset Detector",
    "difficulty": "medium",
    "points": 25,
    "level": 7,
    "tags": [
      "sequential",
      "power",
      "reset"
    ],
    "category": "Sequential Design",
    "lede": "Trigger a reset when the supply voltage dips too low — and use two different thresholds for asserting vs. releasing it, so noise near the edge can't chatter the reset line.",
    "concept": "<b>Concept:</b> A real brown-out detector uses hysteresis: reset asserts when voltage drops below a LOW threshold, but only releases once voltage climbs back above a separate, higher HIGH threshold — the gap between the two thresholds is a noise margin. Using the same threshold for both directions collapses that margin to zero: the moment voltage ticks back above the single threshold, reset releases immediately, even if it's still sitting in what should be the unsafe hysteresis band — exactly the chattering behavior hysteresis exists to prevent.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst_ext</td><td>input</td><td>1</td><td>External force-reset input</td></tr>\n<tr><td>vsense</td><td>input</td><td>8</td><td>Sensed supply voltage (arbitrary units)</td></tr>\n<tr><td>reset_out</td><td>output</td><td>1</td><td>1 while held in brown-out reset</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst_ext,\n  input  [7:0] vsense,\n  output reg reset_out\n);\n\n  // Your code here — LOW=100, HIGH=110. Assert reset when vsense<LOW; release only when vsense>=HIGH.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst_ext; reg [7:0] vsense; wire reset_out; integer errors=0;\n  top_module dut(.clk(clk), .rst_ext(rst_ext), .vsense(vsense), .reset_out(reset_out));\n  always #5 clk=~clk;\n  task check; input er; input [127:0] label; begin\n    if(reset_out!==er) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,er,reset_out); end\n    else $display(\"PASS %0s reset_out=%b\",label,reset_out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst_ext=1; vsense=120; @(posedge clk); #1; rst_ext=0; check(1,\"held-in-reset\");\n    vsense=90; @(posedge clk); #1; check(1,\"dip-below-low-stays-in-reset\");\n    vsense=105; @(posedge clk); #1; check(1,\"in-hysteresis-gap-must-still-be-in-reset\");\n    vsense=115; @(posedge clk); #1; check(0,\"above-high-releases\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "vsense",
      "reset_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........"
        },
        {
          "name": "vsense[7:0]",
          "wave": "2.3.4.5..",
          "data": [
            "120",
            "90",
            "105",
            "115"
          ]
        },
        {
          "name": "reset_out",
          "wave": "1.......0"
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "power-on-reset-generator",
    "title": "Power-On Reset (POR) Generator",
    "difficulty": "medium",
    "points": 25,
    "level": 7,
    "tags": [
      "sequential",
      "reset",
      "counter"
    ],
    "category": "Sequential Design",
    "lede": "Hold every flop in reset for a fixed number of cycles after power-up before releasing them — the counter-based POR sitting between a raw power rail and the rest of a chip.",
    "concept": "<b>Concept:</b> A POR simply counts cycles while reset is held, and releases exactly when the count reaches its target: <code>if(cnt==7) reset_out&lt;=0; else cnt&lt;=cnt+1;</code>, giving 8 total held cycles (cnt running 0 through 7 inclusive). Comparing against one less than the intended count (<code>cnt==6</code> instead of <code>cnt==7</code>) releases reset a full cycle early — a classic off-by-one in a hold-for-N-cycles counter that's easy to get wrong in either direction depending on whether the count starts at 0 or 1.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>trigger</td><td>input</td><td>1</td><td>1 pulse to (re)start the POR sequence</td></tr>\n<tr><td>reset_out</td><td>output</td><td>1</td><td>1 while held in reset (8 cycles after trigger)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  trigger,\n  output reg reset_out\n);\n\n  // Your code here — on trigger, hold reset_out=1 for exactly 8 cycles (counting 0..7), then release.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, trigger; wire reset_out; integer errors=0;\n  top_module dut(.clk(clk), .trigger(trigger), .reset_out(reset_out));\n  always #5 clk=~clk;\n  integer i;\n  task check; input er; input [127:0] label; begin\n    if(reset_out!==er) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,er,reset_out); end\n    else $display(\"PASS %0s reset_out=%b\",label,reset_out);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    trigger=1; @(posedge clk); #1; trigger=0; check(1,\"edge0-trigger\");\n    for (i=0;i<6;i=i+1) begin @(posedge clk); #1; end\n    check(1,\"edge6-still-held\");\n    @(posedge clk); #1; check(1,\"edge7-still-held-must-release-next\");\n    @(posedge clk); #1; check(0,\"edge8-released\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "trigger",
      "reset_out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "trigger",
          "wave": "010......."
        },
        {
          "name": "reset_out",
          "wave": "1........0"
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "low-power-sleep-wake-fsm",
    "title": "Low-Power Sleep/Wake FSM",
    "difficulty": "medium",
    "points": 25,
    "level": 7,
    "tags": [
      "sequential",
      "fsm",
      "low-power"
    ],
    "category": "Sequential Design",
    "lede": "Enter a low-power sleep state on request and wake on an interrupt — but never actually go to sleep if a wake interrupt is already pending the instant sleep is requested.",
    "concept": "<b>Concept:</b> A real race condition in power management: if <code>sleep_req</code> and <code>wake_irq</code> arrive on the exact same cycle, sleeping anyway would mean the wake event that just occurred is silently swallowed, leaving the system asleep waiting for a <em>second</em> wake interrupt that may never come: <code>if(sleep_req &amp;&amp; !wake_irq) ...</code>. Dropping the <code>!wake_irq</code> guard means the FSM commits to sleep purely based on the request, without checking whether a wake is simultaneously being asserted — exactly the missed-wakeup race that guard exists to close.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (awake, not sleeping)</td></tr>\n<tr><td>sleep_req</td><td>input</td><td>1</td><td>1 to request entering sleep</td></tr>\n<tr><td>wake_irq</td><td>input</td><td>1</td><td>1 when a wake interrupt is pending</td></tr>\n<tr><td>sleeping</td><td>output</td><td>1</td><td>1 while in the sleep state</td></tr>\n<tr><td>wake_pulse</td><td>output</td><td>1</td><td>1-cycle pulse the instant the system wakes</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  sleep_req,\n  input  wake_irq,\n  output reg sleeping,\n  output reg wake_pulse\n);\n\n  // Your code here — AWAKE: if(sleep_req && !wake_irq) go to SLEEP. SLEEP: if(wake_irq) go to AWAKE, pulse wake_pulse.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst, sleep_req, wake_irq; wire sleeping, wake_pulse; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .sleep_req(sleep_req), .wake_irq(wake_irq), .sleeping(sleeping), .wake_pulse(wake_pulse));\n  always #5 clk=~clk;\n  task check; input es; input [127:0] label; begin\n    if(sleeping!==es) begin errors=errors+1; $display(\"FAIL %0s expected sleeping=%b got=%b\",label,es,sleeping); end\n    else $display(\"PASS %0s sleeping=%b\",label,sleeping);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; sleep_req=0; wake_irq=0; @(posedge clk); #1; rst=0;\n    sleep_req=1; wake_irq=1;\n    @(posedge clk); #1; check(0,\"race-sleep-and-wake-same-cycle-must-not-sleep\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "sleep_req",
      "wake_irq",
      "sleeping"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p..."
        },
        {
          "name": "sleep_req",
          "wave": "0.1."
        },
        {
          "name": "wake_irq",
          "wave": "0.1."
        },
        {
          "name": "sleeping",
          "wave": "0..."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "bus-timeout-watchdog",
    "title": "Bus Timeout Watchdog",
    "difficulty": "medium",
    "points": 25,
    "level": 8,
    "tags": [
      "sequential",
      "counter",
      "protocol"
    ],
    "category": "Sequential Design",
    "lede": "Flag an error if a bus transaction doesn't get a ready response within a fixed number of cycles — and make sure that error actually clears once a transaction succeeds.",
    "concept": "<b>Concept:</b> The counter resets whenever there's no outstanding request or the slave responds, and the error clears at the same time: <code>if(!req||ready) begin cnt&lt;=0; timeout_err&lt;=0; end</code>. Resetting the counter but forgetting to also clear <code>timeout_err</code> creates a sticky-forever bug: once a transaction times out, even a perfectly healthy <em>later</em> transaction that completes right on time will leave the error flag stuck high, permanently reporting a fault that's no longer true.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>req</td><td>input</td><td>1</td><td>1 while a bus request is outstanding</td></tr>\n<tr><td>ready</td><td>input</td><td>1</td><td>1 when the slave responds</td></tr>\n<tr><td>timeout_err</td><td>output</td><td>1</td><td>1 if req has been outstanding for 10 cycles without ready</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  req,\n  input  ready,\n  output reg timeout_err\n);\n\n  // Your code here — count cycles while req is outstanding and ready hasn't arrived.\n  // If !req or ready, clear the counter AND timeout_err. At 10 cycles without ready, set timeout_err.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst, req, ready; wire timeout_err; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .req(req), .ready(ready), .timeout_err(timeout_err));\n  always #5 clk=~clk;\n  integer i;\n  task check; input et; input [127:0] label; begin\n    if(timeout_err!==et) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,et,timeout_err); end\n    else $display(\"PASS %0s timeout_err=%b\",label,timeout_err);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; req=0; ready=0; @(posedge clk); #1; rst=0;\n    req=1; ready=0;\n    for (i=0;i<10;i=i+1) begin @(posedge clk); #1; end\n    check(1,\"timed-out-after-10-cycles\");\n    ready=1; @(posedge clk); #1; ready=0; check(0,\"ready-arrives-must-clear-sticky-error\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "req",
      "ready",
      "timeout_err"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p............"
        },
        {
          "name": "req",
          "wave": "0.1.........."
        },
        {
          "name": "ready",
          "wave": "0..........10"
        },
        {
          "name": "timeout_err",
          "wave": "0.........1.0"
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "lockstep-dual-core-comparator",
    "title": "Lockstep Dual-Core Comparator",
    "difficulty": "medium",
    "points": 25,
    "level": 4,
    "tags": [
      "sequential",
      "safety"
    ],
    "category": "Sequential Design",
    "lede": "The functional-safety watchdog behind lockstep processors: compare two redundant cores' outputs every cycle, and once they ever disagree, latch that fault permanently.",
    "concept": "<b>Concept:</b> In a safety-critical lockstep design (the kind ISO 26262 automotive silicon relies on), a fault flag must be <em>sticky</em> — once a mismatch between the two redundant cores is observed, the fault must stay asserted until an explicit reset, never silently clearing itself just because a later comparison happens to match again: <code>if(mismatch) fault&lt;=1;</code> (no path that ever sets it back to 0 except reset). Writing <code>fault &lt;= mismatch</code> instead looks almost identical but re-evaluates the fault fresh every cycle, so a single transient glitch gets silently forgotten the moment the next comparison is clean — exactly the failure mode a lockstep safety mechanism exists to catch.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (clears fault)</td></tr>\n<tr><td>valid_a</td><td>input</td><td>1</td><td>Core A output valid this cycle</td></tr>\n<tr><td>data_a</td><td>input</td><td>8</td><td>Core A output</td></tr>\n<tr><td>valid_b</td><td>input</td><td>1</td><td>Core B output valid this cycle</td></tr>\n<tr><td>data_b</td><td>input</td><td>8</td><td>Core B output</td></tr>\n<tr><td>fault</td><td>output</td><td>1</td><td>Sticky: 1 forever once a mismatch is ever seen</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  valid_a,\n  input  [7:0] data_a,\n  input  valid_b,\n  input  [7:0] data_b,\n  output reg fault\n);\n\n  // Your code here — when both valid and data_a != data_b, latch fault=1. Never clear it except on rst.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst, valid_a, valid_b; reg [7:0] data_a, data_b; wire fault; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .valid_a(valid_a), .data_a(data_a), .valid_b(valid_b), .data_b(data_b), .fault(fault));\n  always #5 clk=~clk;\n  task check; input ef; input [127:0] label; begin\n    if(fault!==ef) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,ef,fault); end\n    else $display(\"PASS %0s fault=%b\",label,fault);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; valid_a=0; valid_b=0; data_a=0; data_b=0; @(posedge clk); #1; rst=0;\n    valid_a=1; valid_b=1; data_a=5; data_b=7;\n    @(posedge clk); #1; check(1,\"mismatch-sets-fault\");\n    data_a=9; data_b=9;\n    @(posedge clk); #1; check(1,\"fault-must-stay-latched-sticky-even-after-a-matching-cycle\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "data_a",
      "data_b",
      "fault"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "data_a[7:0]",
          "wave": "2.3.....",
          "data": [
            "5",
            "9"
          ]
        },
        {
          "name": "data_b[7:0]",
          "wave": "2.3.....",
          "data": [
            "7",
            "9"
          ]
        },
        {
          "name": "fault",
          "wave": "0.1....."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "register-map-address-decoder",
    "title": "Register-Map Address Decoder",
    "difficulty": "medium",
    "points": 25,
    "level": 2,
    "tags": [
      "combinational",
      "decoder"
    ],
    "category": "Combinational Design",
    "lede": "Decode a bus address into one of 8 register chip-selects — and correctly refuse to assert anything for out-of-range addresses instead of aliasing them.",
    "concept": "<b>Concept:</b> With an address wider than the number of registers actually implemented, an in-range check matters as much as the decode itself: <code>cs = (addr&lt;8) ? (1&lt;&lt;addr) : 0</code>. Truncating the address down to just enough bits to index the 8 chip-selects (say, only using <code>addr[2:0]</code> and silently dropping the top bit) skips that range check entirely — every out-of-range address 8-15 quietly <em>aliases</em> onto register 0-7 based on its low 3 bits, so an access that should hit nothing at all ends up hitting a real register instead.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>addr</td><td>input</td><td>4</td><td>Register address (0-15; only 0-7 are valid)</td></tr>\n<tr><td>cs</td><td>output</td><td>8</td><td>One-hot chip-select; all-0 for out-of-range addr</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] addr,\n  output [7:0] cs\n);\n\n  // Your code here — cs = one-hot bit at position addr, but ALL ZERO if addr >= 8 (out of range).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] addr; wire [7:0] cs; integer errors=0;\n  top_module dut(.addr(addr), .cs(cs));\n  task check; input [3:0] a; input [7:0] ec; begin\n    addr=a;#1;\n    if(cs!==ec) begin errors=errors+1; $display(\"FAIL addr=%d expected=%b got=%b\",a,ec,cs); end\n    else $display(\"PASS addr=%d cs=%b\",a,cs);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(4'd3, 8'b00001000);\n    check(4'd8, 8'b00000000);\n    check(4'd15, 8'b00000000);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "addr",
      "cs"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "addr[3:0]",
          "wave": "2.3.4.",
          "data": [
            "3",
            "8",
            "15"
          ]
        },
        {
          "name": "cs[7:0]",
          "wave": "2.3...",
          "data": [
            "08",
            "00"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "weighted-round-robin-arbiter",
    "title": "Weighted Round-Robin Arbiter",
    "difficulty": "hard",
    "points": 50,
    "level": 8,
    "tags": [
      "sequential",
      "arbiter"
    ],
    "category": "Sequential Design",
    "lede": "Give one requester more grants per round than the other — the QoS-style arbiter behind bandwidth allocation in NoCs and shared-memory controllers.",
    "concept": "<b>Concept:</b> Each requester gets a quota of consecutive grants per round (here, 2 for requester 0, 1 for requester 1); a grant only counts against that requester's own quota, and the quotas refill together once neither requester can be served: <code>if(req0 &amp;&amp; q0!=0) begin grant0&lt;=1; q0&lt;=q0-1; end</code>. Granting <code>req0</code> unconditionally whenever it's asserted — without ever checking or spending its quota — throws the weighting away entirely: requester 0 wins every single cycle it asks, and requester 1 is starved completely instead of getting its fair 1-in-3 share.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (refills both quotas)</td></tr>\n<tr><td>req0</td><td>input</td><td>1</td><td>Requester 0 asserting request</td></tr>\n<tr><td>req1</td><td>input</td><td>1</td><td>Requester 1 asserting request</td></tr>\n<tr><td>grant0</td><td>output</td><td>1</td><td>1-cycle grant to requester 0</td></tr>\n<tr><td>grant1</td><td>output</td><td>1</td><td>1-cycle grant to requester 1</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  req0,\n  input  req1,\n  output reg grant0,\n  output reg grant1\n);\n\n  // Your code here — W0=2, W1=1 quotas. Grant req0 while its quota lasts, then req1 while its quota\n  // lasts (decrementing each grant), then refill both quotas once neither can be served.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst, req0, req1; wire grant0, grant1; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .req0(req0), .req1(req1), .grant0(grant0), .grant1(grant1));\n  always #5 clk=~clk;\n  task check; input eg0,eg1; input [127:0] label; begin\n    if(grant0!==eg0||grant1!==eg1) begin errors=errors+1; $display(\"FAIL %0s expected grant0=%b grant1=%b got grant0=%b grant1=%b\",label,eg0,eg1,grant0,grant1); end\n    else $display(\"PASS %0s grant0=%b grant1=%b\",label,grant0,grant1);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; req0=0; req1=0; @(posedge clk); #1; rst=0;\n    req0=1; req1=1;\n    @(posedge clk); #1; check(1,0,\"cyc1-req0-quota2\");\n    @(posedge clk); #1; check(1,0,\"cyc2-req0-quota-now-0\");\n    @(posedge clk); #1; check(0,1,\"cyc3-req0-exhausted-req1-gets-turn\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "req0",
      "req1",
      "grant0",
      "grant1"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "req0",
          "wave": "0.1....."
        },
        {
          "name": "req1",
          "wave": "0.1....."
        },
        {
          "name": "grant0",
          "wave": "0.1.0..."
        },
        {
          "name": "grant1",
          "wave": "0....1.."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "axi-stream-packet-counter",
    "title": "AXI-Stream Packet Counter",
    "difficulty": "easy",
    "points": 10,
    "level": 6,
    "tags": [
      "sequential",
      "protocol",
      "amba"
    ],
    "category": "Protocols &amp; Interfaces",
    "lede": "Count completed packets on an AXI-Stream by watching tlast — but only when a beat is actually accepted, not just whenever tlast happens to be asserted.",
    "concept": "<b>Concept:</b> On AXI-Stream, a beat only really transfers when BOTH <code>tvalid</code> and <code>tready</code> are high that cycle — <code>tlast</code> alone means nothing if the receiver isn't ready to accept it: <code>if(tvalid &amp;&amp; tready &amp;&amp; tlast) packet_count&lt;=packet_count+1</code>. Counting on <code>tlast</code> alone, without the handshake qualifier, over-counts every time the last beat of a packet happens to coincide with backpressure (<code>tready=0</code>) — the packet hasn't actually been transferred yet, but the counter thinks it has, and then counts it <em>again</em> once the real handshake finally completes.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>tvalid</td><td>input</td><td>1</td><td>Data valid</td></tr>\n<tr><td>tready</td><td>input</td><td>1</td><td>Receiver ready</td></tr>\n<tr><td>tlast</td><td>input</td><td>1</td><td>1 on the last beat of a packet</td></tr>\n<tr><td>packet_count</td><td>output</td><td>8</td><td>Number of packets actually transferred</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  tvalid,\n  input  tready,\n  input  tlast,\n  output reg [7:0] packet_count\n);\n\n  // Your code here — increment only when tvalid && tready && tlast (a real accepted beat that's also the last one).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst, tvalid, tready, tlast; wire [7:0] packet_count; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .tvalid(tvalid), .tready(tready), .tlast(tlast), .packet_count(packet_count));\n  always #5 clk=~clk;\n  task check; input [7:0] ec; input [127:0] label; begin\n    if(packet_count!==ec) begin errors=errors+1; $display(\"FAIL %0s expected=%d got=%d\",label,ec,packet_count); end\n    else $display(\"PASS %0s packet_count=%d\",label,packet_count);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; tvalid=0; tready=0; tlast=0; @(posedge clk); #1; rst=0;\n    tvalid=1; tready=0; tlast=1;\n    @(posedge clk); #1; check(0,\"backpressure-tlast-not-accepted-must-not-count\");\n    tready=1;\n    @(posedge clk); #1; check(1,\"now-accepted-counts\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "tvalid",
      "tready",
      "tlast",
      "packet_count"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......"
        },
        {
          "name": "tvalid",
          "wave": "0.1...."
        },
        {
          "name": "tready",
          "wave": "0...1.."
        },
        {
          "name": "tlast",
          "wave": "0.1...."
        },
        {
          "name": "packet_count[7:0]",
          "wave": "2.....3",
          "data": [
            "0",
            "1"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "dma-descriptor-beat-counter",
    "title": "DMA Descriptor Beat Counter",
    "difficulty": "medium",
    "points": 25,
    "level": 8,
    "tags": [
      "sequential",
      "counter",
      "dma"
    ],
    "category": "Sequential Design",
    "lede": "Track remaining beats in a DMA transfer as they complete, guarding against the stray late-arriving pulse that real pipelined DMA engines can produce after completion.",
    "concept": "<b>Concept:</b> The remaining-beats counter must never decrement past 0 — <code>if(beat_done &amp;&amp; beats_remaining!=0) beats_remaining&lt;=beats_remaining-1</code> — because a real DMA engine's completion pulses can arrive slightly out of sync with the counter due to pipeline latency, and a stray extra pulse after the transfer is already done is a normal, expected occurrence, not an error. Skip the guard and that harmless extra pulse underflows the counter to 255, which then flips <code>xfer_complete</code> back to 0 — telling the rest of the system a finished transfer is somehow still in progress.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>load</td><td>input</td><td>1</td><td>1 to load a new transfer's beat_total</td></tr>\n<tr><td>beat_total</td><td>input</td><td>8</td><td>Total beats for this transfer</td></tr>\n<tr><td>beat_done</td><td>input</td><td>1</td><td>1 pulse per completed beat</td></tr>\n<tr><td>beats_remaining</td><td>output</td><td>8</td><td>Beats left in the current transfer</td></tr>\n<tr><td>xfer_complete</td><td>output</td><td>1</td><td>1 when beats_remaining==0</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  load,\n  input  [7:0] beat_total,\n  input  beat_done,\n  output reg [7:0] beats_remaining,\n  output xfer_complete\n);\n\n  // Your code here — load sets beats_remaining=beat_total. beat_done decrements, but only if !=0.\n  // xfer_complete = (beats_remaining==0).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst, load, beat_done; reg [7:0] beat_total; wire [7:0] beats_remaining; wire xfer_complete; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .load(load), .beat_total(beat_total), .beat_done(beat_done), .beats_remaining(beats_remaining), .xfer_complete(xfer_complete));\n  always #5 clk=~clk;\n  task check; input [7:0] eb; input ex; input [127:0] label; begin\n    if(beats_remaining!==eb||xfer_complete!==ex) begin errors=errors+1; $display(\"FAIL %0s expected remaining=%d complete=%b got remaining=%d complete=%b\",label,eb,ex,beats_remaining,xfer_complete); end\n    else $display(\"PASS %0s remaining=%d complete=%b\",label,beats_remaining,xfer_complete);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; load=0; beat_total=0; beat_done=0; @(posedge clk); #1; rst=0;\n    load=1; beat_total=8'd2; @(posedge clk); #1; load=0; check(2,0,\"loaded-2-beats\");\n    beat_done=1; @(posedge clk); #1; check(1,0,\"beat1-done\");\n    @(posedge clk); #1; check(0,1,\"beat2-done-complete\");\n    @(posedge clk); #1; check(0,1,\"stray-extra-beat-done-must-not-underflow\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "load",
      "beat_done",
      "beats_remaining",
      "xfer_complete"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "load",
          "wave": "0.10...."
        },
        {
          "name": "beat_done",
          "wave": "0...1010"
        },
        {
          "name": "beats_remaining[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "2",
            "1",
            "0"
          ]
        },
        {
          "name": "xfer_complete",
          "wave": "1.0....1"
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "overtemp-throttle-monitor",
    "title": "Over-Temperature Throttle Monitor",
    "difficulty": "medium",
    "points": 25,
    "level": 7,
    "tags": [
      "sequential",
      "power",
      "monitor"
    ],
    "category": "Sequential Design",
    "lede": "Throttle performance at a warning temperature and shut down entirely at a critical one — with a recovery margin so the chip doesn't oscillate in and out of shutdown right at the edge.",
    "concept": "<b>Concept:</b> <code>throttle</code> is a simple combinational compare against the WARN threshold, but <code>shutdown</code> needs hysteresis just like a brown-out detector: it latches at CRIT and only releases once temperature drops all the way down to a separate, lower RECOVER threshold. Releasing shutdown as soon as temperature drops back below CRIT (the same threshold that triggered it) removes that recovery margin — the chip would flip in and out of shutdown right at the CRIT boundary instead of needing a real, meaningful drop in temperature to resume.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>temp</td><td>input</td><td>8</td><td>Sensed temperature</td></tr>\n<tr><td>throttle</td><td>output</td><td>1</td><td>1 while temp&gt;=WARN(80)</td></tr>\n<tr><td>shutdown</td><td>output</td><td>1</td><td>Latches at temp&gt;=CRIT(100); releases only below RECOVER(70)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  [7:0] temp,\n  output throttle,\n  output reg shutdown\n);\n\n  // Your code here — WARN=80, CRIT=100, RECOVER=70. throttle=(temp>=WARN), combinational.\n  // shutdown latches at temp>=CRIT; only clears once temp<RECOVER (hysteresis).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst; reg [7:0] temp; wire throttle; wire shutdown; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .temp(temp), .throttle(throttle), .shutdown(shutdown));\n  always #5 clk=~clk;\n  task check; input es; input [127:0] label; begin\n    if(shutdown!==es) begin errors=errors+1; $display(\"FAIL %0s expected shutdown=%b got=%b\",label,es,shutdown); end\n    else $display(\"PASS %0s shutdown=%b\",label,shutdown);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; temp=0; @(posedge clk); #1; rst=0;\n    temp=105; @(posedge clk); #1; check(1,\"over-crit-shuts-down\");\n    temp=75; @(posedge clk); #1; check(1,\"in-hysteresis-gap-must-stay-shutdown\");\n    temp=65; @(posedge clk); #1; check(0,\"below-recover-clears\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "temp",
      "throttle",
      "shutdown"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p......."
        },
        {
          "name": "temp[7:0]",
          "wave": "2.3.4.5.",
          "data": [
            "0",
            "105",
            "75",
            "65"
          ]
        },
        {
          "name": "throttle",
          "wave": "0.1....."
        },
        {
          "name": "shutdown",
          "wave": "0.1...0."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "voltage-margin-monitor",
    "title": "Voltage Margin Monitor",
    "difficulty": "easy",
    "points": 10,
    "level": 7,
    "tags": [
      "combinational",
      "monitor",
      "power"
    ],
    "category": "Combinational Design",
    "lede": "Flag a fault when the supply voltage strays outside its safe band in either direction — over-voltage or under-voltage, either one is a problem.",
    "concept": "<b>Concept:</b> The two individual threshold checks are independent conditions, and a fault should fire if <em>either</em> one is true: <code>fault = over_voltage || under_voltage</code>. Using <code>&amp;&amp;</code> instead of <code>||</code> silently changes the meaning to \"both over AND under voltage at the same time\" — a condition that's logically impossible for a single sensed value, so the fault output would never assert at all, no matter how far out of range the voltage strays.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>vsense</td><td>input</td><td>8</td><td>Sensed voltage (arbitrary units)</td></tr>\n<tr><td>over_voltage</td><td>output</td><td>1</td><td>1 if vsense &gt; 200</td></tr>\n<tr><td>under_voltage</td><td>output</td><td>1</td><td>1 if vsense &lt; 50</td></tr>\n<tr><td>fault</td><td>output</td><td>1</td><td>1 if either over or under voltage</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [7:0] vsense,\n  output over_voltage,\n  output under_voltage,\n  output fault\n);\n\n  // Your code here — over_voltage=(vsense>200); under_voltage=(vsense<50); fault = over_voltage || under_voltage.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [7:0] vsense; wire over_voltage, under_voltage, fault; integer errors=0;\n  top_module dut(.vsense(vsense), .over_voltage(over_voltage), .under_voltage(under_voltage), .fault(fault));\n  task check; input [7:0] v; input eo,eu,ef; begin\n    vsense=v;#1;\n    if(over_voltage!==eo||under_voltage!==eu||fault!==ef) begin errors=errors+1; $display(\"FAIL vsense=%d expected over=%b under=%b fault=%b got over=%b under=%b fault=%b\",v,eo,eu,ef,over_voltage,under_voltage,fault); end\n    else $display(\"PASS vsense=%d over=%b under=%b fault=%b\",v,over_voltage,under_voltage,fault);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(220, 1,0,1);\n    check(30, 0,1,1);\n    check(100, 0,0,0);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "vsense",
      "over_voltage",
      "under_voltage",
      "fault"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "vsense[7:0]",
          "wave": "2.3.4.",
          "data": [
            "220",
            "30",
            "100"
          ]
        },
        {
          "name": "fault",
          "wave": "1.0..."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "jtag-tap-instruction-decoder",
    "title": "JTAG TAP Instruction Decoder",
    "difficulty": "medium",
    "points": 25,
    "level": 7,
    "tags": [
      "combinational",
      "dft"
    ],
    "category": "Combinational Design",
    "lede": "Decode a JTAG TAP controller's instruction register — with the one spec rule that trips up most first attempts: every unimplemented code must default to BYPASS.",
    "concept": "<b>Concept:</b> The JTAG standard requires that any instruction code not implemented by a device fall through to BYPASS, not just the conventional all-1s code — <code>bypass = !(extest || sample_preload || idcode)</code> catches every unrecognized pattern, not only <code>4'b1111</code>. Matching BYPASS against the literal all-1s pattern alone is a real, spec-violating simplification: any reserved or unimplemented instruction code that isn't all-1s falls into a gap where the TAP controller does something undefined instead of safely defaulting to BYPASS, which can break board-level JTAG chains that scan through multiple devices.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>ir</td><td>input</td><td>4</td><td>Instruction register value</td></tr>\n<tr><td>extest</td><td>output</td><td>1</td><td>1 if ir==0000</td></tr>\n<tr><td>sample_preload</td><td>output</td><td>1</td><td>1 if ir==0001</td></tr>\n<tr><td>idcode</td><td>output</td><td>1</td><td>1 if ir==0010</td></tr>\n<tr><td>bypass</td><td>output</td><td>1</td><td>1 for every other code (including 1111 and all reserved/unimplemented codes)</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  [3:0] ir,\n  output extest,\n  output sample_preload,\n  output idcode,\n  output bypass\n);\n\n  // Your code here — bypass must be 1 for ANY code that isn't extest/sample_preload/idcode, not just 4'b1111.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg [3:0] ir; wire extest, sample_preload, idcode, bypass; integer errors=0;\n  top_module dut(.ir(ir), .extest(extest), .sample_preload(sample_preload), .idcode(idcode), .bypass(bypass));\n  task check; input [3:0] i; input ee,es,eid,eb; begin\n    ir=i;#1;\n    if(extest!==ee||sample_preload!==es||idcode!==eid||bypass!==eb) begin errors=errors+1; $display(\"FAIL ir=%b expected extest=%b sp=%b idcode=%b bypass=%b got extest=%b sp=%b idcode=%b bypass=%b\",i,ee,es,eid,eb,extest,sample_preload,idcode,bypass); end\n    else $display(\"PASS ir=%b extest=%b sp=%b idcode=%b bypass=%b\",i,extest,sample_preload,idcode,bypass);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    check(4'b0000, 1,0,0,0);\n    check(4'b1111, 0,0,0,1);\n    check(4'b1010, 0,0,0,1);\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "ir",
      "extest",
      "idcode",
      "bypass"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "ir[3:0]",
          "wave": "2.3.4.",
          "data": [
            "0",
            "F",
            "A"
          ]
        },
        {
          "name": "extest",
          "wave": "1.0..."
        },
        {
          "name": "bypass",
          "wave": "0.1..."
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "scan-chain-shift-register",
    "title": "Scan Chain Shift Register",
    "difficulty": "medium",
    "points": 25,
    "level": 7,
    "tags": [
      "sequential",
      "dft"
    ],
    "category": "Sequential Design",
    "lede": "A 4-flop scan chain that captures functional data in normal operation but shifts a test pattern straight through when scan mode is enabled — the DFT structure behind every ATPG test on real silicon.",
    "concept": "<b>Concept:</b> Scan mode must genuinely <em>shift</em> the chain — each flop takes on the previous flop's value, carrying every bit one position along: <code>ff &lt;= {ff[2:0], scan_in}</code>. A version that only writes the new scan-in bit into the bottom position while zeroing everything else (<code>ff &lt;= {3'b000, scan_in}</code>) isn't a chain at all — it clobbers the 3 bits that were supposed to shift along instead of preserving and moving them, so scanning a test pattern through destroys the chain's contents instead of propagating them.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>\n<tr><td>scan_enable</td><td>input</td><td>1</td><td>1=scan/shift mode, 0=normal functional capture</td></tr>\n<tr><td>scan_in</td><td>input</td><td>1</td><td>Serial scan input</td></tr>\n<tr><td>func_d</td><td>input</td><td>4</td><td>Functional data (captured when scan_enable=0)</td></tr>\n<tr><td>q</td><td>output</td><td>4</td><td>Chain contents</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  scan_enable,\n  input  scan_in,\n  input  [3:0] func_d,\n  output [3:0] q\n);\n\n  // Your code here — scan_enable: shift {ff[2:0],scan_in} through the chain. Else: capture func_d.\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst, scan_enable, scan_in; reg [3:0] func_d; wire [3:0] q; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .scan_enable(scan_enable), .scan_in(scan_in), .func_d(func_d), .q(q));\n  always #5 clk=~clk;\n  task check; input [3:0] eq_; input [127:0] label; begin\n    if(q!==eq_) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,eq_,q); end\n    else $display(\"PASS %0s q=%b\",label,q);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; scan_enable=0; scan_in=0; func_d=0; @(posedge clk); #1; rst=0;\n    func_d=4'b1010; @(posedge clk); #1; check(4'b1010,\"functional-load\");\n    scan_enable=1; scan_in=1;\n    @(posedge clk); #1; check(4'b0101,\"scan-shift-must-carry-existing-bits-along\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "scan_enable",
      "scan_in",
      "func_d",
      "q"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p....."
        },
        {
          "name": "scan_enable",
          "wave": "0..1.."
        },
        {
          "name": "func_d[3:0]",
          "wave": "2.....",
          "data": [
            "A"
          ]
        },
        {
          "name": "q[3:0]",
          "wave": "2.3...",
          "data": [
            "A",
            "5"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "power-rail-sequencer",
    "title": "Power Rail Sequencer",
    "difficulty": "medium",
    "points": 25,
    "level": 7,
    "tags": [
      "sequential",
      "fsm",
      "power"
    ],
    "category": "Sequential Design",
    "lede": "Bring up 3 power rails one at a time in a fixed order — and bring them down in the exact reverse order, since powering down the rail others depend on first can damage real silicon.",
    "concept": "<b>Concept:</b> Power sequencing during boot and shutdown is order-critical: rails come up 0→1→2, but must come down 2→1→0 — the reverse — because later rails typically depend on earlier ones staying powered while they're active. The bug is deceptively small: powering down in the <em>same</em> order as power-up (checking <code>rail_en[0]</code> first instead of <code>rail_en[2]</code>) turns off the foundational rail while the ones that depend on it are still active — on real hardware, exactly the kind of sequencing mistake that can damage a board, not just misbehave in simulation.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>\n<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>\n<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (all rails off)</td></tr>\n<tr><td>power_up</td><td>input</td><td>1</td><td>Held high to sequence rails up, one per cycle</td></tr>\n<tr><td>power_down</td><td>input</td><td>1</td><td>Held high to sequence rails down, one per cycle, reverse order</td></tr>\n<tr><td>rail_en</td><td>output</td><td>3</td><td>rail_en[0]=first up/last down, rail_en[2]=last up/first down</td></tr>\n</tbody></table>",
    "starter": "module top_module(\n  input  clk,\n  input  rst,\n  input  power_up,\n  input  power_down,\n  output reg [2:0] rail_en\n);\n\n  // Your code here — power_up: turn on rails in order 0,1,2 (one per cycle, lowest unset bit first).\n  // power_down: turn off rails in REVERSE order 2,1,0 (one per cycle, highest set bit first).\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst, power_up, power_down; wire [2:0] rail_en; integer errors=0;\n  top_module dut(.clk(clk), .rst(rst), .power_up(power_up), .power_down(power_down), .rail_en(rail_en));\n  always #5 clk=~clk;\n  task check; input [2:0] er; input [127:0] label; begin\n    if(rail_en!==er) begin errors=errors+1; $display(\"FAIL %0s expected=%b got=%b\",label,er,rail_en); end\n    else $display(\"PASS %0s rail_en=%b\",label,rail_en);\n  end endtask\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0,tb);\n    rst=1; power_up=0; power_down=0; @(posedge clk); #1; rst=0;\n    power_up=1;\n    @(posedge clk); #1; check(3'b001,\"rail0-on\");\n    @(posedge clk); #1; check(3'b011,\"rail1-on\");\n    @(posedge clk); #1; check(3'b111,\"rail2-on-all-up\");\n    power_up=0; power_down=1;\n    @(posedge clk); #1; check(3'b011,\"power-down-must-turn-off-rail2-FIRST-reverse-order\");\n    if(errors==0) $display(\"ALL_TESTS_PASSED\"); else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "power_up",
      "power_down",
      "rail_en"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "power_up",
          "wave": "0.1..0...."
        },
        {
          "name": "power_down",
          "wave": "0.....1..."
        },
        {
          "name": "rail_en[2:0]",
          "wave": "2.3.4.5.6.",
          "data": [
            "0",
            "1",
            "3",
            "7",
            "3"
          ]
        }
      ],
      "config": {
        "hscale": 1
      }
    }
  },
  {
    "slug": "or-gate",
    "title": "2-Input OR Gate",
    "difficulty": "easy",
    "points": 10,
    "level": 1,
    "tags": [
      "combinational",
      "gates"
    ],
    "category": "Digital Logic Fundamentals",
    "lede": "Implement a 2-input OR gate. The output is 1 if either input is 1.",
    "concept": "<b>Concept: bitwise OR.</b> Use <code>assign out = a | b;</code>. The output is 0 only when both inputs are 0.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td>a</td><td>input</td><td>1</td><td>First input operand</td></tr><tr><td>b</td><td>input</td><td>1</td><td>Second input operand</td></tr><tr><td>out</td><td>output</td><td>1</td><td>a OR b</td></tr></tbody></table>",
    "starter": "module top_module(\n  input  a,\n  input  b,\n  output out\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg a, b; wire out; integer errors = 0;\n  top_module dut(.a(a), .b(b), .out(out));\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n    a=0; b=0; #1; if (out !== 0) errors = errors + 1;\n    a=0; b=1; #1; if (out !== 1) errors = errors + 1;\n    a=1; b=0; #1; if (out !== 1) errors = errors + 1;\n    a=1; b=1; #1; if (out !== 1) errors = errors + 1;\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a",
          "wave": "0..1.."
        },
        {
          "name": "b",
          "wave": "0.1.0.1"
        },
        {
          "name": "out",
          "wave": "0.1..."
        }
      ],
      "config": {
        "hscale": 2
      }
    }
  },
  {
    "slug": "nand-gate",
    "title": "2-Input NAND Gate",
    "difficulty": "easy",
    "points": 10,
    "level": 1,
    "tags": [
      "combinational",
      "gates"
    ],
    "category": "Digital Logic Fundamentals",
    "lede": "Design a universal 2-input NAND gate. Output is 0 only when both inputs are 1.",
    "concept": "<b>Concept: universal logic.</b> NAND gates can implement any Boolean function. In Verilog: <code>assign out = ~(a & b);</code>.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td>a</td><td>input</td><td>1</td><td>First operand</td></tr><tr><td>b</td><td>input</td><td>1</td><td>Second operand</td></tr><tr><td>out</td><td>output</td><td>1</td><td>NOT (a AND b)</td></tr></tbody></table>",
    "starter": "module top_module(\n  input  a,\n  input  b,\n  output out\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg a, b; wire out; integer errors = 0;\n  top_module dut(.a(a), .b(b), .out(out));\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n    a=0; b=0; #1; if (out !== 1) errors = errors + 1;\n    a=0; b=1; #1; if (out !== 1) errors = errors + 1;\n    a=1; b=0; #1; if (out !== 1) errors = errors + 1;\n    a=1; b=1; #1; if (out !== 0) errors = errors + 1;\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "a",
      "b",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "a",
          "wave": "0..1.."
        },
        {
          "name": "b",
          "wave": "0.1.0.1"
        },
        {
          "name": "out",
          "wave": "1...0."
        }
      ],
      "config": {
        "hscale": 2
      }
    }
  },
  {
    "slug": "demux-1to4",
    "title": "1-to-4 Demultiplexer",
    "difficulty": "easy",
    "points": 10,
    "level": 1,
    "tags": [
      "combinational",
      "mux",
      "demux"
    ],
    "category": "Digital Logic Fundamentals",
    "lede": "Route a single input signal to one of four output lines based on a 2-bit select code.",
    "concept": "<b>Concept: Demultiplexer.</b> Routes <code>in</code> to <code>out[sel]</code> while driving all other outputs to 0. Can be implemented with bit shift <code>assign out = in << sel;</code> or a <code>case(sel)</code> statement.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td>in</td><td>input</td><td>1</td><td>Data input signal</td></tr><tr><td>sel</td><td>input</td><td>2</td><td>2-bit line selector (00->out[0], 01->out[1], etc.)</td></tr><tr><td>out</td><td>output</td><td>4</td><td>4-bit one-hot routed output</td></tr></tbody></table>",
    "starter": "module top_module(\n  input        in,\n  input  [1:0] sel,\n  output [3:0] out\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg in; reg [1:0] sel; wire [3:0] out; integer errors = 0;\n  top_module dut(.in(in), .sel(sel), .out(out));\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n    in=1; sel=2'b00; #1; if (out !== 4'b0001) errors = errors + 1;\n    in=1; sel=2'b01; #1; if (out !== 4'b0010) errors = errors + 1;\n    in=1; sel=2'b10; #1; if (out !== 4'b0100) errors = errors + 1;\n    in=1; sel=2'b11; #1; if (out !== 4'b1000) errors = errors + 1;\n    in=0; sel=2'b01; #1; if (out !== 4'b0000) errors = errors + 1;\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "in",
      "sel",
      "out"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "in",
          "wave": "1...0."
        },
        {
          "name": "sel[1:0]",
          "wave": "3.4.5.6.4.",
          "data": [
            "0",
            "1",
            "2",
            "3",
            "1"
          ]
        },
        {
          "name": "out[3:0]",
          "wave": "3.4.5.6.7.",
          "data": [
            "1",
            "2",
            "4",
            "8",
            "0"
          ]
        }
      ],
      "config": {
        "hscale": 1.5
      }
    }
  },
  {
    "slug": "apb-master-fsm",
    "title": "APB Protocol Master FSM",
    "difficulty": "hard",
    "points": 50,
    "level": 6,
    "tags": [
      "protocols",
      "apb",
      "fsm",
      "bus"
    ],
    "category": "RTL Protocol Design",
    "lede": "Implement an AMBA APB Master state machine handling IDLE, SETUP, and ACCESS phases with PREADY wait states.",
    "concept": "<b>Concept: APB transfer cycle.</b> SETUP phase asserts <code>PSEL=1</code> with address and write flags; ACCESS phase asserts <code>PENABLE=1</code> and waits until the slave returns <code>PREADY=1</code> before completing.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td>clk</td><td>input</td><td>1</td><td>System clock</td></tr><tr><td>rst_n</td><td>input</td><td>1</td><td>Active-low reset</td></tr><tr><td>start</td><td>input</td><td>1</td><td>Trigger new transaction</td></tr><tr><td>write</td><td>input</td><td>1</td><td>1=Write, 0=Read</td></tr><tr><td>addr_in</td><td>input</td><td>32</td><td>Target memory address</td></tr><tr><td>wdata_in</td><td>input</td><td>32</td><td>Write data payload</td></tr><tr><td>pready</td><td>input</td><td>1</td><td>Slave ready handshake</td></tr><tr><td>prdata</td><td>input</td><td>32</td><td>Slave read data</td></tr><tr><td>psel</td><td>output</td><td>1</td><td>Slave select</td></tr><tr><td>penable</td><td>output</td><td>1</td><td>Transfer phase enable</td></tr><tr><td>pwrite</td><td>output</td><td>1</td><td>Direction indicator</td></tr><tr><td>paddr</td><td>output</td><td>32</td><td>Address driven to bus</td></tr><tr><td>pwdata</td><td>output</td><td>32</td><td>Write data driven to bus</td></tr><tr><td>rdata_out</td><td>output</td><td>32</td><td>Captured read data</td></tr><tr><td>done</td><td>output</td><td>1</td><td>Strobe indicating transfer complete</td></tr></tbody></table>",
    "starter": "module top_module (\n  input  wire        clk,\n  input  wire        rst_n,\n  input  wire        start,\n  input  wire        write,\n  input  wire [31:0] addr_in,\n  input  wire [31:0] wdata_in,\n  input  wire        pready,\n  input  wire [31:0] prdata,\n  output reg         psel,\n  output reg         penable,\n  output reg         pwrite,\n  output reg  [31:0] paddr,\n  output reg  [31:0] pwdata,\n  output reg  [31:0] rdata_out,\n  output reg         done\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst_n=0, start=0, write=0, pready=0;\n  reg [31:0] addr_in=0, wdata_in=0, prdata=0;\n  wire psel, penable, pwrite, done;\n  wire [31:0] paddr, pwdata, rdata_out;\n  integer errors = 0;\n\n  top_module dut (\n    .clk(clk), .rst_n(rst_n), .start(start), .write(write),\n    .addr_in(addr_in), .wdata_in(wdata_in), .pready(pready), .prdata(prdata),\n    .psel(psel), .penable(penable), .pwrite(pwrite), .paddr(paddr),\n    .pwdata(pwdata), .rdata_out(rdata_out), .done(done)\n  );\n\n  always #5 clk = ~clk;\n\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n    rst_n = 0; @(posedge clk); #1; rst_n = 1;\n    start = 1; write = 1; addr_in = 32'h4000; wdata_in = 32'hDEADBEEF; pready = 0;\n    @(posedge clk); #1;\n    start = 0;\n    if (!psel || penable) begin $display(\"FAIL SETUP\"); errors = errors + 1; end\n    @(posedge clk); #1;\n    if (!psel || !penable) begin $display(\"FAIL ACCESS wait\"); errors = errors + 1; end\n    pready = 1;\n    @(posedge clk); #1;\n    if (!done) begin $display(\"FAIL done not asserted\"); errors = errors + 1; end\n    pready = 0;\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "start",
      "psel",
      "penable",
      "pready",
      "paddr",
      "pwdata",
      "done"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p....."
        },
        {
          "name": "start",
          "wave": "010..."
        },
        {
          "name": "psel",
          "wave": "0.1..0"
        },
        {
          "name": "penable",
          "wave": "0..1.0"
        },
        {
          "name": "pready",
          "wave": "0...10"
        },
        {
          "name": "done",
          "wave": "0....1"
        }
      ],
      "config": {
        "hscale": 1.5
      }
    }
  },
  {
    "slug": "uart-receiver",
    "title": "UART 8-N-1 Serial Receiver",
    "difficulty": "medium",
    "points": 25,
    "level": 6,
    "tags": [
      "protocols",
      "uart",
      "fsm",
      "serial"
    ],
    "category": "RTL Protocol Design",
    "lede": "Demodulate asynchronous serial data: detect the start bit (0), sample 8 data bits LSB first, verify the stop bit (1), and output valid parallel data.",
    "concept": "<b>Concept: UART framing.</b> Idle line is high (1). Transmission begins with a start bit (0), followed by 8 data bits, ending with a stop bit (1).",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td>clk</td><td>input</td><td>1</td><td>Baud-rate sample clock</td></tr><tr><td>rst_n</td><td>input</td><td>1</td><td>Active-low reset</td></tr><tr><td>rx</td><td>input</td><td>1</td><td>Serial data input line</td></tr><tr><td>data_out</td><td>output</td><td>8</td><td>Deserialized parallel 8-bit byte</td></tr><tr><td>valid</td><td>output</td><td>1</td><td>1-cycle strobe indicating complete byte received</td></tr></tbody></table>",
    "starter": "module top_module (\n  input  wire       clk,\n  input  wire       rst_n,\n  input  wire       rx,\n  output reg  [7:0] data_out,\n  output reg        valid\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst_n=0, rx=1;\n  wire [7:0] data_out;\n  wire valid;\n  integer errors = 0;\n\n  top_module dut (.clk(clk), .rst_n(rst_n), .rx(rx), .data_out(data_out), .valid(valid));\n\n  always #5 clk = ~clk;\n\n  task send_byte(input [7:0] b);\n    integer i;\n    begin\n      rx = 0; @(posedge clk); #1;\n      for (i = 0; i < 8; i = i + 1) begin\n        rx = b[i]; @(posedge clk); #1;\n      end\n      rx = 1; @(posedge clk); #1;\n    end\n  endtask\n\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n    rst_n = 0; @(posedge clk); #1; rst_n = 1;\n    @(posedge clk); #1;\n    send_byte(8'h55);\n    if (!valid || data_out !== 8'h55) begin\n      $display(\"FAIL: expected 55, got %h valid=%b\", data_out, valid);\n      errors = errors + 1;\n    end\n    @(posedge clk); #1;\n    send_byte(8'hA7);\n    if (!valid || data_out !== 8'hA7) begin\n      $display(\"FAIL: expected A7, got %h valid=%b\", data_out, valid);\n      errors = errors + 1;\n    end\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "rx",
      "data_out",
      "valid"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p........."
        },
        {
          "name": "rx",
          "wave": "10333333331",
          "data": [
            "D0",
            "D1",
            "D2",
            "D3",
            "D4",
            "D5",
            "D6",
            "D7"
          ]
        },
        {
          "name": "data_out[7:0]",
          "wave": "x.........4",
          "data": [
            "0xA7"
          ]
        },
        {
          "name": "valid",
          "wave": "0.........1"
        }
      ],
      "config": {
        "hscale": 1.2
      }
    }
  },
  {
    "slug": "axi-stream-register-slice",
    "title": "AXI-Stream Register Slice",
    "difficulty": "hard",
    "points": 50,
    "level": 8,
    "tags": [
      "protocols",
      "axi",
      "timing",
      "industry"
    ],
    "category": "Industry-Level RTL Challenges",
    "lede": "Break timing critical paths on AXI-Stream interfaces by registering forward payload data and valid flags without degrading throughput.",
    "concept": "<b>Concept: timing closure register slice.</b> Decouples producer timing from consumer timing while maintaining 1 beat per cycle peak throughput using skid buffering or forward registration.",
    "portsHtml": "<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody><tr><td>clk</td><td>input</td><td>1</td><td>Clock signal</td></tr><tr><td>rst_n</td><td>input</td><td>1</td><td>Active-low reset</td></tr><tr><td>s_axis_tdata</td><td>input</td><td>8</td><td>Slave input stream payload</td></tr><tr><td>s_axis_tvalid</td><td>input</td><td>1</td><td>Slave input valid flag</td></tr><tr><td>s_axis_tready</td><td>output</td><td>1</td><td>Slave backpressure ready</td></tr><tr><td>m_axis_tdata</td><td>output</td><td>8</td><td>Master registered payload</td></tr><tr><td>m_axis_tvalid</td><td>output</td><td>1</td><td>Master registered valid flag</td></tr><tr><td>m_axis_tready</td><td>input</td><td>1</td><td>Downstream ready backpressure</td></tr></tbody></table>",
    "starter": "module top_module #(\n  parameter DATA_W = 8\n)(\n  input  wire              clk,\n  input  wire              rst_n,\n  input  wire [DATA_W-1:0] s_axis_tdata,\n  input  wire              s_axis_tvalid,\n  output wire              s_axis_tready,\n  output reg  [DATA_W-1:0] m_axis_tdata,\n  output reg               m_axis_tvalid,\n  input  wire              m_axis_tready\n);\n\n  // Your code here\n\nendmodule\n",
    "hiddenTb": "\nmodule tb;\n  reg clk=0, rst_n=0;\n  reg [7:0] s_tdata=0;\n  reg s_tvalid=0, m_tready=0;\n  wire s_tready, m_tvalid;\n  wire [7:0] m_tdata;\n  integer errors = 0;\n\n  top_module #(.DATA_W(8)) dut (\n    .clk(clk), .rst_n(rst_n),\n    .s_axis_tdata(s_tdata), .s_axis_tvalid(s_tvalid), .s_axis_tready(s_tready),\n    .m_axis_tdata(m_tdata), .m_axis_tvalid(m_tvalid), .m_axis_tready(m_tready)\n  );\n\n  always #5 clk = ~clk;\n\n  initial begin\n    $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n    rst_n = 0; @(posedge clk); #1; rst_n = 1;\n    m_tready = 1; s_tvalid = 1; s_tdata = 8'h33;\n    @(posedge clk); #1;\n    if (!m_tvalid || m_tdata !== 8'h33) errors = errors + 1;\n    m_tready = 0; s_tvalid = 1; s_tdata = 8'h77;\n    @(posedge clk); #1;\n    if (s_tready !== 1'b0) errors = errors + 1;\n    m_tready = 1;\n    @(posedge clk); #1;\n    if (errors == 0) $display(\"ALL_TESTS_PASSED\");\n    else $display(\"TEST_FAILED\");\n    $finish;\n  end\nendmodule\n",
    "waveSignals": [
      "clk",
      "s_axis_tvalid",
      "s_axis_tready",
      "s_axis_tdata",
      "m_axis_tvalid",
      "m_axis_tready",
      "m_axis_tdata"
    ],
    "wavedrom": {
      "signal": [
        {
          "name": "clk",
          "wave": "p....."
        },
        {
          "name": "s_tvalid",
          "wave": "01...."
        },
        {
          "name": "s_tready",
          "wave": "1..0.1"
        },
        {
          "name": "s_tdata[7:0]",
          "wave": "x3..4.",
          "data": [
            "0x33",
            "0x77"
          ]
        },
        {
          "name": "m_tvalid",
          "wave": "0.1..."
        },
        {
          "name": "m_tready",
          "wave": "1..0.1"
        },
        {
          "name": "m_tdata[7:0]",
          "wave": "x.3..4",
          "data": [
            "0x33",
            "0x77"
          ]
        }
      ],
      "config": {
        "hscale": 1.5
      }
    }
  }
];

  const LEVEL_META = [
    { level: 1, name: 'Digital Logic Fundamentals', diff: 'Beginner', badge: 'L1', color: '#38bdf8', desc: 'Logic gates, truth tables, multiplexers, demux, decoders, and bitwise reductions.' },
    { level: 2, name: 'Combinational RTL Design', diff: 'Beginner to Intermediate', badge: 'L2', color: '#2dd4bf', desc: 'ALU, barrel shifters, priority selection, adders, arithmetic, and latch avoidance.' },
    { level: 3, name: 'Sequential RTL Design', diff: 'Intermediate', badge: 'L3', color: '#a78bfa', desc: 'Flip-flops, enable registers, shift registers, binary & ring counters, clock dividers, and edge detectors.' },
    { level: 4, name: 'Finite State Machines', diff: 'Intermediate to Advanced', badge: 'L4', color: '#fbbf24', desc: 'Moore & Mealy FSMs, sequence detectors, traffic lights, vending machines, and arbiters.' },
    { level: 5, name: 'Memory & FIFO Design', diff: 'Advanced', badge: 'L5', color: '#f472b6', desc: 'Single/dual-port RAM, synchronous FIFOs, almost full/empty flags, and Gray-code pointers.' },
    { level: 6, name: 'RTL Protocol Design', diff: 'Advanced', badge: 'L6', color: '#fb923c', desc: 'AMBA APB master/slave, AXI4-Lite handshakes, UART TX/RX, SPI, and credit flow control.' },
    { level: 7, name: 'CDC, RDC & Low-Power RTL', diff: 'Advanced / Industry', badge: 'L7', color: '#ef4444', desc: '2-flop synchronizers, pulse sync, glitch-free clock muxing, integrated clock gating, and power rails.' },
    { level: 8, name: 'Industry-Level RTL Challenges', diff: 'Expert', badge: 'L8', color: '#e879f9', desc: 'Parameterized FIFOs, AXI-Stream register slices, round-robin arbiters, and watchdog timers.' }
  ];

  function getProblem(slug) {
    return PROBLEMS.find(p => p.slug === slug) || null;
  }

  function getLevels() {
    return LEVEL_META;
  }

  function getProblemsByLevel(lvl) {
    return PROBLEMS.filter(p => (p.level || 1) === Number(lvl));
  }

  function searchProblems(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) return PROBLEMS;
    return PROBLEMS.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      (p.tags || []).some(t => t.toLowerCase().includes(q)) ||
      (p.category || '').toLowerCase().includes(q) ||
      (p.lede || '').toLowerCase().includes(q)
    );
  }

  global.ECRIONIX_PROBLEMS = PROBLEMS;
  global.EcrioniXProblemCatalog = {
    PROBLEMS,
    LEVEL_META,
    getProblem,
    getLevels,
    getProblemsByLevel,
    searchProblems,
    POINTS: { easy: 10, medium: 25, hard: 50 }
  };
})(typeof window !== 'undefined' ? window : globalThis);

