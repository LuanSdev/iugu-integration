import iugu from 'iugu';

import { IuguCreditCard } from '../../../src/@types/iugu/iugu-credit-card';
import { IuguCreateTokenResponse } from '../../../src/@types/iugu/iugu-create-token-response';

type CreateTokenProps = IuguCreateTokenResponse & {
  errors: any;
};
export class CreateToken {
  async create(data: IuguCreditCard) {
    return new Promise((resolve) => {
      iugu.createPaymentToken(data, ({ id, errors }: CreateTokenProps) => {
        if (errors) {
          throw new Error('Error to create creadit card');
        }

        resolve(id);
      });
    });
  }
}
