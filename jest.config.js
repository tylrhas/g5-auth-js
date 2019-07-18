module.exports = {
  // moduleNameMapper: {
  //   '^@/(.*)$': '<rootDir>/$1',
  //   '^~/(.*)$': '<rootDir>/$1',
  //   '^vue$': 'vue/dist/vue.common.js'
  // },
  // // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: './test/setup.js',
  // // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: './test/teardown.js',
  // moduleFileExtensions: ['js', 'vue', 'json'],
  // transform: {
  //   '^.+\\.js$': 'babel-jest',
  //   '.*\\.(vue)$': 'vue-jest'
  // },
  'collectCoverage': true,
  'collectCoverageFrom': [
    '<rootDir>/**/*.js',
    '!<rootDir>/jest.config.js',
    '!<rootDir>/coverage/**',
    '!<rootDir>/routes/**',
  ]
}
