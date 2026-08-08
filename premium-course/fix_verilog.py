import os, re

files = [
    r"d:\EcrioniX-1\premium-course\cdc\closed-loop-mcp\index.html",
    r"d:\EcrioniX-1\premium-course\cdc\two-register-fifo\index.html",
    r"d:\EcrioniX-1\premium-course\cdc\naming-conventions\index.html",
    r"d:\EcrioniX-1\premium-course\cdc\x-propagation\index.html",
    r"d:\EcrioniX-1\premium-course\cdc\sdf-annotation\index.html"
]

kw = ["module", "endmodule", "begin", "end", "if", "else", "always", "assign", "parameter", "localparam", "initial", "function", "endfunction", "for", "while", "case", "endcase", "default", "generate", "endgenerate"]
types = ["input", "output", "inout", "reg", "wire", "integer", "logic", "bit"]
edges = ["posedge", "negedge"]

def highlight(code):
    code = code.replace("&lt;=", "<=")
    
    pattern = re.compile(
        r'(?P<tag></?[a-zA-Z][^>]*>)|'
        r'(?P<cmt>//.*)|'
        r'(?P<num>\b\d+\'[bodhBODH][a-fA-F0-9xXzZ_]+|\b\d+\b)|'
        r'(?P<sys>\$[a-zA-Z_]\w*)|'
        r'(?P<word>\b[a-zA-Z_]\w*\b)|'
        r'(?P<other>.)'
    )
    
    res = []
    for m in pattern.finditer(code):
        if m.group('tag'):
            res.append(m.group('tag'))
        elif m.group('cmt'):
            res.append(f'<span class="hl-cmt">{m.group("cmt")}</span>')
        elif m.group('num'):
            res.append(f'<span class="hl-num">{m.group("num")}</span>')
        elif m.group('sys'):
            res.append(f'<span class="hl-sys">{m.group("sys")}</span>')
        elif m.group('word'):
            word = m.group('word')
            if word in kw:
                res.append(f'<span class="hl-kw">{word}</span>')
            elif word in types:
                res.append(f'<span class="hl-type">{word}</span>')
            elif word in edges:
                res.append(f'<span class="hl-edge">{word}</span>')
            else:
                res.append(word)
        elif m.group('other'):
            res.append(m.group('other'))
            
    return "".join(res)

for fpath in files:
    try:
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {fpath}: {e}")
        continue
        
    if '<link rel="stylesheet" href="/assets/verilog-code-block.css">' not in content:
        content = content.replace("</head>", '    <link rel="stylesheet" href="/assets/verilog-code-block.css">\n</head>')
        
    def pre_repl(m):
        start_tag = m.group(1)
        inner = m.group(2)
        
        # Avoid double-wrapping if already wrapped
        # We can check if it's already wrapped by searching the original content, but easier just to do it
        # Actually, let's just do exactly what's asked.
        hl = highlight(inner)
        return f'<div class="code-panel"><div class="code-panel-head"><span>filename.v</span></div>{start_tag}{hl}</pre></div>'
        
    # We should only wrap if it's not already wrapped!
    # A simple way: check if '<div class="code-panel">' is already there before doing substitution
    # Or just replace and if it becomes double wrapped, fix it. But assuming it's not wrapped.
    
    new_content = re.sub(r'(<pre[^>]*>)([\s\S]*?)</pre>', pre_repl, content)
    
    with open(fpath, "w", encoding="utf-8", newline='\n') as f:
        f.write(new_content)
    print(f"Fixed {fpath}")
