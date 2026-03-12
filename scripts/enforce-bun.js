#!/usr/bin/env node

const userAgent = process.env.npm_config_user_agent || '';

if (!userAgent.includes('bun')) {
  console.error(`
❌ This project requires Bun as the package manager.

You are using: ${userAgent || 'unknown'}

👉 Please install Bun and run:
   bun install
`);
  process.exit(1);
}
