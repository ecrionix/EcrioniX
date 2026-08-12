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
          { name: 'a', wave: '0...1...' },
          { name: 'b', wave: '1...0...' },
          { name: 'sel', wave: '0.1.0.1.' },
          { name: 'out', wave: '0.1.1.0.' }
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
          { name: 'a', wave: '00001111' },
          { name: 'b', wave: '00110011' },
          { name: 'cin', wave: '01010101' },
          { name: 'sum', wave: '01101001' },
          { name: 'cout', wave: '00010111' }
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
          { name: 'in[3:0]', wave: '2.3.4.5.6.', data: ['0000', '0001', '0010', '0100', '1000'] },
          { name: 'valid', wave: '0.1.......' },
          { name: 'out[1:0]', wave: 'x.2.3.4.5.', data: ['0', '1', '2', '3'] }
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
          { name: 'clk', wave: 'p.........' },
          { name: 'rst_n', wave: '0.1.....0.' },
          { name: 'd', wave: '0.1.0.1...' },
          { name: 'q', wave: '0.1.0.1.0.' }
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
          { name: 'clk', wave: 'p.........' },
          { name: 'rst', wave: '10........' },
          { name: 'up_down', wave: '1.....0...' },
          { name: 'q[3:0]', wave: '2.3.4.5.6.', data: ['0', '1', '2', '1', '0'] }
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
          { name: 'clk', wave: 'p.............' },
          { name: 'rst', wave: '10............' },
          { name: 'q[2:0]', wave: '2.3.4.5.6.7.8.', data: ['0', '1', '2', '3', '4', '5', '0'] }
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
      slug: 'full-subtractor',
      title: '1-Bit Full Subtractor',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'subtractor'],
      category: 'Combinational Design',
      lede: 'Subtract b and a borrow-in from a, producing a difference bit and a borrow-out — the subtraction twin of the full adder.',
      concept: '<b>Concept:</b> <code>diff = a ^ b ^ bin</code> (same XOR pattern as addition — subtraction and addition share the same bit-difference logic). The borrow-out is 1 whenever a is too small to cover b and bin: <code>bout = (~a &amp; b) | (~a &amp; bin) | (b &amp; bin)</code>.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>1</td><td>Minuend bit</td></tr>
<tr><td>b</td><td>input</td><td>1</td><td>Subtrahend bit</td></tr>
<tr><td>bin</td><td>input</td><td>1</td><td>Borrow in</td></tr>
<tr><td>diff</td><td>output</td><td>1</td><td>a − b − bin, low bit</td></tr>
<tr><td>bout</td><td>output</td><td>1</td><td>Borrow out</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  a,
  input  b,
  input  bin,
  output diff,
  output bout
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg a, b, bin;
  wire diff, bout;
  integer errors = 0;
  top_module dut(.a(a), .b(b), .bin(bin), .diff(diff), .bout(bout));
  task check;
    input ia, ib, ic; input ed, eb;
    begin
      a = ia; b = ib; bin = ic; #1;
      if (diff !== ed || bout !== eb) begin
        errors = errors + 1;
        $display("FAIL a=%b b=%b bin=%b expected diff=%b bout=%b got diff=%b bout=%b", ia, ib, ic, ed, eb, diff, bout);
      end else $display("PASS a=%b b=%b bin=%b", ia, ib, ic);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(0, 0, 0, 0, 0);
    check(0, 0, 1, 1, 1);
    check(0, 1, 0, 1, 1);
    check(0, 1, 1, 0, 1);
    check(1, 0, 0, 1, 0);
    check(1, 0, 1, 0, 0);
    check(1, 1, 0, 0, 0);
    check(1, 1, 1, 1, 1);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'bin', 'diff', 'bout'],
      wavedrom: {
        signal: [
          { name: 'a', wave: '0.1.0.1.' },
          { name: 'b', wave: '0.0.1.1.' },
          { name: 'bin', wave: '0.0.0.1.' },
          { name: 'diff', wave: '0.1.1.1.' },
          { name: 'bout', wave: '0.0.1.1.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'binary-to-gray',
      title: 'Binary to Gray Code Converter',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'code-converter'],
      category: 'Combinational Design',
      lede: 'Convert a 4-bit binary number into its Gray code equivalent, where only one bit ever changes between consecutive values.',
      concept: '<b>Concept:</b> <code>gray = bin ^ (bin &gt;&gt; 1)</code>. XOR-ing a number with itself shifted right by one produces a code where adjacent values differ in exactly one bit — the property that makes Gray code safe to sample across clock domains.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>bin</td><td>input</td><td>4</td><td>Standard binary value</td></tr>
<tr><td>gray</td><td>output</td><td>4</td><td>Gray-coded equivalent</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] bin,
  output [3:0] gray
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] bin;
  wire [3:0] gray;
  integer errors = 0;
  top_module dut(.bin(bin), .gray(gray));
  task check;
    input [3:0] b; input [3:0] eg;
    begin
      bin = b; #1;
      if (gray !== eg) begin
        errors = errors + 1;
        $display("FAIL bin=%b expected=%b got=%b", b, eg, gray);
      end else $display("PASS bin=%b gray=%b", b, gray);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(4'd0, 4'b0000);
    check(4'd1, 4'b0001);
    check(4'd2, 4'b0011);
    check(4'd3, 4'b0010);
    check(4'd7, 4'b0100);
    check(4'd8, 4'b1100);
    check(4'd15, 4'b1000);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['bin', 'gray'],
      wavedrom: {
        signal: [
          { name: 'bin[3:0]', wave: '2.3.4.5.', data: ['0', '1', '2', '3'] },
          { name: 'gray[3:0]', wave: '2.3.4.5.', data: ['0000', '0001', '0011', '0010'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'gray-to-binary',
      title: 'Gray to Binary Code Converter',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'code-converter'],
      category: 'Combinational Design',
      lede: 'Reverse the conversion: turn a 4-bit Gray code value back into standard binary.',
      concept: '<b>Concept:</b> Unlike binary-to-Gray, this direction is a ripple of XORs, not a single expression: <code>bin[3]=gray[3]</code>, then each lower bit is the XOR of the previous binary bit with the matching gray bit — <code>bin[i] = bin[i+1] ^ gray[i]</code>, computed from the top bit down.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>gray</td><td>input</td><td>4</td><td>Gray-coded value</td></tr>
<tr><td>bin</td><td>output</td><td>4</td><td>Standard binary equivalent</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] gray,
  output [3:0] bin
);

  // Your code here — bin[3]=gray[3], then ripple down: bin[i] = bin[i+1] ^ gray[i].

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] gray;
  wire [3:0] bin;
  integer errors = 0;
  top_module dut(.gray(gray), .bin(bin));
  task check;
    input [3:0] g; input [3:0] eb;
    begin
      gray = g; #1;
      if (bin !== eb) begin
        errors = errors + 1;
        $display("FAIL gray=%b expected=%b got=%b", g, eb, bin);
      end else $display("PASS gray=%b bin=%b", g, bin);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(4'b0000, 4'd0);
    check(4'b0001, 4'd1);
    check(4'b0011, 4'd2);
    check(4'b0010, 4'd3);
    check(4'b0110, 4'd4);
    check(4'b0100, 4'd7);
    check(4'b1100, 4'd8);
    check(4'b1000, 4'd15);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['gray', 'bin'],
      wavedrom: {
        signal: [
          { name: 'gray[3:0]', wave: '2.3.4.5.', data: ['0000', '0001', '0011', '0010'] },
          { name: 'bin[3:0]', wave: '2.3.4.5.', data: ['0', '1', '2', '3'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'priority-encoder-8to3',
      title: '8-to-3 Priority Encoder',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'encoder'],
      category: 'Combinational Design',
      lede: 'The wider sibling of the 4-to-2 priority encoder: pick the index of the highest-priority set bit among 8 request lines.',
      concept: '<b>Concept:</b> Same priority-checking idea as the 4-input version, just one more level of nested ternaries (or a case statement) — always check the highest bit first, since it wins regardless of what else is set.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>in</td><td>input</td><td>8</td><td>Request lines, bit 7 = highest priority</td></tr>
<tr><td>out</td><td>output</td><td>3</td><td>Index of highest set bit (don't-care if valid=0)</td></tr>
<tr><td>valid</td><td>output</td><td>1</td><td>1 if any input bit is set</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] in,
  output [2:0] out,
  output       valid
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] in;
  wire [2:0] out;
  wire valid;
  integer errors = 0;
  top_module dut(.in(in), .out(out), .valid(valid));
  task check;
    input [7:0] i; input ev; input [2:0] eo;
    begin
      in = i; #1;
      if (valid !== ev || out !== eo) begin
        errors = errors + 1;
        $display("FAIL in=%b expected valid=%b out=%b got valid=%b out=%b", i, ev, eo, valid, out);
      end else $display("PASS in=%b valid=%b out=%b", i, valid, out);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(8'b00000000, 0, 3'd0);
    check(8'b00000001, 1, 3'd0);
    check(8'b00000110, 1, 3'd2);
    check(8'b10000000, 1, 3'd7);
    check(8'b10100000, 1, 3'd7);
    check(8'b00011000, 1, 3'd4);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['in', 'valid', 'out'],
      wavedrom: {
        signal: [
          { name: 'in[7:0]', wave: '2.3.4.5.', data: ['00000000', '00000001', '10000000', '00011000'] },
          { name: 'valid', wave: '0.1.....' },
          { name: 'out[2:0]', wave: 'x.2.3.4.', data: ['0', '7', '4'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'alu-4bit',
      title: '4-Bit ALU',
      difficulty: 'hard',
      points: 50,
      tags: ['combinational', 'alu'],
      category: 'Combinational Design',
      lede: 'Build a small arithmetic-logic unit: add, subtract, AND, or OR two 4-bit numbers based on a 2-bit opcode, plus a zero flag.',
      concept: '<b>Concept:</b> A <code>case</code> on <code>op</code> inside a combinational <code>always @(*)</code> block selects the operation; <code>zero</code> is simply a comparison of the result against 0, computed after the case decides <code>out</code>.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>4</td><td>First operand</td></tr>
<tr><td>b</td><td>input</td><td>4</td><td>Second operand</td></tr>
<tr><td>op</td><td>input</td><td>2</td><td>00=add, 01=subtract, 10=AND, 11=OR</td></tr>
<tr><td>out</td><td>output</td><td>4</td><td>Result</td></tr>
<tr><td>zero</td><td>output</td><td>1</td><td>1 if out == 0</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input      [3:0] a,
  input      [3:0] b,
  input      [1:0] op,
  output reg [3:0] out,
  output           zero
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] a, b;
  reg [1:0] op;
  wire [3:0] out;
  wire zero;
  integer errors = 0;
  top_module dut(.a(a), .b(b), .op(op), .out(out), .zero(zero));
  task check;
    input [3:0] ia, ib; input [1:0] iop; input [3:0] eo; input ez;
    begin
      a = ia; b = ib; op = iop; #1;
      if (out !== eo || zero !== ez) begin
        errors = errors + 1;
        $display("FAIL a=%d b=%d op=%b expected out=%d zero=%b got out=%d zero=%b", ia, ib, iop, eo, ez, out, zero);
      end else $display("PASS a=%d b=%d op=%b out=%d zero=%b", ia, ib, iop, out, zero);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(4'd3, 4'd4, 2'b00, 4'd7, 0);
    check(4'd5, 4'd3, 2'b01, 4'd2, 0);
    check(4'd3, 4'd3, 2'b01, 4'd0, 1);
    check(4'd12, 4'd10, 2'b10, 4'd8, 0);
    check(4'd12, 4'd10, 2'b11, 4'd14, 0);
    check(4'd2, 4'd14, 2'b01, 4'd4, 0);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'op', 'out', 'zero'],
      wavedrom: {
        signal: [
          { name: 'a[3:0]', wave: '2.3.4.', data: ['3', '5', '3'] },
          { name: 'b[3:0]', wave: '2.3.4.', data: ['4', '3', '3'] },
          { name: 'op[1:0]', wave: '2.3.4.', data: ['00', '01', '01'] },
          { name: 'out[3:0]', wave: '2.3.4.', data: ['7', '2', '0'] },
          { name: 'zero', wave: '0...1.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'barrel-rotator',
      title: '8-Bit Barrel Rotator',
      difficulty: 'hard',
      points: 50,
      tags: ['combinational', 'shifter'],
      category: 'Combinational Design',
      lede: 'Rotate an 8-bit value left by a variable amount in a single combinational step — no loops, no clock.',
      concept: '<b>Concept:</b> <code>out = (data &lt;&lt; shamt) | (data &gt;&gt; (8 - shamt));</code>. The left shift drops bits off the top; the right shift recovers exactly those dropped bits and reinserts them at the bottom — OR-ing the two reconstructs a rotation instead of a plain shift.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>data</td><td>input</td><td>8</td><td>Value to rotate</td></tr>
<tr><td>shamt</td><td>input</td><td>3</td><td>Rotate amount, 0-7</td></tr>
<tr><td>out</td><td>output</td><td>8</td><td>data rotated left by shamt</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] data,
  input  [2:0] shamt,
  output [7:0] out
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] data;
  reg [2:0] shamt;
  wire [7:0] out;
  integer errors = 0;
  top_module dut(.data(data), .shamt(shamt), .out(out));
  task check;
    input [7:0] d; input [2:0] s; input [7:0] eo;
    begin
      data = d; shamt = s; #1;
      if (out !== eo) begin
        errors = errors + 1;
        $display("FAIL data=%b shamt=%d expected=%b got=%b", d, s, eo, out);
      end else $display("PASS data=%b shamt=%d out=%b", d, s, out);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(8'b10110001, 3'd3, 8'b10001101);
    check(8'b00000001, 3'd1, 8'b00000010);
    check(8'b00000001, 3'd7, 8'b10000000);
    check(8'b10110001, 3'd0, 8'b10110001);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['data', 'shamt', 'out'],
      wavedrom: {
        signal: [
          { name: 'data[7:0]', wave: '2.....', data: ['10110001'] },
          { name: 'shamt[2:0]', wave: '2.3.4.', data: ['0', '1', '3'] },
          { name: 'out[7:0]', wave: '2.3.4.', data: ['10110001', '01100011', '10001101'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'majority-voter',
      title: '3-Input Majority Voter',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'voter'],
      category: 'Combinational Design',
      lede: 'Output 1 whenever at least two of the three inputs agree — the logic behind triple-modular-redundancy fault tolerance.',
      concept: '<b>Concept:</b> <code>out = (a&amp;b) | (b&amp;c) | (a&amp;c)</code> — check every pair; if any pair is both 1, that\'s already a majority regardless of the third input.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>1</td><td>Vote 1</td></tr>
<tr><td>b</td><td>input</td><td>1</td><td>Vote 2</td></tr>
<tr><td>c</td><td>input</td><td>1</td><td>Vote 3</td></tr>
<tr><td>out</td><td>output</td><td>1</td><td>1 if two or more votes are 1</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  a,
  input  b,
  input  c,
  output out
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg a, b, c;
  wire out;
  integer errors = 0;
  top_module dut(.a(a), .b(b), .c(c), .out(out));
  task check;
    input ia, ib, ic; input eo;
    begin
      a = ia; b = ib; c = ic; #1;
      if (out !== eo) begin
        errors = errors + 1;
        $display("FAIL a=%b b=%b c=%b expected=%b got=%b", ia, ib, ic, eo, out);
      end else $display("PASS a=%b b=%b c=%b out=%b", ia, ib, ic, out);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(0, 0, 0, 0);
    check(0, 0, 1, 0);
    check(0, 1, 0, 0);
    check(0, 1, 1, 1);
    check(1, 0, 0, 0);
    check(1, 0, 1, 1);
    check(1, 1, 0, 1);
    check(1, 1, 1, 1);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'c', 'out'],
      wavedrom: {
        signal: [
          { name: 'a', wave: '0.1.0.1.' },
          { name: 'b', wave: '0.1.1.0.' },
          { name: 'c', wave: '0.0.1.1.' },
          { name: 'out', wave: '0.1.1.1.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'gray-code-counter',
      title: '4-Bit Gray Code Counter',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'counter', 'gray-code'],
      category: 'Sequential Design',
      lede: 'A counter whose output is always valid Gray code, changing only one bit per clock — used to safely cross clock domains.',
      concept: '<b>Concept:</b> Don\'t try to increment Gray code directly — keep a hidden ordinary binary counter internally, and convert it to Gray for the output every cycle: <code>q = bin ^ (bin &gt;&gt; 1)</code>, same trick as the standalone binary-to-Gray converter.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>q</td><td>output</td><td>4</td><td>Gray-coded count</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input        clk,
  input        rst,
  output [3:0] q
);

  // Your code here — an internal binary counter converted to Gray for q works well.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst;
  wire [3:0] q;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .q(q));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input [3:0] eq; input [127:0] label;
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
    rst = 1; @(posedge clk); #1; check(4'b0000, "reset");
    rst = 0;
    @(posedge clk); #1; check(4'b0001, "c1");
    @(posedge clk); #1; check(4'b0011, "c2");
    @(posedge clk); #1; check(4'b0010, "c3");
    @(posedge clk); #1; check(4'b0110, "c4");
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
          { name: 'q[3:0]', wave: '2.3.4.5.6.', data: ['0', '1', '3', '2', '6'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'lfsr-4bit',
      title: '4-Bit Linear Feedback Shift Register',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'lfsr'],
      category: 'Sequential Design',
      lede: 'A self-shifting register that generates a pseudo-random bit sequence — the core of BIST pattern generators and simple scramblers.',
      concept: '<b>Concept:</b> Fibonacci LFSR with taps at bits 3 and 2: feed <code>q[3] ^ q[2]</code> back into the LSB every cycle, <code>q &lt;= {q[2:0], feedback};</code>. Seed with a non-zero value on reset — an all-zero LFSR is stuck forever.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync reset, seeds q to 0001</td></tr>
<tr><td>q</td><td>output</td><td>4</td><td>LFSR state</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input      clk,
  input      rst,
  output reg [3:0] q
);

  // Your code here — seed q to 4'b0001 on reset, then shift with feedback = q[3]^q[2].

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst;
  wire [3:0] q;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .q(q));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input [3:0] eq; input [127:0] label;
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
    rst = 1; @(posedge clk); #1; check(4'b0001, "seed");
    rst = 0;
    @(posedge clk); #1; check(4'b0010, "s1");
    @(posedge clk); #1; check(4'b0100, "s2");
    @(posedge clk); #1; check(4'b1001, "s3");
    @(posedge clk); #1; check(4'b0011, "s4");
    @(posedge clk); #1; check(4'b0110, "s5");
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
          { name: 'q[3:0]', wave: '2.3.4.5.6.', data: ['0001', '0010', '0100', '1001', '0011'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'piso-shift-register',
      title: '4-Bit Shift Register (PISO)',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'shift-register'],
      category: 'Sequential Design',
      lede: 'Parallel-in, serial-out shift register — load a nibble in one cycle, then read it out one bit at a time, MSB first.',
      concept: '<b>Concept:</b> On <code>load</code>, capture the whole word: <code>q &lt;= din;</code>. Otherwise shift left each cycle, filling the vacated LSB with 0: <code>q &lt;= {q[2:0], 1\'b0};</code>. The serial output is simply the current MSB, <code>sout = q[3]</code>.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>load</td><td>input</td><td>1</td><td>1 = load din, 0 = shift</td></tr>
<tr><td>din</td><td>input</td><td>4</td><td>Parallel data to load</td></tr>
<tr><td>sout</td><td>output</td><td>1</td><td>Current MSB of the register</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  load,
  input  [3:0] din,
  output sout
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, load;
  reg [3:0] din;
  wire sout;
  integer errors = 0;
  top_module dut(.clk(clk), .load(load), .din(din), .sout(sout));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input es; input [127:0] label;
    begin
      if (sout !== es) begin
        errors = errors + 1;
        $display("FAIL %0s expected=%b got=%b", label, es, sout);
      end else $display("PASS %0s sout=%b", label, sout);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    load = 1; din = 4'b1011; @(posedge clk); #1; check(1, "load");
    load = 0; @(posedge clk); #1; check(0, "shift1");
    @(posedge clk); #1; check(1, "shift2");
    @(posedge clk); #1; check(1, "shift3");
    @(posedge clk); #1; check(0, "shift4");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'load', 'din', 'sout'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p........' },
          { name: 'load', wave: '10.......' },
          { name: 'din[3:0]', wave: '2........', data: ['1011'] },
          { name: 'sout', wave: '1.0.1.1.0' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'universal-shift-register',
      title: '4-Bit Universal Shift Register',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'shift-register'],
      category: 'Sequential Design',
      lede: 'One register, four behaviors: hold, shift left, shift right, or parallel load, all picked by a 2-bit mode select.',
      concept: '<b>Concept:</b> A <code>case</code> on <code>mode</code> inside the clocked always block: <code>00</code> holds (<code>q&lt;=q</code>), <code>01</code> shifts left bringing <code>sin</code> into the LSB, <code>10</code> shifts right bringing <code>sin</code> into the MSB, <code>11</code> loads <code>din</code> directly.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>mode</td><td>input</td><td>2</td><td>00=hold, 01=shift-left, 10=shift-right, 11=load</td></tr>
<tr><td>sin</td><td>input</td><td>1</td><td>Serial input for either shift direction</td></tr>
<tr><td>din</td><td>input</td><td>4</td><td>Parallel load data</td></tr>
<tr><td>q</td><td>output</td><td>4</td><td>Register contents</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input            clk,
  input            rst,
  input      [1:0] mode,
  input            sin,
  input      [3:0] din,
  output reg [3:0] q
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst;
  reg [1:0] mode;
  reg sin;
  reg [3:0] din;
  wire [3:0] q;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .mode(mode), .sin(sin), .din(din), .q(q));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input [3:0] eq; input [127:0] label;
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
    rst = 1; mode = 2'b00; sin = 0; din = 0; @(posedge clk); #1; check(4'b0000, "reset");
    rst = 0; mode = 2'b11; din = 4'b1010; @(posedge clk); #1; check(4'b1010, "load");
    mode = 2'b01; sin = 1; @(posedge clk); #1; check(4'b0101, "shiftleft");
    mode = 2'b10; sin = 1; @(posedge clk); #1; check(4'b1010, "shiftright");
    mode = 2'b00; @(posedge clk); #1; check(4'b1010, "hold");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'mode', 'sin', 'q'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'mode[1:0]', wave: '2.3.4.5.', data: ['11', '01', '10', '00'] },
          { name: 'q[3:0]', wave: '2.3.4.5.', data: ['1010', '0101', '1010', '1010'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'pulse-stretcher',
      title: 'Pulse Stretcher',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'pulse'],
      category: 'Sequential Design',
      lede: 'Turn a single 1-cycle pulse into a guaranteed 3-cycle-wide output pulse — the kind of circuit that makes a fast event visible to a slow observer.',
      concept: '<b>Concept:</b> A down-counter tracks remaining stretch cycles. When idle (<code>cnt==0</code>) and <code>pulse_in</code> arrives, load <code>cnt&lt;=3</code>; otherwise count down while <code>cnt&gt;0</code>. <code>pulse_out = (cnt &gt; 0)</code>. A new pulse arriving mid-stretch is ignored — no retriggering.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>pulse_in</td><td>input</td><td>1</td><td>1-cycle trigger pulse</td></tr>
<tr><td>pulse_out</td><td>output</td><td>1</td><td>High for 3 cycles after a trigger</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  pulse_in,
  output pulse_out
);

  // Your code here — a small down-counter (0..3) works well.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, pulse_in;
  wire pulse_out;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .pulse_in(pulse_in), .pulse_out(pulse_out));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input ep; input [127:0] label;
    begin
      if (pulse_out !== ep) begin
        errors = errors + 1;
        $display("FAIL %0s expected=%b got=%b", label, ep, pulse_out);
      end else $display("PASS %0s pulse_out=%b", label, pulse_out);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; pulse_in = 0; @(posedge clk); #1; check(0, "reset");
    rst = 0;
    pulse_in = 1; @(posedge clk); #1; check(1, "stretch1");
    pulse_in = 1; @(posedge clk); #1; check(1, "stretch2-ignored-retrigger");
    pulse_in = 0; @(posedge clk); #1; check(1, "stretch3");
    @(posedge clk); #1; check(0, "done");
    @(posedge clk); #1; check(0, "idle");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'pulse_in', 'pulse_out'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.........' },
          { name: 'pulse_in', wave: '0.10......' },
          { name: 'pulse_out', wave: '0..1..0...' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'sequence-detector-101-nonoverlap',
      title: 'Sequence Detector: 101 (Non-Overlapping)',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'fsm'],
      category: 'Sequential Design',
      lede: 'A Moore FSM detecting the pattern 101 on a serial stream — but unlike the overlapping 1011 detector, a match here consumes all three bits before searching resumes.',
      concept: '<b>Concept:</b> Same 4-state shape as an overlapping detector (S0..S3), but the "just matched" state S3 restarts the search from scratch instead of reusing the failure function: <code>S3</code> transitions exactly like <code>S0</code> would. That single difference is what makes back-to-back matches non-overlapping.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>in</td><td>input</td><td>1</td><td>Serial bit stream, one bit per clock</td></tr>
<tr><td>detected</td><td>output</td><td>1</td><td>High for one cycle after "101" is matched</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  in,
  output detected
);

  // Your code here — 4-state FSM (S0..S3); S3 should transition just like S0.

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
    in = 1; @(posedge clk); #1; check(1, "b3-match");
    in = 1; @(posedge clk); #1; check(0, "b4");
    in = 0; @(posedge clk); #1; check(0, "b5");
    in = 1; @(posedge clk); #1; check(1, "b6-match-nonoverlap");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'in', 'detected'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.............' },
          { name: 'in', wave: '0.1.0.1.1.0.1.' },
          { name: 'detected', wave: '0.....1...0.1.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'traffic-light-fsm',
      title: 'Traffic Light Controller',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'fsm'],
      category: 'Sequential Design',
      lede: 'A timer-driven Moore FSM that cycles a single intersection through RED, GREEN, and YELLOW on fixed schedules — the classic FSM-with-a-counter pattern.',
      concept: '<b>Concept:</b> Each state holds an internal cycle counter that counts up while waiting for its duration to expire, then advances to the next state and resets the counter: RED for 3 cycles → GREEN for 3 cycles → YELLOW for 2 cycles → back to RED. <code>light</code> is simply the state register itself (a Moore output).',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (starts at RED)</td></tr>
<tr><td>light</td><td>output</td><td>2</td><td>0=RED (3 cycles), 1=GREEN (3 cycles), 2=YELLOW (2 cycles)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input        clk,
  input        rst,
  output [1:0] light
);

  // Your code here — state register + per-state cycle counter.
  // RED=0 for 3 cycles, GREEN=1 for 3 cycles, YELLOW=2 for 2 cycles, repeat.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst;
  wire [1:0] light;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .light(light));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input [1:0] el; input [127:0] label;
    begin
      if (light !== el) begin
        errors = errors + 1;
        $display("FAIL %0s expected=%d got=%d", label, el, light);
      end else $display("PASS %0s light=%d", label, light);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; @(posedge clk); #1; check(0, "reset");
    rst = 0;
    @(posedge clk); #1; check(0, "red2");
    @(posedge clk); #1; check(0, "red3");
    @(posedge clk); #1; check(1, "green1");
    @(posedge clk); #1; check(1, "green2");
    @(posedge clk); #1; check(1, "green3");
    @(posedge clk); #1; check(2, "yellow1");
    @(posedge clk); #1; check(2, "yellow2");
    @(posedge clk); #1; check(0, "wrap-red");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'light'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.................' },
          { name: 'light', wave: '2...3...4...2.....', data: ['RED', 'GREEN', 'YELLOW', 'RED'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'vending-machine-fsm',
      title: 'Vending Machine FSM (15-Cent)',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'fsm'],
      category: 'Sequential Design',
      lede: 'A classic textbook FSM: accept nickels and dimes, and dispense as soon as the running total reaches 15 cents (no change given).',
      concept: '<b>Concept:</b> Track cents in a register. Compute <code>next_cents</code> combinationally from the current total plus whatever coin is inserted this cycle; <code>dispense</code> is simply <code>(next_cents &gt;= 15)</code>. On the clock edge, if the threshold was reached, reset the total to 0 instead of carrying it forward (no change is given for overpayment).',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>nickel</td><td>input</td><td>1</td><td>1 = a nickel (5¢) is inserted this cycle</td></tr>
<tr><td>dime</td><td>input</td><td>1</td><td>1 = a dime (10¢) is inserted this cycle</td></tr>
<tr><td>dispense</td><td>output</td><td>1</td><td>1 when the running total reaches 15¢ or more</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  nickel,
  input  dime,
  output dispense
);

  // Your code here — an internal cents register plus a combinational next_cents works well.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, nickel, dime;
  wire dispense;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .nickel(nickel), .dime(dime), .dispense(dispense));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input ed; input [127:0] label;
    begin
      if (dispense !== ed) begin
        errors = errors + 1;
        $display("FAIL %0s expected=%b got=%b", label, ed, dispense);
      end else $display("PASS %0s dispense=%b", label, dispense);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; nickel = 0; dime = 0; @(posedge clk); #1; check(0, "reset");
    rst = 0;
    dime = 1; #1; check(0, "dime10");
    @(posedge clk); #1; dime = 0;
    nickel = 1; #1; check(1, "nickel-completes15");
    @(posedge clk); #1; nickel = 0;
    check(0, "after-vend-reset");
    dime = 1; #1; check(0, "dime10-again");
    @(posedge clk); #1;
    dime = 1; #1; check(1, "dime20-overpay-vend");
    @(posedge clk); #1; dime = 0;
    check(0, "idle-after");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'nickel', 'dime', 'dispense'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'dime', wave: '0.10.10.' },
          { name: 'nickel', wave: '0..1....' },
          { name: 'dispense', wave: '0..1.0.1' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'popcount8',
      title: '8-Bit Population Count',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'algorithmic'],
      category: 'Combinational Design',
      lede: 'Count how many of the 8 input bits are set to 1 — the building block behind ECC, Hamming weight, and bit-similarity checks.',
      concept: '<b>Concept:</b> A synthesizable <code>for</code> loop inside a combinational <code>always @(*)</code> block, accumulating <code>count = count + in[i]</code> across all 8 bits, unrolls into an adder tree at synthesis — no need to hand-write one.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>in</td><td>input</td><td>8</td><td>Input bits</td></tr>
<tr><td>count</td><td>output</td><td>4</td><td>Number of 1s in in (0-8)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input      [7:0] in,
  output reg [3:0] count
);

  // Your code here — a for loop over all 8 bits works well.

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] in;
  wire [3:0] count;
  integer errors = 0;
  top_module dut(.in(in), .count(count));
  task check;
    input [7:0] i; input [3:0] ec;
    begin
      in = i; #1;
      if (count !== ec) begin
        errors = errors + 1;
        $display("FAIL in=%b expected=%d got=%d", i, ec, count);
      end else $display("PASS in=%b count=%d", i, count);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(8'b00000000, 0);
    check(8'b11111111, 8);
    check(8'b00001111, 4);
    check(8'b10000001, 2);
    check(8'b01010101, 4);
    check(8'b11100000, 3);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['in', 'count'],
      wavedrom: {
        signal: [
          { name: 'in[7:0]', wave: '2.3.4.', data: ['00000000', '00001111', '11111111'] },
          { name: 'count[3:0]', wave: '2.3.4.', data: ['0', '4', '8'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'signed-overflow-detector',
      title: '4-Bit Signed Overflow Detector',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'arithmetic'],
      category: 'Combinational Design',
      lede: "Add two 4-bit two's-complement numbers and flag whether the result overflowed the representable signed range.",
      concept: '<b>Concept:</b> Overflow can only happen when both operands share a sign but the result doesn\'t: <code>overflow = (a[3]==b[3]) &amp;&amp; (sum[3]!=a[3])</code>. Adding numbers of opposite sign can never overflow — the result always fits between them.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>4</td><td>Signed operand (two's complement)</td></tr>
<tr><td>b</td><td>input</td><td>4</td><td>Signed operand (two's complement)</td></tr>
<tr><td>sum</td><td>output</td><td>4</td><td>a + b, wrapped</td></tr>
<tr><td>overflow</td><td>output</td><td>1</td><td>1 if the true sum doesn't fit in 4-bit signed range</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] a,
  input  [3:0] b,
  output [3:0] sum,
  output       overflow
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] a, b;
  wire [3:0] sum;
  wire overflow;
  integer errors = 0;
  top_module dut(.a(a), .b(b), .sum(sum), .overflow(overflow));
  task check;
    input [3:0] ia, ib; input [3:0] es; input eo;
    begin
      a = ia; b = ib; #1;
      if (sum !== es || overflow !== eo) begin
        errors = errors + 1;
        $display("FAIL a=%b b=%b expected sum=%b ovf=%b got sum=%b ovf=%b", ia, ib, es, eo, sum, overflow);
      end else $display("PASS a=%b b=%b sum=%b ovf=%b", ia, ib, sum, overflow);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(4'b0011, 4'b0100, 4'b0111, 0);
    check(4'b0101, 4'b0101, 4'b1010, 1);
    check(4'b1000, 4'b1000, 4'b0000, 1);
    check(4'b1101, 4'b0010, 4'b1111, 0);
    check(4'b0001, 4'b0010, 4'b0011, 0);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'sum', 'overflow'],
      wavedrom: {
        signal: [
          { name: 'a[3:0]', wave: '2.3.4.', data: ['0011', '0101', '1000'] },
          { name: 'b[3:0]', wave: '2.3.4.', data: ['0100', '0101', '1000'] },
          { name: 'sum[3:0]', wave: '2.3.4.', data: ['0111', '1010', '0000'] },
          { name: 'overflow', wave: '0.1...' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'find-first-set',
      title: 'Find First Set Bit',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'algorithmic'],
      category: 'Combinational Design',
      lede: 'Find the index of the lowest-numbered set bit in an 8-bit input — the LSB-first counterpart to a priority encoder.',
      concept: '<b>Concept:</b> Same nested-ternary shape as a priority encoder, but check <code>in[0]</code> first instead of <code>in[7]</code> — priority runs from the LSB upward instead of the MSB downward.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>in</td><td>input</td><td>8</td><td>Input bits</td></tr>
<tr><td>idx</td><td>output</td><td>3</td><td>Index of lowest set bit (don't-care if valid=0)</td></tr>
<tr><td>valid</td><td>output</td><td>1</td><td>1 if any bit is set</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] in,
  output [2:0] idx,
  output       valid
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] in;
  wire [2:0] idx;
  wire valid;
  integer errors = 0;
  top_module dut(.in(in), .idx(idx), .valid(valid));
  task check;
    input [7:0] i; input ev; input [2:0] ei;
    begin
      in = i; #1;
      if (valid !== ev || idx !== ei) begin
        errors = errors + 1;
        $display("FAIL in=%b expected valid=%b idx=%d got valid=%b idx=%d", i, ev, ei, valid, idx);
      end else $display("PASS in=%b valid=%b idx=%d", i, valid, idx);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(8'b00000001, 1, 0);
    check(8'b00000010, 1, 1);
    check(8'b00010000, 1, 4);
    check(8'b10000000, 1, 7);
    check(8'b00000000, 0, 7);
    check(8'b11111111, 1, 0);
    check(8'b11110000, 1, 4);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['in', 'valid', 'idx'],
      wavedrom: {
        signal: [
          { name: 'in[7:0]', wave: '2.3.4.', data: ['00000001', '00010000', '11110000'] },
          { name: 'valid', wave: '1.....' },
          { name: 'idx[2:0]', wave: '2.3.4.', data: ['0', '4', '4'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'two-flop-synchronizer',
      title: '2-Flop CDC Synchronizer',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'cdc'],
      category: 'Sequential Design',
      lede: "Safely bring an asynchronous signal into a clock domain using two cascaded flip-flops — the standard first line of defense against metastability.",
      concept: '<b>Concept:</b> Chain two registers: <code>meta &lt;= async_in; sync_out &lt;= meta;</code>. The first flop absorbs any metastability from sampling an asynchronous edge; by the second flop, the value has almost always settled. A single flop is not enough — that\'s the real-world bug this problem is built to catch.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Destination clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>async_in</td><td>input</td><td>1</td><td>Signal from another clock domain</td></tr>
<tr><td>sync_out</td><td>output</td><td>1</td><td>async_in, synchronized (2 cycles of latency)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input      clk,
  input      rst,
  input      async_in,
  output reg sync_out
);

  // Your code here — needs a hidden intermediate "meta" flop between async_in and sync_out.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, async_in;
  wire sync_out;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .async_in(async_in), .sync_out(sync_out));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input es; input [127:0] label;
    begin
      if (sync_out !== es) begin
        errors = errors + 1;
        $display("FAIL %0s expected=%b got=%b", label, es, sync_out);
      end else $display("PASS %0s sync_out=%b", label, sync_out);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; async_in = 0; @(posedge clk); #1; check(0, "reset");
    rst = 0; async_in = 1; @(posedge clk); #1; check(0, "cyc1-not-yet");
    @(posedge clk); #1; check(1, "cyc2-now-synced");
    async_in = 0; @(posedge clk); #1; check(1, "cyc3-still-1-delayed");
    @(posedge clk); #1; check(0, "cyc4-now-0");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'async_in', 'sync_out'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.........' },
          { name: 'rst', wave: '1.0.......' },
          { name: 'async_in', wave: '0.1...0...' },
          { name: 'sync_out', wave: '0...1...0.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'clock-div3',
      title: 'Divide-by-3 Clock Pulse',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'clock'],
      category: 'Sequential Design',
      lede: "Generate a pulse that fires once every 3 input clock cycles — dividing by a non-power-of-2 needs a counter, not a toggle flip-flop.",
      concept: '<b>Concept:</b> A 2-bit counter wraps at 2 (0,1,2,0,1,2,...), and the output pulses high exactly when the counter is 0: <code>clk_div3 = (cnt == 0)</code>. The wrap condition <code>cnt==2</code> is what makes this divide-by-3 instead of divide-by-4 — an easy off-by-one to get wrong.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Input clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>clk_div3</td><td>output</td><td>1</td><td>High for 1 cycle out of every 3</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  output clk_div3
);

  // Your code here — a 2-bit counter that wraps at 2 works well.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst;
  wire clk_div3;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .clk_div3(clk_div3));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input ec; input [127:0] label;
    begin
      if (clk_div3 !== ec) begin
        errors = errors + 1;
        $display("FAIL %0s expected=%b got=%b", label, ec, clk_div3);
      end else $display("PASS %0s clk_div3=%b", label, clk_div3);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; @(posedge clk); #1; check(1, "reset-cnt0");
    rst = 0;
    @(posedge clk); #1; check(0, "cnt1");
    @(posedge clk); #1; check(0, "cnt2");
    @(posedge clk); #1; check(1, "wrap-cnt0");
    @(posedge clk); #1; check(0, "cnt1again");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'clk_div3'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.........' },
          { name: 'rst', wave: '1.0.......' },
          { name: 'clk_div3', wave: '1.0...1.0.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'combination-lock',
      title: 'Combination Lock FSM',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'fsm'],
      category: 'Sequential Design',
      lede: 'Unlock only after seeing the exact code sequence 2 → 1 → 3, entered one digit per clock. Any wrong digit resets progress — except digit 2, which can restart a fresh attempt on the spot.',
      concept: '<b>Concept:</b> A 4-state FSM (S0, S1, S2, UNLOCKED) that stays latched in UNLOCKED once reached — guard the state-update logic with <code>if (state != UNLOCKED)</code>, or a stray digit after unlocking will re-lock it. The subtle part: from any wrong-digit state, if the wrong digit itself happens to be a 2, it should restart the match at S1 immediately rather than falling all the way back to S0.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (locks)</td></tr>
<tr><td>code</td><td>input</td><td>2</td><td>Digit entered this cycle (0-3)</td></tr>
<tr><td>unlocked</td><td>output</td><td>1</td><td>1 once the correct sequence 2,1,3 has been entered</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input        clk,
  input        rst,
  input  [1:0] code,
  output       unlocked
);

  // Your code here — 4-state FSM (S0, S1, S2, UNLOCKED). Stay in UNLOCKED once reached.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst;
  reg [1:0] code;
  wire unlocked;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .code(code), .unlocked(unlocked));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input eu; input [127:0] label;
    begin
      if (unlocked !== eu) begin
        errors = errors + 1;
        $display("FAIL %0s expected=%b got=%b", label, eu, unlocked);
      end else $display("PASS %0s unlocked=%b", label, unlocked);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; code = 0; @(posedge clk); #1; check(0, "reset");
    rst = 0;
    code = 2; @(posedge clk); #1; check(0, "d1");
    code = 1; @(posedge clk); #1; check(0, "d2");
    code = 3; @(posedge clk); #1; check(1, "unlock");
    code = 0; @(posedge clk); #1; check(1, "stays-unlocked-after-junk");
    rst = 1; @(posedge clk); #1; rst = 0; check(0, "relock-on-reset");
    code = 2; @(posedge clk); #1; check(0, "d1-again");
    code = 2; @(posedge clk); #1; check(0, "repeat-2-stays-s1");
    code = 1; @(posedge clk); #1; check(0, "d2-again");
    code = 0; @(posedge clk); #1; check(0, "wrong-digit-resets");
    code = 2; @(posedge clk); #1; check(0, "restart-d1");
    code = 1; @(posedge clk); #1; check(0, "restart-d2");
    code = 3; @(posedge clk); #1; check(1, "unlock-again");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'code', 'unlocked'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'rst', wave: '1.0.....' },
          { name: 'code[1:0]', wave: '2.3.4.5.', data: ['0', '2', '1', '3'] },
          { name: 'unlocked', wave: '0.....1.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'round-robin-arbiter',
      title: '4-Way Round-Robin Arbiter',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'arbiter'],
      category: 'Sequential Design',
      lede: 'Grant a shared resource to one of four requesters each cycle, rotating priority so nobody gets starved by a persistently high-priority neighbor.',
      concept: '<b>Concept:</b> Track the index most recently granted. Each cycle, scan requesters starting <i>just after</i> that index (wrapping around) and grant the first one asking — then remember its index for next time. A fixed-priority arbiter (always check requester 0 first) looks similar but starves lower-priority requesters under sustained contention; that starvation is exactly what the hidden tests catch.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>req</td><td>input</td><td>4</td><td>Request lines, one per requester</td></tr>
<tr><td>grant</td><td>output</td><td>4</td><td>One-hot grant, registered, all-0 if no requests</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input            clk,
  input            rst,
  input      [3:0] req,
  output reg [3:0] grant
);

  // Your code here — track last_granted, scan requesters starting just after it, register the result into grant.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst;
  reg [3:0] req;
  wire [3:0] grant;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .req(req), .grant(grant));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input [3:0] eg; input [127:0] label;
    begin
      if (grant !== eg) begin
        errors = errors + 1;
        $display("FAIL %0s expected=%b got=%b", label, eg, grant);
      end else $display("PASS %0s grant=%b", label, grant);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; req = 4'b0000; @(posedge clk); #1; check(4'b0000, "reset");
    rst = 0; req = 4'b1010;
    @(posedge clk); #1; check(4'b0010, "grant-req1-first");
    @(posedge clk); #1; check(4'b1000, "grant-req3-next");
    @(posedge clk); #1; check(4'b0010, "grant-req1-again");
    @(posedge clk); #1; check(4'b1000, "grant-req3-again");
    req = 4'b0001;
    @(posedge clk); #1; check(4'b0001, "only-req0");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'req', 'grant'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'req[3:0]', wave: '2.3.....', data: ['0000', '1010'] },
          { name: 'grant[3:0]', wave: '2.3.4.5.', data: ['0000', '0010', '1000', '0010'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'binary-to-bcd',
      title: '8-Bit Binary to 3-Digit BCD (Double Dabble)',
      difficulty: 'hard',
      points: 50,
      tags: ['combinational', 'algorithmic'],
      category: 'Combinational Design',
      lede: "Convert an 8-bit binary number (0-255) into three separate BCD digits — hundreds, tens, ones — using the classic shift-and-add-3 algorithm.",
      concept: '<b>Concept:</b> The "double dabble" algorithm: load the binary value into the low bits of a wider shift register, then repeat (once per input bit) — if any BCD nibble holds 5 or more, add 3 to it, then shift the whole register left by 1. After 8 iterations, the upper nibbles hold valid BCD digits. Skipping the add-3 check on any one digit silently corrupts every result above single digits.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>bin</td><td>input</td><td>8</td><td>Binary value, 0-255</td></tr>
<tr><td>hundreds</td><td>output</td><td>4</td><td>Hundreds BCD digit</td></tr>
<tr><td>tens</td><td>output</td><td>4</td><td>Tens BCD digit</td></tr>
<tr><td>ones</td><td>output</td><td>4</td><td>Ones BCD digit</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] bin,
  output [3:0] hundreds,
  output [3:0] tens,
  output [3:0] ones
);

  // Your code here — double-dabble: 20-bit shift register, add-3-if->=5 to each BCD nibble, shift left, repeat 8 times.

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] bin;
  wire [3:0] hundreds, tens, ones;
  integer errors = 0;
  top_module dut(.bin(bin), .hundreds(hundreds), .tens(tens), .ones(ones));
  task check;
    input [7:0] b; input [3:0] eh, et, eo;
    begin
      bin = b; #1;
      if (hundreds !== eh || tens !== et || ones !== eo) begin
        errors = errors + 1;
        $display("FAIL bin=%d expected h=%d t=%d o=%d got h=%d t=%d o=%d", b, eh, et, eo, hundreds, tens, ones);
      end else $display("PASS bin=%d -> %d%d%d", b, hundreds, tens, ones);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(8'd0, 0, 0, 0);
    check(8'd9, 0, 0, 9);
    check(8'd10, 0, 1, 0);
    check(8'd99, 0, 9, 9);
    check(8'd100, 1, 0, 0);
    check(8'd255, 2, 5, 5);
    check(8'd127, 1, 2, 7);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['bin', 'hundreds', 'tens', 'ones'],
      wavedrom: {
        signal: [
          { name: 'bin[7:0]', wave: '2.3.', data: ['99', '255'] },
          { name: 'hundreds', wave: '2.3.', data: ['0', '2'] },
          { name: 'tens', wave: '2.3.', data: ['9', '5'] },
          { name: 'ones', wave: '2.3.', data: ['9', '5'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'manchester-encoder',
      title: 'Manchester Encoder',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'protocol'],
      category: 'Combinational Design',
      lede: 'Combine a data bit with the clock to produce a Manchester-encoded line signal — the self-clocking encoding used in classic Ethernet and RFID.',
      concept: '<b>Concept:</b> <code>enc = data ^ clk</code>. XOR-ing the data bit with the clock produces a transition in the middle of every bit period, with the transition direction determined by the data bit — exactly the self-clocking property Manchester encoding relies on.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Bit clock</td></tr>
<tr><td>data</td><td>input</td><td>1</td><td>Data bit to encode</td></tr>
<tr><td>enc</td><td>output</td><td>1</td><td>Manchester-encoded line output</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  data,
  output enc
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, data;
  wire enc;
  integer errors = 0;
  top_module dut(.clk(clk), .data(data), .enc(enc));
  task check;
    input ic, id; input ee;
    begin
      clk = ic; data = id; #1;
      if (enc !== ee) begin
        errors = errors + 1;
        $display("FAIL clk=%b data=%b expected=%b got=%b", ic, id, ee, enc);
      end else $display("PASS clk=%b data=%b enc=%b", ic, id, enc);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(0, 0, 0);
    check(1, 0, 1);
    check(0, 1, 1);
    check(1, 1, 0);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'data', 'enc'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: '0.1.0.1.' },
          { name: 'data', wave: '0...1...' },
          { name: 'enc', wave: '0.1...0.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'interrupt-controller',
      title: 'Priority Interrupt Controller',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'controller'],
      category: 'Sequential Design',
      lede: 'Latch incoming interrupt requests, present the highest-priority pending one to the CPU, and clear it only when explicitly acknowledged — even if the request line drops before that.',
      concept: '<b>Concept:</b> Requests must be <i>latched</i> — a real CPU is far slower than a level interrupt pulse, so <code>pend &lt;= pend | irq</code> every cycle keeps a bit set until it\'s explicitly acked, even if <code>irq</code> goes low in between. On <code>ack</code>, clear only the bit currently pointed to by the priority-encoded <code>irq_num</code> — lower-priority pending bits stay latched and take over next.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>irq</td><td>input</td><td>4</td><td>Request lines, bit 3 = highest priority</td></tr>
<tr><td>ack</td><td>input</td><td>1</td><td>1-cycle pulse: clear the currently-indicated request</td></tr>
<tr><td>irq_num</td><td>output</td><td>2</td><td>Index of highest-priority pending request</td></tr>
<tr><td>pending</td><td>output</td><td>1</td><td>1 if any request is latched pending</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input        clk,
  input        rst,
  input  [3:0] irq,
  input        ack,
  output [1:0] irq_num,
  output       pending
);

  // Your code here — an internal "pend" register that latches irq bits and clears only the acked one.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst;
  reg [3:0] irq;
  reg ack;
  wire [1:0] irq_num;
  wire pending;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .irq(irq), .ack(ack), .irq_num(irq_num), .pending(pending));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input ep; input [1:0] ei; input checkidx; input [127:0] label;
    begin
      if (pending !== ep || (checkidx && irq_num !== ei)) begin
        errors = errors + 1;
        $display("FAIL %0s expected pending=%b irq_num=%d got pending=%b irq_num=%d", label, ep, ei, pending, irq_num);
      end else $display("PASS %0s pending=%b irq_num=%d", label, pending, irq_num);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; irq = 0; ack = 0; @(posedge clk); #1; check(0, 0, 0, "reset");
    rst = 0; irq = 4'b0010;
    @(posedge clk); #1; check(1, 1, 1, "irq1-latched");
    irq = 4'b0000;
    @(posedge clk); #1; check(1, 1, 1, "stays-pending-after-irq-deasserted");
    irq = 4'b1000;
    @(posedge clk); #1; check(1, 3, 1, "irq3-higher-priority");
    ack = 1; irq = 0;
    @(posedge clk); #1; check(1, 1, 1, "ack-clears-only-irq3");
    @(posedge clk); #1; check(0, 0, 1, "ack-clears-irq1-now-empty");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'irq', 'ack', 'pending', 'irq_num'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p...........' },
          { name: 'rst', wave: '1.0.........' },
          { name: 'irq[3:0]', wave: '2.3.4.5.6.7.', data: ['0000', '0010', '0000', '1000', '0000', '0000'] },
          { name: 'ack', wave: '0.......1...' },
          { name: 'pending', wave: '0.1.......0.' },
          { name: 'irq_num[1:0]', wave: '2.3.4.5.6.7.', data: ['0', '1', '1', '3', '1', '0'] }
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
          { name: 'clk', wave: 'p..........' },
          { name: 'rst', wave: '10.........' },
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
          { name: 'clk', wave: 'p...........' },
          { name: 'rst', wave: '1.0.........' },
          { name: 'din', wave: '0...1...0.1.' },
          { name: 'out', wave: '0...1.0...1.' }
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
          { name: 'clk', wave: 'p.........' },
          { name: 'rst', wave: '1.0.......' },
          { name: 't', wave: '0.1...0.1.' },
          { name: 'q', wave: '0.1.0...1.' }
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
