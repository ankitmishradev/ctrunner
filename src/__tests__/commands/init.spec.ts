import fs from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { exec as execLegacy } from 'node:child_process';

import { Icons } from '../../logger';

const exec = promisify(execLegacy);
const mockDir = path.resolve(process.cwd(), '__mocks__/init');
const watcherDir = path.resolve(mockDir, '.watcher');

describe('Run watcher command with init option', () => {
  afterAll(async () => {
    await fs.rm(watcherDir, { force: true, recursive: true });
  });

  it('should create watcher setup', async () => {
    const initOutput = await exec('watcher -i', { cwd: mockDir });

    expect(initOutput.stdout).toContain(Icons.check);
  });

  it('should fail creating watcher setup', async () => {
    const initOutput = await exec('watcher -i', { cwd: mockDir });

    expect(initOutput.stdout).toContain(Icons.times);
  });
});
