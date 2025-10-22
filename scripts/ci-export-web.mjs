#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const {
  EXPO_TOKEN,
  EXPO_CLI_USERNAME,
  EXPO_CLI_PASSWORD,
  CI,
} = process.env;

const expoCommand = process.platform === 'win32' ? 'npx.cmd' : 'npx';

function runExpo(args, { env = process.env } = {}) {
  const result = spawnSync(expoCommand, ['expo', ...args], {
    stdio: 'inherit',
    env,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const hasToken = Boolean(EXPO_TOKEN);
const hasCredentials = Boolean(EXPO_CLI_USERNAME && EXPO_CLI_PASSWORD);

if (hasToken) {
  runExpo(['login', '--token', EXPO_TOKEN, '--non-interactive']);
} else if (hasCredentials) {
  runExpo([
    'login',
    '--username',
    EXPO_CLI_USERNAME,
    '--password',
    EXPO_CLI_PASSWORD,
    '--non-interactive',
  ]);
} else if (CI === 'true') {
  console.error(
    [
      'Expo credentials were not provided for the CI build.',
      'Set EXPO_TOKEN or both EXPO_CLI_USERNAME and EXPO_CLI_PASSWORD in the Vercel project settings.',
      'Alternatively, run the build locally and upload the contents of the dist directory.',
    ].join('\n')
  );
  process.exit(1);
} else {
  console.warn(
    [
      'Expo credentials are not configured. Continuing without logging in because this build is not running in CI.',
      'To prepare CI builds (e.g. on Vercel), configure EXPO_TOKEN or EXPO_CLI_USERNAME/EXPO_CLI_PASSWORD.',
    ].join('\n')
  );
}

runExpo(['export', '--platform', 'web', '--output-dir', 'dist', '--non-interactive']);
