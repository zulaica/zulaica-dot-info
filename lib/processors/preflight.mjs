#!/usr/bin/env node

import { readdir, rm, mkdir } from 'fs/promises';

const preflight = async () => {
  try {
    const files = await readdir('build/');
    for (const file of files) {
      await rm(file, { recursive: true, force: true });
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      await mkdir('build/');
    } else {
      console.error(error);
    }
  }
};

preflight();
