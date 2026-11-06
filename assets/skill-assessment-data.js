/* EcrioniX RTL Skill Assessment Question Bank & Diagnostic Engine */
(function (global) {
  'use strict';

  const DOMAINS = [
    { id: 'digital-logic', name: 'Digital Logic Fundamentals', desc: 'Boolean algebra, logic gates, binary arithmetic, and multiplexing.' },
    { id: 'verilog-fundamentals', name: 'Verilog Fundamentals', desc: 'Module structure, continuous assignments, data types, and operators.' },
    { id: 'combinational-rtl', name: 'Combinational RTL', desc: 'always @*, case statements, priority logic, ALUs, and latch avoidance.' },
    { id: 'sequential-rtl', name: 'Sequential RTL', desc: 'Clocked storage, resets, enable registers, counters, and shift registers.' },
    { id: 'fsm-design', name: 'FSM Design', desc: 'Moore and Mealy state machines, state encoding, and sequence detection.' },
    { id: 'memory-fifo', name: 'Memory and FIFO', desc: 'SRAM inference, register files, synchronous FIFOs, and Gray pointer tracking.' },
    { id: 'apb-axi-protocols', name: 'APB and AXI Protocols', desc: 'AMBA valid-ready handshakes, skid buffers, APB wait states, and burst channels.' },
    { id: 'cdc-rdc', name: 'CDC and RDC', desc: 'Metastability, 2-flop synchronizers, pulse CDC, multi-bit handshakes, and async resets.' },
    { id: 'low-power-rtl', name: 'Low-Power RTL', desc: 'Integrated clock gating (ICG), glitch-free clock switching, and power sequencing.' },
    { id: 'advanced-architecture', name: 'Advanced RTL Architecture', desc: 'Round-robin arbiters, credit-based flow control, streaming bridges, and chiplet links.' }
  ];

  const QUESTIONS = [
    // --- Digital Logic Fundamentals ---
    {
      id: 'dl-1',
      domain: 'digital-logic',
      modes: ['quick', 'standard'],
      difficulty: 'easy',
      question: 'In a 2-input CMOS NAND gate, how are the PMOS and NMOS transistors arranged between VDD, output, and GND?',
      options: [
        'PMOS in parallel to VDD, NMOS in series to GND',
        'PMOS in series to VDD, NMOS in parallel to GND',
        'Both PMOS and NMOS in series',
        'Both PMOS and NMOS in parallel'
      ],
      correct: 0,
      explanation: 'In static CMOS logic, the pull-up network (PUN) of a NAND gate consists of PMOS transistors in parallel (so either input being LOW pulls output HIGH). The pull-down network (PDN) consists of NMOS transistors in series (requiring both inputs to be HIGH to pull output to GND).',
      recommendedTutorial: '/digital-electronics/',
      recommendedProblem: 'nand-gate',
      recommendedPath: 'verilog-fundamentals'
    },
    {
      id: 'dl-2',
      domain: 'digital-logic',
      modes: ['standard', 'advanced'],
      difficulty: 'medium',
      question: 'What is the minimum number of 2:1 multiplexers required to implement an arbitrary 3-input Boolean function f(A, B, C) without external logic gates?',
      options: [
        '4 multiplexers',
        '3 multiplexers',
        '2 multiplexers',
        '1 multiplexer'
      ],
      correct: 1,
      explanation: 'Using Shannon\'s Expansion theorem, any 3-variable Boolean function can be expanded as f(A,B,C) = A\'·f(0,B,C) + A·f(1,B,C). The two sub-functions of 2 variables require at most two 2:1 MUXes (controlled by B with C/0/1 at inputs), whose outputs feed a third 2:1 MUX controlled by A. Thus, 3 multiplexers are sufficient.',
      recommendedTutorial: '/digital-electronics/',
      recommendedProblem: 'mux4to1',
      recommendedPath: 'verilog-fundamentals'
    },
    {
      id: 'dl-3',
      domain: 'digital-logic',
      modes: ['standard'],
      difficulty: 'easy',
      question: 'Which property distinguishes Gray code from standard binary counting?',
      options: [
        'Gray code uses fewer bits to represent numbers',
        'Consecutive values in Gray code differ by exactly one bit position',
        'Gray code cannot represent odd numbers',
        'Gray code values always have even parity'
      ],
      correct: 1,
      explanation: 'Gray code is a unit-distance binary sequence where consecutive values transition by exactly one bit flip. This eliminates multi-bit transition skews and race conditions when synchronizing pointers across asynchronous clock boundaries.',
      recommendedTutorial: '/digital-electronics/',
      recommendedProblem: 'binary-to-gray',
      recommendedPath: 'fifo-design'
    },

    // --- Verilog Fundamentals ---
    {
      id: 'vf-1',
      domain: 'verilog-fundamentals',
      modes: ['quick', 'standard'],
      difficulty: 'easy',
      question: 'Which Verilog assignment statement is synthesizable for driving continuous logic outside an always block?',
      codeSnippet: `// Which of the following is correct?\nOption A: assign out = a & b;\nOption B: always out = a & b;\nOption C: wire out <= a & b;\nOption D: initial out = a & b;`,
      options: [
        'Option A: assign out = a & b;',
        'Option B: always out = a & b;',
        'Option C: wire out <= a & b;',
        'Option D: initial out = a & b;'
      ],
      correct: 0,
      explanation: 'Continuous assignments using the "assign" keyword continuously drive "wire" (or logic in SystemVerilog) nets outside procedural blocks. Non-blocking (<=) operators are strictly procedural and cannot be used with "wire" declarations directly.',
      recommendedTutorial: '/verilog/',
      recommendedProblem: 'wire-passthrough',
      recommendedPath: 'verilog-fundamentals'
    },
    {
      id: 'vf-2',
      domain: 'verilog-fundamentals',
      modes: ['standard', 'advanced'],
      difficulty: 'medium',
      question: 'What is the evaluated value of the expression (4\'b1010 ^ 4\'b1100) versus (^4\'b1010)?',
      options: [
        'Bitwise XOR yields 4\'b0110; Reduction XOR yields 1\'b0',
        'Bitwise XOR yields 4\'b0110; Reduction XOR yields 1\'b1',
        'Bitwise XOR yields 1\'b0; Reduction XOR yields 4\'b0110',
        'Both yield 4\'b0000'
      ],
      correct: 0,
      explanation: 'Binary operator ^ between two 4-bit operands performs bitwise XOR: (1^1=0, 0^1=1, 1^0=1, 0^0=0) -> 4\'b0110. Unary reduction operator ^ on 4\'b1010 computes 1 ^ 0 ^ 1 ^ 0 = 0 (1-bit result indicating even parity).',
      recommendedTutorial: '/verilog/',
      recommendedProblem: 'xor-gate',
      recommendedPath: 'verilog-fundamentals'
    },
    {
      id: 'vf-3',
      domain: 'verilog-fundamentals',
      modes: ['standard'],
      difficulty: 'medium',
      question: 'In standard Verilog-2001, what happens when an 8-bit unsigned vector is added to an 8-bit signed vector without explicit casting?',
      options: [
        'Both operands are automatically treated as signed',
        'Both operands are automatically converted and treated as unsigned',
        'The compiler generates a mandatory syntax error',
        'The sign bit of the signed operand is automatically preserved'
      ],
      correct: 1,
      explanation: 'According to IEEE 1364-2001 Verilog standard (Section 4.5.1), if any operand in an expression is unsigned, the entire expression is coerced to unsigned! To perform signed arithmetic with mixed vectors, you must explicitly cast the unsigned vector using $signed().',
      recommendedTutorial: '/twos-complement/',
      recommendedProblem: 'signed-comparator',
      recommendedPath: 'combinational-rtl'
    },

    // --- Combinational RTL ---
    {
      id: 'cr-1',
      domain: 'combinational-rtl',
      modes: ['quick', 'standard'],
      difficulty: 'medium',
      question: 'What unintended hardware structure does synthesis software infer from the following combinational code?',
      codeSnippet: `always @(*) begin\n  if (sel == 2'b00)\n    out = in0;\n  else if (sel == 2'b01)\n    out = in1;\n  // sel == 2'b10 and 2'b11 are not specified\nend`,
      options: [
        'A pure 4-to-1 multiplexer with zero outputs for unmapped cases',
        'An inferred transparent latch on "out"',
        'A D flip-flop triggered on sel transitions',
        'A combinational wire tied to ground'
      ],
      correct: 1,
      explanation: 'Because "out" is not assigned a value in all possible evaluation branches of the combinational block (when sel is 2\'b10 or 2\'b11), the synthesis tool must preserve its previous value. This infers a level-sensitive latch, which causes timing closure issues and power dissipation.',
      recommendedTutorial: '/synthesis/',
      recommendedProblem: 'demux-1to4',
      recommendedPath: 'combinational-rtl'
    },
    {
      id: 'cr-2',
      domain: 'combinational-rtl',
      modes: ['standard', 'advanced'],
      difficulty: 'hard',
      question: 'In 8-bit two\'s complement addition (A + B = SUM), what is the correct Boolean equation to detect signed arithmetic overflow?',
      options: [
        'Overflow = Carry_Out_MSB',
        'Overflow = (A[7] == B[7]) && (SUM[7] != A[7])',
        'Overflow = A[7] ^ B[7] ^ SUM[7]',
        'Overflow = SUM[7] & ~A[7] & ~B[7]'
      ],
      correct: 1,
      explanation: 'Signed overflow occurs if and only if adding two operands of the SAME sign yields a result of the OPPOSITE sign: (A[7] == B[7]) && (SUM[7] != A[7]). Alternatively, it equals carry_in[MSB] ^ carry_out[MSB]. Carry out alone only indicates unsigned overflow.',
      recommendedTutorial: '/twos-complement/',
      recommendedProblem: 'signed-overflow-detector',
      recommendedPath: 'combinational-rtl'
    },
    {
      id: 'cr-3',
      domain: 'combinational-rtl',
      modes: ['standard', 'advanced'],
      difficulty: 'medium',
      question: 'Why is a logarithmic barrel shifter preferred over a linear cascade of shift registers in high-speed ALUs?',
      options: [
        'A barrel shifter requires zero flip-flops and has O(log2 N) multiplexer delay stages',
        'A barrel shifter consumes zero dynamic power',
        'A barrel shifter can only shift by 1 bit per cycle',
        'A barrel shifter eliminates the need for select lines'
      ],
      correct: 0,
      explanation: 'A logarithmic barrel shifter shifts an N-bit word by any amount in a single clock cycle using log2(N) multiplexer stages (e.g., 3 stages for an 8-bit shifter: 4-bit shift stage, 2-bit shift stage, 1-bit shift stage). This provides constant low latency compared to multi-cycle linear shifts.',
      recommendedTutorial: '/digital-electronics/',
      recommendedProblem: 'barrel-shifter',
      recommendedPath: 'combinational-rtl'
    },

    // --- Sequential RTL ---
    {
      id: 'sr-1',
      domain: 'sequential-rtl',
      modes: ['quick', 'standard'],
      difficulty: 'easy',
      question: 'Which assignment operator MUST be used when updating flip-flop registers in edge-triggered always blocks to avoid simulation race conditions?',
      options: [
        'Blocking assignment (=)',
        'Non-blocking assignment (<=)',
        'Continuous assignment (assign)',
        'Force assignment (force)'
      ],
      correct: 1,
      explanation: 'Non-blocking assignments (<=) schedule right-hand side evaluations in the active region and register updates in the NBA (Non-Blocking Assignment) region. This ensures that cascaded registers in shift registers or pipelines sample previous-cycle values consistently regardless of simulator execution order.',
      recommendedTutorial: '/digital-electronics/',
      recommendedProblem: 'd-flip-flop',
      recommendedPath: 'sequential-rtl'
    },
    {
      id: 'sr-2',
      domain: 'sequential-rtl',
      modes: ['standard', 'advanced'],
      difficulty: 'medium',
      question: 'Consider a 4-bit Johnson (twisted ring) counter initialized to 4\'b0000. How many distinct states does it cycle through before repeating?',
      options: [
        '16 states',
        '8 states',
        '4 states',
        '10 states'
      ],
      correct: 1,
      explanation: 'An N-bit Johnson counter feeds the inverted serial output back to the input (~Q[N-1] -> D[0]). It produces exactly 2*N distinct states (for N=4: 0000, 0001, 0011, 0111, 1111, 1110, 1100, 1000 -> 8 states). A standard ring counter produces N states.',
      recommendedTutorial: '/digital-electronics/',
      recommendedProblem: 'johnson-counter',
      recommendedPath: 'sequential-rtl'
    },
    {
      id: 'sr-3',
      domain: 'sequential-rtl',
      modes: ['standard', 'advanced'],
      difficulty: 'medium',
      question: 'What is the main drawback of using an asynchronous reset over a synchronous reset in high-frequency ASIC designs?',
      options: [
        'Asynchronous resets require external clocks to assert',
        'Asynchronous reset deassertion can violate reset recovery/removal times and cause metastability',
        'Asynchronous resets always require larger standard cell silicon area',
        'Asynchronous resets cannot reset flip-flops during power-up'
      ],
      correct: 1,
      explanation: 'While asynchronous reset assertion is immediate without clock dependency, deasserting an asynchronous reset too close to an active clock edge violates recovery or removal timing limits. This can cause output flip-flops to enter metastability, requiring reset synchronizers.',
      recommendedTutorial: '/clock-domain-crossing/',
      recommendedProblem: 'async-reset-synchronizer',
      recommendedPath: 'cdc-low-power'
    },

    // --- FSM Design ---
    {
      id: 'fsm-1',
      domain: 'fsm-1',
      modes: ['quick', 'standard'],
      difficulty: 'medium',
      question: 'What is the fundamental architectural difference between a Moore and a Mealy finite state machine?',
      options: [
        'Moore outputs depend solely on the current state; Mealy outputs depend on both current state and primary inputs',
        'Moore state machines cannot be synthesized into hardware',
        'Mealy state machines require double the number of state flip-flops',
        'Moore state machines cannot detect recurring sequences'
      ],
      correct: 0,
      explanation: 'In a Moore FSM, output logic is pure f(State), meaning outputs change synchronously only on clock edges following state changes. In a Mealy FSM, outputs are f(State, Inputs), allowing outputs to react immediately within the same clock cycle, but potentially propagating input glitches.',
      recommendedTutorial: '/digital-electronics/',
      recommendedProblem: 'moore-sequence-detector-1011',
      recommendedPath: 'sequential-rtl'
    },
    {
      id: 'fsm-2',
      domain: 'fsm-2',
      modes: ['standard', 'advanced'],
      difficulty: 'hard',
      question: 'In an overlapping sequence detector for bit pattern "1011", how many flip-flops are needed for a binary-encoded Moore machine versus a Mealy machine?',
      options: [
        'Moore requires 5 states (3 flip-flops); Mealy requires 4 states (2 flip-flops)',
        'Both require 4 flip-flops',
        'Moore requires 2 flip-flops; Mealy requires 4 flip-flops',
        'Both require 5 states and 5 flip-flops'
      ],
      correct: 0,
      explanation: 'A Moore machine requires a dedicated state to represent the recognition of the complete sequence (IDLE, GOT1, GOT10, GOT101, GOT1011 -> 5 states, ceil(log2 5) = 3 flip-flops). A Mealy machine emits the pulse on the transition into GOT101 when input=1, requiring only 4 states (IDLE, GOT1, GOT10, GOT101 -> 4 states, 2 flip-flops).',
      recommendedTutorial: '/digital-electronics/',
      recommendedProblem: 'mealy-sequence-detector-101',
      recommendedPath: 'sequential-rtl'
    },
    {
      id: 'fsm-3',
      domain: 'fsm-3',
      modes: ['advanced'],
      difficulty: 'hard',
      question: 'Why is One-Hot state encoding preferred over Binary encoding in high-speed FPGA designs?',
      options: [
        'One-Hot encoding minimizes the number of flip-flops needed',
        'One-Hot decoding requires simpler, shallow next-state logic (often single LUTs) since each state is represented by a single bit',
        'One-Hot encoding eliminates the need for reset logic',
        'One-Hot encoding prevents glitches on Mealy outputs'
      ],
      correct: 1,
      explanation: 'FPGAs have abundant flip-flop registers but narrow Look-Up Tables (LUTs). One-hot encoding uses 1 flip-flop per state, but each state transition only evaluates 1 or 2 bits, creating wide 1-LUT next-state logic with minimal propagation delay, enabling maximum clock frequencies.',
      recommendedTutorial: '/digital-electronics/',
      recommendedProblem: 'traffic-light-fsm',
      recommendedPath: 'sequential-rtl'
    },

    // --- Memory and FIFO ---
    {
      id: 'mf-1',
      domain: 'memory-fifo',
      modes: ['quick', 'standard'],
      difficulty: 'medium',
      question: 'In a synchronous circular FIFO with depth 8 (addressed by 3-bit pointers), what pointer convention allows full versus empty detection without an occupancy counter?',
      options: [
        'Using 4-bit pointers where equal pointers indicate EMPTY, and pointers differing only in MSB indicate FULL',
        'Restricting the maximum depth to 7 items',
        'Checking if the read pointer is 0',
        'Inverting all pointer bits on every write'
      ],
      correct: 0,
      explanation: 'By adding an extra MSB to pointers (N+1 bits = 4 bits for depth 8): when write_ptr == read_ptr, the FIFO is EMPTY. When write_ptr[3] != read_ptr[3] and write_ptr[2:0] == read_ptr[2:0], the write pointer has wrapped around exactly once more than the read pointer, meaning the FIFO is FULL.',
      recommendedTutorial: '/courses/',
      recommendedProblem: 'fifo-full-empty-detector',
      recommendedPath: 'fifo-design'
    },
    {
      id: 'mf-2',
      domain: 'memory-fifo',
      modes: ['standard', 'advanced'],
      difficulty: 'hard',
      question: 'In a dual-clock asynchronous FIFO, why MUST binary write and read pointers be converted to Gray code before clock-domain crossing?',
      options: [
        'Gray code uses fewer wires across the silicon die',
        'Binary counters can flip multiple bits simultaneously (e.g. 011 -> 100 flips 3 bits), which can cause multi-bit skew and false pointer values during sampling',
        'SRAM macro cells only accept Gray-coded address decoders',
        'Gray code eliminates the need for 2-stage flip-flop synchronizers'
      ],
      correct: 1,
      explanation: 'If a binary pointer changes from 3 (0011) to 4 (0100), all three lower bits transition. Due to interconnect wire delay skews, the receiving domain might capture intermediate values like 0000 or 0111, corrupting full/empty calculations. Gray code guarantees only 1 bit transitions per count, preventing multi-bit sampling skew.',
      recommendedTutorial: '/premium-course/async-fifo/',
      recommendedProblem: 'dual-clock-async-fifo',
      recommendedPath: 'fifo-design'
    },
    {
      id: 'mf-3',
      domain: 'memory-fifo',
      modes: ['advanced'],
      difficulty: 'hard',
      question: 'In an asynchronous FIFO, how does synchronization delay affect full and empty flag generation?',
      options: [
        'Empty and full flags are always exact with zero latency',
        'The flags are pessimistic: FULL may remain asserted briefly after reads, and EMPTY may remain asserted briefly after writes, ensuring safe operation without overflows or underflows',
        'The FIFO can underflow if the read clock is faster than the write clock',
        'Synchronization delay causes memory addresses to wrap backwards'
      ],
      correct: 1,
      explanation: 'Because pointer synchronization takes 2 clock cycles, the write domain full detector sees a slightly delayed read pointer, meaning it may think the FIFO is still full when an entry was just read (safe: prevents overflow). Similarly, the read domain empty detector sees a delayed write pointer (safe: prevents underflow).',
      recommendedTutorial: '/premium-course/async-fifo/',
      recommendedProblem: 'dual-clock-async-fifo',
      recommendedPath: 'fifo-design'
    },

    // --- APB and AXI Protocols ---
    {
      id: 'pr-1',
      domain: 'apb-axi-protocols',
      modes: ['quick', 'standard'],
      difficulty: 'medium',
      question: 'According to the AMBA AXI valid-ready handshake specification, which combinational dependency is strictly FORBIDDEN?',
      options: [
        'The producer asserts VALID without waiting for READY',
        'The consumer asserts READY combinationally dependent on VALID',
        'The producer waits for READY before asserting VALID',
        'READY is held permanently high by the consumer'
      ],
      correct: 2,
      explanation: 'Section A3.1.2 of the AMBA AXI specification mandates that a master/producer MUST NOT wait for READY to assert VALID. Doing so can cause deadlocks if the consumer simultaneously waits for VALID before asserting READY. However, READY is permitted to depend on VALID.',
      recommendedTutorial: '/protocols/',
      recommendedProblem: 'axi-valid-ready-handshake-engine',
      recommendedPath: 'protocol-rtl'
    },
    {
      id: 'pr-2',
      domain: 'apb-axi-protocols',
      modes: ['standard', 'advanced'],
      difficulty: 'hard',
      question: 'What is the purpose of an AXI Skid Buffer (full register slice) in high-frequency SoC interconnects?',
      options: [
        'To reduce power consumption during idle periods',
        'To break the combinational backward path of READY while sustaining 100% throughput across downstream stalls',
        'To convert 32-bit data into 64-bit data automatically',
        'To encrypt payload data across untrusted buses'
      ],
      correct: 1,
      explanation: 'A simple register on READY cuts downstream backpressure by half-rate throughput because it takes a cycle to communicate stalls. An AXI Skid Buffer uses a 2-slot register scheme (Primary + Skid buffer) so it can register the READY output (breaking the timing path) while immediately buffering an inflight beat during stalls, preserving 100% throughput.',
      recommendedTutorial: '/protocols/',
      recommendedProblem: 'axi-stream-register-slice-full',
      recommendedPath: 'protocol-rtl'
    },
    {
      id: 'pr-3',
      domain: 'apb-axi-protocols',
      modes: ['advanced'],
      difficulty: 'hard',
      question: 'In an AMBA APB transfer with wait states, which signals must remain stable on the bus while PENABLE is asserted and PREADY is low?',
      options: [
        'Only PCLK and PRESETn',
        'PADDR, PWRITE, PSEL, PWDATA (for writes), and PENABLE must remain stable throughout all wait cycles until PREADY is sampled high',
        'PADDR can advance to the next address while waiting for PREADY',
        'PENABLE toggles low and high on each wait cycle'
      ],
      correct: 1,
      explanation: 'In AMBA APB3/APB4, once the ACCESS phase starts (PENABLE=1, PSEL=1), if the slave drives PREADY=0 to insert wait states, the master MUST hold PADDR, PWRITE, PWDATA, and control signals completely static until the rising clock edge where PREADY=1 completes the transaction.',
      recommendedTutorial: '/protocols/',
      recommendedProblem: 'apb-slave-wait-states',
      recommendedPath: 'protocol-rtl'
    },

    // --- CDC and RDC ---
    {
      id: 'cdc-1',
      domain: 'cdc-rdc',
      modes: ['quick', 'standard'],
      difficulty: 'medium',
      question: 'What physical phenomenon occurs when a flip-flop samples an asynchronous input signal during its setup or hold time window?',
      options: [
        'Thermal runaway and transistor burnout',
        'Metastability: the internal master/slave latch balances at an intermediate voltage for a non-deterministic settling time',
        'Automatic clock division by 2',
        'The signal is permanently inverted'
      ],
      correct: 1,
      explanation: 'Violating setup or hold timing causes internal regenerative feedback nodes of the flip-flop to balance between logic 0 and logic 1. The output voltage hovers near VDD/2 for an unpredictable duration before settling randomly, causing downstream logic to misinterpret values.',
      recommendedTutorial: '/clock-domain-crossing/',
      recommendedProblem: 'two-flop-synchronizer',
      recommendedPath: 'cdc-low-power'
    },
    {
      id: 'cdc-2',
      domain: 'cdc-rdc',
      modes: ['standard', 'advanced'],
      difficulty: 'hard',
      question: 'Why CANNOT a 2-flop synchronizer be used directly to synchronize an 8-bit data bus crossing asynchronous clock domains?',
      options: [
        'Flip-flops can only store 1 bit of information',
        'Bit arrival skew across the bus wires causes different bits to be sampled on different clock cycles, creating invalid transient data values',
        'A bus synchronizer requires software intervention on every transfer',
        'Synthesizers reject vectors connected to synchronizer pragmas'
      ],
      correct: 1,
      explanation: 'Due to physical routing delays across silicon, bits of a bus arrive at slightly different picosecond timestamps. Passing all bits through independent 2-flop syncs can result in some bits resolving on cycle N and others on cycle N+1, producing corrupted multi-bit values. A 4-phase handshake CDC or async FIFO is required.',
      recommendedTutorial: '/clock-domain-crossing/',
      recommendedProblem: 'multi-bit-handshake-cdc',
      recommendedPath: 'cdc-low-power'
    },
    {
      id: 'cdc-3',
      domain: 'cdc-rdc',
      modes: ['advanced'],
      difficulty: 'hard',
      question: 'When passing a single-cycle pulse from a fast clock domain (1 GHz) to a slow clock domain (100 MHz), what is the primary risk of a standard 2-flop synchronizer without pulse stretching?',
      options: [
        'The fast pulse can be completely missed (swallowed) because it asserts and deasserts between slow clock edges',
        'The slow clock frequency will automatically increase',
        'The pulse will duplicate into multiple pulses in the slow domain',
        'The fast flip-flop will burn out'
      ],
      correct: 0,
      explanation: 'A 1 ns pulse from a 1 GHz clock may easily begin and end while the 100 MHz clock is between sampling edges, completely disappearing without being registered. To solve this, a toggle synchronizer (converting pulse to a level change) or a pulse stretcher is required.',
      recommendedTutorial: '/clock-domain-crossing/',
      recommendedProblem: 'pulse-cdc-controller',
      recommendedPath: 'cdc-low-power'
    },

    // --- Low-Power RTL ---
    {
      id: 'lp-1',
      domain: 'low-power-rtl',
      modes: ['quick', 'standard'],
      difficulty: 'medium',
      question: 'Why are Integrated Clock Gating (ICG) cells designed with a negative-edge-triggered latch before the AND gate?',
      options: [
        'To reduce transistor leakage current by 90%',
        'To ensure the enable signal changes only when the clock is LOW, preventing runt pulses or glitches on the gated clock output',
        'To invert the clock phase for double-data-rate logic',
        'To eliminate the need for global clock trees'
      ],
      correct: 1,
      explanation: 'If a combinational AND gate were used directly with an asynchronous or rising-edge enable (CLK & EN), any transition on EN while CLK is HIGH would immediately truncate the clock pulse, producing a hazardous runt pulse. A negative-edge latch captures EN while CLK is LOW and holds it stable throughout the HIGH phase.',
      recommendedTutorial: '/low-power/',
      recommendedProblem: 'clock-gating-cell',
      recommendedPath: 'cdc-low-power'
    },
    {
      id: 'lp-2',
      domain: 'low-power-rtl',
      modes: ['standard', 'advanced'],
      difficulty: 'hard',
      question: 'In a multi-rail SoC with I/O (3.3V) and Core (0.8V) voltage domains, why must I/O voltage regulators be enabled BEFORE the core during power-up?',
      options: [
        'To prevent forward-biasing parasitic PN junctions in ESD protection diodes that can trigger destructive CMOS latch-up',
        'Because core logic cannot boot without display monitors attached',
        'To allow dynamic frequency scaling to operate at room temperature',
        'Because 3.3V power traces are physically wider than 0.8V traces'
      ],
      correct: 0,
      explanation: 'Violating power-up order (such as driving external pad voltages into an unpowered silicon substrate or ramping core before pads are biased) creates forward-biased substrate diodes. This triggers SCR (Silicon Controlled Rectifier) latch-up, creating a low-impedance short circuit that permanently destroys the chip.',
      recommendedTutorial: '/low-power/',
      recommendedProblem: 'power-sequencing-controller',
      recommendedPath: 'cdc-low-power'
    },
    {
      id: 'lp-3',
      domain: 'low-power-rtl',
      modes: ['advanced'],
      difficulty: 'hard',
      question: 'How does a glitch-free clock multiplexer guarantee that switching between two unrelated clocks does NOT produce runt pulses?',
      options: [
        'By using high-speed analog PLL phase interpolators',
        'By disabling the currently active clock on its negative edge, verifying its shutdown via feedback, and then enabling the target clock on its negative edge',
        'By driving both clocks simultaneously for a brief transition window',
        'By stopping the power supply during clock switching'
      ],
      correct: 1,
      explanation: 'Glitch-free clock switching uses mutual exclusion handshake feedback with negative-edge flip-flops in both clock domains. When select changes, clock 0 enable is deasserted on negedge clk_0 (when clk_0 is low). Only after domain 1 confirms that clock 0 enable has dropped to 0 is clock 1 enabled on negedge clk_1 (when clk_1 is low).',
      recommendedTutorial: '/low-power/',
      recommendedProblem: 'glitch-free-clock-switching-controller',
      recommendedPath: 'cdc-low-power'
    },

    // --- Advanced RTL Architecture ---
    {
      id: 'aa-1',
      domain: 'advanced-architecture',
      modes: ['quick', 'standard'],
      difficulty: 'hard',
      question: 'Why do multi-die chiplet interconnects (such as UCIe) use Credit-Based Flow Control instead of standard Valid-Ready backpressure?',
      options: [
        'Credit-based flow control uses zero logic gates on the transmitter',
        'Valid-Ready backpressure across multi-cycle physical propagation latencies causes buffer overflows because stop signals arrive too late',
        'Chiplets only support serial data transmission',
        'UCIe adapters cannot instantiate FIFO buffers'
      ],
      correct: 1,
      explanation: 'Across multi-die package substrates, signal flight time spans multiple clock cycles. If a receiver asserts READY=0, the transmitter continues sending flits already in flight, overflowing receiver buffers. With credit flow control, the sender only transmits when it possesses a confirmed credit, guaranteeing zero buffer overflows regardless of physical distance.',
      recommendedTutorial: '/chiplets-ucie/',
      recommendedProblem: 'credit-flow-control-controller',
      recommendedPath: 'advanced-soc-rtl'
    },
    {
      id: 'aa-2',
      domain: 'advanced-architecture',
      modes: ['standard', 'advanced'],
      difficulty: 'hard',
      question: 'In a multi-channel packet scheduler serving ingress queues, what problem occurs if arbitration is performed purely on a per-flit basis instead of locking grant between Start-of-Packet (SOP) and End-of-Packet (EOP)?',
      options: [
        'Packet interleaving: flits from different packets get mixed on the egress bus, corrupting packet framing and payload reassembly',
        'Clock frequencies drop by 50%',
        'The scheduler consumes twice the memory depth',
        'The arbiter prioritizes only channel 0'
      ],
      correct: 0,
      explanation: 'In packetized protocols, data flits between SOP and EOP form an atomic message. If the arbiter switches channels mid-packet (packet interleaving), downstream reassembly logic cannot distinguish payload bytes, causing packet corruption and CRC drops. Grant locking until EOP is mandatory.',
      recommendedTutorial: '/protocols/',
      recommendedProblem: 'multi-channel-packet-scheduler',
      recommendedPath: 'advanced-soc-rtl'
    },
    {
      id: 'aa-3',
      domain: 'advanced-architecture',
      modes: ['advanced'],
      difficulty: 'hard',
      question: 'In a round-robin arbiter for N requestors, how does the classic "two-level barrel shifter" or "double request vector" ((req, req) - base) trick achieve fair rotating priority in a single clock cycle?',
      options: [
        'By evaluating priority serially through an N-cycle shift register',
        'By duplicating requests as {req, req} and masking with the rotated priority pointer, resolving wrap-around in a single combinational carry chain',
        'By using random number generators to select requestors',
        'By storing request histories in off-chip DRAM'
      ],
      correct: 1,
      explanation: 'The classic RTL round-robin optimization concatenates the request vector with itself: {req, req}. By subtracting the one-hot priority mask base pointer ({req, req} - mask), the subtraction borrows across the vector, naturally selecting the first active requestor at or above the base pointer in O(1) combinational logic without multi-cycle looping.',
      recommendedTutorial: '/protocols/',
      recommendedProblem: 'multi-request-round-robin-arbiter',
      recommendedPath: 'advanced-soc-rtl'
    }
,
    {
      "id": "fsm-4",
      "domain": "fsm-design",
      "modes": [
        "standard",
        "advanced"
      ],
      "difficulty": "hard",
      "question": "How do binary-to-one-hot state decoders behave when an illegal state is entered due to an SEU (Single Event Upset) radiation bit-flip?",
      "options": [
        "The FSM automatically corrects within 1 cycle without extra logic",
        "If multiple bits become 1, multi-hot condition causes bus contention unless a default recovery branch or parity check is implemented",
        "One-hot state machines cannot suffer from SEU bit-flips",
        "The clock frequency divides in half"
      ],
      "correct": 1,
      "explanation": "In one-hot encoding, exactly 1 flip-flop is active. If radiation flips another bit, two states are active simultaneously (multi-hot). Standard case statements or decode gates will activate multiple mutually exclusive drivers, causing bus conflict unless safe-state logic or parity checking is synthesized.",
      "recommendedTutorial": "/digital-electronics/",
      "recommendedProblem": "traffic-light-fsm",
      "recommendedPath": "sequential-rtl"
    },
    {
      "id": "mf-4",
      "domain": "memory-fifo",
      "modes": [
        "standard",
        "advanced"
      ],
      "difficulty": "hard",
      "question": "What is the required minimum depth of an asynchronous FIFO between a producer bursting 100 data words at 100 MHz and a consumer reading continuously at 80 MHz with no wait states?",
      "options": [
        "20 words",
        "25 words",
        "16 words",
        "50 words"
      ],
      "correct": 0,
      "explanation": "Time to send 100 words at 100 MHz = 100 / 100 MHz = 1.0 µs. During 1.0 µs, the 80 MHz consumer reads: 1.0 µs * 80 MHz = 80 words. Minimum FIFO capacity required to prevent overflow during the burst = 100 - 80 = 20 words.",
      "recommendedTutorial": "/courses/",
      "recommendedProblem": "fifo-occupancy-counter",
      "recommendedPath": "fifo-design"
    },
    {
      "id": "mf-5",
      "domain": "memory-fifo",
      "modes": [
        "advanced"
      ],
      "difficulty": "hard",
      "question": "In First-Word Fall-Through (FWFT) FIFO architecture, when does read data (dout) become valid at the output pins?",
      "options": [
        "Only on the clock cycle following rd_en assertion",
        "Immediately as soon as the FIFO is not empty (empty = 0), before rd_en is pulsed",
        "Only after the FIFO is 100% full",
        "Only during asynchronous reset"
      ],
      "correct": 1,
      "explanation": "In a standard FIFO, data presents on the clock edge after rd_en is asserted (1 cycle latency). In an FWFT (look-ahead) FIFO, internal staging registers present the first written word at the output as soon as data arrives; rd_en merely acts as an \"acknowledge / pop\" that advances to the next word.",
      "recommendedTutorial": "/courses/",
      "recommendedProblem": "parameterized-sync-fifo",
      "recommendedPath": "fifo-design"
    },
    {
      "id": "pr-4",
      "domain": "apb-axi-protocols",
      "modes": [
        "standard",
        "advanced"
      ],
      "difficulty": "hard",
      "question": "In full AXI4 protocol, what mechanism allows a slave to return read data out of order from the issue order of read addresses?",
      "options": [
        "Using different ARID and RID transaction tags",
        "By asserting RLAST on every beat",
        "By toggling ACLK frequency",
        "By disabling the ARVALID signal"
      ],
      "correct": 0,
      "explanation": "AXI4 supports out-of-order transaction completion using Transaction IDs (ARID / RID). Transactions with identical IDs MUST be returned in order, but transactions with DIFFERENT IDs may be completed in any order by the interconnect or memory controller, maximizing DRAM scheduling efficiency.",
      "recommendedTutorial": "/protocols/",
      "recommendedProblem": "axi-read-controller",
      "recommendedPath": "protocol-rtl"
    },
    {
      "id": "pr-5",
      "domain": "apb-axi-protocols",
      "modes": [
        "advanced"
      ],
      "difficulty": "hard",
      "question": "In AXI4-Stream protocol, what is the exact semantic difference between TKEEP and TSTRB?",
      "options": [
        "TKEEP indicates valid data bytes to be retained in the stream; TSTRB indicates valid data bytes destined for memory writes (position bytes)",
        "They are identical and interchangeable in all respects",
        "TKEEP is for clocks; TSTRB is for data",
        "TKEEP is active low; TSTRB is active high"
      ],
      "correct": 0,
      "explanation": "In AMBA AXI-Stream, TKEEP indicates whether the associated byte is a null/filler byte or a valid payload byte that must be preserved when transported across bridges. TSTRB indicates whether the byte is to be written to memory at the final destination (sparse write strobes).",
      "recommendedTutorial": "/protocols/",
      "recommendedProblem": "axi-stream-round-robin-arbiter",
      "recommendedPath": "protocol-rtl"
    },
    {
      "id": "cdc-4",
      "domain": "cdc-rdc",
      "modes": [
        "standard",
        "advanced"
      ],
      "difficulty": "hard",
      "question": "In Static Timing Analysis (STA), what SDC timing constraint is required for an asynchronous FIFO pointer crossing synchronized through a Gray-code 2-flop synchronizer?",
      "options": [
        "set_false_path between domains, or set_max_delay -datapath_only equal to the source clock period",
        "set_input_delay on all internal flip-flops",
        "create_clock with zero period",
        "set_clock_uncertainty equal to 10 seconds"
      ],
      "correct": 0,
      "explanation": "While set_false_path disables timing checks entirely, high-reliability ASIC design requires \"set_max_delay -datapath_only <source_clock_period>\" between Gray pointer registers. This ensures the physical P&R tool places the synchronizer registers close together, bounding routing skew to less than 1 source clock cycle.",
      "recommendedTutorial": "/clock-domain-crossing/",
      "recommendedProblem": "dual-clock-async-fifo",
      "recommendedPath": "cdc-low-power"
    },
    {
      "id": "cdc-5",
      "domain": "cdc-rdc",
      "modes": [
        "advanced"
      ],
      "difficulty": "hard",
      "question": "What is the \"Reset Removal Time\" constraint in static timing analysis of sequential cells?",
      "options": [
        "The time required to discharge the power supply",
        "The minimum time that an asynchronous reset signal must remain stable HIGH (asserted)",
        "The minimum time an active-low reset must be DEASSERTED (transitioned from 0 to 1) BEFORE the next active clock edge to prevent metastability",
        "The time it takes to reprogram an FPGA bitstream"
      ],
      "correct": 2,
      "explanation": "Recovery and Removal timing arcs define the setup and hold windows for asynchronous control signals. \"Removal time\" is the minimum time the reset signal must be held active AFTER a clock edge; \"Recovery time\" is the minimum time it must be deasserted BEFORE the next clock edge.",
      "recommendedTutorial": "/sta/",
      "recommendedProblem": "async-reset-synchronizer",
      "recommendedPath": "cdc-low-power"
    },
    {
      "id": "lp-4",
      "domain": "low-power-rtl",
      "modes": [
        "standard",
        "advanced"
      ],
      "difficulty": "hard",
      "question": "In multi-voltage domain SoC designs (e.g., UPF / IEEE 1801), what is the function of an \"Isolation Cell\" placed at power domain boundaries?",
      "options": [
        "To clamp floating outputs to a known safe logic level (0 or 1) when the driving power domain is powered OFF",
        "To step up voltage from 0.8V to 3.3V",
        "To invert clock signals for timing closure",
        "To discharge parasitic capacitances to ground"
      ],
      "correct": 0,
      "explanation": "When a power domain shuts down, its output pins collapse to floating/intermediate voltages. If connected directly to an active power domain, these floating inputs cause intermediate voltage shoot-through current in CMOS input stages. Isolation cells clamp the line to 0 or 1 when an ISO_EN signal is active.",
      "recommendedTutorial": "/low-power/",
      "recommendedProblem": "power-sequencing-controller",
      "recommendedPath": "cdc-low-power"
    },
    {
      "id": "lp-5",
      "domain": "low-power-rtl",
      "modes": [
        "advanced"
      ],
      "difficulty": "hard",
      "question": "What is the difference between a Level Shifter and an Isolation Cell in low-power SoC implementation?",
      "options": [
        "Level shifters translate signals between differing active voltage domains (e.g. 0.8V to 1.2V); Isolation cells clamp signals when a domain is powered off",
        "Level shifters are pure software constructs; Isolation cells are analog resistors",
        "Level shifters only work on clocks; Isolation cells only work on data",
        "They perform the exact same function with different names"
      ],
      "correct": 0,
      "explanation": "A Level Shifter translates logic voltage thresholds between two powered domains operating at different voltage potentials (e.g., 0.75V VDD_CORE to 1.8V VDD_IO). An Isolation Cell is an enable-gated clamp that holds lines stable when one domain has its power rail disconnected entirely.",
      "recommendedTutorial": "/low-power/",
      "recommendedProblem": "voltage-margin-monitor",
      "recommendedPath": "cdc-low-power"
    },
    {
      "id": "aa-4",
      "domain": "advanced-architecture",
      "modes": [
        "standard",
        "advanced"
      ],
      "difficulty": "hard",
      "question": "In high-speed chiplet protocols (such as UCIe / PCIe Flit transfers), what is the function of the Replay Buffer and CRC framing?",
      "options": [
        "To compress payload data by 50%",
        "To retain transmitted flits in a local buffer until an ACK is received from the remote die, replaying flits automatically if a NAK or CRC error occurs",
        "To convert parallel data into optical pulses",
        "To eliminate the need for clock distribution"
      ],
      "correct": 1,
      "explanation": "In physical chiplet interconnects, bit errors can occur across package traces. The Link Layer wraps flits in CRC and stores outgoing flits in a Replay Buffer. When the receiver detects a CRC error, it issues a NAK, prompting the transmitter to replay all unacknowledged flits without software intervention.",
      "recommendedTutorial": "/chiplets-ucie/",
      "recommendedProblem": "chiplet-link-initialization-fsm",
      "recommendedPath": "advanced-soc-rtl"
    },
    {
      "id": "aa-5",
      "domain": "advanced-architecture",
      "modes": [
        "advanced"
      ],
      "difficulty": "hard",
      "question": "In a Network-on-Chip (NoC) crossbar router, why does \"Head-of-Line (HoL) Blocking\" occur in simple FIFO ingress buffers, and how do Virtual Channels (VCs) solve it?",
      "options": [
        "HoL blocking occurs when a stalled packet at the front of a FIFO prevents subsequent packets destined for idle output ports from advancing; Virtual Channels solve this by multiplexing multiple independent logical queues over the same physical link",
        "HoL blocking only occurs in software operating systems",
        "Virtual channels double the physical wire count on the silicon die",
        "HoL blocking is solved by increasing the clock frequency"
      ],
      "correct": 0,
      "explanation": "In a single FIFO, if the head flit is blocked by a busy destination port, all subsequent flits behind it are stuck even if their intended egress ports are completely free. Virtual Channels provide separate buffer queues sharing physical link wires, allowing non-blocked packets to bypass stalled queues.",
      "recommendedTutorial": "/chiplets-ucie/",
      "recommendedProblem": "multi-channel-packet-scheduler",
      "recommendedPath": "advanced-soc-rtl"
    },
    {
      "id": "aa-6",
      "domain": "advanced-architecture",
      "modes": [
        "advanced"
      ],
      "difficulty": "hard",
      "question": "In a Deficit Round-Robin (DRR) or Weighted Round-Robin interconnect scheduler, how are credits allocated to prevent bandwidth starvation of low-priority channels?",
      "options": [
        "Channels with zero credits are permanently killed",
        "In each round, every channel is credited with its configured weight quota; unspent credits accumulate up to a maximum deficit limit, ensuring deterministic bandwidth sharing",
        "Channels take turns based on random number seeds",
        "Only the channel with the lowest numerical ID receives grants"
      ],
      "correct": 1,
      "explanation": "Weighted Deficit Round-Robin assigns each queue a quantum weight per round. When granted, a channel consumes credits proportional to packet size. If a channel cannot send, its deficit credits carry forward to the next round, preventing burst starvation while guaranteeing proportional bandwidth.",
      "recommendedTutorial": "/protocols/",
      "recommendedProblem": "weighted-round-robin-arbiter",
      "recommendedPath": "advanced-soc-rtl"
    }  ];

  // Assessment Modes Configuration
  const MODES = {
    quick: {
      id: 'quick',
      name: 'Quick Assessment',
      durationMinutes: 10,
      questionCount: 10,
      description: '10 focused questions (1 per domain). Ideal for an immediate technical baseline and finding key areas to improve.',
      filter: q => q.modes.includes('quick')
    },
    standard: {
      id: 'standard',
      name: 'Standard Assessment',
      durationMinutes: 30,
      questionCount: 25,
      description: '25 comprehensive questions covering code comprehension, waveforms, state machines, and hardware debugging.',
      filter: q => q.modes.includes('standard')
    },
    advanced: {
      id: 'advanced',
      name: 'Advanced RTL Assessment',
      durationMinutes: 50,
      questionCount: 30,
      description: 'Deep industry-level evaluation covering CDC, asynchronous FIFOs, protocol handshakes, credit flow control, and SoC architecture.',
      filter: q => q.modes.includes('advanced')
    }
  };

  function getQuestionsForMode(modeId) {
    const mode = MODES[modeId] || MODES.quick;
    const filtered = QUESTIONS.filter(mode.filter);
    // Ensure all 10 domains are represented
    return filtered.slice(0, mode.questionCount);
  }

  function getDomains() {
    return DOMAINS;
  }

  function getModes() {
    return Object.values(MODES);
  }

  function calculateSkillReport(answersMap, activeQuestions) {
    // answersMap: { questionId: selectedIndex }
    const domainStats = {};
    DOMAINS.forEach(d => {
      domainStats[d.id] = { id: d.id, name: d.name, total: 0, correct: 0, scorePct: 0, level: 'Not Assessed' };
    });

    let overallTotal = activeQuestions.length;
    let overallCorrect = 0;
    const detailedResults = [];

    activeQuestions.forEach(q => {
      const userChoice = answersMap[q.id];
      const isCorrect = userChoice === q.correct;
      if (isCorrect) overallCorrect++;

      const d = domainStats[q.domain];
      if (d) {
        d.total++;
        if (isCorrect) d.correct++;
      }

      detailedResults.push({
        questionId: q.id,
        domain: q.domain,
        question: q.question,
        userChoice: userChoice !== undefined ? userChoice : null,
        correctChoice: q.correct,
        isCorrect,
        explanation: q.explanation,
        recommendedTutorial: q.recommendedTutorial,
        recommendedProblem: q.recommendedProblem,
        recommendedPath: q.recommendedPath
      });
    });

    // Compute domain scores and skill levels
    const strongest = [];
    const weakest = [];
    const unassessed = [];

    DOMAINS.forEach(d => {
      const stat = domainStats[d.id];
      if (stat.total === 0) {
        stat.level = 'Not Assessed';
        unassessed.push(stat.name);
      } else {
        const pct = Math.round((stat.correct / stat.total) * 100);
        stat.scorePct = pct;
        if (pct >= 85) stat.level = 'Expert';
        else if (pct >= 70) stat.level = 'Advanced';
        else if (pct >= 50) stat.level = 'Intermediate';
        else if (pct >= 30) stat.level = 'Developing';
        else stat.level = 'Beginner';

        if (pct >= 70) strongest.push(stat.name);
        else weakest.push(stat.name);
      }
    });

    const overallScorePct = overallTotal > 0 ? Math.round((overallCorrect / overallTotal) * 100) : 0;
    let overallClassification = 'Beginner';
    if (overallScorePct >= 85) overallClassification = 'Expert';
    else if (overallScorePct >= 70) overallClassification = 'Advanced';
    else if (overallScorePct >= 50) overallClassification = 'Intermediate';
    else if (overallScorePct >= 30) overallClassification = 'Developing';

    // Collect targeted recommendations based on missed questions
    const recMap = new Map();
    detailedResults.filter(r => !r.isCorrect).forEach(r => {
      if (r.recommendedProblem && !recMap.has(r.recommendedProblem)) {
        recMap.set(r.recommendedProblem, {
          problem: r.recommendedProblem,
          tutorial: r.recommendedTutorial,
          path: r.recommendedPath,
          domain: r.domain
        });
      }
    });

    return {
      overallTotal,
      overallCorrect,
      overallScorePct,
      overallClassification,
      domainStats: Object.values(domainStats),
      strongest,
      weakest,
      unassessed,
      recommendations: Array.from(recMap.values()).slice(0, 6),
      detailedResults
    };
  }

  global.EcrioniXSkillAssessment = {
    DOMAINS,
    MODES,
    QUESTIONS,
    getQuestionsForMode,
    getDomains,
    getModes,
    calculateSkillReport
  };

})(typeof window !== 'undefined' ? window : globalThis);
