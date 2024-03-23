import CookieKey from './key';
import CookieValue from './value';

export default class Getter {
  constructor(_option = {}) {
    // 클라도 아닌데 req도 없으면 쿠키를 세팅할 곳이 없으므로 에러다.
    if (typeof document === 'undefined' && _option.req === undefined) {
      throw new Error('Cookie setting error');
    }
    // 클라인데 req가 있는 말도안되는 경우도 에러다.
    // if (typeof document !== 'undefined' && this._option.req !== undefined) {
    //   throw new Error('Cookie setting error');
    // }
    this._option = _option;
  }

  get(candidate) {
    let ret;

    const rawCookie =
      this._option.req?.headers.cookie ||
      (typeof document !== 'undefined' && document.cookie) ||
      '';

    const cookies = rawCookie.split('; ');
    for (const cookie of cookies) {
      const parts = cookie.split('=');
      let rawValue = parts.slice(1).join('=');

      if (rawValue[0] === '"') {
        rawValue = rawValue.slice(1, -1);
      }

      const key = new CookieKey(parts[0]);
      const value = new CookieValue(rawValue);

      if (key.read() === candidate) {
        ret = value.read();
        break;
      }
    }
    return ret;
  }
}
