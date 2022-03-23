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

  postHttpRequestSpy.data = { status: 'SUCCESS' };

  const sut = new CreateInvoice({ postHttpRequest: postHttpRequestSpy });

  return { sut, postHttpRequestSpy };
};

const VALID_REQUEST: IuguInvoiceCreateRequest = {
  customer_id: 'valid-id',
  due_date: new Date(),
  email: 'valid-email',
  item: [{ quantity: 1, price_cents: 1 }],
  payable_with: ['all'],
};

describe('Create invoice', () => {
  it('Should throw if no postHttpRequest is provided', async () => {
    //eslint-disable-next-line
    //@ts-ignore
    const sut = new CreateInvoice();
    const promise = sut.create(VALID_REQUEST);

    await expect(promise).rejects.toThrow(new Error('missing postHttpRequest'));
  });

  it('Should throw if no url is provided', async () => {
    const { sut } = makeSut();

    //eslint-disable-next-line
    //@ts-ignore
    const promise = sut.create();

    await expect(promise).rejects.toThrow(new Error('missing url'));
  });

  it('Should throw if response status is ERROR', async () => {
    const { sut, postHttpRequestSpy } = makeSut();
    postHttpRequestSpy.data = { status: 'ERROR' };

    const promise = sut.create(VALID_REQUEST);

    await expect(promise).rejects.toThrow(new Error('error to create invoice'));
  });

  it('Should calls postHttpRequest once time with correct values', async () => {
    const { sut, postHttpRequestSpy } = makeSut();

    await sut.create(VALID_REQUEST);

    expect(postHttpRequestSpy.callsCount).toBe(1);
    expect(postHttpRequestSpy.httpRequest.body).toEqual(VALID_REQUEST);
  });
});
