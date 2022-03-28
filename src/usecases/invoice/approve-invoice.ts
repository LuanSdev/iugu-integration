import { IuguApproveInvoiceRequest } from '../../@types/iugu-invoice-approve-request';
import { IUGU_API_URL } from '../../contants/apis';
import { IPostHttpRequest } from '../../utils/protocols/post-http-request';

type ApproveInvoiceConstructor = {
  postHttpRequest: IPostHttpRequest;
};

export class ApproveInvoice {
  private readonly postHttpRequest: IPostHttpRequest;

  constructor(props: ApproveInvoiceConstructor) {
    this.postHttpRequest = props?.postHttpRequest;
  }

  async create(data: IuguApproveInvoiceRequest) {
    if (!this.postHttpRequest) {
      throw new Error('missing postHttpRequest');
    }

    if (!data) {
      throw new Error('missing request data');
    }

    await this.postHttpRequest.post<null, IuguApproveInvoiceRequest>({
      url: `${IUGU_API_URL}/charge`,
      body: data,
    });
  }
}
