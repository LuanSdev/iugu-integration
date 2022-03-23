import { IuguInvoiceCreateRequest } from '../../@types';
import { IUGU_API_URL } from '../../contants/apis';
import { IPostHttpRequest } from '../../utils/protocols/post-http-request';

type CreateInvoiceConstructor = {
  postHttpRequest: IPostHttpRequest;
};
export class CreateInvoice {
  private readonly data: IuguInvoiceCreateRequest;
  private readonly postHttpRequest: IPostHttpRequest;

  constructor(props: CreateInvoiceConstructor) {
    this.postHttpRequest = props?.postHttpRequest;
  }

  async create(data: IuguInvoiceCreateRequest) {
    if (!data) {
      throw new Error('Missing invoice data');
    }

    await this.postHttpRequest.post<null, IuguInvoiceCreateRequest>({
      url: `${IUGU_API_URL}/invoices`,
      body: data,
    });
  }
}
