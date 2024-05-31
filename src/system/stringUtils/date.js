import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import isDateObject from '../dateUtils/isDateObject';

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
