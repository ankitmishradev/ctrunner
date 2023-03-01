import { parentPort } from 'worker_threads';

let index = 0;
let interval: NodeJS.Timer;

const symbols = ['-', '\\', '|', '/'];

parentPort?.on('message', msg => {
  if (msg === 'start') {
    interval = setInterval(() => {
      parentPort?.postMessage(symbols[index]);

      if (index < symbols.length - 1) index++;
      else index = 0;
    }, 200);
  } else if (msg === 'kill') {
    if (interval) clearInterval(interval);
  }
});
