import fs from 'node:fs/promises';
import path from 'node:path';

import { Icons, Line } from '../../logger';
import { Path } from '../../utils';

const line = new Line();

export const init = () => {
  line.write(`${Icons.bullet} Setup ctrunner template`);
  line.startLoader();

  fs.readdir(Path.ctrunner.dir)
    .then(() => exit(false))
    .catch(reason => (reason.code === 'ENOENT' ? undefined : exit(false)))
    .then(createDirectory)
    .then(createConfig)
    .then(createBatch)
    .then(createTasks)
    .then(() => exit(true))
    .catch(() => exit(false));
};

const createDirectory = async () =>
  fs.mkdir(Path.ctrunner.dir).catch(() => exit(false));

const createBatch = async () =>
  fs
    .writeFile(`${Path.ctrunner.dir}/batches.js`, defaultBatches)
    .catch(() => exit(false));

const createConfig = async () =>
  fs
    .writeFile(`${Path.ctrunner.dir}/config.js`, defaultConfig)
    .catch(() => exit(false));

const createTasks = async () =>
  fs.mkdir(`${Path.ctrunner.dir}/tasks`).catch(() => exit(false));

const exit = (pass: boolean) => {
  line.killLoader();
  line.changeSymbol(pass ? Icons.check : Icons.times);
  line.close();
  process.exit();
};

const defaultConfig = `export default {
  name: '${path.basename(process.cwd())}'
}`;

const defaultBatches = `export default [];`;
