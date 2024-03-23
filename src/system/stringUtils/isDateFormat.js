// eslint-disable-next-line import/no-unresolved
import isDate from 'validator/lib/isDate';

export default function isDateFormat(val) {
  if (typeof val !== 'string') {
    throw new Error('val is not string');
  }

  return isDate(val);
}
