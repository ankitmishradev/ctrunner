import { deleteTemp, deleteTSConfig } from '../fs';
import { colored, Icons, Line } from '../logger';

export const exitIgnition = (line: Line, code: string) => {
  line.killLoader();
  line.write(`${Icons.times} Couldn't start watcher. ${colored(`[${code}]`)}`);
  deleteTSConfig();
  deleteTemp();
  line.close();
  process.exit(1);
};
