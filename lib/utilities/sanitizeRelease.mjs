#!/usr/bin/env node

import { cp, readdir, rm } from 'fs/promises';

try {
  console.info();
  console.info('\u2139\ufe0f  Deleting development files…');
  const files = await readdir('./');
  for (const file of files) {
    if (file === 'build') continue;
    if (file === '.git') continue;

    await rm(file, { recursive: true, force: true });
    console.info(`\u2705 ${file} was deleted successfully.`);
  }
} catch (error) {
  console.error(`\u274c ${error}`);
}

try {
  console.info();
  console.info('\u2139\ufe0f  Moving build artifacts…');
  await cp('./build', './', { recursive: true });
  await rm('./build', { recursive: true, force: true });
  console.info(`\u2705 Build artifacts were moved successfully.`);
} catch (error) {
  console.error(`\u274c ${error}`);
}
