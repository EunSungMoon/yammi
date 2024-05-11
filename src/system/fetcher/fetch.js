import getConfig from 'next/config';

import NetworkError from './networkError';
import mSleep from '../mSleep';
import buildQuery from '../stringUtils/buildQuery';

const { apiHost, apiVersion } = getConfig().publicRuntimeConfig;

const DEFAULT_OPTIONS = {
  method: 'GET',
  timeoutMs: 30000,
  delayMs: 150,
  headers: {
    'Content-Type': 'application/json',
  },
  pagination: undefined,
  querystring: undefined,
  body: undefined,
  contentType: undefined,
  debugNetwork: true,
};

const logger = (msg, debugNetwork) => {
  if (!debugNetwork) {
    return;
  }
  console.log(msg);
};

export default async function fetcher(url, options = {}) {
  if (typeof url === 'undefined') {
    throw new NetworkError('URL 값은 필수입니다.');
  }

  // 오브젝트 새로생성해야합니다.
  const mergedOpt = Object.assign({}, DEFAULT_OPTIONS);
  const debugNetwork = mergedOpt.debugNetwork;
  logger(
    '====================[NETWORK REQUEST]====================',
    debugNetwork,
  );
  // 메소드 처리
  if (options.method !== undefined) {
    mergedOpt.method = options.method.toUpperCase();
  }
  logger(`METHOD:\t\t\t${options.method}`, debugNetwork);
  // 메소드 처리 [E]

  // URL 조합
  let requestUrl = '';
  const params = Object.assign({}, options.pagination, options.querystring);
  if (url.startsWith('http')) {
    requestUrl = url + buildQuery(params);
  } else {
    requestUrl = apiHost + url + buildQuery(params);
  }
  logger(`URL:\t\t\t${requestUrl}`, debugNetwork);
  // URL 조합[E]

  // 바디 체크
  if (options.body !== undefined) {
    if (options.contentType === 'form') {
      mergedOpt.headers = {
        // 안보내면 알아서 넣어준다. 오히려 넣으면 boundary 설정이 안되서 동작하지 않음.
        // 'Content-Type': 'multipart/form-data;',
      };
    }
    mergedOpt.body = options.body;
    if (typeof mergedOpt.body === 'object') {
      mergedOpt.body = JSON.stringify(mergedOpt.body);
    }
    logger(`BODY:\t\t\t${mergedOpt.body}`, debugNetwork);
  }
  // 바디 체크[E]

  // 엑세스토큰 체크
  if (options.accessToken !== undefined) {
    // 토큰 expires확인
    mergedOpt.headers = Object.assign(
      { Authorization: 'Bearer ' + options.accessToken },
      mergedOpt.headers,
    );
    logger(`AUTHORIZATION:\t${!!options.accessToken}`, debugNetwork);
  }
  // 엑세스토큰 체크 [E]

  const startTs = Date.now();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), mergedOpt.timeoutMs);
  let response;
  try {
    response = await fetch(requestUrl, {
      signal: controller.signal,
      method: mergedOpt.method,
      body:
        mergedOpt.method === 'POST' || mergedOpt.method === 'PATCH'
          ? mergedOpt.body
          : undefined,
      headers: mergedOpt.headers,
    });
  } catch (err) {
    if (err.name === 'AbortError') {
      logger(
        '====================[NETWORK TIMEOUT]====================',
        debugNetwork,
      );
    } else {
      console.error(err);
    }
    throw err;
  }
  clearTimeout(timeoutId);

  // JSON전 에러체크
  if (!response.ok) {
    console.error(JSON.stringify(response));
    throw new NetworkError('E5000000');
  }
  // JSON전 에러체크[E]

  const data = await response.json();
  // 데이터가 없거나, 에러가 존재하면 에러처리 해야한다.
  if (data === undefined || data === null) {
    throw new NetworkError('E5000001');
  }
  if (data.error !== undefined) {
    if (data.error) {
      if (Array.isArray(data.error.errors)) {
        throw new NetworkError(
          data.error.errors[0].message,
          data.error.errors[0].code,
        );
      } else {
        throw new NetworkError(data.error.code);
      }
    }
  }
  if (data.data === undefined || data.data === null) {
    throw new NetworkError('E5000001');
  }
  // 데이터가 없거나, 에러가 존재하면 에러처리 해야한다. [E]

  logger(`OUTPUT ID:\t\t${data.id}`, debugNetwork);
  logger(`OUTPUT DATA:\t${JSON.stringify(data.data)}`, debugNetwork);
  logger(
    '====================[NETWORK REQ END]====================',
    debugNetwork,
  );

  // 총 걸린시간을 기준으로 나머지 시간만큼 잠깐 잤다가 리턴한다.
  const diff = Date.now() - startTs;
  logger(`REQUESTED:\t\t${diff}ms`, debugNetwork);
  if (diff < mergedOpt.delayMs) {
    const sleepMs = mergedOpt.delayMs - diff;
    await mSleep(sleepMs);
    logger(`SLEPT:\t\t\t${sleepMs}ms`, debugNetwork);
  }

  return data;
}
