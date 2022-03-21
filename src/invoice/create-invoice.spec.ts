import { IuguInvoiceCreateRequest } from '../@types';
import { CreateInvoice } from './create-invoice';

const makeSut = () => {
  const sut = new CreateInvoice();

  return { sut };
};

describe('Create invoice', () => {
  it('Should receive a truthy response with an id', async () => {
    const { sut } = makeSut();

    const response = await sut.create({} as IuguInvoiceCreateRequest);

    expect(response.id).toBeTruthy();
  });

  it('Should throw if no params is provided', async () => {
    const { sut } = makeSut();

    //eslint-disable-next-line
    //@ts-ignore
    const promise = sut.create();

    await expect(promise).rejects.toThrow();
  });
});
