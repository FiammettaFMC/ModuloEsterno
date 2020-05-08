module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.config.js', 'jest-canvas-mock'],
  coveragePathIgnorePatterns: ['<rootDir>/src/strategies/SVM/AlgorithmViewSVM.tsx','<rootDir>/src/strategies/Regression/AlgorithmViewRegression.tsx','<rootDir>/src/View.tsx'],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy"
  }
};