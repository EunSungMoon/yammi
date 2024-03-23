export default class CookieKey {
  constructor(_key) {
    this._key = _key;
  }

  serialize() {
    return encodeURIComponent(this._key)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape);
  }

  read() {
    return this._key.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  }
}
