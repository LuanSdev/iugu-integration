import { CreateCustomer } from '../../../../src/usecases/customer/create-customer';
import { makePostHttpRequestSpy } from '../../../spys/post-http-request';

import { VALID_CUSTOMER } from '../__helpers__/valid-customer';

const makeSut = () => {
  const postHttpRequestSpy = makePostHttpRequestSpy();
  const sut = new CreateCustomer({ postHttpClient: postHttpRequestSpy });

  return { sut, postHttpRequestSpy };
};

describe('Create customer', () => {
  it('Should throws if no postHttpClient is provided', async () => {
    //eslint-disable-next-line
    //@ts-ignore
    const sut = new CreateCustomer();

    const promise = sut.create(VALID_CUSTOMER);

    await expect(promise).rejects.toThrow();
  });

  it('Should calls postHttpRequest once time with correct values', async () => {
    const { sut, postHttpRequestSpy } = makeSut();

    await sut.create(VALID_CUSTOMER);

    expect(postHttpRequestSpy.callsCount).toBe(1);
    expect(postHttpRequestSpy.httpRequest.body).toBe(VALID_CUSTOMER);
  });

  it('Should throws if no props are provided', async () => {
    const { sut } = makeSut();

    //eslint-disable-next-line
    //@ts-ignore
    const promise = sut.create();

    await expect(promise).rejects.toThrow();
  });
});
