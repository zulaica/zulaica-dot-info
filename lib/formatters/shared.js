import chalk from "chalk";
import { relative } from "node:path";
import { table } from "table";

const TABLE_OPTIONS = Object.freeze({
  columnDefault: {
    alignment: "left",
    verticalAlignment: "middle",
    wrapWord: true,
  },
  columns: [
    { width: 5 },
    { width: 7 },
    { width: 45 },
    { alignment: "right", width: 18 },
  ],
});

const formatProblem = (column, line, message, rule, severity) => [
  chalk.dim(`${line}:${column}`),
  STATUSES[severity].color(severity),
  message.replace(/\(([^()]*)\)/g, "").trim(),
  chalk.dim(rule),
];

const formatSummary = (linter, problemTotal, sourceTotal) =>
  chalk.bold(
    `${STATUSES.info.icon} ${chalk.underline(
      `${linter} found ${problemTotal} ${
        problemTotal === 1 ? "problem" : "problems"
      } among ${sourceTotal} source ${sourceTotal === 1 ? "file" : "files"}`,
    )}\n`,
  );

export const STATUSES = Object.freeze({
  error: {
    color: chalk.red,
    icon: "\u274c",
  },
  info: {
    color: chalk.blue,
    icon: "\u2139\ufe0f ",
  },
  success: {
    color: chalk.green,
    icon: "\u2705",
  },
  warning: {
    color: chalk.yellow,
    icon: "\u26a0\ufe0f ",
  },
});

export const displaySummary = (
  linter,
  problemTotal,
  problems,
  sourcesTotal,
  successes,
) =>
  chalk.reset(
    `${formatSummary(
      linter,
      problemTotal,
      sourcesTotal,
    )}\n${successes}\n${problems}`,
  );

export const formatAllProblems = (messages) =>
  `${table(
    messages.map(({ column, line, text, rule, severity }) =>
      formatProblem(column, line, text, rule, severity),
    ),
    TABLE_OPTIONS,
  )}\n`;

export const formatSourcePath = (path, icon) => `${icon} ${path}\n`;

export const getRelativePath = (cwd, path) => relative(cwd, path);
