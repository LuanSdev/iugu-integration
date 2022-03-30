import iugu from 'iugu';

import { CreateToken } from '../../../../src/usecases/token/create-token';
import { VALID_CREDIT_CARD } from '../__helpers__/valid-credit-card';

const makeSut = () => {
  const sut = new CreateToken();

  return { sut };
};

describe('Create token', () => {
  it('Should calls iugu createPaymentToken with correct values', async () => {
    const { sut } = makeSut();

    await sut.create(VALID_CREDIT_CARD);

    expect(iugu.createPaymentTokenCalls).toBe(1);
    expect(iugu.data).toEqual(VALID_CREDIT_CARD);
  });

  it('Should returns a token', async () => {
    const { sut } = makeSut();

    const token = await sut.create(VALID_CREDIT_CARD);

    expect(token).toBeTruthy();
  });
});
