#!/usr/bin/env python3
"""Build and validate the ChatGPT/Codex mirror of the canonical Meme Marketing Skill.

Requires Python 3.10+ and PyYAML for YAML validation. No network or credentials.
"""
from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path, PurePosixPath

try:
    import yaml
except ImportError:
    raise SystemExit("PyYAML required: python -m pip install 'PyYAML==6.0.3'")

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / ".claude/skills/meme-marketing"
PLUGIN = ROOT / "plugins/meme-marketing"
MIRROR = PLUGIN / "skills/meme-marketing"
VERSION = "2.2.0"


def public_sources() -> dict[str, Path]:
    paths = [SOURCE / "SKILL.md", SOURCE / "assets/taste-profile.json",
             SOURCE / "scripts/validate.py", *sorted((SOURCE / "references").glob("*.md"))]
    missing = [str(p) for p in paths if not p.is_file()]
    if missing:
        raise ValueError("Missing canonical files: " + ", ".join(missing))
    return {p.relative_to(SOURCE).as_posix(): p for p in paths}


def sync(write: bool) -> list[str]:
    expected = public_sources()
    problems = []
    for relative, src in expected.items():
        dst = MIRROR / relative
        if write:
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(src, dst)
        elif not dst.is_file() or src.read_bytes() != dst.read_bytes():
            problems.append("mirror drift: " + relative)
    if not MIRROR.is_dir():
        problems.append("plugin mirror directory missing")
    else:
        allowed_extra = {"agents/openai.yaml", "assets/icon-small.svg", "assets/icon-large.svg"}
        actual = {p.relative_to(MIRROR).as_posix() for p in MIRROR.rglob("*") if p.is_file()}
        extras = actual - set(expected) - allowed_extra
        if extras:
            problems += ["unexpected mirror file: " + path for path in sorted(extras)]
    return problems


def _load_json(path: Path) -> dict:
    obj = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(obj, dict):
        raise ValueError(f"{path}: JSON root must be object")
    return obj


def _yaml(path: Path) -> dict:
    source = path.read_text(encoding="utf-8")
    if re.search(r"(^|\n)\s*!!|\s[&*][A-Za-z0-9_-]+", source):
        raise ValueError(f"{path}: YAML tags and aliases are not allowed")
    doc = yaml.safe_load(source)
    if not isinstance(doc, dict):
        raise ValueError(f"{path}: YAML root must be mapping")
    return doc


def _asset(root: Path, rel: str) -> None:
    if not isinstance(rel, str) or rel != rel.strip() or "\\" in rel or not rel.startswith("./"):
        raise ValueError("Asset path must start ./")
    raw = PurePosixPath(rel[2:])
    if raw.is_absolute() or ".." in raw.parts or not raw.parts:
        raise ValueError("Invalid asset path: " + rel)
    candidate = root.joinpath(*raw.parts)
    if not candidate.is_file() or candidate.is_symlink():
        raise ValueError("Asset missing or symlink: " + rel)
    if candidate.suffix != ".svg":
        raise ValueError("Expected committed SVG asset: " + rel)
    xml = ET.fromstring(candidate.read_text(encoding="utf-8"))
    if not xml.tag.endswith("svg"):
        raise ValueError("Asset must have SVG root")
    box = xml.attrib.get("viewBox", "").split()
    if len(box) != 4 or any(float(n) < 0 for n in box[2:]) or float(box[2]) != float(box[3]) or float(box[2]) == 0:
        raise ValueError("Logo must have square positive viewBox: " + rel)
    for tag in xml.iter():
        if tag.tag.lower().endswith("script") or any("href" in name.lower() for name in tag.attrib):
            raise ValueError("External/script content in SVG: " + rel)


def validate(package: Path, check_marketplace: bool = False) -> list[str]:
    problems: list[str] = []
    try:
        manifest = _load_json(package / "plugin.json")
        if manifest.get("$schema") != "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json":
            problems.append("portable schema missing or incorrect")
        if manifest.get("name") != "meme-marketing" or manifest.get("version") != VERSION:
            problems.append("plugin name/version unexpected")
        if not re.fullmatch(r"[0-9]+\.[0-9]+\.[0-9]+", manifest.get("version", "")):
            problems.append("version is not strict semver")
        author = manifest.get("author", {})
        if not isinstance(author, dict) or not author.get("name"):
            problems.append("author.name missing")
        if any(k in manifest for k in ("skills", "apps", "mcpServers", "hooks")):
            problems.append("portable root contains legacy component declarations")
        ext = manifest.get("extensions", {}).get("com.openai", {})
        interface = ext.get("interface", {})
        if any(k in ext for k in ("apps", "mcpServers", "hooks")):
            problems.append("Skills-only plugin unexpectedly declares app, MCP or hooks")
        if len(interface.get("displayName", "")) > 30 or not interface.get("displayName"):
            problems.append("displayName must be nonempty and <=30 characters")
        if len(interface.get("shortDescription", "")) > 30 or not interface.get("shortDescription"):
            problems.append("shortDescription must be nonempty and <=30 characters")
        if len(interface.get("longDescription", "")) > 4000:
            problems.append("longDescription exceeds 4000 characters")
        if interface.get("category") != "Productivity":
            problems.append("unverified category choice")
        if not interface.get("developerName"):
            problems.append("proposed publisher name missing")
        capabilities = interface.get("capabilities", [])
        if not isinstance(capabilities, list) or len(capabilities) > 20 or any(not isinstance(c, str) or not 0 < len(c) <= 120 for c in capabilities):
            problems.append("invalid capabilities")
        prompts = interface.get("defaultPrompt", [])
        if not isinstance(prompts, list) or not 1 <= len(prompts) <= 3 or any(not isinstance(p, str) or not 0 < len(p) <= 128 or "@" in p for p in prompts) or len(set(prompts)) != len(prompts):
            problems.append("invalid starter prompts")
        for key in ("logo", "composerIcon"):
            _asset(package, interface.get(key))
        for name in ("logo-dark.svg", "logo-light.svg", "icon.svg"):
            _asset(package, "./assets/" + name)
        compat_dir = package / ".codex-plugin"
        files = sorted(p.name for p in compat_dir.iterdir() if p.is_file())
        if files != ["plugin.json"]:
            problems.append("compatibility manifest directory contains unexpected files")
        compat = _load_json(compat_dir / "plugin.json")
        if compat.get("skills") != "./skills" or compat.get("interface") != interface:
            problems.append("compatibility overlay out of sync with portable interface")
        if any((package / bad).exists() for bad in (".mcp.json", ".app.json", "mcp.json")):
            problems.append("Skills-only package contains app/MCP configuration")
        skills_root = package / "skills"
        direct = [p.name for p in skills_root.iterdir()]
        if direct != ["meme-marketing"]:
            problems.append("unexpected top-level Skill entries")
        skill = skills_root / "meme-marketing"
        source = (skill / "SKILL.md").read_text(encoding="utf-8")
        match = re.match(r"(?s)\A---\s*\n(.*?)\n---\s*\n(.+)", source)
        if not match:
            problems.append("SKILL.md frontmatter/body malformed")
        else:
            meta = yaml.safe_load(match.group(1))
            if not isinstance(meta, dict) or meta.get("name") != "meme-marketing" or not isinstance(meta.get("description"), str) or not meta["description"] or len(meta["description"]) > 1024:
                problems.append("SKILL.md discovery metadata invalid")
            if meta.get("metadata", {}).get("version") != "2.2":
                problems.append("source Skill version drift")
            for ref in ("caption-craft.md", "design-spec.md", "format-bank.md", "deck-patterns.md", "humor-mechanics.md", "post-tuning.md", "output-contract.md", "host-compatibility.md"):
                if not (skill / "references" / ref).is_file():
                    problems.append("missing reference: " + ref)
            if not (skill / "scripts/validate.py").is_file():
                problems.append("JSON specification validator missing")
        agent = _yaml(skill / "agents/openai.yaml")
        ai = agent.get("interface", {})
        policy = agent.get("policy", {})
        if not ai.get("display_name") or not ai.get("short_description"):
            problems.append("agent OpenAI interface missing")
        for key in ("icon_small", "icon_large"):
            _asset(skill, ai.get(key))
        if not re.fullmatch(r"#[0-9A-Fa-f]{6}", ai.get("brand_color", "")):
            problems.append("agent brand_color must be a six-digit hex color")
        if not isinstance(ai.get("default_prompt"), str) or not ai["default_prompt"].strip():
            problems.append("agent default_prompt missing")
        if set(policy.get("products", [])) != {"CHAT", "CODEX"} or not isinstance(policy.get("allow_implicit_invocation"), bool):
            problems.append("agent policy must explicitly support CHAT and CODEX")
        if "dependencies" in agent:
            problems.append("Skill should not declare unnecessary MCP dependencies")
        for path in package.rglob("*"):
            if path.is_symlink():
                problems.append("symlink in distributable plugin: " + str(path))
            if path.is_file() and (path.name.startswith(".env") or path.suffix == ".pyc" or path.name in (".DS_Store", "Thumbs.db")):
                problems.append("disallowed package file: " + str(path))
        if check_marketplace:
            catalog = _load_json(ROOT / ".agents/plugins/marketplace.json")
            match_plugins = [p for p in catalog.get("plugins", []) if p.get("name") == "meme-marketing"]
            if len(match_plugins) != 1 or match_plugins[0].get("source", {}).get("path") != "./plugins/meme-marketing":
                problems.append("marketplace source missing or wrong")
    except (OSError, ValueError, KeyError, TypeError, ET.ParseError, yaml.YAMLError) as e:
        problems.append("malformed plugin: " + str(e))
    return problems


def package_zip(archive: Path) -> None:
    archive.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for path in sorted(PLUGIN.rglob("*"), key=lambda p: p.relative_to(PLUGIN).as_posix()):
            if not path.is_file() or path.is_symlink():
                continue
            relative = path.relative_to(PLUGIN)
            if relative.parts[0] == "submission" or path.name in (".DS_Store",) or "__pycache__" in relative.parts:
                continue
            info = zipfile.ZipInfo(relative.as_posix(), (1980, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            z.writestr(info, path.read_bytes(), compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    task = parser.add_mutually_exclusive_group(required=True)
    task.add_argument("--sync", action="store_true")
    task.add_argument("--check", action="store_true")
    task.add_argument("--package", type=Path)
    task.add_argument("--validate-extracted", type=Path)
    args = parser.parse_args()
    try:
        if args.sync:
            sync(write=True)
            errors = validate(PLUGIN, check_marketplace=True) + sync(write=False)
        elif args.validate_extracted is not None:
            errors = validate(args.validate_extracted)
        else:
            errors = validate(PLUGIN, check_marketplace=True) + sync(write=False)
            if not errors and args.package:
                package_zip(args.package)
        if errors:
            for error in errors:
                print("FAIL", error)
            return 1
        print("PASS", "Skills-only portable plugin", VERSION)
        if args.package:
            print("ZIP", args.package)
        return 0
    except (OSError, ValueError) as error:
        print("FAIL", error)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
