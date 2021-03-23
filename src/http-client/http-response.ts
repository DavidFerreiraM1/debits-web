import { IHttpResponse } from './interfaces';

export function httpResponse<T>(
  success: boolean,
  statusCode: number,
  data: T,
  error: unknown,
): IHttpResponse<T> {
  return {
    success,
    statusCode,
    data,
    error,
  };
}
