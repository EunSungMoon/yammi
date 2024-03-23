import ErrorMap, { getMessage } from './ErrorMap';

export default class ServerError extends Error {
  constructor(id, code) {
    super(getMessage(code));
    Object.setPrototypeOf(this, ServerError.prototype);
    this.code = code;
    this.id = id;
    this.message = getMessage(code);
  }
}
