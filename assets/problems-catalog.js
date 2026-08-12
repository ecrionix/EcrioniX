/* Problem catalog for /problems/ hub + solve pages */
(function (global) {
  'use strict';

  const PROBLEMS = [
    {
      slug: 'wire-passthrough',
      title: 'Wire the Input Straight to the Output',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'basics'],
      category: 'Verilog Language Basics',
      lede: 'Connect a single input to a single output with a continuous assignment.',
      concept: '<b>Concept: continuous assignment.</b> <code>assign out = in;</code> wires <code>out</code> to <code>in</code> permanently — it updates whenever <code>in</code> changes, just like a real wire.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>in</td><td>input</td><td>1</td><td>Source signal</td></tr>
<tr><td>out</td><td>output</td><td>1</td><td>Must equal in at all times</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input   in,
  output  out
);

  // Your code here — connect out to in.

endmodule
`,
      hiddenTb: `
module tb;
  reg in;
  wire out;
  integer errors = 0;
  integer i;
  reg test_vals [0:2];
  top_module dut(.in(in), .out(out));
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    test_vals[0] = 0;
    test_vals[1] = 1;
    test_vals[2] = 0;
    for (i = 0; i < 3; i = i + 1) begin
      in = test_vals[i]; #1;
      if (out !== in) begin
        errors = errors + 1;
        $display("Test %0d: in=%b | expected out=%b | received out=%b | FAIL", i+1, in, in, out);
      end else begin
        $display("Test %0d: in=%b | expected out=%b | received out=%b | PASS", i+1, in, in, out);
      end
    end
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['in', 'out'],
      wavedrom: {
        signal: [
          { name: 'in', wave: '0.1.0' },
          { name: 'out', wave: '0.1.0' }
        ],
        config: { hscale: 2 }
      }
    },
    {
      slug: 'and-gate',
      title: '2-Input AND Gate',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'gates'],
      category: 'Verilog Language Basics',
      lede: 'Build a 2-input AND gate. Output is 1 only when both inputs are 1.',
      concept: '<b>Concept:</b> Use <code>assign out = a &amp; b;</code> or an equivalent continuous assignment.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>1</td><td>First operand</td></tr>
<tr><td>b</td><td>input</td><td>1</td><td>Second operand</td></tr>
<tr><td>out</td><td>output</td><td>1</td><td>a AND b</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  a,
  input  b,
  output out
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg a, b;
  wire out;
  integer errors = 0;
  top_module dut(.a(a), .b(b), .out(out));
  task check;
    input ea, eb, eout;
    begin
      a = ea; b = eb; #1;
      if (out !== eout) begin
        errors = errors + 1;
        $display("FAIL a=%b b=%b expected=%b got=%b", a, b, eout, out);
      end else $display("PASS a=%b b=%b out=%b", a, b, out);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(0,0,0);
    check(0,1,0);
    check(1,0,0);
    check(1,1,1);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'out'],
      wavedrom: {
        signal: [
          { name: 'a', wave: '0.1.0.1' },
          { name: 'b', wave: '0...1.1' },
          { name: 'out', wave: '0.....1' }
        ],
        config: { hscale: 2 }
      }
    },
    {
      slug: 'mux2to1',
      title: '2-to-1 Multiplexer',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'mux'],
      category: 'Combinational Design',
      lede: 'Select between two 1-bit inputs using sel. When sel=0 output a; when sel=1 output b.',
      concept: '<b>Concept:</b> <code>assign out = sel ? b : a;</code> is the classic mux idiom.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>1</td><td>Selected when sel=0</td></tr>
<tr><td>b</td><td>input</td><td>1</td><td>Selected when sel=1</td></tr>
<tr><td>sel</td><td>input</td><td>1</td><td>Select</td></tr>
<tr><td>out</td><td>output</td><td>1</td><td>Mux output</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  a,
  input  b,
  input  sel,
  output out
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg a, b, sel;
  wire out;
  integer errors = 0;
  top_module dut(.a(a), .b(b), .sel(sel), .out(out));
  task check;
    input ea, eb, esel, eout;
    begin
      a = ea; b = eb; sel = esel; #1;
      if (out !== eout) begin
        errors = errors + 1;
        $display("FAIL a=%b b=%b sel=%b expected=%b got=%b", a, b, sel, eout, out);
      end else $display("PASS a=%b b=%b sel=%b out=%b", a, b, sel, out);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(0,1,0,0);
    check(0,1,1,1);
    check(1,0,0,1);
    check(1,0,1,0);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'sel', 'out'],
      wavedrom: {
        signal: [
          { name: 'a', wave: '0.1...' },
          { name: 'b', wave: '1.0...' },
          { name: 'sel', wave: '0.1.0.1' },
          { name: 'out', wave: '0.0.1.0' }
        ],
        config: { hscale: 2 }
      }
    },
    {
      slug: 'full-adder',
      title: '1-Bit Full Adder',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'arithmetic'],
      category: 'Combinational Design',
      lede: 'Compute sum and carry-out for a + b + cin.',
      concept: '<b>Concept:</b> <code>sum = a ^ b ^ cin</code>, <code>cout = (a&amp;b) | (b&amp;cin) | (a&amp;cin)</code>.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>1</td><td>Addend</td></tr>
<tr><td>b</td><td>input</td><td>1</td><td>Addend</td></tr>
<tr><td>cin</td><td>input</td><td>1</td><td>Carry in</td></tr>
<tr><td>sum</td><td>output</td><td>1</td><td>Sum bit</td></tr>
<tr><td>cout</td><td>output</td><td>1</td><td>Carry out</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  a,
  input  b,
  input  cin,
  output sum,
  output cout
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg a, b, cin;
  wire sum, cout;
  integer errors = 0;
  integer i;
  reg [1:0] exp;
  top_module dut(.a(a), .b(b), .cin(cin), .sum(sum), .cout(cout));
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    for (i = 0; i < 8; i = i + 1) begin
      a = i[2]; b = i[1]; cin = i[0];
      #1;
      exp = a + b + cin;
      if ({cout, sum} !== exp) begin
        errors = errors + 1;
        $display("FAIL a=%b b=%b cin=%b expected=%b%b got=%b%b", a, b, cin, exp[1], exp[0], cout, sum);
      end else $display("PASS a=%b b=%b cin=%b sum=%b cout=%b", a, b, cin, sum, cout);
    end
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'cin', 'sum', 'cout'],
      wavedrom: {
        signal: [
          { name: 'a', wave: '0.1.0.1' },
          { name: 'b', wave: '0.0.1.1' },
          { name: 'cin', wave: '01010101' },
          { name: 'sum', wave: '0.1.1.0.1.0.0.1' },
          { name: 'cout', wave: '0...1.1.1' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'mux4to1',
      title: '4-to-1 Multiplexer',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'mux'],
      category: 'Combinational Design',
      lede: 'Select one of four 1-bit inputs using a 2-bit sel. sel=00→in0, 01→in1, 10→in2, 11→in3.',
      concept: '<b>Concept:</b> Nested ternaries or a <code>case</code> on <code>sel</code> both work — <code>assign out = sel[1] ? (sel[0]?in3:in2) : (sel[0]?in1:in0);</code> decodes both select bits without a priority chain.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>in0</td><td>input</td><td>1</td><td>Selected when sel=00</td></tr>
<tr><td>in1</td><td>input</td><td>1</td><td>Selected when sel=01</td></tr>
<tr><td>in2</td><td>input</td><td>1</td><td>Selected when sel=10</td></tr>
<tr><td>in3</td><td>input</td><td>1</td><td>Selected when sel=11</td></tr>
<tr><td>sel</td><td>input</td><td>2</td><td>Select index</td></tr>
<tr><td>out</td><td>output</td><td>1</td><td>Selected input</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input        in0,
  input        in1,
  input        in2,
  input        in3,
  input  [1:0] sel,
  output       out
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg in0,in1,in2,in3;
  reg [1:0] sel;
  wire out;
  integer errors = 0;
  top_module dut(.in0(in0),.in1(in1),.in2(in2),.in3(in3),.sel(sel),.out(out));
  task check;
    input i0,i1,i2,i3; input [1:0] s; input eout;
    begin
      in0=i0;in1=i1;in2=i2;in3=i3;sel=s;#1;
      if (out !== eout) begin
        errors = errors + 1;
        $display("FAIL sel=%b expected=%b got=%b", s, eout, out);
      end else $display("PASS sel=%b out=%b", s, out);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(1,0,0,0,2'b00,1);
    check(1,0,0,0,2'b01,0);
    check(0,1,0,0,2'b01,1);
    check(0,0,1,0,2'b10,1);
    check(0,0,0,1,2'b11,1);
    check(0,0,0,0,2'b11,0);
    check(1,1,1,1,2'b10,1);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['sel', 'in0', 'in1', 'in2', 'in3', 'out'],
      wavedrom: {
        signal: [
          { name: 'sel[1:0]', wave: '2.3.4.5.', data: ['00', '01', '10', '11'] },
          { name: 'in0', wave: '1.......' },
          { name: 'in1', wave: '0.......' },
          { name: 'in2', wave: '1.......' },
          { name: 'in3', wave: '0.......' },
          { name: 'out', wave: '1.0.1.0.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'priority-encoder',
      title: '4-to-2 Priority Encoder',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'encoder'],
      category: 'Combinational Design',
      lede: 'Output the index of the highest-priority (MSB-most) set bit in a 4-bit input, plus a valid flag when any bit is set.',
      concept: '<b>Concept:</b> Priority means check the highest bit first — <code>in[3]</code> wins over <code>in[2]</code> even if both are set. <code>valid = |in;</code> (OR-reduce) tells you if the output means anything at all.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>in</td><td>input</td><td>4</td><td>Request lines, bit 3 = highest priority</td></tr>
<tr><td>out</td><td>output</td><td>2</td><td>Index of highest set bit (don't-care if valid=0)</td></tr>
<tr><td>valid</td><td>output</td><td>1</td><td>1 if any input bit is set</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] in,
  output [1:0] out,
  output       valid
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] in;
  wire [1:0] out;
  wire valid;
  integer errors = 0;
  top_module dut(.in(in), .out(out), .valid(valid));
  task check;
    input [3:0] i; input ev; input [1:0] eo; input checkOut;
    begin
      in = i; #1;
      if (valid !== ev) begin
        errors = errors + 1;
        $display("FAIL in=%b valid expected=%b got=%b", i, ev, valid);
      end else if (checkOut && out !== eo) begin
        errors = errors + 1;
        $display("FAIL in=%b out expected=%b got=%b", i, eo, out);
      end else $display("PASS in=%b valid=%b out=%b", i, valid, out);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(4'b0000, 0, 2'd0, 0);
    check(4'b0001, 1, 2'd0, 1);
    check(4'b0010, 1, 2'd1, 1);
    check(4'b0011, 1, 2'd1, 1);
    check(4'b0100, 1, 2'd2, 1);
    check(4'b1000, 1, 2'd3, 1);
    check(4'b1010, 1, 2'd3, 1);
    check(4'b1111, 1, 2'd3, 1);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['in', 'valid', 'out'],
      wavedrom: {
        signal: [
          { name: 'in[3:0]', wave: '2.3.4.5.6', data: ['0001', '0010', '0100', '1000', '1111'] },
          { name: 'valid', wave: '0.1......' },
          { name: 'out[1:0]', wave: 'x.2.3.4.5', data: ['0', '1', '2', '3'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'dff-async-reset',
      title: 'D Flip-Flop with Asynchronous Reset',
      difficulty: 'easy',
      points: 10,
      tags: ['sequential', 'flip-flop'],
      category: 'Sequential Design',
      lede: 'Standard D flip-flop with an active-low asynchronous reset. Reset clears q immediately, without waiting for a clock edge.',
      concept: '<b>Concept:</b> Asynchronous reset belongs in the sensitivity list itself: <code>always @(posedge clk or negedge rst_n)</code>. A reset in the body but not the sensitivity list only reacts on the next clock edge — that is a <i>synchronous</i> reset, a different (and wrong) behavior here.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst_n</td><td>input</td><td>1</td><td>Async active-low reset</td></tr>
<tr><td>d</td><td>input</td><td>1</td><td>Data in</td></tr>
<tr><td>q</td><td>output</td><td>1</td><td>Registered output</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input      clk,
  input      rst_n,
  input      d,
  output reg q
);

  // Your code here — sensitivity list must include the reset edge.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst_n, d;
  wire q;
  integer errors = 0;
  top_module dut(.clk(clk), .rst_n(rst_n), .d(d), .q(q));
  initial clk = 0;
  always #5 clk = ~clk;
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst_n = 0; d = 0; #3;
    if (q !== 0) begin errors = errors + 1; $display("FAIL initial async reset q=%b", q); end
    else $display("PASS initial reset");
    rst_n = 1; d = 1; @(posedge clk); #1;
    if (q !== 1) begin errors = errors + 1; $display("FAIL d=1 got %b", q); end
    else $display("PASS d=1 captured");
    d = 0; @(posedge clk); #1;
    if (q !== 0) begin errors = errors + 1; $display("FAIL d=0 got %b", q); end
    else $display("PASS d=0 captured");
    d = 1; @(posedge clk); #1;
    if (q !== 1) begin errors = errors + 1; $display("FAIL pre-async got %b", q); end
    else $display("PASS pre-async q=1");
    #2 rst_n = 0; #1;
    if (q !== 0) begin errors = errors + 1; $display("FAIL async reset mid-cycle q=%b", q); end
    else $display("PASS async reset mid-cycle");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst_n', 'd', 'q'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p........' },
          { name: 'rst_n', wave: '0.1......' },
          { name: 'd', wave: 'x.0.1.0..' },
          { name: 'q', wave: 'x0...1.0.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'shift-register-sipo',
      title: '4-Bit Shift Register (SIPO)',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'shift-register'],
      category: 'Sequential Design',
      lede: 'Serial-in, parallel-out shift register. Each clock, shift left and load sin into the LSB. Sync active-high reset clears q.',
      concept: '<b>Concept:</b> <code>q &lt;= {q[2:0], sin};</code> — the top 3 bits move up one position, and the new serial bit enters at the bottom.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>sin</td><td>input</td><td>1</td><td>Serial data in</td></tr>
<tr><td>q</td><td>output</td><td>4</td><td>Parallel output, sin enters at q[0]</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input            clk,
  input            rst,
  input            sin,
  output reg [3:0] q
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, sin;
  wire [3:0] q;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .sin(sin), .q(q));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input [3:0] eq;
    begin
      if (q !== eq) begin
        errors = errors + 1;
        $display("FAIL expected=%b got=%b", eq, q);
      end else $display("PASS q=%b", q);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; sin = 0; @(posedge clk); #1; check(4'b0000);
    rst = 0; sin = 1; @(posedge clk); #1; check(4'b0001);
    sin = 0; @(posedge clk); #1; check(4'b0010);
    sin = 1; @(posedge clk); #1; check(4'b0101);
    sin = 1; @(posedge clk); #1; check(4'b1011);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'sin', 'q'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p........' },
          { name: 'rst', wave: '10.......' },
          { name: 'sin', wave: '0.1.0.1.1' },
          { name: 'q[3:0]', wave: 'x.2.3.4.5', data: ['0000', '0001', '0010', '0101'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'half-adder',
      title: '1-Bit Half Adder',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'adder'],
      category: 'Combinational Design',
      lede: 'The building block behind every adder chain: add two single bits and produce a sum and a carry-out.',
      concept: '<b>Concept:</b> <code>sum = a ^ b</code> and <code>cout = a &amp; b</code>. XOR gives the sum because it is 1 exactly when the bits differ; AND gives the carry because a carry only occurs when both bits are 1.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>1</td><td>First operand bit</td></tr>
<tr><td>b</td><td>input</td><td>1</td><td>Second operand bit</td></tr>
<tr><td>sum</td><td>output</td><td>1</td><td>a + b, low bit</td></tr>
<tr><td>cout</td><td>output</td><td>1</td><td>Carry out of this bit position</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  a,
  input  b,
  output sum,
  output cout
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg a, b;
  wire sum, cout;
  integer errors = 0;
  top_module dut(.a(a), .b(b), .sum(sum), .cout(cout));
  task check;
    input ia, ib, es, ec;
    begin
      a = ia; b = ib; #1;
      if (sum !== es || cout !== ec) begin
        errors = errors + 1;
        $display("FAIL a=%b b=%b expected sum=%b cout=%b got sum=%b cout=%b", ia, ib, es, ec, sum, cout);
      end else $display("PASS a=%b b=%b sum=%b cout=%b", ia, ib, sum, cout);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(0, 0, 0, 0);
    check(0, 1, 1, 0);
    check(1, 0, 1, 0);
    check(1, 1, 0, 1);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'sum', 'cout'],
      wavedrom: {
        signal: [
          { name: 'a', wave: '0.1.0.1.' },
          { name: 'b', wave: '0.0.1.1.' },
          { name: 'sum', wave: '0.1.1.0.' },
          { name: 'cout', wave: '0.0.0.1.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'decoder-2to4',
      title: '2-to-4 Line Decoder',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'decoder'],
      category: 'Combinational Design',
      lede: 'Turn a 2-bit address into a one-hot 4-bit select line, gated by an enable input.',
      concept: '<b>Concept:</b> Shift a single hot bit into position: <code>out = en ? (4\'b0001 &lt;&lt; in) : 4\'b0000;</code>. When disabled, every output line must read 0 — a common trip-up is forgetting to gate the shift with <code>en</code>.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>in</td><td>input</td><td>2</td><td>Address to decode</td></tr>
<tr><td>en</td><td>input</td><td>1</td><td>Active-high enable</td></tr>
<tr><td>out</td><td>output</td><td>4</td><td>One-hot output, all 0 when en=0</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [1:0] in,
  input        en,
  output [3:0] out
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [1:0] in;
  reg en;
  wire [3:0] out;
  integer errors = 0;
  top_module dut(.in(in), .en(en), .out(out));
  task check;
    input [1:0] i; input e; input [3:0] eo;
    begin
      in = i; en = e; #1;
      if (out !== eo) begin
        errors = errors + 1;
        $display("FAIL in=%b en=%b expected=%b got=%b", i, e, eo, out);
      end else $display("PASS in=%b en=%b out=%b", i, e, out);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(2'b00, 1, 4'b0001);
    check(2'b01, 1, 4'b0010);
    check(2'b10, 1, 4'b0100);
    check(2'b11, 1, 4'b1000);
    check(2'b00, 0, 4'b0000);
    check(2'b11, 0, 4'b0000);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['in', 'en', 'out'],
      wavedrom: {
        signal: [
          { name: 'in[1:0]', wave: '2.3.4.5.', data: ['00', '01', '10', '11'] },
          { name: 'en', wave: '1.......' },
          { name: 'out[3:0]', wave: '2.3.4.5.', data: ['0001', '0010', '0100', '1000'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'comparator-4bit',
      title: '4-Bit Magnitude Comparator',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'comparator'],
      category: 'Combinational Design',
      lede: 'Compare two 4-bit unsigned numbers and flag whether the first is greater than, equal to, or less than the second.',
      concept: '<b>Concept:</b> Verilog\'s relational operators already do width-aware unsigned comparison — <code>a &gt; b</code>, <code>a == b</code>, <code>a &lt; b</code> — so this is really about wiring three comparisons to three outputs correctly, not building comparison logic from scratch.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>4</td><td>First operand</td></tr>
<tr><td>b</td><td>input</td><td>4</td><td>Second operand</td></tr>
<tr><td>gt</td><td>output</td><td>1</td><td>1 if a &gt; b</td></tr>
<tr><td>eq</td><td>output</td><td>1</td><td>1 if a == b</td></tr>
<tr><td>lt</td><td>output</td><td>1</td><td>1 if a &lt; b</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] a,
  input  [3:0] b,
  output       gt,
  output       eq,
  output       lt
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] a, b;
  wire gt, eq, lt;
  integer errors = 0;
  top_module dut(.a(a), .b(b), .gt(gt), .eq(eq), .lt(lt));
  task check;
    input [3:0] ia, ib; input egt, eeq, elt;
    begin
      a = ia; b = ib; #1;
      if (gt !== egt || eq !== eeq || lt !== elt) begin
        errors = errors + 1;
        $display("FAIL a=%d b=%d expected gt=%b eq=%b lt=%b got gt=%b eq=%b lt=%b", ia, ib, egt, eeq, elt, gt, eq, lt);
      end else $display("PASS a=%d b=%d", ia, ib);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(4'd3, 4'd5, 0, 0, 1);
    check(4'd5, 4'd3, 1, 0, 0);
    check(4'd5, 4'd5, 0, 1, 0);
    check(4'd0, 4'd15, 0, 0, 1);
    check(4'd15, 4'd0, 1, 0, 0);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'gt', 'eq', 'lt'],
      wavedrom: {
        signal: [
          { name: 'a[3:0]', wave: '2.3.4.', data: ['3', '5', '5'] },
          { name: 'b[3:0]', wave: '2.3.4.', data: ['5', '3', '5'] },
          { name: 'gt', wave: '0.1.0.' },
          { name: 'eq', wave: '0.0.1.' },
          { name: 'lt', wave: '1.0.0.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'bcd-7segment',
      title: 'BCD to 7-Segment Decoder',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'display'],
      category: 'Combinational Design',
      lede: 'Drive a 7-segment display from a 4-bit BCD digit (0-9). The kind of decoder inside every digital clock and calculator.',
      concept: '<b>Concept:</b> <code>seg[6:0] = {a,b,c,d,e,f,g}</code>, active-high — a segment lights when its bit is 1. This is a pure lookup table: a <code>case</code> statement mapping each digit 0-9 to its known segment pattern is the clean way to write it, no arithmetic needed.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>bcd</td><td>input</td><td>4</td><td>Digit 0-9 (inputs 10-15 are don't-care)</td></tr>
<tr><td>seg</td><td>output</td><td>7</td><td>Segments {a,b,c,d,e,f,g}, active-high</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input      [3:0] bcd,
  output reg [6:0] seg
);

  // Your code here — a case statement over bcd is the natural fit.

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] bcd;
  wire [6:0] seg;
  integer errors = 0;
  top_module dut(.bcd(bcd), .seg(seg));
  task check;
    input [3:0] b; input [6:0] es;
    begin
      bcd = b; #1;
      if (seg !== es) begin
        errors = errors + 1;
        $display("FAIL bcd=%d expected=%b got=%b", b, es, seg);
      end else $display("PASS bcd=%d seg=%b", b, seg);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(0, 7'b1111110);
    check(1, 7'b0110000);
    check(2, 7'b1101101);
    check(3, 7'b1111001);
    check(4, 7'b0110011);
    check(5, 7'b1011011);
    check(6, 7'b1011111);
    check(7, 7'b1110000);
    check(8, 7'b1111111);
    check(9, 7'b1111011);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['bcd', 'seg'],
      wavedrom: {
        signal: [
          { name: 'bcd[3:0]', wave: '2.3.4.5.', data: ['0', '1', '8', '9'] },
          { name: 'seg[6:0]', wave: '2.3.4.5.', data: ['1111110', '0110000', '1111111', '1111011'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'parity-generator',
      title: '8-Bit Even Parity Generator',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'parity'],
      category: 'Combinational Design',
      lede: 'Generate a parity bit so that data plus parity always has an even number of 1s — the simplest error-detection scheme in digital design.',
      concept: '<b>Concept:</b> <code>parity = ^data</code> (the XOR-reduce operator). XOR-reducing 8 bits yields 1 exactly when the number of 1s in data is odd — adding that as the parity bit makes the total count even.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>data</td><td>input</td><td>8</td><td>Data byte</td></tr>
<tr><td>parity</td><td>output</td><td>1</td><td>Even-parity bit</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] data,
  output       parity
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] data;
  wire parity;
  integer errors = 0;
  top_module dut(.data(data), .parity(parity));
  task check;
    input [7:0] d; input ep;
    begin
      data = d; #1;
      if (parity !== ep) begin
        errors = errors + 1;
        $display("FAIL data=%b expected=%b got=%b", d, ep, parity);
      end else $display("PASS data=%b parity=%b", d, parity);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(8'b00000000, 0);
    check(8'b00000001, 1);
    check(8'b00000011, 0);
    check(8'b11111111, 0);
    check(8'b10000000, 1);
    check(8'b10101010, 0);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['data', 'parity'],
      wavedrom: {
        signal: [
          { name: 'data[7:0]', wave: '2.3.4.', data: ['00000000', '00000001', '10101010'] },
          { name: 'parity', wave: '0.1.0.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'ripple-carry-adder4',
      title: '4-Bit Ripple Carry Adder',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'adder'],
      category: 'Combinational Design',
      lede: 'Add two 4-bit numbers plus a carry-in, producing a 4-bit sum and carry-out — the width-extended sibling of the half adder.',
      concept: '<b>Concept:</b> <code>{cout, sum} = a + b + cin;</code> — concatenating cout onto the front of sum captures the 5-bit result of the addition in one line, no manual carry-chain needed.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>4</td><td>First operand</td></tr>
<tr><td>b</td><td>input</td><td>4</td><td>Second operand</td></tr>
<tr><td>cin</td><td>input</td><td>1</td><td>Carry in</td></tr>
<tr><td>sum</td><td>output</td><td>4</td><td>a + b + cin, low 4 bits</td></tr>
<tr><td>cout</td><td>output</td><td>1</td><td>Carry out</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] a,
  input  [3:0] b,
  input        cin,
  output [3:0] sum,
  output       cout
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] a, b;
  reg cin;
  wire [3:0] sum;
  wire cout;
  integer errors = 0;
  top_module dut(.a(a), .b(b), .cin(cin), .sum(sum), .cout(cout));
  task check;
    input [3:0] ia, ib; input ic; input [3:0] es; input ec;
    begin
      a = ia; b = ib; cin = ic; #1;
      if (sum !== es || cout !== ec) begin
        errors = errors + 1;
        $display("FAIL a=%d b=%d cin=%b expected sum=%d cout=%b got sum=%d cout=%b", ia, ib, ic, es, ec, sum, cout);
      end else $display("PASS a=%d b=%d cin=%b sum=%d cout=%b", ia, ib, ic, sum, cout);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(4'd3, 4'd4, 0, 4'd7, 0);
    check(4'd15, 4'd1, 0, 4'd0, 1);
    check(4'd15, 4'd15, 1, 4'd15, 1);
    check(4'd0, 4'd0, 0, 4'd0, 0);
    check(4'd7, 4'd8, 1, 4'd0, 1);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'cin', 'sum', 'cout'],
      wavedrom: {
        signal: [
          { name: 'a[3:0]', wave: '2.3.4.', data: ['3', '15', '15'] },
          { name: 'b[3:0]', wave: '2.3.4.', data: ['4', '1', '15'] },
          { name: 'cin', wave: '0...1.' },
          { name: 'sum[3:0]', wave: '2.3.4.', data: ['7', '0', '15'] },
          { name: 'cout', wave: '0.1..1' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'jk-flip-flop',
      title: 'JK Flip-Flop',
      difficulty: 'easy',
      points: 10,
      tags: ['sequential', 'flip-flop'],
      category: 'Sequential Design',
      lede: 'The flip-flop with no forbidden state: j=k=1 toggles instead of racing. Classic building block for counters.',
      concept: '<b>Concept:</b> Four cases on <code>{j,k}</code> at every rising clock edge: <code>00</code> holds, <code>01</code> clears, <code>10</code> sets, <code>11</code> toggles (<code>q &lt;= ~q</code>). Unlike an SR latch, JK has a well-defined behavior for every input combination.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>j</td><td>input</td><td>1</td><td>Set control</td></tr>
<tr><td>k</td><td>input</td><td>1</td><td>Reset control</td></tr>
<tr><td>q</td><td>output</td><td>1</td><td>Registered output</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input      clk,
  input      j,
  input      k,
  output reg q
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, j, k;
  wire q;
  integer errors = 0;
  top_module dut(.clk(clk), .j(j), .k(k), .q(q));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input eq; input [127:0] label;
    begin
      if (q !== eq) begin
        errors = errors + 1;
        $display("FAIL %0s expected=%b got=%b", label, eq, q);
      end else $display("PASS %0s q=%b", label, q);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    j = 1; k = 0; @(posedge clk); #1; check(1, "set");
    j = 0; k = 0; @(posedge clk); #1; check(1, "hold");
    j = 0; k = 1; @(posedge clk); #1; check(0, "reset");
    j = 1; k = 1; @(posedge clk); #1; check(1, "toggle1");
    j = 1; k = 1; @(posedge clk); #1; check(0, "toggle2");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'j', 'k', 'q'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'j', wave: '1.0.0.1.' },
          { name: 'k', wave: '0.0.1.1.' },
          { name: 'q', wave: 'x1...0.1' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'updown-counter',
      title: '4-Bit Up/Down Counter',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'counter'],
      category: 'Sequential Design',
      lede: 'A synchronous counter that increments or decrements each clock edge depending on a direction input, with a synchronous reset.',
      concept: '<b>Concept:</b> A single direction bit picks the arithmetic: <code>q &lt;= up_down ? q + 1 : q - 1;</code>. Reset takes priority and forces q back to 0 regardless of direction.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>up_down</td><td>input</td><td>1</td><td>1 = count up, 0 = count down</td></tr>
<tr><td>q</td><td>output</td><td>4</td><td>Counter value</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input            clk,
  input            rst,
  input            up_down,
  output reg [3:0] q
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, up_down;
  wire [3:0] q;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .up_down(up_down), .q(q));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input [3:0] eq; input [127:0] label;
    begin
      if (q !== eq) begin
        errors = errors + 1;
        $display("FAIL %0s expected=%d got=%d", label, eq, q);
      end else $display("PASS %0s q=%d", label, q);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; up_down = 1; @(posedge clk); #1; check(0, "reset");
    rst = 0; @(posedge clk); #1; check(1, "up1");
    @(posedge clk); #1; check(2, "up2");
    up_down = 0; @(posedge clk); #1; check(1, "down1");
    @(posedge clk); #1; check(0, "down2");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'up_down', 'q'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'rst', wave: '10......' },
          { name: 'up_down', wave: '1.....0.' },
          { name: 'q[3:0]', wave: '2.3.4.5.', data: ['0', '1', '2', '1'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'mod6-counter',
      title: 'Modulo-6 Counter',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'counter'],
      category: 'Sequential Design',
      lede: 'A counter that wraps back to 0 after reaching 5, instead of overflowing at the natural binary boundary — the pattern behind clock dividers and digit counters.',
      concept: '<b>Concept:</b> Ordinary counters wrap for free at 2^N. A modulo-6 counter needs an explicit wrap check: <code>if (q == 5) q &lt;= 0; else q &lt;= q + 1;</code> — the comparison must come before the increment in priority, not after.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>q</td><td>output</td><td>3</td><td>Counts 0 through 5, then wraps</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input            clk,
  input            rst,
  output reg [2:0] q
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst;
  wire [2:0] q;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .q(q));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input [2:0] eq; input [127:0] label;
    begin
      if (q !== eq) begin
        errors = errors + 1;
        $display("FAIL %0s expected=%d got=%d", label, eq, q);
      end else $display("PASS %0s q=%d", label, q);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; @(posedge clk); #1; check(0, "reset");
    rst = 0;
    @(posedge clk); #1; check(1, "c1");
    @(posedge clk); #1; check(2, "c2");
    @(posedge clk); #1; check(3, "c3");
    @(posedge clk); #1; check(4, "c4");
    @(posedge clk); #1; check(5, "c5");
    @(posedge clk); #1; check(0, "wrap");
    @(posedge clk); #1; check(1, "c1again");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'q'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.........' },
          { name: 'rst', wave: '10........' },
          { name: 'q[2:0]', wave: '2.3.4.5.6.', data: ['0', '3', '4', '5', '0'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'sequence-detector-1011',
      title: 'Sequence Detector: 1011 (Overlapping)',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'fsm'],
      category: 'Sequential Design',
      lede: 'A Moore FSM that watches a serial bit stream and pulses high for one cycle right after it spots the pattern 1011 — overlapping matches count.',
      concept: '<b>Concept:</b> Track "longest prefix of 1011 matched so far" as a 5-state machine (S0..S4). Overlap matters: after matching 1011, the last bit of that match can also start the next one, so S4 doesn\'t reset all the way back to S0 — it re-enters the automaton the same way S1 would. <code>detected</code> is a Moore output: it is simply <code>(state == S4)</code>, true for one full cycle after the fourth matching bit is clocked in.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>in</td><td>input</td><td>1</td><td>Serial bit stream, one bit per clock</td></tr>
<tr><td>detected</td><td>output</td><td>1</td><td>High for one cycle after "1011" is matched</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  in,
  output detected
);

  // Your code here — a 5-state FSM (S0..S4) tracking match progress works well.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, in;
  wire detected;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .in(in), .detected(detected));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input ed; input [127:0] label;
    begin
      if (detected !== ed) begin
        errors = errors + 1;
        $display("FAIL %0s expected=%b got=%b", label, ed, detected);
      end else $display("PASS %0s detected=%b", label, detected);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; in = 0; @(posedge clk); #1; check(0, "reset");
    rst = 0;
    in = 1; @(posedge clk); #1; check(0, "b1");
    in = 0; @(posedge clk); #1; check(0, "b2");
    in = 1; @(posedge clk); #1; check(0, "b3");
    in = 1; @(posedge clk); #1; check(1, "b4-match");
    in = 0; @(posedge clk); #1; check(0, "b5");
    in = 1; @(posedge clk); #1; check(0, "b6");
    in = 1; @(posedge clk); #1; check(1, "b7-overlap-match");
    in = 0; @(posedge clk); #1; check(0, "b8");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'in', 'detected'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.................' },
          { name: 'in', wave: '0.1.0.1.1.0.1.1.0.' },
          { name: 'detected', wave: '0.......1...0...1.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'binary-counter',
      title: '4-Bit Binary Counter',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'counter'],
      category: 'Sequential Design',
      lede: 'Synchronous 4-bit up-counter with active-high reset. Counts on posedge clk; reset clears to 0.',
      concept: '<b>Concept:</b> Use non-blocking assigns in <code>always @(posedge clk)</code>. Reset has priority over increment.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>q</td><td>output</td><td>4</td><td>Count value</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input            clk,
  input            rst,
  output reg [3:0] q
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst;
  wire [3:0] q;
  integer errors = 0;
  integer i;
  top_module dut(.clk(clk), .rst(rst), .q(q));
  initial clk = 0;
  always #5 clk = ~clk;
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1;
    @(posedge clk); #1;
    if (q !== 4'd0) begin errors = errors + 1; $display("FAIL after reset q=%0d", q); end
    else $display("PASS reset q=0");
    rst = 0;
    for (i = 1; i <= 5; i = i + 1) begin
      @(posedge clk); #1;
          if (q !== i) begin
        errors = errors + 1;
        $display("FAIL expected q=%0d got %0d", i, q);
      end else $display("PASS q=%0d", q);
    end
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'q'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p........' },
          { name: 'rst', wave: '10.......' },
          { name: 'q[3:0]', wave: 'x.2.3.4.5.6', data: ['0', '1', '2', '3', '4'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'rising-edge-detector',
      title: 'Rising Edge Detector',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'edge'],
      category: 'Sequential Design',
      lede: 'Pulse out high for one clock when din rises 0→1. Sync to clk; ignore din otherwise.',
      concept: '<b>Concept:</b> Register din, then <code>out = din &amp; ~din_d</code>.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>din</td><td>input</td><td>1</td><td>Input signal</td></tr>
<tr><td>out</td><td>output</td><td>1</td><td>1-cycle pulse on rising edge</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  din,
  output out
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, din;
  wire out;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .din(din), .out(out));
  initial clk = 0;
  always #5 clk = ~clk;
  task tick;
    begin @(posedge clk); #1; end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; din = 0;
    tick;
    if (out !== 1'b0) begin errors = errors + 1; $display("FAIL reset out=%b", out); end
    else $display("PASS reset");
    rst = 0;
    din = 0; tick;
    din = 1; tick;
    if (out !== 1'b1) begin errors = errors + 1; $display("FAIL rise pulse expected 1 got %b", out); end
    else $display("PASS rising pulse");
    tick;
    if (out !== 1'b0) begin errors = errors + 1; $display("FAIL hold expected 0 got %b", out); end
    else $display("PASS no pulse while high");
    din = 0; tick;
    din = 1; tick;
    if (out !== 1'b1) begin errors = errors + 1; $display("FAIL second rise expected 1 got %b", out); end
    else $display("PASS second rising pulse");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'din', 'out'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p........' },
          { name: 'din', wave: '0..1..0.1' },
          { name: 'out', wave: '0...10..10' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'toggle-ff',
      title: 'T Flip-Flop (Enable Toggle)',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'fsm'],
      category: 'Sequential Design',
      lede: 'When t=1, toggle q each clock. When t=0, hold. Sync reset clears q to 0.',
      concept: '<b>Concept:</b> <code>q &lt;= rst ? 0 : (t ? ~q : q);</code>',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>t</td><td>input</td><td>1</td><td>Toggle enable</td></tr>
<tr><td>q</td><td>output</td><td>1</td><td>Stored bit</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input      clk,
  input      rst,
  input      t,
  output reg q
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, t;
  wire q;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .t(t), .q(q));
  initial clk = 0;
  always #5 clk = ~clk;
  task tick; begin @(posedge clk); #1; end endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; t = 0; tick;
    if (q !== 0) begin errors = errors + 1; $display("FAIL reset"); end
    else $display("PASS reset");
    rst = 0; t = 1; tick;
    if (q !== 1) begin errors = errors + 1; $display("FAIL toggle to 1 got %b", q); end
    else $display("PASS toggle 0->1");
    tick;
    if (q !== 0) begin errors = errors + 1; $display("FAIL toggle to 0 got %b", q); end
    else $display("PASS toggle 1->0");
    t = 0; tick;
    if (q !== 0) begin errors = errors + 1; $display("FAIL hold got %b", q); end
    else $display("PASS hold");
    t = 1; tick;
    if (q !== 1) begin errors = errors + 1; $display("FAIL toggle again got %b", q); end
    else $display("PASS toggle again");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 't', 'q'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p......' },
          { name: 't', wave: '0.1.0.1' },
          { name: 'q', wave: '0.1.0..1' }
        ],
        config: { hscale: 1 }
      }
    }
  ];

  function getProblem(slug) {
    return PROBLEMS.find(p => p.slug === slug) || null;
  }

  global.ECRIONIX_PROBLEMS = PROBLEMS;
  global.EcrioniXProblemCatalog = { PROBLEMS, getProblem, POINTS: { easy: 10, medium: 25, hard: 50 } };
})(typeof window !== 'undefined' ? window : globalThis);
