#!/usr/bin/env node
const program = require('commander');
const genDiff = require('../index.js').default;
const fs = require('fs');

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-v, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const firstFileReaded = fs.readFileSync(firstConfig, 'utf8');
    const firstFile = JSON.parse(firstFileReaded);
    const secondFileReaded = fs.readFileSync(secondConfig, 'utf8');
    const secondFile = JSON.parse(secondFileReaded);
    console.log(genDiff(firstFile, secondFile));
  });

program.parse(process.argv);
