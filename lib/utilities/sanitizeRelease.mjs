#!/usr/bin/env node

import { cp, readdir, rm } from 'fs/promises';

try {
  console.info();
  console.info('\u2139\ufe0f  Deleting development files…');
  const files = await readdir('./');
  for (const file of files) {
    if (file === 'release') continue;
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
  await cp('./release', './', { recursive: true });
  await rm('./release', { recursive: true, force: true });
  console.info(`\u2705 Build artifacts were moved successfully.`);
} catch (error) {
  console.error(`\u274c ${error}`);
}
