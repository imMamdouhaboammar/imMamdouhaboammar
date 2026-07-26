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
      <td valign="top"><h3>${name}, in one answer</h3><p>${escapeHtml(project.description || project.goal)}</p></td>
    </tr>
  </table>
  <table>
    <tr>
      <td width="50%" valign="top"><strong>🔴 The recurring problem</strong><br />${escapeHtml(project.problem)}</td>
      <td width="50%" valign="top"><strong>🟢 The practical goal</strong><br />${escapeHtml(project.goal)}</td>
    </tr>
    <tr>
      <td width="50%" valign="top"><strong>👥 Built for</strong><br />${escapeHtml(project.audience)}</td>
      <td width="50%" valign="top"><strong>🔎 Search map</strong><br />${keywords}</td>
    </tr>
  </table>
  <blockquote><strong>⚡ Daily build pulse</strong></blockquote>
  <ul>
${bulletHtml}
  </ul>
  <p align="right"><sub>Updated ${escapeHtml(updatedAt)} · ${source === 'openai' ? 'AI-assisted public summary' : 'Deterministic public summary'}</sub></p>
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
  <sub>Public + private aggregate · updated ${escapeHtml(updatedAt)}</sub>
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
      <td width="50%" align="center"><strong>☀️ GPT-5.6 Sol · Ultra effort</strong><br /><strong>${formatUsd(sol?.estimatedCostUsd)}</strong><br /><sub>${formatUsd(sol?.inputUsdPerMillion)}/M in · ${formatUsd(sol?.outputUsdPerMillion)}/M out</sub></td>
      <td width="50%" align="center"><strong>📖 Claude Fable 5</strong><br /><strong>${formatUsd(fable?.estimatedCostUsd)}</strong><br /><sub>${formatUsd(fable?.inputUsdPerMillion)}/M in · ${formatUsd(fable?.outputUsdPerMillion)}/M out</sub></td>
    </tr>
  </table>
  <p align="center"><strong>Code has calories. Pushonomics is the nutrition label.</strong></p>
  <p align="center"><sub>${formatNumber(estimatedInputTokens)} input + ${formatNumber(estimatedOutputTokens)} output · ${escapeHtml(tokensPerChangedLine)} tokens/line · ${escapeHtml(sessionMultiplier)}× session factor · ${formatNumber(mergesExcluded)} merges excluded · estimate, not an invoice · ${escapeHtml(updatedAt)}</sub></p>
</details>`;
}
