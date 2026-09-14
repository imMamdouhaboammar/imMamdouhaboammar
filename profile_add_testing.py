from pathlib import Path

path = Path('README.md')
text = path.read_text()

english_anchor = '''**Issue discovery and bounded PRs**<br>
Reproduce problems, gather evidence, narrow scope, write useful issues, and take small changes as far as a reviewable PR when they are inside my technical range. Engineering keeps the final judgment

**AI-assisted workflows and agentic tooling**<br>'''
english_replacement = '''**Issue discovery and bounded PRs**<br>
Reproduce problems, gather evidence, narrow scope, write useful issues, and take small changes as far as a reviewable PR when they are inside my technical range. Engineering keeps the final judgment

**Test design, user journeys, and acceptance scenarios**<br>
Translate product intent into user stories, user journeys, acceptance scenarios, test suites, and test cases that cover expected behavior, edge cases, regressions, and failure paths. The goal is to give the team a clearer definition of what should be proven before we call something done

**AI-assisted workflows and agentic tooling**<br>'''

arabic_anchor = '''**اكتشاف الـ<span dir="ltr">Issues</span> والـ<span dir="ltr">PRs</span> الصغيرة**<br>
أعمل <span dir="ltr">reproduction</span> للمشكلة، أجمع دليل، أحدد الـ<span dir="ltr">scope</span>، وأكتب <span dir="ltr">Issue</span> مفهومة. ولو التغيير محدود وفي حدود اللي أقدر أتحقق منه، أوصله لـ<span dir="ltr">PR</span> صغيرة للمراجعة والقرار النهائي يفضل عند الفريق التقني

**شغل الـ<span dir="ltr">AI</span> والـ<span dir="ltr">Agentic Workflows</span>**<br>'''
arabic_replacement = '''**اكتشاف الـ<span dir="ltr">Issues</span> والـ<span dir="ltr">PRs</span> الصغيرة**<br>
أعمل <span dir="ltr">reproduction</span> للمشكلة، أجمع دليل، أحدد الـ<span dir="ltr">scope</span>، وأكتب <span dir="ltr">Issue</span> مفهومة. ولو التغيير محدود وفي حدود اللي أقدر أتحقق منه، أوصله لـ<span dir="ltr">PR</span> صغيرة للمراجعة والقرار النهائي يفضل عند الفريق التقني

**تصميم الـ<span dir="ltr">Tests</span> ومسارات المستخدم وسيناريوهات القبول**<br>
أحول المطلوب من المنتج إلى <span dir="ltr">user stories</span> و<span dir="ltr">user journeys</span> و<span dir="ltr">acceptance scenarios</span> و<span dir="ltr">test suites</span> و<span dir="ltr">test cases</span> تغطي السلوك المتوقع والـ<span dir="ltr">edge cases</span> والـ<span dir="ltr">regressions</span> وحالات الفشل، بحيث يبقى عند الفريق تعريف أوضح لإيه اللي لازم يثبت قبل ما نقول إن الحاجة خلصت

**شغل الـ<span dir="ltr">AI</span> والـ<span dir="ltr">Agentic Workflows</span>**<br>'''

if text.count(english_anchor) != 1:
    raise SystemExit(f'English insertion anchor count: {text.count(english_anchor)}')
if text.count(arabic_anchor) != 1:
    raise SystemExit(f'Arabic insertion anchor count: {text.count(arabic_anchor)}')

text = text.replace(english_anchor, english_replacement, 1)
text = text.replace(arabic_anchor, arabic_replacement, 1)
path.write_text(text)
