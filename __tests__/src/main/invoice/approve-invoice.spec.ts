import { CreateInvoice } from '../../../../src/main/invoice/create-invoice';
import { makePostHttpRequestSpy } from '../../../spys/post-http-request';

const makeSut = () => {
  const postHttpRequestSpy = makePostHttpRequestSpy();

  postHttpRequestSpy.data = { status: 'SUCCESS' };

  const sut = new CreateInvoice({ postHttpRequest: postHttpRequestSpy });

  return { sut, postHttpRequestSpy };
};

describe('Approve invoice', () => {
  it('Should calls postHttpRequest once time with correct values', async () => {
    const { sut } = makeSut();
  });
});
