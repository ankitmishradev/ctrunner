import { parentPort } from 'node:worker_threads';
import { runBatch } from '../runner/run_batch';

parentPort?.on('message', meta => {
  runBatch(meta);
});
