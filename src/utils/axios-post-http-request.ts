import axios from 'axios';

import { THttpRequest } from '../@types/http-request';
import { IPostHttpRequest } from './protocols/post-http-request';

export class AxiosPostHttpRequest implements IPostHttpRequest {
  async post<TResponse, TParams>(
    httpRequest: THttpRequest<TParams>
  ): Promise<TResponse> {
    const { query, url } = httpRequest;

    const { data } = await axios.post(url, { params: { query } });

    return data;
  }
}
