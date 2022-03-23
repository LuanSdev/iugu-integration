import { AxiosPostHttpRequest } from './axios-post-http-request';

const makeSut = () => {
  const sut = new AxiosPostHttpRequest();

  return { sut };
};

describe('Axios Http request', () => {
  it('Should throws if no url is provided', async () => {
    const { sut } = makeSut();

    //eslint-disable-next-line
    //@ts-ignore
    const promise = sut.post();

    await expect(promise).rejects.toThrow();
  });
});
