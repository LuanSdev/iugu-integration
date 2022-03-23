import { THttpRequest } from '../../@types/http-request';
import { IPostHttpRequest } from '../../utils/protocols/post-http-request';
import { IuguInvoiceCreateRequest } from '../../@types';
import { CreateInvoice } from './create-invoice';

class PostHttpRequestSpy implements IPostHttpRequest {
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

const makePostHttpRequestSpy = () => {
  return new PostHttpRequestSpy();
};

const makeSut = () => {
  const postHttpRequestSpy = makePostHttpRequestSpy();
  const sut = new CreateInvoice({ postHttpRequest: postHttpRequestSpy });

  return { sut, postHttpRequestSpy };
};

describe('Create invoice', () => {
  it('Should throw if no params is provided', async () => {
    const { sut } = makeSut();

    //eslint-disable-next-line
    //@ts-ignore
    const promise = sut.create();

    await expect(promise).rejects.toThrow();
  });
});
