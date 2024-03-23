import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import isDateObject from '../dateUtils/isDateObject';
import isDateFormat from '../stringUtils/isDateFormat';

// export const dateFormatter = (date, dateFormat = 'yyyy-MM-dd') => {
//   if (!date) {
//     throw new Error('date is undefined or null.');
//   }

//   if (isDateFormat(date)) {
//     return format(new Date(date), dateFormat);
//   } else if (isDateObject(date)) {
//     return format(date, dateFormat);
//   } else {
//     return format(date, dateFormat);
//   }
// };

export const dateFormatter = (date = '', dateFormat = 'yyyy-MM-dd') => {
  if (!date) {
    return date;
  }

  if (
    typeof date === 'string' ||
    (typeof date === 'object' && date instanceof Date)
  ) {
    return format(new Date(date), dateFormat);
  } else {
    return format(date, dateFormat);
  }
};

// export const dateAndTimeFormatter = (date, dateFormat = 'yyyy-MM-dd HH:mm') => {
//   if (!date) {
//     throw new Error('date is undefined or null.');
//   }

//   if (isDateFormat(date)) {
//     return format(new Date(date), dateFormat);
//   } else if (isDateObject(date)) {
//     return format(date, dateFormat);
//   } else {
//     return format(date, dateFormat);
//   }
// };

// export const DateRangeFormatter = (arr) => {
//   return dateFormatter(arr[0]) + '~' + dateFormatter(arr[1]);
// };

// export const StringToDateRanger = (str) => {
//   return str
//     .split('~')
//     .map((item) => dateFormatter(item))
//     .join('');
// };

export const dateAndTimeFormatter = (
  date = '',
  dateFormat = 'yyyy-MM-dd HH:mm',
) => {
  if (!date) {
    return date;
  }

  if (
    typeof date === 'string' ||
    (typeof date === 'object' && date instanceof Date)
  ) {
    return format(new Date(date), dateFormat, { locale: ko });
  } else {
    return format(date, dateFormat, { locale: ko });
  }
};

export const DateRangeFormatter = arr => {
  return dateFormatter(arr[0]) + '~' + dateFormatter(arr[1]);
};

export const StringToDateRanger = str => {
  return str
    .split('~')
    .map(item => dateFormatter(item))
    .join('');
};
export function getTimerFormat(seconds, formatType = 'mm:ss') {
  return format(new Date(seconds * 1000), formatType);
}
