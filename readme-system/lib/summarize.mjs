function clean(value, max = 120) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  return text.length > max ? `${text.slice(0, max - 1).trim()}…` : text;
}

function firstCommitMessages(commits) {
  return commits.slice(0, 2).map((commit) => clean(commit.message, 88)).filter(Boolean);
}

export function deterministicSummary(activity) {
  const commits = activity.commits || [];
  const pullRequests = activity.pullRequests || [];
  const issues = activity.issues || [];
  const releases = activity.releases || [];
  const windowDays = Number(activity.windowDays || 1);
  const bullets = [];

  if (releases.length) {
    const release = releases[0];
    bullets.push(`Published ${clean(release.tagName || release.name || 'a new release', 72)}${release.name && release.name !== release.tagName ? `: ${clean(release.name, 72)}` : ''}.`);
  }

  if (commits.length) {
    const messages = firstCommitMessages(commits);
    bullets.push(`${commits.length} commit${commits.length === 1 ? '' : 's'} landed${messages.length ? `: ${messages.join('; ')}` : ''}.`);
  }

  if (pullRequests.length) {
    const first = pullRequests[0];
    bullets.push(`${pullRequests.length} pull request${pullRequests.length === 1 ? '' : 's'} updated, led by #${first.number}: ${clean(first.title, 92)}.`);
  }

  if (issues.length) {
    const first = issues[0];
    bullets.push(`${issues.length} issue${issues.length === 1 ? '' : 's'} changed, including #${first.number}: ${clean(first.title, 92)}.`);
  }

  const total = commits.length + pullRequests.length + issues.length + releases.length;
  if (total === 0) {
    bullets.push(`No public repository changes were recorded in the last ${windowDays} day${windowDays === 1 ? '' : 's'}.`);
    bullets.push('The project purpose and documented usage remain unchanged.');
    bullets.push('The next update will appear automatically when public activity is detected.');
  } else {
    bullets.push(`Daily summary covers ${total} public activity item${total === 1 ? '' : 's'} from the last ${windowDays} day${windowDays === 1 ? '' : 's'}.`);
    if (bullets.length < 3) {
      bullets.push('Documentation and project status remain aligned with the repository’s current public state.');
    }
  }

  return bullets.slice(0, 5);
}

function extractResponseText(payload) {
  if (typeof payload?.output_text === 'string') return payload.output_text;
  return (payload?.output || [])
    .flatMap((item) => item.content || [])
    .map((part) => part.text || '')
    .filter(Boolean)
    .join('\n');
}

function parseBullets(text) {
  return String(text || '')
    .split('\n')
    .map((line) => line.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, '').trim())
    .filter(Boolean)
    .slice(0, 5);
}

export async function createSummary({ project, activity, apiKey, model = 'gpt-5-mini' }) {
  const fallback = deterministicSummary(activity);
  if (!apiKey) return { bullets: fallback, source: 'deterministic' };

  const publicFacts = {
    repository: project.repository,
    purpose: project.goal,
    commits: (activity.commits || []).map(({ message }) => message),
    pullRequests: (activity.pullRequests || []).map(({ number, title, state }) => ({ number, title, state })),
    issues: (activity.issues || []).map(({ number, title, state }) => ({ number, title, state })),
    releases: (activity.releases || []).map(({ tagName, name }) => ({ tagName, name })),
    windowDays: activity.windowDays,
  };

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model,
        store: false,
        max_output_tokens: 240,
        input: [
          {
            role: 'system',
            content: [{
              type: 'input_text',
              text: 'Write 3 to 5 concise GitHub README update bullets. Use only supplied public facts. Do not invent outcomes, users, benchmarks, or private activity. Return bullets only.',
            }],
          },
          {
            role: 'user',
            content: [{ type: 'input_text', text: JSON.stringify(publicFacts) }],
          },
        ],
      }),
    });
    if (!response.ok) throw new Error(`OpenAI request failed with HTTP ${response.status}`);
    const bullets = parseBullets(extractResponseText(await response.json()));
    if (bullets.length < 3) throw new Error('OpenAI summary returned fewer than three bullets');
    return { bullets, source: 'openai' };
  } catch (error) {
    console.warn(`OpenAI summary unavailable; using deterministic fallback: ${error.message}`);
    return { bullets: fallback, source: 'deterministic' };
  }
}
