import fs from 'fs';
import { Path } from '../utils';

export const deleteTSConfig = () => {
  if (fs.existsSync(Path.tsConfigFile)) fs.unlinkSync(Path.tsConfigFile);
};
