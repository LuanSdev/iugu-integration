import { THttpRequest } from '../../@types/http-request';

export interface IPutHttpRequest {
  put<TResponse, TParams>(
    httpRequest: THttpRequest<TParams>
  ): Promise<TResponse>;
}
