import fetcher from '@system/fetcher';

import { RESPONSE_KEY as itemsResponseKey } from './schema';

export const getItems = async (query, option) => {
  const fetchRes = await fetcher('/hello', itemsResponseKey, {
    ...option,
    method: 'GET',
    queryString: { ...query },
  });
  return fetchRes;
};
