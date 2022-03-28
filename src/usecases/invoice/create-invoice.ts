import {
  IuguInvoiceCreateRequest,
  IuguInvoiceCreateResponse,
} from '../../@types';
import { IUGU_API_URL } from '../../contants/apis';
import { IPostHttpRequest } from '../../utils/protocols/post-http-request';

type CreateInvoiceConstructor = {
  postHttpRequest: IPostHttpRequest;
};
export class CreateInvoice {
  private readonly postHttpRequest: IPostHttpRequest;

  constructor(props: CreateInvoiceConstructor) {
    this.postHttpRequest = props?.postHttpRequest;
  }

  async create(data: IuguInvoiceCreateRequest) {
    if (!this.postHttpRequest) {
      throw new Error('missing postHttpRequest');
    }

    if (!data) {
      throw new Error('missing request data');
    }

    const response = await this.postHttpRequest.post<
      IuguInvoiceCreateResponse,
      IuguInvoiceCreateRequest
    >({
      url: `${IUGU_API_URL}/invoices`,
      body: data,
    });

    if (response.status !== 'SUCCESS') {
      throw new Error('error to create invoice');
    }
  }
}
