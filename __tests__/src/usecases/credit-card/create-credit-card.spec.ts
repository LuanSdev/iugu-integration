import { IuguCreateTokenRequest } from '../../../../src/@types/iugu/iugu-create-token-request';
import { IuguCustomer } from '../../../../src/@types/iugu/iugu-customer';
import { ICreateCustomer } from '../../../../src/usecases/protocols/create-customer';
import { ICreateToken } from '../../../../src/usecases/protocols/create-token';
import { ICreateCreditCard } from '../../../../src/usecases/protocols/create-credit-card';
import { VALID_CREDIT_CARD } from '../__helpers__/valid-credit-card';
import { VALID_CUSTOMER } from '../__helpers__/valid-customer';
import { makePostHttpRequestSpy } from '../../../spys/post-http-request';
import { IPostHttpRequest } from '../../../../src/utils/protocols/post-http-request';
import { IUGU_API_URL } from '../../../../src/contants/apis';
import { IuguCreateCreditCardResponse } from '../../../../src/@types/iugu/iugu-create-credit-card-response';
import { IuguCreditCardPreview } from '../../../../src/@types/iugu/iugu-credit-card-preview';

class CreateTokenSpy implements ICreateToken<any> {
  public callsCount: number;
  public data: any;
  public token: string;

  constructor() {
    this.callsCount = 0;
    this.token = 'valid-token';
  }

  async create(data: any): Promise<{ token: string }> {
    this.callsCount++;
    this.data = data;
    return { token: this.token };
  }
}

const makeCreateTokenSpy = () => new CreateTokenSpy();

class CreateCustomerSpy implements ICreateCustomer<any> {
  public callsCount: number;
  public data: any;
  public id: string;

  constructor() {
    this.callsCount = 0;
    this.id = 'valid-id';
  }

  async create(data: any): Promise<{ id: string }> {
    this.callsCount++;
    this.data = data;
    return { id: this.id };
  }
}

const makeCreateCustomerSpy = () => new CreateCustomerSpy();

type CreateCreditCardData = {
  token: IuguCreateTokenRequest;
  customer: IuguCustomer;
  description: string;
};

type ConstructorProps = {
  createToken: ICreateToken<IuguCreateTokenRequest>;
  postHttpRequest: IPostHttpRequest;
};

class CreateCreditCard implements ICreateCreditCard<CreateCreditCardData> {
  private readonly createToken: ICreateToken<IuguCreateTokenRequest>;
  private readonly postHttpRequest: IPostHttpRequest;

  constructor(props: ConstructorProps) {
    Object.assign(this, props);
  }

  async create(
    data: CreateCreditCardData
  ): Promise<IuguCreditCardPreview & { id: string }> {
    if (!this.postHttpRequest || !this.createToken) {
      throw new Error('missing dependencies.');
    }

    if (!data) {
      throw new Error('missing data.');
    }

    const { token } = await this.createToken.create(data.token);

    const postData = {
      description: data.description,
      token,
    };

    const { data: creditCard, id } = await this.postHttpRequest.post<
      IuguCreateCreditCardResponse,
      any
    >({
      url: `${IUGU_API_URL}/customers/any-id/payment_methods`,
      body: postData,
    });

    return { ...creditCard, id };
  }
}

const makeSut = () => {
  const createTokenSpy = makeCreateTokenSpy();
  const postHttpRequestSpy = makePostHttpRequestSpy();

  const sut = new CreateCreditCard({
    createToken: createTokenSpy,
    postHttpRequest: postHttpRequestSpy,
  });

  return { sut, createTokenSpy, postHttpRequestSpy };
};

const VALID_DATA: CreateCreditCardData = {
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
