import { IUGU_API_URL } from '../../contants/apis';
import { IPostHttpRequest } from '../../utils/protocols/post-http-request';

type RefundInvoiceConstructor = {
  postHttpRequest: IPostHttpRequest;
};

type RefundInvoiceProps = {
  invoiceId: string;
};

export class RefundInvoice {
  private readonly postHttpRequest: IPostHttpRequest;

  constructor(props: RefundInvoiceConstructor) {
    this.postHttpRequest = props?.postHttpRequest;
  }

  async refund(props: RefundInvoiceProps) {
    if (!this.postHttpRequest) {
      throw new Error('missing postHttpRequest');
    }

    if (!props?.invoiceId) {
      throw new Error('missing invoiceId');
    }

    const endpoint = `${IUGU_API_URL}/invoices/${props.invoiceId}/refund`;

    await this.postHttpRequest.post({ url: endpoint });
  }
}
