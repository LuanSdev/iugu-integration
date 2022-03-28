import { IUGU_API_URL } from '../../contants/apis';
import { IPutHttpRequest } from '../../utils/protocols/put-http-request';

type CancelInvoiceConstructor = {
  putHttpRequest: IPutHttpRequest;
};

type CancelInvoiceProps = {
  invoiceId: string;
};

export class CancelInvoice {
  private readonly putHttpRequest: IPutHttpRequest;

  constructor(props: CancelInvoiceConstructor) {
    this.putHttpRequest = props?.putHttpRequest;
  }

  async cancel(props: CancelInvoiceProps) {
    if (!this.putHttpRequest) {
      throw new Error('missing putHttpRequest');
    }

    if (!props?.invoiceId) {
      throw new Error('missing invoiceId');
    }

    const endpoint = `${IUGU_API_URL}/invoices/${props.invoiceId}/cancel`;

    await this.putHttpRequest.put({ url: endpoint });
  }
}
