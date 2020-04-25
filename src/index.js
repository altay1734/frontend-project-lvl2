exports._esModule = true;
exports.default = void 0;

exports.default = (before, after) => {
  const result = ['{\n'];
  const entriesBefore = Object.entries(before);
  const keysAfter = Object.keys(after);
  const keysBefore = Object.keys(before);
  const cb = (acc, [key, value]) => {
    if (keysAfter.includes(key) && after[key] === value) {
      acc += `    ${key}: ${value}\n`;
    } else if (keysAfter.includes(key) && after[key] !== value) {
      acc += `  + ${key}: ${after[key]}\n`;
      acc += `  - ${key}: ${value}\n`;
    } else if (!keysAfter.includes(key)) {
      acc += `  - ${key}: ${before[key]}\n`;
    }
    return acc
  };
  result.push(entriesBefore.reduce(cb, ''));

  const addedKeys = keysAfter.filter((key) => {
    if (!keysBefore.includes(key)) {
      result.push(`  + ${key}: ${after[key]}\n`);
    }
  });
  result.push('}');
  return result.join('');
};
