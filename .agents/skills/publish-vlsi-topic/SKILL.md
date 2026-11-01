---
name: publish-vlsi-topic
description: Automates the creation of high-SEO VLSI topic pages and generates LinkedIn/WhatsApp promotional posts.
---

# Publish VLSI Topic Skill

Use this skill when the user asks you to "post a page", "publish a vlsi topic", or execute the automated SEO pipeline.

## Workflow

When triggered, execute the following steps precisely:

### Step 1: Select a High-Volume VLSI Keyword
Choose one of the following highly-searched VLSI topics (or ask the user if they have a preference):
- "Setup and Hold Time Violations Explained"
- "FIFO Depth Calculation Formula"
- "ASIC vs FPGA Design Flow Differences"
- "Clock Domain Crossing (CDC) Interview Questions"
- "CMOS Inverter Dynamic Power Dissipation"
- "False Paths and Multicycle Paths in STA"

### Step 2: Generate the HTML Page
Create a new beautifully styled HTML page for the topic at `d:\EcrioniX-1\topics\<topic-slug>\index.html`.
- Use the standard EcrioniX dark-mode HTML template (similar to the CDC Reconvergence page).
- **CRITICAL SEO REQUIREMENTS:**
  - `title`, `meta name="description"`, and `meta name="keywords"` must be heavily optimized.
  - Include an `application/ld+json` FAQPage schema block with 2-3 common interview questions.
  - Use `WaveDrom` or SVG diagrams with highly descriptive captions for Image SEO.
- Ensure the content is accurate, industry-grade, and includes actionable insights or rules of thumb.

### Step 3: Rigorous Self-Review
Before committing, you MUST thoroughly self-review the generated file for:
- **Technical Accuracy:** Are the formulas correct? Is the VLSI hardware intuition flawless?
- **Visual Rendering:** Is the WaveDrom or SVG syntax perfectly formatted without syntax errors?
- **SEO Formatting:** Are all meta tags and JSON-LD schemas properly closed and valid?

### Step 4: Commit and Push (After Review)
Once you are 100% confident the content is pristine and accurate, run the following terminal command to deploy the page live:
`git add d:\EcrioniX-1\topics\<topic-slug>\index.html ; git commit -m "Add highly searchable VLSI topic: <Topic Name>" ; git push`

### Step 5: Generate Social Media Posts
After the push is successful, generate two promotional posts in your chat response to the user:

1. **LinkedIn Post:**
   - Write a provocative, engaging hook (e.g., "90% of juniors fail this interview question...").
   - Include a brief technical snippet to prove value.
   - Link to `https://ecrionix.org/topics/<topic-slug>/`.
   - Add targeted hashtags (e.g., `#VLSI #ASIC #RTL #SystemVerilog #Semiconductors #EcrioniX`).

2. **WhatsApp Broadcast Message:**
   - Keep it short, punchy, and mobile-friendly with emojis.
   - Include a direct call to action: "Read the full guide here: 🔗 [link]".

## Constraints
- Never skip the Git push. The page must be live before providing the social posts.
- If the user simply says "post a topic", do not ask for permission—just pick one from the list and execute the entire workflow end-to-end.
