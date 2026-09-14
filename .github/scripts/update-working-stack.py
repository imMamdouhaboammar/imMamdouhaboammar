from pathlib import Path

path = Path('README.md')
text = path.read_text(encoding='utf-8')
start_marker = '## Working with\n'
end_marker = '\n<br><br>\n\n## What I\'m studying'
start = text.index(start_marker)
end = text.index(end_marker, start)

new_block = '''## Working with & learning

<sub>Some I use daily. Some I'm actively learning deeper through current builds</sub>

<br>

<sub>AGENTS, MODELS & PROTOCOLS</sub>

<img src="https://img.shields.io/badge/ChatGPT-161B22?style=for-the-badge&logo=openai&logoColor=E6EDF3&labelColor=0D1117" alt="ChatGPT">
<img src="https://img.shields.io/badge/Claude-161B22?style=for-the-badge&logo=claude&logoColor=D97757&labelColor=0D1117" alt="Claude">
<img src="https://img.shields.io/badge/Claude_Code-161B22?style=for-the-badge&logo=anthropic&logoColor=D97757&labelColor=0D1117" alt="Claude Code">
<img src="https://img.shields.io/badge/Codex-161B22?style=for-the-badge&labelColor=0D1117" alt="Codex">
<img src="https://img.shields.io/badge/Gemini-161B22?style=for-the-badge&logo=googlegemini&logoColor=8E75B2&labelColor=0D1117" alt="Gemini">
<img src="https://img.shields.io/badge/MCP-161B22?style=for-the-badge&logo=modelcontextprotocol&logoColor=E6EDF3&labelColor=0D1117" alt="Model Context Protocol">
<img src="https://img.shields.io/badge/Agent_Skills-161B22?style=for-the-badge&labelColor=0D1117" alt="Agent Skills">
<img src="https://img.shields.io/badge/Cursor-161B22?style=for-the-badge&logo=cursor&logoColor=E6EDF3&labelColor=0D1117" alt="Cursor">
<img src="https://img.shields.io/badge/GitHub_Copilot-161B22?style=for-the-badge&logo=githubcopilot&logoColor=E6EDF3&labelColor=0D1117" alt="GitHub Copilot">
<img src="https://img.shields.io/badge/OpenAI_API-161B22?style=for-the-badge&logo=openai&logoColor=E6EDF3&labelColor=0D1117" alt="OpenAI API">
<img src="https://img.shields.io/badge/Anthropic_API-161B22?style=for-the-badge&labelColor=0D1117" alt="Anthropic API">

<br>

<sub>FRONTEND & PRODUCT UI</sub>

<img src="https://img.shields.io/badge/React-161B22?style=for-the-badge&logo=react&logoColor=61DAFB&labelColor=0D1117" alt="React">
<img src="https://img.shields.io/badge/Next.js-161B22?style=for-the-badge&logo=nextdotjs&logoColor=E6EDF3&labelColor=0D1117" alt="Next.js">
<img src="https://img.shields.io/badge/Vite-161B22?style=for-the-badge&logo=vite&logoColor=646CFF&labelColor=0D1117" alt="Vite">
<img src="https://img.shields.io/badge/Tailwind_CSS-161B22?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4&labelColor=0D1117" alt="Tailwind CSS">
<img src="https://img.shields.io/badge/shadcn%2Fui-161B22?style=for-the-badge&logo=shadcnui&logoColor=E6EDF3&labelColor=0D1117" alt="shadcn/ui">
<img src="https://img.shields.io/badge/Zustand-161B22?style=for-the-badge&labelColor=0D1117" alt="Zustand">
<img src="https://img.shields.io/badge/Astro-161B22?style=for-the-badge&logo=astro&logoColor=BC52EE&labelColor=0D1117" alt="Astro">

<br>

<sub>BACKEND & API</sub>

<img src="https://img.shields.io/badge/Bun-161B22?style=for-the-badge&logo=bun&logoColor=FBF0DF&labelColor=0D1117" alt="Bun">
<img src="https://img.shields.io/badge/Node.js-161B22?style=for-the-badge&logo=nodedotjs&logoColor=5FA04E&labelColor=0D1117" alt="Node.js">
<img src="https://img.shields.io/badge/Python-161B22?style=for-the-badge&logo=python&logoColor=3776AB&labelColor=0D1117" alt="Python">
<img src="https://img.shields.io/badge/FastAPI-161B22?style=for-the-badge&logo=fastapi&logoColor=009688&labelColor=0D1117" alt="FastAPI">
<img src="https://img.shields.io/badge/TypeScript-161B22?style=for-the-badge&logo=typescript&logoColor=3178C6&labelColor=0D1117" alt="TypeScript">
<img src="https://img.shields.io/badge/JavaScript-161B22?style=for-the-badge&logo=javascript&logoColor=F7DF1E&labelColor=0D1117" alt="JavaScript">
<img src="https://img.shields.io/badge/REST_APIs-161B22?style=for-the-badge&labelColor=0D1117" alt="REST APIs">
<img src="https://img.shields.io/badge/Serverless-161B22?style=for-the-badge&labelColor=0D1117" alt="Serverless">
<img src="https://img.shields.io/badge/Zod-161B22?style=for-the-badge&logo=zod&logoColor=3E67B1&labelColor=0D1117" alt="Zod">
<img src="https://img.shields.io/badge/Pydantic-161B22?style=for-the-badge&labelColor=0D1117" alt="Pydantic">

<br>

<sub>DATA, AUTH & STORAGE</sub>

<img src="https://img.shields.io/badge/Supabase-161B22?style=for-the-badge&logo=supabase&logoColor=3FCF8E&labelColor=0D1117" alt="Supabase">
<img src="https://img.shields.io/badge/PostgreSQL-161B22?style=for-the-badge&logo=postgresql&logoColor=4169E1&labelColor=0D1117" alt="PostgreSQL">
<img src="https://img.shields.io/badge/Prisma-161B22?style=for-the-badge&logo=prisma&logoColor=E6EDF3&labelColor=0D1117" alt="Prisma">
<img src="https://img.shields.io/badge/SQL-161B22?style=for-the-badge&labelColor=0D1117" alt="SQL">
<img src="https://img.shields.io/badge/RLS-161B22?style=for-the-badge&labelColor=0D1117" alt="Row Level Security">
<img src="https://img.shields.io/badge/IndexedDB-161B22?style=for-the-badge&labelColor=0D1117" alt="IndexedDB">
<img src="https://img.shields.io/badge/Dexie.js-161B22?style=for-the-badge&labelColor=0D1117" alt="Dexie.js">

<br>

<sub>TESTING & QUALITY</sub>

<img src="https://img.shields.io/badge/Vitest-161B22?style=for-the-badge&logo=vitest&logoColor=6E9F18&labelColor=0D1117" alt="Vitest">
<img src="https://img.shields.io/badge/Playwright-161B22?style=for-the-badge&labelColor=0D1117" alt="Playwright">
<img src="https://img.shields.io/badge/React_Testing_Library-161B22?style=for-the-badge&logo=testinglibrary&logoColor=E33332&labelColor=0D1117" alt="React Testing Library">
<img src="https://img.shields.io/badge/Pytest-161B22?style=for-the-badge&logo=pytest&logoColor=0A9EDC&labelColor=0D1117" alt="Pytest">
<img src="https://img.shields.io/badge/axe-161B22?style=for-the-badge&labelColor=0D1117" alt="axe accessibility testing">
<img src="https://img.shields.io/badge/ESLint-161B22?style=for-the-badge&logo=eslint&logoColor=4B32C3&labelColor=0D1117" alt="ESLint">
<img src="https://img.shields.io/badge/Type_Checking-161B22?style=for-the-badge&logo=typescript&logoColor=3178C6&labelColor=0D1117" alt="Type checking">
<img src="https://img.shields.io/badge/TDD-161B22?style=for-the-badge&labelColor=0D1117" alt="Test Driven Development">

<br>

<sub>AUTOMATION & DELIVERY</sub>

<img src="https://img.shields.io/badge/Git-161B22?style=for-the-badge&logo=git&logoColor=F05032&labelColor=0D1117" alt="Git">
<img src="https://img.shields.io/badge/GitHub-161B22?style=for-the-badge&logo=github&logoColor=E6EDF3&labelColor=0D1117" alt="GitHub">
<img src="https://img.shields.io/badge/GitHub_Actions-161B22?style=for-the-badge&logo=githubactions&logoColor=2088FF&labelColor=0D1117" alt="GitHub Actions">
<img src="https://img.shields.io/badge/n8n-161B22?style=for-the-badge&logo=n8n&logoColor=EA4B71&labelColor=0D1117" alt="n8n">
<img src="https://img.shields.io/badge/Docker-161B22?style=for-the-badge&logo=docker&logoColor=2496ED&labelColor=0D1117" alt="Docker">
<img src="https://img.shields.io/badge/Vercel-161B22?style=for-the-badge&logo=vercel&logoColor=E6EDF3&labelColor=0D1117" alt="Vercel">
<img src="https://img.shields.io/badge/CI%2FCD-161B22?style=for-the-badge&labelColor=0D1117" alt="CI/CD">
<img src="https://img.shields.io/badge/VS_Code-161B22?style=for-the-badge&labelColor=0D1117" alt="VS Code">

<br>

<sub>MARKETING & MEASUREMENT</sub>

<img src="https://img.shields.io/badge/Agentic_Marketing-161B22?style=for-the-badge&labelColor=0D1117" alt="Agentic Marketing">
<img src="https://img.shields.io/badge/PyMC-161B22?style=for-the-badge&labelColor=0D1117" alt="PyMC">
<img src="https://img.shields.io/badge/Meta_Ads-161B22?style=for-the-badge&logo=meta&logoColor=0866FF&labelColor=0D1117" alt="Meta Ads">
<img src="https://img.shields.io/badge/Google_Ads-161B22?style=for-the-badge&logo=googleads&logoColor=4285F4&labelColor=0D1117" alt="Google Ads">
<img src="https://img.shields.io/badge/GA4-161B22?style=for-the-badge&logo=googleanalytics&logoColor=E37400&labelColor=0D1117" alt="Google Analytics 4">
<img src="https://img.shields.io/badge/Google_Tag_Manager-161B22?style=for-the-badge&logo=googletagmanager&logoColor=246FDB&labelColor=0D1117" alt="Google Tag Manager">
<img src="https://img.shields.io/badge/Search_Console-161B22?style=for-the-badge&logo=googlesearchconsole&logoColor=458CF5&labelColor=0D1117" alt="Google Search Console">
<img src="https://img.shields.io/badge/AEO_%2F_GEO-161B22?style=for-the-badge&labelColor=0D1117" alt="AEO and GEO">
'''

path.write_text(text[:start] + new_block + text[end:], encoding='utf-8')
