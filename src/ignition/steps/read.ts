import { Icons, Line } from '../../logger';
import { Code, Path } from '../../utils';
import { exitIgnition } from '../exit';
import { store } from '../store';

export const read = async (line: Line) => {
  line.write(`${Icons.bullet} Reading setup files`);

  import(Path.watcher.config)
    .then(value => (store.config = value.default))
    .catch(() => exitIgnition(line, Code.ignition.read));
  import(Path.watcher.batch)
    .then(value => (store.batches = value.default))
    .catch(() => exitIgnition(line, Code.ignition.read));
};
