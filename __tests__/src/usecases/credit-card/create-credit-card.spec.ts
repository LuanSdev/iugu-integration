import { IuguCreateTokenRequest } from '../../../../src/@types/iugu/iugu-create-token-request';
import { IuguCustomer } from '../../../../src/@types/iugu/iugu-customer';
import { ICreateCustomer } from 'usecases/protocols/create-customer';
import { ICreateToken } from 'usecases/protocols/create-token';
import { ICreateCreditCard } from '../../../../src/usecases/protocols/create-credit-card';
import { VALID_CREDIT_CARD } from '../__helpers__/valid-credit-card';
import { VALID_CUSTOMER } from '../__helpers__/valid-customer';

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
  createCustomer: ICreateCustomer<IuguCustomer>;
};

class CreateCreditCard implements ICreateCreditCard<CreateCreditCardData> {
  private readonly createToken: ICreateToken<IuguCreateTokenRequest>;
  private readonly createCustomer: ICreateCustomer<IuguCustomer>;

  constructor(props: ConstructorProps) {
    Object.assign(this, props);
  }

  async create(data: CreateCreditCardData): Promise<{ id: string }> {
    if (!this.createCustomer || !this.createToken) {
      throw new Error('missing dependencies.');
    }

    if (!data) {
      throw new Error('missing data.');
    }

    const { customer, token, description } = data;

    await Promise.all([
      this.createCustomer.create(customer),
      this.createToken.create(token),
    ]);

    return { id: 'any-id' };
  }
}

const makeSut = () => {
  const createCustomerSpy = makeCreateCustomerSpy();
  const createTokenSpy = makeCreateTokenSpy();

  const sut = new CreateCreditCard({
    createCustomer: createCustomerSpy,
    createToken: createTokenSpy,
  });

  return { sut, createCustomerSpy, createTokenSpy };
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
    const { sut, createCustomerSpy, createTokenSpy } = makeSut();

    await sut.create(VALID_DATA);

    expect(createCustomerSpy.callsCount).toBe(1);
    expect(createCustomerSpy.data).toBe(VALID_DATA.customer);
    expect(createTokenSpy.callsCount).toBe(1);
    expect(createTokenSpy.data).toBe(VALID_DATA.token);
  });
});
