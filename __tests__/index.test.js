const genDiff = require('../src/index.js').default;

test('genDiff', () => {
  const before = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  const after = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };
  const expected2 = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
  expect(genDiff(before, after)).toEqual(expected2);
});
