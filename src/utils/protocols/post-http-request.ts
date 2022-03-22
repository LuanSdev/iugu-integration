import { THttpRequest } from '../../@types/http-request';

export interface IPostHttpRequest {
  post<TResponse, TParams>(
    httpRequest: THttpRequest<TParams>
  ): Promise<TResponse>;
}
