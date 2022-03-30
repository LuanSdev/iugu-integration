import { IuguCustomer } from '../../@types/iugu-customer';
import { IUGU_API_URL } from '../../contants/apis';
import { IPostHttpRequest } from '../../utils/protocols/post-http-request';

type ConstructorProps = {
  postHttpClient: IPostHttpRequest;
};

export class CreateCustomer {
  private readonly postHttpClient: IPostHttpRequest;

  constructor(props: ConstructorProps) {
    Object.assign(this, props);
  }

  async create(data: IuguCustomer) {
    if (!this.postHttpClient) {
      throw new Error('Server Error.');
    }

    if (!data) {
      throw new Error('Missing data.');
    }

    await this.postHttpClient.post({
      url: `${IUGU_API_URL}/customers`,
      body: data,
    });
  }
}
