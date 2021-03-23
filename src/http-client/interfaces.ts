export interface IHttpResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  error: unknown;
}
