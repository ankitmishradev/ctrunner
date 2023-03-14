import { watch } from 'chokidar';
import colors from 'colors';

import { Icons, Line } from '../../logger';

import { store } from '../store';

export const chokidar = (line: Line) => {
  const vertBorder = colors.cyan('------------------------------------');
  const message = colors.cyan(' Centralized Task Runner is live now');

  line.write(`${Icons.bullet} Initiating watch`);

  store.ctrunner = watch(process.cwd(), {
    persistent: true,
    ignoreInitial: true,
    cwd: '.',
  });

  line.killLoader();

  store.ctrunner.on('ready', () => {
    line.write(`\r${vertBorder}\n${message}\n${vertBorder}`);
    line.close();
  });
};
