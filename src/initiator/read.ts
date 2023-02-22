import fs from 'node:fs';

import { exit } from '../handlers';
import { Icons, Line } from '../logger';
import { Paths } from '../utils';
import { store } from './store';

export const read = async (line: Line, cb: () => void) => {
  line.clean();
  line.write(`${Icons.bullet} Reading setup files`);
  store.config = (await import(Paths.configFile)).default;
  store.batches = (await import(Paths.batchFile)).default;
  fs.readdir(Paths.tasksDir, (err, files) => {
    if (err) exit(err.message);
    else
      files.forEach(async file => {
        const task = (await import(`${Paths.tasksDir}/${file}`)).default;
        store.tasks.push(task);
      });
    cb();
  });
};
