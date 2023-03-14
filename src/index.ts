#!/usr/bin/env node
import { Command } from 'commander';
import { run } from './commands';
import { Text } from './utils';

const program = new Command();

program.name('watcher').description(Text.command.description);

run(program);

program.parse(process.argv);
