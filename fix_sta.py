import os
import glob
import re

STA_DIR = r"d:\EcrioniX-1\premium-course\sta"

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace the entire <head> section up to </head> with the standard EcrioniX head
    # We will extract the title first.
    title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
    title = title_match.group(1) if title_match else "Static Timing Analysis | EcrioniX"

    # We want to replace everything from <head> to </head> inclusive
    standard_head = f"""<head>
<script>(function(){{try{{var t=localStorage.getItem('ecrionix-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);}}catch(e){{}}}})();</script>
<link rel="stylesheet" href="/assets/theme-toggle.css">
<link rel="stylesheet" href="/assets/premium-theme.css">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXZS8C1FLY"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','G-XXZS8C1FLY');</script>
<meta charset="UTF-8">
<meta name="robots" content="index,follow">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta property="og:title" content="{title}">
<meta property="og:description" content="Master Static Timing Analysis (STA). Learn setup and hold times, slacks, false paths, PVT corners, and fixing timing violations.">
<link rel="icon" href="/favicon1.png">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/verilog-code-block.css">
<style>
/* Base inline overrides if needed for custom things */
</style>
</head>"""

    content = re.sub(r'<head>.*?</head>', standard_head, content, flags=re.DOTALL | re.IGNORECASE)

    # 2. Fix body tag
    content = re.sub(r'<body[^>]*>', '<body>\n<nav class="navbar">\n  <div class="navbar-logo">EcrioniX</div>\n  <div class="navbar-right"><a href="/premium-course/sta/" class="back-link">← STA Course Map</a></div>\n</nav>', content)

    # 3. Replace <header class="header">... </header> with nothing (since we added nav)
    content = re.sub(r'<header class="header">.*?</header>', '', content, flags=re.DOTALL)

    # 4. Replace callout -> infobox
    content = content.replace('class="callout"', 'class="infobox"')
    
    # 5. Fix wavedrom wrapper -> diagram-wrap
    content = content.replace('class="wavedrom-wrapper"', 'class="diagram-wrap"')

    # 6. Add standard scripts to the end of body
    standard_footer = """
<footer>© 2026 EcrioniX · <a href="/">Home</a> · <a href="/premium-course/">Premium</a></footer>
<script defer src="/assets/verilog-code-block.js"></script>
<script defer src="/assets/theme-toggle.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/wavedrom/3.3.0/skins/default.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/wavedrom/3.3.0/wavedrom.min.js"></script>
<script>window.addEventListener('load', () => WaveDrom.ProcessAll());</script>
</body>"""

    content = re.sub(r'</body>', standard_footer, content, flags=re.IGNORECASE)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)


for filepath in glob.glob(os.path.join(STA_DIR, "**/*.html"), recursive=True):
    if "index.html" in filepath and filepath == os.path.join(STA_DIR, "index.html"):
        continue # don't run on the root index map just yet
    print(f"Fixing {filepath}")
    fix_file(filepath)

print("Done fixing STA files.")
