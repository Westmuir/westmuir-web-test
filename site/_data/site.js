'use strict';
import fs from 'fs';

// import { name } from '@11ty/eleventy/package.json';

export default function () {
  const path = `${process.cwd()}/node_modules/@11ty/eleventy/package.json`;
  const packageData = JSON.parse(fs.readFileSync(path, 'utf8'));

  return {
    generator: `${packageData.name} v${packageData.version}`,
    // ... more site metadata like title, baseUrl, etc.
  };
}
