import { IuguCreateCreditCardResponse } from '../../@types/iugu/iugu-create-credit-card-response';
import { IuguCreateTokenRequest } from '../../@types/iugu/iugu-create-token-request';
import { IuguCreditCardPreview } from '../../@types/iugu/iugu-credit-card-preview';
import { IuguCustomer } from '../../@types/iugu/iugu-customer';
import { IUGU_API_URL } from '../../contants/apis';
import { ICreateCreditCard } from '../../usecases/protocols/create-credit-card';
import { ICreateToken } from '../../usecases/protocols/create-token';
import { IPostHttpRequest } from '../../utils/protocols/post-http-request';

type CreateCreditCardData = {
  token: IuguCreateTokenRequest;
  customer: IuguCustomer;
  description: string;
};

type ConstructorProps = {
  createToken: ICreateToken<IuguCreateTokenRequest>;
  postHttpRequest: IPostHttpRequest;
};

export class CreateCreditCard
  implements ICreateCreditCard<CreateCreditCardData>
{
  private readonly createToken: ICreateToken<IuguCreateTokenRequest>;
  private readonly postHttpRequest: IPostHttpRequest;

  constructor(props: ConstructorProps) {
    Object.assign(this, props);
  }

  async create(
    data: CreateCreditCardData
  ): Promise<IuguCreditCardPreview & { id: string }> {
    if (!this.postHttpRequest || !this.createToken) {
      throw new Error('missing dependencies.');
    }

    if (!data) {
      throw new Error('missing data.');
    }

    const { token } = await this.createToken.create(data.token);

    const postData = {
      description: data.description,
      token,
    };

    const { data: creditCard, id } = await this.postHttpRequest.post<
      IuguCreateCreditCardResponse,
      any
    >({
      url: `${IUGU_API_URL}/customers/any-id/payment_methods`,
      body: postData,
    });

    return { ...creditCard, id };
  }
}
