import iugu from 'iugu';

import { IuguCreditCard } from '@types';

export class CreateToken {
  async create(data: IuguCreditCard) {
    return new Promise((resolve) => {
      iugu.createPaymentToken(data, ({ id, errors }) => {
        if (errors) {
          throw new Error('Error to create creadit card');
        }

        resolve(id);
      });
    });
  }
}
