import anymatch from 'anymatch';
import { Worker } from 'worker_threads';
import { store } from '../ignition';
import { Gaurd } from './gaurd';

export const engine = () => {
  const creator = new Worker(`${__dirname}/workers/creator.js`);
  const runner = new Worker(`${__dirname}/workers/runner.js`);
  const manager = new Gaurd(runner);

  store.watcher.on('all', (event, path) => {
    const batch = store.batches.find(batch => path.startsWith(batch.path));
    const relPath = path.substring(path.indexOf('\\') + 1);
    const shouldCheck =
      batch &&
      !anymatch(batch.ignore ?? [], relPath) &&
      !anymatch(store.config.ignore ?? [], relPath);

    if (shouldCheck) {
      creator.postMessage({ batch, event, path });
    }
  });

  creator.on('message', meta => manager.add(meta));

  runner.on('message', output => {
    if (output.action === 'remove') manager.remove(output.name);
    else if (output.action === 'next') manager.next();
  });
};
