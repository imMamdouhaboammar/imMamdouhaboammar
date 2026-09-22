#!/usr/bin/env python3
"""Focused offline security preflight for the public Meme Marketing plugin.

This complements structural validation; it is not a hosted security scan.
"""
from __future__ import annotations

import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

import yaml

PLUGIN = Path(__file__).resolve().parents[1] / "plugins/meme-marketing"
TEXT_SUFFIXES = {".md", ".json", ".yaml", ".yml", ".py", ".txt"}
BLOCKED_NAMES = {".env", "id_rsa", "id_ed25519", "credentials.json", "token.json"}
BLOCKED_SUFFIXES = {".pem", ".p12", ".pfx", ".key", ".pyc"}
SECRET_PATTERNS = {
    "GitHub token": re.compile(rb"(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{50,})"),
    "OpenAI key": re.compile(rb"sk-(?:proj-)?[A-Za-z0-9_-]{35,}"),
    "AWS access key": re.compile(rb"(?:AKIA|ASIA)[A-Z0-9]{16}"),
    "private key": re.compile(rb"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
}


def scan(root: Path = PLUGIN) -> list[str]:
    errors: list[str] = []
    if not root.is_dir():
        return [f"plugin directory missing: {root}"]
    for path in sorted(root.rglob("*")):
        relative = path.relative_to(root).as_posix()
        if path.is_symlink():
            errors.append(f"symbolic link rejected: {relative}")
            continue
        if not path.is_file():
            continue
        if path.name.startswith(".env") or path.name in BLOCKED_NAMES or path.suffix.lower() in BLOCKED_SUFFIXES:
            errors.append(f"credential-shaped file rejected: {relative}")
            continue
        if path.stat().st_size > 5_000_000:
            errors.append(f"unexpected large file: {relative}")
            continue
        if path.suffix.lower() in TEXT_SUFFIXES:
            try:
                data = path.read_bytes()
                data.decode("utf-8")
            except UnicodeError:
                errors.append(f"non-UTF8 instruction or code file: {relative}")
                continue
            for label, pattern in SECRET_PATTERNS.items():
                if pattern.search(data):
                    errors.append(f"possible {label} in {relative}")
        if path.suffix.lower() == ".svg":
            try:
                svg = ET.fromstring(path.read_bytes())
                if svg.tag.rsplit("}", 1)[-1] != "svg":
                    errors.append(f"invalid SVG root: {relative}")
                for element in svg.iter():
                    if element.tag.rsplit("}", 1)[-1].lower() in {"script", "foreignobject"}:
                        errors.append(f"active SVG content: {relative}")
                    if any(key.rsplit("}", 1)[-1].lower() in {"href", "onload", "onclick"} for key in element.attrib):
                        errors.append(f"external or active SVG reference: {relative}")
            except ET.ParseError:
                errors.append(f"malformed SVG: {relative}")
    try:
        manifest = json.loads((root / "plugin.json").read_text(encoding="utf-8"))
        compat = json.loads((root / ".codex-plugin/plugin.json").read_text(encoding="utf-8"))
        agent = yaml.safe_load((root / "skills/meme-marketing/agents/openai.yaml").read_text(encoding="utf-8"))
        if not isinstance(manifest, dict) or not isinstance(compat, dict) or not isinstance(agent, dict):
            errors.append("plugin and agent metadata must be mappings")
            return errors
        ext = manifest.get("extensions", {}).get("com.openai", {})
        if any(k in manifest for k in ("apps", "mcpServers", "hooks")) or any(k in ext for k in ("apps", "mcpServers", "hooks")) or any(k in compat for k in ("apps", "mcpServers", "hooks")):
            errors.append("undeclared integrations or executable hooks prohibited in Skills-only package")
        if set(agent) - {"interface", "policy"} or "dependencies" in agent:
            errors.append("unexpected agent configuration or external tool dependencies")
        if set(agent.get("policy", {}).get("products", [])) != {"CHAT", "CODEX"}:
            errors.append("host policy mismatch")
        allowed_root = {"README.md", "plugin.json", ".codex-plugin", "assets", "skills", "submission"}
        extra = {path.name for path in root.iterdir()} - allowed_root
        if extra:
            errors.append("unexpected plugin-root entries: " + ", ".join(sorted(extra)))
        if any((root / bad).exists() for bad in ("mcp.json", ".mcp.json", ".app.json", "hooks")):
            errors.append("unexpected MCP/app/hooks payload")
    except (OSError, ValueError, TypeError, yaml.YAMLError) as exc:
        errors.append(f"metadata scan failed: {exc}")
    return errors


if __name__ == "__main__":
    findings = scan()
    for finding in findings:
        print("FAIL", finding)
    if findings:
        sys.exit(1)
    print("PASS focused security scan: no credential-shaped files, detected tokens, active SVG, hooks or external dependencies")
