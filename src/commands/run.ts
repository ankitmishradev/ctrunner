import { Command } from 'commander';
import { engine } from '../engine';

import { ignition } from '../ignition';

import { init } from './options/init';
import { clean } from './options/clean';
import { Text } from '../utils';

export const run = (program: Command) => {
  program
    .option('-i, --init', Text.command.options.initDesc)
    .option('-c, --clean', Text.command.options.cleanDesc)
    .action(async options => {
      if (options.init) init();
      else if (options.clean) clean();
      else {
        await ignition();
        engine();
      }
    });
};
