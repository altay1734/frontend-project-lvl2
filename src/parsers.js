import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default (fileFormat, fileData) => {
  const format = path.extname(fileFormat);
  if (format === '.yml' || format === '.yaml') {
    return yaml.safeLoad(fileData);
  } if (format === '.ini') {
    return ini.parse(fileData);
  }
  return JSON.parse(fileData);
};
