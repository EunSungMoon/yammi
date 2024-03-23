const ErrorMap = Object.freeze({
  E4000000: '잘못된 요청입니다.',
});

function getMessage(code) {
  return ErrorMap[code] || 'Unknown Error';
}

export default ErrorMap;
export { getMessage };
