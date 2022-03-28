import { RefundInvoice } from '../../../../src/usecases/invoice/refund-invoice';
import { makePostHttpRequestSpy } from '../../../spys/post-http-request';

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
