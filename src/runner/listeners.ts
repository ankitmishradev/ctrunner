import { Worker } from 'worker_threads';
import { Manager } from './manager';
import { store } from '../initiator';
import { getWorker } from '../workers';
import { findBatch } from './find_batch';

export const listeners = () => {
  const creator = new Worker(getWorker('creator'));
  const runner = new Worker(getWorker('runner'));
  const manager = new Manager(runner);

  store.watcher.on('all', (event, path) => {
    const batch = findBatch(path);

    if (batch) {
      creator.postMessage({ batch, event });
    }
  });

  creator.on('message', meta => manager.attach(meta));

  runner.on('message', meta => manager.remove(meta.name));
};
