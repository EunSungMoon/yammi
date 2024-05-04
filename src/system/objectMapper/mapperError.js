import ServerError from '../serverError';

export default class MapperError extends ServerError {
  constructor(m, id) {
    super(m);
    this.id = id;
  }
}
