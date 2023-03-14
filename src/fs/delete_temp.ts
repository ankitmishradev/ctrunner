import fs from 'node:fs';
import { Path } from '../utils';

export const deleteTemp = () => {
  if (fs.existsSync(Path.watcher.temp))
    fs.rmSync(Path.watcher.temp, { recursive: true, force: true });
};
