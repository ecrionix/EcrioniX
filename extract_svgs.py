import os
import re

course_dir = r"d:\EcrioniX-1\premium-course\rtl-design"
assets_dir = r"d:\EcrioniX-1\assets\diagrams"

os.makedirs(assets_dir, exist_ok=True)

# We want to match <svg ...> ... </svg>
# Using (?s) to allow . to match newlines.
svg_pattern = re.compile(r'(<svg\b[^>]*>.*?</svg>)', flags=re.DOTALL | re.IGNORECASE)

total_svgs = 0
files_modified = 0

for root, _, files in os.walk(course_dir):
    for file in files:
        if file.endswith(".html"):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            matches = list(svg_pattern.finditer(content))
            if not matches:
                continue
                
            folder_name = os.path.basename(root)
            new_content = content
            
            # Process in reverse to maintain string indices during replacement
            for i, match in reversed(list(enumerate(matches))):
                svg_content = match.group(1)
                
                # Check if it's already an img tag (should be impossible with regex, but safe)
                if "<img" in svg_content and not "</svg>" in svg_content:
                    continue 
                
                # Extract aria-label for filename and alt text
                aria_match = re.search(r'aria-label="([^"]+)"', svg_content, re.IGNORECASE)
                if aria_match:
                    raw_name = aria_match.group(1).lower()
                    safe_name = re.sub(r'[^a-z0-9]+', '-', raw_name).strip('-')
                    filename = f"{folder_name}-{safe_name}.svg"
                    alt_text = aria_match.group(1)
                else:
                    filename = f"{folder_name}-diagram-{i+1}.svg"
                    alt_text = f"{folder_name} diagram {i+1}"
                
                svg_path = os.path.join(assets_dir, filename)
                
                # Write SVG to file
                with open(svg_path, 'w', encoding='utf-8') as f:
                    f.write(svg_content)
                
                # Replace in HTML
                img_tag = f'<img src="/assets/diagrams/{filename}" alt="{alt_text}" class="extracted-diagram" style="max-width: 100%; height: auto;" />'
                start, end = match.span(1)
                new_content = new_content[:start] + img_tag + new_content[end:]
                
                total_svgs += 1
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                files_modified += 1

print(f"Extraction complete! Extracted {total_svgs} SVGs across {files_modified} files.")
