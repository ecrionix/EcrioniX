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
      slug: 'odd-parity-checker',
      title: '8-Bit Odd Parity Checker',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'parity'],
      category: 'Combinational Design',
      lede: 'Check whether a received byte plus its parity bit together carry an odd number of 1s — the receiving half of an odd-parity error-detection scheme.',
      concept: '<b>Concept:</b> <code>error = ~(^data ^ parity_bit)</code>. XOR-reducing data and parity_bit together gives 1 exactly when the total count of 1s is odd; inverting that tells you when the odd-parity rule was violated.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>data</td><td>input</td><td>8</td><td>Received data byte</td></tr>
<tr><td>parity_bit</td><td>input</td><td>1</td><td>Received odd-parity bit</td></tr>
<tr><td>error</td><td>output</td><td>1</td><td>1 if data+parity_bit has an even (invalid) count of 1s</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] data,
  input        parity_bit,
  output       error
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] data;
  reg parity_bit;
  wire error;
  integer errors = 0;
  top_module dut(.data(data), .parity_bit(parity_bit), .error(error));
  task check;
    input [7:0] d; input p; input ee;
    begin
      data = d; parity_bit = p; #1;
      if (error !== ee) begin
        errors = errors + 1;
        $display("FAIL data=%b p=%b expected=%b got=%b", d, p, ee, error);
      end else $display("PASS data=%b p=%b error=%b", d, p, error);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(8'b00000000, 1, 0);
    check(8'b00000000, 0, 1);
    check(8'b00000011, 0, 1);
    check(8'b00000011, 1, 0);
    check(8'b11111111, 0, 1);
    check(8'b11111111, 1, 0);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['data', 'parity_bit', 'error'],
      wavedrom: {
        signal: [
          { name: 'data[7:0]', wave: '2.3.4.', data: ['00000000', '00000011', '11111111'] },
          { name: 'parity_bit', wave: '1.0.1.' },
          { name: 'error', wave: '0.1.0.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'excess3-converter',
      title: 'BCD to Excess-3 Converter',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'code-converter'],
      category: 'Combinational Design',
      lede: 'Convert a BCD digit (0-9) into Excess-3 code, a self-complementing code once used in early decimal computers.',
      concept: '<b>Concept:</b> Excess-3 is defined as the BCD value plus 3 — <code>excess3 = bcd + 3</code>. That is the entire circuit: one 4-bit adder with a constant operand.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>bcd</td><td>input</td><td>4</td><td>BCD digit, 0-9</td></tr>
<tr><td>excess3</td><td>output</td><td>4</td><td>bcd + 3</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] bcd,
  output [3:0] excess3
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] bcd;
  wire [3:0] excess3;
  integer errors = 0;
  top_module dut(.bcd(bcd), .excess3(excess3));
  task check;
    input [3:0] b; input [3:0] ee;
    begin
      bcd = b; #1;
      if (excess3 !== ee) begin
        errors = errors + 1;
        $display("FAIL bcd=%d expected=%d got=%d", b, ee, excess3);
      end else $display("PASS bcd=%d excess3=%d", b, excess3);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(0, 3);
    check(1, 4);
    check(5, 8);
    check(9, 12);
    check(4, 7);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['bcd', 'excess3'],
      wavedrom: {
        signal: [
          { name: 'bcd[3:0]', wave: '2.3.4.', data: ['0', '5', '9'] },
          { name: 'excess3[3:0]', wave: '2.3.4.', data: ['3', '8', '12'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'add-sub-unit',
      title: '4-Bit Add/Subtract Unit',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'arithmetic'],
      category: 'Combinational Design',
      lede: "One adder, two operations: a single control bit selects between a+b and a-b using the standard invert-and-add-one trick.",
      concept: '<b>Concept:</b> <code>{cout,result} = a + (b ^ {4{sub}}) + sub</code>. When <code>sub=0</code>, b passes through unchanged and this is a plain add. When <code>sub=1</code>, every bit of b is inverted and a 1 is added — the classic two\'s-complement subtraction trick, reusing the same adder hardware.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>4</td><td>First operand</td></tr>
<tr><td>b</td><td>input</td><td>4</td><td>Second operand</td></tr>
<tr><td>sub</td><td>input</td><td>1</td><td>0 = add, 1 = subtract (a - b)</td></tr>
<tr><td>result</td><td>output</td><td>4</td><td>a+b or a-b, wrapped</td></tr>
<tr><td>cout</td><td>output</td><td>1</td><td>Carry out (add) / NOT-borrow (subtract)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] a,
  input  [3:0] b,
  input        sub,
  output [3:0] result,
  output       cout
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] a, b;
  reg sub;
  wire [3:0] result;
  wire cout;
  integer errors = 0;
  top_module dut(.a(a), .b(b), .sub(sub), .result(result), .cout(cout));
  task check;
    input [3:0] ia, ib; input isub; input [3:0] er; input ec;
    begin
      a = ia; b = ib; sub = isub; #1;
      if (result !== er || cout !== ec) begin
        errors = errors + 1;
        $display("FAIL a=%d b=%d sub=%b expected result=%d cout=%b got result=%d cout=%b", ia, ib, isub, er, ec, result, cout);
      end else $display("PASS a=%d b=%d sub=%b result=%d cout=%b", ia, ib, isub, result, cout);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(4'd3, 4'd4, 0, 4'd7, 0);
    check(4'd7, 4'd3, 1, 4'd4, 1);
    check(4'd3, 4'd7, 1, 4'd12, 0);
    check(4'd15, 4'd1, 0, 4'd0, 1);
    check(4'd5, 4'd5, 1, 4'd0, 1);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'sub', 'result', 'cout'],
      wavedrom: {
        signal: [
          { name: 'a[3:0]', wave: '2.3.4.', data: ['3', '7', '3'] },
          { name: 'b[3:0]', wave: '2.3.4.', data: ['4', '3', '7'] },
          { name: 'sub', wave: '0.1...' },
          { name: 'result[3:0]', wave: '2.3.4.', data: ['7', '4', '12'] },
          { name: 'cout', wave: '0.1.0.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'mux8to1',
      title: '8-to-1 Multiplexer',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'mux'],
      category: 'Combinational Design',
      lede: 'The next step up from 2:1 and 4:1 — select one of eight inputs using a 3-bit select line.',
      concept: '<b>Concept:</b> <code>out = in[sel];</code> — Verilog\'s bit-select operator with a variable index already implements the entire multiplexer in one line.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>in</td><td>input</td><td>8</td><td>Input bits</td></tr>
<tr><td>sel</td><td>input</td><td>3</td><td>Select index, 0-7</td></tr>
<tr><td>out</td><td>output</td><td>1</td><td>in[sel]</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] in,
  input  [2:0] sel,
  output       out
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] in;
  reg [2:0] sel;
  wire out;
  integer errors = 0;
  top_module dut(.in(in), .sel(sel), .out(out));
  task check;
    input [7:0] i; input [2:0] s; input eo;
    begin
      in = i; sel = s; #1;
      if (out !== eo) begin
        errors = errors + 1;
        $display("FAIL in=%b sel=%d expected=%b got=%b", i, s, eo, out);
      end else $display("PASS in=%b sel=%d out=%b", i, s, out);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(8'b10110010, 0, 0);
    check(8'b10110010, 1, 1);
    check(8'b10110010, 4, 1);
    check(8'b10110010, 7, 1);
    check(8'b10110010, 3, 0);
    check(8'b00000001, 0, 1);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['in', 'sel', 'out'],
      wavedrom: {
        signal: [
          { name: 'in[7:0]', wave: '2.....', data: ['10110010'] },
          { name: 'sel[2:0]', wave: '2.3.4.', data: ['0', '1', '4'] },
          { name: 'out', wave: '0.1...' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'decoder-3to8',
      title: '3-to-8 Line Decoder',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'decoder'],
      category: 'Combinational Design',
      lede: 'The 3-bit sibling of the 2-to-4 decoder — turn a 3-bit address into a one-hot 8-bit select line, gated by enable.',
      concept: '<b>Concept:</b> Same shift-a-hot-bit idiom as the 2-to-4 decoder, one bit wider: <code>out = en ? (8\'b1 &lt;&lt; in) : 8\'b0;</code>.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>in</td><td>input</td><td>3</td><td>Address to decode</td></tr>
<tr><td>en</td><td>input</td><td>1</td><td>Active-high enable</td></tr>
<tr><td>out</td><td>output</td><td>8</td><td>One-hot output, all 0 when en=0</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [2:0] in,
  input        en,
  output [7:0] out
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [2:0] in;
  reg en;
  wire [7:0] out;
  integer errors = 0;
  top_module dut(.in(in), .en(en), .out(out));
  task check;
    input [2:0] i; input e; input [7:0] eo;
    begin
      in = i; en = e; #1;
      if (out !== eo) begin
        errors = errors + 1;
        $display("FAIL in=%d en=%b expected=%b got=%b", i, e, eo, out);
      end else $display("PASS in=%d en=%b out=%b", i, e, out);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(0, 1, 8'b00000001);
    check(3, 1, 8'b00001000);
    check(7, 1, 8'b10000000);
    check(0, 0, 8'b00000000);
    check(7, 0, 8'b00000000);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['in', 'en', 'out'],
      wavedrom: {
        signal: [
          { name: 'in[2:0]', wave: '2.3.4.', data: ['0', '3', '7'] },
          { name: 'en', wave: '1.....' },
          { name: 'out[7:0]', wave: '2.3.4.', data: ['00000001', '00001000', '10000000'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'carry-lookahead-adder4',
      title: '4-Bit Carry Lookahead Adder',
      difficulty: 'hard',
      points: 50,
      tags: ['combinational', 'arithmetic'],
      category: 'Combinational Design',
      lede: 'Compute all four carries in parallel from generate/propagate signals instead of rippling them one bit at a time — the classic fix for ripple-carry\'s O(N) delay.',
      concept: '<b>Concept:</b> For each bit, define generate <code>g=a&amp;b</code> (this bit always produces a carry) and propagate <code>p=a^b</code> (this bit passes an incoming carry through). Each carry <code>c[i+1] = g[i] | (p[i]&amp;c[i])</code> can be expanded algebraically into a flat OR-of-ANDs expression depending only on the original a/b bits and cin — computable in parallel, not sequentially.',
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

  // Your code here — compute g[i]=a[i]&b[i], p[i]=a[i]^b[i], then expand each carry from g/p/cin directly (no rippling).

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] a, b;
  reg cin;
  wire [3:0] sum;
  wire cout;
  reg [4:0] expected;
  integer errors = 0;
  top_module dut(.a(a), .b(b), .cin(cin), .sum(sum), .cout(cout));
  task check;
    input [3:0] ia, ib; input ic;
    begin
      a = ia; b = ib; cin = ic; #1;
      expected = ia + ib + ic;
      if (sum !== expected[3:0] || cout !== expected[4]) begin
        errors = errors + 1;
        $display("FAIL a=%d b=%d cin=%b expected sum=%d cout=%b got sum=%d cout=%b", ia, ib, ic, expected[3:0], expected[4], sum, cout);
      end else $display("PASS a=%d b=%d cin=%b sum=%d cout=%b", ia, ib, ic, sum, cout);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(4'd3, 4'd4, 0);
    check(4'd15, 4'd1, 0);
    check(4'd7, 4'd8, 1);
    check(4'd5, 4'd5, 1);
    check(4'd0, 4'd0, 1);
    check(4'd15, 4'd15, 1);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'cin', 'sum', 'cout'],
      wavedrom: {
        signal: [
          { name: 'a[3:0]', wave: '2.3.4.', data: ['3', '15', '7'] },
          { name: 'b[3:0]', wave: '2.3.4.', data: ['4', '1', '8'] },
          { name: 'cin', wave: '0...1.' },
          { name: 'sum[3:0]', wave: '2.3.4.', data: ['7', '0', '0'] },
          { name: 'cout', wave: '0.1...' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'equality-checker-8bit',
      title: '8-Bit Equality Checker',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'comparator'],
      category: 'Combinational Design',
      lede: 'A dedicated equal-only comparator for two 8-bit buses — the cheap end of the comparator family, no subtractor required.',
      concept: '<b>Concept:</b> <code>eq = (a == b);</code>. Synthesis turns this into an XNOR-per-bit-plus-AND-tree — much shallower logic than a less-than compare, which needs a subtractor.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>8</td><td>First operand</td></tr>
<tr><td>b</td><td>input</td><td>8</td><td>Second operand</td></tr>
<tr><td>eq</td><td>output</td><td>1</td><td>1 if a == b</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] a,
  input  [7:0] b,
  output       eq
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] a, b;
  wire eq;
  integer errors = 0;
  top_module dut(.a(a), .b(b), .eq(eq));
  task check;
    input [7:0] ia, ib; input ee;
    begin
      a = ia; b = ib; #1;
      if (eq !== ee) begin
        errors = errors + 1;
        $display("FAIL a=%b b=%b expected=%b got=%b", ia, ib, ee, eq);
      end else $display("PASS a=%b b=%b eq=%b", ia, ib, eq);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(8'b00000000, 8'b00000000, 1);
    check(8'b00001111, 8'b00001111, 1);
    check(8'b00010000, 8'b00000000, 0);
    check(8'b10000000, 8'b00000000, 0);
    check(8'b11111111, 8'b11111111, 1);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'eq'],
      wavedrom: {
        signal: [
          { name: 'a[7:0]', wave: '2.3.4.', data: ['00000000', '00010000', '11111111'] },
          { name: 'b[7:0]', wave: '2...3.', data: ['00000000', '11111111'] },
          { name: 'eq', wave: '1.0..1' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'array-multiplier-4bit',
      title: '4-Bit Array Multiplier',
      difficulty: 'hard',
      points: 50,
      tags: ['combinational', 'arithmetic'],
      category: 'Combinational Design',
      lede: 'Multiply two 4-bit numbers into an 8-bit product — the operation an array multiplier builds from a grid of AND gates and adders.',
      concept: '<b>Concept:</b> <code>product = a * b;</code>. Verilog\'s <code>*</code> operator infers a multiplier at synthesis (an array of partial-product AND gates summed by adder rows) — the same structure you\'d build by hand, just described behaviorally instead of gate-by-gate.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>4</td><td>First operand</td></tr>
<tr><td>b</td><td>input</td><td>4</td><td>Second operand</td></tr>
<tr><td>product</td><td>output</td><td>8</td><td>a &times; b</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] a,
  input  [3:0] b,
  output [7:0] product
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] a, b;
  wire [7:0] product;
  integer errors = 0;
  top_module dut(.a(a), .b(b), .product(product));
  task check;
    input [3:0] ia, ib; input [7:0] ep;
    begin
      a = ia; b = ib; #1;
      if (product !== ep) begin
        errors = errors + 1;
        $display("FAIL a=%d b=%d expected=%d got=%d", ia, ib, ep, product);
      end else $display("PASS a=%d b=%d product=%d", ia, ib, product);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(4'd3, 4'd4, 8'd12);
    check(4'd15, 4'd15, 8'd225);
    check(4'd0, 4'd5, 8'd0);
    check(4'd7, 4'd7, 8'd49);
    check(4'd1, 4'd9, 8'd9);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'product'],
      wavedrom: {
        signal: [
          { name: 'a[3:0]', wave: '2.3.4.', data: ['3', '15', '7'] },
          { name: 'b[3:0]', wave: '2.3.4.', data: ['4', '15', '7'] },
          { name: 'product[7:0]', wave: '2.3.4.', data: ['12', '225', '49'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'bcd-adder',
      title: 'BCD Digit Adder',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'arithmetic'],
      category: 'Combinational Design',
      lede: 'Add two BCD digits (0-9) plus a carry-in and produce a valid BCD digit result — binary addition alone isn\'t enough once the sum exceeds 9.',
      concept: '<b>Concept:</b> First add normally in binary: <code>bin_sum = a + b + cin</code>. If that exceeds 9, it\'s not a valid BCD digit — add 6 to skip over the 6 unused 4-bit codes (10-15) and land back on a valid digit with a decimal carry: <code>cout = (bin_sum &gt; 9); corrected = cout ? bin_sum+6 : bin_sum;</code>.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>4</td><td>BCD digit, 0-9</td></tr>
<tr><td>b</td><td>input</td><td>4</td><td>BCD digit, 0-9</td></tr>
<tr><td>cin</td><td>input</td><td>1</td><td>Carry in</td></tr>
<tr><td>sum</td><td>output</td><td>4</td><td>Result BCD digit</td></tr>
<tr><td>cout</td><td>output</td><td>1</td><td>Decimal carry out</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] a,
  input  [3:0] b,
  input        cin,
  output [3:0] sum,
  output       cout
);

  // Your code here — binary add, then add 6 and set cout if the result exceeds 9.

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
    check(4'd5, 4'd6, 0, 4'd1, 1);
    check(4'd9, 4'd9, 1, 4'd9, 1);
    check(4'd0, 4'd0, 0, 4'd0, 0);
    check(4'd4, 4'd5, 1, 4'd0, 1);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'cin', 'sum', 'cout'],
      wavedrom: {
        signal: [
          { name: 'a[3:0]', wave: '2.3.4.', data: ['3', '5', '9'] },
          { name: 'b[3:0]', wave: '2.3.4.', data: ['4', '6', '9'] },
          { name: 'cin', wave: '0...1.' },
          { name: 'sum[3:0]', wave: '2.3.4.', data: ['7', '1', '9'] },
          { name: 'cout', wave: '0.1...' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'compressor-4to2',
      title: '4:2 Carry-Save Compressor',
      difficulty: 'hard',
      points: 50,
      tags: ['combinational', 'arithmetic'],
      category: 'Combinational Design',
      lede: 'Reduce five weight-1 inputs (four data bits plus a carry-in) down to a sum bit and two weight-2 outputs — the building block that makes fast multiplier reduction trees possible.',
      concept: '<b>Concept:</b> A 4:2 compressor doesn\'t need to be thought of gate-by-gate — it just needs to preserve total value: <code>a+b+c+d+cin = sum + 2×(carry+cout)</code>. Count the total number of 1s among the five inputs (0-5); the low bit of that count is <code>sum</code>, and the upper two bits split across <code>carry</code> and <code>cout</code>.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>1</td><td>Data bit</td></tr>
<tr><td>b</td><td>input</td><td>1</td><td>Data bit</td></tr>
<tr><td>c</td><td>input</td><td>1</td><td>Data bit</td></tr>
<tr><td>d</td><td>input</td><td>1</td><td>Data bit</td></tr>
<tr><td>cin</td><td>input</td><td>1</td><td>Carry in from a neighboring compressor</td></tr>
<tr><td>sum</td><td>output</td><td>1</td><td>Weight-1 output</td></tr>
<tr><td>carry</td><td>output</td><td>1</td><td>Weight-2 output</td></tr>
<tr><td>cout</td><td>output</td><td>1</td><td>Weight-2 output (carries to the next compressor)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  a,
  input  b,
  input  c,
  input  d,
  input  cin,
  output sum,
  output carry,
  output cout
);

  // Your code here — total = a+b+c+d+cin (0..5); sum=total[0], carry=total[1], cout=total[2].

endmodule
`,
      hiddenTb: `
module tb;
  reg a, b, c, d, cin;
  wire sum, carry, cout;
  reg [2:0] total;
  integer errors = 0;
  top_module dut(.a(a), .b(b), .c(c), .d(d), .cin(cin), .sum(sum), .carry(carry), .cout(cout));
  task check;
    input ia, ib, ic, id, icin;
    begin
      a = ia; b = ib; c = ic; d = id; cin = icin; #1;
      total = ia + ib + ic + id + icin;
      if (sum !== total[0] || carry !== total[1] || cout !== total[2]) begin
        errors = errors + 1;
        $display("FAIL a=%b b=%b c=%b d=%b cin=%b expected total=%d got sum=%b carry=%b cout=%b", ia, ib, ic, id, icin, total, sum, carry, cout);
      end else $display("PASS a=%b b=%b c=%b d=%b cin=%b total=%d", ia, ib, ic, id, icin, total);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(0, 0, 0, 0, 0);
    check(1, 0, 0, 0, 0);
    check(1, 1, 0, 0, 0);
    check(1, 1, 1, 0, 0);
    check(1, 1, 1, 1, 0);
    check(1, 1, 1, 1, 1);
    check(0, 1, 0, 1, 1);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'c', 'd', 'cin', 'sum', 'carry', 'cout'],
      wavedrom: {
        signal: [
          { name: 'a', wave: '0.1.1.1.' },
          { name: 'b', wave: '0.0.1.1.' },
          { name: 'c', wave: '0.0.0.1.' },
          { name: 'd', wave: '0.0.0.0.' },
          { name: 'cin', wave: '0.......' },
          { name: 'sum', wave: '0.1.0.1.' },
          { name: 'carry', wave: '0...1...' },
          { name: 'cout', wave: '0.......' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'sr-flip-flop',
      title: 'SR Flip-Flop',
      difficulty: 'easy',
      points: 10,
      tags: ['sequential', 'flip-flop'],
      category: 'Sequential Design',
      lede: 'A set/reset flip-flop with a well-defined answer for the "both asserted" case that the classic SR latch leaves undefined.',
      concept: '<b>Concept:</b> Give reset priority: <code>if (r) q&lt;=0; else if (s) q&lt;=1;</code>. Whichever input you check first in the if-chain automatically wins when both are asserted — no invalid/undefined state, unlike a level-sensitive SR latch.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>s</td><td>input</td><td>1</td><td>Set</td></tr>
<tr><td>r</td><td>input</td><td>1</td><td>Reset (priority over set)</td></tr>
<tr><td>q</td><td>output</td><td>1</td><td>Stored bit</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input      clk,
  input      s,
  input      r,
  output reg q
);

  // Your code here — give r priority over s.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, s, r;
  wire q;
  integer errors = 0;
  top_module dut(.clk(clk), .s(s), .r(r), .q(q));
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
    s = 1; r = 0; @(posedge clk); #1; check(1, "set");
    s = 0; r = 0; @(posedge clk); #1; check(1, "hold");
    s = 0; r = 1; @(posedge clk); #1; check(0, "reset");
    s = 1; r = 1; @(posedge clk); #1; check(0, "both-r-wins");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 's', 'r', 'q'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 's', wave: '1.0...1.' },
          { name: 'r', wave: '0...1...' },
          { name: 'q', wave: '1...0...' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'd-latch',
      title: 'D Latch (Level-Sensitive)',
      difficulty: 'easy',
      points: 10,
      tags: ['sequential', 'latch'],
      category: 'Sequential Design',
      lede: 'A transparent latch: while enable is high, the output follows the input instantly; once enable drops, the last value is held — no clock edge involved.',
      concept: '<b>Concept:</b> <code>always @(*) if (en) q = d;</code> — deliberately omitting an else branch. Verilog then infers a latch that retains its previous value whenever the condition is false, which is exactly the level-sensitive hold behavior a latch needs (unlike a flip-flop, there is no clock here at all).',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>en</td><td>input</td><td>1</td><td>Enable — transparent when high</td></tr>
<tr><td>d</td><td>input</td><td>1</td><td>Data in</td></tr>
<tr><td>q</td><td>output</td><td>1</td><td>Follows d while en=1, holds otherwise</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input      en,
  input      d,
  output reg q
);

  // Your code here — no else branch: that's what makes it a latch.

endmodule
`,
      hiddenTb: `
module tb;
  reg en, d;
  wire q;
  integer errors = 0;
  top_module dut(.en(en), .d(d), .q(q));
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
    en = 1; d = 1; #1; check(1, "transparent1");
    en = 0; d = 0; #1; check(1, "hold-after-close");
    en = 1; d = 0; #1; check(0, "transparent0");
    en = 0; d = 1; #1; check(0, "hold-again");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['en', 'd', 'q'],
      wavedrom: {
        signal: [
          { name: 'en', wave: '1.0.1.0.' },
          { name: 'd', wave: '1.0...1.' },
          { name: 'q', wave: '1...0...' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'johnson-counter',
      title: '4-Bit Johnson Counter',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'counter'],
      category: 'Sequential Design',
      lede: 'A twisted-ring counter that walks through 2N unique states by shifting in the inverted MSB each cycle — a different rhythm from a plain ring or binary counter.',
      concept: '<b>Concept:</b> <code>q &lt;= {q[2:0], ~q[3]};</code> — shift left, feeding the complement of the outgoing MSB back into the LSB. Starting from 0000, this walks 0001, 0011, 0111, 1111, then back down 1110, 1100, 1000, before returning to 0000 — 8 unique states from a 4-bit register.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (clears to 0000)</td></tr>
<tr><td>q</td><td>output</td><td>4</td><td>Johnson counter state</td></tr>
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
    @(posedge clk); #1; check(4'b0001, "s1");
    @(posedge clk); #1; check(4'b0011, "s2");
    @(posedge clk); #1; check(4'b0111, "s3");
    @(posedge clk); #1; check(4'b1111, "s4");
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
          { name: 'q[3:0]', wave: '2.3.4.5.6.', data: ['0000', '0001', '0011', '0111', '1111'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'ring-counter',
      title: '4-Bit Ring Counter',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'counter'],
      category: 'Sequential Design',
      lede: 'A single active bit walks around a 4-bit register, wrapping back to the start — the one-hot counter used to sequence states with zero decode logic.',
      concept: '<b>Concept:</b> <code>q &lt;= {q[2:0], q[3]};</code> — a rotate-left, not a plain shift. The outgoing MSB feeds straight back into the LSB, which is what makes the single 1 circulate forever instead of shifting out and leaving the register at all-zeros.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (seeds q to 0001)</td></tr>
<tr><td>q</td><td>output</td><td>4</td><td>One-hot walking bit</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input            clk,
  input            rst,
  output reg [3:0] q
);

  // Your code here — rotate left, wrapping the MSB back to the LSB.

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
    rst = 1; @(posedge clk); #1; check(4'b0001, "reset");
    rst = 0;
    @(posedge clk); #1; check(4'b0010, "s1");
    @(posedge clk); #1; check(4'b0100, "s2");
    @(posedge clk); #1; check(4'b1000, "s3");
    @(posedge clk); #1; check(4'b0001, "wrap");
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
          { name: 'q[3:0]', wave: '2.3.4.5.6.', data: ['0001', '0010', '0100', '1000', '0001'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'saturating-counter',
      title: '4-Bit Saturating Up/Down Counter',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'counter'],
      category: 'Sequential Design',
      lede: 'A counter that clamps at its limits instead of wrapping — pushing further up at 15 or further down at 0 simply has no effect.',
      concept: '<b>Concept:</b> Guard each direction with a boundary check before incrementing: <code>q &lt;= (q==15) ? q : q+1;</code> for up, and the mirror check for down. Saturation arithmetic like this shows up constantly in DSP and control logic where wraparound would be a real bug (a volume level "counter" should not wrap from max back to 0).',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>en</td><td>input</td><td>1</td><td>Count enable</td></tr>
<tr><td>up_down</td><td>input</td><td>1</td><td>1 = count up, 0 = count down</td></tr>
<tr><td>q</td><td>output</td><td>4</td><td>Counter value, clamped to 0-15</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input            clk,
  input            rst,
  input            en,
  input            up_down,
  output reg [3:0] q
);

  // Your code here — clamp at 15 going up, clamp at 0 going down.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, en, up_down;
  wire [3:0] q;
  integer errors = 0;
  integer i;
  top_module dut(.clk(clk), .rst(rst), .en(en), .up_down(up_down), .q(q));
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
    rst = 1; en = 0; up_down = 1; @(posedge clk); #1; check(0, "reset");
    rst = 0; en = 1; up_down = 1;
    for (i = 0; i < 15; i = i + 1) begin @(posedge clk); #1; end
    check(15, "reached-max");
    @(posedge clk); #1; check(15, "saturate-at-max");
    @(posedge clk); #1; check(15, "still-saturated");
    up_down = 0;
    for (i = 0; i < 15; i = i + 1) begin @(posedge clk); #1; end
    check(0, "reached-min");
    @(posedge clk); #1; check(0, "saturate-at-min");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'en', 'up_down', 'q'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'up_down', wave: '1.....0.' },
          { name: 'q[3:0]', wave: '2.3.4.5.', data: ['0', '14', '15', '15'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'watchdog-timer',
      title: 'Watchdog Timer',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'timer'],
      category: 'Sequential Design',
      lede: 'A timeout that fires unless it keeps getting "kicked" — the safety-net circuit that resets a hung system when its heartbeat stops arriving.',
      concept: '<b>Concept:</b> A free-running counter resets to 0 every time <code>kick</code> pulses, and otherwise counts up until it hits its limit: <code>timeout = (cnt == LIMIT)</code>. As long as something kicks the dog before the counter reaches the limit, timeout never fires — miss too many kicks in a row, and it does.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>kick</td><td>input</td><td>1</td><td>Resets the timeout counter when pulsed</td></tr>
<tr><td>timeout</td><td>output</td><td>1</td><td>1 once 4 cycles pass without a kick</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  kick,
  output timeout
);

  // Your code here — a counter that resets on kick, and asserts timeout once it reaches 4.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, kick;
  wire timeout;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .kick(kick), .timeout(timeout));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input et; input [127:0] label;
    begin
      if (timeout !== et) begin
        errors = errors + 1;
        $display("FAIL %0s expected=%b got=%b", label, et, timeout);
      end else $display("PASS %0s timeout=%b", label, timeout);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; kick = 0; @(posedge clk); #1; check(0, "reset");
    rst = 0;
    @(posedge clk); #1; check(0, "c1");
    @(posedge clk); #1; check(0, "c2");
    kick = 1; @(posedge clk); #1; check(0, "kicked-resets");
    kick = 0;
    @(posedge clk); #1; check(0, "c1-again");
    @(posedge clk); #1; check(0, "c2-again");
    @(posedge clk); #1; check(0, "c3-again");
    @(posedge clk); #1; check(1, "timeout-fires");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'kick', 'timeout'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p...............' },
          { name: 'rst', wave: '10..............' },
          { name: 'kick', wave: '0.....1.0.......' },
          { name: 'timeout', wave: '0.............1.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'serial-parity-checker',
      title: 'Streaming Frame Parity Checker',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'parity'],
      category: 'Sequential Design',
      lede: 'Accumulate the running parity of a serial bit stream one bit per clock, resetting cleanly at the start of every 8-bit frame.',
      concept: '<b>Concept:</b> A 3-bit counter tracks position within the frame. The first bit of a new frame (<code>cnt==0</code>) loads the accumulator directly; every other bit XORs in. <code>frame_done</code> must be a <em>registered</em> flag driven by the counter\'s value from the previous cycle — computing it straight off the live counter fires one cycle too early, before the frame\'s last bit has even been captured.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>bit_in</td><td>input</td><td>1</td><td>Serial bit, one per clock</td></tr>
<tr><td>parity_out</td><td>output</td><td>1</td><td>Running XOR parity of the current frame</td></tr>
<tr><td>frame_done</td><td>output</td><td>1</td><td>1 for one cycle after the 8th bit of a frame</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input      clk,
  input      rst,
  input      bit_in,
  output reg parity_out,
  output reg frame_done
);

  // Your code here — 3-bit position counter; reset the accumulator at the start of each frame.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, bit_in;
  wire parity_out, frame_done;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .bit_in(bit_in), .parity_out(parity_out), .frame_done(frame_done));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input ep; input ed; input [127:0] label;
    begin
      if (parity_out !== ep || frame_done !== ed) begin
        errors = errors + 1;
        $display("FAIL %0s expected parity=%b done=%b got parity=%b done=%b", label, ep, ed, parity_out, frame_done);
      end else $display("PASS %0s parity=%b done=%b", label, parity_out, frame_done);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; bit_in = 0; @(posedge clk); #1; check(0, 0, "reset");
    rst = 0;
    bit_in = 1; @(posedge clk); #1; check(1, 0, "b1");
    bit_in = 0; @(posedge clk); #1; check(1, 0, "b2");
    bit_in = 1; @(posedge clk); #1; check(0, 0, "b3");
    bit_in = 0; @(posedge clk); #1; check(0, 0, "b4");
    bit_in = 0; @(posedge clk); #1; check(0, 0, "b5");
    bit_in = 0; @(posedge clk); #1; check(0, 0, "b6");
    bit_in = 0; @(posedge clk); #1; check(0, 0, "b7");
    bit_in = 1; @(posedge clk); #1; check(1, 1, "b8-frame-done");
    bit_in = 1; @(posedge clk); #1; check(1, 0, "new-frame-b1");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'bit_in', 'parity_out', 'frame_done'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p...............' },
          { name: 'bit_in', wave: '2.3.4.5.6.7.8.9.', data: ['1', '0', '1', '0', '0', '0', '0', '1'] },
          { name: 'parity_out', wave: '2.3.4.5.6.7.8.9.', data: ['1', '1', '0', '0', '0', '0', '0', '1'] },
          { name: 'frame_done', wave: '0.............1.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'programmable-clock-divider',
      title: 'Programmable Clock Divider',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'clock'],
      category: 'Sequential Design',
      lede: 'A generalized version of divide-by-3: the division amount is set by a runtime input instead of being hardwired into the design.',
      concept: '<b>Concept:</b> <code>cnt</code> wraps at <code>div-1</code> instead of a fixed constant: <code>if (cnt &gt;= div-1) cnt&lt;=0; else cnt&lt;=cnt+1;</code>. The <code>-1</code> matters — comparing against <code>div</code> instead gives a period one cycle longer than requested, the exact off-by-one that divide-by-3 warns about generalized to any N.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Input clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>div</td><td>input</td><td>4</td><td>Divide value (period in input clocks), &ge;1</td></tr>
<tr><td>pulse_out</td><td>output</td><td>1</td><td>High for 1 cycle out of every div cycles</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  [3:0] div,
  output pulse_out
);

  // Your code here — counter wraps at div-1, not a fixed constant.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst;
  reg [3:0] div;
  wire pulse_out;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .div(div), .pulse_out(pulse_out));
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
    rst = 1; div = 4'd4; @(posedge clk); #1; check(1, "reset-cnt0");
    rst = 0;
    @(posedge clk); #1; check(0, "c1");
    @(posedge clk); #1; check(0, "c2");
    @(posedge clk); #1; check(0, "c3");
    @(posedge clk); #1; check(1, "wrap-div4");
    rst = 1; @(posedge clk); #1; rst = 0; div = 4'd2;
    @(posedge clk); #1; check(0, "div2-c1");
    @(posedge clk); #1; check(1, "div2-wrap");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'div', 'pulse_out'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.........' },
          { name: 'rst', wave: '10........' },
          { name: 'pulse_out', wave: '1.0...1.0.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'stack-pointer-updown',
      title: 'Push/Pop Stack Pointer',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'pointer'],
      category: 'Sequential Design',
      lede: 'A 4-bit stack pointer that moves up on push and down on pop, refusing to overflow past 15 or underflow past 0.',
      concept: '<b>Concept:</b> Guard both operations against their boundary: <code>if (push &amp;&amp; !full) sp&lt;=sp+1; else if (pop &amp;&amp; !empty) sp&lt;=sp-1;</code>. Without those guards, a push at full (or pop at empty) silently wraps the pointer around — corrupting whatever memory the pointer indexes into.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>push</td><td>input</td><td>1</td><td>Increment sp (ignored if full)</td></tr>
<tr><td>pop</td><td>input</td><td>1</td><td>Decrement sp (ignored if empty)</td></tr>
<tr><td>sp</td><td>output</td><td>4</td><td>Stack pointer, 0-15</td></tr>
<tr><td>full</td><td>output</td><td>1</td><td>1 when sp == 15</td></tr>
<tr><td>empty</td><td>output</td><td>1</td><td>1 when sp == 0</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input            clk,
  input            rst,
  input            push,
  input            pop,
  output reg [3:0] sp,
  output           full,
  output           empty
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, push, pop;
  wire [3:0] sp;
  wire full, empty;
  integer errors = 0;
  integer i;
  top_module dut(.clk(clk), .rst(rst), .push(push), .pop(pop), .sp(sp), .full(full), .empty(empty));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input [3:0] es; input ef; input ee; input [127:0] label;
    begin
      if (sp !== es || full !== ef || empty !== ee) begin
        errors = errors + 1;
        $display("FAIL %0s expected sp=%d full=%b empty=%b got sp=%d full=%b empty=%b", label, es, ef, ee, sp, full, empty);
      end else $display("PASS %0s sp=%d full=%b empty=%b", label, sp, full, empty);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; push = 0; pop = 0; @(posedge clk); #1; check(0, 0, 1, "reset");
    rst = 0; push = 1;
    for (i = 0; i < 15; i = i + 1) begin @(posedge clk); #1; end
    check(15, 1, 0, "pushed-to-full");
    @(posedge clk); #1; check(15, 1, 0, "push-blocked-at-full");
    push = 0; pop = 1;
    for (i = 0; i < 15; i = i + 1) begin @(posedge clk); #1; end
    check(0, 0, 1, "popped-to-empty");
    @(posedge clk); #1; check(0, 0, 1, "pop-blocked-at-empty");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'push', 'pop', 'sp'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'push', wave: '0.1...0.' },
          { name: 'pop', wave: '0.....1.' },
          { name: 'sp[3:0]', wave: '2.3.4.5.', data: ['0', '1', '2', '1'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'debounce-circuit',
      title: 'Button Debouncer',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'debounce'],
      category: 'Sequential Design',
      lede: 'Filter out mechanical switch bounce: only pass a button input through once it has held the same value for 3 consecutive clock cycles.',
      concept: '<b>Concept:</b> Track a candidate value and a run-length counter. Any time the input disagrees with the current candidate, immediately adopt it as the new candidate and restart the counter at 1 (that sample itself is the first match). Only once the counter reaches the stability threshold does the committed output actually update — a glitch that reverses before reaching the threshold never reaches the output at all.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>btn_in</td><td>input</td><td>1</td><td>Raw, potentially bouncing button input</td></tr>
<tr><td>btn_out</td><td>output</td><td>1</td><td>Debounced output, updates after 3 stable cycles</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input      clk,
  input      rst,
  input      btn_in,
  output reg btn_out
);

  // Your code here — track a candidate value + a run-length counter (any mismatch resets the count to 1, not 0).

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, btn_in;
  wire btn_out;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .btn_in(btn_in), .btn_out(btn_out));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input eb; input [127:0] label;
    begin
      if (btn_out !== eb) begin
        errors = errors + 1;
        $display("FAIL %0s expected=%b got=%b", label, eb, btn_out);
      end else $display("PASS %0s btn_out=%b", label, btn_out);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; btn_in = 0; @(posedge clk); #1; check(0, "reset");
    rst = 0;
    btn_in = 1; @(posedge clk); #1; check(0, "glitch1-c1");
    btn_in = 0; @(posedge clk); #1; check(0, "glitch-back-to-0");
    btn_in = 1; @(posedge clk); #1; check(0, "stable1-c1");
    btn_in = 1; @(posedge clk); #1; check(0, "stable1-c2");
    btn_in = 1; @(posedge clk); #1; check(1, "stable1-c3-commits");
    btn_in = 1; @(posedge clk); #1; check(1, "stays-1");
    btn_in = 0; @(posedge clk); #1; check(1, "drop-c1");
    btn_in = 0; @(posedge clk); #1; check(1, "drop-c2");
    btn_in = 0; @(posedge clk); #1; check(0, "drop-c3-commits");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'btn_in', 'btn_out'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p...................' },
          { name: 'rst', wave: '1.0.................' },
          { name: 'btn_in', wave: '0.1.0.1.......0.....' },
          { name: 'btn_out', wave: '0.........1.......0.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'hamming74-encoder',
      title: 'Hamming(7,4) Encoder',
      difficulty: 'hard',
      points: 50,
      tags: ['combinational', 'ecc'],
      category: 'Combinational Design',
      lede: 'Encode 4 data bits into a 7-bit Hamming codeword that can detect and correct any single-bit error — the error-correcting code behind ECC memory.',
      concept: '<b>Concept:</b> Three parity bits sit at positions 1, 2, and 4; each covers a different overlapping subset of the data bits (<code>p1=d1^d2^d4</code>, <code>p2=d1^d3^d4</code>, <code>p3=d2^d3^d4</code>). The overlap is the whole trick — at the receiver, which parity checks fail pinpoints exactly which single bit position is wrong.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>data</td><td>input</td><td>4</td><td>Data bits d1,d2,d3,d4 (data[0]=d1 ... data[3]=d4)</td></tr>
<tr><td>codeword</td><td>output</td><td>7</td><td>Encoded 7-bit codeword, positions 1-7 packed as codeword[0]=pos1 ... codeword[6]=pos7</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] data,
  output [6:0] codeword
);

  // Your code here — p1=d1^d2^d4, p2=d1^d3^d4, p3=d2^d3^d4; codeword = {d4,d3,d2,p3,d1,p2,p1}.

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] data;
  wire [6:0] codeword;
  integer errors = 0;
  top_module dut(.data(data), .codeword(codeword));
  task check;
    input [3:0] d; input [6:0] ec;
    begin
      data = d; #1;
      if (codeword !== ec) begin
        errors = errors + 1;
        $display("FAIL data=%b expected=%b got=%b", d, ec, codeword);
      end else $display("PASS data=%b codeword=%b", d, codeword);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(4'b1011, 7'b1010101);
    check(4'b0000, 7'b0000000);
    check(4'b1111, 7'b1111111);
    check(4'b0101, 7'b0101101);
    check(4'b1001, 7'b1001100);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['data', 'codeword'],
      wavedrom: {
        signal: [
          { name: 'data[3:0]', wave: '2.3.4.', data: ['1011', '0101', '1001'] },
          { name: 'codeword[6:0]', wave: '2.3.4.', data: ['1010101', '0101101', '1001100'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'hamming74-decoder',
      title: 'Hamming(7,4) Decoder',
      difficulty: 'hard',
      points: 50,
      tags: ['combinational', 'ecc'],
      category: 'Combinational Design',
      lede: 'Take a Hamming(7,4) codeword — possibly corrupted by a single flipped bit — and recover the correct data, flag the error, and report exactly which position was wrong.',
      concept: '<b>Concept:</b> Recompute the same three parity checks the encoder made. Each check that now disagrees contributes a bit to a 3-bit <code>syndrome</code>; by construction, that syndrome value directly equals the 1-indexed position of the flawed bit (0 means no error). Flip the codeword bit at that position to correct it, then extract data from the corrected codeword — extracting from the uncorrected codeword silently ships a wrong data bit whenever the error happens to land on a data position.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>codeword</td><td>input</td><td>7</td><td>Received codeword, possibly with one flipped bit</td></tr>
<tr><td>data</td><td>output</td><td>4</td><td>Corrected data bits</td></tr>
<tr><td>error</td><td>output</td><td>1</td><td>1 if any single-bit error was detected</td></tr>
<tr><td>error_pos</td><td>output</td><td>3</td><td>1-indexed position of the error, 0 if none</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [6:0] codeword,
  output [3:0] data,
  output       error,
  output [2:0] error_pos
);

  // Your code here — recompute the 3 parity checks into a syndrome, correct the codeword if nonzero, then extract data.

endmodule
`,
      hiddenTb: `
module tb;
  reg [6:0] codeword;
  wire [3:0] data;
  wire error;
  wire [2:0] error_pos;
  integer errors = 0;
  top_module dut(.codeword(codeword), .data(data), .error(error), .error_pos(error_pos));
  task check;
    input [6:0] cw; input [3:0] ed; input ee; input [2:0] ep;
    begin
      codeword = cw; #1;
      if (data !== ed || error !== ee || error_pos !== ep) begin
        errors = errors + 1;
        $display("FAIL cw=%b expected data=%b error=%b pos=%d got data=%b error=%b pos=%d", cw, ed, ee, ep, data, error, error_pos);
      end else $display("PASS cw=%b data=%b error=%b pos=%d", cw, data, error, error_pos);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(7'd85, 4'b1011, 0, 0);
    check(7'd81, 4'b1011, 1, 3);
    check(7'd84, 4'b1011, 1, 1);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['codeword', 'data', 'error', 'error_pos'],
      wavedrom: {
        signal: [
          { name: 'codeword[6:0]', wave: '2.3.4.', data: ['1010101', '1010001', '1010100'] },
          { name: 'data[3:0]', wave: '2.....', data: ['1011'] },
          { name: 'error', wave: '0.1...' },
          { name: 'error_pos[2:0]', wave: '2.3.4.', data: ['0', '3', '1'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'sign-extension',
      title: '4-to-8 Bit Sign Extension',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'arithmetic'],
      category: 'Combinational Design',
      lede: "Widen a 4-bit two's-complement number to 8 bits while preserving its value — a trap many beginners fall into by zero-extending instead.",
      concept: '<b>Concept:</b> <code>out = {{4{in[3]}}, in};</code> — replicate the sign bit to fill the new upper bits, not zeros. Zero-extending a negative number (whose MSB is 1) silently turns it into a large positive number instead of preserving its value.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>in</td><td>input</td><td>4</td><td>Signed 4-bit value</td></tr>
<tr><td>out</td><td>output</td><td>8</td><td>Same value, sign-extended to 8 bits</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] in,
  output [7:0] out
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] in;
  wire [7:0] out;
  integer errors = 0;
  top_module dut(.in(in), .out(out));
  task check;
    input [3:0] i; input [7:0] eo;
    begin
      in = i; #1;
      if (out !== eo) begin
        errors = errors + 1;
        $display("FAIL in=%b expected=%b got=%b", i, eo, out);
      end else $display("PASS in=%b out=%b", i, out);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(4'b0101, 8'b00000101);
    check(4'b1011, 8'b11111011);
    check(4'b1000, 8'b11111000);
    check(4'b0000, 8'b00000000);
    check(4'b0111, 8'b00000111);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['in', 'out'],
      wavedrom: {
        signal: [
          { name: 'in[3:0]', wave: '2.3.4.', data: ['0101', '1011', '1000'] },
          { name: 'out[7:0]', wave: '2.3.4.', data: ['00000101', '11111011', '11111000'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'saturating-adder',
      title: '8-Bit Saturating Adder',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'arithmetic'],
      category: 'Combinational Design',
      lede: 'Add two unsigned bytes, but clamp the result at 255 instead of silently wrapping around — the kind of arithmetic DSP and audio-level circuits actually want.',
      concept: '<b>Concept:</b> Compute the sum one bit wider than needed: <code>wide = a+b</code> (9 bits). If the extra bit is set, the true sum exceeds 255, so clamp: <code>sum = wide[8] ? 255 : wide[7:0];</code>. Plain addition would just drop that overflow bit and wrap.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>8</td><td>First operand</td></tr>
<tr><td>b</td><td>input</td><td>8</td><td>Second operand</td></tr>
<tr><td>sum</td><td>output</td><td>8</td><td>a+b, clamped to 255</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] a,
  input  [7:0] b,
  output [7:0] sum
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] a, b;
  wire [7:0] sum;
  integer errors = 0;
  top_module dut(.a(a), .b(b), .sum(sum));
  task check;
    input [7:0] ia, ib; input [7:0] es;
    begin
      a = ia; b = ib; #1;
      if (sum !== es) begin
        errors = errors + 1;
        $display("FAIL a=%d b=%d expected=%d got=%d", ia, ib, es, sum);
      end else $display("PASS a=%d b=%d sum=%d", ia, ib, sum);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(8'd200, 8'd100, 8'd255);
    check(8'd10, 8'd20, 8'd30);
    check(8'd255, 8'd1, 8'd255);
    check(8'd0, 8'd0, 8'd0);
    check(8'd255, 8'd255, 8'd255);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'sum'],
      wavedrom: {
        signal: [
          { name: 'a[7:0]', wave: '2.3.4.', data: ['200', '10', '255'] },
          { name: 'b[7:0]', wave: '2.3.4.', data: ['100', '20', '1'] },
          { name: 'sum[7:0]', wave: '2.3.4.', data: ['255', '30', '255'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'rock-paper-scissors',
      title: 'Rock, Paper, Scissors Judge',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'game'],
      category: 'Combinational Design',
      lede: "Given both players' moves, decide the winner in a single combinational step — a fun exercise in translating a small rule set into conditional logic.",
      concept: '<b>Concept:</b> With moves encoded as 0=rock, 1=paper, 2=scissors, a tie is just <code>p1==p2</code>. Otherwise enumerate the three ways player 1 can win (rock beats scissors, paper beats rock, scissors beats paper) as an OR of ANDs; anything else means player 2 won.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>p1</td><td>input</td><td>2</td><td>Player 1's move: 0=rock, 1=paper, 2=scissors</td></tr>
<tr><td>p2</td><td>input</td><td>2</td><td>Player 2's move</td></tr>
<tr><td>result</td><td>output</td><td>2</td><td>0=tie, 1=player 1 wins, 2=player 2 wins</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [1:0] p1,
  input  [1:0] p2,
  output [1:0] result
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [1:0] p1, p2;
  wire [1:0] result;
  integer errors = 0;
  top_module dut(.p1(p1), .p2(p2), .result(result));
  task check;
    input [1:0] a, b; input [1:0] er;
    begin
      p1 = a; p2 = b; #1;
      if (result !== er) begin
        errors = errors + 1;
        $display("FAIL p1=%d p2=%d expected=%d got=%d", a, b, er, result);
      end else $display("PASS p1=%d p2=%d result=%d", a, b, result);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(2'd0, 2'd0, 2'd0);
    check(2'd0, 2'd2, 2'd1);
    check(2'd2, 2'd0, 2'd2);
    check(2'd1, 2'd0, 2'd1);
    check(2'd2, 2'd1, 2'd1);
    check(2'd0, 2'd1, 2'd2);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['p1', 'p2', 'result'],
      wavedrom: {
        signal: [
          { name: 'p1[1:0]', wave: '2.3.4.', data: ['0', '0', '2'] },
          { name: 'p2[1:0]', wave: '2.3.4.', data: ['0', '2', '0'] },
          { name: 'result[1:0]', wave: '2.3.4.', data: ['0', '1', '2'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'onescomplement-checksum',
      title: "One's-Complement Checksum Adder",
      difficulty: 'hard',
      points: 50,
      tags: ['combinational', 'arithmetic'],
      category: 'Combinational Design',
      lede: "Add two bytes using end-around-carry addition — the exact arithmetic behind the Internet checksum used in IP, TCP, and UDP headers.",
      concept: '<b>Concept:</b> Compute the 9-bit sum, then instead of discarding the overflow bit like ordinary addition, wrap it back around and add it into the low byte: <code>sum = wide[7:0] + wide[8];</code>. This "end-around carry" is what makes one\'s-complement arithmetic close under addition — a carry out never actually gets lost, just recycled.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>8</td><td>First operand</td></tr>
<tr><td>b</td><td>input</td><td>8</td><td>Second operand</td></tr>
<tr><td>sum</td><td>output</td><td>8</td><td>One's-complement (end-around-carry) sum</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] a,
  input  [7:0] b,
  output [7:0] sum
);

  // Your code here — compute the 9-bit sum, then add the overflow bit back into the low byte.

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] a, b;
  wire [7:0] sum;
  integer errors = 0;
  top_module dut(.a(a), .b(b), .sum(sum));
  task check;
    input [7:0] ia, ib; input [7:0] es;
    begin
      a = ia; b = ib; #1;
      if (sum !== es) begin
        errors = errors + 1;
        $display("FAIL a=%h b=%h expected=%h got=%h", ia, ib, es, sum);
      end else $display("PASS a=%h b=%h sum=%h", ia, ib, sum);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(8'hFF, 8'h01, 8'h01);
    check(8'h50, 8'h50, 8'hA0);
    check(8'hFF, 8'hFF, 8'hFF);
    check(8'h00, 8'h00, 8'h00);
    check(8'hF0, 8'h20, 8'h11);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'sum'],
      wavedrom: {
        signal: [
          { name: 'a[7:0]', wave: '2.3.4.', data: ['ff', '50', 'f0'] },
          { name: 'b[7:0]', wave: '2.3.4.', data: ['01', '50', '20'] },
          { name: 'sum[7:0]', wave: '2.3.4.', data: ['01', 'a0', '11'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'alu-mips-4bit',
      title: '4-Bit MIPS-Style ALU',
      difficulty: 'hard',
      points: 50,
      tags: ['combinational', 'alu'],
      category: 'Combinational Design',
      lede: "Build the classic MIPS ALU: AND, OR, add, subtract, and set-less-than, selected by the actual 3-bit control codes a real MIPS ALU control unit generates.",
      concept: '<b>Concept:</b> A <code>case</code> on the 3-bit control code, using the authentic MIPS encoding: <code>000</code>=AND, <code>001</code>=OR, <code>010</code>=ADD, <code>110</code>=SUB, <code>111</code>=SLT (set-less-than, outputs 1 if a&lt;b else 0). Notice ADD and SUB share the same top bit pattern except one bit — that\'s deliberate in the real ISA, since it lets hardware reuse the same adder with an invertible B input.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>4</td><td>First operand</td></tr>
<tr><td>b</td><td>input</td><td>4</td><td>Second operand</td></tr>
<tr><td>alu_ctrl</td><td>input</td><td>3</td><td>000=AND, 001=OR, 010=ADD, 110=SUB, 111=SLT</td></tr>
<tr><td>result</td><td>output</td><td>4</td><td>ALU result</td></tr>
<tr><td>zero</td><td>output</td><td>1</td><td>1 if result == 0 (used for branch-equal in a real CPU)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input      [3:0] a,
  input      [3:0] b,
  input      [2:0] alu_ctrl,
  output reg [3:0] result,
  output           zero
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] a, b;
  reg [2:0] alu_ctrl;
  wire [3:0] result;
  wire zero;
  integer errors = 0;
  top_module dut(.a(a), .b(b), .alu_ctrl(alu_ctrl), .result(result), .zero(zero));
  task check;
    input [3:0] ia, ib; input [2:0] ic; input [3:0] er; input ez;
    begin
      a = ia; b = ib; alu_ctrl = ic; #1;
      if (result !== er || zero !== ez) begin
        errors = errors + 1;
        $display("FAIL a=%d b=%d ctrl=%b expected result=%d zero=%b got result=%d zero=%b", ia, ib, ic, er, ez, result, zero);
      end else $display("PASS a=%d b=%d ctrl=%b result=%d zero=%b", ia, ib, ic, result, zero);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(4'd12, 4'd10, 3'b000, 4'd8, 0);
    check(4'd12, 4'd10, 3'b001, 4'd14, 0);
    check(4'd3, 4'd4, 3'b010, 4'd7, 0);
    check(4'd7, 4'd3, 3'b110, 4'd4, 0);
    check(4'd3, 4'd7, 3'b111, 4'd1, 0);
    check(4'd7, 4'd3, 3'b111, 4'd0, 1);
    check(4'd5, 4'd5, 3'b110, 4'd0, 1);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'alu_ctrl', 'result', 'zero'],
      wavedrom: {
        signal: [
          { name: 'a[3:0]', wave: '2.3.4.', data: ['12', '3', '7'] },
          { name: 'b[3:0]', wave: '2.3.4.', data: ['10', '4', '3'] },
          { name: 'alu_ctrl[2:0]', wave: '2.3.4.', data: ['000', '010', '110'] },
          { name: 'result[3:0]', wave: '2.3.4.', data: ['8', '7', '4'] },
          { name: 'zero', wave: '0.....' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'popcount-comparator',
      title: 'Population Count Comparator',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'algorithmic'],
      category: 'Combinational Design',
      lede: 'Not "which number is bigger" — "which number has more 1 bits set". A comparator built on top of a bit-counting core instead of magnitude.',
      concept: '<b>Concept:</b> Compute the Hamming weight (population count) of each operand independently — count each bit with a loop — then compare the two small counts, not the original 8-bit values. Comparing the raw values directly answers a completely different question.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>8</td><td>First operand</td></tr>
<tr><td>b</td><td>input</td><td>8</td><td>Second operand</td></tr>
<tr><td>result</td><td>output</td><td>2</td><td>0=equal popcount, 1=a has more 1s, 2=b has more 1s</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input      [7:0] a,
  input      [7:0] b,
  output reg [1:0] result
);

  // Your code here — count the 1 bits in a and b separately, then compare the counts.

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] a, b;
  wire [1:0] result;
  integer errors = 0;
  top_module dut(.a(a), .b(b), .result(result));
  task check;
    input [7:0] ia, ib; input [1:0] er;
    begin
      a = ia; b = ib; #1;
      if (result !== er) begin
        errors = errors + 1;
        $display("FAIL a=%b b=%b expected=%d got=%d", ia, ib, er, result);
      end else $display("PASS a=%b b=%b result=%d", ia, ib, result);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(8'b00001111, 8'b00000011, 2'd1);
    check(8'b11111111, 8'b00000000, 2'd1);
    check(8'b00000001, 8'b00000111, 2'd2);
    check(8'b10101010, 8'b01010101, 2'd0);
    check(8'b00000000, 8'b00000000, 2'd0);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'result'],
      wavedrom: {
        signal: [
          { name: 'a[7:0]', wave: '2.3.4.', data: ['00001111', '00000001', '10101010'] },
          { name: 'b[7:0]', wave: '2.3.4.', data: ['00000011', '00000111', '01010101'] },
          { name: 'result[1:0]', wave: '2.3.4.', data: ['1', '2', '0'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'manchester-decoder',
      title: 'Manchester Decoder',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'protocol'],
      category: 'Combinational Design',
      lede: 'Recover the original data bit from a Manchester-encoded line signal — the exact inverse of the Manchester Encoder problem.',
      concept: '<b>Concept:</b> Since encoding was <code>enc = data ^ clk</code>, decoding is the same operation solved for data: <code>data = enc ^ clk</code>. XOR is its own inverse, so the encoder and decoder are literally the same circuit.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Bit clock</td></tr>
<tr><td>enc</td><td>input</td><td>1</td><td>Manchester-encoded line input</td></tr>
<tr><td>data</td><td>output</td><td>1</td><td>Recovered data bit</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  enc,
  output data
);

  // Your code here

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, enc;
  wire data;
  integer errors = 0;
  top_module dut(.clk(clk), .enc(enc), .data(data));
  task check;
    input ic, ie; input ed;
    begin
      clk = ic; enc = ie; #1;
      if (data !== ed) begin
        errors = errors + 1;
        $display("FAIL clk=%b enc=%b expected=%b got=%b", ic, ie, ed, data);
      end else $display("PASS clk=%b enc=%b data=%b", ic, ie, data);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    check(0, 0, 0);
    check(1, 1, 0);
    check(0, 1, 1);
    check(1, 0, 1);
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'enc', 'data'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: '0.1.0.1.' },
          { name: 'enc', wave: '0.1...0.' },
          { name: 'data', wave: '0.....1.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'digital-dice',
      title: 'Digital Dice (LFSR)',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'lfsr'],
      category: 'Sequential Design',
      lede: 'An LFSR-powered dice roller: advance a maximal-length 3-bit LFSR each cycle and map its output into a valid 1-6 range.',
      concept: '<b>Concept:</b> A 3-bit maximal LFSR naturally cycles through the 7 nonzero values 1-7, never landing on 0. Fold the one out-of-range value back in: <code>dice_value = (lfsr==7) ? 1 : lfsr;</code>. Skipping that fold-back would let the circuit output an impossible "7" on a six-sided die.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync reset, seeds LFSR to 001</td></tr>
<tr><td>roll_en</td><td>input</td><td>1</td><td>Advance the LFSR while high</td></tr>
<tr><td>dice_value</td><td>output</td><td>3</td><td>Current roll, always 1-6</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input      clk,
  input      rst,
  input      roll_en,
  output [2:0] dice_value
);

  // Your code here — 3-bit LFSR (feedback = q[2]^q[1]), seeded to 3'b001, folding 7 back to 1.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, roll_en;
  wire [2:0] dice_value;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .roll_en(roll_en), .dice_value(dice_value));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input [2:0] ev; input [127:0] label;
    begin
      if (dice_value !== ev) begin
        errors = errors + 1;
        $display("FAIL %0s expected=%d got=%d", label, ev, dice_value);
      end else $display("PASS %0s dice_value=%d", label, dice_value);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; roll_en = 0; @(posedge clk); #1; check(1, "seed");
    rst = 0; roll_en = 1;
    @(posedge clk); #1; check(2, "s1");
    @(posedge clk); #1; check(5, "s2");
    @(posedge clk); #1; check(3, "s3");
    @(posedge clk); #1; check(1, "s4-mapped-from-7");
    @(posedge clk); #1; check(6, "s5");
    @(posedge clk); #1; check(4, "s6");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'roll_en', 'dice_value'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.............' },
          { name: 'rst', wave: '10............' },
          { name: 'dice_value[2:0]', wave: '2.3.4.5.6.7.8.', data: ['1', '2', '5', '3', '1', '6', '4'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'elevator-controller',
      title: '2-Floor Elevator Controller',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'fsm'],
      category: 'Sequential Design',
      lede: 'A simplified elevator FSM: sit idle until called, take one cycle to transit between floors, and only move when actually requested.',
      concept: '<b>Concept:</b> A 4-state FSM — idle at floor 1, moving up, idle at floor 2, moving down. Each idle state only leaves when its matching call button is pressed; each moving state unconditionally arrives at the destination on the next cycle. The easy bug to make is auto-cycling through all four states regardless of whether anyone actually pressed a button.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (starts idle at floor 1)</td></tr>
<tr><td>call1</td><td>input</td><td>1</td><td>Call button for floor 1</td></tr>
<tr><td>call2</td><td>input</td><td>1</td><td>Call button for floor 2</td></tr>
<tr><td>at_floor2</td><td>output</td><td>1</td><td>1 when idle at floor 2</td></tr>
<tr><td>moving</td><td>output</td><td>1</td><td>1 while transiting between floors</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  call1,
  input  call2,
  output at_floor2,
  output moving
);

  // Your code here — 4-state FSM: AT1, MOVING_UP, AT2, MOVING_DOWN.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, call1, call2;
  wire at_floor2, moving;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .call1(call1), .call2(call2), .at_floor2(at_floor2), .moving(moving));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input ea; input em; input [127:0] label;
    begin
      if (at_floor2 !== ea || moving !== em) begin
        errors = errors + 1;
        $display("FAIL %0s expected at2=%b moving=%b got at2=%b moving=%b", label, ea, em, at_floor2, moving);
      end else $display("PASS %0s at2=%b moving=%b", label, at_floor2, moving);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; call1 = 0; call2 = 0; @(posedge clk); #1; check(0, 0, "reset-at1");
    rst = 0;
    @(posedge clk); #1; check(0, 0, "idle-no-call-stays");
    @(posedge clk); #1; check(0, 0, "idle-still-stays");
    call2 = 1; @(posedge clk); #1; check(0, 1, "called-now-moving-up");
    call2 = 0; @(posedge clk); #1; check(1, 0, "arrived-floor2");
    call1 = 1; @(posedge clk); #1; check(0, 1, "called-now-moving-down");
    call1 = 0; @(posedge clk); #1; check(0, 0, "arrived-floor1");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'call1', 'call2', 'at_floor2', 'moving'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.............' },
          { name: 'call2', wave: '0.......1.0...' },
          { name: 'at_floor2', wave: '0.........1...' },
          { name: 'moving', wave: '0.......1.0...' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'rotary-encoder-decoder',
      title: 'Quadrature Rotary Encoder Decoder',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'protocol'],
      category: 'Sequential Design',
      lede: 'Decode the two-phase A/B signal from a real rotary knob or mouse wheel into a direction and position count — sample B on every rising edge of A.',
      concept: '<b>Concept:</b> On every rising edge of <code>a</code>, look at <code>b</code>: if it\'s low, the knob turned clockwise (increment); if high, counter-clockwise (decrement). This "sample the other phase on an edge" technique is the simplified version of the quadrature decoding logic used in real mice, encoders, and volume knobs.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock (sampling the a/b lines)</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>a</td><td>input</td><td>1</td><td>Quadrature phase A</td></tr>
<tr><td>b</td><td>input</td><td>1</td><td>Quadrature phase B</td></tr>
<tr><td>position</td><td>output</td><td>4</td><td>Running position count</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input            clk,
  input            rst,
  input            a,
  input            b,
  output reg [3:0] position
);

  // Your code here — on a's rising edge, b=0 means CW (+1), b=1 means CCW (-1).

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, a, b;
  wire [3:0] position;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .a(a), .b(b), .position(position));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input [3:0] ep; input [127:0] label;
    begin
      if (position !== ep) begin
        errors = errors + 1;
        $display("FAIL %0s expected=%d got=%d", label, ep, position);
      end else $display("PASS %0s position=%d", label, position);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; a = 0; b = 0; @(posedge clk); #1; check(0, "reset");
    rst = 0;
    @(posedge clk); #1; check(0, "no-edge");
    a = 1; b = 0; @(posedge clk); #1; check(1, "cw-rising-b0");
    @(posedge clk); #1; check(1, "a-stays-high-noop");
    a = 0; @(posedge clk); #1; check(1, "falling-noop");
    a = 1; b = 1; @(posedge clk); #1; check(0, "ccw-rising-b1");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'a', 'b', 'position'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p...........' },
          { name: 'a', wave: '0.....1.0.1.' },
          { name: 'b', wave: '0...........' },
          { name: 'position[3:0]', wave: '2.......3...', data: ['0', '1'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'pwm-generator',
      title: 'PWM Generator',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'clock'],
      category: 'Sequential Design',
      lede: 'Generate a pulse-width-modulated output with a programmable duty cycle out of 16 — the technique behind LED dimming and motor speed control.',
      concept: '<b>Concept:</b> A free-running 4-bit counter sweeps 0-15 every 16 cycles; the output is simply <code>pwm_out = (cnt &lt; duty)</code>. The strict less-than matters: using <code>&lt;=</code> instead makes every duty value one cycle wider than requested, breaking duty=0 (which should mean "always off").',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>duty</td><td>input</td><td>4</td><td>Duty cycle, 0-15 out of 16</td></tr>
<tr><td>pwm_out</td><td>output</td><td>1</td><td>High for duty cycles out of every 16</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  [3:0] duty,
  output pwm_out
);

  // Your code here — free-running 4-bit counter; pwm_out = (cnt < duty).

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst;
  reg [3:0] duty;
  wire pwm_out;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .duty(duty), .pwm_out(pwm_out));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input ep; input [127:0] label;
    begin
      if (pwm_out !== ep) begin
        errors = errors + 1;
        $display("FAIL %0s expected=%b got=%b", label, ep, pwm_out);
      end else $display("PASS %0s pwm_out=%b", label, pwm_out);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; duty = 4'd4; @(posedge clk); #1; check(1, "reset-cnt0");
    rst = 0;
    @(posedge clk); #1; check(1, "cnt1");
    @(posedge clk); #1; check(1, "cnt2");
    @(posedge clk); #1; check(1, "cnt3");
    @(posedge clk); #1; check(0, "cnt4-off");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'duty', 'pwm_out'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.........' },
          { name: 'rst', wave: '10........' },
          { name: 'pwm_out', wave: '1...0.....' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'sync-ram-8x8',
      title: 'Synchronous 8x8 RAM',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'memory'],
      category: 'Sequential Design',
      lede: 'A minimal single-port RAM: 8 words of 8 bits each, with a registered (one-cycle-delayed) read — the standard timing behavior of real block RAM.',
      concept: '<b>Concept:</b> The write is a simple <code>if(we) mem[addr]&lt;=din;</code>. The read is what trips people up: <code>dout&lt;=mem[addr];</code> is a <em>registered</em> read — it captures the addressed word one cycle late, matching how real synchronous RAM behaves. Making <code>dout</code> a combinational <code>assign</code> instead gives zero-cycle latency, a different (and usually wrong) timing contract for anything expecting real memory behavior.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>we</td><td>input</td><td>1</td><td>Write enable</td></tr>
<tr><td>addr</td><td>input</td><td>3</td><td>Address, 0-7</td></tr>
<tr><td>din</td><td>input</td><td>8</td><td>Write data</td></tr>
<tr><td>dout</td><td>output</td><td>8</td><td>Registered read data (1-cycle latency)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input      clk,
  input      we,
  input      [2:0] addr,
  input      [7:0] din,
  output reg [7:0] dout
);

  // Your code here — reg [7:0] mem [0:7]; write on we, and register dout <= mem[addr] every cycle.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, we;
  reg [2:0] addr;
  reg [7:0] din;
  wire [7:0] dout;
  integer errors = 0;
  top_module dut(.clk(clk), .we(we), .addr(addr), .din(din), .dout(dout));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input [7:0] ed; input [127:0] label;
    begin
      if (dout !== ed) begin
        errors = errors + 1;
        $display("FAIL %0s expected=%h got=%h", label, ed, dout);
      end else $display("PASS %0s dout=%h", label, dout);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    we = 1; addr = 0; din = 8'hAA; @(posedge clk); #1;
    we = 1; addr = 1; din = 8'hBB; @(posedge clk); #1;
    we = 0; addr = 0; @(posedge clk); #1; check(8'hAA, "read-addr0");
    we = 0; addr = 1; @(posedge clk); #1; check(8'hBB, "read-addr1");
    we = 1; addr = 2; din = 8'hCC; @(posedge clk); #1; check(8'hxx, "registered-shows-stale-during-write");
    we = 0; addr = 2; @(posedge clk); #1; check(8'hCC, "next-cycle-shows-new-data");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'we', 'addr', 'din', 'dout'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'we', wave: '1.0.....' },
          { name: 'addr[2:0]', wave: '2.3.4.5.', data: ['0', '1', '0', '1'] },
          { name: 'dout[7:0]', wave: '2.......', data: ['xx'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'safe-with-lockout',
      title: 'Combination Safe with Lockout',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'fsm'],
      category: 'Sequential Design',
      lede: 'A combination lock that locks itself out entirely after 3 failed attempts — a security-flavored extension of the basic combination lock FSM.',
      concept: '<b>Concept:</b> Layer a failure counter on top of the combination-lock FSM: every time a wrong digit knocks progress back to the start (from partway through the sequence), increment <code>fails</code>. On the 3rd such failure, latch a permanent <code>locked</code> flag that gates the entire state machine — once set, no further digit has any effect until reset.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (also clears lockout)</td></tr>
<tr><td>code</td><td>input</td><td>2</td><td>Digit entered this cycle; correct sequence is 2,1,3</td></tr>
<tr><td>unlocked</td><td>output</td><td>1</td><td>1 once the correct sequence is entered</td></tr>
<tr><td>locked_out</td><td>output</td><td>1</td><td>1 after 3 failed attempts; ignores all input until reset</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  [1:0] code,
  output unlocked,
  output locked_out
);

  // Your code here — combination-lock FSM (2,1,3) plus a fail counter that locks out after 3 failures.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst;
  reg [1:0] code;
  wire unlocked, locked_out;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .code(code), .unlocked(unlocked), .locked_out(locked_out));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input eu; input el; input [127:0] label;
    begin
      if (unlocked !== eu || locked_out !== el) begin
        errors = errors + 1;
        $display("FAIL %0s expected unlocked=%b locked=%b got unlocked=%b locked=%b", label, eu, el, unlocked, locked_out);
      end else $display("PASS %0s unlocked=%b locked=%b", label, unlocked, locked_out);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; code = 0; @(posedge clk); #1; check(0, 0, "reset");
    rst = 0;
    code = 2; @(posedge clk); #1; check(0, 0, "d1");
    code = 0; @(posedge clk); #1; check(0, 0, "fail1");
    code = 2; @(posedge clk); #1; check(0, 0, "d1-again");
    code = 1; @(posedge clk); #1; check(0, 0, "d2");
    code = 0; @(posedge clk); #1; check(0, 0, "fail2");
    code = 2; @(posedge clk); #1; check(0, 0, "d1-again2");
    code = 1; @(posedge clk); #1; check(0, 0, "d2-again2");
    code = 0; @(posedge clk); #1; check(0, 1, "fail3-locks-out");
    code = 2; @(posedge clk); #1; check(0, 1, "ignored-while-locked");
    code = 1; @(posedge clk); #1; check(0, 1, "still-locked");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'code', 'unlocked', 'locked_out'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.....................' },
          { name: 'code[1:0]', wave: '2.3.4.5.3.4.5.3.4.5.4.', data: ['0', '2', '0', '2', '1', '0', '2', '1', '0', '2', '1'] },
          { name: 'locked_out', wave: '0.................1...' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'fifo-occupancy-counter',
      title: 'FIFO Occupancy Counter',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'fifo'],
      category: 'Sequential Design',
      lede: 'Track exactly how many words are sitting in an 8-deep FIFO — not just full/empty booleans, but the actual live count, including the tricky case of a simultaneous push and pop.',
      concept: '<b>Concept:</b> A single case on <code>{push&amp;&amp;!full, pop&amp;&amp;!empty}</code> handles all four combinations explicitly, including <code>2\'b11</code> (both happen at once): a simultaneous push and pop nets to no change in count, since one word leaves as another enters. Chaining separate <code>if</code>/<code>else if</code> checks instead silently drops one side of that simultaneous case.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>push</td><td>input</td><td>1</td><td>Request to add a word (ignored if full)</td></tr>
<tr><td>pop</td><td>input</td><td>1</td><td>Request to remove a word (ignored if empty)</td></tr>
<tr><td>count</td><td>output</td><td>4</td><td>Current occupancy, 0-8</td></tr>
<tr><td>full</td><td>output</td><td>1</td><td>1 when count == 8</td></tr>
<tr><td>empty</td><td>output</td><td>1</td><td>1 when count == 0</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input            clk,
  input            rst,
  input            push,
  input            pop,
  output reg [3:0] count,
  output           full,
  output           empty
);

  // Your code here — handle push-only, pop-only, both-at-once, and neither, as four distinct cases.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, push, pop;
  wire [3:0] count;
  wire full, empty;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .push(push), .pop(pop), .count(count), .full(full), .empty(empty));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input [3:0] ec; input ef; input ee; input [127:0] label;
    begin
      if (count !== ec || full !== ef || empty !== ee) begin
        errors = errors + 1;
        $display("FAIL %0s expected count=%d full=%b empty=%b got count=%d full=%b empty=%b", label, ec, ef, ee, count, full, empty);
      end else $display("PASS %0s count=%d full=%b empty=%b", label, count, full, empty);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; push = 0; pop = 0; @(posedge clk); #1; check(0, 0, 1, "reset");
    rst = 0; push = 1;
    @(posedge clk); #1; check(1, 0, 0, "push1");
    @(posedge clk); #1; check(2, 0, 0, "push2");
    pop = 1;
    @(posedge clk); #1; check(2, 0, 0, "push+pop-same-cycle-no-net-change");
    push = 0;
    @(posedge clk); #1; check(1, 0, 0, "pop-only");
    @(posedge clk); #1; check(0, 0, 1, "pop-to-empty");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'push', 'pop', 'count'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'push', wave: '0.1...0.' },
          { name: 'pop', wave: '0.....1.' },
          { name: 'count[3:0]', wave: '2.3.4.5.', data: ['0', '1', '2', '1'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'sevenseg-multiplexer',
      title: '2-Digit 7-Segment Multiplexer',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'display'],
      category: 'Sequential Design',
      lede: 'Drive two digits from one shared set of segment lines by rapidly alternating which digit is active — the real technique behind every multi-digit 7-segment display.',
      concept: '<b>Concept:</b> A free-running 1-bit toggle flips every cycle; that bit both selects which digit\'s BCD value to present (<code>active_bcd = toggle ? digit1 : digit0</code>) and which physical digit is enabled (<code>digit_sel</code>). If the toggle never flips, one digit is permanently dark — a real symptom on physical multiplexed displays.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock (multiplex rate)</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>digit0</td><td>input</td><td>4</td><td>BCD value for digit 0</td></tr>
<tr><td>digit1</td><td>input</td><td>4</td><td>BCD value for digit 1</td></tr>
<tr><td>digit_sel</td><td>output</td><td>1</td><td>Which digit is currently active (0 or 1)</td></tr>
<tr><td>active_bcd</td><td>output</td><td>4</td><td>BCD value of the currently active digit</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  [3:0] digit0,
  input  [3:0] digit1,
  output digit_sel,
  output [3:0] active_bcd
);

  // Your code here — a free-running toggle alternates which digit is presented each cycle.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst;
  reg [3:0] digit0, digit1;
  wire digit_sel;
  wire [3:0] active_bcd;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .digit0(digit0), .digit1(digit1), .digit_sel(digit_sel), .active_bcd(active_bcd));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input es; input [3:0] eb; input [127:0] label;
    begin
      if (digit_sel !== es || active_bcd !== eb) begin
        errors = errors + 1;
        $display("FAIL %0s expected sel=%b bcd=%d got sel=%b bcd=%d", label, es, eb, digit_sel, active_bcd);
      end else $display("PASS %0s sel=%b bcd=%d", label, digit_sel, active_bcd);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; digit0 = 4'd3; digit1 = 4'd7; @(posedge clk); #1; check(0, 3, "reset-shows-digit0");
    rst = 0;
    @(posedge clk); #1; check(1, 7, "toggle-shows-digit1");
    @(posedge clk); #1; check(0, 3, "toggle-back-digit0");
    @(posedge clk); #1; check(1, 7, "toggle-digit1-again");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'digit_sel', 'active_bcd'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.........' },
          { name: 'digit_sel', wave: '0.1.0.1...' },
          { name: 'active_bcd[3:0]', wave: '2.3.4.3...', data: ['3', '7', '3'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'bcd-stopwatch-seconds',
      title: 'BCD Stopwatch (00-59 Seconds)',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'counter'],
      category: 'Sequential Design',
      lede: 'Two chained BCD digits counting seconds from 00 to 59 and wrapping — the real digit-chaining pattern behind every digital clock and stopwatch display.',
      concept: '<b>Concept:</b> The units digit counts 0-9 and rolls over into a tens-digit increment. The tens digit, though, must wrap at <strong>5</strong>, not 9 — a plain BCD digit maxes at 9, but a seconds display\'s tens place is only ever 0-5. Using the generic BCD wraparound here would let the display show impossible times like "68".',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>en</td><td>input</td><td>1</td><td>Count enable (tick once per second in real use)</td></tr>
<tr><td>units</td><td>output</td><td>4</td><td>Ones digit, 0-9</td></tr>
<tr><td>tens</td><td>output</td><td>3</td><td>Tens digit, 0-5</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input            clk,
  input            rst,
  input            en,
  output reg [3:0] units,
  output reg [2:0] tens
);

  // Your code here — units wraps at 9, tens wraps at 5.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, en;
  wire [3:0] units;
  wire [2:0] tens;
  integer errors = 0;
  integer i;
  top_module dut(.clk(clk), .rst(rst), .en(en), .units(units), .tens(tens));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input [3:0] eu; input [2:0] et; input [127:0] label;
    begin
      if (units !== eu || tens !== et) begin
        errors = errors + 1;
        $display("FAIL %0s expected units=%d tens=%d got units=%d tens=%d", label, eu, et, units, tens);
      end else $display("PASS %0s units=%d tens=%d", label, units, tens);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; en = 0; @(posedge clk); #1; check(0, 0, "reset");
    rst = 0; en = 1;
    for (i = 0; i < 9; i = i + 1) begin @(posedge clk); #1; end
    check(9, 0, "reached-09");
    @(posedge clk); #1; check(0, 1, "rolled-to-10");
    for (i = 0; i < 49; i = i + 1) begin @(posedge clk); #1; end
    check(9, 5, "reached-59");
    @(posedge clk); #1; check(0, 0, "wrapped-to-00");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'en', 'units', 'tens'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'units[3:0]', wave: '2.3.4.5.', data: ['0', '9', '0', '9'] },
          { name: 'tens[2:0]', wave: '2...3.4.', data: ['0', '1', '5'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'simple-alarm-clock',
      title: 'Alarm Clock Trigger',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'comparator'],
      category: 'Sequential Design',
      lede: "Fire an alarm for exactly one cycle the moment the current time matches the alarm time — not for the entire minute the clock happens to sit on that value.",
      concept: '<b>Concept:</b> Compute <code>match</code> combinationally, then register both it and its own previous cycle\'s value: <code>alarm_trig &lt;= match &amp;&amp; !prev_match;</code>. That\'s a rising-edge detector on the match condition — without it, the alarm would blare continuously for every cycle the clock happens to sit on the matching minute, not just the moment it arrives.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>cur_hour</td><td>input</td><td>5</td><td>Current hour, 0-23</td></tr>
<tr><td>cur_min</td><td>input</td><td>6</td><td>Current minute, 0-59</td></tr>
<tr><td>alarm_hour</td><td>input</td><td>5</td><td>Alarm hour</td></tr>
<tr><td>alarm_min</td><td>input</td><td>6</td><td>Alarm minute</td></tr>
<tr><td>alarm_en</td><td>input</td><td>1</td><td>Alarm enabled</td></tr>
<tr><td>alarm_trig</td><td>output</td><td>1</td><td>Pulses high for 1 cycle when time first matches</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input      clk,
  input      rst,
  input      [4:0] cur_hour,
  input      [5:0] cur_min,
  input      [4:0] alarm_hour,
  input      [5:0] alarm_min,
  input      alarm_en,
  output reg alarm_trig
);

  // Your code here — register a "match" signal and pulse alarm_trig only on its rising edge.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst;
  reg [4:0] cur_hour, alarm_hour;
  reg [5:0] cur_min, alarm_min;
  reg alarm_en;
  wire alarm_trig;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .cur_hour(cur_hour), .cur_min(cur_min), .alarm_hour(alarm_hour), .alarm_min(alarm_min), .alarm_en(alarm_en), .alarm_trig(alarm_trig));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input et; input [127:0] label;
    begin
      if (alarm_trig !== et) begin
        errors = errors + 1;
        $display("FAIL %0s expected=%b got=%b", label, et, alarm_trig);
      end else $display("PASS %0s alarm_trig=%b", label, alarm_trig);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; cur_hour = 0; cur_min = 0; alarm_hour = 7; alarm_min = 30; alarm_en = 1; @(posedge clk); #1; check(0, "reset");
    rst = 0;
    @(posedge clk); #1; check(0, "not-matching-yet");
    cur_hour = 7; cur_min = 30;
    @(posedge clk); #1; check(1, "match-pulses");
    @(posedge clk); #1; check(0, "still-matching-no-retrigger");
    @(posedge clk); #1; check(0, "still-matching-no-retrigger2");
    cur_min = 31;
    @(posedge clk); #1; check(0, "time-moved-on");
    cur_hour = 7; cur_min = 30;
    @(posedge clk); #1; check(1, "matches-again-pulses");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'cur_min', 'alarm_trig'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.............' },
          { name: 'cur_min[5:0]', wave: '2...3.....4.5.', data: ['0', '30', '31', '30'] },
          { name: 'alarm_trig', wave: '0...1.0.....1.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'traffic-light-pedestrian',
      title: 'Traffic Light with Pedestrian Crossing',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'fsm'],
      category: 'Sequential Design',
      lede: 'Extend the basic traffic light FSM with a pedestrian crossing button: a press latches a request that cuts the green phase short instead of waiting out the full cycle.',
      concept: '<b>Concept:</b> A latch remembers a pedestrian request across cycles (<code>if(ped_request) ped_latch&lt;=1;</code>) so a single press isn\'t missed if it doesn\'t land exactly when checked. The GREEN state then advances to YELLOW as soon as <em>either</em> the latch is set <em>or</em> the normal timer expires — <code>ped_latch || cnt==2</code> — whichever comes first, then clears the latch on the way out.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (starts at RED)</td></tr>
<tr><td>ped_request</td><td>input</td><td>1</td><td>Pedestrian crossing button</td></tr>
<tr><td>light</td><td>output</td><td>2</td><td>0=RED, 1=GREEN, 2=YELLOW</td></tr>
<tr><td>walk_signal</td><td>output</td><td>1</td><td>1 while light is RED</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  ped_request,
  output [1:0] light,
  output walk_signal
);

  // Your code here — RED(3 cycles) -> GREEN(up to 3 cycles, cut short by ped_request) -> YELLOW(2 cycles) -> repeat.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, ped_request;
  wire [1:0] light;
  wire walk_signal;
  integer errors = 0;
  top_module dut(.clk(clk), .rst(rst), .ped_request(ped_request), .light(light), .walk_signal(walk_signal));
  initial clk = 0;
  always #5 clk = ~clk;
  task check;
    input [1:0] el; input ew; input [127:0] label;
    begin
      if (light !== el || walk_signal !== ew) begin
        errors = errors + 1;
        $display("FAIL %0s expected light=%d walk=%b got light=%d walk=%b", label, el, ew, light, walk_signal);
      end else $display("PASS %0s light=%d walk=%b", label, light, walk_signal);
    end
  endtask
  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, tb);
    rst = 1; ped_request = 0; @(posedge clk); #1; check(0, 1, "reset");
    rst = 0;
    @(posedge clk); #1; check(0, 1, "t1-red-cnt1");
    @(posedge clk); #1; check(0, 1, "t2-red-cnt2");
    @(posedge clk); #1; check(1, 0, "t3-now-green");
    ped_request = 1;
    @(posedge clk); #1; check(1, 0, "t4-green-cnt1-ped-latching");
    ped_request = 0;
    @(posedge clk); #1; check(2, 0, "t5-ped-cuts-green-short");
    @(posedge clk); #1; check(2, 0, "t6-yellow-cnt1");
    @(posedge clk); #1; check(0, 1, "t7-back-to-red");
    @(posedge clk); #1; check(0, 1, "t8-red-cnt1");
    @(posedge clk); #1; check(0, 1, "t9-red-cnt2");
    @(posedge clk); #1; check(1, 0, "t10-now-green-again");
    @(posedge clk); #1; check(1, 0, "t11-green-cnt1-no-ped");
    @(posedge clk); #1; check(1, 0, "t12-green-cnt2-no-ped");
    @(posedge clk); #1; check(2, 0, "t13-full-3-cycles-then-yellow");
    if (errors == 0) $display("ALL_TESTS_PASSED");
    else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'ped_request', 'light', 'walk_signal'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p...........' },
          { name: 'ped_request', wave: '0..1.0......' },
          { name: 'light[1:0]', wave: '2...3.4.2...', data: ['RED', 'GREEN', 'YELLOW', 'RED'] }
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
