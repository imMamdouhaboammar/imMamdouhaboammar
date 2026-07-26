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

function shield(label, value, color, logo = '') {
  const encodedLabel = encodeURIComponent(label).replaceAll('-', '--');
  const encodedValue = encodeURIComponent(String(value)).replaceAll('-', '--');
  const logoQuery = logo ? `&logo=${encodeURIComponent(logo)}&logoColor=white` : '';
  return `https://img.shields.io/badge/${encodedLabel}-${encodedValue}-${color}?style=for-the-badge${logoQuery}`;
}

export function renderProjectBlock({ project, bullets, updatedAt, source }) {
  const keywords = (project.keywords || []).map(escapeHtml).join(' · ');
  const bulletHtml = bullets.map((bullet) => `      <li>${escapeHtml(bullet)}</li>`).join('\n');
  const logo = escapeHtml(project.logo);
  const name = escapeHtml(project.name);

  return `<details open>
  <summary><strong>🧭 Problem → project: Why I built ${name}</strong></summary>
  <br />
  <div align="center">
    <img src="${shield('BUILT FROM', 'REAL FRICTION', 'F97316')}" alt="Built from real friction" />
    <img src="${shield('STATUS', 'BUILDING IN PUBLIC', '7C3AED', 'github')}" alt="Building in public" />
    <img src="${shield('UPDATE', 'DAILY PULSE', '16A34A')}" alt="Daily public activity pulse" />
  </div>
  <br />
  <table>
    <tr>
      <td width="116" align="center" valign="middle">
        <img src="${logo}" width="88" alt="${name} repository mark" />
      </td>
      <td valign="top">
        <h3>${name}, in one answer</h3>
        <p>${escapeHtml(project.description || project.goal)}</p>
      </td>
    </tr>
  </table>
  <table>
    <tr>
      <td width="50%" valign="top">
        <strong>🔴 The recurring problem</strong><br />
        ${escapeHtml(project.problem)}
      </td>
      <td width="50%" valign="top">
        <strong>🟢 The practical goal</strong><br />
        ${escapeHtml(project.goal)}
      </td>
    </tr>
    <tr>
      <td width="50%" valign="top">
        <strong>👥 Built for</strong><br />
        ${escapeHtml(project.audience)}
      </td>
      <td width="50%" valign="top">
        <strong>🔎 Search map</strong><br />
        ${keywords}
      </td>
    </tr>
  </table>
  <blockquote><strong>⚡ Daily build pulse</strong></blockquote>
  <ul>
${bulletHtml}
  </ul>
  <p align="right"><sub>Updated ${escapeHtml(updatedAt)} · ${source === 'openai' ? 'AI-assisted public summary with deterministic fallback' : 'Deterministic public-activity summary'}</sub></p>
</details>`;
}

export function renderProfileMetricsBlock({ commits, currentStreak, longestStreak, yearContributions, updatedAt }) {
  return `<div align="center">
  <p>
    <img src="${shield('COMMITS', formatNumber(commits), '7C3AED', 'git')}" alt="${formatNumber(commits)} total commit contributions" />
    <img src="${shield('CURRENT STREAK', `${formatNumber(currentStreak)} DAYS`, '16A34A', 'github')}" alt="${formatNumber(currentStreak)} day current activity streak" />
    <img src="${shield('LONGEST STREAK', `${formatNumber(longestStreak)} DAYS`, 'F97316')}" alt="${formatNumber(longestStreak)} day longest activity streak" />
    <img src="${shield('THIS YEAR', formatNumber(yearContributions), '2563EB')}" alt="${formatNumber(yearContributions)} contributions this year" />
  </p>
  <table>
    <tr>
      <td align="center" width="25%"><strong>🧱 ${formatNumber(commits)}</strong><br /><sub>Commit contributions</sub></td>
      <td align="center" width="25%"><strong>🔥 ${formatNumber(currentStreak)} days</strong><br /><sub>Current streak</sub></td>
      <td align="center" width="25%"><strong>🏆 ${formatNumber(longestStreak)} days</strong><br /><sub>Longest streak</sub></td>
      <td align="center" width="25%"><strong>📈 ${formatNumber(yearContributions)}</strong><br /><sub>Contributions this year</sub></td>
    </tr>
  </table>
  <sub>Public and token-visible private activity · private repository names stay private · updated ${escapeHtml(updatedAt)}</sub>
</div>

<details>
  <summary><strong>📐 How the activity numbers are calculated</strong></summary>
  <p>Commit totals use GitHub-recognized commit contributions across yearly contribution windows. Streaks use days containing at least one commit, pull request, issue, or pull-request review. A streak remains current when the latest active day is today or yesterday.</p>
</details>`;
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
  updatedAt,
}) {
  const sol = models['GPT-5.6 Sol'];
  const fable = models['Claude Fable 5'];

  return `<details open>
  <summary><strong>🪙 Pushonomics: Every line has a token tab</strong></summary>
  <br />
  <div align="center">
    <p>
      <img src="${shield('LINES PUSHED', formatNumber(changedLines), 'F97316', 'git')}" alt="${formatNumber(changedLines)} estimated changed lines" />
      <img src="${shield('TOKEN EQUIVALENT', formatNumber(estimatedSessionTokens), '7C3AED')}" alt="${formatNumber(estimatedSessionTokens)} estimated session tokens" />
      <img src="${shield('COMMITS SCANNED', formatNumber(commitsScanned), '2563EB', 'github')}" alt="${formatNumber(commitsScanned)} non-merge commits scanned" />
    </p>
  </div>
  <table>
    <tr>
      <td width="33%" align="center"><strong>➕ ${formatNumber(additions)}</strong><br /><sub>Lines added</sub></td>
      <td width="33%" align="center"><strong>➖ ${formatNumber(deletions)}</strong><br /><sub>Lines deleted</sub></td>
      <td width="34%" align="center"><strong>🧮 ${formatNumber(changedLines)}</strong><br /><sub>Total lines changed</sub></td>
    </tr>
  </table>
  <table>
    <tr>
      <td width="50%" valign="top">
        <strong>☀️ GPT-5.6 Sol scenario</strong><br />
        Estimated tab: <strong>${formatUsd(sol?.estimatedCostUsd)}</strong><br />
        <sub>${formatUsd(sol?.inputUsdPerMillion)}/M input · ${formatUsd(sol?.outputUsdPerMillion)}/M output</sub>
      </td>
      <td width="50%" valign="top">
        <strong>📖 Claude Fable 5 scenario</strong><br />
        Estimated tab: <strong>${formatUsd(fable?.estimatedCostUsd)}</strong><br />
        <sub>${formatUsd(fable?.inputUsdPerMillion)}/M input · ${formatUsd(fable?.outputUsdPerMillion)}/M output</sub>
      </td>
    </tr>
  </table>
  <blockquote>
    <strong>Code has calories. This is the nutrition label.</strong><br />
    The estimate treats each changed line as ${escapeHtml(tokensPerChangedLine)} visible output tokens, then applies a ${escapeHtml(sessionMultiplier)}× session multiplier for prompts, repository context, tool calls, and reasoning. That produces roughly ${formatNumber(estimatedInputTokens)} input tokens and ${formatNumber(estimatedOutputTokens)} output tokens.
  </blockquote>
  <p><sub>This is an estimate, not an invoice. It counts additions plus deletions from ${formatNumber(commitsScanned)} authored, searchable, non-merge commits. ${formatNumber(mergesExcluded)} merge commits were excluded to reduce double counting. Actual product usage, caching, hidden reasoning, retries, subscription allowances, and provider routing can change the real cost substantially. Updated ${escapeHtml(updatedAt)}.</sub></p>
</details>`;
}
