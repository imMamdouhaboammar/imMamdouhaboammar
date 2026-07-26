export const DEFAULT_TOKENOMICS_ASSUMPTIONS = Object.freeze({
  tokensPerChangedLine: 8,
  sessionMultiplier: 4,
  models: Object.freeze({
    'GPT-5.6 Sol': Object.freeze({ inputUsdPerMillion: 5, outputUsdPerMillion: 30 }),
    'Claude Fable 5': Object.freeze({ inputUsdPerMillion: 10, outputUsdPerMillion: 50 }),
  }),
});

function roundCurrency(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

function nonNegativeInteger(value) {
  return Math.max(0, Math.round(Number(value) || 0));
}

export function mergeLineWindows(windows = []) {
  const totals = windows.reduce((result, window) => ({
    additions: result.additions + nonNegativeInteger(window.additions),
    deletions: result.deletions + nonNegativeInteger(window.deletions),
    commits: result.commits + nonNegativeInteger(window.commits),
    mergesExcluded: result.mergesExcluded + nonNegativeInteger(window.mergesExcluded),
  }), { additions: 0, deletions: 0, commits: 0, mergesExcluded: 0 });

  return {
    ...totals,
    changedLines: totals.additions + totals.deletions,
  };
}

export function estimatePushonomics({
  additions = 0,
  deletions = 0,
  tokensPerChangedLine = DEFAULT_TOKENOMICS_ASSUMPTIONS.tokensPerChangedLine,
  sessionMultiplier = DEFAULT_TOKENOMICS_ASSUMPTIONS.sessionMultiplier,
  models = DEFAULT_TOKENOMICS_ASSUMPTIONS.models,
} = {}) {
  const changedLines = nonNegativeInteger(additions) + nonNegativeInteger(deletions);
  const safeTokensPerLine = Math.max(1, Number(tokensPerChangedLine) || 1);
  const safeSessionMultiplier = Math.max(1, Number(sessionMultiplier) || 1);
  const estimatedOutputTokens = Math.round(changedLines * safeTokensPerLine);
  const estimatedSessionTokens = Math.round(estimatedOutputTokens * safeSessionMultiplier);
  const estimatedInputTokens = Math.max(0, estimatedSessionTokens - estimatedOutputTokens);
  const modelCosts = {};

  for (const [name, rates] of Object.entries(models)) {
    const inputCost = estimatedInputTokens / 1_000_000 * Number(rates.inputUsdPerMillion || 0);
    const outputCost = estimatedOutputTokens / 1_000_000 * Number(rates.outputUsdPerMillion || 0);
    modelCosts[name] = {
      inputUsdPerMillion: Number(rates.inputUsdPerMillion || 0),
      outputUsdPerMillion: Number(rates.outputUsdPerMillion || 0),
      estimatedCostUsd: roundCurrency(inputCost + outputCost),
    };
  }

  return {
    additions: nonNegativeInteger(additions),
    deletions: nonNegativeInteger(deletions),
    changedLines,
    estimatedInputTokens,
    estimatedOutputTokens,
    estimatedSessionTokens,
    tokensPerChangedLine: safeTokensPerLine,
    sessionMultiplier: safeSessionMultiplier,
    models: modelCosts,
  };
}
