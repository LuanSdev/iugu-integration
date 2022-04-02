import { VALID_CREDIT_CARD } from '../__helpers__/valid-credit-card';
import { VALID_CUSTOMER } from '../__helpers__/valid-customer';
import { makePostHttpRequestSpy } from '../../../spys/post-http-request';
import { CreateCreditCard } from '../../../../src/usecases/credit-card/create-credit-card';
import { makeCreateTokenSpy } from '../../../spys/create-token-spy';

const makeSut = () => {
  const createTokenSpy = makeCreateTokenSpy();
  const postHttpRequestSpy = makePostHttpRequestSpy();

  const sut = new CreateCreditCard({
    createToken: createTokenSpy,
    postHttpRequest: postHttpRequestSpy,
  });

  return { sut, createTokenSpy, postHttpRequestSpy };
};

const VALID_DATA = {
  token: {
    account_id: 'any-id',
    data: VALID_CREDIT_CARD,
    method: 'credit_card',
    test: true,
  },
  customer: VALID_CUSTOMER,
  description: 'any-description',
};

describe('Create credit card', () => {
  it('Should return an id', async () => {
    const { sut } = makeSut();

    const { id } = await sut.create(VALID_DATA);

    expect(id).toBeTruthy();
  });

  it('Should throws if no dependencies are provided', async () => {
    //eslint-disable-next-line
    //@ts-ignore
    const sut = new CreateCreditCard();

    const promise = sut.create(VALID_DATA);

    await expect(promise).rejects.toThrow();
  });

  it('Should throws if no data are provided', async () => {
    const { sut } = makeSut();

    //eslint-disable-next-line
    //@ts-ignore
    const promise = sut.create();

    await expect(promise).rejects.toThrow();
  });

  it('Should calls dependencies once time with correct values', async () => {
    const { sut, createTokenSpy, postHttpRequestSpy } = makeSut();

    await sut.create(VALID_DATA);

    expect(createTokenSpy.callsCount).toBe(1);
    expect(createTokenSpy.data).toBe(VALID_DATA.token);
    expect(postHttpRequestSpy.callsCount).toBe(1);
    expect(postHttpRequestSpy.data).toEqual({ id: 'any-id' });
  });
});
