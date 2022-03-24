import { IUGU_API_URL } from '../../../../src/contants/apis';
import { IPostHttpRequest } from '../../../../src/utils/protocols/post-http-request';
import { makePostHttpRequestSpy } from '../../../spys/post-http-request';

type RefundInvoiceConstructor = {
  postHttpRequest: IPostHttpRequest;
};

type RefundInvoiceProps = {
  invoiceId: string;
};

class RefundInvoice {
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

const makeSut = () => {
  const postHttpRequestSpy = makePostHttpRequestSpy();

  const sut = new RefundInvoice({ postHttpRequest: postHttpRequestSpy });

  return { sut };
};

describe('Refund Invoice', () => {
  it('Should throw if no postHttpRequest is provided', async () => {
    //eslint-disable-next-line
    //@ts-ignore
    const sut = new RefundInvoice();
    const promise = sut.refund({ invoiceId: 'valid-id' });

    await expect(promise).rejects.toThrow(new Error('missing postHttpRequest'));
  });

  it('Should throw if no invoiceId is provided', async () => {
    const { sut } = makeSut();

    //eslint-disable-next-line
    //@ts-ignore
    const promise = sut.refund();

    await expect(promise).rejects.toThrow(new Error('missing invoiceId'));
  });
});
