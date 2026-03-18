#!/usr/bin/env node

require('tsx/cjs');
const { generateRSS } = require('../lib/generate-rss.ts');

async function main() {
  try {
    await generateRSS();
    process.exit(0);
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    process.exit(1);
  }
}

main();
