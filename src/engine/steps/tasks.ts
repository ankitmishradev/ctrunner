/* eslint-disable @typescript-eslint/no-explicit-any */
import colors from 'colors';
import { parentPort } from 'node:worker_threads';

import { colored, Icons, Line, Timer } from '../../logger';
import { BatchMeta, Path, TaskOutput } from '../../utils';

export const tasks = async (meta: BatchMeta) => {
  for (const task of meta.tasks) {
    const shouldRun = !task.events || task.events.includes(meta.event);

    if (shouldRun) {
      const line = new Line(true);
      const timer = new Timer();

      line.write(`${Icons.bullet} ${task.name}`);
      line.startLoader();

      await import(`${Path.watcher.tasks}/${task.file}.js`)
        .then(value => {
          return new Promise<TaskOutput>(resolve => {
            value.default(task.payload, resolve);
          });
        })
        .catch(
          () =>
            ({
              status: false,
              error: 'Task file not found.',
            } as TaskOutput),
        )
        .then(result => {
          const timeTaken = colored(` (${timer.end}s)`);
          const icon = result.status ? Icons.check : Icons.times;

          line.killLoader();
          line.write(`${icon} ${task.name}${timeTaken}`);
          line.close();

          result.status
            ? printMessage(result.message, false)
            : printMessage(result.error, true);
        });
    }
  }

  parentPort?.postMessage({ action: 'next' });
};

const printMessage = (message?: string, error?: boolean) => {
  const lineSize = 100;

  if (!message) return;

  const clipper = `    ${colors[error ? 'red' : 'green'](Icons.clipper)} `;

  const output = (message ?? '')
    .split('\n')
    .flatMap(line => {
      const store = [];
      const rows = Math.floor(line.length / lineSize);

      if (rows === 0) return line;

      for (let i = 0; i < rows; i++) {
        store.push(line.slice(i * lineSize, (i + 1) * lineSize));
      }

      return store;
    })
    .join(`\n${clipper}`);

  console.log(`${clipper}${output}`);
};
