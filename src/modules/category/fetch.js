import fetcher from '@system/fetcher';

import { RESPONSE_KEY as categoryListResponseKey } from './schema/categoryList';

export const getCategories = async (query, option) => {
  const fetchRes = await fetcher(`/category_list`, {
    ...option,
    method: 'GET',
    querystring: query,
  });
  return fetchRes;
};
