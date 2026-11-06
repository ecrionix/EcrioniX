/* EcrioniX RTL Learning Paths Data & Progress Engine */
(function (global) {
  'use strict';

  const LEARNING_PATHS = [
    {
      id: 'verilog-fundamentals',
      slug: 'verilog-fundamentals',
      title: 'Verilog Fundamentals',
      shortDesc: 'Master digital logic primitives, Verilog-2001 syntax, continuous assignments, and basic arithmetic circuits.',
      difficulty: 'Beginner',
      levelBadge: 'L1–L2',
      color: '#38bdf8',
      estimatedDuration: '4–6 weeks',
      prerequisites: 'High-school boolean algebra and basic binary numbering.',
      targetAudience: 'Engineering undergraduates, software engineers pivoting to hardware, and VLSI beginners.',
      goal: 'Confidently write, simulate, and debug combinational Verilog modules independently.',
      tutorialLink: '/digital-electronics/',
      tutorialTitle: 'Digital Electronics Guide',
      modules: [
        {
          id: 'mod-1',
          number: 1,
          title: 'Module Structure & Wire Connections',
          objective: 'Understand synthesizable module declarations, port lists, wire data types, and continuous assignments.',
          topics: ['Module syntax', 'Port directions (input/output)', 'Wire vs reg', 'Continuous assignment (assign)'],
          problemSlugs: ['wire-passthrough'],
          tutorialUrl: '/verilog/',
          estimatedMinutes: 20
        },
        {
          id: 'mod-2',
          number: 2,
          title: 'Bitwise Inversion & NOT Logic',
          objective: 'Master bitwise negation (~), logical negation (!), reduction operators, and signal propagation.',
          topics: ['Bitwise NOT', 'Bit vector indexing', 'Multi-bit inversion'],
          problemSlugs: ['not-gate'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 25
        },
        {
          id: 'mod-3',
          number: 3,
          title: 'Basic Logic Gates (AND, OR, XOR)',
          objective: 'Implement 2-input and multi-input combinational logic using Verilog bitwise operators.',
          topics: ['Bitwise AND (&)', 'Bitwise OR (|)', 'Exclusive OR (^)', 'Truth tables'],
          problemSlugs: ['and-gate', 'or-gate', 'xor-gate'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 35
        },
        {
          id: 'mod-4',
          number: 4,
          title: '2:1 Multiplexers & Conditional Operators',
          objective: 'Learn data steering and ternary conditional operators (? :) for hardware multiplexing.',
          topics: ['Ternary operator', 'Mux hardware synthesis', 'Glitch avoidance in data paths'],
          problemSlugs: ['mux2to1'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 30
        },
        {
          id: 'mod-5',
          number: 5,
          title: '4:1 Multiplexers & Multi-Input Routing',
          objective: 'Synthesize 4-to-1 multiplexers using nested ternary operators and multi-bit select buses.',
          topics: ['2-bit select vectors', 'Bus routing', 'Nested conditionals', 'Resource cost of muxes'],
          problemSlugs: ['mux4to1'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 40
        },
        {
          id: 'mod-6',
          number: 6,
          title: 'Encoders & Decoders',
          objective: 'Translate between binary representations, one-hot vectors, and address decoding lines.',
          topics: ['2-to-4 address decoding', 'Active-high enable gating', 'One-hot encoding'],
          problemSlugs: ['decoder-2to4'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 45
        },
        {
          id: 'mod-7',
          number: 7,
          title: 'Half Adders & Arithmetic Primitives',
          objective: 'Derive sum and carry-out boolean equations for foundational binary addition.',
          topics: ['Sum using XOR', 'Carry using AND', 'Half adder delay path'],
          problemSlugs: ['half-adder'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 30
        },
        {
          id: 'mod-8',
          number: 8,
          title: 'Full Adders & Carry Chains',
          objective: 'Cascade half adders with carry-in to build multi-bit ripple-carry adders.',
          topics: ['Carry-in propagation', 'Ripple carry adder critical path', 'Multi-bit vector addition'],
          problemSlugs: ['full-adder', 'ripple-carry-adder4'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 50
        },
        {
          id: 'mod-9',
          number: 9,
          title: 'Magnitude Comparators',
          objective: 'Implement 4-bit relational comparators evaluating greater-than, less-than, and equal-to.',
          topics: ['Relational operators (>, <, ==)', 'Signed vs unsigned comparison', 'Priority resolution'],
          problemSlugs: ['comparator-4bit'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 40
        },
        {
          id: 'mod-10',
          number: 10,
          title: 'Testbench Fundamentals & Signal Verification',
          objective: 'Verify combinational designs against test vectors, assert conditions, and check golden outputs.',
          topics: ['Initial blocks', 'Delay generation (#)', 'Self-checking testbenches', '$display and $finish'],
          problemSlugs: ['equality-checker-8bit'],
          tutorialUrl: '/verilog/',
          estimatedMinutes: 45
        }
      ]
    },

    {
      id: 'combinational-rtl',
      slug: 'combinational-rtl',
      title: 'Combinational RTL Design',
      shortDesc: 'Master procedural always blocks, case statements, priority encoders, signed arithmetic, and latch-free synthesizable RTL.',
      difficulty: 'Intermediate',
      levelBadge: 'L2–L3',
      color: '#2dd4bf',
      estimatedDuration: '4–6 weeks',
      prerequisites: 'Verilog Fundamentals (Path 1) or equivalent digital logic experience.',
      targetAudience: 'Hardware students preparing for technical interviews and ASIC design roles.',
      goal: 'Write clean, latch-free combinational logic with optimal area and timing metrics.',
      tutorialLink: '/digital-electronics/',
      tutorialTitle: 'Combinational Logic Synthesis',
      modules: [
        {
          id: 'mod-1',
          number: 1,
          title: 'Procedural Blocks & Sensitivity Lists',
          objective: 'Master always @* and always_comb semantics for pure combinational logic.',
          topics: ['Combinational always @*', 'Reg types in procedural blocks', 'Sensitivity list completeness'],
          problemSlugs: ['mux8to1'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 35
        },
        {
          id: 'mod-2',
          number: 2,
          title: 'Case Statements & Priority Encoders',
          objective: 'Implement parallel vs priority logic decoding using case, casex, casez and if-else ladders.',
          topics: ['Priority encoder trees', 'Default case handling', 'Synthesized priority logic depth'],
          problemSlugs: ['priority-encoder-8to3'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 45
        },
        {
          id: 'mod-3',
          number: 3,
          title: 'Arithmetic Logic Units (ALU)',
          objective: 'Design parameterizable multi-operation ALUs supporting ADD, SUB, AND, OR, XOR, and SLT.',
          topics: ['Operation opcode decoding', 'Resource sharing in add/sub', 'Zero flag calculation'],
          problemSlugs: ['alu-4bit', 'add-sub-unit'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 60
        },
        {
          id: 'mod-4',
          number: 4,
          title: 'Barrel Shifters & Rotators',
          objective: 'Implement logarithmic barrel shifters and rotators for high-performance DSP data paths.',
          topics: ['Logical shift vs arithmetic shift', 'Cyclic rotation', 'Multiplexer array scaling'],
          problemSlugs: ['barrel-shifter', 'barrel-rotator'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 50
        },
        {
          id: 'mod-5',
          number: 5,
          title: 'Seven-Segment & Display Decoders',
          objective: 'Convert BCD and Hexadecimal nibbles to 7-segment display control lines.',
          topics: ['Active-low cathode drive', 'Lookup table synthesis', 'Illegal input handling'],
          problemSlugs: ['bcd-7segment', 'hex-7segment-decoder'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 40
        },
        {
          id: 'mod-6',
          number: 6,
          title: 'Signed Arithmetic & Two\'s Complement',
          objective: 'Understand Verilog signed types, two\'s complement negation, sign extension, and signed comparators.',
          topics: ['$signed attribute', 'Bit width extension rules', 'Signed vs unsigned overflow'],
          problemSlugs: ['twos-complement-negator', 'signed-comparator'],
          tutorialUrl: '/twos-complement/',
          estimatedMinutes: 45
        },
        {
          id: 'mod-7',
          number: 7,
          title: 'Signed Overflow & Saturating Adders',
          objective: 'Prevent audio/graphics wrap-around clipping using hardware saturation clamps.',
          topics: ['Signed overflow flags (V)', 'Clamping to MAX_INT / MIN_INT', 'DSP arithmetic'],
          problemSlugs: ['signed-overflow-detector', 'saturating-adder'],
          tutorialUrl: '/twos-complement/',
          estimatedMinutes: 50
        },
        {
          id: 'mod-8',
          number: 8,
          title: 'Population Count & Leading Zero Counters',
          objective: 'Design parallel adder trees for bit counting (popcount) and leading zero detection.',
          topics: ['Wallace-tree popcount', 'Priority encoder for LZ', 'Floating-point normalization'],
          problemSlugs: ['popcount8', 'leading-zero-counter'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 55
        },
        {
          id: 'mod-9',
          number: 9,
          title: 'Parity Trees & Hamming Error Correction',
          objective: 'Construct XOR parity generators and Hamming (7,4) single-error correction matrix decoders.',
          topics: ['Odd/Even parity', 'Syndrome calculation', 'Single-error correction (SEC)'],
          problemSlugs: ['parity-generator', 'hamming74-encoder'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 60
        },
        {
          id: 'mod-10',
          number: 10,
          title: 'Latch Avoidance & Synthesis Cleanliness',
          objective: 'Identify and eliminate inferred latches caused by incomplete if/case branching in combinational blocks.',
          topics: ['Inferred latch hazards', 'Default variable assignments', 'Synthesis warning flags'],
          problemSlugs: ['demux-1to4'],
          tutorialUrl: '/synthesis/',
          estimatedMinutes: 35
        }
      ]
    },

    {
      id: 'sequential-rtl',
      slug: 'sequential-rtl',
      title: 'Sequential RTL Design',
      shortDesc: 'Understand clocked storage, synchronous vs asynchronous resets, counters, shift registers, and Moore/Mealy FSM design.',
      difficulty: 'Intermediate',
      levelBadge: 'L3–L4',
      color: '#a78bfa',
      estimatedDuration: '5–7 weeks',
      prerequisites: 'Combinational RTL Design (Path 2).',
      targetAudience: 'RTL engineers transitioning from pure logic to synchronous sequential hardware.',
      goal: 'Design robust finite state machines and synchronous sequential controllers free of hold/setup hazards.',
      tutorialLink: '/digital-electronics/',
      tutorialTitle: 'Sequential Logic & State Machines',
      modules: [
        {
          id: 'mod-1',
          number: 1,
          title: 'Flip-Flop Primitives & Non-Blocking Assignments',
          objective: 'Understand D flip-flop edge triggering, setup/hold times, and proper use of non-blocking (<=) operators.',
          topics: ['posedge clk triggers', 'Non-blocking assignment rules', 'Race-condition prevention'],
          problemSlugs: ['d-flip-flop', 'toggle-ff'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 30
        },
        {
          id: 'mod-2',
          number: 2,
          title: 'Synchronous vs Asynchronous Reset',
          objective: 'Evaluate hardware tradeoffs, glitch vulnerability, and deassertion recovery in reset schemes.',
          topics: ['Sync vs async reset', 'Reset deassertion recovery time', 'FPGA dedicated reset pins'],
          problemSlugs: ['dff-sync-reset', 'dff-async-reset'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 40
        },
        {
          id: 'mod-3',
          number: 3,
          title: 'Clock Enables & Clock Gating',
          objective: 'Implement synchronous data gating without cutting off clock distribution trees directly.',
          topics: ['Data recirculate on enable', 'Clock gating vs enable register', 'Dynamic power savings'],
          problemSlugs: ['dff-enable', 'clock-enable-generator'],
          tutorialUrl: '/low-power/',
          estimatedMinutes: 45
        },
        {
          id: 'mod-4',
          number: 4,
          title: 'Binary Up/Down Counters',
          objective: 'Design multi-bit counters with synchronous load, enable, and direction controls.',
          topics: ['Mod-2^N counters', 'Synchronous load override', 'Terminal count carry-out'],
          problemSlugs: ['binary-counter', 'updown-counter'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 45
        },
        {
          id: 'mod-5',
          number: 5,
          title: 'Decade & Modulo Counters',
          objective: 'Design non-power-of-two counters with synchronous rollover and glitch-free decode.',
          topics: ['Decade Mod-10 counters', 'Mod-6 time counters', 'BCD rollover logic'],
          problemSlugs: ['decade-counter-mod10', 'mod6-counter'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 45
        },
        {
          id: 'mod-6',
          number: 6,
          title: 'Shift Registers (SISO, SIPO, PISO)',
          objective: 'Construct serial-to-parallel and parallel-to-serial conversion registers for communication interfaces.',
          topics: ['SIPO deserialization', 'PISO serialization', 'Scan chains'],
          problemSlugs: ['shift-register-4bit', 'shift-register-sipo', 'piso-shift-register'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 55
        },
        {
          id: 'mod-7',
          number: 7,
          title: 'Edge Detectors & Pulse Generators',
          objective: 'Capture rising, falling, and both-edge transitions and emit clean 1-cycle pulses.',
          topics: ['Single-stage register delay', 'Rising edge (in & ~in_d)', '1-shot pulse generation'],
          problemSlugs: ['rising-edge-detector', 'one-shot-pulse-generator'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 40
        },
        {
          id: 'mod-8',
          number: 8,
          title: 'Ring & Johnson Counters',
          objective: 'Design one-hot ring counters and twisted-ring Johnson counters with glitch-free decoding.',
          topics: ['One-hot circulating token', 'Johnson 2N state count', 'Self-correcting state recovery'],
          problemSlugs: ['ring-counter', 'johnson-counter'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 45
        },
        {
          id: 'mod-9',
          number: 9,
          title: 'Moore Finite State Machines',
          objective: 'Implement 3-block Moore FSMs where outputs depend solely on current state registers.',
          topics: ['State register, next-state logic, output logic', 'Glitch-free outputs', 'Sequence detection'],
          problemSlugs: ['moore-sequence-detector-1011', 'traffic-light-fsm'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 65
        },
        {
          id: 'mod-10',
          number: 10,
          title: 'Mealy Finite State Machines & Overlap Detection',
          objective: 'Design Mealy FSMs with immediate input-dependent outputs and compare against Moore latency.',
          topics: ['Mealy vs Moore tradeoffs', 'Overlapping vs non-overlapping patterns', 'Output register retiming'],
          problemSlugs: ['mealy-sequence-detector-101', 'sequence-detector-101-nonoverlap'],
          tutorialUrl: '/digital-electronics/',
          estimatedMinutes: 65
        }
      ]
    },

    {
      id: 'fifo-design',
      slug: 'fifo-design',
      title: 'Memory and FIFO Design',
      shortDesc: 'From single-port SRAM inference to parameterized synchronous FIFOs, programmable watermarks, and dual-clock asynchronous FIFOs.',
      difficulty: 'Advanced',
      levelBadge: 'L5–L8',
      color: '#fbbf24',
      estimatedDuration: '5–8 weeks',
      prerequisites: 'Sequential RTL Design (Path 3) and synchronous timing fundamentals.',
      targetAudience: 'ASIC/SoC engineers designing streaming buffers, memory controllers, and inter-domain queues.',
      goal: 'Implement silicon-proven FIFO queues capable of sustained 100% throughput without underflow or overflow.',
      tutorialLink: '/courses/',
      tutorialTitle: 'Memory & FIFO Architecture Course',
      modules: [
        {
          id: 'mod-1',
          number: 1,
          title: 'Synchronous RAM Inference & Memory Arrays',
          objective: 'Infer block RAMs (BRAM) using synthesizable Verilog array syntax with synchronous write enables.',
          topics: ['reg [DATA_WIDTH-1:0] mem [0:DEPTH-1]', 'Write-first vs read-first', 'Address registers'],
          problemSlugs: ['synchronous-ram', 'single-port-ram-we'],
          tutorialUrl: '/courses/',
          estimatedMinutes: 45
        },
        {
          id: 'mod-2',
          number: 2,
          title: 'Dual-Port RAM & Register Files',
          objective: 'Implement multi-read, single-write register files with write-through forwarding.',
          topics: ['Dual-port read access', 'Simultaneous read/write to same address', 'Forwarding multiplexers'],
          problemSlugs: ['dual-port-ram', 'register-file-3read-1write'],
          tutorialUrl: '/courses/',
          estimatedMinutes: 55
        },
        {
          id: 'mod-3',
          number: 3,
          title: 'Synchronous FIFO Fundamentals',
          objective: 'Build single-clock circular FIFO buffers managing write pointers, read pointers, and entry counts.',
          topics: ['Circular pointers', 'wr_en && !full push logic', 'rd_en && !empty pop logic'],
          problemSlugs: ['fifo-synchronous'],
          tutorialUrl: '/courses/',
          estimatedMinutes: 50
        },
        {
          id: 'mod-4',
          number: 4,
          title: 'Pointer MSB Wraparound & Full/Empty Detection',
          objective: 'Distinguish full from empty capacity using an extra MSB wrap-around bit on pointers.',
          topics: ['N+1 bit pointer technique', 'MSB inverted with lower bits equal = FULL', 'Zero hardware count storage'],
          problemSlugs: ['fifo-full-empty-detector'],
          tutorialUrl: '/courses/',
          estimatedMinutes: 55
        },
        {
          id: 'mod-5',
          number: 5,
          title: 'FIFO Occupancy & Available Space Tracking',
          objective: 'Maintain precise word occupancy counters with simultaneous push and pop handling.',
          topics: ['Count up/down logic', 'Zero delta on simultaneous push/pop', 'Capacity headroom'],
          problemSlugs: ['fifo-occupancy-counter'],
          tutorialUrl: '/courses/',
          estimatedMinutes: 45
        },
        {
          id: 'mod-6',
          number: 6,
          title: 'Programmable Watermarks (Almost-Full / Almost-Empty)',
          objective: 'Generate proactive flow control threshold signals to absorb pipeline latency.',
          topics: ['Almost-full watermark', 'Almost-empty watermark', 'Threshold register comparators'],
          problemSlugs: ['fifo-almost-full-flag', 'fifo-almost-full-empty-controller'],
          tutorialUrl: '/courses/',
          estimatedMinutes: 60
        },
        {
          id: 'mod-7',
          number: 7,
          title: 'Parameterized Full-Bandwidth Synchronous FIFO',
          objective: 'Design a parameterizable synchronous FIFO supporting continuous simultaneous read and write even when full.',
          topics: ['Simultaneous push/pop when full', 'First-word fall-through (FWFT)', 'Zero idle bubbles'],
          problemSlugs: ['parameterized-sync-fifo'],
          tutorialUrl: '/courses/',
          estimatedMinutes: 65
        },
        {
          id: 'mod-8',
          number: 8,
          title: 'Gray Code Pointers & Conversion Mechanics',
          objective: 'Convert binary pointers to Gray code and back, ensuring exactly 1-bit transitions across multi-bit words.',
          topics: ['Binary to Gray (b ^ (b >> 1))', 'Gray to Binary conversion', 'Metastability reduction'],
          problemSlugs: ['binary-to-gray', 'gray-to-binary'],
          tutorialUrl: '/clock-domain-crossing/',
          estimatedMinutes: 50
        },
        {
          id: 'mod-9',
          number: 9,
          title: 'Asynchronous Pointer Cross-Domain Synchronization',
          objective: 'Pass Gray pointers across unrelated write and read clocks using 2-stage flip-flop synchronizers.',
          topics: ['2-flop Gray pointer CDC', 'Multi-cycle path constraints', 'Pointer pessimism'],
          problemSlugs: ['async-fifo-pointer-sync'],
          tutorialUrl: '/clock-domain-crossing/',
          estimatedMinutes: 60
        },
        {
          id: 'mod-10',
          number: 10,
          title: 'Complete Dual-Clock Asynchronous FIFO',
          objective: 'Implement a full dual-clock asynchronous FIFO with safe full/empty flags, zero data loss, and ASIC synthesis pragmas.',
          topics: ['Write domain full generation', 'Read domain empty generation', '(* ASYNC_REG = "TRUE" *)', 'set_max_delay -datapath_only'],
          problemSlugs: ['dual-clock-async-fifo'],
          tutorialUrl: '/premium-course/async-fifo/',
          estimatedMinutes: 90
        }
      ]
    },

    {
      id: 'protocol-rtl',
      slug: 'protocol-rtl',
      title: 'Protocol RTL Design',
      shortDesc: 'Implement industry-standard AMBA APB, AXI4-Lite, AXI-Stream, and UART/SPI communication interfaces with backpressure.',
      difficulty: 'Advanced',
      levelBadge: 'L6',
      color: '#fb923c',
      estimatedDuration: '6–8 weeks',
      prerequisites: 'Sequential RTL Design (Path 3) and FSM architectures.',
      targetAudience: 'SoC design engineers, verification engineers, and protocol architects.',
      goal: 'Design synthesizable masters, slaves, and interconnect routers adhering strictly to AMBA and serial protocol specifications.',
      tutorialLink: '/protocols/',
      tutorialTitle: 'AMBA & On-Chip Protocol Architecture',
      modules: [
        {
          id: 'mod-1',
          number: 1,
          title: 'Valid-Ready Flow Control & Handshake Contracts',
          objective: 'Master strict AMBA valid-ready handshake rules: valid must remain asserted until ready is granted.',
          topics: ['Decoupled handshaking', 'Combinational dependency rules', 'Backpressure generation'],
          problemSlugs: ['valid-ready-handshake', 'axi-valid-ready-handshake-engine'],
          tutorialUrl: '/protocols/',
          estimatedMinutes: 50
        },
        {
          id: 'mod-2',
          number: 2,
          title: 'Skid Buffers & Register Slices',
          objective: 'Break long combinational ready backpressure timing paths while preserving 100% throughput.',
          topics: ['Forward register slice', 'Backward registered ready', '2-slot primary and skid buffers'],
          problemSlugs: ['skid-buffer', 'axi-stream-register-slice', 'axi-stream-register-slice-full'],
          tutorialUrl: '/protocols/',
          estimatedMinutes: 65
        },
        {
          id: 'mod-3',
          number: 3,
          title: 'APB Slave Controller & Phase FSM',
          objective: 'Implement standard 2-phase APB transfers across IDLE, SETUP, and ACCESS states.',
          topics: ['PSEL & PENABLE timing', 'PWRITE read/write distinction', 'PADDR decoding'],
          problemSlugs: ['apb-slave-controller', 'apb-slave-register-interface'],
          tutorialUrl: '/protocols/',
          estimatedMinutes: 55
        },
        {
          id: 'mod-4',
          number: 4,
          title: 'APB Wait States & PSLVERR Handling',
          objective: 'Implement slave-driven wait-state insertion using PREADY and error reporting via PSLVERR.',
          topics: ['PREADY deassertion', 'Wait state insertion', 'Unmapped address PSLVERR reporting'],
          problemSlugs: ['apb-slave-wait-states'],
          tutorialUrl: '/protocols/',
          estimatedMinutes: 50
        },
        {
          id: 'mod-5',
          number: 5,
          title: 'Memory-Mapped APB Register Bank',
          objective: 'Synthesize standard peripheral register sets: CTRL, STATUS, SCRATCH, and INTERRUPT_EN.',
          topics: ['Memory mapping', 'Read-only vs Read-Write registers', 'Write-strobe bit enables'],
          problemSlugs: ['apb-register-bank'],
          tutorialUrl: '/protocols/',
          estimatedMinutes: 60
        },
        {
          id: 'mod-6',
          number: 6,
          title: 'APB Master Transaction Controller',
          objective: 'Design an APB master state machine translating CPU core read/write requests into compliant APB phases.',
          topics: ['Core request latching', 'SETUP to ACCESS phase timing', 'Slave response completion'],
          problemSlugs: ['apb-master-fsm', 'apb-master-controller'],
          tutorialUrl: '/protocols/',
          estimatedMinutes: 60
        },
        {
          id: 'mod-7',
          number: 7,
          title: 'AXI Write Channel Handshake Controller',
          objective: 'Implement decoupled AW (address) and W (data) channels with write response (B channel) tracking.',
          topics: ['Decoupled address/data timing', 'WLAST burst termination', 'BRESP status decoding'],
          problemSlugs: ['axi-lite-write-fsm', 'axi-write-controller'],
          tutorialUrl: '/protocols/',
          estimatedMinutes: 75
        },
        {
          id: 'mod-8',
          number: 8,
          title: 'AXI Read Channel Burst Controller',
          objective: 'Coordinate AR (read address) issue with multi-beat R (read data) burst responses and RLAST flags.',
          topics: ['ARVALID / ARREADY handshake', 'Multi-beat burst streaming', 'RLAST flag assertions'],
          problemSlugs: ['axi-lite-read-fsm', 'axi-read-controller'],
          tutorialUrl: '/protocols/',
          estimatedMinutes: 75
        },
        {
          id: 'mod-9',
          number: 9,
          title: 'AXI-Stream Arbitration & Packet Framing',
          objective: 'Arbitrate among multi-channel AXI-Stream producers while maintaining packet atomicity between TLAST beats.',
          topics: ['TVALID, TREADY, TDATA, TLAST', 'Round-robin stream arbitration', 'Packet-boundary locking'],
          problemSlugs: ['axi-stream-round-robin-arbiter', 'axi-stream-packet-counter'],
          tutorialUrl: '/protocols/',
          estimatedMinutes: 70
        },
        {
          id: 'mod-10',
          number: 10,
          title: 'UART & SPI Serial Controllers',
          objective: 'Implement UART transmit/receive state machines with baud rate generation and SPI mode controllers.',
          topics: ['Baud rate division', 'Start/Stop bit framing', 'SPI CPOL/CPHA modes', 'Full-duplex shift register'],
          problemSlugs: ['uart-transmitter', 'uart-receiver', 'spi-shift-register', 'spi-mode-selector'],
          tutorialUrl: '/serial-protocols/',
          estimatedMinutes: 70
        }
      ]
    },

    {
      id: 'cdc-low-power',
      slug: 'cdc-low-power',
      title: 'CDC, RDC and Low-Power RTL',
      shortDesc: 'Solve multi-clock domain challenges: 2-flop sync, pulse sync, multi-bit handshakes, glitch-free clock switching, and power sequencing.',
      difficulty: 'Expert',
      levelBadge: 'L7',
      color: '#ef4444',
      estimatedDuration: '6–9 weeks',
      prerequisites: 'Sequential RTL Design (Path 3) and Static Timing Analysis (STA) basics.',
      targetAudience: 'Senior RTL design engineers, synthesis engineers, and SoC integration specialists.',
      goal: 'Build reliable silicon-proven cross-domain hardware immune to metastability, runt pulses, and latch-up hazards.',
      tutorialLink: '/clock-domain-crossing/',
      tutorialTitle: 'Clock Domain Crossing & STA Mastery',
      modules: [
        {
          id: 'mod-1',
          number: 1,
          title: 'Metastability & Two-Flop Synchronizers',
          objective: 'Calculate Mean Time Between Failures (MTBF) and safely synchronize slow-changing control signals.',
          topics: ['Metastability physics', 'MTBF formula', '2-flop vs 3-flop sync', 'Data coherency'],
          problemSlugs: ['two-flop-synchronizer', 'three-flop-synchronizer'],
          tutorialUrl: '/clock-domain-crossing/',
          estimatedMinutes: 45
        },
        {
          id: 'mod-2',
          number: 2,
          title: 'Pulse Synchronizers (Fast-to-Slow & Slow-to-Fast)',
          objective: 'Transfer 1-cycle pulses across unrelated clock domains without losing pulses or causing false double-triggers.',
          topics: ['Toggle flip-flop method', 'Edge-to-pulse detection', 'Pulse stretching'],
          problemSlugs: ['pulse-synchronizer', 'pulse-cdc-controller', 'pulse-stretch-and-sync'],
          tutorialUrl: '/clock-domain-crossing/',
          estimatedMinutes: 60
        },
        {
          id: 'mod-3',
          number: 3,
          title: 'Multi-Bit Bus Handshake Synchronization',
          objective: 'Safely transfer multi-bit data buses across clock domains using 4-phase REQ/ACK level handshakes.',
          topics: ['Bus data skew hazard', 'Level-based 4-phase handshake', 'Hold register data stability'],
          problemSlugs: ['multi-bit-handshake-cdc', 'cdc-bus-hold-register'],
          tutorialUrl: '/clock-domain-crossing/',
          estimatedMinutes: 65
        },
        {
          id: 'mod-4',
          number: 4,
          title: 'Reset Domain Crossing & Reset Synchronizers',
          objective: 'Implement asynchronously asserted, synchronously deasserted reset bridges to prevent recovery time faults.',
          topics: ['Reset recovery and removal times', 'Async assertion, sync deassertion', 'Reset distribution trees'],
          problemSlugs: ['async-reset-synchronizer'],
          tutorialUrl: '/clock-domain-crossing/',
          estimatedMinutes: 50
        },
        {
          id: 'mod-5',
          number: 5,
          title: 'Glitch-Free Clock Multiplexing',
          objective: 'Switch dynamically between two asynchronous clocks without producing runt pulses.',
          topics: ['Runt pulse hazards', 'Negative-edge flip-flop gating', 'Mutual exclusion cross-feedback'],
          problemSlugs: ['glitch-free-clock-mux', 'glitch-free-clock-switching-controller'],
          tutorialUrl: '/low-power/',
          estimatedMinutes: 65
        },
        {
          id: 'mod-6',
          number: 6,
          title: 'Integrated Clock Gating (ICG) Cells',
          objective: 'Design latch-based integrated clock gating cells eliminating combinational glitching on clock lines.',
          topics: ['Clock gating latch behavior', 'ECLK = CLK & LATCH_EN', 'Power format (UPF) mapping'],
          problemSlugs: ['clock-gating-cell'],
          tutorialUrl: '/low-power/',
          estimatedMinutes: 45
        },
        {
          id: 'mod-7',
          number: 7,
          title: 'Programmable Clock Dividers',
          objective: 'Generate integer, odd, and fractional clock division with 50% duty cycle.',
          topics: ['Even division', 'Odd division dual-edge recombination', 'Clock tree jitter considerations'],
          problemSlugs: ['programmable-clock-divider', 'clock-div3'],
          tutorialUrl: '/sta/',
          estimatedMinutes: 55
        },
        {
          id: 'mod-8',
          number: 8,
          title: 'Async-FIFO Empty Flag Synchronization',
          objective: 'Master pessimistic empty flag generation in the read clock domain.',
          topics: ['Empty flag timing', 'Immediate empty assertion', 'Safe delayed empty deassertion'],
          problemSlugs: ['fifo-empty-flag-synchronizer'],
          tutorialUrl: '/premium-course/async-fifo/',
          estimatedMinutes: 55
        },
        {
          id: 'mod-9',
          number: 9,
          title: 'Async-FIFO Full Flag Synchronization',
          objective: 'Master pessimistic full flag generation in the write clock domain.',
          topics: ['Full flag timing', 'Immediate full assertion', 'Safe delayed full deassertion'],
          problemSlugs: ['fifo-full-flag-synchronizer'],
          tutorialUrl: '/premium-course/async-fifo/',
          estimatedMinutes: 55
        },
        {
          id: 'mod-10',
          number: 10,
          title: 'Multi-Rail SoC Power Sequencing Controllers',
          objective: 'Implement deterministic power-up and power-down state machines with watchdog timeout protection.',
          topics: ['IO -> Core -> PLL power ramp', 'Reverse collapse order', 'CMOS latch-up prevention', 'Rail timeout watchdogs'],
          problemSlugs: ['power-rail-sequencer', 'power-sequencing-controller'],
          tutorialUrl: '/low-power/',
          estimatedMinutes: 70
        },
        {
          id: 'mod-11',
          number: 11,
          title: 'Voltage Margin & Brownout Monitors',
          objective: 'Implement digital voltage comparator monitors alerting PMUs of supply dips.',
          topics: ['Brownout detection', 'Voltage droop thresholds', 'Power-management interrupts'],
          problemSlugs: ['voltage-margin-monitor', 'brown-out-reset-detector'],
          tutorialUrl: '/low-power/',
          estimatedMinutes: 50
        },
        {
          id: 'mod-12',
          number: 12,
          title: 'Thermal Throttling & Power-Down FSMs',
          objective: 'Protect high-density chips by triggering dynamic frequency scaling (DFS) under thermal stress.',
          topics: ['Thermal trip points', 'Clock duty throttling', 'Emergency shutdown state machines'],
          problemSlugs: ['overtemp-throttle-monitor'],
          tutorialUrl: '/low-power/',
          estimatedMinutes: 55
        }
      ]
    },

    {
      id: 'advanced-soc-rtl',
      slug: 'advanced-soc-rtl',
      title: 'Advanced SoC and Chiplet RTL',
      shortDesc: 'Multi-channel arbiters, credit-based flow control, UCIe sideband link training, packet schedulers, and streaming bridges.',
      difficulty: 'Industry Challenge',
      levelBadge: 'L6–L8',
      color: '#e879f9',
      estimatedDuration: '7–10 weeks',
      prerequisites: 'Protocol RTL Design (Path 5) and CDC & Low-Power RTL (Path 6).',
      targetAudience: 'Lead RTL engineers, SoC architects, chiplet interconnect designers, and interview candidates.',
      goal: 'Architect complex multi-die chiplet interconnects, packet-locked schedulers, and fault-tolerant SoC controllers.',
      tutorialLink: '/chiplets-ucie/',
      tutorialTitle: 'UCIe & Chiplet Interconnect Architecture',
      modules: [
        {
          id: 'mod-1',
          number: 1,
          title: 'Fixed Priority vs Round-Robin Arbitration',
          objective: 'Contrast starvation-prone fixed priority with fair rotating round-robin arbitration.',
          topics: ['Fixed priority grant tree', 'Round-robin priority pointer rotation', 'Request-grant handshakes'],
          problemSlugs: ['fixed-priority-arbiter', 'round-robin-arbiter'],
          tutorialUrl: '/protocols/',
          estimatedMinutes: 50
        },
        {
          id: 'mod-2',
          number: 2,
          title: 'Multi-Request Round-Robin Arbitration',
          objective: 'Design scalable arbiters handling simultaneous variable requests using priority masks.',
          topics: ['Two-level carry mask trick', 'Leading-one priority selection', 'Zero-bubble grant update'],
          problemSlugs: ['multi-request-round-robin-arbiter'],
          tutorialUrl: '/protocols/',
          estimatedMinutes: 65
        },
        {
          id: 'mod-3',
          number: 3,
          title: 'Weighted Round-Robin (WRR) Scheduling',
          objective: 'Allocate asymmetric interconnect bandwidth using configurable deficit credit weight counters.',
          topics: ['Quality of Service (QoS)', 'Weight replenishment', 'Bandwidth fairness guarantees'],
          problemSlugs: ['weighted-round-robin-arbiter'],
          tutorialUrl: '/protocols/',
          estimatedMinutes: 70
        },
        {
          id: 'mod-4',
          number: 4,
          title: 'Credit-Based Flow Control Counter',
          objective: 'Understand why long-distance chiplet links replace valid-ready backpressure with credit allowances.',
          topics: ['Multi-cycle propagation latency', 'Credit exhaustion stall', 'Credit replenishment on pop'],
          problemSlugs: ['credit-based-flow-control-counter'],
          tutorialUrl: '/chiplets-ucie/',
          estimatedMinutes: 60
        },
        {
          id: 'mod-5',
          number: 5,
          title: 'Chiplet Die-to-Die Credit Flow Controller',
          objective: 'Implement transmitter-side credit tracking with simultaneous flit transmit and credit return.',
          topics: ['Saturating up/down credit counter', 'Zero-credit stall comparator', 'UCIe flit transfer protocol'],
          problemSlugs: ['credit-flow-control-controller'],
          tutorialUrl: '/chiplets-ucie/',
          estimatedMinutes: 75
        },
        {
          id: 'mod-6',
          number: 6,
          title: 'Ingress Buffer Credit Return Manager',
          objective: 'Batch freed buffer credits and manage flush timeout timers to minimize sideband channel overhead.',
          topics: ['Credit batching threshold', 'Idle flush timeout timer', 'Sideband packet bandwidth optimization'],
          problemSlugs: ['credit-return-manager'],
          tutorialUrl: '/chiplets-ucie/',
          estimatedMinutes: 75
        },
        {
          id: 'mod-7',
          number: 7,
          title: 'Elastic Streaming Protocol Bridge',
          objective: 'Bridge differing bus widths and clock rates between on-die AXI-Stream and off-die physical layers.',
          topics: ['Elastic 4-slot flit buffer', 'Decoupled upstream and downstream backpressure', 'TLAST preservation'],
          problemSlugs: ['streaming-protocol-bridge'],
          tutorialUrl: '/chiplets-ucie/',
          estimatedMinutes: 70
        },
        {
          id: 'mod-8',
          number: 8,
          title: 'Multi-Channel Packet Scheduler',
          objective: 'Arbitrate across 4 ingress queues while locking grant between SOP and EOP to prevent interleaving.',
          topics: ['Start-of-packet (SOP) & End-of-packet (EOP)', 'Packet atomicity', 'Locked arbitration'],
          problemSlugs: ['multi-channel-packet-scheduler'],
          tutorialUrl: '/protocols/',
          estimatedMinutes: 80
        },
        {
          id: 'mod-9',
          number: 9,
          title: 'UCIe Sideband Link Initialization FSM',
          objective: 'Model physical sideband link training, lane discovery, and clock locking across multi-die packages.',
          topics: ['UCIe D2D Adapter FSM', 'Sideband handshake states', 'Link training timeout aborts'],
          problemSlugs: ['chiplet-link-initialization-fsm'],
          tutorialUrl: '/chiplets-ucie/',
          estimatedMinutes: 85
        },
        {
          id: 'mod-10',
          number: 10,
          title: 'SoC Watchdogs & Bus Timeout Recovery',
          objective: 'Prevent system-wide deadlock by detecting hung bus transactions and emitting recovery interrupts.',
          topics: ['Watchdog timer decrement', 'Bus slave hang detection', 'Automatic error termination'],
          problemSlugs: ['watchdog-timer', 'bus-timeout-watchdog'],
          tutorialUrl: '/protocols/',
          estimatedMinutes: 65
        }
      ]
    }
  ];

  // Helper APIs
  function getPaths() {
    return LEARNING_PATHS;
  }

  function getPath(pathId) {
    return LEARNING_PATHS.find(p => p.id === pathId || p.slug === pathId) || null;
  }

  function getPathForProblem(problemSlug) {
    for (const p of LEARNING_PATHS) {
      for (const m of p.modules) {
        if (m.problemSlugs.includes(problemSlug)) {
          return { path: p, module: m };
        }
      }
    }
    return null;
  }

  function calculatePathProgress(pathId, solvedSlugsSet) {
    const p = getPath(pathId);
    if (!p) return { totalModules: 0, completedModules: 0, percentage: 0, solvedCount: 0, totalProblems: 0 };
    
    let totalProblems = 0;
    let solvedProblems = 0;
    let completedModules = 0;

    p.modules.forEach(m => {
      totalProblems += m.problemSlugs.length;
      const solvedInMod = m.problemSlugs.filter(s => solvedSlugsSet.has(s)).length;
      solvedProblems += solvedInMod;
      if (solvedInMod === m.problemSlugs.length && m.problemSlugs.length > 0) {
        completedModules++;
      }
    });

    const percentage = totalProblems > 0 ? Math.round((solvedProblems / totalProblems) * 100) : 0;
    return {
      totalModules: p.modules.length,
      completedModules,
      percentage,
      solvedCount: solvedProblems,
      totalProblems
    };
  }

  global.EcrioniXLearningPaths = {
    PATHS: LEARNING_PATHS,
    getPaths,
    getPath,
    getPathForProblem,
    calculatePathProgress
  };

})(typeof window !== 'undefined' ? window : globalThis);
