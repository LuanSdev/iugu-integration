import { IUGU_API_URL } from '../../../../src/contants/apis';
import { IPostHttpRequest } from '../../../../src/utils/protocols/post-http-request';
import { makePostHttpRequestSpy } from '../../../spys/post-http-request';

type CaptureInvoiceConstructor = {
  postHttpRequest: IPostHttpRequest;
};

type CaptureInvoiceProps = {
  invoiceId: string;
};

class CaptureInvoice {
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

const makeSut = () => {
  const postHttpRequestSpy = makePostHttpRequestSpy();

  const sut = new CaptureInvoice({ postHttpRequest: postHttpRequestSpy });

  return { sut };
};

describe('Capture Invoice', () => {
  it('Should throw if no postHttpRequest is provided', async () => {
    //eslint-disable-next-line
    //@ts-ignore
    const sut = new CaptureInvoice();
    const promise = sut.capture({ invoiceId: 'valid-id' });

    await expect(promise).rejects.toThrow(new Error('missing postHttpRequest'));
  });

  it('Should throw if no invoiceId is provided', async () => {
    const { sut } = makeSut();

    //eslint-disable-next-line
    //@ts-ignore
    const promise = sut.capture();

    await expect(promise).rejects.toThrow(new Error('missing invoiceId'));
  });
});
