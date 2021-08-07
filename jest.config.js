module.exports = {
  // verbose: true,
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  testEnvironment: 'jsdom',
  testTimeout: 6000,
};
