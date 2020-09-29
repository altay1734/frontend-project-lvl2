import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__', 'fixtures', filename);
const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  + timeout: 20
  - timeout: 50
  + verbose: true
}`;

test('genDiff.json', () => {
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');
  expect(genDiff(before, after)).toEqual(expected);
});

test('genDiff.yaml', () => {
  const before = getFixturePath('before.yaml');
  const after = getFixturePath('after.yaml');
  expect(genDiff(before, after)).toEqual(expected);
});
