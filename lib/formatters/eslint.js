import {
  displaySummary,
  formatAllProblems,
  formatSourcePath,
  getRelativePath,
  STATUSES,
} from "./shared.js";

/**
 * @type {import('eslint/lib/shared/types').FormatterFunction}
 */
export default function (results, { cwd }) {
  let problemTotal = 0;
  let problems = "";
  let successes = "";

  results.forEach(({ messages, filePath, errorCount, warningCount }) => {
    const path = getRelativePath(cwd, filePath);
    const hasError = !!errorCount;
    const hasWarning = !!warningCount;
    const { icon } = hasError
      ? STATUSES.error
      : hasWarning
        ? STATUSES.warning
        : STATUSES.success;

    if (!hasError && !hasWarning) {
      successes += formatSourcePath(path, icon);
      return;
    }

    const normalizedMessages = messages.map((messageItem) => {
      const { column, line } = messageItem;
      const text = messageItem.message;
      const rule = messageItem.ruleId || "";
      const severity = messageItem.severity === 2 ? "error" : "warning";

      return { column, line, text, rule, severity };
    });
    problems += formatSourcePath(path, icon);
    problems += formatAllProblems(normalizedMessages);
    problemTotal += errorCount + warningCount;
  });

  return displaySummary(
    "ESLint",
    problemTotal,
    problems,
    results.length,
    successes,
  );
}
