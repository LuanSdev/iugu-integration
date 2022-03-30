import { IPostHttpRequest } from '../../../../src/utils/protocols/post-http-request';
import { IuguCustomer } from '../../../../src/@types/iugu-customer';
import { makePostHttpRequestSpy } from '../../../spys/post-http-request';
import { VALID_CUSTOMER } from './helpers/valid-customer';
import { IUGU_API_URL } from '../../../../src/contants/apis';

type ConstructorProps = {
  postHttpClient: IPostHttpRequest;
};

class CreateCustomer {
  private readonly postHttpClient: IPostHttpRequest;

  constructor(props: ConstructorProps) {
    Object.assign(this, props);
  }

  async create(data: IuguCustomer) {
    if (!this.postHttpClient) {
      throw new Error('Server Error.');
    }

    await this.postHttpClient.post({
      url: `${IUGU_API_URL}/customers`,
      body: data,
    });
  }
}

const makeSut = () => {
  const postHttpRequestSpy = makePostHttpRequestSpy();
  const sut = new CreateCustomer({ postHttpClient: postHttpRequestSpy });

  return { sut, postHttpRequestSpy };
};

describe('Create customer', () => {
  it('Should throws if no postHttpClient is provided', async () => {
    //eslint-disable-next-line
    //@ts-ignore
    const sut = new CreateCustomer();

    const promise = sut.create(VALID_CUSTOMER);

    await expect(promise).rejects.toThrow();
  });

  it('Should calls postHttpRequest once time with correct values', async () => {
    const { sut, postHttpRequestSpy } = makeSut();

    await sut.create(VALID_CUSTOMER);

    expect(postHttpRequestSpy.callsCount).toBe(1);
    expect(postHttpRequestSpy.httpRequest.body).toBe(VALID_CUSTOMER);
  });
});
