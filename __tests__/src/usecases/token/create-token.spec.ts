import iugu from 'iugu';

import { IuguCreditCard } from '@types';

class CreateToken {
  async create(data: IuguCreditCard) {
    await iugu.createPaymentToken(data, ({ id, errors }) => {
      if (errors) {
        throw new Error('Error to create creadit card');
      }

      return id;
    });
  }
}

const makeSut = () => {
  const sut = new CreateToken();

  return { sut };
};

const VALID_CARD = {
  number: '4111111111111111',
  verification_value: '111',
  first_name: 'John',
  last_name: 'Doe',
  month: '01',
  year: '27',
};

describe('Create token', () => {
  it('Should calls iugu createPaymentToken with correct values', async () => {
    const { sut } = makeSut();

    await sut.create(VALID_CARD);

    expect(iugu.createPaymentTokenCalls).toBe(1);
    expect(iugu.data).toEqual(VALID_CARD);
  });
});
