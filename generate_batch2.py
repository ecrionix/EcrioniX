import json

modules = [
    {
        'title': 'Module 6: Delay Modeling',
        'lessons': [
            ('wireload-models', 'Wireload Models (WLM)'),
            ('nldm', 'Non-Linear Delay Models (NLDM)'),
            ('ccs', 'Composite Current Source (CCS)'),
            ('ecsm', 'Effective Current Source Model (ECSM)'),
            ('rc-extraction', 'RC Extraction (SPEF)'),
            ('elmore-delay-vs-awe', 'Elmore Delay vs. AWE'),
            ('cell-characterization', 'Cell Characterization (.lib files)'),
            ('interpolation-extrapolation', 'Interpolation and Extrapolation in LUTs'),
            ('temperature-inversion', 'Temperature Inversion'),
            ('miller-effect-coupling', 'Miller Effect & Coupling Capacitance')
        ]
    },
    {
        'title': 'Module 7: Operating Conditions (PVT)',
        'lessons': [
            ('pvt-basics', 'Process, Voltage, Temperature (PVT)'),
            ('slow-slow-corner', 'Slow-Slow (SS) Corner'),
            ('fast-fast-corner', 'Fast-Fast (FF) Corner'),
            ('typical-cross-corners', 'Typical (TT) and Cross Corners (SF, FS)'),
            ('on-chip-variation-ocv', 'On-Chip Variation (OCV)'),
            ('aocv-pocv', 'Advanced OCV (AOCV) / Parametric OCV (POCV)'),
            ('ssta', 'Statistical STA (SSTA)'),
            ('mmmc-analysis', 'Multi-Mode Multi-Corner (MMMC) Analysis'),
            ('rc-corners', 'RC Corners (Cbest, Cworst, RCbest, RCworst)'),
            ('derating-factors', 'Derating Factors')
        ]
    },
    {
        'title': 'Module 8: Timing Exceptions',
        'lessons': [
            ('what-are-timing-exceptions', 'What are Timing Exceptions?'),
            ('false-paths', 'False Paths (set_false_path)'),
            ('logical-vs-physical-false-paths', 'Logical vs. Physical False Paths'),
            ('multicycle-paths-setup', 'Multicycle Paths (Setup)'),
            ('multicycle-paths-hold', 'Multicycle Paths (Hold)'),
            ('case-analysis', 'Case Analysis (set_case_analysis)'),
            ('disable-timing', 'Disable Timing (set_disable_timing)'),
            ('min-max-delay-constraints', 'Min/Max Delay Constraints'),
            ('path-segmentation', 'Path Segmentation'),
            ('exception-priorities', 'Exception Priorities and Conflicts')
        ]
    },
    {
        'title': 'Module 9: Fixing Violations',
        'lessons': [
            ('fixing-setup-upsizing', 'Fixing Setup: Cell Upsizing'),
            ('fixing-setup-buffer-removal', 'Fixing Setup: Buffer Removal & Cloning'),
            ('fixing-setup-logic-restructuring', 'Fixing Setup: Logic Restructuring'),
            ('fixing-setup-pipelining', 'Fixing Setup: Pipelining & Retiming'),
            ('fixing-hold-buffer-insertion', 'Fixing Hold: Buffer Insertion'),
            ('fixing-hold-downsizing', 'Fixing Hold: Downsizing'),
            ('hold-fixing-trap', 'The "Hold Fixing creates Setup Violation" Trap'),
            ('useful-skew', 'Useful Skew (Clock scheduling)'),
            ('vt-swapping', 'VT Swapping (LVT/RVT/HVT)'),
            ('eco-flow', 'Engineering Change Orders (ECO) Flow')
        ]
    },
    {
        'title': 'Module 10: Advanced Problems & Signoff',
        'lessons': [
            ('crosstalk-delay', 'Crosstalk Delay (Delta Delay)'),
            ('crosstalk-glitch', 'Crosstalk Glitch (Noise)'),
            ('ir-drop-impact', 'IR Drop Impact on Timing'),
            ('cdc-structural-checks', 'Clock Domain Crossing (CDC) Structural Checks'),
            ('sta-signoff-criteria', 'STA Signoff Criteria'),
            ('handling-ip-cores', 'Handling IP Cores (ILM / ETM)'),
            ('top-level-integration', 'Top-Level Integration Timing'),
            ('common-sta-tool-warnings', 'Common STA Tool Warnings'),
            ('interview-problems', 'Interview Problems: "Fix this path"'),
            ('future-of-sta', 'The Future of STA (Machine Learning in EDA)')
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
        'Role': f'STA Module {i+6} Builder',
        'Prompt': prompt,
        'Model': 'pro',
        'Workspace': 'inherit'
    })

with open('batch2.json', 'w') as f:
    json.dump(out, f, indent=2)
