export const Path = {
  ctrunner: {
    dir: `${process.cwd()}/.ctrunner`,
    temp: `${process.cwd()}/.ctrunner/temp`,
    config: `${process.cwd()}/.ctrunner/temp/config.js`,
    batch: `${process.cwd()}/.ctrunner/temp/batches.js`,
    tasks: `${process.cwd()}/.ctrunner/temp/tasks`,
  },
  tsConfigFile: `${process.cwd()}/.ctrunner/tsconfig.json`,
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
      initDesc: 'create ctrunner setup',
      cleanDesc: 'clean up ctrunner',
    },
  },
};
