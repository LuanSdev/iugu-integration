import { ICreateToken } from '../../src/usecases/protocols/create-token';

export class CreateTokenSpy implements ICreateToken<any> {
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

export const makeCreateTokenSpy = () => new CreateTokenSpy();
