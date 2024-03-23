export default class Deleter {
  constructor(_option = {}) {
    // 클라도 아닌데 res도 없으면 쿠키를 세팅할 곳이 없으므로 에러다.
    if (typeof document === 'undefined' && this._option.res === undefined) {
      throw new Error('Cookie setting error');
    }
    // 클라인데 res가 있는 말도안되는 경우도 에러다.
    // if (typeof document !== 'undefined' && this._option.res !== undefined) {
    //   throw new Error('Cookie setting error');
    // }
    this._option = _option;
  }

  delete(candidate) {
    const res = `${candidate}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

    if (typeof document === 'undefined') {
      if (this._option.res !== undefined) {
        this._option.res.setHeader('Set-Cookie', res);
      }
    } else {
      document.cookie = res;
    }
  }
}
