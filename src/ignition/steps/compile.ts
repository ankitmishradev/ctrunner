import { exec } from 'node:child_process';
import fs from 'node:fs';

import { Icons, Line } from '../../logger';
import { Path } from '../../utils';
import { exitIgnition } from '../exit';

export const compile = (line: Line, cb: () => void) => {
  line.write(`${Icons.bullet} Compiling setup files`);
  line.startLoader();

  fs.writeFile(
    Path.tsConfigFile,
    JSON.stringify(config),
    { encoding: 'utf8', flag: 'w' },
    err => {
      if (err) exitIgnition(line);
      else {
        exec('npx -p typescript tsc', { cwd: '.watcher' }, err => {
          if (err) exitIgnition(line);
          else cb();
        });
      }
    },
  );
};

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
