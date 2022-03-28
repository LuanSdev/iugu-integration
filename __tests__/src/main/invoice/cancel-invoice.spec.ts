import { CancelInvoice } from '../../../../src/usecases/invoice/cancel-invoice';
import { makePutHttpRequestSpy } from '../../../spys/put-http-request';

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
