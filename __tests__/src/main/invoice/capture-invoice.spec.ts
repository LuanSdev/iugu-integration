import { CaptureInvoice } from '../../../../src/main/invoice/capture-invoice';
import { makePostHttpRequestSpy } from '../../../spys/post-http-request';

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
