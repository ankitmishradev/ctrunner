import { Worker } from 'node:worker_threads';
import readline from 'readline';

import { colored } from './colored';

export class Line {
  private _worker;
  private _tab;

  constructor(tab?: true) {
    this._tab = tab ? '  ' : '';
    this._worker = new Worker(`${__dirname}/worker.js`);
    process.stdout.write('\u001B[?25l');
  }

  write(text: string) {
    this.clean();
    process.stdout.write(`\r${this._tab}${text}`);
  }

  close() {
    process.stdout.write('\n');
    process.stdout.write('\u001B[?25h');
  }

  clean() {
    readline.clearLine(process.stdout, 0);
  }

  startLoader() {
    this._worker.postMessage('start');
    this._worker.on('message', value => {
      process.stdout.write(colored(`\r${this._tab}${value}`));
    });
  }

  killLoader() {
    this._worker.postMessage('kill');
  }

  changeSymbol(symbol: string) {
    process.stdout.write(`\r${this._tab}${symbol}`);
  }
}

// export type Line = ReturnType<typeof newLine>;
