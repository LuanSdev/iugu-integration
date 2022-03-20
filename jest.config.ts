export default {
  coverageProvider: 'v8',
  testMatch: ['**/*.spec.*'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
