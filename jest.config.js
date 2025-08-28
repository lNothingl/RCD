/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\.ts$": ["ts-jest",{ useESM: true}],
  },
  testEnvironment: "@quramy/jest-prisma-node/environment",
  testEnvironmentOptions: {
    verboseQuery: true,
    databaseUrl: "postgresql://postgres:root@localhost:5432/online-booking",
  },
  testMatch: ["<rootDir>/__tests__/**/*.spec.ts"],
  moduleNameMapper: {
    "^@src/(.*)\.js$": "<rootDir>/src/$1",
    "^@tests/(.*)\.js$": "<rootDir>/__tests__/$1",
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: ["<rootDir>/__tests__/setup-prisma.js", "@quramy/prisma-fabbrica/scripts/jest-prisma"],
};
