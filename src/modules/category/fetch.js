import fetcher from '@system/fetcher';

//카테고리 리스트
export const getCategories = async (query, option) => {
  const fetchRes = await fetcher(`/board/category_list`, {
    ...option,
    method: 'GET',
    querystring: query,
  });
  return fetchRes;
};
