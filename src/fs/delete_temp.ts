import fs from 'node:fs';
import { Path } from '../utils';

export const deleteTemp = () => {
  if (fs.existsSync(Path.ctrunner.temp))
    fs.rmSync(Path.ctrunner.temp, { recursive: true, force: true });
};
