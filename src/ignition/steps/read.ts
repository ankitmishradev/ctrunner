import { Icons, Line } from '../../logger';
import { Path } from '../../utils';
import { store } from '../store';

export const read = async (line: Line, cb: () => void) => {
  line.write(`${Icons.bullet} Reading setup files`);
  store.config = (await import(Path.watcher.config)).default;
  store.batches = (await import(Path.watcher.batch)).default;
  cb();
};
