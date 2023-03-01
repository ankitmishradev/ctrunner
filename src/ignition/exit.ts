import { deleteTemp, deleteTSConfig } from '../fs';
import { Icons, Line } from '../logger';

export const exitIgnition = (line: Line) => {
  line.killLoader();
  line.write(`${Icons.times} Couldn't start watcher.`);
  deleteTSConfig();
  deleteTemp();
  line.close();
  process.exit(1);
};
