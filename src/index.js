import fs from 'fs';
import parsers from './parsers.js';

export default (before, after) => {
  const firstFileReaded = fs.readFileSync(before, 'utf8');
  const secondFileReaded = fs.readFileSync(after, 'utf8');
  const firstFile = parsers(before, firstFileReaded);
  const secondFile = parsers(after, secondFileReaded);
  const result = [];
  const entriesBefore = Object.entries(firstFile);
  const keysAfter = Object.keys(secondFile);
  const keysBefore = Object.keys(firstFile);
  result.push(entriesBefore.filter(([key, value]) => {
    if (keysAfter.includes(key) && secondFile[key] === value) {
      result.push(`    ${key}: ${value}\n`);
    } else if (keysAfter.includes(key) && secondFile[key] !== value) {
      result.push(`  + ${key}: ${secondFile[key]}\n`);
      result.push(`  - ${key}: ${value}\n`);
    } else if (!keysAfter.includes(key)) {
      result.push(`  - ${key}: ${firstFile[key]}\n`);
    }
    return '';
  }));

  result.push(keysAfter.filter((key) => {
    if (!keysBefore.includes(key)) {
      result.push(`  + ${key}: ${secondFile[key]}\n`);
    }
    return '';
  }));
  const sortedResult = result.sort((a, b) => {
    if (a.slice(3) === b.slice(3)) {
      return 0;
    }
    return a.slice(3) > b.slice(3) ? 1 : -1;
  });
  sortedResult.unshift('{\n');
  sortedResult.push('}');
  return sortedResult.join('');
};
