import path from 'path';
import yaml from 'js-yaml';

export default (fileFormat, fileData) => {
  const format = path.extname(fileFormat);
  if (format === '.yml' || format === '.yaml') {
    return yaml.safeLoad(fileData);
  }
  return JSON.parse(fileData);
};
