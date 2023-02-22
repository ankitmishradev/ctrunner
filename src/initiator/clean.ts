import fs from 'node:fs';

import { Icons, Line } from '../logger';
import { Paths } from '../utils';

export const clean = async (line: Line, cb: () => void) => {
  line.clean();
  line.write(`${Icons.bullet} Cleaning temporary files`);

  fs.unlink(Paths.tsConfigFile, err => {
    if (err) process.exit(1);
    else
      fs.rm(Paths.tempDir, { recursive: true, force: true }, err => {
        if (err) process.exit(1);
        else cb();
      });
  });
};
