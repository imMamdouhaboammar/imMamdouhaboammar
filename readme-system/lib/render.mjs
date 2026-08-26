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

  const footnote = [
    `${formatNumber(commitsScanned)} commits scanned`,
    `${formatNumber(mergesExcluded)} merges excluded`,
    `${formatNumber(estimatedInputTokens)} input + ${formatNumber(estimatedOutputTokens)} output tokens`,
    `${escapeHtml(String(tokensPerChangedLine))} tokens per changed line`,
    `${escapeHtml(String(sessionMultiplier))}x session factor`,
    `estimate, not an invoice`,
  ].join(' · ');

  return `<details open>
  <summary><strong>Pushonomics: Every line has a token tab</strong></summary>
  <br />
  <p align="center"><img src="${MODEL_BADGES}" width="410" alt="GPT-5.6 Sol and Claude Fable 5" /></p>
  <p><sub>I keep a tab on what agent-assisted building costs, because the bill is part of the engineering decision.</sub></p>
  <table>
    <tr>
      <td width="25%" align="center"><strong>${formatNumber(additions)}</strong><br /><sub>Lines added</sub></td>
      <td width="25%" align="center"><strong>${formatNumber(deletions)}</strong><br /><sub>Lines deleted</sub></td>
      <td width="25%" align="center"><strong>${formatNumber(changedLines)}</strong><br /><sub>Lines changed</sub></td>
      <td width="25%" align="center"><strong>${formatNumber(estimatedSessionTokens)}</strong><br /><sub>Estimated tokens</sub></td>
    </tr>
  </table>
  <table>
    <tr>
      <td width="50%" align="center"><strong>GPT-5.6 Sol / Ultra</strong><br />${formatUsd(sol?.estimatedCostUsd)}<br /><sub>${formatUsd(sol?.inputUsdPerMillion)}/M input · ${formatUsd(sol?.outputUsdPerMillion)}/M output</sub></td>
      <td width="50%" align="center"><strong>Claude Fable 5</strong><br />${formatUsd(fable?.estimatedCostUsd)}<br /><sub>${formatUsd(fable?.inputUsdPerMillion)}/M input · ${formatUsd(fable?.outputUsdPerMillion)}/M output</sub></td>
    </tr>
  </table>
  <p align="center"><strong>Estimate model:</strong> ${footnote}</p>
</details>`;
}
