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
      slug: 'fixed-priority-arbiter',
      title: 'Fixed-Priority Arbiter',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'encoder'],
      category: 'Combinational Design',
      lede: 'Grant exactly one of four requesters at a time, always favoring the highest-index request when several arrive together.',
      concept: '<b>Concept:</b> A fixed-priority arbiter is a nested-priority mux: check the highest-priority request first (<code>req[3]</code>), and only fall through to lower ones if it is idle. <code>grant = req[3]?4\'b1000:req[2]?4\'b0100:req[1]?4\'b0010:req[0]?4\'b0001:4\'b0000;</code> guarantees only one grant bit is ever set, with bit 3 always winning ties.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>req</td><td>input</td><td>4</td><td>Request lines, one per requester</td></tr>
<tr><td>grant</td><td>output</td><td>4</td><td>One-hot grant, req[3] has highest priority</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] req,
  output [3:0] grant
);

  // Your code here — grant the highest-index active request; grant=0 if no requests.

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] req; wire [3:0] grant; integer errors=0;
  top_module dut(.req(req), .grant(grant));
  task check; input [3:0] r; input [3:0] eg; begin
    req=r;#1;
    if(grant!==eg) begin errors=errors+1; $display("FAIL req=%b expected=%b got=%b",r,eg,grant); end
    else $display("PASS req=%b grant=%b",r,grant);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(4'b1111, 4'b1000);
    check(4'b0110, 4'b0100);
    check(4'b0001, 4'b0001);
    check(4'b0000, 4'b0000);
    check(4'b0011, 4'b0010);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['req', 'grant'],
      wavedrom: {
        signal: [
          { name: 'req[3:0]', wave: '2.3.4.5.', data: ['1111', '0110', '0001', '0011'] },
          { name: 'grant[3:0]', wave: '2.3.4.5.', data: ['1000', '0100', '0001', '0010'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'twos-complement-negator',
      title: 'Two\'s-Complement Negator',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'arithmetic'],
      category: 'Combinational Design',
      lede: 'Negate a signed 4-bit number and correctly flag the one input value that cannot be negated.',
      concept: '<b>Concept:</b> Negating a two\'s-complement number is invert-and-add-one: <code>out = ~in + 1</code>. But the most negative value, <code>4\'b1000</code> (-8), has no positive counterpart in 4 bits — negating it overflows back to itself, so <code>overflow = (in == 4\'b1000)</code> flags exactly that case.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>in</td><td>input</td><td>4</td><td>Signed two's-complement input</td></tr>
<tr><td>out</td><td>output</td><td>4</td><td>Negated value, -in</td></tr>
<tr><td>overflow</td><td>output</td><td>1</td><td>1 when in = -8 (cannot be negated in 4 bits)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] in,
  output [3:0] out,
  output overflow
);

  // Your code here — out = -in (invert and add 1); overflow when in cannot be negated.

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] in; wire [3:0] out; wire overflow; integer errors=0;
  top_module dut(.in(in), .out(out), .overflow(overflow));
  task check; input [3:0] i; input [3:0] eo; input eov; begin
    in=i;#1;
    if(out!==eo||overflow!==eov) begin errors=errors+1; $display("FAIL in=%b expected out=%b ovf=%b got out=%b ovf=%b",i,eo,eov,out,overflow); end
    else $display("PASS in=%b out=%b ovf=%b",i,out,overflow);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(4'b0011, 4'b1101, 0);
    check(4'b1101, 4'b0011, 0);
    check(4'b1000, 4'b1000, 1);
    check(4'b0000, 4'b0000, 0);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['in', 'out', 'overflow'],
      wavedrom: {
        signal: [
          { name: 'in[3:0]', wave: '2.3.4.5.', data: ['0011', '1101', '1000', '0000'] },
          { name: 'out[3:0]', wave: '2.3.4.5.', data: ['1101', '0011', '1000', '0000'] },
          { name: 'overflow', wave: '0...1.0.' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'interrupt-vector-generator',
      title: 'Interrupt Vector Generator',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'encoder'],
      category: 'Combinational Design',
      lede: 'Turn up to four pending interrupt lines into a fixed 8-bit vector table address, always dispatching the highest-priority IRQ first.',
      concept: '<b>Concept:</b> Real interrupt controllers map each IRQ line to a fixed handler address (a "vector"). This is a priority encoder whose output isn\'t a plain binary index but a lookup into a small table: <code>irq[3]-&gt;8\'hE0, irq[2]-&gt;8\'hC0, irq[1]-&gt;8\'hA0, irq[0]-&gt;8\'h80</code>, with <code>valid=|irq</code> telling the CPU whether to bother jumping at all.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>irq</td><td>input</td><td>4</td><td>Interrupt request lines, irq[3] highest priority</td></tr>
<tr><td>vector</td><td>output</td><td>8</td><td>Handler address for the highest pending IRQ</td></tr>
<tr><td>valid</td><td>output</td><td>1</td><td>1 when any IRQ is pending</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] irq,
  output [7:0] vector,
  output valid
);

  // Your code here — irq[3]->8'hE0, irq[2]->8'hC0, irq[1]->8'hA0, irq[0]->8'h80, none->8'h00.

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] irq; wire [7:0] vector; wire valid; integer errors=0;
  top_module dut(.irq(irq), .vector(vector), .valid(valid));
  task check; input [3:0] i; input [7:0] ev; input ev2; begin
    irq=i;#1;
    if(vector!==ev||valid!==ev2) begin errors=errors+1; $display("FAIL irq=%b expected vector=%h valid=%b got vector=%h valid=%b",i,ev,ev2,vector,valid); end
    else $display("PASS irq=%b vector=%h valid=%b",i,vector,valid);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(4'b1000, 8'hE0, 1);
    check(4'b0100, 8'hC0, 1);
    check(4'b1100, 8'hE0, 1);
    check(4'b0000, 8'h00, 0);
    check(4'b0001, 8'h80, 1);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['irq', 'vector', 'valid'],
      wavedrom: {
        signal: [
          { name: 'irq[3:0]', wave: '2.3.4.5.', data: ['1000', '0100', '0000', '0001'] },
          { name: 'vector[7:0]', wave: '2.3.4.5.', data: ['E0', 'C0', '00', '80'] },
          { name: 'valid', wave: '1...0.1.' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'sign-magnitude-converter',
      title: 'Sign-Magnitude to Two\'s-Complement Converter',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'arithmetic'],
      category: 'Combinational Design',
      lede: 'Convert a 4-bit sign-magnitude number (top bit = sign, bottom 3 bits = magnitude) into standard two\'s-complement.',
      concept: '<b>Concept:</b> Sign-magnitude and two\'s-complement agree on positive numbers but disagree on negatives. Build the zero-extended magnitude, <code>mag = {1\'b0, in[2:0]}</code>, then negate it (invert and add 1) only when the sign bit is set: <code>out = in[3] ? (~mag + 1) : in;</code>. Skipping the "+1" gives one\'s-complement instead — a common off-by-one bug.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>in</td><td>input</td><td>4</td><td>Sign-magnitude: in[3]=sign, in[2:0]=magnitude</td></tr>
<tr><td>out</td><td>output</td><td>4</td><td>Equivalent value in two's-complement</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] in,
  output [3:0] out
);

  // Your code here — in[3]=sign, in[2:0]=magnitude; convert to two's-complement.

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] in; wire [3:0] out; integer errors=0;
  top_module dut(.in(in), .out(out));
  task check; input [3:0] i; input [3:0] eo; begin
    in=i;#1;
    if(out!==eo) begin errors=errors+1; $display("FAIL in=%b expected=%b got=%b",i,eo,out); end
    else $display("PASS in=%b out=%b",i,out);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(4'b0101, 4'b0101);
    check(4'b1101, 4'b1011);
    check(4'b1000, 4'b0000);
    check(4'b1111, 4'b1001);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['in', 'out'],
      wavedrom: {
        signal: [
          { name: 'in[3:0]', wave: '2.3.4.5.', data: ['0101', '1101', '1000', '1111'] },
          { name: 'out[3:0]', wave: '2.3.4.5.', data: ['0101', '1011', '0000', '1001'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'bcd-to-binary',
      title: '2-Digit BCD to Binary Converter',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'arithmetic'],
      category: 'Combinational Design',
      lede: 'Convert two separate BCD digits (tens and units) into their actual binary decimal value, 0-99.',
      concept: '<b>Concept:</b> BCD digits are already decimal — the tens digit just needs to be scaled and added: <code>binary = tens*10 + units</code>. It\'s tempting to just concatenate the two nibbles (<code>{tens,units}</code>), but that reproduces the encoded bit pattern, not the actual decimal value it represents.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>tens</td><td>input</td><td>4</td><td>Tens BCD digit, 0-9</td></tr>
<tr><td>units</td><td>input</td><td>4</td><td>Units BCD digit, 0-9</td></tr>
<tr><td>binary</td><td>output</td><td>7</td><td>Binary value, 0-99</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] tens,
  input  [3:0] units,
  output [6:0] binary
);

  // Your code here — binary = tens*10 + units.

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] tens, units; wire [6:0] binary; integer errors=0;
  top_module dut(.tens(tens), .units(units), .binary(binary));
  task check; input [3:0] t,u; input [6:0] eb; begin
    tens=t;units=u;#1;
    if(binary!==eb) begin errors=errors+1; $display("FAIL tens=%d units=%d expected=%d got=%d",t,u,eb,binary); end
    else $display("PASS tens=%d units=%d binary=%d",t,u,binary);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(0,5,7'd5);
    check(9,9,7'd99);
    check(5,0,7'd50);
    check(1,0,7'd10);
    check(0,0,7'd0);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['tens', 'units', 'binary'],
      wavedrom: {
        signal: [
          { name: 'tens[3:0]', wave: '2.3.4.5.', data: ['0', '9', '5', '1'] },
          { name: 'units[3:0]', wave: '2.3.4.5.', data: ['5', '9', '0', '0'] },
          { name: 'binary[6:0]', wave: '2.3.4.5.', data: ['5', '99', '50', '10'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'bcd-updown-counter',
      title: 'BCD Up/Down Counter',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'counter'],
      category: 'Sequential Design',
      lede: 'A single-digit BCD counter that wraps at 9 going up and at 0 going down — not at the binary limits of a 4-bit register.',
      concept: '<b>Concept:</b> A plain 4-bit counter wraps at 15/0, but a BCD digit is only ever 0-9. Counting up must jump straight from 9 back to 0 (<code>q==4\'d9 ? 4\'d0 : q+1</code>), and counting down must jump from 0 straight to 9 (<code>q==4\'d0 ? 4\'d9 : q-1</code>) — letting it wrap at the binary boundary instead produces an invalid BCD digit like 10-15.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (q=0)</td></tr>
<tr><td>en</td><td>input</td><td>1</td><td>Count enable</td></tr>
<tr><td>up_down</td><td>input</td><td>1</td><td>1=count up, 0=count down</td></tr>
<tr><td>q</td><td>output</td><td>4</td><td>Current BCD digit, 0-9</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  en,
  input  up_down,
  output reg [3:0] q
);

  // Your code here — count 0..9 up, or 9..0 down, wrapping at the BCD boundary (not 15).

endmodule
`,
      hiddenTb: `
module tb;
  reg clk,rst,en,up_down; wire [3:0] q; integer errors=0; integer i;
  top_module dut(.clk(clk),.rst(rst),.en(en),.up_down(up_down),.q(q));
  initial clk=0; always #5 clk=~clk;
  task check; input [3:0] eq; input [127:0] label; begin
    if(q!==eq) begin errors=errors+1; $display("FAIL %0s expected=%d got=%d",label,eq,q); end
    else $display("PASS %0s q=%d",label,q);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1;en=0;up_down=1; @(posedge clk); #1; check(0,"reset");
    rst=0;en=1;
    for (i=0;i<9;i=i+1) begin @(posedge clk); #1; end
    check(9,"reached9");
    @(posedge clk); #1; check(0,"wraps-to-0");
    up_down=0;
    @(posedge clk); #1; check(9,"down-wraps-to-9");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'en', 'up_down', 'q'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'up_down', wave: '1.......' },
          { name: 'q[3:0]', wave: '2.3.4.5.', data: ['7', '8', '9', '0'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'change-detector',
      title: 'Registered Change Detector',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'edge-detect'],
      category: 'Sequential Design',
      lede: 'Flag combinationally, in the very same cycle, whenever the input differs from its last-registered value.',
      concept: '<b>Concept:</b> Register the previous value on every clock edge (<code>prev &lt;= data</code>), then compare it <em>combinationally</em> against the live input: <code>assign changed = (data != prev)</code>. Because the comparison is combinational, <code>changed</code> reacts the instant <code>data</code> moves — even between clock edges — rather than waiting a cycle like a registered comparison would.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (prev=0)</td></tr>
<tr><td>data</td><td>input</td><td>4</td><td>Live input value</td></tr>
<tr><td>changed</td><td>output</td><td>1</td><td>1 whenever data differs from its last-registered value</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  [3:0] data,
  output changed
);

  // Your code here — register the previous data value, then compare combinationally against the live input.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk,rst; reg [3:0] data; wire changed; integer errors=0;
  top_module dut(.clk(clk),.rst(rst),.data(data),.changed(changed));
  initial clk=0; always #5 clk=~clk;
  task check; input ec; input [127:0] label; begin
    if(changed!==ec) begin errors=errors+1; $display("FAIL %0s expected=%b got=%b",label,ec,changed); end
    else $display("PASS %0s changed=%b",label,changed);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1;data=0; @(posedge clk); #1; check(0,"reset");
    rst=0;
    data=5; #1; check(1,"data-changed-to-5-before-clock");
    @(posedge clk); #1; check(0,"prev-caught-up-no-change");
    #1; check(0,"still-same-value");
    data=8; #1; check(1,"data-changed-to-8-before-clock");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'data', 'changed'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p......' },
          { name: 'data[3:0]', wave: '2.3...4', data: ['0', '5', '8'] },
          { name: 'changed', wave: '0.10..1' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'frequency-counter',
      title: 'Rising-Edge Frequency Counter',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'edge-detect'],
      category: 'Sequential Design',
      lede: 'Count the number of rising edges seen on a pulse input while a measurement window is open — not the number of cycles it happens to sit high.',
      concept: '<b>Concept:</b> Level-high for multiple cycles must not be miscounted as multiple pulses. Register the previous sample, <code>prev_pulse &lt;= pulse_in</code>, and only increment on a true 0-to-1 transition: <code>if (window_en && pulse_in && !prev_pulse) count &lt;= count + 1;</code>. Counting on every cycle the level happens to be high overcounts any pulse wider than one clock.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (count=0)</td></tr>
<tr><td>window_en</td><td>input</td><td>1</td><td>1 while the measurement window is open</td></tr>
<tr><td>pulse_in</td><td>input</td><td>1</td><td>Signal being measured</td></tr>
<tr><td>count</td><td>output</td><td>8</td><td>Number of rising edges seen so far</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  window_en,
  input  pulse_in,
  output reg [7:0] count
);

  // Your code here — count only true 0->1 transitions of pulse_in while window_en is high.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk,rst,window_en,pulse_in; wire [7:0] count; integer errors=0;
  top_module dut(.clk(clk),.rst(rst),.window_en(window_en),.pulse_in(pulse_in),.count(count));
  initial clk=0; always #5 clk=~clk;
  task check; input [7:0] ec; input [127:0] label; begin
    if(count!==ec) begin errors=errors+1; $display("FAIL %0s expected=%d got=%d",label,ec,count); end
    else $display("PASS %0s count=%d",label,count);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1;window_en=0;pulse_in=0; @(posedge clk); #1; check(0,"reset");
    rst=0;window_en=1;
    pulse_in=1; @(posedge clk); #1; check(1,"edge1");
    @(posedge clk); #1; check(1,"held-high-no-recount");
    @(posedge clk); #1; check(1,"still-held-no-recount");
    pulse_in=0; @(posedge clk); #1; check(1,"falls-no-count");
    pulse_in=1; @(posedge clk); #1; check(2,"edge2");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'window_en', 'pulse_in', 'count'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'pulse_in', wave: '01...0.1' },
          { name: 'count[7:0]', wave: '2.3.....', data: ['0', '1'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'two-way-traffic-intersection',
      title: 'Two-Way Traffic Intersection',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'fsm'],
      category: 'Sequential Design',
      lede: 'Control two perpendicular traffic lights so that only one direction is ever green or yellow at a time — a safety-critical mutual-exclusion FSM.',
      concept: '<b>Concept:</b> A 4-state cycle — NS green (3 cycles), NS yellow (2 cycles), EW green (3 cycles), EW yellow (2 cycles) — guarantees the two directions never overlap, because each direction\'s light is driven purely from the current state: <code>ns_light</code> is only ever non-red during <code>NSG</code>/<code>NSY</code>, and <code>ew_light</code> only during <code>EWG</code>/<code>EWY</code>. Letting both outputs derive green from overlapping state conditions (even briefly, like during a shared reset state) creates a real collision hazard.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (starts at NS green)</td></tr>
<tr><td>ns_light</td><td>output</td><td>2</td><td>North-South light: 0=RED, 1=GREEN, 2=YELLOW</td></tr>
<tr><td>ew_light</td><td>output</td><td>2</td><td>East-West light: 0=RED, 1=GREEN, 2=YELLOW</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  output [1:0] ns_light,
  output [1:0] ew_light
);

  // Your code here — NS green(3) -> NS yellow(2) -> EW green(3) -> EW yellow(2) -> repeat. Never both green.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk,rst; wire [1:0] ns_light, ew_light; integer errors=0;
  top_module dut(.clk(clk),.rst(rst),.ns_light(ns_light),.ew_light(ew_light));
  initial clk=0; always #5 clk=~clk;
  task check; input [1:0] en; input [1:0] ee; input [127:0] label; begin
    if(ns_light!==en||ew_light!==ee) begin errors=errors+1; $display("FAIL %0s expected ns=%d ew=%d got ns=%d ew=%d",label,en,ee,ns_light,ew_light); end
    else $display("PASS %0s ns=%d ew=%d",label,ns_light,ew_light);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; @(posedge clk); #1; check(1,0,"reset-ns-green");
    rst=0;
    @(posedge clk); #1; check(1,0,"ns-green2");
    @(posedge clk); #1; check(1,0,"ns-green3");
    @(posedge clk); #1; check(2,0,"ns-yellow1");
    @(posedge clk); #1; check(2,0,"ns-yellow2");
    @(posedge clk); #1; check(0,1,"ew-green1");
    @(posedge clk); #1; check(0,1,"ew-green2");
    @(posedge clk); #1; check(0,1,"ew-green3");
    @(posedge clk); #1; check(0,2,"ew-yellow1");
    @(posedge clk); #1; check(0,2,"ew-yellow2");
    @(posedge clk); #1; check(1,0,"back-to-ns-green");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'ns_light', 'ew_light'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p...........' },
          { name: 'ns_light[1:0]', wave: '2...3.4.....', data: ['GREEN', 'YELLOW', 'RED'] },
          { name: 'ew_light[1:0]', wave: '2.......3.4.', data: ['RED', 'GREEN', 'YELLOW'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'uart-frame-assembler',
      title: 'UART Frame Assembler',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'fsm', 'communication'],
      category: 'Sequential Design',
      lede: 'Detect a UART start bit on a serial line, shift in 8 data bits LSB-first, and flag the completed byte for exactly one cycle.',
      concept: '<b>Concept:</b> A UART receiver idles with <code>rx</code> high and treats a falling edge as a start bit, then shifts in 8 bits LSB-first with <code>rx_data &lt;= {rx, rx_data[7:1]}</code> (each new bit enters at the top and existing bits shift right, so the first bit received ends up in bit 0). After the 8th bit (<code>cnt==7</code>), pulse <code>rx_valid</code> for one cycle and return to idle so the next start bit can be detected.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock (sampling the line, one sample per bit)</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (returns to idle)</td></tr>
<tr><td>rx</td><td>input</td><td>1</td><td>Serial line; idle high, falls to start a frame</td></tr>
<tr><td>rx_data</td><td>output</td><td>8</td><td>Assembled byte, LSB-first shift-in</td></tr>
<tr><td>rx_valid</td><td>output</td><td>1</td><td>Pulses for 1 cycle when a full byte has been received</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  rx,
  output reg [7:0] rx_data,
  output reg rx_valid
);

  // Your code here — idle until rx falls (start bit), shift in 8 bits LSB-first, pulse rx_valid for 1 cycle when done.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk,rst,rx; wire [7:0] rx_data; wire rx_valid; integer errors=0;
  top_module dut(.clk(clk),.rst(rst),.rx(rx),.rx_data(rx_data),.rx_valid(rx_valid));
  initial clk=0; always #5 clk=~clk;
  task checkvalid; input ev; input [127:0] label; begin
    if(rx_valid!==ev) begin errors=errors+1; $display("FAIL %0s expected valid=%b got valid=%b",label,ev,rx_valid); end
    else $display("PASS %0s valid=%b",label,rx_valid);
  end endtask
  task checkdata; input [7:0] ed; input [127:0] label; begin
    if(rx_data!==ed) begin errors=errors+1; $display("FAIL %0s expected data=%h got data=%h",label,ed,rx_data); end
    else $display("PASS %0s data=%h",label,rx_data);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; rx=1; @(posedge clk); #1; checkvalid(0,"reset");
    rst=0;
    rx=1; @(posedge clk); #1; checkvalid(0,"idle");
    rx=0; @(posedge clk); #1; checkvalid(0,"start-bit-detected");
    rx=0; @(posedge clk); #1;
    rx=1; @(posedge clk); #1;
    rx=0; @(posedge clk); #1;
    rx=0; @(posedge clk); #1;
    rx=1; @(posedge clk); #1;
    rx=1; @(posedge clk); #1;
    rx=0; @(posedge clk); #1;
    rx=1; @(posedge clk); #1; checkvalid(1,"byte-complete"); checkdata(8'hB2,"byte-value");
    rx=1; @(posedge clk); #1; checkvalid(0,"back-to-idle");
    rx=0; @(posedge clk); #1; checkvalid(0,"second-start-bit-detected");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'rx', 'rx_data', 'rx_valid'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p...........' },
          { name: 'rx', wave: '1.0.10010110' },
          { name: 'rx_valid', wave: '0..........1' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'gearbox-narrow-to-wide',
      title: '4-to-8 Bit Gearbox',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'datapath'],
      category: 'Sequential Design',
      lede: 'Pack two 4-bit nibbles arriving one per cycle into a single 8-bit word, pulsing valid only once the pair is complete — the narrow-to-wide half of a SerDes gearbox.',
      concept: '<b>Concept:</b> A gearbox bridges two datapaths running at different widths (and therefore different word rates) without dropping data. Here, the first nibble is latched and held; when the second nibble arrives, it combines with the held nibble into a full byte, <code>{first_nibble, in_data}</code>, and <code>out_valid</code> pulses for exactly the one cycle the byte is ready — first nibble becomes the upper bits, since it arrived first.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>in_valid</td><td>input</td><td>1</td><td>1 when in_data carries a new nibble</td></tr>
<tr><td>in_data</td><td>input</td><td>4</td><td>Incoming nibble</td></tr>
<tr><td>out_valid</td><td>output</td><td>1</td><td>Pulses for 1 cycle when a full byte is assembled</td></tr>
<tr><td>out_data</td><td>output</td><td>8</td><td>Assembled byte: first nibble in bits[7:4], second in bits[3:0]</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  in_valid,
  input  [3:0] in_data,
  output reg out_valid,
  output reg [7:0] out_data
);

  // Your code here — latch the first nibble; on the second, pack {first, second} and pulse out_valid.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk,rst,in_valid; reg [3:0] in_data; wire out_valid; wire [7:0] out_data; integer errors=0;
  top_module dut(.clk(clk),.rst(rst),.in_valid(in_valid),.in_data(in_data),.out_valid(out_valid),.out_data(out_data));
  initial clk=0; always #5 clk=~clk;
  task checkv; input ev; input [127:0] label; begin
    if(out_valid!==ev) begin errors=errors+1; $display("FAIL %0s expected valid=%b got=%b",label,ev,out_valid); end
    else $display("PASS %0s valid=%b",label,out_valid);
  end endtask
  task checkd; input [7:0] ed; input [127:0] label; begin
    if(out_data!==ed) begin errors=errors+1; $display("FAIL %0s expected data=%h got=%h",label,ed,out_data); end
    else $display("PASS %0s data=%h",label,out_data);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1;in_valid=0; @(posedge clk); #1; checkv(0,"reset");
    rst=0;
    in_valid=1;in_data=4'hA; @(posedge clk); #1; checkv(0,"first-nibble-no-output");
    in_valid=1;in_data=4'h5; @(posedge clk); #1; checkv(1,"byte-assembled"); checkd(8'hA5,"byte-value");
    in_valid=0; @(posedge clk); #1; checkv(0,"deasserts");
    in_valid=1;in_data=4'h3; @(posedge clk); #1; checkv(0,"third-nibble-first-of-next-pair");
    in_valid=1;in_data=4'hC; @(posedge clk); #1; checkv(1,"second-byte-assembled"); checkd(8'h3C,"second-byte-value");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'in_valid', 'in_data', 'out_valid', 'out_data'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'in_data[3:0]', wave: '2.3.....', data: ['A', '5'] },
          { name: 'out_valid', wave: '0..1.0..' },
          { name: 'out_data[7:0]', wave: '2..3....', data: ['xx', 'A5'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'gearbox-wide-to-narrow',
      title: '8-to-4 Bit Gearbox',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'datapath'],
      category: 'Sequential Design',
      lede: 'Split an 8-bit word into two 4-bit nibbles, emitting the high nibble one cycle and the low nibble the next — the wide-to-narrow half of a SerDes gearbox.',
      concept: '<b>Concept:</b> The mirror image of the narrow-to-wide gearbox: one wide word must fan out over two narrow-word cycles. On the cycle a byte arrives, emit the high nibble (<code>in_data[7:4]</code>) immediately and remember the low nibble; on the very next cycle, emit the held low nibble (<code>hold[3:0]</code>) with <code>out_valid</code> pulsing both times.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>in_valid</td><td>input</td><td>1</td><td>1 when in_data carries a new byte</td></tr>
<tr><td>in_data</td><td>input</td><td>8</td><td>Incoming byte</td></tr>
<tr><td>out_valid</td><td>output</td><td>1</td><td>Pulses for 1 cycle per emitted nibble (2 pulses per byte)</td></tr>
<tr><td>out_data</td><td>output</td><td>4</td><td>High nibble first, then low nibble</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  in_valid,
  input  [7:0] in_data,
  output reg out_valid,
  output reg [3:0] out_data
);

  // Your code here — emit in_data[7:4] the cycle a byte arrives, then in_data[3:0] the cycle after.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk,rst,in_valid; reg [7:0] in_data; wire out_valid; wire [3:0] out_data; integer errors=0;
  top_module dut(.clk(clk),.rst(rst),.in_valid(in_valid),.in_data(in_data),.out_valid(out_valid),.out_data(out_data));
  initial clk=0; always #5 clk=~clk;
  task checkv; input ev; input [127:0] label; begin
    if(out_valid!==ev) begin errors=errors+1; $display("FAIL %0s expected valid=%b got=%b",label,ev,out_valid); end
    else $display("PASS %0s valid=%b",label,out_valid);
  end endtask
  task checkd; input [3:0] ed; input [127:0] label; begin
    if(out_data!==ed) begin errors=errors+1; $display("FAIL %0s expected data=%h got=%h",label,ed,out_data); end
    else $display("PASS %0s data=%h",label,out_data);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1;in_valid=0; @(posedge clk); #1; checkv(0,"reset");
    rst=0;
    in_valid=1;in_data=8'hA5; @(posedge clk); #1; checkv(1,"high-nibble"); checkd(4'hA,"high-nibble-value");
    in_valid=0; @(posedge clk); #1; checkv(1,"low-nibble"); checkd(4'h5,"low-nibble-value");
    @(posedge clk); #1; checkv(0,"idle-after");
    in_valid=1;in_data=8'h3C; @(posedge clk); #1; checkv(1,"high-nibble2"); checkd(4'h3,"high-nibble-value2");
    in_valid=0; @(posedge clk); #1; checkv(1,"low-nibble2"); checkd(4'hC,"low-nibble-value2");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'in_valid', 'in_data', 'out_valid', 'out_data'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'in_data[7:0]', wave: '2.......', data: ['A5'] },
          { name: 'out_valid', wave: '0.11.0..' },
          { name: 'out_data[3:0]', wave: '2.3.4...', data: ['xx', 'A', '5'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'crc4-generator',
      title: 'CRC-4 Generator',
      difficulty: 'hard',
      points: 50,
      tags: ['combinational', 'protocol'],
      category: 'Combinational Design',
      lede: 'Compute the 4-bit CRC remainder of an 8-bit message using the CRC-4 (poly x⁴+x+1) bit-serial algorithm, entirely in combinational logic.',
      concept: '<b>Concept:</b> A CRC is the remainder of polynomial division. The classic bit-serial method processes one message bit at a time, MSB first: feed back <code>fb = crc[3] ^ bit</code>, shift the register left, and if <code>fb</code> was set, XOR in the generator polynomial\'s low bits (<code>4\'b0011</code> for x⁴+x+1). Unrolling this loop over all 8 input bits in an <code>always @*</code> block (or a function) gives a pure-combinational CRC generator — get the polynomial constant wrong and every non-trivial input produces a silently corrupted checksum.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>data</td><td>input</td><td>8</td><td>Message byte</td></tr>
<tr><td>crc</td><td>output</td><td>4</td><td>CRC-4 remainder (poly x⁴+x+1), MSB-first, zero-initialized</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] data,
  output [3:0] crc
);

  // Your code here — bit-serial CRC-4 (poly x^4+x+1): fb=crc[3]^bit; crc<<=1; if(fb) crc^=4'b0011.

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] data; wire [3:0] crc; integer errors=0;
  top_module dut(.data(data), .crc(crc));
  task check; input [7:0] d; input [3:0] ec; begin
    data=d;#1;
    if(crc!==ec) begin errors=errors+1; $display("FAIL data=%h expected crc=%h got=%h",d,ec,crc); end
    else $display("PASS data=%h crc=%h",d,crc);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(8'h00, 4'h0);
    check(8'hFF, 4'h4);
    check(8'hA5, 4'hB);
    check(8'h3C, 4'h8);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['data', 'crc'],
      wavedrom: {
        signal: [
          { name: 'data[7:0]', wave: '2.3.4.5.', data: ['00', 'FF', 'A5', '3C'] },
          { name: 'crc[3:0]', wave: '2.3.4.5.', data: ['0', '4', 'B', '8'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'crc4-checker',
      title: 'CRC-4 Checker',
      difficulty: 'hard',
      points: 50,
      tags: ['combinational', 'protocol'],
      category: 'Combinational Design',
      lede: 'Recompute the CRC-4 remainder of a received message and compare it against the appended CRC field to flag transmission errors.',
      concept: '<b>Concept:</b> A receiver validates a frame by running the exact same CRC-4 algorithm the sender used and comparing results: <code>error = (crc_in != compute_crc(data))</code>. Getting the comparison backwards — flagging <code>error</code> when the CRCs <em>match</em> — silently accepts every corrupted frame and rejects every good one, which is far more dangerous than no checking at all.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>data</td><td>input</td><td>8</td><td>Received message byte</td></tr>
<tr><td>crc_in</td><td>input</td><td>4</td><td>Received CRC-4 field</td></tr>
<tr><td>error</td><td>output</td><td>1</td><td>1 when the recomputed CRC doesn't match crc_in</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] data,
  input  [3:0] crc_in,
  output error
);

  // Your code here — recompute CRC-4 (poly x^4+x+1) over data, error = (crc_in != recomputed).

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] data; reg [3:0] crc_in; wire error; integer errors=0;
  top_module dut(.data(data), .crc_in(crc_in), .error(error));
  task check; input [7:0] d; input [3:0] c; input ee; begin
    data=d;crc_in=c;#1;
    if(error!==ee) begin errors=errors+1; $display("FAIL data=%h crc_in=%h expected error=%b got=%b",d,c,ee,error); end
    else $display("PASS data=%h crc_in=%h error=%b",d,c,error);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(8'h00, 4'h0, 0);
    check(8'hFF, 4'h4, 0);
    check(8'hA5, 4'hB, 0);
    check(8'hA5, 4'hC, 1);
    check(8'h3C, 4'h0, 1);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['data', 'crc_in', 'error'],
      wavedrom: {
        signal: [
          { name: 'data[7:0]', wave: '2.3.4...', data: ['A5', 'A5', '3C'] },
          { name: 'crc_in[3:0]', wave: '2.3.4...', data: ['B', 'C', '0'] },
          { name: 'error', wave: '0.1.....' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'additive-scrambler',
      title: 'Additive LFSR Scrambler',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'lfsr', 'protocol'],
      category: 'Sequential Design',
      lede: 'Whiten a data stream by XORing it with a free-running LFSR keystream — the same circuit that descrambles it, since XOR is its own inverse.',
      concept: '<b>Concept:</b> Line codes avoid long runs of identical bits by scrambling data with a pseudo-random keystream from a free-running 7-bit LFSR (<code>fb = lfsr[6]^lfsr[0]</code>, shifting every cycle regardless of the data). The output is simply <code>data_in ^ lfsr[6]</code>. Because XOR is its own inverse, feeding the scrambled output back through an identically-seeded LFSR recovers the original data — descrambling needs no separate circuit.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (seeds LFSR to 7'h7F)</td></tr>
<tr><td>data_in</td><td>input</td><td>1</td><td>Raw data bit</td></tr>
<tr><td>scrambled_out</td><td>output</td><td>1</td><td>data_in XORed with the current LFSR keystream bit</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  data_in,
  output scrambled_out
);

  // Your code here — 7-bit LFSR, seed 7'h7F, fb=lfsr[6]^lfsr[0], free-running; scrambled_out = data_in ^ lfsr[6].

endmodule
`,
      hiddenTb: `
module tb;
  reg clk,rst,data_in; wire scrambled_out; integer errors=0;
  top_module dut(.clk(clk),.rst(rst),.data_in(data_in),.scrambled_out(scrambled_out));
  initial clk=0; always #5 clk=~clk;
  task check; input ed; input eo; input [127:0] label; begin
    data_in=ed;#1;
    if(scrambled_out!==eo) begin errors=errors+1; $display("FAIL %0s data_in=%b expected=%b got=%b",label,ed,eo,scrambled_out); end
    else $display("PASS %0s data_in=%b out=%b",label,ed,scrambled_out);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; @(posedge clk); check(0,1,"t0");
    rst=0;
    @(posedge clk); check(1,0,"t1");
    @(posedge clk); check(0,1,"t2");
    @(posedge clk); check(1,0,"t3");
    @(posedge clk); check(1,0,"t4");
    @(posedge clk); check(0,1,"t5");
    @(posedge clk); check(1,0,"t6");
    @(posedge clk); check(0,0,"t7");
    @(posedge clk); check(1,0,"t8");
    @(posedge clk); check(1,1,"t9");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'data_in', 'scrambled_out'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.....' },
          { name: 'data_in', wave: '2.3.4.', data: ['0', '1', '0'] },
          { name: 'scrambled_out', wave: '2.3.4.', data: ['1', '0', '1'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'run-length-bit-stuffer',
      title: 'Run-Length Bit Stuffer',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'protocol'],
      category: 'Sequential Design',
      lede: 'Flag when a stuff bit must be inserted after five consecutive 1s in a serial stream — the core rule behind CAN bus bit stuffing.',
      concept: '<b>Concept:</b> Protocols like CAN insert a complementary bit after every 5 identical bits in a row so receivers never lose bit-sync during long runs. Track a running count of consecutive 1s; the moment it would hit 5 (<code>run==4</code> and the current bit is also 1), raise <code>stuff_needed</code> for one cycle and reset the run — the inserted 0 breaks the streak, so counting must restart from zero rather than continuing.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock (one stream bit per cycle)</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>bit_in</td><td>input</td><td>1</td><td>Next bit of the outgoing stream</td></tr>
<tr><td>stuff_needed</td><td>output</td><td>1</td><td>Pulses for 1 cycle right after the 5th consecutive 1</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  bit_in,
  output reg stuff_needed
);

  // Your code here — count consecutive 1s; pulse stuff_needed and reset the count after the 5th.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk,rst,bit_in; wire stuff_needed; integer errors=0;
  top_module dut(.clk(clk),.rst(rst),.bit_in(bit_in),.stuff_needed(stuff_needed));
  initial clk=0; always #5 clk=~clk;
  task check; input es; input [127:0] label; begin
    if(stuff_needed!==es) begin errors=errors+1; $display("FAIL %0s expected=%b got=%b",label,es,stuff_needed); end
    else $display("PASS %0s stuff_needed=%b",label,stuff_needed);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1;bit_in=0; @(posedge clk); #1; check(0,"reset");
    rst=0;bit_in=1;
    @(posedge clk); #1; check(0,"run1");
    @(posedge clk); #1; check(0,"run2");
    @(posedge clk); #1; check(0,"run3");
    @(posedge clk); #1; check(0,"run4");
    @(posedge clk); #1; check(1,"stuff-after-5-ones");
    @(posedge clk); #1; check(0,"run-reset-after-stuff");
    bit_in=0;
    @(posedge clk); #1; check(0,"zero-breaks-run");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'bit_in', 'stuff_needed'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'bit_in', wave: '01......' },
          { name: 'stuff_needed', wave: '0....10.' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'axi-stream-handshake-counter',
      title: 'AXI-Stream Handshake Counter',
      difficulty: 'easy',
      points: 10,
      tags: ['sequential', 'protocol'],
      category: 'Sequential Design',
      lede: 'Count how many beats have actually transferred across a valid/ready handshake — a transfer only happens when both sides agree, not whenever the source merely asserts valid.',
      concept: '<b>Concept:</b> In a ready/valid streaming interface, data only moves on a cycle where <em>both</em> <code>valid</code> and <code>ready</code> are high simultaneously; <code>valid</code> alone just means the source has data waiting, and can sit high for many stalled cycles. Counting on <code>valid</code> without gating on <code>ready</code> overcounts every stall as if it were a real transfer.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (count=0)</td></tr>
<tr><td>valid</td><td>input</td><td>1</td><td>Source has data ready</td></tr>
<tr><td>ready</td><td>input</td><td>1</td><td>Sink can accept data this cycle</td></tr>
<tr><td>count</td><td>output</td><td>8</td><td>Number of completed valid&amp;ready transfers</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  valid,
  input  ready,
  output reg [7:0] count
);

  // Your code here — increment count only on cycles where valid AND ready are both high.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk,rst,valid,ready; wire [7:0] count; integer errors=0;
  top_module dut(.clk(clk),.rst(rst),.valid(valid),.ready(ready),.count(count));
  initial clk=0; always #5 clk=~clk;
  task check; input [7:0] ec; input [127:0] label; begin
    if(count!==ec) begin errors=errors+1; $display("FAIL %0s expected=%d got=%d",label,ec,count); end
    else $display("PASS %0s count=%d",label,count);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1;valid=0;ready=0; @(posedge clk); #1; check(0,"reset");
    rst=0;
    valid=1;ready=0; @(posedge clk); #1; check(0,"valid-no-ready-no-count");
    valid=1;ready=1; @(posedge clk); #1; check(1,"transfer1");
    valid=0;ready=1; @(posedge clk); #1; check(1,"no-valid-no-count");
    valid=1;ready=1; @(posedge clk); #1; check(2,"transfer2");
    valid=1;ready=1; @(posedge clk); #1; check(3,"transfer3");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'valid', 'ready', 'count'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'valid', wave: '01......' },
          { name: 'ready', wave: '0.1.0.1.' },
          { name: 'count[7:0]', wave: '2...3.4.', data: ['0', '1', '2'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'byte-sync-detector',
      title: 'Byte Sync Detector',
      difficulty: 'easy',
      points: 10,
      tags: ['sequential', 'protocol'],
      category: 'Sequential Design',
      lede: 'Lock onto a known sync byte in an incoming byte stream and stay locked afterward — the framing step every byte-oriented receiver needs before it can trust word boundaries.',
      concept: '<b>Concept:</b> Once a framer spots the sync pattern (<code>8\'hA5</code> here), it should latch <code>locked</code> and hold it — later bytes that don\'t happen to match shouldn\'t drop the lock, since a real receiver only re-syncs on an explicit resync condition (like reset), not on every non-matching byte. Making the assignment unconditional instead of sticky (<code>locked &lt;= match</code> instead of <code>if(match) locked&lt;=1</code>) causes spurious loss of lock the very next cycle.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (locked=0)</td></tr>
<tr><td>byte_in</td><td>input</td><td>8</td><td>Next byte from the stream</td></tr>
<tr><td>byte_valid</td><td>input</td><td>1</td><td>1 when byte_in is valid this cycle</td></tr>
<tr><td>locked</td><td>output</td><td>1</td><td>1 once the sync byte (8'hA5) has been seen; stays 1</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  [7:0] byte_in,
  input  byte_valid,
  output reg locked
);

  // Your code here — set locked=1 the first time byte_in==8'hA5 while byte_valid; stay locked afterward.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk,rst,byte_valid; reg [7:0] byte_in; wire locked; integer errors=0;
  top_module dut(.clk(clk),.rst(rst),.byte_in(byte_in),.byte_valid(byte_valid),.locked(locked));
  initial clk=0; always #5 clk=~clk;
  task check; input el; input [127:0] label; begin
    if(locked!==el) begin errors=errors+1; $display("FAIL %0s expected=%b got=%b",label,el,locked); end
    else $display("PASS %0s locked=%b",label,locked);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1;byte_valid=0;byte_in=8'h00; @(posedge clk); #1; check(0,"reset");
    rst=0;
    byte_valid=1;byte_in=8'h11; @(posedge clk); #1; check(0,"not-sync-byte");
    byte_valid=1;byte_in=8'hA5; @(posedge clk); #1; check(1,"sync-byte-locks");
    byte_valid=1;byte_in=8'h22; @(posedge clk); #1; check(1,"stays-locked-on-other-byte");
    byte_valid=0;byte_in=8'h00; @(posedge clk); #1; check(1,"stays-locked-no-valid");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'byte_valid', 'byte_in', 'locked'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'byte_in[7:0]', wave: '2.3.4...', data: ['11', 'A5', '22'] },
          { name: 'locked', wave: '0..1....' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'endianness-swapper',
      title: '16-Bit Endianness Swapper',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'datapath'],
      category: 'Combinational Design',
      lede: 'Swap the byte order of a 16-bit word — the wiring fix needed whenever two datapaths disagree on big-endian vs little-endian byte order.',
      concept: '<b>Concept:</b> Endianness swapping is pure rewiring, not arithmetic: move the low byte to the high position and vice versa with <code>{word_in[7:0], word_in[15:8]}</code>. It\'s an easy copy-paste trap to instead write the bytes back in their original order (<code>{word_in[15:8], word_in[7:0]}</code>), which silently compiles and simulates as a no-op.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>word_in</td><td>input</td><td>16</td><td>Input word</td></tr>
<tr><td>word_out</td><td>output</td><td>16</td><td>word_in with its two bytes swapped</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [15:0] word_in,
  output [15:0] word_out
);

  // Your code here — word_out = {low_byte, high_byte}.

endmodule
`,
      hiddenTb: `
module tb;
  reg [15:0] word_in; wire [15:0] word_out; integer errors=0;
  top_module dut(.word_in(word_in), .word_out(word_out));
  task check; input [15:0] w; input [15:0] ew; begin
    word_in=w;#1;
    if(word_out!==ew) begin errors=errors+1; $display("FAIL word_in=%h expected=%h got=%h",w,ew,word_out); end
    else $display("PASS word_in=%h word_out=%h",w,word_out);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(16'h1234, 16'h3412);
    check(16'hABCD, 16'hCDAB);
    check(16'h00FF, 16'hFF00);
    check(16'h0000, 16'h0000);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['word_in', 'word_out'],
      wavedrom: {
        signal: [
          { name: 'word_in[15:0]', wave: '2.3.4.5.', data: ['1234', 'ABCD', '00FF', '0000'] },
          { name: 'word_out[15:0]', wave: '2.3.4.5.', data: ['3412', 'CDAB', 'FF00', '0000'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'packet-length-counter',
      title: 'Packet Length Counter',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'protocol'],
      category: 'Sequential Design',
      lede: 'Count how many cycles a frame stayed active and latch that length the moment the frame ends — resetting cleanly so the next frame\'s length isn\'t polluted by the last one.',
      concept: '<b>Concept:</b> While <code>frame_active</code> is high, tally cycles in a running counter; the instant it drops, latch that tally into <code>length</code> and — critically — reset the running counter back to zero so the next frame starts clean. Forgetting the reset leaves the internal counter holding its old value, so the next frame\'s reported length silently includes cycles from the frame before it.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (length=0)</td></tr>
<tr><td>frame_active</td><td>input</td><td>1</td><td>1 while a frame is being received</td></tr>
<tr><td>length</td><td>output</td><td>8</td><td>Cycle count of the most recently completed frame</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  frame_active,
  output reg [7:0] length
);

  // Your code here — count cycles while frame_active is high; latch into length when it drops, then reset the counter.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk,rst,frame_active; wire [7:0] length; integer errors=0;
  top_module dut(.clk(clk),.rst(rst),.frame_active(frame_active),.length(length));
  initial clk=0; always #5 clk=~clk;
  task check; input [7:0] el; input [127:0] label; begin
    if(length!==el) begin errors=errors+1; $display("FAIL %0s expected=%d got=%d",label,el,length); end
    else $display("PASS %0s length=%d",label,length);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1;frame_active=0; @(posedge clk); #1; check(0,"reset");
    rst=0;
    frame_active=1; @(posedge clk); #1;
    @(posedge clk); #1;
    @(posedge clk); #1;
    frame_active=0; @(posedge clk); #1; check(3,"first-frame-length-3");
    frame_active=1; @(posedge clk); #1;
    @(posedge clk); #1;
    frame_active=0; @(posedge clk); #1; check(2,"second-frame-length-2-not-cumulative");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'frame_active', 'length'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'frame_active', wave: '01110...' },
          { name: 'length[7:0]', wave: '2......3', data: ['0', '3'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'async-reset-synchronizer',
      title: 'Async-Assert / Sync-Deassert Reset',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'cdc'],
      category: 'Sequential Design',
      lede: 'Assert reset the instant it goes active, but only release it once it has been clean for 2 clock edges — the standard reset architecture for any real design.',
      concept: '<b>Concept:</b> Reset assertion must reach every flop immediately, even mid-cycle, so it belongs in the sensitivity list itself: <code>always @(posedge clk or negedge async_rst_n)</code>. Release, though, must not land on a clock edge and risk a recovery/removal violation — so deassertion is synchronized through two flops before <code>sync_rst_n</code> ever goes high, exactly like a normal 2-flop CDC chain but seeded by an asynchronous reset instead of a data input.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Destination clock</td></tr>
<tr><td>async_rst_n</td><td>input</td><td>1</td><td>Asynchronous, active-low reset source</td></tr>
<tr><td>sync_rst_n</td><td>output</td><td>1</td><td>Asserts immediately with async_rst_n; deasserts 2 clk cycles after release</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  async_rst_n,
  output reg sync_rst_n
);

  // Your code here — assert sync_rst_n asynchronously with async_rst_n; release through a 2-flop chain.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, async_rst_n; wire sync_rst_n; integer errors=0;
  top_module dut(.clk(clk), .async_rst_n(async_rst_n), .sync_rst_n(sync_rst_n));
  initial clk=0; always #5 clk=~clk;
  task check; input es; input [127:0] label; begin
    if(sync_rst_n!==es) begin errors=errors+1; $display("FAIL %0s expected=%b got=%b",label,es,sync_rst_n); end
    else $display("PASS %0s sync_rst_n=%b",label,sync_rst_n);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    async_rst_n=0; #1; check(0,"async-assert-immediate");
    @(posedge clk); #1; check(0,"still-asserted-during-reset");
    async_rst_n=1;
    @(posedge clk); #1; check(0,"cyc1-after-release-not-yet");
    @(posedge clk); #1; check(1,"cyc2-after-release-now-deasserted");
    #2; async_rst_n=0; #1; check(0,"async-reassert-immediate-mid-cycle");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'async_rst_n', 'sync_rst_n'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p........' },
          { name: 'src_clk (async domain, illustrative)', wave: 'p........', phase: 0.5 },
          { name: 'async_rst_n', wave: '0.1......', phase: 0.5 },
          { name: 'sync_rst_n', wave: '0....1...' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'three-flop-synchronizer',
      title: '3-Flop CDC Synchronizer',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'cdc'],
      category: 'Sequential Design',
      lede: 'A deeper 3-stage synchronizer for signals that need extra MTBF margin beyond the standard 2-flop chain.',
      concept: '<b>Concept:</b> More synchronizer stages exponentially improve mean-time-between-failures at the cost of extra latency: <code>meta1&lt;=async_in; meta2&lt;=meta1; sync_out&lt;=meta2;</code> gives 3 cycles of latency instead of 2. Stopping one stage short (using <code>meta1</code> directly as the output) saves a cycle of latency but gives up the extra metastability margin — a real tradeoff, not just a bug.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Destination clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>async_in</td><td>input</td><td>1</td><td>Signal from another clock domain</td></tr>
<tr><td>sync_out</td><td>output</td><td>1</td><td>async_in, synchronized (3 cycles of latency)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  async_in,
  output reg sync_out
);

  // Your code here — 3 cascaded flops: meta1 <- async_in, meta2 <- meta1, sync_out <- meta2.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, async_in; wire sync_out; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .async_in(async_in), .sync_out(sync_out));
  initial clk=0; always #5 clk=~clk;
  task check; input es; input [127:0] label; begin
    if(sync_out!==es) begin errors=errors+1; $display("FAIL %0s expected=%b got=%b",label,es,sync_out); end
    else $display("PASS %0s sync_out=%b",label,sync_out);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; async_in=0; @(posedge clk); #1; check(0,"reset");
    rst=0; async_in=1;
    @(posedge clk); #1; check(0,"cyc1-not-yet");
    @(posedge clk); #1; check(0,"cyc2-not-yet");
    @(posedge clk); #1; check(1,"cyc3-now-synced");
    async_in=0;
    @(posedge clk); #1; check(1,"cyc4-still-1-delayed");
    @(posedge clk); #1; check(1,"cyc5-still-1-delayed");
    @(posedge clk); #1; check(0,"cyc6-now-0");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'async_in', 'sync_out'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.............' },
          { name: 'src_clk (async domain, illustrative)', wave: 'p.............', phase: 0.5 },
          { name: 'async_in', wave: '0.1.......0...', phase: 0.5 },
          { name: 'sync_out', wave: '0.....1.......' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'level-cross-edge-detector',
      title: 'Synchronized Rising-Edge Detector',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'cdc', 'edge-detect'],
      category: 'Sequential Design',
      lede: 'Safely synchronize an asynchronous level signal, then produce a clean single-cycle pulse the moment it rises in the local clock domain.',
      concept: '<b>Concept:</b> First synchronize the raw level with the usual 2-flop chain (<code>sync1</code>, <code>sync2</code>), then compare consecutive synchronized samples to find the edge: <code>pulse_out &lt;= sync1 &amp; ~sync2</code>. Comparing against the raw <em>synchronized</em> signal only (skipping the second delayed sample and just registering <code>sync1</code> itself) produces a signal that stays high for the whole duration instead of a single clean pulse.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Destination clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>async_in</td><td>input</td><td>1</td><td>Asynchronous level signal from another domain</td></tr>
<tr><td>pulse_out</td><td>output</td><td>1</td><td>Pulses for 1 cycle on each synchronized rising edge</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  async_in,
  output reg pulse_out
);

  // Your code here — 2-flop synchronize async_in, then pulse on the rising edge of the synchronized signal.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, async_in; wire pulse_out; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .async_in(async_in), .pulse_out(pulse_out));
  initial clk=0; always #5 clk=~clk;
  task check; input ep; input [127:0] label; begin
    if(pulse_out!==ep) begin errors=errors+1; $display("FAIL %0s expected=%b got=%b",label,ep,pulse_out); end
    else $display("PASS %0s pulse_out=%b",label,pulse_out);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; async_in=0; @(posedge clk); #1; check(0,"reset");
    rst=0;
    @(posedge clk); #1; check(0,"cyc1-still-0");
    async_in=1;
    @(posedge clk); #1; check(0,"cyc2-meta-only");
    @(posedge clk); #1; check(0,"cyc3-sync1-only");
    @(posedge clk); #1; check(1,"cyc4-pulse-fires");
    @(posedge clk); #1; check(0,"cyc5-pulse-gone");
    @(posedge clk); #1; check(0,"cyc6-still-0-no-retrigger");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'async_in', 'pulse_out'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.............' },
          { name: 'src_clk (async domain, illustrative)', wave: 'p.............', phase: 0.5 },
          { name: 'async_in', wave: '0..1..........', phase: 0.5 },
          { name: 'pulse_out', wave: '0......10.....' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'pulse-toggle-synchronizer',
      title: 'Toggle-Based Pulse Synchronizer',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'cdc'],
      category: 'Sequential Design',
      lede: 'Cross a single-cycle pulse safely between clock domains by toggle-encoding it — a plain 2-flop level synchronizer would simply miss it if the destination clock is slower.',
      concept: '<b>Concept:</b> A pulse from another domain can\'t be trusted to survive a plain level synchronizer, since a fast pulse can come and go between destination clock edges. Toggle-encoding fixes this: the source flips a toggle bit for every pulse instead of pulsing directly (that flip happens upstream and is assumed already done here — <code>tog_in</code> is the toggled signal). The destination double-flops that toggle, then XORs two consecutive synchronized samples: <code>pulse_out &lt;= sync1 ^ sync2</code>. Because a toggle only ever changes state (never returns to a matching value on its own), this reconstructs exactly one clean pulse per source event, no matter how the clocks relate. Using AND instead of XOR misses every toggle-back-to-0 transition.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Destination clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>tog_in</td><td>input</td><td>1</td><td>Toggle-encoded pulse signal from another domain</td></tr>
<tr><td>pulse_out</td><td>output</td><td>1</td><td>Pulses for 1 cycle on every toggle transition</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  tog_in,
  output reg pulse_out
);

  // Your code here — 2-flop synchronize tog_in, then XOR consecutive synced samples to regenerate a pulse.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, tog_in; wire pulse_out; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .tog_in(tog_in), .pulse_out(pulse_out));
  initial clk=0; always #5 clk=~clk;
  task check; input ep; input [127:0] label; begin
    if(pulse_out!==ep) begin errors=errors+1; $display("FAIL %0s expected=%b got=%b",label,ep,pulse_out); end
    else $display("PASS %0s pulse_out=%b",label,pulse_out);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; tog_in=0; @(posedge clk); #1; check(0,"reset");
    rst=0;
    tog_in=1;
    @(posedge clk); #1; check(0,"cyc1-meta-only");
    @(posedge clk); #1; check(0,"cyc2-sync1-only");
    @(posedge clk); #1; check(1,"cyc3-pulse-fires");
    @(posedge clk); #1; check(0,"cyc4-pulse-gone");
    tog_in=0;
    @(posedge clk); #1; check(0,"cyc5-tog-back-meta-only");
    @(posedge clk); #1; check(0,"cyc6-sync1-only");
    @(posedge clk); #1; check(1,"cyc7-second-pulse-on-toggle-back");
    @(posedge clk); #1; check(0,"cyc8-pulse-gone");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'tog_in', 'pulse_out'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.................' },
          { name: 'src_clk (async domain, illustrative)', wave: 'p.................', phase: 0.5 },
          { name: 'tog_in', wave: '0.1.......0.......', phase: 0.5 },
          { name: 'pulse_out', wave: '0.....1.....1.....' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'handshake-ack-responder',
      title: 'CDC Handshake Acknowledge Responder',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'cdc', 'protocol'],
      category: 'Sequential Design',
      lede: 'Synchronize an asynchronous request line and fire exactly one acknowledge pulse per request — never re-acking while the request is still held, only re-arming once it drops.',
      concept: '<b>Concept:</b> A 4-phase handshake responder synchronizes <code>req</code> with the usual 2-flop chain, then edge-detects the synchronized request to fire a single <code>ack</code> pulse: <code>ack &lt;= sync_req &amp; ~req_prev</code>. The extra <code>req_prev</code> register (a 3rd stage beyond the 2-flop sync) is what prevents re-acking every cycle the request stays high — without it, <code>ack</code> would just mirror the level and fire continuously for as long as <code>req</code> is asserted.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Destination clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>req</td><td>input</td><td>1</td><td>Asynchronous request level from another domain</td></tr>
<tr><td>ack</td><td>output</td><td>1</td><td>Pulses for 1 cycle once per synchronized request rising edge</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  req,
  output reg ack
);

  // Your code here — 2-flop sync req, then a 3rd stage to edge-detect and pulse ack once per request.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, req; wire ack; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .req(req), .ack(ack));
  initial clk=0; always #5 clk=~clk;
  task check; input ea; input [127:0] label; begin
    if(ack!==ea) begin errors=errors+1; $display("FAIL %0s expected=%b got=%b",label,ea,ack); end
    else $display("PASS %0s ack=%b",label,ack);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; req=0; @(posedge clk); #1; check(0,"reset");
    rst=0; req=1;
    @(posedge clk); #1; check(0,"cyc1-meta-only");
    @(posedge clk); #1; check(0,"cyc2-sync_req-only");
    @(posedge clk); #1; check(1,"cyc3-ack-fires");
    @(posedge clk); #1; check(0,"cyc4-ack-gone-req-still-high");
    @(posedge clk); #1; check(0,"cyc5-no-reack-while-req-held");
    req=0;
    @(posedge clk); #1; @(posedge clk); #1; @(posedge clk); #1; check(0,"req-dropped-no-ack");
    req=1;
    @(posedge clk); #1; @(posedge clk); #1; check(0,"re-req-cyc2-not-yet");
    @(posedge clk); #1; check(1,"re-req-ack-fires-again");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'req', 'ack'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......................' },
          { name: 'src_clk (async domain, illustrative)', wave: 'p.......................', phase: 0.5 },
          { name: 'req', wave: '0.1.......0...1.........', phase: 0.5 },
          { name: 'ack', wave: '0.....10..........10....' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'pulse-stretch-and-sync',
      title: 'Stretch-and-Synchronize Pulse',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'cdc'],
      category: 'Sequential Design',
      lede: 'Widen a fast, possibly very short pulse to guarantee it\'s caught by a much slower destination clock, then synchronize the stretched level cleanly across domains.',
      concept: '<b>Concept:</b> If the source pulse can be shorter than one destination clock period, a synchronizer might sample right between edges and miss it entirely. Stretching fixes this: latch a small counter on <code>fast_pulse</code> and hold an internal <code>stretched</code> flag high until it expires, guaranteeing at least a few destination-clock cycles of visibility. Only then does the usual 2-flop-sync-plus-edge-detect pipeline turn it back into a single clean pulse. Skipping the stretch stage (synchronizing <code>fast_pulse</code> directly) works fine in simulation but is exactly the kind of shortcut that misses real pulses on real silicon.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Destination (slower) clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>fast_pulse</td><td>input</td><td>1</td><td>Possibly very short pulse from a faster/unrelated domain</td></tr>
<tr><td>sync_pulse</td><td>output</td><td>1</td><td>Clean 1-cycle pulse in the destination domain, guaranteed not to be missed</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  fast_pulse,
  output reg sync_pulse
);

  // Your code here — stretch fast_pulse with a small counter, then 2-flop sync + edge-detect the stretched level.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, fast_pulse; wire sync_pulse; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .fast_pulse(fast_pulse), .sync_pulse(sync_pulse));
  initial clk=0; always #5 clk=~clk;
  task check; input ep; input [127:0] label; begin
    if(sync_pulse!==ep) begin errors=errors+1; $display("FAIL %0s expected=%b got=%b",label,ep,sync_pulse); end
    else $display("PASS %0s sync_pulse=%b",label,sync_pulse);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; fast_pulse=0; @(posedge clk); #1; check(0,"reset");
    rst=0;
    fast_pulse=1; @(posedge clk); #1; check(0,"cyc1-stretched-set-meta-not-yet");
    fast_pulse=0;
    @(posedge clk); #1; check(0,"cyc2-meta-set-sync1-not-yet");
    @(posedge clk); #1; check(0,"cyc3-sync1-set-sync2-not-yet");
    @(posedge clk); #1; check(1,"cyc4-sync_pulse-fires-even-though-fast_pulse-long-gone");
    @(posedge clk); #1; check(0,"cyc5-pulse-gone");
    @(posedge clk); #1; check(0,"cyc6-no-retrigger");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'fast_pulse', 'sync_pulse'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.................' },
          { name: 'src_clk (async/fast domain, illustrative)', wave: 'p.................', phase: 0.5 },
          { name: 'fast_pulse', wave: '0.10..............', phase: 0.5 },
          { name: 'sync_pulse', wave: '0........10.......' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'cdc-bus-hold-register',
      title: 'CDC Bus Hold Register',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'cdc', 'datapath'],
      category: 'Sequential Design',
      lede: 'Capture a data bus only on a valid strobe and hold it steady otherwise — never let an unregistered async bus pass straight through to downstream logic.',
      concept: '<b>Concept:</b> A multi-bit bus crossing domains can\'t just be wired through combinationally — different bits can settle at slightly different times, so any glitch or skew on the source side becomes visible immediately downstream. The fix is to only ever update the output register when a (separately synchronized) <code>valid</code> strobe says the bus is stable: <code>if (valid) data_out &lt;= data_in;</code>, holding the old value the rest of the time. Wiring <code>data_out</code> straight to <code>data_in</code> with no register at all defeats the entire point — every glitch on the input rides straight through.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Destination clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>valid</td><td>input</td><td>1</td><td>1 when data_in is stable and safe to capture</td></tr>
<tr><td>data_in</td><td>input</td><td>8</td><td>Incoming bus, only trustworthy while valid is high</td></tr>
<tr><td>data_out</td><td>output</td><td>8</td><td>Captured value, held steady between valid strobes</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  valid,
  input  [7:0] data_in,
  output reg [7:0] data_out
);

  // Your code here — capture data_in into data_out only when valid is high; hold otherwise.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, valid; reg [7:0] data_in; wire [7:0] data_out; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .valid(valid), .data_in(data_in), .data_out(data_out));
  initial clk=0; always #5 clk=~clk;
  task check; input [7:0] ed; input [127:0] label; begin
    if(data_out!==ed) begin errors=errors+1; $display("FAIL %0s expected=%h got=%h",label,ed,data_out); end
    else $display("PASS %0s data_out=%h",label,data_out);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; valid=0; data_in=8'h00; @(posedge clk); #1; check(8'h00,"reset");
    rst=0;
    valid=1; data_in=8'hA5; @(posedge clk); #1; check(8'hA5,"captured-on-valid");
    valid=0; data_in=8'hFF; #1; check(8'hA5,"holds-ignoring-glitch-before-clock");
    @(posedge clk); #1; check(8'hA5,"holds-through-clock-no-valid");
    @(posedge clk); #1; check(8'hA5,"still-holding");
    valid=1; data_in=8'h3C; @(posedge clk); #1; check(8'h3C,"captures-new-value");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'valid', 'data_in', 'data_out'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'src_clk (async domain, illustrative)', wave: 'p.......', phase: 0.5 },
          { name: 'valid', wave: '01.0..1.', phase: 0.5 },
          { name: 'data_in[7:0]', wave: '2.3.4.5.', data: ['00', 'A5', 'FF', '3C'], phase: 0.5 },
          { name: 'data_out[7:0]', wave: '2..3.4..', data: ['00', 'A5', '3C'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'sync-enable-counter-snapshot',
      title: 'Synchronized-Enable Counter Snapshot',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'cdc'],
      category: 'Sequential Design',
      lede: 'Snapshot a free-running counter\'s value only when an asynchronous sample request has been safely synchronized — synchronizing the control signal, not the fast-changing data, is the trick.',
      concept: '<b>Concept:</b> The right CDC pattern here is to synchronize the slow-changing <em>control</em> signal (<code>sample_en</code>) rather than trying to synchronize the free-running counter itself, which changes every cycle. Once <code>sample_en</code> is safely double-flopped and edge-detected, use that clean local pulse to gate a normal capture register. Gating the capture directly off the raw, unsynchronized <code>sample_en</code> input instead risks capturing the counter mid-transition or re-triggering unpredictably.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Local clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>sample_en</td><td>input</td><td>1</td><td>Asynchronous sample-request level</td></tr>
<tr><td>snapshot</td><td>output</td><td>8</td><td>Free-running counter value, captured once per synchronized sample_en edge</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  sample_en,
  output reg [7:0] snapshot
);

  // Your code here — free-run an 8-bit counter; 2-flop sync + edge-detect sample_en; capture the counter on that pulse.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, sample_en; wire [7:0] snapshot; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .sample_en(sample_en), .snapshot(snapshot));
  initial clk=0; always #5 clk=~clk;
  task check; input [7:0] es; input [127:0] label; begin
    if(snapshot!==es) begin errors=errors+1; $display("FAIL %0s expected=%d got=%d",label,es,snapshot); end
    else $display("PASS %0s snapshot=%d",label,snapshot);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; sample_en=0; @(posedge clk); #1; check(0,"reset");
    rst=0;
    @(posedge clk); #1; check(0,"cyc1-count-now-1-no-snap");
    @(posedge clk); #1; check(0,"cyc2-count-now-2-no-snap");
    sample_en=1;
    @(posedge clk); #1; check(0,"cyc3-meta-only-no-snap-yet");
    @(posedge clk); #1; check(0,"cyc4-sync_en-only-no-snap-yet");
    @(posedge clk); #1; check(4,"cyc5-snapshot-captured");
    @(posedge clk); #1; check(4,"cyc6-snapshot-held-no-resnap");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'sample_en', 'snapshot'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.............' },
          { name: 'src_clk (async domain, illustrative)', wave: 'p.............', phase: 0.5 },
          { name: 'sample_en', wave: '0..1..........', phase: 0.5 },
          { name: 'snapshot[7:0]', wave: '2.......3.....', data: ['0', '4'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'fifo-empty-flag-synchronizer',
      title: 'Async-FIFO Empty Flag Synchronizer',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'cdc', 'protocol'],
      category: 'Sequential Design',
      lede: 'Synchronize a Gray-coded write pointer into the read domain and compare it against the local read pointer to generate a reliable empty flag — the core of every async FIFO.',
      concept: '<b>Concept:</b> An async FIFO\'s write pointer lives in the write clock domain but the empty flag is needed in the read domain, so the pointer must cross safely — Gray coding ensures only one bit ever changes per increment, so even a partially-synchronized value during a transition is never wildly wrong. Double-flop the incoming Gray pointer (<code>meta</code>, then <code>wptr_gray_sync</code>), then compare it against the local read pointer: <code>empty &lt;= (wptr_gray_sync == rptr_gray)</code>. Comparing the raw unsynchronized pointer directly against the local one skips the synchronizer chain entirely, reintroducing metastability risk into the empty flag.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Read-domain clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (empty=1)</td></tr>
<tr><td>wptr_gray_in</td><td>input</td><td>4</td><td>Gray-coded write pointer from the write domain</td></tr>
<tr><td>rptr_gray</td><td>input</td><td>4</td><td>Local Gray-coded read pointer (already in this domain)</td></tr>
<tr><td>empty</td><td>output</td><td>1</td><td>1 when the synchronized write pointer matches the read pointer</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  [3:0] wptr_gray_in,
  input  [3:0] rptr_gray,
  output reg empty
);

  // Your code here — 2-flop sync wptr_gray_in, then empty = (synced value == rptr_gray).

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst; reg [3:0] wptr_gray_in, rptr_gray; wire empty; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .wptr_gray_in(wptr_gray_in), .rptr_gray(rptr_gray), .empty(empty));
  initial clk=0; always #5 clk=~clk;
  task check; input ee; input [127:0] label; begin
    if(empty!==ee) begin errors=errors+1; $display("FAIL %0s expected=%b got=%b",label,ee,empty); end
    else $display("PASS %0s empty=%b",label,empty);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; wptr_gray_in=4'h0; rptr_gray=4'h0; @(posedge clk); #1; check(1,"reset-empty");
    rst=0;
    wptr_gray_in=4'h3; rptr_gray=4'h0;
    @(posedge clk); #1; check(1,"cyc1-meta-updated-still-empty");
    @(posedge clk); #1; check(1,"cyc2-wptr_gray_sync-updated-still-empty");
    @(posedge clk); #1; check(0,"cyc3-empty-flag-catches-up-not-empty");
    rptr_gray=4'h3;
    @(posedge clk); #1; check(1,"cyc4-rptr-matches-empty-again");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'wptr_gray_in', 'rptr_gray', 'empty'],
      wavedrom: {
        signal: [
          { name: 'clk (read domain)', wave: 'p.........' },
          { name: 'wr_clk (write domain, illustrative)', wave: 'p.........', phase: 0.5 },
          { name: 'wptr_gray_in[3:0]', wave: '2.3.......', data: ['0', '3'], phase: 0.5 },
          { name: 'rptr_gray[3:0]', wave: '2.......3.', data: ['0', '3'] },
          { name: 'empty', wave: '1....0..1.' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'fifo-full-flag-synchronizer',
      title: 'Async-FIFO Full Flag Synchronizer',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'cdc', 'protocol'],
      category: 'Sequential Design',
      lede: 'Synchronize a Gray-coded read pointer into the write domain and compare it against the local write pointer to detect full — including the extra wrap-bit check the empty flag never needs.',
      concept: '<b>Concept:</b> The full flag mirrors the empty flag\'s synchronizer structure — double-flop the incoming Gray read pointer, then compare — but the comparison itself is different: full means the write pointer has wrapped exactly one lap ahead of the read pointer, which in Gray code shows up as the two MSBs inverted while the low bits match: <code>(wptr[3]!=rsync[3]) &amp;&amp; (wptr[2]!=rsync[2]) &amp;&amp; (wptr[1:0]==rsync[1:0])</code>. Reusing the empty flag\'s plain equality check here would report full only when the pointers are exactly equal — which is what <em>empty</em> looks like, not full.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Write-domain clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (full=0)</td></tr>
<tr><td>rptr_gray_in</td><td>input</td><td>4</td><td>Gray-coded read pointer from the read domain</td></tr>
<tr><td>wptr_gray</td><td>input</td><td>4</td><td>Local Gray-coded write pointer (already in this domain)</td></tr>
<tr><td>full</td><td>output</td><td>1</td><td>1 when the write pointer has wrapped exactly one lap ahead of the synchronized read pointer</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  [3:0] rptr_gray_in,
  input  [3:0] wptr_gray,
  output reg full
);

  // Your code here — 2-flop sync rptr_gray_in, then full = (top 2 bits inverted, bottom 2 bits equal) vs wptr_gray.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst; reg [3:0] rptr_gray_in, wptr_gray; wire full; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .rptr_gray_in(rptr_gray_in), .wptr_gray(wptr_gray), .full(full));
  initial clk=0; always #5 clk=~clk;
  task check; input ef; input [127:0] label; begin
    if(full!==ef) begin errors=errors+1; $display("FAIL %0s expected=%b got=%b",label,ef,full); end
    else $display("PASS %0s full=%b",label,full);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; rptr_gray_in=4'h0; wptr_gray=4'h0; @(posedge clk); #1; check(0,"reset-not-full");
    rst=0;
    wptr_gray=4'b1100; rptr_gray_in=4'b0000;
    @(posedge clk); #1; check(1,"cyc1-full-from-local-wptr-jump");
    rptr_gray_in=4'b0100;
    @(posedge clk); #1; check(1,"cyc2-meta-updated-still-full");
    @(posedge clk); #1; check(1,"cyc3-rptr_gray_sync-updated-still-full");
    @(posedge clk); #1; check(0,"cyc4-full-flag-catches-up-not-full");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'rptr_gray_in', 'wptr_gray', 'full'],
      wavedrom: {
        signal: [
          { name: 'clk (write domain)', wave: 'p.........' },
          { name: 'rd_clk (read domain, illustrative)', wave: 'p.........', phase: 0.5 },
          { name: 'wptr_gray[3:0]', wave: '2.3.......', data: ['0', 'C'] },
          { name: 'rptr_gray_in[3:0]', wave: '2...3.....', data: ['0', '4'], phase: 0.5 },
          { name: 'full', wave: '0.1....0..' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'bit-reversal',
      title: '8-Bit Reversal',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'datapath'],
      category: 'Combinational Design',
      lede: 'Reverse the bit order of an 8-bit word so the LSB becomes the MSB and vice versa — pure rewiring, no arithmetic.',
      concept: '<b>Concept:</b> Bit reversal is a straight cross-wiring job: <code>out = {in[0],in[1],...,in[7]}</code> maps every bit to its mirror position. Confusing this with a byte/nibble swap (<code>{in[3:0],in[7:4]}</code>) reorders groups of bits but leaves each 4-bit half internally unreversed — a very different, and very common, mistake.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>in</td><td>input</td><td>8</td><td>Input byte</td></tr>
<tr><td>out</td><td>output</td><td>8</td><td>in with its bit order fully reversed</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] in,
  output [7:0] out
);

  // Your code here — out[i] = in[7-i] for every bit.

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] in; wire [7:0] out; integer errors=0;
  top_module dut(.in(in), .out(out));
  task check; input [7:0] i; input [7:0] eo; begin
    in=i;#1;
    if(out!==eo) begin errors=errors+1; $display("FAIL in=%b expected=%b got=%b",i,eo,out); end
    else $display("PASS in=%b out=%b",i,out);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(8'b10110000, 8'b00001101);
    check(8'b00000001, 8'b10000000);
    check(8'b11111111, 8'b11111111);
    check(8'b00000000, 8'b00000000);
    check(8'b11010010, 8'b01001011);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['in', 'out'],
      wavedrom: {
        signal: [
          { name: 'in[7:0]', wave: '2.3.4.5.', data: ['B0', '01', 'FF', 'D2'] },
          { name: 'out[7:0]', wave: '2.3.4.5.', data: ['0D', '80', 'FF', '4B'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'leading-zero-counter',
      title: 'Leading Zero Counter (CLZ)',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'encoder'],
      category: 'Combinational Design',
      lede: 'Count how many leading zero bits sit above the highest set bit in an 8-bit value — the CLZ primitive behind floating-point normalization and priority schedulers.',
      concept: '<b>Concept:</b> CLZ (count-leading-zeros) reports how far the highest \'1\' bit sits from the MSB: <code>in[7]?0:in[6]?1:...:in[0]?7:8</code>. It\'s easy to confuse this with a priority-encoder <em>index</em> (which counts from the LSB upward) — CLZ instead counts leading zeros from the top, and needs a distinct value (8, not 7) for the special all-zero case, since there\'s no set bit to reference at all.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>in</td><td>input</td><td>8</td><td>Input value</td></tr>
<tr><td>count</td><td>output</td><td>4</td><td>Number of leading zero bits (0-8; 8 means in is all-zero)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] in,
  output [3:0] count
);

  // Your code here — count zero bits above the highest set bit; count=8 if in is all-zero.

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] in; wire [3:0] count; integer errors=0;
  top_module dut(.in(in), .count(count));
  task check; input [7:0] i; input [3:0] ec; begin
    in=i;#1;
    if(count!==ec) begin errors=errors+1; $display("FAIL in=%b expected=%d got=%d",i,ec,count); end
    else $display("PASS in=%b count=%d",i,count);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(8'b10000000, 4'd0);
    check(8'b01000000, 4'd1);
    check(8'b00010000, 4'd3);
    check(8'b00000001, 4'd7);
    check(8'b00000000, 4'd8);
    check(8'b00100101, 4'd2);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['in', 'count'],
      wavedrom: {
        signal: [
          { name: 'in[7:0]', wave: '2.3.4.5.', data: ['80', '40', '10', '00'] },
          { name: 'count[3:0]', wave: '2.3.4.5.', data: ['0', '1', '3', '8'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'hex-7segment-decoder',
      title: 'Hex 7-Segment Decoder',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'display'],
      category: 'Combinational Design',
      lede: 'Extend a BCD 7-segment decoder to the full hexadecimal range 0-F — the driver every FPGA dev-board hex display actually needs.',
      concept: '<b>Concept:</b> This is the same <code>seg[6:0]={a,b,c,d,e,f,g}</code> active-high lookup table as a BCD decoder, just extended past 9: 0xA-0xF get their own standard segment patterns (A=1110111, b=0011111, C=1001110, d=0111101, E=1001111, F=1000111 — lowercase b/d because those digits render better with the segments available). A decoder that only implements <code>case</code> branches for 0-9 and lets A-F fall through to a default (usually blank) silently breaks the moment a real hex value above 9 reaches the display.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>hex</td><td>input</td><td>4</td><td>Hex digit, 0x0-0xF</td></tr>
<tr><td>seg</td><td>output</td><td>7</td><td>{a,b,c,d,e,f,g} segments, active-high</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input      [3:0] hex,
  output reg [6:0] seg
);

  // Your code here — a case statement over all 16 hex values, 0-9 and A-F.

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] hex; wire [6:0] seg; integer errors=0;
  top_module dut(.hex(hex), .seg(seg));
  task check; input [3:0] h; input [6:0] es; begin
    hex=h;#1;
    if(seg!==es) begin errors=errors+1; $display("FAIL hex=%h expected=%b got=%b",h,es,seg); end
    else $display("PASS hex=%h seg=%b",h,seg);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(4'h0, 7'b1111110);
    check(4'h5, 7'b1011011);
    check(4'h9, 7'b1111011);
    check(4'hA, 7'b1110111);
    check(4'hB, 7'b0011111);
    check(4'hF, 7'b1000111);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['hex', 'seg'],
      wavedrom: {
        signal: [
          { name: 'hex[3:0]', wave: '2.3.4.5.', data: ['0', '9', 'A', 'F'] },
          { name: 'seg[6:0]', wave: '2.3.4.5.', data: ['7E', '7B', '77', '47'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'thermometer-to-binary',
      title: 'Thermometer-to-Binary Encoder',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'encoder'],
      category: 'Combinational Design',
      lede: 'Convert a thermometer-coded value (a run of 1s from the LSB, as produced by a flash ADC comparator bank) into its binary magnitude.',
      concept: '<b>Concept:</b> A thermometer code (like <code>00011111</code>) fills in 1s from the bottom up to the represented value — exactly what a bank of flash-ADC comparators naturally produces. Converting it back to binary is a priority search for the topmost set bit: <code>in[7]?8:in[6]?7:...:in[0]?1:0</code>. Off-by-one here (checking <code>in[7]?7:...</code> instead of <code>8</code>) undercounts every single non-zero input by exactly one.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>therm</td><td>input</td><td>8</td><td>Thermometer code: a contiguous run of 1s starting at bit 0</td></tr>
<tr><td>count</td><td>output</td><td>4</td><td>Binary count of set bits (0-8)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] therm,
  output [3:0] count
);

  // Your code here — find the position of the highest set bit, +1 (0 if therm is all-zero).

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] therm; wire [3:0] count; integer errors=0;
  top_module dut(.therm(therm), .count(count));
  task check; input [7:0] t; input [3:0] ec; begin
    therm=t;#1;
    if(count!==ec) begin errors=errors+1; $display("FAIL therm=%b expected=%d got=%d",t,ec,count); end
    else $display("PASS therm=%b count=%d",t,count);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(8'b00000000, 4'd0);
    check(8'b00000001, 4'd1);
    check(8'b00000111, 4'd3);
    check(8'b00011111, 4'd5);
    check(8'b11111111, 4'd8);
    check(8'b00111111, 4'd6);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['therm', 'count'],
      wavedrom: {
        signal: [
          { name: 'therm[7:0]', wave: '2.3.4.5.', data: ['00', '07', '1F', 'FF'] },
          { name: 'count[3:0]', wave: '2.3.4.5.', data: ['0', '3', '5', '8'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'binary-to-thermometer',
      title: 'Binary-to-Thermometer Decoder',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'decoder'],
      category: 'Combinational Design',
      lede: 'Convert a binary magnitude into a thermometer code — the decoder behind every LED bar-graph level meter.',
      concept: '<b>Concept:</b> A thermometer decoder needs exactly <code>bin</code> ones starting from bit 0 — the classic bit-trick for "N ones" is <code>(1&lt;&lt;N)-1</code>: <code>therm = (9\'d1 &lt;&lt; bin) - 1</code> (widened to 9 bits so <code>bin=8</code> correctly yields all 8 bits set instead of overflowing). Filling bits from the <em>top</em> down instead of the bottom up produces a mirror-image pattern that looks plausible but lights the wrong end of the bar graph.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>bin</td><td>input</td><td>4</td><td>Binary magnitude, 0-8</td></tr>
<tr><td>therm</td><td>output</td><td>8</td><td>Thermometer code: bin ones starting from bit 0</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] bin,
  output [7:0] therm
);

  // Your code here — therm = (1 << bin) - 1, i.e. bin ones starting from bit 0.

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] bin; wire [7:0] therm; integer errors=0;
  top_module dut(.bin(bin), .therm(therm));
  task check; input [3:0] b; input [7:0] et; begin
    bin=b;#1;
    if(therm!==et) begin errors=errors+1; $display("FAIL bin=%d expected=%b got=%b",b,et,therm); end
    else $display("PASS bin=%d therm=%b",b,therm);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(4'd0, 8'b00000000);
    check(4'd1, 8'b00000001);
    check(4'd3, 8'b00000111);
    check(4'd5, 8'b00011111);
    check(4'd8, 8'b11111111);
    check(4'd6, 8'b00111111);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['bin', 'therm'],
      wavedrom: {
        signal: [
          { name: 'bin[3:0]', wave: '2.3.4.5.', data: ['0', '3', '5', '8'] },
          { name: 'therm[7:0]', wave: '2.3.4.5.', data: ['00', '07', '1F', 'FF'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'bcd-digit-validator',
      title: 'BCD Digit Validator',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'arithmetic'],
      category: 'Combinational Design',
      lede: 'Flag whether a 4-bit nibble is a legal BCD digit (0-9) or one of the six unused patterns (10-15) — the guard every BCD datapath needs before trusting its input.',
      concept: '<b>Concept:</b> A 4-bit nibble can represent 0-15, but BCD only uses 0-9 — the top six codes (1010-1111) are illegal. The check is a plain magnitude comparison, <code>valid = (nibble &lt;= 9)</code>. A tempting shortcut, <code>valid = ~nibble[3]</code> ("valid if the top bit is 0"), looks like it works for small numbers but wrongly rejects 8 and 9 (both have their MSB set) while wrongly accepting nothing above 7 — it\'s checking the wrong thing entirely.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>nibble</td><td>input</td><td>4</td><td>4-bit value to check</td></tr>
<tr><td>valid</td><td>output</td><td>1</td><td>1 if nibble is 0-9 (a legal BCD digit), 0 otherwise</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] nibble,
  output valid
);

  // Your code here — valid = (nibble <= 9).

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] nibble; wire valid; integer errors=0;
  top_module dut(.nibble(nibble), .valid(valid));
  task check; input [3:0] n; input ev; begin
    nibble=n;#1;
    if(valid!==ev) begin errors=errors+1; $display("FAIL nibble=%d expected=%b got=%b",n,ev,valid); end
    else $display("PASS nibble=%d valid=%b",n,valid);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(4'd0, 1);
    check(4'd7, 1);
    check(4'd9, 1);
    check(4'd8, 1);
    check(4'd10, 0);
    check(4'd15, 0);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['nibble', 'valid'],
      wavedrom: {
        signal: [
          { name: 'nibble[3:0]', wave: '2.3.4.5.', data: ['0', '9', 'A', 'F'] },
          { name: 'valid', wave: '1.1.0...' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'spi-shift-register',
      title: 'SPI Full-Duplex Shift Register',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'protocol'],
      category: 'Sequential Design',
      lede: 'Build the core shift register behind SPI: transmit a byte MSB-first while simultaneously receiving one, both directions moving on the same clock edge.',
      concept: '<b>Concept:</b> SPI\'s shift register does two things on every clock edge at once: the top bit shifts out on <code>miso</code>, and a new bit shifts in from <code>mosi</code> at the bottom — <code>shreg &lt;= {shreg[6:0], mosi}</code>, with <code>miso</code> reading <code>shreg[7]</code> combinationally. A <code>load</code> pulse parallel-loads a fresh byte to transmit. Shifting the wrong direction (<code>{mosi, shreg[7:1]}</code>) swaps which end transmits first and which end receives — a mirror-image bug that still compiles and still shifts, just not the way SPI actually works.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>SPI shift clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>load</td><td>input</td><td>1</td><td>Parallel-load tx_data into the shift register</td></tr>
<tr><td>mosi</td><td>input</td><td>1</td><td>Serial data in (Master Out Slave In)</td></tr>
<tr><td>tx_data</td><td>input</td><td>8</td><td>Byte to transmit on the next load</td></tr>
<tr><td>miso</td><td>output</td><td>1</td><td>Serial data out (Master In Slave Out) — current top bit</td></tr>
<tr><td>shreg</td><td>output</td><td>8</td><td>Live shift register contents</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  load,
  input  mosi,
  input  [7:0] tx_data,
  output miso,
  output reg [7:0] shreg
);

  // Your code here — on load, shreg<=tx_data; otherwise shift left, shreg<={shreg[6:0],mosi}. miso=shreg[7].

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, load, mosi; reg [7:0] tx_data; wire miso; wire [7:0] shreg; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .load(load), .mosi(mosi), .tx_data(tx_data), .miso(miso), .shreg(shreg));
  initial clk=0; always #5 clk=~clk;
  task checkm; input em; input [127:0] label; begin
    if(miso!==em) begin errors=errors+1; $display("FAIL %0s expected miso=%b got=%b",label,em,miso); end
    else $display("PASS %0s miso=%b",label,miso);
  end endtask
  task checks; input [7:0] es; input [127:0] label; begin
    if(shreg!==es) begin errors=errors+1; $display("FAIL %0s expected shreg=%h got=%h",label,es,shreg); end
    else $display("PASS %0s shreg=%h",label,shreg);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; load=0; mosi=0; tx_data=8'h00; @(posedge clk); #1; checks(8'h00,"reset");
    rst=0; load=1; tx_data=8'hA5; @(posedge clk); #1; checkm(1,"bit7-after-load");
    load=0; mosi=1; @(posedge clk); #1; checkm(0,"bit6");
    mosi=0; @(posedge clk); #1; checkm(1,"bit5");
    mosi=1; @(posedge clk); #1; checkm(0,"bit4");
    mosi=0; @(posedge clk); #1; checkm(0,"bit3");
    mosi=1; @(posedge clk); #1; checkm(1,"bit2");
    mosi=0; @(posedge clk); #1; checkm(0,"bit1");
    mosi=1; @(posedge clk); #1; checkm(1,"bit0"); checks(8'hD5,"final-shreg-matches-fed-mosi-bits");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'load', 'mosi', 'tx_data', 'miso', 'shreg'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.........' },
          { name: 'load', wave: '01........' },
          { name: 'miso', wave: '2.3.4.5...', data: ['1', '0', '1', '0'] },
          { name: 'shreg[7:0]', wave: '2.........', data: ['A5'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'i2c-start-stop-detector',
      title: 'I2C Start/Stop Condition Detector',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'protocol', 'i2c'],
      category: 'Sequential Design',
      lede: 'Detect the two conditions that frame every I2C transaction: SDA falling while SCL is high (START) and SDA rising while SCL is high (STOP) — the one rule that makes I2C\'s bus protocol work at all.',
      concept: '<b>Concept:</b> I2C is unique among serial buses: data (SDA) is only allowed to change while the clock (SCL) is <em>low</em> — every SDA transition while SCL is <em>high</em> is a special framing signal, not a data bit. Falling SDA while SCL stays high marks START; rising SDA while SCL stays high marks STOP. Detecting this needs registered previous samples of both signals: <code>start &lt;= scl && scl_prev && sda_prev && !sda</code>. Swapping which edge means start and which means stop is a genuinely easy mix-up (both rules look almost identical at a glance) — and it inverts the meaning of every transaction boundary in the bus trace.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Sampling clock (oversamples the bus)</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>sda</td><td>input</td><td>1</td><td>I2C data line</td></tr>
<tr><td>scl</td><td>input</td><td>1</td><td>I2C clock line</td></tr>
<tr><td>start_detected</td><td>output</td><td>1</td><td>Pulses for 1 cycle on a START condition</td></tr>
<tr><td>stop_detected</td><td>output</td><td>1</td><td>Pulses for 1 cycle on a STOP condition</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  sda,
  input  scl,
  output reg start_detected,
  output reg stop_detected
);

  // Your code here — register sda/scl; start=SDA falls while SCL held high; stop=SDA rises while SCL held high.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, sda, scl; wire start_detected, stop_detected; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .sda(sda), .scl(scl), .start_detected(start_detected), .stop_detected(stop_detected));
  initial clk=0; always #5 clk=~clk;
  task check; input es; input ep; input [127:0] label; begin
    if(start_detected!==es || stop_detected!==ep) begin
      errors=errors+1; $display("FAIL %0s expected start=%b stop=%b got start=%b stop=%b",label,es,ep,start_detected,stop_detected);
    end else $display("PASS %0s start=%b stop=%b",label,start_detected,stop_detected);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; sda=1; scl=1; @(posedge clk); #1; check(0,0,"reset-idle");
    rst=0;
    @(posedge clk); #1; check(0,0,"idle-no-change");
    sda=0; @(posedge clk); #1; check(1,0,"start-condition-sda-falls-scl-high");
    @(posedge clk); #1; check(0,0,"start-pulse-clears");
    scl=0; @(posedge clk); #1; check(0,0,"scl-drops-for-data-phase");
    sda=1; @(posedge clk); #1; check(0,0,"data-bit-change-while-scl-low-ignored");
    scl=1; @(posedge clk); #1; check(0,0,"scl-rises-again-no-sda-edge-this-cycle");
    sda=0; @(posedge clk); #1; check(1,0,"repeated-start-sda-falls-scl-high");
    sda=1; @(posedge clk); #1; check(0,1,"stop-condition-sda-rises-scl-high");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'sda', 'scl', 'start_detected', 'stop_detected'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.................' },
          { name: 'scl', wave: '1....0.1..........' },
          { name: 'sda', wave: '1.0.....1..0.1....' },
          { name: 'start_detected', wave: '0.10...........10.' },
          { name: 'stop_detected', wave: '0.............1.0.' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'thermostat-hysteresis-controller',
      title: 'Thermostat with Hysteresis',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'fsm'],
      category: 'Sequential Design',
      lede: 'Control a heater with a dead-band between the on and off thresholds, so it doesn\'t chatter on and off every time the temperature crosses a single setpoint.',
      concept: '<b>Concept:</b> A single-threshold thermostat oscillates rapidly whenever the temperature hovers right at the setpoint — every tiny fluctuation flips the heater. Hysteresis fixes this with two thresholds: turn on at or below a LOW point, turn off at or above a HIGH point, and <em>hold the current state</em> anywhere in between: <code>if(temp&lt;=LOW) on&lt;=1; else if(temp&gt;=HIGH) on&lt;=0;</code> (no else — the deadband case falls through and keeps the old value). Collapsing this to one threshold (<code>on &lt;= temp&lt;70</code>) throws away the memory that makes hysteresis work, so the heater flips state on every single sample near 70 instead of holding steady.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (heater_on=0)</td></tr>
<tr><td>temp</td><td>input</td><td>8</td><td>Current temperature reading</td></tr>
<tr><td>heater_on</td><td>output</td><td>1</td><td>1 while the heater should be running</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  [7:0] temp,
  output reg heater_on
);

  // Your code here — turn on at temp<=68, turn off at temp>=72, hold state in the deadband (69-71).

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst; reg [7:0] temp; wire heater_on; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .temp(temp), .heater_on(heater_on));
  initial clk=0; always #5 clk=~clk;
  task check; input eh; input [127:0] label; begin
    if(heater_on!==eh) begin errors=errors+1; $display("FAIL %0s expected=%b got=%b",label,eh,heater_on); end
    else $display("PASS %0s heater_on=%b",label,heater_on);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; temp=75; @(posedge clk); #1; check(0,"reset");
    rst=0;
    @(posedge clk); #1; check(0,"above-high-stays-off");
    temp=68; @(posedge clk); #1; check(1,"at-low-turns-on");
    temp=70; @(posedge clk); #1; check(1,"deadband-holds-on");
    temp=71; @(posedge clk); #1; check(1,"deadband-still-holds-on");
    temp=72; @(posedge clk); #1; check(0,"at-high-turns-off");
    temp=70; @(posedge clk); #1; check(0,"deadband-holds-off");
    temp=68; @(posedge clk); #1; check(1,"back-to-low-turns-on-again");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'temp', 'heater_on'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p...............' },
          { name: 'temp[7:0]', wave: '2...3.4.5.6.7...', data: ['75', '68', '70', '71', '72', '68'] },
          { name: 'heater_on', wave: '0...1.......0...' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'fir-filter-3tap',
      title: '3-Tap FIR Filter',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'datapath'],
      category: 'Sequential Design',
      lede: 'Implement a fixed-coefficient 3-tap FIR filter (1,2,1) over a signed input stream — the multiply-accumulate structure behind every digital smoothing/anti-aliasing filter.',
      concept: '<b>Concept:</b> A 3-tap FIR filter computes a weighted sum of the current and two previous samples: <code>y[n] = 1&middot;x[n] + 2&middot;x[n-1] + 1&middot;x[n-2]</code>. Keep the last two samples in shift registers (<code>x1</code>, <code>x2</code>), multiply the center tap by 2 with a cheap left-shift (<code>x1&lt;&lt;&lt;1</code>), and register the sum. Dropping the center tap\'s weight (<code>x_in+x1+x2</code> instead of <code>x_in+2*x1+x2</code>) silently turns a binomial-weighted smoothing filter into a plain 3-sample average — same shape of circuit, different frequency response entirely.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>x_in</td><td>input</td><td>8 (signed)</td><td>Current input sample</td></tr>
<tr><td>y_out</td><td>output</td><td>11 (signed)</td><td>Filtered output: x[n] + 2&middot;x[n-1] + x[n-2]</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  signed [7:0] x_in,
  output reg signed [10:0] y_out
);

  // Your code here — keep x[n-1], x[n-2] in shift registers; y_out <= x_in + 2*x1 + x2.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst; reg signed [7:0] x_in; wire signed [10:0] y_out; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .x_in(x_in), .y_out(y_out));
  initial clk=0; always #5 clk=~clk;
  task check; input signed [10:0] ey; input [127:0] label; begin
    if(y_out!==ey) begin errors=errors+1; $display("FAIL %0s expected=%d got=%d",label,ey,y_out); end
    else $display("PASS %0s y_out=%d",label,y_out);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; x_in=0; @(posedge clk); #1; check(0,"reset");
    rst=0;
    x_in=10; @(posedge clk); #1; check(10,"sample1");
    x_in=20; @(posedge clk); #1; check(40,"sample2");
    x_in=5;  @(posedge clk); #1; check(55,"sample3");
    x_in=0;  @(posedge clk); #1; check(30,"sample4");
    x_in=-10; @(posedge clk); #1; check(-5,"sample5-negative");
    x_in=30; @(posedge clk); #1; check(10,"sample6");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'x_in', 'y_out'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.............' },
          { name: 'x_in[7:0]', wave: '2.3.4.5.6.....', data: ['10', '20', '5', '0', '-10'] },
          { name: 'y_out[10:0]', wave: '2.3.4.5.6.....', data: ['10', '40', '55', '30', '-5'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'uart-transmitter',
      title: 'UART Transmitter',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'protocol', 'fsm'],
      category: 'Sequential Design',
      lede: 'Frame a byte onto a UART line: start bit, 8 data bits LSB-first, stop bit — the transmit-side complement to this catalog\'s UART frame assembler.',
      concept: '<b>Concept:</b> A UART transmitter is a small FSM: idle high, drop the line low for one bit (START), shift out all 8 data bits LSB-first while a bit counter tracks progress, then release the line high again for one bit (STOP). Shifting <code>shreg[7]</code> and shifting left instead of <code>shreg[0]</code> and shifting right silently reverses the bit order — UART is defined as LSB-first, unlike some other serial protocols that go MSB-first, and mixing the two conventions up is a very real, very common bug.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Bit clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (idle, tx=1)</td></tr>
<tr><td>start</td><td>input</td><td>1</td><td>Pulse for 1 cycle to begin transmitting tx_data</td></tr>
<tr><td>tx_data</td><td>input</td><td>8</td><td>Byte to transmit</td></tr>
<tr><td>tx</td><td>output</td><td>1</td><td>Serial line: idle high, start bit low, 8 data bits LSB-first, stop bit high</td></tr>
<tr><td>busy</td><td>output</td><td>1</td><td>1 while a frame is being transmitted</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  start,
  input  [7:0] tx_data,
  output reg tx,
  output reg busy
);

  // Your code here — IDLE(tx=1) -> START(tx=0) -> DATA(8 bits, LSB-first) -> STOP(tx=1) -> IDLE.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, start; reg [7:0] tx_data; wire tx, busy; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .start(start), .tx_data(tx_data), .tx(tx), .busy(busy));
  initial clk=0; always #5 clk=~clk;
  task check; input et; input eb; input [127:0] label; begin
    if(tx!==et || busy!==eb) begin errors=errors+1; $display("FAIL %0s expected tx=%b busy=%b got tx=%b busy=%b",label,et,eb,tx,busy); end
    else $display("PASS %0s tx=%b busy=%b",label,tx,busy);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; start=0; tx_data=8'h00; @(posedge clk); #1; check(1,0,"reset-idle");
    rst=0; tx_data=8'h4B; start=1;
    @(posedge clk); #1; check(1,1,"cyc1-start-consumed-busy-high");
    start=0;
    @(posedge clk); #1; check(0,1,"cyc2-start-bit-on-wire");
    @(posedge clk); #1; check(1,1,"data-bit0");
    @(posedge clk); #1; check(1,1,"data-bit1");
    @(posedge clk); #1; check(0,1,"data-bit2");
    @(posedge clk); #1; check(1,1,"data-bit3");
    @(posedge clk); #1; check(0,1,"data-bit4");
    @(posedge clk); #1; check(0,1,"data-bit5");
    @(posedge clk); #1; check(1,1,"data-bit6");
    @(posedge clk); #1; check(0,1,"data-bit7");
    @(posedge clk); #1; check(1,0,"stop-bit-busy-clears");
    @(posedge clk); #1; check(1,0,"back-to-idle");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'start', 'tx_data', 'tx', 'busy'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.....................' },
          { name: 'start', wave: '0.10..................' },
          { name: 'tx', wave: '1..0.2.3.4.5.6.7.8.9.1', data: ['1', '1', '0', '1', '0', '0', '1', '0'] },
          { name: 'busy', wave: '0.1................0..' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'signed-multiplier-4bit',
      title: '4-Bit Signed Multiplier',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'arithmetic'],
      category: 'Combinational Design',
      lede: 'Multiply two 4-bit two\'s-complement numbers into a correctly-signed 8-bit product — the exact same * operator as an unsigned multiplier, but only if every operand and the output are actually declared signed.',
      concept: '<b>Concept:</b> Verilog\'s <code>*</code> operator performs true signed multiplication automatically, but only when <em>every</em> operand involved is declared <code>signed</code> — if even one operand in the expression is unsigned, the entire multiplication silently falls back to unsigned arithmetic. Re-declaring the inputs as plain (unsigned) wires before multiplying, even with identical bit widths and the exact same <code>*</code> operator, throws away the sign information and produces a completely different (and wrong) result for any negative operand.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>4 (signed)</td><td>First operand</td></tr>
<tr><td>b</td><td>input</td><td>4 (signed)</td><td>Second operand</td></tr>
<tr><td>product</td><td>output</td><td>8 (signed)</td><td>a &times; b, correctly signed</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  signed [3:0] a,
  input  signed [3:0] b,
  output signed [7:0] product
);

  // Your code here — product = a * b (both operands must stay signed for Verilog to do signed multiplication).

endmodule
`,
      hiddenTb: `
module tb;
  reg signed [3:0] a, b; wire signed [7:0] product; integer errors=0;
  top_module dut(.a(a), .b(b), .product(product));
  task check; input signed [3:0] ta, tb_; input signed [7:0] ep; begin
    a=ta; b=tb_; #1;
    if(product!==ep) begin errors=errors+1; $display("FAIL a=%d b=%d expected=%d got=%d",ta,tb_,ep,product); end
    else $display("PASS a=%d b=%d product=%d",ta,tb_,product);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(-3, 2, -6);
    check(-8, -1, 8);
    check(5, 3, 15);
    check(-1, -1, 1);
    check(0, 7, 0);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'product'],
      wavedrom: {
        signal: [
          { name: 'a[3:0]', wave: '2.3.4.5.', data: ['-3', '-8', '5', '-1'] },
          { name: 'b[3:0]', wave: '2.3.4.5.', data: ['2', '-1', '3', '-1'] },
          { name: 'product[7:0]', wave: '2.3.4.5.', data: ['-6', '8', '15', '1'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'median-of-three',
      title: 'Median of Three',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'comparator'],
      category: 'Combinational Design',
      lede: 'Find the median (middle) value of three unsigned bytes — a classic three-way comparison building block used everywhere from sorting networks to median filters.',
      concept: '<b>Concept:</b> The median is whichever value sits between the other two: <code>a</code> is the median if it\'s between <code>b</code> and <code>c</code> (in either order), and likewise for <code>b</code>; otherwise <code>c</code> must be the median. A tempting shortcut — just find the max of the three — looks similar but answers a completely different question; median and max only coincide by accident on specific inputs, not in general.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>8</td><td>First value</td></tr>
<tr><td>b</td><td>input</td><td>8</td><td>Second value</td></tr>
<tr><td>c</td><td>input</td><td>8</td><td>Third value</td></tr>
<tr><td>median</td><td>output</td><td>8</td><td>The middle value of the three</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] a,
  input  [7:0] b,
  input  [7:0] c,
  output reg [7:0] median
);

  // Your code here — median is whichever of a/b/c sits between the other two.

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] a,b,c; wire [7:0] median; integer errors=0;
  top_module dut(.a(a),.b(b),.c(c),.median(median));
  task check; input [7:0] ta,tb_,tc; input [7:0] em; begin
    a=ta;b=tb_;c=tc;#1;
    if(median!==em) begin errors=errors+1; $display("FAIL a=%d b=%d c=%d expected=%d got=%d",ta,tb_,tc,em,median); end
    else $display("PASS a=%d b=%d c=%d median=%d",ta,tb_,tc,median);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(5,9,2,5);
    check(1,2,3,2);
    check(10,10,5,10);
    check(7,7,7,7);
    check(0,255,128,128);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'c', 'median'],
      wavedrom: {
        signal: [
          { name: 'a[7:0]', wave: '2.3.4.5.', data: ['5', '1', '10', '0'] },
          { name: 'b[7:0]', wave: '2.3.4.5.', data: ['9', '2', '10', '255'] },
          { name: 'c[7:0]', wave: '2.3.4.5.', data: ['2', '3', '5', '128'] },
          { name: 'median[7:0]', wave: '2.3.4.5.', data: ['5', '2', '10', '128'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'min-max-finder',
      title: 'Min/Max Finder',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'comparator'],
      category: 'Combinational Design',
      lede: 'Find both the minimum and maximum of three unsigned bytes at once — the basic building block of any sorting network or range check.',
      concept: '<b>Concept:</b> A nested-comparison tree finds the max in two comparisons: compare <code>a</code> and <code>b</code> first, then compare the winner against <code>c</code>. The min follows the mirror-image tree using <code>&lt;=</code> instead of <code>&gt;=</code>. Swapping which tree feeds which output — computing the max tree but wiring it to <code>min_val</code>, and vice versa — compiles fine and even passes on inputs where all three values happen to be equal, but is backwards everywhere else.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>8</td><td>First value</td></tr>
<tr><td>b</td><td>input</td><td>8</td><td>Second value</td></tr>
<tr><td>c</td><td>input</td><td>8</td><td>Third value</td></tr>
<tr><td>min_val</td><td>output</td><td>8</td><td>Smallest of the three</td></tr>
<tr><td>max_val</td><td>output</td><td>8</td><td>Largest of the three</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] a,
  input  [7:0] b,
  input  [7:0] c,
  output [7:0] min_val,
  output [7:0] max_val
);

  // Your code here — a 2-comparison tree for max, and the mirror-image tree for min.

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] a,b,c; wire [7:0] min_val, max_val; integer errors=0;
  top_module dut(.a(a),.b(b),.c(c),.min_val(min_val),.max_val(max_val));
  task check; input [7:0] ta,tb_,tc; input [7:0] emin,emax; begin
    a=ta;b=tb_;c=tc;#1;
    if(min_val!==emin || max_val!==emax) begin errors=errors+1; $display("FAIL a=%d b=%d c=%d expected min=%d max=%d got min=%d max=%d",ta,tb_,tc,emin,emax,min_val,max_val); end
    else $display("PASS a=%d b=%d c=%d min=%d max=%d",ta,tb_,tc,min_val,max_val);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(5,9,2,2,9);
    check(10,10,5,5,10);
    check(7,7,7,7,7);
    check(0,255,128,0,255);
    check(200,50,200,50,200);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'c', 'min_val', 'max_val'],
      wavedrom: {
        signal: [
          { name: 'a[7:0]', wave: '2.3.4.5.', data: ['5', '10', '7', '0'] },
          { name: 'b[7:0]', wave: '2.3.4.5.', data: ['9', '10', '7', '255'] },
          { name: 'c[7:0]', wave: '2.3.4.5.', data: ['2', '5', '7', '128'] },
          { name: 'min_val[7:0]', wave: '2.3.4.5.', data: ['2', '5', '7', '0'] },
          { name: 'max_val[7:0]', wave: '2.3.4.5.', data: ['9', '10', '7', '255'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'bcd-subtractor',
      title: 'BCD Subtractor',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'arithmetic'],
      category: 'Combinational Design',
      lede: 'Subtract two BCD digits and produce a valid BCD result plus a borrow flag — the complement to this catalog\'s BCD adder.',
      concept: '<b>Concept:</b> Plain binary subtraction of two BCD digits works fine when the result stays non-negative, but when <code>a &lt; b</code> the binary result would be negative — BCD has no representation for that, so the correction is to add 10 back: <code>diff = a - b + 10</code>, and raise a <code>borrow</code> flag. Skipping the +10 correction (just computing <code>a - b</code> unconditionally, relying on binary wraparound) produces a value that looks superficially plausible but is not the correct BCD digit — plain two\'s-complement wraparound and \'add 10\' correction are not the same arithmetic.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>4</td><td>Minuend BCD digit, 0-9</td></tr>
<tr><td>b</td><td>input</td><td>4</td><td>Subtrahend BCD digit, 0-9</td></tr>
<tr><td>diff</td><td>output</td><td>4</td><td>a - b as a valid BCD digit</td></tr>
<tr><td>borrow</td><td>output</td><td>1</td><td>1 when a &lt; b (a borrow was needed)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] a,
  input  [3:0] b,
  output [3:0] diff,
  output borrow
);

  // Your code here — borrow = (a<b); diff = borrow ? (a-b+10) : (a-b).

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] a,b; wire [3:0] diff; wire borrow; integer errors=0;
  top_module dut(.a(a),.b(b),.diff(diff),.borrow(borrow));
  task check; input [3:0] ta,tb_; input [3:0] ed; input eb; begin
    a=ta;b=tb_;#1;
    if(diff!==ed || borrow!==eb) begin errors=errors+1; $display("FAIL a=%d b=%d expected diff=%d borrow=%b got diff=%d borrow=%b",ta,tb_,ed,eb,diff,borrow); end
    else $display("PASS a=%d b=%d diff=%d borrow=%b",ta,tb_,diff,borrow);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(7,3,4,0);
    check(3,7,6,1);
    check(9,9,0,0);
    check(0,9,1,1);
    check(9,0,9,0);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'diff', 'borrow'],
      wavedrom: {
        signal: [
          { name: 'a[3:0]', wave: '2.3.4.5.', data: ['7', '3', '9', '0'] },
          { name: 'b[3:0]', wave: '2.3.4.5.', data: ['3', '7', '9', '9'] },
          { name: 'diff[3:0]', wave: '2.3.4.5.', data: ['4', '6', '0', '1'] },
          { name: 'borrow', wave: '0.1.0.1.' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'shift-add-multiplier',
      title: 'Shift-Add Multiplier',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'datapath'],
      category: 'Sequential Design',
      lede: 'Multiply two unsigned 4-bit numbers using the classic shift-add algorithm — one bit of the multiplier examined per cycle, exactly how early CPUs implemented multiplication in hardware before dedicated multiplier arrays.',
      concept: '<b>Concept:</b> Shift-add multiplication processes the multiplier one bit at a time: if the current LSB of the multiplier is 1, add the (progressively left-shifted) multiplicand into an accumulating product; either way, shift the multiplicand left and the multiplier right, and repeat for every bit. Forgetting to shift the multiplier means the same LSB is examined every cycle instead of advancing through the bits — the multiplicand still grows correctly, but the decision of when to add it is stuck testing the same (increasingly stale) bit forever.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>start</td><td>input</td><td>1</td><td>Pulse for 1 cycle to begin multiplying a &times; b</td></tr>
<tr><td>a</td><td>input</td><td>4</td><td>Multiplicand</td></tr>
<tr><td>b</td><td>input</td><td>4</td><td>Multiplier</td></tr>
<tr><td>product</td><td>output</td><td>8</td><td>a &times; b, valid once done pulses</td></tr>
<tr><td>done</td><td>output</td><td>1</td><td>Pulses for 1 cycle when the product is ready</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  start,
  input  [3:0] a,
  input  [3:0] b,
  output reg [7:0] product,
  output reg done
);

  // Your code here — 4 iterations: if multiplier LSB is 1, add multiplicand into product; then shift multiplicand left, multiplier right.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, start; reg [3:0] a, b; wire [7:0] product; wire done; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .start(start), .a(a), .b(b), .product(product), .done(done));
  initial clk=0; always #5 clk=~clk;
  task check; input ed; input [7:0] ep; input [127:0] label; begin
    if(done!==ed || product!==ep) begin errors=errors+1; $display("FAIL %0s expected done=%b product=%d got done=%b product=%d",label,ed,ep,done,product); end
    else $display("PASS %0s done=%b product=%d",label,done,product);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; start=0; a=0; b=0; @(posedge clk); #1; check(0,0,"reset");
    rst=0; a=5; b=3; start=1;
    @(posedge clk); #1; check(0,0,"load-cycle");
    start=0;
    @(posedge clk); #1; check(0,5,"iter0");
    @(posedge clk); #1; check(0,15,"iter1");
    @(posedge clk); #1; check(0,15,"iter2-no-add");
    @(posedge clk); #1; check(1,15,"iter3-done-product-15");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'start', 'a', 'b', 'product', 'done'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.........' },
          { name: 'start', wave: '0.10......' },
          { name: 'product[7:0]', wave: '2...3.4...', data: ['0', '5', '15'] },
          { name: 'done', wave: '0........1' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'auto-repeat-button',
      title: 'Auto-Repeat Button',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'control'],
      category: 'Sequential Design',
      lede: 'Fire an immediate pulse the instant a button is pressed, then keep firing repeat pulses at a steady interval for as long as it stays held — the key-repeat behavior behind every keyboard.',
      concept: '<b>Concept:</b> A fresh press (rising edge, tracked with a registered previous-value comparison) fires one pulse immediately and resets a cycle counter. While the button stays held, that counter counts up and fires another pulse every time it reaches the repeat interval, then resets — releasing the button resets the counter so a later press always starts with a fresh, immediate pulse rather than continuing a stale count. Getting the repeat-interval comparison off by one (checking one cycle too early) makes every repeat fire faster than intended, silently changing the whole timing feel of the interface.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>btn</td><td>input</td><td>1</td><td>Button level (already clean/debounced)</td></tr>
<tr><td>pulse</td><td>output</td><td>1</td><td>Pulses for 1 cycle on press, then every 3 cycles while held</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  btn,
  output reg pulse
);

  // Your code here — pulse once on the rising edge of btn, then every 3 cycles while it stays held; release resets the timer.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, btn; wire pulse; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .btn(btn), .pulse(pulse));
  initial clk=0; always #5 clk=~clk;
  task check; input ep; input [127:0] label; begin
    if(pulse!==ep) begin errors=errors+1; $display("FAIL %0s expected=%b got=%b",label,ep,pulse); end
    else $display("PASS %0s pulse=%b",label,pulse);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; btn=0; @(posedge clk); #1; check(0,"reset");
    rst=0; btn=1;
    @(posedge clk); #1; check(1,"cyc1-fresh-press");
    @(posedge clk); #1; check(0,"cyc2-counting");
    @(posedge clk); #1; check(0,"cyc3-counting");
    @(posedge clk); #1; check(1,"cyc4-first-repeat");
    @(posedge clk); #1; check(0,"cyc5-counting");
    @(posedge clk); #1; check(0,"cyc6-counting");
    @(posedge clk); #1; check(1,"cyc7-second-repeat");
    btn=0;
    @(posedge clk); #1; check(0,"released-no-repeat");
    btn=1;
    @(posedge clk); #1; check(1,"re-press-fresh-again");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'btn', 'pulse'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.........' },
          { name: 'btn', wave: '01........' },
          { name: 'pulse', wave: '0.10.010.1' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'gray-code-sequence-checker',
      title: 'Gray Code Sequence Checker',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'checker'],
      category: 'Sequential Design',
      lede: 'Watch a stream of 4-bit values and flag whether each new sample really is a valid Gray-code step from the last one — exactly one bit changed, no more, no less.',
      concept: '<b>Concept:</b> The defining property of a Gray-code sequence is that consecutive values differ in exactly one bit. XOR the current sample against the registered previous one, then test whether that difference has exactly one bit set using the classic power-of-two trick: <code>(diff != 0) && ((diff & (diff-1)) == 0)</code> — a value with exactly one bit set becomes zero when ANDed with itself minus one. Replacing that check with a plain inequality (<code>code != prev</code>) only verifies that <em>something</em> changed, not that the change respects the one-bit-at-a-time rule — it would wave through a jump like 0110 to 0101 (two bits flipped) as if it were valid.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>code</td><td>input</td><td>4</td><td>Next sample in the sequence</td></tr>
<tr><td>valid</td><td>output</td><td>1</td><td>1 if code differs from the previous sample by exactly one bit</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  [3:0] code,
  output reg valid
);

  // Your code here — register the previous code; valid = exactly one bit differs from it (Hamming distance 1).

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst; reg [3:0] code; wire valid; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .code(code), .valid(valid));
  initial clk=0; always #5 clk=~clk;
  task check; input ev; input [127:0] label; begin
    if(valid!==ev) begin errors=errors+1; $display("FAIL %0s expected=%b got=%b",label,ev,valid); end
    else $display("PASS %0s valid=%b",label,valid);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; code=4'b0000; @(posedge clk); #1; check(1,"reset-first-sample");
    rst=0;
    code=4'b0001; @(posedge clk); #1; check(1,"0-to-1-valid");
    code=4'b0011; @(posedge clk); #1; check(1,"1-to-3-valid");
    code=4'b0010; @(posedge clk); #1; check(1,"3-to-2-valid");
    code=4'b0110; @(posedge clk); #1; check(1,"2-to-6-valid");
    code=4'b0101; @(posedge clk); #1; check(0,"6-to-5-INVALID-two-bits");
    code=4'b0111; @(posedge clk); #1; check(1,"5-to-7-valid-again");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'code', 'valid'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p...........' },
          { name: 'code[3:0]', wave: '2.3.4.5.6.7.', data: ['0', '1', '3', '2', '6', '5'] },
          { name: 'valid', wave: '1.........0.' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'one-shot-pulse-generator',
      title: 'One-Shot Pulse Generator',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'control'],
      category: 'Sequential Design',
      lede: 'Turn a trigger into a clean pulse of a fixed, programmable width — a classic monostable ("one-shot") that ignores any retrigger attempts until the current pulse finishes.',
      concept: '<b>Concept:</b> A one-shot latches an <code>active</code> flag on trigger, counts down for <code>width</code> cycles, and only accepts a new trigger once it\'s back to idle: <code>if (!active && trigger)</code> is the guard that makes retriggering impossible mid-pulse. Dropping the <code>!active</code> half of that guard (just checking <code>trigger</code> alone) lets a retrigger reload the countdown while a pulse is already running, silently stretching the output well past its intended, fixed width — defeating the entire point of a one-shot.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>trigger</td><td>input</td><td>1</td><td>Pulse for 1 cycle to fire a new one-shot (ignored while already active)</td></tr>
<tr><td>width</td><td>input</td><td>4</td><td>Pulse width in cycles</td></tr>
<tr><td>pulse_out</td><td>output</td><td>1</td><td>High for exactly width cycles after each accepted trigger</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  trigger,
  input  [3:0] width,
  output reg pulse_out
);

  // Your code here — on an accepted trigger (only when not already active), go high for exactly width cycles.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, trigger; reg [3:0] width; wire pulse_out; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .trigger(trigger), .width(width), .pulse_out(pulse_out));
  initial clk=0; always #5 clk=~clk;
  task check; input ep; input [127:0] label; begin
    if(pulse_out!==ep) begin errors=errors+1; $display("FAIL %0s expected=%b got=%b",label,ep,pulse_out); end
    else $display("PASS %0s pulse_out=%b",label,pulse_out);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; trigger=0; width=4'd3; @(posedge clk); #1; check(0,"reset");
    rst=0; trigger=1;
    @(posedge clk); #1; check(1,"cyc1-pulse-starts");
    trigger=0;
    @(posedge clk); #1; check(1,"cyc2-still-high");
    @(posedge clk); #1; check(1,"cyc3-still-high");
    @(posedge clk); #1; check(0,"cyc4-pulse-ends-after-width-3");
    trigger=1;
    @(posedge clk); #1; check(1,"new-trigger-works");
    trigger=0;
    @(posedge clk); #1; check(1,"cyc2-of-second-pulse");
    trigger=1;
    @(posedge clk); #1; check(1,"cyc3-retrigger-attempt-should-be-ignored");
    trigger=0;
    @(posedge clk); #1; check(0,"pulse-ends-on-schedule-not-extended");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'trigger', 'width', 'pulse_out'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.........' },
          { name: 'trigger', wave: '0.10..1.0.' },
          { name: 'pulse_out', wave: '0.111.0111' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'serial-to-parallel-with-parity',
      title: 'Serial-to-Parallel Receiver with Parity',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'protocol'],
      category: 'Sequential Design',
      lede: 'Receive an 8-bit word one bit at a time, MSB first, followed by an even-parity check bit — and flag a mismatch instead of silently trusting corrupted data.',
      concept: '<b>Concept:</b> After a framing pulse, shift in 8 data bits MSB-first (<code>shreg &lt;= {shreg[6:0], bit_in}</code>), then treat the 9th bit as an even-parity check: for even parity, the correct check bit always equals the XOR of the 8 data bits, so <code>parity_error = (^shreg) != bit_in</code>. Inverting that comparison (<code>==</code> instead of <code>!=</code>) flips the entire meaning of the flag — every good frame gets reported as corrupted and every actually-corrupted frame sails through as clean, which is far more dangerous than having no parity check at all.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>bit_in</td><td>input</td><td>1</td><td>Next serial bit (data, then the parity bit)</td></tr>
<tr><td>frame_start</td><td>input</td><td>1</td><td>Pulse for 1 cycle: the next 9 bits are a new frame</td></tr>
<tr><td>data_out</td><td>output</td><td>8</td><td>Assembled byte, valid when data_valid pulses</td></tr>
<tr><td>parity_error</td><td>output</td><td>1</td><td>1 if the received parity bit doesn't match even parity over data_out</td></tr>
<tr><td>data_valid</td><td>output</td><td>1</td><td>Pulses for 1 cycle once a full 9-bit frame has been received</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  bit_in,
  input  frame_start,
  output reg [7:0] data_out,
  output reg parity_error,
  output reg data_valid
);

  // Your code here — shift in 8 data bits MSB-first, then check the 9th bit against even parity (XOR of the 8 data bits).

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, bit_in, frame_start; wire [7:0] data_out; wire parity_error, data_valid; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .bit_in(bit_in), .frame_start(frame_start), .data_out(data_out), .parity_error(parity_error), .data_valid(data_valid));
  initial clk=0; always #5 clk=~clk;
  task check; input [7:0] ed; input ee; input [127:0] label; begin
    if(data_out!==ed || parity_error!==ee) begin errors=errors+1; $display("FAIL %0s expected data=%h err=%b got data=%h err=%b",label,ed,ee,data_out,parity_error); end
    else $display("PASS %0s data=%h err=%b",label,data_out,parity_error);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; bit_in=0; frame_start=0; @(posedge clk); #1;
    rst=0;
    frame_start=1; @(posedge clk); #1; frame_start=0;
    bit_in=0; @(posedge clk); #1;
    bit_in=1; @(posedge clk); #1;
    bit_in=0; @(posedge clk); #1;
    bit_in=0; @(posedge clk); #1;
    bit_in=1; @(posedge clk); #1;
    bit_in=0; @(posedge clk); #1;
    bit_in=1; @(posedge clk); #1;
    bit_in=1; @(posedge clk); #1;
    bit_in=0; @(posedge clk); #1; check(8'h4B,0,"valid-frame-even-parity-matches");
    frame_start=1; @(posedge clk); #1; frame_start=0;
    bit_in=0; @(posedge clk); #1;
    bit_in=1; @(posedge clk); #1;
    bit_in=0; @(posedge clk); #1;
    bit_in=0; @(posedge clk); #1;
    bit_in=1; @(posedge clk); #1;
    bit_in=0; @(posedge clk); #1;
    bit_in=1; @(posedge clk); #1;
    bit_in=1; @(posedge clk); #1;
    bit_in=1; @(posedge clk); #1; check(8'h4B,1,"invalid-frame-parity-mismatch");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'bit_in', 'frame_start', 'data_out', 'parity_error', 'data_valid'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......................' },
          { name: 'frame_start', wave: '0.10....................' },
          { name: 'bit_in', wave: '0..2.3.4.5.6.7.8.9......', data: ['0', '1', '0', '0', '1', '0', '1', '1'] },
          { name: 'data_valid', wave: '0..........1............' },
          { name: 'parity_error', wave: '0..........2............', data: ['0'] }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'count-leading-ones',
      title: 'Count Leading Ones (CLO)',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'encoder'],
      category: 'Combinational Design',
      lede: 'Count how many leading one bits sit at the top of an 8-bit value before the first zero — the complement to this catalog\'s leading-zero counter.',
      concept: '<b>Concept:</b> Mirror image of CLZ: walk down from the MSB and count how many consecutive 1s appear before the first 0 (or all 8, if every bit is set): <code>in[7]?0:in[6]?1:...:in[0]?7:8</code> — wait, inverted: <code>~in[7]?0:~in[6]?1:...</code>, checking for the first <em>zero</em> bit. Shifting every branch\'s return value by one (a natural copy-paste slip from a similar encoder) undercounts nothing and overcounts every non-all-ones input by exactly one.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>in</td><td>input</td><td>8</td><td>Input value</td></tr>
<tr><td>count</td><td>output</td><td>4</td><td>Number of leading one bits (0-8; 8 means in is all-ones)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] in,
  output [3:0] count
);

  // Your code here — count 1 bits from the MSB until the first 0; count=8 if in is all-ones.

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] in; wire [3:0] count; integer errors=0;
  top_module dut(.in(in), .count(count));
  task check; input [7:0] i; input [3:0] ec; begin
    in=i;#1;
    if(count!==ec) begin errors=errors+1; $display("FAIL in=%b expected=%d got=%d",i,ec,count); end
    else $display("PASS in=%b count=%d",i,count);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(8'b11110000, 4'd4);
    check(8'b10000000, 4'd1);
    check(8'b00000000, 4'd0);
    check(8'b11111111, 4'd8);
    check(8'b01111111, 4'd0);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['in', 'count'],
      wavedrom: {
        signal: [
          { name: 'in[7:0]', wave: '2.3.4.5.', data: ['F0', '80', '00', 'FF'] },
          { name: 'count[3:0]', wave: '2.3.4.5.', data: ['4', '1', '0', '8'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'signed-comparator',
      title: '4-Bit Signed Comparator',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'comparator'],
      category: 'Combinational Design',
      lede: 'Compare two 4-bit two\'s-complement numbers and flag greater-than, equal, or less-than — the signed counterpart to this catalog\'s unsigned 4-bit comparator.',
      concept: '<b>Concept:</b> Verilog\'s relational operators (<code>&gt;</code>, <code>==</code>, <code>&lt;</code>) do true signed comparison automatically once both operands are declared <code>signed</code> — no manual sign-bit handling needed. Re-declaring the operands as plain unsigned wires before comparing (even with the exact same operators) throws away that sign information: -3 stops being "less than 2" and instead compares as the large unsigned value 13, silently flipping the answer for any pair with a negative operand.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>4 (signed)</td><td>First operand</td></tr>
<tr><td>b</td><td>input</td><td>4 (signed)</td><td>Second operand</td></tr>
<tr><td>gt</td><td>output</td><td>1</td><td>1 if a &gt; b</td></tr>
<tr><td>eq</td><td>output</td><td>1</td><td>1 if a == b</td></tr>
<tr><td>lt</td><td>output</td><td>1</td><td>1 if a &lt; b</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  signed [3:0] a,
  input  signed [3:0] b,
  output gt,
  output eq,
  output lt
);

  // Your code here — gt/eq/lt from signed comparison of a and b.

endmodule
`,
      hiddenTb: `
module tb;
  reg signed [3:0] a, b; wire gt, eq, lt; integer errors=0;
  top_module dut(.a(a), .b(b), .gt(gt), .eq(eq), .lt(lt));
  task check; input signed [3:0] ta, tb_; input eg, ee, el; begin
    a=ta; b=tb_; #1;
    if(gt!==eg || eq!==ee || lt!==el) begin errors=errors+1; $display("FAIL a=%d b=%d expected gt=%b eq=%b lt=%b got gt=%b eq=%b lt=%b",ta,tb_,eg,ee,el,gt,eq,lt); end
    else $display("PASS a=%d b=%d gt=%b eq=%b lt=%b",ta,tb_,gt,eq,lt);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(-3, 2, 0,0,1);
    check(5, 5, 0,1,0);
    check(-1, -2, 1,0,0);
    check(-8, 7, 0,0,1);
    check(3, -3, 1,0,0);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'gt', 'eq', 'lt'],
      wavedrom: {
        signal: [
          { name: 'a[3:0]', wave: '2.3.4.5.', data: ['-3', '5', '-1', '3'] },
          { name: 'b[3:0]', wave: '2.3.4.5.', data: ['2', '5', '-2', '-3'] },
          { name: 'gt', wave: '0.0.1.1.' },
          { name: 'eq', wave: '0.1.0.0.' },
          { name: 'lt', wave: '1.0.0.0.' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'barrel-shifter',
      title: '8-Bit Barrel Shifter',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'datapath'],
      category: 'Combinational Design',
      lede: 'Shift an 8-bit value left by a variable amount, filling the vacated low bits with zero — the non-wrapping cousin of this catalog\'s barrel rotator.',
      concept: '<b>Concept:</b> A logical shift is just <code>in &lt;&lt; shamt</code> — bits that fall off the top are gone, and zeros fill in from the bottom. It\'s easy to confuse this with a barrel <em>rotator</em>, which instead wraps the bits that fall off back around to the bottom (<code>(in&lt;&lt;shamt)|(in&gt;&gt;(8-shamt))</code>). Both are legitimate, commonly-used circuits — they just answer different questions, and reaching for the rotate formula when the spec calls for a plain shift silently reintroduces bits that were supposed to be discarded.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>in</td><td>input</td><td>8</td><td>Value to shift</td></tr>
<tr><td>shamt</td><td>input</td><td>3</td><td>Shift amount, 0-7</td></tr>
<tr><td>out</td><td>output</td><td>8</td><td>in shifted left by shamt, zero-filled</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] in,
  input  [2:0] shamt,
  output [7:0] out
);

  // Your code here — out = in << shamt (logical shift, zero-filled, not a rotate).

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] in; reg [2:0] shamt; wire [7:0] out; integer errors=0;
  top_module dut(.in(in), .shamt(shamt), .out(out));
  task check; input [7:0] i; input [2:0] s; input [7:0] eo; begin
    in=i; shamt=s; #1;
    if(out!==eo) begin errors=errors+1; $display("FAIL in=%b shamt=%d expected=%b got=%b",i,s,eo,out); end
    else $display("PASS in=%b shamt=%d out=%b",i,s,out);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(8'b10110011, 3'd3, 8'b10011000);
    check(8'b00000001, 3'd7, 8'b10000000);
    check(8'b11111111, 3'd4, 8'b11110000);
    check(8'b10101010, 3'd0, 8'b10101010);
    check(8'b00000001, 3'd1, 8'b00000010);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['in', 'shamt', 'out'],
      wavedrom: {
        signal: [
          { name: 'in[7:0]', wave: '2.3.4.5.', data: ['B3', '01', 'FF', '01'] },
          { name: 'shamt[2:0]', wave: '2.3.4.5.', data: ['3', '7', '4', '1'] },
          { name: 'out[7:0]', wave: '2.3.4.5.', data: ['98', '80', 'F0', '02'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'bcd-incrementer',
      title: 'BCD Incrementer',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'arithmetic'],
      category: 'Combinational Design',
      lede: 'Add one to a BCD digit, wrapping 9 back to 0 with a carry — the combinational building block behind every BCD counter on this site.',
      concept: '<b>Concept:</b> A BCD digit only spans 0-9, so incrementing 9 must wrap to 0 with <code>carry_out</code> set, not roll into the invalid binary value 10 (<code>4\'b1010</code>). The fix is a single special case: <code>carry_out = (bcd_in==9); bcd_out = carry_out ? 0 : bcd_in+1;</code>. Forgetting the wrap (just computing <code>bcd_in+1</code> unconditionally) still gets <code>carry_out</code> right — the digit itself briefly becomes an invalid BCD code the moment it should have reset.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>bcd_in</td><td>input</td><td>4</td><td>BCD digit, 0-9</td></tr>
<tr><td>bcd_out</td><td>output</td><td>4</td><td>bcd_in + 1, wrapped to 0 at 9</td></tr>
<tr><td>carry_out</td><td>output</td><td>1</td><td>1 when bcd_in was 9 (wrapped)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] bcd_in,
  output [3:0] bcd_out,
  output carry_out
);

  // Your code here — carry_out = (bcd_in==9); bcd_out = carry_out ? 0 : bcd_in+1.

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] bcd_in; wire [3:0] bcd_out; wire carry_out; integer errors=0;
  top_module dut(.bcd_in(bcd_in), .bcd_out(bcd_out), .carry_out(carry_out));
  task check; input [3:0] b; input [3:0] eo; input ec; begin
    bcd_in=b;#1;
    if(bcd_out!==eo || carry_out!==ec) begin errors=errors+1; $display("FAIL bcd_in=%d expected out=%d carry=%b got out=%d carry=%b",b,eo,ec,bcd_out,carry_out); end
    else $display("PASS bcd_in=%d bcd_out=%d carry=%b",b,bcd_out,carry_out);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(4'd3, 4'd4, 0);
    check(4'd9, 4'd0, 1);
    check(4'd8, 4'd9, 0);
    check(4'd0, 4'd1, 0);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['bcd_in', 'bcd_out', 'carry_out'],
      wavedrom: {
        signal: [
          { name: 'bcd_in[3:0]', wave: '2.3.4.5.', data: ['3', '9', '8', '0'] },
          { name: 'bcd_out[3:0]', wave: '2.3.4.5.', data: ['4', '0', '9', '1'] },
          { name: 'carry_out', wave: '0.1.0...' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'moving-average-filter',
      title: '4-Sample Moving Average Filter',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'datapath'],
      category: 'Sequential Design',
      lede: 'Compute a running average over the last 4 samples of a stream — the simplest possible smoothing filter, and a shift-register-plus-adder pattern that shows up constantly in sensor and audio pipelines.',
      concept: '<b>Concept:</b> Keep the last 3 samples in a shift register, add the new one to them, and divide by 4 with a free 2-bit right-shift (since 4 is a power of two): <code>sum &lt;= x_in+x1+x2+x3; avg_out = sum&gt;&gt;2;</code>. Every sample must shift down one slot — <code>x3&lt;=x2; x2&lt;=x1; x1&lt;=x_in;</code> — dropping just one of those three shift lines (say, the one feeding <code>x3</code>) doesn\'t crash anything; it just quietly removes one sample from the averaging window every cycle, so the filter silently averages over fewer than 4 samples once the window has been running a while.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>x_in</td><td>input</td><td>8</td><td>Next input sample</td></tr>
<tr><td>avg_out</td><td>output</td><td>8</td><td>Average of the last 4 samples (x_in and the 3 before it)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  [7:0] x_in,
  output reg [7:0] avg_out
);

  // Your code here — keep the last 3 samples in a shift register; avg_out = (x_in+x1+x2+x3)>>2.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst; reg [7:0] x_in; wire [7:0] avg_out; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .x_in(x_in), .avg_out(avg_out));
  initial clk=0; always #5 clk=~clk;
  task check; input [7:0] ea; input [127:0] label; begin
    if(avg_out!==ea) begin errors=errors+1; $display("FAIL %0s expected=%d got=%d",label,ea,avg_out); end
    else $display("PASS %0s avg_out=%d",label,avg_out);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; x_in=0; @(posedge clk); #1; check(0,"reset");
    rst=0;
    x_in=8; @(posedge clk); #1; check(2,"sample1");
    x_in=16; @(posedge clk); #1; check(6,"sample2");
    x_in=24; @(posedge clk); #1; check(12,"sample3");
    x_in=32; @(posedge clk); #1; check(20,"sample4-window-full");
    x_in=0; @(posedge clk); #1; check(18,"sample5-window-slides");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'x_in', 'avg_out'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p...........' },
          { name: 'x_in[7:0]', wave: '2.3.4.5.6.7.', data: ['0', '8', '16', '24', '32', '0'] },
          { name: 'avg_out[7:0]', wave: '2.3.4.5.6.7.', data: ['0', '2', '6', '12', '20', '18'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'countdown-timer-with-pause',
      title: 'Countdown Timer with Pause',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'control'],
      category: 'Sequential Design',
      lede: 'A loadable countdown timer that can be paused and resumed mid-count without losing its place — the difference between a real pause and quietly ignoring the pause button.',
      concept: '<b>Concept:</b> A pausable countdown only advances when <code>!pause</code>: <code>if(load) count&lt;=load_val; else if(!pause &amp;&amp; count!=0) count&lt;=count-1;</code>. Dropping the <code>!pause</code> check from that condition (leaving just <code>count!=0</code>) means the pause input is read but never actually gates anything — the countdown keeps ticking straight through, and the bug is invisible unless you specifically test that the count freezes while paused.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>load</td><td>input</td><td>1</td><td>Load load_val into the counter this cycle</td></tr>
<tr><td>pause</td><td>input</td><td>1</td><td>1 freezes the countdown; 0 resumes it</td></tr>
<tr><td>load_val</td><td>input</td><td>8</td><td>Value to load</td></tr>
<tr><td>count</td><td>output</td><td>8</td><td>Current countdown value</td></tr>
<tr><td>done</td><td>output</td><td>1</td><td>Pulses for 1 cycle when the count reaches 0</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  load,
  input  pause,
  input  [7:0] load_val,
  output reg [7:0] count,
  output reg done
);

  // Your code here — load loads load_val; otherwise count down by 1 each cycle unless pause is high.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, load, pause; reg [7:0] load_val; wire [7:0] count; wire done; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .load(load), .pause(pause), .load_val(load_val), .count(count), .done(done));
  initial clk=0; always #5 clk=~clk;
  task check; input [7:0] ec; input ed; input [127:0] label; begin
    if(count!==ec || done!==ed) begin errors=errors+1; $display("FAIL %0s expected count=%d done=%b got count=%d done=%b",label,ec,ed,count,done); end
    else $display("PASS %0s count=%d done=%b",label,count,done);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; load=0; pause=0; load_val=0; @(posedge clk); #1; check(0,0,"reset");
    rst=0; load=1; load_val=8'd3;
    @(posedge clk); #1; check(3,0,"loaded");
    load=0;
    @(posedge clk); #1; check(2,0,"count-down-1");
    pause=1;
    @(posedge clk); #1; check(2,0,"paused-holds");
    @(posedge clk); #1; check(2,0,"still-paused");
    pause=0;
    @(posedge clk); #1; check(1,0,"resumed-count-down");
    @(posedge clk); #1; check(0,1,"done-fires-at-zero");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'load', 'pause', 'load_val', 'count', 'done'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.............' },
          { name: 'load', wave: '0.10..........' },
          { name: 'pause', wave: '0....1...0....' },
          { name: 'count[7:0]', wave: '2.3.4.....5.6.', data: ['0', '3', '2', '1', '0'] },
          { name: 'done', wave: '0...........1.' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'dual-port-ram',
      title: 'True Dual-Port RAM',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'memory'],
      category: 'Sequential Design',
      lede: 'An 8x8 memory with two fully independent read/write ports on the same clock — the structure behind every register file and dual-port block RAM.',
      concept: '<b>Concept:</b> True dual-port RAM means port A and port B can access <em>any</em> two addresses simultaneously, completely independently: each port gets its own write-enable, address, write-data, and registered read-data, all acting on the same underlying memory array. The bug that defeats the entire point is quietly routing port B\'s access through port A\'s address (<code>mem[addr_a]</code> instead of <code>mem[addr_b]</code>) — it still compiles, still looks like two ports, but port B can now only ever see whatever port A happens to be pointing at.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Shared clock for both ports</td></tr>
<tr><td>we_a</td><td>input</td><td>1</td><td>Port A write enable</td></tr>
<tr><td>addr_a</td><td>input</td><td>3</td><td>Port A address</td></tr>
<tr><td>wdata_a</td><td>input</td><td>8</td><td>Port A write data</td></tr>
<tr><td>rdata_a</td><td>output</td><td>8</td><td>Port A registered read data</td></tr>
<tr><td>we_b</td><td>input</td><td>1</td><td>Port B write enable</td></tr>
<tr><td>addr_b</td><td>input</td><td>3</td><td>Port B address</td></tr>
<tr><td>wdata_b</td><td>input</td><td>8</td><td>Port B write data</td></tr>
<tr><td>rdata_b</td><td>output</td><td>8</td><td>Port B registered read data</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  we_a, input [2:0] addr_a, input [7:0] wdata_a, output reg [7:0] rdata_a,
  input  we_b, input [2:0] addr_b, input [7:0] wdata_b, output reg [7:0] rdata_b
);

  // Your code here — 8x8 memory array with two fully independent read/write ports.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk; reg we_a; reg [2:0] addr_a; reg [7:0] wdata_a; wire [7:0] rdata_a;
  reg we_b; reg [2:0] addr_b; reg [7:0] wdata_b; wire [7:0] rdata_b;
  integer errors=0;
  top_module dut(.clk(clk), .we_a(we_a), .addr_a(addr_a), .wdata_a(wdata_a), .rdata_a(rdata_a),
                 .we_b(we_b), .addr_b(addr_b), .wdata_b(wdata_b), .rdata_b(rdata_b));
  initial clk=0; always #5 clk=~clk;
  task check; input [7:0] ea; input [7:0] eb; input [127:0] label; begin
    if(rdata_a!==ea || rdata_b!==eb) begin errors=errors+1; $display("FAIL %0s expected ra=%h rb=%h got ra=%h rb=%h",label,ea,eb,rdata_a,rdata_b); end
    else $display("PASS %0s ra=%h rb=%h",label,rdata_a,rdata_b);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    we_a=1; addr_a=0; wdata_a=8'hAA;
    we_b=1; addr_b=1; wdata_b=8'hBB;
    @(posedge clk); #1;
    we_a=0; we_b=0; addr_a=0; addr_b=1;
    @(posedge clk); #1; check(8'hAA, 8'hBB, "independent-ports-read-back");
    we_a=1; addr_a=2; wdata_a=8'hCC;
    addr_b=0;
    @(posedge clk); #1;
    we_a=0; addr_a=2;
    @(posedge clk); #1; check(8'hCC, 8'hAA, "port-a-write-port-b-read-different-addr");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'we_a', 'addr_a', 'wdata_a', 'rdata_a', 'we_b', 'addr_b', 'wdata_b', 'rdata_b'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.....' },
          { name: 'addr_a[2:0]', wave: '2.....', data: ['0'] },
          { name: 'addr_b[2:0]', wave: '2.....', data: ['1'] },
          { name: 'rdata_a[7:0]', wave: '2.3...', data: ['xx', 'AA'] },
          { name: 'rdata_b[7:0]', wave: '2.3...', data: ['xx', 'BB'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'lru-2way-tracker',
      title: '2-Way LRU Tracker',
      difficulty: 'easy',
      points: 10,
      tags: ['sequential', 'cache'],
      category: 'Sequential Design',
      lede: 'Track which of two cache ways was least recently used with a single bit — the tiny piece of state behind LRU replacement in a 2-way set-associative cache.',
      concept: '<b>Concept:</b> For exactly two ways, LRU tracking needs only one bit: whichever way is <em>not</em> just accessed becomes the LRU candidate: <code>if(access) lru_way &lt;= ~way;</code>. Flipping that to <code>lru_way &lt;= way</code> points the tracker at the way that was just used instead of the one that wasn\'t — a real cache using this bit to pick an eviction victim would then evict the entry it just touched, defeating the entire purpose of LRU.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (lru_way=0)</td></tr>
<tr><td>access</td><td>input</td><td>1</td><td>1 when a cache access happens this cycle</td></tr>
<tr><td>way</td><td>input</td><td>1</td><td>Which way (0 or 1) was accessed</td></tr>
<tr><td>lru_way</td><td>output</td><td>1</td><td>The way that should be evicted next (least recently used)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  access,
  input  way,
  output reg lru_way
);

  // Your code here — on access, the OTHER way becomes the LRU candidate.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, access, way; wire lru_way; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .access(access), .way(way), .lru_way(lru_way));
  initial clk=0; always #5 clk=~clk;
  task check; input el; input [127:0] label; begin
    if(lru_way!==el) begin errors=errors+1; $display("FAIL %0s expected=%b got=%b",label,el,lru_way); end
    else $display("PASS %0s lru_way=%b",label,lru_way);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; access=0; way=0; @(posedge clk); #1; check(0,"reset");
    rst=0; access=1; way=0;
    @(posedge clk); #1; check(1,"way0-accessed-way1-is-lru");
    access=1; way=1;
    @(posedge clk); #1; check(0,"way1-accessed-way0-is-lru");
    access=0;
    @(posedge clk); #1; check(0,"no-access-holds");
    access=1; way=0;
    @(posedge clk); #1; check(1,"way0-accessed-again-way1-lru");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'access', 'way', 'lru_way'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p....' },
          { name: 'access', wave: '01101' },
          { name: 'way', wave: 'x23x4', data: ['0', '1', '0'] },
          { name: 'lru_way', wave: '010.1' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'skid-buffer',
      title: 'Valid/Ready Skid Buffer',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'protocol', 'datapath'],
      category: 'Sequential Design',
      lede: 'Absorb one cycle of downstream backpressure without dropping data — the 1-entry buffer that makes a ready/valid handshake safe to pipeline.',
      concept: '<b>Concept:</b> When downstream stalls (<code>ready_in</code> low) but upstream still has new data waiting, that data has nowhere to go — unless a skid buffer catches it: <code>if(valid_out &amp;&amp; valid_in) begin skid_data&lt;=data_in; skid_valid&lt;=1; end</code>, and <code>ready_out</code> drops to stop upstream from sending more until the skid slot drains. Wiring <code>ready_out</code> straight through to <code>ready_in</code> (skipping the skid logic entirely) looks like a handshake but has no buffering at all — the moment downstream stalls for even one cycle, whatever data arrives that cycle is simply lost, since nothing is holding it.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset</td></tr>
<tr><td>valid_in</td><td>input</td><td>1</td><td>Upstream has data</td></tr>
<tr><td>ready_out</td><td>output</td><td>1</td><td>This buffer can accept new data</td></tr>
<tr><td>data_in</td><td>input</td><td>8</td><td>Upstream data</td></tr>
<tr><td>valid_out</td><td>output</td><td>1</td><td>Data is available downstream</td></tr>
<tr><td>ready_in</td><td>input</td><td>1</td><td>Downstream can accept data</td></tr>
<tr><td>data_out</td><td>output</td><td>8</td><td>Data presented downstream</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  valid_in,
  output ready_out,
  input  [7:0] data_in,
  output reg valid_out,
  input  ready_in,
  output reg [7:0] data_out
);

  // Your code here — 1-entry skid buffer: catch one cycle of new data when downstream stalls, ready_out=0 while it's occupied.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, rst, valid_in, ready_in; reg [7:0] data_in; wire ready_out, valid_out; wire [7:0] data_out;
  integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .valid_in(valid_in), .ready_out(ready_out), .data_in(data_in),
                 .valid_out(valid_out), .ready_in(ready_in), .data_out(data_out));
  initial clk=0; always #5 clk=~clk;
  task check; input ev; input [7:0] ed; input er; input [127:0] label; begin
    if(valid_out!==ev || data_out!==ed || ready_out!==er) begin
      errors=errors+1; $display("FAIL %0s expected valid=%b data=%h ready_out=%b got valid=%b data=%h ready_out=%b",label,ev,ed,er,valid_out,data_out,ready_out);
    end else $display("PASS %0s valid=%b data=%h ready_out=%b",label,valid_out,data_out,ready_out);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; valid_in=0; ready_in=0; data_in=0; @(posedge clk); #1; check(0,8'h00,1,"reset");
    rst=0;
    valid_in=1; data_in=8'hAA; ready_in=1;
    @(posedge clk); #1; check(1,8'hAA,1,"cyc1-passthrough");
    valid_in=1; data_in=8'hBB; ready_in=0;
    @(posedge clk); #1; check(1,8'hAA,0,"cyc2-downstream-stalls-new-data-skidded");
    @(posedge clk); #1; check(1,8'hAA,0,"cyc3-still-stalled-holding");
    ready_in=1;
    @(posedge clk); #1; check(1,8'hBB,1,"cyc4-drains-skid-no-data-lost");
    valid_in=0;
    @(posedge clk); #1; check(0,8'hBB,1,"cyc5-no-more-data");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'valid_in', 'ready_out', 'data_in', 'valid_out', 'ready_in', 'data_out'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.....' },
          { name: 'valid_in', wave: '011110' },
          { name: 'data_in[7:0]', wave: 'x23..x', data: ['AA', 'BB'] },
          { name: 'ready_in', wave: '010011' },
          { name: 'ready_out', wave: '110011' },
          { name: 'valid_out', wave: '011110' },
          { name: 'data_out[7:0]', wave: '23..4.', data: ['00', 'AA', 'BB'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'dual-edge-flip-flop',
      title: 'Dual-Edge-Triggered Flip-Flop',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'fundamentals'],
      category: 'Sequential Design',
      lede: 'Capture data on both the rising and falling edge of the clock — the DDR-style flop behind double-data-rate memory interfaces.',
      concept: '<b>Concept:</b> A regular flip-flop only samples its input on one clock edge; a dual-edge-triggered flop samples on <em>both</em>, doubling the effective data rate for the same clock frequency: <code>always @(posedge clk or negedge clk) q&lt;=d;</code>. Leaving off the <code>or negedge clk</code> half of the sensitivity list silently turns it back into an ordinary single-edge flop — it will still pass any test that only checks rising-edge behavior, and only reveal the bug on a test that specifically checks capture at a falling edge.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>d</td><td>input</td><td>1</td><td>Data input</td></tr>
<tr><td>q</td><td>output</td><td>1</td><td>d, captured on every clock edge (both rising and falling)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  d,
  output reg q
);

  // Your code here — capture d on BOTH posedge and negedge of clk.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk, d; wire q; integer errors=0;
  top_module dut(.clk(clk), .d(d), .q(q));
  initial clk=0; always #5 clk=~clk;
  task check; input eq_; input [127:0] label; begin
    if(q!==eq_) begin errors=errors+1; $display("FAIL %0s expected=%b got=%b",label,eq_,q); end
    else $display("PASS %0s q=%b",label,q);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    d=1; @(posedge clk); #1; check(1,"posedge-capture-1");
    d=0; @(negedge clk); #1; check(0,"negedge-capture-0-proves-dual-edge");
    d=1; @(posedge clk); #1; check(1,"posedge-capture-1-again");
    d=0; @(negedge clk); #1; check(0,"negedge-capture-0-again");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'd', 'q'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: '010101' },
          { name: 'd', wave: '101010' },
          { name: 'q', wave: '010101' }
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
    },
    {
      slug: 'rock-paper-scissors-lizard-spock',
      title: 'Rock Paper Scissors Lizard Spock',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'game-logic'],
      category: 'Fun & Games',
      lede: 'Judge a round of the 5-way expanded rock-paper-scissors from The Big Bang Theory — each move beats exactly two of the other four, so the usual 3-way rule table isn\'t enough.',
      concept: '<b>Concept:</b> Encode each player\'s move as 0=Rock, 1=Paper, 2=Scissors, 3=Lizard, 4=Spock. Every move beats exactly two others (Rock beats Scissors and Lizard; Paper beats Rock and Spock; Scissors beats Paper and Lizard; Lizard beats Spock and Paper; Spock beats Scissors and Rock) — so the cleanest implementation is a direct lookup of p1\'s beats-list against p2, then the reverse check if that fails. A single wrong entry in that beats-list (say, listing Paper instead of Scissors as one of Rock\'s victims) is a real, easy-to-make copy-paste slip — it still compiles and handles most matchups correctly, but silently flips the outcome for that one specific matchup.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>p1</td><td>input</td><td>3</td><td>Player 1's move (0=Rock,1=Paper,2=Scissors,3=Lizard,4=Spock)</td></tr>
<tr><td>p2</td><td>input</td><td>3</td><td>Player 2's move, same encoding</td></tr>
<tr><td>winner</td><td>output</td><td>2</td><td>0=tie, 1=player 1 wins, 2=player 2 wins</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [2:0] p1,
  input  [2:0] p2,
  output [1:0] winner
);

  // Your code here — 0=Rock,1=Paper,2=Scissors,3=Lizard,4=Spock.
  // Each move beats exactly two others. winner: 0=tie, 1=p1 wins, 2=p2 wins.

endmodule
`,
      hiddenTb: `
module tb;
  reg [2:0] p1, p2; wire [1:0] winner; integer errors=0;
  top_module dut(.p1(p1), .p2(p2), .winner(winner));
  task check; input [2:0] a,b; input [1:0] ew; begin
    p1=a; p2=b; #1;
    if(winner!==ew) begin errors=errors+1; $display("FAIL p1=%0d p2=%0d expected=%0d got=%0d",a,b,ew,winner); end
    else $display("PASS p1=%0d p2=%0d winner=%0d",a,b,winner);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(0,2,1);
    check(1,0,1);
    check(2,1,1);
    check(3,4,1);
    check(4,2,1);
    check(0,0,0);
    check(2,0,2);
    check(1,3,2);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['p1', 'p2', 'winner'],
      wavedrom: {
        signal: [
          { name: 'p1[2:0]', wave: '2.3.4.5.', data: ['Rock', 'Paper', 'Lizard', 'Scissors'] },
          { name: 'p2[2:0]', wave: '2.3.4.5.', data: ['Scissors', 'Rock', 'Spock', 'Rock'] },
          { name: 'winner[1:0]', wave: '2.3.4.5.', data: ['1', '1', '1', '2'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'magic-8-ball',
      title: 'Magic 8-Ball Fortune Teller',
      difficulty: 'easy',
      points: 10,
      tags: ['sequential', 'lfsr'],
      category: 'Fun & Games',
      lede: 'Give a "random-feeling" fortune-teller answer on every shake using a self-advancing 3-bit LFSR — a tiny, deterministic taste of pseudo-randomness in hardware.',
      concept: '<b>Concept:</b> A 3-bit Fibonacci LFSR with feedback tap <code>q[2]^q[0]</code> cycles through all 7 nonzero 3-bit states before repeating, giving a fixed but non-obvious-looking sequence of "answers" each time <code>shake</code> pulses: <code>lfsr &lt;= {lfsr[1:0], lfsr[2]^lfsr[0]};</code>. The tap position matters — a 3-bit LFSR has exactly two maximal-length taps (<code>q2^q1</code> and <code>q2^q0</code>), and swapping one for the other still produces a valid-looking cycling pattern, just a completely different (and here, wrong) sequence of answers.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (seeds lfsr to 3'b001)</td></tr>
<tr><td>shake</td><td>input</td><td>1</td><td>1 to shake the ball and advance to the next answer</td></tr>
<tr><td>answer</td><td>output</td><td>3</td><td>Current fortune-teller answer (the raw LFSR state)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  shake,
  output [2:0] answer
);

  // Your code here — 3-bit LFSR, feedback = lfsr[2]^lfsr[0], seed on reset = 3'b001, advances on shake.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk=0, rst, shake; wire [2:0] answer; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .shake(shake), .answer(answer));
  always #5 clk=~clk;
  task check; input [2:0] ea; begin
    if(answer!==ea) begin errors=errors+1; $display("FAIL expected=%b got=%b",ea,answer); end
    else $display("PASS answer=%b",answer);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; shake=0; @(posedge clk); #1; rst=0;
    check(3'b001);
    shake=1; @(posedge clk); #1; check(3'b011);
    @(posedge clk); #1; check(3'b111);
    @(posedge clk); #1; check(3'b110);
    @(posedge clk); #1; check(3'b101);
    @(posedge clk); #1; check(3'b010);
    @(posedge clk); #1; check(3'b100);
    @(posedge clk); #1; check(3'b001);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'shake', 'answer'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.........' },
          { name: 'rst', wave: '10........' },
          { name: 'shake', wave: '0.1.......' },
          { name: 'answer[2:0]', wave: '2.3.4.5.6.', data: ['1', '3', '7', '6', '5'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'hot-potato-token-passer',
      title: 'Hot Potato Token Passer',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'fsm', 'game-logic'],
      category: 'Fun & Games',
      lede: 'Pass a token around a 4-player ring every cycle until a buzzer sounds — whoever\'s holding it when the music stops loses, and the game freezes there.',
      concept: '<b>Concept:</b> The token position advances every cycle (0→1→2→3→0…) until <code>buzzer</code> fires; at that exact moment, whoever currently holds the token is the loser, and the game must freeze (<code>game_over</code>) without advancing the token further: <code>if(buzzer) begin game_over&lt;=1; loser&lt;=token_pos; end else token_pos&lt;=token_pos+1;</code>. A subtle but very real party-game bug is advancing the token unconditionally every cycle and only afterward checking the buzzer — that records the loser as whoever is about to receive the token next, not whoever was actually holding it, quietly declaring the wrong player the loser.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (token_pos=0, game not over)</td></tr>
<tr><td>buzzer</td><td>input</td><td>1</td><td>1 for one cycle to end the round</td></tr>
<tr><td>token_pos</td><td>output</td><td>2</td><td>Which of the 4 players (0-3) currently holds the token</td></tr>
<tr><td>game_over</td><td>output</td><td>1</td><td>1 once the buzzer has fired; freezes state until reset</td></tr>
<tr><td>loser</td><td>output</td><td>2</td><td>The player holding the token the instant the buzzer fired</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  buzzer,
  output reg [1:0] token_pos,
  output reg game_over,
  output reg [1:0] loser
);

  // Your code here — token_pos advances 0,1,2,3,0... each cycle until buzzer fires;
  // at that moment latch loser=token_pos and set game_over, then freeze.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk=0, rst, buzzer; wire [1:0] token_pos; wire game_over; wire [1:0] loser; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .buzzer(buzzer), .token_pos(token_pos), .game_over(game_over), .loser(loser));
  always #5 clk=~clk;
  task check2; input [1:0] etp; input ego; input [1:0] el; input [127:0] label; begin
    if(token_pos!==etp || game_over!==ego || loser!==el) begin errors=errors+1; $display("FAIL %0s expected token_pos=%0d game_over=%b loser=%0d got token_pos=%0d game_over=%b loser=%0d",label,etp,ego,el,token_pos,game_over,loser); end
    else $display("PASS %0s token_pos=%0d game_over=%b loser=%0d",label,token_pos,game_over,loser);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; buzzer=0; @(posedge clk); #1; rst=0;
    check2(0,0,0,"reset");
    @(posedge clk); #1; check2(1,0,0,"pass1");
    @(posedge clk); #1; check2(2,0,0,"pass2");
    @(posedge clk); #1; check2(3,0,0,"pass3");
    buzzer=1; @(posedge clk); #1; check2(3,1,3,"buzzer-freezes-on-holder");
    buzzer=0; @(posedge clk); #1; check2(3,1,3,"frozen-after");
    @(posedge clk); #1; check2(3,1,3,"still-frozen");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'buzzer', 'token_pos', 'game_over', 'loser'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p...........' },
          { name: 'buzzer', wave: '0.......1.0.' },
          { name: 'token_pos[1:0]', wave: '2.3.4.5.....', data: ['0', '1', '2', '3'] },
          { name: 'game_over', wave: '0.........1.' },
          { name: 'loser[1:0]', wave: '2.........3.', data: ['0', '3'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'reaction-game-scorer',
      title: 'Reaction Game Scorer',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'fsm', 'game-logic'],
      category: 'Fun & Games',
      lede: 'Score a simple reflex game: a light comes on, the player presses a button, and the circuit measures how many cycles it took — flagging jumping the gun or dozing off.',
      concept: '<b>Concept:</b> A 3-state FSM (idle → armed → done) times the gap between <code>stimulus</code> and <code>button</code>: pressing before the stimulus is <code>too_early</code>, pressing within the window gives a <code>valid</code> reaction_time, and letting a counter hit a fixed threshold without a press sets <code>too_slow</code>. That timeout check is the easy piece to forget — an implementation that only reacts to <code>button</code> in the armed state and never checks whether the counter has run out will simply wait forever for a press that never comes, silently dropping the entire "too slow" case instead of ever flagging it.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset, returns to idle</td></tr>
<tr><td>stimulus</td><td>input</td><td>1</td><td>Pulses for 1 cycle: the light turns on</td></tr>
<tr><td>button</td><td>input</td><td>1</td><td>1 while the player is pressing the button</td></tr>
<tr><td>reaction_time</td><td>output</td><td>4</td><td>Cycles between stimulus and a valid press</td></tr>
<tr><td>too_slow</td><td>output</td><td>1</td><td>1 if 5 cycles pass after stimulus with no press</td></tr>
<tr><td>too_early</td><td>output</td><td>1</td><td>1 if the button is pressed before any stimulus</td></tr>
<tr><td>valid</td><td>output</td><td>1</td><td>1 once a valid in-window press has been scored</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  stimulus,
  input  button,
  output reg [3:0] reaction_time,
  output reg too_slow,
  output reg too_early,
  output reg valid
);

  // Your code here — idle: too_early if button pressed with no stimulus yet, else move to armed on stimulus.
  // armed: on button, latch reaction_time=cycle count and set valid; if 5 cycles pass with no button, set too_slow.
  // Both outcomes move to a done state that holds until reset.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk=0, rst, stimulus, button; wire [3:0] reaction_time; wire too_slow, too_early, valid; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .stimulus(stimulus), .button(button), .reaction_time(reaction_time), .too_slow(too_slow), .too_early(too_early), .valid(valid));
  always #5 clk=~clk;
  task check3; input erv; input [3:0] ert; input ets; input [127:0] label; begin
    if(valid!==erv || (erv && reaction_time!==ert) || too_slow!==ets) begin errors=errors+1; $display("FAIL %0s expected valid=%b rt=%0d slow=%b got valid=%b rt=%0d slow=%b",label,erv,ert,ets,valid,reaction_time,too_slow); end
    else $display("PASS %0s valid=%b rt=%0d slow=%b",label,valid,reaction_time,too_slow);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; stimulus=0; button=0; @(posedge clk); #1; rst=0;
    stimulus=1; @(posedge clk); #1; stimulus=0;
    @(posedge clk); #1; @(posedge clk); #1; @(posedge clk); #1;
    button=1; @(posedge clk); #1; check3(1,3,0,"valid-press-after-3-cycles");
    button=0;
    rst=1; @(posedge clk); #1; rst=0;
    stimulus=1; @(posedge clk); #1; stimulus=0;
    repeat(6) begin @(posedge clk); #1; end
    check3(0,0,1,"never-pressed-times-out");
    rst=1; @(posedge clk); #1; rst=0;
    button=1; @(posedge clk); #1;
    if(too_early!==1) begin errors=errors+1; $display("FAIL expected too_early=1 got %b",too_early); end
    else $display("PASS too_early=1 pressed-before-stimulus");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'stimulus', 'button', 'reaction_time', 'too_slow', 'too_early', 'valid'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.................' },
          { name: 'stimulus', wave: '0.10..............' },
          { name: 'button', wave: '0.......1.0.......' },
          { name: 'valid', wave: '0.........1.......' },
          { name: 'reaction_time[3:0]', wave: '2.........3.......', data: ['0', '3'] },
          { name: 'too_slow', wave: '0.................' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'space-invaders-collision-detector',
      title: 'Space Invaders Collision Detector',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'comparator'],
      category: 'Fun & Games',
      lede: 'Detect whether a bullet hits an alien: a classic range-overlap check dressed up as retro arcade collision logic.',
      concept: '<b>Concept:</b> The alien occupies a run of cells from <code>alien_x</code> up to (but not including) <code>alien_x+alien_width</code>; the bullet hits when its position falls anywhere in that half-open range: <code>hit = (bullet_x&gt;=alien_x) &amp;&amp; (bullet_x&lt;alien_x+alien_width);</code>. Using <code>&lt;=</code> instead of <code>&lt;</code> for the upper bound is a classic off-by-one in collision detection — it counts one extra cell just past the alien\'s actual right edge as a hit, so a bullet that should whiff right next to the alien registers a phantom collision instead.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>bullet_x</td><td>input</td><td>4</td><td>Bullet's horizontal position (0-15)</td></tr>
<tr><td>alien_x</td><td>input</td><td>4</td><td>Alien's leftmost cell position</td></tr>
<tr><td>alien_width</td><td>input</td><td>3</td><td>How many cells wide the alien is</td></tr>
<tr><td>hit</td><td>output</td><td>1</td><td>1 if bullet_x falls within the alien's occupied cells</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] bullet_x,
  input  [3:0] alien_x,
  input  [2:0] alien_width,
  output hit
);

  // Your code here — hit if alien_x <= bullet_x < alien_x + alien_width.

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] bullet_x, alien_x; reg [2:0] alien_width; wire hit; integer errors=0;
  top_module dut(.bullet_x(bullet_x), .alien_x(alien_x), .alien_width(alien_width), .hit(hit));
  task check; input [3:0] bx, ax; input [2:0] aw; input eh; begin
    bullet_x=bx; alien_x=ax; alien_width=aw; #1;
    if(hit!==eh) begin errors=errors+1; $display("FAIL bullet_x=%0d alien_x=%0d width=%0d expected=%b got=%b",bx,ax,aw,eh,hit); end
    else $display("PASS bullet_x=%0d alien_x=%0d width=%0d hit=%b",bx,ax,aw,hit);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(5,5,3,1);
    check(7,5,3,1);
    check(8,5,3,0);
    check(4,5,3,0);
    check(6,5,3,1);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['bullet_x', 'alien_x', 'alien_width', 'hit'],
      wavedrom: {
        signal: [
          { name: 'bullet_x[3:0]', wave: '2.3.4.5.', data: ['5', '7', '8', '4'] },
          { name: 'alien_x[3:0]', wave: '2.......', data: ['5'] },
          { name: 'alien_width[2:0]', wave: '2.......', data: ['3'] },
          { name: 'hit', wave: '1.1.0.0.' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'quiz-buzzer-lockout',
      title: 'Quiz Show Buzzer Lockout',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'arbiter', 'game-logic'],
      category: 'Fun & Games',
      lede: 'Build a 4-player quiz buzzer: whoever presses first wins and locks out everyone else until the host resets — first-to-press, not round-robin.',
      concept: '<b>Concept:</b> Once any player buzzes in, the system must latch that winner and completely ignore every subsequent buzz until reset: <code>if(!locked &amp;&amp; |buzz) begin locked&lt;=1; winner&lt;=...; end</code>. Simultaneous presses in the same cycle need a fixed tie-break (lowest player index wins here). The critical guard is <code>!locked</code> — drop it and the buzzer keeps updating <code>winner</code> on every later press even after the round is supposedly locked, letting a slower player steal the win from whoever actually buzzed in first.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset, unlocks the buzzer</td></tr>
<tr><td>buzz</td><td>input</td><td>4</td><td>One bit per player; 1 means that player is pressing</td></tr>
<tr><td>winner</td><td>output</td><td>4</td><td>One-hot: which player won the buzz-in (0 if none yet)</td></tr>
<tr><td>locked</td><td>output</td><td>1</td><td>1 once a winner has been latched; ignores buzz until reset</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  [3:0] buzz,
  output reg [3:0] winner,
  output reg locked
);

  // Your code here — first cycle any buzz bit is set (while unlocked), latch a one-hot winner
  // (lowest index wins ties) and set locked; ignore all further buzz activity until reset.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk=0, rst; reg [3:0] buzz; wire [3:0] winner; wire locked; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .buzz(buzz), .winner(winner), .locked(locked));
  always #5 clk=~clk;
  task check; input [3:0] ew; input el; input [127:0] label; begin
    if(winner!==ew || locked!==el) begin errors=errors+1; $display("FAIL %0s expected winner=%b locked=%b got winner=%b locked=%b",label,ew,el,winner,locked); end
    else $display("PASS %0s winner=%b locked=%b",label,winner,locked);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; buzz=0; @(posedge clk); #1; rst=0;
    buzz=4'b0010; @(posedge clk); #1; check(4'b0010,1,"player1-buzzes-first");
    buzz=4'b1000; @(posedge clk); #1; check(4'b0010,1,"locked-ignores-later-buzz");
    rst=1; @(posedge clk); #1; rst=0;
    buzz=4'b0101; @(posedge clk); #1; check(4'b0001,1,"tie-lowest-index-wins");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'buzz', 'winner', 'locked'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'buzz[3:0]', wave: '2.3.4...', data: ['0', '2', '8'] },
          { name: 'winner[3:0]', wave: '2.3.....', data: ['0', '2'] },
          { name: 'locked', wave: '0.1.....' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'tug-of-war-counter',
      title: 'Tug of War Position Tracker',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'counter', 'game-logic'],
      category: 'Fun & Games',
      lede: 'Track the rope\'s position in a tug-of-war: each pull nudges a signed counter one way, and crossing a threshold declares a winner instantly.',
      concept: '<b>Concept:</b> The rope\'s position is a signed up/down counter — team A\'s pull decrements it, team B\'s pull increments it — and the win check must use the position <em>after</em> this cycle\'s pull is applied, not the stale value from before it: compute <code>next_pos</code> combinationally, register <code>position&lt;=next_pos</code>, and check <code>next_pos</code> against the threshold in the same cycle. Checking the old, pre-pull <code>position</code> instead of <code>next_pos</code> is a subtle one-cycle-late bug — the win still gets detected eventually, just one full pull later than it actually happened, so a team can be declared the winner only after over-pulling past the real threshold.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (position=0, winner=none)</td></tr>
<tr><td>pull_a</td><td>input</td><td>1</td><td>Team A pulls this cycle</td></tr>
<tr><td>pull_b</td><td>input</td><td>1</td><td>Team B pulls this cycle</td></tr>
<tr><td>position</td><td>output</td><td>4 (signed)</td><td>Rope position; negative = toward A, positive = toward B</td></tr>
<tr><td>winner</td><td>output</td><td>2</td><td>0=none yet, 1=team A wins, 2=team B wins</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  pull_a,
  input  pull_b,
  output reg signed [3:0] position,
  output reg [1:0] winner
);

  // Your code here — pull_a (only) moves position -1, pull_b (only) moves it +1 (both/neither: no change).
  // Win threshold is +/-3. Check the NEW position (after this cycle's pull) against the threshold, not the old one.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk=0, rst, pull_a, pull_b; wire signed [3:0] position; wire [1:0] winner; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .pull_a(pull_a), .pull_b(pull_b), .position(position), .winner(winner));
  always #5 clk=~clk;
  task check; input signed [3:0] ep; input [1:0] ew; input [127:0] label; begin
    if(position!==ep || winner!==ew) begin errors=errors+1; $display("FAIL %0s expected position=%0d winner=%0d got position=%0d winner=%0d",label,ep,ew,position,winner); end
    else $display("PASS %0s position=%0d winner=%0d",label,position,winner);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; pull_a=0; pull_b=0; @(posedge clk); #1; rst=0;
    pull_a=1; @(posedge clk); #1; check(-1,0,"pull1");
    @(posedge clk); #1; check(-2,0,"pull2");
    @(posedge clk); #1; check(-3,1,"pull3-team-a-wins-same-cycle-it-crosses");
    pull_a=0; @(posedge clk); #1; check(-3,1,"frozen-after-win");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'pull_a', 'pull_b', 'position', 'winner'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.........' },
          { name: 'pull_a', wave: '0.1.....0.' },
          { name: 'position[3:0]', wave: '2.3.4.5...', data: ['0', '-1', '-2', '-3'] },
          { name: 'winner[1:0]', wave: '0.......1.' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'parking-garage-counter',
      title: 'Parking Garage Spot Counter',
      difficulty: 'easy',
      points: 10,
      tags: ['sequential', 'counter'],
      category: 'Fun & Games',
      lede: 'Track available spots in an 8-space garage as cars enter and exit, refusing to go negative when it\'s already full — an up/down counter with real-world guard rails.',
      concept: '<b>Concept:</b> Available spots decrement on <code>car_in</code> and increment on <code>car_out</code>, but only when it\'s safe to do so: never decrement below 0, never increment past capacity. The full flag is simply <code>available==0</code>. Forgetting the <code>available!=0</code> guard on the decrement path means a car_in pulse that arrives while the garage is already full silently underflows the counter to 15 (since it\'s unsigned) instead of holding at 0 — the garage would appear to gain fifteen phantom free spots the instant it should have stayed completely full.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (available=8, garage empty)</td></tr>
<tr><td>car_in</td><td>input</td><td>1</td><td>A car enters this cycle</td></tr>
<tr><td>car_out</td><td>input</td><td>1</td><td>A car exits this cycle</td></tr>
<tr><td>available</td><td>output</td><td>4</td><td>Number of free spots, 0-8</td></tr>
<tr><td>full</td><td>output</td><td>1</td><td>1 when available==0</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  car_in,
  input  car_out,
  output reg [3:0] available,
  output full
);

  // Your code here — capacity is 8. car_in decrements available (never below 0),
  // car_out increments it (never above 8). full = (available==0).

endmodule
`,
      hiddenTb: `
module tb;
  reg clk=0, rst, car_in, car_out; wire [3:0] available; wire full; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .car_in(car_in), .car_out(car_out), .available(available), .full(full));
  always #5 clk=~clk;
  task check; input [3:0] ea; input ef; input [127:0] label; begin
    if(available!==ea || full!==ef) begin errors=errors+1; $display("FAIL %0s expected available=%0d full=%b got available=%0d full=%b",label,ea,ef,available,full); end
    else $display("PASS %0s available=%0d full=%b",label,available,full);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; car_in=0; car_out=0; @(posedge clk); #1; rst=0;
    check(8,0,"reset-empty-garage");
    car_in=1;
    repeat(8) begin @(posedge clk); #1; end
    check(0,1,"garage-now-full");
    @(posedge clk); #1; check(0,1,"extra-car-in-while-full-does-not-underflow");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'car_in', 'car_out', 'available', 'full'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'car_in', wave: '0.1.....' },
          { name: 'available[3:0]', wave: '2.3.4.5.', data: ['8', '7', '6', '0'] },
          { name: 'full', wave: '0.......' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'hamming-distance-calculator',
      title: 'Hamming Distance Calculator',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'error-correction'],
      category: 'Fun & Games',
      lede: 'Count how many bit positions differ between two 8-bit values — the core distance metric behind error-correcting codes like Hamming(7,4).',
      concept: '<b>Concept:</b> XOR marks exactly the bit positions where two values disagree, so the Hamming distance is simply the popcount of <code>a^b</code>: <code>diff=a^b; distance=diff[0]+diff[1]+...+diff[7];</code>. Swapping XOR for AND is an easy bitwise mix-up that produces a real (but wrong) number instead of an obvious error — <code>a&amp;b</code> counts bits that are set in <em>both</em> operands, which is an entirely different quantity that happens to equal zero whenever the two values share no 1-bits at all, masking the bug on plenty of otherwise-reasonable test inputs.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>8</td><td>First value</td></tr>
<tr><td>b</td><td>input</td><td>8</td><td>Second value</td></tr>
<tr><td>distance</td><td>output</td><td>4</td><td>Number of bit positions where a and b differ (0-8)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] a,
  input  [7:0] b,
  output [3:0] distance
);

  // Your code here — distance = popcount(a ^ b).

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] a,b; wire [3:0] distance; integer errors=0;
  top_module dut(.a(a), .b(b), .distance(distance));
  task check; input [7:0] ta, tb_; input [3:0] ed; begin
    a=ta; b=tb_; #1;
    if(distance!==ed) begin errors=errors+1; $display("FAIL a=%b b=%b expected=%0d got=%0d",ta,tb_,ed,distance); end
    else $display("PASS a=%b b=%b distance=%0d",ta,tb_,distance);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(8'b00000000, 8'b00000000, 0);
    check(8'hFF, 8'h00, 8);
    check(8'b10110000, 8'b10100001, 2);
    check(8'b11110000, 8'b00001111, 8);
    check(8'b10101010, 8'b10101010, 0);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'distance'],
      wavedrom: {
        signal: [
          { name: 'a[7:0]', wave: '2.3.4.5.', data: ['00', 'FF', 'B0', 'F0'] },
          { name: 'b[7:0]', wave: '2.3.4.5.', data: ['00', '00', 'A1', '0F'] },
          { name: 'distance[3:0]', wave: '2.3.4.5.', data: ['0', '8', '2', '8'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'slot-machine-jackpot-detector',
      title: 'Slot Machine Jackpot Detector',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'comparator'],
      category: 'Fun & Games',
      lede: 'Judge a 3-reel slot machine spin: jackpot when all three reels match, a smaller near-miss flag when exactly two do.',
      concept: '<b>Concept:</b> A true jackpot requires <em>all three</em> reels to agree: <code>jackpot=(reel1==reel2)&amp;&amp;(reel2==reel3);</code>, with <code>two_match</code> catching the near-miss case where only some pair agrees. The easy mistake is checking only one pair (say <code>reel1==reel2</code>) and calling that the jackpot condition — it correctly fires when all three genuinely match, but it also fires whenever just the first two happen to match and the third is completely different, awarding a jackpot for what should only ever be a two-reel near-miss.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>reel1</td><td>input</td><td>3</td><td>First reel's symbol (0-7)</td></tr>
<tr><td>reel2</td><td>input</td><td>3</td><td>Second reel's symbol</td></tr>
<tr><td>reel3</td><td>input</td><td>3</td><td>Third reel's symbol</td></tr>
<tr><td>jackpot</td><td>output</td><td>1</td><td>1 if all three reels match</td></tr>
<tr><td>two_match</td><td>output</td><td>1</td><td>1 if exactly two (not all three) reels match</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [2:0] reel1,
  input  [2:0] reel2,
  input  [2:0] reel3,
  output jackpot,
  output two_match
);

  // Your code here — jackpot if all three reels are equal; two_match if any pair matches but not all three.

endmodule
`,
      hiddenTb: `
module tb;
  reg [2:0] reel1, reel2, reel3; wire jackpot, two_match; integer errors=0;
  top_module dut(.reel1(reel1), .reel2(reel2), .reel3(reel3), .jackpot(jackpot), .two_match(two_match));
  task check; input [2:0] r1,r2,r3; input ej, etm; begin
    reel1=r1; reel2=r2; reel3=r3; #1;
    if(jackpot!==ej || two_match!==etm) begin errors=errors+1; $display("FAIL reels=%0d,%0d,%0d expected jackpot=%b two_match=%b got jackpot=%b two_match=%b",r1,r2,r3,ej,etm,jackpot,two_match); end
    else $display("PASS reels=%0d,%0d,%0d jackpot=%b two_match=%b",r1,r2,r3,jackpot,two_match);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(3,3,3,1,0);
    check(3,3,5,0,1);
    check(3,5,3,0,1);
    check(1,2,3,0,0);
    check(5,3,3,0,1);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['reel1', 'reel2', 'reel3', 'jackpot', 'two_match'],
      wavedrom: {
        signal: [
          { name: 'reel1[2:0]', wave: '2.3.4.5.', data: ['3', '3', '3', '1'] },
          { name: 'reel2[2:0]', wave: '2.......', data: ['3'] },
          { name: 'reel3[2:0]', wave: '2.3.....', data: ['3', '5'] },
          { name: 'jackpot', wave: '1.0.....' },
          { name: 'two_match', wave: '0.1.....' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'carry-select-adder-4bit',
      title: '4-Bit Carry-Select Adder',
      difficulty: 'hard',
      points: 50,
      tags: ['combinational', 'arithmetic', 'architecture'],
      category: 'Combinational Design',
      lede: 'Speed up addition by precomputing the upper half twice — once assuming carry-in 0, once assuming carry-in 1 — then muxing in whichever guess turned out right, instead of waiting for the carry to ripple through.',
      concept: '<b>Concept:</b> A carry-select adder splits the word into blocks; each upper block computes its sum <em>twice in parallel</em> (once for cin=0, once for cin=1) while the lower block\'s real carry is still being resolved, then a mux instantly picks the correct precomputed result once that carry arrives — trading duplicated hardware for a shorter critical path than a full ripple-carry chain. The whole trick lives in the mux select: <code>sum[3:2] = c1 ? sum1_hi : sum0_hi;</code>. Inverting that select (<code>~c1</code> instead of <code>c1</code>) silently swaps in the <em>wrong</em> precomputed half every single time — it still compiles and still looks like a mux-based adder, it just always guesses backwards.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>4</td><td>First operand</td></tr>
<tr><td>b</td><td>input</td><td>4</td><td>Second operand</td></tr>
<tr><td>cin</td><td>input</td><td>1</td><td>Carry in</td></tr>
<tr><td>sum</td><td>output</td><td>4</td><td>a + b + cin</td></tr>
<tr><td>cout</td><td>output</td><td>1</td><td>Carry out</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] a,
  input  [3:0] b,
  input  cin,
  output [3:0] sum,
  output cout
);

  // Your code here — lower 2 bits add normally with cin; upper 2 bits are computed
  // TWICE (once assuming the lower carry is 0, once assuming it's 1), then muxed
  // by the real lower carry once it's known.

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] a,b; reg cin; wire [3:0] sum; wire cout; integer errors=0;
  top_module dut(.a(a),.b(b),.cin(cin),.sum(sum),.cout(cout));
  task check; input [3:0] ta,tb_; input tc; input [3:0] es; input ec; begin
    a=ta;b=tb_;cin=tc;#1;
    if(sum!==es||cout!==ec) begin errors=errors+1; $display("FAIL a=%d b=%d cin=%b expected sum=%d cout=%b got sum=%d cout=%b",ta,tb_,tc,es,ec,sum,cout); end
    else $display("PASS a=%d b=%d cin=%b sum=%d cout=%b",ta,tb_,tc,sum,cout);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(4'd7,4'd1,0,4'd8,0);
    check(4'd15,4'd1,0,4'd0,1);
    check(4'd3,4'd4,1,4'd8,0);
    check(4'd8,4'd8,0,4'd0,1);
    check(4'd0,4'd0,1,4'd1,0);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'cin', 'sum', 'cout'],
      wavedrom: {
        signal: [
          { name: 'a[3:0]', wave: '2.3.4.5.', data: ['7', '15', '3', '8'] },
          { name: 'b[3:0]', wave: '2.3.4.5.', data: ['1', '1', '4', '8'] },
          { name: 'cin', wave: '0.0.1.0.' },
          { name: 'sum[3:0]', wave: '2.3.4.5.', data: ['8', '0', '8', '0'] },
          { name: 'cout', wave: '0.1.0.1.' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'booth-radix4-encoder',
      title: 'Radix-4 Booth Encoder',
      difficulty: 'hard',
      points: 50,
      tags: ['combinational', 'arithmetic', 'multiplier'],
      category: 'Combinational Design',
      lede: 'The lookup table at the heart of every fast hardware multiplier: examine 3 overlapping bits of the multiplier and decide whether to add 0, ±1x, or ±2x of the multiplicand this cycle — halving the number of partial products versus naive shift-and-add.',
      concept: '<b>Concept:</b> Radix-4 Booth encoding slides a 3-bit window (one bit higher, current, one bit lower) across the multiplier and classifies each window into one of 5 actions: add 0, add/sub 1x, or add/sub 2x the multiplicand — so a multiplier only needs half as many partial-product rows as a plain shift-and-add design. The full 8-entry table is: 000→0, 001/010→+1x, 011→+2x, 100→−2x, 101/110→−1x, 111→0. The easy way to get this wrong is swapping which pattern gets the ×1 weight and which gets the ×2 weight — e.g. encoding <code>011</code> (which should be +2x, since it\'s the boundary where two isolated 1-bits look like a single run ending) as +1x instead. It still produces a plausible-looking partial product, just the wrong magnitude.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>bHigh</td><td>input</td><td>1</td><td>Multiplier bit i+1 (the higher neighbor)</td></tr>
<tr><td>bCur</td><td>input</td><td>1</td><td>Multiplier bit i (the current bit)</td></tr>
<tr><td>bLow</td><td>input</td><td>1</td><td>Multiplier bit i-1 (the lower neighbor)</td></tr>
<tr><td>neg</td><td>output</td><td>1</td><td>1 if this partial product should be subtracted</td></tr>
<tr><td>one_x</td><td>output</td><td>1</td><td>1 if the multiplicand should be added/subtracted at 1x</td></tr>
<tr><td>two_x</td><td>output</td><td>1</td><td>1 if the multiplicand should be added/subtracted at 2x</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  bHigh,
  input  bCur,
  input  bLow,
  output neg,
  output one_x,
  output two_x
);

  // Your code here — classic radix-4 Booth table on {bHigh,bCur,bLow}:
  // 000->0, 001/010->+1x, 011->+2x, 100->-2x, 101/110->-1x, 111->0.

endmodule
`,
      hiddenTb: `
module tb;
  reg bHigh,bCur,bLow; wire neg,one_x,two_x; integer errors=0;
  top_module dut(.bHigh(bHigh),.bCur(bCur),.bLow(bLow),.neg(neg),.one_x(one_x),.two_x(two_x));
  task check; input h,c,l; input en,eo,et; begin
    bHigh=h;bCur=c;bLow=l;#1;
    if(neg!==en||one_x!==eo||two_x!==et) begin errors=errors+1; $display("FAIL %b%b%b expected neg=%b one_x=%b two_x=%b got neg=%b one_x=%b two_x=%b",h,c,l,en,eo,et,neg,one_x,two_x); end
    else $display("PASS %b%b%b neg=%b one_x=%b two_x=%b",h,c,l,neg,one_x,two_x);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(0,0,0, 0,0,0);
    check(0,0,1, 0,1,0);
    check(0,1,0, 0,1,0);
    check(0,1,1, 0,0,1);
    check(1,0,0, 1,0,1);
    check(1,0,1, 1,1,0);
    check(1,1,0, 1,1,0);
    check(1,1,1, 0,0,0);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['bHigh', 'bCur', 'bLow', 'neg', 'one_x', 'two_x'],
      wavedrom: {
        signal: [
          { name: 'bHigh', wave: '0.0.1.1.' },
          { name: 'bCur', wave: '0.1.0.1.' },
          { name: 'bLow', wave: '0.1.0.1.' },
          { name: 'neg', wave: '0...1...' },
          { name: 'one_x', wave: '0.1...0.' },
          { name: 'two_x', wave: '0...1.0.' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'absolute-value-4bit',
      title: 'Signed Absolute Value (4-bit)',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'arithmetic', 'signed'],
      category: 'Combinational Design',
      lede: 'Negate a signed 4-bit number to get its magnitude — except for the one input where negating it doesn\'t fit back into 4 bits at all.',
      concept: '<b>Concept:</b> In 4-bit two\'s complement, values range from -8 to +7 — so -8 has no positive counterpart that fits in 4 bits (+8 needs 5 bits). A correct absolute-value circuit must special-case exactly that value, typically saturating to the largest representable positive number, +7: <code>if(in==-8) out=7; else out = in[3] ? -in : in;</code>. Skipping that special case doesn\'t crash anything — <code>-(-8)</code> silently overflows and wraps back around to <code>-8</code> in 4-bit arithmetic, so the "absolute value" of the most negative number comes out negative, which is exactly the kind of overflow bug that slips past testing on every input except that one.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>in</td><td>input</td><td>4 (signed)</td><td>Signed input, -8 to +7</td></tr>
<tr><td>out</td><td>output</td><td>4 (signed)</td><td>|in|, saturated to 7 when in==-8</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  signed [3:0] in,
  output signed [3:0] out
);

  // Your code here — out = |in|, except in==-8 (which can't negate into 4 bits) saturates to 7.

endmodule
`,
      hiddenTb: `
module tb;
  reg signed [3:0] in; wire signed [3:0] out; integer errors=0;
  top_module dut(.in(in), .out(out));
  task check; input signed [3:0] i; input signed [3:0] eo; begin
    in=i;#1;
    if(out!==eo) begin errors=errors+1; $display("FAIL in=%d expected=%d got=%d",i,eo,out); end
    else $display("PASS in=%d out=%d",i,out);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(5,5);
    check(-5,5);
    check(-8,7);
    check(0,0);
    check(-1,1);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['in', 'out'],
      wavedrom: {
        signal: [
          { name: 'in[3:0]', wave: '2.3.4.5.', data: ['5', '-5', '-8', '-1'] },
          { name: 'out[3:0]', wave: '2.3.4.5.', data: ['5', '5', '7', '1'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'clamp-value-to-range',
      title: 'Clamp Value to Range',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'datapath'],
      category: 'Combinational Design',
      lede: 'Saturate a value into [lo, hi] — the single most-used guard clause in DSP, graphics, and safety-critical datapaths.',
      concept: '<b>Concept:</b> Clamping is a two-sided saturation: below <code>lo</code>, output <code>lo</code>; above <code>hi</code>, output <code>hi</code>; otherwise pass the value through unchanged: <code>(value&lt;lo)?lo:(value&gt;hi)?hi:value</code>. Swapping which bound gets returned on each side — clamping too-small values up to <code>hi</code> instead of <code>lo</code>, and too-large values down to <code>lo</code> instead of <code>hi</code> — is a realistic copy-paste mix-up. It still saturates the output into range on out-of-bounds inputs, just to the exact opposite end of the range from what was intended.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>value</td><td>input</td><td>8</td><td>Value to clamp</td></tr>
<tr><td>lo</td><td>input</td><td>8</td><td>Lower bound (assume lo &le; hi)</td></tr>
<tr><td>hi</td><td>input</td><td>8</td><td>Upper bound</td></tr>
<tr><td>clamped</td><td>output</td><td>8</td><td>value, saturated into [lo, hi]</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] value,
  input  [7:0] lo,
  input  [7:0] hi,
  output [7:0] clamped
);

  // Your code here — clamped = lo if value<lo, hi if value>hi, else value.

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] value, lo, hi; wire [7:0] clamped; integer errors=0;
  top_module dut(.value(value), .lo(lo), .hi(hi), .clamped(clamped));
  task check; input [7:0] v,l,h; input [7:0] ec; begin
    value=v;lo=l;hi=h;#1;
    if(clamped!==ec) begin errors=errors+1; $display("FAIL value=%d lo=%d hi=%d expected=%d got=%d",v,l,h,ec,clamped); end
    else $display("PASS value=%d lo=%d hi=%d clamped=%d",v,l,h,clamped);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(50,10,100,50);
    check(5,10,100,10);
    check(150,10,100,100);
    check(10,10,100,10);
    check(100,10,100,100);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['value', 'lo', 'hi', 'clamped'],
      wavedrom: {
        signal: [
          { name: 'value[7:0]', wave: '2.3.4.', data: ['50', '5', '150'] },
          { name: 'lo[7:0]', wave: '2.....', data: ['10'] },
          { name: 'hi[7:0]', wave: '2.....', data: ['100'] },
          { name: 'clamped[7:0]', wave: '2.3.4.', data: ['50', '10', '100'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'integer-square-root-4bit',
      title: 'Integer Square Root',
      difficulty: 'medium',
      points: 25,
      tags: ['combinational', 'arithmetic'],
      category: 'Combinational Design',
      lede: 'Compute floor(sqrt(in)) for an 8-bit input using a bank of perfect-square threshold comparisons — no division, no iteration.',
      concept: '<b>Concept:</b> Since the output only ranges 0-15, floor(sqrt(in)) can be computed by comparing <code>in</code> against each perfect square 1,4,9,...,225 and picking the largest root whose square doesn\'t exceed it: <code>(in&gt;=225)?15:(in&gt;=196)?14:...:(in&gt;=1)?1:0</code>. Using strict <code>&gt;</code> instead of <code>&gt;=</code> at every threshold is a tempting-looking equivalent that is actually an off-by-one everywhere a perfect square lands exactly on a threshold: sqrt(4) should be 2, but <code>4&gt;4</code> is false, so it falls through to the next lower bracket and reports 1 instead.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>in</td><td>input</td><td>8</td><td>Input value, 0-255</td></tr>
<tr><td>root</td><td>output</td><td>4</td><td>floor(sqrt(in)), 0-15</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] in,
  output [3:0] root
);

  // Your code here — root = floor(sqrt(in)) via a cascade of perfect-square comparisons.

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] in; wire [3:0] root; integer errors=0;
  top_module dut(.in(in), .root(root));
  task check; input [7:0] i; input [3:0] er; begin
    in=i;#1;
    if(root!==er) begin errors=errors+1; $display("FAIL in=%d expected=%d got=%d",i,er,root); end
    else $display("PASS in=%d root=%d",i,root);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(0,0);
    check(1,1);
    check(4,2);
    check(15,3);
    check(16,4);
    check(99,9);
    check(225,15);
    check(255,15);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['in', 'root'],
      wavedrom: {
        signal: [
          { name: 'in[7:0]', wave: '2.3.4.5.', data: ['1', '4', '16', '225'] },
          { name: 'root[3:0]', wave: '2.3.4.5.', data: ['1', '2', '4', '15'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'crc8-generator',
      title: 'CRC-8 Generator (poly 0x07)',
      difficulty: 'hard',
      points: 50,
      tags: ['combinational', 'error-correction', 'protocol'],
      category: 'Protocols &amp; Interfaces',
      lede: 'Compute an 8-bit CRC over a byte using the classic 0x07 polynomial (CRC-8-CCITT) — the same bit-serial algorithm behind this catalog\'s CRC-4, scaled up to a full byte.',
      concept: '<b>Concept:</b> A bit-serial CRC-8 shifts one bit of the message into an 8-bit register at a time, MSB first: <code>fb=crc[7]^bit; crc=crc&lt;&lt;1; if(fb) crc^=8\'h07;</code>, repeated once per input bit. The bit order is the entire algorithm — process the same 8 bits LSB-first instead of MSB-first (an easy mix-up when unrolling the loop) and every single-byte CRC comes out completely different, even though the taps, the polynomial, and the number of iterations are all identical.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>data</td><td>input</td><td>8</td><td>Message byte</td></tr>
<tr><td>crc</td><td>output</td><td>8</td><td>CRC-8 remainder (poly x&#8312;+x&#178;+x+1, init 0)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] data,
  output [7:0] crc
);

  // Your code here — bit-serial CRC-8 (poly 0x07), processing data MSB-first:
  // fb=crc[7]^bit; crc<<=1; if(fb) crc^=8'h07.

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] data; wire [7:0] crc; integer errors=0;
  top_module dut(.data(data), .crc(crc));
  task check; input [7:0] d; input [7:0] ec; begin
    data=d;#1;
    if(crc!==ec) begin errors=errors+1; $display("FAIL data=%h expected=%h got=%h",d,ec,crc); end
    else $display("PASS data=%h crc=%h",d,crc);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(8'h00, 8'h00);
    check(8'hFF, 8'hF3);
    check(8'hA5, 8'h72);
    check(8'h3C, 8'hB4);
    check(8'h01, 8'h07);
    check(8'h80, 8'h89);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['data', 'crc'],
      wavedrom: {
        signal: [
          { name: 'data[7:0]', wave: '2.3.4.5.', data: ['00', 'FF', 'A5', '01'] },
          { name: 'crc[7:0]', wave: '2.3.4.5.', data: ['00', 'F3', '72', '07'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'numerically-controlled-oscillator',
      title: 'Numerically Controlled Oscillator (NCO)',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'clock-generation'],
      category: 'Sequential Design',
      lede: 'Generate a square wave of a programmable frequency from one fixed clock, using nothing but a free-running phase accumulator — the same trick behind DDS frequency synthesizers.',
      concept: '<b>Concept:</b> A phase accumulator just adds <code>phase_inc</code> to itself every clock and lets it wrap freely; the accumulator\'s <em>top bit</em> toggles at a rate proportional to <code>phase_inc</code>, giving a frequency-programmable square wave with zero extra hardware: <code>phase_acc &lt;= phase_acc + phase_inc; out = phase_acc[7];</code>. The output tap is the whole design — reading any bit other than the MSB (say, the LSB) still compiles and still looks like it\'s toggling, but it toggles at a wildly different (and usually much higher, noisier) rate that has nothing to do with the intended output frequency.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (phase_acc=0)</td></tr>
<tr><td>phase_inc</td><td>input</td><td>8</td><td>Phase increment per clock (controls output frequency)</td></tr>
<tr><td>out</td><td>output</td><td>1</td><td>Generated square wave (MSB of the phase accumulator)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  [7:0] phase_inc,
  output out
);

  // Your code here — free-running 8-bit phase accumulator; out = its MSB.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk=0, rst; reg [7:0] phase_inc; wire out; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .phase_inc(phase_inc), .out(out));
  always #5 clk=~clk;
  task check; input eo; input [127:0] label; begin
    if(out!==eo) begin errors=errors+1; $display("FAIL %0s expected=%b got=%b",label,eo,out); end
    else $display("PASS %0s out=%b",label,out);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; phase_inc=0; @(posedge clk); #1; rst=0;
    phase_inc=8'd64;
    @(posedge clk); #1; check(0,"acc=64");
    @(posedge clk); #1; check(1,"acc=128");
    @(posedge clk); #1; check(1,"acc=192");
    @(posedge clk); #1; check(0,"acc=0-wrap");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'phase_inc', 'out'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'phase_inc[7:0]', wave: '2.......', data: ['64'] },
          { name: 'out', wave: '0.1...0.' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'spi-mode-selector',
      title: 'SPI Mode Selector (CPOL/CPHA)',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'protocol'],
      category: 'Protocols &amp; Interfaces',
      lede: 'Decode SPI\'s 4 clocking modes from CPOL and CPHA into the two facts a controller actually needs: what the clock idles at, and which edge samples data.',
      concept: '<b>Concept:</b> CPOL sets the clock\'s idle level directly (<code>idle_clock=cpol</code>). Which edge samples data is a clean XOR of the two: <code>sample_edge = cpol ^ cpha</code> (0=rising, 1=falling) — a fact worth knowing cold rather than re-deriving from the mode table every time. Swapping that XOR for an AND is a very plausible boolean slip: it happens to agree with the correct answer for modes 0 and... no, it actually gets 3 of the 4 modes wrong, because AND and XOR only ever agree when both inputs are 0.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>cpol</td><td>input</td><td>1</td><td>Clock polarity (0=idle low, 1=idle high)</td></tr>
<tr><td>cpha</td><td>input</td><td>1</td><td>Clock phase (0=sample on first edge, 1=sample on second)</td></tr>
<tr><td>idle_clock</td><td>output</td><td>1</td><td>Clock's idle level</td></tr>
<tr><td>sample_edge</td><td>output</td><td>1</td><td>0=sample on rising edge, 1=sample on falling edge</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  cpol,
  input  cpha,
  output idle_clock,
  output sample_edge
);

  // Your code here — idle_clock = cpol; sample_edge = cpol ^ cpha.

endmodule
`,
      hiddenTb: `
module tb;
  reg cpol,cpha; wire idle_clock, sample_edge; integer errors=0;
  top_module dut(.cpol(cpol),.cpha(cpha),.idle_clock(idle_clock),.sample_edge(sample_edge));
  task check; input c1,c2; input ei,es; begin
    cpol=c1;cpha=c2;#1;
    if(idle_clock!==ei||sample_edge!==es) begin errors=errors+1; $display("FAIL cpol=%b cpha=%b expected idle=%b sample=%b got idle=%b sample=%b",c1,c2,ei,es,idle_clock,sample_edge); end
    else $display("PASS cpol=%b cpha=%b idle=%b sample=%b",c1,c2,idle_clock,sample_edge);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(0,0, 0,0);
    check(0,1, 0,1);
    check(1,0, 1,1);
    check(1,1, 1,0);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['cpol', 'cpha', 'idle_clock', 'sample_edge'],
      wavedrom: {
        signal: [
          { name: 'cpol', wave: '0.0.1.1.' },
          { name: 'cpha', wave: '0.1.0.1.' },
          { name: 'idle_clock', wave: '0...1...' },
          { name: 'sample_edge', wave: '0.1.1.0.' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'direct-mapped-cache-lookup',
      title: 'Direct-Mapped Cache Lookup',
      difficulty: 'hard',
      points: 50,
      tags: ['sequential', 'memory', 'cache'],
      category: 'Sequential Design',
      lede: 'A 4-line direct-mapped cache that auto-allocates on a miss — the tag-compare-and-fill loop every real cache runs, shrunk down to something you can trace by hand.',
      concept: '<b>Concept:</b> Each address splits into an index (which line it maps to) and a tag (which of the many possible blocks currently occupies that line). A hit requires <em>both</em> the line to hold valid data <em>and</em> its stored tag to match: <code>hit = access &amp;&amp; valid[idx] &amp;&amp; (tag_store[idx]==tag)</code>. Dropping the <code>valid</code> check is a genuinely dangerous real-world bug, not just a cosmetic one: an uninitialized or just-reset tag array reads back as some fixed value (often all-zero), so any address whose tag happens to equal that value reports a false hit against a line that was never actually filled — silently returning garbage as if it were valid cached data.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (invalidates all 4 lines)</td></tr>
<tr><td>access</td><td>input</td><td>1</td><td>1 to perform a lookup this cycle</td></tr>
<tr><td>addr</td><td>input</td><td>4</td><td>addr[1:0]=index (which line), addr[3:2]=tag</td></tr>
<tr><td>hit</td><td>output</td><td>1</td><td>1 if the line is valid and its tag matches</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  access,
  input  [3:0] addr,
  output hit
);

  // Your code here — 4-line direct-mapped cache: addr[1:0]=index, addr[3:2]=tag.
  // hit = access && valid[index] && tag_store[index]==tag.
  // On a miss (access && !hit), synchronously allocate: tag_store[index]<=tag; valid[index]<=1.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk=0, rst, access; reg [3:0] addr; wire hit; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .access(access), .addr(addr), .hit(hit));
  always #5 clk=~clk;
  task check; input eh; input [127:0] label; begin
    if(hit!==eh) begin errors=errors+1; $display("FAIL %0s expected hit=%b got=%b",label,eh,hit); end
    else $display("PASS %0s hit=%b",label,hit);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; access=0; addr=0; @(posedge clk); #1; rst=0;
    access=1; addr=4'b0001; #1; check(0,"first-access-tag0-idx1-must-miss-despite-tagstore-default-0");
    @(posedge clk); #1;
    access=1; addr=4'b0001; #1; check(1,"second-access-same-addr-now-hits-after-allocate");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'access', 'addr', 'hit'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.....' },
          { name: 'access', wave: '0.1...' },
          { name: 'addr[3:0]', wave: '2.3...', data: ['0', '1'] },
          { name: 'hit', wave: '0...1.' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'content-addressable-memory-4entry',
      title: '4-Entry Content-Addressable Memory (CAM)',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'memory'],
      category: 'Sequential Design',
      lede: 'Search all 4 stored entries in parallel for a key — the associative-lookup structure behind TLBs and packet-classification hardware.',
      concept: '<b>Concept:</b> A CAM compares the search key against <em>every</em> stored entry simultaneously, producing a one-hot(ish) match vector; <code>found</code> is simply whether <em>any</em> entry matched: <code>found = |match</code>. Using <code>&amp;</code> (AND-reduce) instead of <code>|</code> (OR-reduce) is a classic reduction-operator mix-up — it silently redefines "found" to mean "every single entry matches the key," which is only ever true in the degenerate case where all 4 entries happen to hold the same value, making the CAM report "not found" for essentially every real search.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>entry0</td><td>input</td><td>4</td><td>Stored entry 0</td></tr>
<tr><td>entry1</td><td>input</td><td>4</td><td>Stored entry 1</td></tr>
<tr><td>entry2</td><td>input</td><td>4</td><td>Stored entry 2</td></tr>
<tr><td>entry3</td><td>input</td><td>4</td><td>Stored entry 3</td></tr>
<tr><td>search_key</td><td>input</td><td>4</td><td>Key to search for</td></tr>
<tr><td>match</td><td>output</td><td>4</td><td>match[i]=1 if entry i equals search_key</td></tr>
<tr><td>found</td><td>output</td><td>1</td><td>1 if any entry matched</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] entry0,
  input  [3:0] entry1,
  input  [3:0] entry2,
  input  [3:0] entry3,
  input  [3:0] search_key,
  output [3:0] match,
  output found
);

  // Your code here — match[i] = (entry_i == search_key) for each of the 4 entries; found = |match.

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] entry0,entry1,entry2,entry3,search_key; wire [3:0] match; wire found; integer errors=0;
  top_module dut(.entry0(entry0),.entry1(entry1),.entry2(entry2),.entry3(entry3),.search_key(search_key),.match(match),.found(found));
  task check; input [3:0] e0,e1,e2,e3,sk; input [3:0] em; input ef; begin
    entry0=e0;entry1=e1;entry2=e2;entry3=e3;search_key=sk;#1;
    if(match!==em||found!==ef) begin errors=errors+1; $display("FAIL search=%d expected match=%b found=%b got match=%b found=%b",sk,em,ef,match,found); end
    else $display("PASS search=%d match=%b found=%b",sk,match,found);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(3,7,3,9, 3, 4'b0101, 1);
    check(3,7,3,9, 5, 4'b0000, 0);
    check(1,2,3,4, 4, 4'b1000, 1);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['entry0', 'entry1', 'entry2', 'entry3', 'search_key', 'match', 'found'],
      wavedrom: {
        signal: [
          { name: 'search_key[3:0]', wave: '2.3.4.', data: ['3', '5', '4'] },
          { name: 'match[3:0]', wave: '2.3.4.', data: ['5', '0', '8'] },
          { name: 'found', wave: '1.0.1.' }
        ],
        config: { hscale: 1 }
      }
    },
    {
      slug: 'register-file-3read-1write',
      title: '3-Read / 1-Write Register File',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'memory', 'datapath'],
      category: 'Sequential Design',
      lede: 'The classic RTL building block behind every processor datapath: 8 registers, one synchronous write port, and three fully independent asynchronous read ports.',
      concept: '<b>Concept:</b> A register file\'s read ports are almost always <em>combinational</em> — <code>assign rdata1=regs[raddr1]</code> — so a freshly-written value is visible to a read the very same cycle it commits, with no extra latency. Accidentally registering the read path (adding a clocked flop between the memory array and the output) is a very common real bug, and a sneaky one: it doesn\'t break anything obviously, it just delays every read by exactly one clock cycle, so a value written this cycle silently isn\'t visible until the cycle after — a timing bug that only shows up when something downstream expects same-cycle forwarding.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>we</td><td>input</td><td>1</td><td>Write enable</td></tr>
<tr><td>waddr</td><td>input</td><td>3</td><td>Write address (0-7)</td></tr>
<tr><td>wdata</td><td>input</td><td>8</td><td>Write data</td></tr>
<tr><td>raddr1/2/3</td><td>input</td><td>3 each</td><td>Three independent read addresses</td></tr>
<tr><td>rdata1/2/3</td><td>output</td><td>8 each</td><td>Combinational read data for each port</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  we, input [2:0] waddr, input [7:0] wdata,
  input  [2:0] raddr1, output [7:0] rdata1,
  input  [2:0] raddr2, output [7:0] rdata2,
  input  [2:0] raddr3, output [7:0] rdata3
);

  // Your code here — 8x8 register array; synchronous write on we; three combinational (asynchronous) reads.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk=0, we; reg [2:0] waddr, raddr1, raddr2, raddr3; reg [7:0] wdata;
  wire [7:0] rdata1, rdata2, rdata3; integer errors=0;
  top_module dut(.clk(clk), .we(we), .waddr(waddr), .wdata(wdata),
                 .raddr1(raddr1), .rdata1(rdata1), .raddr2(raddr2), .rdata2(rdata2), .raddr3(raddr3), .rdata3(rdata3));
  always #5 clk=~clk;
  task check; input [7:0] er1; input [127:0] label; begin
    if(rdata1!==er1) begin errors=errors+1; $display("FAIL %0s expected rdata1=%h got=%h",label,er1,rdata1); end
    else $display("PASS %0s rdata1=%h",label,rdata1);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    we=0; waddr=0; wdata=0; raddr1=2; raddr2=0; raddr3=0;
    we=1; waddr=2; wdata=8'hAA;
    @(posedge clk); #1; check(8'hAA,"combinational-read-sees-fresh-write-immediately");
    we=0;
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'we', 'waddr', 'wdata', 'raddr1', 'rdata1'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p...' },
          { name: 'we', wave: '01..' },
          { name: 'waddr[2:0]', wave: '2...', data: ['2'] },
          { name: 'wdata[7:0]', wave: '2...', data: ['AA'] },
          { name: 'raddr1[2:0]', wave: '2...', data: ['2'] },
          { name: 'rdata1[7:0]', wave: '2.3.', data: ['xx', 'AA'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'bit-interleaver',
      title: 'Bit Interleaver (Morton-Style)',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'bit-manipulation'],
      category: 'Combinational Design',
      lede: 'Weave two 4-bit values together bit-by-bit into an 8-bit result — the core operation behind Morton (Z-order) codes used to turn 2D coordinates into a single cache-friendly index.',
      concept: '<b>Concept:</b> Interleaving alternates bits from each input starting from the top: <code>out = {a[3],b[3],a[2],b[2],a[1],b[1],a[0],b[0]}</code>, so every odd output bit position comes from <code>a</code> and every even position comes from <code>b</code>. Swapping which input feeds the odd vs. even slots is an easy mix-up when writing the concatenation by hand — the result is still a plausible-looking interleaved byte, it\'s just <code>a</code> and <code>b</code> completely swapped throughout.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>a</td><td>input</td><td>4</td><td>First value (goes in odd bit positions)</td></tr>
<tr><td>b</td><td>input</td><td>4</td><td>Second value (goes in even bit positions)</td></tr>
<tr><td>out</td><td>output</td><td>8</td><td>Interleaved result</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [3:0] a,
  input  [3:0] b,
  output [7:0] out
);

  // Your code here — out = {a[3],b[3],a[2],b[2],a[1],b[1],a[0],b[0]}.

endmodule
`,
      hiddenTb: `
module tb;
  reg [3:0] a,b; wire [7:0] out; integer errors=0;
  top_module dut(.a(a), .b(b), .out(out));
  task check; input [3:0] ta,tb_; input [7:0] eo; begin
    a=ta;b=tb_;#1;
    if(out!==eo) begin errors=errors+1; $display("FAIL a=%b b=%b expected=%b got=%b",ta,tb_,eo,out); end
    else $display("PASS a=%b b=%b out=%b",ta,tb_,out);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(4'b1010, 4'b0101, 8'b10011001);
    check(4'b1111, 4'b0000, 8'b10101010);
    check(4'b0000, 4'b1111, 8'b01010101);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['a', 'b', 'out'],
      wavedrom: {
        signal: [
          { name: 'a[3:0]', wave: '2.3.', data: ['A', 'F'] },
          { name: 'b[3:0]', wave: '2.3.', data: ['5', '0'] },
          { name: 'out[7:0]', wave: '2.3.', data: ['99', 'AA'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'bit-deinterleaver',
      title: 'Bit Deinterleaver',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'bit-manipulation'],
      category: 'Combinational Design',
      lede: 'Undo an interleaved byte back into its two original 4-bit streams — the inverse of this catalog\'s bit interleaver.',
      concept: '<b>Concept:</b> If <code>a</code> was woven into the odd bit positions and <code>b</code> into the even ones, recovering them is just picking those positions back out: <code>a={interleaved[7],interleaved[5],interleaved[3],interleaved[1]}; b={interleaved[6],interleaved[4],interleaved[2],interleaved[0]}</code>. Swapping which extraction feeds <code>a</code> and which feeds <code>b</code> is the same kind of easy mix-up as building the interleaver backwards — the two recovered nibbles are both real data, they\'ve just traded places.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>interleaved</td><td>input</td><td>8</td><td>Interleaved byte</td></tr>
<tr><td>a</td><td>output</td><td>4</td><td>Recovered odd-position stream</td></tr>
<tr><td>b</td><td>output</td><td>4</td><td>Recovered even-position stream</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] interleaved,
  output [3:0] a,
  output [3:0] b
);

  // Your code here — a = odd bit positions (7,5,3,1); b = even bit positions (6,4,2,0).

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] interleaved; wire [3:0] a,b; integer errors=0;
  top_module dut(.interleaved(interleaved), .a(a), .b(b));
  task check; input [7:0] i; input [3:0] ea,eb; begin
    interleaved=i;#1;
    if(a!==ea||b!==eb) begin errors=errors+1; $display("FAIL interleaved=%b expected a=%b b=%b got a=%b b=%b",i,ea,eb,a,b); end
    else $display("PASS interleaved=%b a=%b b=%b",i,a,b);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(8'b10011001, 4'b1010, 4'b0101);
    check(8'b10101010, 4'b1111, 4'b0000);
    check(8'b01010101, 4'b0000, 4'b1111);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['interleaved', 'a', 'b'],
      wavedrom: {
        signal: [
          { name: 'interleaved[7:0]', wave: '2.3.', data: ['99', 'AA'] },
          { name: 'a[3:0]', wave: '2.3.', data: ['A', 'F'] },
          { name: 'b[3:0]', wave: '2.3.', data: ['5', '0'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'binary-to-one-cold',
      title: 'Binary to One-Cold Decoder',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'decoder'],
      category: 'Combinational Design',
      lede: 'Decode a 3-bit select into an active-low one-cold output — the polarity every chip-select and enable line on real silicon actually uses.',
      concept: '<b>Concept:</b> One-cold is the active-low mirror of one-hot: every line idles at 1, and exactly the selected line goes to 0: start from all-1s and clear a single bit, <code>out_n=8\'hFF; out_n[sel]=0;</code>. Building an ordinary active-high one-hot instead (start from all-0s, set one bit) is a genuine, common polarity bug — it\'s the exact bitwise complement of what was asked for, and it would drive real active-low chip-select lines backwards, enabling every device except the one actually selected.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>sel</td><td>input</td><td>3</td><td>Which line to assert (active-low)</td></tr>
<tr><td>out_n</td><td>output</td><td>8</td><td>All 1s except out_n[sel], which is 0</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [2:0] sel,
  output [7:0] out_n
);

  // Your code here — out_n is all 1s except bit [sel], which is 0.

endmodule
`,
      hiddenTb: `
module tb;
  reg [2:0] sel; wire [7:0] out_n; integer errors=0;
  top_module dut(.sel(sel), .out_n(out_n));
  task check; input [2:0] s; input [7:0] eo; begin
    sel=s;#1;
    if(out_n!==eo) begin errors=errors+1; $display("FAIL sel=%d expected=%b got=%b",s,eo,out_n); end
    else $display("PASS sel=%d out_n=%b",s,out_n);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(0, 8'b11111110);
    check(3, 8'b11110111);
    check(7, 8'b01111111);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['sel', 'out_n'],
      wavedrom: {
        signal: [
          { name: 'sel[2:0]', wave: '2.3.4.', data: ['0', '3', '7'] },
          { name: 'out_n[7:0]', wave: '2.3.4.', data: ['FE', 'F7', '7F'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'lfsr-8bit-maximal',
      title: '8-Bit Maximal-Length LFSR',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'lfsr'],
      category: 'Sequential Design',
      lede: 'Scale this catalog\'s 4-bit LFSR up to a full byte — 8 bits, 4 feedback taps, and a 255-state cycle before it repeats.',
      concept: '<b>Concept:</b> An 8-bit maximal-length Fibonacci LFSR needs exactly 4 feedback taps (bits 8,6,5,4, i.e. <code>lfsr[7]^lfsr[5]^lfsr[4]^lfsr[3]</code>) to visit all 255 nonzero states before repeating — drop any one of those taps and the register still shifts and still looks like it\'s scrambling bits, but it\'s now following the wrong recurrence entirely, most commonly collapsing into a much shorter cycle that repeats far sooner than a real PRBS generator should.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (seeds lfsr to 8'h01)</td></tr>
<tr><td>en</td><td>input</td><td>1</td><td>1 to advance the LFSR this cycle</td></tr>
<tr><td>q</td><td>output</td><td>8</td><td>Current LFSR state</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  en,
  output [7:0] q
);

  // Your code here — 8-bit LFSR, feedback = q[7]^q[5]^q[4]^q[3], seed 8'h01 on reset, advances on en.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk=0, rst, en; wire [7:0] q; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .en(en), .q(q));
  always #5 clk=~clk;
  task check; input [7:0] eq_; begin
    if(q!==eq_) begin errors=errors+1; $display("FAIL expected=%b got=%b",eq_,q); end
    else $display("PASS q=%b",q);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; en=0; @(posedge clk); #1; rst=0;
    check(8'b00000001);
    en=1; @(posedge clk); #1; check(8'b00000010);
    @(posedge clk); #1; check(8'b00000100);
    @(posedge clk); #1; check(8'b00001000);
    @(posedge clk); #1; check(8'b00010001);
    @(posedge clk); #1; check(8'b00100011);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'en', 'q'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'en', wave: '0.1.....' },
          { name: 'q[7:0]', wave: '2.3.4.5.', data: ['01', '02', '04', '08'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'simon-says-sequence-checker',
      title: 'Simon Says Sequence Checker',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'fsm', 'game-logic'],
      category: 'Fun &amp; Games',
      lede: 'Check a player\'s button presses against a fixed 4-step target sequence, one press at a time — freeze on the first mistake, celebrate after the last correct press.',
      concept: '<b>Concept:</b> The checker advances one step for every press that matches the target sequence, and the moment a press is wrong it must <em>latch</em> failure and stop reacting to anything else until reset: <code>else if(!fail &amp;&amp; !success &amp;&amp; press_valid) ...</code>. Dropping the <code>!fail</code> half of that guard is a subtle "the game doesn\'t actually end" bug — the fail flag still gets set correctly on the first wrong press, but because the FSM keeps evaluating later presses against the still-unfrozen <code>step</code>, a lucky continuation can silently advance the sequence (or even reach success) after the player already lost.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (step=0, fail=0, success=0)</td></tr>
<tr><td>press</td><td>input</td><td>2</td><td>Player's current button press (0-3)</td></tr>
<tr><td>press_valid</td><td>input</td><td>1</td><td>1 when press holds a new press this cycle</td></tr>
<tr><td>step</td><td>output</td><td>2</td><td>How many correct presses in a row so far</td></tr>
<tr><td>fail</td><td>output</td><td>1</td><td>1 once a wrong press has occurred; freezes state</td></tr>
<tr><td>success</td><td>output</td><td>1</td><td>1 once all 4 steps of the fixed sequence [1,3,0,2] are matched</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  [1:0] press,
  input  press_valid,
  output reg [1:0] step,
  output reg fail,
  output reg success
);

  // Your code here — fixed target sequence [1,3,0,2]. On press_valid (while !fail && !success):
  // if press matches target[step], advance step (or set success at step 3); else set fail and freeze.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk=0, rst; reg [1:0] press; reg press_valid; wire [1:0] step; wire fail, success; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .press(press), .press_valid(press_valid), .step(step), .fail(fail), .success(success));
  always #5 clk=~clk;
  task check; input [1:0] es; input ef,esc; input [127:0] label; begin
    if(step!==es||fail!==ef||success!==esc) begin errors=errors+1; $display("FAIL %0s expected step=%d fail=%b success=%b got step=%d fail=%b success=%b",label,es,ef,esc,step,fail,success); end
    else $display("PASS %0s step=%d fail=%b success=%b",label,step,fail,success);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; press=0; press_valid=0; @(posedge clk); #1; rst=0;
    press=1; press_valid=1; @(posedge clk); #1; check(1,0,0,"correct-press-1");
    press=3; @(posedge clk); #1; check(2,0,0,"correct-press-2");
    press=1; @(posedge clk); #1; check(2,1,0,"wrong-press-fails");
    press=0; @(posedge clk); #1; check(2,1,0,"frozen-after-fail-step-unchanged");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'press', 'press_valid', 'step', 'fail', 'success'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'press_valid', wave: '0.1.....' },
          { name: 'press[1:0]', wave: '2.3.4.5.', data: ['0', '1', '3', '1'] },
          { name: 'step[1:0]', wave: '2...3.4.', data: ['0', '1', '2'] },
          { name: 'fail', wave: '0.....1.' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'parking-meter-fsm',
      title: 'Parking Meter Timer',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'counter', 'fsm'],
      category: 'Fun &amp; Games',
      lede: 'A coin-fed countdown timer that flags a violation the instant time runs out and no more coins arrive — a real-world countdown-with-guard pattern.',
      concept: '<b>Concept:</b> Each coin adds time and clears any violation; each tick spends one unit of time, but only while there\'s time left to spend: <code>if(time_remaining&gt;0) time_remaining&lt;=time_remaining-1; else violation&lt;=1;</code>. Dropping that guard — decrementing unconditionally on every tick regardless of whether time is already at 0 — lets the counter underflow past zero and wrap around to its maximum value (255) the instant it should have simply stayed at 0 flagging a violation, the same countdown-underflow bug that shows up anywhere a counter is allowed to keep counting down past its floor.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (time_remaining=0, violation=0)</td></tr>
<tr><td>tick</td><td>input</td><td>1</td><td>1 pulse per time unit elapsed</td></tr>
<tr><td>coin</td><td>input</td><td>1</td><td>1 pulse when a coin is inserted (adds 10 units, clears violation)</td></tr>
<tr><td>time_remaining</td><td>output</td><td>8</td><td>Time units left on the meter</td></tr>
<tr><td>violation</td><td>output</td><td>1</td><td>1 once time ran out and another tick occurred with no new coin</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  tick,
  input  coin,
  output reg [7:0] time_remaining,
  output reg violation
);

  // Your code here — coin: time_remaining += 10, violation <= 0.
  // tick (no coin): if time_remaining > 0, decrement it; else set violation. Never let it underflow.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk=0, rst, tick, coin; wire [7:0] time_remaining; wire violation; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .tick(tick), .coin(coin), .time_remaining(time_remaining), .violation(violation));
  always #5 clk=~clk;
  task check; input [7:0] et; input ev; input [127:0] label; begin
    if(time_remaining!==et||violation!==ev) begin errors=errors+1; $display("FAIL %0s expected time=%d violation=%b got time=%d violation=%b",label,et,ev,time_remaining,violation); end
    else $display("PASS %0s time=%d violation=%b",label,time_remaining,violation);
  end endtask
  integer i;
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; tick=0; coin=0; @(posedge clk); #1; rst=0;
    coin=1; @(posedge clk); #1; coin=0; check(10,0,"coin-adds-10");
    for (i=0;i<10;i=i+1) begin tick=1; @(posedge clk); #1; tick=0; end
    check(0,0,"ticked-down-to-zero");
    tick=1; @(posedge clk); #1; check(0,1,"extra-tick-at-zero-sets-violation-no-underflow");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'rst', 'tick', 'coin', 'time_remaining', 'violation'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.........' },
          { name: 'coin', wave: '0.10......' },
          { name: 'tick', wave: '0...1010.1' },
          { name: 'time_remaining[7:0]', wave: '2.3.......', data: ['0', '10'] },
          { name: 'violation', wave: '0.........' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'leaderboard-top3-tracker',
      title: 'Top-3 Leaderboard Tracker',
      difficulty: 'medium',
      points: 25,
      tags: ['sequential', 'comparator', 'datapath'],
      category: 'Fun &amp; Games',
      lede: 'Maintain the 3 highest scores seen so far in sorted order as new scores stream in — an insertion-sort shift register in miniature.',
      concept: '<b>Concept:</b> Inserting a new high score means shifting everything below it down one slot before writing it in: a new #1 must push the old #1 down to #2 <em>and</em> the old #2 down to #3, all in the same cycle — <code>if(score&gt;top1) begin top3&lt;=top2; top2&lt;=top1; top1&lt;=score; end</code>. Forgetting the <code>top3&lt;=top2</code> shift is an easy one-line omission that looks harmless (top1 and top2 both still update correctly) but silently drops whatever used to be in third place the moment a new #1 arrives — the leaderboard quietly loses an entry instead of shifting it down.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>clk</td><td>input</td><td>1</td><td>Clock</td></tr>
<tr><td>rst</td><td>input</td><td>1</td><td>Sync active-high reset (all three scores = 0)</td></tr>
<tr><td>submit</td><td>input</td><td>1</td><td>1 to submit a new score this cycle</td></tr>
<tr><td>score</td><td>input</td><td>8</td><td>The submitted score</td></tr>
<tr><td>top1</td><td>output</td><td>8</td><td>Highest score seen</td></tr>
<tr><td>top2</td><td>output</td><td>8</td><td>Second-highest</td></tr>
<tr><td>top3</td><td>output</td><td>8</td><td>Third-highest</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  clk,
  input  rst,
  input  submit,
  input  [7:0] score,
  output reg [7:0] top1,
  output reg [7:0] top2,
  output reg [7:0] top3
);

  // Your code here — on submit, insert score into the sorted top-3, shifting lower entries down.

endmodule
`,
      hiddenTb: `
module tb;
  reg clk=0, rst, submit; reg [7:0] score; wire [7:0] top1, top2, top3; integer errors=0;
  top_module dut(.clk(clk), .rst(rst), .submit(submit), .score(score), .top1(top1), .top2(top2), .top3(top3));
  always #5 clk=~clk;
  task check; input [7:0] e1,e2,e3; input [127:0] label; begin
    if(top1!==e1||top2!==e2||top3!==e3) begin errors=errors+1; $display("FAIL %0s expected top1=%d top2=%d top3=%d got top1=%d top2=%d top3=%d",label,e1,e2,e3,top1,top2,top3); end
    else $display("PASS %0s top1=%d top2=%d top3=%d",label,top1,top2,top3);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    rst=1; submit=0; score=0; @(posedge clk); #1; rst=0;
    submit=1; score=50; @(posedge clk); #1; check(50,0,0,"first-score");
    score=80; @(posedge clk); #1; check(80,50,0,"new-top1-shifts-old-top1-to-top2");
    score=60; @(posedge clk); #1; check(80,60,50,"mid-score-shifts-old-top2-to-top3");
    score=100; @(posedge clk); #1; check(100,80,60,"new-top1-again-must-shift-top2-into-top3");
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['clk', 'submit', 'score', 'top1', 'top2', 'top3'],
      wavedrom: {
        signal: [
          { name: 'clk', wave: 'p.......' },
          { name: 'score[7:0]', wave: '2.3.4.5.', data: ['50', '80', '60', '100'] },
          { name: 'top1[7:0]', wave: '2.3...4.', data: ['50', '80', '100'] },
          { name: 'top2[7:0]', wave: '2...3.4.', data: ['0', '50', '80'] },
          { name: 'top3[7:0]', wave: '2.....3.', data: ['0', '60'] }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'leap-year-checker',
      title: 'Leap Year Checker',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'arithmetic'],
      category: 'Fun &amp; Games',
      lede: 'Determine whether a given year is a leap year — the classic "divisible by 4, except by 100, except-except by 400" rule as combinational logic.',
      concept: '<b>Concept:</b> The full leap-year rule has three layers: divisible by 4 is required; being <em>also</em> divisible by 100 normally disqualifies it — <em>unless</em> it\'s divisible by 400 too, in which case it\'s a leap year after all: <code>(year%4==0) &amp;&amp; ((year%100!=0) || (year%400==0))</code>. The simplified two-layer version most people remember ("divisible by 4 and not by 100") gets every ordinary year right and only fails on the rare century-year exception — real years like 2000 (a leap year, since it\'s divisible by 400) and 1900 (not a leap year) are exactly the edge cases that expose the missing third layer.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>year</td><td>input</td><td>12</td><td>Year to check (0-4095)</td></tr>
<tr><td>is_leap</td><td>output</td><td>1</td><td>1 if year is a leap year</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [11:0] year,
  output is_leap
);

  // Your code here — is_leap = divisible by 4 AND (not divisible by 100 OR divisible by 400).

endmodule
`,
      hiddenTb: `
module tb;
  reg [11:0] year; wire is_leap; integer errors=0;
  top_module dut(.year(year), .is_leap(is_leap));
  task check; input [11:0] y; input el; begin
    year=y;#1;
    if(is_leap!==el) begin errors=errors+1; $display("FAIL year=%d expected=%b got=%b",y,el,is_leap); end
    else $display("PASS year=%d is_leap=%b",y,is_leap);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(2024,1);
    check(1900,0);
    check(2000,1);
    check(2023,0);
    check(2400,1);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['year', 'is_leap'],
      wavedrom: {
        signal: [
          { name: 'year[11:0]', wave: '2.3.4.', data: ['1900', '2000', '2024'] },
          { name: 'is_leap', wave: '0.1.1.' }
        ],
        config: { hscale: 1 }
      }
    },

    {
      slug: 'fizzbuzz-single-value',
      title: 'FizzBuzz Encoder',
      difficulty: 'easy',
      points: 10,
      tags: ['combinational', 'arithmetic'],
      category: 'Fun &amp; Games',
      lede: 'The classic programming-interview puzzle, recast as combinational hardware: classify a number as Fizz, Buzz, FizzBuzz, or itself.',
      concept: '<b>Concept:</b> The one rule that trips people up in software trips up hardware too: the divisible-by-15 ("FizzBuzz") case must be checked <em>before</em> the individual divisible-by-3 and divisible-by-5 cases, because every multiple of 15 is also a multiple of 3 (and of 5) — check order matters. Checking divisible-by-3 first is the textbook FizzBuzz bug: for n=15, <code>n%3==0</code> is true, so the circuit reports plain "Fizz" and the FizzBuzz branch below it becomes permanently unreachable dead code for every multiple of 15.',
      portsHtml: `<table><thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead><tbody>
<tr><td>n</td><td>input</td><td>8</td><td>Number to classify</td></tr>
<tr><td>result</td><td>output</td><td>2</td><td>0=number, 1=Fizz (div by 3), 2=Buzz (div by 5), 3=FizzBuzz (div by 15)</td></tr>
</tbody></table>`,
      starter: `module top_module(
  input  [7:0] n,
  output [1:0] result
);

  // Your code here — check divisible-by-15 FIRST, then by-3, then by-5, else 0.

endmodule
`,
      hiddenTb: `
module tb;
  reg [7:0] n; wire [1:0] result; integer errors=0;
  top_module dut(.n(n), .result(result));
  task check; input [7:0] nn; input [1:0] er; begin
    n=nn;#1;
    if(result!==er) begin errors=errors+1; $display("FAIL n=%d expected=%d got=%d",nn,er,result); end
    else $display("PASS n=%d result=%d",nn,result);
  end endtask
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0,tb);
    check(15,3);
    check(3,1);
    check(5,2);
    check(7,0);
    check(30,3);
    if(errors==0) $display("ALL_TESTS_PASSED"); else $display("TEST_FAILED");
    $finish;
  end
endmodule
`,
      waveSignals: ['n', 'result'],
      wavedrom: {
        signal: [
          { name: 'n[7:0]', wave: '2.3.4.5.', data: ['3', '5', '7', '15'] },
          { name: 'result[1:0]', wave: '2.3.4.5.', data: ['1', '2', '0', '3'] }
        ],
        config: { hscale: 1 }
      }
    },
  ];

  function getProblem(slug) {
    return PROBLEMS.find(p => p.slug === slug) || null;
  }

  global.ECRIONIX_PROBLEMS = PROBLEMS;
  global.EcrioniXProblemCatalog = { PROBLEMS, getProblem, POINTS: { easy: 10, medium: 25, hard: 50 } };
})(typeof window !== 'undefined' ? window : globalThis);
