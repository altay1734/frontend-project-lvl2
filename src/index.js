exports.esModule = true;

exports.default = (before, after) => {
  const result = ['{\n'];
  const entriesBefore = Object.entries(before);
  const keysAfter = Object.keys(after);
  const keysBefore = Object.keys(before);
  result.push(entriesBefore.filter(([key, value]) => {
    if (keysAfter.includes(key) && after[key] === value) {
      result.push(`    ${key}: ${value}\n`);
    } else if (keysAfter.includes(key) && after[key] !== value) {
      result.push(`  + ${key}: ${after[key]}\n`);
      result.push(`  - ${key}: ${value}\n`);
    } else if (!keysAfter.includes(key)) {
      result.push(`  - ${key}: ${before[key]}\n`);
    }
    return '';
  }));

  result.push(keysAfter.filter((key) => {
    if (!keysBefore.includes(key)) {
      result.push(`  + ${key}: ${after[key]}\n`);
    }
    return '';
  }));
  result.push('}');
  return result.join('');
};
