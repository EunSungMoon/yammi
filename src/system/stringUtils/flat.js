import isDateObject from '../dateUtils/isDateObject';

const DEFAULT_DELIMITER = '.';

function _flat(resultTotal, original, stack, prevKey, separator) {
  if (resultTotal === undefined) {
    resultTotal = {};
  }

  if (Object.values(original).length <= 0 && prevKey !== undefined) {
    resultTotal[prevKey] = original;

    return original;
  }

  Object.entries(original).forEach(([key, value]) => {
    const newKey = prevKey ? prevKey + separator + key : key;
    if (typeof value === 'object' && value !== null) {
      stack.forEach(s => {
        if (value === s && !isDateObject(value)) {
          value = '[Circular]';
        }
      });
      stack.push(value);

      if (typeof value === 'object' && !isDateObject(value)) {
        return _flat(resultTotal, value, stack, newKey, separator);
      }
    }
    resultTotal[newKey] = value;
  });
}
export default function flat(obj, delimiter) {
  if (typeof obj !== 'object' || isDateObject(obj)) {
    console.debug('obj is not object or obj is date object.');
    return obj;
  }

  const separator = delimiter || DEFAULT_DELIMITER;

  const result = _flat(undefined, obj, [obj], undefined, separator);

  return result;
}
