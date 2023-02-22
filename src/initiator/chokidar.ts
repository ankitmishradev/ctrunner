import { watch } from 'chokidar';
import colors from 'colors';

import { Icons, Line } from '../logger';

import { store } from './store';

export const chokidar = (line: Line, cb: () => void) => {
  const vertBorder = colors.cyan('---------------------');
  const message = colors.cyan(' Watcher is live now');

  line.clean();
  line.write(`${Icons.bullet} Initiating watch`);

  store.watcher = watch(process.cwd(), {
    persistent: true,
    ignoreInitial: true,
    cwd: '.',
  });

  line.killLoader();
  line.clean();

  store.watcher.on('ready', () => {
    line.write(`\r${vertBorder}\n${message}\n${vertBorder}`);
    line.close();
  });

  cb();
};
