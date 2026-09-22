"""Security regressions for the portable Skills-only meme plugin."""
from __future__ import annotations

import importlib.util
import json
import shutil
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("meme_security", ROOT / "scripts/check_meme_plugin_security.py")
mod = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(mod)


class PackageSecurityTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.plugin = Path(self.tmp.name) / "plugin"
        shutil.copytree(mod.PLUGIN, self.plugin)

    def test_current_package_has_no_focused_findings(self):
        self.assertEqual(mod.scan(self.plugin), [])

    def test_secret_filename_rejected(self):
        (self.plugin / ".env.production").write_text("DUMMY=1")
        self.assertTrue(any("credential-shaped file" in x for x in mod.scan(self.plugin)))

    def test_embedded_token_rejected(self):
        (self.plugin / "README.md").write_text("Example: ghp_" + "A" * 36)
        self.assertTrue(any("possible GitHub token" in x for x in mod.scan(self.plugin)))

    def test_external_agent_dependency_rejected(self):
        agent = self.plugin / "skills/meme-marketing/agents/openai.yaml"
        agent.write_text(agent.read_text() + "\ndependencies:\n  tools:\n    - type: mcp\n      value: unknown\n")
        self.assertTrue(any("external tool dependencies" in x for x in mod.scan(self.plugin)))

    def test_mcp_configuration_rejected(self):
        (self.plugin / ".mcp.json").write_text('{"mcpServers":{}}')
        self.assertTrue(any("MCP/app/hooks" in x for x in mod.scan(self.plugin)))

    def test_active_svg_rejected(self):
        logo = self.plugin / "assets/icon.svg"
        logo.write_text('<svg xmlns="http://www.w3.org/2000/svg"><script>0</script></svg>')
        self.assertTrue(any("active SVG" in x for x in mod.scan(self.plugin)))

    def test_symlink_rejected(self):
        (self.plugin / "linked").symlink_to(self.plugin / "README.md")
        self.assertTrue(any("symbolic link" in x for x in mod.scan(self.plugin)))


if __name__ == "__main__":
    unittest.main()
