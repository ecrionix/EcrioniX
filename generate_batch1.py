import json

modules = [
    {
        'title': 'Module 1: The Digital Foundation',
        'lessons': [
            ('cmos-inverter-gate-delays', 'The CMOS Inverter & Gate Delays'),
            ('latches-vs-flip-flops', 'Latches vs. Flip-Flops'),
            ('inside-the-d-flip-flop', 'Inside the D-Flip Flop (Master-Slave)'),
            ('setup-time-transistor-level', 'Setup Time at the Transistor Level'),
            ('hold-time-transistor-level', 'Hold Time at the Transistor Level'),
            ('metastability-and-mtbf', 'Metastability & MTBF'),
            ('propagation-vs-contamination-delay', 'Propagation Delay vs. Contamination Delay'),
            ('clock-edges-duty-cycles', 'Clock Edges and Duty Cycles'),
            ('sync-vs-async-reset', 'Synchronous vs. Asynchronous Reset'),
            ('module-1-review-practice', 'Review & Practice Problems')
        ]
    },
    {
        'title': 'Module 2: STA Concepts & Terminology',
        'lessons': [
            ('simulation-vs-sta', 'Simulation vs. Static Timing Analysis'),
            ('timing-graph-nodes-edges', 'The Timing Graph (Nodes & Edges)'),
            ('timing-arcs', 'Timing Arcs (Combinational & Sequential)'),
            ('unateness', 'Unateness (Positive, Negative, Non-unate)'),
            ('slew-transition-time', 'Slew (Transition Time)'),
            ('load-capacitance', 'Load Capacitance'),
            ('cell-delay-vs-net-delay', 'Cell Delay vs. Net Delay'),
            ('launch-vs-capture-edge', 'Launch Edge vs. Capture Edge'),
            ('data-arrival-time', 'The Data Arrival Time (DAT)'),
            ('data-required-time', 'The Data Required Time (DRT)')
        ]
    },
    {
        'title': 'Module 3: The Four Path Types',
        'lessons': [
            ('path-1-reg-to-reg', 'Path 1: Reg-to-Reg (The standard path)'),
            ('path-2-in-to-reg', 'Path 2: In-to-Reg (Input delays)'),
            ('path-3-reg-to-out', 'Path 3: Reg-to-Out (Output delays)'),
            ('path-4-in-to-out', 'Path 4: In-to-Out (Combinational feedthrough)'),
            ('virtual-clocks', 'Virtual Clocks'),
            ('constraining-input-delay', 'Constraining I/O paths (set_input_delay)'),
            ('constraining-output-delay', 'Constraining I/O paths (set_output_delay)'),
            ('drive-strength-output-load', 'Drive Strength & Output Load'),
            ('path-groups-weighting', 'Path Groups & Weighting'),
            ('identifying-paths-netlist', 'Practice: Identifying Paths in a Netlist')
        ]
    },
    {
        'title': 'Module 4: Advanced Clocking',
        'lessons': [
            ('ideal-vs-propagated-clocks', 'Ideal vs. Propagated Clocks'),
            ('clock-skew', 'Clock Skew (Positive vs. Negative)'),
            ('clock-jitter', 'Clock Jitter (Deterministic vs. Random)'),
            ('clock-latency', 'Clock Latency (Source vs. Network)'),
            ('clock-uncertainty', 'Clock Uncertainty'),
            ('clock-gating-setup-hold', 'Clock Gating Setup/Hold Checks'),
            ('generated-clocks', 'Generated Clocks (Dividers)'),
            ('multiplexed-clocks', 'Multiplexed Clocks'),
            ('pulse-width-checks', 'Pulse Width Checks'),
            ('cts-basics', 'Clock Tree Synthesis (CTS) basics')
        ]
    },
    {
        'title': 'Module 5: Setup & Hold Math',
        'lessons': [
            ('setup-slack-equation', 'The Setup Slack Equation'),
            ('hold-slack-equation', 'The Hold Slack Equation'),
            ('why-skew-helps-setup', 'Why Skew Helps Setup but Hurts Hold'),
            ('why-jitter-hurts-setup', 'Why Jitter Hurts Setup but Not Hold'),
            ('cppr-crpr', 'Common Clock Path Pessimism Removal (CPPR/CRPR)'),
            ('time-borrowing', 'Time Borrowing (Latch-based designs)'),
            ('half-cycle-paths', 'Half-Cycle Paths (Negedge sampling)'),
            ('recovery-removal-checks', 'Recovery and Removal Checks (Reset timing)'),
            ('data-to-data-checks', 'Data to Data Checks'),
            ('manual-slack-calculation', 'Practice: Manual Slack Calculation Problems')
        ]
    }
]

out = []
for i, m in enumerate(modules):
    prompt = f"""You are building {m['title']} of the EcrioniX STA course.
Your task is to write the complete, premium content for 10 lesson files.
Each file must follow the exact same HTML template as `d:\EcrioniX-1\premium-course\\rtl-design\\architecture\index.html` (including the premium-theme.css, theme-toggle.js, navbar, and WaveDrom script at the bottom).
You must use WaveDrom for timing diagrams wherever applicable.
You must use premium markdown-style divs (`infobox`, `warnbox`, `def-box`, `analogy`, `code-panel`) for structuring the content.
Write highly detailed, accurate content from a silicon-valley expert perspective.

The files to write are:
"""
    for slug, title in m['lessons']:
        prompt += f"- d:\\EcrioniX-1\\premium-course\\sta\\{slug}\\index.html (Title: {title})\n"
    
    prompt += "\nWrite all 10 files using write_to_file. When done, reply with a summary."
    out.append({
        'TypeName': 'sta_lesson_builder',
        'Role': f'STA Module {i+1} Builder',
        'Prompt': prompt,
        'Model': 'pro',
        'Workspace': 'inherit'
    })

with open('batch1.json', 'w') as f:
    json.dump(out, f, indent=2)
