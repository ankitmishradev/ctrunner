import { Command } from 'commander';
import { runner } from '../runner';

import { initiate } from '../initiator';

import { init } from './options/init';

export const run = (program: Command) => {
  program.option('--init', 'Initiate a new watcher project').action(options => {
    if (options.init) init();
    else initiate(runner);
  });
};
