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
export const ignition = (cb: () => void) => {
  const line = new Line();

  compile(line, () =>
    read(line, () => clean(line, () => chokidar(line, () => cb()))),
  );
};

export { store } from './store';
