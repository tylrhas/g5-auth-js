module.exports = {
  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: './__tests__/config/setup.js',
  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: './__tests__/config/teardown.js',
 'testMatch': [
  '**/__tests__/**/*.[jt]s?(x)',
  '**/?(*.)+(spec|test).[tj]s?(x)',
  '!**/__tests__/config/**/*.js',
  '!**/__tests__/controllers/location.test.js',
  
 ],
 'collectCoverage': true,
 'collectCoverageFrom': [
   '<rootDir>/*.js',
   '<rootDir>/**/*.js',
   '<rootDir>/index.js',
   '!<rootDir>/jest.config.js',
   '!<rootDir>/__tests__/**',
   '!<rootDir>/routes/**',
   '!<rootDir>/models/**',
   '!<rootDir>/coverage/**'
 ]
}