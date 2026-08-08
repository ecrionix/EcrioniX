import os

STA_DIR = r"d:\EcrioniX-1\premium-course\sta"

modules = [
    {
        "title": "Module 1: The Digital Foundation",
        "lessons": [
            ("cmos-inverter-gate-delays", "The CMOS Inverter & Gate Delays"),
            ("latches-vs-flip-flops", "Latches vs. Flip-Flops"),
            ("inside-the-d-flip-flop", "Inside the D-Flip Flop (Master-Slave)"),
            ("setup-time-transistor-level", "Setup Time at the Transistor Level"),
            ("hold-time-transistor-level", "Hold Time at the Transistor Level"),
            ("metastability-and-mtbf", "Metastability & MTBF"),
            ("propagation-vs-contamination-delay", "Propagation Delay vs. Contamination Delay"),
            ("clock-edges-duty-cycles", "Clock Edges and Duty Cycles"),
            ("sync-vs-async-reset", "Synchronous vs. Asynchronous Reset"),
            ("module-1-review-practice", "Review & Practice Problems")
        ]
    },
    {
        "title": "Module 2: STA Concepts & Terminology",
        "lessons": [
            ("simulation-vs-sta", "Simulation vs. Static Timing Analysis"),
            ("timing-graph-nodes-edges", "The Timing Graph (Nodes & Edges)"),
            ("timing-arcs", "Timing Arcs (Combinational & Sequential)"),
            ("unateness", "Unateness (Positive, Negative, Non-unate)"),
            ("slew-transition-time", "Slew (Transition Time)"),
            ("load-capacitance", "Load Capacitance"),
            ("cell-delay-vs-net-delay", "Cell Delay vs. Net Delay"),
            ("launch-vs-capture-edge", "Launch Edge vs. Capture Edge"),
            ("data-arrival-time", "The Data Arrival Time (DAT)"),
            ("data-required-time", "The Data Required Time (DRT)")
        ]
    },
    {
        "title": "Module 3: The Four Path Types",
        "lessons": [
            ("path-1-reg-to-reg", "Path 1: Reg-to-Reg (The standard path)"),
            ("path-2-in-to-reg", "Path 2: In-to-Reg (Input delays)"),
            ("path-3-reg-to-out", "Path 3: Reg-to-Out (Output delays)"),
            ("path-4-in-to-out", "Path 4: In-to-Out (Combinational feedthrough)"),
            ("virtual-clocks", "Virtual Clocks"),
            ("constraining-input-delay", "Constraining I/O paths (set_input_delay)"),
            ("constraining-output-delay", "Constraining I/O paths (set_output_delay)"),
            ("drive-strength-output-load", "Drive Strength & Output Load"),
            ("path-groups-weighting", "Path Groups & Weighting"),
            ("identifying-paths-netlist", "Practice: Identifying Paths in a Netlist")
        ]
    },
    {
        "title": "Module 4: Advanced Clocking",
        "lessons": [
            ("ideal-vs-propagated-clocks", "Ideal vs. Propagated Clocks"),
            ("clock-skew", "Clock Skew (Positive vs. Negative)"),
            ("clock-jitter", "Clock Jitter (Deterministic vs. Random)"),
            ("clock-latency", "Clock Latency (Source vs. Network)"),
            ("clock-uncertainty", "Clock Uncertainty"),
            ("clock-gating-setup-hold", "Clock Gating Setup/Hold Checks"),
            ("generated-clocks", "Generated Clocks (Dividers)"),
            ("multiplexed-clocks", "Multiplexed Clocks"),
            ("pulse-width-checks", "Pulse Width Checks"),
            ("cts-basics", "Clock Tree Synthesis (CTS) basics")
        ]
    },
    {
        "title": "Module 5: Setup & Hold Math",
        "lessons": [
            ("setup-slack-equation", "The Setup Slack Equation"),
            ("hold-slack-equation", "The Hold Slack Equation"),
            ("why-skew-helps-setup", "Why Skew Helps Setup but Hurts Hold"),
            ("why-jitter-hurts-setup", "Why Jitter Hurts Setup but Not Hold"),
            ("cppr-crpr", "Common Clock Path Pessimism Removal (CPPR/CRPR)"),
            ("time-borrowing", "Time Borrowing (Latch-based designs)"),
            ("half-cycle-paths", "Half-Cycle Paths (Negedge sampling)"),
            ("recovery-removal-checks", "Recovery and Removal Checks (Reset timing)"),
            ("data-to-data-checks", "Data to Data Checks"),
            ("manual-slack-calculation", "Practice: Manual Slack Calculation Problems")
        ]
    },
    {
        "title": "Module 6: Delay Modeling",
        "lessons": [
            ("wireload-models", "Wireload Models (WLM)"),
            ("nldm", "Non-Linear Delay Models (NLDM)"),
            ("ccs", "Composite Current Source (CCS)"),
            ("ecsm", "Effective Current Source Model (ECSM)"),
            ("rc-extraction", "RC Extraction (SPEF)"),
            ("elmore-delay-vs-awe", "Elmore Delay vs. AWE"),
            ("cell-characterization", "Cell Characterization (.lib files)"),
            ("interpolation-extrapolation", "Interpolation and Extrapolation in LUTs"),
            ("temperature-inversion", "Temperature Inversion"),
            ("miller-effect-coupling", "Miller Effect & Coupling Capacitance")
        ]
    },
    {
        "title": "Module 7: Operating Conditions (PVT)",
        "lessons": [
            ("pvt-basics", "Process, Voltage, Temperature (PVT)"),
            ("slow-slow-corner", "Slow-Slow (SS) Corner"),
            ("fast-fast-corner", "Fast-Fast (FF) Corner"),
            ("typical-cross-corners", "Typical (TT) and Cross Corners (SF, FS)"),
            ("on-chip-variation-ocv", "On-Chip Variation (OCV)"),
            ("aocv-pocv", "Advanced OCV (AOCV) / Parametric OCV (POCV)"),
            ("ssta", "Statistical STA (SSTA)"),
            ("mmmc-analysis", "Multi-Mode Multi-Corner (MMMC) Analysis"),
            ("rc-corners", "RC Corners (Cbest, Cworst, RCbest, RCworst)"),
            ("derating-factors", "Derating Factors")
        ]
    },
    {
        "title": "Module 8: Timing Exceptions",
        "lessons": [
            ("what-are-timing-exceptions", "What are Timing Exceptions?"),
            ("false-paths", "False Paths (set_false_path)"),
            ("logical-vs-physical-false-paths", "Logical vs. Physical False Paths"),
            ("multicycle-paths-setup", "Multicycle Paths (Setup)"),
            ("multicycle-paths-hold", "Multicycle Paths (Hold)"),
            ("case-analysis", "Case Analysis (set_case_analysis)"),
            ("disable-timing", "Disable Timing (set_disable_timing)"),
            ("min-max-delay-constraints", "Min/Max Delay Constraints"),
            ("path-segmentation", "Path Segmentation"),
            ("exception-priorities", "Exception Priorities and Conflicts")
        ]
    },
    {
        "title": "Module 9: Fixing Violations",
        "lessons": [
            ("fixing-setup-upsizing", "Fixing Setup: Cell Upsizing"),
            ("fixing-setup-buffer-removal", "Fixing Setup: Buffer Removal & Cloning"),
            ("fixing-setup-logic-restructuring", "Fixing Setup: Logic Restructuring"),
            ("fixing-setup-pipelining", "Fixing Setup: Pipelining & Retiming"),
            ("fixing-hold-buffer-insertion", "Fixing Hold: Buffer Insertion"),
            ("fixing-hold-downsizing", "Fixing Hold: Downsizing"),
            ("hold-fixing-trap", "The \"Hold Fixing creates Setup Violation\" Trap"),
            ("useful-skew", "Useful Skew (Clock scheduling)"),
            ("vt-swapping", "VT Swapping (LVT/RVT/HVT)"),
            ("eco-flow", "Engineering Change Orders (ECO) Flow")
        ]
    },
    {
        "title": "Module 10: Advanced Problems & Signoff",
        "lessons": [
            ("crosstalk-delay", "Crosstalk Delay (Delta Delay)"),
            ("crosstalk-glitch", "Crosstalk Glitch (Noise)"),
            ("ir-drop-impact", "IR Drop Impact on Timing"),
            ("cdc-structural-checks", "Clock Domain Crossing (CDC) Structural Checks"),
            ("sta-signoff-criteria", "STA Signoff Criteria"),
            ("handling-ip-cores", "Handling IP Cores (ILM / ETM)"),
            ("top-level-integration", "Top-Level Integration Timing"),
            ("common-sta-tool-warnings", "Common STA Tool Warnings"),
            ("interview-problems", "Interview Problems: \"Fix this path\""),
            ("future-of-sta", "The Future of STA (Machine Learning in EDA)")
        ]
    }
]

def generate_index_html():
    html = """<!DOCTYPE html>
<html lang="en">
<head>
<script>(function(){try{var t=localStorage.getItem('ecrionix-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>
<link rel="stylesheet" href="/assets/theme-toggle.css">
<link rel="stylesheet" href="/assets/premium-theme.css">
<meta charset="UTF-8">
<meta name="robots" content="index,follow">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Static Timing Analysis (STA) Course | EcrioniX</title>
<meta property="og:title" content="Static Timing Analysis (STA) Course | EcrioniX">
<meta property="og:description" content="Master Static Timing Analysis (STA). Learn setup and hold times, slacks, false paths, PVT corners, and fixing timing violations.">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
<nav class="navbar">
  <div class="navbar-logo">EcrioniX</div>
  <a href="/premium-course/" class="back-link">← Premium Courses</a>
</nav>

<div class="container">
  <div style="text-align: center; margin-bottom: 2rem;">
      <h1 style="font-size: 2.5rem; color: var(--heading, #f8fafc); margin-bottom: 0.5rem;">Static Timing Analysis (STA)</h1>
      <p style="color: var(--sl); font-size: 1.1rem; max-width: 600px; margin: 0 auto;">From basic D-Flip Flop timings to advanced silicon tape-out signoff. A complete 100-lesson masterclass.</p>
  </div>
"""

    lesson_num = 1
    for i, mod in enumerate(modules):
        mod_num = i + 1
        html += f"""
  <div class="module">
    <div class="module-head">
      <div class="module-num">M{mod_num}</div>
      <h2>{mod['title']}</h2>
    </div>
    <ul class="lesson-list">"""
        
        for slug, title in mod['lessons']:
            html += f"""
      <li><a href="{slug}/"><span class="num">{mod_num}.{lesson_num - (i*10)}</span> {title}</a></li>"""
            lesson_num += 1
            
            # create directory and empty file if doesn't exist
            lesson_dir = os.path.join(STA_DIR, slug)
            os.makedirs(lesson_dir, exist_ok=True)
            index_path = os.path.join(lesson_dir, "index.html")
            if not os.path.exists(index_path):
                # We will touch it so subagents know it exists, but they will rewrite it
                with open(index_path, 'w') as f:
                    f.write("<!-- to be written by subagent -->")

        html += """
    </ul>
  </div>"""

    html += """
</div>
<script defer src="/assets/theme-toggle.js"></script>
<footer>© 2026 EcrioniX · <a href="/">Home</a> · <a href="/premium-course/">Premium</a></footer>
</body>
</html>
"""
    return html


# Make index.html
with open(os.path.join(STA_DIR, "index.html"), "w", encoding="utf-8") as f:
    f.write(generate_index_html())

print("Generated STA index.html and directory structure.")
