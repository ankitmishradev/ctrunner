import fs from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { exec as execLegacy } from 'node:child_process';

import { Icons } from '../../logger';

const exec = promisify(execLegacy);
const mockDir = path.resolve(process.cwd(), '__mocks__/init');
const watcherDir = path.resolve(mockDir, '.ctrunner');

describe('Run ctrunner command with init option', () => {
  afterAll(async () => {
    await fs.rm(watcherDir, { force: true, recursive: true });
  });

  it('should create ctrunner setup', async () => {
    const initOutput = await exec('ctrunner -i', { cwd: mockDir });

    expect(initOutput.stdout).toContain(Icons.check);
  });

  it('should fail creating ctrunner setup', async () => {
    const initOutput = await exec('ctrunner -i', { cwd: mockDir });

    expect(initOutput.stdout).toContain(Icons.times);
  });
});
