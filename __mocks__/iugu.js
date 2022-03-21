module.exports = {
  invoice: {
    create(data, callback) {
      return new Promise((resolve) =>
        resolve(callback(null, { id: 'any-id' }))
      );
    },
  },
};
