module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.config.js', 'jest-canvas-mock'],
  coveragePathIgnorePatterns: ['<rootDir>/src/strategies/SVM/AlgorithmViewSVM.tsx','<rootDir>/src/strategies/RL/AlgorithmViewRL.tsx','<rootDir>/src/View.tsx'],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy"
  }
};