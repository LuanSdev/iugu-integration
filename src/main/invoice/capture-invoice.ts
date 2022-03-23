import { IUGU_API_URL } from '../../contants/apis';
import { IPostHttpRequest } from '../../utils/protocols/post-http-request';

type CaptureInvoiceConstructor = {
  postHttpRequest: IPostHttpRequest;
};

type CaptureInvoiceProps = {
  invoiceId: string;
};

export class CaptureInvoice {
  private readonly postHttpRequest: IPostHttpRequest;

  constructor(props: CaptureInvoiceConstructor) {
    this.postHttpRequest = props?.postHttpRequest;
  }

  async capture(props: CaptureInvoiceProps) {
    if (!this.postHttpRequest) {
      throw new Error('missing postHttpRequest');
    }

    if (!props?.invoiceId) {
      throw new Error('missing invoiceId');
    }

    const endpoint = `${IUGU_API_URL}/invoices/${props.invoiceId}/capture`;

    await this.postHttpRequest.post({ url: endpoint });
  }
}
