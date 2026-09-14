from pathlib import Path

path = Path('README.md')
text = path.read_text()

old_nav = '''<a href="https://mamdouhaboammar.com/"><img src="https://img.shields.io/badge/Website-mamdouhaboammar.com-161B22?style=for-the-badge&logo=safari&logoColor=E6EDF3&labelColor=0D1117" alt="Mamdouh Aboammar website"></a>
<a href="https://www.linkedin.com/in/mamdouh-aboammar/"><img src="https://img.shields.io/badge/LinkedIn-Mamdouh_Aboammar-0A66C2?style=for-the-badge&labelColor=0D1117" alt="Mamdouh Aboammar on LinkedIn"></a>
<a href="REPOSITORIES.md"><img src="https://img.shields.io/badge/Repository_Catalog-142_builds-059669?style=for-the-badge&logo=markdown&logoColor=white&labelColor=0D1117" alt="Complete repository catalog"></a>
<a href="https://immamdouhaboammar.github.io/imMamdouhaboammar/"><img src="https://img.shields.io/badge/Portfolio-Live_Pages-4F46E5?style=for-the-badge&logo=githubpages&logoColor=white&labelColor=0D1117" alt="Live portfolio"></a>'''

new_nav = '''<a href="https://wa.me/201092677269" title="WhatsApp"><img src="https://cdn.simpleicons.org/whatsapp/25D366" width="30" height="30" alt="WhatsApp"></a>&nbsp;&nbsp;
<a href="https://mamdouhaboammar.com/" title="Website"><img src="https://cdn.simpleicons.org/safari/006CFF" width="30" height="30" alt="Website"></a>&nbsp;&nbsp;
<a href="https://www.instagram.com/boammarrr/" title="Instagram"><img src="https://cdn.simpleicons.org/instagram/E4405F" width="30" height="30" alt="Instagram"></a>&nbsp;&nbsp;
<a href="mailto:mamdouhfces1997@gmail.com" title="Email"><img src="https://cdn.simpleicons.org/gmail/EA4335" width="30" height="30" alt="Email"></a>&nbsp;&nbsp;
<a href="https://x.com/Bo_ammarrr" title="X"><img src="https://cdn.simpleicons.org/x/FFFFFF" width="30" height="30" alt="X"></a>&nbsp;&nbsp;
<a href="https://www.facebook.com/mamdouhboammar" title="Facebook"><img src="https://cdn.simpleicons.org/facebook/0866FF" width="30" height="30" alt="Facebook"></a>&nbsp;&nbsp;
<a href="https://www.linkedin.com/in/mamdouh-aboammar/" title="LinkedIn"><img src="https://cdn.simpleicons.org/linkedin/0A66C2" width="30" height="30" alt="LinkedIn"></a>

<br><br>

<a href="REPOSITORIES.md"><img src="https://img.shields.io/badge/Repository_Catalog-142_builds-059669?style=for-the-badge&logo=markdown&logoColor=white&labelColor=0D1117" alt="Complete repository catalog"></a>
<a href="https://immamdouhaboammar.github.io/imMamdouhaboammar/"><img src="https://img.shields.io/badge/Portfolio-Live_Pages-4F46E5?style=for-the-badge&logo=githubpages&logoColor=white&labelColor=0D1117" alt="Live portfolio"></a>'''

if text.count(old_nav) != 1:
    raise SystemExit(f'expected one hero navigation block, found {text.count(old_nav)}')
text = text.replace(old_nav, new_nav, 1)

personality_marker = '<img src="https://img.shields.io/badge/LGTM-Looks_Good_To_Marketing-161B22?style=for-the-badge&labelColor=0D1117" alt="LGTM means Looks Good To Marketing">'
author_badge = personality_marker + '\n<a href="https://app.prepilot-system-agency.space/"><img src="https://img.shields.io/badge/Author_of-PrePilot-DCA820?style=for-the-badge&labelColor=0D1117" alt="Author of PrePilot"></a>'
if text.count(personality_marker) != 1:
    raise SystemExit('personality marker missing or duplicated')
text = text.replace(personality_marker, author_badge, 1)

team_marker = '</div>\n\n<br>\n<div align="center">\n\n## So... what would I actually do on your team?'
prepilot = '''</div>

<br>

<details>
<summary><strong>Author of PrePilot</strong> · 526 marketing workflows for ChatGPT & Claude</summary>

<br>

I co-founded and author [PrePilot](https://app.prepilot-system-agency.space/), a marketing workflow product for agencies, freelancers, and marketing teams that already work inside ChatGPT or Claude

PrePilot gives those tools **526 structured agency workflows** across strategy, paid media, SEO / AEO / GEO, content, ad copy, UGC scripts, landing pages, proposals, decks, reporting, and more

It is built for **Arabic, English, and mixed-language briefs**. The point is not to replace judgment or turn marketing into one-click generation. It gives the model a clearer working structure, then keeps review, editing, and approval with the team

My work around PrePilot spans product direction, workflow design, agent behavior, quality gates, bilingual marketing logic, and the ongoing job of turning real agency work into reusable AI-assisted workflows

[Open PrePilot](https://app.prepilot-system-agency.space/)

</details>

<br>
<div align="center">

## So... what would I actually do on your team?'''
if text.count(team_marker) != 1:
    raise SystemExit('team section marker missing or duplicated')
text = text.replace(team_marker, prepilot, 1)

path.write_text(text)
