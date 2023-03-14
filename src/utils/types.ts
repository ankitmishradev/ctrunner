/* eslint-disable @typescript-eslint/no-explicit-any */
import { FSWatcher, WatchOptions } from 'chokidar';

export interface WatcherConfig {
  root: string;
  nodes: any;
  options: WatchOptions;
}

export type EventName = 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir';

export interface Configuration {
  name: string;
  ignore: string[];
  showEventOrigin: boolean;
}

export interface Batch {
  name: string;
  path: string;
  tasks: Task[];
  ignore?: string[];
}

export interface Task {
  name: string;
  file: string;
  events?: EventName[];
  payload?: any;
}

export interface TaskOutput {
  status: boolean;
  error?: string;
  message?: string;
}

export interface BatchMeta extends Batch {
  event: EventName;
  time: string;
  eventOrigin: string;
}

export interface Store {
  config: Configuration;
  batches: Batch[];
  watcher: FSWatcher;
}
