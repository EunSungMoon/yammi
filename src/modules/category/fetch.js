import fetcher from '@system/fetcher';

export const getCategories = async (query, option) => {
  const fetchRes = await fetcher(`/board/category_list`, {
    ...option,
    method: 'GET',
    querystring: query,
  });
  return fetchRes;
};
