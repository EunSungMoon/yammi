import fetcher from '@system/fetcher';

export const getResturantList = async (query, option) => {
  const fetchRes = await fetcher(`/board/rest_cate_list`, {
    ...option,
    method: 'GET',
    querystring: query,
  });
  return fetchRes;
};

export const getRandomResturant = async (query, option) => {
  const fetchRes = await fetcher(`/board/radom_rest`, {
    ...option,
    method: 'GET',
    querystring: query,
  });
  return fetchRes;
};

export const getResturant = async (params, option) => {
  const { id } = params;
  const fetchRes = await fetcher(`/board/rest_detail/${id}`, {
    ...option,
    method: 'GET',
  });
  return fetchRes;
};

export const getResturantListSearch = async (query, option) => {
  const fetchRes = await fetcher(`/board/search_list`, {
    ...option,
    method: 'GET',
    querystring: query,
  });
  return fetchRes;
};

export const getReviewList = async (params, option) => {
  const { id } = params;
  const fetchRes = await fetcher(`/board/review_list/${id}`, {
    ...option,
    method: 'GET',
  });
  return fetchRes;
};

export const createReivew = async (body, option) => {
  const fetchRes = await fetcher(`/board/review_create`, {
    ...option,
    method: 'POST',
    body: JSON.stringify(body),
  });
  return fetchRes;
};

export const updateReview = async (params, body, option) => {
  const { id } = params;
  const fetchRes = await fetcher(`/board/review_update/${id}`, {
    ...option,
    method: 'PATCH',
    body: JSON.stringify(body),
  });
  return fetchRes;
};

export const deleteReview = async (params, option) => {
  const { id } = params;
  const fetchRes = await fetcher(`/board/review_delete/${id}`, {
    ...option,
    method: 'DELETE',
  });
  return fetchRes;
};
