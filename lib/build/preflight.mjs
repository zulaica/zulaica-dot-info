#!/usr/bin/env node

import { readdir, rm, mkdir } from 'fs/promises';
import { reportError } from './shared.mjs';

const preflight = async () => {
  console.info('\ud83d\udeeb Preflight');

  try {
    const files = await readdir('release/');

    console.info('\ud83d\udeae Removing old release files');

    for (const file of files) {
      await rm(`release/${file}`, { recursive: true, force: true });
      console.info(`   \ud83d\uddd1\ufe0f  ${file}`);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.info('\uD83D\uDCC1 Creating release directory');

      await mkdir('release/');
    } else {
      reportError(error);
    }
  }
};

export default preflight;
