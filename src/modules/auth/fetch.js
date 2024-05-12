import fetcher from '@system/fetcher';

export async function login(body, option) {
  const fetchRes = await fetcher(`/auth/login`, {
    ...option,
    method: 'POST',
    body: JSON.stringify(body),
  });

  return fetchRes;
}
