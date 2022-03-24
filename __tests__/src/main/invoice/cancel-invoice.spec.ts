import { IUGU_API_URL } from '../../../../src/contants/apis';
import { IPutHttpRequest } from '../../../../src/utils/protocols/put-http-request';
import { makePutHttpRequestSpy } from '../../../spys/put-http-request';

type CancelInvoiceConstructor = {
  putHttpRequest: IPutHttpRequest;
};

type CancelInvoiceProps = {
  invoiceId: string;
};

class CancelInvoice {
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

const makeSut = () => {
  const putHttpRequestSpy = makePutHttpRequestSpy();

  const sut = new CancelInvoice({ putHttpRequest: putHttpRequestSpy });

  return { sut };
};

describe('Cancel Invoice', () => {
  it('Should throw if no putHttpRequest is provided', async () => {
    //eslint-disable-next-line
    //@ts-ignore
    const sut = new CancelInvoice();
    const promise = sut.cancel({ invoiceId: 'valid-id' });

    await expect(promise).rejects.toThrow(new Error('missing putHttpRequest'));
  });

  it('Should throw if no invoiceId is provided', async () => {
    const { sut } = makeSut();

    //eslint-disable-next-line
    //@ts-ignore
    const promise = sut.cancel();

    await expect(promise).rejects.toThrow(new Error('missing invoiceId'));
  });
});
