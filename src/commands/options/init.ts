import fs from 'fs';
import path from 'path';

import { Icons } from '../../logger';

const defaultConfig = `export default {
  name: '${path.basename(process.cwd())}'
}`;

const defaultBatches = `export default [];`;

export const init = () => {
  const root = `${process.cwd()}/.watcher`;
  try {
    fs.mkdirSync(root);
    fs.mkdirSync(`${root}/tasks`);
    fs.writeFileSync(`${root}/config.js`, defaultConfig);
    fs.writeFileSync(`${root}/batches.js`, defaultBatches);
    console.log(`${Icons.check} Setup complete.`);
  } catch (error) {
    console.log(`${Icons.times} Setup failed. Perform setup manually.`);
    process.exit(1);
  }
};
