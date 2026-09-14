from pathlib import Path
import re
import urllib.parse

path = Path('README.md')
text = path.read_text()

team_marker = '<div align="center">\n\n## So... what would I actually do on your team?'
public_marker = '<div align="center">\n\n<img src="https://img.shields.io/badge/Real_friction-A371F7?style=flat-square&labelColor=0D1117" alt="Real friction">'
if team_marker not in text or public_marker not in text:
    raise SystemExit('expected profile section markers are missing')

hero = '''<div align="center">

# Mamdouh Aboammar

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=26&pause=1400&color=A371F7&center=true&vCenter=true&width=900&height=56&lines=product+architecture%2C+one+repo+at+a+time;business+%C3%97+product+%C3%97+AI+%C3%97+engineering;learning+software+by+building+in+public;%2F%2F+build+less.+understand+more." alt="Product architecture in training, business product AI and engineering, learning software by building in public">

<br>

<a href="https://mamdouhaboammar.com/"><img src="https://img.shields.io/badge/Website-mamdouhaboammar.com-161B22?style=for-the-badge&logo=safari&logoColor=E6EDF3&labelColor=0D1117" alt="Mamdouh Aboammar website"></a>
<a href="https://www.linkedin.com/in/mamdouh-aboammar/"><img src="https://img.shields.io/badge/LinkedIn-Mamdouh_Aboammar-0A66C2?style=for-the-badge&labelColor=0D1117" alt="Mamdouh Aboammar on LinkedIn"></a>
<a href="REPOSITORIES.md"><img src="https://img.shields.io/badge/Repository_Catalog-142_builds-059669?style=for-the-badge&logo=markdown&logoColor=white&labelColor=0D1117" alt="Complete repository catalog"></a>
<a href="https://immamdouhaboammar.github.io/imMamdouhaboammar/"><img src="https://img.shields.io/badge/Portfolio-Live_Pages-4F46E5?style=for-the-badge&logo=githubpages&logoColor=white&labelColor=0D1117" alt="Live portfolio"></a>

<br><br>

<img src="https://img.shields.io/badge/Product_Architect-in_training-A371F7?style=for-the-badge&labelColor=0D1117" alt="Product Architect in training">
<img src="https://img.shields.io/badge/build-in_public-161B22?style=for-the-badge&labelColor=0D1117" alt="Build in public">
<img src="https://img.shields.io/badge/no_slop-161B22?style=for-the-badge&labelColor=0D1117" alt="No slop">
<img src="https://img.shields.io/badge/LGTM-Looks_Good_To_Marketing-161B22?style=for-the-badge&labelColor=0D1117" alt="LGTM means Looks Good To Marketing">

<br><br>

**Marketing and business background. Learning Product Architecture by building, documenting, testing, and maintaining real software in public.**

<sub>I work where product decisions, technical research, AI-assisted workflows, documentation, and engineering handoffs meet.</sub>

<br><br>

<img src="https://img.shields.io/badge/OPEN_TO-Freelance-A371F7?style=flat-square&labelColor=0D1117" alt="Open to freelance">
<img src="https://img.shields.io/badge/OPEN_TO-Full--time-3FB950?style=flat-square&labelColor=0D1117" alt="Open to full-time">
<img src="https://img.shields.io/badge/OPEN_TO-Part--time-58A6FF?style=flat-square&labelColor=0D1117" alt="Open to part-time">

<br>

<img src="https://img.shields.io/badge/OPPORTUNITIES-Egypt-161B22?style=flat-square&labelColor=0D1117" alt="Open to opportunities in Egypt">
<img src="https://img.shields.io/badge/OPPORTUNITIES-Saudi_Arabia-161B22?style=flat-square&labelColor=0D1117" alt="Open to opportunities in Saudi Arabia">
<img src="https://img.shields.io/badge/OPPORTUNITIES-UAE-161B22?style=flat-square&labelColor=0D1117" alt="Open to opportunities in the UAE">
<img src="https://img.shields.io/badge/OPPORTUNITIES-GCC-161B22?style=flat-square&labelColor=0D1117" alt="Open to opportunities across the GCC">

<br><br>

**I'm not training to become a Software Engineer.**<br>
I'm learning enough engineering to become much better at Product: what should be built, why it should exist, how it should behave, what it costs to maintain, and how to work with the people responsible for making it real.

</div>

<br>
'''

team = '''<div align="center">

## So... what would I actually do on your team?

<table>
<tr>
<td align="center" width="180"><a href="#english-version"><strong>🇬🇧 English</strong></a></td>
<td align="center" width="180"><a href="#arabic-version"><strong>🇪🇬 العربية</strong></a></td>
</tr>
</table>

<sub>English first. Arabic version right below it.</sub>

</div>

<a id="english-version"></a>

<details dir="ltr">
<summary dir="ltr"><strong>🇬🇧 How I can help your team</strong></summary>

<br>

The useful part of my profile is not "a marketing person with a lot of repos" and it is not "a junior engineer with a different title"

My useful position is the space between a business question and a clean engineering handoff

I come from marketing, business, strategy, and growth. I'm learning Product Architecture by getting close enough to code, Git, tests, docs, maintenance, and AI-assisted development to understand constraints before they become expensive confusion

### Where I can own work

**Product research and PRDs**<br>
Turn an early idea into a clearer problem, user need, assumptions, constraints, edge cases, trade-offs, success criteria, and acceptance criteria. Sometimes the right answer is still: **we should not build this**

**Docs and technical writing**<br>
Keep READMEs, onboarding, decision notes, architecture context, and product documentation close to the thing that actually exists, not the version everyone remembers from three months ago

**Issue discovery and bounded PRs**<br>
Reproduce problems, gather evidence, narrow scope, write useful issues, and take small changes as far as a reviewable PR when they are inside my technical range. Engineering keeps the final judgment

**AI-assisted workflows and agentic tooling**<br>
Look at repeated work, decide what AI can prepare safely, define where human review belongs, and turn recurring research, checks, or procedures into reusable skills, workflows, or small internal tools

**Evaluation, cost, and context discipline**<br>
Inspect repeated prompts, unnecessary context growth, oversized models doing simple work, weak verification, and duplicated generation. Then test alternatives and measure before claiming savings or quality gains

### What does the team get?

Less time spent asking "what exactly are we trying to do here?"<br>
Research that stays available instead of being repeated<br>
Docs that stay closer to reality<br>
Feature requests that arrive with actual thinking behind them<br>
Small changes that are easier to review<br>
AI usage that can be inspected, discussed, and improved

I care about reducing the amount of ambiguity that reaches the people who should be spending their time on the genuinely hard engineering problems

### What would a normal day look like?

A vague issue becomes a reproducible issue with evidence. An early feature becomes research plus a brief or PRD. Stale docs get fixed. A small technical change becomes a bounded PR. A process that keeps repeating becomes a candidate for a reusable workflow

A productive day does not have to end with a lot of code. It should end with something another person can inspect and use

`PR` · `Issue` · `Doc` · `Research note` · `Decision` · `Test evidence` · `Skill` · `Checklist`

### Where I fit best

I'm most useful when a team needs someone who can move between commercial context, Product thinking, AI workflows, technical research, documentation, and engineering constraints without pretending those disciplines are the same thing

**Available for:** Freelance · Full-time · Part-time<br>
**Open to opportunities across:** Egypt · Saudi Arabia · UAE · GCC

**Email:** [mamdouhfces1997@gmail.com](mailto:mamdouhfces1997@gmail.com)<br>
**WhatsApp:** [Message me directly](https://wa.me/201092677269)<br>
**LinkedIn:** [Mamdouh Aboammar](https://www.linkedin.com/in/mamdouh-aboammar/)<br>
**Website:** [mamdouhaboammar.com](https://mamdouhaboammar.com/)

<div align="center">

[العربية ↓](#arabic-version)

</div>

</details>

<br>

<a id="arabic-version"></a>

<details dir="rtl">
<summary dir="rtl"><strong>🇪🇬 إزاي أقدر أفيد فريقك</strong></summary>

<br>

<div dir="rtl" align="right">

أنا مش داخل أقدم نفسي كـ<span dir="ltr">Software Engineer</span>، ومش دي الخطة أصلا

أنا جاي من <span dir="ltr">Marketing</span> و<span dir="ltr">Business</span> و<span dir="ltr">Strategy</span>، وبتعلم <span dir="ltr">Product Architecture</span> عن طريق إني أقرب من الشغل التقني فعليا: <span dir="ltr">Code</span> و<span dir="ltr">Git</span> و<span dir="ltr">Tests</span> و<span dir="ltr">Docs</span> و<span dir="ltr">Maintenance</span> وشغل الـ<span dir="ltr">AI</span>

الهدف إن الفكرة التجارية توصل للفريق التقني وهي أوضح، وإن القيود والمخاطر والأسئلة المهمة تظهر بدري بدل ما نكتشفها بعد ما الشغل يبدأ

### ممكن أكون مسؤول عن إيه؟

**<span dir="ltr">Product Research</span> و<span dir="ltr">PRDs</span>**<br>
أحول الفكرة الأولية إلى مشكلة أوضح، احتياج حقيقي، افتراضات، قيود، <span dir="ltr">edge cases</span>، بدائل، ومعايير نجاح وقبول. وساعات أفضل قرار يبقى إننا ما نبنيش الفكرة أصلا

**الـ<span dir="ltr">Docs</span> والكتابة التقنية**<br>
أحدث الـ<span dir="ltr">README</span> والـ<span dir="ltr">onboarding</span> وملاحظات القرارات والتوثيق بحيث يفضل قريب من المنتج الموجود فعلا

**اكتشاف الـ<span dir="ltr">Issues</span> والـ<span dir="ltr">PRs</span> الصغيرة**<br>
أعمل <span dir="ltr">reproduction</span> للمشكلة، أجمع دليل، أحدد الـ<span dir="ltr">scope</span>، وأكتب <span dir="ltr">Issue</span> مفهومة. ولو التغيير محدود وفي حدود اللي أقدر أتحقق منه، أوصله لـ<span dir="ltr">PR</span> صغيرة للمراجعة والقرار النهائي يفضل عند الفريق التقني

**شغل الـ<span dir="ltr">AI</span> والـ<span dir="ltr">Agentic Workflows</span>**<br>
أشوف إيه بيتكرر، إيه الـ<span dir="ltr">AI</span> يقدر يجهزه بأمان، فين لازم مراجعة بشرية، وإيه ممكن يتحول لـ<span dir="ltr">Skill</span> أو <span dir="ltr">Workflow</span> أو أداة داخلية صغيرة بدل ما نبدأ من الصفر كل مرة

**القياس والتكلفة والـ<span dir="ltr">Context</span>**<br>
أراجع الـ<span dir="ltr">prompts</span> المتكررة، الـ<span dir="ltr">context</span> اللي بيكبر من غير داعي، استخدام موديلات أكبر من المطلوب، وضعف التحقق. وبعدها نجرب ونقيس قبل ما نقول إننا وفرنا أو حسنّا الجودة

### الفريق هيستفيد بإيه؟

وقت أقل في سؤال: هو المطلوب إيه بالظبط؟<br>
بحث بيتوثق بدل ما يتعاد<br>
<span dir="ltr">Docs</span> أقرب للواقع<br>
<span dir="ltr">Features</span> داخلة التنفيذ وهي متفكر فيها أكتر<br>
تغييرات صغيرة أسهل في المراجعة<br>
واستخدام <span dir="ltr">AI</span> مفهوم وقابل للقياس والتحسين

أنا مهتم بالمساحة اللي بين <span dir="ltr">Business</span> و<span dir="ltr">Product</span> و<span dir="ltr">AI</span> و<span dir="ltr">Engineering</span>، وبإني أقلل الغموض قبل ما يوصل للناس اللي وقتها المفروض يروح للمشاكل التقنية الصعبة

### متاح لإيه وفين؟

**نوع الشغل:** <span dir="ltr">Freelance · Full-time · Part-time</span><br>
**الأسواق:** مصر · السعودية · الإمارات · دول الخليج

**الإيميل:** <a dir="ltr" href="mailto:mamdouhfces1997@gmail.com">mamdouhfces1997@gmail.com</a><br>
**واتساب:** <a href="https://wa.me/201092677269">راسلني مباشرة</a><br>
**لينكدإن:** <a dir="ltr" href="https://www.linkedin.com/in/mamdouh-aboammar/">Mamdouh Aboammar</a><br>
**الموقع:** <a dir="ltr" href="https://mamdouhaboammar.com/">mamdouhaboammar.com</a>

<div align="center">

[↑ English](#english-version)

</div>

</div>

</details>

<br>
'''

prefix, after_team = text.split(team_marker, 1)
_, suffix = after_team.split(public_marker, 1)
text = hero + team + public_marker + suffix

public_heading = '## Public systems'
ph = text.index(public_heading)
table_start = text.index('<table>', ph)
table_end = text.index('</table>', table_start) + len('</table>')
old_table = text[table_start:table_end]
card_blocks = re.findall(r'<td width="50%" valign="top">\n\n(.*?)\n\n</td>', old_table, flags=re.S)
cards = []
for block in card_blocks:
    m = re.search(r'https://github\.com/imMamdouhaboammar/([A-Za-z0-9_.-]+)', block)
    if m:
        cards.append((m.group(1), block))

gold = [
    ('get-fable', 'Get Fable', 'A coding-agent harness built around research, planning, TDD, verification, review, red-teaming, recovery, and persistent context.', ['planning', 'TDD', 'verification']),
    ('agent-kernel', 'Agent Kernel', 'Memory, governance, trust boundaries, and failure lessons for coding agents across multiple hosts.', ['agent_memory', 'governance', 'trust_boundaries']),
    ('riqor', 'Riqor', 'Evidence gates and session continuity for AI coding agents. No evidence, no ship.', ['evidence_gates', 'session_continuity', 'verification']),
    ('delegate-team', 'Delegate Team', 'A CLI for routing bounded coding work across local agents with explicit task ownership and a reviewable shipping chain.', ['multi-agent', 'task_routing', 'CLI']),
    ('dokion', 'Dokion', 'A repository-owned hardening playbook that turns security and quality work into explicit, verifiable steps with rollback paths.', ['hardening', 'evidence', 'rollback']),
    ('unslop-preflight', 'Unslop Preflight', 'Frontend quality gates that challenge generic UI decisions before an agent starts writing the implementation.', ['frontend_QA', 'design_gates', 'preflight']),
    ('Rafiq-Bot', 'Rafiq Bot', 'An open-source multimodal AI companion for Egyptian Arabic with persona synthesis, stateful behavior, tools, and multi-agent orchestration.', ['Egyptian_Arabic', 'multimodal_AI', 'persona_engine']),
    ('pymc-marketing-mcp', 'PyMC Marketing MCP', 'Decision-safe Bayesian marketing science for agents: MMM, diagnostics, CLV, experimentation, budget allocation, provenance, and decision gates.', ['Bayesian_MMM', 'MCP', 'decision_gates']),
    ('whatsapp-ai-supervisor', 'WhatsApp AI Supervisor', 'A model-agnostic AI supervisor and deterministic permission engine for WhatsApp Cloud API.', ['WhatsApp_API', 'permission_engine', 'model_agnostic']),
    ('omni-skill', 'Omni Skill', 'A cross-host skill compiler for ChatGPT, Codex, Claude Code, and Antigravity, built to make one skill definition portable across runtimes.', ['cross_host', 'skill_compiler', 'portable']),
    ('marketing-council-pack', 'Marketing Council Pack', 'A cross-agent marketing strategy pack with specialist skills, challenge gates, and evidence-aware decision workflows.', ['strategy', 'agent_skills', 'evidence_gates']),
    ('designly', 'Designly', 'A commercial art-direction plugin with 21 focused skills, bounded specialist agents, AI image and video direction, and independent visual QA.', ['art_direction', 'AI_video', 'visual_QA']),
    ('linkedin-animated-infographics', 'LinkedIn Animated Infographics', 'A cross-host visual storytelling workflow for animated 1080×1350 infographics with motion craft, RTL support, and visual QA.', ['visual_storytelling', 'motion', 'RTL']),
]

def shield(label):
    encoded = urllib.parse.quote(label.replace(' ', '_'), safe='_+-')
    return f'<img src="https://img.shields.io/badge/{encoded}-0D1117?style=flat-square" alt="{label}">'

def active_card(slug, name, desc, badges):
    badge_html = ' '.join([shield('ACTIVE')] + [shield(x) for x in badges])
    return f'#### [{name}](https://github.com/imMamdouhaboammar/{slug})\n\n{desc}\n\n{badge_html}'

def make_table(blocks):
    rows = []
    for i in range(0, len(blocks), 2):
        left = blocks[i]
        right = blocks[i + 1] if i + 1 < len(blocks) else ''
        right_td = f'<td width="50%" valign="top">\n\n{right}\n\n</td>' if right else '<td width="50%" valign="top"></td>'
        rows.append('<tr>\n<td width="50%" valign="top">\n\n' + left + '\n\n</td>\n' + right_td + '\n</tr>')
    return '<table>\n' + '\n\n'.join(rows) + '\n</table>'

gold_slugs = {slug for slug, _, _, _ in gold}
gold_blocks = [active_card(*item) for item in gold]
rest_blocks = [block for slug, block in cards if slug not in gold_slugs]

how_heading = '## How I work'
how_idx = text.index(how_heading, table_end)
how_suffix = text[how_idx + len(how_heading):]

active_section = '''<div align="center">

<img src="https://img.shields.io/badge/ACTIVE_FOCUS-current_work-DCA820?style=for-the-badge&labelColor=0D1117" alt="Active focus">
<img src="https://img.shields.io/badge/13-repositories-161B22?style=for-the-badge&labelColor=0D1117" alt="13 active repositories">

<br><br>

## Active focus

<sub>These are the repositories getting most of my attention right now. Selected, not exhaustive.</sub>

</div>

'''
active_section += make_table(gold_blocks)
active_section += '''

<br>

<details>
<summary><strong>More public systems</strong> · the rest of the work is still here</summary>

<br>

'''
active_section += make_table(rest_blocks)
active_section += '''

<div align="center">

<br>

[Complete repository catalog](REPOSITORIES.md) · [Browse all repositories](https://github.com/imMamdouhaboammar?tab=repositories)

</div>

</details>

<br>

<div align="center">

## Where I came from

</div>

I came into software from the commercial side: performance marketing, conversion, campaign strategy, and digital leadership across MENA

After years of asking technical teams to build things, I started building and maintaining my own tools so I could understand the other side of those decisions. That is the context behind this profile: not a sudden career costume change, but a deliberate move toward Product Architecture

<details>
<summary><strong>Career path</strong></summary>

<br>

Founder of PrePilot around Arabic conversion work. Digital Director with a background in performance marketing, Meta and Google campaign architecture, and direct-response work across MENA. Earlier work included large-scale event marketing at the Hajj Conference and Exhibition. Today I use public software projects to learn the technical constraints behind Product decisions while continuing to work from the commercial context I already know

</details>

<br>

<div align="center">

## How I work'''

text = text[:text.index(public_marker)] + active_section + how_suffix
text = text.replace('<b>Problem before product</b>', '<b>Problem before build</b>')
text = text.replace('<b>Judgment stays close</b>', '<b>Human judgment stays close</b>')

focus_start = '## Current focus'
focus_end = '\n\n</div>\n\n<br>\n\n<div align="center">\n\n## Activity'
if focus_start in text and focus_end in text:
    before, tail = text.split(focus_start, 1)
    _, after = tail.split(focus_end, 1)
    study = '''## What I'm studying

<img src="https://img.shields.io/badge/Product_Architecture-0D1117?style=flat-square" alt="Product Architecture">
<img src="https://img.shields.io/badge/Technical_Writing-0D1117?style=flat-square" alt="Technical Writing">
<img src="https://img.shields.io/badge/Git_%2B_PRs-0D1117?style=flat-square" alt="Git and PRs">
<img src="https://img.shields.io/badge/Agent_Workflows-0D1117?style=flat-square" alt="Agent Workflows">
<img src="https://img.shields.io/badge/AI_Evaluation-0D1117?style=flat-square" alt="AI Evaluation">
<img src="https://img.shields.io/badge/AI_Search-0D1117?style=flat-square" alt="AI Search">
<img src="https://img.shields.io/badge/MENA_Conversion-0D1117?style=flat-square" alt="MENA Conversion">'''
    text = before + study + focus_end + after

push_start = '<details>\n<summary><b>Pushonomics: Every line has a token tab</b></summary>'
footer_marker = '<div align="center">\n\n<br>\n\n<img src="https://img.shields.io/badge/%24_git_push_origin-taste-A371F7?style=for-the-badge&labelColor=0D1117" alt="git push origin taste">'
if push_start in text and footer_marker in text:
    ps = text.index(push_start)
    fm = text.index(footer_marker, ps)
    push = '''<details>
<summary><b>Pushonomics · what agent-assisted building costs me</b></summary>

<br>

I keep a tab on what agent-assisted building costs, because the bill is part of the engineering decision

<!-- pushonomics:start -->
<p align="center"><img src="https://raw.githubusercontent.com/imMamdouhaboammar/imMamdouhaboammar/main/assets/profile/model-badges.svg" width="410" alt="GPT-5.6 Sol and Claude Fable 5" /></p>
<table>
<tr>
<td width="25%" align="center"><strong>12,445,151</strong><br /><sub>Lines added</sub></td>
<td width="25%" align="center"><strong>2,078,559</strong><br /><sub>Lines deleted</sub></td>
<td width="25%" align="center"><strong>14,523,710</strong><br /><sub>Lines changed</sub></td>
<td width="25%" align="center"><strong>464,758,720</strong><br /><sub>Estimated tokens</sub></td>
</tr>
</table>
<table>
<tr>
<td width="50%" align="center"><strong>GPT-5.6 Sol / Ultra</strong><br />$5,228.54<br /><sub>$5.00/M input · $30.00/M output</sub></td>
<td width="50%" align="center"><strong>Claude Fable 5</strong><br />$9,295.17<br /><sub>$10.00/M input · $50.00/M output</sub></td>
</tr>
</table>
<p align="center"><strong>Estimate model:</strong> 6,077 commits scanned · 283 merges excluded · 348,569,040 input + 116,189,680 output tokens · 8 tokens per changed line · 4x session factor · estimate, not an invoice</p>
<!-- pushonomics:end -->

</details>

'''
    text = text[:ps] + push + text[fm:]

old_footer = '''<sub>
Open to conversations about agent tooling, conversion systems, and MENA market work.<br>
<a href="https://mamdouhaboammar.com/">Site</a> ·
<a href="https://www.linkedin.com/in/mamdouh-aboammar/">LinkedIn</a> ·
<a href="https://x.com/Bo_ammarrr">X</a> ·
<a href="https://www.instagram.com/boammarrr/">Instagram</a>
</sub>'''
new_footer = '''<strong>If you're working somewhere between Product, AI, Business, and Engineering, we probably have something to talk about</strong>

<br>

<sub>Open to Freelance · Full-time · Part-time opportunities across Egypt · Saudi Arabia · UAE · GCC</sub>

<br><br>

<a href="mailto:mamdouhfces1997@gmail.com">Email</a> ·
<a href="https://wa.me/201092677269">WhatsApp</a> ·
<a href="https://mamdouhaboammar.com/">Website</a> ·
<a href="https://www.linkedin.com/in/mamdouh-aboammar/">LinkedIn</a> ·
<a href="https://x.com/Bo_ammarrr">X</a> ·
<a href="https://www.instagram.com/boammarrr/">Instagram</a>'''
if old_footer in text:
    text = text.replace(old_footer, new_footer, 1)

text = text.replace(' — ', ' - ').replace('—', '-')
path.write_text(text)
