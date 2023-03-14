import { parentPort } from 'node:worker_threads';

import { BatchMeta } from '../../utils';
import { timeStamp } from '../time_stamp';

parentPort?.on('message', val => {
  if (val.batch) {
    const meta: BatchMeta = {
      ...val.batch,
      event: val.event,
      eventOrigin: val.path,
      time: timeStamp(),
    };

    parentPort?.postMessage(meta);
  }
});
