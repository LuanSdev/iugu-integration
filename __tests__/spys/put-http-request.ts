import { IPutHttpRequest } from '../../src/utils/protocols/put-http-request';
import { THttpRequest } from '../../src/@types/http-request';

export class PutHttpRequestSpy implements IPutHttpRequest {
  public data: any;
  public callsCount: number;
  public httpRequest: THttpRequest<any>;

  constructor() {
    this.callsCount = 0;
    this.data = {
      id: 'any-id',
    };
  }

  async put(httpRequest: any): Promise<any> {
    this.callsCount++;
    this.httpRequest = httpRequest;

    return this.data;
  }
}

export const makePutHttpRequestSpy = () => {
  return new PutHttpRequestSpy();
};
