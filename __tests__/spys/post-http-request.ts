import { IPostHttpRequest } from '../../src/utils/protocols/post-http-request';
import { THttpRequest } from '../../src/@types/http-request';

export class PostHttpRequestSpy implements IPostHttpRequest {
  public data: any;
  public callsCount: number;
  public httpRequest: THttpRequest<any>;

  constructor() {
    this.callsCount = 0;
    this.data = {
      id: 'any-id',
    };
  }

  async post(httpRequest: any): Promise<any> {
    this.callsCount++;
    this.httpRequest = httpRequest;

    return this.data;
  }
}

export const makePostHttpRequestSpy = () => {
  return new PostHttpRequestSpy();
};
