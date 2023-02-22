import { exec } from 'node:child_process';
import fs from 'node:fs';

import { exit } from '../handlers';
import { Icons, Line } from '../logger';
import { Paths } from '../utils';

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

export const compile = (line: Line, cb: () => void) => {
  line.write(`${Icons.bullet} Compiling setup files`);
  line.loader();

  fs.writeFile(
    Paths.tsConfigFile,
    JSON.stringify(config),
    { encoding: 'utf8', flag: 'w' },
    err => {
      if (err) exit(err.message);
      else {
        exec('npx -p typescript tsc', { cwd: '.watcher' }, err => {
          if (err) exit(err.message);
          else cb();
        });
      }
    },
  );
};
