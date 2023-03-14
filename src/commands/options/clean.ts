import fs from 'node:fs/promises';

import { Icons, Line } from '../../logger';
import { Path } from '../../utils';

const line = new Line();

export const clean = () => {
  line.write(`${Icons.bullet} Clean up watcher`);
  line.startLoader();
  fs.readdir(Path.watcher.dir)
    .then(deleteTemp)
    .then(deleteConfig)
    .then(() => exit(true))
    .catch(reason => (reason.code === 'ENOENT' ? undefined : exit(false)));
};

const deleteTemp = async () =>
  fs
    .rm(Path.watcher.temp, { force: true, recursive: true })
    .catch(reason => (reason.code === 'ENOENT' ? undefined : exit(false)));

const deleteConfig = async () =>
  fs
    .unlink(Path.tsConfigFile)
    .catch(reason => (reason.code === 'ENOENT' ? undefined : exit(false)));

const exit = (pass: boolean) => {
  line.killLoader();
  line.changeSymbol(pass ? Icons.check : Icons.times);
  line.close();
  process.exit();
};
