import fetcher from '@system/fetcher';

export const getMyBookmarkedList = async (query, option) => {
  const fetchRes = await fetcher(`/user/mybookmark_list`, {
    ...option,
    method: 'GET',
    querystring: query,
  });
  return fetchRes;
};

export const getMyReviewList = async (query, option) => {
  const fetchRes = await fetcher(`/user/myreviewed_list`, {
    ...option,
    method: 'GET',
    querystring: query,
  });
  return fetchRes;
};

export const postFavorite = async (body, option) => {
  const fetchRes = await fetcher(`/user/bookmarkupdate`, {
    ...option,
    method: 'POST',
    body: JSON.stringify(body),
  });
  return fetchRes;
};

export const getUser = async (option, query) => {
  const fetchRes = await fetcher(`/user/mypage`, {
    ...option,
    method: 'GET',
    querystring: query,
  });
  return fetchRes;
};

export const postUser = async (body, option) => {
  const fetchRes = await fetcher(`/user/nicknamechange`, {
    ...option,
    method: 'POST',
    body: JSON.stringify(body),
  });
  return fetchRes;
};
