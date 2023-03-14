import { Line } from '../logger';

import { compile, read, clean, chokidar } from './steps';

/**
 * Starts the watcher.
 *
 * Actions involved:
 * - Compile watcher directory using `tsc` compiler.
 * - Read configuration and batch details from compiled code.
 * - Remove `tsconfig.json` file.
 * - Initiate `chokidar` to watch for changes within root directory.
 */
export const ignition = async () => {
  const line = new Line();

  await compile(line);
  await read(line);
  await clean(line);
  chokidar(line);
};

export { store } from './store';
