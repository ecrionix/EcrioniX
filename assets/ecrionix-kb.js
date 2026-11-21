/* EcrioniX Engineering Knowledge Base v2.0 - Offline & Client-Side */
window.__ECX_KB = {
  "version": "2.0.0",
  "updated": "2026-11-21",
  "categories": [
    {
      "id": "vlsi",
      "name": "VLSI Fundamentals",
      "icon": "⚡"
    },
    {
      "id": "rtl",
      "name": "RTL Design & Verilog",
      "icon": "💻"
    },
    {
      "id": "sv",
      "name": "SystemVerilog & Verification",
      "icon": "🔍"
    },
    {
      "id": "protocols",
      "name": "Hardware Protocols",
      "icon": "🔄"
    },
    {
      "id": "sta",
      "name": "Static Timing Analysis",
      "icon": "⏱️"
    },
    {
      "id": "pd",
      "name": "Physical Design",
      "icon": "📐"
    },
    {
      "id": "cdc",
      "name": "CDC & Low Power",
      "icon": "🔋"
    },
    {
      "id": "dft",
      "name": "Design for Test (DFT)",
      "icon": "🔬"
    },
    {
      "id": "arch",
      "name": "Computer Architecture & AI",
      "icon": "🦾"
    },
    {
      "id": "interview",
      "name": "Interview Preparation",
      "icon": "🎯"
    },
    {
      "id": "tools",
      "name": "Tools, Simulators & Labs",
      "icon": "🛠️"
    }
  ],
  "topics": [
    {
      "id": "what-is-vlsi",
      "title": "What is VLSI? (Very Large Scale Integration)",
      "category": "vlsi",
      "keywords": [
        "vlsi",
        "what is vlsi",
        "very large scale integration",
        "chip design",
        "semiconductor basics",
        "ic design"
      ],
      "summary": "VLSI (Very Large Scale Integration) is the process of creating an integrated circuit (IC) by combining millions or billions of MOS transistors onto a single silicon semiconductor microchip.",
      "definition": "VLSI is the technology that packages complex computing architectures—CPUs, GPUs, neural accelerators, memory controllers, and SoCs—into a microscopic die fabricated on silicon wafers.",
      "how_it_works": "The VLSI workflow spans two major domains:\n1. **Front-End (RTL Design & Verification)**: Architecture specification, hardware description coding (Verilog/SystemVerilog), simulation, linting, and formal verification.\n2. **Back-End (Physical Design & Signoff)**: Logic synthesis (mapping RTL to standard cells), floorplanning, placement, clock tree synthesis (CTS), routing, timing closure (STA), DRC/LVS physical verification, and GDSII tape-out.",
      "silicon_example": "A modern smartphone SoC (e.g. Apple A17, Snapdragon 8) packs over 15 to 20 billion transistors into a silicon area smaller than a postage stamp (~100 mm²), running at up to 3.8 GHz.",
      "common_mistakes": "Confusing VLSI with embedded systems or PCB design. VLSI focuses on designing the microscopic silicon integrated circuit die itself, not soldering chips onto a printed circuit board.",
      "follow_ups": [
        "What is the difference between ASIC and FPGA?",
        "Explain the RTL-to-GDS flow.",
        "What are MOSFET and FinFET fundamentals?",
        "Show me the VLSI Career Roadmap."
      ],
      "resources": [
        {
          "title": "VLSI Hub — Complete Chip Design Guide",
          "url": "/vlsi/",
          "desc": "Explore all VLSI fundamentals, tutorials, and deep dives."
        },
        {
          "title": "VLSI Design Flow (Interactive)",
          "url": "/vlsi-design-flow/",
          "desc": "Animated step-by-step walkthrough of RTL to silicon."
        },
        {
          "title": "VLSI Career Roadmap",
          "url": "/vlsi-career-roadmap/",
          "desc": "Guide to VLSI roles: RTL, DV, STA, DFT, and Physical Design."
        }
      ]
    },
    {
      "id": "asic-vs-fpga",
      "title": "ASIC vs FPGA — Full Comparison",
      "category": "vlsi",
      "keywords": [
        "asic vs fpga",
        "fpga vs asic",
        "difference between asic and fpga",
        "compare asic fpga",
        "application specific integrated circuit"
      ],
      "summary": "An ASIC is custom, non-reconfigurable silicon fabricated permanently for one specific task. An FPGA is an off-the-shelf reconfigurable chip made of programmable Look-Up Tables (LUTs) and flip-flops.",
      "definition": "ASIC (Application-Specific Integrated Circuit) offers maximum performance, minimum power, and lowest unit cost at high volume, but carries multi-million dollar NRE mask costs and 1-2 years lead time. FPGA (Field-Programmable Gate Array) allows instantaneous reprogramming and zero silicon fab costs, but has lower clock speeds, higher unit cost, and higher power consumption.",
      "how_it_works": "Key comparison dimensions:\n- **NRE Cost**: ASIC costs $2M–$50M+ in mask sets; FPGA has zero NRE.\n- **Unit Cost**: ASIC is very cheap at volume ($2–$30/chip); FPGA is expensive ($50–$5,000+/chip).\n- **Performance**: ASIC reaches 3–5 GHz; FPGAs typically max out at 300–600 MHz.\n- **Power**: ASIC achieves 5x–10x higher energy efficiency.\n- **Time-to-Market**: FPGA is ready in days; ASIC takes 12–24 months.",
      "silicon_example": "Bitcoin mining transitioned from CPUs to GPUs, then to FPGAs for rapid prototyping, and finally to custom 3nm ASICs that are 10,000x more power-efficient per hash.",
      "common_mistakes": "Thinking FPGAs are obsolete because of ASICs. In reality, every ASIC design is prototyped on massive FPGA emulation racks (e.g., Synopsys HAPS, Cadence Palladium) before tape-out.",
      "follow_ups": [
        "How do Look-Up Tables (LUTs) work in an FPGA?",
        "Explain the RTL-to-GDSII flow for ASICs.",
        "Where can I learn FPGA from scratch?"
      ],
      "resources": [
        {
          "title": "FPGA from Scratch Course",
          "url": "/fpga-from-scratch/",
          "desc": "25-lesson daily course on Verilog, LUTs, FSMs, and FPGA hardware."
        },
        {
          "title": "VLSI Design Flow",
          "url": "/vlsi-design-flow/",
          "desc": "Learn how custom ASICs are taken from Verilog to tape-out."
        }
      ]
    },
    {
      "id": "rtl-to-gds-flow",
      "title": "RTL-to-GDSII Design Flow Explained",
      "category": "vlsi",
      "keywords": [
        "rtl to gds",
        "rtl to gdsii",
        "explain rtl to gds flow",
        "asic flow",
        "physical design flow",
        "tapeout flow",
        "gdsii"
      ],
      "summary": "The RTL-to-GDSII flow transforms high-level Verilog/SystemVerilog code into geometric polygons (GDSII/OASIS format) sent to the semiconductor foundry (TSMC, Intel, Samsung) for fabrication.",
      "definition": "It is the complete backend implementation pipeline: Synthesis → Floorplanning → Placement → Clock Tree Synthesis (CTS) → Routing → Timing/Power Signoff → Physical Verification (DRC/LVS) → Tape-out.",
      "how_it_works": "1. **Logic Synthesis (Yosys/Design Compiler)**: Translates RTL into a gate-level netlist using target foundry standard cell libraries (.lib) constrained by SDC.\n2. **Floorplanning**: Defines die dimensions, core boundaries, I/O pads, and power distribution network (PDN power grids/straps).\n3. **Placement**: Positions millions of standard cells to minimize wirelength and congestion.\n4. **Clock Tree Synthesis (CTS)**: Builds balanced clock distribution networks (inverters/buffers) to minimize clock skew and latency.\n5. **Routing**: Global and detailed routing connecting all cell pins using copper/cobalt metal layers.\n6. **Signoff**: Static Timing Analysis (PrimeTime/OpenSTA), IR Drop (RedHawk), DRC (Design Rule Check) and LVS (Layout vs Schematic) in Calibre.",
      "silicon_example": "OpenLane uses Yosys, OpenROAD, Magic, Netgen, and KLayout to autonomously run the entire RTL-to-GDSII flow on the SkyWater 130nm open-source PDK.",
      "common_mistakes": "Believing physical design is just 'clicking run'. Over 70% of engineering time is spent fixing routing congestion, timing violations (setup/hold), electromigration, and antenna rules.",
      "follow_ups": [
        "What is Clock Tree Synthesis (CTS)?",
        "What is Floorplanning and Power Grid Design?",
        "Try the OpenLane RTL-to-GDSII Guide on EcrioniX."
      ],
      "resources": [
        {
          "title": "Physical Design 20-Day Course",
          "url": "/physical-design/",
          "desc": "Complete guide from netlist to GDSII signoff."
        },
        {
          "title": "OpenLane Guide",
          "url": "/tools/openlane/",
          "desc": "Full reference guide for open-source RTL-to-GDSII flow."
        }
      ]
    },
    {
      "id": "mosfet-finfet-gaa",
      "title": "MOSFET vs FinFET vs GAA (Gate-All-Around)",
      "category": "vlsi",
      "keywords": [
        "mosfet",
        "finfet",
        "gaa",
        "finfet vs planar",
        "gate all around",
        "nanosheet",
        "transistor fundamentals"
      ],
      "summary": "Transistors evolved from planar MOSFETs to 3D FinFETs and now to Gate-All-Around (GAA) nanosheets to maintain electrostatic gate control and curb leakage current below 3nm.",
      "definition": "As planar MOSFET gate lengths shrunk below 20nm, drain-induced barrier lowering (DIBL) and subthreshold leakage skyrocketed. FinFET wrapped the gate on 3 sides of a vertical silicon fin. GAA nanosheets wrap the gate completely around 4 sides of horizontal silicon sheets.",
      "how_it_works": "- **Planar (28nm and above)**: Gate is on top of channel. Prone to severe short-channel effects below 20nm.\n- **FinFET (16nm down to 3nm)**: Thin vertical silicon fin surrounded on 3 sides by the gate electrode, dramatically increasing drive current ($I_{on}$) and reducing leakage ($I_{off}$).\n- **GAA / Nanosheet (2nm and below)**: Multiple stacked horizontal ribbons of silicon surrounded on all 4 sides by high-k metal gate, enabling maximum channel control, variable sheet widths, and reduced parasitic capacitance.",
      "silicon_example": "TSMC N3, Intel 18A (RibbonFET), and Samsung 3nm GAA are current cutting-edge implementations powering modern AI and mobile chips.",
      "common_mistakes": "Thinking Moore's Law is strictly about transistor speed. In modern sub-5nm nodes, scaling is primarily power-constrained (thermal design power, or dark silicon).",
      "follow_ups": [
        "What is CMOS inverter operation?",
        "What is static vs dynamic power consumption?",
        "Read FinFET vs GAA Transistors interactive guide."
      ],
      "resources": [
        {
          "title": "FinFET vs GAA Transistors",
          "url": "/finfet-vs-gaa/",
          "desc": "Interactive 3D transistor architecture visualizer."
        },
        {
          "title": "Transistor Evolution & Scaling",
          "url": "/transistor-evolution/",
          "desc": "Timeline of semiconductor scaling from microns to angstroms."
        }
      ]
    },
    {
      "id": "blocking-vs-non-blocking",
      "title": "Blocking (=) vs Non-Blocking (<=) Assignments",
      "category": "rtl",
      "keywords": [
        "blocking vs non-blocking",
        "blocking nonblocking",
        "difference between blocking and non-blocking",
        "verilog assignments",
        "procedural assignments"
      ],
      "summary": "Blocking assignments (=) execute sequentially and block the execution of subsequent statements. Non-blocking assignments (<=) schedule their updates at the end of the simulation time step (NBA region) in parallel.",
      "definition": "In Verilog RTL:\n- Use **non-blocking (<=)** for sequential logic (clocked `always @(posedge clk)`).\n- Use **blocking (=)** for combinational logic (`always @(*)` or continuous `assign`).",
      "how_it_works": "When modeling pipeline registers or shift registers:\n- If you use blocking (=) in sequential code, the first register updates immediately, and the second register sees the new value within the exact same clock edge, collapsing your pipeline into a single register!\n- If you use non-blocking (<=), all registers read their old values before any update is committed, faithfully modeling physical parallel D flip-flops.",
      "verilog_example": "// CORRECT Shift Register (Non-blocking)\nalways @(posedge clk or negedge rst_n) begin\n  if (!rst_n) begin\n    q1 <= 1'b0;\n    q2 <= 1'b0;\n  end else begin\n    q1 <= d;\n    q2 <= q1; // q2 captures q1's PREVIOUS value\n  end\nend\n\n// INCORRECT (Blocking) - Synthesizes wrong or race condition!\nalways @(posedge clk) begin\n  q1 = d;\n  q2 = q1; // q2 gets d immediately! Fails to shift!\nend",
      "common_mistakes": "Mixing blocking and non-blocking assignments in the same `always` block, or assigning to the same variable in multiple `always` blocks, causing simulation-synthesis mismatches and synthesis errors.",
      "follow_ups": [
        "Write a Verilog 4-bit counter.",
        "How do FSMs use blocking vs non-blocking assignments?",
        "Open the Online Verilog Simulator to test this code."
      ],
      "resources": [
        {
          "title": "Verilog Tutorials",
          "url": "/verilog/",
          "desc": "Master Verilog HDL syntax, behavioral modeling, and testbenches."
        },
        {
          "title": "RTL Design Hub",
          "url": "/rtl_design/",
          "desc": "Best practices for writing clean, synthesizable RTL."
        },
        {
          "title": "Online Verilog Simulator",
          "url": "/tools/verilog-simulator/",
          "desc": "Run and simulate Verilog code live in your browser."
        }
      ]
    },
    {
      "id": "verilog-4bit-counter",
      "title": "Verilog 4-Bit Up-Counter (Synthesizable RTL + Testbench)",
      "category": "rtl",
      "keywords": [
        "4-bit counter",
        "write a verilog 4-bit counter",
        "counter verilog",
        "4 bit counter rtl",
        "verilog counter code",
        "up counter"
      ],
      "summary": "A 4-bit synchronous binary up-counter increments from 4'b0000 (0) to 4'b1111 (15) on each positive clock edge when enabled, wrapping back to 0.",
      "definition": "A foundational sequential RTL circuit containing 4 flip-flops and combinational increment logic with asynchronous active-low reset.",
      "how_it_works": "The counter evaluates `rst_n` asynchronously. On a rising clock edge, if `en` is asserted, `count` increments by 1. When it reaches 15, `count + 1` naturally overflows back to 0 in 4-bit modular arithmetic.",
      "verilog_example": "// Synthesizable 4-bit Synchronous Up-Counter\nmodule counter_4bit (\n  input  wire       clk,\n  input  wire       rst_n,\n  input  wire       en,\n  output reg  [3:0] count\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n) begin\n      count <= 4'b0000;\n    end else if (en) begin\n      count <= count + 1'b1;\n    end\n  end\n\nendmodule",
      "silicon_example": "Counters form the core of timers, Baud-rate generators in UARTs, program counters (PC) in RISC-V CPUs, and FIFO address pointers.",
      "common_mistakes": "Forgetting reset condition (leaving flip-flops uninitialized in X state in simulation), or using blocking `=` instead of `<=` inside the clocked block.",
      "follow_ups": [
        "How do you design a BCD counter (counts 0 to 9)?",
        "How do FIFO read and write pointers use counters?",
        "Run this counter in the Verilog Simulator."
      ],
      "resources": [
        {
          "title": "Online Verilog Simulator",
          "url": "/tools/verilog-simulator/",
          "desc": "Simulate this counter live and inspect waveforms."
        },
        {
          "title": "Verilog Spot-the-Bug Game",
          "url": "/tools/verilog-spot-the-bug/",
          "desc": "Practice identifying subtle sequential RTL bugs."
        }
      ]
    },
    {
      "id": "fsm-design",
      "title": "FSM Design — Moore vs Mealy State Machines",
      "category": "rtl",
      "keywords": [
        "fsm",
        "fsm design",
        "moore vs mealy",
        "finite state machine",
        "state machine verilog",
        "3-always block fsm"
      ],
      "summary": "A Finite State Machine (FSM) models sequential control logic. In a Moore machine, outputs depend solely on the current state. In a Mealy machine, outputs depend on both current state and current inputs.",
      "definition": "The industry standard for robust synthesizable FSMs is the **3-always block architecture**:\n1. State register (sequential, clocked, non-blocking `<=`).\n2. Next-state logic (combinational, `always @(*)`, blocking `=`).\n3. Output logic (registered for glitch-free outputs).",
      "how_it_works": "Comparison:\n- **Moore**: Safer, glitch-free outputs, but can introduce one cycle of latency.\n- **Mealy**: Responds within the current cycle to input changes (fewer states required), but inputs can propagate directly through combinational logic to outputs, creating critical path timing hazards and glitches.",
      "verilog_example": "// 3-Always Block FSM (Moore 101 Detector)\ntypedef enum logic [1:0] {IDLE, S1, S10, S101} state_t;\nstate_t current_state, next_state;\n\n// 1. State Register\nalways_ff @(posedge clk or negedge rst_n) begin\n  if (!rst_n) current_state <= IDLE;\n  else        current_state <= next_state;\nend\n\n// 2. Next-State Logic\nalways_comb begin\n  next_state = current_state;\n  case (current_state)\n    IDLE: if (din) next_state = S1;\n    S1:   if (!din) next_state = S10;\n    S10:  next_state = din ? S101 : IDLE;\n    S101: next_state = din ? S1 : S10;\n    default: next_state = IDLE;\n  endcase\nend\n\n// 3. Registered Output Logic\nalways_ff @(posedge clk or negedge rst_n) begin\n  if (!rst_n) match <= 1'b0;\n  else match <= (next_state == S101);\nend",
      "common_mistakes": "Incomplete case statements without `default`, inferring unwanted latches in next-state combinational blocks.",
      "follow_ups": [
        "Try the visual FSM Designer tool.",
        "What is One-Hot vs Binary state encoding?",
        "Difference between blocking and non-blocking assignments."
      ],
      "resources": [
        {
          "title": "FSM Designer Tool",
          "url": "/tools/fsm-designer/",
          "desc": "Visually draw FSM bubbles and generate Verilog automatically."
        },
        {
          "title": "RTL Design Hub",
          "url": "/rtl_design/",
          "desc": "Deep dive into synthesizable control logic."
        }
      ]
    },
    {
      "id": "fifo-architecture",
      "title": "FIFO Architecture — Synchronous & Asynchronous",
      "category": "rtl",
      "keywords": [
        "fifo",
        "fifo architecture",
        "sync fifo",
        "asynchronous fifo",
        "async fifo",
        "fifo depth",
        "how fifo works"
      ],
      "summary": "A FIFO (First-In, First-Out) buffer stores data between producer and consumer interfaces. Synchronous FIFOs use a single clock; Asynchronous FIFOs cross two independent, unsynchronized clock domains.",
      "definition": "An Asynchronous FIFO safely transmits data between disparate clock domains using dual-port SRAM/registers, Gray-coded write/read pointers, and multi-stage synchronizers to prevent CDC metastability.",
      "how_it_works": "Asynchronous FIFO core microarchitecture:\n1. **Dual-Port Memory**: Read and write ports have separate clocks (`wclk`, `rclk`).\n2. **Binary Pointers**: Maintained internally for memory addressing.\n3. **Gray-Coded Pointers**: Transmitted across clock domains. Gray code changes only **1 bit at a time**, preventing multi-bit transition skew errors in synchronizers.\n4. **2-FF Synchronizers**: Transfer write pointer to read clock domain (for empty check) and read pointer to write clock domain (for full check).\n5. **Flag Generation**:\n   - `wfull`: Asserted when write pointer catches up with read pointer with MSBs inverted.\n   - `rempty`: Asserted when synchronized write pointer equals read pointer.",
      "silicon_example": "Every PCIe root complex, USB3 PHY, and Network-on-Chip (NoC) uses asynchronous FIFOs to bridge high-speed SerDes and core processor clocks.",
      "common_mistakes": "Synchronizing binary counters directly across clock domains. If binary counter changes from `0111` (7) to `1000` (8), all 4 bits toggle at once; skew can cause the destination domain to capture temporary invalid states like `1111` or `0000`!",
      "follow_ups": [
        "Explain Gray code with an example.",
        "How do you calculate asynchronous FIFO depth?",
        "What is metastability and how does a 2-FF synchronizer resolve it?",
        "Explore the Async FIFO Interactive Lab on EcrioniX."
      ],
      "resources": [
        {
          "title": "Async FIFO Interactive Lab",
          "url": "/tools/async-fifo-lab/",
          "desc": "Simulate read/write pointers and observe Gray code synchronization cycle by cycle."
        },
        {
          "title": "Metastability & CDC FIFO Deep Dive",
          "url": "/vlsi/metastability-cdc-fifo/",
          "desc": "Mathematical derivation of MTBF and pointer flag logic."
        }
      ]
    },
    {
      "id": "gray-code",
      "title": "Gray Code Explained with Binary Conversion Examples",
      "category": "rtl",
      "keywords": [
        "gray code",
        "explain gray code",
        "binary to gray",
        "gray to binary",
        "gray code conversion",
        "gray counter"
      ],
      "summary": "Gray code is an unweighted binary numeral system where two successive values differ in only one bit position. This single-bit transition property makes it essential for CDC pointer synchronization.",
      "definition": "Formula for Binary to Gray conversion:\n`G = B ^ (B >> 1)`\nIn Verilog: `gray = bin ^ (bin >> 1);`",
      "how_it_works": "Consider binary count vs Gray code count:\n- Binary 0 to 3:\n  0: `00` -> Gray `00`\n  1: `01` -> Gray `01` (1 bit flips)\n  2: `10` -> Gray `11` (1 bit flips! In binary, 2 bits flipped: 01 -> 10)\n  3: `11` -> Gray `10` (1 bit flips)\nBecause only one bit transitions at any clock edge, sampling skew across clock boundaries can only result in either the old value or the new value, never an intermediate corrupted value.",
      "verilog_example": "// Binary to Gray Code Conversion\nmodule bin2gray #(\n  parameter WIDTH = 4\n)(\n  input  wire [WIDTH-1:0] bin,\n  output wire [WIDTH-1:0] gray\n);\n  assign gray = bin ^ (bin >> 1);\nendmodule\n\n// Gray to Binary Conversion\nmodule gray2bin #(\n  parameter WIDTH = 4\n)(\n  input  wire [WIDTH-1:0] gray,\n  output reg  [WIDTH-1:0] bin\n);\n  integer i;\n  always @(*) begin\n    bin[WIDTH-1] = gray[WIDTH-1];\n    for (i = WIDTH-2; i >= 0; i = i - 1) begin\n      bin[i] = bin[i+1] ^ gray[i];\n    end\n  end\nendmodule",
      "common_mistakes": "Trying to do arithmetic (e.g. `gray + 1`) directly on Gray code. You must convert Gray to binary, increment binary, and convert back to Gray.",
      "follow_ups": [
        "How is Gray code used in Asynchronous FIFO pointers?",
        "What is clock domain crossing (CDC)?",
        "Test this Gray code module in the Verilog Simulator."
      ],
      "resources": [
        {
          "title": "Binary to Gray Code Guide",
          "url": "/vlsi/bingray/",
          "desc": "Step-by-step conversion tables and hardware schematics."
        },
        {
          "title": "Async FIFO Lab",
          "url": "/tools/async-fifo-lab/",
          "desc": "Watch Gray code pointers cross clock domains live."
        }
      ]
    },
    {
      "id": "axi-protocol",
      "title": "AXI Protocol (AMBA AXI4) Explained",
      "category": "protocols",
      "keywords": [
        "axi",
        "axi protocol",
        "explain axi protocol",
        "amba axi",
        "axi4",
        "valid ready handshake",
        "axi channels"
      ],
      "summary": "AXI (Advanced eXtensible Interface) is an open ARM AMBA standard for high-performance, high-frequency on-chip interconnects. It uses 5 independent unidirectional channels with VALID/READY handshakes.",
      "definition": "AXI4 supports burst-based transactions, separate read and write channels, unaligned data transfers, out-of-order transaction completion using IDs, and pipelined two-way handshaking.",
      "how_it_works": "The 5 Independent AXI Channels:\n1. **AW (Write Address)**: Sends write address, burst size, length, and burst type (INCR, WRAP, FIXED).\n2. **W (Write Data)**: Sends write data bus and byte strobes (`WSTRB`), ending with `WLAST`.\n3. **B (Write Response)**: Slave returns status (`OKAY`, `EXOKAY`, `SLVERR`, `DECERR`) via `BRESP`.\n4. **AR (Read Address)**: Sends read address and burst controls.\n5. **R (Read Data)**: Slave streams read data back to master with response status `RRESP`.\n\n**Handshake Rule**: A transfer occurs strictly on clock edges where `VALID && READY` are both high. Once `VALID` is asserted, it cannot be deasserted until `READY` is high.",
      "silicon_example": "Modern AI SoCs connect DMA engines, neural processing units (NPUs), and DDR5/HBM3 memory controllers via 512-bit wide AXI4 buses operating at 1 GHz.",
      "common_mistakes": "Waiting for `READY` before asserting `VALID`. AXI specification strictly forbids `VALID` from depending on `READY`, which prevents deadlocks.",
      "follow_ups": [
        "What is the difference between AXI, AHB, and APB?",
        "What is the UCIe chiplet protocol?",
        "Explore the AXI-to-APB Bridge tool on EcrioniX."
      ],
      "resources": [
        {
          "title": "AXI Protocol Deep Dive",
          "url": "/protocols/axi/",
          "desc": "Complete channel diagrams, burst calculation, and waveforms."
        },
        {
          "title": "Hardware Protocols Hub",
          "url": "/protocols/",
          "desc": "Overview of AXI, AHB, APB, PCIe, and CXL."
        },
        {
          "title": "AXI to APB Bridge Tool",
          "url": "/tools/axi-apb-bridge/",
          "desc": "Interactive transaction visualizer bridging high-speed AXI to low-speed APB."
        }
      ]
    },
    {
      "id": "ucie-protocol",
      "title": "UCIe (Universal Chiplet Interconnect Express) Explained",
      "category": "protocols",
      "keywords": [
        "ucie",
        "what is ucie",
        "universal chiplet interconnect express",
        "chiplet protocol",
        "die to die",
        "d2d"
      ],
      "summary": "UCIe is the open industry standard for high-bandwidth, ultra-low-latency die-to-die (D2D) interconnects, enabling modular multi-chiplet SoC packaging.",
      "definition": "Supported by Intel, AMD, Arm, TSMC, and Samsung, UCIe defines the Physical Layer (standard packaging and advanced packaging like CoWoS/EMIB), Die-to-Die Adapter, and Protocol Layer (PCIe, CXL, and Streaming).",
      "how_it_works": "Key characteristics of UCIe:\n- **Density & Bandwidth**: 1.3 to 32 Gbps per lane, scaling up to multi-terabit/s shoreline bandwidth per millimeter.\n- **Energy Efficiency**: < 0.25 to 0.5 pJ/bit (orders of magnitude lower energy than external SerDes).\n- **Latency**: Sub-2 nanoseconds die-to-die delay.\n- **Layering**: Standard PCIe/CXL software stacks run unmodified across chiplets over the UCIe link layer.",
      "silicon_example": "Next-generation server processors (e.g. Intel Xeon Granite Rapids, AMD EPYC, NVIDIA Blackwell) package separate compute chiplets, I/O dies, and HBM memory on a single substrate using UCIe/D2D links.",
      "common_mistakes": "Assuming UCIe replaces PCIe. UCIe is a physical and link transport protocol that packages and transports PCIe/CXL packets across silicon chiplets.",
      "follow_ups": [
        "What is PCIe Protocol?",
        "How does HBM (High Bandwidth Memory) connect to processors?",
        "What are standard vs advanced silicon packaging?"
      ],
      "resources": [
        {
          "title": "Protocols Hub",
          "url": "/protocols/",
          "desc": "Browse high-speed interconnects and bus protocols."
        },
        {
          "title": "AI Hardware & Memory Alternatives",
          "url": "/ai-memory-alternatives/",
          "desc": "HBM, 3D packaging, and silicon interposer technologies."
        }
      ]
    },
    {
      "id": "setup-and-hold-time",
      "title": "Setup and Hold Time — Equations, Violations & Fixes",
      "category": "sta",
      "keywords": [
        "setup time",
        "hold time",
        "setup and hold",
        "explain setup time",
        "setup violation",
        "hold violation",
        "setup vs hold",
        "fix setup violation",
        "fix hold violation",
        "slack"
      ],
      "summary": "Setup time ($T_{setup}$) is the minimum time data must be stable BEFORE the clock edge. Hold time ($T_{hold}$) is the minimum time data must remain stable AFTER the clock edge.",
      "definition": "Violating setup time causes the destination flip-flop to sample during a data transition, causing metastability. Violating hold time causes the new data to race through and overwrite the current state too quickly.",
      "how_it_works": "Fundamental Timing Equations:\n\n1. **Setup Constraint (Max-Delay)**:\n   $T_{clk} + T_{skew} \\ge T_{cq} + T_{comb(max)} + T_{setup} + T_{uncertainty}$\n   $Slack_{setup} = (T_{clk} + T_{skew} - T_{uncertainty}) - (T_{cq} + T_{comb} + T_{setup})$\n\n2. **Hold Constraint (Min-Delay)**:\n   $T_{cq} + T_{comb(min)} \\ge T_{hold} + T_{skew} + T_{uncertainty}$\n   $Slack_{hold} = (T_{cq} + T_{comb(min)}) - (T_{hold} + T_{skew} + T_{uncertainty})$\n\n*Notice: Setup depends on clock period ($T_{clk}$) so slowing the clock fixes setup. Hold time is independent of $T_{clk}$! You cannot fix hold violations by reducing clock frequency!*",
      "violations_and_fixes": "**How to Fix Setup Violations**:\n1. Upsize driver gates to decrease cell delay.\n2. Pipeline the long combinational path with intermediate registers.\n3. Restructure logic (e.g. use carry-lookahead adders instead of ripple-carry).\n4. Swap high-$V_t$ (slow, low leakage) cells for low-$V_t$ (fast, high leakage) cells.\n5. Adjust floorplan to move startpoint and endpoint closer.\n\n**How to Fix Hold Violations**:\n1. Insert delay buffers on the data path.\n2. Downsize fast combinational gates or swap to high-$V_t$ cells.\n3. Decrease clock skew between launching and capturing flip-flops.",
      "common_mistakes": "Saying 'I will increase clock period to fix hold violation'. Clock frequency has ZERO effect on hold time slack equation!",
      "follow_ups": [
        "What is clock skew and clock uncertainty?",
        "What is recovery and removal time for resets?",
        "What are false paths and multicycle paths?",
        "Launch the browser Static Timing Analyzer tool."
      ],
      "resources": [
        {
          "title": "Setup & Hold Time Guide",
          "url": "/sta/setup-hold/",
          "desc": "Interactive waveforms and step-by-step mathematical examples."
        },
        {
          "title": "STA Hub",
          "url": "/sta/",
          "desc": "CompleteStatic Timing Analysis course and interview guide."
        },
        {
          "title": "Browser STA Analyzer",
          "url": "/tools/sta-analyzer/",
          "desc": "Run real OpenSTA static timing analysis with NanGate45 liberty files."
        }
      ]
    },
    {
      "id": "clock-tree-synthesis",
      "title": "Clock Tree Synthesis (CTS) & Clock Skew",
      "category": "sta",
      "keywords": [
        "clock tree synthesis",
        "cts",
        "what is clock tree synthesis",
        "clock skew",
        "clock latency",
        "cts physical design"
      ],
      "summary": "Clock Tree Synthesis (CTS) builds an optimized, balanced distribution network of clock buffers and inverters to deliver clock signals to all sequential cells with minimal skew and insertion delay.",
      "definition": "Clock skew is the difference in clock arrival times between two flip-flops ($T_{skew} = T_{clk\\_capture} - T_{clk\\_launch}$). Positive skew helps setup time but hurts hold time; negative skew hurts setup time but helps hold time.",
      "how_it_works": "Common CTS topologies:\n- **H-Tree**: Highly symmetric tree structure minimizing skew across regular floorplans.\n- **Mesh Clock**: Interconnected grid of clock drivers providing ultra-low skew for high-performance processors at the cost of higher power.\n- **Multi-source CTS**: Hybrid cluster-based tree feeding local sub-trees.\nCTS occurs after cell placement and before signal routing in the physical design flow.",
      "silicon_example": "The clock tree typically consumes 30% to 45% of total dynamic chip power. Clock gating (ICGs) is inserted during CTS to disable clock toggling to idle registers.",
      "common_mistakes": "Assuming zero clock skew is the target. Useful skew intentionally delays clock arrival to critical capturing flops to resolve tight setup paths.",
      "follow_ups": [
        "What is clock gating and Integrated Clock Gating (ICG)?",
        "Explain the Physical Design Flow from Floorplan to GDSII.",
        "How does setup and hold time relate to clock skew?"
      ],
      "resources": [
        {
          "title": "Clock Tree Synthesis Guide",
          "url": "/sta/clock-tree/",
          "desc": "Deep dive into clock buffers, skew balancing, and latency."
        },
        {
          "title": "Physical Design 20-Day Course",
          "url": "/physical-design/",
          "desc": "CTS practical implementation in backend physical design."
        }
      ]
    },
    {
      "id": "cdc-metastability",
      "title": "Clock Domain Crossing (CDC) & Metastability",
      "category": "cdc",
      "keywords": [
        "cdc",
        "clock domain crossing",
        "what is metastability",
        "metastability",
        "2-ff synchronizer",
        "synchronizer",
        "mtbf",
        "reset synchronizer"
      ],
      "summary": "CDC occurs when a signal generated in one clock domain is sampled by a register in an unsynchronized clock domain. Violating setup/hold times causes the register output to oscillate or linger at an indeterminate voltage (metastability).",
      "definition": "Metastability is an unstable intermediate state where a latch or flip-flop settles neither to a legal logic '0' nor logic '1' within the required clock cycle. MTBF (Mean Time Between Failures) models this mathematically.",
      "how_it_works": "MTBF Formula: $MTBF = \\frac{e^{t_r / \\tau}}{T_o \\cdot f_{clk} \\cdot f_{data}}$\n\n**CDC Synchronization Techniques**:\n1. **Single-bit CDC**: Use a **2-Flop Synchronizer** (two back-to-back D-FFs clocked by the destination clock). The second FF provides settling time ($t_r$) for the first FF to resolve.\n2. **Multi-bit CDC (Data Bus)**: NEVER use independent 2-FF synchronizers on a multi-bit bus due to routing skew. Use an **Asynchronous FIFO** with Gray code pointers, or a **Mux-Recirculation / Handshake Synchronizer**.\n3. **Reset Deassertion**: Use an **Asynchronous Assert, Synchronous Deassert Reset Synchronizer**.",
      "verilog_example": "// Synthesizable 2-FF Synchronizer for Single-Bit CDC\nmodule cdc_2ff_sync (\n  input  wire clk_dst,\n  input  wire rst_dst_n,\n  input  wire din_async,\n  output reg  dout_sync\n);\n  (* ASYNC_REG = \"TRUE\" *) reg sync_stage1;\n\n  always @(posedge clk_dst or negedge rst_dst_n) begin\n    if (!rst_dst_n) begin\n      sync_stage1 <= 1'b0;\n      dout_sync   <= 1'b0;\n    end else begin\n      sync_stage1 <= din_async;\n      dout_sync   <= sync_stage1;\n    end\n  end\nendmodule",
      "common_mistakes": "Passing a binary counter directly through synchronizers into another clock domain, leading to sampling skew errors.",
      "follow_ups": [
        "How does an Asynchronous FIFO work?",
        "What is an Async Assert, Synchronous Deassert reset?",
        "Try the CDC Interactive Lab on EcrioniX."
      ],
      "resources": [
        {
          "title": "Clock Domain Crossing (CDC) Course",
          "url": "/clock-domain-crossing/",
          "desc": "Comprehensive CDC guide covering synchronizers, FIFOs, and lint checks."
        },
        {
          "title": "CDC Interactive Lab",
          "url": "/tools/cdc-lab/",
          "desc": "Live simulation showing metastability recovery and 2-FF synchronizer behavior."
        }
      ]
    },
    {
      "id": "low-power-vlsi",
      "title": "Low Power VLSI Design — Clock Gating, Power Gating & UPF",
      "category": "cdc",
      "keywords": [
        "low power",
        "clock gating",
        "power gating",
        "upf",
        "unified power format",
        "isolation cells",
        "level shifters",
        "dynamic power",
        "leakage"
      ],
      "summary": "Low power design minimizes both dynamic power ($P_{dyn} = \\alpha C V^2 f$) and static leakage power ($P_{leak} = I_{leak} V$) using architectural and cell-level power reduction techniques.",
      "definition": "Key techniques:\n1. **Clock Gating (ICG)**: Stops clock toggling to idle registers, cutting dynamic power.\n2. **Power Gating**: Shuts off power supply ($V_{DD}$) to inactive blocks via sleep transistors.\n3. **Level Shifters**: Bridges signals transitioning between different voltage domains.\n4. **Isolation Cells**: Clamps outputs of a powered-down domain to a known safe logic level (0 or 1) so active domains don't float.\n5. **Retention Registers**: Preserves critical state flip-flops during power-down.\n6. **UPF (Unified Power Format)**: IEEE 1801 standard script specifying power domains, supplies, and isolation rules.",
      "silicon_example": "Smartphone processors turn off 80% of unused CPU/GPU cores while streaming audio, consuming less than a few milliwatts in low-power idle states.",
      "common_mistakes": "Connecting a powered-off domain directly to a live domain without isolation cells, resulting in floating MOS inputs, high crowbar current, and chip lockup.",
      "follow_ups": [
        "What is clock tree synthesis?",
        "What are standard cells in ASIC libraries?",
        "Explore the Low Power VLSI Guide."
      ],
      "resources": [
        {
          "title": "Low Power VLSI Hub",
          "url": "/low-power/",
          "desc": "Detailed guide to UPF, multi-voltage design, and power gating."
        },
        {
          "title": "Clock Gating & ICGs",
          "url": "/vlsi/clk_gater/",
          "desc": "Integrated Clock Gating cell schematics and RTL coding."
        }
      ]
    },
    {
      "id": "physical-design-steps",
      "title": "Physical Design Steps — Floorplanning to DRC/LVS",
      "category": "pd",
      "keywords": [
        "physical design",
        "floorplan",
        "placement",
        "routing",
        "drc",
        "lvs",
        "physical verification",
        "congestion",
        "ir drop"
      ],
      "summary": "Physical design transforms a gate-level netlist into physical geometric masks. The primary stages are Floorplanning, Placement, CTS, Routing, and Physical Verification.",
      "definition": "The goal is timing closure, power compliance, and zero manufacturing design rule violations (DRC/LVS).",
      "how_it_works": "Key stages:\n1. **Floorplanning**: Determines core aspect ratio, macro placement (SRAMs, PLLs), I/O pin allocation, and power mesh (PG straps).\n2. **Placement**: Global and detailed cell placement with congestion minimization.\n3. **CTS**: Clock tree balancing.\n4. **Routing**: Global and detailed signal routing adhering to foundry design rules.\n5. **IR Drop Analysis**: Ensures power grid resistance does not cause voltage droop.\n6. **DRC / LVS**: Confirms layout geometry satisfies foundry rules and matches the schematic netlist.",
      "common_mistakes": "Placing RAM macros in the center of the core, creating routing blockages and severe wire congestion around the core edges.",
      "follow_ups": [
        "What is Clock Tree Synthesis?",
        "What is OpenLane RTL to GDSII flow?",
        "Take the 20-Day Physical Design Course."
      ],
      "resources": [
        {
          "title": "Physical Design 20-Day Course",
          "url": "/physical-design/",
          "desc": "From logic synthesis to GDSII tape-out."
        },
        {
          "title": "OpenLane Guide",
          "url": "/tools/openlane/",
          "desc": "Open-source automated physical implementation flow."
        }
      ]
    },
    {
      "id": "dft-scan-atpg-jtag",
      "title": "Design for Test (DFT) — Scan Chains, ATPG & JTAG",
      "category": "dft",
      "keywords": [
        "dft",
        "design for test",
        "scan chain",
        "atpg",
        "mbist",
        "jtag",
        "fault coverage",
        "stuck-at fault"
      ],
      "summary": "DFT adds hardware test structures into the chip design to detect physical manufacturing silicon defects (shorts, opens, stuck-at faults) on automated test equipment (ATE).",
      "definition": "Without DFT, chips cannot be verified for silicon manufacturing defects before shipment, leading to high field return rates.",
      "how_it_works": "DFT pillars:\n1. **Scan Chains**: Standard flip-flops are replaced with Scan Flops (muxed D-FFs with `scan_in`, `scan_enable`, `scan_out`). In test mode, all flops form massive shift registers, providing 100% controllability and observability of internal states.\n2. **ATPG (Automatic Test Pattern Generation)**: Software algorithms (e.g. Synopsys TetraMAX, Siemens Tessent) that generate minimal test vector patterns to achieve >99% stuck-at and at-speed transition fault coverage.\n3. **MBIST (Memory Built-In Self-Test)**: Hardware engine generating patterns to test embedded SRAM arrays.\n4. **JTAG (IEEE 1149.1)**: 4/5-wire boundary scan test port (TCK, TMS, TDI, TDO, TRST) used for chip debug, boundary scan, and testing inter-chip board connections.",
      "silicon_example": "A defect as small as a single speck of dust creating a microscopic bridge between two metal wires is caught within milliseconds on ATE testers via scan test patterns.",
      "common_mistakes": "Confusing functional verification (validating that the RTL matches the specification) with DFT (validating that the manufactured silicon is free of physical manufacturing defects).",
      "follow_ups": [
        "What is JTAG boundary scan?",
        "What is stuck-at fault coverage?",
        "Explore the DFT Course."
      ],
      "resources": [
        {
          "title": "DFT Course & Hub",
          "url": "/dft/",
          "desc": "Scan insertion, ATPG algorithms, MBIST, and test compression."
        }
      ]
    },
    {
      "id": "computer-architecture-ai-chips",
      "title": "Computer Architecture & AI Hardware Accelerators",
      "category": "arch",
      "keywords": [
        "computer architecture",
        "ai chip",
        "what is an ai chip",
        "risc-v",
        "arm architecture",
        "systolic array",
        "tpu",
        "gpu vs cpu",
        "cache memory",
        "pipeline"
      ],
      "summary": "Modern computer architecture spans general-purpose CPUs (RISC-V, ARM), massively parallel SIMT GPUs, and domain-specific matrix accelerators (TPUs, NPUs) optimized for deep learning tensor operations.",
      "definition": "AI accelerators maximize compute density and energy efficiency by replacing general-purpose instruction decoders and branch predictors with massive arrays of Multiply-Accumulate (MAC) units arranged in 2D Systolic Arrays.",
      "how_it_works": "- **CPU (e.g. RISC-V, ARM)**: Optimized for single-thread low-latency execution with deep pipelines, out-of-order execution, branch prediction, and multi-level L1/L2/L3 caches.\n- **GPU**: Massive SIMT parallel execution with thousands of arithmetic units designed for throughput.\n- **Systolic Array (TPU/NPU)**: A 2D grid of processing elements where data streams rhythmically through adjacent cells without accessing registers or SRAM at each step, slashing memory bandwidth and power by orders of magnitude for matrix multiplication (GEMM).",
      "silicon_example": "Google TPU v4/v5 and Tesla Dojo use systolic arrays of bfloat16/int8 tensor processing cores connected to High Bandwidth Memory (HBM3).",
      "common_mistakes": "Assuming faster clock speeds solve AI bottlenecks. Modern AI workloads are overwhelmingly memory-bound (memory wall), not compute-bound.",
      "follow_ups": [
        "Try the Systolic Array Interactive Lab.",
        "What is the Cache Simulator?",
        "Explore ARM Architecture from Scratch.",
        "Check out the Mini AI Accelerator Studio on EcrioniX."
      ],
      "resources": [
        {
          "title": "Mini AI Accelerator Studio",
          "url": "/projects/mini-ai-accelerator/",
          "desc": "From neural network drawing to Verilog RTL execution in your browser."
        },
        {
          "title": "Systolic Array Interactive Lab",
          "url": "/tools/systolic-array-lab/",
          "desc": "Watch matrix multiplications flow cycle by cycle through hardware MAC units."
        },
        {
          "title": "Cache Simulator",
          "url": "/tools/cache-sim/",
          "desc": "Interactive cache hit/miss and associativity visualizer."
        },
        {
          "title": "ARM Architecture Course",
          "url": "/arm-architecture/",
          "desc": "Learn ARM CPU architecture, instruction sets, and registers from scratch."
        }
      ]
    },
    {
      "id": "10-rtl-interview-questions",
      "title": "Top 10 RTL Design & VLSI Interview Questions with Solutions",
      "category": "interview",
      "keywords": [
        "10 rtl interview questions",
        "give me 10 rtl interview questions",
        "rtl interview questions",
        "vlsi interview questions",
        "verilog interview",
        "interview prep"
      ],
      "summary": "Here are 10 of the most frequently asked, high-yield technical interview questions for RTL and VLSI hardware engineers.",
      "definition": "Curated questions covering timing, RTL coding, CDC, protocols, and architectural tradeoffs.",
      "how_it_works": "**Top 10 High-Yield Questions & Answers:**\n\n1. **Q: Why can't hold time violations be fixed by lowering clock frequency?**\n   *A:* Hold slack is $T_{cq} + T_{comb} - T_{hold} - T_{skew}$. Clock period ($T_{clk}$) does not appear in the equation. To fix hold, you must add datapath delay (buffers) or reduce clock skew.\n\n2. **Q: Difference between blocking (=) and non-blocking (<=) assignments?**\n   *A:* Blocking executes sequentially within the active region. Non-blocking schedules all RHS evaluations in parallel and updates LHS in the NBA region, avoiding race conditions in sequential logic.\n\n3. **Q: What is metastability and how is it resolved for single-bit signals?**\n   *A:* Indeterminate voltage state when setup/hold is violated. Solved using a 2-flip-flop synchronizer in the destination clock domain.\n\n4. **Q: Why use Gray code in asynchronous FIFOs instead of binary?**\n   *A:* Binary multi-bit transitions have skew, causing false intermediate codes. Gray code changes exactly 1 bit per cycle, guaranteeing safe synchronization.\n\n5. **Q: What is the purpose of an Integrated Clock Gating (ICG) cell?**\n   *A:* An AND gate with a latch prevents glitches when gating the clock while saving dynamic power ($P = C V^2 f$).\n\n6. **Q: How do you design an Asynchronous Reset Synchronizer?**\n   *A:* 'Asynchronously asserted, synchronously deasserted' circuit using 2 flip-flops with reset tied to active reset.\n\n7. **Q: Explain the AXI4 VALID/READY handshake rule.**\n   *A:* Data transfers only when both are HIGH on a rising clock edge. VALID cannot wait for READY to assert (prevents deadlocks).\n\n8. **Q: Difference between Mealy and Moore state machines?**\n   *A:* Moore outputs depend only on state (glitch-free). Mealy outputs depend on state and inputs (1 cycle faster, but potential glitches).\n\n9. **Q: What is the setup time condition with clock skew?**\n   *A:* $T_{clk} + T_{skew} \\ge T_{cq} + T_{comb} + T_{setup} + T_{uncertainty}$.\n\n10. **Q: What is the difference between ASIC and FPGA?**\n    *A:* ASICs have high NRE, 1-2 year lead time, maximum speed and lowest unit cost. FPGAs have zero NRE, are reconfigurable, but have higher unit cost and lower frequency.",
      "follow_ups": [
        "Write a Verilog 4-bit counter.",
        "Explain setup and hold time.",
        "How does an asynchronous FIFO work?",
        "Explore EcrioniX Interview Prep Hub."
      ],
      "resources": [
        {
          "title": "Interview Prep Hub",
          "url": "/interview/",
          "desc": "600+ curated VLSI, RTL, STA, and Digital interview Q&A."
        },
        {
          "title": "Verilog Spot-the-Bug Game",
          "url": "/tools/verilog-spot-the-bug/",
          "desc": "Interactive coding challenges asked in technical phone screens."
        }
      ]
    },
    {
      "id": "nav-verilog-simulator",
      "title": "Online Verilog Simulator & Waveform Viewer",
      "category": "tools",
      "keywords": [
        "show me the verilog simulator",
        "open verilog simulator",
        "verilog simulator",
        "where can i practice verilog",
        "practice verilog",
        "run verilog"
      ],
      "summary": "EcrioniX Online Verilog Simulator runs real hardware simulation directly in your browser with live syntax linting, compilation, console output, and timing waveform viewing.",
      "definition": "Fully synthesizable, interactive browser-based EDA simulator powered by WebAssembly.",
      "how_it_works": "1. Write or paste your Verilog module and testbench.\n2. Click Run to compile and simulate.\n3. Inspect terminal `$display` statements and view waveform transitions.",
      "follow_ups": [
        "Write a Verilog 4-bit counter.",
        "Difference between blocking and non-blocking assignments.",
        "Launch the Verilog Simulator now."
      ],
      "resources": [
        {
          "title": "Launch Online Verilog Simulator",
          "url": "/tools/verilog-simulator/",
          "desc": "Write, compile, and debug Verilog in your browser."
        },
        {
          "title": "Practice Problems & Judge",
          "url": "/problems/",
          "desc": "Interactive Verilog coding problems with automated testbench grading."
        }
      ]
    },
    {
      "id": "nav-cdc-tutorials",
      "title": "Clock Domain Crossing (CDC) Learning Track",
      "category": "tools",
      "keywords": [
        "i want to learn cdc",
        "show me cdc tutorials",
        "learn cdc",
        "cdc tutorials",
        "cdc guide"
      ],
      "summary": "EcrioniX provides an end-to-end Clock Domain Crossing track, including the full CDC Course, interactive Metastability Lab, and Asynchronous FIFO Studio.",
      "definition": "Complete curriculum explaining 2-FF synchronizers, Gray code pointers, pulse synchronizers, and MTBF calculation.",
      "follow_ups": [
        "What is metastability?",
        "How does an asynchronous FIFO work?",
        "Explain Gray code with an example."
      ],
      "resources": [
        {
          "title": "Clock Domain Crossing Course",
          "url": "/clock-domain-crossing/",
          "desc": "Complete daily lessons on multi-clock chip design."
        },
        {
          "title": "CDC Interactive Lab",
          "url": "/tools/cdc-lab/",
          "desc": "Simulate metastability and synchronizers in your browser."
        },
        {
          "title": "Async FIFO Lab",
          "url": "/tools/async-fifo-lab/",
          "desc": "Cycle-accurate dual-clock FIFO pointer visualizer."
        }
      ]
    },
    {
      "id": "nav-all-labs-tools",
      "title": "All EcrioniX Simulators, Labs & Tools",
      "category": "tools",
      "keywords": [
        "show me all ecrionix labs",
        "show me all labs",
        "all tools",
        "engineering tools",
        "interactive labs",
        "simulators"
      ],
      "summary": "EcrioniX features 15+ browser-based interactive engineering tools and simulators with zero installation required.",
      "definition": "Explore simulators for Verilog, STA, CDC, Cache memory, GPUs, Systolic Arrays, K-Maps, FSM design, and logic circuits.",
      "follow_ups": [
        "Open Verilog simulator.",
        "Launch Static Timing Analyzer.",
        "Explore Mini AI Accelerator Studio."
      ],
      "resources": [
        {
          "title": "All Engineering Tools & Simulators",
          "url": "/tools/",
          "desc": "Catalog of all EcrioniX online hardware design tools."
        },
        {
          "title": "Interactive Labs Hub",
          "url": "/labs/",
          "desc": "Hands-on guided engineering labs."
        },
        {
          "title": "Open Source Engineering Hub",
          "url": "/open-source/",
          "desc": "Directory of verified open-source EDA and hardware projects."
        }
      ]
    },
    {
      "id": "cmos-inverter",
      "title": "CMOS Inverter — Operation, VTC & Noise Margins",
      "category": "vlsi",
      "keywords": [
        "cmos inverter",
        "cmos",
        "how cmos works",
        "voltage transfer curve",
        "noise margin",
        "pull up pull down",
        "pmos nmos"
      ],
      "summary": "A CMOS inverter consists of a complementary pair of transistors: a PMOS pull-up network connected to VDD and an NMOS pull-down network connected to GND.",
      "definition": "The basic building block of all digital VLSI circuits, offering virtually zero static power dissipation, rail-to-rail voltage swing, and high noise immunity.",
      "how_it_works": "1. When Input = 0 (GND): PMOS is ON ($V_{gs} = -V_{DD}$), NMOS is OFF ($V_{gs} = 0$). Output pulls to $V_{DD}$ (Logic 1).\n2. When Input = 1 ($V_{DD}$): PMOS is OFF, NMOS is ON. Output pulls to GND (Logic 0).\nBecause one transistor is always OFF in steady state, steady-state DC current is negligible (leakage only).\n\n**Noise Margins**:\n$NM_H = V_{OH} - V_{IH}$\n$NM_L = V_{IL} - V_{OL}$",
      "silicon_example": "Every logic gate (NAND, NOR, XOR), flip-flop, and clock buffer in standard cell libraries is built from complementary PMOS and NMOS transistor pairs.",
      "common_mistakes": "Connecting PMOS to GND and NMOS to VDD. NMOS is a strong 0 passer and weak 1 passer; PMOS is a strong 1 passer and weak 0 passer.",
      "follow_ups": [
        "What is MOSFET vs FinFET?",
        "What are standard cells in ASIC libraries?",
        "Explore the CMOS Inverter Guide."
      ],
      "resources": [
        {
          "title": "CMOS Inverter Deep Dive",
          "url": "/vlsi/cmos/",
          "desc": "Transistor schematics, VTC curves, and layout sizing."
        },
        {
          "title": "VLSI Hub",
          "url": "/vlsi/",
          "desc": "All VLSI fundamentals and circuit design topics."
        }
      ]
    },
    {
      "id": "standard-cells-library",
      "title": "Standard Cells & Characterization (.lib, .lef)",
      "category": "vlsi",
      "keywords": [
        "standard cells",
        "lib file",
        "lef file",
        "liberty format",
        "cell characterization",
        "pvt corners",
        "nldm",
        "ccs"
      ],
      "summary": "Standard cells are pre-designed, pre-verified layout building blocks (AND, OR, DFF, MUX) with fixed heights and variable widths arranged in rows across an ASIC.",
      "definition": "A standard cell library contains timing/power models (.lib Liberty format), physical layout abstracts (.lef), geometric layouts (GDSII), and Verilog simulation models.",
      "how_it_works": "Cells are characterized across **PVT Corners** (Process, Voltage, Temperature):\n- **Slow Corner (Max Delay)**: SS, low voltage, high temperature (used for Setup checks).\n- **Fast Corner (Min Delay)**: FF, high voltage, low/cold temperature (used for Hold checks).\n- **Typical Corner**: TT, nominal voltage and temperature.",
      "silicon_example": "NanGate 45nm and TSMC 5nm libraries provide thousands of standard cells with multiple drive strengths (e.g., INV_X1, INV_X2, INV_X8) and $V_t$ flavors (LVT, SVT, HVT).",
      "common_mistakes": "Ignoring multi-corner multi-mode (MCMM) signoff. A design might pass setup in the slow corner but suffer massive hold violations in the fast corner.",
      "follow_ups": [
        "What is setup and hold time?",
        "What is the RTL-to-GDSII flow?",
        "Run OpenSTA timing analysis with NanGate45."
      ],
      "resources": [
        {
          "title": "Physical Design Course",
          "url": "/physical-design/",
          "desc": "How synthesis and PnR tools utilize standard cell libraries."
        },
        {
          "title": "Browser STA Analyzer",
          "url": "/tools/sta-analyzer/",
          "desc": "Live OpenSTA engine loaded with NanGate45 .lib standard cells."
        }
      ]
    },
    {
      "id": "systemverilog-fundamentals",
      "title": "SystemVerilog for Design & Verification",
      "category": "sv",
      "keywords": [
        "systemverilog",
        "systemverilog fundamentals",
        "sv",
        "always_ff",
        "always_comb",
        "uvm",
        "assertions",
        "sva",
        "logic type"
      ],
      "summary": "SystemVerilog (IEEE 1800) merges hardware description (RTL) with advanced object-oriented verification (OOP, assertions, functional coverage, UVM).",
      "definition": "Key design enhancements include the universal 4-state `logic` type, dedicated procedural blocks (`always_ff`, `always_comb`, `always_latch`), user-defined types (`typedef enum`, `struct`), and SystemVerilog Assertions (SVA).",
      "how_it_works": "- `always_comb`: Synthesizers and simulators enforce combinational rules (reports errors if a latch is accidentally inferred or a clock is used).\n- `always_ff @(posedge clk)`: Guarantees flip-flop sequential logic.\n- `logic`: Replaces confusing Verilog `reg` vs `wire` distinctions.",
      "verilog_example": "// SystemVerilog Clean Design Pattern\nmodule sv_demo (\n  input  logic clk,\n  input  logic rst_n,\n  input  logic [7:0] a, b,\n  output logic [8:0] sum\n);\n  // Combinational adder\n  logic [8:0] next_sum;\n  always_comb begin\n    next_sum = a + b;\n  end\n\n  // Sequential register\n  always_ff @(posedge clk or negedge rst_n) begin\n    if (!rst_n) sum <= '0;\n    else        sum <= next_sum;\n  end\n\n  // Assertion: sum must not exceed 510\n  assert property (@(posedge clk) sum <= 9'd510)\n    else $error(\"Sum exceeded theoretical maximum!\");\nendmodule",
      "common_mistakes": "Using traditional Verilog `reg` in module ports and thinking it creates a physical register. In SystemVerilog, use `logic` everywhere.",
      "follow_ups": [
        "Difference between blocking and non-blocking assignments.",
        "Explore the SystemVerilog Tutorials.",
        "What is UVM (Universal Verification Methodology)?"
      ],
      "resources": [
        {
          "title": "SystemVerilog Tutorials",
          "url": "/systemverilog/",
          "desc": "Complete SystemVerilog language guide for design and testbenches."
        },
        {
          "title": "Verification & UVM Hub",
          "url": "/verification/",
          "desc": "Learn assertions, testbench architecture, and UVM components."
        }
      ]
    },
    {
      "id": "apb-and-ahb-protocols",
      "title": "APB & AHB Protocols (AMBA Bus Standards)",
      "category": "protocols",
      "keywords": [
        "apb",
        "ahb",
        "apb protocol",
        "ahb protocol",
        "amba bus",
        "apb vs ahb",
        "pready",
        "psel",
        "penable"
      ],
      "summary": "APB is an unpipelined, low-complexity, low-power bus for memory-mapped peripheral registers (UART, I2C, Timers). AHB is a pipelined high-bandwidth bus for on-chip memory and bridges.",
      "definition": "Part of the ARM AMBA family alongside AXI.",
      "how_it_works": "**APB State Machine**:\n1. **IDLE**: No transfer.\n2. **SETUP**: Master asserts `PSEL` and address `PADDR`. `PENABLE` is 0.\n3. **ACCESS**: Master asserts `PENABLE = 1`. Transfer completes when slave asserts `PREADY = 1`.\n\n**Comparison**:\n- **APB**: Minimal gate count, no pipelining, no bursts, simple 2-cycle transfer.\n- **AHB**: Pipelined (address and data phases overlap), burst transfers, wait states (`HREADY`), single shared clock edge.\n- **AXI**: 5 independent channels, out-of-order execution, simultaneous bi-directional full-duplex transfers.",
      "silicon_example": "Every ARM Cortex SoC uses an AXI backbone for CPU-to-DDR memory, connected through an AXI-to-APB bridge to control low-speed peripherals.",
      "common_mistakes": "Asserting `PENABLE` during the SETUP cycle. APB protocol specifies `PENABLE` must remain 0 for exactly 1 cycle in SETUP before asserting in ACCESS.",
      "follow_ups": [
        "Explain AXI protocol.",
        "Try the AXI-to-APB Bridge tool.",
        "What are hardware handshaking protocols?"
      ],
      "resources": [
        {
          "title": "APB Protocol Guide",
          "url": "/protocols/apb/",
          "desc": "Timing diagrams, state machines, and slave Verilog code."
        },
        {
          "title": "AXI to APB Bridge Tool",
          "url": "/tools/axi-apb-bridge/",
          "desc": "Interactive simulation bridging AXI transactions to APB registers."
        }
      ]
    },
    {
      "id": "timing-paths-and-slack",
      "title": "Timing Paths & Slack (Reg2Reg, In2Reg, Reg2Out, In2Out)",
      "category": "sta",
      "keywords": [
        "timing paths",
        "slack",
        "wns",
        "tns",
        "reg2reg",
        "in2reg",
        "reg2out",
        "in2out",
        "what is slack"
      ],
      "summary": "Static Timing Analysis breaks a digital circuit into 4 timing path categories and calculates Setup/Hold slack along every single path.",
      "definition": "Slack is the difference between Required Arrival Time and Actual Arrival Time. Positive slack means timing is MET. Negative slack means a timing VIOLATION.",
      "how_it_works": "The 4 Timing Path Types:\n1. **Reg-to-Reg**: Flip-flop clock pin → Q → combinational logic → D pin of destination flip-flop (the most critical and common path inside the core).\n2. **In-to-Reg**: Input port / chip pad → combinational logic → D pin of first flip-flop.\n3. **Reg-to-Out**: Flip-flop Q → combinational logic → output port / chip pad.\n4. **In-to-Out**: Input port → pure combinational logic → output port (feedthrough path).\n\n**Key Metrics**:\n- **WNS (Worst Negative Slack)**: The single worst violating path on a clock domain (e.g. -0.25ns).\n- **TNS (Total Negative Slack)**: The sum of all negative slacks across all violating endpoints.",
      "common_mistakes": "Thinking a design with WNS = 0 is broken. WNS = 0.000ns means timing is perfectly closed with zero margin!",
      "follow_ups": [
        "Explain setup and hold time equations.",
        "What is clock uncertainty and clock skew?",
        "Run OpenSTA in your browser to inspect WNS and TNS."
      ],
      "resources": [
        {
          "title": "Timing Paths in STA",
          "url": "/sta/timing-paths/",
          "desc": "Visual diagrams of all 4 timing path types."
        },
        {
          "title": "Browser STA Analyzer",
          "url": "/tools/sta-analyzer/",
          "desc": "Paste Verilog and get setup slack, WNS, and TNS instantly."
        }
      ]
    },
    {
      "id": "false-paths-multicycle-paths",
      "title": "False Paths & Multicycle Paths (SDC Timing Exceptions)",
      "category": "sta",
      "keywords": [
        "false path",
        "multicycle path",
        "set_false_path",
        "set_multicycle_path",
        "sdc timing exceptions",
        "timing constraints"
      ],
      "summary": "Timing exceptions inform the STA engine to ignore paths that cannot physically occur (False Paths) or allow logic multiple clock periods to propagate (Multicycle Paths).",
      "definition": "Specified in the Synopsys Design Constraints (SDC) file using `set_false_path` and `set_multicycle_path`.",
      "how_it_works": "1. **False Path**: A path that exists in the netlist topology but is logically impossible or properly synchronized through CDC logic (e.g. static configuration registers, test mode signals, asynchronous reset paths, or CDC synchronizer inputs).\n   - SDC command: `set_false_path -from [get_ports rst_n]`\n2. **Multicycle Path**: Combinational logic designed to take 2 or more clock cycles to evaluate before being sampled by an enabled destination register (e.g. an iterative multiplier or floating-point ALU enabled every 3 cycles).\n   - SDC command: `set_multicycle_path 3 -setup -from [get_cells u_mult/*] -to [get_cells u_acc/*]`",
      "common_mistakes": "Using `set_false_path` to sweep legitimate timing violations under the rug. An improper false path on an active datapath will result in physical chip failure in silicon!",
      "follow_ups": [
        "What is SDC (Synopsys Design Constraints)?",
        "Explain setup and hold time.",
        "How does CDC relate to false paths?"
      ],
      "resources": [
        {
          "title": "SDC Constraints Guide",
          "url": "/sta/sdc/",
          "desc": "Learn create_clock, set_input_delay, and timing exceptions."
        },
        {
          "title": "Timing Closure Hub",
          "url": "/sta/timing-closure/",
          "desc": "Techniques for eliminating WNS violations."
        }
      ]
    },
    {
      "id": "recovery-and-removal",
      "title": "Recovery & Removal Time (Asynchronous Reset Timing)",
      "category": "sta",
      "keywords": [
        "recovery time",
        "removal time",
        "recovery and removal",
        "reset timing",
        "reset recovery",
        "reset removal"
      ],
      "summary": "Recovery and removal times are the setup and hold times for asynchronous control signals (like asynchronous reset) relative to the active clock edge.",
      "definition": "- **Recovery Time ($T_{rec}$)**: Minimum time the asynchronous reset must be DEASSERTED (released) BEFORE the active clock edge.\n- **Removal Time ($T_{rem}$)**: Minimum time the asynchronous reset must remain ASSERTED AFTER the active clock edge before releasing.",
      "how_it_works": "If a reset signal releases within the recovery/removal hazard window of a clock edge, some flip-flops across the chip will wake up in the current cycle while others wake up in the next cycle (due to clock skew), putting the state machine into an illegal, desynchronized state!\n\n**Solution**: Use an **Asynchronous Assert, Synchronous Deassert (AASD)** reset synchronizer circuit.",
      "silicon_example": "Every digital chip uses a dedicated reset synchronizer tree to ensure reset release happens cleanly outside the recovery/removal window for all million flip-flops.",
      "follow_ups": [
        "What is a reset synchronizer circuit?",
        "What is setup and hold time?",
        "Check out Reset Synchronizer tutorials."
      ],
      "resources": [
        {
          "title": "Reset Synchronizer Guide",
          "url": "/vlsi/rst_sync/",
          "desc": "Asynchronous assert, synchronous deassert circuit and waveforms."
        },
        {
          "title": "STA Hub",
          "url": "/sta/",
          "desc": "Static timing constraints for reset recovery/removal."
        }
      ]
    },
    {
      "id": "riscv-vs-arm",
      "title": "RISC-V vs ARM Architecture — Complete Comparison",
      "category": "arch",
      "keywords": [
        "risc-v",
        "riscv",
        "arm",
        "risc-v vs arm",
        "arm architecture",
        "cortex",
        "isa",
        "open source isa"
      ],
      "summary": "ARM is a proprietary, commercially licensed instruction set architecture (ISA) dominating mobile and enterprise SoCs. RISC-V is a free, open-standard modular ISA rapidly expanding in microcontrollers, storage, and AI accelerators.",
      "definition": "Both are Load-Store Reduced Instruction Set Computers (RISC). ARM requires expensive architectural licenses; RISC-V allows anyone to design, customize, and fabricate a CPU core without royalties.",
      "how_it_works": "- **RISC-V**: Base integer ISA (RV32I / RV64I) has only 47 base instructions. Modular extensions (M: Multiply, A: Atomic, F: Float, C: Compressed, V: Vector) add capabilities.\n- **ARM**: AArch64 (ARMv8/ARMv9) is a massive, comprehensive ISA featuring NEON SIMD, SVE, TrustZone security, and tightly integrated memory management units (MMUs).\n- **Custom Instructions**: RISC-V makes adding custom domain-specific acceleration opcodes trivial; ARM generally prohibits custom instruction additions unless specifically licensed.",
      "silicon_example": "Apple Silicon (M-series) is custom ARM; Western Digital and Seagate hard drive controllers use RISC-V cores.",
      "follow_ups": [
        "Explore RISC-V from Scratch Course.",
        "Explore ARM Architecture from Scratch Course.",
        "Try the RISC-V Simulator."
      ],
      "resources": [
        {
          "title": "RISC-V vs ARM Comparison",
          "url": "/risc-v-vs-arm/",
          "desc": "Deep technical comparison of instruction encodings and ecosystems."
        },
        {
          "title": "RISC-V from Scratch",
          "url": "/riscv-from-scratch/",
          "desc": "Build a single-cycle and pipelined RISC-V CPU from scratch."
        },
        {
          "title": "ARM Architecture Course",
          "url": "/arm-architecture/",
          "desc": "30-lesson structured curriculum on ARM Cortex processors."
        }
      ]
    },
    {
      "id": "cache-memory-architecture",
      "title": "Cache Memory Architecture — Direct Mapped, Set Associative & AMAT",
      "category": "arch",
      "keywords": [
        "cache memory",
        "cache simulator",
        "amat",
        "direct mapped",
        "set associative",
        "cache hit",
        "cache miss",
        "l1 l2 l3 cache"
      ],
      "summary": "Cache is small, ultra-fast on-chip SRAM that bridges the speed gap between high-frequency CPU cores (3 GHz) and slow main DRAM memory (100ns latency).",
      "definition": "Organized into Cache Lines containing valid bit, tag, data block, and dirty bit.",
      "how_it_works": "**Address Decomposition**: $[\\text{Tag} \\mid \\text{Set Index} \\mid \\text{Block Offset}]$\n\n**Associativity Types**:\n1. **Direct-Mapped**: Each memory address maps to exactly one cache slot ($N=1$). Fast hit time, but prone to conflict misses.\n2. **N-Way Set Associative**: Memory maps to a set of $N$ possible slots (e.g. 4-way, 8-way). Uses LRU (Least Recently Used) replacement policy.\n3. **Fully Associative**: Any block can go into any cache line. Eliminates conflict misses, but requires expensive parallel content-addressable memory (CAM) comparison.\n\n**AMAT (Average Memory Access Time)**:\n$AMAT = \\text{Hit Time} + (\\text{Miss Rate} \\times \\text{Miss Penalty})$",
      "silicon_example": "Modern CPUs use 3 levels: L1 (32KB, 1ns / 4 cycles), L2 (1MB, 3-4ns / 14 cycles), and shared L3 (32-96MB, 12-15ns / 45 cycles).",
      "follow_ups": [
        "Launch the Cache Simulator on EcrioniX.",
        "How do pipeline hazards affect cache misses?",
        "What is HBM (High Bandwidth Memory) in AI chips?"
      ],
      "resources": [
        {
          "title": "Cache Simulator",
          "url": "/tools/cache-sim/",
          "desc": "Simulate cache hits, misses, associativity, and AMAT interactively."
        },
        {
          "title": "RAM vs ROM vs Cache vs SSD Guide",
          "url": "/explore/ram-vs-rom-vs-cache-vs-ssd/",
          "desc": "Visual interactive memory hierarchy explorer."
        }
      ]
    },
    {
      "id": "cpu-pipeline-hazards",
      "title": "CPU Pipelining & Hazards (Structural, Data, Control)",
      "category": "arch",
      "keywords": [
        "pipeline",
        "pipelining",
        "cpu pipeline",
        "hazards",
        "data hazard",
        "forwarding",
        "branch prediction",
        "stalls bubbles"
      ],
      "summary": "Pipelining divides instruction execution into discrete stages (IF, ID, EX, MEM, WB) separated by pipeline registers, increasing throughput by executing multiple instructions concurrently.",
      "definition": "Pipeline Hazards prevent the next instruction from executing in its designated clock cycle:\n1. **Structural Hazards**: Hardware resource conflict (e.g. single memory port for both instruction and data).\n2. **Data Hazards (RAW, WAR, WAW)**: Instruction depends on the result of an earlier instruction still in flight.\n3. **Control Hazards (Branch)**: Program counter cannot be determined until branch condition resolves in execution stage.",
      "how_it_works": "**Hazard Resolution**:\n- **Forwarding (Bypassing)**: Routing result directly from EX/MEM or MEM/WB pipeline registers back to the ALU inputs, eliminating RAW stalls.\n- **Stalling (Bubbles)**: Inserting `NOP` cycles when data cannot be forwarded in time (e.g. Load-Use hazard).\n- **Branch Prediction**: Speculatively fetching along predicted path using 2-bit branch predictors and Branch Target Buffers (BTB). A misprediction requires flushing pipeline registers.",
      "follow_ups": [
        "How does a 4-bit counter work in a Program Counter?",
        "Explore RISC-V from Scratch Course.",
        "What is Branch Prediction?"
      ],
      "resources": [
        {
          "title": "RISC-V from Scratch Course",
          "url": "/riscv-from-scratch/",
          "desc": "Step-by-step pipeline implementation with forwarding and hazard detection."
        },
        {
          "title": "RTL Pipelining Guide",
          "url": "/rtl_design/pipelining/",
          "desc": "How to pipeline combinational datapath logic in Verilog."
        }
      ]
    }
  ]
};
