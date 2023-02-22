import { FSWatcher, WatchOptions } from 'chokidar';

export interface Line {
  write(text: string): void;
  close(): void;
  clean(): void;
  loader(): void;
  killLoader(): void;
}

export interface WatcherConfig {
  root: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nodes: any;
  options: WatchOptions;
}
// export interface Task {
//   name: TaskName;
//   run: (node: NodeName) => void;
// }

export type Status = 'running' | 'done' | 'failed';

export type EventName =
  | 'add'
  | 'addDir'
  | 'change'
  | 'unlink'
  | 'unlinkDir'
  | 'all';

export interface Configuration {
  name: string;
  ignore: string[];
}

export interface Batch {
  name: string;
  path: string;
  tasks: Task[];
}

export interface Task {
  name: string;
  command?: string;
  function?: string;
  event?: EventName[];
}

export interface Store {
  config: Configuration;
  batches: Batch[];
  watcher: FSWatcher;
  tasks: Task[];
}

export interface BatchMeta extends Batch {
  event: EventName;
  time: string;
}
