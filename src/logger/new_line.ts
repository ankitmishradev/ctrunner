import colors from 'colors';
import readline from 'readline';
import { Worker } from 'node:worker_threads';

import { getWorker } from '../workers';

export const newLine = () => {
  process.stdout.write('\u001B[?25l');

  const worker = new Worker(getWorker('loader'));

  const write = (text: string) => {
    process.stdout.write('\r' + text);
  };

  const close = () => {
    process.stdout.write('\n');
    process.stdout.write('\u001B[?25h');
  };

  const clean = () => {
    readline.clearLine(process.stdout, 0);
  };

  const loader = () => {
    worker.postMessage('start');
    worker.on('message', value => {
      process.stdout.write(colors.cyan(`\r${value}`));
    });
  };

  const killLoader = () => {
    worker.postMessage('kill');
  };

  return { write, close, clean, loader, killLoader };
};

export type Line = ReturnType<typeof newLine>;
