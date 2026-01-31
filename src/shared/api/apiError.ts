import { HTTPStatus } from './httpStatus';

export class ApiError extends Error {
  status: HTTPStatus;
  info?: unknown;

  constructor(status: HTTPStatus, message: string, info?: unknown) {
    super(message);
    this.status = status;
    this.info = info;
  }
}
