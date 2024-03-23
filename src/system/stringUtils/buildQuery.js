export default function buildQuery(queryObj) {
  let ret;
  const queryKeys = Object.keys(queryObj);
  if (queryKeys.length > 0) {
    ret =
      '?' +
      queryKeys
        .filter(k => queryObj[k] !== null && queryObj[k] !== undefined)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(queryObj[k])}`)
        .join('&');
  } else {
    ret = '';
  }
  return ret;
}
