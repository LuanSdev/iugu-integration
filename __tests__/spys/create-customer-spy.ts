import { ICreateCustomer } from '../../src/usecases/protocols/create-customer';

export class CreateCustomerSpy implements ICreateCustomer<any> {
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

export const makeCreateCustomerSpy = () => new CreateCustomerSpy();
