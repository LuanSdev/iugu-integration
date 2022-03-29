import iugu from 'iugu';

import { IuguCreditCard } from '@types';

class CreateToken {
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

  it('Should returns a token', async () => {
    const { sut } = makeSut();

    const token = await sut.create(VALID_CARD);

    expect(token).toBeTruthy();
  });
});
