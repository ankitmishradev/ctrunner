import colors from 'colors';
import { parentPort } from 'node:worker_threads';

import { BatchMeta } from '../utils';

parentPort?.on('message', val => {
  if (val.batch) {
    const meta: BatchMeta = {
      ...val.batch,
      event: val.event,
      time: timeStamp(),
    };
    parentPort?.postMessage(meta);
  }
});

const timeStamp = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const hrsString = hours < 10 ? `0${hours}` : hours;
  const minsString = minutes < 10 ? `0${minutes}` : minutes;
  return colors.cyan(`[${hrsString}:${minsString} ${suffix}]`);
};
