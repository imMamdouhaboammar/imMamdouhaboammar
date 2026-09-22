"""Regression tests for portable ChatGPT/Codex packaging and drift."""
from __future__ import annotations

import importlib.util
import json
import shutil
import tempfile
import unittest
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("meme_plugin", ROOT / "scripts/meme_plugin.py")
mod = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(mod)


class PluginTests(unittest.TestCase):
    def test_mirror_is_exact_and_manifest_valid(self):
        self.assertEqual(mod.sync(write=False), [])
        self.assertEqual(mod.validate(mod.PLUGIN, check_marketplace=True), [])

    def test_deterministic_zip_and_clean_extraction(self):
        with tempfile.TemporaryDirectory() as directory:
            temp = Path(directory)
            left, right = temp / "a.zip", temp / "b.zip"
            mod.package_zip(left)
            mod.package_zip(right)
            self.assertEqual(left.read_bytes(), right.read_bytes())
            with zipfile.ZipFile(left) as archive:
                self.assertIsNone(archive.testzip())
                members = archive.namelist()
                self.assertIn("plugin.json", members)
                self.assertIn("skills/meme-marketing/SKILL.md", members)
                self.assertNotIn("submission/proposed-reviewer-cases.json", members)
                archive.extractall(temp / "unpacked")
            self.assertEqual(mod.validate(temp / "unpacked"), [])

    def test_missing_asset_fails(self):
        with tempfile.TemporaryDirectory() as directory:
            work = Path(directory) / "plugin"
            shutil.copytree(mod.PLUGIN, work)
            (work / "assets/logo-light.svg").unlink()
            self.assertTrue(any("malformed plugin" in p for p in mod.validate(work)))

    def test_undeclared_mcp_is_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            work = Path(directory) / "plugin"
            shutil.copytree(mod.PLUGIN, work)
            (work / "mcp.json").write_text("{}")
            self.assertTrue(any("app/MCP" in p for p in mod.validate(work)))

    def test_wrong_agents_product_policy_fails(self):
        with tempfile.TemporaryDirectory() as directory:
            work = Path(directory) / "plugin"
            shutil.copytree(mod.PLUGIN, work)
            agent = work / "skills/meme-marketing/agents/openai.yaml"
            agent.write_text(agent.read_text().replace("    - CODEX", ""), encoding="utf-8")
            self.assertTrue(any("CHAT and CODEX" in p for p in mod.validate(work)))

    def test_not_shipped_with_source_deck_or_private_user_material(self):
        for path in mod.PLUGIN.rglob("*"):
            self.assertNotIn(path.suffix.lower(), (".pptx", ".pdf", ".key", ".env"))

    def test_reviewer_case_counts_are_plans_not_evidence(self):
        review = json.loads((mod.PLUGIN / "submission/proposed-reviewer-cases.json").read_text(encoding="utf-8"))
        self.assertEqual(review["status"], "PROPOSED_NOT_EXECUTED")
        self.assertEqual(len(review["positive"]), 5)
        self.assertEqual(len(review["negative"]), 3)


if __name__ == "__main__":
    unittest.main()
