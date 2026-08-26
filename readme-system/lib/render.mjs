function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(Number(value || 0));
}

function formatUsd(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

/** Encode a value for use inside a shields.io badge URL label or message. */
function shieldEncode(str) {
  return String(str)
    .replace(/-/g, '--')
    .replace(/_/g, '__')
    .replace(/ /g, '_');
}

/** Build a shields.io static badge img tag.
 *  label   — left side (dark)
 *  message — right side (colored)
 *  color   — hex or named color for the right side
 *  logo    — optional shields.io logo name (simple-icons slug)
 */
function badge({ label, message, color = '0D1117', labelColor = '0D1117', style = 'flat-square', logo = '' }) {
  const l = shieldEncode(label);
  const m = shieldEncode(message);
  const logoParam = logo ? `&logo=${encodeURIComponent(logo)}&logoColor=white` : '';
  const src = `https://img.shields.io/badge/${encodeURIComponent(l)}-${encodeURIComponent(m)}-${color}?style=${style}&labelColor=${labelColor}${logoParam}`;
  return `<img src="${src}" alt="${escapeHtml(label)}: ${escapeHtml(message)}">`;
}

const PROJECT_BADGES = 'https://raw.githubusercontent.com/imMamdouhaboammar/imMamdouhaboammar/main/assets/profile/project-badges.svg';
const MODEL_BADGES = 'https://raw.githubusercontent.com/imMamdouhaboammar/imMamdouhaboammar/main/assets/profile/model-badges.svg';

export function renderProjectBlock({ project, bullets }) {
  const keywords = (project.keywords || []).map(escapeHtml).join(' · ');
  const bulletHtml = bullets.map((bullet) => `      <li>${escapeHtml(bullet)}</li>`).join('\n');
  const logo = escapeHtml(project.logo);
  const name = escapeHtml(project.name);

  return `<details open>
  <summary><strong>Problem to project: Why I built ${name}</strong></summary>
  <br />
  <p align="center"><img src="${PROJECT_BADGES}" width="488" alt="Real friction, building in public, daily pulse" /></p>
  <table>
    <tr>
      <td width="104" align="center" valign="middle"><img src="${logo}" width="76" alt="${name} repository mark" /></td>
      <td valign="middle"><strong>${name}</strong><br />${escapeHtml(project.description || project.goal)}</td>
    </tr>
  </table>
  <table>
    <tr>
      <td width="50%" valign="top"><strong>Recurring problem</strong><br />${escapeHtml(project.problem)}</td>
      <td width="50%" valign="top"><strong>Practical goal</strong><br />${escapeHtml(project.goal)}</td>
    </tr>
    <tr>
      <td width="50%" valign="top"><strong>Built for</strong><br />${escapeHtml(project.audience)}</td>
      <td width="50%" valign="top"><strong>Search terms</strong><br />${keywords}</td>
    </tr>
  </table>
  <p><strong>Daily build pulse</strong></p>
  <ul>
${bulletHtml}
  </ul>
</details>`;
}

export function renderProfileMetricsBlock({ commits, currentStreak, longestStreak, yearContributions }) {
  return `<div align="center">
  <table>
    <tr>
      <td align="center" width="25%"><strong>${formatNumber(commits)}</strong><br /><sub>Commit contributions</sub></td>
      <td align="center" width="25%"><strong>${formatNumber(currentStreak)} days</strong><br /><sub>Current streak</sub></td>
      <td align="center" width="25%"><strong>${formatNumber(longestStreak)} days</strong><br /><sub>Longest streak</sub></td>
      <td align="center" width="25%"><strong>${formatNumber(yearContributions)}</strong><br /><sub>Contributions this year</sub></td>
    </tr>
  </table>
</div>`;
}

export function renderPushonomicsBlock({
  additions,
  deletions,
  changedLines,
  estimatedInputTokens,
  estimatedOutputTokens,
  estimatedSessionTokens,
  tokensPerChangedLine,
  sessionMultiplier,
  models,
  commitsScanned,
  mergesExcluded,
}) {
  const sol = models['GPT-5.6 Sol'];
  const fable = models['Claude Fable 5'];

  // ── metric rows ────────────────────────────────────────────────────────────
  const rows = [
    { icon: '📦', label: 'commits scanned',   value: formatNumber(commitsScanned),          color: '3FB950' },
    { icon: '⛔', label: 'merges excluded',    value: formatNumber(mergesExcluded),          color: '6E7681' },
    { icon: '➕', label: 'lines added',        value: formatNumber(additions),               color: '58A6FF' },
    { icon: '➖', label: 'lines deleted',      value: formatNumber(deletions),               color: 'F85149' },
    { icon: '🔀', label: 'lines changed',      value: formatNumber(changedLines),            color: 'A371F7' },
    { icon: '🪙', label: 'estimated tokens',   value: formatNumber(estimatedSessionTokens),  color: 'E3B341' },
  ];

  const badgeRows = rows.map(({ icon, label, value, color }) => {
    const b = badge({ label, message: value, color, labelColor: '161B22', style: 'flat-square' });
    return `    <td align="center" valign="top" width="16%">${icon}<br />${b}<br /><sub>${escapeHtml(label)}</sub></td>`;
  }).join('\n');

  // ── per-model cost cards ───────────────────────────────────────────────────
  const solCost   = badge({ label: 'GPT-5.6 Sol',    message: formatUsd(sol?.estimatedCostUsd),   color: 'E3B341', labelColor: '161B22', style: 'flat-square' });
  const fableCost = badge({ label: 'Claude Fable 5', message: formatUsd(fable?.estimatedCostUsd), color: 'E06C75', labelColor: '161B22', style: 'flat-square' });
  const solRate    = `<sub>${formatUsd(sol?.inputUsdPerMillion)}/M in · ${formatUsd(sol?.outputUsdPerMillion)}/M out</sub>`;
  const fableRate  = `<sub>${formatUsd(fable?.inputUsdPerMillion)}/M in · ${formatUsd(fable?.outputUsdPerMillion)}/M out</sub>`;

  // ── estimate footnote ──────────────────────────────────────────────────────
  const footnote = [
    `${formatNumber(commitsScanned)} commits`,
    `${formatNumber(estimatedInputTokens)} input + ${formatNumber(estimatedOutputTokens)} output tokens`,
    `${escapeHtml(String(tokensPerChangedLine))} tok/line`,
    `${escapeHtml(String(sessionMultiplier))}× session factor`,
    `${formatNumber(mergesExcluded)} merges excluded`,
    `estimate — not an invoice`,
  ].join(' · ');

  return `<details open>
  <summary><strong>Build log and token cost</strong></summary>
  <br />
  <p align="center"><img src="${MODEL_BADGES}" width="410" alt="GPT-5.6 Sol and Claude Fable 5" /></p>
  <p><sub>I keep a tab on what agent-assisted building costs, because the bill is part of the engineering decision.</sub></p>

  <table>
    <tr>
${badgeRows}
    </tr>
  </table>

  <br />

  <table>
    <tr>
      <td width="50%" align="center">
        🤖 ${solCost}<br />
        ${solRate}
      </td>
      <td width="50%" align="center">
        🧠 ${fableCost}<br />
        ${fableRate}
      </td>
    </tr>
  </table>

  <br />

  <p align="center"><code>${footnote}</code></p>
</details>`;
}
