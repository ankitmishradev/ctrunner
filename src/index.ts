#!/usr/bin/env node
import { Command } from 'commander';
import { run } from './commands';

const program = new Command();

program.name('watcher').description('Watch for changes in dependency');

run(program);

program.parse(process.argv);
