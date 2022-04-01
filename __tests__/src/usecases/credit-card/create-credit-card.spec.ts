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

  return { sut };
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
});
