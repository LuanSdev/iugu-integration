class CreateCreditCard {
  async create() {}
}

describe('Create credit card', () => {
  it('Should throws if dependencies are not provided', async () => {
    const sut = new CreateCreditCard();

    const promise = sut.create();

    await expect(promise).rejects.toThrow();
  });
});
