import { ApproveInvoice } from '../../../../src/usecases/invoice/approve-invoice';
import { IuguApproveInvoiceRequest } from '../../../../src/@types/iugu/iugu-invoice-approve-request';
import { makePostHttpRequestSpy } from '../../../spys/post-http-request';

const makeSut = () => {
  const postHttpRequestSpy = makePostHttpRequestSpy();

  const sut = new ApproveInvoice({ postHttpRequest: postHttpRequestSpy });

  return { sut, postHttpRequestSpy };
};

const VALID_REQUEST: IuguApproveInvoiceRequest = {
  invoice_id: 'valid-id',
};

describe('Approve invoice', () => {
  it('Should throw if no postHttpRequest is provided', async () => {
    //eslint-disable-next-line
    //@ts-ignore
    const sut = new ApproveInvoice();
    const promise = sut.create(VALID_REQUEST);

    await expect(promise).rejects.toThrow(new Error('missing postHttpRequest'));
  });

  it('Should throw if no request data is provided', async () => {
    const { sut } = makeSut();

    //eslint-disable-next-line
    //@ts-ignore
    const promise = sut.create();

    await expect(promise).rejects.toThrow(new Error('missing request data'));
  });

  it('Should calls postHttpRequest once time with correct values', async () => {
    const { sut, postHttpRequestSpy } = makeSut();

    await sut.create(VALID_REQUEST);

    expect(postHttpRequestSpy.callsCount).toBe(1);
    expect(postHttpRequestSpy.httpRequest.body).toEqual(VALID_REQUEST);
  });
});
