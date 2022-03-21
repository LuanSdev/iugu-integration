import { IuguConfig } from '../config/iugu-config';
import { IuguInvoiceCreateRequest, IuguInvoiceCreateResponse } from '../@types';

class CreateInvoice extends IuguConfig {
  private data: IuguInvoiceCreateRequest;

  constructor() {
    super();

    this.handle = this.handle.bind(this);
  }

  create(data: IuguInvoiceCreateRequest) {
    this.data = data;

    return new Promise<IuguInvoiceCreateResponse>(this.handle);
  }

  private handle(resolve) {
    this.request.invoice.create(
      this.data,
      (error: any, response: IuguInvoiceCreateResponse) => {
        if (error) {
          console.error(error);

          return;
        }

        resolve(response);
      }
    );
  }
}

const makeSut = () => {
  const sut = new CreateInvoice();

  return { sut };
};

describe('Create invoice', () => {
  it('Should receive a truthy response with an id', async () => {
    const { sut } = makeSut();

    const response = await sut.create({} as IuguInvoiceCreateRequest);

    expect(response.id).toBeTruthy();
  });
});
