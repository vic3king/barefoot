/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    silent: false,
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/coverage/'],
    collectCoverage: true,
    clearMocks: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.ts', '!test/**/*.ts?(x)', '!**/node_modules/**'],
    coverageThreshold: {
        global: {
            branches: 60,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    coveragePathIgnorePatterns: ['<rootDir>/src/db/index.js', '/node_modules/', '/coverage/'],
};
