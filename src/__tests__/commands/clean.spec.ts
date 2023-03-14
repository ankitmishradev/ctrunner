import path from 'node:path';
import { exec as execLegacy } from 'node:child_process';
import { promisify } from 'node:util';

import { Icons } from '../../logger';

const exec = promisify(execLegacy);
const mockDir = path.resolve(process.cwd(), '__mocks__/clean');

describe('Run ctrunner command with clean option', () => {
  beforeAll(async () => {
    await exec('ctrunner -i', { cwd: mockDir });
  });

  it('should clean ctrunner directory', async () => {
    const cleanOutput = await exec('ctrunner -c', { cwd: mockDir });

    expect(cleanOutput.stdout).toContain(Icons.check);
  });
});
