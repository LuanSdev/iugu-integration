import axios from 'axios';

import { THttpRequest } from '../@types/http-request';
import { IPostHttpRequest } from './protocols/post-http-request';

class AxiosPostHttpRequest implements IPostHttpRequest {
  async post<TResponse, TParams>(
    httpRequest: THttpRequest<TParams>
  ): Promise<TResponse> {
    const { query, url } = httpRequest;

    const { data } = await axios.post(url, { params: { query } });

    return data;
  }
}

const makeSut = () => {
  const sut = new AxiosPostHttpRequest();

  return { sut };
};

describe('Axios Http request', () => {
  it('Should throws if no url is provided', async () => {
    const { sut } = makeSut();

    //eslint-disable-next-line
    //@ts-ignore
    const promise = sut.post();

    await expect(promise).rejects.toThrow();
  });
});
