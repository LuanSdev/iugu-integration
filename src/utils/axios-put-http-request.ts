import axios from 'axios';

import { THttpRequest } from '../@types/http-request';
import { IPutHttpRequest } from './protocols/put-http-request';

export class AxiosPutHttpRequest implements IPutHttpRequest {
  async put<TResponse, TParams>(
    httpRequest: THttpRequest<TParams>
  ): Promise<TResponse> {
    const { query, url } = httpRequest;

    const { data } = await axios.put(url, { params: { query } });

    return data;
  }
}
