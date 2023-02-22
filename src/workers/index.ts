import path from 'node:path';

type WorkerName = 'runner' | 'creator' | 'loader';

export const getWorker = (worker: WorkerName) => {
  return path.resolve(`${__dirname}/../workers/${worker}.js`);
};
