import fs from 'node:fs/promises';
import { promisify } from 'node:util';
import { exec as execLegacy } from 'node:child_process';

import { Icons, Line } from '../../logger';
import { Code, Path } from '../../utils';
import { exitIgnition } from '../exit';

const exec = promisify(execLegacy);

export const compile = async (line: Line) => {
  line.write(`${Icons.bullet} Compiling setup files`);
  line.startLoader();

  return fs
    .readdir(Path.watcher.dir)
    .then(() => createConfig(line))
    .then(() => runCommand(line))
    .catch(() => exitIgnition(line, Code.ignition.compile));
};

const createConfig = (line: Line) =>
  fs
    .writeFile(Path.tsConfigFile, JSON.stringify(config), {
      encoding: 'utf8',
      flag: 'w',
    })
    .catch(() => exitIgnition(line, Code.ignition.compile));

const runCommand = (line: Line) =>
  exec('npx -p typescript tsc', { cwd: '.watcher' }).catch(() =>
    exitIgnition(line, Code.ignition.compile),
  );

const config = {
  compilerOptions: {
    target: 'ES2015',
    module: 'CommonJS',
    moduleResolution: 'node',
    outDir: 'temp',
    allowJs: true,
  },
  exclude: ['temp'],
  include: ['./**/*.ts', './**/*.js'],
};
