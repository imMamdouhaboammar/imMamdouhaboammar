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

export function renderProjectBlock({ project, bullets, updatedAt, source }) {
  const keywords = (project.keywords || []).map(escapeHtml).join(' · ');
  const bulletHtml = bullets.map((bullet) => `      <li>${escapeHtml(bullet)}</li>`).join('\n');
  const logo = escapeHtml(project.logo);
  const name = escapeHtml(project.name);

  return `<details open>
  <summary><strong>Why I built ${name}</strong></summary>
  <br />
  <table>
    <tr>
      <td width="118" align="center" valign="top">
        <img src="${logo}" width="88" alt="${name} repository mark" />
      </td>
      <td valign="top">
        <p><strong>What is ${name}?</strong> ${escapeHtml(project.description || project.goal)}</p>
        <p><strong>Built from a recurring problem:</strong> ${escapeHtml(project.problem)}</p>
        <p><strong>Practical goal:</strong> ${escapeHtml(project.goal)}</p>
        <p><strong>Who it is for:</strong> ${escapeHtml(project.audience)}</p>
        <p><strong>Topics:</strong> ${keywords}</p>
      </td>
    </tr>
  </table>
  <p><strong>Daily development summary</strong></p>
  <ul>
${bulletHtml}
  </ul>
  <p><sub>Updated ${escapeHtml(updatedAt)} · ${source === 'openai' ? 'AI-assisted summary with deterministic fallback' : 'Deterministic public-activity summary'}</sub></p>
</details>`;
}

export function renderProfileMetricsBlock({ commits, currentStreak, longestStreak, yearContributions, updatedAt }) {
  return `<div align="center">
  <table>
    <tr>
      <td align="center" width="25%"><strong>${formatNumber(commits)}</strong><br /><sub>Total commit contributions</sub></td>
      <td align="center" width="25%"><strong>${formatNumber(currentStreak)} days</strong><br /><sub>Current streak</sub></td>
      <td align="center" width="25%"><strong>${formatNumber(longestStreak)} days</strong><br /><sub>Longest streak</sub></td>
      <td align="center" width="25%"><strong>${formatNumber(yearContributions)}</strong><br /><sub>Contributions this year</sub></td>
    </tr>
  </table>
  <sub>Public and token-visible private activity · repository names stay private · updated ${escapeHtml(updatedAt)}</sub>
</div>

<details>
  <summary><strong>How these numbers are calculated</strong></summary>
  <p>Commit totals use GitHub-recognized commit contributions across yearly contribution windows. Streaks use days containing at least one commit, pull request, issue, or pull-request review. A streak remains current when the latest active day is today or yesterday.</p>
</details>`;
}
