import { newLine } from '../logger';

import { chokidar } from './chokidar';
import { clean } from './clean';
import { compile } from './compile';
import { read } from './read';

export const initiate = (cb: () => void) => {
  const line = newLine();

  compile(line, () =>
    read(line, () => clean(line, () => chokidar(line, () => cb()))),
  );
};

export { store } from './store';
