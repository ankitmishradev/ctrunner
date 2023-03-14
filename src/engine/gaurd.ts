import { Worker } from 'node:worker_threads';

import { store } from '../ignition';
import { BatchMeta } from '../utils';

export class Gaurd {
  private worker: Worker;
  private busy: boolean;
  private sn: number;
  private currentSN: number;
  public queue: { [key: string]: QueueItem };

  constructor(worker: Worker) {
    this.currentSN = 0;
    this.sn = 0;
    this.worker = worker;
    this.queue = {};
    this.busy = false;
    this.activate();
  }

  /**
   * Check if queue item with same name has meta.
   * If a queue item doesn't have meta it is considered to be new queue item;
   * @param name Name of the meta
   */
  private isNew(name: string) {
    return this.queue[name].meta === undefined;
  }

  /**
   * Initialize queue items with batches in the store.
   */
  private activate() {
    store.batches.forEach(batch => {
      this.queue[batch.name] = {};
    });
  }

  /**
   * Find a queue item with given serial number(sn).
   */
  private findBySN(sn: number) {
    for (const key in this.queue) {
      if (Object.prototype.hasOwnProperty.call(this.queue, key)) {
        const element = this.queue[key];
        if (element.sn === sn) return element;
      }
    }
  }

  /**
   * Add meta and serial number to the corresponding queue item.
   */
  public add(meta: BatchMeta) {
    if (this.isNew(meta.name)) {
      this.queue[meta.name] = { sn: this.sn, meta: meta };
      if (!this.busy) this.next(this.sn);
      this.sn++;
    }
  }

  /**
   * Use queue item with given serial number to run next batch and related tasks.
   */
  public next(sn?: number) {
    const queueItem = this.findBySN(sn ?? this.currentSN + 1);

    if (queueItem) {
      this.busy = true;
      this.worker.postMessage({
        meta: queueItem?.meta,
        config: store.config,
      });
    } else this.busy = false;
  }

  /**
   * Clear the queue item with given meta name.
   */
  public remove(name: string) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.currentSN = this.queue[name].sn!;
    this.queue[name] = {};
  }
}

interface QueueItem {
  meta?: BatchMeta;
  sn?: number;
}
