import CookieKey from './key';
import CookieValue from './value';

//TODO: env확인 필요

export default class Setter {
  constructor(_option = {}) {
    // 클라도 아닌데 req도 없으면 쿠키를 세팅할 곳이 없으므로 에러다.
    if (
      typeof document === 'undefined' &&
      _option.req === undefined &&
      _option.res === undefined
    ) {
      throw new Error('Cookie setting error');
    }
    // 클라인데 req가 있는 말도안되는 경우도 에러다.
    // if (typeof document !== 'undefined' && this._option.req !== undefined) {
    //   throw new Error('Cookie setting error');
    // }
    this._option = _option;
  }

  set(
    candidate,
    originalValue,
    directiveOption = {
      sameSite: 'None',
      secure: process.env.NODE_ENV === 'production',
    },
  ) {
    const key = new CookieKey(candidate).serialize();
    const value = new CookieValue(originalValue).serialize();
    let res = `${key}=${value}`;

    const directives = {};

    if (directiveOption.maxAge !== undefined) {
      directives['Max-Age'] = directiveOption.maxAge;
    }

    if (directiveOption.expires !== undefined) {
      directives.Expires = directiveOption.expires;
    }

    if (directiveOption.domain !== undefined) {
      directives.Domain = directiveOption.domain;
    }

    if (
      directiveOption.httpOnly !== undefined &&
      directiveOption.httpOnly === true
    ) {
      directives.HttpOnly = true;
    }

    if (
      directiveOption.secure !== undefined &&
      directiveOption.secure === true
    ) {
      directives.Secure = true;
    }

    if (directiveOption.sameSite !== undefined) {
      directives.SameSite = directiveOption.sameSite;
    }

    directives.Path = '/';

    if (Object.keys(directives).length > 0) {
      res += '; ';
      res += Object.entries(directives)
        .map(([k, v]) => {
          switch (typeof v) {
            case 'object': // Date밖에 없다.
              return `${k}=${v.toUTCString()}`;
            case 'number':
              return `${k}=${v}`;
            case 'boolean':
              return k;
            case 'string':
              return `${k}=${v.split(';')[0]}`;
          }
        })
        .join('; ');
    }

    if (typeof document === 'undefined') {
      // 클라이언트가 쿠키를 세팅할 수 있게 해준다.
      if (this._option.res !== undefined) {
        this._option.res.setHeader('Set-Cookie', res);
      }

      // 서버에서 req로부터 쿠키를 갖고오게 되는 경우 변경된 쿠키로 사용할 수 있게 한다.

      if (this._option.req !== undefined) {
        const cookies = this._option.req.headers.cookie?.split('; ') || [];
        let searchedIdx = -1;
        for (let idx = 0; idx < cookies.length; idx++) {
          const cookie = cookies[idx];

          const parts = cookie.split('=');
          let rawValue = parts.slice(1).join('=');

          if (rawValue[0] === '"') {
            rawValue = rawValue.slice(1, -1);
          }

          const sKey = new CookieKey(parts[0]);

          // 이미 해당 쿠키에 있는 경우는 그 값을 삭제한다.
          if (sKey.read() === candidate) {
            searchedIdx = idx;
            break;
          }
        }
        // 찾은경우, 해당 인덱스를 삭제한다.
        if (searchedIdx !== -1) {
          cookies.splice(searchedIdx, 1);
        }
        // 새로운 키를 집어넣는다.
        cookies.push(`${key}=${value}`);
        // 새로운 쿠키로 리셋
        this._option.req.headers.cookie = cookies.join('; ');
      }
    } else {
      document.cookie = res;
    }
  }
}
