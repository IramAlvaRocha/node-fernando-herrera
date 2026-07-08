const { spawn } = require('child_process');
const path = require('path');

function resolveAppArgs() {
  const argv = process.argv.slice(2);

  const dashIndex = argv.indexOf('--');
  if (dashIndex !== -1) {
    const passthrough = argv.slice(dashIndex + 1);
    if (passthrough.length > 0) return passthrough;
  }

  if (argv.some((arg) => arg.startsWith('-'))) {
    return argv;
  }

  const base = process.env.npm_config_base ?? process.env.npm_config_b;
  const limit = process.env.npm_config_limit ?? process.env.npm_config_l;
  const show = process.env.npm_config_show ?? process.env.npm_config_s;
  const name = process.env.npm_config_name ?? process.env.npm_config_n;
  const destination = process.env.npm_config_destination ?? process.env.npm_config_d;

  const args = [];

  let resolvedBase = base;
  let resolvedLimit = limit;

  if (base === 'true' && argv.length > 0) {
    resolvedBase = argv[0];
  }

  if (limit === 'true' && argv.length > 1) {
    resolvedLimit = argv[1];
  }

  if (resolvedBase && resolvedBase !== 'true') {
    args.push('-b', resolvedBase);
  }

  if (resolvedLimit && resolvedLimit !== 'true') {
    args.push('-l', resolvedLimit);
  }

  if (show === 'true') {
    args.push('--show');
  }

  if (name && name !== 'true') {
    args.push('-n', name);
  }

  if (destination && destination !== 'true') {
    args.push('-d', destination);
  }

  return args;
}

const appArgs = resolveAppArgs();
const projectRoot = path.join(__dirname, '..');

const child = spawn(
  'npx',
  ['nodemon', '--config', 'nodemon.json', '--exec', 'npx ts-node ./src/app.ts', '--', ...appArgs],
  { stdio: 'inherit', shell: true, cwd: projectRoot }
);

child.on('exit', (code) => process.exit(code ?? 0));
