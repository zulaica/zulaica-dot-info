export const reportError = (error) => {
  console.info('\u26D4\uFE0F An error has occurred');
  console.error(error);
  console.log();
  process.exit(1);
};
