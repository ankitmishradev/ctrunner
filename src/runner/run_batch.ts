import { parentPort } from 'node:worker_threads';

import { BatchMeta } from '../utils';

export const runBatch = (meta: BatchMeta) => {
  process.stdout.write(`${meta.time} | ${meta.name} | ${meta.event}\n`);
  parentPort?.postMessage(meta);
};
