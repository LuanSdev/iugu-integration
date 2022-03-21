import { IuguInvoiceCreateRequest, IuguInvoiceCreateResponse } from '@types';
import { IuguConfig } from '../config/iugu-config';

export class CreateInvoice extends IuguConfig {
  private data: IuguInvoiceCreateRequest;

  constructor() {
    super();

    this.handle = this.handle.bind(this);
  }

  async create(data: IuguInvoiceCreateRequest) {
    if (!data) {
      throw new Error('Missing invoice data');
    }

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
