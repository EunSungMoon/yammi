import ServerError from '../serverError';

export default class NetworkError extends ServerError {
  constructor(id) {
    super(id, id);
    Object.setPrototypeOf(this, NetworkError.prototype);
    this.id = id;
  }
}
