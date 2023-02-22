import { Worker } from 'node:worker_threads';

import { BatchMeta } from '../utils';

export class Manager {
  private worker: Worker;
  public queue: string[];

  constructor(worker: Worker) {
    this.worker = worker;
    this.queue = [];
  }

  public attach(meta: BatchMeta) {
    if (!this.queue.includes(meta.name)) {
      this.queue.push(meta.name);
      this.worker.postMessage(meta);
    }
  }

  public remove(batch: string) {
    this.queue = this.queue.filter(value => value !== batch);
  }
}
