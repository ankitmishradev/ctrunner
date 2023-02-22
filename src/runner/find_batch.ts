import { store } from '../initiator';

export const findBatch = (searchStr: string, byName?: boolean) => {
  return store.batches.find(batch => {
    if (byName) return batch.name === searchStr;
    else return searchStr.startsWith(batch.path);
  });
};
