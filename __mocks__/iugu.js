module.exports = {
  createPaymentTokenCalls: 0,
  createPaymentTokenData: null,
  createPaymentTokenResponse: { id: 'any-id' },

  createPaymentToken(data, response) {
    this.createPaymentTokenCalls++;
    this.data = data;

    response(this.createPaymentTokenResponse);
  },
};
