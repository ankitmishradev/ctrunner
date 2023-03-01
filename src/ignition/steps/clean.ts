import fs from 'node:fs';

import { Icons, Line } from '../../logger';
import { Path } from '../../utils';
import { exitIgnition } from '../exit';

export const clean = async (line: Line, cb: () => void) => {
  line.write(`${Icons.bullet} Cleaning temporary files`);

  fs.unlink(Path.tsConfigFile, err => {
    if (err) exitIgnition(line);
    else cb();
  });
};
