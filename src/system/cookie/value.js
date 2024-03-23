export default class CookieValue {
  constructor(_original) {
    this._original = _original;
  }

  serialize() {
    return encodeURIComponent(this._original).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent,
    );
  }

  read() {
    return this._original.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  }
}
