export const Path = {
  watcher: {
    dir: `${process.cwd()}/.watcher`,
    temp: `${process.cwd()}/.watcher/temp`,
    config: `${process.cwd()}/.watcher/temp/config.js`,
    batch: `${process.cwd()}/.watcher/temp/batches.js`,
    tasks: `${process.cwd()}/.watcher/temp/tasks`,
  },
  tsConfigFile: `${process.cwd()}/.watcher/tsconfig.json`,
  workers: {
    creator: `${__dirname}/workers/creator.js`,
    runner: `${__dirname}/workers/runner.js`,
    logger: `${__dirname}/worker.js`,
  },
};

export const Code = {
  ignition: {
    compile: 'IG01',
    read: 'IG02',
    clean: 'IG03',
    chokidar: 'IG04',
  },
};

export const Text = {
  command: {
    description:
      'Run centralized tasks on individual or inter-related projects.',
    options: {
      initDesc: 'create watcher setup',
      cleanDesc: 'clean up watcher',
    },
  },
};
