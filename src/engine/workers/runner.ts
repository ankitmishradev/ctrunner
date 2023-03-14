import { parentPort } from 'node:worker_threads';

import { event, tasks } from '../steps';

parentPort?.on('message', async ({ meta, config }) => {
  parentPort?.postMessage({ action: 'remove', name: meta.name });

  event(meta, config.showEventOrigin);
  await tasks(meta);
});
