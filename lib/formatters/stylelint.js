import {
  displaySummary,
  formatAllProblems,
  formatSourcePath,
  getRelativePath,
  STATUSES
} from "./shared.js";

/**
 * @type {import('stylelint').Formatter}
 */
export default function formatter(results, { cwd }) {
  let problemTotal = 0;
  let problems = "";
  let successes = "";

  results.forEach(({ source, errored: hasError, warnings }) => {
    const path = getRelativePath(cwd, source);
    const hasWarning = !!warnings.length;
    const { icon } = hasError
      ? STATUSES.error
      : hasWarning
        ? STATUSES.warning
        : STATUSES.success;

    if (!hasError && !hasWarning) {
      successes += formatSourcePath(path, icon);
      return;
    }

    const normalizedMessages = warnings.map((warning) => {
      const { column, line, text, severity } = warning;
      const rule = warning.rule || "";

      return { column, line, text, rule, severity };
    });
    problems += formatSourcePath(path, icon);
    problems += formatAllProblems(normalizedMessages);
    problemTotal += warnings.length;
  });

  return displaySummary(
    "Stylelint",
    problemTotal,
    problems,
    results.length,
    successes
  );
}
