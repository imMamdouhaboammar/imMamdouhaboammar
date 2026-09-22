# Meme Marketing for ChatGPT and Codex

A Skills-only portable Agent Plugin for ChatGPT and Codex: recognizable memes, platform-aware captions, original or authorized visual briefs, humor audits, dialect adaptation, content planning and feedback-based Post Tuning.

The source-of-truth creative skill is at .claude/skills/meme-marketing/. The bundled importable Skill at skills/meme-marketing/ is a byte-for-byte mirror of its release files, with ChatGPT/Codex-specific agents/openai.yaml metadata and UI icons kept as package-only additions. The root plugin.json is the current portable Agent Plugins manifest. The optional .codex-plugin/plugin.json is a compatibility fallback for older Codex consumers; when extensions.com.openai is present in root plugin.json it is authoritative.

## Local installation

From this repository root, use the repo marketplace in .agents/plugins/marketplace.json. Add the source to a compatible Codex installation:

    codex plugin marketplace add imMamdouhaboammar/imMamdouhaboammar --ref main

When testing a feature branch, select that branch as the ref instead. In a supported ChatGPT desktop/Work client, open the Plugins Directory, choose the Mamdouh Plugins repo marketplace and install Meme Marketing. Marketplace source availability varies by host. Refresh your marketplace and installed copy after updating source files.

You can also use skills/meme-marketing/ directly in an agent host that imports Agent Skills. Core meme generation needs no login or external MCP server. The package is intentionally Skills-only because the workflow can use host-native tools when available instead of requiring a server.

## Source sync, tests and portable ZIP

At the repository root:

    python3 scripts/meme_plugin.py --sync
    python3 scripts/meme_plugin.py --check
    python3 scripts/meme_plugin.py --package /tmp/meme-marketing-plugin.zip
    python3 -m unittest discover -s tests -p test_meme_plugin.py

Source sync copies only the public Skill instruction files, reference pages, profile template and JSON-output validator. It does not overwrite the plugin manifest, artwork or ChatGPT/Codex metadata. CI checks mirror drift, verifies negative fixtures, builds twice deterministically, and validates a fresh extracted archive.

## Host-specific limits

ChatGPT or Codex can always deliver meme copy and a visual production brief through the Skill. Generating images, live trend research, working with local files and persisting a taste profile depend on the tools available in the current session. This Plugin does not request image-generation permissions, grant host tool access, create accounts, install external services, or imply permanent memory.

Only use original assets, user-supplied licensed images or other authorized material for publication. No original deck artwork or third-party meme images are bundled.

## Public directory status

This repository package is prepared for local testing, not automatically installed or listed in OpenAI's public Plugin Directory. Independent creative tests, publisher identity verification and any required legal and portal fields are separate gates. The documented reviewer cases are proposed scenarios, not results. See submission/REVIEWER.md.
