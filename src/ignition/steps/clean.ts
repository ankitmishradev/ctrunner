import fs from 'node:fs/promises';

import { Icons, Line } from '../../logger';
import { Code, Path } from '../../utils';
import { exitIgnition } from '../exit';

export const clean = async (line: Line) => {
  line.write(`${Icons.bullet} Cleaning temporary files`);

  fs.unlink(Path.tsConfigFile).catch(() =>
    exitIgnition(line, Code.ignition.clean),
  );
};
