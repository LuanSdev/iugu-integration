import axios from 'axios';

import { IGetHttpRequest, THttpRequest } from './protocols/get-http-request';

class AxiosGetHttpRequest implements IGetHttpRequest {
  async get<TResponse, TParams>(
    httpRequest: THttpRequest<TParams>
  ): Promise<TResponse> {
    const { query, url } = httpRequest;

    const { data } = await axios.get(url, { params: { query } });

    return data;
  }
}

const makeSut = () => {
  const sut = new AxiosGetHttpRequest();

  return { sut };
};

describe('Axios Http request', () => {
  it('Should throws if no url is provided', async () => {
    const { sut } = makeSut();

    //eslint-disable-next-line
    //@ts-ignore
    const promise = sut.get();

    await expect(promise).rejects.toThrow();
  });
});
